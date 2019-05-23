package net.sf.cherry.client.anticheat;

import java.awt.Point;
import java.lang.ref.WeakReference;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.mina.FileoutputUtil;
import net.sf.cherry.server.AutobanManager;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.StringUtil;

public class CheatTracker {

    private Map<CheatingOffense, CheatingOffenseEntry> offenses = Collections.synchronizedMap(new LinkedHashMap());
    private WeakReference<MapleCharacter> chr;
    private long regenHPSince;
    private long regenMPSince;
    private int numHPRegens;
    private int numMPRegens;
    private int numSequentialAttacks;
    private long lastAttackTime;
    private long lastDamage = 0L;
    private long takingDamageSince;
    private int numSequentialDamage = 0;
    private long lastDamageTakenTime = 0L;
    private int numSequentialSummonAttack = 0;
    private long summonSummonTime = 0L;
    private int numSameDamage = 0;
    private long attackingSince;
    private long lastFJTime;
    private int infiniteFJCount = 0;
    private Point lastMonsterMove;
    private int monsterMoveCount;
    private int attacksWithoutHit = 0;
    private String[] lastText = {"", "", ""};
    private int mobsOwned;
    private Boolean pickupComplete = Boolean.TRUE;
    private ScheduledFuture<?> invalidationTask;

    public CheatTracker(MapleCharacter chr) {
        this.chr = new WeakReference(chr);
        invalidationTask = TimerManager.getInstance().register(new InvalidationTask(), 60000);
        this.takingDamageSince = (this.attackingSince = this.regenMPSince = this.regenHPSince = System.currentTimeMillis());
    }

    public boolean checkAttack(int skillId, MapleCharacter player, MapleClient c) {
        this.numSequentialAttacks += 0;
        long oldLastAttackTime = this.lastAttackTime;
        this.lastAttackTime = System.currentTimeMillis();
        long attackTime = this.lastAttackTime - this.attackingSince;
        if(!player.hasFakeChar()){
        if (this.numSequentialAttacks > 4 && skillId != 0) {
            int divisor;
            if ((skillId == 3121004) || (skillId == 5221004) || (skillId == 13111002) || (skillId == 4001344) || (skillId == 14001004)||(skillId == 3121003)||(skillId == 3221003)) {
                divisor = 10;
            } else if ((skillId == 4001344) || (skillId == 12001003) || (skillId == 2001005) || (skillId == 14001004)) {
                divisor = 200;
                
            } else {
                divisor = 200;
            }
            if (attackTime / divisor < this.numSequentialAttacks) {
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "攻击加速" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
                //registerOffense(CheatingOffense.FASTATTACK);
                //player.dropMessage(1,"[检测提示+A]\r\n非法使用加速外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n尽量使用技能！");
                return false;
            }
        } else if (this.numSequentialAttacks > 3 && skillId == 0) {
            int divisor;

            if ((skillId == 3121004) || (skillId == 5221004) || (skillId == 13111002) || (skillId == 4001344) || (skillId == 14001004)||(skillId == 3121003)||(skillId == 3221003))  {
                divisor = 10;
            } else if ((skillId == 4001344) || (skillId == 12001003) || (skillId == 2001005) || (skillId == 14001004)) {
                divisor = 200;
                
            } else {
                divisor = 230;
            }
           /* if (player.getPlayer().hasFakeChar()) {//检测分身
                divisor = 10;

            }*/
            if (attackTime / divisor < this.numSequentialAttacks) {
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "攻击加速" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
              registerOffense(CheatingOffense.FASTATTACK);
               //System.out.println("攻击速度过快！");
               //AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统T下线警告！.(非法使用加速外挂.异常攻击伤害值: " + " 当前等级 " + player.getLevel() + ")");
               //player.dropMessage(1,"[检测提示+B]\r\n非法使用加速外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n尽量使用技能！");
               // player.攻击加速掉线(player.getName() + " 被系统T下线.(非法使用加速外挂:当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                c.disconnect();
                
                return false;
            }
        }
        }else{
            if (this.numSequentialAttacks > 4 && skillId != 0) {
            int divisor;
            if ((skillId == 3121004) || (skillId == 5221004) || (skillId == 13111002) || (skillId == 4001344) || (skillId == 14001004)||(skillId == 3121003)||(skillId == 3221003)) {
                divisor = 10;
            } else if ((skillId == 4001344) || (skillId == 12001003) || (skillId == 2001005) || (skillId == 14001004)) {
                divisor = 200;
                
            } else {
                divisor = 230;
            }
            /*if (player.getPlayer().hasFakeChar()) {//检测分身
                    divisor = 10;

                }*/
            if (attackTime / divisor < this.numSequentialAttacks) {
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "攻击加速" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
              //  registerOffense(CheatingOffense.FASTATTACK);
                //////System.out.println("攻击速度过快！"); 
                //AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统T下线警告！.(非法使用加速外挂.异常攻击伤害值: " + " 当前等级 " + player.getLevel() + ")");
               // player.dropMessage(1,"[检测提示+C]\r\n非法使用加速外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n尽量使用技能！");
                //player.攻击加速掉线(player.getName() + " 被系统T下线.(非法使用加速外挂:当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                ////c.disconnect();

                return false;
            }
        } else if (this.numSequentialAttacks > 4 && skillId == 0) {
            int divisor;

            if ((skillId == 3121004) || (skillId == 5221004) || (skillId == 13111002) || (skillId == 4001344) || (skillId == 14001004)||(skillId == 3121003)||(skillId == 3221003)) {
                divisor = 10;
            } else if ((skillId == 4001344) || (skillId == 12001003) || (skillId == 2001005) || (skillId == 14001004)) {
                divisor = 130;
            } else {
                divisor = 140;
            }
           /* if (player.getPlayer().hasFakeChar()) {//检测分身
                divisor = 10;

            }*/
            if (attackTime / divisor < this.numSequentialAttacks) {
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "攻击加速" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
                //registerOffense(CheatingOffense.FASTATTACK);
                //////System.out.println("攻击速度过快！");
                //AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统T下线警告！.(非法使用加速外挂.异常攻击伤害值: " + " 当前等级 " + player.getLevel() + ")");
               // player.dropMessage(1,"[检测提示+D]\r\n非法使用加速外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n尽量使用技能！");
                //player.攻击加速掉线(player.getName() + " 被系统T下线.(非法使用加速外挂:当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                ////c.disconnect();

                return false;
            }
        }
        }
        if (this.lastAttackTime - oldLastAttackTime > 1500L) {
            this.attackingSince = this.lastAttackTime;
            this.numSequentialAttacks = 0;
        }
        return true;
    }

    public void checkTakeDamage(MapleClient c) { //检查收到伤害
        this.numSequentialDamage += 1;
        long oldLastDamageTakenTime = this.lastDamageTakenTime;
        this.lastDamageTakenTime = System.currentTimeMillis();

        long timeBetweenDamage = this.lastDamageTakenTime - this.takingDamageSince;

        if (timeBetweenDamage / 500L < this.numSequentialDamage) { //时间之内的损伤   小于  连续收到的伤害
            registerOffense(CheatingOffense.FAST_TAKE_DAMAGE); //特定时间内的损伤
            if(c.getPlayer().getHp() >0){
            ////System.out.println("掉血次数异常！");
           // c.getPlayer().dropMessage(1,"[公告事项]非法使用58秒掉血外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！");
            ////c.disconnect();
        }}

        if (this.lastDamageTakenTime - oldLastDamageTakenTime > 4500L) {
            this.takingDamageSince = this.lastDamageTakenTime;
            this.numSequentialDamage = 0;
        }
    }

    public int checkDamage(long dmg) {
        if ((dmg > 1L) && (this.lastDamage == dmg)) {
            this.numSameDamage += 1;
        } else {
            this.lastDamage = dmg; //最后一次伤害收到
            this.numSameDamage = 0;
        }
        return this.numSameDamage;
    }
   

    
    public synchronized boolean checkHPLoss() { //检查HP的损失
        if ((!((MapleCharacter) this.chr.get()).isGM())
                && (this.mobsOwned >= 50)) {
            registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT);
        }

        if (((MapleCharacter) this.chr.get()).getHp() >= ((MapleCharacter) this.chr.get()).getMaxHp()) { //检测超级血量外挂
            this.mobsOwned += 1;
        } else {
            this.mobsOwned = 0;
        }
        return false;
    }

    public void checkMoveMonster(Point pos, MapleCharacter player, MapleClient c) {
        if(player.getMapId() != 102000000 || player.getMapId() != 103000000 ||player.getMapId() != 920010800|| player.getMapId() != 103000000||player.getMapId() != 103000000){
        if (pos.equals(this.lastMonsterMove)) {
            this.monsterMoveCount += 1;
            if (this.monsterMoveCount >= 20 ) {
                registerOffense(CheatingOffense.MOVE_MONSTERS, "Position: " + pos.x + ", " + pos.y);
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "吸怪" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
                //  ////System.out.println("吸怪1");
                //player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂A！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
               // player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂A！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
               // player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂A！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
                String 吸怪 = "等级：" + player.getLevel() +
                        "\r\n"+"时间：" + FileoutputUtil.CurrentReadable_Time() +
                        "\r\n"+"IP："+player.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                FileoutputUtil.packetLog("log\\吸怪检测\\"+player.getName()+".log", 吸怪);
                // //c.disconnect();
                //   player.dropMessage(1,"非法使用外挂.攻击力过高.\r\n攻击力无限！\r\n再改我就操你妈！.");
            }
            // ////System.out.println("吸怪2");
        } else {
            this.lastMonsterMove = pos;
            this.monsterMoveCount = 1;
        }
    }}

    public void checkMoveMonsterY(Point pos, MapleCharacter player, MapleClient c) {
         if(player.getMapId() != 102000000 || player.getMapId() != 103000000 ||player.getMapId() != 920010800|| player.getMapId() != 103000000||player.getMapId() != 103000000){
        if (pos.equals(this.lastMonsterMove)) {
            this.monsterMoveCount += 1;
            if (this.monsterMoveCount >= 15) {
                registerOffense(CheatingOffense.MOVE_MONSTERS, "Position: " + pos.y);
                if (!player.isGM()) {
                        try {
                            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + player.getId() + "]人物: " + player.getName() + " 检测到使用非法程序.(理由: " + "吸怪" + ")").getBytes());
                        } catch (RemoteException ex) {
                            Logger.getLogger(CheatTracker.class.getName()).log(Level.SEVERE, null, ex);
                        }
                }
                //  ////System.out.println("吸怪1");
                // NPCScriptManager.getInstance().start(c, 9900004,2000);
                //player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂B！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
                //player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂B！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
                //player.dropMessage(1, "[检测提示]\r\n非法使用吸怪外挂B！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！\r\n如果你是拉怪的情况下提示\r\n请少拉一点怪！");
               String 吸怪 = "等级：" + player.getLevel() +
                        "\r\n"+"时间：" + FileoutputUtil.CurrentReadable_Time() +
                        "\r\n"+"IP："+player.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                FileoutputUtil.packetLog("log\\吸怪检测\\"+player.getName()+".log", 吸怪);
                //   //c.disconnect();
                //   player.dropMessage(1,"非法使用外挂.攻击力过高.\r\n攻击力无限！\r\n再改我就操你妈！.");
            }
            // ////System.out.println("吸怪2");
        } else {
            this.lastMonsterMove = pos;
            this.monsterMoveCount = 1;
        }
    }}

    public synchronized void checkFJ(MapleClient c) {
        long oldLastFJTime = this.lastFJTime;
        this.lastFJTime = System.currentTimeMillis();
        if (this.lastFJTime - oldLastFJTime > 200L) {
            this.infiniteFJCount = 0;
        } else {
            this.infiniteFJCount += 1;
        }
        if ((this.infiniteFJCount > 10)) {
            AutobanManager.getInstance().autoban(((MapleCharacter) this.chr.get()).getClient(), "异常移动");
            c.getPlayer().dropMessage(1, "[检测提示]\r\n非法使用过图外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！");
            c.disconnect();
        }
    }

    public boolean textSpam(String text) {
        if (!((MapleCharacter) this.chr.get()).isGM()) {
            if ((this.lastText[0].equalsIgnoreCase(text)) && (this.lastText[1].equalsIgnoreCase(text)) && (this.lastText[2].equalsIgnoreCase(text))) {
                return true;
            }
            if ((!this.lastText[2].equals(text)) && (this.lastText[1].equals(text)) && (this.lastText[0].equals(text))) {
                this.lastText[2] = text;
            } else if ((!this.lastText[1].equals(text)) && (this.lastText[0].equals(text))) {
                this.lastText[1] = text;
            } else if (!this.lastText[0].equals(text)) {
                this.lastText[0] = text;
            }
        }
        return false;
    }

    public boolean checkHPRegen() {
        this.numHPRegens += 1;
        if ((System.currentTimeMillis() - this.regenHPSince) / 10000L < this.numHPRegens) {
            registerOffense(CheatingOffense.FAST_HP_REGEN);
            return false;
        }
        return true;
    }

    public void resetHPRegen() {
        this.regenHPSince = System.currentTimeMillis();
        this.numHPRegens = 0;
    }

    public boolean checkMPRegen() {
        this.numMPRegens += 1;
        long allowedRegens = (System.currentTimeMillis() - this.regenMPSince) / 10000L;
        if (allowedRegens < this.numMPRegens) {
            registerOffense(CheatingOffense.FAST_MP_REGEN);
            return false;
        }
        return true;
    }

    public void resetMPRegen() {
        this.regenMPSince = System.currentTimeMillis();
        this.numMPRegens = 0;
    }

    public void resetSummonAttack() {
        this.summonSummonTime = System.currentTimeMillis();
        this.numSequentialSummonAttack = 0;
    }

    public boolean checkSummonAttack(MapleClient c) { //检查召唤攻击
        this.numSequentialSummonAttack += 1;

        long allowedAttacks = (System.currentTimeMillis() - this.summonSummonTime) / 2000L + 1L;
        if (allowedAttacks < this.numSequentialAttacks) {
            registerOffense(CheatingOffense.FAST_SUMMON_ATTACK);
            //c.getPlayer().dropMessage(1,"召唤兽攻击速度过快！\r\n请勿再次使用后果自负！");
            ////c.disconnect();
            return false;
        }
        return true;
    }

    public void checkPickupAgain(MapleClient c) {
        synchronized (this.pickupComplete) {
            if (this.pickupComplete) {
                this.pickupComplete = Boolean.FALSE;
               // c.getPlayer().dropMessage(1, "[检测提示]\r\n非法宠物类型.请联系管理员！");
            } else {
                registerOffense(CheatingOffense.TUBI);
            }
        }
    }

    public void pickupComplete() {
        synchronized (this.pickupComplete) {
            this.pickupComplete = Boolean.TRUE;
        }
    }

    public int getAttacksWithoutHit() {
        return this.attacksWithoutHit;
    }

    public void setAttacksWithoutHit(int attacksWithoutHit) {
        this.attacksWithoutHit = attacksWithoutHit;
    }

    public void setAttacksWithoutHit(boolean increase) {
        if (increase) {
            this.attacksWithoutHit += 1;
        } else {
            this.attacksWithoutHit = 0;
        }
    }


    public void registerOffense(CheatingOffense offense) {
        registerOffense(offense, null);
    }

    public void registerOffense(CheatingOffense offense, String param) {
        MapleCharacter chrhardref = (MapleCharacter) this.chr.get();
        if ((chrhardref == null) || (!offense.isEnabled())) {
            ////System.out.println("1");
            return;
        }

        CheatingOffenseEntry entry = (CheatingOffenseEntry) this.offenses.get(offense);
        if ((entry != null) && (entry.isExpired())) {
            expireEntry(entry);
            entry = null;
        }
        if (entry == null) {
            entry = new CheatingOffenseEntry(offense, chrhardref);
        }
        if (param != null) {
            entry.setParam(param);
        }
        entry.incrementCount();
        if (offense.shouldAutoban(entry.getCount())) {
            //chrhardref.dropMessage(1, "[检测提示]\r\n非法使用宠物吸物品外挂！\r\n导致游戏无法正常运营！\r\n请勿再次使用后果自负！");
            AutobanManager.getInstance().autoban(chrhardref.getClient(), StringUtil.makeEnumHumanReadable(offense.name()));
        }
        this.offenses.put(offense, entry); //把 进攻 进入
        CheatingOffensePersister.getInstance().persistEntry(entry); //坚持进入
    }

    public void expireEntry(CheatingOffenseEntry coe) {
        this.offenses.remove(coe.getOffense());
    }

    public int getPoints() {
        int ret = 0;
        CheatingOffenseEntry[] offenses_copy;
        synchronized (this.offenses) {
            offenses_copy = (CheatingOffenseEntry[]) this.offenses.values().toArray(new CheatingOffenseEntry[this.offenses.size()]);
        }
        for (CheatingOffenseEntry entry : offenses_copy) {
            if (entry.isExpired()) {
                expireEntry(entry);
            } else {
                ret += entry.getPoints();
            }
        }
        return ret;
    }

    public Map<CheatingOffense, CheatingOffenseEntry> getOffenses() {
        return Collections.unmodifiableMap(this.offenses);
    }

    public String getSummary() {
        StringBuilder ret = new StringBuilder();
        List offenseList = new ArrayList();
        synchronized (this.offenses) {
            for (CheatingOffenseEntry entry : this.offenses.values()) {
                if (!entry.isExpired()) {
                    offenseList.add(entry);
                }
            }
        }
        Collections.sort(offenseList, new Comparator() {
            public int compare(CheatingOffenseEntry o1, CheatingOffenseEntry o2) {
                int thisVal = o1.getPoints();
                int anotherVal = o2.getPoints();
                return thisVal == anotherVal ? 0 : thisVal < anotherVal ? 1 : -1;
            }

            public int compare(Object o1, Object o2) {
                throw new UnsupportedOperationException("还不支持."); //To change body of generated methods, choose Tools | Templates.
            }
        });
        int to = Math.min(offenseList.size(), 4);
        for (int x = 0; x < to; x++) {
            ret.append(StringUtil.makeEnumHumanReadable(((CheatingOffenseEntry) offenseList.get(x)).getOffense().name()));
            ret.append(": ");
            ret.append(((CheatingOffenseEntry) offenseList.get(x)).getCount());
            if (x != to - 1) {
                ret.append(" ");
            }
        }
        return ret.toString();
    }

    public void dispose() {
        this.invalidationTask.cancel(false);
    }

    private class InvalidationTask
            implements Runnable {

        private InvalidationTask() {
        }

        public void run() {
            CheatingOffenseEntry[] offenses_copy;
            synchronized (CheatTracker.this.offenses) {
                offenses_copy = (CheatingOffenseEntry[]) CheatTracker.this.offenses.values().toArray(new CheatingOffenseEntry[CheatTracker.this.offenses.size()]);
            }
            for (CheatingOffenseEntry offense : offenses_copy) {
                if (offense.isExpired()) {
                    CheatTracker.this.expireEntry(offense);
                }
            }

            if (CheatTracker.this.chr.get() == null) {
                CheatTracker.this.dispose();
            }
        }
    }
}
