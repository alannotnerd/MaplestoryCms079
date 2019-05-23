/* 
CherryMS LoveMXD
*/
var status = 0;
var mainmenu = "你想做什么呢？\r\n#L0##b进入订婚场地#l\r\n#L1#关于订婚#l#l#k";

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
if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//订婚判断
cm.sendOk("我喜欢结婚。。")
cm.dispose();
}else if(cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//订婚判断
cm.sendOk("我喜欢结婚。。")
cm.dispose();
}else{
		cm.sendSimple(mainmenu);
}
	} else if (status == 1) {
		if (selection == 0) { // 我要怎么订婚
			status = 1;
if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//订婚判断
cm.sendOk("呵呵，开心吧？")
cm.dispose();
}else if(cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//订婚判断
cm.sendOk("呵呵，开心吧？")
cm.dispose();
}else if(cm.getChar().getGender() == 0) {//如果是男生
                                          cm.sendNext("呀呀。。想到订婚场地吗？\r\n好的。点下一步输入你女朋友的角色号码。#b\r\n聊天栏内输入：@online 即可看到。")
}else if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)) {//订婚判断
cm.sendOk("订婚很开心吗？")
cm.dispose();
}else if (cm.MissionStatus(cm.getPlayer().getId(),1017,0,4)) {//女方请帖判断
status = 4;
cm.sendNext("等你很久了呢。。")
}else if(cm.getChar().getGender() == 1) {//如果是女生
                                          cm.sendOk("请让你的男朋友和我对话。")
cm.dispose();                     
}else{
cm.sendOk("未知原因不能进入。请和管理员联系")
cm.dispose();
}
		} else if (selection == 1) { // 我要怎么结婚
			cm.sendOk("和#p9201005#对话就可以知道怎么订婚了。其实很简单的。跟#p9201014#对话就知道怎么做了。她人很好的。。")
cm.dispose();
		}
	} else if (status == 2) { // 我要怎么结婚
		cm.sendGetText("请输入对方的角色号码:");
	} else if (status == 3) { //我要怎么结婚
		if(cm.getPlayerOnline(cm.getText()) == false){
cm.startPopMessage("对方没有在线或者不在一个频道。\r\n请重试后再试。");
cm.dispose();
}else if (cm.getSameMap(cm.getText()) == false){
cm.startPopMessage("对方没有不与您同个地图。\r\n请重试后再试。");
cm.dispose();
}else{
cm.warp(680000100)
cm.MissionMake(cm.getText(),1017,0,0,0,0);
cm.startPopMessage("已经向对方发送了信息。\r\n在订婚场地内稍等片刻");
cm.startPopMessage(cm.getText(),"您的男朋友已经进入订婚场地\r\n请及时进入。")
cm.dispose();
}
	} else if (status == 4) {
		cm.dispose();
	} else if (status == 5) {
		cm.warp(680000100)
                            cm.dispose();
	}
	}
}
