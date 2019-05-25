/* Cygnus revamp
	Noblesse tutorial
	Kimu
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	status++;
	if (status == 0) {
	  qm.sendNext("#h0#,，为表达欢迎你来到耶雷弗之意，送上一个小礼物给你。套用装备的方法很简单。请按压#b#e快捷键I#k#n。就会开启您的道具栏视窗。稍等一下，你是个急性子呢？我的话说完以後你试试看吧。帽子还在我手里。透过快捷键 I开启道具栏视窗後，双击帽子，就可以套用该装备了。现在要试试看了吗？");
	} else if (status == 1) {
	  qm.forceStartQuest();
	  qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/5");
	  qm.gainItem(1003769, 1);
	  qm.dispose();
	} else if  (status == 2)  {
	  qm.dispose();
	}
}
function end(mode, type, selection) {
    if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
		qm.sendOk("I found Kinu in a pile of books. He'll tell you what you need to know, or possibly just put you to sleep. Or both.");
	    qm.dispose();
	} else if (status == 1) {
	    qm.dispose();
	}
  }
}