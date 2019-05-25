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
		qm.sendNext("原来在这里阿。找了好久。叫你不要乱跑，这次新进训练生当中可真多会闹事的。那麽，我们回到练武场，我来教你技能攻击的方法吧。");
	} else if (status == 1) {	
        qm.forceStartQuest();   
        qm.warp(130030105);		
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
	    qm.sendNext("刚刚教你的东西应该没忘了吧？按压Ctr键是攻击怪物的一般攻击。好像是没有忘记的样子，那就继续教你下一个阶段吧。..准备好了吗？");
	} else if (status == 1) {
	    qm.sendNextPrev("这次是技能攻击。可以比一般攻击更强劲地打击敌人。按压快捷键K开启技能栏位看看。..你修练得更强的话，就可以使用更多种的技能了，所以认真修练是很重要的啊。");
	} else if (status == 2) {
	    qm.completeQuest();
	    qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/6");	
	    qm.dispose();		
	}
  }
}