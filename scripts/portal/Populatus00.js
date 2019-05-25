
/* 
    闹钟脚本 
   亲亲嘴冒险  芯碎王子 修改。。
    非同意内禁止转载 
*/ 

importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools); 

function enter(pi) { 
 var nextMap = 220080001; 
 var Populatus00Map = pi.getC().getChannelServer().getMapFactory().getMap(220080001); 
 var mapobjects = Populatus00Map.getMapObjects(); 
 var boss = null; 
 var player = null; 
 var iter = mapobjects.iterator(); 
 while (iter.hasNext()) { 
   o = iter.next(); 
   if (o.getType() == MapleMapObjectType.MONSTER){ 
    boss = o; 
   } 
   if (o.getType() == MapleMapObjectType.PLAYER){ 
    player = o; 
   } 
  } 

 if (pi.getBossLog('Populatus00')>=5) { 
  sendMessage(pi,"每天只能挑战5次！"); 
  return false;
  }
  
if(player != null && boss != null){
	sendMessage(pi,"对抗闹钟还在进行中。。。"); 
  	return false; }


 if (Populatus00Map.getCharacters().isEmpty() && pi.getBossLog('Populatus00') < 5) { 
  Populatus00Map.resetReactors(); 
 } 
  pi.getC().getChannelServer().getMapFactory().getMap(220080001).clearMapTimer(); 
  pi.getC().getChannelServer().getMapFactory().getMap(220080001).killAllMonsters(); 
  pi.setBossLog('Populatus00'); 
  pi.warp(220080001);  
  return true; 
   
} 
function sendMessage(pi,message) { 
 pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, message)); 
} 