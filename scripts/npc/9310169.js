/* 绝版抵用卷商店 脸饰*/
var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(1352803, 100000),//银河之刃
Array(1342095, 100000),//银河之刃
Array(1352009, 100000),//银河之箭矢
Array(1352109, 100000),//银河之卡片
Array(1352206, 100000),//银河之吊坠
Array(1352216, 100000),//银河之念珠
Array(1352226, 100000),//银河之锁链
Array(1352276, 100000),//银河之扳指
Array(1352286, 100000),//银河之剑鞘
Array(1352296, 100000),//银河之灵符
Array(1352406, 100000),//银河之魂珠
Array(1352506, 100000),//银河之精髓
Array(1352707, 100000),//银河之私语
Array(1352906, 100000),//银河之腕轮
Array(1352916, 100000),//银河之鹰眼
Array(1352935, 100000),//银河之天龙锤
Array(1352945, 100000),//银河之龙神的遗产
Array(1352957, 100000),//银河之极限球
Array(1352967, 100000),//银河之狂野之矛
Array(1352975, 100000),//银河之圣地之光
Array(1353006, 100000),//银河之控制器
Array(1352928, 100000),//银河之火药桶
Array(1352236, 100000),//银河之赤铜之书
Array(1352256, 100000),//银河之白金之书
Array(1352266, 100000),//银河之风暴羽毛
Array(1352606, 100000),//银河之灵魂手镯
Array(1099011, 100000),//银河之咒盾
Array(1099012, 100000),//银河之盾
Array(1353105, 100000),//银河之狐狸珠
Array(1353405, 100000)
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
			text = "#k亲爱的#r#h0#,#k您好请选择您希望购买的道具：\r\n\r\n#b";
			for (var i=1; i<=itemlist.length; i++) {
				text += "#L" + (i) + "##i" + itemlist[i-1] + ":##t" + itemlist[i-1] + "# - #r"+itemlist[i-1][1]+"#b点卷  \r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = (selection-1);
            buynum = 1;
            cm.sendYesNo("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "点卷。");
		} else if (a == 2) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的点卷。");
                cm.dispose();
			}
		}
}