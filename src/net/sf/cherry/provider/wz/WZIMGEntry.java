 package net.sf.cherry.provider.wz;
 
 import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataEntity;
 
 public class WZIMGEntry
   implements MapleData
 {
   private String name;
   private MapleDataType type;
   private List<MapleData> children = new ArrayList(10);
   private Object data;
   private MapleDataEntity parent;
 
   public WZIMGEntry(MapleDataEntity parent)
   {
     this.parent = parent;
   }
 
   public String getName()
   {
     return this.name;
   }
 
   public MapleDataType getType()
   {
     return this.type;
   }
 
   public List<MapleData> getChildren()
   {
     return Collections.unmodifiableList(this.children);
   }
 
   public MapleData getChildByPath(String path)
   {
     String[] segments = path.split("/");
     if (segments[0].equals("..")) {
       return ((MapleData)getParent()).getChildByPath(path.substring(path.indexOf("/") + 1));
     }
     MapleData ret = this;
     for (int x = 0; x < segments.length; x++) {
       boolean foundChild = false;
       for (MapleData child : ret.getChildren()) {
         if (child.getName().equals(segments[x])) {
           ret = child;
           foundChild = true;
           break;
         }
       }
       if (!foundChild) {
         return null;
       }
     }
     return ret;
   }
 
   public Object getData()
   {
     return this.data;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public void setType(MapleDataType type) {
     this.type = type;
   }
 
   public void setData(Object data) {
     this.data = data;
   }
 
   public void addChild(WZIMGEntry entry) {
     this.children.add(entry);
   }
 
   public Iterator<MapleData> iterator()
   {
     return getChildren().iterator();
   }
 
   public String toString()
   {
     return getName() + ":" + getData();
   }
 
   public MapleDataEntity getParent() {
     return this.parent;
   }
 
   public void finish() {
     ((ArrayList)this.children).trimToSize();
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZIMGEntry
 * JD-Core Version:    0.6.0
 */