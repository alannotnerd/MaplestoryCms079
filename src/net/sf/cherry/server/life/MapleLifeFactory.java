package net.sf.cherry.server.life;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.provider.wz.MapleDataType;
import net.sf.cherry.server.maps.MapleMapFactory;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.StringUtil;

public class MapleLifeFactory {

    private static Logger log = LoggerFactory.getLogger(MapleMapFactory.class);
    private static MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Mob.wz"));
    private static MapleDataProvider stringDataWZ = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz"));
    private static MapleData mobStringData = stringDataWZ.getData("Mob.img");
    private static MapleData npcStringData = stringDataWZ.getData("Npc.img");
    private static Map<Integer, MapleMonsterStats> monsterStats = new HashMap();

    public static AbstractLoadedMapleLife getLife(int id, String type) {
        if (type.equalsIgnoreCase("n")) {
            return getNPC(id);
        }
        if (type.equalsIgnoreCase("m")) {
            return getMonster(id);
        }
        log.warn("Unknown Life type: {}", type);
        return null;
    }

    public static MapleMonster getMonster(int mid) {
        MapleMonsterStats stats = (MapleMonsterStats) monsterStats.get(Integer.valueOf(mid));
        if (stats == null) {
            MapleData monsterData = data.getData(StringUtil.getLeftPaddedStr(Integer.toString(mid) + ".img", '0', 11));
            if (monsterData == null) {
                return null;
            }
            MapleData monsterInfoData = monsterData.getChildByPath("info");
            stats = new MapleMonsterStats();
            stats.setHp(MapleDataTool.getIntConvert("maxHP", monsterInfoData));
            stats.setMp(MapleDataTool.getIntConvert("maxMP", monsterInfoData, 0));
            stats.setExp(MapleDataTool.getIntConvert("exp", monsterInfoData, 0));
            stats.setLevel(MapleDataTool.getIntConvert("level", monsterInfoData));
            stats.setRemoveAfter(MapleDataTool.getIntConvert("removeAfter", monsterInfoData, 0));
            stats.setBoss(MapleDataTool.getIntConvert("boss", monsterInfoData, 0) > 0);
            stats.setFfaLoot(MapleDataTool.getIntConvert("publicReward", monsterInfoData, 0) > 0);
            stats.setUndead(MapleDataTool.getIntConvert("undead", monsterInfoData, 0) > 0);
            stats.setName(MapleDataTool.getString(mid + "/name", mobStringData, "MISSINGNO"));
            stats.setBuffToGive(MapleDataTool.getIntConvert("buff", monsterInfoData, -1));
            stats.setExplosive(MapleDataTool.getIntConvert("explosiveReward", monsterInfoData, 0) > 0);
            stats.setFriendly(MapleDataTool.getIntConvert("damagedByMob", monsterInfoData, 0) > 0);
            MapleData firstAttackData = monsterInfoData.getChildByPath("firstAttack");
            int firstAttack = 0;
            if (firstAttackData != null) {
                if (firstAttackData.getType() == MapleDataType.FLOAT) {
                    firstAttack = Math.round(MapleDataTool.getFloat(firstAttackData));
                } else {
                    firstAttack = MapleDataTool.getInt(firstAttackData);
                }
            }
            MapleData selfd = monsterInfoData.getChildByPath("selfDestruction");
            if (selfd != null) {
                stats.setSelfDHP(MapleDataTool.getIntConvert("hp", selfd, 0));
                stats.setRemoveAfter(MapleDataTool.getIntConvert("removeAfter", selfd, stats.getRemoveAfter()));
                stats.setSelfD((byte) MapleDataTool.getIntConvert("action", selfd, -1));
            } else {
                stats.setSelfD((byte) -1);
            }
            stats.setFirstAttack(firstAttack > 0);
            stats.setDropItemPeriod(MapleDataTool.getIntConvert("dropItemPeriod", monsterInfoData, 0));
            if ((stats.isBoss()) || (mid == 8810018) || (mid == 8810026)) {
                MapleData hpTagColor = monsterInfoData.getChildByPath("hpTagColor");
                MapleData hpTagBgColor = monsterInfoData.getChildByPath("hpTagBgcolor");
                if ((hpTagBgColor == null) || (hpTagColor == null)) {
                    log.trace("Monster " + stats.getName() + " (" + mid + ") flagged as boss without boss HP bars.");
                    stats.setTagColor(0);
                    stats.setTagBgColor(0);
                } else {
                    stats.setTagColor(MapleDataTool.getIntConvert("hpTagColor", monsterInfoData));
                    stats.setTagBgColor(MapleDataTool.getIntConvert("hpTagBgcolor", monsterInfoData));
                }
            }

            for (MapleData idata : monsterData) {
                if (!idata.getName().equals("info")) {
                    int delay = 0;
                    for (MapleData pic : idata.getChildren()) {
                        delay += MapleDataTool.getIntConvert("delay", pic, 0);
                    }
                    stats.setAnimationTime(idata.getName(), delay);
                }
            }

            MapleData reviveInfo = monsterInfoData.getChildByPath("revive");
            if (reviveInfo != null) {
                List revives = new LinkedList();
                for (MapleData data_ : reviveInfo) {
                    revives.add(Integer.valueOf(MapleDataTool.getInt(data_)));
                }
                stats.setRevives(revives);
            }

            decodeElementalString(stats, MapleDataTool.getString("elemAttr", monsterInfoData, ""));

            MapleData monsterSkillData = monsterInfoData.getChildByPath("skill");
            if (monsterSkillData != null) {
                int i = 0;
                List skills = new ArrayList();
                while (monsterSkillData.getChildByPath(Integer.toString(i)) != null) {
                    skills.add(new Pair(Integer.valueOf(MapleDataTool.getInt(i + "/skill", monsterSkillData, 0)), Integer.valueOf(MapleDataTool.getInt(i + "/level", monsterSkillData, 0))));
                    i++;
                }
                stats.setSkills(skills);
            }
            MapleData banishData = monsterInfoData.getChildByPath("ban");
            if (banishData != null) {
                stats.setBanishInfo(new BanishInfo(MapleDataTool.getString("banMsg", banishData), MapleDataTool.getInt("banMap/0/field", banishData, -1), MapleDataTool.getString("banMap/0/portal", banishData, "sp")));
            }
            monsterStats.put(Integer.valueOf(mid), stats);
        }
        MapleMonster ret = new MapleMonster(mid, stats);
        return ret;
    }

    public static void decodeElementalString(MapleMonsterStats stats, String elemAttr) {
        for (int i = 0; i < elemAttr.length(); i += 2) {
            stats.setEffectiveness(Element.getFromChar(elemAttr.charAt(i)), ElementalEffectiveness.getByNumber(Integer.valueOf(String.valueOf(elemAttr.charAt(i + 1))).intValue()));
        }
    }

    public static MapleNPC getNPC(int nid) {
        return new MapleNPC(nid, new MapleNPCStats(MapleDataTool.getString(nid + "/name", npcStringData, "MISSINGNO")));
    }

    public static class BanishInfo {

        private int map;
        private String portal;
        private String msg;

        public BanishInfo(String msg, int map, String portal) {
            this.msg = msg;
            this.map = map;
            this.portal = portal;
        }

        public int getMap() {
            return this.map;
        }

        public String getPortal() {
            return this.portal;
        }

        public String getMsg() {
            return this.msg;
        }
    }
}