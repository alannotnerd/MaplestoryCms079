var status = 0;
var typed=0;

//第日进入次数
var coon=5;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("#d女皇希纳斯手下部下众多,如今需要勇敢的冒险家前往消灭他们,众多将领等待消灭，共 #r20#k #d波怪物。#k\r\n#e#d评分 #bB#k#n #r(每人将获得 1 个#t2431716# 1 个#t5062002#)\r\n#e#d评分 #bA#k#n #r(每人将获得 3 个#t2431716# 3 个#t5062002#)\r\n#e#d评分 #bF#k#n #r(每人将获得 5 个#t2431716# 5 个#t5062002#)\r\n#e#d评分 #bS#k#n#r (每人将获得 10 个#t2431716# 10 个#t5062002#)\r\n#r#e注意事项#k#n：该副本怪物血量较多，建议多人组队消灭。\r\n#e#r副本要求#k#n：#b建议180级以上，自身HP大于10万。#k\r\n#r#e副本提示#n#k：如果中途掉线都是可以重新开始不算次数的\r\n如果你今天领取过奖励后,再进入是不能再领取奖励的");					
		} else if (status == 1) {
		 if (cm.getLevel() <= 179) {
cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n\r\n你好像还不具备以下条件。我不能送你们进入。\r\n\r\n\r\n- #e等级需求#n：180级以上");
cm.dispose();
}
/*else if (cm.getHour() != 12 && cm.getHour() != 13 && cm.getHour() != 14 &&cm.getHour() != 20 && cm.getHour() != 22 &&cm.getHour() != 21){
cm.sendOk("时间没到,小试牛刀场地暂未准备好。"); 
cm.dispose();
}*/
else if (cm.getParty() == null) {
cm.sendOk("#e#r你好像还没有一个队伍,我是不能送你进去的."); 
cm.dispose();
}
else if(!cm.isLeader()){
cm.sendOk("#e#r请队长来跟我谈话.");
cm.dispose();
}
 else if (cm.getMap(940021000).getCharactersSize() > 0) { // Not Party Leader
cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
cm.dispose();
}
else if (cm.getParty().getMembers().size() < 1){
cm.sendOk("至少有 #r3#k 名队员"); 
cm.dispose();
}
else if (cm.getBossLog("szsl") >= coon){
cm.sendOk("您今天已经进入过的次数已用完。"); 
cm.dispose();
}
else if (cm.getEventCount("szsl") >= coon){
cm.sendOk("您今天已经进入过的次数已用完。"); 
cm.dispose();
}else{
var em = cm.getEventManager("szsl");
if (em == null) {
cm.sendOk("出错啦,请联系GM.");
cm.dispose();
}else{
var party = cm.getParty().getMembers();//获取整个队伍角色信息
var it = party.iterator();
var next = true;
em.startInstance(cm.getParty(), cm.getChar().getMap());
}
cm.setBossLog("szsl");
cm.worldSpouseMessage(0x17,"『小试牛刀』" + " : " + "恭喜" + cm.getChar().getName() + ",和他的队友开始了小试牛刀，祝他取得好的成绩");
//cm.sendServerNotice(7, "『神之试练』" + " : " + "玩家 " + cm.getChar().getName() + " 和他的队友开始了神之试炼，祝他取得好的成绩");
cm.dispose(); 
                }
		}
	}
}
