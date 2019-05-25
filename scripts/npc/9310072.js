/*
亲亲嘴冒险演示脚本

VIP功能演示脚本(请勿用于商业)

by 芯碎王子

*/


importPackage(net.sf.cherry.client);
var status = 0;
//·········以下为VIP地图设置,请根据需要设置地图ID
var vip1map = 910000007;
var vip2map = 910000008;
var vip3map = 910000009;
var vip4map = 910000010;

//·········以下为工资（金币）参数,请根据需要自行配置;
var GZ_Player_money = 5000;
var GZ_V1_money = 10000;
var GZ_V2_money = 20000;
var GZ_V3_money = 30000;
var GZ_V4_money = 40000;

//·········以下为工资（元宝）参数,请根据需要自行配置;
var GZ_Player_zb = 5;
var GZ_V1_zb = 10;
var GZ_V2_zb = 15;
var GZ_V3_zb = 20;
var GZ_V4_zb = 30;

//·········以下为工资（抵用券）参数,请根据需要自行配置;

var GZ_Player_Nx = 1000;
var GZ_V1_Nx = 2000;
var GZ_V2_Nx = 3000;
var GZ_V3_Nx = 4000;
var GZ_V4_Nx = 5000;

//////////////////////////////////////////////////////////
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
			cm.sendSimple("#e您好！欢迎来到亲亲嘴冒险岛，#r此NPC只是功能演示！请勿用于商业#k!!您目前是本服的#r VIP" + cm.getPlayer().getvip() + " \r\n\r\n#b#L0#进入VIP1(地图)#l     #k#L1#进入VIP2(宫殿)#l\r\n\r\n#r#L2#进入VIP3(圣地)#l     #d#L3#进入VIP4(天堂)#l\r\n\r\n#r#L4#工资领取(包括普通玩家和各级VIP智能判断)#l");				
		}else if (status == 1) {
			var viplevel = cm.getPlayer().getvip();
			if(selection == 0){
				if(viplevel < 1){					
					cm.sendOk("您不是本服的VIP,无法进入此地图")
					cm.dispose();
				}else{
					cm.warp(vip1map,0);
					cm.sendOk("此功能只是演示,请自行配置VIP地图ID");
					cm.dispose();
				}
			}else if(selection == 1){
				if(viplevel < 2){					
					cm.sendOk("您目前的VIP等级无权进入此地图!")
					cm.dispose();
				}else{
					cm.warp(vip2map,0);
					cm.sendOk("此功能只是演示,请自行配置VIP地图ID");
					cm.dispose();
				}
			}else if (selection == 2){
				if(viplevel < 3){					
					cm.sendOk("您目前的VIP等级无权进入此地图!")					
					cm.dispose();
				}else{
					cm.warp(vip3map,0);
					cm.sendOk("此功能只是演示,请自行配置VIP地图ID");
					cm.dispose();
				}
			}else if (selection == 3){
				if(viplevel < 4){					
					cm.sendOk("您目前的VIP等级无权进入此地图!")
					cm.dispose();
				}else{
					cm.warp(vip4map,0);
					cm.sendOk("此功能只是演示,请自行配置VIP地图ID");
					cm.dispose();
				}
			}else if (selection == 4){
				if(cm.getBossLog("qqzmxd_GZ")< 1){
					var vipstr = "普通玩家";
					var sf_money = 0;
					var sf_zb = 0;
					var sf_Nx = 0;
					var noticeType = 2;
					if(viplevel <= 0){
						sf_money = GZ_Player_money;
						sf_zb = GZ_Player_zb;
						sf_Nx = GZ_Player_Nx;
						vipstr = "普通玩家"
						var noticeType = 2;
					}else if(viplevel == 1){
						sf_money = GZ_V1_money;
						sf_zb = GZ_V1_zb;
						sf_Nx = GZ_V1_Nx;	
						vipstr = "★一星VIP★";
						var noticeType = 2;
					}else if(viplevel == 2){
						sf_money = GZ_V2_money;
						sf_zb = GZ_V2_zb;
						sf_Nx = GZ_V2_Nx;
						vipstr = "★★二星VIP★★";
						var noticeType = 3;
					}else if(viplevel == 3){
						sf_money = GZ_V3_money;
						sf_zb = GZ_V3_zb;
						sf_Nx = GZ_V3_Nx;
						vipstr = "★★★三星VIP★★★";
						var noticeType = 11;

					}else if(viplevel >= 4){
						sf_money = GZ_V4_money;
						sf_zb = GZ_V4_zb;
						sf_Nx = GZ_V4_Nx;
						vipstr = "★★★★四星VIP★★★★";	
						var noticeType = 12;						
					}
					if((cm.getMeso()+ sf_money) < 2147483647){
						cm.gainMeso(sf_money);
						cm.setzb(sf_zb);
						cm.getPlayer().modifyCSPoints(1,sf_Nx);
						cm.getPlayer().UpdateCash();   //更新显示抵用状态
						cm.setBossLog("qqzmxd_GZ");
						cm.sendOk("您已成功领取到#rVIP"+ cm.getPlayer().getvip() +"#k的工资#r" + sf_money + "#k金币、#r" + sf_zb + "#k元宝、#r" + sf_Nx + "#k点抵用券");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(noticeType,cm.getC().getChannel(),"工资发放员" + " : " + "恭喜 " + vipstr + " " + cm.getPlayer().getName() +" 领取到今天的工资"  + sf_money + "金币、" + sf_zb + "元宝、" + sf_Nx + "点抵用券",true).getBytes());
						cm.dispose();
					}else{
						cm.sendOk("由于您身上的钱过多,已经装不下今天的工资了,请存银行后再来领取吧！");
						cm.dispose();
					}
				}else{
					cm.sendOk("工资为24小时发放一次,您今天已经领取过工资了,请明天再来!");
					cm.dispose();
				}
			}										
		}
	}
}

