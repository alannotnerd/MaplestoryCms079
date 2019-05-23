 package net.sf.cherry.server.quest;
 
 public enum MapleQuestRequirementType
 {
   UNDEFINED(-1), JOB(0), ITEM(1), QUEST(2), MIN_LEVEL(3), MAX_LEVEL(4), END_DATE(5), MOB(6), NPC(7), FIELD_ENTER(8), INTERVAL(9), SCRIPT(10), PET(11), MIN_PET_TAMENESS(12), MONSTER_BOOK(13), COMPLETE_QUEST(14);
 
   final byte type;
 
   public MapleQuestRequirementType getItem() { return ITEM;
   }
 
   private MapleQuestRequirementType(int type)
   {
     this.type = (byte)type;
   }
 
   public byte getType() {
     return this.type;
   }
 
   public static MapleQuestRequirementType getByType(byte type) {
     for (MapleQuestRequirementType l : values()) {
       if (l.getType() == type) {
         return l;
       }
     }
     return null;
   }
 
   public static MapleQuestRequirementType getByWZName(String name) {
     if (name.equals("job"))
       return JOB;
     if (name.equals("quest"))
       return QUEST;
     if (name.equals("item"))
       return ITEM;
     if (name.equals("lvmin"))
       return MIN_LEVEL;
     if (name.equals("lvmax"))
       return MAX_LEVEL;
     if (name.equals("end"))
       return END_DATE;
     if (name.equals("mob"))
       return MOB;
     if (name.equals("npc"))
       return NPC;
     if (name.equals("fieldEnter"))
       return FIELD_ENTER;
     if (name.equals("interval"))
       return INTERVAL;
     if (name.equals("startscript"))
       return SCRIPT;
     if (name.equals("endscript"))
       return SCRIPT;
     if (name.equals("pet"))
       return PET;
     if (name.equals("pettamenessmin"))
       return MIN_PET_TAMENESS;
     if (name.equals("mbmin"))
       return MONSTER_BOOK;
     if (name.equals("questComplete")) {
       return COMPLETE_QUEST;
     }
     return UNDEFINED;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.quest.MapleQuestRequirementType
 * JD-Core Version:    0.6.0
 */