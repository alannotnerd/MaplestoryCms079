var ���� = "#fEffect/CharacterEff/1114000/2/0#";
var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ������ = "#fUI/UIWindow/Quest/icon3/6#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
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
            text += ""+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+"\r\n"
			text += "\t\t\t  #e��ӭ����#b����ð�յ� #k!#n\r\n"
            text += ""+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+"\r\n"
            text += "#L1##e#d" + ��ɫ��ͷ + "������Ӹ���#l#L2##d" + ��ɫ��ͷ + "������Ӹ���#l\r\n\r\n"//3
            text += "#L3##d" + ��ɫ��ͷ + "�����Ӹ���#l#L4##d" + ��ɫ��ͷ + "�����Ӹ���#l\r\n\r\n"//3
            text += "#L5##d" + ��ɫ��ͷ + "������Ӹ���#l#L6##d" + ��ɫ��ͷ + "������Ӹ���#l\r\n\r\n"//3
            text += "#L7##d" + ��ɫ��ͷ + "����ŷ������Ҷ��Ӹ���#l\r\n\r\n"//3
            text += "#L9##d" + ��ɫ��ͷ + "Ӣ��ѧԺ����#l\r\n\r\n"//3
            text += "#L10##d" + ��ɫ��ͷ + "������껪(��ӶԿ�����.���2V2)#l\r\n\r\n"//3
            text += "#L8##d" + ��ɫ��ͷ + "��ַ����Կ�ս(���帱��)#l\r\n\r\n"//3
            text += ""+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+"\r\n"
            //text += "#L11##dLv120.ǧ���������ż���#l\r\n\r\n"//3
            //text += "#L12##dLv130.��żʦBOSS��ս#l\r\n\r\n"//3
            text += "" + ��ɫ��ͷ + "#L13##rLv120������.糺츱����ս#l\r\n\r\n"//3
            //text += "" + ��ɫ��ͷ + "#L14##rLv140������.���㸱����ս#l\r\n\r\n"//3
            text += ""+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+����+"\r\n"
            cm.sendSimple(text);
        } else if (selection == 1) { //������Ӹ���
            cm.openNpc(1012112, 0);
        } else if (selection == 2) {  //������Ӹ���
            cm.openNpc(9020000, 0);
        } else if (selection == 3) { //�����Ӹ���
            cm.openNpc(2040034, 0);
        } else if (selection == 4) {//�����Ӹ���
            cm.openNpc(2013000, 0);
        } else if (selection == 5) {//������Ӹ���
            cm.warp(300030100);
            cm.dispose();
        } else if (selection == 6) {//������Ӹ���
            cm.openNpc(2094000, 0);
        } else if (selection == 7) {//����ŷ������Ҷ��Ӹ���
			cm.warp(261000011);
            cm.dispose();
        } else if (selection == 8) {//��ַ����Կ�ս
			cm.warp(101030104);
            cm.dispose();
        } else if (selection == 9) {//Ӣ��ѧԺ����
            cm.warp(702090400);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 11) {//ǧ���������ż�
            cm.warp(541020700);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 12) {//��żʦBOSS��ս
            cm.warp(910510001);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 13) {//糺�
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("����ͼ���Ƶȼ�120������������û���ʸ���ս糺츱��");
                cm.dispose();
              }else{
			cm.warp(803001200);  
				cm.dispose();
                return;
	      } 
        } else if (selection == 14) {//����
            if (cm.getLevel() < 140 ) {  
            cm.sendOk("����ͼ���Ƶȼ�140������������û���ʸ���ս���㸱��");
                cm.dispose();
              }else{
			cm.warp(803000505);  
                cm.dispose();
                return;
	      } 
        } else if (selection == 10) {//.������껪
            cm.warp(980000000);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        }
    }
}


