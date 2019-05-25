/*
亲亲嘴冒险--VIP功能演示脚本

VIP功能演示脚本 在线购买VIP演示

by 芯碎王子

*/


importPackage(net.sf.cherry.client);
var status = 0;
var zones = 0;
var VIP2 = 100;
var VIP3 = 200;
var VIP4 = 300;
var V2toV3 = 100;
var V3toV4 = 100;

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
			cm.sendSimple("#e您好！欢迎来到亲亲嘴冒险岛，#r此NPC只是功能演示！请勿用于商业#k!!您目前是本服的#r VIP" + cm.getPlayer().getvip() + " \r\n\r\n#b#L0#VIP1(免费)#l#k#L1#VIP2购买#l#r#L2#VIP3购买#l#d#L3#VIP4购买#l\r\n\r\n #r#L4#VIP2升VIP3#l #k#L5#VIP3升VIP4#l #d#L6#查看个人信息#l");				
		}else if (status == 1) {
			var viplevel = cm.getPlayer().getvip();
			if(selection == 0){
				if(viplevel < 1){
					cm.getPlayer().setvip(1);
					cm.getPlayer().saveToDB(true);
					cm.sendOk("恭喜您已成功加入本服的VIP会员")
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家免费加入本服VIP1",true).getBytes());
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家免费加入本服VIP1",true).getBytes());
					cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家免费加入本服VIP1",true).getBytes());
					cm.dispose();
				}else{
					cm.sendOk("您已经是本服的VIP了");					
					cm.dispose();
				}
			}else if(selection == 1){
				if(viplevel < 2){
					if(cm.getzb() >= VIP2){
						cm.setzb(-VIP2);
						cm.getPlayer().setvip(2);
						cm.getPlayer().saveToDB(true);	
						cm.sendOk("恭喜您已成为本服的VIP2!");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"系统管理员" + " : " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.dispose(); 					
					}else{
						cm.sendOk("您没有足够的元宝,请充值后再来购买!");
						cm.dispose();
					}					
				}else{
					cm.sendOk("您已经享有VIP2的所有特权了，无需再购买!");
					cm.dispose();
				}
			}else if (selection == 2){
				if(viplevel < 2){
					if(cm.getzb() >= VIP3){
						cm.setzb(-VIP3);
						cm.getPlayer().setvip(3);
						cm.getPlayer().saveToDB(true);	
						cm.sendOk("恭喜您已成为本服的VIP3!");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP3",true).getBytes());
						cm.dispose();					
					}else{
						cm.sendOk("您没有足够的元宝,请充值后再来购买!");
						cm.dispose();
					}					
				}else{
					cm.sendOk("您已经是付费VIP了，如需升级，请选择升级购买!");
					cm.dispose();
				}				
			}else if (selection == 3){
				if(viplevel < 2){
					if(cm.getzb() >= VIP4){
						cm.setzb(-VIP4);
						cm.getPlayer().setvip(4);
						cm.getPlayer().saveToDB(true);	
						cm.sendOk("恭喜您已成为本服的VIP4!");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP4",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP4",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家加入本服VIP4",true).getBytes());
						cm.dispose();					
					}else{
						cm.sendOk("您没有足够的元宝,请充值后再来购买!");
						cm.dispose();
					}					
				}else{
					cm.sendOk("您已经是付费VIP了，如需升级，请选择升级购买!");
					cm.dispose();
				}
			}else if (selection == 4){
				if(viplevel == 2){
					if(cm.getzb() >= V2toV3){
						cm.setzb(-V2toV3);
						cm.getPlayer().setvip(3);
						cm.getPlayer().saveToDB(true);	
						cm.sendOk("恭喜您已从VIP2升级为VIP3成功!");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
						cm.dispose();					
					}else{
						cm.sendOk("您没有足够的元宝用于升级VIP,请充值后再来购买!");
						cm.dispose();					
					}
				}else{
						cm.sendOk("您不是VIP2用户,不能从此项升级!");
						cm.dispose();					
				}
			}else if (selection == 5){
				if(viplevel == 3){
					if(cm.getzb() >= V3toV4){
						cm.setzb(-V3toV4);
						cm.getPlayer().setvip(4);
						cm.getPlayer().saveToDB(true);	
						cm.sendOk("恭喜您已从VIP3升级为VIP4成功!");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
						cm.dispose();					
					}else{
						cm.sendOk("您没有足够的元宝用于升级VIP,请充值后再来购买!");
						cm.dispose();					
					}
				}else{
						cm.sendOk("您不是VIP3用户,不能从此项升级!");
						cm.dispose();					
				}				
			}else if (selection == 6){
				if(cm.getPlayer().getGender() == 0){
					var sex = "男";
				}else{
					var sex = "女";
				}
				if(cm.getPlayer().getvip() <= 0){
					var vipstr = "普通玩家";					
				}else if(cm.getPlayer().getvip() == 1){
					var vipstr = "一星VIP";					
				}else if(cm.getPlayer().getvip() == 2){
					var vipstr = "二星VIP";					
				}else if(cm.getPlayer().getvip() == 3){
					var vipstr = "三星VIP";					
				}else{
					var vipstr = "四星VIP";					
				}	
				var Ch = cm.getC().getChannelServer();
				cm.sendOk("#d====================================================\r\n                      #b个 人 信 息\r\n#d====================================================\r\n 帐号：" + cm.getC().getAccountName() + "\r\n 登陆IP：" + Ch.getIP() + "\r\n 姓名：" + cm.getPlayer().getName() + "\r\n 性别：" + sex + "\r\n ID：" + cm.getPlayer().getId() +"\r\n 等级：" + cm.getPlayer().getLevel() + "级\r\n 转身次数：" + cm.getPlayer().getReborns() + "次\r\n VIP等级：" + vipstr + "\r\n 金钱数量：" + cm.getMeso() + "金币\r\n 元宝数量：" + cm.getzb() + "个\r\n 点券数量：" + cm.getPlayer().getCSPoints(0) + "点\r\n 抵用券数量：" + cm.getPlayer().getCSPoints(1) + "点\r\n====================================================\r\n 力量：" + cm.getPlayer().getStr() + "  敏捷：" + cm.getPlayer().getDex() + "  智力：" + cm.getPlayer().getInt() + "  运气：" + cm.getPlayer().getLuk() + "\r\n 人气度：" + cm.getPlayer().getFame() + "点\r\n 最大血量：" +  cm.getPlayer().getMaxHp() + "     最大蓝量：" + cm.getPlayer().getMaxMp() + "\r\n 当前血量：" + cm.getPlayer().getHp() + "     当前蓝量：" + cm.getPlayer().getMp() + "\r\n====================服务器倍率信息==================\r\n 服务器名称："+ Ch.getServerNameMessage() +"\r\n 金钱暴率：" + Ch.getMesoRate() + " 倍\r\n 经验倍率：" + Ch.getExpRate() + " 倍\r\n 物品暴率：" + Ch.getDropRate() + " 倍\r\n BOSS暴率：" + Ch.getBossDropRate() + " 倍\r\n 点券暴率：" + Ch.getnxRate() + " 倍\r\n 宠物经验倍率：" + Ch.getPetExpRate() + " 倍\r\n " );
				cm.dispose();
			}			
		}
	}
}

