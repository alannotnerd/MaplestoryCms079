
/* 
    暴力熊脚本 
    By 51mxd   oung
    非同意内禁止转载 
*/ 

importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools); 

function enter(pi) { 
 var nextMap = 280030000; 
 var zakumMap = pi.getC().getChannelServer().getMapFactory().getMap(280030000); 
 var mapobjects = zakumMap.getMapObjects(); 
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
if (pi.getPlayer().getClient().getChannel() !=2) 
{
	sendMessage(pi,"扎昆大怪物只在第二频道召唤。");
	return false;
}

if (!pi.haveItem(4001017))
{ 
  	sendMessage(pi,"你没有召唤扎昆用的你没有火焰的眼,请检查..."); 
	return false; 
}

if(player != null && boss != null)
{
	sendMessage(pi,"对抗大BOSS正在进行中。。。"); 
  	return false; 
}

 if (pi.getBossLog('zakum')>=5)
{ 
  	sendMessage(pi,"每天最多只能挑战5次扎昆,您今天已经无法再进入"); 
  	return false; 	
} 

 if (zakumMap.getCharacters().isEmpty() && pi.getBossLog('zakum') < 5)
{ 
  	zakumMap.resetReactors(); 
} 
  pi.getC().getChannelServer().getMapFactory().getMap(280030000).clearMapTimer(); 
  pi.getC().getChannelServer().getMapFactory().getMap(280030000).killAllMonsters(); 
//pi.setBossLog('zakum'); 
  pi.warp(211042400);  
  return true; 
   
} 
function sendMessage(pi,message)
{ 
	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, message)); 
} 