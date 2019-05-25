var status = 0;
var aa = "#fEffect/CharacterEff/1082229/0/0#"; //爱心粉1
var at = "#fEffect/EventEffect/doraji/0/2#"; //蓝箱子
var mm = "#fEffect/CharacterEff/1051294/0/0#"; //爱心紫1
var au = "#fUI/TenthAnniversaryBoardGame.img/TenthboardGameUI/shining/0#"
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE); //获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE); //获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
var selStr;
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
		
		selStr = "#e#k├-----------------点装商城-----------------┤#l\r\n\r\n";
		selStr += "#L0#"+aa+" #n#d点装武器#l    #L1#"+aa+" #d点装披风#l    #L2#"+aa+" #d点装戒指#l\r\n";
		selStr += "#L3#"+aa+" #d点装帽子#l    #L4#"+aa+" #d点装衣服#l    #L5#"+aa+" #d点装裤子#l\r\n";
		selStr += "#L6#"+aa+" #d点装鞋子#l    #L7#"+aa+" #d点装手套#l    #L8#"+aa+" #d点装效果#l\r\n\r\n";
		selStr += "#L9#"+aa+" #b绝版骑宠 #v2432309##l      #L10#"+aa+" 情侣专卖 #v1051255##l\r\n";
		selStr += "#L11#"+aa+" #r绝版宠物 #v5000264##l      #L12#"+aa+" 漂浮帽子、戒指 #v1112947##l\r\n\r\n";
		selStr += mm+" #g本周时装推荐 #v1004790# #v1702692# #v1053051# #v1102910# #v1115112##l\r\n";
		
		cm.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
		case 0:
		   cm.dispose();
		   cm.openNpc(9310376, 1);
		   break;
		case 1:
		   cm.dispose();
		   cm.openNpc(9310376, 2);
		   break;
		 case 2:
		   cm.dispose();
		   cm.openNpc(9310376, 3);
		   break;
		case 3:
		   cm.dispose();
		   cm.openNpc(9310376, 4);
		   break;
		case 4:
		   cm.dispose();
		   cm.openNpc(9310376, 5);
		   break;
		case 5:
		   cm.dispose();
		   cm.openNpc(9310376, 6);
		   break;
		case 6:
		   cm.dispose();
		   cm.openNpc(9310376, 7);
		   break;
		case 7:
		   cm.dispose();
		   cm.openNpc(9310376, 8);
		   break;
		case 8:
		   cm.dispose();
		   cm.openNpc(9310376, 9);
		   break;
		case 9:
		   cm.dispose();
		   cm.openNpc(9310376, 0);
		   break;
		case 10:
		   cm.dispose();
		   cm.openNpc(9310376, 10);
		   break;
		case 11:
		   cm.dispose();
		   cm.openNpc(9310376, 11);
		   break;
		case 12:
		   cm.dispose();
		   cm.openNpc(9310376, 12);
		   break;   
		}
	}
}