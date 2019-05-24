

var minPlayers = 1;
var MobHp = 10000000;

function init() {
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("state", "1");
    var eim = em.newInstance("LudiPQ");

    //地图常规设置开始
    var map = eim.setInstanceMap(922010100);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq1");
    map = eim.setInstanceMap(922010200);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq2");
    eim.setInstanceMap(922010201).resetFully();
    map = eim.setInstanceMap(922010300);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq3");
    map = eim.setInstanceMap(922010400);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq4");
    eim.setInstanceMap(922010401).resetFully();
    eim.setInstanceMap(922010402).resetFully();
    eim.setInstanceMap(922010403).resetFully();
    eim.setInstanceMap(922010404).resetFully();
    eim.setInstanceMap(922010405).resetFully();
    map = eim.setInstanceMap(922010500);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq5");
    eim.setInstanceMap(922010501).resetFully();
    eim.setInstanceMap(922010502).resetFully();
    eim.setInstanceMap(922010503).resetFully();
    eim.setInstanceMap(922010504).resetFully();
    eim.setInstanceMap(922010505).resetFully();
    eim.setInstanceMap(922010506).resetFully();
    map = eim.setInstanceMap(922010700);
    map.resetFully();
    map.getPortal("next00").setScriptName("lpq7");
    map = eim.setInstanceMap(922010800);
    map.getPortal("next00").setScriptName("lpq8");
    eim.setInstanceMap(922010900).resetFully();
    eim.setInstanceMap(922011000).resetFully();
    eim.startEventTimer(60 * 1000 * 35);

    return eim;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, eim.getProperty("cleared") == null ? 922010000 : 922011100);
    em.setProperty("state", "0");
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 922010100: // 第一阶段
        case 922010400: // 第二阶段（新版）
        case 922010401: // 第二阶段（新版 黑暗的塔）
        case 922010402: // 第二阶段（新版 黑暗的塔）
        case 922010403: // 第二阶段（新版 黑暗的塔）
        case 922010404: // 第二阶段（新版 黑暗的塔）
        case 922010405: // 第二阶段（新版 黑暗的塔）
        case 922010300: // 第三阶段（新版）
        case 922010700: // 第四阶段（新版）
        case 922010800: // 第五阶段（新版）
        case 922010900: // BOSS关（新版）
        case 922011100: // 冒险的果实（新版）
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
    //player.openNpc(2040034);
    //召唤BOSS怪物设定
    var mapForMob = eim.getMapInstance(922010900);
    var mob = em.getMonster(9300012);
    var modified = em.newMonsterStats();
    modified.setOHp(MobHp);//Hp设定
    modified.setOMp(mob.getMobMaxMp());
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);

    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(994, 184));
}

function playerRevive(eim, player) {
}

function playerDisconnected(eim, player) {
    return -3;
}

function leftParty(eim, player) {
    // If only 2 players are left, uncompletable
    if (eim.disposeIfPlayerBelow(minPlayers, eim.getProperty("cleared") == null ? 922010000 : 

922011100)) {
        em.setProperty("state", "0");
    } else {
        playerExit(eim, player);
    }
}

function disbandParty(eim) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, eim.getProperty("cleared") == null ? 922010000 : 922011100);

    em.setProperty("state", "0");
}

function playerExit(eim, player) {
    var map = em.getMapFactory().getMap(eim.getProperty("cleared") == null ? 922010000 : 922011100);

    eim.unregisterPlayer(player);
    player.changeMap(map, map.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
}

function clearPQ(eim) {
    eim.disposeIfPlayerBelow(100, eim.getProperty("cleared") == null ? 922010000 : 922011100);

    em.setProperty("state", "0");
}

function finish(eim) {
    eim.disposeIfPlayerBelow(100, eim.getProperty("cleared") == null ? 922010000 : 922011100);

    em.setProperty("state", "0");
}

function timeOut(eim) {
    eim.disposeIfPlayerBelow(100, eim.getProperty("cleared") == null ? 922010000 : 922011100);

    em.setProperty("state", "0");
}

function cancelSchedule() {
}
function playerDead() {
}
function allMonstersDead(eim) {
}