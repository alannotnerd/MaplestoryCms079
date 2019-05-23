/* NPC版权: 彩云岛
	NPC名称: 		金利奇
	MAP(地图ID): 	        (910000000)
	NPC类型: 		对话
   制作人：故事丶
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("有什么事吗？\r\n\r\n#b#L0#你是谁？#l\r\n#L1#我想和你交易。#l");
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.sendNext("不认识我吗？我是世界第一富翁金利奇。");
            break;
        case 1:
            cm.sendNextPrev("我通过贸易赚了很多钱。如果你有什么值钱的东西，可以随时来找我。");
            break;
        }
        cm.dispose();
    }
}
