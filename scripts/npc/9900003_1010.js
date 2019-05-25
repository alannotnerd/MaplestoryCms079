var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
var ah = "#fEffect/CharacterEff/1082565/2/0#"; //兔子蓝
var bj = "#fEffect/characterEff/1082312/0/0#"; //彩色圆圈
var af = "#fEffect/CharacterEff/1003271/0/0#"; //爱心粉7
var oo = "#fEffect/CharacterEff/1051294/2/0#"; //星光粉
var status = -1;
var beauty = 0;
var tosend = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果您需要洗血的话，那么请下次来找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getNX(1) / 10 == 0) {
                    cm.sendNext("您的点卷不足，无法兑换血量。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber(oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+""+oo+"\r\n"+icon+"您好,欢迎使用点卷购买血量上限\r\n"+ah+"点卷血量比率 #r10：1 #k血量#v2000013##v2000013##v2000013#\r\n"+ah+"目前点卷#r "+cm.getNX(1)+" #k点\r\n"+af+""+af+""+af+""+af+""+af+"#r注：请输入要购买的数量\r\n", 1, 1, cm.getPlayer().getCSPoints(1) / 10);
                }
            } 
        } else if (status == 1) {
			var getmaxhp = cm.getChar().getStat().getMaxHp();
			var getmaxmp = cm.getChar().getStat().getMaxMp();
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.playerMessage(1,"输入的兑换数字错误.");
                    cm.dispose();
                }else if(selection>10000){
					cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于1万。");
                    cm.dispose();
                } else if (getmaxhp + selection > 500000) {
                    cm.cm.playerMessage(1,"请确认你的最大HP不会超过50万");
                    cm.dispose(); 

                }else if (cm.getPlayer().getCSPoints(1) >= selection * 10) {
                    cm.gainNX( - selection * 10);
                    cm.getChar().getStat().setMaxHp(getmaxhp+selection * 1,cm.getChar());
					cm.finishActivity(120112);
                    cm.sendOk("您成功将#r " + (selection * 10) + " #k点卷换为 x #r" + selection + " 血量#k")
					cm.worldSpouseMessage(0x20,"[洗血服务] 玩家 "+ cm.getChar().getName() +" 成功将 " + (selection * 10) + " 点卷换为 " + selection + " Hp。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换Hp。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
				  if (selection <= 0) {
                      cm.playerMessage(1,"输入的兑换数字错误.");
                      cm.dispose();
                  }else if(selection > 10000){
					  cm.playerMessage(1,"单次输入的数字不能小于1,且不能大于1万.");
                      cm.dispose();
                  } else if (getmaxhp + selection > 500000) {
                      cm.playerMessage("请确认你的最大HP不会超过50万");
                      cm.dispose(); 
                  }else if (getmaxmp >0 ) {
                    cm.getChar().getStat().setMaxMp(getmaxmp-selection * 1,cm.getChar());
					cm.getChar().getStat().setMaxHp(getmaxhp+selection * 1,cm.getChar());
					cm.finishActivity(120113);
                    cm.sendOk("您成功将 x #r" + selection +" #kMp#r "+ " #k换为#r " + (1 * selection) + " #kHP。");
					//cm.worldSpouseMessage(0x19,"[洗血服务] 玩家 "+ cm.getChar().getName() +" 成功将" + selection + " Mp 换为 " + (1 * selection) + " Hp。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换Hp。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
