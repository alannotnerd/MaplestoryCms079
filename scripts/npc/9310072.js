var status = -1;
var job = 0;
var type = -1;
var skill = [[8, 1004, 1007, 1013],[10000018, 10001004, 10001007],[20000024, 20001004, 20001007]];

function start(){
	action(1, 0, 0);
}

function action(mode, type ,selection) {
	if(mode == 0 && status == 0) {
		status --;
	} else if(mode == 1) {
		status ++;
	} else {
		cm.dispose();
		return;
	}
	
	if (status == 0) {
		cm.sendYesNo("����ȼ�30������������԰���һ��ѧϰ ���#s8#-Ⱥ��#s1004#-����#s1007#-�ʼ���輼��#s1013#");
	} else if (status == 1){
		if(cm.getPlayer().getLevel() < 2){
			cm.sendNext("��ĵȼ�û�дﵽ2��");
			cm.dispose();
			return;
		}
		job = cm.getPlayer().getJob();
		if (job < 1000){// Adv(0 ~ 522)
			type = 0;
		} else if (job < 2000) {// Cy(1000 ~ 1512)
			type = 1;
		} else if (job < 3000) {// Aran(2000 ~ 2112)
			type = 2;
		} else {
			cm.dispose();
			return;
		}
		for(var i = 0; i < skill[type].length;i++){
			var level = 1;
			if(i == 2) {
				level = 3;
			}
			cm.teachSkill(skill[type][i], level);
		}
		cm.sendNext("�����Ѿ�ѧϰ�ɹ�");
		cm.dispose();
	} else {
		cm.dispose();
	}
}