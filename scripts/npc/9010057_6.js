/*
 笔芯制作★风云工作室所有
 完成时间：2013年10月17日 09:37:20
 脚本功能：全服排名系统
 */

var a = 0;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var List = Array(
        Array("爆率查询", 5, 0),
        Array("银行管理", 14, 0),
        Array("整形医院", 9, 0)
	//Array("武器破功", 1000, 0),
	//Array("蜡笔潜能", 1001, 0)
		//Array(" 答  题 ", 604, 0),
		//Array("材料制作", 605, 0),
		//Array("全属装备", 606, 0)
        )
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/Basic.img/BtMin2/normal/0#";

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
            var x = 0;
            var text = head + "#h0#。你好，要什么帮助？\r\n\r\n#b";
            for (var i = 0; i < List.length; i++) {
				if (i != 0 && i%3 != 0) {
					text += "  ";
				}
                if (x == 2) {
                    text += "#L" + i + "# " + icon + " " + List[i][0] + "#l\r\n";
                    x = 0;
                } else {
                    text += "#L" + i + "# " + icon + " " + List[i][0] + "#l";
                    x = x + 1
                }
            }
            cm.sendSimple(text)
        } else if (a == 1) {
            if (selection == 8) {
                cm.sendStorage();
                cm.dispose();
            } else {
                var sel = List[selection][1];
		cm.dispose();
		if(sel != 9) {
                    cm.openNpc(9010057, sel)
		} else {
		    cm.warp(100000104);
		}
                //cm.setNPC_Mode(0)
            }
        }//a
    }//mode
}//f