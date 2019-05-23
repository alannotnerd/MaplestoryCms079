 package net.sf.cherry.net.mina;
 
 import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;
 
 public class MapleCodecFactory
   implements ProtocolCodecFactory
 {
   private final ProtocolEncoder encoder;
   private final ProtocolDecoder decoder;
 
   public MapleCodecFactory()
   {
     this.encoder = new MaplePacketEncoder();
     this.decoder = new MaplePacketDecoder();
   }
 
   public ProtocolEncoder getEncoder() throws Exception {
     return this.encoder;
   }
 
   public ProtocolDecoder getDecoder() throws Exception {
     return this.decoder;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.mina.MapleCodecFactory
 * JD-Core Version:    0.6.0
 */