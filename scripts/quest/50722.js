/*
	任务: 在天空中飞吧！
	描述: 玛塔塔说要想学习#b飞行骑乘#k技能，需要#b古代龙的翼鳞#k。\n#b古代龙的翼鳞#k可以从#b神木村#k的#b村长塔塔曼#k那里获得。
	需要: 学会了飞行骑乘技能。
*/
var status = -1;

function start(mode, type, selection) {
    qm.sendOk("Go to #bChief Tatamo#k in Leafre and bring back a Ancient Dragon Wing Scale.");
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    status++;
    if (status == 0) {
        if (qm.haveItem(4032969, 1)) {
            qm.sendNext("Great! Please wait till I mix these ingredients together...");
        } else {
            qm.sendOk("Please go to #bChief Tatamo#k of Leafre and bring back an Ancient Dragon Wing Scale.");
            qm.forceStartQuest();
            qm.dispose();
        }
    } else {
        qm.teachSkill(80001089, 1, 0); // Maker
        qm.removeAll(4032969);
        qm.sendOk("There we go! You have learned the Soaring skill and will be able to fly, using great amounts of MP.");
        qm.forceCompleteQuest();
        qm.dispose();
    }
}