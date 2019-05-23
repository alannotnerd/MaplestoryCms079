//电梯的传送门
//修复

function enter(pi) {
	if(pi.getPlayer().getMapId() == 222020100) {
		if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("elevator").getProperty("isDown").equals("true")) {
			pi.warp(222020110, "sp");
			return true;
		} else {
			pi.playerMessage("现在还不能进去");
			return false;
		}
	} else if(pi.getPlayer().getMapId() == 222020200) {
		if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("elevator").getProperty("isUp").equals("true")) {
			pi.warp(222020210, "sp");
			return true;
		} else {
			pi.playerMessage("现在还不能进去");
			return false;
		}
	} else {
		pi.playerMessage("出现错误。请到论坛和管理员联系");
		return false;
	}
}
