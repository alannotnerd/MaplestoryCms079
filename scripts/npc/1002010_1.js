var aa = "#fEffect/CharacterEff/1082229/0/0#"; //爱心粉1
var hh = "#fEffect/CharacterEff/1112903/0/1#"; //爱心粉2
var kk = "#fEffect/CharacterEff/1112905/0/1#"; //爱心粉3
var ll = "#fEffect/CharacterEff/1112906/0/1#"; //爱心粉4
var uu = "#fEffect/CharacterEff/1051296/3/0#"; //星光粉5
var vv = "#fEffect/CharacterEff/1062114/0/0#"; //爱心粉6
var af = "#fEffect/CharacterEff/1003271/0/0#"; //爱心粉7
var bh = "#fEffect/CharacterEff/1102232/1/0#";//星星
var bg = "#fEffect/CharacterEff/1102232/0/0#";//星星
var status = 0

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (cm.getMapId() == 180000001) {
		cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.");
		cm.dispose();
	} else if (status == 0) {
	var selStr = aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+"#e冒险指南"+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+"\r\n";
	selStr += "#L0#"+aa+"#r在线奖励"+aa+"#L1#"+aa+"充值奖励"+aa+"#L2#"+aa+"等级奖励"+aa+"\r\n\r\n";
	selStr += "#L3#"+aa+"#b中介兑换"+aa+"#L4#"+aa+"特色钓鱼"+aa+"#L5#"+aa+"仓库管理"+aa+"\r\n";
	selStr += "#L6#"+aa+"宠物进化"+aa+"#L7#"+aa+"爆率查询"+aa+"#L8#"+aa+"理财服务"+aa+"\r\n";
	selStr += "#L9#"+aa+"万能商店"+aa+"#L10#"+aa+"装备制作"+aa+"#L11#"+aa+"武器破功"+aa+"\r\n";
	selStr += "#L12#"+aa+"升级神宠"+aa+"#L13#"+aa+"女生福利"+aa+"#L14#"+aa+"个人查询"+aa+"\r\n";
	selStr += "#L15#"+aa+"股票系统"+aa+"#L16#"+aa+"分解装备"+aa+"#L17#"+aa+"废弃奖励"+aa+"\r\n";
	selStr += aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+""+aa+"\r\n";
	selStr += "#L18#"+bg+"#r娱乐小游戏"+bg+"    #L19#"+bg+"材料点地图"+bg+"\r\n";
	selStr += "#L20#"+bg+" 星座老人 "+bg+"    #L21#"+bg+"开启怪怪卡"+bg+"\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
		case 0:
		   cm.dispose();
		   cm.openNpc(9900003,608);
		   break;
		case 1:
		   cm.dispose();
		   cm.openNpc(9900004,22);
		   break;
		case 2:
		   cm.dispose();
		   cm.openNpc(9300011);
		   break;
		case 3:
		   cm.dispose();
		   cm.openNpc(9310144,4);
		   break;
		case 4:
		   cm.dispose();
		   cm.openNpc(9330122);
		   break;
		case 5:
		   cm.dispose();
		   cm.openNpc(9030100);
		   break;
		case 6:
		   cm.dispose();
		   cm.openNpc(1032102);
		   break;
		case 7:
		   cm.dispose();
		   cm.openNpc(9900003,5);
		   break;
		case 8:
		   cm.dispose();
		   cm.openNpc(9310144,17);
		   break;
		case 9:
		   cm.dispose();
		   cm.openNpc(2450038);
		   break;
		case 10:
		   cm.dispose();
		   cm.openNpc(9900003,24);
		   break;
		case 11:
		   cm.dispose();
		   cm.openNpc(9310072,1);
		   break;
		case 14:
		   cm.dispose();
		   cm.openNpc(9310144,1);
		   break;
		case 15:
		   cm.dispose();
		   cm.openNpc(9900004,100);
		   break;
		case 16:
		   cm.dispose();
		   cm.openNpc(9900003,503);
		   break;
		case 17:
           cm.dispose();
           cm.openNpc(9900004,14);
		   break;
		case 18:
           cm.dispose();
           cm.openNpc(9310382);
		   break;   
		case 19:
           cm.dispose();
           cm.openNpc(1530270);
		   break;
		case 20:
           cm.dispose();
           cm.openNpc(9310058,1);
		   break;   
		}
	}
}