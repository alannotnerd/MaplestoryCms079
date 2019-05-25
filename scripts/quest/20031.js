/* global qm */
var status = -1;

function start(mode, type, selection) {
    qm.forceStartQuest();
    qm.dispose();
}


function end(mode, type, selection) {
	qm.completeQuest();
    qm.dispose();
    qm.warp(913070002, 0);
    }
}


