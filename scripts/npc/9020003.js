importPackage(java.lang);

var status = 0;
var minLevel = 50; // GMS = 50 
var maxLevel = 250; // GMS = 200? recommended 50 - 69
var minPlayers = 1; // GMS = 3
var maxPlayers = 6; // GMS = 4 || but 6 makes it better :p
var open = true; //open or not
var PQ = 'KentaPQ';

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("Ask your friends to join your party. You can use the Party Search funtion (hotkey O) to find a party anywhere, anytime.");
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
    if (cm.getPlayer().getMapId() != 910002000) { // not in pq lobby
        cm.sendSimple("你真的想离开这里么?#b\r\n#L0#是的! 让我离开这里.#l");
    } else if (cm.getPlayer().getMapId() == 220000306 || cm.getPlayer().getMapId() == 910002000) {
        cm.sendSimple("#e <组队任务: 陷入危险的坎特>#n \r\n噢, 可怜的坎特! 你必须帮助他.他听说海里有奇怪的动静，然后去检查了，到现在还没有回来, 我们现在很担心，必须要找到他。你能帮助我们吗？ #b\r\n#L1#我将会去寻找坎特.#l\r\n#L3#我想兑换坎特的潜水镜#l\r\n#L2#跟我说说任务详情?#l\r\n#L5#我还能进入多少次?#l#k");
    } else {
        cm.dispose();
    }
} else if (status == 1) {
    if (selection == 0) {
        cm.saveLocation("MULUNG_TC");
        cm.warp(910002000,0);
        cm.dispose();
    } else if (selection == 1) {
     if (cm.getParty() == null) { // No Party
        cm.sendYesNo("你没有创建组队,无法入场。");
    } else if (!cm.isLeader()) { // Not Party Leader
        cm.sendOk("请你们团队的队长和我对话。");
        cm.dispose();
    } else if (cm.getPQLog(PQ) >= 10){
        cm.sendOk("sorry... you've tryed 10 times today alreddy..");
        cm.dispose();
    } else if (!cm.allMembersHere()) {
        cm.sendOk("你的组队部分成员不在当前地图,请召集他们过来后在尝试。");
        cm.dispose();
    } else {
    // Check if all party members are over lvl 50
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
            cm.sendOk("You need to be between level " + minLevel + " and " + maxLevel + " to take on this epic challenge!");
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
        var em = cm.getEventManager("Kenta");
        if (em == null || open == false) {
            cm.sendSimple("This PQ is not currently available.");
            cm.dispose();
        } else {
            var prop = em.getProperty("state");
            if (prop == null || prop.equals("0")) {
		cm.setPQLog(PQ);
                em.startInstance(cm.getParty(),cm.getMap(), 70);
            } else {
                cm.sendSimple("已经有队伍在进行了,请换其他频道尝试。");
            }
            cm.removeAll(4001453);
            cm.dispose();
        } 
    } else {
        cm.sendYesNo("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 " + minLevel + " 以上 " + maxLevel + " 以下才可以入场。");
    } 
}
} else if (selection == 2) {
    cm.sendNext("Kenta was researching sea creatures through samples he got from Explorers, but that was only effective for a while. When his research needed to go further, he decided to go into the Dangerous Sea Areas to conduct direct research. I haven't heard from him since he left... he must be in trouble.#b\r\n#L12#Go on.#l#k");
        } else if (selection == 3) {
            cm.sendNext("Oh, so you want #v1022123:# kenta's Goggles, do you? Kenta's Goggles is a gift for people who have helped with sea life research. If you bring about #b 100 Pianus Scales#k for research, I will give you the gift. You can obtain a Pianus Scale from eliminating Pianus. If 100 Pianus Scales are to much for you, then just bring #b 10 Pianus Scales#k to get a Pet Equipment Scroll. Good luck!");
         } else if (selection == 4) {
        } else if (selection == 5) {
            var pqtry = 10 - cm.getPQLog(PQ);
            cm.sendOk("You can do this quest " + pqtry + " time(s) today.");
            cm.dispose();
        }
    }else if (status == 2) {
       if (selection == 12) {
        cm.sendNextPrev("Please find Kenta, and be careful! The area is very dangerous.\r\nHere's what you can expect:\r\n \r\n1. Eliminate any enraged sea creatures on your way to find Kenta.\r\n2. Kenta has been gone for a long time, so he might not have enough air. Obtain some Air Bubbles for him.\r\n3. When you find Kenta, protect him from the enraged sea creatures.\r\n4. Lastly, if Kenta insist on finishing his research, help him do it and return safely.");
        cm.dispose();
    }else{
        cm.sendSimple("Would you like to use Pianus Scales for Kenta's Research?\r\n#b#L10#10 Pianus Scales - Pet related Scrolls#l\r\n#L11#100 Pianus Scales - #v1022123:# Kenta's Goggles#l#k");
    }
   }
   else if (status == 3) { 
       if (selection == 10) {
        if (!cm.canHold(1032100,1)) {
            cm.sendOk("Please make some room for the scroll.");
        }else if (cm.haveItem(4001535,10)) {
            cm.gainItem(2048030, 1);//random pet scroll? //dex atm
            cm.gainItem(4001535, -10);
            cm.sendOk("Thank you so much. Enjoy");
            cm.dispose();
        }else{
            cm.sendOk("Check to see if you really have Pianus Scales.");
            cm.dispose();
        }  
    } else if (selection == 11) {
        if (!cm.canHold(1072510,1)) {
            cm.sendOk("Please make some room in your EQUIP for these Googles.");
        }else if (cm.haveItem(4001535,100)) {
            cm.gainItem(1022123, 1);//Googles
            cm.gainItem(4001535, -100);
            cm.sendOk("Thank you so much. Enjoy");
            cm.dispose();
        }else{
            cm.sendOk("Check to see if you really have Pianus Scales.");
            cm.dispose();
        }
    }else{
      cm.sendOk("error?");
      cm.dispose();  
  }
}       else if (mode == 0) { 
    cm.dispose();
} 
}