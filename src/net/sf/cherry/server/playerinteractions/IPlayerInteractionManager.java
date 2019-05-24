package net.sf.cherry.server.playerinteractions;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;

import java.util.List;

public interface IPlayerInteractionManager {
  byte HIRED_MERCHANT = 1;
  byte PLAYER_SHOP = 2;
  byte MATCH_CARD = 3;
  byte OMOK = 4;

  void broadcast(MaplePacket paramMaplePacket, boolean paramBoolean);

  void addVisitor(MapleCharacter paramMapleCharacter);

  void removeVisitor(MapleCharacter paramMapleCharacter);

  int getVisitorSlot(MapleCharacter paramMapleCharacter);

  void removeAllVisitors(int paramInt1, int paramInt2);

  void buy(MapleClient paramMapleClient, int paramInt, short paramShort);

  void closeShop(boolean paramBoolean);

  String getOwnerName();

  int getOwnerId();

  String getDescription();

  MapleCharacter[] getVisitors();

  List<MaplePlayerShopItem> getItems();

  void addItem(MaplePlayerShopItem paramMaplePlayerShopItem);

  boolean removeItem(int paramInt);

  void removeFromSlot(int paramInt);

  int getFreeSlot();

  byte getItemType();

  boolean isOwner(MapleCharacter paramMapleCharacter);

  byte getShopType();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.playerinteractions.IPlayerInteractionManager
 * JD-Core Version:    0.6.0
 */