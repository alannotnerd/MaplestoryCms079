var status = 0;
var itemList = 
Array(     
			Array(2340000,800,1,1), //ף��
			Array(1332114,800,1,1), //��
			Array(1372071,800,1,1), //����
			Array(1382093,800,1,1), //��
			Array(1402085,800,1,1), //˫��
			Array(1432075,800,1,1), //ǹ
			Array(1452100,800,1,1), //��
			Array(1472111,800,1,1), //ȭ
			Array(3015183,600,1,1), //������
			Array(2043002,800,1,1), //���ֽ�10
			Array(2044002,800,1,1), //˫�ֽ�10
			Array(2044302,800,1,1), //ǹ10
			Array(2044502,800,1,1), //��10
			Array(2044702,800,1,1), //ȭ��10
			Array(2043802,800,1,1), //����10
			Array(2043702,800,1,1), //����10
			Array(2000005,800,20,1), //����
			Array(2043702,800,1,1), //����10
			Array(2043702,800,1,1), //����10
			Array(2049100,600,1,1) //����
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
            cm.sendOk("��ո�����Ҫ������#v1452100#��ְҵ77�ƽ��Ҷ������#v2043702#ֻ��10%���ᣬ#v3015183#��Ʒ���ӣ�#v2340000##v2049100#ף������/������ᣬ#v2000005#����ҩˮx20���Ƚ���.");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4170006, 1)) {
            cm.sendYesNo("��ո�����Ҫ������#v1452100#��ְҵ77�ƽ��Ҷ������#v2043702#ֻ��10%���ᣬ#v3015183#��Ʒ���ӣ�#v2340000##v2049100#ף������/������ᣬ#v2000005#����ҩˮx20���Ƚ���.");
        } else {
            cm.sendOk("��ո�����Ҫ������#v1452100#��ְҵ77�ƽ��Ҷ������#v2043702#ֻ��10%���ᣬ#v3015183#��Ʒ���ӣ�#v2340000##v2049100#ף������/������ᣬ#v2000005#����ҩˮx20���Ƚ���.�㱳������1��#b#t4170005##k��?");
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
            cm.sendOk("�������������ʲô��û���õ���");
            cm.gainItem(4170006, -1);
            cm.safeDispose();
        }
    }
}