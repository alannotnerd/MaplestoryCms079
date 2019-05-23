 package net.sf.cherry.net.channel.handler;
 
 import java.util.List;

import net.sf.cherry.client.ExpTable;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PetFoodHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (c.getPlayer().getNoPets() == 0) {
       c.getSession().write(MaplePacketCreator.enableActions());
       return;
     }
     int slot = 0;
     List<MaplePet> pets = c.getPlayer().getPets();
     for (MaplePet pet : pets) {
       if (pet.getFullness() < 100) {
         slot = c.getPlayer().getPetSlot(pet);
       }
     }
     MaplePet pet = c.getPlayer().getPet(slot);
     slea.readInt();
     slea.readShort();
     int itemId = slea.readInt();
 
     boolean gainCloseness = false;
 
     if (Randomizer.getInstance().nextInt(101) > 50) {
       gainCloseness = true;
     }
     if (pet.getFullness() < 100) {
       int newFullness = pet.getFullness() + 30;
       if (newFullness > 100) {
         newFullness = 100;
       }
       pet.setFullness(newFullness);
       if ((gainCloseness) && (pet.getCloseness() < 30000)) {
         int newCloseness = pet.getCloseness() + 1 * c.getChannelServer().getPetExpRate();
         if (newCloseness > 30000) {
           newCloseness = 30000;
         }
         pet.setCloseness(newCloseness);
         if (newCloseness >= ExpTable.getClosenessNeededForLevel(pet.getLevel() + 1)) {
           pet.setLevel(pet.getLevel() + 1);
         }
 
       }
 
      c.getSession().write(MaplePacketCreator.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.commandResponse(c.getPlayer().getId(), slot, 1, true), true);
     } else {
       if (gainCloseness) {
         int newCloseness = pet.getCloseness() - 1 * c.getChannelServer().getPetExpRate();
         if (newCloseness < 0) {
           newCloseness = 0;
         }
         pet.setCloseness(newCloseness);
         if (newCloseness < ExpTable.getClosenessNeededForLevel(pet.getLevel())) {
           pet.setLevel(pet.getLevel() - 1);
         }
       }
 
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.commandResponse(c.getPlayer().getId(), slot, 1, false), true);
     }
     MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemId, 1, true, false);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.PetFoodHandler
 * JD-Core Version:    0.6.0
 */