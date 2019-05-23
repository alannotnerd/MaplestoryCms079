package net.sf.cherry.client.messages.commands;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleMonsterStats;
import net.sf.cherry.tools.MaplePacketCreator;

public class MonsterSpawningCommands
        implements Command {

    private static Logger log = LoggerFactory.getLogger(MonsterSpawningCommands.class);
   public static void Fake(Exception e)
   {
     e.toString();
   }
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!召唤")) {
            int mid = Integer.parseInt(splitted[1]);
            int num = Math.min(CommandProcessor.getOptionalIntArg(splitted, 2, 1), 500);

            Integer hp = CommandProcessor.getNamedIntArg(splitted, 1, "hp");
            Integer exp = CommandProcessor.getNamedIntArg(splitted, 1, "exp");
            Double php = CommandProcessor.getNamedDoubleArg(splitted, 1, "php");
            Double pexp = CommandProcessor.getNamedDoubleArg(splitted, 1, "pexp");

            boolean hpLock = false;
            boolean moveLock = false;
            for (String s : splitted) {
                if (s.equalsIgnoreCase("hpLock")) {
                    hpLock = true;
                }
                if (s.equalsIgnoreCase("moveLock")) {
                    moveLock = true;
                }
            }
            MapleMonster onemob = MapleLifeFactory.getMonster(mid);
            int newhp = 0;
            int newexp = 0;
            if (onemob.getExp()==0) {
            	onemob.getStats().setExp(1);
			}
            double oldExpRatio = onemob.getHp() / onemob.getExp();

            if (hp != null) {
                newhp = hp.intValue();
            } else if (php != null) {
                newhp = (int) (onemob.getMaxHp() * (php.doubleValue() / 100.0D));
            } else {
                newhp = onemob.getMaxHp();
            }
            if (exp != null) {
                newexp = exp.intValue();
            } else if (pexp != null) {
                newexp = (int) (onemob.getExp() * (pexp.doubleValue() / 100.0D));
            } else {
                newexp = onemob.getExp();
            }

            if (newhp < 1) {
                newhp = 1;
            }
            double newExpRatio = newhp / newexp;
            if ((newExpRatio < oldExpRatio) && (newexp > 0)) {
                mc.dropMessage("You cannot spawn this monster! The new hp/exp ratio is better than the old one. (" + newExpRatio + " < " + oldExpRatio + ")");
                return;
            }

            MapleMonsterStats overrideStats = new MapleMonsterStats();
            overrideStats.setHp(newhp);
            overrideStats.setExp(newexp);
            overrideStats.setMp(onemob.getMaxMp());

            for (int i = 0; i < num; i++) {
                MapleMonster mob = MapleLifeFactory.getMonster(mid);
                mob.setHp(newhp);
                mob.setOverrideStats(overrideStats);
                mob.setHpLock(hpLock);
                mob.setMoveLocked(moveLock);
                if (moveLock) {
                    c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
                } else {
                    c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
                }
            }
        } else if (splitted[0].equals("!papulatus")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(8500001);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!nxslimes")) {
            for (int i = 0; i <= 10; i++) {
                MapleMonster mob = MapleLifeFactory.getMonster(9400202);
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
            }
        } else if (splitted[0].equals("!jrbalrog")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(8130100);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!balrog")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(8150000);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!bossfamily")) {
            for (int i = 9400100; i <= 9400103; i++) {
                MapleMonster mob0 = MapleLifeFactory.getMonster(i);
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
            }
            for (int i = 9400110; i <= 9400113; i++) {
                MapleMonster mob2 = MapleLifeFactory.getMonster(i);
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob2, c.getPlayer().getPosition());
            }
            for (int i = 9400121; i <= 9400122; i++) {
                MapleMonster mob2 = MapleLifeFactory.getMonster(i);
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob2, c.getPlayer().getPosition());
            }
            MapleMonster mob3 = MapleLifeFactory.getMonster(9400300);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob3, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!mushmom")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(6130101);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!zombiemushmom")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(6300005);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!bluemushmom")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(9400205);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!theboss")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(9400300);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!shark")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(8150100);
            MapleMonster mob1 = MapleLifeFactory.getMonster(8150101);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob1, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!pianus")) {
            MapleMonster mob0 = MapleLifeFactory.getMonster(8510000);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob0, c.getPlayer().getPosition());
        } else if (splitted[0].equals("!zakum")) {
            c.getPlayer().getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), c.getPlayer().getPosition());
            for (int i = 8800003; i <= 8800010; i++) {
                c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(i), c.getPlayer().getPosition());
            }
        } else if (splitted[0].equals("!horntail")) {
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange("Bgm14/HonTale"));
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8810026), c.getPlayer().getPosition());
        } else if (splitted[0].equals("!hplock")) {
            int oid = Integer.parseInt(splitted[1]);
            MapleMonster mmo = c.getPlayer().getMap().getMonsterByOid(oid);
            if (mmo != null) {
                mmo.setHpLock(!mmo.isHpLocked());
                mc.dropMessage("Monster with oID " + oid + " is " + (mmo.isHpLocked() ? "" : "no longer ") + "HP Locked.");
            }
        } else if (splitted[0].equals("!unfreezeoid")) {
            int oid = Integer.parseInt(splitted[1]);
            MapleMonster mmo = c.getPlayer().getMap().getMonsterByOid(oid);
            if (mmo != null) {
                if ((mmo.isFake()) && (mmo.isMoveLocked())) {
                    mmo.setMoveLocked(false);
                    c.getPlayer().getMap().makeMonsterReal(mmo);
                }
                mc.dropMessage("Monster with oID " + oid + " is " + (mmo.isMoveLocked() ? "" : "no longer ") + "Move Locked.");
            }
        }
    }

    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
           
            new CommandDefinition("召唤", "", "Spawns the monster with the given id", 4)};
            /*
            new CommandDefinition("papulatus", "", "", 50),
            new CommandDefinition("nxslimes", "", "", 50),
            new CommandDefinition("jrbalrog", "", "", 50),
            new CommandDefinition("balrog", "", "", 50),
            new CommandDefinition("bossfamily", "", "", 50),
            new CommandDefinition("mushmom", "", "", 50),
            new CommandDefinition("zombiemushmom", "", "", 50),
            new CommandDefinition("bluemushmom", "", "", 50),
            new CommandDefinition("theboss", "", "", 50),
            new CommandDefinition("shark", "", "", 50),
            new CommandDefinition("pianus", "", "", 50),
            new CommandDefinition("zakum", "", "", 4),
            new CommandDefinition("horntail", "", "", 50),
            new CommandDefinition("hplock", "", "", 50),
            new CommandDefinition("shan1", "", "Shows how many players are connected on each channel", 0),
            new CommandDefinition("unfreezeoid", "", "", 50)};
             *
             */

    }
}
