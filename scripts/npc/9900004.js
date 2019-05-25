
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("您需要激活最大技能吗?#b\r\n#L0#激活最大技能!#l     #L1#领取玩家工资!#l \r\n#L2#我要参加赌博!#l     #L3#购买永恒装备!#l \r\n#L4#快速加点!#l          #L5#我要洗点!#l \r\n#L6#满血满蓝!#l          #L7#经验修复#k#l \r\n#L8##r道场积分换取道具!#k#l");
		} else if (status == 1) {
			 if (selection == 0) {
			if (cm.getLevel() >= 70 ) {  
					cm.getPlayer().maxAllSkills();
					cm.sendOk("您已激活了所有技能。");
					cm.dispose();
				}else{
					cm.sendOk("您好！等你70级以后来找我，我能帮你激活最大技能!");
					cm.dispose();
				}
			} else if (selection == 1) {
				if (cm.getBossLog('playgz') < 1)
				{       
					if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull())
					{
						cm.sendOk("您至少应该让其它栏空出一格");
						cm.dispose();
					}else if(cm.getMeso()>=1900000000)
					{
						cm.sendOk("您好!由于您的钱包太满,请花掉一些钱再来领取工资吧!!");
						cm.dispose();
					}else
					{       
						if (cm.getLevel() >= 70 )
						{            
							cm.gainNX(5000);
							//cm.gainItem(4001010,1);
							cm.gainMeso(200000000);
							cm.setBossLog('playgz');
							cm.sendOk("您好,您已成功领取玩家工资5000点卷,2亿游戏币,请查收!!。");
							cm.dispose();
						}else{
							cm.sendOk("您好,因为您的等级不够70级,所以你什么也得不到!!。");
							cm.dispose();
						}
					}
				}else{
					cm.sendOk("您好，您今天已经领取过工资了，请明天再来。");
					cm.dispose();	 
					}
				
			}else if (selection == 2) {
				   	cm.openNpc(9100109);
			}else if (selection == 3) {
				   	cm.openNpc(9120104);
			}else if (selection == 4) {
				   	cm.openNpc(9310071);
			}else if (selection == 5) {
				   	cm.openNpc(9310070);
			}else if (selection == 6) {
					var statup = new java.util.ArrayList();
			     		var p = cm.c.getPlayer(); 
				   	var newHP=0;
					var newMP=0;
					var Msg;
					if(cm.getLevel() >= 30 && cm.getLevel() < 70 ){
						if(p.getMaxHp() < 5000){
							newHP = 5000;
						}else{
							newHP = p.getMaxHp();
						}
						if(p.getMaxMp() < 5000){
							newMP = 5000;
						}else{
							newMP = p.getMaxMp();
						}
						Msg = "您好,由于你的等级小于70级,我最多只能帮您把最大HP和MP加到5000 到70级再来找我";
					}else if(cm.getLevel() >= 70 && cm.getLevel() < 120){
						if(p.getMaxHp() < 10000){
							newHP = 10000;
						}else{
							newHP = p.getMaxHp();
						}
						if(p.getMaxMp() < 10000){
							newMP = 10000;
						}else{
							newMP = p.getMaxMp();
						}
						Msg = "您好,由于你的等级小于120级,我最多只能帮您把最大HP和MP加到1万,到120级再来找我";
					}else if(cm.getLevel() >= 120 && cm.getLevel() < 180){
						if(p.getMaxHp() < 20000){
							newHP = 20000;
						}else{
							newHP = p.getMaxHp();
						}
						if(p.getMaxMp() < 20000){
							newMP = 20000;
						}else{
							newMP = p.getMaxMp();
						}
						Msg = "您好,由于你的等级小于180级,我最多只能帮您把最大HP和MP加到2万,到180级再来找我";
					}else if(cm.getLevel() >= 180 && cm.getLevel() < 200){
						if(p.getMaxHp() < 25000){
							newHP = 25000;
						}else{
							newHP = p.getMaxHp();
						}
						if(p.getMaxMp() < 25000){
							newMP = 25000;
						}else{
							newMP = p.getMaxMp();
						}
						Msg = "您好,由于你的等级小于200级,我最多只能帮您把最大HP和MP加到2.5万,到200级再来找我";
					}else if(cm.getLevel() == 200){
						if(p.getMaxHp() < 30000){
							newHP = 30000;
						}else{
							newHP = p.getMaxHp();
						}
						if(p.getMaxMp() < 30000){
							newMP = 30000;
						}else{
							newMP = p.getMaxMp();
						}
						Msg = "您好,恭喜您已经达到200级,我帮您把最大HP和MP也加到最大3万!";
					}else{
						newHP = p.getMaxHp();
						newMP = p.getMaxMp();
						Msg = "您好,由于你的还没达到30级,我暂时不能为您服务";
					}	
						p.setMaxHP(newHP);
						p.setMaxMP(newMP);
						statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.MAXHP, java.lang.Integer.valueOf(newHP)));
						statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.MAXMP, java.lang.Integer.valueOf(newMP)));
						p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
						cm.sendOk(Msg);
						cm.dispose();
      					}else if (selection == 7){
  						var statup = new java.util.ArrayList();
	   					var p = cm.c.getPlayer();
				 	        if(p.getExp() < 0){
							p.setExp(0) 
					                statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
				 		        p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
			   				cm.sendOk("经验值已修复完成");
							cm.dispose();
						}else{
						        cm.sendOk("您的经验值正常,无需修复!");
							cm.dispose();
						}
					}else if (selection == 8){
						
							cm.openNpc(9310074);
						
					}
		}
	}
}
