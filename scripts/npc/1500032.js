status = -1;
var event;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    event = cm.getEventManager("Gailou"); //获取活动脚本的名称 test 对应 event 目录里面的 gailou.js 文件
    if (status == 0) {
        if (event == null) {
            cm.sendOk("活动脚本错误...请联系管理员修复！或重新打开。");
            cm.dispose();
        } else if (cm.getPlayer().getClient().getChannel() != 1) {
            cm.sendOk("活动只能在1频道进行！亲！");
	    cm.dispose();
        } else if (event != null && event.getProperty("state").equals("true")) {
            cm.sendYesNo("亲爱的#r#h ##k您好，我是盖楼活动员，本次活动时间为10分钟.\r\n#e#r那就看你运气啦 开始吧？");
        } else {
            cm.sendOk("活动还未开启或者活动已经结束，活动结束后奖励会立即发放\r\n#b#e110分钟开放一次，每次活动为10分钟\r\n时间2：10     4:10     6:10以此类推\r\n#e#d活动分一等奖，二等奖和三等奖.\r\n#r一等奖：#d第一个到达建楼高度的玩家获得一等奖。(点卷5000点。超级魔方2个，大师附加魔方1个，征服者币100个，冬季限量币50个，运动会币5个)\r\n#r二等奖：#d一等奖之后后续补楼的10个玩家为二等奖(获得了点卷2000-3000点，神奇魔方2个，高级神奇魔方2个)\r\n#r三等奖：#d为结束活动奖励只限1人(获得魔方和500-1000点卷.)");
            cm.dispose();
        }
    } else if (status == 1) {
        if (event != null && event.getProperty("state").equals("true")) {
            event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 1)); //设置点击次数+1
            var count = parseInt(event.getProperty("check")); //获得总点击次数
            var max = parseInt(event.getProperty("maxCheck"));
            //var dj = rand(5000, 8000);
            var dj3 = rand(500, 1000);
			var dj2 = rand(2000, 3000);
            if (count == max) {
                cm.gainNX(1, 5000);
				//cm.gainItem(5062000, 10);
				cm.gainItem(5062009, 2);
				cm.gainItem(5062500, 1);
				cm.gainItem(4310036, 100);
				cm.gainItem(4310129, 50);
				cm.gainItem(4310030, 5);
				//cm.gainNX(2, 1000);
                cm.worldSpouseMessage(0x15, "[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得一等奖，获得大量魔方，5000点卷真让人羡慕");
                cm.sendOk("[抢楼活动] 恭喜你获得了抢楼活动一等奖。获得了点卷5000点。超级魔方2个，大师附加魔方1个，征服者币100个，冬季限量币50个，运动会币5个");
            } else if (count > max && count <= (max + 10)) {
                cm.gainNX( + dj2);
				cm.gainItem(5062000, 2);
				cm.gainItem(5062002, 2);
				//cm.gainItem(5062002, 1);
				//cm.gainItem(5062500, 1);
				//cm.gainItem(4310036, 5);
				//cm.gainItem(4310030, 2);
				//cm.gainNX(2, 500);
                cm.worldSpouseMessage(0x15, "[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得二等奖，获得大量魔方和" + dj2 + "点卷.");
                cm.sendOk("恭喜你获得了抢楼活动二等奖。获得了点卷" + dj2 + "点，神奇魔方2个，高级神奇魔方2个");
            } else if (count > (max + 10)) {
                cm.gainItem(5062000, 5);
				//cm.gainItem(5062002, 1);
				//cm.gainItem(5062500, 1);
				cm.gainNX( + dj3);
                event.setProperty("state", "false");
                event.setProperty("endEvent", "true");
                cm.worldSpouseMessage(0x15, "[抢楼活动]： 恭喜玩家 " + cm.getName() + " 在抢楼活动中获得三等奖,获得魔方和" + dj3 + "点卷.");
                cm.sendOk("恭喜你获得了抢楼活动三等奖。获得了点卷" + dj3 + "点，神奇魔方5个。\r\n本次抢楼活动已经结束...");
            } else {
                cm.sendOk("当前楼层: " + parseInt(event.getProperty("check")) + " 楼。");
            }
        } else {
            cm.sendOk("活动还未开启或者活动已经结束，所有奖励均已经发放，请下次在参加。");
        }
        cm.dispose();
    }
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}