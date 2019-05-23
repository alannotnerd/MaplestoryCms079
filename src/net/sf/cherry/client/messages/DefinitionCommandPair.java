 package net.sf.cherry.client.messages;
 
 class DefinitionCommandPair
 {
   private Command command;
   private CommandDefinition definition;
 
   public DefinitionCommandPair(Command command, CommandDefinition definition)
   {
     this.command = command;
     this.definition = definition;
   }
 
   public Command getCommand() {
     return this.command;
   }
 
   public CommandDefinition getDefinition() {
     return this.definition;
   }
 }
