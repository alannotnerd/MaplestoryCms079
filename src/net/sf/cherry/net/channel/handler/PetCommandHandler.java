 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.ExpTable;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.PetCommand;
import net.sf.cherry.client.PetDataFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class PetCommandHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int petId = slea.readInt();
     int petIndex = c.getPlayer().getPetByUniqueId(petId);
     MaplePet pet = null;
     if (petIndex == -1) {
       return;
     }
     pet = c.getPlayer().getPet(petIndex);
 
     slea.readInt();
     slea.readByte();
 
     byte command = slea.readByte();
 
     PetCommand petCommand = PetDataFactory.getPetCommand(pet.getItemId(), command);
 
     boolean success = false;
     if (Randomizer.getInstance().nextInt(101) <= petCommand.getProbability()) {
       success = true;
       if (pet.getCloseness() < 30000) {
         int newCloseness = pet.getCloseness() + petCommand.getIncrease() * c.getChannelServer().getPetExpRate();
         if (newCloseness > 30000) {
           newCloseness = 30000;
         }
         pet.setCloseness(newCloseness);
         if (newCloseness >= ExpTable.getClosenessNeededForLevel(pet.getLevel() + 1)) {
           pet.setLevel(pet.getLevel() + 1);
 
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showPetLevelUp(c.getPlayer(), c.getPlayer().getPetSlot(pet)));
                }
                c.getSession().write(MaplePacketCreator.updatePet(pet, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
            }
        }
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.commandResponse(c.getPlayer().getId(), petIndex, command, success), true);
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.PetCommandHandler
 * JD-Core Version:    0.6.0
 */