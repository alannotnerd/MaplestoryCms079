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
            text += "#e#r��ã�����������԰�������������Ҫ���������������ҿ���Ϊ�������������б�.\r\n\r\n"//3
            text += "#L1##e#d#v1302314#٤Ү������(���ֽ�)����.\r\n"//3
            text += "#L2##e#d#v1312184#٤Ү����  (���ָ�)����#l\r\n"//3
            text += "#L3##e#d#v1322235#٤Ү����  (���ִ�)����#l\r\n"//3
            text += "#L4##e#d#v1332259#٤Ү���̵�����#l\r\n"//3
            text += "#L5##e#d#v1372206#٤Ү����������#l\r\n"//3
            text += "#L6##e#d#v1382244#٤Ү����������#l\r\n"//3
            text += "#L7##e#d#v1402235#٤Ү��˫�ֽ�����#l\r\n"//3
            //text += "#L8##e#d#v1412163#٤Ү��˫��ս������#l\r\n"//3
            //text += "#L9##e#d#v1422170#٤Ү��˫�ִ�����#l\r\n"//3
            text += "#L10##e#d#v1432199#٤Ү��ǹ����#l\r\n"//3
            text += "#L11##e#d#v1452237#٤Ү��������#l\r\n"//3
            text += "#L12##e#d#v1462224#٤Ү��������#l\r\n"//3
            text += "#L13##e#d#v1472246#٤Ү����ȭ����#l\r\n"//3
            //text += "#L14##e#d#v1482201#٤Ү��ȭצ����#l\r\n"//3
            text += "#L15##e#d#v1492211#٤Ү���������#l\r\n"//3
            text += "#L16##e#d#v1442253#٤Ү�����鿪ɽ������#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(1002006, 201);
        } else if (selection == 2) {
		cm.openNpc(1002006, 202);
        } else if (selection == 3) {
		cm.openNpc(1002006, 203);
        } else if (selection == 4) {
		cm.openNpc(1002006, 204);
        } else if (selection == 5) {
		cm.openNpc(1002006, 205);
        } else if (selection == 6) {
		cm.openNpc(1002006, 206);
        } else if (selection == 7) {
		cm.openNpc(1002006, 207);
        } else if (selection == 8) {
		cm.openNpc(1002006, 208);
        } else if (selection == 9) {
		cm.openNpc(1002006, 209);
        } else if (selection == 10) {
		cm.openNpc(1002006, 210);
        } else if (selection == 11) {
		cm.openNpc(1002006, 211);
        } else if (selection == 12) {
		cm.openNpc(1002006, 212);
        } else if (selection == 13) {
		cm.openNpc(1002006, 213);
        } else if (selection == 14) {
		cm.openNpc(1002006, 214);
        } else if (selection == 15) {
		cm.openNpc(1002006, 215);
        } else if (selection == 16) {
		cm.openNpc(1002006, 216);
	}
    }
}


