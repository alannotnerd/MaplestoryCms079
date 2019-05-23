var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
            if (status == 0) {
			if (cm.getPlayer().getLevel() >= 200 && cm.getPlayer().getJob() == 2312) {
				cm.sendYesNo("Hi #r#h ##k, I see you dont have your #blevel 200 medal#k and #bEcho Of the Hero#k");
			}else {
				cm.sendOk("You are not a mercedes or level 200 silly.");
				cm.dispose();
			}
			}else if (status == 1) {
			
			if (!cm.haveItem(1142340,1) && cm.getPlayer().getSkillLevel(10001005) >= 1) {
			cm.gainItem(1142340,1);//Medal
			cm.dispose();
			
			} else {
				if (cm.getPlayer().getSkillLevel(10001005) > 0) {
				cm.sendOk("You already have this skill.");
                } else {
				cm.gainItem(1142340,1);//Medal
                cm.teachSkill(10001005, 1, 1); // Echo of hero
				cm.sendOk("Congratulations to you #r#h ##k");
				}
			cm.dispose();
		}
	}
	}
}