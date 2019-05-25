var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var itemlist = Array(
Array(2430249, 300),//木飞机3天使用券
Array(2430259, 300),//蝙蝠魔骑宠卷
Array(2430260, 300),//花蘑菇骑宠卷
Array(2430261, 300),//超能套装骑宠卷
Array(2430262, 300),//雄狮骑宠卷
Array(2430265, 300),//骑士团战车骑宠卷
Array(2430266, 300),//走路鸡骑宠卷
Array(2430271, 300),//猫头鹰骑宠卷
Array(2430578, 300),//直升机3天使用券
Array(2430579, 300),//GO兔冒险3天使用券
Array(2430580, 300),//熊猫3天使用券
Array(2430583, 300),// 天马3天使用券
Array(2430582, 300),//透明蝙蝠怪3天使用券
//Array(2430586, 300),//骑士团战车3天使用券
Array(2430587, 300),//妮娜的魔法阵3天使用券
Array(2430588, 300),//拿破仑的白马3天使用券
Array(2430589, 300),//魔法扫帚3天使用券
Array(2430590, 300),//梦魇3天使用券
//Array(2430591, 300),//猫头鹰3天使用券
Array(2430592, 300),//莱格斯的豺犬3天使用券
Array(2430593, 300),///警车3天使用券
Array(2430594, 300),//筋斗云3天使用券
Array(2430595, 300),//玩具坦克3天使用券
Array(2430596, 300),///钢铁变形侠3天使用券
Array(2430597, 300), //飞船3天使用券
//Array(2430598, 300), //超能套装3天使用券
Array(2430599, 300), //蝙蝠怪3天使用券
Array(2430600, 300), ///暗光龙3天使用券
Array(2430601, 300),//圣兽提拉奥斯3天使用券
Array(2430602, 300)//暴风摩托3天使用券
//Array(2290886, 200), 
//Array(2290887, 200), 
//Array(2290468, 200), 
//Array(2290571, 200),
//Array(2290914, 200),
//Array(2290723, 200),
//Array(2290889, 200),
//Array(2290602, 200),
//Array(2291137, 200),
//Array(2290724, 200)
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
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			text = "#h0#,您可以在这里兑换#e#b本服可爱骑宠哦#n#k,请选择你想要兑换的物品\r\n#e#r注意背包是否有空格 \r\n#r#e注意背包是否有空格#k#n\r\n#b";
			for (var i=0; i<itemlist.length; i++) {
				text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# 需要  x  #r"+itemlist[i][1]+"#b#v4000645##l\r\n";
				if (i != 0 && (i+1) % 5 == 0) {
					text += "\r\n";
				}
			}
            cm.sendSimple(text);
        } else if (a == 1) {
			selects = selection;
            cm.sendGetNumber("请输入你请你输入想要购买的数量\r\n\r\n#r1个需要" + itemlist[selects][1] + "个#b#v4000645##l#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想购买" + buynum + "个#r#i" + itemlist[selects][0] + "##k？\r\n你将使用掉" + (buynum * itemlist[selects][1]) + "变异的漂漂猪脖子肉#v4000645##l。");
        } else if (a == 3) {
            if (cm.haveItem(4000645,buynum * itemlist[selects][1])) {
                cm.gainItem(4000645, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("购买成功了！");
                cm.dispose();
            } else {
                cm.sendOk("对不起，你没有足够的变异的漂漂猪脖子肉#v4000645##l。");
                cm.dispose();
            }
        }
    }//mode
}//f