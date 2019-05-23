/*
 完成时间：2013年8月11日 13:05:43
 脚本功能：大陆移动卷轴
 */
var isopenvip = false;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
//"#fUI/Basic.img/BtMin2/normal/0#";
var townmaps = Array(
		910001000,
        104000000,
        100000000,
        101000000,
        102000000,
        103000000,
        120000000,
        105000000,
        200000000,
        211000000,
        550000000,
        230000000,
        222000000,
        220000000,
        701000000,
        250000000,
        702000000,
        260000000,
        600000000,
        240000000,
        261000000,
        221000000,
        251000000,
        300000000,
        270000000,
        702100000,
        800000000,
        130000000,
        310000000);
var monstermaps = Array(
        Array(50000, "适合 1级 ~ 10级 的玩家"),
        Array(100010100, "适合 3级 ~ 10级 的玩家"),
        Array(101020100, "适合 8级 ~ 15级 的玩家"),
        Array(102030000, "适合 15级 ~ 20级 的玩家"),
        Array(102030400, "适合 20级 ~ 40级 的玩家"),
        Array(551000200, "适合 50级 ~ 70级 的玩家"),
        Array(600020300, "适合 70级 ~ 80级 的玩家"),
        Array(702010000, "适合 80级 ~ 90级 的玩家"),
        Array(220060000, "适合 90级 ~ 100级 的玩家"),
        Array(541010010, "适合 90级 ~ 100级 的玩家"),
        Array(220060200, "适合 100级 ~ 110级 的玩家"),
        Array(220060201, "适合 110级 ~ 120级 的玩家"),
        Array(240040510, "适合 120级以上 的玩家"),
        Array(270030100, "适合 150级以上 的玩家"),
        Array(703001200, "适合 160级以上 的玩家")
        );

var lmaps = Array(500000000,
        702000000,
        700000000,
        600000000,
        540000000,
        800000000,
        701000000,
        702100000,
        550000000
        );//旅游地图部分

var tiaotiaomaps = Array(
        Array(100000202,"射手跳跳"),
        Array(220000006,"玩具城跳跳"),
        Array(280020000,"火山的心脏"),
        Array(109040001,"共4阶段"),
        Array(910130000,"忍苦树林"),
        Array(109030001,"上楼找出口"),
        Array(109040001,"高地第1阶段"),
        Array(910360000,"地铁B1"),
        Array(910360100,"地铁B2"),
        Array(910360200,"地铁B3")
        ); 

var a = 0;
var selects = 0;
var MapType;

function start() {
    a = -1;
    action(1, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else {
			cm.dispose();
			return;
        }
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple(head + "#h0#，这里可以连接到各个地方：" + (isopenvip ? "#r(VIP免费)#b" : "" ) + "\r\n#L0# "+icon+" 城镇地图。\r\n#L1# "+icon+" 练级好去处。\r\n#L2# "+icon+" 旅游地图。\r\n#L3# "+icon+" 休闲跳跳地图。")
        } else if (a == 1) {
            var text = head + "请选择你要接连的地方：\r\n#b"
            switch (selection) {
                case 0:
                    for (var i = 0; i < townmaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + townmaps[i] + "# (金币  500)\r\n"
                    }
                    MapType = 0
                    needMoney = true;
                    break;
                case 1:
                    for (var i = 0; i < monstermaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                    }
                    MapType = 1
                    break;
                case 2:
                    for (var i = 0; i < lmaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + lmaps[i] + "#  (金币  500)\r\n"
                    }
                    MapType = 2
                    needMoney = true;
                    break;
                case 3:
                    for (var i = 0; i < tiaotiaomaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + tiaotiaomaps[i] + "# (" + tiaotiaomaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
                    break;
            }
            cm.sendSimple(text);
        } else if (a == 2) {
            selects = selection;
            cm.sendYesNo(head + "在这里的事情办完了吗？确定要去你像要去的地方了吗？");
        } else if (a == 3) {
            if (cm.getVip() == 0 || !isopenvip) {
				if (cm.getMeso() < 500) {
					cm.sendOk(head + "对不起，你的金币不足。\r\n需要500金币才能进行。");
					cm.dispose();
					return;
				} else {
					cm.gainMeso(-500);
				}
			}

			switch (MapType) {
				case 0:
					cm.warp(townmaps[selects]);
					break;
				case 1:
					cm.warp(monstermaps[selects][0]);
					break;
				case 2:
					cm.warp(lmaps[selects]);
					break;
				case 3:
					cm.warp(tiaotiaomaps[selects][0]);
					break;
			}

            cm.dispose();
        }//a
    }//mode
}//f