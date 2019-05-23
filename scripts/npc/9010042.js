/*function start(){
            cm.playerMessage(1, Math.ceil(0.9));
cm.dispose();
}*/

var z = "#e#r#fEffect/ItemEff/1112811/0/0#";

var status = 0;
var typed=0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
			cm.sendSimple("\t\t- #e#r骚年，你找本王想干什么！快说出来！#k#n\r\n\r\n\r\n\r\n#b目前开启获得神龙宝箱需要能量：#r"+cm.getBossLog("宠物总计成长值",1)+"#k#b / 1000 点 \r\n\r\n#r#L1#培养成神器说明#l            "+z+""+z+""+z+"\r\n\r\n#b#L2#[灌溉一下能量]#l         "+z+""+z+""+z+"\r\n#b#L3#[获得神龙宝箱]#l\r\n#b#L4#[炫耀一下能量]#l         "+z+""+z+""+z+"");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("\t\t- #e#d神宠培养成神器功能#k#n\r\n\r\n\r\n\r\n   #b通过神宠培养成后。几率获得普通箱子里面有3个中介和神龙箱子里面有4个中介.#r#e所有怪物几率性掉落的魔法球，可以来喂养神宠哟。 \r\n\r\n#r");
                    	cm.dispose();
			} else if (selection == 2) {
			typed=3;
                    	cm.dispose();
			cm.openNpc(9073025, 100);
			} else if (selection == 3) {
			if(cm.getBossLog("宠物总计成长值",1) >= 800){
			typed=4;
			cm.dispose();
			cm.openNpc(9073025, 101);
			} else {
			cm.dispose();
			cm.sendOk("呼呼！#b神龙的力量失败了。\r\n#r神宠泪汪汪的告诉主人我还没有达到完全体的全盛状态。");
			}
			} else if (selection == 4) {
			if(cm.getBossLog("炫耀") < 3){
			typed=5;
			cm.setBossLog("炫耀");
			cm.dispose();
			cm.openNpc(9073025, 102);
			} else {
			cm.dispose();
			cm.sendOk("每天最多炫耀3次哦！");
			}
		}
	   }
      }
}