/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>  
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
importPackage(net.sf.cherry.client);
importPackage(net.sf.cherry.client.messages);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.server);
importPackage(net.sf.cherry.tools);

function getDefinition () {
	var ret = java.lang.reflect.Array.newInstance(CommandDefinition, 1);
	ret[0] = new CommandDefinition("exprate", "rate", "Sets the experience rate.", "100"); 
	return ret;
}

function execute (c, mc, splitted) {
	if (splitted.length != 3) {
		mc.dropMessage("Syntax: !exprate <频道id> <经验倍数>");
	} else {
		var ChannelId = splitted[1];  //频道id
		var exp = splitted[2];        //经验倍数
		var packet = MaplePacketCreator.serverNotice(6, "当期 频道 " + ChannelId + "经验倍数已经修改为 " + exp + "x");
		ChannelServer.getInstance(ChannelId).setExpRate(exp);
		ChannelServer.getInstance(ChannelId).broadcastPacket(packet);
	}
}
