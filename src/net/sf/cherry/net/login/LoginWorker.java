 package net.sf.cherry.net.login;
 
 import java.rmi.RemoteException;
import java.util.Deque;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class LoginWorker
   implements Runnable
 {
   private static LoginWorker instance = new LoginWorker();
   private Deque<MapleClient> waiting;
   private Set<String> waitingNames;
   private List<Integer> possibleLoginHistory = new LinkedList();
   public static Logger log = LoggerFactory.getLogger(LoginWorker.class);
 
   private LoginWorker() {
     this.waiting = new LinkedList();
     this.waitingNames = new HashSet();
   }
 
   public static LoginWorker getInstance() {
     return instance;
   }
 
   public void registerClient(MapleClient c) {
     synchronized (this.waiting) {
       if ((!this.waiting.contains(c)) && (!this.waitingNames.contains(c.getAccountName().toLowerCase()))) {
         this.waiting.add(c);
         this.waitingNames.add(c.getAccountName().toLowerCase());
         c.updateLoginState(3);
       }
     }
   }
 
   public void registerGMClient(MapleClient c) {
     synchronized (this.waiting) {
       if ((!this.waiting.contains(c)) && (!this.waitingNames.contains(c.getAccountName().toLowerCase()))) {
         this.waiting.addFirst(c);
         this.waitingNames.add(c.getAccountName().toLowerCase());
         c.updateLoginState(3);
       }
     }
   }
 
   public void deregisterClient(MapleClient c) {
     synchronized (this.waiting) {
       this.waiting.remove(c);
       if (c.getAccountName() != null)
         this.waitingNames.remove(c.getAccountName().toLowerCase());
     }
   }
 
   public void updateLoad()
   {
     try {
        LoginServer.getInstance().getWorldInterface().isAvailable();
            Map<Integer, Integer> load = LoginServer.getInstance().getWorldInterface().getChannelLoad();
       double loadFactor = 1200.0D / (LoginServer.getInstance().getUserLimit() / load.size());
        for (Entry<Integer, Integer> entry : load.entrySet()) {
         load.put(entry.getKey(), Integer.valueOf(Math.min(1200, (int)(((Integer)entry.getValue()).intValue() * loadFactor))));
       }
       LoginServer.getInstance().setLoad(load);
     } catch (RemoteException ex) {
       LoginServer.getInstance().reconnectWorld();
     }
   }
 
   public void run() {
     try {
       int possibleLogins = LoginServer.getInstance().getPossibleLogins();
       LoginServer.getInstance().getWorldInterface().isAvailable();
 
       if (this.possibleLoginHistory.size() >= 300000 / LoginServer.getInstance().getLoginInterval()) {
         this.possibleLoginHistory.remove(0);
       }
       this.possibleLoginHistory.add(Integer.valueOf(possibleLogins));
 
       if ((possibleLogins == 0) && (((MapleClient)this.waiting.peek()).isGM()))
       {
         possibleLogins = 1;
       }
       for (int i = 0; i < possibleLogins; i++)
       {
         final MapleClient client;
         synchronized (this.waiting) {
           if (this.waiting.isEmpty()) {
             break;
           }
           client = (MapleClient)this.waiting.removeFirst();
         }
         this.waitingNames.remove(client.getAccountName().toLowerCase());
         if (client.finishLogin(true) == 0) {
           client.getSession().write(MaplePacketCreator.getAuthSuccess(client));
            client.setIdleTask(TimerManager.getInstance().schedule(new Runnable() {
                    //client.setIdleTask(TimerManager.getInstance().schedule(new Runnable() {

                        public void run() {
                        	System.out.println("Mak00000000000000");
                            client.getSession().close();
                        }
                    }, 10 * 60 * 10000));
                } else {
                   client.getSession().write(MaplePacketCreator.getLoginFailed(7));
                }
            }

 
            Map<Integer, Integer> load = LoginServer.getInstance().getWorldInterface().getChannelLoad();
            double loadFactor = 1200 / ((double) LoginServer.getInstance().getUserLimit() / load.size());
            for (Entry<Integer, Integer> entry : load.entrySet()) {
         load.put(entry.getKey(), Integer.valueOf(Math.min(1200, (int)(((Integer)entry.getValue()).intValue() * loadFactor))));
       }
       LoginServer.getInstance().setLoad(load);
     } catch (RemoteException ex) {
       LoginServer.getInstance().reconnectWorld();
     }
   }
 
   public double getPossibleLoginAverage() {
     int sum = 0;
     for (Integer i : this.possibleLoginHistory) {
       sum += i.intValue();
     }
     return sum / this.possibleLoginHistory.size();
   }
 
   public int getWaitingUsers() {
     return this.waiting.size();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.LoginWorker
 * JD-Core Version:    0.6.0
 */