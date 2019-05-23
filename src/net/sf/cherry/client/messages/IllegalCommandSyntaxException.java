 package net.sf.cherry.client.messages;
 
 public class IllegalCommandSyntaxException extends Exception
 {
   private static final long serialVersionUID = 1L;
 
   public IllegalCommandSyntaxException()
   {
   }
 
   public IllegalCommandSyntaxException(String message)
   {
     super(message);
   }
 
   public IllegalCommandSyntaxException(int expectedArguments) {
     super("Expected at least " + expectedArguments + " arguments");
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.IllegalCommandSyntaxException
 * JD-Core Version:    0.6.0
 */