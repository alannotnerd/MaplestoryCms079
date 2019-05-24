function act() {
 	rm.dropItems(); 
	rm.mapMessage(5, "六手邪神已經招換 加油吧!!");
	rm.changeMusic("Bgm09/TimeAttack");
	rm.spawnMonster(9420014, -202, 479);
	rm.closeDoor(501030104);
	rm.closePortal(501030104,"sp");
	rm.createMapMonitor(501030104,"sp");
}