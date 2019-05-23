/* Cygnus revamp
	Noblesse tutorial
	Kizan
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	status++;
	if (status == 0) {
		qm.sendYesNo("我是要教你战斗的奇加。你说你叫做#h0#对吧？\r\n之後好好加油吧。要现在就开始吗？");
	} else if (status == 1) {
		qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/3");
		qm.spawnMonster(9300730,3);
		qm.forceStartQuest();
		qm.spawnNpcForPlayer(1102101, 90, 88);
	    qm.dispose();
	}
  }

function end(mode, type, selection) {
	 qm.dispose();
	}