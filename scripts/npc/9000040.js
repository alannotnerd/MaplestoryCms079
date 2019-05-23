//新手出生NPC
//代码：1092016
function start() {
	cm.sendSimple ("你想挑战哪种勋章:\r\n#b#L0#挑战勋章- 暗黑龙王杀手勋章(特级)\r\n#L1#挑战勋章-品克缤杀手勋章(特级)\r\n#L2#我要查看关于我的勋章信息\r\n#L3#关于勋章系统")
	}
function action(mode, type, selection) {
	cm.dispose();

	switch(selection){
		case 0: 
if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142007,0,0)){
cm.sendOk("您已经完成了暗黑龙王杀手勋章(特级)\r\n请接下一个勋章任务。")
}else if(cm.haveItem(1142007,1)){
cm.sendOk("你已经有了一个 #b暗黑龙王杀手勋章(特级)#k\r\n请接受下一个任务。")
}else if(cm.TaskExp(9000040,1) >= 5){
cm.sendOk("很好，你已经屠杀了 #b5只#k 暗黑龙王\r\n请收下我送给你的勋章，这是你应得的。")
cm.gainItem(1142007,1)
cm.MissionFinish(cm.getPlayer().getId(),9000040,1142007)
}else if(cm.TaskStatus(9000040,1)) {//开始黑龙积分
			cm.sendOk("你已经接受了 #b挑战勋章- 暗黑龙王杀手勋章(特级)#k 任务。\r\n请杀死5只 #b暗黑龙王#k")
			} else {
				cm.sendOk("成功接受了 #b挑战勋章- 暗黑龙王杀手勋章(特级)#k 任务。请杀死#r5只#k#b暗黑龙王#k后和我谈话。")
				cm.TaskMake(9000040,1)//接受黑龙积分的任务
                                                        cm.MissionMake(cm.getPlayer().getId(),9000040,1142007,0,0,0)//配合高级函数，以免重复接。
			} 
		break;
		case 1:
if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142007,0,0) == false ){
cm.sendOk("还没完成任务")
}else if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142008,0,0)) {//检查品克斌的勋章任务是否完成
cm.sendOk("您已经完成了#b品克缤杀手勋章(特级)#k的任务\r\n请接下一个任务。")
}else if (cm.haveItem(1142008,1)) {//检查是否有品克斌的勋章
cm.sendOk("你已经有了一个#b品克缤杀手勋章(特级)#k\r\n请接受下一个任务。")
}else if (cm.TaskExp(9000040,2) >=3) {//判断杀死品克斌是否超过了3只。
cm.sendOk("很好，你已经屠杀了 #b3只品克缤#k \r\n请收下我送给你的勋章，这是你应得的。")
cm.gainItem(1142008,1)
cm.MissionFinish(cm.getPlayer().getId(),9000040,1142008)
}else if(cm.TaskStatus(9000040,2)) {//开始PB积分
cm.sendOk("你已经接受了 #b挑战勋章-品克缤杀手勋章(特级)#k 任务。\r\n请杀死#b3只品克缤#k后和我谈话")
}else {
cm.sendOk("成功接受了 #b挑战勋章-品克缤杀手勋章(特级)#k 任务。\r\n请杀死3只品克缤后和我谈话。")
				cm.TaskMake(9000040,2)//接受黑龙积分的任务
                                                        cm.MissionMake(cm.getPlayer().getId(),9000040,1142008,0,0,0)//配合高级函数，以免重复接。
}
		break;
case 2:
if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142007,0,0) && cm.MissionStatus(cm.getPlayer().getId(),9000040,1142008,0,0) ){//检查两项任务是否已经完成了 以后要增加任务查询的话在这里加上。
cm.sendOk("到目前为止，您总共完成了#b2#k 项勋章任务, 以下是您获得的勋章:#b\r\n\r\n#i1142007#■ 暗黑龙王杀手勋章(特级)\r\n\r\n#i1142008#■ 品克缤杀手勋章(特级)\r\n\r\n#r请再接再厉！夺回更多的勋章！")//完成部分
}else if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142007,0,0)){//检查是否完成了暗黑龙王勋章任务
cm.sendOk("到目前为止，您总共完成了 #b1#k 项勋章任务, 以下是您获得的勋章:#b\r\n\r\n#i1142007#■ 暗黑龙王杀手勋章(特级)")
}else if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142007,0,4)){//检查是否接受了暗黑龙王勋章任务
cm.sendOk("您还没有获得任何一枚勋章，\r\n目前你总共屠杀了 #b"+cm.getPlayer().TaskExp(9000040,1)+" #k 只暗黑龙王。")
}else if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142008,0,0)){//检查是否完成了品克斌勋章任务
cm.sendOk("到目前为止，您总共完成了#b2#k 项勋章任务, 以下是您获得的勋章:#b\r\n\r\n#i1142007#■ 暗黑龙王杀手勋章(特级)\r\n\r\n#i1142008#■ 品克缤杀手勋章(特级)")//品格斌任务是要先完成黑龙的
}else if (cm.MissionStatus(cm.getPlayer().getId(),9000040,1142008,0,4)){//检查是否接受了品克斌勋章任务
cm.sendOk("到目前位置，您总共完成了#b1#k 项徽章任务,目前你总共屠杀了#b"+cm.getPlayer().TaskExp(9000040,2)+"#k 只品克斌(PB)。")
}else{
cm.sendOk("您还没有接受过任务的勋章任务。")
}
break;
case 3:
cm.sendOk("岛民通过各种各样的#b 组队任务数、屠杀BOSS数、人气度数、点装数、充值数、爱心数 #k等来获取勋章。为了回馈夺取勋章的岛民，#b勋章具有一定的能力值#k 。欢迎岛民们来夺取勋章！做勋章达人！")
break;

	} 
           
}