 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.status.MonsterStatus;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class HypnotizeHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int mobfrom = slea.readInt();
     int playerid = slea.readInt();
     int mobto = slea.readInt();
     slea.readByte();
     int damage = slea.readInt();
     slea.readByte();
     slea.readInt();
 
     MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterById(playerid);
     MapleMap map = player.getMap();
     MapleMonster mobFrom = map.getMonsterByOid(mobfrom);
     MapleMonster mobTo = map.getMonsterByOid(mobto);
     if ((mobFrom != null) && (mobTo != null) && (mobFrom.containsStatus(MonsterStatus.HYPNOTIZED)));
     map.damageMonster(player, mobTo, damage);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.HypnotizeHandler
 * JD-Core Version:    0.6.0
 */