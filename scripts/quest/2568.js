var status = -1;

function start(mode, type, selection) {
    qm.warp(912060200, 0);
    qm.gainItem(4033003, 1); //螺旋桨 - 赠送给蒙奇的螺旋桨
    qm.dispose();
}
function end(mode, type, selection) {
    qm.dispose();
}