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
			cm.sendYesNo("恩······你是说······你想离开天空之城，前往别的地区？乘坐这艘船，可以前往#b圣地#k。那是个阳光洒满树叶、微风吹皱湖水的、美丽的、居住着神兽和女皇的地方。你要去圣地吗？\r\n\r\n移动时间大约是#b7分钟#k，费用是#b5000#k金币。");
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
			if(cm.getMeso()<1000){
				cm.sendOk("很抱歉，您的金币不足，我们不能送你过去哦。");
				cm.dispose();
			}
			for(var i=0;i< sky2shengdi.length; i++){
				if(cm.getPlayerCount(sky2shengdi[i])==0){
					cm.gainMeso(-5000);
					cm.warp(sky2shengdi[i], 0);
					cm.addMapTimer(420);
					cm.getMap(sky2shengdi[i]).addMapTimer(420, 130000210);
					cm.dispose();
					return;
				}
			}			
				cm.sendOk("很抱歉，船都被做满了-0-，请稍等再试或者换线试试。");
				cm.dispose();

		}
	}
}	
