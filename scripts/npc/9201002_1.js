/* NANA
结婚欢迎人员
*/
var status = 0;
var boymain = "你愿意保护她，爱护她不让他受到任何伤害吗？#b\r\n#L0#我愿意\r\n#L1#我不愿意"
var grilmain = "你愿意顺从他，不让他遇到任何烦恼的事情吗？#b\r\n#L2#我愿意\r\n#L1#我不愿意"
var guest = "见证一对甜蜜的恋人成为一对夫妇！你们是最好的证婚人！"
var grilmain1 = "你想做什么呢#b\r\n#L3#把此地图的所有人送到蛋糕地图。"

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
			cm.sendNext("嗯。。如果有什么事的话可以来找我。我在这里等你。");
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),1024,0,4)){//证婚人
cm.sendOk(guest)
}else if (cm.MissionStatus(cm.getPlayer().getId(),1030,0,0)) {//女生的订婚好了
cm.sendSimple(grilmain1);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1027,0,0)) {//男生的订婚好了
cm.sendOk("嗯。。请你的准老婆和我对话吧。。")
                                      }else if (cm.MissionStatus(cm.getPlayer().getId(),1028,0,4)) {//男生
                                       cm.sendSimple(boymain);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1029,0,4)) {//女生
cm.sendSimple(grilmain);
}else{
cm.sendOk("我不知道你们是怎么进来的，不过让这两位美满一辈子吧。")
}
} else if (status == 1) {
			if (selection == 0) { // 男生我愿意
				cm.sendOk("我就知道你会这样回答。好了，等待女方的信息吧。")
cm.MissionMake(cm.getPlayer().getId(),1027,0,0,0,0)
cm.MissionFinish(cm.getPlayer().getId(),1027);
cm.setMarriageData(cm.getPlayer(),3,1)
			} else if (selection == 1) { // 不愿意
		                           cm.sendOk("爱一个人就要全心全力的付出。。不愿意的话哪能谈好将来呢？")
cm.dispose();
                                          }else if (selection == 2){//女生我愿意
                                                        if (cm.getMarriageData(cm.getPlayer(),3) == 1){
                                                        cm.sendOk("我就知道你会怎么说。。好了，看来你们意见是一样的，那我也不用在说什么了，我祝福你们一生！")
                                                        cm.MissionMake(cm.getPlayer().getId(),1030,0,0,0,0)
cm.MissionFinish(cm.getPlayer().getId(),1030);
}else{
cm.sendOk("先让你准老公回答吧。。很兴奋吧。。这一天？")
}
}else if (selection == 3){
 cm.warp(680000300)
}
}
}
}