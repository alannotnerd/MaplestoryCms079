 package net.sf.cherry.client.messages.commands;
 
 import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.net.channel.ChannelServer;
 
 public class SaveAllCommand
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     if (splitted[0].equals("!saveall")) {
       Collection<ChannelServer> ccs = ChannelServer.getAllInstances();
       for (ChannelServer chan : ccs) {
         mc.dropMessage("Saving characters on channel " + chan.getChannel());
         if (chan != null) {
           Collection<MapleCharacter> chars = new LinkedHashSet(Collections.synchronizedCollection(chan.getPlayerStorage().getAllCharacters()));
           synchronized (chars) {
             for (MapleCharacter chr : chars) {
               try {
                 if (chr != null)
                   chr.saveToDB(true);
               } catch (Exception e) {
               }
               continue;
             }
           }
         }
       }
       mc.dropMessage("All characters have been saved.");
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] { 
         new CommandDefinition("saveall", "", "Saves all characters", 3) 
     };
   }
 }
