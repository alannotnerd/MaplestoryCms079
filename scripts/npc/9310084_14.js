var status = 0;
var itemList = 
Array(     
			Array(2340000,900,1,1), //ף��
			Array(2000005,850,50,1), //����ҩˮ
			Array(2049100,900,1,1) //����
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("��ո���ͨ�س齱��#v2049100#�������/#v2340000#ף������/#v2000005#����ҩˮx50.�����ȡ��һ.");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4170006, 1)) {
            cm.sendYesNo("��ո���ͨ�س齱��#v2049100#�������/#v2340000#ף������/#v2000005#����ҩˮx50.�����ȡ��һ.");
        } else {
            cm.sendOk("��ո���ͨ�س齱��#v2049100#�������/#v2340000#ף������/#v2000005#����ҩˮx50.�����ȡ��һ..�㱳������1��#b#t4170005##k��?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * +900);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "��ո��������齱", notice);
            if (item != -1) {
                cm.gainItem(4170006, -1);
                cm.sendOk("������ #b#t" + item + "##k " + quantity + "����");
            } else {
                cm.sendOk("��ȷʵ��#b#t4170005##k������ǣ�����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("�������������ʲô��û���õ���������Ϊ�������͸���5��#v4001322#��Ϊ����.");
            cm.gainItem(4170006, -1);
            cm.gainItem(4001322, 5);
            cm.safeDispose();
        }
    }
}