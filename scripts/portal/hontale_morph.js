
/* 
   黑龙王脚本 
    By 51mxd  芯碎王子
    非同意内禁止转载 
*/ 

importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools); 

function enter(pi) { 
 var nextMap = 240060200; 
 var hontaleMap = pi.getC().getChannelServer().getMapFactory().getMap(240060200); 
 var mapobjects = hontaleMap.getMapObjects(); 
 var boss = null; 
 var player = null; 
 var iter = mapobjects.iterator(); 
 while (iter.hasNext()) 
{ 
	o = iter.next(); 
	if (o.getType() == MapleMapObjectType.MONSTER)
	{ 
		boss = o; 
	} 
	if (o.getType() == MapleMapObjectType.PLAYER)
	{ 
    		player = o; 
	} 
}

if(player != null && boss != null)
{
	sendMessage(pi,"对抗大BOSS正在进行中。。。"); 
	pi.warp(240040700);
  	return false; 
}

 if (pi.getBossLog('hontale')>=10)
{ 
  	sendMessage(pi,"每天最多只能挑战10次暗黑龙王,您今天已经无法再进入"); 
	pi.warp(240040700);
  	return false; 	
} 

 if (hontaleMap.getCharacters().isEmpty() && pi.getBossLog('hontale') < 10)
{ 
  	hontaleMap.resetReactors(); 
} 
  pi.getC().getChannelServer().getMapFactory().getMap(240060200).clearMapTimer(); 
  pi.getC().getChannelServer().getMapFactory().getMap(240060200).killAllMonsters(); 
  pi.setBossLog('hontale'); 
  pi.warp(240060200);  
  sendMessage(pi,"您已进入了暗黑龙王地图，请用普通攻击打碎右上角的紫色水晶"); 
  return true;    
} 
function sendMessage(pi,message)
{ 
	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, message)); 
} 
