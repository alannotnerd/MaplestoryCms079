 package net.sf.cherry.server.maps;
 
 import java.awt.Point;
import java.util.HashMap;
import java.util.Map;

import net.sf.cherry.tools.Pair;
 
 public class MapleReactorStats
 {
   private Point tl;
   private Point br;
   private Map<Byte, StateData> stateInfo;
 
   public MapleReactorStats()
   {
     this.stateInfo = new HashMap();
   }
   public void setTL(Point tl) {
     this.tl = tl;
   }
 
   public void setBR(Point br) {
     this.br = br;
   }
 
   public Point getTL() {
     return this.tl;
   }
 
   public Point getBR() {
     return this.br;
   }
 
   public void addState(byte state, int type, Pair<Integer, Integer> reactItem, byte nextState) {
    stateInfo.put(state, new StateData(type, reactItem, nextState));
   }
 
   public byte getNextState(byte state) {
     StateData nextState = (StateData)this.stateInfo.get(Byte.valueOf(state));
     if (nextState != null) {
       return nextState.getNextState();
     }
     return -1;
   }
 
   public int getType(byte state)
   {
     StateData nextState = (StateData)this.stateInfo.get(Byte.valueOf(state));
     if (nextState != null) {
       return nextState.getType();
     }
     return -1;
   }
 
   public Pair<Integer, Integer> getReactItem(byte state)
   {
     StateData nextState = (StateData)this.stateInfo.get(Byte.valueOf(state));
     if (nextState != null) {
       return nextState.getReactItem();
     }
     return null;
   }
   private class StateData {
     private int type;
     private Pair<Integer, Integer> reactItem;
     private byte nextState;
 
              private StateData(int type, Pair<Integer, Integer> reactItem, byte nextState) {
                        this.type = type;
                       this.reactItem = reactItem;
                   this.nextState = nextState;
                   }

 
     private int getType() {
       return this.type;
     }
 
     private byte getNextState() {
       return this.nextState;
     }
 
     private Pair<Integer, Integer> getReactItem() {
       return this.reactItem;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleReactorStats
 * JD-Core Version:    0.6.0
 */