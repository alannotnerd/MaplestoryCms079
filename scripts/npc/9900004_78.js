importPackage(java.lang);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server);

var status = 0;
var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ������ = "#fUI/UIWindow/Quest/icon3/6#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";

	function start() {
		status = -1;
		action(1, 0, 0);
		}
	function action(mode, type, selection) {
		if (mode == -1) {
		cm.dispose();
		} else {
		if (status >= 0 && mode == 0) {
		cm.dispose();
		return;
		}
		if (mode == 1)
		status++;
		else
		status--;


	if (status == 0) {

	    var textz = "�����׹��������ɻ�þ���ӳ�30%��������ЧŶ�������ر�Ŷ����칺���!\r\n\r\n";

		textz += "" + ��ɫ��ͷ + "#L1##r#v1122017##z1122017#\tʹ��Ȩ��3Сʱ\t��Ҫ���300��\r\n\r\n";

		textz += "" + ��ɫ��ͷ + "#L2##r#v1122017##z1122017#\tʹ��Ȩ��10Сʱ\t��Ҫ���600��\r\n\r\n";

		textz += "" + ��ɫ��ͷ + "#L3##r#v1122017##z1122017#\tʹ��Ȩ��1��\t��Ҫ���1200��\r\n\r\n";

		textz += "" + ��ɫ��ͷ + "#L4##r#v1122017##z1122017#\tʹ��Ȩ��7��\t��Ҫ���6000��\r\n\r\n";

		//textz += "#r#L4##v1462019##z1462019#   ���� - Զ  ��#l\r\n\r\n";

		//textz += "#r#L5##v1472032##z1472032#   ���� - ȭ  ��#l\r\n\r\n";
		
		//textz += "#r#L6##v1482020##z1482020#   ���� - ȭ  ��#l\r\n\r\n";
		
		//textz += "#r#L7##v1492020##z1492020#   ���� - ��  ǹ#l\r\n\r\n";
		
		//textz += "#r#L8##v1432012##z1432012#   սʿ - ǹ  ��#l\r\n\r\n";
		
		//textz += "#r#L9##v1442024##z1442024#   ���� - ì  ��#l\r\n\r\n";

	

		cm.sendSimple (textz);  

	}else if (status == 1) {

	if (selection == 0) {
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r1��#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
        var ii = MapleItemInformationProvider.getInstance();		                
		var type = ii.getInventoryType(1302208); //���װ��������/////////////////////////////////////////////////////////////////////
		var toDrop = ii.randomizeStats(ii.getEquipById(1302208)).copy(); // ����һ��Equip��
		var temptime = (System.currentTimeMillis() + 3 * 60 * 60 * 1000); //ʱ��
		toDrop.setExpiration(temptime); 
		cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
		cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
		cm.getChar().saveToDB(false, false);
		cm.gainItem(5220007,-1);
		cm.sendOk("�һ��ɹ�!")
		cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.getMeso() < 0) {
 			cm.sendOk("������޷�������");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(1)){
			cm.sendOk("#b�뱣֤װ����λ������1���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
			var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 3 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainNX(-300);
			cm.sendOk("�ɹ�������׹��3Сʱʹ��Ȩ��")
      			cm.dispose();
			}

	}else if (selection == 2){
		if (cm.getMeso() < 0) {
 			cm.sendOk("������޷�������");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(1)){
			cm.sendOk("#b�뱣֤װ����λ������1���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
			var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 10 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainNX(-300);
			cm.sendOk("�ɹ�������׹��10Сʱʹ��Ȩ��")
      			cm.dispose();
			}

	}else if (selection == 3){
		if (cm.getMeso() < 0) {
 			cm.sendOk("������޷�������");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(1)){
			cm.sendOk("#b�뱣֤װ����λ������1���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
			var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000);  //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainNX(-300);
			cm.sendOk("�ɹ�������׹��1��ʹ��Ȩ��")
      			cm.dispose();
			}

	}else if (selection == 4){
		if (cm.getMeso() < 0) {
 			cm.sendOk("������޷�������");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(1)){
			cm.sendOk("#b�뱣֤װ����λ������1���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
			var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1122017); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);  //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainNX(-300);
			cm.sendOk("�ɹ�������׹��7��ʹ��Ȩ��")
      			cm.dispose();
			}

	}else if (selection == 5){
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r5000W#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������#k");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
         var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1472032); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1472032)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainItem(5220007,-1);
			cm.sendOk("�һ��ɹ�!")
      			cm.dispose();
			}

	}else if (selection == 6){
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r5000W#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������#k");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else{
         var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1482041); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1482041)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainItem(5220007,-1);
			cm.sendOk("�һ��ɹ�!")
      			cm.dispose();
			}
	}else if (selection == 7){
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r5000W#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������#k");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
         var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1492042); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1492042)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainItem(5220007,-1);
			cm.sendOk("�һ��ɹ�!")
      			cm.dispose();
			}
   }else if (selection == 8){
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r5000W#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������#k");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
         var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1432012); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1432012)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainItem(5220007,-1);
			cm.sendOk("�һ��ɹ�!")
      			cm.dispose();
	       }
	 }else if (selection == 9){
		if (cm.getMeso() < 0) {
 			cm.sendOk("�����#r5000W#k���#k");
      			cm.dispose();
		} else if (!cm.haveItem(5220007,1)) {
 			cm.sendOk("#v5220007##z5220007#��û�и���Ʒ ��Ҫ���̳ǹ����������#k");
      			cm.dispose();
		} else if (cm.getInventory(1).isFull(3)){
			cm.sendOk("#b�뱣֤װ����λ������3���ո�,�����޷��һ�.");
			cm.dispose();
		} else {
         var ii = MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1442024); //���װ��������/////////////////////////////////////////////////////////////////////
            var toDrop = ii.randomizeStats(ii.getEquipById(1442024)).copy(); // ����һ��Equip��
            var temptime = (System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000); //ʱ��
			toDrop.setExpiration(temptime); 
			cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
			cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���	
			cm.getChar().saveToDB(false, false);
			cm.gainItem(5220007,-1);
			cm.sendOk("�һ��ɹ�!")
      			cm.dispose();
}       }
}
}
}
