/*
 * @author Crovax
 * 
 * 4th Job Berserk Quest.
 * Based on Kerning City PQ script by Stereo
 * And on 4th job Rush quest script by Angel-SL
 */


importPackage(net.sf.cherry.world);

var exitMap;
var instanceId;
var minPlayers = 3;

function init() {
	instanceId = 1;
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup() {
	exitMap = em.getChannelServer().getMapFactory().getMap(105090800); // <exit>
	var instanceName = "4jberserk" + instanceId;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	instanceId++;
	
	var map = mf.getMap(910500200);
        map.addMapTimer(3*60);
	eim.schedule("timeOut", 20 * 60000);

	//you can't warp up to the rocks until all rogs are dead, I think?
	eim.setProperty("canWarp","false");
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(910500200);
	player.changeMap(map, map.getPortal(0));
	
	//TODO: hold time across map changes
	//player.getClient().getSession().write(net.sf.cherry.tools.MaplePacketCreator.getClock(1800));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	//if (eim.isLeader(player)) { //check for party leader
		//boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		eim.dispose();
	/*/}
	else { //boot dead player
		// If only 2 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}*/
}

function playerDisconnected(eim, player) {
	//if (eim.isLeader(player)) { //check for party leader
		//boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).equals(player)) {
				removePlayer(eim, player);
			}			
			else {
				playerExit(eim, party.get(i));
			}
		}
		eim.dispose();
	/*/}
	else { //boot d/ced player
		// If only 2 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}*/
}

function leftParty(eim, player) {			
	// If only 2 players are left, uncompletable:
	var party = eim.getPlayers();
	if (true) {
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim,party.get(i));
		}
		eim.dispose();
	}
	else
		playerExit(eim, player);
}

function disbandParty(eim) {
	//boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

//for offline players
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//KPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
	//I hope this function works. I mean, it seems pretty straightforward.
        eim.setProperty("canWarp","true");
}

function cancelSchedule() {
}

function timeOut(eim) {
	if(eim != null) {
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerExit(eim, pIter.next());
			}
		}
		eim.dispose();
	}
	
}
