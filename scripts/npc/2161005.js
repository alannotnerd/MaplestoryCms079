/*
皮埃尔
 */


var status = 0;
//限制等级
var minLevel = 140; //最低等级
var maxLevel = 250;//最高等级
var minLevel1 = 180; //最低等级
var maxLevel1 = 250;//最高等级

//限制人数
var minPlayers = 1;
var maxPlayers = 6; 

//怪物最大等级设置
var moblevel = 255;

//副本开关 开启、true 关闭、false
var open = true;

//组队log记录
var PQ = '狮子王:班·雷昂[简单]';
var PQ1 = '狮子王:班·雷昂[普通]';

//配置文件名称
var eventname = "BossVonLeon_EASY"; 
var eventname1 = "BossVonLeon_NORMAL";

//设置每日次数
var maxenter = 5;
var maxenter1 = 5;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("快捷寻找组队按热键“O”赶快加入组队来挑战组队任务吧。");  
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var em = cm.getEventManager(eventname);
        var em1 = cm.getEventManager(eventname1);
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r副本空闲#k";
        } else {
            var vipstr = "#b已经开启#k";
        }
         var prop = em1.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr1 = "#r副本空闲#k";
        } else {
            var vipstr1 = "#b已经开启#k";
        }
        
            if (cm.getPlayer().getClient().getChannel() == 1) {
			if ((cm.getPlayer().getMapId() == 211070100)||(cm.getPlayer().getMapId() == 211070102)) { //传送
                cm.sendSimple("#e<Boss - 狮子王:班·雷昂>#n\r\n你现在确定放弃任务,从这里出去?\r\n#L2##b是的,现在就出去#l");
            } else {
            var pqtry = maxenter - cm.getPQLog(PQ);
            var pqtry1 = maxenter1 - cm.getPQLog(PQ1);
            var rwpz = "";
            
            rwpz += "#e推荐等级：140 - 250";
            rwpz += "       推荐人数：单人副本  \r\n#b已进行普通模式：" + cm.getPQLog(PQ) + " 次       剩余挑战次数：" + pqtry + " 次#k";
            rwpz += "\r\n#r已进行进阶模式：" + cm.getPQLog(PQ1) + " 次       #r剩余挑战次数：" + pqtry1 + " 次#n#k";
            rwpz += "\r\n普通模式状态：" + vipstr + "        进阶模式状态：" + vipstr1+ "";
            var zyms = "";
            zyms = "#e<Boss - 狮子王>#n\r\n#b#h0# \n\#k你现在挑战这个BOSS副本吗?\r\n" + rwpz + "\r\n";
            zyms += "#L1##b是的,进行普通模式#l\r\n\r\n";
            zyms += "#L2##b是的,进行进阶模式#l\r\n";
            cm.sendSimple(zyms);
			}
       } else {
            cm.sendOk("当前副本只能在1频道进行。");
            cm.dispose();
        }
       
    } else if (status == 1) {
         if (selection == 1) {
            if (cm.getParty() == null) { //判断组队
                cm.sendOk("创建组队才能进入。");
                cm.dispose();
            }else if (!cm.isLeader()) { // 判断组队队长
                cm.sendOk("请你们团队的队长和我对话。");
                cm.dispose();
            } else if (cm.getPQLog(PQ) >= maxenter) {
                cm.sendOk("你今天挑战次数已经用完了,请明天在来吧!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的组队部分成员不在当前地图,请召集他们过来后在尝试。"); //判断组队成员是否在一张地图..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入场。");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname);
                    if (em == null || open == false) {
                        cm.sendSimple("配置文件不存在,请联系管理员。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            cm.setPQLog(PQ);
                            em.startInstance(cm.getParty(), cm.getMap(), moblevel );
                        } else {
                            cm.sendSimple("已经有队伍在进行了,请换其他频道尝试。");
                            cm.dispose();
                        }
                        cm.gainItem(4033611,-1);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入场。");
                }
            }
        } else if (selection == 2) {
		if ((cm.getPlayer().getMapId() == 211070100)||(cm.getPlayer().getMapId() == 211070102)) { //传送
                cm.warp(211070000, 0);
            cm.dispose();
			return;
            }
            if (cm.getParty() == null) { //判断组队
                cm.sendOk("创建组队才能进入。");
                cm.dispose();
             } else if (!cm.isLeader()) { // 判断组队队长
                cm.sendOk("请你们团队的队长和我对话。");
                cm.dispose();
            } else if (cm.getPQLog(PQ1) >= maxenter1) {
                cm.sendOk("你今天挑战次数已经用完了,请明天在来吧!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的组队部分成员不在当前地图,请召集他们过来后在尝试。"); //判断组队成员是否在一张地图..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel1 && cPlayer.getLevel() <= maxLevel1) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入场。");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname1);
                    if (em == null || open == false) {
                        cm.sendSimple("配置文件不存在,请联系管理员。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            cm.setPQLog(PQ1);
                            em.startInstance(cm.getParty(), cm.getMap(), moblevel);
                        } else {
                            cm.sendSimple("已经有队伍在进行了,请换其他频道尝试。");
                            cm.dispose();
                        }
                        cm.gainItem(4033611,-1);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 "+ minLevel1 +" 以上 "+ maxLevel1 +" 以下才可以入场。");
                }
            }
        }
    } else if (status == 2) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}