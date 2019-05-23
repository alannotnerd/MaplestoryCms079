var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendNext("想了解专业技术的话，我来简单地说明一下。在这个村子中，一共有#b采药、采矿、装备制作、饰品制作、炼金术#k5个匠人。为了提高专业技术的效果，我们匠人协会规定每个人可以学习2种专业技术。根据这个规定，你可以选择学习#r2种专业技术#k。");
    } else if (status == 1) {
        cm.sendPrev("#b - 采药 + 炼金术 - 采矿 + 装备制作 - 采矿 + 饰品制作#k\r\n\r\n可以在这3种搭配中选择，请选择并学习自己喜欢的技术。");
        cm.dispose();
    }
}