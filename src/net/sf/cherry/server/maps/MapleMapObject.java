package net.sf.cherry.server.maps;

import java.awt.Point;

import net.sf.cherry.client.MapleClient;

public abstract interface MapleMapObject
{
  public abstract int getObjectId();

  public abstract void setObjectId(int paramInt);

  public abstract MapleMapObjectType getType();

  public abstract Point getPosition();

  public abstract void setPosition(Point paramPoint);

  public abstract void sendSpawnData(MapleClient paramMapleClient);

  public abstract void sendDestroyData(MapleClient paramMapleClient);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapObject
 * JD-Core Version:    0.6.0
 */