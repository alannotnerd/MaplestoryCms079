//cherry_MS
importPackage(net.sf.cherry.client);

var status = 0;
var job;
var mofa2shengdi=new Array(200090030, 200090032,200090034,200090036,200090038,200090050,200090052,200090054,200090056,200090058);
var shengdi2mofa=new Array(200090031,200090033,200090035,200090037,200090039,200090051,200090053,200090055,200090057,200090059);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			status=2;
			cm.sendYesNo("你想要放弃飞行吗？\r\n放弃飞行将会回到出发地。");
		}
		else if (status == 1) {
			cm.sendOk("不想去的话就算了······");
			cm.dispose();
		}
		else if (status == 2) {
			cm.sendOk("谢谢");
			cm.dispose();
		}
		else if (status == 3) {
			for (var i = 0; i < mofa2shengdi.length; i++){
				if(cm.getMapId()==mofa2shengdi[i]){
					cm.warp(101000400, 0);
					cm.dispose();
					return;
				}
			}
			for (var i = 0; i < shengdi2mofa.length; i++){
				if(cm.getMapId()==shengdi2mofa[i]){
					cm.warp(130000210, 0);
					cm.dispose();
					return;
				}
			}
			cm.dispose();
		}
	}
}	
