function enter(pi) {
    if (!pi.haveMonster(9300216)) {
        pi.playerMessage("����ʣ�µĹ��");
    } else {
        pi.dojo_getUp();
        pi.getMap().setReactorState();
    }
}