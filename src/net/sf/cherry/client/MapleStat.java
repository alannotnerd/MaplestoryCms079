 package net.sf.cherry.client;
 
 import net.sf.cherry.net.IntValueHolder;
 
 public enum MapleStat
   implements IntValueHolder
 {
    SKIN(0x1),
    FACE(0x2),
    HAIR(0x4),
    Un_1(0x8),
    
    Un_2(0x10),
    Un_3(0x20),
    LEVEL(0x40),
    JOB(0x80),
    
    STR(0x100),
    DEX(0x200),
    INT(0x400),
    LUK(0x800),
    
    HP(0x1000),
    MAXHP(0x2000),
    MP(0x4000),
    MAXMP(0x8000),
    
    AVAILABLEAP(0x10000),
    AVAILABLESP(0x20000),
    EXP(0x40000),
    FAME(0x80000),
    
    MESO(0x100000),
    PET(0x200000),
	Un_4(0x400000),
	Un_5(0x800000),
	
	Un_6(0x1000000),
	Un_7(0x2000000),
	Un_8(0x4000000),
	Un_9(0x8000000),
	
	Un_10(0x10000000),
	Un_11(0x20000000),
	Un_12(0x40000000),
	Un_13(0x80000000)
	;
 
   private final int i;
 
   private MapleStat(int i) { this.i = i;
   }
 
   public int getValue()
   {
     return this.i;
   }
 
   public static MapleStat getByValue(int value) {
     for (MapleStat stat : values()) {
       if (stat.getValue() == value) {
         return stat;
       }
     }
     return null;
   }
 }