 package net.sf.cherry.client.messages;
 
 public class CommandDefinition
 {
   private String command;
   private String parameterDescription;
   private String help;
   private int requiredLevel;
 
   public CommandDefinition(String command, String parameterDescription, String help, int requiredLevel)
   {
     this.command = command;
     this.help = help;
     this.parameterDescription = parameterDescription;
     this.requiredLevel = requiredLevel;
   }
 
   public String getCommand() {
     return this.command;
   }
 
   public String getHelp() {
     return this.help;
   }
 
   public String getParameterDescription() {
     return this.parameterDescription;
   }
 
   public int getRequiredLevel() {
     return this.requiredLevel;
   }
 }