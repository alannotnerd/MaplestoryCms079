/* ==================
 脚本类型:  NPC	    
 脚本作者：故事丶     
 联系方式：840645183  
 =====================
 */
    function enter(pi) {
	var nextMap = 922010800;
	var eim = pi.getPlayer().getEventInstance()
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("st00");
	var avail = eim.getProperty("stage7status");
	if (avail == null) {
		pi.getPlayer().dropMessage(5, "现在还不能进入下一阶段。");
		return false;	}
	else {
		if (eim.getProperty("s8start") == null)
                eim.setProperty("s8start", new java.util.Date().getTime());
                pi.getPlayer().changeMap(target, targetPortal);
	pi.removeAll(4001022);
		return true;
	}
}

