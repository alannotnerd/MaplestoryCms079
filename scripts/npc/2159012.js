var status = -1;
function action(mode, type, selection) {
    if (mode == 1) 
        status++;
    else 
	status--;
    if (status == 0) {
    	cm.sendNext("嗯…实验似乎进行的相当顺利，顺利的拿到露。和黑色翅膀合作果然是明智之举…呵呵呵");
    } else if (status == 1) {
	cm.sendNextPrevS("杰利麦勒果然有先见之明。", 4, 2159008);
    } else if (status == 2) {
	cm.sendNextPrev("黑色翅膀无法挑剔的机器人，就快要完成了。现在实验要开始下一个阶段了。比他们时候的还要有趣。");
    } else if (status == 3) {
	cm.sendNextPrevS("下一个阶段呢？", 4, 2159008);
    } else if (status == 4) {
	cm.sendNextPrev("呼呼…到现在还不知道吗？光看这个实验室就应该会知道，我现在要制造什麽东西。只制造及其不够好玩，比机器人还有趣的…");
    } else if (status == 5) {
	cm.sendNextPrevS("嗯？这实验室吗？你打算对这实验者做什麽事吗？", 4, 2159008);
    } else if (status == 6) {
	cm.sendNextPrev("什麽，我能了解在你眼中，看不见这实验室伟大的地方。至於你呢！只要把你的任务做好就行了。顾好在这里的没一个实验者，让他们没办法逃跑就行了。");
    } else if (status == 7) {
	cm.sendNextPrev("…嗯？有没有听到什麽奇怪的声音？");
    } else if (status == 8) {
	cm.sendNextPrevS("嗯？奇怪的声音？这样一说，好像有什麽…？", 4, 2159008);
    } else if (status == 9) {
	cm.updateInfoQuest(23007, "vel00=2;vel01=1");
	cm.trembleEffect(0,500);
	cm.MovieClipIntroUI(true);
	cm.showWZEffect("Effect/Direction4.img/Resistance/TalkInLab");
    	cm.dispose();
    }
}