package net.sf.cherry.net.channel.handler;

import java.awt.Rectangle;
import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.ExpTable;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MaplePet.PetFlag;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.net.Constants.InventoryConstants;
import net.sf.cherry.net.world.remote.WorldLocation;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.maps.MapleLove;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMist;
import net.sf.cherry.server.maps.MapleTVEffect;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class UseCashItemHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(UseCashItemHandler.class);
    int uniqueid;

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        MapleCharacter player = c.getPlayer();
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        int itemType = itemId / 10000;
        IItem toUse = c.getPlayer().getInventory(ii.getInventoryType(itemId)).getItem(slot);
        if ((toUse == null) || (toUse.getItemId() != itemId) || (toUse.getQuantity() < 1)) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        try {
            MaplePet pet = null;
            switch (itemType) {
                case 504:
                    byte rocktype = slea.readByte();
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    if (rocktype == 0) {
                        int mapId = slea.readInt();
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(mapId);
                        MaplePortal targetPortal = target.getPortal(0);
                        if ((target.getForcedReturnId() == 999999999) && (target.canVipRock()) && (c.getPlayer().getMap().canExit()) && (target.canEnter())) {
                            c.getPlayer().changeMap(target, targetPortal);
                        } else {
                            MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误(未找到)");
                            new ServernoticeMapleClientMessageCallback(1, c).dropMessage("无法找到玩家或在一个非法的位置");
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    } else {
                        String name = slea.readMapleAsciiString();
                        MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
                        if (victim != null) {
                            MapleMap target = victim.getMap();
                            WorldLocation loc = c.getChannelServer().getWorldInterface().getLocation(name);
                            int mapid = victim.getMapId();
                            if (((mapid < 240050000) || (mapid > 240060200)) && (mapid >= 100000000) && ((mapid < 280010010) || (mapid > 280030000)) && ((mapid < 670000100) || (mapid > 670011000)) && (mapid < 809020000) && ((mapid < 101000100) || (mapid > 101000104)) && (mapid != 101000301) && ((mapid < 105040310) || (mapid > 105040316)) && ((mapid < 108000100) || (mapid > 109080003)) && ((mapid < 190000000) || (mapid > 197010000)) && ((mapid < 200090000) || (mapid > 209080000)) && (mapid != 240000110) && (mapid != 240000111) && (mapid != 260000110) && (c.getPlayer().getMap().canExit()) && (target.canEnter())) {
                                if ((c.getChannelServer().getMapFactory().getMap(loc.map).getForcedReturnId() == 999999999) && (c.getChannelServer().getMapFactory().getMap(loc.map).canVipRock())) {
                                    if ((!victim.isHidden()) && (!victim.isGM())) {
                                        if (itemId == 5041000) {
                                            c.getPlayer().changeMap(target, target.findClosestSpawnpoint(victim.getPosition()));
                                        } else if (mapid / 100000000 == c.getPlayer().getMapId() / 100000000) {
                                            c.getPlayer().changeMap(target, target.findClosestSpawnpoint(victim.getPosition()));
                                        } else {
                                            MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误(未找到)");
                                            new ServernoticeMapleClientMessageCallback(1, c).dropMessage("无法找到玩家或在一个非法的位置.");
                                            c.getSession().write(MaplePacketCreator.enableActions());
                                        }
                                    } else {
                                        MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误(未找到)");
                                        new ServernoticeMapleClientMessageCallback(1, c).dropMessage("无法找到玩家或在一个非法的位置.");
                                        c.getSession().write(MaplePacketCreator.enableActions());
                                    }
                                } else {
                                    MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误 (禁止的传送点)");
                                    new ServernoticeMapleClientMessageCallback(1, c).dropMessage("不能在此地图使用");
                                    c.getSession().write(MaplePacketCreator.enableActions());
                                }
                            } else {
                                MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误 (禁止的传送点)");
                                c.getPlayer().dropMessage("所要传送的人物目前在一个禁止传送的位置.");
                                c.getSession().write(MaplePacketCreator.enableActions());
                            }
                        } else {
                            MapleInventoryManipulator.addById(c, itemId, (short) 1, "系统错误(未找到)");
                            new ServernoticeMapleClientMessageCallback(1, c).dropMessage("在此频道未找到该玩家");
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    }
                    break;
                case 505: // AP/SP reset
                    if (itemId > 5050000) {
                        int SPTo = slea.readInt();
                        int SPFrom = slea.readInt();
                        ISkill skillSPTo = SkillFactory.getSkill(SPTo);
                        ISkill skillSPFrom = SkillFactory.getSkill(SPFrom);
                        int maxlevel = skillSPTo.getMaxLevel();
                        int curLevel = player.getSkillLevel(skillSPTo);
                        int curLevelSPFrom = player.getSkillLevel(skillSPFrom);
                        if ((curLevel + 1 <= maxlevel) && curLevelSPFrom > 0) {
                            player.changeSkillLevel(skillSPFrom, curLevelSPFrom - 1, player.getMasterLevel(skillSPFrom));
                            player.changeSkillLevel(skillSPTo, curLevel + 1, player.getMasterLevel(skillSPTo));
                        }
                    } else {
                        List<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>(2);
                        int APTo = slea.readInt();
                        int APFrom = slea.readInt();
                        switch (APFrom) {
                            case 256: // str
                                if (c.getPlayer().getStr() <= 4 || ((player.getJob().getId() / 100) == 1 && player.getStr() <= 35)) {
                                    return;
                                }
                                c.getPlayer().setStr(c.getPlayer().getStr() - 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, c.getPlayer().getStr()));
                                break;
                            case 512: // dex
                                if (c.getPlayer().getDex() <= 4
                                        || (((player.getJob().getId() / 100) == 4
                                        || (player.getJob().getId() / 100) == 3)
                                        && player.getDex() <= 25)) {
                                    return;
                                }
                                c.getPlayer().setDex(c.getPlayer().getDex() - 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, c.getPlayer().getDex()));
                                break;
                            case 1024: // int
                                if (c.getPlayer().getInt() <= 4 || ((player.getJob().getId() / 100) == 2 && player.getInt() <= 20)) {
                                    return;
                                }
                                c.getPlayer().setInt(c.getPlayer().getInt() - 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, c.getPlayer().getInt()));
                                break;
                            case 2048: // luk
                                if (c.getPlayer().getLuk() <= 4 || ((player.getJob().getId() / 100) == 4 && player.getLuk() <= 35)) {
                                    return;
                                }
                                c.getPlayer().setLuk(c.getPlayer().getLuk() - 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, c.getPlayer().getLuk()));
                                break;
                            case 8192: // HP
                                if (c.getPlayer().getHpApUsed() <= 0) {
                                    return;
                                }
                                int maxhp = c.getPlayer().getMaxHp();
                                if (maxhp < (c.getPlayer().getLevel() * 2) + 148) {
                                    c.getPlayer().dropMessage(1, "HP不能低于该等级最小HP.");
                                    //c.getSession().write(MaplePacketCreator.enableActions());
                                    return;
                                }
                                if (c.getPlayer().getJob().isA(MapleJob.BEGINNER) || c.getPlayer().getJob().isA(MapleJob.KNIGHT) || c.getPlayer().getJob().isA(MapleJob.Ares) || c.getPlayer().getJob().isA(MapleJob.KNIGHT) || c.getPlayer().getJob().isA(MapleJob.Ares)) {
                                    maxhp -= 12;
                                } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR) || c.getPlayer().getJob().isA(MapleJob.FIGHTER) || c.getPlayer().getJob().isA(MapleJob.CRUSADER) || c.getPlayer().getJob().isA(MapleJob.HERO) || c.getPlayer().getJob().isA(MapleJob.PAGE) || c.getPlayer().getJob().isA(MapleJob.WHITEKNIGHT) || c.getPlayer().getJob().isA(MapleJob.PALADIN) || c.getPlayer().getJob().isA(MapleJob.SPEARMAN) || c.getPlayer().getJob().isA(MapleJob.DRAGONKNIGHT) || c.getPlayer().getJob().isA(MapleJob.DARKKNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIGHTER) || c.getPlayer().getJob().isA(MapleJob.CRUSADER) || c.getPlayer().getJob().isA(MapleJob.HERO) || c.getPlayer().getJob().isA(MapleJob.PAGE) || c.getPlayer().getJob().isA(MapleJob.WHITEKNIGHT) || c.getPlayer().getJob().isA(MapleJob.PALADIN) || c.getPlayer().getJob().isA(MapleJob.SPEARMAN) || c.getPlayer().getJob().isA(MapleJob.DRAGONKNIGHT) || c.getPlayer().getJob().isA(MapleJob.DARKKNIGHT)) {
                                    ISkill improvingMaxHP = SkillFactory.getSkill(1000001);
                                    int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                    maxhp -= 24;
                                    maxhp -= improvingMaxHP.getEffect(improvingMaxHPLevel).getX();
                                } else if (c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_3)) {
                                    ISkill improvingMaxHP = SkillFactory.getSkill(11000000);
                                    int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                    maxhp -= 24;
                                    maxhp -= improvingMaxHP.getEffect(improvingMaxHPLevel).getX();
                                } else if (c.getPlayer().getJob().isA(MapleJob.Ares_1) || c.getPlayer().getJob().isA(MapleJob.Ares_2) || c.getPlayer().getJob().isA(MapleJob.Ares_3) || c.getPlayer().getJob().isA(MapleJob.Ares_4)) {
                                    maxhp -= 24;
                                } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN) || c.getPlayer().getJob().isA(MapleJob.FP_WIZARD) || c.getPlayer().getJob().isA(MapleJob.FP_MAGE) || c.getPlayer().getJob().isA(MapleJob.FP_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.IL_WIZARD) || c.getPlayer().getJob().isA(MapleJob.IL_MAGE) || c.getPlayer().getJob().isA(MapleJob.IL_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.CLERIC) || c.getPlayer().getJob().isA(MapleJob.PRIEST) || c.getPlayer().getJob().isA(MapleJob.BISHOP) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_3) || c.getPlayer().getJob().isA(MapleJob.FP_WIZARD) || c.getPlayer().getJob().isA(MapleJob.FP_MAGE) || c.getPlayer().getJob().isA(MapleJob.FP_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.IL_WIZARD) || c.getPlayer().getJob().isA(MapleJob.IL_MAGE) || c.getPlayer().getJob().isA(MapleJob.IL_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.CLERIC) || c.getPlayer().getJob().isA(MapleJob.PRIEST) || c.getPlayer().getJob().isA(MapleJob.BISHOP) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_3)) {
                                    maxhp -= 10;
                                } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN) || c.getPlayer().getJob().isA(MapleJob.HUNTER) || c.getPlayer().getJob().isA(MapleJob.RANGER) || c.getPlayer().getJob().isA(MapleJob.BOWMASTER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMAN) || c.getPlayer().getJob().isA(MapleJob.SNIPER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMASTER) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_3) || c.getPlayer().getJob().isA(MapleJob.HUNTER) || c.getPlayer().getJob().isA(MapleJob.RANGER) || c.getPlayer().getJob().isA(MapleJob.BOWMASTER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMAN) || c.getPlayer().getJob().isA(MapleJob.SNIPER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMASTER) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_3)) {
                                    maxhp -= 20;
                                } else if (c.getPlayer().getJob().isA(MapleJob.THIEF) || c.getPlayer().getJob().isA(MapleJob.ASSASSIN) || c.getPlayer().getJob().isA(MapleJob.HERMIT) || c.getPlayer().getJob().isA(MapleJob.NIGHTLORD) || c.getPlayer().getJob().isA(MapleJob.BANDIT) || c.getPlayer().getJob().isA(MapleJob.CHIEFBANDIT) || c.getPlayer().getJob().isA(MapleJob.SHADOWER) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_3) || c.getPlayer().getJob().isA(MapleJob.ASSASSIN) || c.getPlayer().getJob().isA(MapleJob.HERMIT) || c.getPlayer().getJob().isA(MapleJob.NIGHTLORD) || c.getPlayer().getJob().isA(MapleJob.BANDIT) || c.getPlayer().getJob().isA(MapleJob.CHIEFBANDIT) || c.getPlayer().getJob().isA(MapleJob.SHADOWER) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_3)) {
                                    maxhp -= 20;
                                } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE) || c.getPlayer().getJob().isA(MapleJob.BRAWLER) || c.getPlayer().getJob().isA(MapleJob.MARAUDER) || c.getPlayer().getJob().isA(MapleJob.BUCCANEER) || c.getPlayer().getJob().isA(MapleJob.GUNSLINGER) || c.getPlayer().getJob().isA(MapleJob.OUTLAW) || c.getPlayer().getJob().isA(MapleJob.CORSAIR) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_3) || c.getPlayer().getJob().isA(MapleJob.BRAWLER) || c.getPlayer().getJob().isA(MapleJob.MARAUDER) || c.getPlayer().getJob().isA(MapleJob.BUCCANEER) || c.getPlayer().getJob().isA(MapleJob.GUNSLINGER) || c.getPlayer().getJob().isA(MapleJob.OUTLAW) || c.getPlayer().getJob().isA(MapleJob.CORSAIR) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_3)) {
                                    ISkill improvingMaxHP = SkillFactory.getSkill(5100000);
                                    int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                    maxhp -= 20;
                                    if (improvingMaxHPLevel >= 1) {
                                        maxhp -= improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                                    }
                                }
                                c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() - 1);
                                c.getPlayer().setMaxHp(maxhp);
                                c.getPlayer().setHp(c.getPlayer().getMaxHp());
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.HP, c.getPlayer().getMaxHp()));
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, c.getPlayer().getMaxHp()));
                                break;
                            case 32768: // MP
                                if (c.getPlayer().getHpApUsed() <= 0) {
                                    return;
                                }
                                int maxmp = c.getPlayer().getMaxMp();
                                if (maxmp < (c.getPlayer().getLevel() * 2) + 148) {
                                    c.getPlayer().dropMessage(1, "MP不能低于该等级最小MP.");
                                    //c.getSession().write(MaplePacketCreator.enableActions());
                                    return;
                                }
                                if (c.getPlayer().getJob().isA(MapleJob.BEGINNER) || c.getPlayer().getJob().isA(MapleJob.KNIGHT) || c.getPlayer().getJob().isA(MapleJob.Ares)) {
                                    maxmp -= 8;
                                } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR) || c.getPlayer().getJob().isA(MapleJob.FIGHTER) || c.getPlayer().getJob().isA(MapleJob.CRUSADER) || c.getPlayer().getJob().isA(MapleJob.HERO) || c.getPlayer().getJob().isA(MapleJob.PAGE) || c.getPlayer().getJob().isA(MapleJob.WHITEKNIGHT) || c.getPlayer().getJob().isA(MapleJob.PALADIN) || c.getPlayer().getJob().isA(MapleJob.SPEARMAN) || c.getPlayer().getJob().isA(MapleJob.DRAGONKNIGHT) || c.getPlayer().getJob().isA(MapleJob.DARKKNIGHT)) {
                                    maxmp -= 4;
                                } else if (c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_3)) {
                                    maxmp -= 4;
                                } else if (c.getPlayer().getJob().isA(MapleJob.Ares_1) || c.getPlayer().getJob().isA(MapleJob.Ares_2) || c.getPlayer().getJob().isA(MapleJob.Ares_3) || c.getPlayer().getJob().isA(MapleJob.Ares_4)) {
                                    maxmp -= 4;
                                } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN) || c.getPlayer().getJob().isA(MapleJob.FP_WIZARD) || c.getPlayer().getJob().isA(MapleJob.FP_MAGE) || c.getPlayer().getJob().isA(MapleJob.FP_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.IL_WIZARD) || c.getPlayer().getJob().isA(MapleJob.IL_MAGE) || c.getPlayer().getJob().isA(MapleJob.IL_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.CLERIC) || c.getPlayer().getJob().isA(MapleJob.PRIEST) || c.getPlayer().getJob().isA(MapleJob.BISHOP) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_3)) {
                                    ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
                                    int improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                                    maxmp -= 20;
                                    maxmp -= 2 * improvingMaxMP.getEffect(improvingMaxMPLevel).getX();
                                } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN) || c.getPlayer().getJob().isA(MapleJob.HUNTER) || c.getPlayer().getJob().isA(MapleJob.RANGER) || c.getPlayer().getJob().isA(MapleJob.BOWMASTER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMAN) || c.getPlayer().getJob().isA(MapleJob.SNIPER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMASTER) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_3)) {
                                    maxmp -= 12;
                                } else if (c.getPlayer().getJob().isA(MapleJob.THIEF) || c.getPlayer().getJob().isA(MapleJob.ASSASSIN) || c.getPlayer().getJob().isA(MapleJob.HERMIT) || c.getPlayer().getJob().isA(MapleJob.NIGHTLORD) || c.getPlayer().getJob().isA(MapleJob.BANDIT) || c.getPlayer().getJob().isA(MapleJob.CHIEFBANDIT) || c.getPlayer().getJob().isA(MapleJob.SHADOWER) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_3)) {
                                    maxmp -= 12;
                                } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE) || c.getPlayer().getJob().isA(MapleJob.BRAWLER) || c.getPlayer().getJob().isA(MapleJob.MARAUDER) || c.getPlayer().getJob().isA(MapleJob.BUCCANEER) || c.getPlayer().getJob().isA(MapleJob.GUNSLINGER) || c.getPlayer().getJob().isA(MapleJob.OUTLAW) || c.getPlayer().getJob().isA(MapleJob.CORSAIR) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_3)) {
                                    maxmp -= 16;
                                }
                                c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() - 1);
                                c.getPlayer().setMaxMp(maxmp);
                                c.getPlayer().setMp(c.getPlayer().getMaxMp());
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MP, c.getPlayer().getMaxMp()));
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, c.getPlayer().getMaxMp()));
                                break;
                            default:
                                c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
                                return;
                        }
                        switch (APTo) {
                            case 256: // str
                                if (c.getPlayer().getStr() >= 999) {
                                    return;
                                }
                                c.getPlayer().setStr(c.getPlayer().getStr() + 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, c.getPlayer().getStr()));
                                break;
                            case 512: // dex
                                if (c.getPlayer().getDex() >= 999) {
                                    return;
                                }
                                c.getPlayer().setDex(c.getPlayer().getDex() + 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, c.getPlayer().getDex()));
                                break;
                            case 1024: // int
                                if (c.getPlayer().getInt() >= 999) {
                                    return;
                                }
                                c.getPlayer().setInt(c.getPlayer().getInt() + 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, c.getPlayer().getInt()));
                                break;
                            case 2048: // luk
                                if (c.getPlayer().getLuk() >= 999) {
                                    return;
                                }
                                c.getPlayer().setLuk(c.getPlayer().getLuk() + 1);
                                statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, c.getPlayer().getLuk()));
                                break;
                            case 8192: // hp
                                int maxhp = c.getPlayer().getMaxHp();
                                if (maxhp >= 30000) {
                                    c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
                                    return;
                                } else {
                                    if (c.getPlayer().getJob().isA(MapleJob.BEGINNER) || c.getPlayer().getJob().isA(MapleJob.KNIGHT) || c.getPlayer().getJob().isA(MapleJob.Ares)) {
                                        maxhp += rand(8, 12);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR) || c.getPlayer().getJob().isA(MapleJob.FIGHTER) || c.getPlayer().getJob().isA(MapleJob.CRUSADER) || c.getPlayer().getJob().isA(MapleJob.HERO) || c.getPlayer().getJob().isA(MapleJob.PAGE) || c.getPlayer().getJob().isA(MapleJob.WHITEKNIGHT) || c.getPlayer().getJob().isA(MapleJob.PALADIN) || c.getPlayer().getJob().isA(MapleJob.SPEARMAN) || c.getPlayer().getJob().isA(MapleJob.DRAGONKNIGHT) || c.getPlayer().getJob().isA(MapleJob.DARKKNIGHT)) {
                                        ISkill improvingMaxHP = SkillFactory.getSkill(1000001);
                                        int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                        maxhp += rand(20, 25);
                                        if (improvingMaxHPLevel >= 1) {
                                            maxhp += improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                                        }

                                    } else if (c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_3)) {
                                        ISkill improvingMaxHP = SkillFactory.getSkill(11000000);
                                        int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                        maxhp += rand(20, 25);
                                        if (improvingMaxHPLevel >= 1) {
                                            maxhp += improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                                        }
                                    } else if (c.getPlayer().getJob().isA(MapleJob.Ares_1) || c.getPlayer().getJob().isA(MapleJob.Ares_2) || c.getPlayer().getJob().isA(MapleJob.Ares_3) || c.getPlayer().getJob().isA(MapleJob.Ares_4)) {
                                        maxhp += rand(20, 25);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN) || c.getPlayer().getJob().isA(MapleJob.FP_WIZARD) || c.getPlayer().getJob().isA(MapleJob.FP_MAGE) || c.getPlayer().getJob().isA(MapleJob.FP_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.IL_WIZARD) || c.getPlayer().getJob().isA(MapleJob.IL_MAGE) || c.getPlayer().getJob().isA(MapleJob.IL_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.CLERIC) || c.getPlayer().getJob().isA(MapleJob.PRIEST) || c.getPlayer().getJob().isA(MapleJob.BISHOP) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_3)) {
                                        maxhp += rand(10, 20);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN) || c.getPlayer().getJob().isA(MapleJob.HUNTER) || c.getPlayer().getJob().isA(MapleJob.RANGER) || c.getPlayer().getJob().isA(MapleJob.BOWMASTER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMAN) || c.getPlayer().getJob().isA(MapleJob.SNIPER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMASTER) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_3)) {
                                        maxhp += rand(16, 20);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.THIEF) || c.getPlayer().getJob().isA(MapleJob.ASSASSIN) || c.getPlayer().getJob().isA(MapleJob.HERMIT) || c.getPlayer().getJob().isA(MapleJob.NIGHTLORD) || c.getPlayer().getJob().isA(MapleJob.BANDIT) || c.getPlayer().getJob().isA(MapleJob.CHIEFBANDIT) || c.getPlayer().getJob().isA(MapleJob.SHADOWER) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_3)) {
                                        maxhp += rand(16, 20);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE) || c.getPlayer().getJob().isA(MapleJob.BRAWLER) || c.getPlayer().getJob().isA(MapleJob.MARAUDER) || c.getPlayer().getJob().isA(MapleJob.BUCCANEER) || c.getPlayer().getJob().isA(MapleJob.GUNSLINGER) || c.getPlayer().getJob().isA(MapleJob.OUTLAW) || c.getPlayer().getJob().isA(MapleJob.CORSAIR) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_3)) {
                                        ISkill improvingMaxHP = SkillFactory.getSkill(5100000);
                                        int improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                                        maxhp += 20;
                                        if (improvingMaxHPLevel >= 1) {
                                            maxhp += improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                                        }
                                    }
                                    maxhp = Math.min(30000, maxhp);
                                    c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() + 1);
                                    c.getPlayer().setMaxHp(maxhp);
                                    //c.getPlayer().setHp(c.getPlayer().getMaxHp());
                                    // c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() + 1);
                                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, c.getPlayer().getMaxHp()));
                                    break;
                                }
                            case 32768: // mp
                                int maxmp = c.getPlayer().getMaxMp();
                                if (maxmp >= 30000) {
                                    return;
                                } else {
                                    if (c.getPlayer().getJob().isA(MapleJob.BEGINNER) || c.getPlayer().getJob().isA(MapleJob.KNIGHT) || c.getPlayer().getJob().isA(MapleJob.Ares)) {
                                        maxmp += rand(6, 8);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR) || c.getPlayer().getJob().isA(MapleJob.FIGHTER) || c.getPlayer().getJob().isA(MapleJob.CRUSADER) || c.getPlayer().getJob().isA(MapleJob.HERO) || c.getPlayer().getJob().isA(MapleJob.PAGE) || c.getPlayer().getJob().isA(MapleJob.WHITEKNIGHT) || c.getPlayer().getJob().isA(MapleJob.PALADIN) || c.getPlayer().getJob().isA(MapleJob.SPEARMAN) || c.getPlayer().getJob().isA(MapleJob.DRAGONKNIGHT) || c.getPlayer().getJob().isA(MapleJob.DARKKNIGHT)) {
                                        maxmp += rand(2, 4);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.GHOST_KNIGHT_3)) {
                                        maxmp += rand(2, 4);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.Ares_1) || c.getPlayer().getJob().isA(MapleJob.Ares_2) || c.getPlayer().getJob().isA(MapleJob.Ares_3) || c.getPlayer().getJob().isA(MapleJob.Ares_4)) {
                                        maxmp += rand(2, 4);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN) || c.getPlayer().getJob().isA(MapleJob.FP_WIZARD) || c.getPlayer().getJob().isA(MapleJob.FP_MAGE) || c.getPlayer().getJob().isA(MapleJob.FP_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.IL_WIZARD) || c.getPlayer().getJob().isA(MapleJob.IL_MAGE) || c.getPlayer().getJob().isA(MapleJob.IL_ARCHMAGE) || c.getPlayer().getJob().isA(MapleJob.CLERIC) || c.getPlayer().getJob().isA(MapleJob.PRIEST) || c.getPlayer().getJob().isA(MapleJob.BISHOP) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.FIRE_KNIGHT_3)) {
                                        ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
                                        int improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                                        maxmp += rand(18, 20);
                                        maxmp += 2 * improvingMaxMP.getEffect(improvingMaxMPLevel).getX();
                                    } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN) || c.getPlayer().getJob().isA(MapleJob.HUNTER) || c.getPlayer().getJob().isA(MapleJob.RANGER) || c.getPlayer().getJob().isA(MapleJob.BOWMASTER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMAN) || c.getPlayer().getJob().isA(MapleJob.SNIPER) || c.getPlayer().getJob().isA(MapleJob.CROSSBOWMASTER) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.WIND_KNIGHT_3)) {
                                        maxmp += rand(10, 12);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.THIEF) || c.getPlayer().getJob().isA(MapleJob.ASSASSIN) || c.getPlayer().getJob().isA(MapleJob.HERMIT) || c.getPlayer().getJob().isA(MapleJob.NIGHTLORD) || c.getPlayer().getJob().isA(MapleJob.BANDIT) || c.getPlayer().getJob().isA(MapleJob.CHIEFBANDIT) || c.getPlayer().getJob().isA(MapleJob.SHADOWER) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.NIGHT_KNIGHT_3)) {
                                        maxmp += rand(10, 12);
                                    } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE) || c.getPlayer().getJob().isA(MapleJob.BRAWLER) || c.getPlayer().getJob().isA(MapleJob.MARAUDER) || c.getPlayer().getJob().isA(MapleJob.BUCCANEER) || c.getPlayer().getJob().isA(MapleJob.GUNSLINGER) || c.getPlayer().getJob().isA(MapleJob.OUTLAW) || c.getPlayer().getJob().isA(MapleJob.CORSAIR) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_2) || c.getPlayer().getJob().isA(MapleJob.THIEF_KNIGHT_3)) {
                                        maxmp += rand(10, 12);
                                    }
                                    maxmp = Math.min(30000, maxmp);
                                    c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() + 1);
                                    c.getPlayer().setMaxMp(maxmp);
                                    //c.getPlayer().setMp(c.getPlayer().getMaxMp());
                                    //c.getPlayer().setHpApUsed(c.getPlayer().getHpApUsed() - 1);
                                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, c.getPlayer().getMaxMp()));
                                    break;
                                }
                            default:
                                c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
                                return;
                        }
                        c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
                    }
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
               /* case 506://封印之所
                    c.getSession().write(MaplePacketCreator.serverNotice(5, "使用开星道具请把要进阶的道具放在装备窗第一格。"));
                    int tagType = itemId % 10;
                    IItem eq = null;

                    if (tagType == 0) {
                        int equipSlot = slea.readShort();
                        if (equipSlot == 0) {
                            return;
                        }
                        eq = player.getInventory(MapleInventoryType.EQUIP).getItem((byte) equipSlot);
                        if (player.getInventory(MapleInventoryType.EQUIP).getItem((byte) equipSlot) == null) {
                            c.getSession().write(MaplePacketCreator.serverNotice(5, "装备第一栏没有装备，无法使用。"));
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                        if (eq.getxingji() >= 1) {
                            c.getSession().write(MaplePacketCreator.serverNotice(5, "该装备已经开通星级功能。无法再次使用！"));
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                        eq.setOwner("☆☆☆☆☆");
                        eq.setxingji(1);
                        /*   } else if (tagType == 1) {
                         MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                         IItem item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                         if (item == null) {
                         return;
                         }
                         byte flag = item.getFlag();
                         flag = (byte) (flag | 0x1);
                         item.setFlag(flag);
                         c.getSession().write(MaplePacketCreator.updateItemInSlot(item));
                         MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                         } else if (tagType == 2) {
                         byte inventory2 = (byte) slea.readInt();
                         byte slot2 = (byte) slea.readInt();
                         IItem item2 = c.getPlayer().getInventory(MapleInventoryType.getByType(inventory2)).getItem(slot2);
                         if (item2 == null) {
                         return;
                         }
                         if (getIncubatedItem(c, itemId)) {
                         MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(inventory2), slot2, (short) 1, false);
                         MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                         c.getSession().write(MaplePacketCreator.enableActions());
                         }*/

                        //    return;
                       // c.getSession().write(MaplePacketCreator.serverNotice(11, "玩家【" + c.getPlayer().getName() + "】成功开启装备星级功能！！大家一起祝贺他（她）吧！"));
                     /*   MaplePacket packet = MaplePacketCreator.serverNotice(0, "祝贺 " + c.getPlayer().getName() + " 开启装备星级功能，大家一起祝贺他（她）吧！");
                        c.getPlayer().getClient().getChannelServer().getWorldInterface().broadcastMessage(c.getPlayer().getName(), packet.getBytes());
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                        c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
                        c.getSession().write(MaplePacketCreator.enableActions());
                        c.getPlayer().getMap().removePlayer(c.getPlayer());
                        c.getPlayer().getMap().addPlayer(c.getPlayer());
                    }

                    //       slea.readInt();
                    // c.getSession().write(MaplePacketCreator.updateEquipSlot(eq));
                    //   MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (short) 1, false);

                    break;*/
                      case 506:
                    int tagType = itemId % 10;
                    IItem eq = null;
                    if (tagType == 0) {
                        int equipSlot = slea.readShort();
                        if (equipSlot == 0) {
                            return;
                        }
                        eq = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) equipSlot);
                        eq.setOwner(player.getName());
                    } else if (tagType == 1) { // Sealing lock
                        MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                        IItem item = c.getPlayer().getInventory(type).getItem((byte) slea.readInt());
                        if (item == null) {
                            return;
                        }
                        byte flag = item.getFlag();
                        flag |= InventoryConstants.Items.Flags.LOCK;
                        item.setFlag(flag);
                        c.getSession().write(MaplePacketCreator.updateItemInSlot(item));
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    } else if (tagType == 2) { // Incubator
                        byte inventory2 = (byte) slea.readInt();
                        byte slot2 = (byte) slea.readInt();
                        IItem item2 = c.getPlayer().getInventory(MapleInventoryType.getByType(inventory2)).getItem(slot2);
                        if (item2 == null){
                            return;
                        }
                        if (getIncubatedItem(c, itemId)) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(inventory2), slot2, (short) 1, false);
                            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                        return;
                    }
                    slea.readInt(); // time stamp
                    c.getSession().write(MaplePacketCreator.updateEquipSlot(eq));
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (short) 1, false);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getSession().write(MaplePacketCreator.enableActions());
                    break;
                case 507:
                    String text = null;
                    if ((player.isMuted()) || (player.getMap().getMuted())) {
                        return;
                    }
                    String prefix = "";
                    IItem eqp = player.getInventory(MapleInventoryType.EQUIP).getItem((byte) -26);
                    if (eqp != null) {
                        prefix = "<" + MapleItemInformationProvider.getInstance().getName(eqp.getItemId()) + "> ";
                    }
                    switch (itemId / 1000 % 10) {
                        case 1:
                            player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(2, prefix + player.getName() + " : " + slea.readMapleAsciiString()));
                            break;
                        case 2:
                            c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(3, c.getChannel(), prefix + player.getName() + " : " + slea.readMapleAsciiString(), slea.readByte() != 0).getBytes());
                            break;
                        case 3:
                            c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(11, c.getChannel(), prefix + player.getName() + " : " + slea.readMapleAsciiString(), slea.readByte() != 0).getBytes());
                            break;
                        case 4:
                            c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(12, c.getChannel(), prefix + player.getName() + " : " + slea.readMapleAsciiString(), slea.readByte() != 0).getBytes());
                            break;
                        case 5:
                            int tvType = itemId % 10;
                            boolean megassenger = false;
                            boolean ears = false;
                            MapleCharacter victim = null;
                            if (tvType != 1) {
                                if (tvType >= 3) {
                                    megassenger = true;
                                    if (tvType == 3) {
                                        slea.readByte();
                                    }
                                    ears = 1 == slea.readByte();
                                } else if (tvType != 2) {
                                    slea.readByte();
                                }
                                if (tvType != 4) {
                                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                                }
                            }
                            List messages = new LinkedList();
                            StringBuilder builder = new StringBuilder();
                            String message = slea.readMapleAsciiString();
                            if (megassenger) {
                                builder.append(" " + message);
                            }
                            messages.add(message);
                            slea.readInt();
                            if (megassenger) {
                                text = builder.toString();
                                if (text.length() <= 60) {
                                    c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(3, c.getChannel(), prefix + player.getName() + " : " + builder.toString(), ears).getBytes());
                                }
                            }
                            if (!MapleTVEffect.isActive()) {
                                new MapleTVEffect(player, victim, messages, tvType);
                                MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                            } else {
                                player.dropMessage(1, "冒险岛TV正在使用中");
                                return;
                            }

                        case 6:
                            String msg = slea.readMapleAsciiString();
                            byte ear = slea.readByte();
                            slea.readByte();
                            IItem item = c.getPlayer().getInventory(MapleInventoryType.getByType((byte) slea.readInt())).getItem((byte) slea.readInt());
                            if (item != null) {
                                c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.getItemMega(c.getChannel(), prefix + player.getName() + " : " + msg, item, ear != 0).getBytes());
                            } else {
                                c.getSession().write(MaplePacketCreator.serverNotice(5, "道具不存在"));
                                c.getSession().write(MaplePacketCreator.enableActions());
                            }
                            break;
                        case 7:
                            int count = slea.readByte();
                            List lines = new LinkedList();
                            for (int i = 0; i < count; i++) {
                                lines.add(prefix + player.getName() + " : " + slea.readMapleAsciiString());
                            }
                            byte ear7 = slea.readByte();
                            c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.getMultiMega(c.getChannel(), lines, ear7 != 0).getBytes());
                    }

                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 508:
                    MapleLove love = new MapleLove(c.getPlayer(), c.getPlayer().getPosition(), c.getPlayer().getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId(), slea.readMapleAsciiString(), itemId);
                    c.getPlayer().getMap().spawnLove(love);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 509:
                    String sendTo = slea.readMapleAsciiString();
                    String msg = slea.readMapleAsciiString();
                    try {
                        c.getPlayer().sendNote(sendTo, msg);
                    } catch (SQLException e) {
                        log.error("SAVING NOTE", e);
                    }
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 510:
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange("Jukebox/Congratulation"));
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 512:
                    c.getPlayer().getMap().startMapEffect(ii.getMsg(itemId).replaceFirst("%s", c.getPlayer().getName()).replaceFirst("%s", slea.readMapleAsciiString()), itemId);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    if (itemId == 5121003) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022094);
                        }
                    } else if (itemId == 5121004) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022100);
                        }
                    } else if (itemId == 5121005) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022101);
                        }
                    } else if (itemId == 5121006) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022112);
                        }
                    } else if (itemId == 5121007) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022119);
                        }
                    } else if (itemId == 5121008) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022153);
                        }
                    } else if (itemId == 5121009) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022154);
                        }
                    } else if (itemId == 5121010) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022183);
                        }
                    } else if (itemId == 5121020) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022455);
                        }
                    } else if (itemId == 5122000) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022302);
                        }
                    } else if (itemId == 5121015) {
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022280);
                        }
                    } else {
                        if (itemId != 5121016) {
                            break;
                        }
                        for (MapleCharacter chr : player.getMap().getCharacters()) {
                            chr.giveItemBuff(2022258);
                        }
                    }
                    break;
                case 517: //宠物改名
                    pet = c.getPlayer().getPet(0);
                    if (pet == null) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                    String newName = slea.readMapleAsciiString();
                    if (newName.length() > 13) {
                        return;
                    }
                    pet.setName(newName);
                    //c.getSession().write(MaplePacketCreator.updatePet(pet,null, true));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.changePetName(c.getPlayer(), newName, 1), true);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 519: //宠物自动使用HP药水
                    if (GameConstants.is宠物技能道具(itemId)) {
                        int uniqueid = (int) slea.readLong();
                        slea.skip(4);
                        MaplePet pet1 = c.getPlayer().getPet(0);
                        int slo = 0;

                        if (pet1 == null) {
                            break;
                        }
                        if (pet1.getUniqueId() != uniqueid) {
                            pet1 = c.getPlayer().getPet(1);
                            slo = 1;
                            if (pet1 != null) {
                                if (pet1.getUniqueId() != uniqueid) {
                                    pet1 = c.getPlayer().getPet(2);
                                    slo = 2;
                                    if (pet1 != null) {
                                        if (pet1.getUniqueId() != uniqueid) {
                                            break;
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                break;
                            }
                        }
                        PetFlag zz = PetFlag.getByAddId(itemId);
                        // //////System.out.println("getByAddId---"+itemId);
                        if (zz != null && !zz.check(pet1.getFlags())) {
                            pet1.setFlags(pet1.getFlags() | zz.getValue());
                            // //////System.out.println("pet1.getFlags---"+pet1.getFlags()+"------"+zz.getValue());
                            c.getSession().write(MaplePacketCreator.updatePet(pet1, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet1.getInventoryPosition()), true));
                            // //////System.out.println("updatePet---"+pet1+"---"+c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet1.getInventoryPosition())+"---"+ true);
                            
                            // //////System.out.println("enableActions");
                            c.getSession().write(MaplePacketCreator.changePetFlag(uniqueid, true, zz.getValue()));
                            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getPlayer().dropMessage(1, "使用宠物技能成功！\r\n使用宠物技能以后直接换线在进行游戏操作！\r\n请换线再使用其他宠物技能！\r\n否则会出错！后果自负！\r\n点击提示窗口确定以后换线！");
                        //    c.getPlayer().dropMessage(1, "使用宠物技能成功！\r\n请换线再使用其他宠物技能！\r\n否则会出错！后果自负！");
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
                    c.getPlayer().getMap().removePlayer(c.getPlayer());
                    c.getPlayer().getMap().addPlayer(c.getPlayer());
                    c.getSession().write(MaplePacketCreator.enableActions());
                            ////////System.out.println("changePetFlag---"+uniqueid+"---"+zz.getValue());
                        }
                        break;
                    } else if (GameConstants.is宠物取消技能道具(itemId)) {
                        final int uniqueid = (int) slea.readLong();
                        // slea.skip(4);
                        MaplePet pet1 = c.getPlayer().getPet(0);
                        int slo = 0;

                        if (pet1 == null) {
                            break;
                        }
                        if (pet1.getUniqueId() != uniqueid) {
                            pet1 = c.getPlayer().getPet(1);
                            slo = 1;
                            if (pet1 != null) {
                                if (pet1.getUniqueId() != uniqueid) {
                                    pet1 = c.getPlayer().getPet(2);
                                    slo = 2;
                                    if (pet1 != null) {
                                        if (pet1.getUniqueId() != uniqueid) {
                                            break;
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                break;
                            }
                        }
                        PetFlag zz = PetFlag.getByDelId(itemId);
                        if (zz != null && zz.check(pet1.getFlags())) {
                            pet1.setFlags(pet1.getFlags() - zz.getValue());
                            c.getSession().write(MaplePacketCreator.updatePet(pet1, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet1.getInventoryPosition()), true));
                          //  c.getSession().write(MaplePacketCreator.enableActions());
                            c.getSession().write(MaplePacketCreator.changePetFlag(uniqueid, false, zz.getValue()));
                            MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getPlayer().dropMessage(1, "使用宠物技能成功！\r\n使用宠物技能以后直接换线在进行游戏操作！\r\n请换线再使用其他宠物技能！\r\n否则会出错！后果自负！\r\n点击提示窗口确定以后换线！");
                        
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
                    c.getPlayer().getMap().removePlayer(c.getPlayer());
                    c.getPlayer().getMap().addPlayer(c.getPlayer());
                    c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    }
                    break;
                case 520:
                    if (itemId == 5201001) {//500豆豆
                        c.getPlayer().dropMessage("增加了500豆豆！如果不显示请换线！");
                        player.gainCashDD(500);
                    }
                    if (itemId == 5201002) {//3000
                        c.getPlayer().dropMessage("增加了3000豆豆！如果不显示请换线！");
                        player.gainCashDD(3000);
                    }
                    if (itemId == 5201004) {//20豆豆
                        c.getPlayer().dropMessage("增加了20豆豆！如果不显示请换线！");
                        player.gainCashDD(20);
                    }
                    if (itemId == 5201005) {//50
                        c.getPlayer().dropMessage("增加了50豆豆！如果不显示请换线！");
                        player.gainCashDD(50);
                    }
                    if (itemId == 5201000) {//50
                        c.getPlayer().dropMessage("增加了2000豆豆！如果不显示请换线！");
                        player.gainCashDD(2000);
                    }
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
                    c.getPlayer().getMap().removePlayer(c.getPlayer());
                    c.getPlayer().getMap().addPlayer(c.getPlayer());
                    c.getSession().write(MaplePacketCreator.enableActions());
                    break;
                case 524:
                    MaplePet pet1 = c.getPlayer().getPet(0);
                    if (pet1 == null) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                    if (!pet1.canConsume(itemId)) {
                        pet = c.getPlayer().getPet(1);
                        if (pet != null) {
                            if (!pet.canConsume(itemId)) {
                                pet = c.getPlayer().getPet(2);
                                if (pet != null) {
                                    if (!pet.canConsume(itemId)) {
                                        c.getSession().write(MaplePacketCreator.enableActions());
                                        return;
                                    }
                                } else {
                                    c.getSession().write(MaplePacketCreator.enableActions());
                                    return;
                                }
                            }
                        } else {
                            c.getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                    }
                    pet1.setFullness(100);
                    int closeGain = 100 * c.getChannelServer().getPetExpRate();
                    if (pet1.getCloseness() < 30000) {
                        if (pet1.getCloseness() + closeGain > 30000) {
                            pet1.setCloseness(30000);
                        } else {
                            pet1.setCloseness(pet1.getCloseness() + closeGain);
                        }
                        while (pet1.getCloseness() >= ExpTable.getClosenessNeededForLevel(pet1.getLevel() + 1)) {
                            pet1.setLevel(pet1.getLevel() + 1);
                            c.getSession().write(MaplePacketCreator.showOwnPetLevelUp(c.getPlayer().getPetSlot(pet1)));
                            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showPetLevelUp(c.getPlayer(), c.getPlayer().getPetSlot(pet1)));
                        }
                    }
                    c.getSession().write(MaplePacketCreator.updatePet(pet1, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet1.getInventoryPosition()), true));
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.commandResponse(c.getPlayer().getId(), 0, 1, true), true);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 528:
                    if (itemId != 5281000) {
                        break;
                    }
                    Rectangle bounds = new Rectangle((int) c.getPlayer().getPosition().getX(), (int) c.getPlayer().getPosition().getY(), 1, 1);
                    MapleStatEffect mse = new MapleStatEffect();
                    mse.setSourceId(2111003);
                    MapleMist mist = new MapleMist(bounds, c.getPlayer(), mse);
                    c.getPlayer().getMap().spawnMist(mist, 10000, true);
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getChatText(c.getPlayer().getId(), "噢~No!!!", false, 1));
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 530:
                    ii.getItemEffect(itemId).applyTo(c.getPlayer());
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 533: // Duey迅捷的交货票
                    c.getSession().write(MaplePacketCreator.sendDuey((byte) 8, DueyActionHandler.loadItems(c.getPlayer())));
                    break;
                case 537:
                    if ((c.getPlayer().isMuted()) || (c.getPlayer().getMap().getMuted())) {
                        c.getPlayer().dropMessage(5, c.getPlayer().isMuted() ? "You are " : "The map is muted, therefore you are unable to talk.");
                        return;
                    }
                    text = slea.readMapleAsciiString();
                    c.getPlayer().setChalkboard(text);
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.useChalkboard(c.getPlayer(), false));
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.enableActions());
                    break;
                case 539:
                    if ((c.getPlayer().isMuted()) || (c.getPlayer().getMap().getMuted())) {
                        return;
                    }
                    List lines = new LinkedList();
                    lines.add(slea.readMapleAsciiString());
                    c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.getAvatarMega(c.getPlayer(), c.getChannel(), itemId, lines, slea.readByte() != 0).getBytes());
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    break;
                case 552: //剪刀
                    MapleInventoryType type = MapleInventoryType.getByType((byte) slea.readInt());
                    byte sloti = (byte) slea.readInt();
                    Item item = (Item) c.getPlayer().getInventory(type).getItem(sloti);
                    //IEquip item = (IEquip) c.getPlayer().getInventory(type).getItem(sloti);
                    if (item == null || item.getQuantity() <= 0 || (item.getFlag() & InventoryConstants.Items.Flags.SPIKES) > 0 && ii.isKarmaAble(item.getItemId())
                            || (item.getFlag() & InventoryConstants.Items.Flags.KARMA) > 0 && ii.isKarmaAble(item.getItemId())) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                    if (type.equals(MapleInventoryType.USE)) {
                        item.setFlag((byte) InventoryConstants.Items.Flags.SPIKES);
                    } else {
                        item.setFlag((byte) InventoryConstants.Items.Flags.KARMA);//、KARMA
                    }
                    c.getPlayer().forceUpdateItem(type, item);
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getPlayer().dropMessage(1, "宿命剪刀使用的物品\r\n只能在雇佣商人出售！");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    break;
               /* case 557://金锤子
                    slea.readInt();
                    int itemSlot = slea.readInt();
                    slea.readInt();
                    int 随机 = RandomizerNew.nextInt(100);
                    IEquip equip = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) itemSlot);
                    if ((equip.getVicious() == 2) || (c.getPlayer().getInventory(MapleInventoryType.CASH).findById(5570000) == null)) {
                        return;
                    }
                    boolean 是否成功;
                    if (随机 > 30) {
                        equip.setVicious(equip.getVicious() + 1);
                        equip.setUpgradeSlots(equip.getUpgradeSlots() + 1);
                        int i = 2;
                        i = 2 - equip.getVicious();
                        是否成功 = true;//true是开启False是不开启
                        c.getPlayer().dropMessage(1, "金锤子使用成功!\r\n剩余次数" + i + "！");//成功
                    } else {
                        int i = 2;
                        i = 2 - equip.getVicious();
                        是否成功 = false;
                        c.getPlayer().dropMessage(1, "金锤子使用失败!\r\n剩余次数" + i + "！");
                    }
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false);
                    c.getSession().write(MaplePacketCreator.sendHammerData(equip.getVicious(), 是否成功));
                    c.getSession().write(MaplePacketCreator.hammerItem(equip));
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(c.getPlayer()));
                    c.getPlayer().getMap().removePlayer(c.getPlayer());
                    c.getPlayer().getMap().addPlayer(c.getPlayer());
                    c.getSession().write(MaplePacketCreator.enableActions());
                    break;*/
                case 511:
                case 513:
                case 514:
                case 515:
                case 516:
                case 518:
                case 521:
                case 522:
                case 523:
                case 525:
                case 526:
                case 527:
                case 529:
                case 531:
                case 532:
                case 534:
                case 535:
                case 536:
                case 538:
                case 540:
                case 541:
                case 542:
                case 543:
                case 544:
                case 545:
                case 546:
                case 547:
                case 548:
                case 549:
                case 550:
                case 551:
                case 553:
                    if (itemId == 5531000) { //神秘箱子
                        NPCScriptManager.getInstance().start(c, 9900007, 2);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 0, true, false);
                        c.getSession().write(MaplePacketCreator.enableActions());
                    } else if (itemId >= 5532000 && itemId <= 5532002) {
                        NPCScriptManager.getInstance().start(c, 9201105); //极光戒指
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 0, true, false); //物品删除
                        c.getSession().write(MaplePacketCreator.enableActions());
                    } else if (itemId == 5450000) { //背包商人
                        NPCScriptManager.getInstance().start(c, 1061001);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false); //物品删除
                        c.getSession().write(MaplePacketCreator.enableActions());
                    } else if (itemId == 5450001) { //远程仓库
                        NPCScriptManager.getInstance().start(c, 9030100);
                        //MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 1, true, false); //物品删除
                        c.getSession().write(MaplePacketCreator.enableActions());
                    } else if (itemId == 5530000) { //推广系统
                        NPCScriptManager.getInstance().start(c, 9900007, 3);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, 0, true, false); //物品删除
                        c.getSession().write(MaplePacketCreator.enableActions());
                    }
                    break;
                case 554:
                case 555:
                case 556:
                default:
                    log.info("Unhandeled cash item; type = " + itemType);
            }
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
            log.error("REMOTE ERROR", e);
        }
    }

    private static int rand(int lbound, int ubound) {
        return (int) (Math.random() * (ubound - lbound + 1) + lbound);
    }

    private final boolean getIncubatedItem(MapleClient c, int id) {
        int[] ids = {1012070, 1302049, 1302063, 1322027, 2000004, 2000005, 2020013, 2020015, 2040307, 2040509, 2040519, 2040521, 2040533, 2040715, 2040717, 2040810, 2040811, 2070005, 2070006, 4020009};
        int[] quantitys = {1, 1, 1, 1, 240, 200, 200, 200, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3};
        int amount = 0;
        for (int i = 0; i < ids.length; i++) {
            if (i == id) {
                amount = quantitys[i];
            }
        }
        if (c.getPlayer().getInventory(MapleInventoryType.getByType((byte) (id / 1000000))).isFull()) {
            return false;
        }
        MapleInventoryManipulator.addById(c, id, (short) amount, null);
        return true;
    }
}