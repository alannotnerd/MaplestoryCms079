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
            text += "#e#r累积充值达到300礼包，可获得：#n#b\r\n①、冒险币=100万\r\n②、皇家坐骑*3个\r\n③、快乐戒指一个（力量+5, 幸運+5, 智力+5, 敏捷+5, HP+100, MP+100，攻击+5，魔攻+5）\r\n④、四维100勋章一枚\r\n⑤、祝福和混沌各2张\r\n⑥、金钱镖一组\r\n⑦、任选卷轴2张，可以选60%或者10%\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n"//3
            text += "#L1##r#v4310049#领取累计充值300礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310049,1)){
				cm.gainItem(4310049, -1);
				cm.gainItem(4001215, 3);//皇家
				cm.gainItem(1112793, 1);//快乐戒指
				cm.gainItem(2340000, 2);//祝福
				cm.gainItem(2049100, 2);//混沌
				cm.gainItem(2070005, 1);//金钱镖
				cm.gainItem(1142070,100,100,100,100,500,500,6,6,50,50,50,50,10,10);//xunzhang
				cm.gainMeso(1000000);
            cm.sendOk("领取成功，任选卷轴必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值300礼包！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


