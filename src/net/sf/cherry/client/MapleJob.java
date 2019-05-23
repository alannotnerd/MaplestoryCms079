 package net.sf.cherry.client;
 
 public enum MapleJob
 {
   BEGINNER(0), 
   新手(0),
   WARRIOR(100), 
   战士(100),
   FIGHTER(110),
   剑客(110),
   CRUSADER(111), 
   勇士(111),
   HERO(112),
   英雄(112),
   PAGE(120),
   准骑士(120),
   WHITEKNIGHT(121),
   骑士(121),
   PALADIN(122), 
   圣骑士(122),
   SPEARMAN(130),
   枪战士(130),
   DRAGONKNIGHT(131), 
   龙骑士(131),
   DARKKNIGHT(132), 
   黑骑士(132),
   MAGICIAN(200), 
   魔法师(200),
   FP_WIZARD(210), 
   火毒法师(210),
   FP_MAGE(211), 
   火毒巫师(211),
   FP_ARCHMAGE(212), 
   火毒魔导师(212),
   IL_WIZARD(220), 
   冰雷法师(220),
   IL_MAGE(221), 
   冰雷巫师(221),
   IL_ARCHMAGE(222),
   冰雷魔导师(222),
   CLERIC(230), 
   牧师(230),
   PRIEST(231),
   祭祀(231),
   BISHOP(232),
   主教(232),
   
   BOWMAN(300), 
   弓箭手(300),
   HUNTER(310),
   猎手(310),
   RANGER(311), 
   射手(311),
   BOWMASTER(312), 
   神射手(312),
   CROSSBOWMAN(320), 
   弩手(320),
   SNIPER(321),
   游侠(321),
   CROSSBOWMASTER(322),
   箭神(322),
   
   THIEF(400), 
   飞侠(400),
   ASSASSIN(410),
   刺客(410),
   HERMIT(411),
   无影人(411),
   NIGHTLORD(412),
   隐士(412),
   BANDIT(420),
   侠客(420),
   CHIEFBANDIT(421),
   独行客(421),
   SHADOWER(422),
   侠盗(422),
   
   PIRATE(500), 
   海盗(500),
   BRAWLER(510), 
   拳手(510),
   MARAUDER(511), 
   斗士(511),
   BUCCANEER(512), 
   冲锋队长(512),
   GUNSLINGER(520), 
   枪手(520),
   OUTLAW(521), 
   大副(521),
   CORSAIR(522), 
   船长(522),
   GM(900), 
   管理员(900),
   
   KNIGHT(1000), 
   初心者(1000),
   GHOST_KNIGHT(1100), 
   魂骑士1(1100),
   GHOST_KNIGHT_2(1110), 
   魂骑士2(1110),
   魂骑士3(1111),
   GHOST_KNIGHT_3(1111), 
   
   FIRE_KNIGHT(1200), 
   炎术士1(1200),
   炎术士2(1210),
   炎术士3(1211),
   FIRE_KNIGHT_2(1210), 
   FIRE_KNIGHT_3(1211), 
   
   WIND_KNIGHT(1300), 
   风灵使者1(1300),
   风灵使者2(1310),
   风灵使者3(1311),
   WIND_KNIGHT_2(1310), 
   WIND_KNIGHT_3(1311), 
   
   NIGHT_KNIGHT(1400), 
   夜行者1(1400),
   夜行者2(1410),
  夜行者3(1411), 
   NIGHT_KNIGHT_2(1410), 
   NIGHT_KNIGHT_3(1411), 
   
   THIEF_KNIGHT(1500), 
   奇袭者1(1500),
   奇袭者2(1510),
   奇袭者3(1511),
   THIEF_KNIGHT_2(1510), 
   THIEF_KNIGHT_3(1511), 
   
   Ares(2000), 
   战童(2000),
   战神1(2100),
   战神2(2110),
   战神3(2111),
   战神4(2112),
   Ares_1(2100), 
   Ares_2(2110), 
   Ares_3(2111), 
   Ares_4(2112);
 
   final int jobid;
 
   private MapleJob(int id) { this.jobid = id; }
 
   public int getId()
   {
     return this.jobid;
   }
 
   public static MapleJob getById(int id) {
     for (MapleJob l : values()) {
       if (l.getId() == id) {
         return l;
       }
     }
     return null;
   }
 
   public static MapleJob getBy5ByteEncoding(int encoded) {
     switch (encoded) {
     case 2:
       return WARRIOR;
     case 4:
       return MAGICIAN;
     case 8:
       return BOWMAN;
     case 16:
       return THIEF;
     case 32:
       return PIRATE;
     }
     return BEGINNER;
   }
 
   public boolean isA(MapleJob basejob)
   {
     return (getId() >= basejob.getId()) && (getId() / 100 == basejob.getId() / 100);
   }
 
   public String getJobNameAsString() {
     MapleJob job = this;
     if (job == BEGINNER)
       return "新手";
     if (job == THIEF)
       return "飞侠";
     if (job == WARRIOR)
       return "战士";
     if (job == MAGICIAN)
       return "魔法师";
     if (job == BOWMAN)
       return "弓箭手";
     if (job == PIRATE)
       return "海盗";
     if (job == BANDIT)
       return "侠客";
     if (job == ASSASSIN)
       return "刺客";
     if (job == SPEARMAN)
       return "枪战士";
     if (job == PAGE)
       return "准骑士";
     if (job == FIGHTER)
       return "剑客";
     if (job == CLERIC)
       return "牧师";
     if (job == IL_WIZARD)
       return "冰雷法师";
     if (job == FP_WIZARD)
       return "火毒法师";
     if (job == HUNTER)
       return "猎人";
     if (job == CROSSBOWMAN)
       return "弩弓手";
     if (job == GUNSLINGER)
       return "Gunslinger";
     if (job == BRAWLER)
       return "Brawler";
     if (job == CHIEFBANDIT)
       return "独行客";
     if (job == HERMIT)
       return "无影人";
     if (job == DRAGONKNIGHT)
       return "黑骑士";
     if (job == WHITEKNIGHT)
       return "骑士";
     if (job == CRUSADER)
       return "勇士";
     if (job == PALADIN)
       return "圣骑士";
     if (job == PRIEST)
       return "祭祀";
     if (job == IL_MAGE)
       return "冰雷/巫师";
     if (job == FP_MAGE)
       return "火毒/巫师";
     if (job == RANGER)
       return "射手";
     if (job == SNIPER)
       return "游侠";
     if (job == MARAUDER)
       return "Marauder";
     if (job == OUTLAW)
       return "Outlaw";
     if (job == SHADOWER)
       return "侠盗";
     if (job == NIGHTLORD)
       return "隐士";
     if (job == DARKKNIGHT)
       return "Dark Knight";
     if (job == HERO)
       return "英雄";
     if (job == PALADIN)
       return "圣骑士";
     if (job == IL_ARCHMAGE)
       return "魔导师/冰雷";
     if (job == FP_ARCHMAGE)
       return "魔导师/火毒";
     if (job == BOWMASTER)
       return "神射手";
     if (job == CROSSBOWMASTER)
       return "箭神";
     if (job == BUCCANEER)
       return "Buccaneer";
     if (job == CORSAIR) {
       return "Corsair";
     }
     return "管理员";
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleJob
 * JD-Core Version:    0.6.0
 */