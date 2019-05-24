package net.sf.cherry.client;

public interface IEquip extends IItem {

  byte getUpgradeSlots();

  void setUpgradeSlots(int paramInt);

  byte getLocked();

  byte getLevel();

  boolean isRing();

  short getStr();

  short getDex();

  short getInt();

  short getLuk();

  short getHp();

  short getMp();

  short getWatk();

  short getMatk();

  short getWdef();

  short getMdef();

  short getAcc();

  short getAvoid();

  short getHands();

  short getSpeed();

  short getJump();

  int getPartnerUniqueId();

  int getPartnerId();

  String getPartnerName();

  short getVicious();

  void setVicious(int paramInt);

  enum ScrollResult {

    SUCCESS, FAIL, CURSE //成功 失败 诅咒
  }
}
