function start() {
    cm.sendSimple ("您想要挑战扎昆吗。想好了，请告诉我。\r\n#k#e#L0#挑战扎昆 \r\n#L1#不去了，我害怕#k \r\n")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战扎困");
           } else if (cm.getBossLog('zakum') >= 10) {
            cm.sendOk("抱歉你只能参加10次");
	    cm.dispose();
           }else{
        	cm.setBossLog('zakum');
        	cm.warp(280030000, 0);
		cm.serverNotice("『挑战扎昆』：【"+ cm.getChar().getName() +"】非常凶悍的拿着苍蝇排去挑战扎昆去了");  
		cm.dispose();
	      }   
	 break;
	 case 1:
 	      	cm.sendOk("呵呵!原来你只是个胆小鬼");  
		cm.dispose();
		 
        }
    }
