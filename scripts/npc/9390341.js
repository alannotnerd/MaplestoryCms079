var status = 0;
var aa = "#fEffect/CharacterEff/1082229/0/0#"; //爱心粉1
var at = "#fEffect/EventEffect/doraji/0/2#"; //蓝箱子
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
		var selStr = "在线时间：#b" + cm.getPlayer().getTodayOnlineTime() + "分钟     赞助金额：#r" + cm.getTotalRMB() + "#k元"+"\t"+"活力值#r："+cm.getPlayer().getPlayerEnergy()+"#k点\r\n";
		selStr += "目前点卷：#r" + cm.getPlayer().getCSPoints(1) + "\t"+"#k抵用券：#r" + cm.getPlayer().getCSPoints(2)+"\t"+"余额：#r"+cm.getPlayer().getHyPay(1)+"币\r\n";
		selStr += "   #L0#"+aa+"#b返回市场#l  #L1#"+aa+"#r副本中心#l  #L2#"+aa+"#r活力兑换#l\r\n";
		selStr += "   #L3#"+aa+"#b万能传送#l  #L4#"+aa+"#b每日任务#l  #L5#"+aa+"#b每日签到#l\r\n";
		selStr += "   #L6#"+aa+"#b副本重置#l  #L7#"+aa+"#b所有商店#l  #L8#"+aa+"#b物品删除#l\r\n";
		selStr += "   #L9#"+aa+"#r新手必点#l  #L10#"+aa+"#b学习技能#l  #L11#"+aa+"#b雇佣管理#l\r\n";
		selStr += "   #L12#"+aa+"#b快速转职#l  #L13#"+aa+"#b购买血量#l  #L14#"+aa+"#b军部系统#l\r\n\r\n";
		selStr += "   #L15#"+aa+"#r赞助奖励"+aa+"#L16#"+aa+"#r冒险指南"+aa+"#L17#"+aa+"#r进入商城"+aa+"#l\r\n\r\n";
		selStr += "         #r祝 大 家 游 戏 愉 快 ，感 谢 支 持 ！";
		cm.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
		case 0:
		   cm.dispose();
		   cm.openNpc(9900003,99);
		   break;
		case 1:
		   cm.dispose();
		   cm.openNpc(9900004, 17);
		   break;
		case 2:
		   cm.dispose();
		   cm.openNpc(9310362, 14);
		   break;
		//case 3:
		   //cm.dispose();
		   //cm.openNpc(1032005, 1);
		   //break;
		case 3:
		   cm.dispose();
		   cm.openNpc(9900003, 2);
		   break;
		case 4:
		   cm.dispose();
		   cm.openNpc(9900003, 12);
		   break;
		case 5:
		   cm.dispose();
		   cm.openNpc(9900003, 7);
		   break;
		case 6:
		   cm.dispose();
		   cm.openNpc(9900004, 3);
		   break;   
		case 7:
		   cm.dispose();
		   cm.openNpc(2450038);
		   break;
		case 8:
		   cm.dispose();
		   cm.openNpc(9000132, 1);
		   break;
		case 9:
		   cm.dispose();
		   cm.openNpc(9010057, 2016);
		   break;   
		case 10:
		   cm.dispose();
		   cm.openNpc(9900003, 22);
		   break;
		case 11:
		   cm.dispose();
		   cm.openNpc(9030000);
		   break;
		case 12:
		   cm.dispose();
		   cm.openNpc(9900003,4);
		   break;
		case 13:
		   cm.dispose();
		   cm.openNpc(9900003,1010);
		   break;
		case 14:
		   cm.dispose();
		   cm.openNpc(9310087, 1);
		   break;
		case 15:
		   cm.dispose();
		   cm.openNpc(9900004,22);
		   break;   
		case 16:
		   cm.dispose();
		   cm.openNpc(1002010, 1);
		   break;
		case 17:
		   cm.dispose();
		   cm.EnterCS();
		   break;   
		}
	}
}