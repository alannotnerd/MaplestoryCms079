/**
 *2013002.js - Minevra the Goddess
 *@author Jvlaple
 */
var status = 0;
var itemArray = Array(2000004, 2000005, 2000006, 2002020, 2002021, 2002022, 2002023, 2002024, 2002025, 2002026, 2001000, 2001002, 2002015, 2050005, 2022179, 2020014, 2020015 /*End of Pots*/, 2100000, 2100001, 2100002, 2100003, 2100004, 2100005, /*End of Sacks*/
    2061003, 2060003, 2060004, 2061004 /*End of Arrows*/, 2070006, 2070005, 2070007, 2070004 /*End of Stars*/, 2210000, 2210001, 2210002 /*End of Morph items*/ );
					
var itemQuan = Array(50, 20, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 5, 30, 2, 100, 50, 1, 1, 1, 1, 1, 1, 2000, 2000, 2000, 2000, 1, 1, 1, 1, 5, 5, 5);

var PQItems = new Array(4001022, 4001023);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (cm.getPlayer().getMapId() == 920010100) { //Center tower
            if (status == 0)
                cm.sendNext("Thank you for not only restoring the statue, but rescuing me, Minerva, from the entrapment. May the blessing of the goddess be with you till the end...");
            else if (status == 1) {
                var eim = cm.getPlayer().getEventInstance();
                eim.finishPQ();
                cm.dispose();
            }
        } else if (cm.getPlayer().getMapId() == 920011300) {
            if (status == 0) 
                cm.sendNext("Thank you for not only restoring the statue, but rescuing me, Minerva, from the entrapment. May the blessing of the goddess be with you till the end...");
            else if (status == 1) {
                for (var i = 0; i < PQItems.length; i++) 
                    cm.removeAll(PQItems[i]); // Remove All PQ Items :D
                var randmm = Math.floor(Math.random() * itemArray.length);
                cm.gainItem(itemArray[randmm], itemQuan[randmm]);
                cm.warp(200080101, 0);
                cm.dispose();
            }
        }
    }
}
				