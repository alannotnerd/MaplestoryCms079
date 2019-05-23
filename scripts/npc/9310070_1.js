var ah = "#fEffect/CharacterEff/1082565/2/0#"; //兔子蓝
var ag = "#fEffect/CharacterEff/1082565/0/0#"; //兔子灰
var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1402180, 400),//解放的凯瑟利安
Array(1382235, 400),//阿丽莎之光辉
Array(1402224, 200),//柳德之剑
Array(1004075, 200),//海神王冠
Array(1003719, 100),//进阶精灵帽
Array(1003720, 100),//进阶半半头盔
Array(1003721, 100),//进阶女王王冠
Array(1003722, 150),//进阶贝伦头盔
Array(1022226, 300),//独眼巨人之眼Lv.3
Array(1012319, 200),//8周年点点红
Array(1662073, 150),//战斗机器人(男)
Array(1662072, 150),//战斗机器人(女
Array(1672069, 150),//女武神之心
Array(1672027, 150),//极真锂心脏
Array(1113069, 100),//探险之黑暗暴击戒指
Array(1112919, 50),//永远的冒险家戒指
Array(1112659, 50),//冒险家的格拉泰斯戒指
Array(1112429, 200),//冒险家的魔法之戒
Array(1112428, 50),//冒险家的爆击之戒
Array(1112427, 50),//冒险家的残酷之戒
Array(1113020, 200),//战神祝福戒指
Array(1113084, 200),//黑龙传说指环
Array(1182017, 300),//黄金休彼德蔓徽章II
Array(1190302, 200),//水晶枫叶徽章
Array(1190503, 150),//起源之传说纹章(魔)
Array(1190502, 150),//起源之传说纹章(攻)
Array(1122122, 188),//真·觉醒冒险之心 战士
Array(1122123, 188),//真·觉醒冒险之心 魔法师
Array(1122124, 188),//真·觉醒冒险之心 弓箭手
Array(1122125, 188),//真·觉醒冒险之心 飞侠
Array(1122126, 188),//真·觉醒冒险之心 海盗
Array(1032219, 400),//遗忘之神话耳环
Array(1672031, 200),//无限能量全开触发器
Array(1672058, 300),//极真无限能量全开触发器
Array(4033999, 25),//封印的时间之石
Array(2430683, 30)//情人节 卷轴箱子
);
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
	}
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
	var text = ag+"#k#n尊敬的玩家#h #，欢迎来到#b#e极品装备商城，以下装备都可以附加潜能哦！#rPS：固有道具只能购买一个，否则会消失！\r\n"
	text += ah+"#k#n您当前的余额为：#r"+cm.getHyPay(1)+"\t"+ah+"#k累计充值：#r"+cm.getRMB()+"\r\n\r\n#b";
	for (var i=1; i<=itemlist.length; i++) {
				text += "#L" + (i) + "##i" + itemlist[i-1] + ":##t" + itemlist[i-1] + "# - 需要#r "+itemlist[i-1][1]+" #b余额  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
	cm.sendSimple(text);
	} else if (a == 1) {
			selects = (selection-1);
            buynum = 1;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "余额。");
		} else if (a == 2) {
            if (cm.getChar().getHyPay(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().addHyPay(buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的余额。");
                cm.dispose();
			}
		}
	}