/*
 笔芯制作★风云工作室所有
 完成时间：2013年10月28日 16:34:19
 脚本功能：挑战首领
 */

var a = 0;
var selects;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var BossList = Array(
        Array("[普通] 帕普拉图斯！", 220080000),
        Array("[普通] 暴力熊/心疤狮王！", 551030100),
        Array("[简单/进阶] 2频道为普通扎昆/3频道为进阶扎昆！", 211042200),
        Array("[普通/进阶] 3频道为进阶黑龙王/2和4频道为普通黑龙王", 240040700),
        Array("[普通/混沌] 1频道为普通品克缤/2频道为混沌品克缤", 270050000),
        Array("[普通] 次元缝隙-阿卡伊勒祭坛", 272030000),
        Array("[普通] 妖精女王-艾菲尼娅", 300030300),
	Array("[骑士团] 女皇 - 希纳斯的庭院", 271040000),
        //Array("#r[泰坦级] 强化钻机,弱小勿进(New~)", 703020000),
        Array("#r[巨大树根] 鲁塔比斯 - 四大天王BOSS 。", 105200000),
        Array("[强化BOSS] 三头犬 - 血量非常多。", 510101100),
        Array("[世界BOSS] 新加坡 - 千年树精王遗迹Ⅱ", 541020800),
        Array("[班·雷昂] 狮子王之城 - 接见室走廊", 211070000),
        Array("#d[噩梦的牢笼] 心树守护者之地 - 贝勒德入口(New~)", 863000100),
        Array("[噩梦的牢笼] 暴君城堡战场 - 暴君麦格纳斯(New~)", 401072000)
        )

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
        } else if (a == 0) {
            var text = head + "为了更方便的游戏，在这里可以传送到BOSS的传送点。\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo(head + "你现在想出发到" + BossList[selects][0] + "吗？")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f