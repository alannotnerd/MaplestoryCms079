 package net.sf.cherry.server;
 
 import java.rmi.RemoteException;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
 
 public class ShutdownServer
   implements Runnable
 {
   private static Logger log = LoggerFactory.getLogger(ShutdownServer.class);
   private int myChannel;
 
   public ShutdownServer(int channel)
   {
     this.myChannel = channel;
   }
 
   public void run()
   {
     try {
       ChannelServer.getInstance(this.myChannel).shutdown();
     } catch (Throwable t) {
       log.error("SHUTDOWN ERROR", t);
     }
 
     int c = 200;
     while ((ChannelServer.getInstance(this.myChannel).getConnectedClients() > 0) && (c > 0)) {
       try {
         Thread.sleep(100L);
       } catch (InterruptedException e) {
         log.error("ERROR", e);
       }
       c--;
     }
     try {
       ChannelServer.getWorldRegistry().deregisterChannelServer(this.myChannel);
     }
     catch (RemoteException e) {
     }
     try {
       ChannelServer.getInstance(this.myChannel).unbind();
     } catch (Throwable t) {
       log.error("SHUTDOWN ERROR", t);
     }
 
     boolean allShutdownFinished = true;
     for (ChannelServer cserv : ChannelServer.getAllInstances()) {
       if (!cserv.hasFinishedShutdown()) {
         allShutdownFinished = false;
       }
     }
     if (allShutdownFinished) {
       TimerManager.getInstance().stop();
       try {
         DatabaseConnection.closeAll();
       } catch (SQLException e) {
         log.error("THROW", e);
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.ShutdownServer
 * JD-Core Version:    0.6.0
 */