var aaa ="#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun ="#fUI/UIWindow/Megaphone/2#";////红沙漏
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun4 ="#fUI/UIWindow/Quest/reward#";////奖励
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹带
var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////红色圆
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var p1 = "#fUI/StatusBar2.img/starPlanet/achive/1#";

var status = 0;
var typed=0;
var rmb = 0;

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
                        var selStr = "                #v3994060##v3994073##v3994077##v3994077#\r\n";
           //selStr +="\r\n#L1##b"+aaa+" 晋级到#r#e#z1142310##d#n[详情点击查看]#l#k\r\n";
			selStr +="#e#L1##r"+p1+"特色副本#l#L2##r"+p1+"组队副本#l#L4##r"+p1+"武陵通天塔#l";
			selStr +="\r\n#L3#"+p1+"怪物公园#l#L5##r"+p1+"重置副本次数#l#k\r\n\r\n";
			//selStr +=""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+"#k#k\r\n";
			//selStr +="#L5##b"+p1+" 晋级到#r#e#z1142314##d#n[全属性+20]#l#k\r\n";
			selStr +="#L6##d"+p1+"闹钟王#l#L7##d"+p1+"暴力熊#l#L15##d"+p1+"骑士团女皇#l\r\n";
			selStr +="#L9##k#e"+p1+"[简单/进阶]扎昆#l  #L10##k#e"+p1+"[普通/进阶]黑龙#l\r\n";
			selStr +="#L11##k#e"+p1+"[普通/混沌]品克缤#l#L12##k#e"+p1+"[OX]问答#l\r\n";
			//#L12##k#e"+p1+"[世界BOSS]千年树精#l
			//selStr +="#r#e-以下4个勋章能够获得#k每日特权#n\r\n";
			//#L13##d#e"+p1+"阿卡伊勒#l
			selStr +="#L14##d#e"+p1+"艾菲尼娅#l#L8##d#e"+p1+"钻机BOSS#l\r\n";
			selStr +="#L16##d#e"+p1+"四大天王#l#L17##d#e"+p1+"狮子王城#l\r\n";
			selStr +="#L20##r"+p1+"【新】#b[守卫金猪] #l#L21##r"+p1+"【新】#b[迷幻之域] #l#k\r\n";
			selStr +="#L209##r"+p1+"【新】#b[金币副本] #l#k\r\n";
			selStr +="#L216##r"+p1+"【新】#b[卧虎藏龙副本]#l\r\n";
			selStr +="#L210##r"+p1+"[宝岛英雄]深海妖兽闯入岛屿,快去拯救岛民New~#l#k\r\n";
			selStr +="#L23##r"+p1+"[斯乌来袭]前方高能，黑暗力量越来越明显了New~#l#k\r\n";
			selStr +="#L18##r"+p1+"[噩梦的牢笼]心树守护者之地-贝勒德入口(New~)#l\r\n#L19##r"+p1+"[噩梦的牢笼]暴君城堡战场-暴君麦格纳斯(New~)#l#k\r\n";
			selStr +="#L1000##r"+p1+"[132新BOSS [霸王乌鲁斯]]最大骨骼动画，去挑战吧!New~#l#k\r\n";
			selStr +="\r\n\r\n#e#g================更多副本更新中=================\r\n\r\n";
			//selStr +=""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+""+tz13+""+tz14+""+tz12+"#k\r\n";
			//selStr +="#L12##b"+p1+" 晋级到#r#e#z1142321##d#n[全属性+100#l#k\r\n";
			//selStr +="#L13##b"+aaa+" 晋级到#r#e#z1142310##d#n[全属性+]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("#e#r大量的奖励副本,每日必做,不同的玩法,不同的体验.#k\r\n\r\n- #e#d管理提示：#n#b点是进行查看。点否返回上一页.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("#e#d组队任务有每日一次的,也有无限制的哦!可以获得每日礼物箱子,箱子里有大量的好东西,#r平民好选!.#k\r\n\r\n- #e#d管理提示：#n#b点是进行查看。点否返回上一页.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("#d#e160级可以进入副本,需要门票#v4001522#,每天最多10次\r\n#r门票获得途径:\r\n#b1.在线120分钟可获得1张\r\n2.可以通过匠人街挖矿挖草获得材料进行兑换\r\nP:兑换门票和奖励的在公园地图内左边吉普车NPC\r\n#r(最少2个人组队,只扣除队长门票)#k\r\n\r\n- #e#d管理提示：#n#b点是则进入怪物公园地图。点否返回上一页.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("#e#r单人进入,每天免费2次,超级神奇魔方.\r\n可以获得#v1113070##v1402014##v1402037##v5530457##v5530458##v2046996##v2046997##v2047818#\r\n升级圣地#k\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");	
                        } else if (selection == 5) {
				typed=5;
				cm.sendYesNo("#r#e可以使用道具重置部分副本次数\r\n#b理财礼包可以重置更多的副本进入次数哦#k\r\n\r\n- #e#d管理提示：#n#b点是查看。点否返回上一页.#k");
                        } else if (selection == 6) {
				typed=6;
				cm.sendYesNo("#r#e练级\r\n技能书\r\n无限次数，需要材料\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 7) {
				typed=7;
				cm.sendYesNo("#r#e制作装备材料\r\n\r\n#k\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 8) {
				typed=8;
				cm.sendYesNo("#e#r1线，一小时刷新一次,外星人金币,技能书.#k\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("#e#r[简单/进阶] 2,4线为普通扎昆(默认每日4次)，3线为进阶扎昆(默认每日3次)\r\n"+yun4+"\r\n#v3010313##v3010127##v3010865##v2213049# 星星 高级神奇魔方（必出） 各种制作材料\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 10) {
				typed=10;
				cm.sendYesNo("#e#r[普通/进阶] 3线为进阶黑龙(默认每日3次)，2和4线为普通黑龙(默认每日4次)\r\n"+yun4+"\r\n#v2213050##v2210082##v3010436##v3010128# 星星 高级神奇魔方（必出）  各种制作材料\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 11) {
				typed=11;
				cm.sendYesNo("#e#r[普通/混沌] 1线为普通品克缤(默认每日2次)，2线为混沌品克缤(默认每日2次)\r\n"+yun4+"\r\n#v3010185##v3010073##v3010543##v1052198# 各种制作材料.各种卷轴.135武器\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 12) {
				typed=12;
				cm.sendYesNo("#e#r[OX] OX宾果活动\r\n"+yun4+"\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 13) {
				typed=13;
				cm.sendYesNo("#e#r[普通] 次元缝隙-阿卡伊勒祭坛(默认每日3次)\r\n"+yun4+"\r\n魔方，卷轴 各种制作材料. \r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
                        } else if (selection == 14) {
				typed=14;
				cm.sendYesNo("#e#r[普通] 妖精女王-艾菲尼娅(默认每日3次)\r\n"+yun4+"\r\n高经验\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 15) {
				typed=15;
				cm.sendYesNo("#e#r[骑士团] 女皇 - 希纳斯的庭院(默认每日2次)\r\n"+yun4+"\r\n140装备....\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 16) {
				typed=16;
				cm.sendYesNo("#e#r[巨大树根] 鲁塔比斯 - 四大天王BOSS(默认每日2把钥匙)\r\n"+yun4+"\r\n 4大天王帽子  130装备  技能书....\r\n\r\n#e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 17) {
				typed=17;
				cm.sendYesNo("#e#r[班·雷昂] 狮子王之城 - 接见室走廊\r\n"+yun4+"\r\n材料 经验\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 18) {
				typed=18;
				cm.sendYesNo("#e#r[噩梦的牢笼] 心树守护者之地 - 贝勒德入口(1X进入)(默认每日2次)\r\n"+yun4+"\r\n#v3010698##v3010699#贝勒首饰  黄金枫叶   150防具  #v2431926#150防具箱子\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 19) {
				typed=19;
				cm.sendYesNo("#e#r[噩梦的牢笼] 暴君城堡战场 - 暴君麦格纳斯(New~)(默认每日3次)\r\n"+yun4+"\r\n#v1112793##v3015014##v1102224##v1052852##v1004300##v1004140##v1004141##v1004142##v1004143##v1004144##v1004145##v1004146##v1004147##v1004148##v2512261# 漩涡装备.无损强化卷.黄金枫叶.自选发型盒子.暴君防具  150防具  #v2432397#漩涡武器自选箱子  #v2432069#暴君自选防具\r\n\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 20) {
				typed=20;
				cm.sendYesNo("#e#r[保护金猪] 看说明请点击下一步\r\n"+yun4+"\r\n魔方，每日礼物箱子,点卷，抵用卷\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 21) {
				typed=21;
				cm.sendYesNo("#e#r[迷幻之域] 请提前到好足够的#v4000019##v4000016##v4000000#(约200个)\r\n"+yun4+"\r\n#v4001839##v5062002##v5062500##v5064000##v2430069##v3800747##v2430781##v2340000#\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 22) {
				typed=22;
				cm.sendYesNo("#e#r[简单/进阶] 2线为普通扎昆，3线为进阶扎昆\r\n\r\n\r\n\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 23) {
				typed=23;
				cm.sendYesNo("#e#r[斯乌的来袭] \r\n"+yun4+"\r\n#r暴君套装,天照套装,埃苏莱布斯套装,贝勒德首饰,稀有椅子,极品卷轴..等等\r\n#b进入条件：20个BOSS币#v4310143##v4310143#\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 1000) {
				typed=1000;
				cm.sendYesNo("#e#r[霸王乌鲁斯] \r\n"+yun4+"\r\n#r稀有椅子,极品卷轴..等等\r\n#b进入条件：50个BOSS币#v4310143##v4310143#\r\n- #e#d管理提示：#n#b点是进入地图。点否返回上一页.#k");
				} else if (selection == 216) {
				typed=216;
                                cm.dispose();
                                cm.openNpc(9900005, 5);
				} else if (selection == 207) {
				typed=207;
                                cm.dispose();
                                cm.openNpc(9220059, 0);
				} else if (selection == 208) {
				typed=208;
                                cm.dispose();
                                cm.openNpc(9310383, 0);
				} else if (selection == 209) {
				typed=209;
                                cm.dispose();
                                cm.openNpc(9310022, 0);
				} else if (selection == 210) {
				typed=210;
                                cm.dispose();
                                cm.warp(865000999);
			}
		} else if (status == 2) {
			if(typed==1){
				cm.dispose();
            cm.openNpc(9900003, 108);
			} else if(typed==2){
                cm.dispose();
            cm.openNpc(9310144, 6);
			} else if(typed==3){
                cm.dispose();
            cm.warp(951000000);
			} else if(typed==4){
                cm.dispose();
            cm.warp(925020000);
			} else if(typed==5){
                 cm.dispose();
            cm.openNpc(9900004, 3);
			} else if(typed==6){
                cm.dispose();
            cm.warp(220080000);
			} else if(typed==7){
                cm.dispose();
            cm.warp(551030100);
			} else if(typed==8){
                cm.dispose();
				cm.openNpc(9900005, 3);
            //cm.warp(703020109);
			} else if(typed==9){
                cm.dispose();
            cm.warp(211042200);
			} else if(typed==10){
                cm.dispose();
            cm.warp(240040700);
			} else if(typed==11){
                cm.dispose();
            cm.warp(270050000);
			} else if(typed==12){
                cm.dispose();
            cm.warp(910048100);
			//cm.openNpc(9000277);
			} else if(typed==13){
                cm.dispose();
            cm.warp(272030300);
			} else if(typed==14){
                cm.dispose();
            cm.warp(300030300);
			} else if(typed==15){
                cm.dispose();
            cm.warp(271040000);
			} else if(typed==16){
                cm.dispose();
            cm.warp(105200000);
			} else if(typed==17){
                cm.dispose();
            cm.warp(211070000);
			} else if(typed==18){
                cm.dispose();
            cm.warp(863000100);
			} else if(typed==19){
                cm.dispose();
            cm.warp(401060000);
			} else if(typed==20){
                cm.dispose();
            cm.openNpc(9300006, 1);
			} else if(typed==216){
                cm.dispose();
            cm.openNpc(9310461, 0);
			} else if(typed==207){
                cm.dispose();
            cm.openNpc(9220059, 0);
			} else if(typed==21){
                cm.dispose();
            cm.openNpc(9070010, 1);
			} else if(typed==22){
                cm.dispose();
            cm.warp(272030300);
			} else if(typed==23){
                if (cm.haveItem(4310143, 20)) {
			cm.gainItem(4310143, -20);
                                cm.warp(350050000);
			//cm.sendOk("恭喜您合成法弗纳双风翼弩一把.");
			//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<普通服务员>处晋级了法弗纳双风翼弩.");
			cm.dispose();
                } else {
			cm.sendOk("#e#dBOSS币不够哦,请自备20个BOSS币#v4310143#");
			cm.dispose();
				}
                        } else if(typed==1000){
                if (cm.haveItem(4310143, 50)) {
			cm.gainItem(4310143, -50);
                                cm.warp(970072200);
			cm.dispose();
                } else {
			cm.sendOk("#e#dBOSS币不够哦,请自备50个BOSS币#v4310143#");
			cm.dispose();
				}
                        } else if(typed==24){
                if (cm.haveItem(4310143, 10)) {
			cm.gainItem(4310143, -10);
                                cm.warp(401072000);
			//cm.sendOk("恭喜您合成法弗纳双风翼弩一把.");
			//cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<普通服务员>处晋级了法弗纳双风翼弩.");
			cm.dispose();
                } else {
			cm.sendOk("#e#dBOSS币不够哦,请自备10个BOSS币#v4310143#");
			cm.dispose();
				}
           }
      }
	  }
	  }