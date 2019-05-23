function enter(pi) {
	if (!pi.isQuestFinished(21014))
	{
	  pi.playerMessage("要不先去村庄里看看！");
	  return false;
	}else{
	  pi.warp(140010100, 2);
	  return true;
	}
}