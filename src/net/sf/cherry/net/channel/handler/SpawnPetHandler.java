 package net.sf.cherry.net.channel.handler;
 
 import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MaplePet;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.PetDataFactory;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SpawnPetHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     slea.readInt();
     byte slot = slea.readByte();
     slea.readByte();
     boolean lead = slea.readByte() == 1;
     MaplePet pet = MaplePet.loadFromDb(c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot).getItemId(), slot, c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot).getUniqueId());
 
     if (c.getPlayer().getPetSlot(pet) != -1) {
       c.getPlayer().unequipPet(pet, true);
     //  System.out.println("召唤宠物A");
     } else {
       if ((c.getPlayer().getSkillLevel(SkillFactory.getSkill(8)) == 0) && (c.getPlayer().getPet(0) != null)) {
         c.getPlayer().unequipPet(c.getPlayer().getPet(0), false);
       }
       Point pos = c.getPlayer().getPosition();
       pos.y -= 12;
       pet.setPos(pos);
       pet.setFh(c.getPlayer().getMap().getFootholds().findBelow(pet.getPos()).getId());
       pet.setStance(0);
       pet.setSummoned(true);
       c.getPlayer().addPet(pet, lead);
       c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showPet(c.getPlayer(), pet, false), true);
       int uniqueid = pet.getUniqueId();
       List stats = new ArrayList();
       stats.add(new Pair(MapleStat.PET, Integer.valueOf(uniqueid)));
       c.getSession().write(MaplePacketCreator.petStatUpdate(c.getPlayer()));
       c.getSession().write(MaplePacketCreator.enableActions());
       c.getPlayer().startFullnessSchedule(PetDataFactory.getHunger(pet.getItemId()), pet, c.getPlayer().getPetSlot(pet));
       //System.out.println("召唤宠物B");
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SpawnPetHandler
 * JD-Core Version:    0.6.0
 */