
var sl;
var sls;
function start() {
    status = -1;

    action(1, 0, 0);
}
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
        if(status == 0){   
		sl = cm.getPlayer().getItemQuantity(4001126, false);         
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";//
            }
			text += "\t\t\t  #e��ӭ����#bGogoð�յ� #k!#n\r\n"
			text += "\t\t\t  #e����ǰ���þ�Ϊ��#b"+cm.getPlayer().getCSPoints(2)+"#k!#n\r\n"
            text += "#L1##e#d#v4001126#�һ�����ȯ1:1#l\r\n\r\n"//3
            cm.sendSimple(text);
        }else if(selection == 1){
				cm.sendGetText("");
				sls=2;
        } else if (sls == 2) {
			var n = cm.isNumeric(cm.getText());
			if(n == false){
            cm.sendOk("���.������Ҫ�һ������֣�");
			}else if(cm.tylxfk(cm.getText()) <= sl){
			cm.gainItem(4001126, -cm.tylxfk(cm.getText()));
			cm.gainDY(cm.tylxfk(cm.getText()) *1);
            cm.sendOk("�Ǻǣ��ɹ��һ�!:"+cm.tylxfk(cm.getText()) * 1);
			}else{
            cm.sendOk("�벻Ҫ��������Ʒ������:"+sl);
			}
            cm.dispose();
        }
    }
}