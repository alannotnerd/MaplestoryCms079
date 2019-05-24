function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#r累积充值达到1000礼包，可获得：#n#b\r\n①、冒险币=2000万\r\n②、皇家坐骑*5个\r\n③、枫叶耳环一个\r\n④、勋章四维200我爱蛋糕勋章一枚\r\n⑤、祝福和混沌各5张\r\n⑥、特殊坐骑一个，可以爬上绳子哦！\r\n⑦、任选卷轴8张，可以选60%或者10%\r\n⑧、精灵吊坠，永久使用权一个\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n"//3
            text += "#L1##r#v4310028#领取累计充值1000礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310028,1)){
				cm.gainItem(4310028, -1);
				cm.gainItem(4001215, 5);//皇家
				cm.gainItem(2340000, 5);//祝福
				cm.gainItem(2049100, 5);//混沌
				cm.gainItem(1122017, 1);//
				cm.gainItem(1032035,6,6,6,6,100,100,5,5,10,10,10,10,0,0);//枫叶耳环
				cm.gainItem(1142219,200,200,200,200,1000,1000,10,10,50,50,50,50,20,20);//勋章
				cm.gainMeso(20000000);
            cm.sendOk("领取成功，任选卷轴、任选坐骑必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值1000礼包！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


