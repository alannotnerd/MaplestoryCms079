/* Cygnus revamp
	Noblesse tutorial
	Kimu
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	status++;
	if (status == 0) {
		qm.sendYesNo("看你在努力训练的样子,真令人开心. 因该很快修练为骑士吧. 不停训练因该很累吧? 这里喝点冰凉的饮料,休息一下吧. 来, 拿去吧.");
	} else if (status == 1) {
	    qm.forceStartQuest();
		qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/2");
		qm.gainItem(2001555, 1);
	    qm.dispose();
	}
  }

function end(mode, type, selection) {
	 qm.dispose();
	}