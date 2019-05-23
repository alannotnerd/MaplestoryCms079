/* RED 1st impact
    Monster Park Shuttle
    Made by Daenerys
*/

var status = 0;
var m;

function start() {
    if (cm.getMapId() == 951000000) {
        cm.sendYesNo("你好。怪物公园客车竭诚为大家提供最好的服务。你想回到原来的村里去吗？");
        m = 1;
        return;
    }
    cm.sendYesNo("亲爱的顾客，你想到充满了欢乐的休彼德蔓的怪物公园去吗？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (m == 1) {
            cm.warp(cm.getSavedLocation("MULUNG_TC"));
			cm.clearSavedLocation("MULUNG_TC");
        } else {
            cm.saveReturnLocation("MULUNG_TC");
            cm.warp(951000000);
        }
    }
    cm.dispose();
}