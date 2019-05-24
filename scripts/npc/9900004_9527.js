var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 蓝色角点 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var 正在进行中 = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var 完成 = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var 正在进行中蓝 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 完成红 = "#fUI/UIWindow/MonsterCarnival/icon0#";
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
            text += "#k拥有#v4310088#可以兑换各种卷轴哦！\r\n\r\n"//3
            text += "#L1##b" + 红色箭头 + "兑换#v2044301##z2044301#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L2##b" + 红色箭头 + "兑换#v2044302##z2044302#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L3##b" + 红色箭头 + "兑换#v2044001##z2044001#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L4##b" + 红色箭头 + "兑换#v2044002##z2044002#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L5##b" + 红色箭头 + "兑换#v2043801##z2043801#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L6##b" + 红色箭头 + "兑换#v2043802##z2043802#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L7##b" + 红色箭头 + "兑换#v2043701##z2043701#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L8##b" + 红色箭头 + "兑换#v2043702##z2043702#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L9##b" + 红色箭头 + "兑换#v2044501##z2044501#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L10##b" + 红色箭头 + "兑换#v2044502##z2044502#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L11##b" + 红色箭头 + "兑换#v2044601##z2044601#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L12##b" + 红色箭头 + "兑换#v2044602##z2044602#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L13##b" + 红色箭头 + "兑换#v2043301##z2043301#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L14##b" + 红色箭头 + "兑换#v2043302##z2043302#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L15##b" + 红色箭头 + "兑换#v2044701##z2044701#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L16##b" + 红色箭头 + "兑换#v2044702##z2044702#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L17##b" + 红色箭头 + "兑换#v2044901##z2044901#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L18##b" + 红色箭头 + "兑换#v2044902##z2044902#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            text += "#L19##b" + 红色箭头 + "兑换#v2040914##z2040914#\t需要：#r#v4310088#x2#k个\r\n\r\n"//
            text += "#L20##b" + 红色箭头 + "兑换#v2040915##z2040915#\t需要：#r#v4310088#x3#k个\r\n\r\n"//
            cm.sendSimple(text);
        } else if (selection == 1) {
if (!cm.canHold(2044301, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044301,1);
cm.sendNext("#b恭喜你，成功兑换#v2044301#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044301#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 2) {
if (!cm.canHold(2044302, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044302,1);
cm.sendNext("#b恭喜你，成功兑换#v2044302#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044302#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 3) {
if (!cm.canHold(2044001, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044001,1);
cm.sendNext("#b恭喜你，成功兑换#v2044001#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044001#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 4) {
if (!cm.canHold(2044002, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044002,1);
cm.sendNext("#b恭喜你，成功兑换#v2044002#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044002#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 5) {
if (!cm.canHold(2043801, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043801,1);
cm.sendNext("#b恭喜你，成功兑换#v2043801#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043801#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 6) {
if (!cm.canHold(2043802, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043802,1);
cm.sendNext("#b恭喜你，成功兑换#v2043802#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043802#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 7) {
if (!cm.canHold(2043701, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043701,1);
cm.sendNext("#b恭喜你，成功兑换#v2043701#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043701#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 8) {
if (!cm.canHold(2043702, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043702,1);
cm.sendNext("#b恭喜你，成功兑换#v2043702#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043702#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 9) {
if (!cm.canHold(2044501, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044501,1);
cm.sendNext("#b恭喜你，成功兑换#v2044501#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044501#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 10) {
if (!cm.canHold(2044502, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044502,1);
cm.sendNext("#b恭喜你，成功兑换#v2044502#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044502#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 11) {
if (!cm.canHold(2044601, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044601,1);
cm.sendNext("#b恭喜你，成功兑换#v2044601#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044601#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 12) {
if (!cm.canHold(2044602, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044602,1);
cm.sendNext("#b恭喜你，成功兑换#v2044602#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044602#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 13) {
if (!cm.canHold(2043301, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043301,1);
cm.sendNext("#b恭喜你，成功兑换#v2043301#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043301#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 14) {
if (!cm.canHold(2043302, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043302,1);
cm.sendNext("#b恭喜你，成功兑换#v2043302#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2043302#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 15) {
if (!cm.canHold(2044701, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044701,1);
cm.sendNext("#b恭喜你，成功兑换#v2044701#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044701#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 16) {
if (!cm.canHold(2044702, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044702,1);
cm.sendNext("#b恭喜你，成功兑换#v2044702#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044702#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 17) {
if (!cm.canHold(2044901, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044901,1);
cm.sendNext("#b恭喜你，成功兑换#v2044901#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044901#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 18) {
if (!cm.canHold(2044902, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044902,1);
cm.sendNext("#b恭喜你，成功兑换#v2044902#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2044902#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 19) {
if (!cm.canHold(2040914, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2040914,1);
cm.sendNext("#b恭喜你，成功兑换#v2040914#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2040914#，需要#v4310088#X2个")
cm.dispose();
}
        } else if (selection == 20) {
if (!cm.canHold(2040915, 1)) {
cm.sendOk("您的包裹空间不足.请清理背包！");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2040915,1);
cm.sendNext("#b恭喜你，成功兑换#v2040915#！")
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功使用中介币兑换卷轴！！！");
cm.dispose();
}else{
cm.sendOk("#b提示:#d\r\n兑换#v2040915#，需要#v4310088#X3个")
cm.dispose();
}
        } else if (selection == 25) {
            if (cm.getPlayer().getLevel() < 70) {
                cm.sendOk("你的等级小于 70 级，无法领取财神的信件。");
                cm.dispose();
            } else if(cm.haveItem(4031326,1)){
                cm.sendOk("你已经拥有财神的信件，请不要重复领取，小心大姐大拿屎丢你！");
                cm.dispose();
            } else {
cm.gainItem(4031326,+1);//财神的信件
                cm.sendOk("恭喜你领取成功，快去带新人把！");
cm.喇叭(3, "恭喜[" + cm.getPlayer().getName() + "]成功领取财神的信件，快去带新人把！！");
                cm.dispose();
	}
	}
    }
}


