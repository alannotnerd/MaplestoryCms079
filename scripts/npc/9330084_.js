var slot;
var item;
var qty;
var status = 0;
var display;
var needap = 1000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("��ȷ���Ƿ���#i4032225#��");
            cm.dispose();
            return;
        }
    if (mode == 1)
            status++;
    else
            status--;
        if (status == 0) {
            cm.sendGetNumber("��������Ҫ�һ��Ŀ���. \r\n������ƷΪ#i4032225#\r\n#r(��ֵ:1#i4032225#x1:#i4032226#x1)\r\n��ע�����ϱ����Ŀռ�#k",1,1,100);
        } else if (status == 1) {
            slot = selection;
            item = 4032225;
            if (item==0){
                cm.sendOk("��ȷ���Ƿ���#i4032225#��")
                cm.dispose();
            }else
                cm.sendYesNo("��ȷ��Ҫ�һ��𣿣�")
        } else if (status == 2) {
            if (!cm.haveItem(4032225, slot)) {
                cm.sendNext("��ȷ���Ƿ���#i4032225#��");
                cm.dispose();
            }else{
                cm.gainItem(4032225, -slot)
                cm.gainItem(4032226, slot)              
                cm.sendOk("#b��ϲ��ɹ���!��쿴��İ�����!#k");
                cm.dispose();
}
}
}
} 