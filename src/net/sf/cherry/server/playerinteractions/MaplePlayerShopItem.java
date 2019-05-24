package net.sf.cherry.server.playerinteractions;

import net.sf.cherry.client.IItem;

public class MaplePlayerShopItem {
  private IItem item;
  private short bundles;
  private int price;

  public MaplePlayerShopItem(IItem item, short bundles, int price) {
    this.item = item;
    this.bundles = bundles;
    this.price = price;
  }

  public IItem getItem() {
    return this.item;
  }

  public short getBundles() {
    return this.bundles;
  }

  public void setBundles(short bundles) {
    this.bundles = bundles;
  }

  public int getPrice() {
    return this.price;
  }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.playerinteractions.MaplePlayerShopItem
 * JD-Core Version:    0.6.0
 */