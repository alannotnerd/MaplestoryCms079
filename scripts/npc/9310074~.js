importPackage(net.sf.cherry.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("�����ܺ�Ŷ~~�����ı��뷨�ǵ���ʱ�����ҡ�ף����ˣ�");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("�ˣ����� #bתְ��#k �ҿ��԰��������תְŶ~~��");
        } else if (status == 1) {
              if(cm.getJob().getId() >= 1000 && cm.getJob().getId() <= 1510){
                  cm.sendNext("�ۣ�������ʿ�ŵ�һԱ���Һܸ���Ϊ�����Ŷ������");
                  status = 160;
                  return;
              }
//           if(cm.getJob().getId() >= 2000){
//              cm.sendNext("��~~ս��ս��������ְҵŶ~�Һܸ���Ϊ�����Ŷ������");
//              status = 163;
//              return;
//          }
            if (cm.getLevel() < 255 && cm.getJob().equals(net.sf.cherry.client.MapleJob.BEGINNER)) {
                if (cm.getLevel() < 8) {
                    cm.sendNext("�Բ���������Ҫ�ﵽ #b[8��]#k �Ҳ���Ϊ�����");
                    status = 98;
                } else if (cm.getLevel() < 10) {
                    cm.sendYesNo("������Ҫ����ħ��ʦ�ľ�����ȥ��ӡħ��������,#b����Ա#k ������ħ���Կ�,����Ӧ�þ���Ϲ�ȥ֧Ԯ��,�������������ְҵ��ǰ��������������ħ���ľ���,����һ�����ĵ�·,��ô�����Ϊ #bħ��ʦ#k ��");
                    status = 150;
                    
                } else {
                    cm.sendNext("��~~���ֿ���һ�����֣�\r\n��ϲ��ﵽ�� #r[10��]#k  ��ô����ѡ��� #b[��һְҵ]#k �ǣ�");
                    status = 153;
                }
            } else if (cm.getLevel() < 30) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[30��]#k ��ʱ��Ϳ��Խ���#b[�ڶ���תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THIEF)) {
                cm.sendSimple("��~�����ּ����ˣ���ϲ��ﵽ#r[30��]#k ����תְΪһ����\r\n#L0##b�̿�#l    #L1##b����#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WARRIOR)) {
                cm.sendSimple("��~�����ּ����ˣ���ϲ��ﵽ#r[30��]#k ����תְΪһ����\r\n#L2##b����#l    #L3##b��ʿ#l    #L4##bǹսʿ#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MAGICIAN)) {
                cm.sendSimple("��~�����ּ����ˣ���ϲ��ﵽ#r[30��]#k ����תְΪһ����\r\n#L5##b����#l    #L6##b��#l    #L7##b��ʦ#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BOWMAN)) {
                cm.sendSimple("��~�����ּ����ˣ���ϲ��ﵽ#r[30��]#k ����תְΪһ����\r\n#L8##b����#l    #L9##b����#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PIRATE)) {
                cm.sendSimple("��~�����ּ����ˣ���ϲ��ﵽ#r[30��]#k ����תְΪһ����\r\n#L10##bȭ��#l   #L11##bǹ��#l");

            } else if (cm.getLevel() < 70) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[70��]#k ��ʱ��Ϳ��Խ���#b[������תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BRAWLER)) {
                status = 93;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.GUNSLINGER)) {
                status = 96;
                cm.sendYesNo("��ϲ��ﵽ�� #r[70��]#k �����ھ�Ҫ��� #b[������תְ]#k ��");
            } else if (cm.getLevel() < 120) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[120��]#k ��ʱ��Ϳ��Խ���#b[���Ĵ�תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MARAUDER)) {
                status = 135;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.OUTLAW)) {
                status = 138;
                cm.sendYesNo("��ϲ��ﵽ�� #r[120��]#k �����ھ�Ҫ��� #b[���Ĵ�תְ]#k ��");
            } else if (cm.getLevel() < 255) {
                cm.sendNext("�˲������Ѿ���������е�תְ��\r\n��������� #r[ת��]#k ,����Ҫ����Ա����ת�����ܣ�");
                status = 98;
            } else if (cm.getLevel() >= 255) {
                cm.sendOk("#d����... ΰ��� #r[#h #]#k ,���Ѿ�ͨ��һ��������������ս�ĵ�·,���ڳ�Ϊ�˷�����ӿ������.����������������,�� #r[����Ա]#k #d��ӡ��ħ������������,���Ĳ��������ܼ�,����Ҫ�����ĸ���ǿ������������еľ���!"); 
                cm.dispose();
            } else {
                cm.dispose();
            }

        } else if (status == 2) {
            if (selection == 0) {
                jobName = "�̿�";
                job = net.sf.cherry.client.MapleJob.ASSASSIN;
            }
            if (selection == 1) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.BANDIT;
            }
            if (selection == 2) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.FIGHTER;
            }
            if (selection == 3) {
                jobName = "׼��ʿ";
                job = net.sf.cherry.client.MapleJob.PAGE;
            }
            if (selection == 4) {
                jobName = "ǹսʿ";
                job = net.sf.cherry.client.MapleJob.SPEARMAN;
            }
            if (selection == 5) {
                jobName = "���׷�ʦ";
                job = net.sf.cherry.client.MapleJob.IL_WIZARD;
            }
            if (selection == 6) {
                jobName = "�𶾷�ʦ";
                job = net.sf.cherry.client.MapleJob.FP_WIZARD;
            }
            if (selection == 7) {
                jobName = "��ʦ";
                job = net.sf.cherry.client.MapleJob.CLERIC;
            }
            if (selection == 8) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.HUNTER;
            }
            if (selection == 9) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.CROSSBOWMAN;
            }
            if (selection == 10) {
                jobName = "ȭ��";
                job = net.sf.cherry.client.MapleJob.BRAWLER;
            }
            if (selection == 11) {
                jobName = "��ǹ��";
                job = net.sf.cherry.client.MapleJob.GUNSLINGER;
            }
            cm.sendYesNo("�����ѡ��Ŷ��ȷ��Ҫ��Ϊһ�� #b[" + jobName + "] #k��"); 
                        
                        
        } else if (status == 3) {
            cm.changeJob(job);
            if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN)) {
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
               cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HUNTER)) {
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMAN)) {
               cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BRAWLER)) {
               cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.GUNSLINGER)) {
               cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            }

            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();

        } else if (status == 61) {
            if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BRAWLER)) {
                status = 93;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.GUNSLINGER)) {
                status = 960;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXX��]#k #d,�����ھ�Ҫ��� #r[��XXX��תְ]#k ��");
            } else { 
                cm.dispose();
            }

        } else if (status == 64) {
            cm.changeJob(MapleJob.HERMIT);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 67) {
            cm.changeJob(MapleJob.CHIEFBANDIT);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 70) {
            cm.changeJob(MapleJob.RANGER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 73) {
            cm.changeJob(MapleJob.SNIPER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
           cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 76) {
            cm.changeJob(MapleJob.FP_MAGE);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 79) {
            cm.changeJob(MapleJob.IL_MAGE);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 82) {
            cm.changeJob(MapleJob.PRIEST);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 85) {
            cm.changeJob(MapleJob.CRUSADER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
           cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 88) {
            cm.changeJob(MapleJob.WHITEKNIGHT);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
           cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 91) {
            cm.changeJob(MapleJob.DRAGONKNIGHT);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
        } else if (status == 94) {
            cm.changeJob(MapleJob.MARAUDER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
        } else if (status == 97) {
            cm.changeJob(MapleJob.OUTLAW);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
        } else if (status == 99) {
            cm.sendOk("�����ܺ�Ŷ~~���Ͱɣ��ټ���");
            cm.dispose();

        } else if (status == 102) {
            if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MARAUDER)) {
                status = 135;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.OUTLAW)) {
                status = 137;
                cm.sendYesNo("#d��ϲ��ﵽ�� #r[XXXX��]#k #d,�����ھ�Ҫ��� #r[��XXXX��תְ]#k ��");
            } else { 
                cm.dispose();
            }


         } else if (status == 106) {
            cm.changeJob(MapleJob.NIGHTLORD);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s4121003#");
             cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(4120002,0,10);
            cm.teachSkill(4120005,0,10);
            cm.teachSkill(4121000,0,10);
            cm.teachSkill(4121006,0,10);
            cm.teachSkill(4121004,0,10);
            cm.teachSkill(4121008,0,10);
            cm.teachSkill(4121009,0,10);
            cm.teachSkill(4121007,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
           cm.dispose();
         } else if (status == 109) {
            cm.changeJob(MapleJob.SHADOWER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s4221003# #s4121003#");
             cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(4221007,0,10);
            cm.teachSkill(4220002,0,10);
            cm.teachSkill(4220005,0,10);
            cm.teachSkill(4221001,0,10);
            cm.teachSkill(4221000,0,10);
            cm.teachSkill(4221004,0,10);
            cm.teachSkill(4221006,0,10);
            cm.teachSkill(4221008,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 112) {
            cm.changeJob(MapleJob.BOWMASTER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s3121003#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(3120005,0,10);
            cm.teachSkill(3121002,0,10);
            cm.teachSkill(3121000,0,10);
            cm.teachSkill(3121007,0,10);
            cm.teachSkill(3121004,0,10);
            cm.teachSkill(3121006,0,10);
            cm.teachSkill(3121008,0,10);
            cm.teachSkill(3121009,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 115) {
            cm.changeJob(MapleJob.CROSSBOWMASTER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s3221003#");
             cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(3221002,0,10);
            cm.teachSkill(3221006,0,10);
            cm.teachSkill(3220004,0,10);
            cm.teachSkill(3221001,0,10);
            cm.teachSkill(3221000,0,10);
            cm.teachSkill(3221005,0,10);
            cm.teachSkill(3221007,0,10);
            cm.teachSkill(3221008,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 118) {
            cm.changeJob(MapleJob.FP_ARCHMAGE);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s2121004#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(2121006,0,10);
            cm.teachSkill(2121001,0,10);
            cm.teachSkill(2121002,0,10);
            cm.teachSkill(2121003,0,10);
            cm.teachSkill(2121007,0,10);
            cm.teachSkill(2121000,0,10);
            cm.teachSkill(2121005,0,10);
            cm.teachSkill(2121008,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 121) {
            cm.changeJob(MapleJob.IL_ARCHMAGE);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s2121004#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(2221000,0,10);
            cm.teachSkill(2221006,0,10);
            cm.teachSkill(2221002,0,10);
            cm.teachSkill(2221001,0,10);
            cm.teachSkill(2221003,0,10);
            cm.teachSkill(2221005,0,10);
            cm.teachSkill(2221007,0,10);
            cm.teachSkill(2221008,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 124) {
            cm.changeJob(MapleJob.BISHOP);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s2321007# #s2121004#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(2321000,0,10);
            cm.teachSkill(2321002,0,10);
            cm.teachSkill(2321005,0,10);
            cm.teachSkill(2321003,0,10);
            cm.teachSkill(2321001,0,10);
            cm.teachSkill(2321006,0,10);
            cm.teachSkill(2321008,0,10);
            cm.teachSkill(2321009,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 127) {
            cm.changeJob(MapleJob.HERO);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s1120003# #s1221007#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(1121000,0,10);
            cm.teachSkill(1120004,0,10);
            cm.teachSkill(1120005,0,10);
            cm.teachSkill(1121001,0,10);
            cm.teachSkill(1121002,0,10);
            cm.teachSkill(1121008,0,10);
            cm.teachSkill(1121010,0,10);
            
            cm.dispose();
         } else if (status == 130) {
            cm.changeJob(MapleJob.PALADIN);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s1221007# #s1220010#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(1220005,0,10);
            cm.teachSkill(1221000,0,10);
            cm.teachSkill(1221001,0,10);
            cm.teachSkill(1220006,0,10);
            cm.teachSkill(1221002,0,10);
            cm.teachSkill(1221009,0,10);
            cm.teachSkill(1221003,0,10);
            cm.teachSkill(1221004,0,10);
            cm.teachSkill(1221009,0,10);
	    cm.teachSkill(1221011,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
        } else if (status == 133) {
            cm.changeJob(MapleJob.DARKKNIGHT);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: #s1321003#");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(1320005,0,10);
            cm.teachSkill(1320008,0,10);
            cm.teachSkill(1321000,0,10);
            cm.teachSkill(1320008,0,10);
            cm.teachSkill(1321001,0,10);
            cm.teachSkill(1320006,0,10);
            cm.teachSkill(1320009,0,10);
            cm.teachSkill(1321002,0,10);
            cm.teachSkill(1321010,0,10);
	    cm.teachSkill(1321007,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 136) {
            cm.changeJob(MapleJob.BUCCANEER);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: ");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.teachSkill(5121000,0,10);
            cm.teachSkill(5121001,0,10);
            cm.teachSkill(5121002,0,10);
            cm.teachSkill(5121003,0,10);
            cm.teachSkill(5121004,0,10);
            cm.teachSkill(5121005,0,10);
            cm.teachSkill(5121007,0,10);
            cm.teachSkill(5121008,0,5);
            cm.teachSkill(5121009,0,10);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
            cm.dispose();
         } else if (status == 139) {
            cm.changeJob(MapleJob.CORSAIR);
            cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��\r\n\r\n#r��Boss����ѧϰ�ļ���: ");
            cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
            cm.dispose();
         } else if (status == 151) {
            if (cm.c.getPlayer().getInt() >= 4) {
                cm.teachSkill(2000000,0,16); //Improving MP Recovery
                cm.teachSkill(2000001,0,10); //Improving Max MP Increase
                cm.teachSkill(2001002,0,20); //Magic Guard
                cm.teachSkill(2001003,0,20); //Magic Armor
                cm.teachSkill(2001004,0,20); //Energy Bolt
                cm.teachSkill(2001005,0,20); //Magic Claw
                cm.teachSkill(1007,3,3);
                cm.teachSkill(1003,1,1);
                cm.teachSkill(1004,1,1);
                cm.changeJob(net.sf.cherry.client.MapleJob.MAGICIAN);
                cm.sendOk("תְ�ɹ���ϣ�����Ϊ��ɫ�� #b[ħ��ʦ]#k ��");
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
                cm.dispose();
            } else {
                cm.sendOk("��û�з�����С����: #b[20 ����]#k ��");
                cm.dispose();
            }
            
        } else if (status == 154) {
            cm.sendSimple("��ô��~~������ѡ��һ������ϲ����ְҵ�ɣ�#b\r\n#L0#սʿ#l  #L1#ħ��ʦ#l  #L2#������#l  #L3#����#l  #L4#����#l#k");


        } else if (status == 155) {
            if (selection == 0) {
                jobName = "սʿ";
                job = net.sf.cherry.client.MapleJob.WARRIOR;

            }
            if (selection == 1) {
                jobName = "ħ��ʦ";
                job = net.sf.cherry.client.MapleJob.MAGICIAN;

            }
            if (selection == 2) {
                jobName = "������";
                job = net.sf.cherry.client.MapleJob.BOWMAN;

            }
            if (selection == 3) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.THIEF;

            }
            if (selection == 4) {
                jobName = "����";
                job = net.sf.cherry.client.MapleJob.PIRATE;

            }
            cm.sendYesNo("�����ѡ��Ŷ��ȷ��Ҫ��Ϊһ�� #b[" + jobName + "] #k��"); 
        } else if (status == 156) {
                cm.changeJob(job);
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ��NPC������תְ ����תְ�ɹ���");
                cm.dispose();
            
        } else if (status == 161) {
            if(cm.getJob().getId() == 1000 && cm.getLevel()>=10){
                cm.sendSimple("�������㻹��һ��������,��ѡ��һ���ʺ��Լ���ְҵ��!#b\r\n#L0#����ʿ#l #L1#����ʿ#l #L2#����ʹ��#l #L3#ҹ����#l #L4#��Ϯ��#l#k");
            }else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=30 && cm.getJob().getId()%100 == 0){
                cm.sendYesNo("�����ȷ��Ҫ���еڶ���תְ����");
            }else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=70 && cm.getJob().getId()%10 == 0){
                cm.sendYesNo("�����ȷ��Ҫ���е�����תְ����");
            }else{
                cm.sendOk("��Ŀǰ����������ʹ���ҵķ���Ŷ!");
                cm.dispose();
            }
        } else if (status == 162) {
            if(cm.getJob().getId() == 1000 && cm.getLevel()>=10){
                if (selection == 0) {
                    job = net.sf.cherry.client.MapleJob.GHOST_KNIGHT;
                //cm.gainItem(1302012,1); 
                //cm.gainItem(1302008,1); 
                //cm.gainItem(1432001,1); 
                //cm.gainItem(1432002,1); 
                //cm.gainItem(1402000,1); 
                //cm.gainItem(1402002,1); 
                //cm.gainItem(1442006,1); 
                //cm.gainItem(1442001,1); 
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
                } else if (selection == 1) {
                    job = net.sf.cherry.client.MapleJob.FIRE_KNIGHT;
                cm.gainItem(1372043,1); 
                cm.gainItem(1372001,1); 
                } else if (selection == 2) {
                    job = net.sf.cherry.client.MapleJob.WIND_KNIGHT;
                //cm.gainItem(1462001,1); 
                //cm.gainItem(2061000,1);
                //cm.gainItem(1462004,1);
                //cm.gainItem(2060000,1);
                //cm.gainItem(1452051,1);
                //cm.gainItem(1452008,1);
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
                } else if (selection == 3) {
                    job = net.sf.cherry.client.MapleJob.NIGHT_KNIGHT;
                //cm.gainItem(1332063,1); 
                //cm.gainItem(2070000,1); 
                //cm.gainItem(1332012,1); 
                //cm.gainItem(1472001,1); 
                //cm.gainItem(1472008,1); 
                } else if (selection == 4) {
                    job = net.sf.cherry.client.MapleJob.THIEF_KNIGHT;
                //cm.gainItem(14920141); 
                //cm.gainItem(14920041); 
                //cm.gainItem(14820141); 
                //cm.gainItem(14820041); 
                //cm.gainItem(23300001); 
            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
                }
                cm.changeJob(job);
                cm.gainItem(1142066,1);
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ��NPC������תְ ����תְΪ��ʿ��ְҵ��");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            } else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=30 && cm.getJob().getId()%100 == 0){
                cm.changeJob(MapleJob.getById(cm.getJob().getId()+10));
                cm.gainItem(1142067,1);
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ��NPC������תְ ����תְΪ��ʿ��ְҵ��");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            } else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=70 && cm.getJob().getId()%10 == 0){
                cm.gainItem(1142068,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(MapleJob.getById(cm.getJob().getId()+1));
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ��NPC������תְ ����תְΪ��ʿ��ְҵ��");
                cm.sendOk("תְ�ɹ���ϣ�����Ժ��ð��֮·˳��!");
            }
            cm.dispose();
        } else if (status == 164) {
            if(cm.getJob().getId() == 2000 && cm.getLevel() >=10){
                cm.sendYesNo("ս��ս������\r\n�������㻹��һ��սͯ,��ȷ��Ҫ���е�һ��תְ��");
            } else if(cm.getJob().getId() == 2100 && cm.getLevel() >=30) {
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���еڶ���תְ����");
            } else if(cm.getJob().getId() == 2110 && cm.getLevel() >=70){
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���е�����תְ����");
            } else if(cm.getJob().getId() == 2111 && cm.getLevel() >=120) {
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���е��Ĵ�תְ����");
            } else if(cm.getJob().getId() == 2112 && cm.getLevel() >120) {
                cm.sendOk("���Ѿ���������е�תְ�������������Ͱɣ���");
            } else {
                cm.sendOk("������Ŀǰ���������һ�����Ϊ������Ŷ�����Ͱɣ�");
                cm.dispose();
            }
        } else if (status == 165) {
            if(cm.getJob().getId() == 2000 && cm.getLevel() >=10){
                cm.changeJob(MapleJob.Ares_1);
                cm.gainItem(1142129,1);
                cm.gainItem(1442077,1);
                cm.gainItem(2000022,50);
                cm.gainItem(2000023,50);
            
				cm.teachSkill(21000000,0,10); //ì����ǿ��
				cm.teachSkill(21001001,0,15); //ս������
				cm.teachSkill(21000002,0,20); //˫���ػ�
				cm.teachSkill(21001003,0,20); //����ì
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������1��תְ�ɹ������ף��ta���� ");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            } else if(cm.getJob().getId() == 2100 && cm.getLevel() >=30){
                cm.changeJob(MapleJob.Ares_2);
                cm.gainItem(1442001,1);
                cm.gainItem(1442078,1);
				cm.teachSkill(21100000,0,20); //��׼ì
				cm.teachSkill(21100001,0,20); //�����ػ�
				cm.teachSkill(21100002,0,30); //ս��ͻ��
				cm.teachSkill(21101003,0,20); //��ѹ
				cm.teachSkill(21100004,0,20); //��������
				cm.teachSkill(21100005,0,20); //������Ѫ
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������2��תְ�ɹ������ף��ta���� ");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            } else if(cm.getJob().getId() == 2110 && cm.getLevel() >=70){
                cm.gainItem(1142131,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(MapleJob.Ares_3);
				cm.teachSkill(21110000,0,20); //����ǿ��
				cm.teachSkill(21111001,0,20); //���ɻ���
				cm.teachSkill(21110002,0,20); //ȫ���ӻ�
				cm.teachSkill(21110003,0,30); //�ռ�Ͷ��
				cm.teachSkill(21110004,0,30); //��Ӱ����
				cm.teachSkill(21111005,0,20); //��ѩì
				cm.teachSkill(21110006,0,20); //����
				cm.teachSkill(21110007,0,20); //ȫ���ӻ�
				cm.teachSkill(21110008,0,20); //ȫ���ӻ�
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������תְ�ɹ������ף��ta���� ");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
            } else if(cm.getJob().getId() == 2111 && cm.getLevel() >=120){
                cm.gainItem(1142132,1);
                cm.getPlayer().gainAp(5);
				cm.teachSkill(21121000,0,10); //ð�յ���ʿ
				cm.teachSkill(21120001,0,10); //��������
				cm.teachSkill(21120002,0,10); //ս��֮��
                                cm.teachSkill(21120009,0,10); //ս��֮��
                                cm.teachSkill(21120010,0,10); //ս��֮��
				cm.teachSkill(21121003,0,10); //ս�����־
				cm.teachSkill(21120007,0,10); //ս��֮��
				cm.teachSkill(21121008,0,1); //��ʿ����־
                                            cm.teachSkill(1007,3,3);
            cm.teachSkill(1003,1,1);
            cm.teachSkill(1004,1,1);
                cm.changeJob(MapleJob.Ares_4);
                cm.serverNotice("[תְϵͳ]: ��ϲ [" + cm.getPlayer() + "] ������4��תְ�ɹ������ף��ta���� ");
                cm.sendOk("תְ�ɹ���ϣ�����Ժ��ð��֮·˳����\r\n\r\n#r��Boss����ѧϰ�ļ���: #s21120005# #s21120004# #s21120006#");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }  

    }
}
