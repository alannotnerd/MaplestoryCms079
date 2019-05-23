var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //

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
    if (status == 0) {
        var selStr = ""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n#k#L2#   #v2431867#     购买伤害皮肤礼包10W点卷#l   \r\n"+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n       打开可随机获得以下任意一个伤害皮肤\r\n#v2433178##v2433456##v2433715##v2433183##v2433184##v2433362##v2433587##v2433588##v2433572##v2433571##v2433570##v2433569##v2433568##v2433709##v2433777##v2433775##v2433776##v2433883##v2431966##v2431967##v2432131##v2432153##v2432154##v2432207##v2432354##v2432355##v2432465##v2432479##v2432526##v2432532##v2432592##v2432640##v2432710##v2432836##v2432973##v2433063##v2432591##v2432695##v2432748##v2432749##v2432804##v2433112##v2433113##v2433038##v2433197##v2433182##v2433183#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
            if (cm.getPlayer().getCSPoints(1) >= 600000) {
		cm.gainNX(1, -600000);
                cm.changeDamageSkin(1023);
                cm.sendOk("购买成功,已应用到你的伤害皮肤,打怪可看到\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有点卷或不足,我不能与你兑换");
            }
            break;
        case 2:
            if (cm.getPlayer().getCSPoints(1) >= 100000) {
		cm.gainNX(1, -100000);
                cm.gainItem(2431867,1);
                cm.sendOk("购买成功\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有点卷或不足,我不能与你兑换");
            }
            break;
			case 3:
            if (cm.getPlayer().getCSPoints(1) >= 600000) {
		cm.gainNX(1, -600000);
                cm.changeDamageSkin(1022);
                cm.sendOk("购买成功,已应用到你的伤害皮肤,打怪可看到\r\n祝你游戏愉快!");
            } else {
                cm.sendOk("你没有点卷或不足,我不能与你兑换");
            }
            break;
        }
        cm.dispose();
    }
}