/* Dawnveil
    Getcha Powergacha
	Maple Administrator
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {   
		qm.forceStartQuest();
		qm.dispose();
	}
}

function end(mode, type, selection) {
	   qm.dispose();		
}