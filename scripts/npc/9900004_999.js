/* Duey
   Edited by: Sean360 of RZ
   Latest edits and updates were made by the Maple4U Administrator
*/


var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("ȷ�������?");
		} else if (status == 1) {
			if(cm.getPlayer().getJob() == 132){
				cm.teachSkill(1320009,25,25);
				cm.teachSkill(1320008,25,25);
			cm.sendOk("����ɹ���");
			}else{
				cm.sendOk("�㲻���㼤����������4ת������ְҵ����Ҫ���");
			}
			cm.dispose();
			}
		}
	}