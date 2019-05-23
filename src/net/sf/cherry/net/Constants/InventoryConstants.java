 package net.sf.cherry.net.Constants;
 
 public final class InventoryConstants
 {
   public static final boolean isTimelessWeapon(int itemId)
   {
     return true;
   }
 
   public static final boolean isTimelessArmor(int itemId) {
     return (itemId >= 1002776) && (itemId <= 1002780);
   }
 
   public static final boolean isThrowingStar(int itemId) {
     return itemId / 10000 == 207;
   }
 
   public static final boolean isBullet(int itemId) {
     return itemId / 10000 == 233;
   }
 
   public static final boolean isRechargable(int itemId) {
     return (itemId / 10000 == 233) || (itemId / 10000 == 207);
   }
 
   public static final boolean isArrowForCrossBow(int itemId) {
     return itemId / 1000 == 2061;
   }
 
   public static final boolean isArrowForBow(int itemId) {
     return itemId / 1000 == 2060;
   }
 
   public static final class Items
   {
     public static final class Ratios
     {
       public static final float ITEM_ARMOR_EXP = 0.0F;
       public static final float ITEM_WEAPON_EXP = 0.0F;
     }
 
     public static final class Flags
     {
       public static final int LOCK = 1;
       public static final int SPIKES = 2;
       public static final int COLD = 4;
       public static final int UNTRADEABLE = 8;
       public static final int KARMA = 16;
       public static final int PET_COME = 128;
       public static final int UNKNOWN_SKILL = 256;
 
       public static final int getFlagByInt(int type)
       {
         if (type == 128)
           return 128;
         if (type == 256) {
           return 256;
         }
         return 0;
       }
     }
   }
 
   public static final class EquipSlots
   {
     public static final byte WEAPON = -11;
     public static final byte MOUNT = -18;
     public static final byte BOTTOM = -6;
     public static final byte SHIELD = -10;
     public static final byte MEDAL = -46;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.constants.InventoryConstants
 * JD-Core Version:    0.6.0
 */