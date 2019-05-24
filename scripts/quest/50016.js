/*
	任务: 布雷兹制动器！
	描述: #o9400295#还活着……！为了阻止他必须赶到2102年的核心商业区，我需要询问曾经去过商贸中心的#p9120033#，学了通往商贸中心的路。难免会有一场激战…必须下定决心。
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        }
        if (status == 0) {
            qm.sendNext("Okay, so you are going to the battle as well. Thanks... Just letting you know, the enemy is probably more powerful than anything you've ever faced, Are you ready?");
        } else if (status == 1) {
            qm.warp(802000800, 0);
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
}