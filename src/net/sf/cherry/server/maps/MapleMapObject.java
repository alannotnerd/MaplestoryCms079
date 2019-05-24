package net.sf.cherry.server.maps;

import net.sf.cherry.client.MapleClient;

import java.awt.*;

public interface MapleMapObject {
  int getObjectId();

  void setObjectId(int paramInt);

  MapleMapObjectType getType();

  Point getPosition();

  void setPosition(Point paramPoint);

  void sendSpawnData(MapleClient paramMapleClient);

  void sendDestroyData(MapleClient paramMapleClient);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapObject
 * JD-Core Version:    0.6.0
 */