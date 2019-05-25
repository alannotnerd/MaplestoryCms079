var status = 0; 
function start() {  
    status = -1;
    action(1, 0, 0);  
}  

function action(mode, type, selection) {   
    if (mode == -1) {  
        cm.dispose();  
    }  
    else {   
        if (mode == 0) {      
            cm.dispose();   
            return;   
        }
        if (mode == 1) {
            status++;  
        }      
        else {  
            status--;  
        }  
        if (status == 0) {		
			if(cm.countMonster()>0){       			
				cm.sendYesNo("您就这样出去,我会帮您把PB杀死的!你确定要出去吗？");						
			}else{
				cm.sendYesNo("您已成功打败了PB,现在就要出去吗？");						
			}
		
        } else if (status == 1) {
			
				
					cm.getC().getChannelServer().getMapFactory().getMap(270050100).clearMapTimer();
					cm.getC().getChannelServer().getMapFactory().getMap(270050100).killAllMonsters(); 
					
				
				cm.warp(270050300, 0);			
				cm.dispose();
        }
    }
}