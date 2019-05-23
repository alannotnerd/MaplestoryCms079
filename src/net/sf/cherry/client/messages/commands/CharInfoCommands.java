 package net.sf.cherry.client.messages.commands;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
 
 public class CharInfoCommands
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     if (splitted[0].equalsIgnoreCase("!坐标"))
       mc.dropMessage("你当前的坐标是: " + c.getPlayer().getPosition().x + " x   " + c.getPlayer().getPosition().y + " y ");
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] {
         //new CommandDefinition("坐标", "", "Shows your character's coordinates", 1) };
   };

   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.CharInfoCommands
 * JD-Core Version:    0.6.0
 */