function start() {
	status = -1;
	
	action(1, 0, 0);
}
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
			//cm.sendOk("感谢你的光临！");
			cm.dispose();
			return;                    
                }
                if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		        if (status == 0) {
			cm.sendSimple("  #r★★★★★★★#e小情绪冒险岛VIP中心★★★★★★★\r\n\r\n  #d剩余点卷#r " + cm.getNX(1) +" #d点\r\n  目前VIP等级为：#r"+cm.getChar().getVip()+"\r\n\r\n #L2#"+icon+" #d初级VIP#r 300W #d点卷#l \r\n #L3#"+icon+" 高级VIP #r500W #d点卷#l \r\n #L4#"+icon+" 超级VIP #r800W #d点卷#l \r\n #L9#"+icon+" VIP升级 #r300W #d点卷#l \r\n #L5#"+icon+" 转生凭证 #r30W #d点卷#l \r\n #L6#"+icon+" 3倍经验卡 #r200W #d点卷#l \r\n #L7#"+icon+" 浪人披风(粉) #r20W #d点卷#l \r\n #L8#"+icon+" 工地手套(褐) #r20W #d点卷#l");
				} else if (status == 1) {
					if (selection == 1) {
						//cm.sendOk("test");
				        cm.dispose();
				}else if  (selection == 2) {
				    if(cm.getNX(1) >= 3000000) {
					   cm.gainNX(1,-3000000);
					   cm.getChar().setVip(1);
					   cm.sendOk("初级VIP购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 3) {
			        if(cm.getNX(1) >= 5000000) {
					   cm.gainNX(1,-5000000);
					   cm.getChar().setVip(2);
					   cm.sendOk("高级VIP购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 4) {
			        if(cm.getNX(1) >= 8000000) {
					   cm.gainNX(1,-8000000);
					   cm.getChar().setVip(3);
					   cm.sendOk("超级VIP购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 5) {
			        if(cm.getNX(1) >= 300000) {
					   cm.gainNX(1,-300000);
					   cm.gainItem(4031692,1);
					   cm.sendOk("转生凭证购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 6) {
			        if(cm.getNX(1) >= 2000000) {
					   cm.gainNX(1,-2000000);
					   cm.gainItem(5211003,1);
					   cm.sendOk("3倍经验卡购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 7) {
			        if(cm.getNX(1) >= 200000) {
					   cm.gainNX(1,-200000);
					   cm.gainItem(1102041,1);
					   cm.sendOk("浪人披风(粉)购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 8) {
			        if(cm.getNX(1) >= 200000) {
					   cm.gainNX(1,-200000);
					   cm.gainItem(1082149,1);
					   cm.sendOk("工地手套(褐)购买成功！");
					   cm.dispose();
				    } else {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				    }
			    }else if  (selection == 9) {
			       if(cm.getChar().getVip() >=3 ) {
			           cm.sendOk("你已经是超级VIP了，无需再升级"); 
			           cm.dispose(); 
			   	   }else if (cm.getNX(1) < 300000) {
					   cm.sendOk("你没有足够的点卷，请充值！"); 
					   cm.dispose(); 
				   } else {
					   cm.gainNX(1,-300000);
					   cm.getChar().gainVip(1);
					   cm.sendOk("VIP升级成功");
					   cm.dispose();
				   }
				   
			    }
		}
	}
} 