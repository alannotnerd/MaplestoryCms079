/* 
CherryMS LoveMXD
非同意内禁止转载
CherryMS.cn
脚本类型：任务用—— 骑士团长
*/
var status = 0;
var main = "欢迎来到圣地。。"

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0) {
			cm.sendNext("最近过得怎么样了，还好吗？");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple("可以开始的任务 :#b\r\n#L0#"+cm.MissionGetStrData(1003,1)+"")
                                          } else if (status == 1) {//选项部分
			if (selection == 0){//任务开始
                                          cm.sendSimple("我们好久不见了呢。。怎么样？骑士团的生活很好吧。其实有件事要告诉你。。 #b\r\n#L0#什么事？")
}





		}else if (status == 2){//什么事？
if(selection == 0){
cm.sendSimple("其实在你的成长中，我一直在注视着你，你顽强拼博，确实真正的做到了一个勇猛的骑士！ #b\r\n#L0#其实这没什么，骑士就应该是这样的啊。")
}
}else if (status == 3){
if(selection == 0){//其实这没什么，骑士就应该是这样的啊。
cm.sendSimple("好吧，你的每一天我都看在眼里，我决定赋予你更高的称号！ #b\r\n#L0#嗯。。什么称号呢？")
}
}else if (status == 4){//嗯。。什么称号呢？
if(selection == 0) {
cm.sendSimple("你的新称号是#b骑士团长#k ！你想接受这个称号吗！ #b\r\n#L0#我想！")
}
}else if (status == 5){//我想！
if (selection == 0){
cm.sendNextPrev("好！现在，你就是骑士团长了！以后，你就培养更多的新入的团员吧！")
} 
}else if (status == 6){
cm.changeJob(1512)
cm.sendNext("我决定给你另外一枚勋章！\r\n\r\n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142069# 骑士团团长勋章 一枚 ！")
cm.gainItem(1142069,1)
}


	}
}
