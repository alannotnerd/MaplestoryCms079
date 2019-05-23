 package net.sf.cherry.server.maps;
 
 public enum SavedLocationType
 {
   MONSTER_CARNIVAL, 
   FREE_MARKET, 
   WORLDTOUR, 
   FLORINA, 
   CYGNUSINTRO, 
   DOJO, 
   PVP, 
   AMORIA,
   FISHING,  //钓鱼地图
   Pachinko_port;
   //怪物嘉年华       自由市场    
 
   public static SavedLocationType fromString(String Str) {
     return valueOf(Str);
   }
 }

