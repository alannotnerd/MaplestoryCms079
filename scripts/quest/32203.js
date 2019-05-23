/* RED 1st impact
    The New Explorer
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else 
        status--;
		
	if (status == 0) {
		qm.sendNext("嗨！我是麦，一个有抱负的英雄。我花了四年的时间，但我刚刚完成我的第一年在英雄学校。你必须要有一个新的 #b[旅行]#k!",1);
    } else if (status == 1) {	
        qm.sendNextPrev("一个新的…#b[旅行]?#k 是什么呢?",17);	
	} else if (status == 2) {	
        qm.sendNextPrev("这是我十次考试不及格…哦，好！探险者的人来到枫叶世界来自另一个世界！他们开始他们的旅程就在#b [zealMS岛]#k.",1);		
    } else if (status == 3) {	
	    qm.sendNextPrev("我在…#b[]? #k",17);	
	} else if (status == 4) {	
	    qm.sendNextPrev("你肯定是！我们曾经是一些小岛，但后来的探险家开始出现。现在，我们也有我们自己的厕所！",1);		
	} else if (status == 5) {	
	    qm.sendNextPrev("所以，你的名字是#h0#，对吗？你有两个选择，现在。你可以听一些解释出发，采取一些小的试验，得到一些免费的礼品，并成为全世界我最好的新朋友…",1);		
	} else if (status == 6) {	
	    qm.sendNextPrev("或者你可以传送直镇，但你会错过我的礼物…我会很孤单和悲伤。",1);		
	} else if (status == 7) {
	    qm.sendSimpleS("你说什么?\r\n#b#L0# 我会成为你的朋友，麦！（通过教程和获得免费的设备。）#l\r\n#L1#我不需要你，麦！（跳过教程和传送直镇。）#l#k",1);		
    } else if (status == 8) {
        sel = selection;
	  if (selection == 0) {		
	    qm.sendNext("真的吗？！我会给你一切你需要知道的事情，我保证！",1);	
		qm.forceStartQuest();
		qm.completeQuest();
		qm.gainExp(20);
		qm.dispose();
     } else if (selection == 1) {
		qm.sendNext("我知道你会选择。每个人都总是…我会送你到[zealMS岛]马上希望明年[旅行]将要成为我的朋友。",1);
		}
	} else if (status == 9) {
        if (sel == 1) {
		qm.sendNext("这是给你的！你可以查看你使用标签我给你恢复药水。",1);
		qm.gainItem(2000013,50)
		qm.gainItem(2000014,50)
		}
    } else if (status == 10) {
        if (sel == 1) {
		qm.sendNext("#b确保-布鲁卡斯你跟首席#K当你到[zealMS岛]！他真的很聪明，会给你一些好的建议。",1);
	   }
    } else if (status == 11) {
        if (sel == 1) {
		qm.warp(4000020,0);
		qm.forceStartQuest(32210);
		}   
	    qm.dispose();
    }
}