/* Cygnus revamp
	Noblesse tutorial
	Cygnus
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
		qm.sendNext("你好。是为了成为骑士而来的那位啊");
	} else if (status == 1) {
	    qm.sendNextPrev("是，我叫做#h0#。是第一次来到这个庭园。看来耶雷弗有很多美丽的地方啊。");
	} else if (status == 2) {
      qm.sendNextPrev("耶雷弗可是个和平又美丽的地方呢。训练太困难了，你不用做吗？");
	} else if (status == 3) {
	    qm.sendNextPrev("是，虽然还有很多不足的地方，但是即使面临到怎样的困难，我也会坚定的！好！我会战胜这些，成为一个了不起的骑士的。所以，枫之谷的和平就由我来守护了。应该…");
	} else if (status == 4) {
        qm.sendNextPrev("(浅浅的微笑) 即使是再怎麽坚困的道路也是必然要走的道路啊。现在是大家要加把劲的时候了。");
	} else if (status == 5) {
	    qm.sendNextPrev("但是，是谁呢？照这个打扮看来应该不是皇家骑士团…");
	} else if (status == 6) {
        qm.sendNextPrev("是，我是…");
	} else if (status == 7) {	
        qm.forceStartQuest();    
		qm.dispose();
	}
}
function end(mode, type, selection) {
	qm.dispose();
}