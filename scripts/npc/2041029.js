/*	
	CherryMS LoveMXD
*/

function start() {
	if (cm.MissionStatus(2041029,999,0,4)) {//检查是否接过任务了
              if (cm.MissionStatus(2041029,999,0,0)) {//检查任务是否完成了
              cm.sendOk("非常感谢你的帮助！四次元的空间已经为你而开启！\r\n#p2041029#非常高兴。");
              } else if (cm.haveItem(4005000)){//检测力量水晶是否大于3或者等于3
              cm.sendOk("哇！！力量水晶！！充满力量的力量水晶！！你居然把他带来了！！真的很不可思议！！好好好！！我这就给你打开通往#b艾琳森林#k的时空大门！！！");
              cm.MissionFinish(2041029,999);
              cm.gainItem(4005000,-1);
}else{
              cm.sendOk("还没有帮我收集到1个#b力量水晶#k吗？？没有这个东西可启动不了连接往#b艾琳森林#k的时空门呀。。。");
              }
}else{ //如果任务还没有接
cm.sendOk("#b "+cm.getchar+" #k你想开启时光之门吗？？好。我接受你的请求。开启时空之门需要1个#b力量之石#k，收集到了再来找我吧。");
cm.MissionMake(2041029,999,0,0,0);
}


}
