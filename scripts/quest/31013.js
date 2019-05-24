/*
	任务: 消灭薛西斯
	描述: 所有的准备差不多都完成了。去和米卡埃尔谈谈吧。
	获得: 经验值48,000
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}
function end(mode, type, selection) {
    qm.sendNext("Thank you so much.");
    qm.forceCompleteQuest();
    qm.dispose();
}