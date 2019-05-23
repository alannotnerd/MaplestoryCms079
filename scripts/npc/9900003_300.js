/*
 脚本功能：三头犬相关
 */

var a = 0;
var minLevel = 150;
var maxLevel = 255;
var minPlayers = 1;
var maxPlayers = 6;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else
        if (a == 0) {
            if (cm.getMap().getId() == 510102100) {
                cm.sendSimple("你想放弃挑战并且离开这里吗？#b\r\n#L0#  怪物太恐怖了！我要离开这里！！")
            } else {
                if (cm.getParty() == null) {
                    cm.playerMessage(1, "请组队后再试。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.playerMessage(1, "请队长传送后再试。");
                    cm.dispose();
                } else if (cm.getMap(510102100).getCharactersSize() > 0) { // Not Party Leader
                    cm.playerMessage(1,"有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                } else if (cm.getBossLog('StqBoss') >= 30) {
                    cm.playerMessage(1, "三头犬一天只能挑战30次。其他好东西建议去打别的boss");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    if (party.size() < minPlayers || party.size() > maxPlayers)
                        next = false;
                    else {
                        for (var i = 0; i < party.size() && next; i++) {
                            if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
                                levelValid += 1;
                            if (party.get(i).getMapid() == mapId)
                                inMap += 1;
                        }
                        if (levelValid < minPlayers || inMap < minPlayers)
                            next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("StqBoss");
                        if (em == null) {
                            cm.playerMessage(1, "出现错误，请联系管理员。");
                            cm.dispose();
                        }
                        else {
                            em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                            party = cm.getPlayer().getEventInstance().getPlayers();
			    cm.worldSpouseMessage(0x20,"『强化三头犬』 玩家 "+ cm.getChar().getName() +" 带领他(她)的队伍去挑战 21 亿血量的三头犬去了。");
                            cm.setBossLog('StqBoss')
                        }
                        cm.dispose();
                    }
                    else {
                        cm.playerMessage(1, "<三头犬 - 组队副本>\r\n\r\n1、参加的组队需要1人以上，6人以下。\r\n2、参加的组队成员等级应在150以上。");
                        cm.dispose();
                    }
                }
            }
        } else if (a == 1) {
            var instance = cm.isPlayerInstance();
            if (instance == false) {
                cm.warp(910000000)
                cm.dispose();
            } else {
                cm.removePlayerFromInstance();
                cm.dispose();
            }
        }//status

    }
}