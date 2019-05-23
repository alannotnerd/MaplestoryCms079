/* 
CherryMS LoveMXD
非同意内禁止转载
CherryMS.cn
脚本类型：夜行者转职_分脚本第一部分——第一转转职
*/
var status = 0;
var job;
var name = "夜行者"
var name1 = "暗之骑士"
var main = "嗯。。看来你已经有能力成为我的部下了呢。。#b\r\n#L0#"+name+"有什么好处？\r\n#L1#我想转职成为"+name1+"！"
var level = 120;


importPackage(net.sf.cherry.client);

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
			cm.sendNext("如果你有什么事的话可以再来找我。");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
                                          cm.sendSimple(main)
                                          } else if (status == 1) {//选项部分
                                          if (selection == 0){
                                          cm.sendNext(""+name+"是女皇陛下最珍惜的部队，他是运用风的属性给敌人造成伤害。等级上限#b"+level+"#k级。\r\n例如技能#b吸血#k，能召唤出结下契约的蝙蝠，并把敌人的血恢复到自己身上。")
}else if (selection == 1){
status = 2;
cm.sendSimple("你确定好了吗？成为了#p1104103#"+name1+"的部下！？#b\r\n#L0#是的！我无怨无悔成为您的部下！\r\n#L1#不要！让我再想想。。")
}




			
		}else if (status == 2){
                                        cm.sendNextPrev("如果你想转职成#b"+name+"#k，重新和我对话吧。")
cm.dispose();
}else if (status == 3){
if (selection == 0){//是的！我无怨无悔成为你的部下！
status = 3;
cm.sendSimple("好！现在我就正式命你为 #b"+name1+" -- "+cm.getPlayer().getName()+" #k！#b\r\n#L0#接受骑士团初心者勋章！\r\n#L1#让我再准备一下。")
}else if (selection == 1){
cm.sendOk("看来你不是诚信来的。。好吧，你再想想吧。")
}
}else if (status == 4){
if (selection == 0){
cm.sendNext("好！"+cm.getPlayer().getName()+"部下。请接受我赋予给你的勋章！希望你能把自己的骑士之路走到最尽头！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i1142065# 骑士团初心者勋章 一枚 ！")
cm.gainItem(1142065,1)
cm.changeJob(1400)
}else if (selection == 1){
cm.sendNext("不要害怕！骑士要做到 信心、信念、勇气！")
cm.dispose();
}
}else if (status == 5){
cm.sendNext("的")
}

	}
}
