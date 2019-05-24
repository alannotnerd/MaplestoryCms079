var status = -1;

function action(mode, type, selection) {
    if (cm.getMapId() == 926110600) {
        cm.removeAll(4001130);
        cm.removeAll(4001131);
        cm.removeAll(4001132);
        cm.removeAll(4001133);
        cm.removeAll(4001134);
        cm.removeAll(4001135);
        var em = cm.getEventManager("Juliet");
        if (em != null) {
            var itemid = 4001159;
            if (!cm.canHold(itemid, 1)) {
                cm.sendOk("Please clear 1 ETC slot.");
                cm.dispose();
                return;
            }
            cm.gainItem(itemid, 1);
            if (em.getProperty("stage").equals("2")) {
               // cm.gainNX(150);
            } else {
               // cm.gainNX(100);
            }
            cm.givePartyExp(1000);
        }
       // cm.addTrait("will", 25);
       // cm.addTrait("sense", 1);
        cm.getPlayer().endPartyQuest(1205);
        cm.warp(926110700);
        cm.dispose();
        return;
    }
    if (mode > 0) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.removeAll(4001130);
        cm.removeAll(4001131);
        cm.removeAll(4001132);
        cm.removeAll(4001133);
        cm.removeAll(4001134);
        cm.removeAll(4001135);
        cm.sendSimple("#b#L0#Get me out of here#l\r\n#L1#Get me Proof of Love.#l#k");
    } else {
        if (selection == 0) {
            cm.warp(926110600);
        } else if (selection == 1) { //TODO JUMP, 2112002 too
            if (cm.canHold(1122010, 1) && cm.haveItem(4001160, 10) && cm.haveItem(4001159, 10)) {
                cm.gainItem(1122010, 1);
                cm.gainItem(4001160, -10);
                cm.gainItem(4001159, -10);
            } else {
                cm.sendOk("You will need 10 Alcadno Marble and 10 Zenumist Marble to get Proof of Love, as well as have EQP space.");
            }
        }
        cm.dispose();
    }
}