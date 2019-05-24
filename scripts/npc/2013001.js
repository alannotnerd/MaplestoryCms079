function action(mode, type, selection) {
    if (cm.getPlayer().getMapId() == 920011200) { //exit
	for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}
	cm.warp(200080101);//����
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("OrbisPQ");
    if (em == null) {
	cm.sendOk("����һ�γ���.");
	cm.dispose();
	return;
    }
    if (cm.getLevel() > 200 ) {  
	cm.sendOk("��ֻ�����Ķӳ�˵��!");
	cm.dispose();
	return;
    }
    if (em.getProperty("pre").equals("0")) {
	for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}
	cm.sendNext("��Ⱦ��ң��ұ������˰ְֵ�С�����ӡ�£��������Ŀֲ��������������е������޵��񶼷Ŵ��˵ط������ǵð���Ū������Ŷ���Բ����ҵĹܼң�˵���������޵Ļʼ����ˡ���������е��ƴ��ˣ����20���ƶ���Ƭ�����ͼͤ�ӵĹ����£�");
	cm.dispose();
	return;
    }
    switch(cm.getPlayer().getMapId()) {
	case 920010000:
	    cm.warpParty(920010000, 2);//���͵������ͼ�����ӵ�ͼ
	    cm.givePartyExp(1);
	    break;
	case 920010100:
	    if (em.getProperty("stage").equals("6")) {
		if (em.getProperty("finished").equals("0")) {
		    cm.warpParty(920010800); //GARDEN.	
		} else {
		    cm.sendOk("лл��ƴ����Ů����������ȥBOSS�ذɣ�");
		}
	    } else {
		cm.sendOk("���ռ�Ů����ĸ�����������Ů����ƴ�ã�Ȼ�����ң�����ȥBOSS��ͼ");
	    } 
	    break;
	case 920010200: //walkway
	    if (!cm.haveItem(4001050,30)) {
		cm.sendOk("����������30����Ƭ���ң����������û��Ҫ����Ϊ������Ƭ!");
	    } else if(cm.haveItem(4001044,1)){
		cm.sendOk("�ռ��ɹ�������Գ�ȥ��!");
	    } else {
		cm.removeAll(4001050);
		cm.gainItem(4001044,1); //first piece
		cm.gainItem(4001049,1); //sixth
		cm.givePartyExp(20000);
		clear();
	    }
	    break;
	case 920010300: //storage
	    if (!cm.haveItem(4001051,15)) {
		cm.sendOk("���ռ�15����Ƭ���ң�����Сʨ�ӻ��!\r\n�������濪ʼ��������1-15�㣬����ǵ����㣬�ұ���˫����\r\n\r\nʨ�����γ��ֵĲ���Ϊ��\r\n1�� 10�� 9�� 13�� 11��\r\n 6�� 12�� 2�� 5�� 15��\r\n 8�� 4�� 7�� 3�� 14�㡣");
	    } else if(cm.haveItem(4001045,1)){
		cm.sendOk("���Ѿ����ˣ����Գ�ȥ��!");
	    } else {
		cm.removeAll(4001051);
		cm.gainItem(4001045,1);
		cm.givePartyExp(20000);
		clear();
	    }
	    break;
	case 920010400: //lobby
	    if (em.getProperty("stage3").equals("0")) {
		cm.sendOk("�룬�ҵ������Ƭ��һ�ܣ��������������ֲ��š�\r\n#v4001056#������\r\n#v4001057#����һ\r\n#v4001058#���ڶ�\r\n#v4001059#������\r\n#v4001060#������\r\n#v4001061#������\r\n#v4001062#������\r\n");
	    } else if (em.getProperty("stage3").equals("1")) {
		if (cm.canHold(4001046,1)) {
		    cm.gainItem(4001046,1); //third piece
		    cm.givePartyExp(20000);
		    clear();
		    em.setProperty("stage3", "2");
		} else {
		    cm.sendOk("Please make room!");
		}
	    } else {
		cm.sendOk("Thank you so much!");
	    }
	    break;
	case 920010500: //sealed
	    if (em.getProperty("stage4").equals("0")) {
		var players = Array();
		var total = 0;
		for (var i = 0; i < 3; i++) {
		    var z = cm.getMap().getNumPlayersItemsInArea(i);
		    players.push(z);
		    total += z;
		}
		if (total != 3) {
		    cm.sendOk("��Ҫ3������վ��̨�ף���һ���˶����У���ʾ�ǣ�\r\n300��030��003��������˳������վ�ã�");
		} else {
		    var num_correct = 0;
		    for (var i = 0; i < 3; i++) {
			if (em.getProperty("stage4_" + i).equals("" + players[i])) {
			    num_correct++;
			}
		    }
		    if (num_correct == 3) {
			if (cm.canHold(4001047,1)) {
	    		    clear();
			    cm.gainItem(4001047,1); //fourth
			    cm.givePartyExp(30000);
	    		    em.setProperty("stage4", "1");
			} else {
			    cm.sendOk("Please make room!");
			}
		    } else {
    	    		cm.showEffect(true, "quest/party/wrong_kor");
    	    		cm.playSound(true, "Party1/Failed");
			if (num_correct > 0) {
			    cm.sendOk("One of the platforms is correct.");
			} else {
			    cm.sendOk("All of the platforms are wrong.");
			}
		    }
		}
	    } else {
		cm.sendOk("The portal is opened! Go!");
	    }
	    cm.dispose();
	    break;
	case 920010600: //lounge
	    if (!cm.haveItem(4001052,20)) {
		cm.sendOk("�ռ�20����Ƭ���ң����������С���ݴ����ӻ�ã�����");
	    } else if(cm.haveItem(4001048,1)){
		cm.sendOk("�ռ��ɹ�������Գ�ȥ��!");
	    cm.dispose();
	    } else {
		cm.givePartyItems(4001052,-1,true);
		cm.removeAll(4001052);
		cm.gainItem(4001048,1); //fifth piece
		cm.givePartyExp(10000);
		clear();
	    }
	    break;
	case 920010700: //on the way up
	    if (em.getProperty("stage6").equals("0")) {
		var react = Array();
		var total = 0;
	    	for(var i = 0; i < 3; i++) {
		    if (cm.getMap().getReactorByName("" + (i + 1)).getState() > 0) {
			react.push("1");
			total += 1;
		    } else {
			react.push("0");
		    }
	    	}
		if (total != 2) {
		    cm.sendOk("�����ȫ�������Ŷ�Э����ȥ���������3�����ӣ���������������Ӳ��ô򣬶ӳ����Ҿ���\r\n\r\n#r������ʾ����ȥһ�����ݣ���һ����Ҽ�¼һ�£�");
		} else {
		    var num_correct = 0;
		    for (var i = 0; i < 3; i++) {
			if (em.getProperty("stage62_" + i).equals("" + react[i])) {
			    num_correct++;
			}
		    }
		    if (num_correct == 3) {
			if (cm.canHold(4001049,1)) {
	    		    clear();
			    cm.gainItem(4001049,1); //sixth
			    cm.givePartyExp(100000);
	    		    em.setProperty("stage6", "1");
			} else {
			    cm.sendOk("Please make room!");
			}
		    } else {
    	    		cm.showEffect(true, "quest/party/wrong_kor");
    	    		cm.playSound(true, "Party1/Failed");
			if (num_correct >= 1) { //this should always be true
			    cm.sendOk("One of the levers is correct.");
			} else {
			    cm.sendOk("Both of the levers are wrong.");
			}
		    }
		}
	    } else {
		cm.sendOk("Thank you!!");
	    }
	    break;
	case 920010800:
	    cm.sendNext("����������ӣ��������ߵ������ϣ��Ѻ�ɫ��ʳ�˻�������BOSS�ͳ����ˣ�Ȼ���BOSS��������ر���ֵ����ӣ����ر���ֵ����ӣ����������ϣ������ݣ�����ͨ���������ݻ���������ӣ�Ȼ���ȥ���������ݶ���Ů������м䣡"); 
	    break;
	case 920010900:
	    cm.sendNext("�������ļ�����������������ҵ�һЩ�óԵĶ�����"); 
	    break;
	case 920011000:
	    cm.sendNext("������¥�����ؿռ䡣������������ҵ�һЩ�óԵĶ�����"); 
	    break;
    }
    cm.dispose();
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}