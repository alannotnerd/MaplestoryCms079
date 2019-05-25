var status = -1;
var itemList = Array(
Array(1372222,1,32737,1000000),//物品id,数量,属性,消费点券
Array(1232109,1,32737,1000000),
Array(1332274,1,32737,1000000),
Array(1332274,1,32737,1000000),
Array(1362135,1,32737,1000000),
Array(1242116,1,32737,1000000),
Array(1342101,1,32737,1000000),
Array(1442268,1,32737,1000000),
Array(1432214,1,32737,1000000),
Array(1412177,1,32737,1000000),
Array(1542199,1,32737,1000000),
Array(1462239,1,32737,1000000),
Array(1522138,1,32737,1000000),
Array(1322250,1,32737,1000000),
Array(1402251,1,32737,1000000),
Array(1532144,1,32737,1000000),
Array(1302333,1,32737,1000000),
Array(1382259,1,32737,1000000),
Array(1222109,1,32737,1000000),
Array(1482216,1,32737,1000000),
Array(1422184,1,32737,1000000),
Array(1212115,1,32737,1000000),
Array(1452252,1,32737,1000000),
Array(1262017,1,32737,1000000)
);
var selectedItem;
var selequantity;
var selesx;
var selectedCost;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，您要购买最牛逼的土豪武器吗";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k x (" + itemList[i][1] + ")   #r" + itemList[i][3] + "#k点卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selequantity = item[1];
			selesx = item[2];
            selectedCost = item[3];
            cm.sendYesNo("您是否购买全属性#r"+selesx+"#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") \r\n需要 #r" + selectedCost + "#k 点卷？");
        } else {
            cm.sendOk("出现错误...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selequantity <= 0 || selesx <= 0 || selectedItem <= 0) {
            cm.sendOk("购买道具出现错误...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            if (cm.canHold(selectedItem, selequantity)) {
                var ii = cm.getItemInfo();
			    var toDrop = ii.randomizeStats(ii.getEquipById(selectedItem)).copy(); 
			    //toDrop.setExpiration(java.lang.System.currentTimeMillis() + (24 * 60 * 60 * 1000));//时间
				toDrop.setStr(selesx);
			    toDrop.setDex(selesx);
			    toDrop.setInt(selesx);
			    toDrop.setLuk(selesx);
			    toDrop.setWatk(selesx);
			    toDrop.setMatk(selesx);
				toDrop.setHp(selesx);
				toDrop.setMp(selesx);
				toDrop.setWdef(selesx);
				toDrop.setMdef(selesx);
				toDrop.setAcc(selesx);
				toDrop.setAvoid(selesx);
				toDrop.setSpeed(selesx);
				toDrop.setJump(selesx);
				toDrop.setBossDamage(100);//BOSS伤
				toDrop.setIgnorePDR(100);//无视防御
				toDrop.setTotalDamage(100);//总伤
				toDrop.setAllStat(100);//全属性
			    cm.addFromDrop(cm.getClient(), toDrop, false);
				cm.gainNX(-selectedCost);
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        }  else {
            cm.sendOk("您没有那么多点卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k x (" + selequantity + ") 需要 #r" + selectedCost + "#k 点卷。");
        }
        status = -1;
    }
}