var p1 = "#fUI/StatusBar2.img/starPlanet/achive/1#";
var yun4 ="#fUI/UIWindow/Quest/reward#";////奖励
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
			var selStr = "               #v3994060##v3994073##v3994077##v3994077#\r\n";
			selStr += "#e#L0##r" + p1 + "特色副本#l#L1#" + p1 + "#r组队副本#l#L2#" + p1 + "#r武陵通天塔#l\r\n";
			selStr += "#L3#" + p1 + "#r怪物公园#l#L4#" + p1 + "#r重置副本次数#l\r\n\r\n";
			selStr += "#L5#" + p1 + "#d闹钟王#l#L6#" + p1 + "#d浓姬副本#l#L7#" + p1 + "#d骑士团女皇#l\r\n";
			selStr += "#L8#" + p1 + "#e#k[简单/进阶]扎昆#l  #L9#" + p1 + "#k#e[普通/进阶]黑龙#l\r\n";
			selStr += "#L10#" + p1 + "#k#e[普通/混沌]品克缤#l#L11#" + p1 + "#k#e[普通/进阶]森兰丸#l\r\n";
			selStr += "#L12#" + p1 + "#d#e阿卡伊勒#l#L13#" + p1 + "#d#e艾菲尼娅#l#L14#" + p1 + "#d#e钻机BOSS#l\r\n";
			selStr += "#L15#" + p1 + "#d#e四大天王#l#L16#" + p1 + "#d#e狮子王城#l#L17#" + p1 + "#d#e[神话]希拉#l\r\n";
			selStr += "#L18#" + p1 + "#e#r【新】#b[尖兵副本]#l#L19#" + p1 + "#e#r【新】#b[金币副本]#l\r\n";
			selStr += "#L20#" + p1 + "#e#r【新】#b[卧虎藏龙]#l#L21#" + p1 + "#e#r【新】#b[宋达副本]#l\r\n";
			selStr += "#L22#" + p1 + "#e#r【危险】#b花样桃乐丝，#n#k你有神一样的走位吗？#l\r\n";
			selStr += "#L23#" + p1 + "#e#r【危险】#b牛魔王，#n#k我是你大佬你来打我啊#l\r\n";
			selStr += "#L24#" + p1 + "#e#r【危险】#b心树守护者之地#n#k-贝勒德入口（#rNew`）#l\r\n";
			selStr += "#L25#" + p1 + "#e#r【危险】#b暴君城堡战场#n#k-暴君麦格纳斯（#rNew`）#l\r\n";
			selStr += "#L26#" + p1 + "#e#r【危险】#b斯乌来袭，#n#k黑暗力量越来越明显了（#rNew`）#l\r\n";
			selStr += "#L27#" + p1 + "#e#r【恐怖】#b霸王乌鲁斯，#n#k凶猛来袭！等你来战（#rNew`）#l\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 0) {
				typed = 0;
				cm.sendYesNo("#e#r大量的奖励副本,每日必做,不同的玩法,不同的体验.#k\r\n\r\n- #e#d管理提示：#n#b点是进行查看。点否返回上一页.#k");
			} else if (selection == 1) {
				typed = 1;
				cm.sendYesNo("#e#d组队任务有每日一次的,也有无限制的哦!可以获得每日礼物箱子,箱子里有大量的好东西,#r平民好选!.#k\r\n\r\n- #e#d管理提示：#n#b点是进行查看。点否返回上一页.#k");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo("#e#r单人进入,每天免费2次,超级神奇魔方.\r\n可以获得#v1113070##v1402014##v1402037##v5530457##v5530458##v2046996##v2046997##v2047818#\r\n升级圣地#k\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 3) {
				typed = 3;
			    cm.sendYesNo("#d#e160级可以进入副本,需要门票#v4001522#,每天最多10次\r\n#r门票获得途径:\r\n#b1.在线120分钟可获得1张\r\n2.可以通过匠人街挖矿挖草获得材料进行兑换\r\nP:兑换门票和奖励的在公园地图内左边吉普车NPC\r\n#r(最少2个人组队,只扣除队长门票)#k\r\n\r\n- #e#d管理提示：#n#b点是则进入怪物公园地图。点否返回上一页.#k");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo("#r#e可以使用道具重置部分副本次数\r\n#b理财礼包可以重置更多的副本进入次数哦#k\r\n\r\n- #e#d管理提示：#n#b点是查看。点否返回上一页.#k");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo("#r#e练级\r\n技能书\r\n无限次数，需要材料\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("#r#e每日默认一次\r\n\r\n爆各类椅子、极品、超级椅子！！\r\n\r\n#d- 管理提示：#n#b点是进入地图。点否返回上一页#k");
			} else if (selection == 7) {
				typed = 7;
				cm.sendYesNo("#r#e[骑士团] 女皇 - 希纳斯的庭院（默认每日2次）\r\n"+yun4+"\r\n140级装备，制作装备材料，极品点装....\r\n\r\n#d- 管理提示：#b#n点是进入地图。点否返回上一页.#k");
			} else if (selection == 8) {
				typed = 8;
				cm.sendYesNo("#r#e[简单/进阶] 每天默认3次，不建议新手去，本服扎昆太变态！！\r\n"+yun4+"#v3010313##v3010127##v3010865##v2213049#星星 高级神奇魔方（必出）\r\n各种制作材料\r\n\r\n#d- 管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 9) {
				typed = 9;
				cm.sendYesNo("#r#e[普通/进阶] 每天默认4次，普通/进阶各两次。\r\n"+yun4+"\r\n\r\n#v2213050##v2210082##v3010546##v3010128# 星星 高级神奇魔方（必出）\r\n各种制作材料\r\n\r\n#d- 管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 10) {
				typed = 10;
				cm.sendYesNo("#e#r[普通/混沌] 1线为普通品克缤(默认每日2次)，2线为混沌品克缤(默认每日2次)\r\n"+yun4+"\r\n#v3010185##v3010073##v3010543##v1052198# 各种制作材料.各种卷轴.135武器\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 11) {
				typed =11;
				cm.sendYesNo("#e#r[普通/进阶] 森兰丸\r\b"+yun4+"#v1232072#武器系列，#v1003601#防具系列，#v1302152#系列，#v2049005##v2049000##v2049600##v2049137##v5062024#\r\n\r\n#d- 管理提示：#b#n点是进入地图。点否返回上一页.#k");
			} else if (selection == 12) {
				typed = 12;
				cm.sendYesNo("#e#r[普通] 次元缝隙-阿卡伊勒祭坛(默认每日2次)\r\n"+yun4+"\r\n魔方，卷轴 各种制作材料. \r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 13) {
				typed = 13;
				cm.sendYesNo("#e#r[普通] 妖精女王-艾菲尼娅(默认每日2次)\r\n"+yun4+"\r\n135装备，技能书，材料，高经验\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 14) {
				typed = 14;
				cm.sendYesNo("#r#e[简单/进阶]钻机，每天默认2次\r\n\r\n外星人金币,钻机椅子，技能书.#d#n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 15) {
				typed = 15;
				cm.sendYesNo("#e#r[普通/进阶] 鲁塔比斯 - 四大天王BOSS(默认每日23次)\r\n"+yun4+"\r\n 4大天王帽子#v1212072#130系列#v1312065#140系列，#v1003797#150防具系列，卷轴，技能书....\r\n\r\n#e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 16) {
				typed = 16;
				cm.sendYesNo("#e#r[班·雷昂] 狮子王之城 - 接见室走廊\r\n"+yun4+"\r\n椅子、材料 经验、药水\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 17) {
				typed = 17;
				cm.sendYesNo("#r#e[普通/进阶]希拉，每天默认2次\r\n"+yun4+"#v1032205##v1032206##v1032207##v1032208##v1032209##v1032219##v5062000##v5062002##v5062009##v2049600#,140武器些列，150防具系列，药水，卷轴.#k");
			} else if (selection == 18) {
				typed = 18;
				cm.dispose();
				cm.openNpc(9310362, 15);
			} else if (selection == 19) {
				typed = 19;
				cm.dispose();
				cm.openNpc(9310022, 0);
			} else if (selection == 20) {
				typed = 20;
				cm.dispose();
				cm.openNpc(9900005, 5);
			} else if (selection == 21) {
				typed = 21;
				cm.sendYesNo();
			} else if (selection == 22) {
				typed = 22;
				cm.sendYesNo();
			} else if (selection == 23) {
				typed = 23;
				cm.warp(105100100);
			} else if (selection == 24) {
				typed = 24;
				cm.sendYesNo("#e#r[噩梦的牢笼] 心树守护者之地 - 贝勒德入口(1X进入)(默认每日2次)\r\n"+yun4+"\r\n#v3010698##v3010699#贝勒首饰  黄金枫叶   150防具  #v2431926#150防具箱子\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 25) {
				typed = 25;
				cm.sendYesNo("#e#r[噩梦的牢笼] 暴君城堡战场 - 暴君麦格纳斯(New~)(默认每日3次)\r\n"+yun4+"\r\n#v1112793##v3015014##v1102224##v1052852##v1004300##v1004140##v1004141##v1004142##v1004143##v1004144##v1004145##v1004146##v1004147##v1004148##v2512261# 漩涡装备.无损强化卷.黄金枫叶.自选发型盒子.暴君防具  150防具  #v2432397#漩涡武器自选箱子  #v2432069#暴君自选防具\r\n\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 26) {
				typed = 26;
				cm.sendYesNo("#e#r[斯乌的来袭] \r\n"+yun4+"\r\n#r暴君套装,天照套装,埃苏莱布斯套装,贝勒德首饰,稀有椅子,极品卷轴..等等\r\n#b进入条件：20个BOSS币#v4310143##v4310143#\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			} else if (selection == 27) {
				typed = 27;
				cm.sendYesNo("#e#r[霸王乌鲁斯] \r\n"+yun4+"\r\n#r稀有椅子,极品卷轴..等等\r\n#b进入条件：50个BOSS币#v4310143##v4310143#\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
			}
		} else if (status == 2) {
			  if(typed == 0) {
				cm.dispose();
                cm.openNpc(9900003, 108);
			} else if(typed == 1) {
                cm.dispose();
                cm.warp(910002000);
			} else if (typed == 2) {
				cm.dispose();
				cm.warp(925020000);
			} else if (typed == 3) {
				cm.dispose();
				cm.warp(951000000);
			} else if (typed == 4) {
				cm.dispose();
				cm.openNpc(9900004, 3);
			} else if (typed == 5) {
				cm.dispose();
				cm.warp(220080000);
			} else if (typed == 6) {
				cm.dispose();
				cm.warp();
			} else if (typed == 7) {
				cm.dispose();
				cm.warp(271040000);
			} else if (typed == 8) {
				cm.dispose();
				cm.warp(211042200);
			} else if (typed == 9) {
				cm.dispose();
				cm.warp(240040700);
			} else if (typed == 10) {
				cm.dispose();
				cm.warp(270050000);
			} else if (typed == 11) {
				cm.dispose();
				cm.warp();
			} else if (typed == 12) {
				cm.dispose(272030300);
				cm.warp();
			} else if (typed == 13) {
				cm.dispose();
				cm.warp(300030300);
			} else if (typed == 14) {
				cm.dispose();
				cm.openNpc(9900005, 3);
			} else if (typed == 15) {
				cm.dispose();
				cm.warp(105200000);
			} else if (typed == 16) {
				cm.dispose();
				cm.warp();
			} else if (typed == 17) {
				cm.dispose();
				cm.warp();
			} else if (typed == 18) {
				cm.dispose();
				cm.openNpc();
			} else if (typed == 18) {
				cm.dispose();
				cm.openNpc();
			} else if (typed == 19) {
				cm.dispose();
				cm.openNpc();
			} else if (typed == 20) {
				cm.dispose();
				cm.openNpc();
			} else if (typed == 21) {
				cm.dispose();
				cm.openNpc();
			} else if (typed == 22) {
				cm.dispose();
				cm.warp();
			} else if (typed == 23) {
				cm.warp(1061014);
				cm.warp();
			} else if (typed == 24) {
				cm.dispose();
				cm.warp();
			} else if (typed == 25) {
				cm.dispose();
				cm.warp();
			} else if (typed == 26) {
				if (cm.haveItem(4310143, 20)) {
					cm.gainItem(4310143, -20);
					cm.warp(350050000);
					cm.dispose();
				} else {
			        cm.sendOk("#e#dBOSS币不够哦,请自备20个BOSS币#v4310143#");
			        cm.dispose();
				  }
				cm.dispose();
			} else if (typed == 27) {
				if (cm.haveItem(4310143, 50)) {
					cm.gainItem(4310143, -50);
					cm.warp(970072200);
				    cm.dispose();
				} else {
				    cm.sendOk("#e#dBOSS币不够哦,请自备50个BOSS币#v4310143#");
					cm.dispose();
				  }	
			}
		}
	}
}