/* NANA
结婚欢迎人员
*/
var status = 0;
var menu = "请选择你们的结婚方式#b\r\n\r\n#L1#西式结婚";
var main = "你想要做什么:#b\r\n#L1#关于结婚详情(进入)";

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
			cm.sendSimple(main);
		} else if (status == 1) {
			if (selection == 0) { // 移动到结婚殿堂
				status = 3;
				cm.sendSimple(menu);
			} else if (selection == 1) { // 关于结婚详情
				cm.sendNext("在岛上一个人碌碌无为很寂寞吧。。不如找个心里的TA？等你找好了。可以来找我，我可以把你们送到结婚的地方。。。");
			}
		} else if (status == 2) { // 关于结婚详情
			cm.sendNextPrev("结婚形式分为两种，中式结婚手续费为1亿元，西式结婚为5亿元，我们只扣组队长的手续费。所以这是你们的一个大考验！你们能完成吗？");
		} else if (status == 3) { //关于结婚详情
			cm.sendNextPrev("我祝福岛上的所有岛民，祝福你们能找到自己相爱的另一半！目前结婚状态只接受异性结婚，同性结婚暂不开放。");
		} else if (status == 4) {
			cm.sendSimple(menu);
		} else if (status == 5) { //Menu
                        status == 4;
			if (selection == 0){//中式结婚
                                          cm.sendOk("对不起，中式结婚暂未开放");
                                          cm.dispose();
                                          }else if (selection == 1){
                                          cm.warp(680000000)
                                          
                                          }
		}
	}
}