package net.sf.cherry.scripting;

import java.awt.Point;
import java.rmi.RemoteException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleMonsterStats;
import net.sf.cherry.server.maps.SavedLocationType;

public class AbstractPlayerInteraction {

    private MapleClient c;

    public AbstractPlayerInteraction(MapleClient c) {
        this.c = c;
    }

    protected MapleClient getClient() {
        return this.c;
    }

    public MapleCharacter getPlayer() {
        return this.c.getPlayer();
    }

    public void clearAranPolearm() {
        this.c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem((byte)-1);
    }

    public void warp(int map) {
        if (this.c.getPlayer().getCherryBan()) {
            this.c.getPlayer().getCherryBanMessage();
            return;
        }
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(0));
    }

    public void warp(int map, int portal) {
        if (this.c.getPlayer().getCherryBan()) {
            this.c.getPlayer().getCherryBanMessage();
            return;
        }
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    public void warp(int map, String portal) {
        if (this.c.getPlayer().getCherryBan()) {
            this.c.getPlayer().getCherryBanMessage();
            return;
        }
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    protected MapleMap getWarpMap(int map) {
        MapleMap target;
        if (getPlayer().getEventInstance() == null) {
            target = ChannelServer.getInstance(this.c.getChannel()).getMapFactory().getMap(map);
        } else {
            target = getPlayer().getEventInstance().getMapInstance(map);
        }
        return target;
    }

    public MapleMap getMap(int map) {
        return getWarpMap(map);
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1);
    }

    public boolean haveItem(int itemid, int quantity) {
        return haveItem(itemid, quantity, false, false);
    }

    public boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean exact) {
        return this.c.getPlayer().haveItem(itemid, quantity, checkEquipped, exact);
    }

    public boolean canHold(int itemid) {
        return this.c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    public MapleQuestStatus.Status getQuestStatus(int id) {
        return this.c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus();
    }

    public boolean isQuestActive(int id) {
        return this.c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus() == MapleQuestStatus.Status.STARTED;//任务活动
    }

    public boolean isQuestFinished(int id) { //是任务完成
        return this.c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus() == MapleQuestStatus.Status.COMPLETED;
    }

    public void gainItem(int id, short quantity) {
        gainItem(id, quantity, false);
    }

    public void setTimeOut(long time,final int mapId) {
        TimerManager.getInstance().schedule(new Runnable() {
            public void run() {
                MapleMap map = AbstractPlayerInteraction.this.c.getPlayer().getMap();
                MapleMap outMap = AbstractPlayerInteraction.this.c.getChannelServer().getMapFactory().getMap(mapId);
                for (MapleCharacter player : map.getCharacters()) {
                    player.getClient().getPlayer().changeMap(outMap, outMap.getPortal(0));
                }
            }
        }, time);
    }

    public void gainItem(int id, short quantity, boolean randomStats) {
        if (quantity >= 0) {
            boolean space = false;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            IItem item = ii.getEquipById(id);
            MapleInventoryType type = ii.getInventoryType(id);
            StringBuilder logInfo = new StringBuilder(this.c.getPlayer().getName());
            logInfo.append(" received ");
            logInfo.append(quantity);
            logInfo.append(" from a scripted PlayerInteraction (");
            logInfo.append(toString());
            logInfo.append(")");
            if (!MapleInventoryManipulator.checkSpace(this.c, id, quantity, "")) {
                MapleInventoryType invtype = ii.getInventoryType(id);
                this.c.getSession().write(MaplePacketCreator.serverNotice(1, "你的背包已满"));
                return;
            }
            if ((type.equals(MapleInventoryType.EQUIP)) && (!ii.isThrowingStar(item.getItemId())) && (!ii.isBullet(item.getItemId()))) {
                if (randomStats) {
                    MapleInventoryManipulator.addFromDrop(this.c, ii.randomizeStats((Equip) item), logInfo.toString(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(this.c, (Equip) item, logInfo.toString(), false);
                }
            } else {
                MapleInventoryManipulator.addById(this.c, id, quantity, logInfo.toString(), null, -1);
            }
        } else {
            MapleInventoryManipulator.removeById(this.c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        this.c.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
    }

    public boolean addItem(int id, short quantity, boolean randomStats) {
        if (quantity >= 0) {
            boolean space = false;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            IItem item = ii.getEquipById(id);
            MapleInventoryType type = ii.getInventoryType(id);
            StringBuilder logInfo = new StringBuilder(this.c.getPlayer().getName());
            logInfo.append(" received ");
            logInfo.append(quantity);
            logInfo.append(" from a scripted PlayerInteraction (");
            logInfo.append(toString());
            logInfo.append(")");
            if (!MapleInventoryManipulator.checkSpace(this.c, id, quantity, "")) {
                MapleInventoryType invtype = ii.getInventoryType(id);
                this.c.getSession().write(MaplePacketCreator.serverNotice(1, "你的背包已满"));
                return false;
            }
            if ((type.equals(MapleInventoryType.EQUIP)) && (!ii.isThrowingStar(item.getItemId())) && (!ii.isBullet(item.getItemId()))) {
                if (randomStats) {
                    MapleInventoryManipulator.addFromDrop(this.c, ii.randomizeStats((Equip) item), logInfo.toString(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(this.c, (Equip) item, logInfo.toString(), false);
                }
            } else {
                MapleInventoryManipulator.addById(this.c, id, quantity, logInfo.toString(), null, -1);
            }
        } else {
            MapleInventoryManipulator.removeById(this.c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        this.c.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
        return true;
    }
    
    public int getSavedLocation(String loc) {
        Integer ret = Integer.valueOf(this.c.getPlayer().getSavedLocation(SavedLocationType.fromString(loc)));
        if ((ret == null) || (ret.intValue() == -1)) {
            return 100000000;
        }
        return ret.intValue();
    }
    
    public void saveLocation(String loc) {
        this.c.getPlayer().saveLocation(SavedLocationType.fromString(loc));
    }

    public void saveReturnLocation(String loc) {
        this.c.getPlayer().saveLocation(SavedLocationType.fromString(loc), this.c.getPlayer().getMap().getReturnMap().getId());
    }

    public void clearSavedLocation(String loc) {
        this.c.getPlayer().clearSavedLocation(SavedLocationType.fromString(loc));
    }

    public void changeMusic(String songName) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    public void playerMessage(String message) {
        playerMessage(5, message);
    }

    public void mapMessage(String message) {
        mapMessage(5, message);
    }

    public void guildMessage(String message) {
        guildMessage(5, message);
    }

    public void playerMessage(int type, String message) {
        this.c.getSession().write(MaplePacketCreator.serverNotice(type, message));
    }

    public void mapMessage(int type, String message) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void guildMessage(int type, String message) {
        MapleGuild guild = getGuild();
        if (guild != null) {
            guild.guildMessage(MaplePacketCreator.serverNotice(type, message));
        }
    }

    public MapleGuild getGuild() {
        try {
            return this.c.getChannelServer().getWorldInterface().getGuild(getPlayer().getGuildId(), new MapleGuildCharacter(getPlayer()));
        } catch (RemoteException ex) {
            Logger.getLogger(AbstractPlayerInteraction.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public void gainGP(int amount) {
        try {
            this.c.getChannelServer().getWorldInterface().gainGP(getPlayer().getGuildId(), amount);
        } catch (RemoteException e) {
            this.c.getChannelServer().reconnectWorld();
        }
    }

    public MapleParty getParty() {
        return this.c.getPlayer().getParty();
    }

    public boolean isLeader() {
        return getParty().getLeader().equals(new MaplePartyCharacter(this.c.getPlayer()));
    }

    public void givePartyItems(int id, short quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            if (quantity >= 0) {
                StringBuilder logInfo = new StringBuilder(cl.getPlayer().getName());
                logInfo.append(" received ");
                logInfo.append(quantity);
                logInfo.append(" from event ");
                logInfo.append(chr.getEventInstance().getName());
                MapleInventoryManipulator.addById(cl, id, quantity, logInfo.toString(), null, -1);
            } else {
                MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
            }
            cl.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
        }
    }

    public void givePartyExp(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp(amount * this.c.getChannelServer().getExpRate(), true, true);
        }
    }

    public void removeFromParty(int id, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(id);
            MapleInventory iv = cl.getPlayer().getInventory(type);
            int possesed = iv.countById(id);

            if (possesed > 0) {
                MapleInventoryManipulator.removeById(this.c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possesed, true, false);
                cl.getSession().write(MaplePacketCreator.getShowItemGain(id, (short) (-possesed), true));
            }
        }
    }

    public void removeAll(int id) {
        removeAll(id, this.c);
    }

    public void removeAll(int id, MapleClient cl) {
        int possessed = cl.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(id)).countById(id);
        if (possessed > 0) {
            MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possessed, true, false);
            cl.getSession().write(MaplePacketCreator.getShowItemGain(id, (short) (-possessed), true));
        }
    }

   public void gainCloseness(int closeness, int index) {
        MaplePet pet = getPlayer().getPet(index);
        if (pet != null) {
            pet.setCloseness(pet.getCloseness() + closeness);
            getClient().getSession().write(MaplePacketCreator.updatePet(pet, getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
        }
    }

      public void gainClosenessAll(int closeness) {
        for (MaplePet pet : getPlayer().getPets()) {
            if (pet != null) {
                pet.setCloseness(pet.getCloseness() + closeness);
                getClient().getSession().write(MaplePacketCreator.updatePet(pet, getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
            }
        }
    }

    public int getMapId() {
        return this.c.getPlayer().getMap().getId();
    }

    public int getPlayerCount(int mapid) {
        return this.c.getChannelServer().getMapFactory().getMap(mapid).getCharacters().size();
    }

    public int getCurrentPartyId(int mapid) {
        return getMap(mapid).getCurrentPartyId();
    }

    public void showInstruction(String msg, int width, int height) {
        this.c.getSession().write(MaplePacketCreator.sendHint(msg, width, height));
        this.c.getSession().write(MaplePacketCreator.enableActions());
    }

    public void worldMessage(int type, String message) {
        MaplePacket packet = MaplePacketCreator.serverNotice(type, message);
        MapleCharacter chr = this.c.getPlayer();
        try {
            ChannelServer.getInstance(chr.getClient().getChannel()).getWorldInterface().broadcastMessage(chr.getName(), packet.getBytes());
        } catch (RemoteException e) {
            chr.getClient().getChannelServer().reconnectWorld();
        }
    }

    public int getBossLog(String bossid) {
        return getPlayer().getBossLog(bossid);
    }

    public void setBossLog(String bossid) {
        getPlayer().setBossLog(bossid);
    }

    public void sendMessage(String message) {
        new ServernoticeMapleClientMessageCallback(0, this.c).dropMessage(message);
    }

    public void resetMap(int mapid) {
        getMap(mapid).resetReactors();
        getMap(mapid).killAllMonsters();
        for (MapleMapObject i : getMap(mapid).getMapObjectsInRange(this.c.getPlayer().getPosition(), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.ITEM}))) {
            getMap(mapid).removeMapObject(i);
            getMap(mapid).broadcastMessage(MaplePacketCreator.removeItemFromMap(i.getObjectId(), 0, this.c.getPlayer().getId()));
        }
    }

    public void sendClock(MapleClient d, int time) {
        d.getSession().write(MaplePacketCreator.getClock((int) (time - System.currentTimeMillis()) / 1000));
    }

    public void useItem(int id) {
        MapleItemInformationProvider.getInstance().getItemEffect(id).applyTo(this.c.getPlayer());
        this.c.getSession().write(MaplePacketCreator.getStatusMsg(id));
    }

    public void aranTemporarySkills() {
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 0, -1);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 0, -1);
        this.c.getPlayer().setRemainingSp(0);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 1, 0);
        this.c.getPlayer().setRemainingSp(0);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 1, 0);
        this.c.getPlayer().setRemainingSp(0);
    }

    public void aranTemporarySkills2() {
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 0, -1);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 0, -1);
        this.c.getPlayer().setRemainingSp(0);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 1, 0);
        this.c.getPlayer().setRemainingSp(0);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 1, 0);
    }

    public void aranTemporarySkills3() {
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 0, -1);
        this.c.getPlayer().setRemainingSp(0);
        this.c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 1, 0);
    }

    public void showWZEffect(String path, int info) {
        this.c.getSession().write(MaplePacketCreator.showWZEffect(path, info));
    }

    public void updateAranIntroState(String mode) {
        this.c.getPlayer().addAreaData(21002, mode);
        this.c.getSession().write(MaplePacketCreator.updateIntroState(mode, 21002));
    }

    public void updateAranIntroState2(String mode) {
        this.c.getPlayer().addAreaData(21019, mode);
        this.c.getSession().write(MaplePacketCreator.updateIntroState(mode, 21019));
    }

    public boolean getAranIntroState(String mode) {
        return this.c.getPlayer().ares_data.contains(mode);
    }

    public void updateCygnusIntroState(String mode) {
        this.c.getPlayer().addAreaData(20021, mode);
        this.c.getSession().write(MaplePacketCreator.updateIntroState(mode, 20021));
    }

    public boolean getCygnusIntroState(String mode) {
        return this.c.getPlayer().ares_data.contains(mode);
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

    public void spawnTutorialSummon() {
        this.c.getSession().write(MaplePacketCreator.spawnTutorialSummon(1));
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

    public void lockUI() {
        this.c.getPlayer();
        MapleCharacter.tutorial = true;
        this.c.getSession().write(MaplePacketCreator.lockUI(true));
        this.c.getSession().write(MaplePacketCreator.disableUI(true));
    }

    public void unlockUI() {
        this.c.getPlayer();
        MapleCharacter.tutorial = false;
        this.c.getSession().write(MaplePacketCreator.lockUI(false));
        this.c.getSession().write(MaplePacketCreator.disableUI(false));
    }

    public boolean inIntro() {
        this.c.getPlayer();
        return MapleCharacter.tutorial;
    }

    public boolean warp(int map, String curPortal, String nextPortal) {
        if (this.c.getPlayer().getMap().getPortal(curPortal).getPortalState()) {
            MapleMap target = ChannelServer.getInstance(this.c.getChannel()).getMapFactory().getMap(map);
            this.c.getPlayer().changeMap(target, target.getPortal(nextPortal));
            return true;
        }
        this.c.getSession().write(MaplePacketCreator.serverNotice(5, "挑战BOSS的战斗已经开始. 入口暂时被关闭. 请稍后再试."));
        return false;
    }

    public void addMapTimer(int duration) {
        this.c.getPlayer().getMap().addMapTimer(duration);
    }

    public void addMapTimer(int duration, int mapToWarpTo) {
        this.c.getPlayer().getMap().addMapTimer(duration, mapToWarpTo);
    }

    public void clearMapTimer() {
        this.c.getPlayer().getMap().clearMapTimer();
    }
    
    public void spawnMonster(int MapId, int mobid, int amount, int x, int y) {
        Point spawnPos = new Point(x, y);
        for (int i = 0; i < amount; i++) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setHp(npcmob.getMaxHp());
            npcmob.setMp(npcmob.getMaxMp());
            getMap(MapId).spawnMonsterOnGroundBelow(npcmob, spawnPos);
        }
    }
    
    public void spawnMonster(int MapId, int mobid, int HP, int MP, int level, int EXP, int boss, int undead, int amount, int x, int y) {
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
            getMap(MapId).spawnMonsterOnGroundBelow(npcmob, spawnPos);
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.scripting.AbstractPlayerInteraction
 * JD-Core Version:    0.6.0
 */