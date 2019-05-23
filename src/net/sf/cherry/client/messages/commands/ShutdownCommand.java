 package net.sf.cherry.client.messages.commands;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.server.ShutdownServer;
 
 public class ShutdownCommand
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     if (splitted[0].equals("!shutdown")) {
       int time = 60000;
       if (splitted.length > 1) {
         time = Integer.parseInt(splitted[1]) * 60000;
       }
       CommandProcessor.forcePersisting();
       c.getChannelServer().shutdown(time);
     } else if (splitted[0].equals("!shutdownworld")) {
       int time = 60000;
       if (splitted.length > 1) {
         time = Integer.parseInt(splitted[1]) * 60000;
       }
       CommandProcessor.forcePersisting();
       c.getChannelServer().shutdownWorld(time);
     }
     else if (splitted[0].equals("!shutdownnow")) {
       CommandProcessor.forcePersisting();
       new ShutdownServer(c.getChannel()).run();
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] { 
         new CommandDefinition("shutdown", "[when in Minutes]", "Shuts down the current channel - don't use atm", 1000),
         new CommandDefinition("shutdownnow", "", "Shuts down the current channel now", 1000),
         new CommandDefinition("shutdownworld", "[when in Minutes]", "Cleanly shuts down all channels and the loginserver of this world", 500) 
     };
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.ShutdownCommand
 * JD-Core Version:    0.6.0
 */