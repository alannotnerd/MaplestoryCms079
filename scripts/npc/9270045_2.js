
function start() { 
 status = -1; 
 action(1, 0, 0); 
} 
function action(mode, type, selection) { 
 if (mode == -1 || mode == 0) { 
  cm.dispose(); 
  return; 
 } else { 
  if (mode == 1) 
   status++; 
  else 
   status--; 
  if (status == 0) { 
   cm.sendYesNo("ȷ��Ҫ�뿪��?"); 
  } 
  else if(status == 1) { 
   cm.warp(541020700); 
   cm.dispose(); 
  } 
 } 
} 
