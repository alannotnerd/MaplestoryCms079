var equip = null;
var change = null;
var ii = Packages.server.MapleItemInformationProvider.getInstance();
var statNames = new Array("����(STR)", "����(DEX)", "����(INT)", "����(LUK)", "��(HP)", "ħ(MP)", "������(Weapon attack)", "ħ������(Magic attack)", "�������(Weapon defense)", "ħ������(Magic defense)", "������(Accuracy)", "�����(Avoidability)", "�ٶ�(Speed)", "��Ծ(Jump)", "����������(Slots to Upgrade)"); //����װ��������������
var toDrop;
var needvip = 30166; //��Ҫ����VIP�ȼ����ϲ���ʹ�ô˹���

var number = Math.floor(Math.random() * 3 + 1); //�������һ������
var needmark = 31111 * number; //����һ��װ����Ҫ�ļ۸�
var str = 0; //����1������(STR)�۸�
var dex = 0; //����1������(DEX)�۸�
var ini = 0; //����1������(INT)�۸�
var luk = 0; //����1������(LUK)�۸�
var hp = 0; //����1���(HP)�۸�
var mp = 0; //����1��ħ(MP)�۸�
var wattack = 0; //����1��������(Weapon attack)�۸�
var mattack = 0; //����1��ħ������(Magic attack)�۸�
var wdefense = 0; //����1���������(Weapon defense)�۸�
var mdefense = 0; //����1��ħ������(Magic defense)�۸�
var accuracy = 0; //����1��������(Accuracy)�۸�
var avoidability = 5; //����1������(Avoidability)�۸�
var speed = 5; //����1���ٶ�(Speed)�۸�
var jump = 5; //����1����Ծ(Jump)�۸�
var upgrade = 6; //����1�����������(Slots to Upgrade)�۸�
var own = 5; //�޸�װ����(Own)�۸�

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if ((status == 1 || status == 3 || status == 4) && mode == 0) {
            cm.dispose();
            return;
        }

        if (mode == 1) status++;
        else if (mode == 0) status--;

        if (status == 0) {
            if (cm.getChar().getId() == needvip) {
                cm.sendYesNo("#d��ӭ#d����#r�û���ð�յ�!����Ҫ�����Լ���ָ������װ����?\r\n\r\n#b���������������T���շ�˵����T��������������\r\n#r����һ��#g����(STR)#r�۸�:#g" + str + "#r�����ñ�\r\n#r����һ��#g����(DEX)#r�۸�:#g" + dex + "#r�����ñ�\r\n#r����һ��#g����(INI)#r�۸�:#g" + ini + "#r�����ñ�\r\n#r����һ��#g����(LUK)#r�۸�:#g" + luk + "#r�����ñ�\r\n\r\n#r����һ��#g��(HP)#r�۸�:#g" + hp + "#r�����ñ�\r\n#r����һ��#għ(MP)#r�۸�:#g" + mp + "#r�����ñ�\r\n#r����һ��#g������(Weapon attack)#r�۸�:#g" + wattack + "#r�����ñ�\r\n#r����һ��#għ������(Magic attack)#r�۸�:#g" + mattack + "#r�����ñ�\r\n#r����һ��#g�������(Weapon defense)#r�۸�:#g" + wdefense + "#r�����ñ�\r\n#r����һ��#għ������(Magic defense)#r�۸�:#g" + mdefense + "#r�����ñ�\r\n\r\n#r����һ��#g������(Accuracy)#r�۸�:#g" + accuracy + "#r�����ñ�\r\n#r����һ��#g�����(Avoidability)#r�۸�:#g" + avoidability + "#r�����ñ�\r\n#r����һ��#g�ٶ�(Speed)#r�۸�:#g" + speed + "#r�����ñ�\r\n#r����һ��#g��Ծ(Jump)#r�۸�:#g" + jump + "#r�����ñ�\r\n#r����һ��#g����������(Slots to Upgrade)#r�۸�:#g" + upgrade + "#r�����ñ�\r\n#r����һ��#g�޸�װ����(Own)#r�۸�:#g" + own + "#r�����ñ�\r\n\r\n#b���������������T������˵����T��������������\r\n#dֻ��#gVIP" + needvip + "#d���ϵĵȼ�����ʹ�ô˹���.\r\n#r�������#g��Ϸ����Ա(Game Master,GM)#r,ʹ�ô˹�������ָ������װ��,��#g����ȡ�κη���#r��,������Ҫ��#g�㹻#r�����ñұ�!\r\n����һ��װ����Ҫ#g" + needmark + "���ñ�#r(��ʹװ���޼��κ�����ҲҪ�շ�,��������ˢװ����#gBUG#r)");
            } else {
                cm.sendOk("�Բ���,ֻ��#rGMָ����IDΪ" + needvip + "����#k����ʹ������ָ������װ������..");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendGetNumber("������װ������.", 1000000, 1000000, 1999999); //����Ϊ:��ʾ�ĶԻ�����,Ĭ�����������,������װ��������Сֵ,������װ���������ֵ 
        } else if (status == 2) {
            var items = ii.getAllItems().toArray(); //�ӻ����ȡװ������
            for (var i = 0; i < items.length; i++) { //ѭ�����л��������װ��
                if (items[i].itemId == selection) { //�ж������װ���ڻ��������Ƿ����
                    //equip = ii.getEquipById(selection);
                    toDrop = ii.randomizeStats(ii.getEquipById(selection)).copy(); // ����һ��Equip��(�������װ��)
                    cm.sendYesNo("����Ҫ���� #b#v" + selection + "##z" + selection + "##k ��?");
                    return;
                }
            }
            cm.sendPrev("����Ҫ������װ��������.");
        } else if (status == 3) {
            var needpoints = str * getEquipStat(0) + dex * getEquipStat(1) + ini * getEquipStat(2) + luk * getEquipStat(3) + hp * getEquipStat(4) + mp * getEquipStat(5) + wattack * getEquipStat(6) + mattack * getEquipStat(7) + wdefense * getEquipStat(8) + mdefense * getEquipStat(9) + accuracy * getEquipStat(10) + avoidability * getEquipStat(11) + speed * getEquipStat(12) + jump * getEquipStat(13) + upgrade * getEquipStat(14) + own * 1; //�����������Ե��ܹ���Ǯ
            var s = "����������: #b#z" + toDrop.getItemId() + "##k.\r\n�������޸���������.\r\nһ����Ҫ��������#g" + needpoints + " + " + needmark + "#k�����ñ�\r\n�������#r��Ϸ����Ա(Game Master,GM)#k,��#g��#k��ȡ�κη���!\r\n";
            for (var i = 0; i < 16; i++) {
                s += "#L" + i + "##b" + statNames[i] + ": " + getEquipStat(i) + "#k#l\r\n";
            }

            s += "\r\n#L16##e#r����װ��#k#l";
            cm.sendSimple(s);
        }
        else if (status == 4) {
            if (selection == 16) {
                var needpoints = str * getEquipStat(0) + dex * getEquipStat(1) + ini * getEquipStat(2) + luk * getEquipStat(3) + hp * getEquipStat(4) + mp * getEquipStat(5) + wattack * getEquipStat(6) + mattack * getEquipStat(7) + wdefense * getEquipStat(8) + mdefense * getEquipStat(9) + accuracy * getEquipStat(10) + avoidability * getEquipStat(11) + speed * getEquipStat(12) + jump * getEquipStat(13) + upgrade * getEquipStat(14) + own * 1; //�����������Ե��ܹ���Ǯ
                if (cm.getHyPay(1) < needpoints+needmark) {
                    cm.sendOk("������ñ�������:#g" + needpoints + " + " + needmark + "#k��.");
                    cm.dispose();
                    return;
                } else {
                    var text;
                    if (cm.getSpace(1) < 1) { //�ж�װ�����Ƿ��пո�
                        cm.sendOk("��ȷ�����װ�����Ƿ��пո�.�㵱ǰװ��ֻ��" + cm.getSpace(1)+"���ո�!");
                        cm.dispose();
                        return;
                    }
                    if (!cm.getChar().isGM()) {
                        allpoints = needpoints + needmark //������Ҫ���е����ñ�
                        cm.addHyPay(allpoints, true); //��ȡ��Ҫ�����ñ�
                        text = "��ϲ,���Ѿ��ɹ�����һ��װ��: #b#t" + toDrop.getItemId() + "##k!һ������������#g" + allpoints + "#k�����ñ�!";
                    } else { //�����GM
                        text = "��ϲ,���Ѿ��ɹ�����һ��װ��: #b#t" + toDrop.getItemId() + "##k!��Ϊ����#r��Ϸ����Ա(Game Master,GM)#k,����#g��#k��ȡ�κη���!";
                    }
                    cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).addItem(toDrop); //�����װ���������
                    cm.fakeRelog();//ˢ������
                    //cm.getChar().getClient().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(Packages.client.inventory.MapleInventoryType.EQUIP, toDrop)); //ˢ�±���
                    cm.sendOk(text);
                    cm.dispose();
                }
            } else {
                change = selection;
                if (selection == 15) {
                    cm.sendGetText("������#bowner#k��ֵ.");
                    return;
                }

                var def = getEquipStat(selection);
                cm.sendGetNumber("�����µ�ֵ��: #b" + statNames[selection] + "#k.", def, 0, 32767); //������������ֵ
            }
        } else if (status == 5) {
            setEquipStat(change, selection);
            status = 3;
            action(2, 0, 0);
        }
    }
}

//��ȡװ������


function getEquipStat(i) {
    switch (i) {
    case 0:
        return toDrop.getStr();
    case 1:
        return toDrop.getDex();
    case 2:
        return toDrop.getInt();
    case 3:
        return toDrop.getLuk();
    case 4:
        return toDrop.getHp();
    case 5:
        return toDrop.getMp();
    case 6:
        return toDrop.getWatk();
    case 7:
        return toDrop.getMatk();
    case 8:
        return toDrop.getWdef();
    case 9:
        return toDrop.getMdef();
    case 10:
        return toDrop.getAcc();
    case 11:
        return toDrop.getAvoid();
    case 12:
        return toDrop.getSpeed();
    case 13:
        return toDrop.getJump();
    case 14:
        return toDrop.getUpgradeSlots();
    case 15:
        return toDrop.getOwner() == "" ? "(none)" : toDrop.getOwner();;
    }
}

//����װ������


function setEquipStat(i, v) {

    switch (i) {
    case 0:
        toDrop.setStr(v);
        break;
    case 1:
        toDrop.setDex(v);
        break;
    case 2:
        toDrop.setInt(v);
        break;
    case 3:
        toDrop.setLuk(v);
        break;
    case 4:
        toDrop.setHp(v);
        break;
    case 5:
        toDrop.setMp(v);
        break;
    case 6:
        toDrop.setWatk(v);
        break;
    case 7:
        toDrop.setMatk(v);
        break;
    case 8:
        toDrop.setWdef(v);
        break;
    case 9:
        toDrop.setMdef(v);
        break;
    case 10:
        toDrop.setAcc(v);
        break;
    case 11:
        toDrop.setAvoid(v);
        break;
    case 12:
        toDrop.setSpeed(v);
        break;
    case 13:
        toDrop.setJump(v);
        break;
    case 14:
        toDrop.setUpgradeSlots(v);
        break;
    case 15:
        toDrop.setOwner(cm.getText());
        break;
    }
}
