function act() {
    try {
        rm.changeMusic("Bgm09/TimeAttack");
        rm.spawnMonster(9420513, -146, 225);
        rm.mapMessage(5, "���鴬�������ˡ�");
    } catch(e) {
        rm.mapMessage(5, "���ִ���: " + e);
    }
}