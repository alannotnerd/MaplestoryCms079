/* 
乘务员

CherryMS LoveMXD

原创脚本。非同意禁止转载
*/
var status = 0;
var menu = "你好，我是天空之城的票务员,你想做什么呢？\r\n\r\n#b#L0#我想买张票"
var menu1 = "请问是到哪里的票呢？\r\n\r\n#b#L0#神木村"
var coat = 5000
var coat1 = 9000

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
                                          cm.sendSimple(menu)
                                          } else if (status == 1) {
			if (selection == 0) { // 
			cm.sendSimple(menu1)
}
                            } else if (status == 2) { 
			if(selection == 0){
                                          cm.sendNext("你想要一张神木村的票是吗?好的。请等等。。。")
}
		} else if (status == 3) { 
			if (cm.getMeso() < coat) {
                                          cm.sendOk("对不起，你的金币数量不够支付本次费用。")
}else{
cm.sendOk("好的，请收好您的票。往右走问#b#p2012006##k就可以到达您所要到的机场。")
cm.dispose();
cm.gainItem(4031330,1)
cm.gainMeso(-coat)
}
		} else if (status == 4) {
			cm.sendSimple(menu);
		} else if (status == 5) { //Menu
			if (selection == 0){//
			if (cm.getMeso() < coat) {
                                          cm.sendOk("哎呀呀。。你的金币好像不够呀。。")
cm.dispose();
                                          }else{
                                          cm.sendNext("好吧。我已经收下了"+coat+"金币。拿好你的票吧。")
                                          cm.dispose();
                                          cm.gainItem(4031036,1);
                                          cm.gainMeso(-5000);
cm.dispose();
}
}
		}
	}
}
