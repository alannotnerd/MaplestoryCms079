 package net.sf.cherry.net.world;
 
 import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
 
 public class CharacterIdChannelPair
   implements Externalizable
 {
   private int charid;
   private int channel;
 
   public CharacterIdChannelPair()
   {
   }
 
   public CharacterIdChannelPair(int charid, int channel)
   {
     this.charid = charid;
     this.channel = channel;
   }
 
   public int getCharacterId() {
     return this.charid;
   }
 
   public int getChannel() {
     return this.channel;
   }
 
   public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException
   {
     this.charid = in.readInt();
     this.channel = in.readByte();
   }
 
   public void writeExternal(ObjectOutput out) throws IOException
   {
     out.writeInt(this.charid);
     out.writeByte(this.channel);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.CharacterIdChannelPair
 * JD-Core Version:    0.6.0
 */