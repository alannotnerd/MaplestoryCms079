 package net.sf.cherry.scripting.map;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapScriptMethods
 {
   private MapleClient c;
 
   public MapScriptMethods(MapleClient c)
   {
     this.c = c;
   }
 
   protected MapleClient getClient() {
     return this.c;
   }
 
   public MapleCharacter getPlayer() {
     return this.c.getPlayer();
   }
 
   public void Adventure() {
     this.c.getSession().write(MaplePacketCreator.lockUI(true));
     if (this.c.getPlayer().getGender() == 0)
       this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goAdventure/Scene0", -1));
     else
       this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction3.img/goAdventure/Scene1", -1));
   }
 
   public void displayAranIntro()
   {
     switch (this.c.getPlayer().getMapId()) {
     case 914090010:
       this.c.getSession().write(MaplePacketCreator.lockUI(true));
       this.c.getSession().write(MaplePacketCreator.disableUI(true));
       this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene0", -1));
       break;
     case 914090011:
       if (this.c.getPlayer().getGender() == 0) {
         this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene10", -1));
       }
       else
         this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene11", -1));
       break;
     case 914090012:
       if (this.c.getPlayer().getGender() == 0) {
         this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene20", -1));
       }
       else
         this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene21", -1));
       break;
     case 914090013:
       this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/Scene3", -1));
       break;
     case 914090100:
       this.c.getSession().write(MaplePacketCreator.lockUI(true));
       this.c.getSession().write(MaplePacketCreator.disableUI(true));
       this.c.getSession().write(MaplePacketCreator.showWZEffectS("Effect/Direction1.img/aranTutorial/HandedPoleArm" + this.c.getPlayer().getGender(), -1));
     }
   }
 
   public void arriveIceCave()
   {
     unlockUI();
     this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 0, 0);
     this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 0, 0);
     this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 0, 0);
     this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 0, 0);
     this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 0, 0);
     this.c.getPlayer().setRemainingSp(0);
 
     this.c.getSession().write(MaplePacketCreator.showWZEffect("Effect/Direction1.img/aranTutorial/ClickLilin", -1));
   }
 
   public void lockUI()
   {
     this.c.getPlayer(); MapleCharacter.tutorial = true;
     this.c.getSession().write(MaplePacketCreator.lockUI(true));
     this.c.getSession().write(MaplePacketCreator.disableUI(true));
   }
 
   public void unlockUI()
   {
     this.c.getPlayer(); MapleCharacter.tutorial = false;
     this.c.getSession().write(MaplePacketCreator.lockUI(false));
     this.c.getSession().write(MaplePacketCreator.disableUI(false));
   }
 
   public boolean inIntro()
   {
     this.c.getPlayer(); return MapleCharacter.tutorial;
   }
 
   public void enterRien() {
     if ((this.c.getPlayer().getJob().getId() == 2100) && (!this.c.getPlayer().getAranIntroState("ck=1"))) {
       this.c.getPlayer().addAreaData(21019, "miss=o;arr=o;ck=1;helper=clear");
       this.c.getSession().write(MaplePacketCreator.updateIntroState("miss=o;arr=o;ck=1;helper=clear", 21019));
       unlockUI();
     }
   }
 
   public void showWZEffect(String path, int info) {
     this.c.getSession().write(MaplePacketCreator.showWZEffect(path, info));
   }
 
   public void showWZEffectS(String path, int info) {
     this.c.getSession().write(MaplePacketCreator.showWZEffectS(path, info));
   }
 
   public void playWZSound(String path) {
     this.c.getSession().write(MaplePacketCreator.playWZSound(path));
   }
 
   public void updateQuest(int questid, String status) {
     this.c.getSession().write(MaplePacketCreator.updateQuest(questid, status));
   }
 
   public void displayGuide(int guide) {
     this.c.getSession().write(MaplePacketCreator.displayGuide(guide));
   }
 
   public void removeTutorialSummon() {
     this.c.getSession().write(MaplePacketCreator.spawnTutorialSummon(0));
   }
 
   public void tutorialSpeechBubble(String message) {
     this.c.getSession().write(MaplePacketCreator.tutorialSpeechBubble(message));
   }
 
   public void showInfo(String message) {
     this.c.getSession().write(MaplePacketCreator.showInfo(message));
   }
 
   public void showMapEffect(String path) {
     this.c.getSession().write(MaplePacketCreator.showMapEffect(path));
   }
 }
