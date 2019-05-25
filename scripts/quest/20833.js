/* Cygnus revamp
	Noblesse tutorial
	Tiny Bird
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        qm.sendNext("(哔哩哩哩…哔哔…)");
    } else if (status == 1) {
        qm.sendNextPrev("嗯？这鸟是从哪里忽然跑出来的？");
    } else if (status == 2) {
        qm.sendNext("(哔哩哩。哔哔， 哔哩哩哩…)");
    } else if (status == 3) {
        qm.sendNextPrev("难道我有听得懂小鸟说话的能力吗？！好像在叫我跟着他走…等待真是无聊，在奇加回来前稍微跟去看看吧？");
    } else if (status == 4) {
        qm.forceStartQuest();
		qm.completeQuest();
        qm.removeNpc(130030105, 1102113);
        qm.warp(130030104);
		
        qm.dispose();
    } else {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}