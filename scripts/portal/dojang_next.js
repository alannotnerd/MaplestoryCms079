function enter(pi) {
    if (!pi.haveMonster(9300216)) {
        pi.playerMessage("����ʣ�µĹ��");
    } else {
        pi.dojoAgent_NextMap(true, false);
    }
}