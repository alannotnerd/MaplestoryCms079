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
            cm.sendOk("����������");
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
            cm.sendSimple("��ӭ��������ð�յ�\r\n��������г��һ�����˶�����������������һ�����Ŷ������\r\n\r\n#L1##b��Ҫ�һ���Ʒ#l\r\n\r\n");
        } else if (status == 1) {
            if (selection == 1) {//��������
             cm.openNpc(2000,2);  
            } else if (selection == 2) {
             cm.openNpc(2000,23);   
//        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"[��������]" + " : " + " [" + cm.getPlayer().getName() + "]��С�鿪ʼ�˵�����ս����" + cm.getC().getChannel() + "Ƶ��",true).getBytes()); 
                                            
        }	
        }
    }
}


