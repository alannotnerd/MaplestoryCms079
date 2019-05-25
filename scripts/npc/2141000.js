var status = 0; 
var selectedMap = -1; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 
    
function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("等待勇士的挑战！"); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("是来挑战PB的么？"); 
        } else if (status == 1) { 
                var x = -222;
                var y = -42;
                cm.spawnNPC(x, y, 2141000, 270050100);
                cm.removeNPC(0, 0, 2141000, 4001193); //1193
                cm.warp(270050100,0);
                cm.dispose();
        }
        } 
} 