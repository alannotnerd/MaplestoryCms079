 package net.sf.cherry.server;
 
 import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.tools.MaplePacketCreator;
 
 public class MapleTrade
 {
   private static Logger log = LoggerFactory.getLogger(MapleTrade.class);
   private MapleTrade partner = null;
   private List<IItem> items = new LinkedList();
   private List<IItem> exchangeItems;
   private int meso = 0;
   private int exchangeMeso;
   boolean locked = false;
   private MapleCharacter chr;
   private byte number;
 
   public MapleTrade(byte number, MapleCharacter c)
   {
     this.chr = c;
     this.number = number;
   }
 
   private int getFee(int meso) {
     int fee = 0;
     if (meso >= 10000000)
       fee = (int)Math.round(0.04D * meso);
     else if (meso >= 5000000)
       fee = (int)Math.round(0.03D * meso);
     else if (meso >= 1000000)
       fee = (int)Math.round(0.02D * meso);
     else if (meso >= 100000)
       fee = (int)Math.round(0.01D * meso);
     else if (meso >= 50000) {
       fee = (int)Math.round(0.005D * meso);
     }
     return fee;
   }
 
   public void lock() {
     this.locked = true;
     this.partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeConfirmation());
   }
 
   public void complete1() {
     this.exchangeItems = this.partner.getItems();
     this.exchangeMeso = this.partner.getMeso();
   }
 
   public void complete2() {
     this.items.clear();
     this.meso = 0;
     for (IItem item : this.exchangeItems) {
       if ((item.getFlag() & 0x10) == 16)
         item.setFlag((byte)(item.getFlag() ^ 0x10));
       MapleInventoryManipulator.addFromDrop(this.chr.getClient(), item, false);
     }
     if (this.exchangeMeso > 0) {
       this.chr.gainMeso(this.exchangeMeso - getFee(this.exchangeMeso), false, true, false);
     }
     this.exchangeMeso = 0;
     if (this.exchangeItems != null) {
       this.exchangeItems.clear();
     }
     this.chr.getClient().getSession().write(MaplePacketCreator.getTradeCompletion(this.number));
   }
 
   public void cancel()
   {
     StringBuilder logInfo = new StringBuilder("Canceled trade ");
     if (this.partner != null) {
       logInfo.append("with ");
       logInfo.append(this.partner.getChr().getName());
     }
     logInfo.append(". ");
     logInfo.append(this.chr.getName());
     logInfo.append(" received the item.");
     for (IItem item : this.items) {
       MapleInventoryManipulator.addFromDrop(this.chr.getClient(), item, logInfo.toString(), false);
     }
     if (this.meso > 0) {
       this.chr.gainMeso(this.meso, false, true, false);
     }
 
     this.meso = 0;
     if (this.items != null) {
       this.items.clear();
     }
     this.exchangeMeso = 0;
     if (this.exchangeItems != null) {
       this.exchangeItems.clear();
     }
     this.chr.getClient().getSession().write(MaplePacketCreator.getTradeCancel(this.number));
   }
 
   public boolean isLocked() {
     return this.locked;
   }
 
   public int getMeso() {
     return this.meso;
   }
 
   public void setMeso(int meso) {
     if (this.locked) {
       throw new RuntimeException("Trade is locked.");
     }
     if (meso < 0) {
       log.info("[h4x] {} Trying to trade < 0 meso", this.chr.getName());
       return;
     }
     if (this.chr.getMeso() >= meso) {
       if ((this.meso + meso < 0) && 
         (this.chr.getMeso() >= 2147483647 - meso)) {
         meso = 2147483647 - meso;
         this.chr.getClient().getSession().write(MaplePacketCreator.serverNotice(1, "Only " + meso + " mesos were added to the trade because adding more would cause a technical glitch."));
         if (this.partner != null) {
           this.partner.getChr().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "Only " + meso + " mesos were added to the trade because adding more would cause a technical glitch."));
         }
 
       }
 
       this.chr.gainMeso(-meso, false, true, false);
       this.meso += meso;
       this.chr.getClient().getSession().write(MaplePacketCreator.getTradeMesoSet( (byte)0, this.meso));
       if (this.partner != null)
         this.partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeMesoSet( (byte)1, this.meso));
     }
     else {
       AutobanManager.getInstance().addPoints(this.chr.getClient(), 1000, 0L, "Trying to trade more mesos than in possession");
       log.warn("Some idiot named " + this.chr.getName() + " is trying to trade more meso's than possessed..");
     }
   }
 
   public void addItem(IItem item) {
     this.items.add(item);
     this.chr.getClient().getSession().write(MaplePacketCreator.getTradeItemAdd( (byte)0, item));
     if (this.partner != null)
       this.partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeItemAdd( (byte)1, item));
   }
 
   public void chat(String message)
   {
     this.chr.getClient().getSession().write(MaplePacketCreator.getPlayerShopChat(this.chr, message, true));
     if (this.partner != null)
       this.partner.getChr().getClient().getSession().write(MaplePacketCreator.getPlayerShopChat(this.chr, message, false));
   }
 
   public MapleTrade getPartner()
   {
     return this.partner;
   }
 
   public void setPartner(MapleTrade partner) {
     if (this.locked) {
       throw new RuntimeException("Trade is locked.");
     }
     this.partner = partner;
   }
 
   public MapleCharacter getChr()
   {
     return this.chr;
   }
 
   public List<IItem> getItems() {
     return new LinkedList(this.items);
   }
 
     public boolean fitsInInventory() {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        Map<MapleInventoryType, Integer> neededSlots = new LinkedHashMap<MapleInventoryType, Integer>();
        for (IItem item : exchangeItems) {
            MapleInventoryType type = mii.getInventoryType(item.getItemId());
            if (neededSlots.get(type) == null) {
                neededSlots.put(type, 1);
            } else {
                neededSlots.put(type, neededSlots.get(type) + 1);
            }
        }
        for (Map.Entry<MapleInventoryType, Integer> entry : neededSlots.entrySet()) {
            if (chr.getInventory(entry.getKey()).isFull(entry.getValue() - 1)) {
                return false;
            }
        }
        return true;
    }
 
   public static void completeTrade(MapleCharacter c) {
     c.getTrade().lock();
     MapleTrade local = c.getTrade();
     MapleTrade partner = local.getPartner();
     if (partner.isLocked()) {
       local.complete1();
       partner.complete1();
 
       if ((!local.fitsInInventory()) || (!partner.fitsInInventory())) {
         cancelTrade(c);
         c.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "There is not enough inventory space to complete the trade."));
         partner.getChr().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "There is not enough inventory space to complete the trade."));
         return;
       }
       local.complete2();
       partner.complete2();
       partner.getChr().setTrade(null);
       c.setTrade(null);
     }
   }
 
   public static void cancelTrade(MapleCharacter c) {
     c.getTrade().cancel();
     if (c.getTrade().getPartner() != null) {
       c.getTrade().getPartner().cancel();
       c.getTrade().getPartner().getChr().setTrade(null);
     }
     c.setTrade(null);
   }
   
    public static void startTrade(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write(MaplePacketCreator.getTradeStart(c.getClient(), c.getTrade(), (byte) 0));
        } else {
            c.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "现在正忙,请稍后再试"));
        }
    }
    public static void start现金交易(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write(MaplePacketCreator.get接受现金交易(c.getClient(), c.getTrade(), (byte) 0));
        } else {
            c.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "现在正忙,请稍后再试"));
        }
    }

    public static void inviteTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write(MaplePacketCreator.getTradeInvite(c1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "正在做别的事情"));
            cancelTrade(c1);
        }
    }
    
    public static void 现金交易(MapleCharacter c1, MapleCharacter c2) {
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write(MaplePacketCreator.get现金交易(c1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "正在做别的事情"));
            cancelTrade(c1);
        }
    }
 
    public static void 接受现金交易(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() && c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            if (c1.getMap() != c2.getMap()) {
                c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You are not in the same map as the trader."));
                c1.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c2.getClient().getSession().write(MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().getSession().write(MaplePacketCreator.get接受现金交易(c1.getClient(), c1.getTrade(), (byte) 1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "The other player has already closed the trade"));
        }
    }
    
  public static void visitTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() &&
                c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            if (c1.getMap() != c2.getMap()) {
                c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You are not in the same map as the trader."));
                c1.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c2.getClient().getSession().write(MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().getSession().write(MaplePacketCreator.getTradeStart(c1.getClient(), c1.getTrade(), (byte) 1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "The other player has already closed the trade"));
        }
    }
 
   public static void declineTrade(MapleCharacter c) {
     MapleTrade trade = c.getTrade();
     if (trade != null) {
       if (trade.getPartner() != null) {
         MapleCharacter other = trade.getPartner().getChr();
         other.getTrade().cancel();
         other.setTrade(null);
         other.getClient().getSession().write(MaplePacketCreator.serverNotice(5, c.getName() + " 拒绝了你的交易邀请"));
       }
 
       trade.cancel();
       c.setTrade(null);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.MapleTrade
 * JD-Core Version:    0.6.0
 */