/*
 * 
 * @wnms
 * @����̨���͸���npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var ð�ձ� = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("��л��Ĺ��٣�");
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
            cm.sendSimple("#r��ѡ����Ҫȥ�ĸ�����\r\n<���渱����������С���>\r\n\r\n#d#L0#���������������#l\r\n\r\n#L1##g���101�������#n#l\r\n\r\n#b#L2##r���Ů���������\r\n\r\n#L3#����ŷ��������\r\n\r\n#r#L4#���︱��\r\n\r\n#d#L6##b��������\r\n\r\n#L7##r糺츱��\r\n\r\n#L8#140�����㸱��");
        } else if (status == 1) {
            if (selection == 0) {//��������
             cm.openNpc(9020000,0);
            } else if (selection == 1) {//�����һ�����803000505
              cm.openNpc(2040034,0);
            }else if(selection == 2){
                cm.openNpc(2013000,0);
            } else if (selection == 3) {
		cm.openNpc(2112004,0);
            } else if (selection == 4) {
                cm.openNpc(2133000,0); 
                cm.gainItem(4001226,1)            
            }else if(selection == 7){
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("����ͼ���Ƶȼ�120������������û���ʸ���ս糺츱��");
                cm.dispose();
              }else{
			cm.warp(803001200);  
				cm.dispose();
                return;
	      } 
            }else if(selection == 8){
            if (cm.getLevel() < 140 ) {  
            cm.sendOk("����ͼ���Ƶȼ�140������������û���ʸ���ս���㸱��");
                cm.dispose();
              }else{
			cm.warp(803000505);  
                cm.dispose();
                return;
	      } 
            } else if (selection == 6) {
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("����ͼ���Ƶȼ�120������������û���ʸ���ս��������");
                cm.dispose();
              }else{
			cm.warp(240020501);  
                cm.dispose();
                return;
	      } 
            } else if (selection == 5) {
                cm.openNpc(2094000,0); 
            }
        }
    }
}


