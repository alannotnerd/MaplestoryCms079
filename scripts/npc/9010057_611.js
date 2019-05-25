var aaa ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed=0;
var rmb = 0;
var weaponId = null;
var weaponList = Array(
	1212063, // 法弗纳魔力源泉杖, // (无描述)
	1222058, // 法弗纳天使手铳, // (无描述)
	1232057, // 法弗纳死亡使者, // (无描述)
	1242060, // 法弗纳精神之刃, // 鲁塔比斯套装(飞侠)专用武器
	1242061, // 法弗纳精神之刃, // 鲁塔比斯套装(海盗)专用武器
	1302275, // 法弗纳银槲之剑, // (无描述)
	1312153, // 法弗纳双刃切肉斧, // (无描述)
	1412135, // 法弗纳战斗切肉斧, // (无描述)
	1322203, // 法弗纳戈耳迪锤, // (无描述)
	1332225, // 法弗纳大马士革剑, // (无描述)
	1342082, // 法弗纳急速之刃, // (无描述)
	1362090, // 法弗纳洞察手杖, // (无描述)
	1372177, // 法弗纳魔力夺取者, // (无描述)
	1382208, // 法弗纳魔冠之杖, // (无描述)
	1402196, // 法弗纳忏悔之剑, // (无描述)
	1422140, // 法弗纳闪电锤, // (无描述)
	1432167, // 法弗纳贯雷枪, // (无描述)
	1442223, // 法弗纳半月宽刃斧, // (无描述)
	1452205, // 法弗纳追风者, // (无描述)
	1462193, // 法弗纳风翼弩, // (无描述)
	1472214, // 法弗纳危险之手, // (无描述)
	1482168, // 法弗纳巨狼之爪, // (无描述)
	1492179, // 法弗纳左轮枪, // (无描述)
	1522094, // 法弗纳双风翼弩, // (无描述)
	1532098, // 法弗纳荣耀炮, // (无描述)
	1252015, // 法弗纳北极星魔法棒, // (无描述)
	1003797, // 高贵战士头盔, // (无描述)
	1003798, // 高贵流丹维奇帽, // (无描述)
	1003799, // 高贵游侠贝雷帽, // (无描述)
	1003800, // 高贵刺客软帽, // (无描述)
	1003801, // 高贵流浪者帽, // (无描述)
	1042254, // 鹰眼战士盔甲, // (无描述)
	1042255, // 鹰眼丹维奇长袍, // (无描述)
	1042256, // 鹰眼游侠斗篷, // (无描述)
	1042257, // 鹰眼刺客衬衣, // (无描述)
	1042258, // 鹰眼流浪者外衣, // (无描述)
	1062165, // 魔术师战士短裤, // (无描述)
	1062166, // 魔术师丹维奇短裤, // (无描述)
	1062167, // 魔术师游侠短裤, // (无描述)
	1062168, // 魔术师刺客短裤, // (无描述)
	1062169 // 魔术师流浪者短裤, // (无描述)
);
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
            var selStr = head + "#d我这里可以制作150级武器，请选择想要制作的装备：#n#k\r\n";    
			for(var key in weaponList) {
				var item = weaponList[key];
				selStr += "#r#L"+key+"#制作 #v"+item+"##b#z"+item+"# #r[查看详情]\r\n";
			}
        	cm.sendSimple(selStr);	
		} else if (status == 1) {
			weaponId = selection;
			cm.sendYesNo(head + "- #e#d#z"+weaponList[weaponId]+"#需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行制作。点否返回上一页.#k");
		} else if (status == 2) {
            if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
				cm.gainItem(weaponList[weaponId], 1);
				cm.gainItem(4310030, -5000);
				cm.gainItem(4033356, -50);
				cm.gainItem(4021012, -30);
				cm.gainItem(4021011, -30);
				cm.gainItem(4021010, -30);
				cm.gainItem(4000082, -400);
				cm.gainItem(4000124, -50);
				cm.gainItem(4310015, -3);
				cm.gainItem(4021019, -1);
				cm.sendOk(head + "恭喜您合成#z"+weaponList[weaponId]+"#一把.");
				cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<普通服务员>处制作了"+cm.getItemName(weaponList[weaponId])+".");
				cm.dispose();
			} else {
				cm.sendOk(head + "合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
				cm.dispose();
			}
		}
	}
}