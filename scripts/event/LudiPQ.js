/**
	Ludibrium PQ (101st Eos Tower)
*/
var stg6_combo = Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
var minPlayers = 2;

function init() {
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup(leaderid) {
    em.setProperty("state", "1");

    var eim = em.newInstance("LudiPQ");
    eim.setProperty("stage2", "0");
	var mf = eim.getMapFactory();
	var map0 = mf.getMap(922010100);
	var map1 = mf.getMap(922010200);
	var map1_1 = mf.getMap(922010201);
	var map2 = mf.getMap(922010300);
	var map3 = mf.getMap(922010400);
	var map3_1 = mf.getMap(922010401);
	var map3_2 = mf.getMap(922010402);
	var map3_3 = mf.getMap(922010403);
	var map3_4 = mf.getMap(922010404);
	var map3_5 = mf.getMap(922010405);
	var map4 = mf.getMap(922010500);
	var map4_1 = mf.getMap(922010501);
	var map4_2 = mf.getMap(922010502);
	var map4_3 = mf.getMap(922010503);
	var map4_4 = mf.getMap(922010504);
	var map4_5 = mf.getMap(922010505);
	var map4_6 = mf.getMap(922010506);
	var map5 = mf.getMap(922010600);
	var map6 = mf.getMap(922010700);
	var map7 = mf.getMap(922010800);
	var map8 = mf.getMap(922010900);
	var map9 = mf.getMap(922011000);
	var map10 = mf.getMap(922011100);
	var stage1Portal = eim.getMapInstance(922010100).getPortal("next00");
	stage1Portal.setScriptName("lpq1");
	var stage2Portal = eim.getMapInstance(922010200).getPortal("next00");
	stage2Portal.setScriptName("lpq2");
	var stage2PortalA = eim.getMapInstance(922010201).getPortal("out00");
	stage2PortalA.setScriptName("lpq2A");
	var stage3Portal = eim.getMapInstance(922010300).getPortal("next00");
	stage3Portal.setScriptName("lpq3");
	var stage4Portal = eim.getMapInstance(922010400).getPortal("next00");
	stage4Portal.setScriptName("lpq4");
	var stage5Portal = eim.getMapInstance(922010500).getPortal("next00");
	stage5Portal.setScriptName("lpq5");
	var stage6Portal = eim.getMapInstance(922010600).getPortal("next00");
	stage6Portal.setScriptName("lpq6");
	var stage7Portal = eim.getMapInstance(922010700).getPortal("next00");
	stage7Portal.setScriptName("lpq7");
	var stage8Portal = eim.getMapInstance(922010800).getPortal("next00");
	stage8Portal.setScriptName("lpq8");
	var stage4PortalA = eim.getMapInstance(922010401).getPortal("out00");
	stage4PortalA.setScriptName("lpq4A");
	var stage4PortalB = eim.getMapInstance(922010402).getPortal("out00");
	stage4PortalB.setScriptName("lpq4B");
	var stage4PortalC = eim.getMapInstance(922010403).getPortal("out00");
	stage4PortalC.setScriptName("lpq4C");
	var stage4PortalD = eim.getMapInstance(922010404).getPortal("out00");
	stage4PortalD.setScriptName("lpq4D");
	var stage4PortalE = eim.getMapInstance(922010405).getPortal("out00");
	stage4PortalE.setScriptName("lpq4E");
	var stage5Portal1A = eim.getMapInstance(922010500).getPortal("in01");
	stage5Portal1A.setScriptName("lpq5_1_A");

    eim.startEventTimer(3600000); //20 mins

    return eim;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("state", "0");
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
    case 922010100:
        // Stage 1
    case 922010200:
        // Stage 2
    case 922010201:
        // Stage 2 - Tower's Trap'
    case 922010300:
        // Stage 3
    case 922010400:
        //stage 4
    case 922010401:
        //darkness in stage 4
    case 922010402:
        //darkness in stage 4
    case 922010403:
        //darkness in stage 4
    case 922010404:
        //darkness in stage 4
    case 922010405:
        //darkness in stage 4
    case 922010500:
        //stage 5
    case 922010501:
        //tower's maze in stage 5
    case 922010502:
        //tower's maze in stage 5
    case 922010503:
        //tower's maze in stage 5
    case 922010504:
        //tower's maze in stage 5
    case 922010505:
        //tower's maze in stage 5
    case 922010506:
        //tower's maze in stage 5
    case 922010600:
    case 922010700:
        //stage 7
    case 922010800:
    case 922010900:
        //crack on the wall
    case 922011000:
        //bonus
        return;
    }
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
    }
}

function playerEntry(eim, player) {
    var map = em.getMapFactory().getMap(922010100);
    player.changeMap(map, map.getPortal(0));
    player.tryPartyQuest(1202);
}

function playerRevive(eim, player) {}

function playerDisconnected(eim, player) {
    return - 3;
}

function leftParty(eim, player) {
    // If only 2 players are left, uncompletable
    if (eim.disposeIfPlayerBelow(minPlayers, 922010000)) {
        em.setProperty("state", "0");
    } else {
        playerExit(eim, player);
    }
}

function disbandParty(eim) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("state", "0");
}

function playerExit(eim, player) {
    var map = em.getMapFactory().getMap(922010000);

    eim.unregisterPlayer(player);
    player.changeMap(map, map.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
}

function clearPQ(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("state", "0");
}

function finish(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("state", "0");
}

function timeOut(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("state", "0");
}

function cancelSchedule() {}
function playerDead() {}
function allMonstersDead(eim) {}