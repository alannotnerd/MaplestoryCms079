/* 
CherryMS LoveMXD
非同意内禁止转载
CherryMS.cn
脚本类型：奇袭者第三转
*/
var status = 0;

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
			cm.sendNext("如果有什么事可以再来找我。");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple("。。"+cm.getPlayer().getName()+" ？说真的，我很难相信你会长得这么快。。。#b\r\n#L0#哈哈！因为我有努力修炼。")
                                          } else if (status == 1) {//选项部分
                                	if (selection == 0){
			cm.sendSimple("嗯。好吧，找我有什么事情呢？#b\r\n#L0#听说修炼到70级的时候可以进阶。。")			
		}
}else if (status == 2){
if (selection == 0){
cm.sendSimple("哈哈。你怎么知道70级的时候可以进阶的？好吧，我不糊弄你了，你想进阶成高级骑士吗？#b\r\n#L0#我想进行第三次转职。\r\n#L1#我要再想一下。")
}
}else if (status == 3){
if(selection == 0){
cm.sendNext("嗯，好吧！我给予你第三次转职！希望你能在以后的路勇敢坚强的走下去 ！！")
}else if (selection == 1){
cm.sendNext("好吧，这是一个很重要的决定。。。")
cm.dispose();
}


}else if (status == 4){
cm.changeJob(1511)
cm.sendNext("好！"+cm.getPlayer().getName()+"，你已经成为了高级骑士！希望你能继续保护冒险岛世界！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142067# 骑士团高级勋章 一枚 ！")
cm.gainItem(1142067,1)
}

	}
}
