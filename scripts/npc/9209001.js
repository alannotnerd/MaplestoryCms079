//周末集市欢迎人员
//CherryMS LoveMXD

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("你好，我是周末集市欢迎人员。");
		} else if (status == 1) {
			cm.sendNextPrev("周末集市里面会贩卖很多东西，而这些东西价格会一星期改动一次。");
		} else if (status == 2) {
			cm.sendNextPrev("你们可以按照这些趋势来选择购买哪种物品。");
		} else if (status == 3) {
			cm.sendNextPrev("购买来的物品可以到#p9209000#处出售您在集市里买到的物品。");
		} else if (status == 4) {
			cm.sendNextPrev("您的利益就是从里面的差价，如果有什么问题，可以到官网论坛咨询。");
		} else if (status == 5) {
			if (cm.getDay() == 1 && cm.getDay() == 7) {//判断是否是星期六和星期日
                                          var rand = Math.floor(Math.random() * 4 + 1);
                                                        if (rand == 1){
		                             cm.warp(680100000)
                                                        }else if (rand == 2){
                                                        cm.warp(680100001)
                                                        }else if (rand == 3){
                                                        cm.warp(680100002)
                                                        }else if (rand == 4){
                                                        cm.warp(680100003)
                                                        }else{
                                                        cm.warp(680100003)
}
}else{
cm.sendOk("对不起，集市只在周末开放。")
}
		}
	}
}	
