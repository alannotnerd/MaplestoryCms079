
importPackage(Packages.client.inventory);



var status = 0;
var typede = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            if (cm.getPlayer().getLevel() >= 1) {
			
                var menu = "#L1##l\r\n";
                menu += "   #fUI/UIWindow2.img/StagedGachapon/Creature/0/normal/2#   #fUI/UIWindow2.img/Megaphone/0# 亲爱的#r" + cm.getChar().getName() + "#k你好,#fUI/UIWindow2.img/Megaphone/0#   #fUI/UIWindow2.img/StagedGachapon/Creature/0/normal/2#\r\n以下是你在#b"+cm.getServerName()+" #k的个人情况\r\n\r\n";
                menu += "#b  今天在线：#r"+cm.getGamePoints()+" 分钟  #k\r\n";
				menu += "#b   VIP等级：#r" + cm.getVip() + "#k #b\r\n";
				menu += "#b VIP成长值：#r" + cm.getVipczz() + "#k #b\r\n";
				menu += "#b    活跃度：#r" + cm.getActivity() + "#k #b\r\n";
				menu += "#b     点卷 ：#r" + cm.getChar().getCSPoints(1) + "#k #b\r\n";
				menu += "#b    抵用卷：#r" + cm.getChar().getCSPoints(2) + "#k #b\r\n";
				menu += "#b    娜娜币：#r" + cm.getHyPay(1) + "#k #b\r\n";
				menu += "#b    股票币：#r" + cm.getClubMoney() + "#k #b\r\n";
				menu += "#b    修为点：#r" + cm.getChar().getXw() + "#k #b\r\n";
				menu += "#b    已签到：#r" + cm.getBossLog("总计签到", 1) +"#k #b\r\n";
				menu += "#b已领取福利：#r" + cm.getBossLog("总计福利", 1) + "#k #b\r\n";
				
				
				//NPC图片ID,时间(毫秒),"内容" 
				cm.sendYellowMessage(1540490, 10000, "欢迎来到[冰淇淋冒险岛],实力团队运营,独特的新玩法,有什么我能帮到你吗?");
                cm.sendSimple(menu);
            } else {
                cm.dispose();
            }
        } else if (selection == 1) { //传送自由市场
            cm.dispose();
        }
    }
}

