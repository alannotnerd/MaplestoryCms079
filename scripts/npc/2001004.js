/* [NPC]
    Job NPC ID 9010009
    Final  by aexr
    @RageZone
*/

importPackage(net.sf.cherry.client);


var wui = 0;

function start() {
if (cm.getLevel() < 2) {
    cm.sendYesNo ("aaa楚天娱乐冒险岛采用盛大冒险岛079客户端可直接登陆。提示：去打自由市场后把自由市场所有的NPC查看一遍，对您的游戏会有很大帮助。（点拍卖可以直接传送）\r\n1.本服所有物品装备都可在游戏中通过努力获得，因此本服特别设置了“元宝”这项功能，一些稀有玩具，终极装备、甚至一些神级装备都可以通过元宝来获得。\r\n2.在游戏中通过打任何普通怪获得枫叶材料然后可以兑换元宝以及点卷。\r\n3.游戏中点装可以通过打怪暴枫叶材料来获得，打任何怪都获得枫叶，每一个枫叶材料就可兑换一点。只要您在打怪之余随便捡捡，一天上万点我觉得还是不成问题的。（千万别只泡MM，不打怪哈哈。\r\n4.本服所有职业技能基本完美修复。\r\n5.特色创关任务：绯红任务，经过我们重新加以改进了，通过一系列的苦战终于击败N个BOSS后，几乎可以100%获得极其丰厚的奖励。");
        } else {
            cm.sendOk("楚天娱乐冒险岛采用盛大冒险岛079客户端可直接登陆。提示：去打自由市场后把自由市场所有的NPC查看一遍，对您的游戏会有很大帮助。（点拍卖可以直接传送）\r\n1.本服所有物品装备都可在游戏中通过努力获得，因此本服特别设置了“元宝”这项功能，一些稀有玩具，终极装备、甚至一些神级装备都可以通过元宝来获得。\r\n2.在游戏中通过打任何普通怪获得枫叶材料然后可以兑换元宝以及点卷。\r\n3.游戏中点装可以通过打怪暴枫叶材料来获得，打任何怪都获得枫叶，每一个枫叶材料就可兑换一点。只要您在打怪之余随便捡捡，一天上万点我觉得还是不成问题的。（千万别只泡MM，不打怪哈哈。\r\n4.本服所有职业技能基本完美修复。\r\n5.特色创关任务：绯红任务，经过我们重新加以改进了，通过一系列的苦战终于击败N个BOSS后，几乎可以100%获得极其丰厚的奖励。");
cm.gainFame(0);
            cm.dispose();
}
}



function action(mode, type, selection) {
if (cm.getLevel() < 2) {
    if (mode == 0 || wui == 1) {
        cm.dispose();
    } else {
        /*
		wui = 1;
        var statup = new java.util.ArrayList();
        var p = cm.c.getPlayer();
        var totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();
                p.setStr(44);
                p.setDex(4);
                p.setInt(4);
                p.setLuk(4);
        p.setRemainingAp (totAp -16);
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.STR, java.lang.Integer.valueOf(44)));
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.DEX, java.lang.Integer.valueOf(4)));
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.LUK, java.lang.Integer.valueOf(4)));
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.INT, java.lang.Integer.valueOf(4)));
        statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(p.getRemainingAp())));
        p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
        cm.warp(910000004, 0);
		cm.gainItem(2022117, 1);
        cm.getChar().levelUp();
        cm.getChar().levelUp();
        cm.getChar().levelUp();
        cm.getChar().levelUp();
        cm.getChar().levelUp();
        cm.getChar().levelUp();
        cm.getChar().levelUp();
		statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0)));
		
		*/
        cm.sendOk ("#e#r感谢你对楚天娱乐冒险岛的的支持，我们会努力把游戏做的更好");
        cm.dispose();
    }
}
}
