/* Cygnus revamp
	Noblesse tutorial
	Kinu + Hawkeye (1102006+1101006)
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
	  qm.sendNext("首先针对耶雷弗来做个介绍。耶雷弗是在女皇的魔法笼罩之下的漂浮岛。所以虽然飘浮在这里，但是却扮演着枫之谷往返之船的角色。p.");
	} else if (status == 1) {
      qm.sendNextPrev("现在的状况不太好，留在这里注视着黑魔法师的一举一动，同时培养对抗他的力量。");
	} else if (status == 2) {
      qm.sendNextPrev("是，还有…皇家骑士团分为5个组织，分别可以使用光、火、风、雷电、黑暗的精灵的力量。由5名的骑士团长带领着皇家骑士团…？?\r\n不是啊，鹰眼。怎麽又来我的课程了呢？");
	} else if (status == 3) {
	  qm.sendNextPrev("当然是很好奇新进的骑士团员有没有好好接受教育啊。不是因为很憧憬雷电骑士团长鹰眼，才想成为骑士的吗？.", 1,0,1101007);
	} else if (status == 4) {
	  qm.sendNextPrev("鹰眼，别为难他了。");
	} else if (status == 5) {
	  qm.sendNextPrev("奇努，首先好像应该向新进骑士团员介绍这个身体才对啊。从打招呼开始吧，如何？", 1,0,1101007);
	} else if (status == 6) {
	  qm.sendNextPrev("鹰眼，我们打了招呼就要走了#h0#.这位是雷电之骑士团长，鹰眼。先打声招呼吧。");
	} else if (status == 7) {
	  qm.forceStartQuest();
	  qm.dispose();
	}
}

function end(mode, type, selection) {
if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
	    qm.sendNext("我是雷电之骑士团长，叫做鹰眼。听过我的名字吗？这个身体非常活跃，这一点你是知道的吧？");
	} else if (status == 1) {
	    qm.sendNextPrev("嗯？不，我还…", 3);
	} else if (status == 2) {
	    qm.sendNextPrev("不要不好意思了。见到平常向往的对象，会不知所措是当然的。你对雷电之骑士、闪雷悍将感兴趣吗？对了，你说你叫做什麽呢？");	
	} else if (status == 3) {
	    qm.sendNextPrev("鹰眼，新骑士团候补生名字是#h0#。现在打过招呼了，走吧。", 1,0,1102006);
	} else if (status == 4) {
	    qm.sendNextPrev("那个我日後会慢慢教育的。那麽请慢走吧。");
	} else if (status == 5) {
	    qm.sendNextPrev("刚刚说到哪了呢？新进骑士团员教育结束後，会受到任命成为修练骑士，到时候也能够决定自己未来的前途。光之骑士、火之骑士、风之骑士、黑暗之骑士、雷电之骑士…选择一条适合你自己的道路。", 1,0,1102006);
	} else if (status == 6) {
	    qm.sendNextPrev("骑士团的任务就是守护女皇，打败黑魔法师维持枫之谷的和平。除此之外，还有跟身为黑魔法师追踪者的黑色翅膀打交道的任务、情报蒐集…等，很多的事情要做呢。", 1,0,1102006);	
	} else if (status == 7) {
	    qm.sendNextPrev("今天的课程就到这里。下一堂课是…你去问问奇慕吧。", 1,0,1102006);	
    } else if (status == 8) {
	  qm.completeQuest();
	  qm.dispose();		
	}
  }
}