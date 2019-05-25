/* NANA
结婚欢迎人员
*/
var status = 0;
var menu = "我是殿堂的策划人员 #b\r\n\r\n#L0# 我想查看当前访客数量\r\n#b#L1# 我要和爱人一起进入殿堂"
var men = 0;

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
                                          if (cm.getPlayer().getMap().getId() == 680000100) {
                                          cm.setNPC_Mode(1)
                                          cm.openNpc(9201014)
cm.setNPC_Mode(0)
                                          }else if (cm.getPlayer().getMap().getId() == 680000200) {
			cm.sendSimple(menu);
                                          }else{
cm.sendOk("今天天气很好不是吗？")
}
		} else if (status == 1) {
			if (selection == 0) { // 我想查看当前访客数量
				if(cm.countRemoteMapPlayers(680000210) >= men ){//如果当前地图的人数大于或者等于5时
                                                        cm.sendOk("您可以进入殿堂举办婚礼了。\r\n目前访客人数为#b "+cm.countRemoteMapPlayers(680000210) +" #k人。")
                                                        cm.dispose();
                                                        }else{
                                                        cm.sendOk("对不起。访客还没有达到系统承认的数字。\r\n目前访客人数为#b "+cm.countRemoteMapPlayers(680000210) +" #k人。")
                                                        cm.dispose();
                                                        }
			} else if (selection == 1) { // 我要和爱人一起进入殿堂
                                                        if (cm.getParty() == null) { // 没有组队
                                                        cm.sendOk("组队后再试。")
}else if (!cm.isPartyLeader()){
cm.sendOk("请组队长和我谈话。")
}else if(cm.getChar().getGender() == 1) {//如果是女
cm.sendOk("请让男生当队长。")
                                         }else if(cm.countRemoteMapPlayers(680000210) >= men ){//如果当前地图的人数大于或者等于5时
                                                        cm.warpParty(680000210)
                                                        cm.MissionMake(cm.getPlayer().getId(),1028,0,0,0,0);
                                                        cm.MissionMake(cm.getPlayer().getMarriageId(),1029,0,0,0,0);
                                                        }else{
                                                        cm.sendOk("对不起，访客数量还没达到 #b"+ men +" #k 人。请稍后再试。")
                                                        }
		
                                          }
		
}
}
	
}