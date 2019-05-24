function act() {
    try {
        rm.changeMusic("Bgm09/TimeAttack");
        rm.spawnMonster(9420513, -146, 225);
        rm.mapMessage(5, "幽灵船长出现了。");
    } catch(e) {
        rm.mapMessage(5, "出现错误: " + e);
    }
}