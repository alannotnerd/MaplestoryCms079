/*
加点NPC
*/

var status = 0;
var fee;
var xap;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("很好下次再见");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("您好!我可以帮您快速加点喔!!#b\r\n#L0#增加力量#l #L1#增加敏捷#l #L2#增加智力#l #L3#增加运气#l#k");
        } else if (status == 1) {
          	 if(selection == 0){
			xap=1;
			cm.sendGetNumber("请问您要加多少点力量?",1,1,10000);
		 }else if(selection == 1){
			xap=2;
			cm.sendGetNumber("请问您要加多少点敏捷?",1,1,10000);
		 }else if(selection == 2){
			xap=3;
			cm.sendGetNumber("请问您要加多少点智力?",1,1,10000);
		 }else if(selection == 3){
			xap=4;
			cm.sendGetNumber("请问您要加多少点运气?",1,1,10000);
		 }
        } else if (status == 2) {
            fee = selection;
	    if(xap == 1){
		xap=5;
            	cm.sendYesNo("你确定要加 #r" + fee + "#k 点力量吗?");  
	    }else if(xap == 2){
		xap=6;
            	cm.sendYesNo("你确定要加 #r" + fee + "#k 点敏捷吗?");  
	    }else if(xap == 3){
		xap=7;
            	cm.sendYesNo("你确定要加 #r" + fee + "#k 点智力吗?");  
	    }else if(xap == 4){
		xap=8;
            	cm.sendYesNo("你确定要加 #r" + fee + "#k 点运气吗?");       
	    }	
        } else if (status == 3) {
	   var statup = new java.util.ArrayList();
	   var p = cm.c.getPlayer(); 	  
           if(xap == 5){
		if(p.getRemainingAp() < fee){
			cm.sendOk("您的AP不够加哦!");
			cm.dispose();
		}else{ 		
			var newxi = p.getStr() + fee;	
			var newap =  p.getRemainingAp()- fee;
			if (newxi > 32000){
				cm.sendOk("加点失败! 各项能力值最多不能超32000!");
				cm.dispose();
			}else{
				p.setRemainingAp (newap);
				p.setStr(newxi);			
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.STR, java.lang.Integer.valueOf(newxi)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newap)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("快速加点成功!");
				cm.dispose();
			      }
		}
	   }else if(xap == 6){
		if(p.getRemainingAp() < fee){
			cm.sendOk("您的AP不够加哦!");
			cm.dispose();
		}else{ 		
			var newxi = p.getDex() + fee;	
			var newap =  p.getRemainingAp() - fee;
			if (newxi > 32000){
				cm.sendOk("加点失败! 各项能力值最多不能超32000!");
				cm.dispose();
			}else{
				p.setRemainingAp (newap);
				p.setDex(newxi);			
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.DEX, java.lang.Integer.valueOf(newxi)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newap)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("快速加点成功!");
				cm.dispose();
			     }
		}
	   }else if(xap == 7){
		if(p.getRemainingAp() < fee){
			cm.sendOk("您的AP不够加哦!");
			cm.dispose();
		}else{ 		
			var newxi = p.getInt() + fee;	
			var newap =  p.getRemainingAp() - fee;
			if (newxi > 32000){
				cm.sendOk("加点失败! 各项能力值最多不能超32000!");
				cm.dispose();
			}else{
				p.setRemainingAp (newap);
				p.setInt(newxi);			
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.INT, java.lang.Integer.valueOf(newxi)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newap)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("快速加点成功!");
				cm.dispose();
			     }
		}
	   }else if(xap == 8){
		if(p.getRemainingAp() < fee){
			cm.sendOk("您的AP不够加哦!");
			cm.dispose();
		}else{ 		
			var newxi = p.getLuk() + fee;	
			var newap =  p.getRemainingAp() - fee;
			if (newxi > 32000){
				cm.sendOk("加点失败! 各项能力值最多不能超32000!");
				cm.dispose();
			}else{
				p.setRemainingAp (newap);
				p.setLuk(newxi);			
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LUK, java.lang.Integer.valueOf(newxi)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newap)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("快速加点成功!");
				cm.dispose();
			    }
		}
	   }
          
        }
    }
}
