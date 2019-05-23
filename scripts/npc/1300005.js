function start() {


if (cm.getLevel() > 1 ) {  
    cm.sendSimple ("#b您好，我是消耗品售货员，您需要购买什么吗\r\n#d剩余:#r" + cm.getzb() + "元宝\r\n                 【50元宝1瓶】\r\n #L0##v2000005#1瓶#l   #L1##v2000005#10瓶#l   #L2##v2000005#100瓶#l\r\n\r\n                 【50元宝1瓶】\r\n #L3##v2022178#1瓶#l     #L4##v2022178#10瓶#l   #L5##v2022178#100瓶#l#l\r\n\r\n                 【300元宝1瓶】\r\n                  【1000元宝1瓶】\r\n #L9##v2022244#1瓶#l     #L10##v2022244#10瓶#l   #L11##v2022244#100瓶#l\r\n\r\n                 【1000元宝1瓶】\r\n #L12##v2210000#1瓶#l     #L13##v2210000#10瓶#l   #L14##v2210000#100瓶#l\r\n\r\n                 【1000元宝1瓶】\r\n #L15##v2210001#1瓶#l     #L16##v2210001#10瓶#l   #L17##v2210001#100瓶#l");
    } else {
    cm.sendOk("找我什么事，想要启动我的力量吗，你需要足够的条件")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
	if(cm.getzb() >= 50) {
            cm.setzb(-50); 
	cm.gainItem(2000005,1);//超级药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 1) {
	if(cm.getzb() >= 500) {
            cm.setzb(-500); 
	cm.gainItem(2000005,10);//超级药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 2) {
	if(cm.getzb() >= 5000) {
            cm.setzb(-5000); 
	cm.gainItem(2000005,100);//超级药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 3) { 
	if(cm.getzb() >= 50) {
            cm.setzb(-50); 
	cm.gainItem(2022178,1);//万能治疗药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 4) {
	if(cm.getzb() >= 500) {
            cm.setzb(-500); 
	cm.gainItem(2022178,10);//万能治疗药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 5) {
	if(cm.getzb() >= 5000) {
            cm.setzb(-5000); 
	cm.gainItem(2022178,100);//万能治疗药水
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 6) {
	if(cm.getzb() >= 300) {
            cm.setzb(-300); 
	cm.gainItem(2022245,1);//心跳停止糖
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 7) {
	if(cm.getzb() >= 3000) {
            cm.setzb(-3000); 
	cm.gainItem(2022245,10);//心跳停止糖
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 8) {
	if(cm.getzb() >= 30000) {
            cm.setzb(-30000); 
	cm.gainItem(2022245,100);//心跳停止糖
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 9) {
	if(cm.getzb() >= 1000) {
            cm.setzb(-1000); 
	cm.gainItem(2022244,1);//巧克力夹心派
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 10) {
	if(cm.getzb() >= 10000) {
            cm.setzb(-100000); 
	cm.gainItem(2022244,10);//巧克力夹心派
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 11) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(2022244,100);//巧克力夹心派
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 12) {
	if(cm.getzb() >= 1000) {
            cm.setzb(-1000); 
	cm.gainItem(2210000,1);//蘑菇仔的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 13) {
	if(cm.getzb() >= 10000) {
            cm.setzb(-10000); 
	cm.gainItem(2210000,10);//蘑菇仔的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 14) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(2210000,100);//蘑菇仔的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 15) {
	if(cm.getzb() >= 1000) {
            cm.setzb(-1000); 
	cm.gainItem(2210001,1);//漂漂猪的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 16) {
	if(cm.getzb() >= 10000) {
            cm.setzb(-10000); 
	cm.gainItem(2210001,10);//漂漂猪的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 17) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(2210001,100);//漂漂猪的雕像
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 18) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302025,1);//红雨伞
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 19) {
	if(cm.getzb() >= 100000) {
            cm.setzb(-100000); 
	cm.gainItem(1302084,1);//火柴
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}
} else if (selection == 20) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1442018,1);//冻冻鱼
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 21) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1322051,1);//七夕
        }else{
        cm.sendOk("抱歉你没有足够的元宝"); 
	cm.dispose();}

} else if (selection == 22) {
	if(cm.getzb() >= 300000) {
            cm.setzb(-300000); 
	cm.gainItem(1302080,1);//七彩霓虹灯泡
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