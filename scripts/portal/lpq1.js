/* ==================
 脚本类型:  NPC	    
 脚本作者：故事丶     
 联系方式：840645183  
 =====================
 */

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance()
	var target = eim.getMapInstance(922010200);
	if (eim.getProperty("stage1status") != null) {
		pi.getPlayer().changeMap(target, target.getPortal("st00"));
	pi.removeAll(4001022);
		return true
	} else 
	        pi.getPlayer().dropMessage(5, "现在还不能进入下一阶段。");
               return false;	
}
