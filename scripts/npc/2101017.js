/*
 脚本功能：阿里安特竞技场相关
 */
var status = 0;
var result = Array();
var resultAll = Array();
var aaa = Array();//后面得不到resultAll数据 用这个来转
var em;
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            em = cm.getEventManager("AliantSystem");
            eim = em.getInstance("AliantSystem")
            if (em.getProperty("FriendlyTips") == "done" || cm.getPlayer().isGM()) {//如果到了统计阶段
                text = "#e<阿里安特竞技场>#n\r\n#d现在我来公布竞技场结果：\r\n\r\n#b"
                for (var i = 0; i < parseInt(eim.getProperty("PlayerCount")); i++) {
                    result.push(eim.getPlayers().get(i).getName())//一维载入名字
                    result.push(eim.getKillCount(eim.getPlayers().get(i)))//三维载入怪物数量
                    resultAll.push(result)//集合成一个数组
                    result = Array();
                }

                //冒泡排序法开始，取最大
                for (var i = 0; i < resultAll.length; i++) {
                    for (var j = 0; j < resultAll.length; j++) {
                        var temp;
                        if (resultAll[i][1] > resultAll[j][1]) {
                            temp = resultAll[j];
                            resultAll[j] = resultAll[i];
                            resultAll[i] = temp;
                        }
                    }
                }

                var sort;
                for (var i = 0; i < resultAll.length; i++) {
                    sort = i + 1;
                    text += "第" + sort + "名：" + resultAll[i][0] + "  消灭怪物总数：" + resultAll[i][1] + "\r\n"
                    aaa.push(resultAll[i][0]);
                }
                text += "#b#L99# 知道了排名，领取积分离开地图。"
                cm.sendYesNo(text, 9)
            } else {
                if (cm.getMapId() == 980010100) {//如果是在等待地图
                    cm.openNpc(2101017, 1);
                } else if (cm.getMapId() == 980010101) {//如果是在战斗地图
                    status = 1;
                    cm.sendSimple("阿里安特竞技场开始了，你想做什么呢？#b\r\n#L0# 我想离开这里放弃奖励!");
                }
            }
        } else if (status == 1) {
            var em = cm.getEventManager("AliantSystem");
            if (cm.MissionStatus(cm.getPlayer().getId(), 105, 0, 4) == false) {
                cm.MissionMake(cm.getPlayer().getId(), 105, 0, 0, 0, 999999)//记录竞技场积分
            }
            var count = eim.getKillCount(cm.getPlayer());
            cm.warp(910000000, 0)
            em.setProperty("FriendlyTips", "0");
            cm.MissionAddMinNum(cm.getPlayer().getId(), 105, count)
            var text = "获得了竞技场　" + count + "。\r\n你可以用征服币在小秘书(拍卖处)#b[竞技积分]#k处兑换礼品."

            if (sort != 1) {
                var sort = 0;
                for (var i = 0; i < 1; i++) {//前1名
                    sort = i + 1;
                    if (aaa[i] == cm.getPlayer().getName()) {
                        text += "\r\n由于你排在第" + sort + "名，额外获得了100竞技场积分。"
                        cm.MissionAddMinNum(cm.getPlayer().getId(), 105, 100)//赠送100竞技场积分
                    }
                }
            }
            cm.sendOk(text);
            cm.worldMessage("[阿里安特竞技场] 截至现在" + cm.getChar().getName() + "  玩家共获得了" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "竞技场积分。");
            //cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 2) {
			if (selection == 0) {
				cm.warp(910000000, 0);
				cm.sendOk("好吧！再见");
				cm.dispose();
			}
		}
    }
}