/*
	Zakum Altar - Summons Zakum.
*/

function act() {
    rm.changeMusic("Bgm06/FinalFight");
    rm.getMap().spawnZakum( - 10, -215);
    rm.mapMessage("���������ˣ����ڹ涨ʱ�䷶Χ�ڻ�������");
    if (!rm.getPlayer().isGM()) {
        rm.getMap().startSpeedRun();
    }
}