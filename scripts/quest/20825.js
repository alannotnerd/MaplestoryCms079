/* Cygnus revamp
	Noblesse tutorial
	Kinu
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	status++;
	if (status == 0) {
	  qm.sendYesNo("我迟到了吧？你好。我是教导关於耶雷弗历史的奇努。怎麽傻傻站在这呢？这里有椅子，快坐吧。");
	} else if (status == 1) {
      qm.sendNext("走到椅子前，按压快捷键X，便可以坐下。");
	} else if (status == 2) {
	  qm.forceStartQuest();
	  qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/10");
	  qm.dispose();
	} else if (status == 3) {
	  qm.dispose();
	}
}
function end(mode, type, selection) {
	qm.dispose();
}