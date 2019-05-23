 package net.sf.cherry.net.channel.handler;
 
 import java.util.Map;

import net.sf.cherry.client.IItem;
import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SkillBookHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (!c.getPlayer().isAlive()) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     slea.readInt();
     byte slot = (byte)slea.readShort();
     int itemId = slea.readInt();
     MapleCharacter player = c.getPlayer();
     IItem toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
 
     if ((toUse != null) && (toUse.getQuantity() == 1)) {
       if (toUse.getItemId() != itemId) {
         return;
       }
       Map skilldata = MapleItemInformationProvider.getInstance().getSkillStats(toUse.getItemId(), c.getPlayer().getJob().getId());
 
       boolean canuse = false;
       boolean success = false;
       int skill = 0;
       int maxlevel = 0;
       if (skilldata == null) {
         return;
       }
       if (((Integer)skilldata.get("skillid")).intValue() == 0) {
         canuse = false;
       } else if ((player.getSkillLevel(SkillFactory.getSkill(((Integer)skilldata.get("skillid")).intValue())) >= ((Integer)skilldata.get("reqSkillLevel")).intValue()) && (player.getMasterLevel(SkillFactory.getSkill(((Integer)skilldata.get("skillid")).intValue())) < ((Integer)skilldata.get("masterLevel")).intValue())) {
         canuse = true;
         if ((Randomizer.getInstance().nextInt(101) < ((Integer)skilldata.get("success")).intValue()) && (((Integer)skilldata.get("success")).intValue() != 0)) {
           success = true;
           ISkill skill2 = SkillFactory.getSkill(((Integer)skilldata.get("skillid")).intValue());
           player.changeSkillLevel(skill2, player.getSkillLevel(skill2), ((Integer)skilldata.get("masterLevel")).intValue());
         } else {
           success = false;
         }
         MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
       } else {
         canuse = false;
       }
       player.getClient().getSession().write(MaplePacketCreator.skillBookSuccess(player, skill, maxlevel, canuse, success));
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SkillBookHandler
 * JD-Core Version:    0.6.0
 */