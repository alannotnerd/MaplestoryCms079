/* 
CherryMS LoveMXD
非同意内禁止转载
CherryMS.cn
脚本类型：炎术士转职
*/
var status = 0;
var job;
var name = "炎术士";
var name1 = "烈之骑士";

importPackage(net.sf.cherry.client);

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
			cm.sendNext("如果你有什么事的话可以再来找我。");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
											  if(true){
                                          cm.sendOk("想成为骑士团吗？你可以到勇士部落邮递员转职。");
                                          cm.dispose();
}else 
                                           if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NOBLESSE)||cm.getJob().equals(net.sf.cherry.client.MapleJob.BEGINNER)) {//如果是骑士团的初心者职业
if (cm.getLevel() >= 10){//如果大于或者等于10登记。
cm.setNPC_Mode(1)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else{
cm.sendOk("骑士团的生活还不错吧。。继续勇敢充满信心，信念的一直往前走吧！")
}
}else if (cm.MissionCanMake(1006)) { //【转职】魂骑士团长
cm.setNPC_Mode(4)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else if (cm.MissionCanMake(1005)) { //【转职】魂骑士的第三次转职任务
cm.setNPC_Mode(3)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else if (cm.MissionCanMake(1004)) { //【转职】魂骑士的第二次转职任务
cm.setNPC_Mode(2)
cm.openNpc(1104101)
cm.setNPC_Mode(0)
}else{
cm.sendOk("骑士团的生活还不错吧。。继续勇敢充满信心，信念的一直往前走吧！")
}
                                          } else if (status == 1) {//选项部分
			
		}

	}
}
