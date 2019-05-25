function start() {	
	if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()){
	cm.sendOk("您至少应该让装备栏空出一格");
	cm.dispose();
	}else{
    cm.sendSimple ("#b在这里可以购买到永恒的装备哦！\r\n#d剩余:#r" + cm.getChar().getNX() + "点券\r\n【永恒武器】\r\n#L0##v1302081#3万点券#l#L1##v1312037#3万点券#l#L2##v1322060#3万点券#l\r\n#L3##v1332073#3万点券#l#L4##v1332074#3万点券#l#L5##v1372044#3万点券#l\r\n#L6##v1382057#3万点券#l#L7##v1402046#3万点券#l#L8##v1412033#3万点券#l\r\n#L9##v1422037#3万点券#l#L10##v1432047#3万点券#l#L11##v1442063#3万点券#l\r\n#L12##v1452057#3万点券#l#L13##v1462050#3万点券#l#L14##v1472068#3万点券#l\r\n#L15##v1482023#3万点券#l#L16##v1492023#3万点券#l\r\n\r\n【永恒鞋子】\r\n#L17##v1072355#3万点券#l#L18##v1072356#3万点券#l#L19##v1072357#3万点券#l\r\n#L20##v1072358#3万点券#l#L21##v1072359#3万点券#l\r\n\r\n【永恒衣服】\r\n#L22##v1052155#3万点券#l#L23##v1052156#3万点券#l#L24##v1052157#3万点券#l\r\n#L25##v1052158#3万点券#l#L26##v1052159#3万点券#l\r\n\r\n【永恒手套】\r\n#L27##v1082234#3万点券#l#L28##v1082235#3万点券#l#L29##v1082236#3万点券#l\r\n#L30##v1082237#3万点券#l#L31##v1082238#3万点券#l\r\n\r\n【永恒帽子】\r\n#L32##v1002776#3万点券#l#L33##v1002777#3万点券#l#L34##v1002778#3万点券#l\r\n#L35##v1002779#3万点券#l#L36##v1002780#3万点券#l\r\n\r\n【永恒首饰】\r\n#L37##v1102172#3万点券#l#L38##v1092057#3万点券#l#L39##v1092058#3万点券#l\r\n#L40##v1092059#3万点券#l#L41##v1032031#3万点券#l");    
	}
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1302081,1);//永恒破甲剑
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 1) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1312037,1);//永恒断蚺斧
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 2) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1322060,1);//永恒惊破天
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 3) { 
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1332073,1);//永恒狂鲨锯
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1332074,1);//永恒断首刃
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1372044,1);//永恒蝶翼杖
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 6) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1382057,1);//永恒冰轮杖
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 7) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1402046,1);//永恒玄冥剑
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1412033,1);//永恒碎鼋斧
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1422037,1);//永恒威震天
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1432047,1);//永恒显圣枪
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1442063,1);//永恒神光戟
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1452057,1);//永恒惊电弓
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1462050,1);//永恒冥雷弩
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1472068,1);//永恒大悲赋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1482023,1);//永恒孔雀翎
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1492023,1);//永恒凤凰铳
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072355,1);//永恒坚壁靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072356,1);//永恒缥缈鞋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072357,1);//永恒彩虹鞋
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072358,1);//永恒舞空靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.gainNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1072359,1);//永恒定海靴
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052155,1);//永恒演武铠
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052156,1);//永恒奥神袍
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052157,1);//永恒巡礼者
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052158,1);//永恒翻云服
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1052159,1);//永恒霸七海
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082234,1);//永恒定边手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082235,1);//永恒逍遥手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082236,1);//永恒白云手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082237,1);//永恒探云手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1082238,1);//永恒抚浪手套
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002776,1);//永恒冠军盔
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002777,1);//永恒玄妙帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 34) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//永恒玄妙帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 35) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002778,1);//永恒迷踪帽 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 36) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1002780,1);//永恒海王星 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 37) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1102172,1);//永恒不灭披风 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 38) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092057,1);//永恒魔光盾 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 39) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092058,1);//永恒寒冰盾
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 40) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1092059,1);//永恒匿踪盾 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
} else if (selection == 41) {
	if(cm.getChar().getNX() >= 30000) {
            cm.gainNX(-30000); 
	cm.gainItem(1032031,1);//永恒金盾坠 
        }else{
        cm.sendOk("对不起！您没有足够的点，不能给你兑换！！"); 
	cm.dispose();}
}
}