/*
 *
 *  此脚本由乐章网络制作完成
 * 购买商业脚本请加群:1049548
 *
 */


importPackage(net.sf.cherry.client);

var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";
var zzz = "#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";

//------------------------------------------------------------------------

var chosenMap = -1;
var monsters = 0;
var towns = 0;
var bosses = 0;
var fuben = 0;

//------------------------------------------------------------------------

var bossmaps = Array(
		Array(105040316,10,"沉睡森林跳跳"),	
		//Array(109010000,10,"冒险岛活动-寻找宝物"), 
		Array(109040001,10,"冒险岛活动跳跳"), 
		Array(103000900,10,"地铁三号线跳跳"),      
		Array(280020000,10,"火山跳跳"), 
		Array(101000100,10,"忍苦跳跳") 											
		);

//------------------------------------------------------------------------

var monstermaps = Array(
		Array(702000000,0,"少林寺"), 
		Array(701000000,0,"上海外滩"), 
		Array(550000000,0,"马来西亚"), 
		Array(551000000,0,"甘榜村")
		); 

//------------------------------------------------------------------------

var townmaps = Array(

		//Array(701000210,0,"大擂台"), 
		Array(910000000,0,"自由市场")
		);

//------------------------------------------------------------------------

var fubenmaps = Array(
		Array(800020400,0,"家族PK地图"),
		Array(193000000,0,"网吧地图")						
		);

//------------------------------------------------------------------------

	function start() {
		status = -1;
		action(1, 0, 0);
		}
	function action(mode, type, selection) {
	if (mode == -1) {
		cm.sendOk("#b好的,下次再见.");
		cm.dispose();
		} else {
	if (status >= 0 && mode == 0) {
		cm.sendOk("#b好的,下次再见.");
		cm.dispose();
		return;
		}
	if (mode == 1) {
		status++;
		} else {
		status--;
		}

//------------------------------------------------------------------------

	if (status == 0) {

   	    var add = "#e#r豆豆#k冒险岛.快捷传送服务.#k\r\n\r\n";

//		add += "#r　　　　　　　　　新物品展览#k\r\n";

//		add += "#b座椅#k\r\n";

//		add += "#v3010154# #v3010179# #v3010169# #v3010171# #v3010174# #v3010182# #v3010183# #v3010053##b\r\n\r\n";

//		add += "#b坐骑#k\r\n";

//		add += "#v1902060# #v1912053# #v1902062# #v1912055# #v1902063# #v1912056# #v1902040# #v1912057#\r\n\r\n";

		add += "#L0##e#d快捷传送#l ";

		add += "#L1#海外旅游#l ";
		
//		add += "#L2#跳跳地图传送#l ";

	//	add += "#L3##rBOSS状态#l ";
 
		//add += "#L4##r系统活动传送#l ";
		cm.sendSimple (add);    

//------------------------------------------------------------------------
				
	} else if (status == 1) {

	if (selection == 0){
		var selStr = "#r#k\r\n#d　　　　　　　　　选择你的目的地吧.#k#b";
		for (var i = 0; i < townmaps.length; i++) {
		selStr += "\r\n#L" + i + "#" + townmaps[i][2] + "";
		}
		cm.sendSimple(selStr);
		towns = 1;
		}

	if (selection == 1) {
		var selStr = "#r#k\r\n#d　　　　　　　　　选择你的目的地吧.#k#b";
		for (var i = 0; i < monstermaps.length; i++) {
		selStr += "\r\n#L" + i + "#" + monstermaps[i][2] + "";
		}
		cm.sendSimple(selStr);
		monsters = 1;
		}

	if (selection == 2) {
		var selStr = "#r#k\r\n#d　　　　　　　　　选择你的目的地吧.#k#b";
		for (var i = 0; i < bossmaps.length; i++) {
		selStr += "\r\n#L" + i + "#" + bossmaps[i][2] + "";
		}
		cm.sendSimple(selStr);
		bosses = 1;
		}

	if (selection == 3) {
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(1).getMapFactory().getMap(280030000);
		var zha1 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(2).getMapFactory().getMap(280030000);
		var zha2 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(3).getMapFactory().getMap(280030000);
		var zha3 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(4).getMapFactory().getMap(280030000);
		var zha4 = map.getCharacters().toArray().length;

		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(1).getMapFactory().getMap(240060200);
		var hei1 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(2).getMapFactory().getMap(240060200);
		var hei2 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(3).getMapFactory().getMap(240060200);
		var hei3 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(4).getMapFactory().getMap(240060200);
		var hei4 = map.getCharacters().toArray().length

		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(1).getMapFactory().getMap(270050100);
		var pb1 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(2).getMapFactory().getMap(270050100);
		var pb2 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(3).getMapFactory().getMap(270050100);
		var pb3 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(4).getMapFactory().getMap(270050100);
		var pb4 = map.getCharacters().toArray().length

		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(1).getMapFactory().getMap(220080001);
		var nao1 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(2).getMapFactory().getMap(220080001);
		var nao2 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(3).getMapFactory().getMap(220080001);
		var nao3 = map.getCharacters().toArray().length;
		var map = net.sf.cherry.net.channel.ChannelServer.getInstance(4).getMapFactory().getMap(220080001);
		var nao4 = map.getCharacters().toArray().length

   	    var add = "以下所示为各线的BOSS战况#b\r\n";

		add += ""+aaa+"[#r频道一#b]\r\n";

		add += ""+zzz+"[#d闹钟#b]：#r"+nao1+"#b人  [#d扎昆#b]：#r"+zha1+"#b人  [#d黑龙#b]：#r"+hei1+"#b人\r\n\r\n";

		add += ""+aaa+"[#r频道二#b]\r\n";

		add += ""+zzz+"[#d闹钟#b]：#r"+nao2+"#b人  [#d扎昆#b]：#r"+zha2+"#b人  [#d黑龙#b]：#r"+hei2+"#b人\r\n\r\n";

		add += ""+aaa+"[#r频道三#b]\r\n";

		add += ""+zzz+"[#d闹钟#b]：#r"+nao3+"#b人  [#d扎昆#b]：#r"+zha3+"#b人  [#d黑龙#b]：#r"+hei3+"#b人\r\n\r\n";

		add += ""+aaa+"[#r频道四#b]\r\n";

		add += ""+zzz+"[#d闹钟#b]：#r"+nao4+"#b人  [#d扎昆#b]：#r"+zha4+"#b人  [#d黑龙#b]：#r"+hei4+"#b人\r\n\r\n";
 
		cm.sendOk (add); 

		cm.dispose();

                   }
				   
	if (selection == 4) {
            cm.openNpc(9310100, 0);
		}


//------------------------------------------------------------------------

	} else if (status == 2) {

	if (towns == 1) {
		cm.sendYesNo("你确定要去 " + townmaps[selection][2] + "?");
		chosenMap = selection;
		towns = 2;

	} else if (monsters == 1) {
		cm.sendYesNo("你确定要去 " + monstermaps[selection][2] + "?");
		chosenMap = selection;
		monsters = 2;

	} else if (bosses == 1) {
		cm.sendYesNo("你确定要去 " + bossmaps[selection][2] + "?");
		chosenMap = selection;
		bosses = 2;

	} else if (fuben == 1) {
		cm.sendYesNo("你确定要去 " + fubenmaps[selection][2] + "?");
		chosenMap = selection;
		fuben = 2;

		}

//----------------------------------------------------------------------

	} else if (status == 3) {

	if (towns == 2) {
		if(cm.getMeso()>=townmaps[chosenMap][1]){
		cm.warp(townmaps[chosenMap][0], 0);
		cm.gainMeso(-townmaps[chosenMap][1]);
		}else{
		cm.sendOk("你没有足够的金币哦!");
		}
		cm.dispose();

	} else if (monsters == 2) {
		if(cm.getMeso()>=monstermaps[chosenMap][1]){
		cm.warp(monstermaps[chosenMap][0], 0);
		cm.gainMeso(-monstermaps[chosenMap][1]);
		}else{
		cm.sendOk("你没有足够的金币哦!");
		}
		cm.dispose();

	} else if (bosses == 2) {
		if(cm.getMeso()>=bossmaps[chosenMap][1]){
		cm.warp(bossmaps[chosenMap][0], 0);
		cm.gainMeso(-bossmaps[chosenMap][1]);
		}else{
		cm.sendOk("你没有足够的金币哦!");
		}
		cm.dispose();

	} else if (fuben == 2) {
		if(cm.getMeso()>=fubenmaps[chosenMap][1]){
		cm.warp(fubenmaps[chosenMap][0], 0);
		cm.gainMeso(-fubenmaps[chosenMap][1]);
		}else{
		cm.sendOk("你没有足够的金币哦!");
		}
		cm.dispose();

                }

//------------------------------------------------------------------------

		}
		}
		}

