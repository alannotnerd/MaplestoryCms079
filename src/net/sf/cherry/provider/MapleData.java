package net.sf.cherry.provider;

import net.sf.cherry.provider.wz.MapleDataType;

import java.util.List;

public interface MapleData extends MapleDataEntity, Iterable<MapleData> {
  String getName();

  MapleDataType getType();

  List<MapleData> getChildren();

  MapleData getChildByPath(String paramString);

  Object getData();
}
