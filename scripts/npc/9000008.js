var status = 0;
var item = 
Array(



                        //永恒武器
			Array(1302086,500,1),// 重生破甲剑 
 			Array(1302081,500,1),//永恒破甲剑
 			Array(1312037,500,1),//永恒断蚺斧
 			Array(1312038,500,1),//重生断蚺斧 
 			Array(1322060,500,1),//永恒惊破天
 			Array(1322061,500,1),//重生惊破天
 			Array(1432047,500,1),//永恒显圣枪 
 			Array(1432049,500,1),//重生显圣枪
 			Array(1402047,500,1),//重生玄冥剑 
 			Array(1402046,500,1),//永恒玄冥剑 
 			Array(1412034,500,1),//重生碎鼋斧 
			Array(1412033,500,1),//永恒碎鼋斧 
			Array(1442002,500,1),//月灵戟 
 			Array(1442067,500,1),//重生神光戟 
 			Array(1442063,500,1),//永恒神光戟
 			Array(1372044,500,1),//永恒蝶翼杖
 			Array(1372045,500,1),//重生蝶翼杖
 			Array(1372039,500,1),//爆炎之杖
 			Array(1372040,500,1),//剧毒之杖 
 			Array(1372041,500,1),//寒冰之杖
 			Array(1372042,500,1),//狂雷之杖 
 			Array(1382036,500,1),//黑精灵王杖
 			Array(1382059,500,1),//重生冰轮杖
 			Array(1382057,500,1),//永恒冰轮杖 
 			Array(1382049,500,1),//朱雀长杖
 			Array(1382050,500,1),//玄武长杖
 			Array(1382051,500,1),//白虎长杖 
 			Array(1382052,500,1),//青龙长杖 
 			Array(1452059,500,1),//重生惊电弓
 			Array(1452057,500,1),//永恒惊电弓
 			Array(1462051,500,1),//重生冥雷弩
 			Array(1462050,500,1),//永恒冥雷弩 
 			Array(1332076,500,1),//重生断首刃 
 			Array(1332074,500,1),//永恒断首刃
 			Array(1472071,500,1),//重生大悲赋
 			Array(1472068,500,1),//永恒大悲赋
 			Array(1492023,500,1),//永恒凤凰铳 
 			Array(1492025,500,1),//重生凤凰铳 
 			Array(1482023,500,1),//永恒孔雀翎 
 			Array(1482023,500,1),//重生孔雀翎
                        //永恒装备
			Array(1092042,600,1),// 铁甲盾牌 
			Array(1092058,600,1),//永恒寒冰盾 
			Array(1082234,600,1),//永恒定边手套  
			Array(1082239,600,1),//重生定边手套  
			Array(1072355,600,1),// 永恒坚壁靴 
			Array(1072361,600,1),//重生坚壁靴  
			Array(1052155,600,1),// 永恒演武铠 
			Array(1052160,600,1),// 重生演武铠 
			Array(1002777,600,1),// 永恒玄妙帽 
			Array(1002791,600,1),// 重生玄妙帽 
			Array(1092057,600,1),//永恒魔光盾 
			Array(1082235,600,1),// 永恒逍遥手套 
			Array(1082240,600,1),// 重生逍遥手套
			Array(1072356,600,1),//永恒缥缈鞋  
			Array(1072362,600,1),// 重生缥缈鞋 
			Array(1052156,600,1),// 永恒奥神袍 
			Array(1052161,600,1),// 重生奥神袍 
			Array(1002778,600,1),// 永恒霓翎帽 
			Array(1002792,600,1),// 重生霓翎帽 
			Array(1082236,600,1),//永恒白云手套  
			Array(1082241,600,1),// 重生白云手套 
			Array(1072357,600,1),// 永恒彩虹鞋 
			Array(1072363,600,1),// 重生彩虹鞋 
			Array(1052157,600,1),// 永恒巡礼者 
			Array(1052162,600,1),// 重生巡礼者 
			Array(1092059,600,1),//永恒匿踪盾  
			Array(1002779,600,1),// 永恒迷踪帽 
			Array(1002793,600,1),//重生迷踪帽  
			Array(1082237,600,1),//永恒探云手套  
			Array(1082242,600,1),//重生探云手套  
			Array(1072358,600,1),// 永恒舞空靴 
			Array(1072364,600,1),//重生舞空靴  
			Array(1052158,600,1),// 永恒翻云服 
			Array(1052163,600,1),//重生翻云服  
			Array(1002780,600,1),//永恒海王星  
			Array(1002794,600,1),//重生海王星 
			Array(1072359,600,1),//永恒定海靴  
			Array(1072365,600,1),//重生定海靴  

			Array(3010073,20,1), //PB克缤
			Array(3012003,20,1) //爱心椅子

);

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
		else
			status--;
		if (status == 0) {
			cm.sendOk("在这个世界上还没有那个锁是我打不开的呢，呵呵。");
		} else if (status == 1) {
			if (cm.haveItem(4001102)) {
				cm.sendYesNo("你确定要打开这个箱子吗，先说说明一点，打开了也不一定有东西哦");
			}else{
				cm.dispose();
			}
		}
		else if (status == 2){	
			var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
			var chance = Math.floor(Math.random()*1000);
			var finalitem = Array();
			for(var i = 0 ;i<item.length;i++){
				if(item[i][1] >= chance){
					finalitem.push(item[i]);
				}
			}
			if(finalitem.length != 0){
				var random = new java.util.Random();
				var finalchance = random.nextInt(finalitem.length);
				var itemId = finalitem[finalchance][0];
				var quantity = finalitem[finalchance][2];
				if(ii.getInventoryType(itemId).getType() == 1){
					var toDrop = ii.randomizeStats(ii.getEquipById(itemId));
				}else{
					var toDrop = new net.sf.cherry.client.Item(itemId, 0, quantity);
				}
				cm.gainItem(4001102,-1);
				net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop,-1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "从【绯红骑士团任务】获得！大家一起恭喜他（她）吧！！！",toDrop, true).getBytes());
				
				cm.sendOk("希望你下次再来哦哈哈！");
				cm.dispose();
			}else{
				cm.sendOk("哎呀……你RP差到什么都没拿到！过段时间再来吧！");
				cm.gainItem(4001102,-1);
				cm.dispose();
			}
		}
	}
}
