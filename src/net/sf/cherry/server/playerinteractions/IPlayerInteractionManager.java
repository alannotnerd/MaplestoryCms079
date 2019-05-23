package net.sf.cherry.server.playerinteractions;

import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;

public abstract interface IPlayerInteractionManager
{
  public static final byte HIRED_MERCHANT = 1;
  public static final byte PLAYER_SHOP = 2;
  public static final byte MATCH_CARD = 3;
  public static final byte OMOK = 4;

  public abstract void broadcast(MaplePacket paramMaplePacket, boolean paramBoolean);

  public abstract void addVisitor(MapleCharacter paramMapleCharacter);

  public abstract void removeVisitor(MapleCharacter paramMapleCharacter);

  public abstract int getVisitorSlot(MapleCharacter paramMapleCharacter);

  public abstract void removeAllVisitors(int paramInt1, int paramInt2);

  public abstract void buy(MapleClient paramMapleClient, int paramInt, short paramShort);

  public abstract void closeShop(boolean paramBoolean);

  public abstract String getOwnerName();

  public abstract int getOwnerId();

  public abstract String getDescription();

  public abstract MapleCharacter[] getVisitors();

  public abstract List<MaplePlayerShopItem> getItems();

  public abstract void addItem(MaplePlayerShopItem paramMaplePlayerShopItem);

  public abstract boolean removeItem(int paramInt);

  public abstract void removeFromSlot(int paramInt);

  public abstract int getFreeSlot();

  public abstract byte getItemType();

  public abstract boolean isOwner(MapleCharacter paramMapleCharacter);

  public abstract byte getShopType();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.playerinteractions.IPlayerInteractionManager
 * JD-Core Version:    0.6.0
 */