/* Cygnus revamp
	Noblesse tutorial
	Kia
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
		qm.sendNext("#b(扑通扑通…)#k");
	} else if (status == 1) {
	    qm.sendNextPrev("…啊！吓我一跳！精神不好，谁来了也不知道。你就是#p1102006#说的那个贵族吗？很高兴见到你！我是#p1102007#。那麽要进行考验了吗？这不会很难的。只要记得到目前为止所学过的东西就没问题了。");	
	} else if (status == 2) {
	    qm.sendNextPrev("考试很简单。看到那?的箱子了吗？破坏箱子的话怪物就会跑出来，击败怪物的话就可以得到考试的证书了。");
	} else if (status == 3) {
	    qm.sendNextPrev("嗯？破坏箱子的方法是？啊，用一般攻击就可以破坏箱子了。..#b以一般攻击#k破坏箱子， #b对付怪物则是用技能攻击#k比较好的样子？那麽就蒐集5个试炼的印记吧。");	
	} else if (status == 4) {	
        qm.forceStartQuest();
		qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/9");		
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
	    qm.sendNext("你拿了3个试炼的印记来吗");
	} else if (status == 1) {
	    qm.sendNextPrev("呵呵?我听说了。考试合格了。我现在要给你的东西，是我亲手打造的椅子。好好使用吧。疲劳的时候坐着休息是最好的了。HP会快速恢复。放在道具栏的装饰栏里，去确认一下吧。");
	} else if (status == 2) {
      qm.gainItem(3010060,1);
	  qm.removeAll(4033670);
	  qm.completeQuest();
	  qm.dispose();		
	}
  }
}