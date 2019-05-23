package net.sf.cherry.client.messages.commands;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.StringUtil;

public class TestCommands
        implements Command {

    public void execute(MapleClient c, MessageCallback mc, String[] splitted)
            throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!test")) {
            c.getSession().write(MaplePacketCreator.getPacketFromHexString("2B 00 14 30 C0 23 00 00 11 00 00 00"));
            
        } else if (splitted[0].equals("!封包调试")) {
            c.StartWindow();
        } else if (splitted[0].equals("!packet")) {
            if (splitted.length > 1) {
                if (splitted[1].equals("m")) {
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getPacketFromHexString(StringUtil.joinStringFrom(splitted, 2)));
                } else if (splitted[1].equals("p")) {
                    MapleCharacter cx = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[2]);
                    if (cx == null) {
                        mc.dropMessage(splitted[2] + " is not online or in your channel.");
                        return;
                    }

                    cx.getClient().getSession().write(MaplePacketCreator.getPacketFromHexString(StringUtil.joinStringFrom(splitted, 3)));
                } else {
                    c.getSession().write(MaplePacketCreator.getPacketFromHexString(StringUtil.joinStringFrom(splitted, 1)));
                }
            } else {
                mc.dropMessage("Please enter packet data!");
            }
        } else if (splitted[0].equalsIgnoreCase("!invismonster")) {
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.makeMonsterInvisible(c.getPlayer().getMap().getMonsterByOid(Integer.parseInt(splitted[1]))));
        } else if (splitted[0].equalsIgnoreCase("!gimmecp")) {
            if (splitted.length > 1) {
                c.getPlayer().gainCP(Integer.parseInt(splitted[1]));
            }
        } else if (splitted[0].equalsIgnoreCase("!playerdied")) {
            if (splitted.length > 2) {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.playerDiedMessage(splitted[1], Integer.parseInt(splitted[2]), c.getPlayer().getTeam()));
            }
            
        } else if (splitted[0].equals("!qsttest")) {
            c.getPlayer().startCygnusIntro();
        } else if (splitted[0].equalsIgnoreCase("!playersummoned")) {
            if (splitted.length > 3) {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.playerSummoned(splitted[1], Integer.parseInt(splitted[2]), Integer.parseInt(splitted[3])));
            }
        } else if (splitted[0].equalsIgnoreCase("!curpos")) {
            mc.dropMessage("Current position: " + c.getPlayer().getPosition().getX() + ", " + c.getPlayer().getPosition().getY());
        } else if (splitted[0].equalsIgnoreCase("!curteam")) {
            mc.dropMessage("Team: " + c.getPlayer().getTeam());
        } else if (splitted[0].equals("!fakewarp")) {
            MapleCharacter ch = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (ch == null) {
                mc.dropMessage(splitted[1] + " is not on your channel or is offline.");
                return;
            }
            ch.getClient().getSession().write(MaplePacketCreator.getWarpToMap(Integer.parseInt(splitted[2]), 0, ch));
        }
    }

  public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("test", "?", "Probably does something", 50),
            new CommandDefinition("封包调试", "?", "Probably does something", 50),
            new CommandDefinition("packet", "hex data", "Shows a clock to everyone in the map", 50),
            new CommandDefinition("invismonster", "", "", 50), new CommandDefinition("gimmecp", "", "", 50),
            new CommandDefinition("playerdied", "", "", 50), new CommandDefinition("playersummoned", "", "", 50),
            new CommandDefinition("curpos", "", "", 50), new CommandDefinition("curteam", "", "", 50),
            new CommandDefinition("curteam", "", "", 50), new CommandDefinition("mapletip", "", "", 50),
            new CommandDefinition("qsttest", "[time]", "Intro", 50),
            new CommandDefinition("fakewarp", "[chr name] [mapid]", "Makes the [chr name]'s client think they were warped to [mapid]. Note that this can cause [chr name] to seem like they're hacking!", 50)
        };
    }
}

