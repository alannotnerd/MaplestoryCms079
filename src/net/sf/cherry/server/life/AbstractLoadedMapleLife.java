 package net.sf.cherry.server.life;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.server.maps.AbstractAnimatedMapleMapObject;
 
 public abstract class AbstractLoadedMapleLife extends AbstractAnimatedMapleMapObject
 {
   private final int id;
   private int f;
   private boolean hide;
   private int fh;
   private int start_fh;
   private int cy;
   private int rx0;
   private int rx1;
   private MapleCharacter owner;
 
   public AbstractLoadedMapleLife(int id)
   {
     this.id = id;
   }
 
   public AbstractLoadedMapleLife(AbstractLoadedMapleLife life) {
     this(life.getId());
     this.f = life.f;
     this.hide = life.hide;
     this.fh = life.fh;
     this.start_fh = life.fh;
     this.cy = life.cy;
     this.rx0 = life.rx0;
     this.rx1 = life.rx1;
     this.owner = life.owner;
   }
 
   public int getF() {
     return this.f;
   }
 
   public void setF(int f) {
     this.f = f;
   }
 
   public boolean isHidden() {
     return this.hide;
   }
 
   public void setHide(boolean hide) {
     this.hide = hide;
   }
 
   public int getFh() {
     return this.fh;
   }
 
   public void setFh(int fh) {
     this.fh = fh;
   }
 
   public int getStartFh() {
     return this.start_fh;
   }
 
   public int getCy() {
     return this.cy;
   }
 
   public void setCy(int cy) {
     this.cy = cy;
   }
 
   public int getRx0() {
     return this.rx0;
   }
 
   public void setRx0(int rx0) {
     this.rx0 = rx0;
   }
 
   public int getRx1() {
     return this.rx1;
   }
 
   public void setRx1(int rx1) {
     this.rx1 = rx1;
   }
 
   public int getId() {
     return this.id;
   }
 
   public void setOwner(MapleCharacter player) {
     this.owner = player;
   }
 
   public MapleCharacter getOwner() {
     return this.owner;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.AbstractLoadedMapleLife
 * JD-Core Version:    0.6.0
 */