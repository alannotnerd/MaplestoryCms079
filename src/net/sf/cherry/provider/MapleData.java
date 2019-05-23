package net.sf.cherry.provider;

import java.util.List;

import net.sf.cherry.provider.wz.MapleDataType;

public abstract interface MapleData extends MapleDataEntity, Iterable<MapleData>
{
  public abstract String getName();

  public abstract MapleDataType getType();

  public abstract List<MapleData> getChildren();

  public abstract MapleData getChildByPath(String paramString);

  public abstract Object getData();
}
