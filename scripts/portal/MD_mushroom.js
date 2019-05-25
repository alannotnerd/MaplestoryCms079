/*
	亲亲嘴冒险专用脚本
	磨菇洞打枫叶水晶球活动脚本
	by 芯碎王子
*/ 

var baseid = 105050100;
var dungeonid = 105050101;
var dungeons = 5;

function enter(pi) {
	
	if (pi.getMapId() == baseid) {
		if(pi.getBossLog('MogoQuest')< 1){
			pi.playerMessage(5, "请先去找星缘对话....");		
			return false;
		}else if(!pi.haveItem(5220001)){
			pi.playerMessage(5, "您没有活动门票,请从商城购买...");		
			return false;
		}else if(pi.getBossLog('MogoRoom') >= 10){
			pi.playerMessage(5, "一天只能进入10次，你今天已经无法再进入...");		
			return false;
		}else{

	  	for(var i = 0; i < dungeons; i++) {
				if (pi.getPlayerCount(dungeonid + i) == 0) {
		    	pi.warp(dungeonid + i, 0);
		    	pi.gainItem(5220001,-1);
		    	pi.setBossLog('MogoRoom');
		    	pi.getC().getChannelServer().getMapFactory().getMap(dungeonid + i).clearMapTimer();
		    	pi.getC().getChannelServer().getMapFactory().getMap(dungeonid + i).addMapTimer(300,105040300);
		    	return true;
				}
	  	}	
		}
	}
	else {
		pi.warp(baseid, "MD00");
	}
	return true;
}
