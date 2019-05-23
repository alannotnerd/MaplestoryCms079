package net.sf.cherry.net.login.handler;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleCharacterUtil;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleSkinColor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class CreateCharHandler extends AbstractMaplePacketHandler {
	
	
 private static int 骑士团 = 0;
 private static int 冒险家 = 1;    
 private static int 战神 = 2;

 private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CreateCharHandler.class);

 @Override
 public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
     String name = slea.readMapleAsciiString();
     int job = slea.readInt();
     int face = slea.readInt();
     int hair = slea.readInt();
     int hairColor = 0;
     int skinColor = 0;
     int top = slea.readInt();
     int bottom = slea.readInt();
     int shoes = slea.readInt();
     int weapon = slea.readInt();
     int gender = c.getGender();

     MapleCharacter newchar = MapleCharacter.getDefault(c);
     if (c.isGM()) {
         newchar.setGM(c.GetGMLevel());
     }
     newchar.setWorld(c.getWorld());
     newchar.setFace(face);
     newchar.setHair(hair + hairColor);
     newchar.setGender(gender);
     if (job == 战神) {
         newchar.setStr(11);
         newchar.setDex(6);
         newchar.setInt(4);
         newchar.setLuk(4);
         newchar.setRemainingAp(0);
     } else {
         newchar.setStr(4);
         newchar.setDex(4);
         newchar.setInt(4);
         newchar.setLuk(4);
         newchar.setRemainingAp(9);
     }
     newchar.setName(name);
     newchar.setSkinColor(MapleSkinColor.getById(skinColor));
     if (job == 冒险家) {
         newchar.setJob(0);
         newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161001, (byte) 0, (short) 1));
     } else if (job == 骑士团) {
         newchar.setJob(1000);
         newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161047, (byte) 0, (short) 1));
     } else if (job == 战神) {
         newchar.setJob(2000);
         newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161048, (byte) 0, (short) 1));
     }
     newchar.getInventory(MapleInventoryType.USE).addItem(new Item(2022613, (byte)0, (byte)1)); //法老王的盒子
     newchar.getInventory(MapleInventoryType.CASH).addItem(new Item(5530000, (byte)0, (byte)1)); //推广奖励盒子
     
     MapleInventory equip = newchar.getInventory(MapleInventoryType.EQUIPPED);
     Equip eq_top = new Equip(top, (byte) -5);
     eq_top.setWdef((short) 3);
     eq_top.setUpgradeSlots((byte) 7);
     equip.addFromDB(eq_top.copy());
     Equip eq_bottom = new Equip(bottom, (byte) -6);
     eq_bottom.setWdef((short) 2);
     eq_bottom.setUpgradeSlots((byte) 7);
     equip.addFromDB(eq_bottom.copy());
     Equip eq_shoes = new Equip(shoes, (byte) -7);
     eq_shoes.setWdef((short) 2); //rite? o_O
     eq_shoes.setUpgradeSlots((byte) 7);
     equip.addFromDB(eq_shoes.copy());
     Equip eq_weapon = new Equip(weapon, (byte) -11);
     eq_weapon.setWatk((short) 15);
     eq_weapon.setUpgradeSlots((byte) 7);
     equip.addFromDB(eq_weapon.copy());
     if (MapleCharacterUtil.canCreateChar(name, c.getWorld())) {
         newchar.saveToDB(false);
         c.getSession().write(MaplePacketCreator.addNewCharEntry(newchar, true));
     } else {
         log.warn(MapleClient.getLogMessage(c, "Trying to create a character with a name: {}", new Object[]{name}));
     }
 }
}
