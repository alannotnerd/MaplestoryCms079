var status = 0;
var text;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活动图标
var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

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
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		text = "#L0##b"+icon+"军衔系统#l      #L1##b"+icon+"伙伴养成#l      #L2##b"+icon+"宠物进化#l\r\n\r\n";
		text += "#L3##b"+icon+"装备合成#l      #L4##b"+icon+"装备制作#l      #L5##b"+icon+"装备回收#l\r\n\r\n";
		text += "#L6##b"+icon+"点卷洗血#l      #L7##b"+icon+"学习技能#l\r\n\r\n";
		text += "#L8#"+icon+"#d#e520个#v4000164#随机兑换永久稀有点装装备#l\r\n";
		text += "#v1102724##v1102766##v1102564##v1702433##v1702533##v170226##v1112955#"
		
        cm.sendSimple(text);
    } else if (status == 1) {
        switch (selection) {
        case 0://杂货商店
            cm.dispose();
            cm.openShop(1012123);
            break;
		
		}
    }
}