 package net.sf.cherry.client.messages.commands;
 

 import java.awt.Point;
import java.awt.Rectangle;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.server.maps.MapleReactorFactory;
import net.sf.cherry.server.maps.MapleReactorStats;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MiscCommands
   implements Command
 { public static void Fake(Exception e)
   {
     e.toString();
   }
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     ChannelServer cserv = c.getChannelServer();
     if (splitted[0].equals("!jsp")) {
         if (c.getPlayer().getParty() != null) {
        	 MaplePartyCharacter chrp = new MaplePartyCharacter(c.getPlayer());
             chrp.setOnline(false);
        	 c.getPlayer().getParty().addMember(chrp);
        	 mc.dropMessage(" Party size "+c.getPlayer().getParty().getPartyMembers().size());
		}else{
			mc.dropMessage(" no Party! ");
		}
     }else if (splitted[0].equals("!spy")) {
       MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
       double var = victim.getJumpMod();
       double var2 = victim.getSpeedMod();
       int str = victim.getStr();
       int dex = victim.getDex();
       int intel = victim.getInt();
       int luk = victim.getLuk();
       int meso = victim.getMeso();
       int maxhp = victim.getCurrentMaxHp();
       int maxmp = victim.getCurrentMaxMp();
       int gmlev = victim.getGMLevel();
       mc.dropMessage("JumpMod is " + var + " and Speedmod is " + var2 + ".");
       mc.dropMessage("Players stats are: Str: " + str + ", Dex: " + dex + ", Int: " + intel + ", Luk: " + luk + ".");
       mc.dropMessage("Player has " + meso + " mesos.");
       mc.dropMessage("Max HP is " + maxhp + ", and max MP is " + maxmp + ".");
       mc.dropMessage("GM Level is " + gmlev + ".");
     } else if (splitted[0].equals("!giftnx")) {
       if (splitted.length < 4) {
         mc.dropMessage("Use !giftnx <player> <amount> <type> - with type being 'paypal', 'card' or 'maplepoint'.");
       } else {
         int type = 0;
         String type1 = "";
         if (splitted[3].equals("paypal")) {
           type = 1;
           type1 = "PaypalNX";
         } else if (splitted[3].equals("card")) {
           type = 4;
           type1 = "CardNX";
         } else if (splitted[3].equals("maplepoint")) {
           type = 2;
           type1 = "MaplePoints";
         } else {
           mc.dropMessage("Use !giftnx <player> <amount> <type> - with type being 'paypal', 'card' or 'maplepoint'.");
         }
         if ((type == 1) || (type == 2) || (type == 4)) {
           MapleCharacter victim1 = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
           int points = Integer.parseInt(splitted[2]);
           victim1.modifyCSPoints(type, points);
           mc.dropMessage(type1 + " has been gifted.");
         }
       }
     } else if (splitted[0].equals("!fame")) {
       MapleCharacter player = c.getPlayer();
       MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
       int fame = Integer.parseInt(splitted[2]);
       victim.addFame(fame);
       player.updateSingleStat(MapleStat.FAME, fame);
     } else if (splitted[0].equals("!heal")) {
       if (splitted.length == 1) {
         MapleCharacter player = c.getPlayer();
         player.setHp(player.getMaxHp());
         player.updateSingleStat(MapleStat.HP, player.getMaxHp());
         player.setMp(player.getMaxMp());
         player.updateSingleStat(MapleStat.MP, player.getMaxMp());
       } else if (splitted.length == 2) {
         MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
         if (player == null) {
           mc.dropMessage("That player is either offline or doesn't exist");
           return;
         }
         player.setHp(player.getMaxHp());
         player.updateSingleStat(MapleStat.HP, player.getMaxHp());
         player.setMp(player.getMaxMp());
         player.updateSingleStat(MapleStat.MP, player.getMaxMp());
         mc.dropMessage("Healed " + splitted[1]);
       }
     } else if (splitted[0].equals("!kill")) {
       for (String name : splitted)
         if (!name.equals(splitted[0])) {
           MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(name);
           if (victim != null) {
             victim.setHp(0);
             victim.setMp(0);
             victim.updateSingleStat(MapleStat.HP, 0);
             victim.updateSingleStat(MapleStat.MP, 0);
           }
         }
     }
     else if (splitted[0].equals("!killmap")) {
       for (MapleCharacter victim : c.getPlayer().getMap().getCharacters())
         if (victim != null) {
           victim.setHp(0);
           victim.setMp(0);
           victim.updateSingleStat(MapleStat.HP, 0);
           victim.updateSingleStat(MapleStat.MP, 0);
         }
     }
     else if (splitted[0].equals("!dcall")) {
       Collection<ChannelServer> csss = ChannelServer.getAllInstances();
        for (ChannelServer cservers : csss) {
         Collection<MapleCharacter> cmc = new LinkedHashSet(cservers.getPlayerStorage().getAllCharacters());
         for (MapleCharacter mch : cmc) {
           if ((!mch.isGM()) && (mch != null))
             try {
               mch.getClient().disconnect();
             }
             catch (Exception e) {
             }
       }
     }
     }else if (splitted[0].equals("!healmap")) {
       Collection<MapleCharacter> cmc = new LinkedHashSet(c.getPlayer().getMap().getCharacters());
       for (MapleCharacter mch : cmc)
         if (mch != null) {
           mch.setHp(mch.getMaxHp());
           mch.setMp(mch.getMaxMp());
           mch.updateSingleStat(MapleStat.HP, mch.getMaxHp());
           mch.updateSingleStat(MapleStat.MP, mch.getMaxMp());
         }
     }
     else if (splitted[0].equals("!unstick")) {
       MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
       victim.saveToDB(true);
       victim.unstick();
       mc.dropMessage(victim + " has been unstuck.");
     } else if (splitted[0].equals("!eventmap")) {
       c.getPlayer().getMap().setEvent(!c.getPlayer().getMap().hasEvent());
       mc.dropMessage(c.getPlayer().getMap().hasEvent() ? "Map set to event mode." : "Map set to regular mode.");
     } else if (splitted[0].equals("!clock")) {
       if (splitted.length < 2) {
         mc.dropMessage("Please include the time in seconds you'd like on the clock!");
         return;
       }
       c.getPlayer().getMap().addMapTimer(Integer.parseInt(splitted[1]));
     }
     else if (splitted[0].equals("!removequest")) {
       MapleQuest.remove(Integer.parseInt(splitted[1]));
     } else if (splitted[0].equals("!resetmap")) {
       MapleCharacter player = c.getPlayer();
       boolean custMap = splitted.length >= 2;
       int mapid = custMap ? Integer.parseInt(splitted[1]) : player.getMapId();
       MapleMap map = custMap ? player.getClient().getChannelServer().getMapFactory().getMap(mapid) : player.getMap();
       if (player.getClient().getChannelServer().getMapFactory().destroyMap(mapid)) {
         MapleMap newMap = player.getClient().getChannelServer().getMapFactory().getMap(mapid);
         MaplePortal newPor = newMap.getPortal(0);
         Collection<MapleCharacter> mcs = new LinkedHashSet(map.getCharacters());
           outerLoop:
       for (MapleCharacter m : mcs) {
           for (int x = 0; x < 5; x++) {
               try {
                   m.changeMap(newMap, newPor);
                   continue outerLoop;
               } catch (Throwable t) {
               }
           }
           mc.dropMessage("Failed warping " + m.getName() + " to the new map. Skipping...");
         }
         label1603: mc.dropMessage("The map has been reset.");
         return;
       }
       mc.dropMessage("Unsuccessful reset!");
     } else if (splitted[0].equalsIgnoreCase("!spawnrate")) {
       MapleMap map = c.getPlayer().getMap();
       if (splitted[1].equalsIgnoreCase("multi")) {
         if (map.isSpawnRateModified()) {
           mc.dropMessage("The spawn rate for this map has already been modified. You may only reset it.");
           return;
         }
         int delta = Integer.parseInt(splitted[2]);
         if (delta < 1) {
           mc.dropMessage("You cannot multiply the spawnrate by anything less than one (use divide to decrease spawn)");
           return;
         }
         if (delta > 5) {
           mc.dropMessage("You cannot multiply the spawnrate by anything more than 5. That would cause the spawn to be too much.");
           return;
         }
         map.setSpawnRateMulti(delta);
       } else if (splitted[1].equalsIgnoreCase("divide")) {
         if (map.isSpawnRateModified()) {
           mc.dropMessage("The spawn rate for this map has already been modified. You may only reset it.");
           return;
         }
         int delta = Integer.parseInt(splitted[2]);
         if (delta < 1) {
           mc.dropMessage("You cannot divide the spawnrate by anything less than one (use multi to increase spawn)");
           return;
         }
         map.setSpawnRateMulti(-delta);
       } else if (splitted[1].equalsIgnoreCase("reset")) {
         map.resetSpawnRate();
       } else if (splitted[1].equalsIgnoreCase("resetspawn")) {
         map.resetSpawn();
       } else {
         mc.dropMessage("Syntax: !spawnrate [multi/divide/reset/resetspawn] [delta]");
         mc.dropMessage("Multi speeds up the spawn up to 5 times.");
         mc.dropMessage("Divide slows down the spawn down with no limit.");
         mc.dropMessage("Reset resets the spawnrate as well as the spawn thread. Does not require delta.");
         mc.dropMessage("Resetspawn resets the spawn thread. DOES NOT RESET SPAWNRATE.");
       }
     } else if (splitted[0].equalsIgnoreCase("!mute")) {
       if (splitted.length >= 3) {
         MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
         int time = Integer.parseInt(splitted[2]);
         Calendar unmuteTime = Calendar.getInstance();
         unmuteTime.add(12, time);
         victim.setMuted(true);
         victim.setUnmuteTime(unmuteTime);
         mc.dropMessage(victim.getName() + "has been muted for " + time + " minutes.");
         victim.dropMessage("You have been muted for " + time + " minutes");
       }
       else {
         mc.dropMessage("!mute <player name> <minutes>");
       }
     } else if (splitted[0].equalsIgnoreCase("!unmute")) {
       if (splitted.length >= 2)
         cserv.getPlayerStorage().getCharacterByName(splitted[1]).setMuted(false);
       else
         mc.dropMessage("Please enter the character name that you want to unmute.");
     }
     else if (splitted[0].equalsIgnoreCase("!mutemap")) {
       MapleMap map = c.getPlayer().getMap();
       map.setMuted(!map.getMuted());
       map.broadcastMessage(MaplePacketCreator.serverNotice(5, map.getMapName() + " has been " + (map.getMuted() ? "muted." : "unmuted.")));
     } else if (splitted[0].equalsIgnoreCase("!getbuffs")) {
       if (splitted.length < 2) {
         return;
       }
       String name = splitted[1];
       MapleCharacter chr = cserv.getPlayerStorage().getCharacterByName(name);
       List<MapleStatEffect> lmse = chr.getBuffEffects();
       mc.dropMessage(name + "'s buffs:");
 
       for (MapleStatEffect mse : lmse) {
         StringBuilder sb = new StringBuilder();
         sb.append(mse.isSkill() ? "SKILL: " : "ITEM: ");
         if (mse.isSkill()) {
           sb.append(" ");
           sb.append(mse.getRemark());
           sb.append(" ");
         }
 
         sb.append(mse.isSkill() ? SkillFactory.getSkillName(mse.getSourceId()) : MapleItemInformationProvider.getInstance().getName(mse.getSourceId()));
         sb.append(" (");
         sb.append(mse.getSourceId());
         sb.append(") ");
         sb.append(mse.getBuffString());
 
         mc.dropMessage(sb.toString());
       }
       mc.dropMessage(name + "'s buffs END.");
     } else if (splitted[0].equalsIgnoreCase("!toggleblock")) {
       if (splitted.length < 2) {
         mc.dropMessage("Syntax: !toggleblock exit/enter");
         return;
       }
       String type = splitted[1];
       if (type.equalsIgnoreCase("exit")) {
         c.getPlayer().getMap().setCanExit(!c.getPlayer().getMap().canExit());
         mc.dropMessage("Non-GMs may " + (c.getPlayer().getMap().canExit() ? "" : "not ") + "exit this map.");
       } else if (type.equalsIgnoreCase("enter")) {
         c.getPlayer().getMap().setCanEnter(!c.getPlayer().getMap().canEnter());
         mc.dropMessage("Non-GMs may " + (c.getPlayer().getMap().canEnter() ? "" : "not ") + "enter this map.");
       }
     } else if (splitted[0].equalsIgnoreCase("!damage")) {
       if (splitted.length < 2) {
         mc.dropMessage("Syntax: !damage enable/disable");
         return;
       }
       boolean op = splitted[1].equalsIgnoreCase("disable");
       Collection<MapleMapObject> cmmo = c.getPlayer().getMap().getMapObjects();
       for (MapleMapObject mmo : cmmo) {
         if (mmo.getType() == MapleMapObjectType.MONSTER) {
           MapleMonster mm = (MapleMonster)mmo;
           mm.setHpLock(op);
         }
       }
       mc.dropMessage("All mobs are now " + (op ? "" : "not ") + "HP locked.");
     } else if (splitted[0].equalsIgnoreCase("!unfreezemap"))
     {
       Collection<MapleMapObject> cmmo = c.getPlayer().getMap().getMapObjects();
       for (MapleMapObject mmo : cmmo) {
         if (mmo.getType() == MapleMapObjectType.MONSTER) {
           MapleMonster mm = (MapleMonster)mmo;
           if ((mm.isFake()) && (mm.isMoveLocked())) {
             mm.setMoveLocked(false);
           }
         }
       }
       mc.dropMessage("All mobs are now not Move locked.");
     }
     else
     {
       MapleMap wto;
       MaplePortal wtof;
       MaplePortal wtot;
       boolean it;
       if (splitted[0].equalsIgnoreCase("!split")) {
        Collection<MapleCharacter> lmc = new LinkedHashSet(c.getPlayer().getMap().getCharacters());
         wto = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(splitted[1]));
         if (wto == null) {
           return;
         }
         wtof = wto.getPortal(Integer.parseInt(splitted[2]));
         wtot = wto.getPortal(Integer.parseInt(splitted[3]));
         if ((wtof == null) || (wtot == null)) {
           return;
         }
         it = false;
        for (MapleCharacter cmc : lmc) {
           if (it)
             cmc.changeMap(wto, wtot);
           else {
             cmc.changeMap(wto, wtof);
           }
           it = !it;
         }
       }
       else if (splitted[0].equalsIgnoreCase("!dropwave")) {
         int itemid = Integer.parseInt(splitted[1]);
         boolean mesos = itemid < 0;
         if (mesos) {
           itemid = -itemid;
           if (itemid < 1) {
             itemid = 1;
           }
         }
         int quant = CommandProcessor.getNamedIntArg(splitted, 2, "quantity", 1);
         int margin = CommandProcessor.getNamedIntArg(splitted, 2, "dist", 20);
         if (margin < 20) {
           margin = 20;
         }
         MapleMap map = c.getPlayer().getMap();
         Point p = c.getPlayer().getPosition();
         margin = c.getPlayer().isFacingLeft() ? -margin : margin;
         if (mesos) {
           for (int x = 0; (x < quant) && (x < 30); x++) {
             map.spawnMesoDrop(itemid, p, c.getPlayer(), c.getPlayer(), true);
             p.translate(margin, 0);
           }
         }
         else {
           MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
           Item toDrop = null;
           boolean eq = ii.getInventoryType(itemid) == MapleInventoryType.EQUIP;
 
           if (!eq)
           {
          
           toDrop = new Item(itemid, (byte) 0, (short) 1);
           }
           for (int x = 0; (x < quant) && (x < 30); x++)
           {
             if (eq) {
               toDrop = ii.randomizeStats((Equip)ii.getEquipById(itemid));
             }
             if (toDrop == null) {
               break;
             }
             map.spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, p, true, true);
             p.translate(margin, 0);
           }
         }
       } else if (splitted[0].equalsIgnoreCase("!killid")) {
         int mid = Integer.parseInt(splitted[1]);
         c.getPlayer().getMap().killMonster(mid, c.getPlayer());
       }
       else
       {
         int amt;
         if (splitted[0].equalsIgnoreCase("!givemap")) {
           Collection<MapleCharacter> cmc = new LinkedHashSet(c.getPlayer().getMap().getCharacters());
           String type = splitted[1];
           int itemid;
           MapleItemInformationProvider ii;
           short quantity;
           boolean pet;
           if (type.equalsIgnoreCase("item")) {
             itemid = Integer.parseInt(splitted[2]);
             ii = MapleItemInformationProvider.getInstance();
             quantity = (short)CommandProcessor.getOptionalIntArg(splitted, 3, 1);
             pet = (itemid >= 5000000) && (itemid <= 5000100);
             for (MapleCharacter player : cmc) {
               if (pet) {
                 if (quantity > 1) {
                   quantity = 1;
                 }
                 int petId = MaplePet.createPet(itemid);
                 MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, "from !givemap", c.getPlayer().getName(), petId);
                 return;
               }if (ii.isRechargable(itemid)) {
                 quantity = ii.getSlotMax(c, itemid);
                 MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, "Rechargable item created.", c.getPlayer().getName(), -1);
                 return;
               }
               MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, player.getName() + "got from !givemap with quantity " + quantity, c.getPlayer().getName(), -1);
             }
           }
           else
           {
           //  int amt;
             if (type.equalsIgnoreCase("meso")) {
               amt = Integer.parseInt(splitted[2]);
 
               for (MapleCharacter player : cmc)
                 player.gainMeso(amt, true, true, true);
             }
             else if (type.equalsIgnoreCase("exp")) {
               amt = Integer.parseInt(splitted[2]);
 
               for (MapleCharacter player : cmc)
                 player.gainExp(amt, true, true, false);
             }
           }     
         } else if (splitted[0].equalsIgnoreCase("!area")) {
           int id = Integer.parseInt(splitted[1]);
           Rectangle area = c.getPlayer().getMap().getArea(id);
           if (area == null) {
             mc.dropMessage("Invalid areaID");
             return;
           }
           String type = splitted[2];
           boolean mark = type.equalsIgnoreCase("mark");
           List<MapleCharacter> cmc = mark ? null : c.getPlayer().getMap().getPlayersInRect(area);
           int itemid;
           MapleItemInformationProvider ii;
           short quantity;
           boolean pet;
           if (type.equalsIgnoreCase("item")) {
             itemid = Integer.parseInt(splitted[3]);
             ii = MapleItemInformationProvider.getInstance();
             quantity = (short)CommandProcessor.getOptionalIntArg(splitted, 4, 1);
             pet = (itemid >= 5000000) && (itemid <= 5000100);
             for (MapleCharacter player : cmc) {
               if (pet) {
                 if (quantity > 1) {
                   quantity = 1;
                 }
                 int petId = MaplePet.createPet(itemid);
                 MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, "from !givemap", c.getPlayer().getName(), petId);
                 return;
               }if (ii.isRechargable(itemid)) {
                 quantity = ii.getSlotMax(c, itemid);
                 MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, "Rechargable item created.", c.getPlayer().getName(), -1);
                 return;
               }
               MapleInventoryManipulator.addById(player.getClient(), itemid, quantity, player.getName() + "got from !givemap with quantity " + quantity, c.getPlayer().getName(), -1);
             }
           }
           else
           {
           //  int amt;
             if (type.equalsIgnoreCase("meso")) {
               amt = Integer.parseInt(splitted[3]);
 
               for (MapleCharacter player : cmc)
                 player.gainMeso(amt, true, true, true);
             }
             else
             {
               //int amt;
               if (type.equalsIgnoreCase("exp")) {
                 amt = Integer.parseInt(splitted[3]);
 
                 for (MapleCharacter player : cmc)
                   player.gainExp(amt, true, true, false);
               }
               else
               {
                 MapleMap target;
                 MaplePortal targetPortal;
                 if (type.equalsIgnoreCase("warp")) {
                   int map = Integer.parseInt(splitted[3]);
 
                   target = cserv.getMapFactory().getMap(map);
 
                   if (target == null) {
                     mc.dropMessage("You have entered an incorrect Map ID.");
                     return;
                   }
                   targetPortal = null;
                   if (splitted.length > 4)
                     try {
                       targetPortal = target.getPortal(Integer.parseInt(splitted[4]));
                     }
                     catch (Exception e) {
                     }
                   if (targetPortal == null) {
                     targetPortal = target.getPortal(0);
                   }
                   for (MapleCharacter player : cmc) {
                     player.changeMap(target, targetPortal);
                   }
 
                 }
                 else if (type.equalsIgnoreCase("clearwrong")) {
                   int wrong = Integer.parseInt(splitted[3]);
                   Rectangle area2 = c.getPlayer().getMap().getArea(wrong);
                   if (area2 == null) {
                     mc.dropMessage("Invalid area2ID");
                     return;
                   }
                   List<MapleCharacter> wmc = c.getPlayer().getMap().getPlayersInRect(area2);
                   for (MapleCharacter c2 : cmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("quest/party/clear"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("Party1/Clear"));
                   }
                   for (MapleCharacter c2 : wmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("Party1/Failed"));
                   }
                 }
                 else if (type.equalsIgnoreCase("victorylose")) {
                   int wrong = Integer.parseInt(splitted[3]);
                   Rectangle area2 = c.getPlayer().getMap().getArea(wrong);
                   if (area2 == null) {
                     mc.dropMessage("Invalid area2ID");
                     return;
                   }
                   List<MapleCharacter> wmc = c.getPlayer().getMap().getPlayersInRect(area2);
                   for (MapleCharacter c2 : cmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("event/coconut/victory"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("Coconut/Victory"));
                   }
                   for (MapleCharacter c2 : wmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("event/coconut/lose"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("Coconut/Failed"));
                   }
                 }
                 else if (type.equalsIgnoreCase("winlose")) {
                   int wrong = Integer.parseInt(splitted[3]);
                   Rectangle area2 = c.getPlayer().getMap().getArea(wrong);
                   if (area2 == null) {
                     mc.dropMessage("Invalid area2ID");
                     return;
                   }
                   List<MapleCharacter> wmc = c.getPlayer().getMap().getPlayersInRect(area2);
                   for (MapleCharacter c2 : cmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/win"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Win"));
                   }
                   for (MapleCharacter c2 : wmc) {
                     c2.getClient().getSession().write(MaplePacketCreator.showEffect("quest/carnival/lose"));
                     c2.getClient().getSession().write(MaplePacketCreator.playSound("MobCarnival/Lose"));
                   }
                 }
                 else if (mark) {
                   int xpos1 = area.x;
                   int xpos2 = area.x + area.width;
                   int ypos1 = area.y;
                   int ypos2 = area.y + area.height;
                   Point tl = new Point(xpos1, ypos1);
                   Point bl = new Point(xpos1, ypos2);
                   Point tr = new Point(xpos2, ypos1);
                   Point br = new Point(xpos2, ypos2);
                   MapleReactorStats mri = MapleReactorFactory.getReactor(2006000);
                   MapleReactor tlr = new MapleReactor(mri, 2006000);
                   MapleReactor blr = new MapleReactor(mri, 2006000);
                   MapleReactor trr = new MapleReactor(mri, 2006000);
                   MapleReactor brr = new MapleReactor(mri, 2006000);
                   tlr.setDelay(-1);
                   blr.setDelay(-1);
                   trr.setDelay(-1);
                   brr.setDelay(-1);
                   tlr.setPosition(tl);
                   blr.setPosition(bl);
                   trr.setPosition(tr);
                   brr.setPosition(br);
                   c.getPlayer().getMap().spawnReactor(tlr);
                   c.getPlayer().getMap().spawnReactor(trr);
                   c.getPlayer().getMap().spawnReactor(blr);
                   c.getPlayer().getMap().spawnReactor(brr);
                 }
               }
             }
           }
         } else if (splitted[0].equalsIgnoreCase("!dinvincibility")) {
           c.getPlayer().getMap().setCannotInvincible(!c.getPlayer().getMap().cannotInvincible());
           mc.dropMessage("Non-GMs can now " + (c.getPlayer().getMap().cannotInvincible() ? "no longer " : "") + "use Dark Sight, Smokescreen and Oak Barrel.");
         } else if (splitted[0].equalsIgnoreCase("!joinparty")) {
           MapleCharacter victim = null;
           if (c.getPlayer().getParty() != null) {
             c.getPlayer().dropMessage("You are already in a party.");
             return;
           }
           try {
             victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
           } catch (Exception e) {
           }
           if (victim == null) {
             c.getPlayer().dropMessage("This person is currently not in your channel, offline or does not exist.");
             return;
           }
           WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
           if (victim.getParty() != null) {
             if (victim.getParty().getMembers().size() < 6) {
               MaplePartyCharacter partyplayer = new MaplePartyCharacter(c.getPlayer());
               wci.updateParty(victim.getParty().getId(), PartyOperation.JOIN, partyplayer);
               c.getPlayer().receivePartyMemberHP();
               c.getPlayer().updatePartyMemberHP();
             } else {
               c.getPlayer().dropMessage("The party you are trying to join is currently full.");
             }
           }
           else c.getPlayer().dropMessage("This person does not have a party.");
         }
         else if (splitted[0].equalsIgnoreCase("!joinguild")) {
           MapleCharacter victim = null;
           MapleCharacter player = c.getPlayer();
           if (c.getPlayer().getGuildId() != 0) {
             c.getPlayer().dropMessage("You are already in a guild.");
             return;
           }
           try {
             victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
           } catch (Exception e) {
           }
           if (victim == null) {
             player.dropMessage("This person is currently not in your channel, offline or does not exist.");
             return;
           }
           if (victim.getGuildId() != 0) {
             player.setGuildId(victim.getGuild().getId());
             player.setGuildRank(5);
             int s = c.getChannelServer().getWorldInterface().addGuildMember(player.getMGC());
             if (s == 0) {
               player.dropMessage("The guild you are trying to join is currently full.");
               player.setGuildId(0);
               return;
             }
             c.getSession().write(MaplePacketCreator.showGuildInfo(player));
             player.saveGuildStatus();
             player.getMap().broadcastMessage(player, MaplePacketCreator.removePlayerFromMap(player.getId()), false);
             player.getMap().broadcastMessage(player, MaplePacketCreator.spawnPlayerMapobject(player), false);
             if (player.hasBattleShip()) {
              // player.getMap().broadcastMessage(player, MaplePacketCreator.showBuffeffect(player.getId(), 52210006, 1, 3), false);
             }
             if (player.getNoPets() > 0) {
               for (MaplePet pet : player.getPets())
                 if (pet != null)
                   player.getMap().broadcastMessage(player, MaplePacketCreator.showPet(player, pet, false, false), false);
             }
           }
           else
           {
             player.dropMessage("This person does not have a guild.");
           }
         } else if (splitted[0].equalsIgnoreCase("!snailrush")) {
           Point maple = new Point(40, -88);
           Point story = new Point(40, 152);
           MapleMonster mob1 = MapleLifeFactory.getMonster(100100);
           mob1.setHpLock(true);
           MapleMonster mob2 = MapleLifeFactory.getMonster(100100);
           mob2.setHpLock(true);
           MapleMap m = c.getPlayer().getMap();
           m.spawnMonsterOnGroundBelow(mob1, maple);
           m.spawnMonsterOnGroundBelow(mob2, story);
           m.killMonster(9300091, c.getPlayer());
         }
       }
     }
   }
 
   public CommandDefinition[] getDefinition() {
     return new CommandDefinition[] {
    		 new CommandDefinition("jsp", "<player>", "Spies on the player", 50),
         /*
         new CommandDefinition("spy", "<player>", "Spies on the player", 50),
         new CommandDefinition("giftnx", "<player> <amount> <type>", "Gifts the specified NX to the player", 50),
         new CommandDefinition("fame", "<player> <fame>", "Sets the player's fame at the specified amount", 50),
         new CommandDefinition("heal", "[player]", "Heals you if player is not specified", 50),
         new CommandDefinition("kill", "<players>", "Kills the players specified", 3),
         new CommandDefinition("dcall", "", "DCs everyone.", 50),
         new CommandDefinition("healmap", "", "Heals the map", 50),
         new CommandDefinition("unstick", "<player>", "Unsticks the specified player", 50),
         new CommandDefinition("vac", "", "Vacs monsters to you.", 50),
         new CommandDefinition("eventmap", "", "Toggles event map status on the current map", 50),
         new CommandDefinition("clock", "[time]", "Shows a clock to everyone in the map", 3),
         new CommandDefinition("removequest", "Quest ID", "Removes a quest from cache", 50),
         new CommandDefinition("resetmap", "[mapid]", "Resets the specified mapid, or if not specified, the map you are on. Used to reset maps that crash when entered.", 50),
         new CommandDefinition("spawnrate", "See !spawnrate help", "Spawnrate control.", 50),
         new CommandDefinition("mute", "[player name] [minutes muted]", "Mutes player for the amount of minutes.", 50),
         new CommandDefinition("unmute", "[player name]", "Unmutes player", 50),
         new CommandDefinition("mutemap", "", "Mutes the map", 50),
         new CommandDefinition("killmap", "", "kills the map", 50),
         new CommandDefinition("getbuffs", "[player]", "Gets all the buffs of the specified player", 50),
         new CommandDefinition("toggleblock", "exit/enter", "Sets whether non-GMs may exit/enter this map.", 50),
         new CommandDefinition("damage", "enable/disable", "Sets whether damage to monsters is enabled.", 50),
         new CommandDefinition("unfreezemap", "", "Unfreezes movelocked monsters", 50),
         new CommandDefinition("split", "<mapid> <portal no 1> <portal no 2>", "Warps one half of the map to portal no 1 in mapid and the other to portal no 2 in mapid.", 50),
         new CommandDefinition("dropwave", "<itemid (negative value for mesos)> [quantity <quantity> (default 1)] [dist <distance between each item in pixels> (default 20)]", "Spawns a wave of items.", 50),
         new CommandDefinition("killid", "", "", 50),
         new CommandDefinition("shan2", "", "Shows how many players are connected on each channel", 0),
         new CommandDefinition("givemap", "item/meso/exp <itemid/amt/amt> <quantity>", "", 50),
         new CommandDefinition("area", "[too lengthy]", "See AngelSL for help.", 50),
         new CommandDefinition("dinvincibility", "", "Toggles whether players can use Dark Sight, Oak Barrel or Smokescreen.", 50),
         new CommandDefinition("joinparty", "", "Join the player's party", 50),
         new CommandDefinition("joinguild", "", "Join the player's guild", 50),
         new CommandDefinition("snailrush", "", "", 50),
         new CommandDefinition("playershop", "<rename/close> <owner's name> [rename to]", "", 50) };
          *
          */
        };
   }
 }
