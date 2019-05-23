/* Author: aaroncsn(MapleSea Like)
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.sendNext("还挺胆小的哦～ 不相信我吗？");
			cm.dispose();
			return;
		}
		if (status == 1 && mode == 0) {
			cm.sendNext("是钱不够吗？");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(status == 0){
			cm.sendAcceptDecline("我不知道是谁叫你来的，不过来的得很正确～ 为了尼哈沙漠中关在香水瓶中的人们，提供回到金银岛的特殊路线。忘记飞行船吧～ 在那拥挤的飞行船上长时间飞行，不觉得很闷吗？不想使用我提供的特别线路吗？");
		} else if(status == 1){
			cm.sendAcceptDecline("但是需要注意两点。一 这个路线是货物运送路线，不是正式路线，所以不能保证去#r哪个村子。#k 二 因为是为您特别准备的所以比较贵。手续费要#e#b10000金币#n#k。有马上出发的运送线，要乘坐吗？");
		} else if(status == 2){
			cm.sendNext("好，出发～");
		} else if(status == 3){
			if(cm.getMeso() >= 10000){
				cm.gainMeso(-10000);
				cm.warp(towns[Math.floor(Math.random() * towns.length)]);
			} else {
				cm.sendNextPrev("那个，好像钱不够？要去哦起航的话需要#b10000#k金币.");
				cm.dispose();
			}
		}
	}
}