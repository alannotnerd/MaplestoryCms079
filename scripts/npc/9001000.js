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
        var selStr = "你好，请选择你需要兑换的物品，以下统一为50蜗牛票.\r\n#L0#法弗纳天使手铳#v1222058#\r\n#L1#法弗纳半月宽刃斧#v1442223#\r\n#L2#法弗纳忏悔之剑#v1402196#\r\n#L3#法弗纳追风者#v1452205#\r\n#L4#法弗纳急速之刃#v1342082#\r\n#L5#法弗纳北极星魔法棒#v1252015#\r\n#L6#法弗纳死亡使者#v1232057#\r\n#L7#法弗纳戈耳迪锤#v1322203#\r\n#L8#法弗纳双刃切肉斧#v1312153#\r\n#L9#法弗纳魔冠之杖#v1382208#\r\n#L10#法弗纳双风翼弩#v1522094#\r\n#L11#法弗纳银槲之剑#v1302275#\r\n#L12#法弗纳巨狼之爪#v1482168#\r\n#L13#法弗纳危险之手#v1472214#\r\n#L14#法弗纳风翼弩#v1462193#\r\n#L15#法弗纳闪电锤#v1422140#\r\n#L16#法弗纳煌扇蓝姬#v1552063#\r\n#L17#法弗纳精神之刃#v1242061#\r\n#L18#法弗纳魔力夺取者#v1372177#\r\n#L19#法弗纳精神之刃#v1242060#\r\n#L20#法弗纳洞察手杖#v1362090#\r\n#L21#法弗纳荣耀炮#v1532098#\r\n#L22#法弗纳左轮枪#v1492179#\r\n#L23#法弗纳战斗切肉斧#v1412135#\r\n#L24#法弗纳皇刀正宗#v1542063#\r\n#L25#法弗纳ESP限制器#v1262016#\r\n#L26#法弗纳大马士革剑#v1332225#\r\n#L27#法弗纳魔力源泉杖#v1212063#\r\n#L28#法弗纳贯雷枪#v1432167#\r\n#L29#枫叶3年旗#v1452046#\r\n#L30#0级温度计#v1402014#\r\n#L31#0级冻冻鱼#v1442039#";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1222058,1);//法弗纳天使手铳
                cm.sendOk("兑换#v1222058#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 1:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1442223,1);//法弗纳半月宽刃斧
                cm.sendOk("兑换#v1442223#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 2:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1402196,1);//法弗纳忏悔之剑
                cm.sendOk("兑换#v1402196#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 3:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1452205,1);//法弗纳追风者
                cm.sendOk("兑换#v1452205#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 4:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1342082,1);//法弗纳急速之刃
                cm.sendOk("兑换#v1342082#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 5:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1252015,1);//法弗纳北极星魔法棒
                cm.sendOk("兑换#v1252015#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 6:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1232057,1);//法弗纳死亡使者
                cm.sendOk("兑换#v1232057#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 7:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1322203,1);//法弗纳戈耳迪锤
                cm.sendOk("兑换#v1322203#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 8:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1312153,1);//法弗纳双刃切肉斧
                cm.sendOk("兑换#v1312153#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 9:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1382208,1);//法弗纳魔冠之杖
                cm.sendOk("兑换#v1382208#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 10:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1522094,1);//法弗纳双风翼弩
                cm.sendOk("兑换#v1522094#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 11:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1302275,1);//法弗纳银槲之剑
                cm.sendOk("兑换#v1302275#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 12:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(402001,-0);
		cm.gainItem(1482168,1);//法弗纳巨狼之爪
                cm.sendOk("兑换#v1482168#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v40020014#");
		cm.dispose();
            }
            break;
        case 13:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(402001,-0);
		cm.gainItem(1472214,1);//法弗纳危险之手
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
		cm.gainItem(1462193,1);//法弗纳风翼弩
                cm.sendOk("兑换#v1462193#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 15:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1422140,1);//法弗纳闪电锤
                cm.sendOk("兑换#v1422140#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 16:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(15520631,1);//法弗纳煌扇蓝姬
                cm.sendOk("兑换#v1552063#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 17:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1242061,1);//法弗纳精神之刃
                cm.sendOk("兑换#v1242061#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 18:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1372177,1);//法弗纳魔力夺取者
                cm.sendOk("兑换#v1372177#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 19:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1242060,1);//法弗纳精神之刃
                cm.sendOk("兑换#v1242060#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 20:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1362090,1);//法弗纳洞察手杖
                cm.sendOk("兑换#v1362090#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 21:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1532098,1);//法弗纳荣耀炮
                cm.sendOk("兑换#v1532098#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 22:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1492179,1);//法弗纳左轮枪
                cm.sendOk("兑换#v1492179#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 23:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1412135,1);//法弗纳战斗切肉斧
                cm.sendOk("兑换#v1412135#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 24:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1542063,1);//法弗纳皇刀正宗
                cm.sendOk("兑换#v1542063#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 25:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1262016,1);//法弗纳ESP限制器
                cm.sendOk("兑换#v1262016#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 26:
            if (cm.itemQuantity(4002001) >=5){
		cm.gainItem(4002001,-0);
		cm.gainItem(1332225,1);//法弗纳大马士革剑
                cm.sendOk("兑换#v1332225#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 27:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4310034,-0);
		cm.gainItem(1212063,1);//法弗纳魔力源泉杖
                cm.sendOk("兑换#v1212063#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 28:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1432167,1);//法弗纳贯雷枪
                cm.sendOk("兑换#v1432167#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 29:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1452046,1);//枫叶3年旗
                cm.sendOk("兑换#v1452046#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 30:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1402014,1);//0级温度计
                cm.sendOk("兑换#v1402014#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        case 31:
            if (cm.itemQuantity(4002001) >=50){
		cm.gainItem(4002001,-0);
		cm.gainItem(1442039,1);//0级冻冻鱼
                cm.sendOk("兑换#v1442039#x1成功.请查看背包");
		cm.dispose();
            } else {
                cm.sendOk("你没有50个#v4002001#");
		cm.dispose();
            }
            break;
        }
    }
}