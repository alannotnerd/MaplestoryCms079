importPackage(net.sf.cherry.net.world.guild);

var status;
var choice;
var guildName;
var partymembers;

function start() {
	partymembers = cm.getPartyMembers();
	status = -1;
	action(1,0,0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
	    cm.sendSimple("您好！ 我叫#b蕾那丽#k。\r\n#b#L0#请告诉我家族联盟是什么？#l\r\n#L1#要成立家族联盟的话应该怎么做？#l\r\n#L2#我想成立家族联盟。#l\r\n#L3#我想增加家族联盟的家族数量。#l\r\n#L4#我想解散家族联盟。#l");
	else if (status == 1) {
		choice = selection;
	    if (selection == 0) {
		    cm.sendNext("家族联盟仅仅只是说。家族的一些行业联盟。联合在一起。形成一个庞大的家族。我负责管理这些联盟家族。");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendNext("如果要创建家族联盟，必须由2个家族的族长组队。组对的组队长将成为新建家族联盟的族长。");
			cm.dispose();
		} else if(selection == 2) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendNext("请先和要联盟的家族族长组队后再和我说话。"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuild() == null) {
				cm.sendNext("你不能创建家族联盟。因为你没有家族。");
				cm.dispose();
			} else if (partymembers.get(1).getGuild() == null) {
				cm.sendNext("你的组队中似乎有一位成员没有家族。");
				cm.dispose();
			} else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
				cm.sendNext("你已经存另一家族联盟中。因此，不能再继续创建。");
				cm.dispose();
			} else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
				cm.sendNext("你的组队中的成员已经是另一家族联盟的成员。");
				cm.dispose();
			} else if (partymembers.size() != 2) {
				cm.sendNext("请确认你的组队中只有2名玩家。");
				cm.dispose();
			} else if (cm.partyMembersInMap() != 2) {
				cm.sendNext("请确保你组队中的另一名玩家和你在同一地图。");
				cm.dispose();
			} else
                               cm.sendYesNo("噢~！你有兴趣创建一个家族联盟？");
		} else if (selection == 3) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendOk("尚未完成"); //ExpandGuild Text
			else {
			    cm.sendNext("只有联盟队长才可以增加联盟家族数量。");
				cm.dispose();
			}
		} else if(selection == 4) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendYesNo("你确定要解散你的家族联盟？");
			else {
				cm.sendNext("只有联盟队长才可以解散家族联盟。");
				cm.dispose();
			}
		}
	} else if(status == 2) {
	    if (choice == 2) {
		    cm.sendGetText("请输入想要创建家族联盟的名称。(英文最多12字，中文最多6字)");
		} else if (choice == 4) {
			if (cm.getPlayer().getGuild() == null) {
				cm.sendNext("你不能解散不存在的家族联盟。");
				cm.dispose();
			} else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
				cm.sendNext("你不能解散不存在的家族联盟。");
				cm.dispose();
			} else {
				MapleAlliance.disbandAlliance(cm.getC(), cm.getPlayer().getGuild().getAllianceId());
				cm.sendOk("家族已经被解散。如果需要再次创建，请再和我说话。");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
	        cm.sendYesNo("你确定使用#r " + guildName + " #k做为家族联盟的名称吗？");
	} else if (status == 4) {
	    if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
			cm.sendNext("你不能使用这个名称"); //Not real text
			status = 1;
			choice = 2;
		} else {
			if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
				cm.sendOk("一个未知的系统发生错误！！！");
			else
				cm.sendOk("你已成功建立了家族联盟。");
			cm.dispose();
		}
	}
}
