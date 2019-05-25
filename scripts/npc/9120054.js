function start() {
	if (cm.getChar().getMapId() == 803001200){
	    if(cm.countMonster()>0){
		 cm.sendSimple ("您正在挑战BOSS,请选把它消灭了再来找我召唤!!如果您想放弃挑战,我可以把你送回市场! \r\n \r\n    #L8##r回到市场#l");
	    }else{
   		 cm.sendSimple ("#b★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n★如果你在这里能击败所有BOSS您奖获得本服最丰厚的奖励★★你可要小心哦，一个会比一个厉害的。                ★\r\n★#d  剩余:#r" + cm.getzb() + "元宝            #d累计:#r" + cm.getboss() + " 闯关积分   #b★\r\n★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n                 【需要10000元宝】\r\n\r\n#L0#挑战猎魔人#l  #L1#挑战血焰将军#l  #L2#挑战地狱船长#l\r\n#L6#挑战海之魔女#l#L7#挑战暗影杀死#l\r\n\r\n#L3#兑换通行证#l  #L4#去通关领奖#l    #L5##r查看通关介绍#l      #L8##r回到市场#l");
	    }
	} else {
	    cm.sendOk("找我什么事，想要启动我的力量吗，你需要足够的条件")
	}
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if(cm.getzb() >= 10000) {
        cm.setzb(-10000);
        cm.summonMob(9400592, 100000000, 40000, 1);//猎魔人     
cm.serverNotice("『绯红骑士团公告』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战绯红骑士团终极BOSS【猎魔人】！"); 
        }else{
        cm.sendOk("抱歉你没有10000元宝。我不能为您召唤"); 
	cm.dispose();}
} else if (selection == 1) {
	if(cm.getzb() >= 10000) {
            cm.setzb(-10000);
cm.serverNotice("『绯红骑士团公告』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战绯红骑士团终极BOSS【血焰将军 】！");  
        cm.summonMob(9400591, 100000000, 40000, 1);//血焰将军     
        }else{
        cm.sendOk("抱歉你没有10000元宝。我不能为您召唤"); 
	cm.dispose();}
} else if (selection == 2) {
	 if(cm.getzb() >= 10000) {
            cm.setzb(-10000);
cm.serverNotice("『会员公告』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战绯红骑士团终极BOSS【地狱船长  】！"); 
        cm.summonMob(9400589, 100000000, 40000, 1);//地狱船长     
        }else{
        cm.sendOk("抱歉你没有10000元宝。我不能为您召唤"); 
	cm.dispose();}
} else if (selection == 3) { 
        if (!cm.haveItem(4001009,1)) {
        cm.sendOk("抱歉，你没有1张#v4001009#无法为你开启");
        } else if (!cm.haveItem(4001010,1)) {
        cm.sendOk("抱歉，你没有1张#v4001010#无法为你开启"); 
        } else if (!cm.haveItem(4001011,1)) {
        cm.sendOk("抱歉，你没有1张#v4001011#无法为你开启"); 
        } else if (!cm.haveItem(4001012,1)) {
        cm.sendOk("抱歉，你没有1张#v4001012#无法为你开启"); 
        } else if (!cm.haveItem(4001013,1)) {
        cm.sendOk("抱歉，你没有1张#v4001013#无法为你开启"); 
        }else{
	cm.gainItem(4001009,-1);
	cm.gainItem(4001010,-1);
	cm.gainItem(4001011,-1);
	cm.gainItem(4001012,-1);
	cm.gainItem(4001013,-1);
	cm.gainItem(4021010,1);
	cm.dispose();
}
} else if (selection == 4) {
        if (!cm.haveItem(4021010,1)) {
        cm.sendOk("抱歉，你没有#v4021010#无法为你开启");
cm.dispose();
    } else {
cm.warp(209000015, 0);
cm.dispose();
}
}else if (selection == 8) {
    cm.warp(910000000, 0);
    cm.dispose();
}else if (selection == 5) {
cm.sendOk("在这里必须击败所有的BOSS，而每一个BOSS都会爆出一种凭证#r（凭证暴率90%）#k。收集5个凭证后，您可以找我兑换通关证明。然后在点我，我将把你们传送到领奖地图。并且给于#e#b【10点积分】");      
cm.dispose();
} else if (selection == 6) {
	 if(cm.getzb() >= 10000) {
            cm.setzb(-10000);
cm.serverNotice("『会员公告』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战绯红骑士团终极BOSS【海之魔女  】！"); 
        cm.summonMob(9400590, 100000000, 40000, 1);//地狱船长     
        }else{
        cm.sendOk("抱歉你没有10000元宝。我不能为您召唤"); 
	cm.dispose();}
} else if (selection == 7) {
            if(cm.getzb() >= 10000) {
            cm.setzb(-10000);
cm.serverNotice("『会员公告』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战绯红骑士团终极BOSS【暗影杀手  】！"); 
        cm.summonMob(9400593, 100000000, 40000, 1);//地狱船长     
        }else{
        cm.sendOk("抱歉你没有10000元宝。我不能为您召唤"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400300, 100000000, 175000000, 1);//恶僧
	cm.dispose(); } 
} else if (selection == 9) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400549, 1, 200300000, 1);//火马
	cm.dispose(); } 
} 
}