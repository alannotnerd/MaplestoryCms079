package net.sf.cherry.server.fourthjobquests;

import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.StringValueHolder;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.tools.MaplePacketCreator;

public class FourthJobQuestsPortalHandler {

    public static boolean handlePortal(String name, MapleCharacter c) {
        ServernoticeMapleClientMessageCallback snmcmc = new ServernoticeMapleClientMessageCallback(5, c.getClient());
        if (name.equals(FourthJobQuests.RUSH.getValue())) {
            if ((!checkPartyLeader(c)) && (!checkRush(c))) {
                snmcmc.dropMessage("You step into the portal, but it swiftly kicks you out.");
                c.getClient().getSession().write(MaplePacketCreator.enableActions());
            }
            if ((!checkPartyLeader(c)) && (checkRush(c))) {
                snmcmc.dropMessage("You're not the party leader.");
                c.getClient().getSession().write(MaplePacketCreator.enableActions());
                return true;
            }
            if (!checkRush(c)) {
                snmcmc.dropMessage("Someone in your party is not a 4th Job warrior.");
                c.getClient().getSession().write(MaplePacketCreator.enableActions());
                return true;
            }
            c.getClient().getChannelServer().getEventSM().getEventManager("4jrush").startInstance(c.getParty(), c.getMap());
            return true;
        }
        if (name.equals(FourthJobQuests.BERSERK.getValue())) {
            if (!checkBerserk(c)) {
                snmcmc.dropMessage("The portal to the Forgotten Shrine is locked");
                c.getClient().getSession().write(MaplePacketCreator.enableActions());
                return true;
            }
            c.getClient().getChannelServer().getEventSM().getEventManager("4jberserk").startInstance(c.getParty(), c.getMap());
            return true;
        }
        return false;
    }

    private static boolean checkRush(MapleCharacter c) {
        MapleParty CsParty = c.getParty();
        Collection<MaplePartyCharacter> CsPartyMembers = CsParty.getMembers();
        for (MaplePartyCharacter mpc : CsPartyMembers) {
            if (!MapleJob.getById(mpc.getJobId()).isA(MapleJob.WARRIOR)) {
                return false;
            }
            if ((!MapleJob.getById(mpc.getJobId()).isA(MapleJob.HERO)) && (!MapleJob.getById(mpc.getJobId()).isA(MapleJob.PALADIN)) && (!MapleJob.getById(mpc.getJobId()).isA(MapleJob.DARKKNIGHT))) {
                return false;
            }
        }
        return true;
    }

    private static boolean checkPartyLeader(MapleCharacter c) {
        return c.getParty().getLeader().getId() == c.getId();
    }

    private static boolean checkBerserk(MapleCharacter c) {
        return c.haveItem(4031475, 1, false, false);
    }

    public static enum FourthJobQuests
            implements StringValueHolder {

        RUSH("s4rush"),
        BERSERK("s4berserk");
        private final String name;

        private FourthJobQuests(String Newname) {
            this.name = Newname;
        }

        public String getValue() {
            return this.name;
        }
    }
}