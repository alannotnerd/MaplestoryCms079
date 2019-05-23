/* 
结婚
CherryMS LoveMXD
离开地图
*/
var status = 0;
var main = "结婚进行的怎么样？#b\r\n#L0#我想离开！";

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
                                          if (cm.getPlayer().getMap().getId() == 680000500) {//如果在离开地图
			cm.sendSimple(main);
                                          }else{
                                          cm.sendOk("系统错误，请到论坛和管理员联系。")
                                          }
                                          } else if (status == 1) {
			if (selection == 0) { // 我要离开！
				cm.sendNext("好好好。。。我这就送你离开。。。");
			} 
                	} else if (status == 2) {
			cm.warp(680000000)
cm.MissionDelete(cm.getPlayer().getId(),1024);//访客判断用任务
cm.MissionDelete(cm.getPlayer().getId(),1023);//判断女方进入休息场地用。
		} 
	}
}
