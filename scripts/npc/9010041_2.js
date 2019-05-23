var status = 0;
var fstype=0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;           
        if (status == 0) {  
			cm.sendSimple("你好伟大的#b#h ##k，打工系统是KK的特色哟，也是玩家获取大量游戏币的方式，下面介绍下打工系统\r\n开始打工后根据NPC提供的任务，完成任务后，可以进入下一个打工阶段，也可以在当前阶段就结算工资，当然阶段越高结算的金额会越多，而且在高的几个阶段结算还有几率获得其他稀有道具，具体结算金额请看#r工资表#k，不错吧，快行动起来吧\r\n#r注意：每天打工只能结算一次工资，结算后阶段归零#k\r\n#L0##d开始打工#l#k　#L1##b结算工资#l#k　#L2##r工资表#l#k");
        } else if (status == 1) {
            if (selection==0){//开始打工
		fstype=1;
		if(cm.getChar().getMrsq() == 0){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，还无法结算工资哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000034#x30个#i4000135#x30个\r\n";
		text += "#L0##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 1){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，只能结算不多的工资哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000180#x40个#i4000110#x40个\r\n";
		text += "#L1##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 2){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，只能结算不多的工资哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000268#x50个#i4000465#x50个\r\n";
		text += "#L2##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 3){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，只能结算不多的工资哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000009#x50个#i4000007#x50个\r\n";
		text += "#L3##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 4){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，能结算一笔不少的工资了哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000267#x60个#i4000035#x50个\r\n";
		text += "#L4##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 5){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，能结算一笔不少的工资了哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000039#x60个#i4000129#x50个\r\n";
		text += "#L5##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 6){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，能结算一笔较多的工资了哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000274#x60个#i4000232#x60个\r\n";
		text += "#L6##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 7){
		text = "#h #你好,你目前打工阶段为#r[" + cm.getChar().getMrsq() + "]#k，再打工一次就能获得大量的工资哟\r\n";
		text += "如果想进入下一阶段的打工工作请给我带来：\r\n";
		text += "#i4000034#x100个#i4000171#x100个#i4000035#x100个\r\n";
		text += "#L7##r[推荐]#d提交进入下一个打工阶段#k#l"; 
		cm.sendSimple(text);
		}else if(cm.getChar().getMrsq() == 8){
		cm.sendOk("喔~真不敢相信，居然能完成所有阶段的工作，快去结算工资吧青年！"); 
		cm.dispose();
		}else{
		cm.sendOk("未知错误..");
		cm.dispose();
			}
            }else if (selection==1){//结算工资
				fstype=2;
				cm.sendNext("你目前在" + cm.getChar().getMrsq() + "打工阶段，确认结算工资吗？一天只能结算一次哟");
            }else if (selection==2){//工资表
				cm.sendOk("#r====================工资表=======================#k\r\n#d打工阶段#k#r[1]#k_结算金额[1000W]\r\n#d打工阶段#k#r[2]#k_结算金额[2000W]\r\n#d打工阶段#k#r[3]#k_结算金额[4000W][有机率获得#z2430483#]\r\n#d打工阶段#k#r[4]#k_结算金额[8000W][有机率获得#z2430483#]\r\n#d打工阶段#k#r[5]#k_结算金额[1.6E] [100%率获得#z2430483#]\r\n#d打工阶段#k#r[6]#k_结算金额[3.2E] [100%率获得#z2430483#]\r\n#d打工阶段#k#r[7]#k_结算金额[6.4E] [100%率获得#z2430483#]\r\n#d打工阶段#k#r[8]#k_结算金额[12.8E][有机率获得#z2430030#]"); 
				cm.dispose();
			}
       } else if (status == 2) {
			if(fstype==1){//任务提交
				if(selection==0){
				if (cm.haveItem(4000034,30) && cm.haveItem(4000135,30)){
					cm.getChar().setMrsq(1);
					cm.gainItem(4000034,-30);
					cm.gainItem(4000135,-30);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段1的打工");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==1){
				if (cm.haveItem(4000180,40) && cm.haveItem(4000110,40)){
					cm.getChar().setMrsq(2);
					cm.gainItem(4000180,-40);
					cm.gainItem(4000110,-40);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段2的打工");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==2){
				if (cm.haveItem(4000268,50) && cm.haveItem(4000465,50)){
					cm.getChar().setMrsq(3);
					cm.gainItem(4000268,-50);
					cm.gainItem(4000465,-50);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段3的打工");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==3){
				if (cm.haveItem(4000009,50) && cm.haveItem(4000007,50)){
					cm.getChar().setMrsq(4);
					cm.gainItem(4000009,-50);
					cm.gainItem(4000007,-50);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段4的打工");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==4){
				if (cm.haveItem(4000267,60) && cm.haveItem(4000035,50)){
					cm.getChar().setMrsq(5);
					cm.gainItem(4000267,-60);
					cm.gainItem(4000035,-50);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段5的打工");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==5){
				if (cm.haveItem(4000039,60) && cm.haveItem(4000129,50)){
					cm.getChar().setMrsq(6);
					cm.gainItem(4000039,-60);
					cm.gainItem(4000129,-50);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段6的打工");
					cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]打工进行到了6阶段，真是努力的青年");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==6){
				if (cm.haveItem(4000274,60) && cm.haveItem(4000232,60)){
					cm.getChar().setMrsq(7);
					cm.gainItem(4000274,-60);
					cm.gainItem(4000232,-60);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜可以进行阶段7的打工");
					cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]打工进行到了7阶段，真是努力的青年");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}else if(selection==7){
				if (cm.haveItem(4000034,100) && cm.haveItem(4000171,100) && cm.haveItem(4000035,100)){
					cm.getChar().setMrsq(8);
					cm.gainItem(4000034,-100);
					cm.gainItem(4000171,-100);
					cm.gainItem(4000035,-100);
					cm.getChar().setXw(cm.getChar().getXw() + 5);
					cm.sendOk("恭喜你完成了所有的打工，去结算工资吧");
					cm.dispose();
				}else{
					cm.sendOk("看来你还没有收集到我需要的物品,打工是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
				}
				}		
			if(fstype==2){//工资结算
			if (cm.getBossLog("工资结算") == 1) {
		cm.sendOk("你今天已经结算过1次工资了,一天只能结算一次工资");
		cm.dispose();
			}else if(cm.getChar().getMrsq() == 0){
			cm.sendOk("你没有打工，所以没有工资结算，没有付出是没有收获滴青年");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 1){
			cm.getChar().setMrsq(0);
			cm.gainMeso(10000000);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：10,000,000");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 2){
			cm.getChar().setMrsq(0);
			cm.gainMeso(20000000);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：20,000,000");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 3){
			var chance = Math.floor(Math.random()*2);
			if(chance==1){
			cm.getChar().setMrsq(0);
			cm.gainMeso(40000000);
			cm.gainItem(2430483,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：40,000,000　#r#z2430483##k1个");
			cm.dispose();
			}else{
			cm.getChar().setMrsq(0);
			cm.gainMeso(40000000);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：40,000,000");
			}
			}else if(cm.getChar().getMrsq() == 4){
			var chance = Math.floor(Math.random()*2);
			if(chance==1){
			cm.getChar().setMrsq(0);
			cm.gainMeso(80000000);
			cm.gainItem(2430483,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：80,000,000　#r#z2430483##k1个");
			cm.dispose();
			}else{
			cm.getChar().setMrsq(0);
			cm.gainMeso(80000000);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：80,000,000");
			}
			}else if(cm.getChar().getMrsq() == 5){
			cm.getChar().setMrsq(0);
			cm.gainMeso(160000000);
			cm.gainItem(2430483,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：160,000,000　#r#z2430483##k1个");
			cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]结算了第5阶段的工资游戏币1.6E，金猪梦箱子1个");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 6){
			cm.getChar().setMrsq(0);
			cm.gainMeso(320000000);
			cm.gainItem(2430483,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：320,000,000　#r#z2430483##k1个");
			cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]结算了第6阶段的工资游戏币3.2E，金猪梦箱子1个");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 7){
			cm.getChar().setMrsq(0);
			cm.gainMeso(640000000);
			cm.gainItem(2430483,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：640,000,000　#r#z2430483##k1个");
			cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]结算了第7阶段的工资游戏币6.4E，金猪梦箱子1个");
			cm.dispose();
			}else if(cm.getChar().getMrsq() == 8){
			var chance = Math.floor(Math.random()*2);
			if(chance==1){
			cm.getChar().setMrsq(0);
			cm.gainMeso(1280000000);
			cm.gainItem(2430008,+1);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：1,200,000,000　#r#z2430008##k1个");
			cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]结算了第8阶段的工资游戏币12.8E，并人品爆发获得了黄金罗盘");
			cm.dispose();
			}else{
			cm.getChar().setMrsq(0);
			cm.gainItem(2430483,+1);
			cm.gainMeso(1280000000);
			cm.setBossLog("工资结算");
			cm.sendOk("结算工资成功，你获得了\r\n游戏币：1,200,000,000");
			cm.worldMessage("[打工系统]：玩家["+cm.getChar().getName()+"]结算了第8阶段的工资游戏币12.8E，金猪梦箱子1个");
			cm.dispose();
			};
		}else{
		cm.sendOk("你今天已经结算过1次工资了,一天只能结算一次工资");
		cm.dispose();
			}
			}
}
    }
}
