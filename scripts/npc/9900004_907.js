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
            text += "#e#d����#v3010070##z3010070#\t��Ҫ��#v4310015#x300#k��.�Ѽ��õ����ҾͿ���Ϊ��������.#l\r\n\r\n"//3
            text += "#L1##r����#v3010070##z3010070#\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
if (!cm.canHold(3010070, 1)) {
                cm.sendOk("���ı����ռ䲻��.��������һ�£�");
            } else if(cm.haveItem(4310015,300)){
				cm.gainItem(4310015, -300);
				cm.gainItem(3010070, 1);
            cm.sendOk("�����ɹ���");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ��һ������ް�Ʒ���͡����Ժ�ҲҪ�����ڷܵĴ�����Ŷ����");
            cm.dispose();
			}else{
            cm.sendOk("���Ĳ��ϲ��㣡\r\n����#v3010070##z3010070#\t��Ҫ��#v4310015#x300#k��");
            cm.dispose();
			}
		}
    }
}


