var status = -1;

function action(mode, type, selection) {
	cm.sendPlayerToNpc("#b妈妈！！你在哪里！！#k");
	cm.forceCompleteQuest(23200);
	cm.forceStartQuest(23201);
	cm.dispose();
}