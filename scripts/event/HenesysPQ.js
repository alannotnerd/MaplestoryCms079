importPackage(java.awt);
importPackage(net.sf.cherry.server.life);

var minPlayers = 1;
var leaderid = 1;
var pqMap = 910010000;
var pqTime = 60000;//10 Minutes

function init() {
	
}

function setup(level, partyId) {
    var eim = em.newInstance("HenesysPQ" + (leaderid++));
    var map = eim.getMapInstance(pqMap);
	map.killAllMonsters();
    eim.startEventTimer(pqTime);
	map.spawnMonsterwithpos(MapleLifeFactory.getMonster(9300061), new Point(-200,-200));	
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(pqMap);
    player.changeMap(map, map.getPortal(0));
    player.startQuest(1200, 1012114, true);  //迎月花保护月妙组队任务
}

function playerRevive(eim, player) {}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != pqMap) {
        eim.unregisterPlayer(player);
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    if (mobId == 9300061) {
        eim.broadcastPlayerMsg(5, "The Moon Bunny has been killed.");
        end(eim);
    }else{
		eim.broadcastPlayerMsg(5, mobId);
	}
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 910010300);
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {}

function leftParty(eim, player) {
    end(eim);
}
function disbandParty(eim) {
    end(eim);
}
function playerDead(eim, player) {}
function cancelSchedule() {}