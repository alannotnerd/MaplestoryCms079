var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//��ȡ���

//�ȼ�����
var minlvl = 130;
var maxlvl = 200;
//��������
var minplayers = 1;
var maxplayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
			selStr = "#r#e<130�� ������˹��żʦBOSS����>#n#k.\r\nǿ��ĺ�ħ��ʦ��Ϯ��������������ǣ�����Ҫ��1�����ϣ���͵ȼ�130��.��������/���߽���.#v4001215#��輼�ܶһ�������ĸ��ף�������#v4000422#�������ս�ɣ���ԱԽ�࣬����Խ�࣡\r\n#v4000422#x1���齱һ��,�س���ְҵ#i1052804:#.#i1072972:#.#i1082613:#.\r\n�Ķ������ж���������ɧ�꣡\r\n\r\n";
			selStr+="#L4##b���� ��ս������˹#l\r\n";
			selStr+="#L5#��ɫ����г�ȡ��װ#l\r\n";
			//selStr+="#L3##r#z4310091##k#b��ȡϡ�����ӣ�ÿ�ܸ��£�#l\r\n";
			//selStr+="#L5##r#z4310091##k#b��ȡ�߼�װ����ÿ�ܸ��£�#b#l\r\n";
			//selStr+="#L1#��ģʽ������#z4310091#������3000���þ�#l\r\n";
			//selStr+="#L4#����ģʽ������#z4310091#������500���#l\r\n";
			//selStr+="#L7#��ģʽ�����ģʽ�����۶ӳ�5000���þ�#l\r\n";
			//selStr+="#L8#����ģʽ�����ģʽ�����۶ӳ�1000���#l";
			cm.sendSimple(selStr);
    } else if (status == 1) {
		sel=selection;
        if(sel==1){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����,����ֻ������һ����~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 3000) { // Not Party Leader
                    cm.sendOk("��ĵ��þ���3000�㣬���㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 1) {
                        cm.sendOk("#r�Բ���,Ϊ�˳��׵Ĳ����������,ֻ��һ��ǰ��..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -3000); //�۳����
                    cm.channelMessage(0x09, "��������԰��" + " : " + "���<" + cm.getChar().getName() + ">�������ػ���ͼ��ʼ������԰");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����,����ֻ������һ����~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(910510000).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.haveItem(4032341) < 1) { // Not Party Leader
                    cm.sendOk("���#v4032341#���㣬���㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
					var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minlvl && party.get(i).getLevel() <= maxlvl)
                    levelValid++;
            }
			if (inMap < minplayers || inMap > maxplayers) {
                cm.sendOk("��Ķ�����������"+minplayers+"��.�����Ķ�����Ա�ټ����ڽ��븱��.");
                //cm.sendOk("Your party is not a party of "+minPlayers+". Please make sure all your members are present and qualified to participate in this quest. I see #b" + inMap + "#k of your party members are in Kerning. If this seems wrong, #blog out and log back in,#k or reform the party.");
                cm.dispose();
                        return;
            } 
			if (levelValid != inMap) {
                cm.sendOk("��ȷ����Ķ�����Ա��С�ȼ��� "+minlvl+" �� "+maxlvl+"֮��.");
                cm.dispose();
                        return;
                //} else if (checkPartyLevels() == false) {//�ж϶����Ա�ȼ�
                 //   cm.sendOk("����Ա - ��ʾ \r\n\r\n�����Ա�ȼ�������#b" + minlvl + " - " + maxlvl + "#k֮�䲢�ұ�����һ�ŵ�ͼ���ܽ��룬��˶Ժ��������ҡ�")
                 //   cm.dispose();
                } else if (checkPartySize() == false) {//�ж϶����Ա����
                    cm.sendOk("����Ա - ��ʾ \r\n\r\n�����Ա����������#b" + minplayers + "~" + maxplayers + "#k֮�䲢�ұ�����һ�ŵ�ͼ���ܽ��룬��˶Ժ��������ҡ�");
                    cm.dispose();
                        return;
                
                }
			if (party.size() < 1) {
                        cm.sendOk("#r�Բ���,Ϊ�˳��׵Ĳ����������,ֻ��һ��ǰ��..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("ChaoJiPQ");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
			cm.gainItem(4032341,-1);
		    //cm.gainNX(1, -500);
                    cm.worldMessage(6, "����żʦBOSS��" + " : " + "���<" + cm.getChar().getName() + ">��������żʦBOSS��ͼ");
                        cm.dispose();
                    }
}
        } else if(sel==7){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 5000) { // Not Party Leader
                    cm.sendOk("��ĵ��þ���5000�����㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r�Բ���,��ӱ���2�����ϣ�����ѡ����ģʽ");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -5000); //�۳����
                    cm.channelMessage(0x09,"��������԰��" + " : " + "���<" + cm.getChar().getName() + ">������ʥ�ؿ�ʼ����ʥ��[���ģʽ]");
                        cm.dispose();
                    }
}
        } else if(sel==8){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 1000) { // Not Party Leader
                    cm.sendOk("��ĵ����1000�����㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r�Բ���,��ӱ���2�����ϣ�����ѡ����ģʽ");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("ChaoJiPQ");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -1000);
                    cm.channelMessage(0x09, "��������԰��" + " : " + "���<" + cm.getChar().getName() + ">������ʥ�ؿ�ʼ����ʥ��[���ģʽ]");
                        cm.dispose();
                    }
}
		} else if (sel==3){
			//cm.dispose();
              	       // cm.openNpc(9900003,701);  
		} else if (sel==5){
              	        cm.openNpc(1104000,1);  
			//cm.sendOk("��δ����AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			//cm.dispose();                      
		} else if (sel==2){
			cm.sendOkS("#r#e<������԰>\r\n#r#e������ɫ��#k#n�����ÿ��15��ˢ��һ�������Ѹ������\r\n#r#e��սʧ��������#k#n��ͼ��������������100ֻ��\r\n#e#r��ս������#k#nɱ��������л��ʵ���#v4310091##z4310091#\r\n#r#e��������#k#n��������ߵ��þ�",2);
			cm.dispose();
		} else if (sel==6){
			cm.sendOkS("��δ����",2);
			cm.dispose();
	 }
}
}
function checkPartySize() {
    var size = 0;
    if (cm.getPlayer().getParty() == null)
        size = 0;
    else
        size = (cm.getPlayer().getParty().getMembers().size());
    if (size < minplayers || size > maxplayers)
        return false;
    return true;
}

