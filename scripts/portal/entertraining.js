function enter(pi) {
	if (pi.isQuestActive(1041))
		pi.warp(1010100, 4);
	else if (pi.isQuestActive(1042))
		pi.warp(1010200, 4);
	else if (pi.isQuestActive(1043))
		pi.warp(1010300, 4);
	else if (pi.isQuestActive(1044))
		pi.warp(1010400, 4);
	else
		pi.playerMessage("������ӵ�������ð�ռҲſ����볡.");
	return false;
}