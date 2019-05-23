/* Cygnus revamp
	Noblesse tutorial
	Neinheart + other chief knights
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
		qm.sendNext("你好，#b#h0##k。欢迎你加入皇家骑士团。我的名字是#p1101002#波恩鲁宾司坦。是女皇的策士。以後会常常见面的，应该会要记着名字的。呼呼…");
	} else if (status == 1) {
	    qm.sendNextPrev("但是，这里是怎麽回事呢？#h0#？现在好像正在认真修练呢。");
	} else if (status == 2) {
      qm.sendNextPrev("啊，我…那个…鸟忽然地出现，我就跟着来看看…");
	} else if (status == 3) {
	   qm.sendNextPrev("哈哈哈哈。#h0#，比看起来的样子还要有幽默感啊。是无法忘怀刚刚见到我的帅气模样才跟着来的吗？", 1,0,1101007);
	} else if (status == 4) {
        qm.sendNextPrev("闹哄哄的呢。和女皇的会面就到此为止，回去吧.", 1,0,1101006);
	} else if (status == 5) {
	    qm.sendNextPrev("#h0#，可以见到你真的太高兴了。那麽，下次再见了。希望你能成为勇敢又贤明的骑士…，", 1,0,1404008);
	} else if (status == 6) {
        qm.sendNextPrev("虽说你是骑士团的ㄧ员，但也还不是骑士。连修练骑士都还不是，就更别说正式的骑士了。但是你觉得就这麽回去的话，也没关系吗？只要再更集中精神练习就可以了。");
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
	    qm.sendNext("不用太在意那因哈特的话。#h0#，在受命担任修练骑士之前，不只是和了不起的鹰眼，还有皇家骑士团长们见面的感觉如何啊？要不要给你一点自我介绍的时间啊？#h0#，自我介绍吧~！");
	} else if (status == 1) {
	    qm.sendNextPrev("你好，我是#h0#。受女皇之命来到这里。想要成为一名勇敢的骑士，打败黑魔法师，守护枫之谷！");
	} else if (status == 2) {
	    qm.sendNextPrev("是个梦想非常坚定的小子啊。希望你能够成为一个了解自己的事并且有能力解决的人。不要惹那些麻烦的事端。我是黑暗骑士团长，伊卡勒特。", 1,0,1101006);	
	} else if (status == 3) {
	    qm.sendNextPrev("我是火之骑士团长，奥兹。欢迎你来到耶雷弗。 但你是从哪里来的呢？", 1,0,1102109);
	} else if (status == 4) {
	    qm.sendNextPrev("奥兹，好奇的事情可真多啊。从你身上感觉到了舒服的风呢。我是风之骑士团长，伊丽娜。祝你好运。", 1,0,1102110);
	} else if (status == 5) {
	    qm.sendNextPrev("我是光之骑士团长，米哈逸。不要太松懈，要努力进行自我修练。要有身为骑士团的骄傲。#h0#，迟早会再见面的，打招呼之类的话就到这里…你快进去吧。", 1,0,1101003);
	} else if (status == 6) {
	    qm.sendNextPrev("知道了，米哈逸。#h0#。那麽，因为有事要忙，就不聊了。我们走吧?认真修练吧。");	
	} else if (status == 7) {
	  qm.completeQuest();
	  qm.dispose();		
	}
  }
}