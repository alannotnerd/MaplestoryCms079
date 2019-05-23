var status = 0;
var fstype = 0;
var blxz = new Array(1142014, 1142015, 1142016, 1142017);
var rand = Math.floor(Math.random() * blxz.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        if (status == 0) {
            cm.sendSimple("你好伟大的#b#h ##k，我是本服发布任务的NPC，本服的的特色任务都在我这里进行哟，当然平时的活动和新加的任务也是这里啦，准备好了吗？\r\n#L0##b正义之章(挣取正义币,黄金罗盘)#l\r\n#L1#我要打工(大量装备游戏币,黄金罗盘)#l\r\n#L4#怪物公园(10种副本,掉落纪念币兑换)#l\r\n");
        } else if (status == 1) {
            if (selection == 0) { //正义之章
                cm.dispose();
                cm.openNpc(9010041, 1);
            } else if (selection == 1) { //每日刷钱
                cm.dispose();
                cm.openNpc(9010041, 2);
            } else if (selection == 2) { //VIP打工
                cm.dispose();
                cm.openNpc(9010030, 2);
            } else if (selection == 3) { //怪物公园
                cm.warp(951000000);
                cm.dispose();
			} else if (selection == 888) { //正义之章
                cm.dispose();
                cm.openNpc(9201116);
			} else if (selection == 889) { //正义之章
                cm.dispose();
                cm.openNpc(9010040);
            } else if (selection == 4) { //新年7天
                fstype = 1;
                cm.sendSimple("哈哈，这么快就传出去了吗？我为到怪物公园来玩的人准备了特别的东西。你想看一看吗？\r\n#v3010002##v3010003##v3010006##v3010007##v3010008##v3010009##v3010028##v3010024##v3010064##v3010151##v1002547##v1002550##v1002551##v1002649##v1002773##v1082163##v1082164##v1082167##v1082168##v1082216##v1052071##v1052072##v1372042##v1372041##v1372040##v1372039##v1072494##e#r都是全属性装备哟#n#k\r\n\r\n怎么样？很想得到吧？呵呵呵，我在怪物公园的怪物身上放了特殊的纪念品。打猎怪物，可以发现#b#t4310020##k。搜集之后交给#b拉库#k，就能交换到我准备的特殊的东西\r\n#L0#进入怪园#l#L1#纪念币兑换#l");
            } else if (selection == 5) { //玩具组队
                fstype = 2;
                cm.sendSimple("恩爱值是结婚后在每日签到里面情侣签到获得的,每天情侣签到能获得10点恩爱值,据小道消息打听,以后还有专属的情侣副本也是加恩爱值的哟,恩爱值到了一定的级别,就可以来我这里换取称号了哟,称号显示在头顶上,超级拉风,心动了吗？\r\n#L0##b50恩爱值领取<寻找初恋>称号#l\r\n#L1#100恩爱值领取<甜蜜情人节>称号#l\r\n#L2#200恩爱值领取<情人节糖果真甜>称号#l");
            } else if (selection == 6) { //拯救海底
                fstype = 3;
                cm.sendSimple("#L6#领取第一个活动部落奖励[射手]#l\r\n#L7#领取第二个活动部落奖励[废弃]#l");
            } else if (selection == 7) { //拯救海底
                fstype = 4;
                cm.sendSimple("#r#e<加油吧！部落>#k#n\r\n活动开始时间：20：40\r\n今天活动将分为4个部落进行，点击下面的#r进入部落#k将随机进入一个部落，活动开始后带上部落勋章进入游戏场地，每个游戏第一名他的部落的所有人都能额外获得5000娜娜币\r\n\r\n#e#b<活动一：36游戏>#k#n\r\n进入活动地图后，往上面跳，最先达到的12人晋级到下一个36游戏活动，\r\n#r<36游戏介绍>#k\r\nGM会叫全部玩家所有站在一个点上面,然后GM随机抽出6位玩家分别分为1-2-3-4-5-6号,并排站好,然后GM说开始,1号玩家就可以开始数数字了,1号玩家只能数1,或者2,当以后玩家数后,2号玩家接着1号的数,如果1号数的1,那么2号玩家可以在1号数的数字的基础上+1或者+2,比如数2,或者3,依次类推,数到6号玩家后,1号接着6号的数,谁最后数到36这个数字,便淘汰\r\n如果没看懂没关系,进去后GM会叫会玩的示范一次\r\n第一个活动第一名：有孔全属性武器200武器(+S级星岩(所有属性+5%))+1万娜娜币+上网站名人榜\r\n第一个活动第二名：稀有椅子一把+1万娜娜币\r\n第一个活动第三名：一般椅子一把+1万娜娜币\r\n在36游戏中被淘汰后GM会交易你，你把帐号给GM统计后，参加到36游戏每人能获得5000娜娜币，如果第一名是自己部落的还有部落额外的5000哟\r\n\r\n#e#b<活动二：团队就是力量>#k#n\r\n玩家进入活动二地图后，开始跳跳，跳上去后等待，每个部落的跳跳第一名会代表部落参加下一个跳跳#r(所以此轮晋级4人，每个部落的第一名)#k\r\n此外第一轮跳跳前10名(不分部落)每人获得5000娜娜币\r\n\r\n第二个活动第一名：稀有椅子一把+1万娜娜币\r\n第二个活动第二名：一般椅子一把+1万娜娜币\r\n第二个活动第三名：获得黄金罗盘+5000娜娜币\r\n如果第一名是自己部落的还有部落额外的5000哟\r\n#L1#进入部落#l\r\n#L5#进入活动二地图#l\r\n#L6#领取第一个活动部落奖励[射手]#l\r\n#L7#领取第二个活动部落奖励[废弃]#l");
            } else if (selection == 12) { //击退海盗的奖励
                cm.sendOk("我正在等待勇敢的冒险家。请大家用自己的力量和智慧，一起破解难题，击退强大的#r海盗军团！\r\n\r\n - #e等级#n：70级以上#r（推荐等级：120～200 ）#k\r\n - #e限制时间#n：10分钟\r\n - #e参加人数#n：3～4人\r\n - #e通关获得物品#n：\r\n　#v4031996##v4031995##v4031994v# 蘑菇奖牌#b（随机获得）#k\r\n - #e通关随机物品#n：\r\n　 #b蓝蜗牛邮票,GM必成卷轴,超级药水,外星装备(有孔),圣杯");
                cm.dispose();
            }
        } else if (status == 2) {
            if (fstype == 1) { //怪物公园
                if (selection == 0) { //进入公园
                    cm.warp(951000000);
                    cm.sendOk("已达到怪物公园，没门票的话请到最左边的#b拉库#k领取");
                    cm.dispose();
                } else if (selection == 1) { //打开纪念币NPC
                    cm.dispose();
                    cm.openNpc(9071002, 1);
                }
            } else if (fstype == 2) { //清理装备
                if (selection == 0) {
                    if (cm.getBossLog("恩爱值50", 1) != 0) {
                        cm.sendOk("你已经领取过了..");
                        cm.dispose();
                    } else if (cm.getChar().getVipczz() < 50) {
                        cm.sendOk("你的恩爱值还没到呢！");
                        cm.dispose();
                    } else {
                        cm.setBossLog("恩爱值50", 1);
                        cm.gainItem(3700017, 1); //50的称号
                        cm.sendOk("恭喜你领取了称号#z3700017#");
                        cm.worldMessage("[恩爱称号]：玩家[" + cm.getChar().getName() + "]领取了情侣恩爱专属称号<寻找初恋>");
                        cm.dispose();
                    }
                } else if (selection == 1) {
                    if (cm.getBossLog("恩爱值100", 1) != 0) {
                        cm.sendOk("你已经领取过了..");
                        cm.dispose();
                    } else if (cm.getChar().getVipczz() < 100) {
                        cm.sendOk("你的恩爱值还没到呢！");
                        cm.dispose();
                    } else {
                        cm.setBossLog("恩爱值100", 1);
                        cm.gainItem(3700035, 1); //100的称号
                        cm.sendOk("恭喜你领取了称号#z3700035#");
                        cm.worldMessage("[恩爱称号]：玩家[" + cm.getChar().getName() + "]领取了情侣恩爱专属称号<甜蜜情人节>");
                        cm.dispose();
                    }
                } else if (selection == 2) {
                    if (cm.getBossLog("恩爱值200", 1) != 0) {
                        cm.sendOk("你已经领取过了..");
                        cm.dispose();
                    } else if (cm.getChar().getVipczz() < 200) {
                        cm.sendOk("你的恩爱值还没到呢！");
                        cm.dispose();
                    } else {
                        cm.setBossLog("恩爱值200", 1);
                        cm.gainItem(3700036, 1); //200的称号
                        cm.sendOk("恭喜你领取了称号#z3700036#");
                        cm.worldMessage("[恩爱称号]：玩家[" + cm.getChar().getName() + "]领取了情侣恩爱专属称号<情人节糖果真甜>");
                        cm.dispose();
                    }
                }
            } else if (fstype == 3) { //黄金枫叶
                if (selection == 1) {
                    var count = cm.getBossLog("qddq", 1);
                    if (cm.getBossLog("1020活动") == 0) {
                        cm.gainItem(blxz[rand], 1); //随即部落勋章
                        cm.sendOk("你获得了#z" + blxz[rand] + "");
                    cm.setBossLog("1020活动");
                        cm.dispose();
                    } else {
                        cm.sendOk("你已经加入过部落了");
                        cm.dispose();
                    }
                } else if (selection == 5) { //怪物公园
                    //cm.warp(910530100,0);
                    cm.sendOk("正在比赛中...");
                    cm.dispose();
                } else if (selection == 6) { //怪物公园
                    if (cm.getBossLog("1020奖励",1) < 1 && cm.getPlayer().haveItem(1142014)) {
                        cm.addHyPay(-5000,false);
                        cm.sendOk("领取成功",1);
                        cm.setBossLog("1020奖励");
                        cm.dispose();
                    } else {
                        cm.sendOk("你领取领取过了，或者你不是本部落的成员");
                        cm.dispose();
                    }
                } else if (selection == 7) { //怪物公园
                    if (cm.getBossLog("1020奖励",1) < 1 && cm.getPlayer().haveItem(1142017)) {
                        cm.addHyPay(-5000,false);
                        cm.sendOk("领取成功");
                        cm.setBossLog("1020奖励",1);
                        cm.dispose();
                    } else {
                        cm.sendOk("你领取领取过了，或者你不是本部落的成员");
                        cm.dispose();
                    }
                }
            }
            if (fstype == 4) { //新年活动
                if (selection == 1) {
                    var count = cm.getBossLog("qddq", 1);
                    if (cm.getBossLog("1020活动") == 0) {
                        cm.gainItem(blxz[rand], 1); //高级神奇魔方
                        cm.sendOk("你获得了#z" + blxz[rand] + "");
                        cm.dispose();
                    } else {
                        cm.sendOk("你已经加入过部落了");
                        cm.dispose();
                    }
                } else if (selection == 2) {
                    if (cm.getBossLog("qddq", 1) >= 5 && cm.getBossLog("qdlb", 1) == 0) {
                        cm.setBossLog("qdlb", 1);
                        cm.gainItem(5062002, 10); //高级神奇魔方
                        cm.gainItem(5062001, 10); //混沌神奇魔方
                        cm.gainItem(2340000, 10); //祝福卷轴
                        cm.gainItem(2430008, +1);
                        cm.sendOk("领取成功.");
                        cm.worldMessage("[新年7天乐]：玩家[" + cm.getChar().getName() + "]领取了新年节的礼物包");
                        cm.dispose();
                    } else {
                        cm.sendOk("你已经领取过了,或者你签到未到6天");
                        cm.dispose();
                    }
                } else if (selection == 4) {
                    cm.sendOk("#e#r10月5号<活动1>#k#n\r\n入场时间：20：30，开始时间：20：30\r\n#b<第一论晋级赛射手跳跳>#k\r\n玩家全部站到起点,GM叫开始后,玩家开始跳,晋级8位玩家然后进行第二轮比赛\r\n#b<第二论36数字游戏>#k\r\n进入场地后,玩家请听GM指挥,GM会叫全部玩家所有站在一个点上面,然后GM随机抽出5位玩家分别分为1-2-3-4-5号,并排站好,然后GM说开始,1号玩家就可以开始数数字了,1号玩家只能数1,或者2,当以后玩家数后,2号玩家接着1号的数,如果1号数的1,那么2号玩家可以在1号数的数字的基础上+1或者+2,比如数2,或者3,依次类推,数到5号玩家后,1号接着5号的数,谁最后能说到36这个数字,便淘汰\r\n晋级到二轮活动的玩家都能获得娜娜币1W\r\n晋级的玩家可以玩第二轮的36\r\n第一个活动第一名：有孔全属性武器200武器(+S级星岩一个)+1万娜娜币+上网站名人榜\r\n第一个活动第二名：稀有椅子一把+1万娜娜币\r\n第一个活动第三名：一般椅子一把+1万娜娜币");
                    cm.dispose();
                } else if (selection == 8) {
                    cm.sendOk("#e#r10月5号<活动2>#k#n\r\n入场时间：20：40，开始时间：20：40\r\n#b<谁是卧底>#k\r\nGM会交易每个人,告诉他们的一个词语,在参与玩家中会有一人的词语不一样,然后每个人从GM排列号数来形容这个词语#r(最好不要形容得太容易,既要让本轮卧底不太懂是什么词语,又要让对友们明白你的意思)#k全部形容完后,大家根据玩家的号数投票,如果投出去的不是卧底,游戏继续,是卧底的话,卧底淘汰,卧底只要能存活到最后还剩3名玩家就晋级");
                    cm.dispose();
                } else if (selection == 6) {
                    cm.sendOk("#e#r10月2号<活动2>#k#n\r\n问答时间：20：12，结束时间：20：20\r\n#b<全能问答>#k\r\nGM每次问答的时候会给出下一题的提示,比如下一题是数学题,下面说说提示的方面\r\n#b数学题#k就是一些加减乘除,所以准备好你的计算器哟\r\n#b歪答题#k一些有意思的答题,娱乐性答案\r\n#b音乐题#kGM可能回说出一句歌词,必须回答出名字,或者GM会说关键字,玩家必须说出一句带关键字的歌句\r\n#bKK知识#k一些关于梦旅冒险岛的常识\r\n答题必须在#r市场答,直接在聊天窗输入答案,以公屏的文字决定快慢,也可以使用喇叭答题#k\r\n答对一道的玩家将能获得一个黄金罗盘(GM卷,有孔装备)#k");
                    cm.dispose();
                } else if (selection == 7) {
                    cm.sendOk("#e#r10月3号<活动2>#k#n\r\n开始时间：21：50\r\nGM会进行5轮的躲猫猫活动,GM藏好会,会喇叭提示大家GM所在的城市,当然提示的4个城市只有1个是对的哟,找到的玩家可以获得黄金罗盘一个");
                    cm.dispose();
                } else if (selection == 5) { //怪物公园
                    //cm.warp(749080100);
                    cm.sendOk("入口已经关闭");
                    cm.dispose();
                } else if (selection == 3) { //搜集物品
                    if ((cm.getHour() != 15 || cm.getHour() != 19)) {
                        cm.sendOk("当前服务器时间:" + cm.getHour() + "点" + cm.getMin() + "分\r\n时间还没到哦.只能下午15点和晚上19点提交任务");
                        cm.dispose();
                    } else if (cm.haveItem(4000004, 200) == false || cm.haveItem(4000268, 200) == false || cm.haveItem(4000273, 200) == false || cm.haveItem(4000188, 200) == false) {
                        cm.sendOk("材料不足,你需要搜集#z4000004#x200个,#z4000268#x200个,#z4000273#x200个,#z4000188#x200个\r\n注意：提交任务只能在15点和19点,所以请抓紧时间");
                        cm.dispose();
                    } else {
                        cm.gainItem(4000004, -200);
                        cm.gainItem(4000268, -200);
                        cm.gainItem(4000273, -200);
                        cm.gainItem(4000188, -200);
                        cm.gainItem(2430008, +1);
                        cm.sendOk("恭喜任务完成,获得了一个#r#z2430008##k,快去宝物岛拿好东西吧");
                        cm.worldMessage("[新年7天乐]：玩家[" + cm.getChar().getName() + "]完成了新年7天乐的任务,获得了一个黄金罗盘");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 3) {
            if (fstype == 13) {
                if (cm.getMeso() < price || cm.haveItem(4310034, 2) == false) {
                    cm.sendOk("对不起,你没有足够的冒险币,或者是没有足够的#z4310034#");
                    cm.dispose();
                    return;
                }
                var chance = Math.floor(Math.random() * 2);
                if (chance == 1) {
                    var item = cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(1).copy();
                    var statup = new java.util.ArrayList();
                    item.setUpgradeSlots((item.getUpgradeSlots() + 1));
                    Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                    Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                    cm.gainMeso(-price);
                    cm.gainItem(4310034, -2);
                    cm.sendOk("恭喜你成功拉，快快看你的包裹吧！");
                    cm.worldMessage("[武器升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用正义币为武器提升了1次砸卷次数");
                    cm.dispose();
                } else {
                    cm.gainMeso(-price / 2);
                    cm.gainItem(4310034, -2);
                    cm.sendOk("真遗憾，升级失败");
                }
                cm.dispose();
                return;
            }
            if (fstype == 14) {
                if (cm.getMeso() < price || cm.haveItem(4310003, 1) == false) {
                    cm.sendOk("对不起,你没有足够的冒险币,或者是没有足够的#z4310003#");
                    cm.dispose();
                    return;
                }
                var chance = Math.floor(Math.random() * 2);
                if (chance == 1) {
                    var item = cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(1).copy();
                    var statup = new java.util.ArrayList();
                    item.setUpgradeSlots((item.getUpgradeSlots() + 1));
                    Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                    Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                    cm.gainMeso(-price);
                    cm.gainItem(4310003, -1);
                    cm.sendOk("恭喜你成功拉，快快看你的包裹吧！");
                    cm.worldMessage("[武器升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用黄金枫叶为武器提升了1次砸卷次数");
                    cm.dispose();
                } else {
                    cm.gainMeso(-price / 2);
                    cm.gainItem(4310003, -1);
                    cm.sendOk("真遗憾，升级失败");
                }
                cm.dispose();
                return;
            }
            if (fstype == 15) {
                if (cm.getMeso() < price || cm.haveItem(4032733, 30) == false) {
                    cm.sendOk("对不起,你没有足够的冒险币,或者是没有足够的#z4032733#");
                    cm.dispose();
                    return;
                }
                var chance1 = Math.floor(Math.random() * 2);
                if (chance1 == 1) {
                    var item = cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(1).copy();
                    var ii = Packages.server.MapleItemInformationProvider.getInstance();
                    var chance = Math.floor(Math.random() * 100);
                    var lvsj = Math.floor(Math.random() * 20) + 10;
                    cm.gainMeso(-price);
                    cm.gainItem(4032733, -30);
                    if (chance <= 5) { //watk
                        item.setWatk(item.getWatk() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k攻击.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的攻击");
                    } else if (chance > 5 && chance <= 20) { //matk
                        item.setMatk(item.getMatk() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k魔攻.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的魔法攻击");
                    } else if (chance > 20 && chance <= 40) { //str
                        item.setStr(item.getStr() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k力量.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的力量");
                    } else if (chance > 40 && chance <= 60) { //dex
                        item.setDex(item.getDex() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k敏捷.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的敏捷");
                    } else if (chance > 60 && chance <= 80) { //luk
                        item.setInt(item.getInt() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k智力.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的智力");
                    } else if (chance > 80) { //int
                        item.setLuk(item.getLuk() * 1 + lvsj);
                        Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, 1, 1, false);
                        Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(), item, false);
                        cm.sendOk("恭喜，成功给装备增加了:#r" + lvsj + "#k运气.");
                        cm.worldMessage("[装备升级]：恭喜[" + cm.getChar().getName() + "]在市场裂空之鹰处，使用彩虹枫叶提升了武器的运气");
                    }
                } else {
                    cm.gainMeso(-price / 2);
                    cm.gainItem(4032733, -30);
                    cm.sendOk("真遗憾，升级失败");
                }
                cm.dispose();
                return;
            }
            if (fstype == 101) {
                Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.EQUIP, selection, 1, true);
                cm.sendOk("恭喜,此道具已被清除.");
                cm.dispose();
            }
            if (fstype == 102) {
                Packages.server.MapleInventoryManipulator.removeFromSlot(cm.getC(), Packages.client.inventory.MapleInventoryType.CASH, selection, 1, true);
                cm.sendOk("恭喜,此道具已被清除.");
                cm.dispose();
            }
        }
    }
}
