var names = Array("Kerning Square Lobby", "F1/F2: Bubble Tea Shop", "F3/F4: Doll Shop", "F5/F6: Costume & Perfume Shop", "F7/F8: Music Shop & VIP Zone", "Exit Kerning Square");
var mid = Array("103040000", "103040100", "103040200", "103040300", "103040400", "103020020");

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
        else
            status--;
        if (status == 0) {                
            text = "You can take the elevator to get around quick. Select a destination.\r\n"; 
            for (var i = 0; i < names.length; text += "#L"+i+"##b"+names[i]+"#k\r\n#l", i++); 
            cm.sendSimple(text);
        } else if (status == 1) {
            cm.sendNext("Moving to "+names[selection]+". Press Escape to cancel.");
            map = mid[selection];
        } else if (status == 2) {
            cm.warp(map, "enter00");
            cm.dispose();
        }
    }
}  