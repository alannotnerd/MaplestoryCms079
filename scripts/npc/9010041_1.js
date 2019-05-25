var status = 0;
var mmm = 0;
var kkk = 0;
var chance1 = Math.floor(Math.random()*6+1);
var itemchance = Math.floor(Math.random()*30+1);
var mgb = new Array(4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031996,4031995,4031995,4031995,4031995,4031995,4031994);
var randmgb = Math.floor(Math.random() * mgb.length);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 6 || mode == -1) {
		cm.dispose();
	} else {
		if (status == 5) {
			status = 6;
			return;
		}
	if (mode == 1)
		status++;
	else
		status--;
		if (status == 0) {
				if(cm.getChar().getBossLog("正义之章")>=10){
					cm.sendOk("#e您今天已经做满10次任务了，明天在来吧！！");
					cm.dispose();
				}else{
					if (cm.getChar().getMrsq() == 1){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000034#(#z4000034#100个),#v4000021##z4000021#,#v4000135# #z4000135#各100个,..");
					}else if (cm.getChar().getMrsq() == 2){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#z4000007#100个#v4000007#,#v4000143##z4000143#,#v4000180##z4000180#各100个,...");
					}else if (cm.getChar().getMrsq() == 3){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000013#(#z4000013#), #v4000129##z4000129#,#v4000263##z4000263#各100个,..");
					}else if (cm.getChar().getMrsq() == 4){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000171##z4000171#,#v4000110##z4000110#,#v4000267##z4000267#各100个,");
					}else if (cm.getChar().getMrsq() == 5){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000465##z4000465#,#v4000232##z4000232#,#v4000268##z4000268#各100个,");
					}else if (cm.getChar().getMrsq() == 6){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000035##z4000035#,#v4000291##z4000291#,#v4000274##z4000274#各100个,");
					}else if (cm.getChar().getMrsq() == 7){
							mmm = 2;
							cm.sendNext("#e收集到我的东西了吗?.我需要#v4000039##z4000039#,#v4000019##z4000019#,#v4000270##z4000270#各100个,");										
					}else{
						mmm = 1;
						cm.sendNext("欢迎您参加今日的试练任务.每天最多只能做10次任务\r\n每次做完成后，能得到1枚#b#z4310034##k\r\n金,银,铜蘑菇奖牌随机一个\r\n10次做完还能额外获得黄金罗盘哟，当然中途不能放弃\r\n#r今天试练任务(" + cm.getChar().getBossLog("正义之章") + "/10)#k");
					}
				}
		} else if (status == 1) {
			if (mmm == 1){
			if (chance1 == 1){
				cm.sendOk("#e去外面寻找#v4000034#(蛇皮100个),#v4000021#动物皮,#v4000135# 大海贼王戴的帽子,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(1);
				cm.dispose();
			}else if (chance1 == 2){
				cm.sendOk("#e去外面寻找火独眼兽之尾100个#v4000007#,#v4000143#僵尸娃娃,#v4000180#鲨鱼尖锐的假牙,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(2);
				cm.dispose();
			}else if (chance1 == 3){
				cm.sendOk("#e去外面寻找#v4000013#(风独眼兽的尾巴), #v4000129#红小丑的小珠,#v4000263#发出红光的红海龟龙的背壳,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(3);
				cm.dispose();
			}else if (chance1 == 4){
				cm.sendOk("#e去外面寻找#v4000171#虎皮,#v4000110#木马骑兵的剑,#v4000267#邪恶双刀蜥蜴肩膀上的铠甲,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(4);
				cm.dispose();
			}else if (chance1 == 5){
				cm.sendOk("#e去外面寻找#v4000465#鼻环,#v4000232#小猎犬的尖牙,#v4000268#红飞龙的红色翅膀,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(5);
				cm.dispose();
			}else if (chance1 == 6){
				cm.sendOk("#e去外面寻找#v4000035#小幽灵的桌布,#v4000291#银人心,#v4000274#骷髅龙头顶上而断裂的角,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(5);
				cm.dispose();
			}else if (chance1 == 7){
				cm.sendOk("#e去外面寻找#v000039#用钢铁来做的铁甲猪的铁蹄,#v4000019#绿色蜗牛壳,#v4000270#附在黑飞龙翅膀两端的尖锐指甲,各100个,找到后在来找我吧!");
				cm.getChar().setMrsq(7);
				cm.dispose();
				}
			}else if (mmm ==2){
			if (cm.getChar().getMrsq() == 1){
				if (cm.haveItem(4000034,100) && cm.haveItem(4000021,100) && cm.haveItem(4000135,100)){
					kkk = 1;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 2){
				if (cm.haveItem(4000007,100) && cm.haveItem(4000143,100) && cm.haveItem(4000180,100)){
					kkk = 2;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 3){
				if (cm.haveItem(4000013,100) && cm.haveItem(4000129,100) && cm.haveItem(4000263,100)){
					kkk = 3;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 4){
				if (cm.haveItem(4000171,100) && cm.haveItem(4000110,100) && cm.haveItem(4000267,100)){
					kkk = 4;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 5){
				if (cm.haveItem(4000465,100) && cm.haveItem(4000232,100) && cm.haveItem(4000268,100)){
					kkk = 5;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 6){
				if (cm.haveItem(4000035,100) && cm.haveItem(4000291,100) && cm.haveItem(4000274,100)){
					kkk = 6;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
				}
			}else if(cm.getChar().getMrsq() == 7){
				if (cm.haveItem(4000039,100) && cm.haveItem(4000019,100) && cm.haveItem(4000270,100)){
					kkk = 7;
					cm.sendNext("#e这么快就收集到了我想要的物品了哟,看看能获得什么好的物品吧!");
				}else{
					cm.sendOk("#e看来你还没有收集到我需要的物品,做任务是需要有耐心的..加油吧!!!..!");
					cm.dispose();
					}
				}//最后一个IF结尾
			}
		} else if (status == 2) {
				var fyitem = Math.floor(Math.random()*5+1);
				cm.gainItem(mgb[randmgb],1);
				cm.gainItem(4310034,1);
				cm.getChar().setXw(cm.getChar().getXw() + 5);
            if (kkk ==1){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000034, -100);
				cm.gainItem(4000021, -100);
				cm.gainItem(4000135, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==2){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000007, -100);
				cm.gainItem(4000143, -100);
				cm.gainItem(4000180, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==3){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000013, -100);
				cm.gainItem(4000129, -100);
				cm.gainItem(4000263, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==4){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000171, -100);
				cm.gainItem(4000110, -100);
				cm.gainItem(4000267, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==5){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000465, -100);
				cm.gainItem(4000232, -100);
				cm.gainItem(4000268, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==6){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000035, -100);
				cm.gainItem(4000291, -100);
				cm.gainItem(4000274, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }else if (kkk ==7){
				cm.sendNext("恭喜你做完此次任务\r\n获得了一个正义币\r\n并获得#z" + mgb[randmgb] + "#x1");
				cm.gainItem(4000039, -100);
				cm.gainItem(4000019, -100);
				cm.gainItem(4000270, -100);
				cm.getChar().setMrsq(0);
				cm.setBossLog("正义之章");
				cm.setBossLog("正义之章1");
            }
			if(cm.getBossLog("正义之章1") == 10){
				cm.gainItem(2430008, +1);
				cm.worldMessage("[正义之章]：恭喜玩家：["+cm.getChar().getName()+"]完成了10次正义之章，获得了一个黄金罗盘");
			}else{
				cm.dispose();
			}
		} else if (status == 3) {
			cm.sendOk("恭喜你今天完成了10次任务，额外获得一个黄金罗盘");
			cm.dispose();
		} else if (status == 4) {
			cm.sendNext("#b...#k");
		} else if (status == 5) {
			cm.sendOk("..!");
			cm.dispose();
		}
	}
} 
