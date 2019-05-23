/**
 *Mary
 */
var status = 0;

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
        var selStr = "你好，暴君专卖店，请选择你需要兑换的物品，以下统一为50蜗牛票.\r\n#L0#暴君赫尔梅斯披风#v1102482#\r\n#L1#暴君凯伦披风#v1102483#\r\n#L2#暴君西亚戴斯披风#v1102481#\r\n#L3#暴君利卡昂披风#v1102484#\r\n#L4#暴君阿尔泰披风#v1102485#\r\n#L5#暴君赫尔梅斯靴#v1072744#\r\n#L6#暴君凯伦靴#v1072745#\r\n#L7#暴君利卡昂靴#v1072746#\r\n#L8#暴君阿尔泰靴#v1072747#\r\n#L9#暴君凯伦手套#v1082545#\r\n#L10#暴君赫尔梅斯手套#v1082544#\r\n#L11#暴君阿尔泰手套#v1082547#\r\n#L12#暴君西亚戴斯靴#v1072743#\r\n#L13#暴君利卡昂手套#v1082546#\r\n#L14#暴君赫尔梅斯腰带#v1132175#\r\n#L15#暴君西亚戴斯腰带#v1132174#\r\n#L16#暴君阿尔泰腰带#v1132178#\r\n#L17#暴君凯伦腰带#v1132176#\r\n#L18#暴君利卡昂腰带#v1132177#\r\n#L19#暴君西亚戴斯手套#v1082543#";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1102482,1);//暴君赫尔梅斯披风
                cm.sendOk("兑换#v1102482#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 1:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4310034,-0);
		cm.gainItem(1102483,1);//暴君凯伦披风
                cm.sendOk("兑换#v1102483#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 2:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1102481,1);//暴君西亚戴斯披风
                cm.sendOk("兑换#v1102481#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 3:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1102484,1);//暴君利卡昂披风
                cm.sendOk("兑换#v1102484#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 4:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1102485,1);//暴君阿尔泰披风
                cm.sendOk("兑换#v1102485#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 5:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1072744,1);//暴君赫尔梅斯靴
                cm.sendOk("兑换#v1072744#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 6:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1072745,1);//暴君凯伦靴
                cm.sendOk("兑换#v1072745#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 7:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1072746,1);//暴君利卡昂靴
                cm.sendOk("兑换#v1072746#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 8:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1072747,1);//暴君阿尔泰靴
                cm.sendOk("兑换#v1072747#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 9:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1082545,1);//暴君凯伦手套
                cm.sendOk("兑换#v1082545#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 10:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1082544,1);//暴君赫尔梅斯手套
                cm.sendOk("兑换#v1082544#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 11:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1082547,1);//暴君阿尔泰手套
                cm.sendOk("兑换#v1082547#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 12:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(402001,-0);
		cm.gainItem(1072743,1);//暴君西亚戴斯靴
                cm.sendOk("兑换#v1072743#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v40020014#");
		cm.dispose();
            }
            break;
        case 13:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(402001,-0);
		cm.gainItem(1082546,1);//暴君利卡昂手套
                cm.sendOk("兑换#v1472214#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 14:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1132175,1);//暴君赫尔梅斯腰带
                cm.sendOk("兑换#v1132175#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 15:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1132174,1);//暴君西亚戴斯腰带
                cm.sendOk("兑换#v1132174#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 16:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1132178,1);//暴君阿尔泰腰带
                cm.sendOk("兑换#v1132178#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 17:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1132176,1);//暴君凯伦腰带
                cm.sendOk("兑换#v1132176#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 18:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1132177,1);//暴君利卡昂腰带
                cm.sendOk("兑换#v1132177#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 19:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1082543,1);//暴君西亚戴斯手套
                cm.sendOk("兑换#v1082543#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        }
    }
}