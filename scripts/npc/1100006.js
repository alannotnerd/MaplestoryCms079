//cherry_MS
importPackage(net.sf.cherry.client);

var status = 0;
var job;
var sky2shengdi=new Array(200090020, 200090022,200090024,200090026,200090028,200090040,200090042,200090044,200090046,200090048);
var shengdi2sky=new Array(200090021,200090023,200090025,200090027,200090029,200090041,200090043,200090045,200090047,200090049);

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
			for (var i = 0; i < sky2shengdi.length; i++){
				if(cm.getMapId()==sky2shengdi[i]){
					cm.warp(200000161, 0);
					cm.dispose();
					return;
				}
			}
			for (var i = 0; i < shengdi2sky.length; i++){
				if(cm.getMapId()==shengdi2sky[i]){
					cm.warp(130000210, 0);
					cm.dispose();
					return;
				}
			}
			cm.dispose();
		}
	}
}	
