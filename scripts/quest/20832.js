/* Cygnus revamp
	Noblesse tutorial
	Kizan
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
	  qm.sendNext("看来好像已经熟悉了基本攻击，这次来告诉你比较进阶的攻击方式。");
	} else if (status == 1) {
      qm.sendNextPrev("#h0#，只是练习而已？继续认真做。奇慕，奇加暂时说个话…", 1,0,1102100);
	} else if (status == 2) {
      qm.sendNextPrev("#h0#，稍微休息一下吧。");	
	} else if (status == 3) {
	  qm.sendNextPrev("(嘀嘀咕咕)", 1,0,1102000);
	} else if (status == 4) {
      qm.sendNextPrev("!!!");	
    } else if (status == 5) {
	  qm.sendNextPrev("...", 1,0,1102004);
	} else if (status == 6) {
      qm.sendNextPrev("#h0#，在这里稍等一下。我马上就回来。不管怎样都不要独自行动");
	} else if (status == 7)  {
	  qm.spawnNpcForPlayer(1102113, -824, -88);
	  qm.forceStartQuest();
	  qm.completeQuest();
	  qm.dispose();
	}
}
function end(mode, type, selection) {
	qm.dispose();
}