 package net.sf.cherry.server;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleOxQuiz
 {
   private int round = 1;
   private int question = 1;
   private MapleMap map = null;
   private long delay = 5000L;
   private int expGain = 200;
 
   public MapleOxQuiz(MapleMap map, int round, int question) {
     this.map = map;
     this.round = round;
     this.question = question;
   }
 
   public void checkAnswers() {
     for (MapleCharacter chr : this.map.getCharacters()) {
       double x = chr.getPosition().getX();
       double y = chr.getPosition().getY();
       int answer = MapleOxQuizFactory.getOXAnswer(this.round, this.question);
       boolean correct = false;
       if ((x > -234.0D) && (y > -26.0D)) {
         if (answer == 0) {
           chr.dropMessage("Correct!");
           correct = true;
         } else {
           chr.dropMessage("Incorrect!");
         }
       } else if ((x < -234.0D) && (y > -26.0D)) {
         if (answer == 1) {
           chr.dropMessage("Correct!");
           correct = true;
         } else {
           chr.dropMessage("Incorrect!");
         }
       }
       if (correct) {
         chr.gainExp(this.expGain * chr.getClient().getChannelServer().getExpRate(), true, false);
       } else {
         chr.setHp(0);
         chr.updateSingleStat(MapleStat.HP, 0);
       }
     }
   }
 
   public void scheduleOx() {
     TimerManager.getInstance().schedule(new Runnable()
     {
       public void run() {
         MapleOxQuiz.this.map.broadcastMessage(MaplePacketCreator.serverNotice(6, MapleOxQuizFactory.getOXQuestion(MapleOxQuiz.this.round, MapleOxQuiz.this.question)));
         TimerManager.getInstance().schedule(new Runnable()
         {
           public void run() {
             MapleOxQuiz.this.checkAnswers();
             MapleOxQuiz.this.scheduleAnswer(MapleOxQuiz.this.map);
           }
         }
         , 15000L);
       }
     }
     , this.delay);
   }
 
    public void scheduleAnswer(final MapleMap map) {
        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                map.broadcastMessage(MaplePacketCreator.serverNotice(6, MapleOxQuizFactory.getOXExplain(round, question)));
                if (map.getOx() != null) { // Set next one if Ox Quiz is still active.
                    scheduleOx();
                } else {
                    map.broadcastMessage(MaplePacketCreator.serverNotice(6, "Ox Quiz Deactivated"));
                }
            }
        }, 1 * 1000);
        doQuestion(); // After we give the response, next question
    }
 
   public void doQuestion() {
     if ((this.round == 1) && (this.question == 29))
       this.question = 100;
     else if ((this.round == 2) && (this.question == 17))
       this.question = 100;
     else if ((this.round == 3) && (this.question == 17))
       this.question = 100;
     else if ((this.round == 4) && (this.question == 12))
       this.question = 100;
     else if ((this.round == 5) && (this.question == 26))
       this.question = 100;
     else if ((this.round == 6) && (this.question == 16))
       this.question = 100;
     else if ((this.round == 7) && (this.question == 16))
       this.question = 100;
     else if ((this.round == 8) && (this.question == 12))
       this.question = 100;
     else if ((this.round == 9) && (this.question == 44))
       this.question = 100;
     else
       this.question += 1;
   }
 
   public int getRound()
   {
     return this.round;
   }
 
   public int getQuestion() {
     return this.question;
   }
 
   public MapleMap getMap() {
     return this.map;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleOxQuiz
 * JD-Core Version:    0.6.0
 */