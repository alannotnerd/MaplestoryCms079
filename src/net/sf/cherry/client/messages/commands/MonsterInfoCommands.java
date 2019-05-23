 package net.sf.cherry.client.messages.commands;
 
 import java.util.Arrays;
import java.util.List;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
 
 public class MonsterInfoCommands
   implements Command
 {
   public void execute(MapleClient c, MessageCallback mc, String[] splitted)
     throws Exception, IllegalCommandSyntaxException
   {
     if ((splitted[0].equals("!杀")) || (splitted[0].equals("!monsterdebug"))) {
       String mapMessage = "";
       MapleMap map = c.getPlayer().getMap();
       double range = (1.0D / 0.0D);
       List<MapleMapObject> monsters = map.getMapObjectsInRange(c.getPlayer().getPosition(), range, Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.MONSTER }));
       boolean kill = splitted[0].equals("!杀");
       for (MapleMapObject monstermo : monsters) {
         MapleMonster monster = (MapleMonster)monstermo;
         if (kill)
           map.killMonster(monster, c.getPlayer(), false);
         else {
           mc.dropMessage("Monster " + monster.toString());
         }
       }
       if (kill)
         mc.dropMessage("杀死了 " + monsters.size() + " 个怪物" + mapMessage + ".");
     }
     else if (splitted[0].equals("!killalldrops")) {
       MapleMap map = c.getPlayer().getMap();
       map.killAllMonsters();
     }
   }
 
   public CommandDefinition[] getDefinition()
   {
     return new CommandDefinition[] {
         new CommandDefinition("杀", "", "Kills all monsters", 3)};
         //new CommandDefinition("killalldrops", "", "Kills all monsters with drops", 50),
         //new CommandDefinition("monsterdebug", "", "", 50) };
   }
 }




