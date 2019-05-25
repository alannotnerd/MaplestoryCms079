
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			
				cm.sendSimple("您好,我是垃圾回收员!如果您有不要的物品,又难以扔掉。我可以帮您清空!!#b\r\n#L0#清理装备栏#l \r\n#L1#清理消耗栏#l \r\n#L2#清理设置栏#l\r\n#L3#清理其它栏#l \r\n#L4#清理特殊栏#l#k");
			
		} else if (status == 1) {
			var statup = new java.util.ArrayList();
		        var p = cm.c.getPlayer(); 
			if (selection == 0) {
				cm.deleteItem(1);
				p.saveToDB(true);
				cm.sendOk("清理完成!")				
				cm.dispose();
			} else if (selection == 1) {
				//for(var i = 0; i < 51; i++){			
				//	cm.deleteItem(2);
				//	p.saveToDB(true);				
				//}				
				cm.sendOk("消耗栏好像没有扔不出来的东西哦,我不能帮您清理!")
				cm.dispose();
			}else if (selection == 2) {
				cm.deleteItem(3);
				p.saveToDB(true);
				cm.sendOk("清理工作完成!")
				cm.dispose();
			}else if (selection == 3) {
				//cm.sendOk("由于物品有重叠!清理可能需要一段时间,清耐心等待...")
				//for(var i = 0; i < 51; i++){				
				//	cm.deleteItem(4);
				//	p.saveToDB(true);				
				//}
				cm.sendOk("清理工作完成!如有未清理干净的物品,请再做一次清理操作")
				cm.dispose();
			}else if (selection == 4) {
			   	cm.deleteItem(5);
				p.saveToDB(true);
				cm.sendOk("清理工作完成!")
				cm.dispose();
			}
		}
	}
}
