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
		if(cm.petgm() == false){
            //cm.sendOk("���ٻ����������");
            cm.dispose();
			}else if(cm.haveItem(5170000,1)){
				cm.sendGetText("");
			}else{
            cm.sendOk("��ȥ�̳�����#v5170000#��");
            cm.dispose();
			}
           // cm.sendGetText("���.\r\n�������ɰ��ĳ��ﻻ��ʲô�����أ�\r\n������6���������»�12��Ӣ�����£�\r\n#r�����޷��޷��������ֶ��ҳ����ᵽ����ĸ�����ɾ��");
			//cm.sendGetText("");
			//cm.setGetText(cm.getText);
       //     var text = cm.getText();
        }else if(status == 1){
			var n = cm.calculatePlaces(cm.getText());  
			if(n > 13){
            cm.sendOk("���.\r\n�������ɰ��ĳ��ﻻ��ʲô�����أ�\r\n������6���������»�12��Ӣ�����£�\r\n#r�����޷��޷���������");
			}else{
			cm.gainItem(5170000, -1);
            cm.petName(cm.getText());
            cm.sendOk("�Ǻǣ��ɹ���!:"+cm.getText());
			}
           // cm.petName(cm.getText());
            //cm.sendOk("�Ǻǣ��ɹ���!:"+cm.getText());
            cm.dispose();
        }
    }
}