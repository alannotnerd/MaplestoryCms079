/* 
CherryMS LoveMXD
*/
var status = 0;
var mainmenu = "你想做什么呢？\r\n#L0##b我要怎么订婚#l\r\n#L1#我要怎么结婚#l\r\n#L2#出现不在本地图怎么办？#l\r\n#L3#出现对方不在线怎么办？#l\r\n#L4#访客怎么计算的？#l\r\n#L5#结婚需要组队形式吗？#l\r\n#L6#结婚必须要一男一女吗？#l\r\n#L7#结婚组队任务怎么做？\r\n#L8#我要怎么设置访客密码？#l#k";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	} else if (status == 2 && mode == 0) {
		cm.sendNext("如果你有什么需要帮助的话随时都可以来找我。我很乐意为你解答。");
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendSimple(mainmenu);
	} else if (status == 1) {
		if (selection == 0) { // 我要怎么订婚
			status = -1;
			cm.sendNext("订婚的话你可以找到#b#p9201013##k进入白色礼堂。跟#b#p9201014##k对话成功进行订婚仪式。");
		} else if (selection == 1) { // 我要怎么结婚
			cm.sendNext("订婚仪式结束后就可以到#p9201002#处进入圣枫殿堂。");
		} else if (selection == 2) { // 出现不在本地图怎么办？
			status = 5;
			cm.sendNext("这你不用担心。只要让对方进入和你一样的地图就可以了。");
		} else if (selection == 3) { 
			status = 8;
			cm.sendNext("这你不用担心。只要让对方进入和你一样的频道就可以了。");
		} else if (selection == 4) { 
			status = 11;
			cm.sendNext("为了不打扰您的结婚气氛，访客是必须要输入您的访客密码才能进入的。");
		} else if (selection == 5) { 
			status = 14;
			cm.sendNext("结婚是不需要组队形式的。不过在后期的结婚组队任务中是必须要以组队的形式来完成他。");
		} else if (selection == 6) { 
			status = -1;
			cm.sendNext("结婚是必须要一男一女的。男男，女女结婚形式将在后期推出。");
cm.dispose();
		} else if (selection == 7) {
			status = -1;
			cm.sendNext("为了让岛民体验更加的结婚气氛。组队任务正在筹备当中。");
		}else if (selection == 8){//我要怎么设置访客密码？
                                         cm.sendNext("到#b#p9201013##k处设置您的访客密码。")
cm.dispose();
}
	} else if (status == 2) { // 我要怎么结婚
		cm.sendNextPrev("进入后和#p9201014#对话查看访客人数。。在规定内必须要有5位访客才能正常结婚。");
	} else if (status == 3) { //我要怎么结婚
		cm.sendNextPrev("访客人数到达一定数量后，在和#p9201002#对话。就可以结婚了。");
	} else if (status == 4) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 5) {
		cm.sendNext("互相爱戴的人应该在一起不是吗？？");
	} else if (status == 6) { // 出现不在本地图怎么办？
		cm.sendNextPrev("互相爱戴的人应该在一起登记订婚不是吗？？");
	} else if (status == 7) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 8) { 
		cm.dispose();
	} else if (status == 9) { 
		cm.sendNextPrev("互相爱戴的人应该在一起不是吗？？");
	} else if (status == 10) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 11) {
		cm.sendNext("为了不打扰您的结婚气氛，访客是必须要输入您的访客密码才能进入的。");
	} else if (status == 12) {
		cm.sendNextPrev("在这重要的一天被打扰不是很扫兴吗？");
	} else if (status == 13) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 14) { 
		cm.dispose();
	} else if (status == 15) { 
		cm.sendNextPrev("但是。在订婚中您要输入对方的角色号码才能登记成功。");
	} else if (status == 16) { 
		cm.sendNextPrev("脱离老套的结婚方式不是很好吗？");
	} else if (status == 17) { 
		cm.sendNextPrev("对了，结婚后还有家庭经验系统，完成一定数量的结婚组队任务或者完成某种制定的任务就能积累家庭经验。");
	} else if (status == 18) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 19) {
		cm.sendNext("结婚是必须要一男一女的。男男，女女结婚形式将在后期推出。");
	} 
	}
}
