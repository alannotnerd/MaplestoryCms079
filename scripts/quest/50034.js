/*
	任务: 毁灭的摇篮曲
	描述: 异次元的另一面出现的女人，#p9120046#，我必须确认她的身分。
*/
var status = -1;

function start(mode, type, selection) {
    cm.sendNext("You must escape!");
    cm.forceStartQuest();
    cm.dispose();
}

function end(mode, type, selection) {
}