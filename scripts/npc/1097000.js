/*
唐云的料理讲座
 */
var status = -1;
var select = -1;
function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		cm.sendSimple("#e<组队任务 : 唐云的料理讲座>#n..你愿意为诺特勒斯的船员做美味的料理吗？我唐云将亲自教你做料理。#b\r\n#L0#进入唐云的料理讲座。#l \r\n#L1#领取唐云的厨师服。#l \r\n#L2#听取关于唐云的料理讲座的说明#l \r\n#L3#询问今天剩余的挑战次数。#l");
	} else if (status == 1) {
		if (select == -1)
			select = selection;
		if (select == 0) {
			if (cm.isLeader()) {
				if (!cm.allMembersHere()) {
					cm.sendNext("你好像有组队成员不在啊。");
					cm.dispose();
					return;
				}
				if (cm.isAllPartyMembersAllowedLevel(60, 250)) {
					cm.warpParty(912080100);
				} else {
					cm.sendNext("你的组队成员中有不符合等级要求的角色。请不要忘记组队成员等级都要在60级以上，90级以下才行");
				}
			} else {
				cm.sendOk("制作料理并不容易。想进去的话，最好和3人以下的队员一起进去。不过如果有自信的话，以1人组队进去也没关系。你可以通过自己所属组队的队长申请进入。");
			}
			cm.dispose();
		} else if (select == 1) {
			cm.sendSimple("哦，是制作了很多料理，可以领取厨师服装的人吗？那我当然应该把厨师服装给你。厨师资格证带来了吗？\r\n#L0#请给我厨师服(厨师资格证3个以上)。#l \r\n#L1#请给我厨师帽(厨师资格证5个以上)。#l");
		} else if (select == 2) {
			cm.sendNext("你好。我唐云是负责管理海盗船诺特勒斯号的厨房的厨师长。我制作的料理色香味俱全，人们都称我是料理大师，哈哈哈哈哈！谁说的？是谁来着？那个很重要吗？哈哈哈哈！");
		} else if (select == 3) {
			cm.sendOk("你今天的剩余次数是10次。");
			cm.dispose();
		}
	} else if (status == 2) {
		if (select == 1) {
			if (selection == 0) {
				if (cm.haveItem(4033668, 3) && cm.canHold(1052578)) {
					cm.gainItem(4033668, -3);
					cm.gainItem(1052578, 1);
				} else {
					cm.sendNext("你确定有3个厨师资格证吗？还是背包装备栏满了？请确认一下，然后再来和我说话。");
				}
			} else if (selection == 1) {
				if (cm.haveItem(4033668, 5) && cm.canHold(1003762)) {
					cm.gainItem(4033668, -5);
					cm.gainItem(1003762, 1);
				} else {
					cm.sendNext("你确定有5个厨师资格证吗？还是背包装备栏满了？请确认一下，然后再来和我说话。");
				}
			}
			cm.dispose();
		} else if (select == 2) {
			cm.sendNextPrev("虽然我很能干，但最近也遇到了一些问题。海盗们的胃总是那么好，不管吃多少东西都不见底，我就算是长着三头六臂也不够用。但是我又不能让他们节食。");
		}
	} else if (status == 3) {
		if (select == 2) {
			cm.sendNextPrev("所以我正在招人到厨房来帮着制作料理。料理方法很简单。只要召唤出料理所需的材料，然后努力翻炒就行。虽然必须调节一下火候，但那并不难。");
		}
	} else if (status == 4) {
		if (select == 2) {
			cm.sendNextPrev("料理做得好的话，会有很多人抢着吃。但是，如果做得不好的话，就等于是垃圾。这一切都取决于你的实力。怎么样？我觉得你看起来很有料理天分，你愿意试一下吗？一天最多只能做十次。\r\n - #e等级#n : 60以上#r( 推荐等级: 60 ~ 90 )#k \r\n - #e限定时间#n : 20分钟\r\n - #e参加人员#n : 1~3名\r\n - #e获得道具#n :\r\n#i1052578:# #t1052578#\r\n#i1003762:# #t1003762#\r\n");
		}
	} else if (status == 5) {
		if (select == 2) {
			cm.dispose();
		}
	}
}