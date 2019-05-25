var status = 0;

function start() {
    cm.sendSimple("你好,只要你有#v4001110#,我可以帮您清空您的PK战绩哦!\r\n\r\n   #b您当前的杀人次数:#k#d "+cm.getChar().getPvpKills()+"#k    #r被杀的次数:#k#d "+cm.getChar().getPvpDeaths()+"#k#b\r\n#r#L1#使用战绩清除道具清空战绩");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("#r下次有需要再来找我.");
            cm.dispose();
        } else
            status++;
        if (status == 1)
            if (cm.haveItem(4001110,1)) {
            cm.sendNext("#r你确定要用战绩清除卡片清除所有战绩么?.");
            }
            else {
            cm.sendOk("#r您没有战绩清除道具#v4001110#,请购买后再来找我.");
            cm.dispose();
            }
        else if (status == 2) {
            cm.getChar().setPvpDeaths(0);
            cm.getChar().setPvpKills(0);
            cm.gainItem(4001110,-1);
            cm.sendOk("#r恭喜您,战绩清除成功.");
            cm.dispose();
        }
    }
}