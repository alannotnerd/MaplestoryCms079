importPackage(net.sf.cherry.client);
var status = 0;
var totAp = 0;
var newAp;
var newStr;
var newDex;
var newInt;
var newLuk;
var Strings = Array("","","","","");
var aplist;
var apnamelist = Array(1,2,3,4);//用来排序的数组
var statup;
var p;
var kou = 800;   //转身后需要扣掉的能力点
var needMeso = 200000000;
var needLevel = 180;
var Skills = Array(1111002,11111001,5121003,5111005,15111002);  //这里设置转身后不保留的技能
function start() {
	statup = new java.util.ArrayList();
	p = cm.c.getPlayer();
  totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();  //总能力点	
  newStr =  p.getStr();
	newDex =  p.getDex();	
	newInt =  p.getInt();
	newLuk =  p.getLuk();
	aplist= Array(p.getStr(), p.getDex(), p.getInt(), p.getLuk()); 	
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {//ExitChat
		cm.dispose();
  }else if (mode == 0){//No
		cm.sendOk("好的, 请告诉我你确定需要 #b投胎转世#k.");
		cm.dispose();
	}else{            //Regular Talk
		if (mode == 1)
    status++;
    else
    status--;    
    if (status == 0) {		
			cm.sendYesNo("啊哈... 伟大的#b#h ##k。你已经通过一个漫长而充满挑战的道路，终于成为了风起云涌的人物。如果您能给我5E金币和#b1个蘑菇王型橡皮擦#k #v4001010#(绯红任务得到)。 我可以用我的乾坤大挪移心法，助你转世！ 但是我会清光你的装备放在包包里! 您将成为1级的 #b新手#k, 并且同时将您所有的#b技能#k扣除，但你能传承你的属性总和扣除" + kou + "点后剩余的点数，你是否想#r转生#k呢?"); 		
		}else if (status == 1) {
			if(cm.getChar().getLevel() < needLevel){
      	cm.sendOk("很抱歉，您需要" + needLevel + "级，才可以投胎转世.");
	      cm.dispose();
      }else if (totAp < (kou + 16)){ 
	    	cm.sendOk("您对能力值出现异常现象!不符合转生的条件!"); 
	      cm.dispose(); 
      }else if (cm.haveItem(4001010) == false){ 
	      cm.sendOk("你没有带来#b蘑菇王型橡皮擦#k "); 
	      cm.dispose(); 
      }else if (cm.getMeso() < needMeso) {
	    	cm.sendOk("你没有2E金币,我不能帮你的忙哦."); 
	      cm.dispose();
      }else{	
      	var temp;
				for (var j = 0; j < 3; j++){   //有名的冒气泡排顺法。主要用于排列数组apnamelist里的数据。实现从大到小排列能力值。
	 				for (var i = 0; i < 3 - j; i++){
						if(aplist[i] < aplist[i+1]){
							temp = aplist[i];
							aplist[i] = aplist[i+1];
							aplist[i+1] = temp;				
							temp = apnamelist[i];
							apnamelist[i] = apnamelist[i+1];
							apnamelist[i+1] = temp;
						}
	  			}
			 	} 
      	if(p.getRemainingAp() >= kou){
			 		newAp = p.getRemainingAp() - kou;
					Strings[0] = " AP值将扣去 #r" + kou + " #k点";	
					kou = 0;
				}else{
					newAp =0;
					kou = kou - p.getRemainingAp();
					if (p.getRemainingAp() > 0){
					Strings[0] = " AP值将扣去 #r" + p.getRemainingAp() + " #k点";
					}  
				}
				for(x = 0; x < 4; x++){
					if(kou > 0){
						if(apnamelist[x] == 1){					
							if(p.getStr() - 4 >= kou){
								newStr = p.getStr() - kou;
								Strings[1] = " 力量将扣去 #r" + kou + "#k 点";
								kou = 0;			
							}else{
								newStr = 4;
								kou = kou - (p.getStr() - 4);
								Strings[1] = " 力量将扣去 #r" + (p.getStr() - 4) + "#k 点";			
							}
						}else if(apnamelist[x] == 2){
							if(p.getDex() - 4 >= kou){
								newDex = p.getDex() - kou;
								Strings[2] = " 敏捷将扣去 #r" + kou + "#k 点";			
								kou = 0;
							}else{
								newDex = 4;
								kou = kou - (p.getDex() - 4);
								Strings[2] = " 敏捷将扣去 #r" + (p.getDex() - 4) + "#k 点";			
							}
						}else if(apnamelist[x] == 3){
							if(p.getInt() - 4 >= kou){
								newInt = p.getInt() - kou;
								Strings[3] = " 智力将扣去 #r" + kou + "#k 点";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getInt() - 4);
								Strings[3] = " 智力将扣去 #r" + (p.getInt() - 4) + "#k 点";
							}
						}else if(apnamelist[x] == 4){
							if(p.getLuk() - 4 >= kou){
								newLuk = p.getLuk() - kou;
								Strings[4] = " 运气将扣去 #r" + kou + "#k 点";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getLuk() - 4);
								Strings[4] = " 运气将扣去 #r" + (p.getLuk() - 4) + "#k 点";
							}
						}
						if (kou < 1) break;
					}	
				}
			var St = "";
			for(s = 0; s < 5; s++){
				if(Strings[s] != "") St = St + Strings[s] + "\r\n";
			}
	    cm.sendOk("#e#b您做得非常好, 你现在确定要投胎转世吗？您转身后能力值会扣除800点!扣除详细情况如下!#k\r\n" + St + "#n");
	    }
      }else if (status == 2){
					cm.sendSimple("恭喜你修炼有成. 你想投胎成为什么职业呢?#b\r\n#L0#新手#l\r\n#L1#战童#l\r\n#L2#初心者#l#k");
			}else if (status == 3){	      
				if(selection == 0)  {						
		    	cm.changeJob(net.sf.cherry.client.MapleJob.BEGINNER);
        }
				if(selection == 1){	
	        cm.changeJob(net.sf.cherry.client.MapleJob.Ares);
        }
				if(selection == 2){			
        	cm.changeJob(net.sf.cherry.client.MapleJob.KNIGHT);        	
	      }
				cm.gainMeso(-needMeso);
	      cm.gainItem(4001010,-1);
	      for(var n = 0; n < Skills.length; n++){
	      	cm.getPlayer().changeSkillLevel(SkillFactory.getSkill(Skills[n]),0,0); //清除一些不保留的技能
	      } 
	      cm.getChar().doReborns(); //转身次数记录
				//cm.unequipEverything(); //脱装备语句，需要的去掉前面的“//”
        cm.sendNext("#e#b您做得非常好#k, 您已经成功转生了,您现在的属性点情况如下：\r\n" + "   力量: #r" + newStr + " #k点" + "\r\n   敏捷: #r" + newDex + " #k点" + "\r\n   智力: #r" + newInt + " #k点" + "\r\n   运气: #r" + newLuk + " #k点" + "\r\n   未分配的AP: #r" + newAp + " #k点");
        p.setRemainingAp(newAp);
				p.setStr(newStr);
				p.setDex(newDex);
				p.setInt(newInt);
				p.setLuk(newLuk);
				p.setLevel(1);		
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.STR, java.lang.Integer.valueOf(newStr)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.DEX, java.lang.Integer.valueOf(newDex)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LUK, java.lang.Integer.valueOf(newLuk)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.INT, java.lang.Integer.valueOf(newInt)));
				statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LEVEL, java.lang.Integer.valueOf(1)));
	      statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(1))); 
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newAp)));
				p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.getPlayer().saveToDB(true);  //保存
				cm.serverNotice("[转生系统]: 恭喜 [" + cm.getPlayer() + "] 第 " + cm.getChar().getReborns() + " 次转生成功！"); 
 				cm.dispose();           
		}
  }
}
 
    
