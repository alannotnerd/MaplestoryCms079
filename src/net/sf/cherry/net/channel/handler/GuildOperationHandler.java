package net.sf.cherry.net.channel.handler;

import java.rmi.RemoteException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildResponse;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class GuildOperationHandler extends AbstractMaplePacketHandler {

    private Logger log = LoggerFactory.getLogger(getClass());
    private List<Invited> invited = new LinkedList();
    private long nextPruneTime = System.currentTimeMillis() + 1200000L;

    private boolean isGuildNameAcceptable(String name) {
        return (name.getBytes(ServerConfig.STRCHARSET).length >= 3) && (name.getBytes(ServerConfig.STRCHARSET).length <= 12);
    }

    private void respawnPlayer(MapleCharacter mc) {
        mc.getMap().broadcastMessage(mc, MaplePacketCreator.removePlayerFromMap(mc.getId()), false);
        mc.getMap().broadcastMessage(mc, MaplePacketCreator.spawnPlayerMapobject(mc), false);
        if (mc.getNoPets() > 0) {
            for (MaplePet pet : mc.getPets()) {
                if (pet != null) {
                    mc.getMap().broadcastMessage(mc, MaplePacketCreator.showPet(mc, pet, false, false), false);
                }
            }
        }
    }

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        if (System.currentTimeMillis() >= this.nextPruneTime) {
            Iterator itr = this.invited.iterator();

            while (itr.hasNext()) {
                Invited inv = (Invited) itr.next();
                if (System.currentTimeMillis() >= inv.expiration) {
                    itr.remove();
                }
            }

            this.nextPruneTime = (System.currentTimeMillis() + 1200000L);
        }
        MapleCharacter mc = c.getPlayer();
        byte type = slea.readByte();
        int gid;
        String name;
        int cid;
        switch (type) {
            case 0x00:
               // c.getSession().write(MaplePacketCreator.showGuildInfo(mc));
                break;
            case 2:
                if ((mc.getGuildId() > 0) || (mc.getMapId() != 200000301)) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你已经有家族了,不能创建家族."));
                    return;
                }
                if (mc.getMeso() < 25000000) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你没有足够的金币创建家族."));
                    return;
                }
                String guildName = slea.readMapleAsciiString();
                if (!isGuildNameAcceptable(guildName)) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你不能使用这个家族名."));
                    return;
                }
                try {
                    gid = c.getChannelServer().getWorldInterface().createGuild(mc.getId(), guildName);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                if (gid == 0) {
                    c.getSession().write(MaplePacketCreator.genericGuildMessage((byte) 0x1c));
                    return;
                }
                mc.gainMeso(-6000000, true, false, true);
                mc.setGuildId(gid);
                mc.setGuildRank(1);
                mc.saveGuildStatus();
                c.getSession().write(MaplePacketCreator.showGuildInfo(mc));
                c.getSession().write(MaplePacketCreator.serverNotice(1, "创建家族成功."));
                if (c.getPlayer().getLevel() >= 1) {
                    c.getPlayer().finishAchievement(7);
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "[系统奖励] 创建家族成功。但是因为系统限制，你未能得到相应的奖励！"));
                }
                respawnPlayer(mc);
                break;
            case 5:
                if ((mc.getGuildId() <= 0) || (mc.getGuildRank() > 2)) {
                 //   this.log.info("[hax] " + mc.getName() + " used guild invitation when s/he isn't allowed.");
                    return;
                }
                name = slea.readMapleAsciiString();
                MapleGuildResponse mgr = MapleGuild.sendInvite(c, name);
                if (mgr != null) {
                    c.getSession().write(mgr.getPacket());
                } else {
                    Invited inv = new Invited(name, mc.getGuildId());
                    if (!this.invited.contains(inv)) {
                        this.invited.add(inv);
                    }
                }
                break;
            case 6:
                this.log.info(slea.toString());
                if (mc.getGuildId() > 0) {
                 //   this.log.info("[hax] " + mc.getName() + " attempted to join a guild when s/he is already in one.");
                    return;
                }

                gid = slea.readInt();
                cid = slea.readInt();
                if (cid != mc.getId()) {
                 //   this.log.info("[hax] " + mc.getName() + " attempted to join a guild with a different character id.");
                    return;
                }

                name = mc.getName().toLowerCase();
                Iterator itr = this.invited.iterator();
                boolean bOnList = false;
                while (itr.hasNext()) {
                    Invited inv = (Invited) itr.next();
                    if ((gid == inv.gid) && (name.equals(inv.name))) {
                        bOnList = true;
                        itr.remove();
                        break;
                    }
                }
                if (!bOnList) {
                  //  this.log.info("[hax] " + mc.getName() + " is trying to join a guild that never invited him/her (or that the invitation has expired)");
                    return;
                }
                mc.setGuildId(gid);
                mc.setGuildRank(5);
                int s;
                try {
                    s = c.getChannelServer().getWorldInterface().addGuildMember(mc.getMGC());
                } catch (RemoteException e) {
                    this.log.error("RemoteException occurred while attempting to add character to guild", e);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));

                    mc.setGuildId(0);
                    return;
                }
                if (s == 0) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "家族人数已经到达最高限制."));
                    mc.setGuildId(0);
                    return;
                }

                c.getSession().write(MaplePacketCreator.showGuildInfo(mc));
                mc.saveGuildStatus();
                respawnPlayer(mc);
                break;
            case 7:
                cid = slea.readInt();
                name = slea.readMapleAsciiString();

                if ((cid != mc.getId()) || (!name.equals(mc.getName())) || (mc.getGuildId() <= 0)) {
                 //   this.log.info("[hax] " + mc.getName() + " tried to quit guild under the name \"" + name + "\" and current guild id of " + mc.getGuildId() + ".");
                    return;
                }
                try {
                    c.getChannelServer().getWorldInterface().leaveGuild(mc.getMGC());
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred while attempting to leave guild", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }

                c.getSession().write(MaplePacketCreator.showGuildInfo(null));
                mc.setGuildId(0);
                mc.saveGuildStatus();
                respawnPlayer(mc);
                break;
            case 8:
                cid = slea.readInt();
                name = slea.readMapleAsciiString();

                if ((mc.getGuildRank() > 2) || (mc.getGuildId() <= 0)) {
                 //   this.log.info("[hax] " + mc.getName() + " is trying to expel without rank 1 or 2.");
                    return;
                }

                try {
                    c.getChannelServer().getWorldInterface().expelMember(mc.getMGC(), name, cid);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred while attempting to change rank", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }

            case 13:
                if ((mc.getGuildId() <= 0) || (mc.getGuildRank() != 1)) {
                   // this.log.info("[hax] " + mc.getName() + " tried to change guild rank titles when s/he does not have permission.");
                    return;
                }
                String[] ranks = new String[5];
                for (int i = 0; i < 5; i++) {
                    ranks[i] = slea.readMapleAsciiString();
                }
                try {
                    c.getChannelServer().getWorldInterface().changeRankTitle(mc.getGuildId(), ranks);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }

            case 14:
                cid = slea.readInt();
                byte newRank = slea.readByte();

                if ((mc.getGuildRank() > 2) || ((newRank <= 2) && (mc.getGuildRank() != 1)) || (mc.getGuildId() <= 0)) {
                //    this.log.info("[hax] " + mc.getName() + " is trying to change rank outside of his/her permissions.");
                    return;
                }

                if ((newRank <= 1) || (newRank > 5)) {
                    return;
                }
                try {
                    c.getChannelServer().getWorldInterface().changeRank(mc.getGuildId(), cid, newRank);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred while attempting to change rank", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }

            case 15:
                if ((mc.getGuildId() <= 0) || (mc.getGuildRank() != 1) || (mc.getMapId() != 200000301)) {
                    //this.log.info("[hax] " + mc.getName() + " tried to change guild emblem without being the guild leader.");
                    return;
                }
                if (mc.getMeso() < 6000001) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "你没有足够的金币创建家族"));
                    return;
                }
                short bg = slea.readShort();
                byte bgcolor = slea.readByte();
                short logo = slea.readShort();
                byte logocolor = slea.readByte();
                try {
                    c.getChannelServer().getWorldInterface().setGuildEmblem(mc.getGuildId(), bg, bgcolor, logo, logocolor);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
                mc.gainMeso(-10000000, true, false, true);
                respawnPlayer(mc);

                break;
            case 16:
                if ((mc.getGuildId() <= 0) || (mc.getGuildRank() > 2)) {
                    //this.log.info("[hax] " + mc.getName() + " tried to change guild notice while not in a guild.");
                    return;
                }

                String notice = slea.readMapleAsciiString();
                if (notice.length() > 100) {
                    return;
                }
                try {
                    c.getChannelServer().getWorldInterface().setGuildNotice(mc.getGuildId(), notice);
                } catch (RemoteException re) {
                    this.log.error("RemoteException occurred", re);
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "Unable to connect to the World Server. Please try again later."));
                    return;
                }
            case 3:
            case 4:
            case 9:
            case 10:
            case 11:
            case 12:
            default:
                this.log.info("Unhandled GUILD_OPERATION packet: \n" + slea.toString());
        }
    }

    private class Invited {

        public String name;
        public int gid;
        public long expiration;

        public Invited(String n, int id) {
            this.name = n.toLowerCase();
            this.gid = id;
            this.expiration = (System.currentTimeMillis() + 3600000L);
        }

        public boolean equals(Object other) {
            if (!(other instanceof Invited)) {
                return false;
            }
            Invited oth = (Invited) other;
            return (this.gid == oth.gid) && (this.name.equals(oth));
        }
    }
}
