 package net.sf.cherry.client.messages.commands;
 
 import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.tools.performance.CPUSampler;
 
 public class ProfilingCommands
   implements Command
 {
   private static Logger log = LoggerFactory.getLogger(ProfilingCommands.class);
 
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
   {
     if (splitted[0].equalsIgnoreCase("!startProfiling")) {
       CPUSampler sampler = CPUSampler.getInstance();
       sampler.addIncluded("net.sf.odinms");
       sampler.start();
     } else if (splitted[0].equalsIgnoreCase("!stopProfiling")) {
       CPUSampler sampler = CPUSampler.getInstance();
       try {
         String filename = "odinprofile.txt";
         if (splitted.length > 1) {
           filename = splitted[1];
         }
         File file = new File(filename);
         if (file.exists()) {
           mc.dropMessage("The entered filename already exists, choose a different one");
           return;
         }
         sampler.stop();
         FileWriter fw = new FileWriter(file);
         sampler.save(fw, 1, 10);
         fw.close();
       } catch (IOException e) {
         log.error("THROW", e);
       }
       sampler.reset();
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] { 
         //new CommandDefinition("startProfiling", "", "Starts the CPU Sampling based profiler", 50),
        // new CommandDefinition("stopProfiling", "<File Name>", "Stops the Profiler and saves the results to the given fileName", 50) };
       };
     }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.ProfilingCommands
 * JD-Core Version:    0.6.0
 */