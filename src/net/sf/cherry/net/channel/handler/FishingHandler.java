/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.Fishing;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.anticheat.CheatingOffense;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author Jay Estrella
 */
public class FishingHandler extends AbstractMaplePacketHandler{

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, final MapleClient c) {
        if (c.getPlayer().getJob() == null || c.getPlayer().getMap() == null) { 
            return; 
        } 
       
        if (!Fishing.hasFishingChair(c.getPlayer())) { 
            return; 
        } 
       
        if (Fishing.isFishingChair(c.getPlayer().getChair()) && Fishing.isFishingMap(c.getPlayer().getMapId())) { 
        	c.getPlayer().doFish();
        } else {
        	c.getPlayer().getClient().getSession().write(MaplePacketCreator.sendHint("必须要在钓鱼地图，才能钓鱼！\r\n", 200, 200));
        } 
        
        c.getSession().write(MaplePacketCreator.enableActions()); 
    }
    
}