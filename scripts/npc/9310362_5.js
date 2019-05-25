var status = -1;
var beauty = 0;
function start() {
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
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            if (cm.getJQ() == 0) {
                cm.sendOk("您当前#r金卷#k为#r"+ cm.getJQ() +"#k无法进行兑换。");
                cm.dispose();
            } else {
                beauty = 1;
                cm.sendGetNumber("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追忆 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n1张#r金卷 #k: #b100点卷#k \r\n#e你的账户信息#n\r\n#r金卷#k:#r"+ cm.getJQ() +" #r张#k \r\n#b点卷#k:#b" + cm.getPlayer().getCSPoints(0)+" #b点#k\r\n#k请输入#r金卷#k兑换#b点卷#k的数量:", 1, 1, cm.getJQ());
            }
        } else if (status == 1) {
            var amount = selection;
            if (beauty == 1) {
                if (cm.getJQ() == 0) {
                    cm.sendOk("您当前#r金卷#k为#r"+ cm.getJQ() +"#k无法进行兑换。");
                    cm.dispose();
                } else if (selection < 0) {
                    cm.sendOk("你输入的数负数!");
                    cm.dispose();
                } else if (cm.getJQ() <= selection * 1) {
                    cm.sendOk("你没有足够的#r金卷#k,我不能帮你。");
                    cm.dispose();
                } else {
                    cm.addJQ(-amount);
                    cm.gainNX(100 * selection);
                    cm.sendOk("兑换成功,你获得了" + 100 * selection +"点卷,祝您游戏愉快。");
                    cm.dispose();
                }
            }
        }
    }
} 				