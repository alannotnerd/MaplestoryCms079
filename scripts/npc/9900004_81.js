var 聊天 = "#fUI/StatusBar/BtChat/normal/0#";
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
			text += "\t\t\t  #e欢迎来到#r明星冒险岛 #k!#n\r\n\r\n"
            text += "#r本服充值指南：\r\n\r\n"//3
            text += "#r1.本服的赞助比例为： #b1：150#r（即10RMB=1500点卷）\r\n\r\n"//3
            text += "#r2.本服不私下出售任何物品礼包、就算你再土豪，你都无法通过GM获得面板#l\r\n\r\n"//3
            text += "#r3.本服需要特别注意的地方：#l\r\n#b首次充值一次性达到100RMB，可获得100W金币的奖励（限定每个账号领取一次）\r\n"//3
            cm.sendOk(text);
		    cm.dispose();
		}
    }
}


