function act() {
	rm.mapMessage(5, "�֥d��w�g�۳� �[�o�a!!");
	rm.changeMusic("Bgm09/TimeAttack");
	rm.spawnMonster(8820001, 6, -42);
	//rm.closePortal(270050000,"sp");
	//rm.createMapMonitor(270050000,"sp");
	rm.getReactor().getMap().addMapTimer(3 * 60 * 60, 270050000);
}