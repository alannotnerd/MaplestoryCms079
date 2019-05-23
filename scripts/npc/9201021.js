/* NANA
结婚欢迎人员
*/
var status = 0;
var main = "你想做什么呢？#b\r\n#L0#照相拍好了，我想前进下一关。"
var main1 = "有什么需要帮助您的吗？#b\r\n#L1#我现在需要做什么？\r\n#L2#我收集好了礼物盒"
var men =1;

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
			cm.sendNext("嗯。。如果有什么事的话可以来找我。我在这里等你。");
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                                          if (cm.getPlayer().getMap().getId() == 680000300) {
                                          cm.sendSimple(main);
                                          }else{
			cm.sendSimple(main1);
                                          }
		} else if (status == 1) {
			if (selection == 0) { // 照相拍好了，我想前进下一关。
				if (cm.MissionStatus(cm.getPlayer().getId(),9201014,999,0,0)) {//女生的订婚好了
                                                          cm.sendYesNo("真的想前往下一关吗？前进下一关的时候该地图的所有玩家都会被传送。")
}else{
cm.sendOk("请新娘跟我讲话。")
cm.dispose();
}
			} else if (selection == 1) { // 我要和爱人一起进入殿堂
                                                status = 2;
                                                cm.sendNext("看到我右边的礼物箱了吗？哈哈。。只要你帮我拿到：#b\r\n\r\n100个#t4031306#\r\n100个#t4031307#\r\n\r\n#k我就可以把你送到礼物盒里面。")
                                          }else if (selection == 2){
                                               if (cm.MissionStatus(cm.getPlayer().getId(),9201021,0,0,4)){ 
                                               status = 3;
                                               cm.sendSimple("请选择你要给我哪样物品:#b\r\n#L0#我要给你#t4031306#。\r\n#L1#我要给你#t4031307#。");
}else{
                                               cm.sendOk("请重新和我对话，我得准备一下。。")
                                               cm.TaskMake(9201021,2)
                                                cm.MissionMake(cm.getPlayer().getId(),9201021,0,0,0,0)//配合高级函数，以免重复接。
cm.dispose();
}
}
}else if (status == 2){
if(mode == 0){
cm.sendOk("如果你有什么事情可以来找我。")
}else if (mode == 1){
cm.warp(680000400)
}
}else if(status == 3){
cm.sendOk("我会为你保管你交给我的物品。")
}else if (status == 4){
if (selection == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),9201021,0,0,4)){
cm.sendGetText("请输入你要交出几个:");
}else{
cm.MissionMake(cm.getPlayer().getId(),9201021,0,0,0,0)//配合高级函数，以免重复接。
cm.sendOk("请重新和我对话，我得准备一下。。")
cm.TaskMake(9201021,2)
}
}else if (selection == 1){
cm.sendOk("s")
}
}else if (status == 5){
if (cm.haveItem(4031306,cm.getText())){
cm.sendOk("的")
}else{
cm.sendOk("对不起，你的物品没有达到你所输入的数量。")
}
}
}
}