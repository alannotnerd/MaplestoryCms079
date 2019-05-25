/*
 完成时间：2014年8月10日 15:31:48
 脚本功能：雾海无限挑战
 */




var time = new Date();

var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var hour = time.getHours(); //获得小时
var minute = time.getMinutes();//获得分钟
var second = time.getSeconds(); //获得秒
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("嗯... 我猜你还有什么别的事情要在这里做吧？");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMapId() == 923020100) {
                var em = cm.getEventManager("Limitless");
                if (em.getProperty("Gift") == "true") {
                    var ItemQuality = 0;
					var conn = cm.getConnection();
					var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
                    var EventDataBase = pstmt.executeQuery();
                    while (EventDataBase.next()) {
                        ItemQuality = EventDataBase.getString("ItemQuality");
                    }
					EventDataBase.close();
					pstmt.close();
					//conn.close();
                    var UpDateData = cm.getConnection().prepareStatement("update limitlessEvent set ItemQuality=? where charid=" + cm.getPlayer().getId() + "")
                    UpDateData.setString(1, parseInt(ItemQuality) + 5);
                    UpDateData.executeUpdate();//更新;
					var currentTimes = parseInt(em.getProperty("Times"));
					var giftTimes = currentTimes-1;
					var itemid = 5062000
					var itemQuantity = 1;
					gainGift(giftTimes);                 
                    em.setProperty("Gift", "false");
                    cm.dispose();
                } else {
                    status = 1;
                    cm.sendYesNo("你想放弃挑战离开这里吗？");
                }
            } else {
                cm.sendSimple(" 无尽深渊之中，BOSS无限来袭，冒险家们带上您们的勇气去消灭他们吧。为了您今后在冒险岛世界中的强大与否，请在此锻炼您的能力吧。#n#k\r\n\r\n        #e#L0##r"+yun8+"进行挑战无限挑战副本"+yun9+"#l#b\r\n        #L1#"+yun8+"查看挑战玩家排名"+yun9+"#l\r\n          #d#L2#"+yun8+"查看副本介绍"+yun9+"#l\r\n\r\n进入副本后，前一次的记录将被刷新！\r\n#r本周排行第一名奖励:#k#v4002001# 300张   #k#v2046997##v2046996##v2047818# 自选3张。\r\n#r本周排行第二名奖励:#k#v4002001# 100张  #k#v2046997##v2046996##v2047818# 自选1张。")
            }
        } else if (status == 1) {
            if (selection == 0) {
				var cal = java.util.Calendar.getInstance();
				var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
				//hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
				//refreshDates(cal);
				//if (weekday == 1 || weekday == 7) {
                if (true)//)weekday == 1 || weekday == 7) {//(hour == 13 && (minute >= 0 && minute <= 20)) || (hour == 20 && (minute >= 0 && minute <= 20))) {
                    if (cm.getParty() == null) { // 没有组队
                        cm.sendOk("请组队后和我谈话。");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 不是队长
                        cm.sendOk("请叫队长和我谈话。");
                        cm.dispose();
					} else if (cm.getBossLogAcc('无限副本') >= 20) {
                        cm.sendOk("你不能进去。该账号每天只能进入2次。")
                        cm.dispose();
                    } else {
                        var party = cm.getParty().getMembers().size();
                        var mapId = cm.getPlayer().getMapId();
                        if (party != 1) {
                            cm.sendOk("对不起，无限挑战只能一个人进去。\r\n请开设只有你一个人的组队。")
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Limitless");
                            if (em == null) {
                                cm.sendOk("此任务正在建设当中。");
                            } else {
								var conn = cm.getConnection();
								var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
								var EventDataBase = pstmt.executeQuery();
                                var insert = conn.prepareStatement("INSERT INTO limitlessEvent(id,charid,times,ItemQuality,name) VALUES(?,?,?,?,?)"); // 载入数据
                                var prop = em.getProperty("started");
                                var x = 0;
                                if (/*prop == "false" || prop == null || */cm.getMap(923020100).getCharactersSize()== 0) {
                                    cm.setBossLogAcc('无限副本');
                                    cm.worldSpouseMessage(0x15, "『无限关卡挑战』：玩家 " + cm.getChar().getName() + " 气势汹汹的去挑战极限之无限关卡去了。");
                                    while (EventDataBase.next()) {
                                        x++;
                                    }
									EventDataBase.close();
									pstmt.close();
									//conn.close();
                                    if (x == 0) {
                                        insert.setString(1, null); //载入记录ID
                                        insert.setString(2, cm.getPlayer().getId());
                                        insert.setString(3, 0);
                                        insert.setString(4, 0);
                                        insert.setString(5, cm.getPlayer().getName());
                                        insert.executeUpdate(); //更新
										insert.close();
                                    } else {
										//重置关数
										var update = conn.prepareStatement("UPDATE limitlessEvent set times = 0, ItemQuality = 0 where charid = " + cm.getPlayer().getId() + "");
										update.executeUpdate();
										update.close();
									}
									//conn.close();
                                    em.startInstance(cm.getParty(), cm.getMap());
                                    cm.dispose();
                                    return;
                                } else {
                                    cm.sendOk("对不起，此频道已经有人在无限副本里面了。");
                                    cm.dispose();
                                }
                            }
                        }
                    }
                
            } else if (selection == 1) {//排名
                Ranking();//排名
                cm.dispose();
            } else if (selection == 2) {//副本介绍
                //TODO 
                cm.sendOk("- #e#d副本介绍：#k#n\r\n\r\n#b进入该副本后，地图会有一个BOSS等待着您，当您消灭后之后关卡的BOSS将会更加强大，因此请带足够药水和万能药水，小心不要死亡了。在副本里可以输入 #r@mob#b 来查看怪物剩余HP，当您在副本里不小心死亡后可以使用 #r@fh#b 来复活自己从而战斗，当您消灭BOSS以后会有10秒间隙时间会自动进入下一关，当时间到了BOSS还未消灭，则副本失败。每通关十层都可以获得不同的丰厚奖励，#r100关#k（包括100关）每10关可以获得200点卷，并且还有几率直接获得#b140防具或武器箱子、封印解除卷轴、星星、惊人正义卷轴#k等等。#k\r\n\r\n#e#d关卡提示：#n#k#r每天2次#k");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.warp(923020000);
            cm.dispose();
        }
    }
}

function Ranking() {
    var Text = "无尽副本的排名如下：(1~10名次)\r\n\r\n#d"
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent ORDER BY times DESC LIMIT 10");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# 名次:" + i + "\r\n角色名:" + RankDataBase.getString("name") + "\r\n最终通关卡:" + RankDataBase.getString("times") + "\r\n获得魔方数:" + RankDataBase.getString("ItemQuality") + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
	RankDataBase.close();
	pstmt.close();
	//conn.close();
    cm.sendOk(Text);
}

function getItemQty() {
    var ItemQuality = 0;
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        ItemQuality = EventDataBase.getString("ItemQuality");
    }
	EventDataBase.close();
	pstmt.close();
	//conn.close();
    cm.playerMessage(-1, "[无限战斗] 截止目前已经获取到了" + ItemQuality + "个高级神器魔方。");
}

function getTimes() {
    var Times = 0;
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement("SELECT times FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("times");
    }
	EventDataBase.close();
	pstmt.close();
	//conn.close();
    return Times;
}

function UpateTimes() {
	var conn = cm.getConnection();
	//var pstmt = conn.prepareStatement(
    var UpDateData = conn.prepareStatement("update limitlessEvent set times=? where charid = " + cm.getPlayer().getId() + "");
    UpDateData.setString(1, parseInt(getTimes()) + 1);
    UpDateData.executeUpdate();//更新;
	UpDateData.close();
	//conn.close();
}

function gainGift(times) {
	var itemid = -1;
	var itemQuantity = 1;
	switch(times) {
		case 10:
			itemid = 4310057;
			itemQuantity = 40;
		break;
		case 20:
			itemid = 4310129;
			itemQuantity = 40;
		break;
		case 30:
			itemid = 2431739;
			itemQuantity = 1;
		break;
		case 40:
			itemid = 5152053;
			itemQuantity = 1;
		break;
		case 50:
			itemid = 5150040;
			itemQuantity = 1;
		break;
		case 60:
			itemid = 2340000;
			itemQuantity = 1;
		break;
		case 70:
			itemid = 4000082;
			itemQuantity = 10;
		break;
		case 80:
			itemid = 4033356;
			itemQuantity = 1;
		break;
		case 90:
			itemid = 5062002;
			itemQuantity = 2;
		break;
		case 100:
			itemid = 2430481;
			itemQuantity = 15;
		break;
		case 110:
			itemid = 2430915;
			itemQuantity = 15;
		break;
		case 120:
			itemid = 5062009;
			itemQuantity = 2;
		break;
		case 130:
			itemid = 5062010;
			itemQuantity = 2;
		break;
		case 140:
			itemid = 5064000;
			itemQuantity = 1;
		break;
		case 150:
			itemid = 5064003;
			itemQuantity = 1;
		break;
	}
	cm.gainItem(itemid, itemQuantity);
	cm.playerMessage(-1, "[无限战斗] 因突破第"+(times)+"层，奖励 <"+cm.getItemName(itemid)+"> x "+itemQuantity+"。");
	//100层后额外奖励
	if (times>=100) {
		cm.gainNX(200);
		var randomNum = Math.floor(Math.random()*1000);
		var addItemQuantity = 2;
		var addItemid = -1;
		if (randomNum >= 100 && randomNum <= 400) {
			//30%;
			var itemList = Array(5062000, 5062002, 5064000,2340000, 5062010, 2049752);
			addItemQuantity = 1;
			addItemid = itemList[Math.floor(Math.random()*itemList.length)];		
		} else if (randomNum >= 10 && randomNum <= 20) {
			//1%
			if (cm.getBossLog('雾海随机奖励')==0) {
				cm.setBossLog('雾海随机奖励');
				addItemid = 2610001;
				addItemQuantity = 1;
			}
		} else if (randomNum >= 500 && randomNum <= 600) {
			//10%
			var itemList = Array(2431945,2431944);
			addItemQuantity = 1;
			addItemid = itemList[Math.floor(Math.random()*itemList.length)];	
		} else if (randomNum >=950 && randomNum<=1000) {
			//5%
			var itemList = Array(2049135, 2049136, 2049137);
			addItemQuantity = 1;
			addItemid = itemList[Math.floor(Math.random()*itemList.length)];			
		} else if (randomNum >=800 && randomNum <= 900) {
			//10%
			addItemQuantity = 30;
			addItemid = 4001839;
		}
		//有奖励时操作
		if (addItemid != -1) {
			cm.gainItem(addItemid, addItemQuantity);
			cm.playerMessage(-1, "[无限战斗] 太棒了！恭喜您额外获得 <"+cm.getItemName(itemid)+"> x "+itemQuantity+"。");
		}
	}
}
