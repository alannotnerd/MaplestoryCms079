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
            text += "#d�ڱ����У�������ҵ���#v4031216#,�Ҿ��ܰ����ٻ�����ȥɧ���������Ŷ~ (^O^).8�������ٻ�һ��.#l\r\n#L1##r�ٻ�����.\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			//1
			//2
			//3
			//4
			//5
			/*if(!cm.beibao(1,3)){
            cm.sendOk("װ�������಻��3���ո�");
            cm.dispose();
			}else if(!cm.beibao(2,1)){
            cm.sendOk("���������಻��1���ո�");
            cm.dispose();
			}else if(!cm.beibao(3,1)){
            cm.sendOk("���������಻��1���ո�");
            cm.dispose();
			}else if(!cm.beibao(4,1)){
            cm.sendOk("���������಻��1���ո�");
            cm.dispose();
			}else if(!cm.beibao(5,1)){
            cm.sendOk("�ֽ������಻��1���ո�");
            cm.dispose();
			}else */if(cm.haveItem(4031216,8)){
				cm.gainItem(4031216, -8);
				cm.spawnMonster(6400006, 1);
				cm.spawnMonster(4230107, 3);
				cm.gainMeso(200000);
            cm.sendOk("�ٻ��ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]�ڻ��ͼ[�Ͻ�ƽԭ]�ٻ������͵Ĺ���.���С�İ�������");
            cm.dispose();
			}else{
            cm.sendOk("��Ҫ��#v4031216#x3.�Ҳ��ܰ����ٻ�����Ŷ~��");
            cm.dispose();
			}
		}
    }
}


