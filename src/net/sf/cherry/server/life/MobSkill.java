package net.sf.cherry.server.life;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleDisease;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleSquad;
import net.sf.cherry.server.MapleSquadType;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;

public class MobSkill {

    private int skillId;
    private int skillLevel;
    private int mpCon;
    private List<Integer> toSummon = new ArrayList();
    private int spawnEffect;
    private int hp;
    private int x;
    private int y;
    private long duration;
    private long cooltime;
    private float prop;
    private Point lt;
    private Point rb;
    private int limit;
    private int count;

    public MobSkill(int skillId, int level) {
        this.skillId = skillId;
        this.skillLevel = level;
    }

    public void setMpCon(int mpCon) {
        this.mpCon = mpCon;
    }

    public void addSummons(List<Integer> toSummon) {
        for (Integer summon : toSummon) {
            this.toSummon.add(summon);
        }
    }

    public void setSpawnEffect(int spawnEffect) {
        this.spawnEffect = spawnEffect;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setCoolTime(long cooltime) {
        this.cooltime = cooltime;
    }

    public void setProp(float prop) {
        this.prop = prop;
    }

    public void setLtRb(Point lt, Point rb) {
        this.lt = lt;
        this.rb = rb;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void applyEffect(MapleCharacter player, MapleMonster monster, boolean skill) {
        MonsterStatus monStat = null;
        MapleDisease disease = null;
        boolean heal = false;
        boolean dispel = false;
        boolean banish = false;
        int i;
        switch (this.skillId) {
            case 100:
            case 110:
                monStat = MonsterStatus.WEAPON_ATTACK_UP;
                break;
            case 101:
            case 111:
                monStat = MonsterStatus.MAGIC_ATTACK_UP;
                break;
            case 102:
            case 112:
                monStat = MonsterStatus.WEAPON_DEFENSE_UP;
                break;
            case 103:
            case 113:
                monStat = MonsterStatus.MAGIC_DEFENSE_UP;
                break;
            case 114:
                heal = true;
                break;
            case 120:
                disease = MapleDisease.SEAL;
                break;
            case 121:
                disease = MapleDisease.DARKNESS;
                break;
            case 122:
                disease = MapleDisease.WEAKEN;
                break;
            case 123:
                disease = MapleDisease.STUN;
                break;
            case 124:
                disease = MapleDisease.CURSE;
                break;
            case 125:
                break;
            case 126:
                disease = MapleDisease.SLOW;
                break;
            case 127:
                dispel = true;
                break;
            case 128:
                if (makeChanceResult()) {
                    MapleSquad htSquad = player.getClient().getChannelServer().getMapleSquad(MapleSquadType.HORNTAIL);
                    if ((htSquad != null) && (htSquad.containsMember(player))) {
                        i = 0;
                        for (MapleCharacter htMember : htSquad.getMembers()) {
                            if ((htMember.isAlive()) && (htMember.getMap() == player.getMap())) {
                                if (i >= getCount()) {
                                    break;
                                }
                                htMember.giveDebuff(MapleDisease.SEDUCE, this);
                                i++;
                            }
                        }
                    }

                }

                break;
            case 129:
                if ((this.lt != null) && (this.rb != null) && (skill)) {
                    for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                        chr.changeMapBanish(monster.getBanish().getMap(), monster.getBanish().getPortal(), monster.getBanish().getMsg());
                    }
                } else {
                    player.changeMapBanish(monster.getBanish().getMap(), monster.getBanish().getPortal(), monster.getBanish().getMsg());
                }
                break;
            case 131:
                break;
            case 140:
                if ((makeChanceResult()) && (!monster.isBuffed(MonsterStatus.MAGIC_IMMUNITY))) {
                    monStat = MonsterStatus.WEAPON_IMMUNITY;
                }
                break;
            case 141:
                if ((makeChanceResult()) && (!monster.isBuffed(MonsterStatus.WEAPON_IMMUNITY))) {
                    monStat = MonsterStatus.MAGIC_IMMUNITY;
                }
                break;
            case 200:
                boolean canSpawn = true;
                if (player.getEventInstance() != null) {
                    if (player.getEventInstance().getName().indexOf("FoJ", 0) != -1) {
                        canSpawn = false;
                    } else if ((player.getEventInstance().getName().indexOf("BossQuest", 0) != -1) && (monster.getId() == 8500001)) {
                        canSpawn = false;
                    }
                }
                if ((monster.getMap().getSpawnedMonstersOnMap() < 50) && (canSpawn)) {
                    for (Integer mobId : getSummons()) {
                        MapleMonster toSpawn = MapleLifeFactory.getMonster(mobId.intValue());
                        toSpawn.setPosition(monster.getPosition());

                        int xpos = (int) monster.getPosition().getX();
                        int ypos = (int) monster.getPosition().getY();
                        switch (mobId.intValue()) {
                            case 8500003:
                                toSpawn.setFh((int) Math.ceil(Math.random() * 19.0D));
                                ypos = -590;
                            case 8500004:
                                xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0D) - 500.0D);
                                if (ypos == -590) {
                                    break;
                                }
                                ypos = (int) monster.getPosition().getY();
                                break;
                            case 8510100:
                                if (Math.ceil(Math.random() * 5.0D) == 1.0D) {
                                    ypos = 78;
                                    xpos = (int) (0.0D + Math.ceil(Math.random() * 5.0D)) + (Math.ceil(Math.random() * 2.0D) == 1.0D ? 180 : 0);
                                } else {
                                    xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0D) - 500.0D);
                                }

                        }

                        switch (monster.getMap().getId()) {
                            case 220080001:
                                if (xpos < -890) {
                                    xpos = (int) (-890.0D + Math.ceil(Math.random() * 150.0D));
                                } else {
                                    if (xpos <= 230) {
                                        break;
                                    }
                                    xpos = (int) (230.0D - Math.ceil(Math.random() * 150.0D));
                                }
                                break;
                            case 230040420:
                                if (xpos < -239) {
                                    xpos = (int) (-239.0D + Math.ceil(Math.random() * 150.0D));
                                } else {
                                    if (xpos <= 371) {
                                        break;
                                    }
                                    xpos = (int) (371.0D - Math.ceil(Math.random() * 150.0D));
                                }
                        }

                        toSpawn.setPosition(new Point(xpos, ypos));
                        monster.getMap().spawnMonsterWithEffect(toSpawn, getSpawnEffect(), toSpawn.getPosition());
                    }
                }
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 130:
            case 132:
            case 133:
            case 134:
            case 135:
            case 136:
            case 137:
            case 138:
            case 139:
            case 142:
            case 143:
            case 144:
            case 145:
            case 146:
            case 147:
            case 148:
            case 149:
            case 150:
            case 151:
            case 152:
            case 153:
            case 154:
            case 155:
            case 156:
            case 157:
            case 158:
            case 159:
            case 160:
            case 161:
            case 162:
            case 163:
            case 164:
            case 165:
            case 166:
            case 167:
            case 168:
            case 169:
            case 170:
            case 171:
            case 172:
            case 173:
            case 174:
            case 175:
            case 176:
            case 177:
            case 178:
            case 179:
            case 180:
            case 181:
            case 182:
            case 183:
            case 184:
            case 185:
            case 186:
            case 187:
            case 188:
            case 189:
            case 190:
            case 191:
            case 192:
            case 193:
            case 194:
            case 195:
            case 196:
            case 197:
            case 198:
            case 199:
        }
        if ((monStat != null) || (heal)) {
            if ((this.lt != null) && (this.rb != null) && (skill)) {
                List<MapleMapObject> objects = getObjectsInRange(monster, MapleMapObjectType.MONSTER);
                if (heal) {
                    for (MapleMapObject mons : objects) {
                        ((MapleMonster) mons).heal(getX(), getY());
                    }
                } else {
                    for (MapleMapObject mons : objects) {
                        if (!monster.isBuffed(monStat)) {
                            ((MapleMonster) mons).applyMonsterBuff(monStat, getX(), getSkillId(), getDuration(), this);
                        }
                    }
                }
            } else if (heal) {
                monster.heal(getX(), getY());
            } else if (!monster.isBuffed(monStat)) {
                monster.applyMonsterBuff(monStat, getX(), getSkillId(), getDuration(), this);
            }

        }

        if ((disease != null) || (dispel) || (banish)) {
            if ((skill) && (this.lt != null) && (this.rb != null)) {
                List<MapleCharacter> characters = getPlayersInRange(monster, player);
                for (MapleCharacter character : characters) {
                    if (dispel) {
                        character.dispel();
                    } else if (banish) {
                        if (player.getEventInstance() == null) {
                            MapleMap to = player.getMap().getReturnMap();
                            MaplePortal pto = to.getPortal((short) (int) (0.0D + 10.0D * Math.random()));
                            character.changeMap(to, pto);
                        }
                    } else {
                        character.giveDebuff(disease, this);
                    }
                }

            } else if (dispel) {
                player.dispel();
            } else {
                player.giveDebuff(disease, this);
            }
        }

        monster.usedSkill(this.skillId, this.skillLevel, this.cooltime);
        monster.setMp(monster.getMp() - getMpCon());
    }

    public int getSkillId() {
        return this.skillId;
    }

    public int getSkillLevel() {
        return this.skillLevel;
    }

    public int getMpCon() {
        return this.mpCon;
    }

    public List<Integer> getSummons() {
        return Collections.unmodifiableList(this.toSummon);
    }

    public int getSpawnEffect() {
        return this.spawnEffect;
    }

    public int getHP() {
        return this.hp;
    }

    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public long getDuration() {
        return this.duration;
    }

    public long getCoolTime() {
        return this.cooltime;
    }

    public Point getLt() {
        return this.lt;
    }

    public Point getRb() {
        return this.rb;
    }

    public int getLimit() {
        return this.limit;
    }

    public int getCount() {
        return this.count;
    }

    public boolean makeChanceResult() {
        return (this.prop == 1.0D) || (Math.random() < this.prop);
    }

    private Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        return bounds;
    }

    private List<MapleCharacter> getPlayersInRange(MapleMonster monster, MapleCharacter player) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List players = new ArrayList();
        players.add(player);
        return monster.getMap().getPlayersInRect(bounds, players);
    }

    private List<MapleMapObject> getObjectsInRange(MapleMonster monster, MapleMapObjectType objectType) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List objectTypes = new ArrayList();
        objectTypes.add(objectType);
        return monster.getMap().getMapObjectsInRect(bounds, objectTypes);
    }
}
