var status = 0;

var text;
var sel;
var time;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
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
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
	}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
		cm.sendSimple("#e#d您今天在#r[小情绪冒险岛]#d世界时长为： #r" + cm.getPlayer().getGamePoints() + "#k #d分钟#n#k\r\n#r#L0#"+icon+"新手成长系统简介\r\n\r\n#L1#"+icon+"[#r必须]#b新手出生礼包领取\r\n\r\n#L2##r"+icon+"领取30星徽章一枚#v1190400#   #L3##r"+icon+"领取召唤拍卖劵#v5030030#\r\n#L4#"+icon+"[#r必须]#b系统自动检测发放【成长装备】\r\n10级 30级 60级 100级 150级 可以点击我领取成长装备\r\n\r\n#l     #rPS:双刀必须先戴短刀在戴刀注意武器能力值哦");
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendOk(icon+"#n亲爱的#r#h ##k您好,我是新手成长系统简介:\r\n职业：所有\r\n等级：10 30 60 100 150\r\n推荐升级地图：系统引导地图练级\r\n引导使用 某道具：系统引导使用某道具\r\n赠送道具：当前职业对应等级防具武器\r\n\r\n"+icon+"该角色达到等级要求即可完成1次阶段功能.\r\n\r\n"+icon+"#r注：角色不能超过等级范围或必须与等级对应转职数.\r\n"+icon+"注：装备 消耗 设置 其他 特殊 背包栏 预留 5 格以上.\r\n"+icon+"注：若达到等级未达到转职数,无法领取武器（后果自负）.");
            cm.dispose();
		} else if (selection == 1) {
			cm.dispose();
			cm.openNpc(2008);
		} else if (selection == 2) {
			if (cm.haveItem(2430505) < 1 && cm.haveItem(1190400) < 1 ) {
				cm.gainItem(2430505,1);
				cm.sendOk("恭喜你领取30星徽章一枚");
				cm.dispose();
			} else {
				cm.sendOk("对不起你已经领取过该礼包 无法重复领取");
				cm.dispose();
			}
		} else if (selection == 3) {
			if (cm.haveItem(5030030) < 1) {
				cm.gainItem(5030030,1);
				cm.sendOk("恭喜你领取马厩雇佣商人 1天权");
				cm.dispose();
			} else {
				cm.sendOk("对不起你已经领取过该道具 无法重复领取");
				cm.dispose();
			}
		} else if (selection == 4) {
			if((cm.getPlayer().getLevel() > 9 && cm.getPlayer().getLevel() < 30) && cm.getBossLog("引导10",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 100 || cm.getJob() == 1100){ //-- 战士
				cm.gainItem(1302001,1); // 锯
				}else if(cm.getJob() == 200|| cm.getJob() == 1200){ //-- 法师
				cm.gainItem(1372043,1); // 初级魔法师的杖
				}else if(cm.getJob() == 300 || cm.getJob() == 1300){ //-- 弓手
				cm.gainItem(1452002,1); // 长弓
				}else if(cm.getJob() == 400 || cm.getJob() == 1400){ //-- 飞侠
				cm.gainItem(1332063,1); // 初级盗贼的短剑
				cm.gainItem(1472104,1); // 挑战之拳套
				}else if(cm.getJob() == 500 || cm.getJob() == 1500){ //-- 海盗
				cm.gainItem(1482000,1); // 指套
				cm.gainItem(1492066,1); // 挑战之短枪
				}else if(cm.getJob() == 2100){ //-- 战神
				cm.gainItem(1442013,1); // 沧海雪板
				}else if(cm.getJob() == 3300){ //-- 豹弩游侠
				cm.gainItem(1462084,1); // 挑战之弩
				}else if(cm.getJob() == 3500){ //-- 机械师
				cm.gainItem(1492066,1); // 挑战之短枪
				}else if(cm.getJob() == 3200){ //-- 唤灵斗师
				cm.gainItem(1372043,1); // 初级魔法师的杖
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龙神
				cm.gainItem(1372043,1); // 初级魔法师的杖
				}else if(cm.getJob() == 2300){ //-- 双弩精灵
				cm.gainItem(1522000,1); // 基础双弩枪
				cm.gainItem(1352000,1); // 基础双弩枪
				}else if(cm.getJob() == 501){ //-- 火炮手
				cm.gainItem(1532000,1); // 新手大炮
				}else if(cm.getJob() == 3100){ //-- 恶魔猎手
				cm.gainItem(1322006,1); // 钢管
				}else if(cm.getJob() == 3600){ //-- 尖兵
				cm.gainItem(1242001,1); // 不谐之角
				}else if(cm.getJob() == 2700){ //-- 夜光法师
				cm.gainItem(1212000,1); // 朴素双头杖
				cm.gainItem(1352400,1); // 闪电宝珠
				}else if(cm.getJob() == 3101){ //-- 恶魔复仇者
				cm.gainItem(1232001,1); // 蓝色复仇者
				}else if(cm.getJob() == 6100){ //-- 狂龙战士
				cm.gainItem(1402078,1); // 挑战之双手剑
				}else if(cm.getJob() == 5100){ //-- 米哈尔
				cm.gainItem(1302001,1); // 锯
				}else if(cm.getJob() == 508){ //-- 龙的传人
				cm.gainItem(1492066,1); // 挑战之短枪
				}else if(cm.getJob() == 2400){ //-- 幻影
				cm.gainItem(1362001,1); // 新手手杖
				}
				cm.setBossLog("引导10",1);
				cm.gainItem(1142609,1,30);
				cm.gainItem(3700012,1,30);
           			cm.worldSpouseMessage(0x20,"[新手系统] 玩家 "+ cm.getChar().getName() +" 完成了" + cm.getServerName() + "新手成长系统阶段1功能 系统给予大量奖励。");
				cm.sendOk("完成了" + cm.getServerName() + "新手成长系统阶段功能 系统给予大量奖励。");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() > 29 && cm.getPlayer().getLevel() < 60)  && cm.getBossLog("引导30",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 100 || cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 1110){ //-- 战士
				cm.gainItem(1302003,1); // 太阳剑
				cm.gainItem(1432002,1); // 三支枪
				}else if(cm.getJob() == 200 || cm.getJob() == 210 || cm.getJob() == 220 || cm.getJob() == 230 || cm.getJob() == 1210){ //-- 法师
				cm.gainItem(1372018,1); // 法师短杖
				}else if(cm.getJob() == 300 || cm.getJob() == 310 || cm.getJob() == 320 || cm.getJob() == 1310){ //-- 弓手
				cm.gainItem(1452096,1); // 挑战之弓
				cm.gainItem(1462081,1); // 挑战之弩
				}else if(cm.getJob() == 400 || cm.getJob() == 410 || cm.getJob() == 420 || cm.getJob() == 1410){ //-- 飞侠
				cm.gainItem(1472107,1); // 挑战之拳套
				cm.gainItem(1332043,1); // 水晶刃
				}else if(cm.getJob() == 500 || cm.getJob() == 510 || cm.getJob() == 520 || cm.getJob() == 1510){ //-- 海盗
				cm.gainItem(1492069,1); // 挑战之短枪
				cm.gainItem(1482069,1); // 挑战之指节
				}else if(cm.getJob() == 2100 || cm.getJob() == 2110){ //-- 战神
				cm.gainItem(1442011,1); // 冲浪板
				}else if(cm.getJob() == 3300 || cm.getJob() == 3310){ //-- 豹弩游侠
				cm.gainItem(1462081,1); // 挑战之弩
				}else if(cm.getJob() == 3500 || cm.getJob() == 3510){ //-- 机械师
				cm.gainItem(1492069,1); // 挑战之短枪
				}else if(cm.getJob() == 3200 || cm.getJob() == 3210){ //-- 唤灵斗师
				cm.gainItem(1372018,1); // 法师短杖
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龙神
				cm.gainItem(1372018,1); // 法师短杖
				}else if(cm.getJob() == 2300 || cm.getJob() == 2310){ //-- 双弩精灵
				cm.gainItem(1522004,1); // 双翼弩枪
				cm.gainItem(1352001,1); // 锐利魔法箭矢
				}else if(cm.getJob() == 530){ //-- 火炮手
				cm.gainItem(1532004,1); // 阿特莱利
				}else if(cm.getJob() == 2400 || cm.getJob() == 3110){ //-- 恶魔猎手
				cm.gainItem(1322003,1); // 棒棒果
				}else if(cm.getJob() == 3600 || cm.getJob() == 3610){ //-- 尖兵
				cm.gainItem(1242002,1); // 山脊切割者
				}else if(cm.getJob() == 2700 || cm.getJob() == 2710){ //-- 夜光法师
				cm.gainItem(1212020,1); // 企鹅国王金光双头杖
				cm.gainItem(1352401,1); // 耀眼宝珠
				}else if(cm.getJob() == 3100 || cm.getJob() == 3120){ //-- 恶魔复仇者
				cm.gainItem(1232002,1); // 模糊传奇
				}else if(cm.getJob() == 6100 || cm.getJob() == 6110){ //-- 狂龙战士
				cm.gainItem(1402081,1); // 挑战之双手剑
				}else if(cm.getJob() == 5100 || cm.getJob() == 5110){ //-- 米哈尔
				cm.gainItem(1302003,1); // 太阳剑
				}else if(cm.getJob() == 570){ //-- 龙的传人
				cm.gainItem(1492069,1); // 挑战之短枪
				}else if(cm.getJob() == 2400 || cm.getJob() == 2410){ //-- 幻影
				cm.gainItem(1362005,1); // 血路手杖
				}
				cm.setBossLog("引导30",1);
				cm.gainItem(2022956,10); // 火红玫瑰
				cm.gainItem(2001505,100); // 超级药水
           			cm.worldSpouseMessage(0x20,"[新手系统] 玩家 "+ cm.getChar().getName() +" 完成了" + cm.getServerName() + "新手成长系统阶段2功能 系统给予大量奖励。");
				cm.sendOk("完成了" + cm.getServerName() + "新手成长系统阶段功能 系统给予大量奖励。");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() >= 60 && cm.getPlayer().getLevel() < 100)  && cm.getBossLog("引导60",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 111 || cm.getJob() == 121 || cm.getJob() == 131 || cm.getJob() == 1111){ //-- 战士
				cm.gainItem(1432006,1); // 十字枪
				cm.gainItem(1302041,1); // 奇型刀
				}else if(cm.getJob() == 211 || cm.getJob() == 221 || cm.getJob() == 231 || cm.getJob() == 1211){ //-- 法师
				cm.gainItem(1372021,1); // 天使之翼
				}else if(cm.getJob() == 311 || cm.getJob() == 321 || cm.getJob() == 1311){ //-- 弓手
				cm.gainItem(1462084,1); // 挑战之弩
				cm.gainItem(1452099,1); // 挑战之弓
				}else if(cm.getJob() == 411 || cm.getJob() == 421 || cm.getJob() == 1411){ //-- 飞侠
				cm.gainItem(1332046,1); // 凤凰刃
				cm.gainItem(1472110,1); // 挑战之拳套
				}else if(cm.getJob() == 511 || cm.getJob() == 521 || cm.getJob() == 1511){ //-- 海盗
				cm.gainItem(1482072,1); // 挑战之指节
				cm.gainItem(1492072,1); // 挑战之短枪
				}else if(cm.getJob() == 2111){ //-- 战神
				cm.gainItem(1442033,1); // 黄龙刀
				}else if(cm.getJob() == 3311){ //-- 豹弩游侠
				cm.gainItem(1462084,1); // 挑战之弩
				}else if(cm.getJob() == 3511){ //-- 机械师
				cm.gainItem(1492072,1); // 挑战之指枪
				}else if(cm.getJob() == 3211){ //-- 唤灵斗师
				cm.gainItem(1372021,1); // 天使之翼
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龙神
				cm.gainItem(1372021,1); // 天使之翼
				}else if(cm.getJob() == 2311){ //-- 双弩精灵
				cm.gainItem(1522008,1); // 月华荣耀
				cm.gainItem(1352002,1); // 永恒魔法箭矢
				}else if(cm.getJob() == 531){ //-- 火炮手
				cm.gainItem(1532008,1); // 火焰喷射器
				}else if(cm.getJob() == 4111){ //-- 恶魔猎手
				cm.gainItem(1322018,1); // 巨型锤
				}else if(cm.getJob() == 3611){ //-- 尖兵
				cm.gainItem(1242004,1); // 马鲛小刀
				}else if(cm.getJob() == 2711){ //-- 夜光法师
				cm.gainItem(1212047,1); // 志愿者双头杖
				cm.gainItem(1352402,1); // 闪耀宝珠
				}else if(cm.getJob() == 3121){ //-- 恶魔复仇者
				cm.gainItem(1232004,1); // 紫色悲伤
				}else if(cm.getJob() == 6111){ //-- 狂龙战士
				cm.gainItem(1402084,1); // 挑战之双手剑
				}else if(cm.getJob() == 5111){ //-- 米哈尔
				cm.gainItem(1302041,1); // 奇型刀
				}else if(cm.getJob() == 571){ //-- 龙的传人
				cm.gainItem(1492072,1); // 挑战之短枪
				}else if(cm.getJob() == 2411){ //-- 幻影
				cm.gainItem(1362010,1); // 血蛤手杖
				}
				cm.setBossLog("引导60",1);
				cm.gainItem(5150040,10);
				cm.gainItem(5152053,10);
				cm.gainItem(1003084,1,30);
				cm.gainItem(1052412,1,30);
				cm.gainItem(2022956,10); // 火红玫瑰
				cm.gainItem(2001505,100); // 超级药水
           			cm.worldSpouseMessage(0x20,"[新手系统] 玩家 "+ cm.getChar().getName() +" 完成了" + cm.getServerName() + "新手成长系统阶段3功能 系统给予大量奖励。");
				cm.sendOk("完成了" + cm.getServerName() + "新手成长系统阶段功能 系统给予大量奖励。");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() > 99 && cm.getPlayer().getLevel() < 150)  && cm.getBossLog("引导100",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- 战士
				cm.gainItem(1302078,1); // 挑战之单手剑
				cm.gainItem(1432030,1); // 红莲落神枪
				}else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- 法师
				cm.gainItem(1372072,1); // 挑战之金属短杖
				}else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- 弓手
				cm.gainItem(1462086,1); // 挑战之弩
				cm.gainItem(1452101,1); // 挑战之弓
				}else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- 飞侠
				cm.gainItem(1472112,1); // 挑战之拳套
				cm.gainItem(1332052,1); // 阴风碎魂刃
				}else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- 海盗
				cm.gainItem(1492074,1); // 挑战之短枪
				cm.gainItem(1482074,1); // 挑战之指节
				}else if(cm.getJob() == 2112){ //-- 战神
				cm.gainItem(1442044,1); // 战魂斗杀戟
				}else if(cm.getJob() == 3312){ //-- 豹弩游侠
				cm.gainItem(1462086,1); // 挑战之弩
				}else if(cm.getJob() == 3512){ //-- 机械师
				cm.gainItem(1492074,1); // 挑战之短枪
				}else if(cm.getJob() == 3212){ //-- 唤灵斗师
				cm.gainItem(1372072,1); // 挑战之金属短杖
				}else if(cm.getJob() == 2200){ //-- 龙神
				cm.gainItem(1372072,1); // 挑战之金属短杖
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龙神
				cm.gainItem(1372072,1); // 挑战之金属短杖
				}else if(cm.getJob() == 2312){ //-- 双弩精灵
				cm.gainItem(1522012,1); // 飞燕弩枪
				cm.gainItem(1352003,1); // 无限魔法箭矢
				}else if(cm.getJob() == 532){ //-- 火炮手
				cm.gainItem(1532012,1); // 克吕索斯
				}else if(cm.getJob() == 4112){ //-- 恶魔猎手
				cm.gainItem(1322085,1); // 挑战之单手钝器
				}else if(cm.getJob() == 3612){ //-- 尖兵
				cm.gainItem(1242008,1); // 猩红阔剑
				}else if(cm.getJob() == 2712){ //-- 夜光法师
				cm.gainItem(1212083,1); // 先驱者双头杖
				cm.gainItem(1352403,1); // 命运宝珠
				}else if(cm.getJob() == 3122){ //-- 恶魔复仇者
				cm.gainItem(1232008,1); // 残酷复仇
				}else if(cm.getJob() == 6112){ //-- 狂龙战士
				cm.gainItem(1402075,1); // 挑战之双手剑
				}else if(cm.getJob() == 5112){ //-- 米哈尔
				cm.gainItem(1302078,1); // 挑战之单手剑
				}else if(cm.getJob() == 572){ //-- 龙的传人
				cm.gainItem(1492074,1); // 挑战之短枪
				}else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- 神之子
				cm.gainItem(1562000,1); // 阔影剑
				cm.gainItem(1562001,1); // 拉比斯1型
				cm.gainItem(1562002,1); // 拉比斯2型
				cm.gainItem(1562003,1); // 拉比斯3型
				cm.gainItem(1572000,1); // 锋利之影
				cm.gainItem(1572001,1); // 拉兹丽1型
				cm.gainItem(1572002,1); // 拉兹丽2型
				cm.gainItem(1572003,1); // 拉兹丽3型
				}else if(cm.getJob() == 2412){ //-- 幻影
				cm.gainItem(1362013,1); // 天国手杖
				}
				cm.setBossLog("引导100",1);
				cm.gainItem(1003946,1);
				cm.gainItem(1102612,1);
				cm.gainItem(1082540,1);
				cm.gainItem(1052647,1);
				cm.gainItem(1072853,1);
				cm.gainItem(1182070,1);
				cm.gainItem(1113069,1,30);
				cm.gainItem(2022956,10); // 火红玫瑰
				cm.gainItem(2001505,100); // 超级药水
           			cm.worldSpouseMessage(0x20,"[新手系统] 玩家 "+ cm.getChar().getName() +" 完成了" + cm.getServerName() + "新手成长系统阶段4功能 系统给予大量奖励。");
				cm.sendOk("完成了" + cm.getServerName() + "新手成长系统阶段功能 系统给予大量奖励。");
				cm.dispose();
			} else if(cm.getLevel() >= 150  && cm.getBossLog("引导150",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- 战士
				cm.gainItem(1432137,1); // 外星人之枪
				cm.gainItem(1302224,1); // 外星人之单手剑
				}else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- 法师
				cm.gainItem(1382167,1); // 外星人之长杖
				}else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- 弓手
				cm.gainItem(1462157,1); // 外星人之弩
				cm.gainItem(1452168,1); // 外星人之弓
				}else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- 飞侠
				cm.gainItem(1332192,1); // 外星人之短刀
				cm.gainItem(1472178,1); // 外星人之拳套
				}else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- 海盗
				cm.gainItem(1482139,1); // 外星人之指节
				cm.gainItem(1492149,1); // 外星人之短枪
				}else if(cm.getJob() == 2112){ //-- 战神
				cm.gainItem(1442181,1); // 外星人之矛
				}else if(cm.getJob() == 3312){ //-- 豹弩游侠
				cm.gainItem(1462157,1); // 外星人之弩
				}else if(cm.getJob() == 3512){ //-- 机械师
				cm.gainItem(1492149,1); // 外星人之短枪
				}else if(cm.getJob() == 3212){ //-- 唤灵斗师
				cm.gainItem(1382167,1); // 外星人之长杖
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龙神
				cm.gainItem(1382167,1); // 外星人之长杖
				}else if(cm.getJob() == 2312){ //-- 双弩精灵
				cm.gainItem(1522108,1); // 外星人之双弩枪
				}else if(cm.getJob() == 532){ //-- 火炮手
				cm.gainItem(1532113,1); // 外星人之手炮
				}else if(cm.getJob() == 2412){ //-- 幻影
				cm.gainItem(1362104,1); // 外星人之单手手杖
				}else if(cm.getJob() == 3612){ //-- 尖兵
				cm.gainItem(1242086,1); // 外星人之能量剑
				}else if(cm.getJob() == 2700){ //-- 夜光法师
				cm.gainItem(1212084,1); // 外星人之双头杖
				}else if(cm.getJob() == 3122){ //-- 恶魔复仇者
				cm.gainItem(1232079,1); // 外星人之亡命剑
				}else if(cm.getJob() == 6112){ //-- 狂龙战士
				cm.gainItem(1402150,1); // 外星人之双手剑
				}else if(cm.getJob() == 5112){ //-- 米哈尔
				cm.gainItem(1302224,1); // 外星人之单手剑
				}else if(cm.getJob() == 572){ //-- 龙的传人
				cm.gainItem(1492149,1); // 外星人之短枪
				}else if(cm.getJob() == 11200){ //-- 林之灵
				cm.gainItem(1252063,1); // 外星人之魔法棒
				}else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- 神之子
				cm.gainItem(1562004,1); // 拉比斯4型
				cm.gainItem(1562005,1); // 拉比斯5型
				cm.gainItem(1562006,1); // 拉比斯6型
				cm.gainItem(1562007,1); // 拉比斯7型
				cm.gainItem(1572004,1); // 拉兹丽4型
				cm.gainItem(1572005,1); // 拉兹丽5型
				cm.gainItem(1572006,1); // 拉兹丽6型
				cm.gainItem(1572007,1); // 拉兹丽7型
				}else if(cm.getJob() == 3112){ //-- 恶魔猎手
				cm.gainItem(1322161,1); // 外星人之单手钝器
				}
				cm.setBossLog("引导150",1);
				//cm.gainItem(1113072,1);
				//cm.gainItem(1032220,1);
				//cm.gainItem(1122264,1);
				//cm.gainItem(1132243,1);
				cm.gainItem(2022956,3); // 火红玫瑰
				cm.gainItem(2001505,100); // 超级药水
           			cm.worldSpouseMessage(0x20,"[新手系统] 玩家 "+ cm.getChar().getName() +" 完成了" + cm.getServerName() + "新手成长系统阶段5功能 系统给予大量奖励。");
				cm.sendOk("完成了" + cm.getServerName() + "新手成长系统阶段功能 系统给予大量奖励。");
				cm.dispose();
			}else{
			cm.sendOk("无法满足引导条件。请阅读#b新手成长系统简介#。");
			cm.dispose();
			}
			cm.dispose();
		}
	}
}