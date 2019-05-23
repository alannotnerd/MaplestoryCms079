/* NANA
结婚欢迎人员
*/
var status = 0;
var menu = "婚礼举行得怎么样了\r\n#b#L0#我要离开这里"
var men =1;

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
                                           if (cm.getPlayer().getMap().getId() == 680000210) {                                   
			cm.sendSimple(menu);
                                           }else{
                                           cm.sendOk("甜蜜的恋人我见得很多，你是不是就是其中那位呢？")
}
		} else if (status == 1) {
			cm.warp(680000500)
}
}
}