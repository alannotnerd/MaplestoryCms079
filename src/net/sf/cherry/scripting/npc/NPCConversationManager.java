package net.sf.cherry.scripting.npc;

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.channel.handler.DueyActionHandler;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.scripting.AbstractPlayerInteraction;
import net.sf.cherry.scripting.event.EventManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleMonsterCarnival;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleShopFactory;
import net.sf.cherry.server.MapleSquad;
import net.sf.cherry.server.MapleSquadType;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.SpeedRankings;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.cherryms.CherryMSLottery;
import net.sf.cherry.server.cherryms.CherryMScustomEventFactory;
import net.sf.cherry.server.consign.ConsignItem;
import net.sf.cherry.server.consign.ConsignItemManager;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleMonsterInformationProvider;
import net.sf.cherry.server.life.MapleMonsterInformationProvider.DropEntry;
import net.sf.cherry.server.life.MapleMonsterStats;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapFactory;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;

public class NPCConversationManager extends AbstractPlayerInteraction {

    private MapleClient c;
    private int npc;
    private int wh = 0;
    private String getText;
    private boolean isCash = false;
    private MapleCharacter chr;
    private List<MaplePartyCharacter> otherParty;
    private transient int NPC_Mode;
    
    @Deprecated
    public MapleCharacter getcashdd() {
        return getPlayer();
    }

    @Deprecated
    public int getMeso() {
        return getPlayer().getMeso();
    }

    @Deprecated
    public int getLevel() {
        return getPlayer().getLevel();
    }

    @Deprecated
    public MapleCharacter getChar() {
        return getPlayer();
    }
    
    public MapleClient getC() {
        return getClient();
    }
    
    public int getzb() {
        int money = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM accounts WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                money = rs.getInt("money");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
        return money;
    }

    public void setzb(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET money =money+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
    }
     public int getmoneyb() {
        int moneyb = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM accounts WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                moneyb = rs.getInt("moneyb");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
        return moneyb;
    }

    public void setmoneyb(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET moneyb =moneyb+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
    }
  public int getmd5data() {
        int md5data = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM accounts WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                md5data = rs.getInt("md5data");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
        return md5data;
    }

    public void setmd5data(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET md5data =md5data+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
    }
    public int getboss() {
        int boss = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM accounts WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                boss = rs.getInt("boss");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
        return boss;
    }

    public void setboss(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET boss =boss+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
    }
    public void spawnMob(int mapid, int mid, int xpos, int ypos) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mid), new Point(xpos, ypos));
    }
    public void summonMob(int mobid, int customHP, int customEXP, int amount) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (customHP > 0) {
            newStats.setHp(customHP);
        }
        if (customEXP >= 0) {
            newStats.setExp(customEXP);
        }
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, getPlayer().getPosition());
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setOverrideStats(newStats);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, getPlayer().getPosition());
            }
        }
    }

    public boolean PdMapPlayer(int mapid){//判断地图是否有人
        MapleMapFactory mf = c.getChannelServer().getMapFactory(); //的到地图工厂
        if (!mf.getMap(mapid).getAllPlayers().isEmpty()) { //如果等于1人或者大于1人
            return true; //房间状态显示
        } else {
            return false; //房间不可用
        }
    }
    
    public boolean PdMapMob(int mapid, int mobid){
        MapleMapFactory mf = c.getChannelServer().getMapFactory(); //的到地图工厂
        if (mf.getMap(mapid).getMonsterById(mobid) == null) { //如果等于1人或者大于1人
            return true; //房间状态显示
        } else {
            return false; //房间不可用
        }
    }
    public void summonMobAtPosition(int mobid, int customHP, int customEXP, int amount, int posx, int posy) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (customHP > 0) {
            newStats.setHp(customHP);
        }
        if (customEXP >= 0) {
            newStats.setExp(customEXP);
        }
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setOverrideStats(newStats);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
            }
        }
    }

    public void summonMobAtPosition(int mobid, int amount, int posx, int posy) {
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, new Point(posx, posy));
            }
        }
    }
    //高级任务系统 - 指定任务的需要最大打怪数量

    public void MissionMaxNum(int missionid, int maxnum) {
        getPlayer().MissionMaxNum(missionid, maxnum);
    }
    //高级任务系统 - 放弃所有未完成任务

    public void MissionDeleteNotFinish(int charid) {
        getPlayer().MissionDeleteNotFinish(charid);
    }

    //高级任务系统 - 获得任务是否可以做
    public boolean MissionStatus(int charid, int missionid, int maxtimes, int checktype) {
        return getPlayer().MissionStatus(charid, missionid, maxtimes, checktype);
    }

    //弹出单人消息框
    public void startPopMessage(String msg) {
        new ServernoticeMapleClientMessageCallback(1, c).dropMessage(msg);
    }

    //远程弹出单人消息框
    public void startPopMessage(int charid, String msg) {
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : cs.getPlayerStorage().getAllCharacters()) {
                if (chr.getId() == charid) {
                    new ServernoticeMapleClientMessageCallback(1, chr.getClient()).dropMessage(msg);
                }
            }
        }
    }

    public void callGM(String Text) {
        for (ChannelServer cservs : ChannelServer.getAllInstances()) {
            for (MapleCharacter players : cservs.getPlayerStorage().getAllCharacters()) {
                if (players.isGM()) {
                    players.getClient().getSession().write(MaplePacketCreator.serverNotice(6, c.getPlayer().getName() + " 给你发送了一封邮件: " + Text));
                }
            }
        }
    }
    //爆率支持函数

    public List<Integer> getMapMobsIds() {
        List<Integer> mobs = new ArrayList<Integer>();
        Set<Integer> tmobs = new HashSet<Integer>();
        MapleMap map = this.c.getPlayer().getMap();
        double range = (1.0D / 0.0D);
        List<MapleMapObject> monsters = map.getMapObjectsInRange(this.c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}));
        for (MapleMapObject monstermo : monsters) {
            MapleMonster monster = (MapleMonster) monstermo;
            tmobs.add(Integer.valueOf(monster.getId()));
        }
        for (Integer id : tmobs) {
            mobs.add(id);
        }
        return mobs;
    }

    public List<Integer> getMapMobDropsIds(int mobId) {
        List<Integer> items = new ArrayList<Integer>();
        Set<Integer> titems = new HashSet<Integer>();
        MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        List<DropEntry> dropEntrys = mi.retrieveDropChances(mobId);
        for (MapleMonsterInformationProvider.DropEntry dropEntry : dropEntrys) {
            titems.add(Integer.valueOf(dropEntry.itemid));
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer id : titems) {
            if (ii.getName(id.intValue()) != null) {
                items.add(id);
            }
        }
        return items;
    }

    public NPCConversationManager(MapleClient c, int npc, int wh) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.wh = wh;
    }

    public NPCConversationManager(MapleClient c, int npc, int wh, MapleCharacter chr) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.wh = wh;
        this.chr = chr;
    }

    public NPCConversationManager(MapleClient c, int npc, int wh, List<MaplePartyCharacter> otherParty, int b) { //CPQ
        super(c);
        this.c = c;
        this.npc = npc;
        this.wh = wh;
        this.otherParty = otherParty;
    }
    public int getjf() {
        return getPlayer().getjf();
    }
     public void gainjf(int paypalnx) {
        getPlayer().gainjf(paypalnx);
    }
    public void gainNX(int paypalnx) {
        getPlayer().gainNX(paypalnx);
    }

    public void gainDY(int mpoints) {
        getPlayer().gainDY(mpoints);
    }

    public void dispose() {
        NPCScriptManager.getInstance().dispose(this);
    }

    public void sendNext(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) 0));
    }

    public void sendNext(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) speaker));
    }

    public void sendPrev(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) 0));
    }

    public void sendPrev(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) speaker));
    }

    public void sendNextPrev(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) 0));
    }

    public void sendNextPrev(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) speaker));
    }

    public void sendOk(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
    }

    public void sendOk(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) speaker));
    }

    public void sendYesNo(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", (byte) 0));
    }

    public void sendYesNo(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", (byte) speaker));
    }

    public void sendAcceptDecline(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0B, text, "", (byte) 0));
    }

    public void sendAcceptDecline(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", (byte) speaker));
    }

    public void sendSimple(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", (byte) 0));
    }

    public void sendSimple(String text, int speaker) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", (byte) speaker));
    }

    public void sendStyle(String text, int styles[], int card) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalkStyle(npc, text, styles, card));
    }

    public void sendGetNumber(String text, int def, int min, int max) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalkNum(npc, text, def, min, max));
    }

    public void sendGetText(String text) {
        getClient().getSession().write(MaplePacketCreator.getNPCTalkText(npc, text));
    }

    public void setGetText(String text) {
        this.getText = text;
    }

    public String getText() {
        return this.getText;
    }

    public void setCash(boolean bool) {
        this.isCash = bool;
    }

    public boolean isCash() {
        return this.isCash;
    }

    public void openShop(int id) {
        MapleShopFactory.getInstance().getShop(id).sendShop(getClient());
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

    public int gethour() {
        Calendar cal = Calendar.getInstance();
        int hour = cal.get(Calendar.HOUR_OF_DAY);
        return hour;
    }

    public int getmin() {
        Calendar cal = Calendar.getInstance();
        int min = cal.get(Calendar.MINUTE);
        return min;
    }

    public int getsec() {
        Calendar cal = Calendar.getInstance();
        int sec = cal.get(Calendar.SECOND);
        return sec;
    }
    public void openNpc(int id) {
        dispose();
        NPCScriptManager.getInstance().start(getClient(), id, 0);
    }
    public void openNpc(int id, int wh) {
        dispose();
        NPCScriptManager.getInstance().start(getClient(), id, wh);
    }

    public void changeJob(MapleJob job) {
        getPlayer().changeJob(job);
    }
    
    public MapleJob getJob() {
        return getPlayer().getJob();
    }
    
    public void apReset(){
    	getPlayer().apReset();
    }
    public void startQuest(int id) {
        startQuest(id, false);
    }

    public void startQuest(int id, boolean force) {
        MapleQuest.getInstance(id).start(getPlayer(), npc, force);
    }

    public void completeQuest(int id) {
        completeQuest(id, false);
    }

    public void completeQuest(int id, boolean force) {
        MapleQuest.getInstance(id).complete(getPlayer(), this.npc, force);
    }

    public void forfeitQuest(int id) {
        MapleQuest.getInstance(id).forfeit(getPlayer());
    }


    public void gainMeso(int gain) {
        getPlayer().gainMeso(gain, true, false, true);
    }

    public void gainExp(int gain) {
        getPlayer().gainExp(gain, true, true);
    }

    public int getNpc() {
        return this.npc;
    }    
    public void unequipEverything() {
        MapleInventory equipped = getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<Byte> ids = new LinkedList<Byte>();
        for (IItem item : equipped.list()) {
            ids.add(item.getPosition());
        }
        for (byte id : ids) {
            MapleInventoryManipulator.unequip(getC(), id, equip.getNextFreeSlot());
        }
    }

    public void teachSkill(int id, int level, int masterlevel) {
        getPlayer().changeSkillLevel(SkillFactory.getSkill(id), level, masterlevel);
    }

    public void clearSkills() {
        Map<ISkill, MapleCharacter.SkillEntry> skills = getPlayer().getSkills();
        for (Entry<ISkill, MapleCharacter.SkillEntry> skill : skills.entrySet()) {
            getPlayer().changeSkillLevel(skill.getKey(), 0, 0);
        }
    }

    public EventManager getEventManager(String event) {
        return getClient().getChannelServer().getEventSM().getEventManager(event);
    }

    public void showEffect(String effect) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect(effect));
    }

    public void playSound(String sound) {
        getClient().getPlayer().getMap().broadcastMessage(MaplePacketCreator.playSound(sound));
    }

    public String toString() {
        return "Conversation with NPC: " + this.npc;
    }

    public void updateBuddyCapacity(int capacity) {
        getPlayer().setBuddyCapacity(capacity);
    }

    public int getBuddyCapacity() {
        return getPlayer().getBuddyCapacity();
    }

    public void setHair(int hair) {
        getPlayer().setHair(hair);
        getPlayer().updateSingleStat(MapleStat.HAIR, hair);
        getPlayer().equipChanged();
    }

    public void setFace(int face) {
        getPlayer().setFace(face);
        getPlayer().updateSingleStat(MapleStat.FACE, face);
        getPlayer().equipChanged();
    }

    public void setSkin(int color) {
        getPlayer().setSkinColor(c.getPlayer().getSkinColor().getById(color));
        getPlayer().updateSingleStat(MapleStat.SKIN, color);
        getPlayer().equipChanged();
    }
    public void 传送(int map) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(0));
    }
    public void warpPartyFB(int mapId) {
        try {
            MapleMap target = getMap(mapId);
            for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
                if (c.getPlayer() != null) {
                    MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
                    if ((curChar.getEventInstance() == null && c.getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                        curChar.changeMap(target, target.getPortal(0));
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
    public void warpParty(int mapId) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
         //   if (chrs != null) {
                MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
                if ((curChar.getEventInstance() == null && c.getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                    curChar.changeMap(target, target.getPortal(0));
             //   }
            }
        }
    }
    public void 组队传送(int mapId) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
            if ((curChar.getEventInstance() == null && c.getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                curChar.changeMap(target, target.getPortal(0));
            }
        }
    }
    public void warpPartyWithExp(int mapId, int exp) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
            if ((curChar.getEventInstance() == null && c.getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                curChar.changeMap(target, target.getPortal(0));
                curChar.gainExp(exp, true, false, true);
            }
        }
    }

    public void givePartyExpFB(int exp) {
        try {
            for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
                if (chrs != null) {
                    MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
                    curChar.gainExp(exp, true, false, true);
                }
            }
        } catch (Exception e) {
           System.out.println(e);
        }
    }
    public void givePartyExp(int exp) {
        for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
            curChar.gainExp(exp, true, false, true);
        }
    }

    public void warpPartyWithExpMeso(int mapId, int exp, int meso) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chrs : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chrs.getName());
            if ((curChar.getEventInstance() == null && c.getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                curChar.changeMap(target, target.getPortal(0));
                curChar.gainExp(exp, true, false, true);
                curChar.gainMeso(meso, true);
            }
        }
    }

    public void warpRandom(int mapid) {
        MapleMap target = c.getChannelServer().getMapFactory().getMap(mapid);
        MaplePortal portal = target.getPortal((int) (Math.random() * (target.getPortals().size()))); //generate random portal
        getPlayer().changeMap(target, portal);
    }

    public List<MapleCharacter> getPartyMembers() {
        return c.getPlayer().getParty().getPartyMembers();
    }

    public int itemQuantity(int itemid) {
        return getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).countById(itemid);
    }

    public void removeMapleSquad(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.getLeader().getId() == getPlayer().getId()) {
                squad.clear();
                c.getChannelServer().removeMapleSquad(squad, type);
            }
        }
    }

    public int numSquadMembers(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        int ret = 0;
        if (squad != null) {
            ret = squad.getSquadSize();
        }
        return ret;
    }

    public void setSquadState(MapleSquadType type, int state) {
        MapleSquad squad = this.c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.setStatus(state);
        }
    }

    public boolean checkSquadLeader(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.getLeader().getId() == getPlayer().getId()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /*
     * public int numSquadMembers(MapleSquadType type) { MapleSquad squad =
     * c.getChannelServer().getMapleSquad(type); int ret = 0; if (squad != null)
     * { ret = squad.getSquadSize(); } return ret;
     }
     */
    public boolean isSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        boolean ret = false;
        if (squad.containsMember(getPlayer())) {
            ret = true;
        }
        return ret;
    }

    public void addSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.addMember(getPlayer());
        }
    }

    public void addRandomItem(int id) {
        MapleItemInformationProvider i = MapleItemInformationProvider.getInstance();
        MapleInventoryManipulator.addFromDrop(getClient(), i.randomizeStats((Equip) i.getEquipById(id)), true);
    }

    public void removeSquadMember(MapleSquadType type, MapleCharacter chr, boolean ban) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.banMember(chr, ban);
        }
    }

    public void removeSquadMember(MapleSquadType type, int index, boolean ban) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            MapleCharacter chrs = squad.getMembers().get(index);
            squad.banMember(chrs, ban);
        }
    }

    public boolean canAddSquadMember(MapleSquadType type) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.isBanned(getPlayer())) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    public void warpSquadMembers(MapleSquadType type, int mapId) {
        MapleSquad squad = c.getChannelServer().getMapleSquad(type);
        MapleMap map = c.getChannelServer().getMapFactory().getMap(mapId);
        if (squad != null) {
            if (checkSquadLeader(type)) {
                for (MapleCharacter chrs : squad.getMembers()) {
                    chrs.changeMap(map, map.getPortal(0));
                }
            }
        }
    }

    public MapleSquad getMapleSquad(MapleSquadType type) {
        return this.c.getChannelServer().getMapleSquad(type);
    }

    public void setSquadBossLog(MapleSquadType type, String boss) {
        if (getMapleSquad(type) != null) {
            MapleSquad squad = getMapleSquad(type);
            for (MapleCharacter chrs : squad.getMembers()) {
                chrs.setBossLog(boss);
            }
        }
    }

    public MapleCharacter getCharByName(String name) {
        try {
            return this.c.getChannelServer().getPlayerStorage().getCharacterByName(name);
        } catch (Exception e) {
        }
        return null;
    }

    public void resetReactors() {
        getPlayer().getMap().resetReactors();
    }

    public void displayGuildRanks() {
        MapleGuild.displayGuildRanks(getClient(), this.npc);
    }

    public void displayRewnu2Ranks() {
        MapleGuild.displayRenwu2Ranks(getClient(), this.npc);
    }

    public void displayLevelRanks() {
        MapleGuild.displayLevelRanks(getClient(), this.npc);
    }

    public void displayVipRanks() {
        MapleGuild.displayVipRanks(getClient(), this.npc);
    }

    public MapleCharacter getCharacter() {
        return this.chr;
    }
    //npc简易提供函数类里面没提供vip的获取,所以在脚本里面获取vip要这样写:cm.getPlayer().getvip();  vip的v小写

    public void warpAllInMap(int mapid, int portal) {
        MapleMapFactory mapFactory = ChannelServer.getInstance(this.c.getChannel()).getMapFactory();
        MapleMap outMap = mapFactory.getMap(mapid);
        for (MapleCharacter aaa : outMap.getCharacters()) {
            mapFactory = ChannelServer.getInstance(aaa.getClient().getChannel()).getMapFactory();
            aaa.getClient().getPlayer().changeMap(outMap, outMap.getPortal(portal));
            outMap = mapFactory.getMap(mapid);
            aaa.getClient().getPlayer().getEventInstance().unregisterPlayer(aaa.getClient().getPlayer());
        }
    }

    public int countMonster() {
        MapleMap map = this.c.getPlayer().getMap();
        double range = (1.0D / 0.0D);
        List monsters = map.getMapObjectsInRange(this.c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}));
        return monsters.size();
    }

    public int countReactor() {
        MapleMap map = this.c.getPlayer().getMap();
        double range = (1.0D / 0.0D);
        List reactors = map.getMapObjectsInRange(this.c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.REACTOR}));
        return reactors.size();
    }

    public int getDayOfWeek() {
        Calendar cal = Calendar.getInstance();
        int dayy = cal.get(7);
        return dayy;
    }

    public void giveNPCBuff(MapleCharacter chr, int itemID) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        MapleStatEffect statEffect = mii.getItemEffect(itemID);
        statEffect.applyTo(chr);
    }

    public void giveWonkyBuff(MapleCharacter chr) {
        long what = Math.round(Math.random() * 4.0D);
        int what1 = (int) what;
        int[] Buffs = {2022090, 2022091, 2022092, 2022093};
        int buffToGive = Buffs[what1];
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        MapleStatEffect statEffect = mii.getItemEffect(buffToGive);
        MapleCharacter character = chr;
        statEffect.applyTo(character);
    }

    public boolean hasSkill(int skillid) {
        ISkill theSkill = SkillFactory.getSkill(skillid);
        if (theSkill != null) {
            return this.c.getPlayer().getSkillLevel(theSkill) > 0;
        }
        return false;
    }

    public void spawnMonster(int mobid, int HP, int MP, int level, int EXP, int boss, int undead, int amount, int x, int y) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        Point spawnPos = new Point(x, y);
        if (HP >= 0) {
            newStats.setHp(HP);
        }
        if (MP >= 0) {
            newStats.setMp(MP);
        }
        if (level >= 0) {
            newStats.setLevel(level);
        }
        if (EXP >= 0) {
            newStats.setExp(EXP);
        }
        newStats.setBoss(boss == 1);
        newStats.setUndead(undead == 1);
        for (int i = 0; i < amount; i++) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            npcmob.setMp(npcmob.getMaxMp());
            getPlayer().getMap().spawnMonsterOnGroundBelow(npcmob, spawnPos);
        }
    }

    public int getExpRate() {
        return getClient().getChannelServer().getExpRate();
    }

    public int getDropRate() {
        return getClient().getChannelServer().getDropRate();
    }

    public int getBossDropRate() {
        return getClient().getChannelServer().getBossDropRate();
    }

    public int getMesoRate() {
        return getClient().getChannelServer().getMesoRate();
    }

    public boolean removePlayerFromInstance() {
        if (getClient().getPlayer().getEventInstance() != null) {
            getClient().getPlayer().getEventInstance().removePlayer(getClient().getPlayer());
            return true;
        }
        return false;
    }

    public boolean isPlayerInstance() {
        return getClient().getPlayer().getEventInstance() != null;
    }

    public void openDuey() {
        c.getSession().write(MaplePacketCreator.sendDuey((byte) 9, DueyActionHandler.loadItems(this.c.getPlayer())));
    }

    public void finishAchievement(int id) {
        getPlayer().finishAchievement(id);
    }

    public void changeStat(byte slot, int type, short amount) {
        Equip sel = (Equip) this.c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type) {
            case 0:
                sel.setStr(amount);
                break;
            case 1:
                sel.setDex(amount);
                break;
            case 2:
                sel.setInt(amount);
                break;
            case 3:
                sel.setLuk(amount);
                break;
            case 4:
                sel.setHp(amount);
                break;
            case 5:
                sel.setMp(amount);
                break;
            case 6:
                sel.setWatk(amount);
                break;
            case 7:
                sel.setMatk(amount);
                break;
            case 8:
                sel.setWdef(amount);
                break;
            case 9:
                sel.setMdef(amount);
                break;
            case 10:
                sel.setAcc(amount);
                break;
            case 11:
                sel.setAvoid(amount);
                break;
            case 12:
                sel.setHands(amount);
                break;
            case 13:
                sel.setSpeed(amount);
                break;
            case 14:
                sel.setJump(amount);
                break;
        }

        this.c.getPlayer().equipChanged();
    }

    public void removeHiredMerchantItem(int id) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("DELETE FROM hiredmerchant WHERE id = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
        }
    }

    public boolean hasTemp() {
        return (!getPlayer().hasMerchant()) && (getPlayer().tempHasItems());
    }

    public void removeHiredMerchantItem(boolean tempItem, int itemId) {
        String Table = "hiredmerchant";
        if (tempItem) {
            Table = "hiredmerchanttemp";
        }
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("DELETE FROM " + Table + " WHERE itemid = ? AND ownerid = ? LIMIT 1");
            ps.setInt(1, itemId);
            ps.setInt(2, getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException se) {
        }

    }

    public long getHiredMerchantMesos() {
        Connection con = DatabaseConnection.getConnection();
        long mesos;
        try {
            PreparedStatement ps = con.prepareStatement("SELECT MerchantMesos FROM characters WHERE id = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            rs.next();
            mesos = rs.getLong("MerchantMesos");
            rs.close();
            ps.close();
        } catch (SQLException se) {
            return 0L;
        }
        return mesos;
    }

    public void setHiredMerchantMesos(long set) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET MerchantMesos = ? WHERE id = ?");
            ps.setLong(1, set);
            ps.setInt(2, getPlayer().getId());
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Pair<Integer, IItem>> getStoredMerchantItems() {
        Connection con = DatabaseConnection.getConnection();
        List items = new ArrayList();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM hiredmerchant WHERE ownerid = ? AND onSale = false");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") == 1) {
                    Equip eq = new Equip(rs.getInt("itemid"), (byte) 0);
                    eq.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                    eq.setLevel((byte) rs.getInt("level"));
                    eq.setStr((short) rs.getInt("str"));
                    eq.setDex((short) rs.getInt("dex"));
                    eq.setInt((short) rs.getInt("int"));
                    eq.setLuk((short) rs.getInt("luk"));
                    eq.setHp((short) rs.getInt("hp"));
                    eq.setMp((short) rs.getInt("mp"));
                    eq.setWatk((short) rs.getInt("watk"));
                    eq.setMatk((short) rs.getInt("matk"));
                    eq.setWdef((short) rs.getInt("wdef"));
                    eq.setMdef((short) rs.getInt("mdef"));
                    eq.setAcc((short) rs.getInt("acc"));
                    eq.setAvoid((short) rs.getInt("avoid"));
                    eq.setHands((short) rs.getInt("hands"));
                    eq.setSpeed((short) rs.getInt("speed"));
                    eq.setJump((short) rs.getInt("jump"));
                    eq.setOwner(rs.getString("owner"));
                    eq.setItemExp(rs.getShort("itemEXP"));
                    eq.setItemLevel(rs.getByte("itemLevel"));
                    items.add(new Pair(Integer.valueOf(rs.getInt("id")), eq));
                    continue;
                }
                if (rs.getInt("type") == 2) {
                    Item newItem = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    newItem.setOwner(rs.getString("owner"));
                    items.add(new Pair(Integer.valueOf(rs.getInt("id")), newItem));
                }
            }
            ps.close();
            rs.close();
        } catch (SQLException se) {
            se.printStackTrace();
            return null;
        }
        return items;
    }

    public int getAverageLevel(int mapid) {
        int count = 0;
        int total = 0;
        for (MapleMapObject mmo : c.getChannelServer().getMapFactory().getMap(mapid).getAllPlayers()) {
            total += ((MapleCharacter) mmo).getLevel();
            count++;
        }
        return total / count;
    }

    public void sendCPQMapLists() { //发送嘉年华地图列表
        String msg = "请选择嘉年华对战项目创建与加入:\\r\\n";
        for (int i = 0; i < 6; i++) {
            if (fieldTaken(i)) { //战场  - 
                if (fieldLobbied(i)) {
                    msg += "#b#L" + i + "#怪物嘉年华战场 " + (i + 1) + " 创建等级: " + getAverageLevel(980000100 + i * 100) + "#l\\r\\n"; //获取当前地图
                } else {
                    continue;
                }
            } else {
                msg += "#b#L" + i + "#嘉年华战场 " + (i + 1) + "#l\\r\\n"; //房间序号
            }
        }
        sendSimple(msg);
    }

    public boolean fieldLobbied(int field) { //判断场地
        if (c.getChannelServer().getMapFactory().getMap(980000100 + field * 100).getAllPlayers().size() >= 1) { //如果等于1人或者大于1人
            return true; //房间状态显示
        } else {
            return false; //房间不可用
        }
    }

    public boolean fieldTaken(int field) { //战场  选择
        MapleMapFactory mf = c.getChannelServer().getMapFactory(); //的到地图工厂
        if ((!mf.getMap(980000100 + field * 100).getAllPlayers().isEmpty()) || (mf.getMap(980000101 + field * 100).getAllPlayers().size() != 0) || (mf.getMap(980000102 + field * 100).getAllPlayers().size() != 0)) {
            return true;
        } else {
            return false;
        }
    }

    public void CPQLobby(int field) { //选择战场
        try {
            MapleMap map;
            ChannelServer cs = c.getChannelServer();
            map = cs.getMapFactory().getMap(980000100 + 100 * field);
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                MapleCharacter mc;
                mc = cs.getPlayerStorage().getCharacterByName(mpc.getName());
                if (mc != null) {
                    mc.changeMap(map, map.getPortal(0));
                    String msg = "现在你可以从其他各方接受挑战。如果你在3分钟内不接受挑战，你会被踢出去.";
                    mc.getClient().getSession().write(MaplePacketCreator.serverNotice(5, msg));
                    mc.getClient().getSession().write(MaplePacketCreator.getClock(3 * 60));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void challengeParty(int field) {//挑战方
        MapleCharacter leader = null;
        MapleMap map = c.getChannelServer().getMapFactory().getMap(980000100 + 100 * field);
        for (MapleMapObject mmo : map.getAllPlayers()) {
            MapleCharacter mc = (MapleCharacter) mmo;
            if (mc.getParty().getLeader().getId() == mc.getId()) {
                leader = mc;
                break;
            }
        }
        if (leader != null) { //是 个领袖
            if (!leader.isCPQChallenged()) {
                List<MaplePartyCharacter> challengers = new LinkedList<MaplePartyCharacter>(); //挑战者
                for (MaplePartyCharacter member : c.getPlayer().getParty().getMembers()) {
                    challengers.add(member); //挑战者  成员
                    ////System.out.println("挑战读取为：" + leader + "");
                    playerMessage("挑战读取为：" + leader + ".");
                }
                NPCScriptManager.getInstance().start("CPQChallenged", leader.getClient(), this.npc, challengers);
                ////System.out.println("读取为：" + challengers + "");
            } else {
                //sendOk("另一方正在对一个不同的挑战.");
                String msg = "等待另一方队伍确认.";
                ////System.out.println("等待另一方队伍确认");
            }
        } else {
            //sendOk("找不到领导!");
            String msg = "找不到开房领袖。.";
            ////System.out.println("找不到领导");
        }
    }

    public int calculateCPQRanking() {
        if (this.c.getPlayer().getMap().isCPQMap()) {
            if (this.c.getPlayer().getTotalCP() > 250) {
                return 1;
            }
            if (this.c.getPlayer().getTotalCP() > 100) {
                return 2;
            }
            if (this.c.getPlayer().getTotalCP() > 50) {
                return 3;
            }
            return 4;
        }
        if (this.c.getPlayer().getMap().isCPQMap()) {
            if (this.c.getPlayer().getTotalCP() > 250) {
                return 10;
            }
            if (this.c.getPlayer().getTotalCP() > 100) {
                return 20;
            }
            if (this.c.getPlayer().getTotalCP() > 50) {
                return 30;
            }
            return 40;
        }

        return 999;
    }

    public void startCPQ(final MapleCharacter challenger, int field) { //开始挑战
        try {
            if (challenger != null) {
                if (challenger.getParty() == null) {
                    throw new RuntimeException("错误：案例挑战者号的聚会是零！");
                }
                for (MaplePartyCharacter mpc : challenger.getParty().getMembers()) {
                    MapleCharacter mc;
                    mc = c.getChannelServer().getPlayerStorage().getCharacterByName(mpc.getName());
                    if (mc != null) {
                        mc.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().getPortal(0));
                        mc.getClient().getSession().write(MaplePacketCreator.getClock(10));
                    }
                }
            }
            final int mapid = c.getPlayer().getMap().getId() + 1;
            TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    MapleMap map;
                    ChannelServer cs = c.getChannelServer();
                    map = cs.getMapFactory().getMap(mapid);
                    new MapleMonsterCarnival(getPlayer().getParty(), challenger.getParty(), mapid);
                    map.broadcastMessage(MaplePacketCreator.serverNotice(5, "怪物嘉年华已经开始!"));
                }
            }, 10000);
            mapMessage(5, "怪物嘉年华会在10秒内开始!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int partyMembersInMap() {
        int inMap = 0;
        for (MapleCharacter char2 : getPlayer().getMap().getCharacters()) {
            if (char2.getParty() == getPlayer().getParty()) {
                inMap++;
            }
        }
        return inMap;
    }

    public boolean gotoEvent() {
        ChannelServer cserv = this.c.getChannelServer();
        MapleMap map = cserv.getMapFactory().getMap(cserv.eventmap);
        int level = getPlayer().getLevel();
        if ((level >= cserv.level[0]) && (level <= cserv.level[1])) {
            this.c.getPlayer().changeMap(map, map.getPortal(0));
            return true;
        }
        return false;
    }

    public boolean partyMemberHasItem(int iid) {
        List<MapleCharacter> lmc = this.getPartyMembers();
        if (lmc == null) {
            return this.haveItem(iid);
        }
        for (MapleCharacter mc : lmc) {
            if (mc.haveItem(iid, 1, false, false)) {
                return true;
            }
        }
        return false;
    }

    public void spawnMonster(int mobid, int x, int y) {
        Point spawnPos = new Point(x, y);
        MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
        getPlayer().getMap().spawnMonsterOnGroundBelow(npcmob, spawnPos);
    }

    public void partyNotice(String message) {
        List<MapleCharacter> lmc = this.getPartyMembers();
        if (lmc == null) {
            this.playerMessage(5, message);
            return;
        } else {
            for (MapleCharacter mc : lmc) {
                mc.dropMessage(5, message);
            }
        }
    }

    public String showSpeedRankings(int type) {
        StringBuilder ranks = new StringBuilder("#b#eRankings for ");
        ranks.append(type == 0 ? "Zakum" : "Papulatus");
        ranks.append("#k#n\r\n\r\n");
        for (int i = 0; i < 10; i++) {
            long time = SpeedRankings.getTime(i, type);
            long mins = time / 1000L / 60L;
            time -= mins * 1000L * 60L;
            long seconds = time / 1000L;
            ranks.append(i + 1);
            ranks.append(")#r ");
            ranks.append(SpeedRankings.getTeamMembers(i, type));
            ranks.append("#k ~ #g");
            ranks.append(mins);
            ranks.append("#km#d ");
            ranks.append(seconds);
            ranks.append("#ks");
            ranks.append("\r\n");
        }
        return ranks.toString();
    }

    /*
     * 
     */
    public void serverNotice(String Text) {
        getClient().getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(6, Text));
    }

    public boolean getHiredMerchantItems(boolean tempTable) {
        boolean temp = false, compleated = false;
        String Table = "hiredmerchant";
        if (tempTable) {
            Table = "hiredmerchanttemp";
        }
        if (tempTable) {
            temp = true;
        }
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM " + Table + " WHERE ownerid = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") == 1) {
                    Equip spItem = new Equip(rs.getInt("itemid"), (byte) 0, false);
                    spItem.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                    spItem.setLevel((byte) rs.getInt("level"));
                    spItem.setStr((short) rs.getInt("str"));
                    spItem.setDex((short) rs.getInt("dex"));
                    spItem.setInt((short) rs.getInt("int"));
                    spItem.setLuk((short) rs.getInt("luk"));
                    spItem.setHp((short) rs.getInt("hp"));
                    spItem.setMp((short) rs.getInt("mp"));
                    spItem.setWatk((short) rs.getInt("watk"));
                    spItem.setMatk((short) rs.getInt("matk"));
                    spItem.setWdef((short) rs.getInt("wdef"));
                    spItem.setMdef((short) rs.getInt("mdef"));
                    spItem.setAcc((short) rs.getInt("acc"));
                    spItem.setAvoid((short) rs.getInt("avoid"));
                    spItem.setHands((short) rs.getInt("hands"));
                    spItem.setSpeed((short) rs.getInt("speed"));
                    spItem.setJump((short) rs.getInt("jump"));
                    spItem.setOwner(rs.getString("owner"));
                    spItem.setFlag((byte) rs.getInt("flag"));
                    spItem.setItemExp(rs.getShort("itemEXP"));
                    spItem.setItemLevel(rs.getByte("itemLevel"));
                    if (!getPlayer().getInventory(MapleInventoryType.EQUIP).isFull()) {
                        MapleInventoryManipulator.addFromDrop(c, spItem, true);
                        removeHiredMerchantItem(temp, spItem.getItemId());
                    } else {
                        rs.close();
                        ps.close();
                        return false;
                    }
                } else {
                    Item spItem = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    MapleInventoryType type = ii.getInventoryType(spItem.getItemId());
                    if (!getPlayer().getInventory(type).isFull()) {
                        MapleInventoryManipulator.addFromDrop(c, spItem, true);
                        removeHiredMerchantItem(temp, spItem.getItemId());
                    } else {
                        rs.close();
                        ps.close();
                        return false;
                    }
                }
            }
            rs.close();
            ps.close();
            compleated = true;
        } catch (SQLException se) {
            se.printStackTrace();
            return compleated;
        }
        return compleated;
    }

    @Override
    public void gainItem(int id, short quantity) {
        if (quantity >= 0) {
            StringBuilder logInfo = new StringBuilder(c.getPlayer().getName());
            logInfo.append(" 收到数据 ");
            logInfo.append(quantity);
            logInfo.append(" 从脚本 PlayerInteraction (");
            logInfo.append(this.toString());
            logInfo.append(")");
            MapleInventoryManipulator.addById(c, id, quantity, logInfo.toString()); //获得
        } else {
            MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false); //失去
        }
        c.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true)); //显示语句
    }

    public void resetMap(int mapid) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).resetReactors();
    }
public void yqm(int yqm) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                if(yqm != mch.getPlayer().getId()){
                   ////System.out.println("推广码为空.请填写正确的推广码！");
                   return;
                }
            }
        }
    }
    public void summonBean(int mobid, int amount) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            Point pos = new Point(8, -42);
            getPlayer().getMap().spawnMonsterOnGroundBelow(npcmob, pos);
        } else {
            for (int i = 0; i < amount; i++) {
                Point pos = new Point(8, -42);
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setOverrideStats(newStats);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroundBelow(npcmob, pos);
            }
        }
    }

    public void deleteItem(int inventorytype) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("Select * from inventoryitems where characterid=? and inventorytype=?");
            ps.setInt(1, getPlayer().getId());
            ps.setInt(2, inventorytype);
            ResultSet re = ps.executeQuery();
            MapleInventoryType type = null;
            switch (inventorytype) {
                case 1:
                    type = MapleInventoryType.EQUIP;
                    break;
                case 2:
                    type = MapleInventoryType.USE;
                    break;
                case 3:
                    type = MapleInventoryType.SETUP;
                    break;
                case 4:
                    type = MapleInventoryType.ETC;
                    break;
                case 5:
                    type = MapleInventoryType.CASH;
            }

            while (re.next()) {
                MapleInventoryManipulator.removeById(getC(), type, re.getInt("itemid"), 1, true, true);
            }
            re.close();
            ps.close();
        } catch (SQLException ex) {
        }
    }

    public void closePortal(int mapid, String pName) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).getPortal(pName).setPortalState(false);
    }

    public void openPortal(int mapid, String pName) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).getPortal(pName).setPortalState(true);
    }

    /*
     * public boolean sellconsignItem(int itemtype, int mesos, int paypalnx) {
     * int consignType = itemtype; int consignMesos = mesos; int consignPaypalnx
     * = paypalnx; boolean flage = false; MapleCharacter player = getPlayer();
     * if ((consignMesos <= 0) && (consignPaypalnx <= 0)) {
     * player.dropMessage("参数无效。"); return flage; } if (consignMesos < 0) {
     * consignMesos = 0; } if (consignPaypalnx < 0) { consignPaypalnx = 0; }
     *
     * MapleInventory mapleInventory = null;
     *
     * switch (consignType) { case 1: mapleInventory =
     * player.getInventory(MapleInventoryType.EQUIP); break; case 2:
     * mapleInventory = player.getInventory(MapleInventoryType.USE); break; case
     * 3: mapleInventory = player.getInventory(MapleInventoryType.SETUP); break;
     * case 4: mapleInventory = player.getInventory(MapleInventoryType.ETC);
     * break; case 5: mapleInventory =
     * player.getInventory(MapleInventoryType.CASH); }
     *
     * if (mapleInventory != null) { IItem item = mapleInventory.getItem(1); if
     * (item != null) { ConsignItem consignItem = new ConsignItem(item,
     * consignMesos, consignPaypalnx); consignItem.setMesos(consignMesos);
     * consignItem.setPaypalnx(consignPaypalnx); ConsignItemManager
     * consignItemManager = ConsignItemManager.getInstance();
     * consignItemManager.saveConsignItems(getPlayer().getId(), consignItem);
     * MapleInventoryManipulator.removeFromSlot(this.c,
     * MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId()),
     * 1, consignItem.getItem().getQuantity(), true, false);
     * player.dropMessage("道具上架成功。"); flage = true; } } return flage;
     }
     */
    public List<Pair<Integer, ConsignItem>> getConsignItemsByType(short type) {
        if ((1 < type) || (type > 5)) {
            return null;
        }
        return ConsignItemManager.getInstance().getConsignItemsByType(type);
    }

    public List<Pair<Integer, ConsignItem>> getConsignItemsByCharId() {
        return ConsignItemManager.getInstance().getConsignItemsByCharId(getPlayer().getId());
    }

    public boolean buyConsignItem(int consignItemId, ConsignItem consignItem) {
        boolean flage = false;
        if ((ConsignItemManager.getInstance().hasConsignItem(consignItemId))
                && (!getPlayer().getInventory(MapleInventoryType.EQUIP).isFull())) {
            int charid = ConsignItemManager.getInstance().selectCharByConsignItemId(consignItemId);
            ConsignItemManager.getInstance().haveFromConsign(charid, consignItem.getMesos(), consignItem.getPaypalnx());
            ConsignItemManager.getInstance().deleteConsignItemById(consignItemId);
            // MapleInventoryManipulator.addFromDrop(this.c, (IItem)consignItem, true);
            flage = true;
        }

        return flage;
    }

    public boolean touzhu(int type, int nx, int num) {
        boolean flage = false;
        if (nx >= 50) {
            CherryMSLottery cherryMSLottery = CherryMScustomEventFactory.getInstance().getCherryMSLottery();
            getPlayer().setTouzhuType(type);
            getPlayer().setTouzhuNX(nx);
            getPlayer().setTouzhuNum(num);
            getPlayer().modifyCSPoints(0, -nx);
            cherryMSLottery.addChar(getPlayer());
            flage = true;
        } else {
            flage = false;
        }
        return flage;
    }

    public int seeTouzhuByType(int type) {
        return CherryMScustomEventFactory.getInstance().getCherryMSLottery().getTouNumbyType(type);
    }

    public int getNX() {
        return getPlayer().getNX();
    }
        public int getaccid() {
        return getPlayer().getNX();
    }

    public int getcz() {
        int chongzhi = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM accounts WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                chongzhi = rs.getInt("chongzhi");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return chongzhi;
    }

    public void setcz(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET chongzhi =chongzhi+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
        }
    }
    /*礼包获取*/

    /**
     *
     * @return
     */
    /*vip*/
  public int gettuiguang() { //推广系统
        int tuiguang = 0;
        try {
            //getPlayer().getAccountID(); //读取的是AccountID()表的值
            int cid = getPlayer().getAccountID();
            //int cid = getPlayer().gettuiguang();//推广人账号
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM characters WHERE id=" + cid + "");//写入推广人角色表的值
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                tuiguang = rs.getInt("tuiguang");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return tuiguang;
    }
  
    public void settuiguang(int slot) { //定义推广人获得的指定推广值
        try {
             int cid = getPlayer().getAccountID();
            //int cid = getPlayer().gettuiguang();//推广人账号
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET tuiguang =tuiguang+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
        }
    }
     public int gettuiguang22() { //推广系统
        int tuiguang2 = 0;
        try {
            //getPlayer().getAccountID(); //读取的是AccountID()表的值
            //int cid = getPlayer().getAccountID();
            int cid = getPlayer().gettuiguang();//推广人账号
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM characters WHERE id=" + cid + " WHERE name = ?");//写入推广人角色表的值
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                tuiguang2 = rs.getInt("name");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return tuiguang2;
    }
     public int gettuiguang2() { //推广系统
        int tuiguang2 = 0;
        try {
            //getPlayer().getAccountID(); //读取的是AccountID()表的值
            //int cid = getPlayer().getAccountID();
            int cid = getPlayer().gettuiguang();//推广人账号
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM characters WHERE id=" + cid + "");//写入推广人角色表的值
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                tuiguang2 = rs.getInt("tuiguang2");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return tuiguang2;
    }

    public void settuiguang2(int slot) { //定义推广人获得的指定推广值
        try {
             //int cid = getPlayer().getAccountID();
            int cid = getPlayer().gettuiguang();//推广人账号
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET money =money+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
        }
    }
    /*杀怪记录显示栏位*/
    /*签到系统*/
    public int getqiandao() {
        int qiandao = 0;
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM characters WHERE id=" + cid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                qiandao = rs.getInt("qiandao");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return qiandao;
    }

    public void setqiandao(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET qiandao =qiandao+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
        }
    }

    public long seeAlltouzhu() {
        return CherryMScustomEventFactory.getInstance().getCherryMSLottery().getAlltouzhu();
    }

    public long seeAllpeichu() {
        return CherryMScustomEventFactory.getInstance().getCherryMSLottery().getAllpeichu();
    }

    public int getwh() {
        return this.wh;
    }

    public int getExt(String bossid) {
        return getPlayer().getExt(bossid);
    }

    public void gaincashdd(long cashdd) {
        getPlayer().gainCashDD(cashdd);
    }
    public void fixNullItems() throws SQLException {
        getPlayer().deleteNullItem(getPlayer().getId());
    }
    //public void DYLB(String 钓鱼喇叭){
      //  getClient().getSession().write(MaplePacketCreator.sendHint(钓鱼喇叭, 200, 200));
   // }
     public boolean createMarriage(String partner_) {      //声明变量
        MapleCharacter partner = getCharByName(partner_);  //名字
        if (partner == null) {
            return false;
        }
        partner.setMarried(true);
        getPlayer().setMarried(true);
        partner.setPartnerId(getPlayer().getId());
        getPlayer().setPartnerId(partner.getId());
        if (partner.getGender() > 0) {
            Marriage.createMarriage(getPlayer(), partner);
        } else {
            Marriage.createMarriage(partner, getPlayer());
        }
        return true;
    }

    public boolean createEngagement(String partner_) {
        MapleCharacter partner = getCharByName(partner_);
        if (partner == null) {
            return false;
        }
        if (partner.getGender() > 0) {
            Marriage.createEngagement(getPlayer(), partner);
        } else {
            Marriage.createEngagement(partner, getPlayer());
        }
        return true;
    }

    public void divorceMarriage() {      //增加至XXXX
        getPlayer().setPartnerId(0);
        getPlayer().setMarried(false);
        Marriage.divorceMarriage(getPlayer());  ///结束至XXXX
    }
}
