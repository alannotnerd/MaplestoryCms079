
package net.sf.cherry.server.maps;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleBuffStat;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.client.status.MonsterStatusEffect;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.scripting.map.MapScriptManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleOxQuiz;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.SpeedRankings;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleNPC;
import net.sf.cherry.server.life.SpawnPoint;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;

public class MapleMap {

    private static final int MAX_OID = 20000;
    private static final List<MapleMapObjectType> rangedMapobjectTypes = Arrays.asList(MapleMapObjectType.ITEM, MapleMapObjectType.MONSTER, MapleMapObjectType.DOOR, MapleMapObjectType.SUMMON, MapleMapObjectType.REACTOR);
    /**
     * Holds a mapping of all oid -> MapleMapObject on this map. mapobjects is
     * NOT a synchronized collection since it has to be synchronized together
     * with runningOid that's why all access to mapobjects have to be done
     * trough an explicit synchronized block
     */
    private Map<Integer, MapleMapObject> mapobjects = new LinkedHashMap<Integer, MapleMapObject>();
    private Collection<SpawnPoint> monsterSpawn = new LinkedList<SpawnPoint>();
    private AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private Collection<MapleCharacter> characters = new LinkedHashSet<MapleCharacter>();
    private Collection<MapleCharacter> accounts = new LinkedHashSet<MapleCharacter>();
    private Collection<MapleClient> mapleclient = new LinkedHashSet<MapleClient>();
    private Map<Integer, MaplePortal> portals = new HashMap<Integer, MaplePortal>();
    private List<Rectangle> areas = new ArrayList<Rectangle>();
    private MapleFootholdTree footholds = null;
    private int mapid;
    private int runningOid = 100;
    private int returnMapId;
    private int channel;
    private float monsterRate;
    private boolean dropsDisabled = false;
    private boolean clock;
    private boolean boat;
    private boolean docked;
    private String mapName;
    private String streetName;
    private MapleMapEffect mapEffect = null;
    private boolean everlast = false;
    private int forcedReturnMap = 999999999;
    private int timeLimit;
    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleMap.class);
    private MapleMapTimer mapTimer = null;
    private int dropLife = 180000; // 以毫秒为单位掉落后消失的时间
    private int decHP = 0;
    private int protectItem = 0;
    private boolean town;
    private boolean Target;
    private boolean allowShops;
    private boolean hasEvent;
    private float origMobRate;
    private MapleOxQuiz ox = null;
    private ScheduledFuture<?> spawnWorker = null;
    private boolean muted;
    private boolean lootable = true;
    private boolean canEnter = true;
    private boolean canExit = true;
    private boolean cannotInvincible = false;
    private boolean canVipRock = true;
    private int fieldLimit = 0;
    private int fieldType;
    private String onUserEnter, onFirstUserEnter;
    private int timeMobId;
    private String timeMobMessage = "";
    private Point lastMonsterMove;
    private int monsterMoveCount;
    private int getHour;
    private MapleInventory[] inventory;

    public MapleMap(int mapid, int channel, int returnMapId, float monsterRate) {
        this.mapid = mapid;
        this.channel = channel;
        this.returnMapId = returnMapId;
        this.monsterRate = monsterRate;
        this.origMobRate = monsterRate;

        if (monsterRate > 0) {
            spawnWorker = TimerManager.getInstance().register(new RespawnWorker(), 7000);
        }
    }

    public Iterable<MapleMapObject> getAllPlayer() {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public void respawn() {
        if (characters.size() == 0) {
            return;
        }
        int numShouldSpawn = (monsterSpawn.size() - spawnedMonstersOnMap.get()) * Math.round(monsterRate);
        if (numShouldSpawn > 0) {
            List<SpawnPoint> randomSpawn = new ArrayList<SpawnPoint>(monsterSpawn);
            Collections.shuffle(randomSpawn);
            int spawned = 0;

            for (SpawnPoint spawnPoint : randomSpawn) {
                if (spawnPoint.shouldSpawn()) {
                    spawnPoint.spawnMonster(MapleMap.this);
                    spawned++;
                }
                if (spawned >= numShouldSpawn) {
                    break;
                }
            }
        }
    }

    public boolean canEnter() {
        return canEnter;
    }

    public boolean canExit() {
        return canExit;
    }

    public void setCanEnter(boolean b) {
        canEnter = b;
    }

    public void setCanExit(boolean b) {
        canExit = b;
    }

    public void toggleDrops() {
        dropsDisabled = !dropsDisabled;
    }

    public MapleMap getReturnMap() {
        return ChannelServer.getInstance(this.channel).getMapFactory().getMap(this.returnMapId);
    }

    public int getHour() {
        return Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
    }

    public int getMin() {
        return Calendar.getInstance().get(Calendar.MINUTE);
    }

    public int getSec() {
        return Calendar.getInstance().get(Calendar.SECOND);
    }

    public int getId() {
        return mapid;
    }

    public int getReturnMapId() {
        return returnMapId;
    }

    public int getForcedReturnId() {
        return forcedReturnMap;
    }

    public MapleMap getForcedReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(forcedReturnMap);
    }

    public void setForcedReturnMap(int map) {
        this.forcedReturnMap = map;
    }

    public int getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public boolean getMuted() {
        return muted;
    }

    public void setMuted(boolean isMuted) {
        this.muted = isMuted;
    }

    public boolean isLootable() {
        return lootable;
    }

    public void setLootable(boolean loot) {
        this.lootable = loot;
    }

    public int getCurrentPartyId() {
        for (MapleCharacter chr : this.getCharacters()) {
            if (chr.getPartyId() != -1) {
                return chr.getPartyId();
            }
        }
        return -1;
    }

    public void addMapObject(MapleMapObject mapobject) {
        synchronized (this.mapobjects) {
            mapobject.setObjectId(runningOid);
            this.mapobjects.put(Integer.valueOf(runningOid), mapobject);
            incrementRunningOid();
        }
    }

    public void broadcastGMMessage(MapleCharacter source, MaplePacket packet, boolean repeatToSource) {
        broadcastGMMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getPosition());
    }

    private void broadcastGMMessage(MapleCharacter source, MaplePacket packet, double rangeSq, Point rangedFrom) {
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                if (chr != source && chr.gmLevel() > 0) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getPosition()) <= rangeSq) {
                            chr.getClient().getSession().write(packet);
                        }
                    } else {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        }
    }

    private void spawnAndAddRangedMapObject(MapleMapObject mapobject, DelayedPacketCreation packetbakery, SpawnCondition condition) {
        synchronized (this.mapobjects) {
            mapobject.setObjectId(runningOid);

            synchronized (characters) {
                for (MapleCharacter chr : characters) {
                    if (condition == null || condition.canSpawn(chr)) {
                        if (chr.getPosition().distanceSq(mapobject.getPosition()) <= MapleCharacter.MAX_VIEW_RANGE_SQ) {
                            packetbakery.sendPackets(chr.getClient());
                            chr.addVisibleMapObject(mapobject);
                        }
                    }
                }
            }

            this.mapobjects.put(Integer.valueOf(runningOid), mapobject);
            incrementRunningOid();
        }
    }

    public void spawnMesoDrop(final int meso, Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean ffaLoot) {
        TimerManager tMan = TimerManager.getInstance();
        final Point droppos = calcDropPos(position, position);
        final MapleMapItem mdrop = new MapleMapItem(meso, droppos, dropper, owner);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.dropMesoFromMapObject(meso, mdrop.getObjectId(), dropper.getObjectId(),
                        ffaLoot ? 0 : owner.getId(), dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        tMan.schedule(new ExpireMapItemJob(mdrop), dropLife);
    }

    private void incrementRunningOid() {
        runningOid++;
        for (int numIncrements = 1; numIncrements < MAX_OID; numIncrements++) {
            if (runningOid > MAX_OID) {
                runningOid = 100;
            }
            if (this.mapobjects.containsKey(Integer.valueOf(runningOid))) {
                runningOid++;
            } else {
                return;
            }
        }
        throw new RuntimeException("Out of OIDs on map " + mapid + " (channel: " + channel + ")");
    }

    public void mapMessage(int type, String message) {
        broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void removeMapObject(int num) {
        synchronized (this.mapobjects) {
            if (mapobjects.containsKey(num)) {
                this.mapobjects.remove(Integer.valueOf(num));
            }
        }
    }

    public void removeMapObject(MapleMapObject obj) {
        removeMapObject(obj.getObjectId());
    }

    private Point calcPointBelow(Point initial) {
        MapleFoothold fh = footholds.findBelow(initial);
        if (fh == null) {
            return null;
        }
        int dropY = fh.getY1();
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            double s1 = Math.abs(fh.getY2() - fh.getY1());
            double s2 = Math.abs(fh.getX2() - fh.getX1());
            double s4 = Math.abs(initial.x - fh.getX1());
            double alpha = Math.atan(s2 / s1);
            double beta = Math.atan(s1 / s2);
            double s5 = Math.cos(alpha) * (s4 / Math.cos(beta));
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) s5;
            } else {
                dropY = fh.getY1() + (int) s5;
            }
        }
        return new Point(initial.x, dropY);
    }

    private Point calcDropPos(Point initial, Point fallback) {
        Point ret = calcPointBelow(new Point(initial.x, initial.y - 99));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }
    private void GetDropsFromMonster_特殊事件(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    //非事件地图掉落
	//  if (dropOwner.getEventInstance() == null) {
	//      int chance = (int) (Math.random() * 100);
	//      if (chance < 10) { //10% chance of getting a maple leaf
	//          toDrop.add(4001126); //枫叶  4031875永恒的雪花
	//      }
	//      if (chance < 8) {
	//          toDrop.add(4280000); //永恒的谜之蛋
	//          toDrop.add(4280001); //重生的谜之蛋
	//          //toDrop.add(2370012); //孙子兵法
	//      }
	//  }
    }
    
    
    private void GetDropsFromMonster_特殊物品(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    	 if (dropOwner.getItemQuantity(5220008, true) >= 1) { //幸运道符
             int chance = (int) (Math.random() * 100);
             toDrop.add(2370012);
             if (chance < 3) {
                 toDrop.add(2370005);//5000
             }
             if (chance < 8) {
                 toDrop.add(2370007);//2000
             }
             if (chance < 10) {
                 toDrop.add(2370008);//1000/
             }
             if (chance < 40) {
                 toDrop.add(2370009);//500
                 toDrop.add(2370010);//300
             }
             dropOwner.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "消耗了[幸运道符] 1个，打猎获得额外经验包。"));
             MapleInventoryManipulator.removeById(dropOwner.getClient(), MapleItemInformationProvider.getInstance().getInventoryType(5220008), 5220008, 1, true, false);
         }
    }
    private void GetDropsFromMonster_任务(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    	/*野外任务爆率*/
        if (dropOwner.getQuest(MapleQuest.getInstance(2084)).getStatus().equals(MapleQuestStatus.Status.STARTED)) { //接了任务
            if (monster.getId() == 3110100 || monster.getId() == 5130103) { //鳄鱼 黑鳄鱼
                int chance = (int) (Math.random() * 100);
                if (chance < 70) {
                    toDrop.add(4031164); //皮革
                }
            }
        }
        /*新手任务 - 石球碎片*/
        if (dropOwner.getQuest(MapleQuest.getInstance(1035)).getStatus().equals(MapleQuestStatus.Status.STARTED)) { //接了任务
            if (monster.getId() == 9300018) {
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031802); //爆出任务碎片
                }
            }
        }
        /*四转任务  - 暴风箭雨*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6250)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() >= 9500164 && monster.getId() <= 9500166 || monster.getId() >= 9300261 || monster.getId() <= 9300263) {
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031465);//手套
                }
            }
        }
        /*四转任务 - 穿透箭*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6251)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() >= 9500164 && monster.getId() <= 9500166 || monster.getId() >= 9300261 || monster.getId() <= 9300263) {
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031487);//手套
                }
            }
        }
        /*四转任务 - 灵魂的魔法阵*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6251)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8170000 || monster.getId() == 9600035) {
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031453);//魔方证
                }
            }
        }
        /*四转任务 -灵魂契约书*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6251)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8160000 || monster.getId() == 9600034) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031474); //灵魂契约书
                }
            }
        }
        /*四转任务 - 法师冰霜 - 冰冷的狼人心脏*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6168)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8140000 || monster.getId() == 9500132) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 200) {
                    toDrop.add(4031460); //灵魂契约书
                }
            }
        }
        /*异界钥匙 四转任务*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6316)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8160000) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 180) {
                    toDrop.add(4031496); //灵魂契约书
                }
            }
        }
        /*四转任务 - 海盗*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6340)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8140701) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031872);
                }
            }
        }
        if (dropOwner.getQuest(MapleQuest.getInstance(6350)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() == 8140700) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 120) {
                    toDrop.add(4031871);
                }
            }
        }
        /*四转任务 -- 时空变形*/
        if (dropOwner.getQuest(MapleQuest.getInstance(6360)).getStatus().equals(MapleQuestStatus.Status.STARTED)) {//接了任务
            if (monster.getId() >= 8500001 && monster.getId() <= 8500002) {//时间门神  - 灵魂祝福
                int chance = (int) (Math.random() * 100);
                if (chance < 10) {
                    toDrop.add(4031869); //帕普拉图斯的钥匙
                }
            }
        }
    	
   }
    private void GetDropsFromMonster_特殊怪物(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    	//地狱大公爆率设置
        if (monster.getId() == 9400633) { //地狱大公 HP 180,000  LEVEL 32 MP 500 EXP 5,250
            int chance = (int) (Math.random() * 12);
            if (chance < 40) {
                toDrop.add(1302133); //单手剑
                toDrop.add(1402072);//双手剑
                toDrop.add(1332099);//短剑
                toDrop.add(1372058);//短杖
                toDrop.add(1372058);//长杖
                toDrop.add(1412046);//斧
                toDrop.add(1432061);//枪
                toDrop.add(1452085);//弓箭
                toDrop.add(1462075);//弩
                toDrop.add(1472100);//全套
                toDrop.add(1482046);//指节
                toDrop.add(1492048);//短枪
            }
        }else if (monster.getId() == 8180000 || monster.getId() == 8180001) {//肥龙 胖凤 爆任务物品 920010200
            int chance = (int) (Math.random() * 100);
            if (chance < 40) {
                toDrop.add(4031511);
            }
        }else if (monster.getId() == 9300039) {
            toDrop.add(4001045);
        }else if (monster.getId() == 9300119) {//老海盗
            toDrop.add(4031551);
        }else if (monster.getId() == 9001000 || monster.getId() == 9001001 || monster.getId() == 9001002 || monster.getId() == 9001003) { //三转分身教官爆出黑符
            int chance = (int) (Math.random() * 100);
            if (chance < 100) {
                toDrop.add(4031059);
            }
        }else if (monster.getId() == dropOwner.getmodid()) {
        	//每个角色的幸运怪？？？
            int chance = (int) (Math.random() * 100);
            if (chance < 10) {
                toDrop.add(4004000);
                toDrop.add(4004001);
                toDrop.add(4004002);
                toDrop.add(4004003);
                toDrop.add(4004004);
            }
        } /*
         * 绯红BOSS爆率设置 ↓
         */
        /*9400589, // 地狱船长
         9400590, // 海之魔女
         9400591, // 血焰将军
         9400592, // 猎魔人
         9400593 // 暗影杀手*/

		if (monster.getId() == 9400589) { // 地狱船长
			int chance = (int) (Math.random() * 100);
			if (chance < 25) {
				toDrop.add(1442068);
			} 
			if (chance < 60) {
				toDrop.add(5201001);// 500豆豆
				toDrop.add(1022088);// 全属性+1考古学眼睛
				toDrop.add(5201001);// 500豆豆
				toDrop.add(5201001);// 500豆豆
				toDrop.add(5201001);// 500豆豆
			}
			if (chance < 100) {
				toDrop.add(5201004); // 20豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(5201005);// 50豆豆
				toDrop.add(1012015);// 圣诞鹿 +1攻击
				toDrop.add(5201005);// 50豆豆
			}
		}else if (monster.getId() == 9400590) {// 海之魔女
			int chance = (int) (Math.random() * 100);
			if (chance < 35) {
				toDrop.add(1382060);// 绯红法杖
				toDrop.add(1442068);// 绯洪弯刃
			}
			if (chance < 70) {
				toDrop.add(5201000);
				toDrop.add(1142142);
				toDrop.add(1022088);// 全属性+1考古学眼睛
			}
			if (chance < 100) {
				toDrop.add(5201005);
				toDrop.add(5201005);
				toDrop.add(1412040);
			}
		}else if (monster.getId() == 9400591) { // 绯红第三个怪物  血焰将军
			int chance = (int) (Math.random() * 100);
			if (chance < 10) {
				toDrop.add(1022089); // 勋章
			}
			if (chance < 45) {
				toDrop.add(1442068); // 绯红弯刃
				toDrop.add(1382060);// 绯红法杖
				toDrop.add(1452060);// 绯红弓
				toDrop.add(1432056);// 暴风枪
				toDrop.add(1482022);// 枫叶金爪
				toDrop.add(1492022);// 加仑手枪
				toDrop.add(1332087);// 街霸短刃
				toDrop.add(1402044);// 灯笼南瓜
			}
			if (chance < 100) {
				toDrop.add(5201001);
				toDrop.add(5201001);
				toDrop.add(1432023);// 奥丁				
			}
		}else if (monster.getId() == 9400592) { // 绯红第三个怪物   猎魔人
			int chance = (int) (Math.random() * 100);
			if (chance < 10) {
				toDrop.add(1022089); // 勋章
			}
			if (chance < 45) {
				toDrop.add(1442068); // 绯红弯刃
				toDrop.add(1382060);// 绯红法杖
				toDrop.add(1452060);// 绯红弓
				toDrop.add(1432056);// 暴风枪
				toDrop.add(1482022);// 枫叶金爪
				toDrop.add(1492022);// 加仑手枪
				toDrop.add(1332087);// 街霸短刃
				toDrop.add(1402044);// 灯笼南瓜		
			}
			if (chance < 100) {
				toDrop.add(5201001);
				toDrop.add(5201001);
				toDrop.add(1432023);// 奥丁
				
			}
		}else if (monster.getId() == 9400593) { // 绯红第三个怪物 暗影杀手
			int chance = (int) (Math.random() * 100);
			if (chance < 100) {
				toDrop.add(5201001);
				toDrop.add(5201001);
				toDrop.add(1432023);// 奥丁
				if (chance < 45) {
					toDrop.add(1442068); // 绯红弯刃
					toDrop.add(1382060);// 绯红法杖
					toDrop.add(1452060);// 绯红弓
					toDrop.add(1432056);// 暴风枪
					toDrop.add(1482022);// 枫叶金爪
					toDrop.add(1492022);// 加仑手枪
					toDrop.add(1332087);// 街霸短刃
					toDrop.add(1402044);// 灯笼南瓜
					if (chance < 10) {
						toDrop.add(1022089); // 勋章
					}
				}
			}
		}
    }
    private void GetDropsFromMonster_特殊地图(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    	if (monster.getMap().getId() == 677000011) {//地狱大公蜿蜒小道
            int chance = (int) (Math.random() * 100);
            if (chance < 25) { //20% chance of getting a maple leaf
                toDrop.add(4031232); //帽子
            }
            //4031232
        } else if (dropOwner.getMapId() == 108000300) { //战士二转任务
            int chance = (int) (Math.random() * 100);
            if (chance < 60) {
                toDrop.add(4031013);//黑珠
            }
        } else if (dropOwner.getMapId() == 920010200) { //
            int chance = (int) (Math.random() * 100);
            if (chance < 20) {
                toDrop.add(4001052);
            }
        } else if (dropOwner.getMapId() == 920010800) {
            int chance = (int) (Math.random() * 100);
            if (chance < 20) {
                toDrop.add(4001054);
            }
        }
    }
    private void GetDropsFromMonster_副本(MapleCharacter dropOwner, MapleMonster monster, List<Integer> toDrop){
    	//罗密欧副本爆率：
        /*第一关*/
        if (dropOwner.getMapId() == 926100000 || dropOwner.getMapId() == 926100001 || dropOwner.getMapId() == 926100200 || dropOwner.getMapId() == 926100500 || dropOwner.getMapId() == 926100600 || dropOwner.getMapId() == 926100700) {
            if (monster.getId() >= 9500184 && monster.getId() <= 9500186) { //魔法书
                int chance = (int) (Math.random() * 100);
                if (chance < 40) {
                    toDrop.add(4001130); //罗密欧的信
                }
                if (chance < 40) {
                    toDrop.add(4001131); //朱丽叶的信
                }
            }
            /*第二关*/
            if (monster.getId() == 9300145 || monster.getId() == 9300146 || monster.getId() == 2112004) {
                int chance = (int) (Math.random() * 100);
                if (chance < 50) {
                    toDrop.add(4001159); //蒙特鸠珠子
                }
            }
            /*第三关*/
            if (monster.getId() == 9300148) {
                int chance = (int) (Math.random() * 100);
                if (chance < 50) {
                    toDrop.add(4001160); //卡帕莱特珠子
                }
            }
            /*第四关*/
            if (monster.getId() == 9300139) { //BOSS法兰肯
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031778); //罗密欧的情书
                }
            }
            /*第五关*/
            if (monster.getId() == 9300140) { //BOSS法兰肯
                int chance = (int) (Math.random() * 100);
                if (chance < 100) {
                    toDrop.add(4031806); //罗密欧的求婚戒指
                }
            }
            /*罗密欧副本完毕↑*/
        } else if (dropOwner.getMapId() == 925100000 || dropOwner.getMapId() == 925100200 || dropOwner.getMapId() == 925100400 || dropOwner.getMapId() == 925100600 || dropOwner.getMapId() == 925100500 || dropOwner.getMapId() == 925100700) {
            /*海盗船副本*/   
        	/*第一关*/
            if (monster.getId() == 9300109 || monster.getId() == 9300110) {
                int chance = (int) (Math.random() * 100);
                if (chance < 5) {
                    toDrop.add(4001113); //火凤凰的卵
                }
            }
            /*第二关*/
            if (monster.getId() == 9300124 || monster.getId() == 9300125) {
                int chance = (int) (Math.random() * 100);
                if (chance < 5) {
                    toDrop.add(4001114); //冰凤凰的卵
                }
            }
            /*第三关*/
            if (monster.getId() == 9300120 || monster.getId() == 9300121 || monster.getId() == 9300122 || monster.getId() == 9300126) {
                int chance = (int) (Math.random() * 100);
                if (chance < 50) {
                    toDrop.add(4001117); //骷髅钥匙
                }
            }
            /*海盗船副本完毕↑*/
        } else if (dropOwner.getMapId()== 677000012) {
        	/*藏宝地图*/
        	if (monster.getId() == 8510000) { //鱼王皮亚奴斯    //8520000,9500363 //9300294 - 能力之皮亚奴斯
				int chance = (int) (Math.random() * 100);
	            if (chance < 80) {
	                toDrop.add(5201001);
	                toDrop.add(1012015);
	                toDrop.add(1022088);  //考古学家眼镜
	            } else {
	                toDrop.add(5201001);  //豆豆箱(500个)
	            }
			}else if (monster.getId() == 3220000) { //树妖王
				int chance = (int) (Math.random() * 100);
	            if (chance < 80) {
	                toDrop.add(5201001);
	                toDrop.add(1012015);
	                toDrop.add(1482022);
	            } else {
	                toDrop.add(5201001);  //豆豆箱(500个)
	            }
			}
        }
    }
    private void dropFromMonster(MapleCharacter dropOwner, MapleMonster monster) {
    	if (dropsDisabled || monster.dropsDisabled()) {
            return;
        }
        //TODO:杀死怪物爆物品
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        final int maxDrops = monster.getMaxDrops(dropOwner);
        final boolean explosive = monster.isExplosive();

        List<Integer> toDrop = new ArrayList<Integer>();

        for (int i = 0; i < maxDrops; i++) {
            toDrop.add(monster.getDrop(dropOwner));
        }
       
        GetDropsFromMonster_特殊事件(dropOwner, monster, toDrop);
        GetDropsFromMonster_特殊物品(dropOwner, monster, toDrop);
        GetDropsFromMonster_任务(dropOwner, monster, toDrop);
        GetDropsFromMonster_特殊怪物(dropOwner, monster, toDrop);
        GetDropsFromMonster_特殊地图(dropOwner, monster, toDrop);
        GetDropsFromMonster_副本(dropOwner, monster, toDrop);

        
        Set<Integer> alreadyDropped = new HashSet<Integer>();
        int htpendants = 0;
        int htstones = 0;
		for (int i = 0; i < toDrop.size(); i++) {
			if (toDrop.get(i) == 1122000) {
				if (htpendants > 3) {
					toDrop.set(i, -1);
				} else {
					htpendants++;
				}
			} else if (toDrop.get(i) == 4001094) {
				if (htstones > 2) {
					toDrop.set(i, -1);
				} else {
					htstones++;
				}
			} else if (alreadyDropped.contains(toDrop.get(i)) && !explosive) {
				toDrop.remove(i);
				i--;
			} else {
				alreadyDropped.add(toDrop.get(i));
			}
		}

		if (toDrop.size() > maxDrops) {
			toDrop = toDrop.subList(0, maxDrops);
		}
        Point[] toPoint = new Point[toDrop.size()];
        int shiftDirection = 0;
        int shiftCount = 0;
        int curX = Math.min(Math.max(monster.getPosition().x - 25 * (toDrop.size() / 2), footholds.getMinDropX() + 25),
                footholds.getMaxDropX() - toDrop.size() * 25);
        int curY = Math.max(monster.getPosition().y, footholds.getY1());
        while (shiftDirection < 3 && shiftCount < 1000) {
            if (shiftDirection == 1) {
                curX += 25;
            } else if (shiftDirection == 2) {
                curX -= 25;
            }
            for (int i = 0; i < toDrop.size(); i++) {
                MapleFoothold wall = footholds.findWall(new Point(curX, curY), new Point(curX + toDrop.size() * 25, curY));
                if (wall != null) {
                    if (wall.getX1() < curX) {
                        shiftDirection = 1;
                        shiftCount++;
                        break;
                    } else if (wall.getX1() == curX) {
                        if (shiftDirection == 0) {
                            shiftDirection = 1;
                        }
                        shiftCount++;
                        break;
                    } else {
                        shiftDirection = 2;
                        shiftCount++;
                        break;
                    }
                } else if (i == toDrop.size() - 1) {
                    shiftDirection = 3;
                }
                final Point dropPos = calcDropPos(new Point(curX + i * 25, curY), new Point(monster.getPosition()));
                toPoint[i] = new Point(curX + i * 25, curY);
                final int drop = toDrop.get(i);

                if (drop == -1) {
                    final int mesoRate = ChannelServer.getInstance(dropOwner.getClient().getChannel()).getMesoRate();
                    double mesoDecrease = Math.pow(0.93, monster.getExp() / 300.0);
                    if (mesoDecrease > 1.0) {
                        mesoDecrease = 1.0;
                    }
                    int tempmeso = Math.min(30000, (int) (mesoDecrease * (monster.getExp()) * (1.0 + Math.random() * 20) / 10.0));
                    if (dropOwner.getBuffedValue(MapleBuffStat.MESOUP) != null) {
                        tempmeso = (int) (tempmeso * dropOwner.getBuffedValue(MapleBuffStat.MESOUP).doubleValue() / 100.0);
                    }

                    final int meso = tempmeso;

                    if (meso > 0) {
                        final MapleMonster dropMonster = monster;
                        final MapleCharacter dropChar = dropOwner;
                        TimerManager.getInstance().schedule(new Runnable() {
                            public void run() {
                                spawnMesoDrop(meso * mesoRate * dropChar.getClient().getPlayer().hasEXPCard(), dropPos, dropMonster, dropChar, explosive);
                            }
                        }, monster.getAnimationTime("die1"));
                    }
                } else {
                    IItem idrop;
                    MapleInventoryType type = ii.getInventoryType(drop);
                    if (type.equals(MapleInventoryType.EQUIP)) {
                        Equip nEquip = ii.randomizeStats((Equip) ii.getEquipById(drop));
                        idrop = nEquip;
                    } else {
                        idrop = new Item(drop, (byte) 0, (short) 1);
                        if (ii.isArrowForBow(drop) || ii.isArrowForCrossBow(drop)) { // Randomize quantity for certain items
                            idrop.setQuantity((short) (1 + 100 * Math.random()));
                        } else if (ii.isThrowingStar(drop) || ii.isBullet(drop)) {
                            idrop.setQuantity((short) (1));
                        }
                    }

                    idrop.log("Created as a drop from monster " + monster.getObjectId() + " (" + monster.getId() + ") at " + dropPos.toString() + " on map " + mapid, false);

                    final MapleMapItem mdrop = new MapleMapItem(idrop, dropPos, monster, dropOwner);
                    final MapleMapObject dropMonster = monster;
                    final MapleCharacter dropChar = dropOwner;
                    final TimerManager tMan = TimerManager.getInstance();

                    tMan.schedule(new Runnable() {
                        public void run() {
                            spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
                                public void sendPackets(MapleClient c) {
                                    c.getSession().write(MaplePacketCreator.dropItemFromMapObject(drop, mdrop.getObjectId(), dropMonster.getObjectId(), explosive ? 0 : dropChar.getId(), dropMonster.getPosition(), dropPos, (byte) 1));
                                    activateItemReactors(mdrop);
                                }
                            }, null);

                            tMan.schedule(new ExpireMapItemJob(mdrop), dropLife);
                        }
                    }, monster.getAnimationTime("die1"));

                }
            }
        }
    }

    public boolean damageMonster(MapleCharacter chr, MapleMonster monster, int damage) {
        if (monster.getId() == 8500000 || monster.getId() == 8800000) {
            SpeedRankings.setStartTime(monster.getId() == 8500000 ? 1 : 0, monster.getId(), System.currentTimeMillis());
        }
        if (monster.getId() == 8800000) {
            Collection<MapleMapObject> objects = chr.getMap().getMapObjects();
            for (MapleMapObject object : objects) {
                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                if (mons != null && mons.getId() >= 8800003 && mons.getId() <= 8800010) {
                	//如果扎昆的手臂没有打完，这里就忽略掉队扎昆的伤害
                    return true;
                }
            }
        }
        if (monster.isAlive()) {
            synchronized (monster) {
                if (!monster.isAlive()) {
                    return false;
                }
                if (damage > 0) {
                    int monsterhp = monster.getHp();
                    monster.damage(chr, damage, true);
                    if (!monster.isAlive()) { // monster just died
                        killMonster(monster, chr, true);
                        if (monster.getId() >= 8810002 && monster.getId() <= 8810009) {
                            for (MapleMapObject object : chr.getMap().getMapObjects()) {
                                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                                if (mons != null) {
                                    if (mons.getId() == 8810018 || mons.getId() == 8810026) {
                                        damageMonster(chr, mons, monsterhp);
                                    }
                                }
                            }
                        } else if ((monster.getId() >= 8820002 && monster.getId() <= 8820006) || (monster.getId() >= 8820015 && monster.getId() <= 8820018)) {
                            for (MapleMapObject object : chr.getMap().getMapObjects()) {
                                MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                                if (mons != null) {
                                    if (mons.getId() >= 8820010 && mons.getId() <= 8820014) {
                                        damageMonster(chr, mons, monsterhp);
                                    }
                                }
                            }
                        }
                    } else if (monster.getId() >= 8810002 && monster.getId() <= 8810009) {
                        for (MapleMapObject object : chr.getMap().getMapObjects()) {
                            MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                            if (mons != null) {
                                if (mons.getId() == 8810018 || mons.getId() == 8810026) {
                                    damageMonster(chr, mons, damage);
                                }
                            }
                        }
                    } else if ((monster.getId() >= 8820002 && monster.getId() <= 8820006) || (monster.getId() >= 8820015 && monster.getId() <= 8820018)) {
                        for (MapleMapObject object : chr.getMap().getMapObjects()) {
                            MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                            if (mons != null) {
                                if (mons.getId() >= 8820010 && mons.getId() <= 8820014) {
                                    damageMonster(chr, mons, damage);
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops) {
        killMonster(monster, chr, withDrops, false, 1);
    }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean secondTime) {
        killMonster(monster, chr, withDrops, secondTime, 1);
    }

    public int getChannel() {
        return this.channel;
    }

    public void killMonster(int monsId) {
        List<MapleCharacter> lmmo = new ArrayList(getMapObjects());
        for (MapleMapObject mmo : lmmo) {
            if (((mmo instanceof MapleMonster))
                    && (((MapleMonster) mmo).getId() == monsId)) {
                killMonster((MapleMonster) mmo, (MapleCharacter) getAllPlayers().get(0), false);
            }
        }
    }
 public void killMonster(int monsId, MapleCharacter trigger)
      {
        List<MapleCharacter> lmmo = new ArrayList(getMapObjects());
         for (MapleMapObject mmo : lmmo)
          {
            if (((mmo instanceof MapleMonster))
                    &&  (((MapleMonster) mmo).getId() == monsId))
              {
                killMonster((MapleMonster) mmo, trigger, false);
            }
        }   }

    public void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean secondTime, int animation) {
        if (chr.getCheatTracker().checkHPLoss()) {
            chr.getCheatTracker().registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT);
        }
        StringBuilder names = new StringBuilder();
        if (monster.getId() == 8500002 || monster.getId() == 8800002) {
            if (chr.getParty() != null) {
                MapleParty party = chr.getParty();
                List<MapleCharacter> partymems = party.getPartyMembers();
                for (int i = 0; i < partymems.size(); i++) {
                    names.append(partymems.get(i).getName());
                    names.append(", ");
                }
            } else {
                names.append(chr.getName());
            }
            try {
                int rankType = monster.getId() == 8500002 ? 1 : 0;
                int oid = monster.getObjectId();
                SpeedRankings.setEndTime(rankType, oid, System.currentTimeMillis());
                SpeedRankings.insertRankingToSQL(rankType, names.toString(), SpeedRankings.calcTime(rankType, oid));
            } catch (Exception e) {
            }
        }
        if (monster.getId() == 8810018 && !secondTime) {
            TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    killMonster(monster, chr, withDrops, true, 1);
                    killAllMonsters();
                }
            }, 3000);
            return;
        }
        if (monster.getBuffToGive() > -1) {
            broadcastMessage(MaplePacketCreator.showOwnBuffEffect(monster.getBuffToGive(), 11));
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            MapleStatEffect statEffect = mii.getItemEffect(monster.getBuffToGive());
            synchronized (this.characters) {
                for (MapleCharacter character : this.characters) {
                    if (character.isAlive()) {
                        statEffect.applyTo(character);
                        broadcastMessage(MaplePacketCreator.showBuffeffect(character.getId(), monster.getBuffToGive(), 11, (byte) 3));
                    }
                }
            }
        }
        if (monster.getId() == 8810018) {
            for (MapleCharacter c : this.getCharacters()) {
                c.finishAchievement(26);
            }
        }
        if (chr.getMapId() >= 925020010 && chr.getMapId() <= 925033804) {
            for (MapleCharacter c : this.getCharacters()) {
                c.DoJoKill();
            }
        }
        spawnedMonstersOnMap.decrementAndGet();
        monster.setHp(0);
        broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
        removeMapObject(monster);
        if (monster.getId() >= 8800003 && monster.getId() <= 8800010) {
            boolean makeZakReal = true;
            Collection<MapleMapObject> objects = getMapObjects();
            for (MapleMapObject object : objects) {
                MapleMonster mons = getMonsterByOid(object.getObjectId());
                if (mons != null) {
                    if (mons.getId() >= 8800003 && mons.getId() <= 8800010) {
                        makeZakReal = false;
                    }
                }
            }
            if (makeZakReal) {
                for (MapleMapObject object : objects) {
                    MapleMonster mons = chr.getMap().getMonsterByOid(object.getObjectId());
                    if (mons != null) {
                        if (mons.getId() == 8800000) {
                            makeMonsterReal(mons);
                            updateMonsterController(mons);
                        }
                    }
                }
            }
        }
        if (monster.getId() == chr.getmodid() && chr.getmodsl() > 0) { //判断任务怪物ID
            chr.getClient().getSession().write(MaplePacketCreator.sendHint("任务提示：\r\n#b还需要消灭#r" + chr.getmodsl() + "#b只！", 200, 200));
            chr.gainmodsl(-1);
        } else if (monster.getId() == chr.getmodid() && chr.getmodsl() == 0) {
            chr.getClient().getSession().write(MaplePacketCreator.sendHint("任务提示：\r\n#b消灭#r#o" + chr.getmodid() + "##b已完成！", 200, 200));
        }

        MapleCharacter dropOwner = monster.killBy(chr);
        if (withDrops && !monster.dropsDisabled()) {
            if (dropOwner == null) {
                dropOwner = chr;

            }
            dropFromMonster(dropOwner, monster);  //如果不是，各大地图加1的杀怪数
        } //VER079新功能。每日任务结合在一起。
    }

    public void killAllMonsters() {
        for (MapleMapObject monstermo : getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER))) {
            MapleMonster monster = (MapleMonster) monstermo;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
            removeMapObject(monster);
        }
    }

    public List<MapleMapObject> getAllPlayers() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER));
    }

    public void destroyReactor(int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        TimerManager tMan = TimerManager.getInstance();
        broadcastMessage(MaplePacketCreator.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);
        if (reactor.getDelay() > 0) {
            tMan.schedule(new Runnable() {
                @Override
                public void run() {
                    respawnReactor(reactor);
                }
            }, reactor.getDelay());
        }
    }

    public void resetReactors() {
        synchronized (this.mapobjects) {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    ((MapleReactor) o).setState((byte) 0);
                    ((MapleReactor) o).setTimerActive(false);
                    broadcastMessage(MaplePacketCreator.triggerReactor((MapleReactor) o, 0));
                }
            }
        }
    }

    /*
     * command to reset all item-reactors in a map to state 0 for GM/NPC use -
     * not tested (broken reactors get removed from mapobjects when destroyed)
     * Should create instances for multiple copies of non-respawning reactors...
     */
    public void setReactorState() {
        synchronized (this.mapobjects) {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    ((MapleReactor) o).setState((byte) 1);
                    broadcastMessage(MaplePacketCreator.triggerReactor((MapleReactor) o, 1));
                }
            }
        }
    }
    //在线时间

    /*
     * command to shuffle the positions of all reactors in a map for PQ purposes
     * (such as ZPQ/LMPQ)
     */
    public void shuffleReactors() {
        List<Point> points = new ArrayList<Point>();
        synchronized (this.mapobjects) {
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    points.add(((MapleReactor) o).getPosition());
                }
            }
            Collections.shuffle(points);
            for (MapleMapObject o : mapobjects.values()) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    ((MapleReactor) o).setPosition(points.remove(points.size() - 1));
                }
            }
        }
    }

    /**
     * Automagically finds a new controller for the given monster from the chars
     * on the map...
     *
     * @param monster
     */
    public void updateMonsterController(MapleMonster monster) {
        if (!monster.isAlive()) {
            return;
        }
        synchronized (monster) {
            if (!monster.isAlive()) {
                return;
            }
            if (monster.getController() != null) {
                // monster has a controller already, check if he's still on this map
                if (monster.getController().getMap() != this) {
                    log.warn("Monstercontroller wasn't on same map");
                    monster.getController().stopControllingMonster(monster);
                } else {
                    // controller is on the map, monster has an controller, everything is fine
                    return;
                }
            }
            int mincontrolled = -1;
            MapleCharacter newController = null;
            synchronized (characters) {
                for (MapleCharacter chr : characters) {
                    if (!chr.isHidden() && (chr.getControlledMonsters().size() < mincontrolled || mincontrolled == -1)) {
                        if (!chr.getName().equals("FaekChar")) { // TODO remove me for production release
                            mincontrolled = chr.getControlledMonsters().size();
                            newController = chr;
                        }
                    }
                }
            }
            if (newController != null) { // was a new controller found? (if not no one is on the map)
                if (monster.isFirstAttack()) {
                    newController.controlMonster(monster, true);
                    monster.setControllerHasAggro(true);
                    monster.setControllerKnowsAboutAggro(true);
                } else {
                    newController.controlMonster(monster, false);
                }
            }
        }
    }

    public Collection<MapleMapObject> getMapObjects() {
        return Collections.unmodifiableCollection(mapobjects.values());
    }

    public boolean containsNPC(int npcid) {
        synchronized (mapobjects) {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.NPC) {
                    if (((MapleNPC) obj).getId() == npcid) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public MapleMapObject getMapObject(int oid) {
        return mapobjects.get(oid);
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public MapleMonster getMonsterByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.MONSTER) {
            return (MapleMonster) mmo;
        }
        return null;
    }

    public MapleMonster getMonsterById(int id) {
        synchronized (mapobjects) {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.MONSTER) {
                    if (((MapleMonster) obj).getId() == id) {
                        return (MapleMonster) obj;
                    }
                }
            }
        }
        return null;
    }

    public MapleReactor getReactorByOid(int oid) {
        MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.REACTOR) {
            return (MapleReactor) mmo;
        }
        return null;
    }

    public MapleReactor getReactorByName(String name) {
        synchronized (mapobjects) {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) obj).getName().equals(name)) {
                        return (MapleReactor) obj;
                    }
                }
            }
        }
        return null;
    }

    public void spawnFakeMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = new Point(pos.x, pos.y - 1);
        spos = calcPointBelow(spos);
        spos.y -= 1;
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    public void spawnRevives(final MapleMonster monster) {
        monster.setMap(this);
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
                public void sendPackets(MapleClient c) {
                    c.getSession().write(MaplePacketCreator.spawnMonster(monster, false));
                }
            }, null);
            updateMonsterController(monster);
        }
        spawnedMonstersOnMap.incrementAndGet();
    }
    /*
     *     if (mapid == 803001200 && getHour == 2) {
     c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(9400437), c.getPlayer().getPosition());
     //System.out.print("刷怪物输出。");
     //System.out.print("刷怪物输出。Hour"+getHour+"");
     }
     */

    public void spawnMonster(final MapleMonster monster) {
        if (characters.isEmpty() && (!isPQMap())) {
            return;
        }
        monster.setMap(this);
        int removeAfter = monster.getRemoveAfter();
        if (removeAfter > 0) {
            TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    killMonster(monster, (MapleCharacter) getAllPlayers().get(0), false, false, 3);
                }
            }, removeAfter);
        }
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
                @Override
                public void sendPackets(MapleClient c) {
                    c.getSession().write(MaplePacketCreator.spawnMonster(monster, true));
                }
            }, null);
            updateMonsterController(monster);
        }
        spawnedMonstersOnMap.incrementAndGet();


    }

    public void 绯红刷怪(MapleClient c) {
        if (mapid == 803001200 && getHour == 2) {
            c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(9400437), c.getPlayer().getPosition());

            //System.out.print("刷怪物输出。");
            //System.out.print("刷怪物输出。Hour" + getHour + "");
        }
    }

    public void spawnDojoMonster(final MapleMonster monster) {
        Point[] pts = {new Point(140, 0), new Point(190, 7), new Point(187, 7)};
        spawnMonsterWithEffect(monster, 15, pts[Randomizer.getInstance().nextInt(3)]);
    }

    public void spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        try {
            monster.setMap(this);
            Point spos = new Point(pos.x, pos.y - 1);
            spos = calcPointBelow(spos);
            spos.y--;
            monster.setPosition(spos);
            if (mapid < 925020000 || mapid > 925030000) {
                monster.disableDrops();
            }
            synchronized (this.mapobjects) {
                spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
                    public void sendPackets(MapleClient c) {
                        c.getSession().write(MaplePacketCreator.spawnMonster(monster, true, effect));
                    }
                }, null);
                if (monster.hasBossHPBar()) {
                    broadcastMessage(monster.makeBossHPBarPacket(), monster.getPosition());
                }
                updateMonsterController(monster);
            }
            spawnedMonstersOnMap.incrementAndGet();
        } catch (Exception e) {
        }
    }

    public void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
                public void sendPackets(MapleClient c) {
                    c.getSession().write(MaplePacketCreator.spawnFakeMonster(monster, 0));
                }
            }, null);
        }
        spawnedMonstersOnMap.incrementAndGet();
    }

    public void makeMonsterReal(final MapleMonster monster) {
        monster.setFake(false);
        broadcastMessage(MaplePacketCreator.makeMonsterReal(monster));
        updateMonsterController(monster);
    }

    public void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(reactor, new DelayedPacketCreation() {
                public void sendPackets(MapleClient c) {
                    c.getSession().write(reactor.makeSpawnData());
                }
            }, null);
        }
    }

    private void respawnReactor(final MapleReactor reactor) {
        reactor.setState((byte) 0);
        reactor.setAlive(true);
        spawnReactor(reactor);
    }

    public void spawnDoor(final MapleDoor door) {
        synchronized (this.mapobjects) {
            spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {
                public void sendPackets(MapleClient c) {
                    c.getSession().write(MaplePacketCreator.spawnDoor(door.getOwner().getId(), door.getTargetPosition(), false));
                    if (door.getOwner().getParty() != null && (door.getOwner() == c.getPlayer() || door.getOwner().getParty().containsMember(new MaplePartyCharacter(c.getPlayer())))) {
                        c.getSession().write(MaplePacketCreator.partyPortal(door.getTown().getId(), door.getTarget().getId(), door.getTargetPosition()));
                    }
                    c.getSession().write(MaplePacketCreator.spawnPortal(door.getTown().getId(), door.getTarget().getId(), door.getTargetPosition()));
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            },
                    new SpawnCondition() { //产生条件
                public boolean canSpawn(MapleCharacter chr) {
                    ////System.out.println(""+door.getTarget().getId()+"||"+door.getOwner()+"");
                    return chr.getMapId() == door.getTarget().getId() || chr == door.getOwner() && chr.getParty() == null; //获取玩家信息

                }
            });
        }
    }

    public void spawnSummon(final MapleSummon summon) {
        spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                int skillLevel = summon.getOwner().getSkillLevel(SkillFactory.getSkill(summon.getSkill()));
                c.getSession().write(MaplePacketCreator.spawnSpecialMapObject(summon, skillLevel, true));
            }
        }, null);
    }

    public void spawnLove(final MapleLove love) {
        addMapObject(love);
        broadcastMessage(love.makeSpawnData());
        TimerManager tMan = TimerManager.getInstance();
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                removeMapObject(love);
                broadcastMessage(love.makeDestroyData());
            }
        }, 1000 * 60 * 60);
    }

    public void spawnMist(final MapleMist mist, final int duration, boolean fake) {
        if (this.hasEvent) { //no mists on events
            return;
        }
        addMapObject(mist);
        broadcastMessage(fake ? mist.makeFakeSpawnData(0) : mist.makeSpawnData());
        TimerManager tMan = TimerManager.getInstance();
        final ScheduledFuture<?> poisonSchedule;
        if (mist.isPoison()) {
            Runnable poisonTask = new Runnable() {
                @Override
                public void run() {
                    List<MapleMapObject> affectedMonsters = getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.MONSTER));
                    for (MapleMapObject mo : affectedMonsters) {
                        if (mist.makeChanceResult()) {
                            MonsterStatusEffect poisonEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, 1), mist.getSourceSkill(), false);
                            ((MapleMonster) mo).applyStatus(mist.getOwner(), poisonEffect, true, duration);
                        }
                    }
                }
            };
            poisonSchedule = tMan.register(poisonTask, 2000, 2500);
        } else {
            Runnable poisonTask = new Runnable() {
                @Override
                public void run() {
                    List<MapleMapObject> affectedPlayers = getMapObjectsInBox(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER));
                    for (MapleMapObject mo : affectedPlayers) {
                        if (mist.getSourceId() == 5281000) {
                            ((MapleCharacter) mo).giveItemBuff(2022327);
                        } else if (mist.getSourceId() == 5281001) {
                            ((MapleCharacter) mo).giveItemBuff(2022328);
                        } else {
                            ((MapleCharacter) mo).giveItemBuff(mist.getSourceId());
                        }
                        ((MapleCharacter) mo).getClient().getSession().write(MaplePacketCreator.spawnFace(mist.getSourceId()));
                    }
                }
            };
            poisonSchedule = tMan.register(poisonTask, 5000, 2500);
        }
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                removeMapObject(mist);
                if (poisonSchedule != null) {
                    poisonSchedule.cancel(false);
                }
                broadcastMessage(mist.makeDestroyData());
            }
        }, duration);
    }

    public List<MapleMapObject> getMapObjectsInBox(Rectangle box, List<MapleMapObjectType> types) {
        List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        synchronized (mapobjects) {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (box.contains(l.getPosition())) {
                        ret.add(l);
                    }
                }
            }
        }
        return ret;
    }
    
    public final void spawnAutoDrop(int itemid, final Point pos) {
        IItem idrop = null;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (ii.getInventoryType(itemid) == MapleInventoryType.EQUIP) {
            idrop = ii.randomizeStats((Equip) ii.getEquipById(itemid));
        } else {
            idrop = new Item(itemid, (byte) 0, (short)1);
        }        
        idrop.log("地图:"+this.mapid+",自动掉落!", false);
        final MapleMapItem mdrop = new MapleMapItem(pos, idrop);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.dropItemFromMapObject(mdrop.getItem().getItemId(), mdrop.getObjectId(), 0, 
                		0, mdrop.getPosition(), mdrop.getPosition(), (byte) 1));
            }
        }, null);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(mdrop.getItem().getItemId(), mdrop.getObjectId(), 0, 
        		0, mdrop.getPosition(), mdrop.getPosition(), (byte) 0), mdrop.getPosition());

        TimerManager.getInstance().schedule(new ExpireMapItemJob(mdrop), dropLife);
    }
    public void spawnItemDropGM(final MapleMapObject dropper, final MapleCharacter owner, final IItem item, Point pos, final boolean ffaDrop, final boolean expire) {
        TimerManager tMan = TimerManager.getInstance();
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner);
        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.dropItemFromMapObject(item.getItemId(), drop.getObjectId(), 0, ffaDrop ? 0 : owner.getId(),
                        dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(item.getItemId(), drop.getObjectId(), 0, ffaDrop ? 0
                : owner.getId(), dropper.getPosition(), droppos, (byte) 0), drop.getPosition());

        if (expire) {
            tMan.schedule(new ExpireMapItemJob(drop), dropLife);
        }

        activateItemReactors(drop);
    }

    public void disappearingItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final IItem item, Point pos) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(item.getItemId(), drop.getObjectId(), 0, 0, dropper.getPosition(), droppos, (byte) 3), drop.getPosition());
    }

    public void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final IItem item, Point pos, final boolean ffaDrop, final boolean expire) {
        TimerManager tMan = TimerManager.getInstance();
        final Point droppos = calcDropPos(pos, pos);
        final MapleMapItem drop = new MapleMapItem(item, droppos, dropper, owner);
        if (dropper instanceof MapleCharacter) {
	        if (item.getItemId() >= 5010000 && item.getItemId() <= 5999999|| 
	            item.getItemId() >= 1602000 && item.getItemId() <= 1799999|| 
	            item.getItemId() == 1122000 ||  //黑龙项环
	            item.getItemId() == 1112404 ||  //极光戒指
	            item.getUniqueId() > 0
	            ) 
	        {
	            owner.dropMessage(1, "你的物品消失了");
	            return;
	        }
        }

        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                c.getSession().write(MaplePacketCreator.dropItemFromMapObject(item.getItemId(), drop.getObjectId(), 0, ffaDrop ? 0 : owner.getId(),
                        dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        broadcastMessage(MaplePacketCreator.dropItemFromMapObject(item.getItemId(), drop.getObjectId(), 0, ffaDrop ? 0
                : owner.getId(), dropper.getPosition(), droppos, (byte) 0), drop.getPosition());

        if (expire) {
            tMan.schedule(new ExpireMapItemJob(drop), dropLife);
        }

        activateItemReactors(drop);
    }

    public void spawnMonsterOnGroudBelow(MapleMonster mob, Point pos) {
        spawnMonsterOnGroundBelow(mob, pos);
    }

    /*
     * public void spawnMonsterOnGroundBelow(MapleMonster npcmob, Point
     * spawnPos) { throw new UnsupportedOperationException("Not yet
     * implemented");
     }
     */
    public void spawnMonsterOnGroundBelow(MapleMonster mob, Point pos) {
        Point spos = new Point(pos.x, pos.y - 1);
        spos = calcPointBelow(spos);
        spos.y -= 1;
        mob.setPosition(spos);
        spawnMonster(mob);
    }

    public void addBotPlayer(MapleCharacter chr) {
        synchronized (characters) {
            this.characters.add(chr);
        }
        synchronized (this.mapobjects) {
            if (!chr.isHidden()) {
                broadcastMessage(chr, (MaplePacketCreator.spawnPlayerMapobject(chr)), false);
            } else {
                broadcastGMMessage(chr, (MaplePacketCreator.spawnPlayerMapobject(chr)), false);
            }
            this.mapobjects.put(Integer.valueOf(chr.getObjectId()), chr);


        }
    }

 public void AutoNx(int jsNx)
  {
    for (MapleCharacter chr : this.characters) {
      if (chr.getCherryBan()) {
        chr.getCherryBanMessage();
        chr.getClient().getSession().write(MaplePacketCreator.enableActions());
        return;
      }

      int Nx = Randomizer.getInstance().nextInt(4);
       int givNx = 10;
       int exp = 8888;
       int DD = Randomizer.getInstance().nextInt(5);
       int givDD = jsNx + DD;
       chr.gainExp(exp, true, true);
       chr.modifyCSPoints(0, givNx);
       if (chr.getLevel() >= 1) {
           chr.gainCashDD(givDD / 5);
         chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, new StringBuilder().append("获得").append(givDD / 5).append("豆豆！").toString()));
        }

        chr.UpdateCash();

        chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, new StringBuilder().append("[系统奖励] 泡点获得[").append(givNx).append("] 点卷。经验值[").append(exp).append("]").toString()));
       }
    }

    private class TimerDestroyWorker implements Runnable {

        @Override
        public void run() {
            if (mapTimer != null) {
                int warpMap = mapTimer.warpToMap();
                int minWarp = mapTimer.minLevelToWarp();
                int maxWarp = mapTimer.maxLevelToWarp();
                mapTimer = null;
                if (warpMap != -1) {
                    MapleMap map2wa2 = ChannelServer.getInstance(channel).getMapFactory().getMap(warpMap);
                    String warpmsg = "你现在会被传送到 " + map2wa2.getStreetName() + " : " + map2wa2.getMapName();
                    broadcastMessage(MaplePacketCreator.serverNotice(6, warpmsg));
                    Collection<MapleCharacter> cmc = new LinkedHashSet<MapleCharacter>(getCharacters());
                    for (MapleCharacter chr : cmc) {
                        try {
                            if (chr.getLevel() >= minWarp && chr.getLevel() <= maxWarp) {
                                chr.changeMap(map2wa2, map2wa2.getPortal(0));
                            } else {
                                chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You are not at least level " + minWarp + " or you are higher than level " + maxWarp + "."));
                            }
                        } catch (Exception ex) {
                            String errormsg = "There was a problem warping you. Please contact a GM";
                            chr.getClient().getSession().write(MaplePacketCreator.serverNotice(5, errormsg));
                        }
                    }
                }
            }
        }
    }

    public void addMapTimer(int duration) {
        ScheduledFuture<?> sf0f = TimerManager.getInstance().schedule(new TimerDestroyWorker(), duration * 1000);
        mapTimer = new MapleMapTimer(sf0f, duration, -1, -1, -1);

        broadcastMessage(mapTimer.makeSpawnData());
    }

    public void addMapTimer(int duration, int mapToWarpTo) {
        ScheduledFuture<?> sf0f = TimerManager.getInstance().schedule(new TimerDestroyWorker(), duration * 1000);
        mapTimer = new MapleMapTimer(sf0f, duration, mapToWarpTo, 0, 256);
        broadcastMessage(mapTimer.makeSpawnData());
    }

    public void addMapTimer(int duration, int mapToWarpTo, int minLevelToWarp) {
        ScheduledFuture<?> sf0f = TimerManager.getInstance().schedule(new TimerDestroyWorker(), duration * 1000);
        mapTimer = new MapleMapTimer(sf0f, duration, mapToWarpTo, minLevelToWarp, 256);
        broadcastMessage(mapTimer.makeSpawnData());
    }

    public void addMapTimer(int duration, int mapToWarpTo, int minLevelToWarp, int maxLevelToWarp) {
        ScheduledFuture<?> sf0f = TimerManager.getInstance().schedule(new TimerDestroyWorker(), duration * 1000);
        mapTimer = new MapleMapTimer(sf0f, duration, mapToWarpTo, minLevelToWarp, maxLevelToWarp);
        broadcastMessage(mapTimer.makeSpawnData());
    }

    public void clearMapTimer() {
        if (mapTimer != null) {
            mapTimer.getSF0F().cancel(true);
        }
        mapTimer = null;
    }

    private void activateItemReactors(MapleMapItem drop) {
        IItem item = drop.getItem();
        final TimerManager tMan = TimerManager.getInstance(); //check for reactors on map that might use this item
        for (MapleMapObject o : mapobjects.values()) {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                if (((MapleReactor) o).getReactorType() == 100) {
                    if (((MapleReactor) o).getReactItem().getLeft() == item.getItemId() && ((MapleReactor) o).getReactItem().getRight() <= item.getQuantity()) {
                        Rectangle area = ((MapleReactor) o).getArea();

                        if (area.contains(drop.getPosition())) {
                            MapleClient ownerClient = null;
                            if (drop.getOwner() != null) {
                                ownerClient = drop.getOwner().getClient();
                            }
                            MapleReactor reactor = (MapleReactor) o;
                            if (!reactor.isTimerActive()) {
                                tMan.schedule(new ActivateItemReactor(drop, reactor, ownerClient), 1000);
                                reactor.setTimerActive(true);
                            }
                        }
                    }
                }
            }
        }
    }

    public void AriantPQStart() {
        int i = 1;
        for (MapleCharacter chars2 : this.getCharacters()) {
            broadcastMessage(MaplePacketCreator.updateAriantPQRanking(chars2.getName(), 0, false));
            broadcastMessage(MaplePacketCreator.serverNotice(0, MaplePacketCreator.updateAriantPQRanking(chars2.getName(), 0, false).toString()));
            if (this.getCharacters().size() > i) {
                broadcastMessage(MaplePacketCreator.updateAriantPQRanking(null, 0, true));
                broadcastMessage(MaplePacketCreator.serverNotice(0, MaplePacketCreator.updateAriantPQRanking(chars2.getName(), 0, true).toString()));
            }
            i++;
        }
    }

    public void startMapEffect(String msg, int itemId) {
        if (mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        broadcastMessage(mapEffect.makeStartData());
        TimerManager tMan = TimerManager.getInstance();
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(mapEffect.makeDestroyData());
                mapEffect = null;
            }
        }, 30000);
    }

    /**
     * Adds a player to this map and sends nescessary data
     *
     * @param chr
     */
    public void addPlayer(MapleCharacter chr) {
        synchronized (characters) {
            this.characters.add(chr);
        }
        synchronized (this.mapobjects) {
            if (!chr.isHidden()) {
                broadcastMessage(chr, MaplePacketCreator.spawnPlayerMapobject(chr), false);
                List<MaplePet> pets = chr.getPets();
                for (MaplePet pet : pets) {
                    broadcastMessage(chr, MaplePacketCreator.showPet(chr, pet, false, false), false);
                }
            }
            sendObjectPlacement(chr.getClient());
            chr.getClient().getSession().write(MaplePacketCreator.spawnPlayerMapobject(chr));
            List<MaplePet> pets = chr.getPets();
            for (MaplePet pet : pets) {
                chr.getClient().getSession().write(MaplePacketCreator.showPet(chr, pet, false, false));
            }
            if (hasForcedEquip()) {
                chr.getClient().getSession().write(MaplePacketCreator.showForcedEquip());
            }
            chr.getClient().getSession().write(MaplePacketCreator.removeTutorialStats());
            if (chr.getMapId() >= 914000200 && chr.getMapId() <= 914000220) {
                chr.getClient().getSession().write(MaplePacketCreator.addTutorialStats());
            }
            if (chr.getMapId() >= 140090100 && chr.getMapId() <= 140090500 || chr.getJob().getId() == 1000 && chr.getMapId() != 130030000) {
                chr.getClient().getSession().write(MaplePacketCreator.spawnTutorialSummon(1));
            }
            this.mapobjects.put(Integer.valueOf(chr.getObjectId()), chr);
        }
        if (!onUserEnter.equals("")) {
            MapScriptManager.getInstance().getMapScript(chr.getClient(), onUserEnter, false);
        }
        if (!onFirstUserEnter.equals("")) {
            if (getCharacters().size() == 1) {
                MapScriptManager.getInstance().getMapScript(chr.getClient(), onFirstUserEnter, true);
            }
        }
        MapleStatEffect summonStat = chr.getStatForBuff(MapleBuffStat.SUMMON);
        if (summonStat != null) {
            MapleSummon summon = chr.getSummons().get(summonStat.getSourceId());
            summon.setPosition(chr.getPosition());
            chr.getMap().spawnSummon(summon);
            updateMapObjectVisibility(chr, summon);
        }
        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }
        if (chr.getChalkboard() != null) {
            chr.getClient().getSession().write(MaplePacketCreator.useChalkboard(chr, false));
        }
        if (chr.getEnergy() >= 10000) {
            broadcastMessage(chr, (MaplePacketCreator.giveForeignEnergyCharge(chr.getId(), 10000)));
        }
        if (getTimeLimit() > 0 && getForcedReturnMap() != null) {
            chr.getClient().getSession().write(MaplePacketCreator.getClock(getTimeLimit()));
            chr.startMapTimeLimitTask(this, this.getForcedReturnMap());
        }
        if (mapTimer != null) {
            chr.getClient().getSession().write(MaplePacketCreator.getClock(mapTimer.getTimeLeft()));
        }
        if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted()) {
            chr.getClient().getSession().write(MaplePacketCreator.getClock((int) (chr.getEventInstance().getTimeLeft() / 1000)));
        }
        if (hasClock()) {
            Calendar cal = Calendar.getInstance();
            chr.getClient().getSession().write((MaplePacketCreator.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND))));
        }
        if (hasBoat() == 2) {
            chr.getClient().getSession().write((MaplePacketCreator.boatPacket(true)));
        } else if (hasBoat() == 1 && (chr.getMapId() != 200090000 || chr.getMapId() != 200090010)) {
            chr.getClient().getSession().write(MaplePacketCreator.boatPacket(false));
        }
        chr.receivePartyMemberHP();
    }

    public void removePlayer(MapleCharacter chr) {
        synchronized (characters) {
            characters.remove(chr);
        }
        removeMapObject(Integer.valueOf(chr.getObjectId()));
        broadcastMessage(MaplePacketCreator.removePlayerFromMap(chr.getId()));
        for (MapleMonster monster : chr.getControlledMonsters()) {
            monster.setController(null);
            monster.setControllerHasAggro(false);
            monster.setControllerKnowsAboutAggro(false);
            updateMonsterController(monster);
        }
        chr.leaveMap();
        chr.cancelMapTimeLimitTask();

        for (MapleSummon summon : chr.getSummons().values()) {
            if (summon.isPuppet()) {
                chr.cancelBuffStats(MapleBuffStat.PUPPET);
            } else {
                removeMapObject(summon);
            }
        }
    }

    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = null;
        double shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            double distance = portal.getPosition().distanceSq(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public void broadcastNonGmMessage(MapleCharacter source, MaplePacket packet) {
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                if (chr != source && (!chr.isGM() || !chr.isHidden())) {
                    chr.getClient().getSession().write(packet);
                }
            }
        }
    }

    /**
     * Broadcast a message to everyone in the map
     *
     * @param packet
     */
    public void broadcastMessage(MaplePacket packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public void broadcastMessage(MapleCharacter source, MaplePacket packet) {
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    chr.getClient().getSession().write(packet);
                }
            }
        }
    }

    /**
     * Nonranged. Repeat to source according to parameter.
     *
     * @param source
     * @param packet
     * @param repeatToSource
     */
    public void broadcastMessage(MapleCharacter source, MaplePacket packet, boolean repeatToSource) {
        broadcastMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getPosition());
    }

    /**
     * Ranged and repeat according to parameters.
     *
     * @param source
     * @param packet
     * @param repeatToSource
     * @param ranged
     */
    public void broadcastMessage(MapleCharacter source, MaplePacket packet, boolean repeatToSource, boolean ranged) {
        broadcastMessage(repeatToSource ? null : source, packet, ranged ? MapleCharacter.MAX_VIEW_RANGE_SQ : Double.POSITIVE_INFINITY, source.getPosition());
    }

    /**
     * Always ranged from Point.
     *
     * @param packet
     * @param rangedFrom
     */
    public void broadcastMessage(MaplePacket packet, Point rangedFrom) {
        broadcastMessage(null, packet, MapleCharacter.MAX_VIEW_RANGE_SQ, rangedFrom);
    }

    /**
     * Always ranged from point. Does not repeat to source.
     *
     * @param source
     * @param packet
     * @param rangedFrom
     */
    public void broadcastMessage(MapleCharacter source, MaplePacket packet, Point rangedFrom) {
        broadcastMessage(source, packet, MapleCharacter.MAX_VIEW_RANGE_SQ, rangedFrom);
    }

    private void broadcastMessage(MapleCharacter source, MaplePacket packet, double rangeSq, Point rangedFrom) {
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getPosition()) <= rangeSq) {
                            chr.getClient().getSession().write(packet);
                        }
                    } else {
                        chr.getClient().getSession().write(packet);
                    }
                }
            }
        }
    }

    private boolean isNonRangedType(MapleMapObjectType type) {
        switch (type) {
            case NPC:
            case PLAYER:
            case MIST:
            case HIRED_MERCHANT:
            case LOVE:
                return true;
        }
        return false;
    }

    private void sendObjectPlacement(MapleClient mapleClient) {
        for (MapleMapObject o : mapobjects.values()) {
            if (isNonRangedType(o.getType())) {
                o.sendSpawnData(mapleClient);
                //System.out.println("时空门 - 1");
            } else if (o.getType() == MapleMapObjectType.MONSTER) {
                updateMonsterController((MapleMonster) o);
            }
        }
        MapleCharacter chr = mapleClient.getPlayer();

        if (chr != null) {
            for (MapleMapObject o : getMapObjectsInRange(chr.getPosition(), MapleCharacter.MAX_VIEW_RANGE_SQ, rangedMapobjectTypes)) {
                if (o.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) o).isAlive()) {
                        o.sendSpawnData(chr.getClient());
                        //System.out.println("时空门 - 2");
                        chr.addVisibleMapObject(o);
                    }
                } else {
                    o.sendSpawnData(chr.getClient());
                    //System.out.println("时空门 - 3");
                    chr.addVisibleMapObject(o);
                }
            }
        } else {
            log.info("sendObjectPlacement invoked with null char");
        }
    }

    public List<MapleMapObject> getMapObjectsInRange(Point from, double rangeSq, List<MapleMapObjectType> types) {
        List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        synchronized (mapobjects) {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (from.distanceSq(l.getPosition()) <= rangeSq) {
                        ret.add(l);
                    }
                }
            }
        }
        return ret;
    }

    public List<MapleMapObject> getItemsInRange(Point from, double rangeSq) {
        List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        synchronized (mapobjects) {
            for (MapleMapObject l : mapobjects.values()) {
                if (l.getType() == MapleMapObjectType.ITEM) {
                    if (from.distanceSq(l.getPosition()) <= rangeSq) {
                        ret.add(l);
                    }
                }
            }
        }
        return ret;
    }

    public List<MapleMapObject> getMapObjectsInRect(Rectangle box, List<MapleMapObjectType> types) {
        List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        synchronized (mapobjects) {
            for (MapleMapObject l : mapobjects.values()) {
                if (types.contains(l.getType())) {
                    if (box.contains(l.getPosition())) {
                        ret.add(l);
                    }
                }
            }
        }
        return ret;
    }

    public List<MapleCharacter> getPlayersInRect(Rectangle box, List<MapleCharacter> chr) {
        List<MapleCharacter> character = new LinkedList<MapleCharacter>();
        synchronized (characters) {
            for (MapleCharacter a : characters) {
                if (chr.contains(a.getClient().getPlayer())) {
                    if (box.contains(a.getPosition())) {
                        character.add(a);
                    }
                }
            }
        }
        return character;
    }

    public List<MapleCharacter> getPlayersInRect(Rectangle box) {
        List<MapleCharacter> character = new LinkedList<MapleCharacter>();
        synchronized (characters) {
            for (MapleCharacter a : characters) {
                if (box.contains(a.getPosition())) {
                    character.add(a);
                }
            }
        }
        return character;
    }

    public void addPortal(MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public MaplePortal getPortal(String portalname) {
        for (MaplePortal port : portals.values()) {
            if (port.getName().equals(portalname)) {
                return port;
            }
        }
        return null;
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public MaplePortal getPortal(int portalid) {
        return portals.get(portalid);
    }

    public void addMapleArea(Rectangle rec) {
        areas.add(rec);
    }

    public List<Rectangle> getAreas() {
        return new ArrayList<Rectangle>(areas);
    }

    public Rectangle getArea(int index) {
        return areas.get(index);
    }

    public void setFootholds(MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public MapleFootholdTree getFootholds() {
        return footholds;
    }

    /**
     * not threadsafe, please synchronize yourself
     *
     * @param monster
     */
    public void addMonsterSpawn(MapleMonster monster, int mobTime) {
        Point newpos = calcPointBelow(monster.getPosition());
        newpos.y -= 1;
        SpawnPoint sp = new SpawnPoint(monster, newpos, mobTime);

        monsterSpawn.add(sp);
    }

    public float getMonsterRate() {
        return monsterRate;
    }

    public Collection<MapleCharacter> getCharacters() {
        synchronized (this.characters) {
            return Collections.unmodifiableCollection(this.characters);
        }
    }

    public MapleCharacter getCharacterById(int id) {
        for (MapleCharacter c : this.characters) {
            if (c.getId() == id) {
                return c;
            }
        }
        return null;
    }

    private void updateMapObjectVisibility(MapleCharacter chr, MapleMapObject mo) {
        if (!chr.isMapObjectVisible(mo)) { // monster entered view range
            if (mo.getType() == MapleMapObjectType.SUMMON || mo.getPosition().distanceSq(chr.getPosition()) <= MapleCharacter.MAX_VIEW_RANGE_SQ) {
                chr.addVisibleMapObject(mo);
                mo.sendSpawnData(chr.getClient());
                //System.out.println("时空门 - 4");
            }
        } else { // monster left view range
            if (mo.getType() != MapleMapObjectType.SUMMON && mo.getPosition().distanceSq(chr.getPosition()) > MapleCharacter.MAX_VIEW_RANGE_SQ) {
                chr.removeVisibleMapObject(mo);
                mo.sendDestroyData(chr.getClient());
            }
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);
        synchronized (characters) {
            for (MapleCharacter chr : characters) {
                updateMapObjectVisibility(chr, monster);
            }
        }
    }

    public void movePlayer(MapleCharacter player, Point newPosition) {
        player.setPosition(newPosition);
        Collection<MapleMapObject> visibleObjects = player.getVisibleMapObjects();
        MapleMapObject[] visibleObjectsNow = visibleObjects.toArray(new MapleMapObject[visibleObjects.size()]);
        for (MapleMapObject mo : visibleObjectsNow) {
            if (mo != null) {
                if (mapobjects.get(mo.getObjectId()) == mo) {
                    updateMapObjectVisibility(player, mo);
                    //System.out.println("时空门 - 5A");
                } else {
                    player.removeVisibleMapObject(mo); //取消地图效果

                    //System.out.println("时空门 - 5B");
                }
            }
        }
        for (MapleMapObject mo : getMapObjectsInRange(player.getPosition(), MapleCharacter.MAX_VIEW_RANGE_SQ, rangedMapobjectTypes)) {
            if (mo != null) {
                if (!player.isMapObjectVisible(mo)) {
                    mo.sendSpawnData(player.getClient());
                    //System.out.println("时空门 - 5C");
                    player.addVisibleMapObject(mo);
                }
            }
        }
        if (getId() == 240040611) {
            if (getMapObjectsInRange(player.getPosition(), 25000, Arrays.asList(MapleMapObjectType.REACTOR)).size() > 0) {
                MapleReactor reactor = getReactorById(2408004);
                if (reactor.getState() == 0) {
                    reactor.hitReactor(player.getClient());
                }
            }
        }
    }

    public void setSpawnRateMulti(int sr) {
        if (sr == 0) {
            return;
        }
        boolean decSpawn = sr < 0;
        if (decSpawn) {
            this.monsterRate *= (-sr);
        } else {
            this.monsterRate /= sr;
        }

    }

    public float getSpawnRate() {
        return this.monsterRate;
    }

    public float getOrigSpawnRate() {
        return this.origMobRate;
    }

    public void setSpawnRate(float sr) {
        this.monsterRate = sr;

    }

    public void resetSpawnRate() {
        this.monsterRate = this.origMobRate;

    }

    public boolean isSpawnRateModified() {
        return this.monsterRate != this.origMobRate;
    }

    public void resetSpawn() {
        if (spawnWorker != null) {
            spawnWorker.cancel(true);
        }
        if (this.monsterRate > 0) {
            spawnWorker = TimerManager.getInstance().register(new RespawnWorker(), 7000);
        }
    }

    public void spawnDebug(MessageCallback mc) {
        mc.dropMessage("刷出的BUG...");
        synchronized (mapobjects) {
            mc.dropMessage("Mapobjects in map: " + mapobjects.size() + " \"spawnedMonstersOnMap\": "
                    + spawnedMonstersOnMap + " spawnpoints: " + monsterSpawn.size()
                    + " maxRegularSpawn: " + getMaxRegularSpawn() + " spawnRate: " + this.monsterRate + " original spawnRate: " + this.origMobRate);
            int numMonsters = 0;
            for (MapleMapObject mo : mapobjects.values()) {
                if (mo instanceof MapleMonster) {
                    numMonsters++;
                }
            }
            mc.dropMessage("actual monsters: " + numMonsters);
        }
    }

    public void spawnPB() {
        killAllMonsters();
        spawnMonsterwithpos(MapleLifeFactory.getMonster(8820009), new Point(7, -42));
    }

    public void spawnMonsterwithpos(MapleMonster mob, Point pos) {
        mob.setPosition(pos);
        spawnMonster(mob);
    }

    private int getMaxRegularSpawn() {
        return (int) (monsterSpawn.size() / monsterRate);
    }

    public String getMapName() {
        return mapName;
    }

    public void setMapName(String mapName) {
        this.mapName = mapName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setClock(boolean hasClock) {
        this.clock = hasClock;
    }

    public boolean hasClock() {
        return clock;
    }

    public void setTown(boolean isTown) {
        this.town = isTown;
    }

    public void setTarget(boolean isTarget) {
        this.Target = isTarget;
    }

    public boolean isTarget() {
        return Target;
    }

    public boolean isTown() {
        return town;
    }

    public void setAllowShops(boolean allowShops) {
        this.allowShops = allowShops;
    }

    public boolean allowShops() {
        return allowShops;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setEverlast(boolean everlast) {
        this.everlast = everlast;
    }

    public boolean getEverlast() {
        return everlast;
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();


    }

    private class ExpireMapItemJob implements Runnable {

        private MapleMapItem mapitem;

        public ExpireMapItemJob(MapleMapItem mapitem) {
            this.mapitem = mapitem;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                synchronized (mapitem) {
                    if (mapitem.isPickedUp()) {
                        return;
                    }
                    MapleMap.this.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0),
                            mapitem.getPosition());
                    MapleMap.this.removeMapObject(mapitem);
                    mapitem.setPickedUp(true);
                }
            }
        }
    }

    private class ActivateItemReactor implements Runnable {

        private MapleMapItem mapitem;
        private MapleReactor reactor;
        private MapleClient c;

        public ActivateItemReactor(MapleMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                synchronized (mapitem) {
                    TimerManager tMan = TimerManager.getInstance();
                    if (mapitem.isPickedUp()) {
                        return;
                    }
                    MapleMap.this.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0), mapitem.getPosition());
                    MapleMap.this.removeMapObject(mapitem);
                    reactor.hitReactor(c);
                    reactor.setTimerActive(false);
                    if (reactor.getDelay() > 0) { //This shit is negative.. Fix?
                        tMan.schedule(new Runnable() {
                            @Override
                            public void run() {
                                reactor.setState((byte) 0);
                                broadcastMessage(MaplePacketCreator.triggerReactor(reactor, 0));
                            }
                        }, reactor.getDelay());
                    }
                }
            }
        }
    }

    private class RespawnWorker implements Runnable {

        @Override
        public void run() {
            if (characters.size() == 0) {
                return;
            } else {
                int numShouldSpawn = getMaxRegularSpawn() - spawnedMonstersOnMap.get();
                if (numShouldSpawn > 0) {
                    List<SpawnPoint> randomSpawn = new ArrayList<SpawnPoint>(monsterSpawn);
                    Collections.shuffle(randomSpawn);
                    int spawned = 0;
                    for (SpawnPoint spawnPoint : randomSpawn) {
                        if (spawnPoint.shouldSpawn()) {
                            spawnPoint.spawnMonster(MapleMap.this);
                            spawned++;
                        }
                        if (spawned >= numShouldSpawn) {
                            break;
                        }
                    }
                }
            }
        }
    }

    private static interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    private static interface SpawnCondition {

        boolean canSpawn(MapleCharacter chr);
    }

    public int getHPDec() {
        return decHP;
    }

    public void setHPDec(int delta) {
        decHP = delta;
    }

    public int getHPDecProtect() {
        return this.protectItem;
    }

    public void setHPDecProtect(int delta) {
        this.protectItem = delta;
    }

    public int hasBoat() {
        if (boat && docked) {
            return 2;
        } else if (boat) {
            return 1;
        } else {
            return 0;
        }
    }

    public void setBoat(boolean hasBoat) {
        this.boat = hasBoat;
    }

    public void setDocked(boolean isDocked) {
        this.docked = isDocked;
    }

    public void setEvent(boolean hasEvent) {
        this.hasEvent = hasEvent;
    }

    public boolean hasEvent() {
        return hasEvent;
    }

    public int countReactorsOnMap() {
        int count = 0;
        Collection<MapleMapObject> mmos = this.getMapObjects();
        for (MapleMapObject mmo : mmos) {
            if (mmo instanceof MapleReactor) {
                count++;
            }
        }
        return count;
    }

    public int countMobOnMap() {
        int count = 0;
        Collection<MapleMapObject> mmos = this.getMapObjects();
        for (MapleMapObject mmo : mmos) {
            if (mmo instanceof MapleMonster) {
                count++;
            }
        }
        return count;
    }

    public int countMobOnMap(int monsterid) {
        int count = 0;
        Collection<MapleMapObject> mmos = this.getMapObjects();
        for (MapleMapObject mmo : mmos) {
            if (mmo instanceof MapleMonster) {
                MapleMonster monster = (MapleMonster) mmo;
                if (monster.getId() == monsterid) {
                    count++;
                }
            }
        }
        return count;
    }

    public void setOx(MapleOxQuiz set) {
        this.ox = set;
    }

    public MapleOxQuiz getOx() {
        return this.ox;
    }

    public MapleReactor getReactorById(int id) {
        synchronized (mapobjects) {
            for (MapleMapObject obj : mapobjects.values()) {
                if (obj.getType() == MapleMapObjectType.REACTOR) {
                    if (((MapleReactor) obj).getId() == id) {
                        return (MapleReactor) obj;
                    }
                }
            }
            return null;
        }
    }

    public boolean isPQMap() { //不包括互动地图
        int tmapid = this.getId();
        if ((tmapid > 922010000 && tmapid < 922011100) || 
        	(tmapid >= 103000800 && tmapid < 103000890) || 
        	(tmapid >= 106021500 && tmapid < 106021510) ||
        	(tmapid == 910010000) // 月兔pq
        	) { //kpq + lpq only atm
            return true;
        }
        return false;
    }

    public boolean isCPQMap() {
        switch (this.getId()) {
            case 980000101:
            case 980000201:
            case 980000301:
            case 980000401:
            case 980000501:
            case 980000601:
                return true;
            default:
                return false;
        }
    }

    public boolean isBlueCPQMap() {
        switch (this.getId()) {
            case 980000501:
            case 980000601:
                return true;
            default:
                return false;
        }
    }

    public boolean isPurpleCPQMap() {
        switch (this.getId()) {
            case 980000301:
            case 980000401:
                return true;
            default:
                return false;
        }
    }

    public void addClock(int seconds) {
        broadcastMessage(MaplePacketCreator.getClock(seconds));
    }

    public boolean cannotInvincible() {
        return cannotInvincible;
    }

    public void setCannotInvincible(boolean b) {
        cannotInvincible = b;
    }

    /*public void setFieldLimit(int fl) {
     fieldLimit = fl;
     canVipRock = !FieldLimit.CANNOTVIPROCK.check(fl);
     }*/
    public void setFieldLimit(int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public int getFieldLimit() {
        return fieldLimit;
    }

    public boolean canVipRock() {
        return canVipRock;
    }

    public void setFirstUserEnter(String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public void setUserEnter(String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public void killAllBoogies() {
        List<MapleMapObject> monsters = getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
        for (MapleMapObject monstermo : monsters) {
            MapleMonster monster = (MapleMonster) monstermo;
            if (monster.getId() == 3230300 || monster.getId() == 3230301 || monster.getName().toLowerCase().contains("boogie")) {
                spawnedMonstersOnMap.decrementAndGet();
                monster.setHp(0);
                broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
                removeMapObject(monster);
            }
        }
        this.broadcastMessage(MaplePacketCreator.serverNotice(6, "As the rock crumbled, Jr. Boogie fell in great pain and disappeared."));
    }

    public void setOnUserEnter(String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public String getOnUserEnter() {
        return onUserEnter;
    }

    public void setOnFirstUserEnter(String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public String getOnFirstUserEnter() {
        return onFirstUserEnter;
    }

    private boolean hasForcedEquip() {
        return fieldType == 81 || fieldType == 82;
    }

    public void setFieldType(int fieldType) {
        this.fieldType = fieldType;
    }

    public void setTimeMobId(int id) {
        this.timeMobId = id;
    }

    public void setTimeMobMessage(String message) {
        this.timeMobMessage = message;
    }

    public int getTimeMobId() {
        return timeMobId;
    }

    public String getTimeMobMessage() {
        return timeMobMessage;
    }

    public MaplePortal findClosestPortal(Point from) {
        MaplePortal closest = null;
        double shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            double distance = portal.getPosition().distanceSq(from);
            if (distance < shortestDistance) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public MaplePortal getRandomSpawnpoint() {
        List<MaplePortal> spawnPoints = new ArrayList<MaplePortal>();
        for (MaplePortal portal : portals.values()) {
            if (portal.getType() >= 0 && portal.getType() <= 2) {
                spawnPoints.add(portal);
            }
        }
        MaplePortal portal = spawnPoints.get(new Random().nextInt(spawnPoints.size()));
        return portal != null ? portal : getPortal(0);
    }

    public void clearDrops(MapleCharacter player, boolean command) {
        List<MapleMapObject> items = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
        for (MapleMapObject i : items) {
            player.getMap().removeMapObject(i);
            player.getMap().broadcastMessage(MaplePacketCreator.removeItemFromMap(i.getObjectId(), 0, player.getId()));
        }
        if (command) {
            player.message("Items Destroyed: " + items.size());
        }
    }

    public int playerCount() {
        List players = getMapObjectsInRange(new Point(0, 0), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.PLAYER}));
        int count = players.size();
        return count;
    }

    public int mobCount() {
        return getMapObjectsInRange(new Point(0, 0), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER})).size();
    }

    public void killAllmonster() {
        List<MapleMapObject> monsters = getMapObjectsInRange(new Point(0, 0), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}));
        for (MapleMapObject monstermo : monsters) {
            MapleMonster monster = (MapleMonster) monstermo;
            this.spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MaplePacketCreator.killMonster(monster.getObjectId(), true), monster.getPosition());
            removeMapObject(monster);
        }
    }
}
