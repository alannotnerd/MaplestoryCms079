 package net.sf.cherry.client.messages.commands;
 
 import java.rmi.RemoteException;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.world.remote.CheaterData;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class CheaterHuntingCommands
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     if (splitted[0].equals("!whosthere")) {
       MessageCallback callback = new ServernoticeMapleClientMessageCallback(c);
       StringBuilder builder = new StringBuilder("当前地图上的玩家: ");
       for (MapleCharacter chr : c.getPlayer().getMap().getCharacters()) {
         if (builder.length() > 150) {
           builder.setLength(builder.length() - 2);
           callback.dropMessage(builder.toString());
           builder = new StringBuilder();
         }
         builder.append(MapleCharacterUtil.makeMapleReadable(chr.getName()));
         builder.append(", ");
       }
       builder.setLength(builder.length() - 2);
       c.getSession().write(MaplePacketCreator.serverNotice(6, builder.toString()));
     } else if (splitted[0].equals("!扫描")) {
       try {
         List cheaters = c.getChannelServer().getWorldInterface().getCheaters();
         for (int x = cheaters.size() - 1; x >= 0; x--) {
           CheaterData cheater = (CheaterData)cheaters.get(x);
           mc.dropMessage(cheater.getInfo());
         }
       } catch (RemoteException e) {
         c.getChannelServer().reconnectWorld();
       }
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] {
        // new CommandDefinition("whosthere", "", "Gives you a list of players on your map", 50),
         //new CommandDefinition("扫描", "", "Gives you a list of cheaters", 5) };
       };
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.CheaterHuntingCommands
 * JD-Core Version:    0.6.0
 */