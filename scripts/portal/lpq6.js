/* ==================
 �ű�����:  NPC	    
 �ű����ߣ�����ؼ     
 ��ϵ��ʽ��840645183  
 =====================
 */

function enter(pi) {
	var nextMap = 922010700;
	var eim = pi.getPlayer().getEventInstance();
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("st00");
	pi.getPlayer().changeMap(target, targetPortal);
	pi.removeAll(4001022);
	return true;
}