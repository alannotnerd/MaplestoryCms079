package net.sf.cherry.net.channel.handler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class ItemSortHandler extends AbstractMaplePacketHandler
{
  public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
  {
    slea.skip(4);
    byte sort = slea.readByte();

    if ((sort < 1) || (sort > 5)) {
      return;
    }

    List<Integer> items = new ArrayList<Integer>();

    MapleInventoryType type = MapleInventoryType.getByType(sort);
    MapleInventory inventory = c.getPlayer().getInventory(type);

    for (byte i = 0; i < 96; i = (byte)(i + 1)) {
      if (inventory.getItem(i) == null) {
        continue;
      }
      if (inventory.getItem(i).getItemId() == 5110000) {
        c.getSession().write(MaplePacketCreator.enableActions());
      }
      else if (!items.contains(Integer.valueOf(inventory.getItem(i).getItemId()))) {
        items.add(Integer.valueOf(inventory.getItem(i).getItemId()));
      }

    }

    Collections.sort(items);

    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

     for (Integer item : items) {
     List<Byte> stack = new ArrayList<Byte>();
      stack = inventory.findAllById(item.intValue());
      if ((stack.size() > 1) && (!ii.isRechargable(item.intValue()))) {
        for (byte j = 1; j < stack.size(); j = (byte)(j + 1)) {
          if ((inventory.getItem(((Byte)stack.get(j)).byteValue()) != null) && (inventory.getItem(((Byte)stack.get(j)).byteValue()).getQuantity() < ii.getSlotMax(c, item.intValue()))) {
            for (byte k = 0; k < j; k = (byte)(k + 1)) {
              if ((inventory.getItem(((Byte)stack.get(k)).byteValue()) != null) && (inventory.getItem(((Byte)stack.get(k)).byteValue()).getQuantity() < ii.getSlotMax(c, item.intValue()))) {
                MapleInventoryManipulator.move(c, type, ((Byte)stack.get(j)).byteValue(), ((Byte)stack.get(k)).byteValue());
                break;
              }
            }
          }
        }
      }
    }

    items.clear();

    for (byte i = 0; i < 96; i = (byte)(i + 1)) {
      if (inventory.getItem(i) == null) {
        continue;
      }
      if (inventory.getItem(i).getItemId() == 5110000) {
        c.getSession().write(MaplePacketCreator.enableActions());
      }
      else if (!items.contains(Integer.valueOf(inventory.getItem(i).getItemId()))) {
        items.add(Integer.valueOf(inventory.getItem(i).getItemId()));
      }

    }

    byte current_slot = 1;

    Collections.sort(items);
    for (Integer item : items) {
      List stack = new ArrayList();
      stack = inventory.findAllById(item.intValue());
      for (byte j = 0; j < stack.size(); j = (byte)(j + 1)) {
        List new_stack = new ArrayList();
        new_stack = inventory.findAllById(item.intValue());
        if (((Byte)new_stack.get(j)).byteValue() != current_slot) {
          MapleInventoryManipulator.move(c, type, ((Byte)new_stack.get(j)).byteValue(), current_slot);
        }
        current_slot = (byte)(current_slot + 1);
      }
    }
  }
}




