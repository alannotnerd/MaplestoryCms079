 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PassiveEnergyHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readByte();
     slea.readInt();
     slea.readShort();
     slea.readByte();
     slea.readShort();
     slea.readInt();
     int oid = slea.readInt();
     slea.readInt();
     slea.readShort();
     slea.readShort();
     slea.readShort();
     slea.readInt();
     int damage = slea.readInt();
     slea.readInt();
     slea.readShort();
     slea.readShort();
 
     MapleMonster attacker = (MapleMonster)c.getPlayer().getMap().getMapObject(oid);
     if (attacker == null) {
       return;
     }
     c.getPlayer().getMap().damageMonster(c.getPlayer(), attacker, damage);
     c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.damageMonster(oid, damage), false, true);
   }
 }