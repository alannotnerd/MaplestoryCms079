/*
 笔芯制作★风云工作室所有
 完成时间：2013年8月21日 09:55:38
 脚本功能：整形医院跳转
 */

var a = 0;


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
            cm.sendSimple("欢迎来到整形医院，请问你想要做什么？\r\n#b#L1# 皇家美发#l  #L3# 皇家整形#l  #L2# 护肤中心#l");
        } else if (a == 1) {
            if (selection == 1) {
		cm.dispose();
                cm.openNpc(9900003, 901);
            }else if (selection == 2){
		cm.dispose();
                cm.openNpc(9900003, 902);
            }else if (selection == 3){
		cm.dispose();
                cm.openNpc(9900003, 903);
            }
        }//a
    }//mode
}//f