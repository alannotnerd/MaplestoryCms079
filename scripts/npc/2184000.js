//副本开关 开启、true 关闭、false
var open = true;
//副本脚本名
var name = ["Hillah_120", "Hillah_170"];
//等级限制
var minLevel = [120, 170];
var maxLevel = [255, 255];
//次数限制
var maxenter = 15;
//记录次数名称
var PQName = '希拉';

var status = -1;

function start() {
    if (cm.getParty() == null) {
        cm.sendOk("必须组成1人以上的组队, 才能入场.");
        cm.dispose();
        return;
    } else if (!cm.isLeader()) {
        cm.sendOk("只有队长才可以申请入场.");
        cm.dispose();
        return;
    }
    cm.sendSimple("#e<BOSS：希拉>#n\r\n做好消灭希拉, 让阿斯旺迎来真正解放的准备了吗? 如果有队员在其他地方, 请把他们全部聚集到一起.\r\n\r\n#b#L0#申请进入<BOSS：希拉>.#l\r\n");//#L1#进阶希拉#l\r\n
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendSimple("#e<BOSS：希拉>#n\r\n请选择想要挑战的模式.\r\n\r\n#L0#普通模式(" + minLevel[0] + "级以上 )#l\r\n#L1#困难模式(" + minLevel[1] + "级以上 )#l\r\n");
    } else if (status == 1) {
        if (selection !=0 && selection != 1) {
            cm.sendOk("出现未知错误。");
            cm.dispose();
            return;
        }
        if (!cm.isAllPartyMembersAllowedLevel(minLevel[selection], maxLevel[selection])) {
            cm.sendNext("组队成员等级 " + minLevel[selection] + " 以上 " + maxLevel[selection] + " 以下才可以入场。");
        } else if (!cm.isAllPartyMembersAllowedPQ(PQName, maxenter)) {
            cm.sendNext("你的队员\"" + cm.getNotAllowedPQMember(PQName, maxenter).getName() + "\"次数已经达到上限了。");
        } else {
            var em = cm.getEventManager(name[selection]);
            if (em == null || !open) {
                cm.sendOk("要挑战的希拉副本还未开放。");
            } else {
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {
					em.startInstance(cm.getParty(), cm.getMap(), 255);
                    cm.gainMembersPQ(PQName, 1);
                } else {
                    cm.sendSimple("已经有队伍在进行了,请换其他频道尝试。");
                }
            }
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}