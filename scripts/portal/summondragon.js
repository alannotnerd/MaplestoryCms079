function enter(pi) {
    if (pi.haveItem(4001094)) {
        pi.getMap().getReactorByName("dragonBaby").hitReactor(pi.getClient());
        pi.getMap().getReactorByName("dragonBaby2").hitReactor(pi.getClient());
        pi.playerMessage(5, "�������ĵ�����������ķ���һ�����صĹ⣬�����Ѿ��ص����");
        pi.gainItem(4001094, -1);
    }
}