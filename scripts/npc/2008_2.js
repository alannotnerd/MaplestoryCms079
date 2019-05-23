/* 
    Made by nana
*/

var status = -1;
var sel = 0;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else 
        if (status == 0) {
            cm.dispose();
        status--;
    }
	if (status == 0) {
		cm.unequip(1142000);
		cm.unequip(1142073);
        cm.sendYesNo("#e#想要体验剧情和任务吗!"); 
    } else if (status == 1) {
			if ((cm.getJob() == 0)&&(cm.haveItem(1142000))) {//冒险家
			cm.dispose();
			cm.warp(4000000,0);
			} else if (cm.getJob() == 2002) {//双弩
			cm.dispose();
			cm.warp(910150000,0);
			} else if (cm.getJob() == 3001) {//恶魔
			cm.dispose();
			cm.warp(931050310,0);
			}/* else if (cm.getJob() == 2003) {//幻影
			cm.dispose();
			cm.warp(915000000,0);
			} */else if ((cm.getJob() == 0)&&(cm.haveItem(1142073))) {//暗影双刀
			cm.dispose();
			cm.warp(103050900,0);
			} else if (cm.getJob() == 3002) {//尖兵
			cm.dispose();
			cm.warp(931050900,0);
			} else if (cm.getJob() == 4001) {//剑豪
			cm.dispose();
			cm.warp(807100010,0);
			} else if (cm.getJob() == 2004) {//夜光
			cm.dispose();
			cm.warp(927020080,0);
			} else {
			cm.dispose();
			cm.warp(50000,0);
			}
		} else {
		cm.dispose();
		cm.warp(50000,0);
	 }
}