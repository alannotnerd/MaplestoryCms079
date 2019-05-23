/*
-- Odin JavaScript --------------------------------------------------------------------------------
	Camel Cab - Magatia (GMS Like)
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Shortened by Moogra
	1.0 - First Version by Maple4U
---------------------------------------------------------------------------------------------------
*/

var price = 1500;
var map = 260000000;

function start() {
    if (cm.getPlayer().getMapId() == 260020000)
        cm.sendYesNo("Will you move to #bMagatia#k now? The price is #b1500 mesos.#k");
    else
        cm.sendYesNo("Will you move to #bAriant#k now? The price is #b1500 mesos.#k");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendNext("Hmmm... too busy to do it right now? If you feel like doing it, though, come back and find me.");
            cm.dispose();
            return;
        } else {
            if (cm.getMeso() < price) {
                cm.sendNext("I am sorry, but I think you are short on mesos. I am afraid I can't let you ride this if you do not have enough money to do so. Please come back when you have enough money to use this.");
                cm.dispose();
            } else if (cm.getPlayer().getMapId() == map+20000) {
                if (cm.getMeso() >= price) {
                    cm.warp(map+3000000, 0);
                    cm.dispose();
                }
            } else if (cm.getPlayer().getMapId() == map+20700) {
                if (cm.getMeso() >= price) {
                    cm.warp(map, 0);
                    cm.dispose();
                }
            } else
                cm.dispose();
        }
    }
}