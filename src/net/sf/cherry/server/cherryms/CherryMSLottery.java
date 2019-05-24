package net.sf.cherry.server.cherryms;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.maps.MapleMapFactory;

import java.util.Collection;

public interface CherryMSLottery {

  void addChar(MapleCharacter paramMapleCharacter);

  void doLottery();

  void drawalottery();

  long getAllpeichu();

  void setAllpeichu(long paramLong);

  long getAlltouzhu();

  void setAlltouzhu(long paramLong);

  ChannelServer getChannelServer();

  Collection<MapleCharacter> getCharacters();

  void setCharacters(Collection<MapleCharacter> paramCollection);

  MapleMapFactory getMapleMapFactory();

  int getTouNumbyType(int paramInt);

  int getZjNum();

  void setZjNum(int paramInt);

  void warp(int paramInt, MapleCharacter paramMapleCharacter);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.cherryms.CherryMSLottery
 * JD-Core Version:    0.6.0
 */