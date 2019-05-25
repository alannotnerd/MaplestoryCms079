function start() {


if (cm.getLevel() > 1 ) {  
    cm.sendSimple ("#b在这里必须要打败BOSS，在他们身上得到通过凭证，您才可以通过\r\n#d剩余G币:#r" + cm.getzb() + "点\r\n【普通椅子】\r\n #L0##v3010007#5万元宝#l#L1##v3010010#5万元宝#l#L2##v3010008#5万元宝#l\r\n#L3##v3010016#5万元宝#l#L4##v3010029#5万元宝#l#L5##v3010031#5万元宝#l\r\n#L6##v3010030#5万元宝#l#L7##v3010031#5万元宝#l#L8##v3010032#5万元宝#l\r\n#L9##v3010033#5万元宝#l#L10##v3010003#5万元宝#l#L11##v3010037#5万元宝#l\r\n\r\n\r\n【稀有椅子】\r\n#L12##v3010050#10万元宝#l #L13##v3012003#10万元宝#l #L14##v3010034#10万元宝#l\r\n#L15##v3010035#10万元宝#l#L16##v3010068#10万元宝#l#L17##v3010069#10万元宝#l\r\n#L18##v3010021#10万元宝#l#L19##v3010002#10万元宝#l#L20##v3010004#10万元宝#l\r\n#L21##v3010005#10万元宝#l#L22##v3010006#10万元宝#l#L23##v3012001#10万元宝#l\r\n#L24##v3012002#10万元宝#l#L25##v3010046#10万元宝#l#L26##v3010047#10万元宝#l\r\n#L27##v3010041#10万元宝#l#L28##v3010043#10万元宝#l#L29##v3010051#10万元宝#l\r\n#L30##v3010052#10万元宝#l#L31##v3010044#10万元宝#l#L32##v3010036#10万元宝#l\r\n#L33##v3010019#10万元宝#l");
    } else {
    cm.sendOk("找我什么事，想要启动我的力量吗，你需要足够的条件")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010007,1);//粉色海狗靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 1) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010010,1);//白玉海豹靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 2) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010008,1);//蓝色海狗靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 3) { 
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010016,1);//黑色海狗靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010029,1);//蓝环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010031,1);//红环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 6) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010030,1);//黑环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 7) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010031,1);//红环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010032,1);//黄环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010033,1);//绿环凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010003,1);//红色时尚转椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getzb() >= 50000) {
            cm.setzb(-50000); 
	cm.gainItem(3010037,1);//亲亲嘴凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010050,1);//公主凳
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012003,1);//爱心椅子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010034,1);//悠长假期(红色)
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010035,1);//悠长假期(蓝色)
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010068,1);//露水椅子
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010069,1);//大黄风
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010021,1);//暖暖桌
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010002,1);//绿色时尚转椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010004,1);//黄蓝休闲椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010005,1);//红蓝休闲椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010006,1);//黄色时尚转椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 23) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012001,1);//篝火
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 24) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3012002,1);//浴桶
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 25) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010046,1);//红龙椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 26) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010047,1);//蓝龙椅
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 27) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010041,1);//骷髅王座
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 28) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010043,1);//魔女的飞扫把
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 29) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010051,1);//沙漠兔子1靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 30) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010052,1);//沙漠兔子2靠垫
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 31) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010044,1);//同一红伞下
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 32) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010036,1);//浪漫秋千
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 33) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(3010019,1);//寿司椅 
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 34) {
	if(cm.getMeso() <= 21000000) {
        cm.sendOk("抱歉你没有2100万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-21000000);
        cm.summonMob(8160000, 700000, 26500, 30);时间门神 
	cm.dispose(); } 

} else if (selection == 60) {
	if(cm.getMeso() <= 22000000) {
        cm.sendOk("抱歉你没有2200万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-22000000);
        cm.summonMob(8170000, 850000, 27500, 30);黑甲凶灵
	cm.dispose(); } 

} else if (selection == 61) {
	if(cm.getMeso() <= 23000000) {
        cm.sendOk("抱歉你没有2300万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-23000000);
        cm.summonMob(8141100, 900000, 28500, 30);大海贼王
	cm.dispose(); } 
} else if (selection == 62) {
	if(cm.getMeso() <= 24000000) {
        cm.sendOk("抱歉你没有2400万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-24000000);
        cm.summonMob(8143000, 1000000, 30000, 30);时之鬼王 
	cm.dispose(); } 
} else if (selection == 63) {
        if (cm.getBossLog('EMGC') < 1) {
cm.warp(910000022, 0);
                    cm.setBossLog('EMGC');
                    cm.dispose();
                }else{
                    cm.sendOk("你每天只能进入1次超级恶魔广场!");
                    mode = 1;
                    status = -1; }
} else if (selection == 64) {
         cm.warp(209000001, 0);
         cm.dispose();  
                
}
}
