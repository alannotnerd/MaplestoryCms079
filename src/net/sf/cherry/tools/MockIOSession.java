 package net.sf.cherry.tools;
 
 import java.net.SocketAddress;

import org.apache.mina.common.CloseFuture;
import org.apache.mina.common.IoFilter.WriteRequest;
import org.apache.mina.common.IoFilterChain;
import org.apache.mina.common.IoHandler;
import org.apache.mina.common.IoService;
import org.apache.mina.common.IoServiceConfig;
import org.apache.mina.common.IoSessionConfig;
import org.apache.mina.common.TransportType;
import org.apache.mina.common.WriteFuture;
import org.apache.mina.common.support.BaseIoSession;

import net.sf.cherry.net.MaplePacket;
 
 public class MockIOSession extends BaseIoSession
 {
   protected void updateTrafficMask()
   {
   }
 
   public IoSessionConfig getConfig()
   {
     return null;
   }
 
   public IoFilterChain getFilterChain()
   {
     return null;
   }
 
   public IoHandler getHandler()
   {
     return null;
   }
 
   public SocketAddress getLocalAddress()
   {
     return null;
   }
 
   public SocketAddress getRemoteAddress()
   {
     return null;
   }
 
   public IoService getService()
   {
     return null;
   }
 
   public SocketAddress getServiceAddress()
   {
     return null;
   }
 
   public IoServiceConfig getServiceConfig()
   {
     return null;
   }
 
   public TransportType getTransportType()
   {
     return null;
   }
 
   public CloseFuture close()
   {
     return null;
   }
 
   protected void close0()
   {
   }
 
   public WriteFuture write(Object message, SocketAddress remoteAddress)
   {
     return null;
   }
 
   public WriteFuture write(Object message)
   {
     if ((message instanceof MaplePacket)) {
       MaplePacket mp = (MaplePacket)message;
       if (mp.getOnSend() != null) {
         mp.getOnSend().run();
       }
     }
     return null;
   }
 
   protected void write0(WriteRequest writeRequest) {
   {
   }
 }}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.MockIOSession
 * JD-Core Version:    0.6.0
 */