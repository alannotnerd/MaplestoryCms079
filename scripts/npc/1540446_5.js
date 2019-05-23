/*
 * 斯乌11关超级副本
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 */

function start() {
    if (cm.getSpace(4) < 1) {
        cm.playerMessage(-1, "其他框空格不足，请检查。");
    } else {
        var rand = Math.floor(Math.random() * 2)+1;
            cm.gainItem(4009159, rand);
            cm.playerMessage(-1, "获得 解体机零件 "+rand+"个。");
    }
    cm.dispose();
}