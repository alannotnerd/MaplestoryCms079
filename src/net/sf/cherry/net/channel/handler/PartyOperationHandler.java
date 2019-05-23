package net.sf.cherry.net.channel.handler;

import java.rmi.RemoteException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class PartyOperationHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        if (c.getPlayer().getCherryBan()) {
            c.getPlayer().getCherryBanMessage();
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int operation = slea.readByte();
        MapleCharacter player = c.getPlayer();
        WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
        MapleParty party = player.getParty();
        MaplePartyCharacter partyplayer = new MaplePartyCharacter(player);

        switch (operation) {
            case 1:
                if (c.getPlayer().getParty() == null) {
                    try {
                        party = wci.createParty(partyplayer);
                        player.setParty(party);
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                    c.getSession().write(MaplePacketCreator.partyCreated());
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "你不能创建一个组队,因为你已经存在一个队伍中"));
                }
                break;
            case 2:
                if (party == null) {
                    break;
                }
                try {
                    if (partyplayer.equals(party.getLeader())) {
                        wci.updateParty(party.getId(), PartyOperation.DISBAND, partyplayer);
                        if (player.getEventInstance() != null) {
                            player.getEventInstance().disbandParty();
                        }
                    } else {
                        wci.updateParty(party.getId(), PartyOperation.LEAVE, partyplayer);
                        if (player.getEventInstance() != null) {
                            player.getEventInstance().leftParty(player);
                        }
                    }
                } catch (RemoteException e) {
                    c.getChannelServer().reconnectWorld();
                }
                player.setParty(null);
                break;
            case 3:
                int partyid = slea.readInt();
                if (!c.getPlayer().getPartyInvited()) {
                    return;
                }
                if (c.getPlayer().getParty() == null) {
                    try {
                        party = wci.getParty(partyid);
                        if ((party != null) && (party.getLeader().isOnline())) {
                            if (party.getMembers().size() < 6) {
                                wci.updateParty(party.getId(), PartyOperation.JOIN, partyplayer);
                                player.receivePartyMemberHP();
                                player.updatePartyMemberHP();
                            } else {
                                c.getSession().write(MaplePacketCreator.partyStatusMessage(17));
                            }
                        } else {
                            c.getSession().write(MaplePacketCreator.serverNotice(5, "要加入的队伍不存在"));
                        }

                        c.getPlayer().setPartyInvited(false);
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "你不能创建一个组队,因为你已经存在一个队伍中"));
                }
                break;
            case 4:
                String name = slea.readMapleAsciiString();
                MapleCharacter invited = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
                if (invited != null) {
                    if (invited.getParty() == null) {
                        if ((party == null) || (party.getMembers().size() >= 6)) {
                            break;
                        }
                        invited.setPartyInvited(true);
                        invited.getClient().getSession().write(MaplePacketCreator.partyInvite(player));
                    } else {
                        c.getSession().write(MaplePacketCreator.partyStatusMessage(16));
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.partyStatusMessage(18));
                }

                break;
            case 5:
                int cid = slea.readInt();
                if (!partyplayer.equals(party.getLeader())) {
                    break;
                }
                MaplePartyCharacter expelled = party.getMemberById(cid);
                if ((expelled != null) && (!expelled.equals(party.getLeader()))) {
                    try {
                        wci.updateParty(party.getId(), PartyOperation.EXPEL, expelled);
                        if (player.getEventInstance() != null) {
                            if (expelled.isOnline()) {
                                MapleCharacter expellee = ChannelServer.getInstance(expelled.getChannel()).getPlayerStorage().getCharacterById(expelled.getId());
                                if ((expellee != null) && (expellee.getEventInstance().getName().equals(player.getEventInstance().getName()))) {
                                    player.getEventInstance().disbandParty();
                                }
                            }
                        }
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                }
                break;
            case 6:
                
                int nlid = slea.readInt();
                MaplePartyCharacter newleader = party.getMemberById(nlid);
                if (partyplayer.equals(party.getLeader()) && newleader.isOnline()) {
                    try {
                        party.setLeader(newleader);
                        wci.updateParty(party.getId(), PartyOperation.CHANGE_LEADER, newleader);
                    } catch (RemoteException re) {
                        c.getChannelServer().reconnectWorld();
                    }
                c.getSession().write(MaplePacketCreator.enableActions());
                }
                break;
               /* int nlid = slea.readInt();
                MaplePartyCharacter newleader = party.getMemberById(nlid);
                try {
                    party.setLeader(newleader);
                    wci.updateParty(party.getId(), PartyOperation.CHANGE_LEADER, newleader);
                } catch (RemoteException re) {
                    c.getChannelServer().reconnectWorld();
                }*/
        }
    }
}