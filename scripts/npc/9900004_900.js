var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ������ = "#fUI/UIWindow/Quest/icon3/6#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ�ǵ� = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ���ڽ����� = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var ��� = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var ���ڽ������� = "#fUI/UIWindow/MonsterCarnival/icon1#";
var ��ɺ� = "#fUI/UIWindow/MonsterCarnival/icon0#";
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//��ʾ��ƷIDͼƬ�õĴ�����  #v����д��ID#
            text += "#k�����ǣ��Ƿ����һ��������������ζ����Ͼʱ�ڶ�������ˣ�����������ȥ�ɣ�˧����΢��Ϊ����׼���˴��˸���Ŷ.\r\n#e#rӵ��#v4031326##z4031326#����Ҵ����˸������Ի��#v4310015##z4310015##n\r\n\r\n"//3
            text += "#L15##r" + ��ɫ��ͷ + "��ȡ#v4031326##z4031326#\t��Ҫ���ȼ��ﵽ70����\r\n\r\n"//
            text += "#L1##b" + ��ɫ��ͷ + "����#v1002939##z1002939#\t��Ҫ��#r#v4310015#x150#k��\r\n\r\n"//
            text += "#L2##b" + ��ɫ��ͷ + "����#v1082149##z1082149#\t��Ҫ��#r#v4310015#x100#k��\r\n\r\n"//
            text += "#L3##b" + ��ɫ��ͷ + "����#v1102041##z1102041#\t��Ҫ��#r#v4310015#x150#k��\r\n\r\n"//
            text += "#L4##b" + ��ɫ��ͷ + "����#v1102042##z1102042#\t��Ҫ��#r#v4310015#x100#k��\r\n\r\n"//
            text += "#L5##b" + ��ɫ��ͷ + "����#v1112793##z1112793#\t��Ҫ��#r#v4310015#x250#k��\r\n\r\n"//
            //text += "#L6##b" + ��ɫ��ͷ + "����΢�Ŷ���������ר�ð��񼶡���������������ӣ�����������������Ҽ�ȡ����\r\n"//
            text += "#L7##b" + ��ɫ��ͷ + "����#v3010070##z3010070#\t��Ҫ��#r#v4310015#x300#k��\r\n\r\n"//
            text += "#L8##b" + ��ɫ��ͷ + "����#v2100902##z2100902#\t��Ҫ��#r#v4310015#x100#k��\r\n\r\n"//
            //text += "#L9##b" + ��ɫ��ͷ + "����#v1452205##z1452205#\r\n"//
            //text += "#L10##b" + ��ɫ��ͷ + "����#v1462193##z1462193#\r\n"//
            //text += "#L11##b" + ��ɫ��ͷ + "����#v1332225##z1332225#\r\n"//
            //text += "#L12##b" + ��ɫ��ͷ + "����#v1472214##z1472214#\r\n"//
            //text += "#L13##b" + ��ɫ��ͷ + "����#v1482168##z1482168#\r\n"//
            //text += "#L14##b" + ��ɫ��ͷ + "����#v1492179##z1492179#\r\n"//
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 901);
        } else if (selection == 2) {
		cm.openNpc(9900004, 902);
        } else if (selection == 3) {
		cm.openNpc(9900004, 903);
        } else if (selection == 4) {
		cm.openNpc(9900004, 904);
        } else if (selection == 5) {
		cm.openNpc(9900004, 905);
        } else if (selection == 6) {
		cm.openNpc(9900004, 906);
        } else if (selection == 7) {
		cm.openNpc(9900004, 907);
        } else if (selection == 8) {
		cm.openNpc(9900004, 908);
        } else if (selection == 9) {
		cm.openNpc(9900004, 509);
        } else if (selection == 10) {
		cm.openNpc(9900004, 510);
        } else if (selection == 11) {
		cm.openNpc(9900004, 511);
        } else if (selection == 12) {
		cm.openNpc(9900004, 512);
        } else if (selection == 13) {
		cm.openNpc(9900004, 513);
        } else if (selection == 14) {
		cm.openNpc(9900004, 514);
        } else if (selection == 15) {
            if (cm.getPlayer().getLevel() < 70) {
                cm.sendOk("��ĵȼ�С�� 70 �����޷���ȡ������ż���");
                cm.dispose();
            } else if(cm.haveItem(4031326,1)){
                cm.sendOk("���Ѿ�ӵ�в�����ż����벻Ҫ�ظ���ȡ��С�Ĵ�����ʺ���㣡");
                cm.dispose();
            } else {
cm.gainItem(4031326,+1);//������ż�
                cm.sendOk("��ϲ����ȡ�ɹ�����ȥ�����˰ѣ�");
cm.����(3, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ������ż�����ȥ�����˰ѣ���");
                cm.dispose();
	}
	}
    }
}


