package net.sf.cherry.server.quest;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataEntity;
import net.sf.cherry.provider.wz.MapleDataType;

import java.io.Serializable;
import java.util.*;

public class MapleCustomQuestData
    implements MapleData, Serializable {
  private static final long serialVersionUID = -8600005891655365066L;
  private List<MapleCustomQuestData> children = new LinkedList();
  private String name;
  private Object data;
  private MapleDataEntity parent;

  public MapleCustomQuestData(String name, Object data, MapleDataEntity parent) {
    this.name = name;
    this.data = data;
    this.parent = parent;
  }

  public void addChild(MapleData child) {
    this.children.add((MapleCustomQuestData) child);
  }

  public String getName() {
    return this.name;
  }

  public MapleDataType getType() {
    return MapleDataType.UNKNOWN_TYPE;
  }

  public List<MapleData> getChildren() {
    MapleData[] ret = new MapleData[children.size()];
    ret = children.toArray(ret);
    return new ArrayList<MapleData>(Arrays.asList(ret));
  }

  public MapleData getChildByPath(String name) {
    if (name.equals(this.name)) return this;
    String lookup;
    String nextName;
    if (name.indexOf("/") == -1) {
      lookup = name;
      nextName = name;
    } else {
      lookup = name.substring(0, name.indexOf("/"));
      nextName = name.substring(name.indexOf("/") + 1);
    }
    for (MapleData child : children) {
      if (child.getName().equals(lookup))
        return child.getChildByPath(nextName);
    }
    return null;
  }

  public Object getData() {
    return this.data;
  }

  public Iterator<MapleData> iterator() {
    return getChildren().iterator();
  }

  public MapleDataEntity getParent() {
    return this.parent;
  }
}

