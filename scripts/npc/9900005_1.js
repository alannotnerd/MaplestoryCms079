 var status = 0;
var typed = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("\r\n\r\n\r\n#k\r\n\r\n\r\n#b以下这些物品想要吗?#k\r\n\r\n#L1##v2430069##v3010828##v3010944##v3010824##v3015015##v3015016##v2022729##v2022728##v2022530##v2290285##v1022197##l");
        } else if (status == 1) {
            if (selection == 1) {
                typed = 1;
                cm.sendYesNo("#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n   想要获得刚才那些物品必须挑战#o9300306#.\r\n\r\n- #e进入条件#n：自身进入,每天3次\r\n- #e推荐等级#n：180级以上");
            }
        } else if (status == 2) {
            if (typed == 1) {
                if (cm.getLevel() <= 179) {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n\r\n你好像还不具备以下条件。我不能送你们进入。\r\n\r\n-\r\n- #e等级需求#n：180级以上");
                    cm.dispose();
                }
                else if (cm.getParty() == null) {
                    cm.sendOk("#e#r你好像还没有一个队伍,我是不能送你进去的.");
                    cm.dispose();
                }
                else if (!cm.isLeader()) {
                    cm.sendOk("#e#r请队长来跟我谈话.");
                    cm.dispose();
                }
				else if (cm.getBossLog("自身镜像")>=3) { // Not Party Leader
                    cm.sendOk("你今天已经不能再挑战了。");
                    cm.dispose();
                }
                else if (cm.getMap(401100100).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                }
                else if (cm.getParty().getMembers().size() > 1) {
                    cm.sendOk("对不起，此次挑战必须单人.");
                    cm.dispose();
                } else {
                    var em = cm.getEventManager("xinmo");
                    if (em == null) {
                        cm.sendOk("出错啦,请联系GM.");
                        cm.dispose();
                    } else {
						cm.setBossLog("自身镜像");
                        em.startInstance(cm.getParty(), cm.getChar().getMap());
                    }
                    cm.worldSpouseMessage(0x0C,"『副本公告』" + " : " + "强大的" + cm.getChar().getName() + ",挑战自己的心魔去了。是否能挑战成功呢?。");
                    cm.dispose();
                }
            }
        }
    }
}
