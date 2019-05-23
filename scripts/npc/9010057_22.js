/* Joyce
	Event NPC
*/

var status = -1;
var maps = Array(
910001000, //隐藏地图 - 专业技术村庄&lt;匠人街>
230000000, //水下世界 - 水下世界
260000000, //火焰之路 - 阿里安特
101000000, //魔法密林 - 魔法密林
211000000, //神秘岛 - 冰峰雪域
120030000, //黄金海滩 - 海边瓜棚
130000200, //女皇之路 - 圣地岔路
100000000, //射手村 - 射手村
103000000, //废弃都市 - 废弃都市
222000000, //时间静止之湖 - 童话村
240000000, //神木村 - 神木村
104000000, //明珠港 - 明珠港
220000000, //玩具城 - 玩具城
802000101, //逆奥之城 - 卡姆那 （内部）
120000000, //诺特勒斯 - 诺特勒斯码头
221000000, //时间静止之湖 - 地球防御本部
200000000, //神秘岛 - 天空之城
102000000, //勇士部落 - 勇士部落
300000000, //艾琳森林 - 阿尔泰营地
801000000, //昭和村 - 昭和村
540000000, //新加坡 - 中心商务区
541000000, //新加坡 - 驳船码头城
250000000, //武陵 - 武陵
251000000, //百草堂 - 百草堂
551000000, //马来西亚 - 甘榜村
550000000, //马来西亚 - 吉隆大都市 
261000000, //莎翁小镇 - 玛加提亚
541020000, //新加坡 - 乌鲁城入口
270000000, //时间神殿 - 三个门
682000000, //隐藏地图 - 闹鬼宅邸外部
140000000, //冰雪之岛 - 里恩
970010000, //隐藏地图 - 枫树山丘
103040000, //废都广场 - 废都广场大厅
555000000, //M我 - 白色圣诞山丘
310000000, //黑色之翼领地 - 埃德尔斯坦
200100000, //天空中的克里塞 - 克里塞入口
211060000, //狮子王之城 - 沉寂原野
310040300, //干路 - 岩石路
701000000);//上海外滩
var pqMaps = Array(
541000300, //新加坡 - 神秘通道 3 等级：85-100
220050300, //玩具城 - 时间通道
229000020, //闹鬼宅邸 - 客房2
230040200, //水下世界 - 危海峡谷1
541010010, //新加坡 - 幽灵船 2
551030100, //马来西亚 - 阴森世界入口
240040500, //神木村 - 龙之巢穴入口
800020110, //江戶村 - 林野的松林
105030500, //被诅咒的寺院 - 禁忌祭坛
102040200, //遗迹发掘地 - 遗迹发掘团营地
105100100, //蝙蝠怪神殿 - 寺院地下
211041100, //死亡森林
270030500); //忘却之路5

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var selectedMap = -1;
var selectedArea = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        cm.sendSimple(head + "您好 #r#h ##k 有什么需要我帮忙的吗？ \r\n#b#b#L2#学习技能#l\r\n");
    } else if (status == 1) {
        if (selection == 1) {
	    cm.dispose();
	    cm.openNpc(9270035,2);
        } else if (selection == 2) {
            status = 5;
            cm.sendSimple(head + "您好 #r#h ##k 请选择您要操作的项目:\r\n#b#L1#群宠技能#l\r\n#L4#骑宠技能#l\r\n#L5#夜光技能#k");
        } else if (selection == 3) {
            cm.sendSimple("您好 #r#h ##k 请选择您要传送的项目:\r\n#b#L0#城镇传送#l\r\n#L1#练级传送(70以上)#l\r\n#L2#次元传送#l#k"); //\r\n#L3#网吧地图#l
        } else if (selection == 5) {
            if (!cm.haveItem(4001168, 1)) { //金枫叶
                cm.sendOk("请检查您的背包是否有金枫叶这个道具.");
            } else {
                if (cm.removeItem(4001168)) {
                    cm.gainNX( +2800);
                    cm.sendOk("兑换成功！获得 2800 点卷。");
                } else {
                    cm.sendOk("请检查该道具是否锁定.");
                }
            }
            cm.dispose();
        } else if (selection == 6) {
            if (cm.getPlayer().getCSPoints(1) < 3000) {
                cm.sendOk("您的点卷少于 3000 点卷，兑换金枫叶失败！");
            } else if (!cm.canHold(4001168, 1)) {
                cm.sendOk("请检查您的背包是否有足够的空间.");
            } else {
                cm.gainItem(4001168, 1); //金枫叶
                cm.gainNX( - 3000);
                cm.sendOk("兑换成功！获得金枫叶1个，此道具价值 3000 点卷。如果将道具兑换成金币我们将收取200点卷的手续费。");
            }
            cm.dispose();
        } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(1012121);
        }
    } else if (status == 2) {
        var selStr = "请选择您的目的地: #b";
        if (selection == 0) {
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# #l";
            }
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9010022);
            return;
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9070007);
            return;
        } else {
            for (var i = 0; i < pqMaps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + pqMaps[i] + "# #l";
            }
        }
        selectedArea = selection;
        cm.sendSimple(selStr);
    } else if (status == 3) {
        cm.sendYesNo("看来这里的事情都已经处理完了啊。您真的要移动到 #m" + (selectedArea == 0 ? maps[selection] : pqMaps[selection]) + "# 吗？");
        selectedMap = selection;
    } else if (status == 4) {
        if (selectedMap >= 0) {
            cm.warp(selectedArea == 0 ? maps[selectedMap] : pqMaps[selectedMap], 0);
        }
        cm.dispose();
    } else if (status == 6) {
        if (selection == 1) {
            if (cm.getPlayer().getSkillLevel(8) > 0 || cm.getPlayer().getSkillLevel(10000018) > 0 || cm.getPlayer().getSkillLevel(20000024) > 0 || cm.getPlayer().getSkillLevel(20011024) > 0) {
                cm.sendOk(head + "您已经学习过这个技能。");
            } else {
                if (cm.getJob() == 2001 || (cm.getJob() >= 2200 && cm.getJob() <= 2218)) {
                    cm.teachSkill(20011024, 1, 0); // 龙神 - 群宠
                } else if (cm.getJob() == 2000 || (cm.getJob() >= 2100 && cm.getJob() <= 2112)) {
                    cm.teachSkill(20000024, 1, 0); // 战神 - 群宠
                } else if (cm.getJob() >= 1000 && cm.getJob() <= 1512) {
                    cm.teachSkill(10000018, 1, 0); // 骑士团 - 群宠
                } else {
                    cm.teachSkill(8, 1, 0); // 冒险家 - 群宠
                }
                cm.sendOk(head + "恭喜您学习技能成功。");
            }
            cm.dispose();
        } else if (selection == 4) {
            /*骑兽技能  || cm.getPlayer().getSkillLevel(cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()))*/
            if (cm.getPlayer().getSkillLevel(80001000) > 0) {
                cm.sendOk(head + "您已经学习过这个技能。");
            } else {
                if (cm.getJob() >= 3000) {
                    cm.sendOk(head + "对不起！该职业暂时无法学习这个技能。");
                    cm.dispose();
                    return;
                }
cm.teachSkill(80001000 ,  1, 1);
                /*cm.teachSkill(cm.isGMS() ? 80001000 : cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()), 1, 1);*/
                cm.sendOk(head + "恭喜您学习技能成功。");
            }
            cm.dispose();
        } else if (selection == 5) {
	if(cm.getJob() == 2700 || cm.getJob() == 2710 || cm.getJob() == 2711 || cm.getJob() == 2712){
		cm.teachSkill(27000106,5,5);
		cm.teachSkill(27001100,20,20);
		cm.sendOk(head + "恭喜您技能学习成功");
	} else {
		cm.sendOk(head + "你不属于该职业群");
}
            cm.dispose();
        }
    }
}