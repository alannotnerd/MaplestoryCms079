var qlo = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#"
var aa = "#fEffect/CharacterEff/1082229/0/0#"; //爱心粉1
var vv = "#fEffect/CharacterEff/1062114/0/0#"; //爱心粉6
var status = -1;
var itemList = Array(
Array(1112941,1,100,1000000)//物品id,数量,属性,消费点券
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
		var selStr = aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+""+vv+""+aa+"\r\n";
		    selStr += "#r你好，欢迎光临 #b土豪点装戒指商店100万点卷一个戒指\r\n\r\n";
		    selStr += "#b土豪道具全属性[ 100 ] 分别 - #rWelcomeBack戒指\r\n\r\n";
			selStr += "                      #v1112941#\r\n";
			//selStr += "     #L0##b土豪专属 #rWELOCOME特效 #b需要 #r100万 #b点卷#l";
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