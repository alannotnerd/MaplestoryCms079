/*
 * 斯乌11关超级副本 地图控制
 * Event有的函数过于复杂，直接跳转到NPC处理
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 */

var status = 0;
var typed;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var em = cm.getEventManager("siwu");
            var eim = em.getInstance("siwu")
            if (eim == null) {
                cm.warp(910000000, 0);
                cm.sendOk("只有在正常途径进入斯乌组队任务才能继续留在刚才的地图。")
                cm.dispose();
            } else {
                cm.dispose();
            }
        }
    }
}
   