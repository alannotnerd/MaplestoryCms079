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
		qm.sendNext("现在试着实地使用技能攻击怪物吧。将技能登录到快捷栏的话，使用起来会更方便。将要使用的技能以滑鼠拖曳到快捷栏上就可以了。");
	} else if (status == 1) {	
        qm.forceStartQuest();	
        qm.completeQuest();
        qm.warp(130030106);		
		qm.dispose();
	}
}
function end(mode, type, selection) {
	qm.dispose();
}