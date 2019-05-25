/* Denma the Owner
	Henesys VIP Eye Change.
*/
var status = -1;
var facetype;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("嘿~！你好!如果你有#b#t5152057##k，我可以为你进行整形手术。");
    } else if (status == 1) {
        var face = cm.getPlayerStat("FACE");
        if (cm.getPlayerStat("GENDER") == 0) {
            facetype = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014];
        } else {
            facetype = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21014];
        }
        for (var i = 0; i < facetype.length; i++) {
            facetype[i] = facetype[i] + face % 1000 - (face % 100);
        }
        cm.askAvatar("可以让你的面容焕然一新…不想让你的面容变一变吗？ 只需要#b万能会员卡#k就可以给你做整形手术.怎么样~慢慢挑选一下你想要的面容~", facetype, 5152057);
    } else if (status == 2) {
        if (cm.setAvatar(5152057, facetype[selection]) == 1) {
            cm.sendOk("好了,你的朋友们一定认不出来是你了!");
        } else {
            cm.sendOk("嗯。。。你肯定没有我们医院的会员卡。。。不好意思如果你没会员卡，我不能给你做手术。");
        }
        cm.dispose();
    }
}