/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@cherry.de>
                       Jan Christian Meyer <vimes@cherry.de>

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

/*
	Map(s): 		Hidden Street : Free Market Entrance (910000000)
	Description: 		Takes you back to original location
*/

function enter(pi) {
	if(pi.getPlayer().getCherryBan()){
	pi.getPlayer().getCherryBanMessage();
	return false;
	}
	var returnMap = pi.getPlayer().getSavedLocation(net.sf.cherry.server.maps.SavedLocationType.FREE_MARKET);
	if (returnMap < 0) {
		returnMap = 102000000;
	}
	var target = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(returnMap);
	var portal = target.getPortal("st00");
	if (portal == null) {
		portal = target.getPortal(0);
	}
	pi.getPlayer().clearSavedLocation(net.sf.cherry.server.maps.SavedLocationType.FREE_MARKET);
	pi.getPlayer().changeMap(target, portal);
	return true;
}