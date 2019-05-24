package net.sf.cherry.client;

import java.sql.Timestamp;
import java.util.List;

public interface IItem extends Comparable<IItem> {

  int PET = 3;
  int ITEM = 2;
  int EQUIP = 1;

  byte getFlag();

  void setFlag(byte paramByte);

  int getxingji(); //星级

  byte getItemLevel();

  int getItemExp();

  byte getType();

  byte getPosition();

  void setPosition(byte paramByte);

  int getItemId();

  short getQuantity();

  void setQuantity(short paramShort);

  String getOwner();

  void setOwner(String paramString);

  int getPetId();

  IItem copy();

  void setxingji(int paramShort);

  void log(String paramString, boolean paramBoolean);

  List<String> getLog();

  Timestamp getExpiration();

  void setExpiration(Timestamp paramTimestamp);

  int getSN();

  void setSN(int paramInt);

  int getUniqueId();

  void setUniqueId(int paramInt);

  MaplePet getPet();

  boolean 友谊戒指();

  boolean 恋人戒指();

  boolean 结婚戒指();
}
