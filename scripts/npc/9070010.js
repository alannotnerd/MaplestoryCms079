 var typed = 0;
var floorIdx = 0;
var C = "";
var itemList = Array(4000019,4000000,4000016);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Mzhy");
	var eim = em.getInstance("Mzhy");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	if (status==0) {
		if(em.getProperty("state")==1) {
			em.setProperty("state", 2);
			cm.dispose();
			cm.openNpc(9070010, 2);
			return ;
		}
		var text="";
		if (cm.getMap(931050410).getAllMonstersThreadsafe().size()==0) {
			floorIdx = parseInt(eim.getProperty("currentFloor"))-1;
			//到达最顶层
			if (floorIdx == 19) {
				cm.setBossLog("迷之幻域");
				var times = eim.getTimeLeft();
				var totalTime = 60 * 1000 * 30;
				var spendTime = totalTime - times;
				var minute = Math.floor(spendTime/(60*1000));
				var second = Math.floor(spendTime%(60*1000)/1000);
				cm.warp(910000000);
				var giftList = Array(
					Array(4001839, 3),
					Array(5062002, 2),
					Array(5062500, 2),
					Array(5064000, 1),
					Array(2430069, 2),
					Array(4002001, 1),
					Array(5150040, 3),
					Array(2430781, 3),
					Array(2340000, 1)
				);
				text = "共使用了"+minute+"分"+second+"秒通关。任务奖励：\r\n";
				for(var key in giftList) {
					var itemid = giftList[key][0];
					var itemquantity = giftList[key][1];
					text+="#b#v"+itemid+"##t"+itemid+"# #rx"+itemquantity+"#k\r\n";
					cm.gainItem(itemid,itemquantity);
				}
				cm.worldSpouseMessage(0x17,"[迷之幻域] : 【"+ cm.getChar().getName() +"】花费了<"+minute+"分"+second+"秒>成功通关，获得大量奖励！  ");
				cm.sendOk(text);
				cm.dispose();
			} else {
				text+="我是第#r#e"+(floorIdx+1)+"#n#k层的#b时空门#k，请选择开启一个机关尝试消除幻境：\r\n";
				text+="#d#L0##v4000019#开启机关[剩余"+cm.getItemQuantity(4000019)+"个]\r\n";
				text+="#b#L1##v4000000#开启机关[剩余"+cm.getItemQuantity(4000000)+"个]\r\n";
				text+="#r#L2##v4000016#开启机关[剩余"+cm.getItemQuantity(4000016)+"个]\r\n";
				text+="\r\n";
				text+="#L3##d#e放弃挑战#n#k#l";
				cm.sendSimple(text);
			}
		} else {
			cm.sendOk("我的勇士，击败黑魔法师的门徒才能开启机关！战胜他们吧！");
			cm.dispose();
		}
	} else if (status == 1) {
		var sel = selection;
		if (sel > 2) {
			if (sel == 4) {
				//购买蜗牛壳
				C="购买蜗牛壳";
				cm.sendSimple("你想购买什么颜色的蜗牛壳呢？100万可以买20个~\r\n#b#L0#购买#v4000019#绿色蜗牛壳#l\r\n#L1#购买#v4000000#蓝色蜗牛壳#l\r\n#L2#购买#v4000016#红色蜗牛壳#l");
			} else if (sel == 3) {
				//放弃挑战
				C="放弃挑战";
				cm.sendYesNo("你真的要强行离开迷之幻域吗？那样的话什么奖励都没有。");
			}
		} else {
			C="开启机关";
			if (!cm.haveItem(itemList[sel])) {
				cm.sendOk("你的#v"+itemList[sel]+"#数量不够，无法开启此机关。");
				cm.dispose();
				return;
			}
			cm.gainItem(itemList[sel], -1);
			var routes = Array();
			var route = eim.getProperty("floor"+floorIdx);
			routes = route.split(",");
			var lastRoute = 1*routes[sel];
			if (cm.getPlayer().getName() == "管理员心动蓝蜗牛") {
				lastRoute = 25;
			}
			
			if ((floorIdx+lastRoute)<=0) {
				lastRoute = 0;
			}
			if ((floorIdx+lastRoute)>=20) {
				lastRoute = 19-floorIdx;
			}
			var tips = "";
			var lastFloor = floorIdx+1+lastRoute;
			if (lastRoute>0) {
				tips = "嗯，运气真好，来到了第"+(lastFloor)+"层幻境。";
			} else if (lastRoute == 0) {
				tips = "唔~还是在第"+(lastFloor)+"层幻境啊。";
			} else {
				tips = "悲剧了！回到了第"+(lastFloor)+"层幻境。";
			}
			eim.setProperty("currentFloor", lastFloor);
			var map = eim.getMapInstance(0);
			cm.getPlayer().changeMap(map, map.getPortal(2));
			cm.getPlayer().dropMessage(1, tips);
			cm.dispose();
		}
	} else if (status == 2) {
		if (C=="放弃挑战") {
			cm.getPlayer().dropMessage(1, "终于回到了现实世界……");
			cm.warp(910000000);
			cm.dispose();
		} else if (C=="购买蜗牛壳") {
			if (cm.getMeso()<1000000) {
				cm.sendOk("钱不够噢~");
				cm.dispose();
				return;
			}
			cm.sendOk("购买成功！");
			cm.gainItem(itemList[selection], 20);
			cm.gainMeso(-1000000);
			cm.dispose();
		}
	}
}
