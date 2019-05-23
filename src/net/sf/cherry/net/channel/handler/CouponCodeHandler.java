 package net.sf.cherry.net.channel.handler;
 
 import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class CouponCodeHandler extends AbstractMaplePacketHandler
 {
   private static Logger log = LoggerFactory.getLogger(CouponCodeHandler.class);
 
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.skip(2);
     String code = slea.readMapleAsciiString();
     boolean validcode = false;
     int type = -1;
     int item = -1;
     try {
       validcode = c.getPlayer().getNXCodeValid(code.toUpperCase(), validcode);
     } catch (SQLException e) {
       log.error("Code SQL Error", e);
     }
 
     if (validcode) {
       try {
         type = c.getPlayer().getNXCodeType(code);
       } catch (SQLException e) {
         log.error("Code SQL Error", e);
       }
       try {
         item = c.getPlayer().getNXCodeItem(code);
       } catch (SQLException e) {
         log.error("Code SQL Error", e);
       }
       if (type != 5) {
         try {
           c.getPlayer().setNXCodeUsed(code);
         } catch (SQLException e) {
           log.error("Code SQL Error", e);
         }
 
       }
 
       switch (type) {
       case 0:
       case 1:
       case 2:
         c.getPlayer().modifyCSPoints(type, item);
         break;
       case 3:
         c.getPlayer().modifyCSPoints(0, item);
         c.getPlayer().modifyCSPoints(1, item / 5000);
         break;
       case 4:
       //  MapleInventoryManipulator.addById(c, item, 1, "物品使用优惠券获得.", null, -1);
         c.getSession().write(MaplePacketCreator.showCouponRedeemedItem(item));
         break;
       case 5:
         c.getPlayer().modifyCSPoints(0, item);
       }
 
       c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
     } else {
       c.getSession().write(MaplePacketCreator.wrongCouponCode());
     }
   }
 }

