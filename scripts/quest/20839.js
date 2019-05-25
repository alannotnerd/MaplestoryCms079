/* Cygnus revamp
	Noblesse tutorial
	Kiku
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
		qm.sendNext("#h0#，在这期间果然很认真地进行修练啊。跟第一次见面的时候比起来，的确变强了很多~其他的评价似乎也很良好…现在已经有足够的资格可以成为修练骑士了吧？..女皇在耶雷弗的中心，往那边去就可以了。跟着箭头指标走吧。");
	} else if (status == 1) {
	    qm.sendNextPrev("那麽，希望你一定要成为帅气的骑士…");
	} else if (status == 2) {
        qm.forceStartQuest();	
                qm.levelUp();
                qm.levelUp();
                qm.levelUp(); 
                qm.levelUp();
                qm.levelUp();
                qm.levelUp();
                qm.levelUp();
                qm.levelUp();
                qm.levelUp();
		//qm.gainExp(3348);
		qm.dispose();
	}
}
function end(mode, type, selection) {
	qm.dispose();
}