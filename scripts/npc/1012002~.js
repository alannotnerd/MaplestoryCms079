/* Vicious
	Victoria Road : Henesys Market (100000100)
	
	Refining NPC: 
	* Bows - 10-40
	* Crossbows - 12-50
	* Archer Gloves - 10-60 + upgrades
	* Processed Wood/Screws
	* Arrows/Bronze Arrows/Steel Arrows
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	cm.dispose();
    if (status == 0 && mode == 1) {
	var selStr = "���������Ǳ���˹�����ݵľѻ��֣������������ŵ���Ƥ��˹�����ѧ�����Ҳ��ٴ����ˣ����ҿ��԰�������һЩ�����а�������Ʒ#b"
	var options = new Array("������","������","��������","��������","ľ������˿������","������ʸ");
	for (var i = 0; i < options.length; i++) {
	    selStr += "\r\n#L" + i + "# " + options[i] + "#l";
	}
			
	cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
	selectedType = selection;
	if (selectedType == 0) { //bow refine
	    var selStr = "���۹�,���Ĺ����ٶȿ�,Ҳ�����������,���ǹ��������һ���Ŷ~#b";
	    var items = new Array(1452002,1452003,1452001,1452000,1452005,1452006,1452007);
	    var suffix = new Array (" - ��Ҫ�ȼ� Lv. 10"," - ��Ҫ�ȼ� Lv. 15"," - ��Ҫ�ȼ� Lv. 20"," - ��Ҫ�ȼ� Lv. 25"," - ��Ҫ�ȼ� Lv. 30"," - ��Ҫ�ȼ� Lv. 35",
		" - ��Ҫ�ȼ� Lv. 40");
	    equip = true;
	    for (var i = 0; i < items.length; i++) {
		selStr += "\r\n#L" + i + "##z" + items[i] + "##k" + suffix[i] + "#l#b";
	    }
	    cm.sendSimple(selStr);
	}
	else if (selectedType == 1) { //xbow refine
	    var selStr = "�����ҵ�ר��~���Ĺ����ٶȱȹ���Ҫ��һ�㣬�����˺�ȴ�ȹ�Ҫ���ĸ�Ŷ#b";
	    var items = new Array(1462001,1462002,1462003,1462000,1462004,1462005,1462006,1462007);
	    var suffix = new Array (" - ��Ҫ�ȼ� Lv. 12"," - ��Ҫ�ȼ� Lv. 18"," - ��Ҫ�ȼ� Lv. 22"," - ��Ҫ�ȼ� Lv. 28"," - ��Ҫ�ȼ� Lv. 32"," - ��Ҫ�ȼ� Lv. 38",
		" - ��Ҫ�ȼ� Lv. 42"," - ��Ҫ�ȼ� Lv. 50");
	    equip = true;
	    for (var i = 0; i < items.length; i++) {
		selStr += "\r\n#L" + i + "##z" + items[i] + "##k" + suffix[i] + "#l#b";
	    }
	    cm.sendSimple(selStr);
	}
	else if (selectedType == 2) { //glove refine
	    var selStr = "�õ�,����Ҫ������һ��������?#b";
	    var items = new Array(1082012,1082013,1082016,1082048,1082068,1082071,1082084,1082089);
	    var suffix = new Array (" - ��Ҫ�ȼ� Lv. 15"," - ��Ҫ�ȼ� Lv. 20"," - ��Ҫ�ȼ� Lv. 25"," - ��Ҫ�ȼ� Lv. 30"," - ��Ҫ�ȼ� Lv. 35",
		" - ��Ҫ�ȼ� Lv. 40"," - ��Ҫ�ȼ� Lv. 50"," - ��Ҫ�ȼ� Lv. 60");
	    equip = true;
	    for (var i = 0; i < items.length; i++) {
		selStr += "\r\n#L" + i + "##z" + items[i] + "##k" + suffix[i] + "#l#b";
	    }
	    cm.sendSimple(selStr);
	}
	else if (selectedType == 3) { //glove upgrade
	    var selStr = "��������? ���ڹ�������˵���ʺϲ�����,����Ҫ������һ����??#b";
	    var items = new Array (1082015,1082014,1082017,1082018,1082049,1082050,1082069,1082070,1082072,1082073,1082085,1082083,1082090,1082091);
	    var suffix = new Array (" - ��Ҫ�ȼ� Lv. 20"," - ��Ҫ�ȼ� Lv. 20"," - ��Ҫ�ȼ� Lv. 25"," - ��Ҫ�ȼ� Lv. 25"," - ��Ҫ�ȼ� Lv. 30",
		" - ��Ҫ�ȼ� Lv. 30"," - ��Ҫ�ȼ� Lv. 35"," - ��Ҫ�ȼ� Lv. 35"," - ��Ҫ�ȼ� Lv. 40"," - ��Ҫ�ȼ� Lv. 40"," - ��Ҫ�ȼ� Lv. 50",
		" - ��Ҫ�ȼ� Lv. 50"," - ��Ҫ�ȼ� Lv. 60"," - ��Ҫ�ȼ� Lv. 60");
	    for (var i = 0; i < items.length; i++) {
		selStr += "\r\n#L" + i + "##z" + items[i] + "##k" + suffix[i] + "#l#b";
	    }
	    equip = true;
	    cm.sendSimple(selStr);
	}
	else if (selectedType == 4) { //material refine
	    var selStr = "���ϣ���֪��һЩ���ϣ��ҿ��԰�����...?#b";
	    var materials = new Array ("��10����֦����1��ľ��","��5��ľ������1��ľ��","������˿��(1��15��)");
	    for (var i = 0; i < materials.length; i++) {
		selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
	    }
	    equip = false;
	    cm.sendSimple(selStr);
	}
	else if (selectedType == 5) { //arrow refine
	    var selStr = "��ʸ?û�����,1��=1000֧��ʸŶ#b";
	    var arrows = new Array ("������ʸ","�������ʸ","������ͭ����","������ͭ���","������������","�����������");
	    for (var i = 0; i < arrows.length; i++) {
		selStr += "\r\n#L" + i + "# " + arrows[i] + "#l";
	    }
	    equip = true;
	    cm.sendSimple(selStr);
	}
	if (equip)
	    status++;
    }
    else if (status == 2 && mode == 1) {
	selectedItem = selection;
	if (selectedType == 4) { //material refine
	    var itemSet = new Array (4003001,4003001,4003000);
	    var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
	    var matQtySet = new Array (10,5,new Array (1,1));
	    var costSet = new Array (0,0,0)
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
		
	var prompt = "��������Ҫ�Ұ�����һЩ#t" + item + "#? ������Ҫ�������ٸ���?";
		
	cm.sendGetNumber(prompt,1,1,100)
    }
    else if (status == 3 && mode == 1) {
	if (equip)
	{
	    selectedItem = selection;
	    qty = 1;
	}
	else
	    qty = selection;

	if (selectedType == 0) { //bow refine
	    var itemSet = new Array(1452002,1452003,1452001,1452000,1452005,1452006,1452007);
	    var matSet = new Array(new Array(4003001,4000000),new Array(4011001,4003000),new Array(4003001,4000016),new Array(4011001,4021006,4003000),
		new Array(4011001,4011006,4021003,4021006,4003000),new Array(4011004,4021000,4021004,4003000),new Array(4021008,4011001,4011006,4003000,4000014));
	    var matQtySet = new Array(new Array(5,30),new Array(1,3),new Array(30,50),new Array(2,2,8),new Array(5,5,3,3,30),new Array(7,6,3,35),new Array(1,10,3,40,50));
	    var costSet = new Array(800,2000,3000,5000,30000,40000,80000);
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
	else if (selectedType == 1) { //xbow refine
	    var itemSet = new Array(1462001,1462002,1462003,1462000,1462004,1462005,1462006,1462007);
	    var matSet = new Array(new Array(4003001,4003000),new Array(4011001,4003001,4003000),new Array(4011001,4003001,4003000),new Array(4011001,4021006,4021002,4003000),
		new Array(4011001,4011005,4021006,4003001,4003000),new Array(4021008,4011001,4011006,4021006,4003000),new Array(4021008,4011004,4003001,4003000),new Array(4021008,4011006,4021006,4003001,4003000));
	    var matQtySet = new Array(new Array(7,2),new Array(1,20,5),new Array(1,50,8),new Array(2,1,1,10),new Array(5,5,3,50,15),new Array(1,8,4,2,30),new Array(2,6,30,30),new Array(2,5,3,40,40));
	    var costSet = new Array (1000,2000,3000,10000,30000,50000,80000,200000);
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
	else if (selectedType == 2) { //glove refine
	    var itemSet = new Array(1082012,1082013,1082016,1082048,1082068,1082071,1082084,1082089);
	    var matSet = new Array(new Array(4000021,4000009),new Array(4000021,4000009,4011001),new Array(4000021,4000009,4011006),new Array(4000021,4011006,4021001),new Array(4011000,4011001,4000021,4003000),
		new Array(4011001,4021000,4021002,4000021,4003000),new Array(4011004,4011006,4021002,4000030,4003000),new Array(4011006,4011007,4021006,4000030,4003000));
	    var matQtySet = new Array(new Array(15,20),new Array(20,20,2),new Array(40,50,2),new Array(50,2,1),new Array(1,3,60,15),new Array(3,1,3,80,25),new Array(3,1,2,40,35),new Array(2,1,8,50,50));
	    var costSet = new Array(5000,10000,15000,20000,30000,40000,50000,70000);
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
	else if (selectedType == 3) { //glove upgrade
	    var itemSet = new Array (1082015,1082014,1082017,1082018,1082049,1082050,1082069,1082070,1082072,1082073,1082085,1082083,1082090,1082091);
	    var matSet = new Array(new Array(1082013,4021003),new Array(1082013,4021000),new Array(1082016,4021000),new Array(1082016,4021008),new Array(1082048,4021003),new Array(1082048,4021008),
		new Array(1082068,4011002),new Array(1082068,4011006),new Array(1082071,4011006),new Array(1082071,4021008),new Array(1082084,4011000,4021000),new Array(1082084,4011006,4021008),
		new Array(1082089,4021000,4021007),new Array(1082089,4021007,4021008));
	    var matQtySet = new Array (new Array(1,2),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,4),new Array(1,2),new Array(1,4),new Array(1,2),
		new Array(1,1,5),new Array(1,2,2),new Array(1,5,1),new Array(1,2,2));
	    var costSet = new Array (7000,7000,10000,12000,15000,20000,22000,25000,30000,40000,55000,60000,70000,80000);
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
	else if (selectedType == 5) { //arrow refine
	    var itemSet = new Array(2060000,2061000,2060001,2061001,2060002,2061002);
	    var matSet = new Array(new Array (4003001,4003004),new Array (4003001,4003004),new Array (4011000,4003001,4003004),new Array (4011000,4003001,4003004),
		new Array (4011001,4003001,4003005),new Array (4011001,4003001,4003005));
	    var matQtySet = new Array (new Array (1,1),new Array (1,1),new Array (1,3,10),new Array (1,3,10),new Array (1,5,15),new Array (1,5,15));
	    var costSet = new Array (0,0,0,0,0,0)
	    item = itemSet[selectedItem];
	    mats = matSet[selectedItem];
	    matQty = matQtySet[selectedItem];
	    cost = costSet[selectedItem];
	}
		
	var prompt = "����Ҫ�Ұ�����";
	if (qty == 1)
	    prompt += "#t" + item + "#?";
	else
	    prompt += qty + "��#t" + item + "#?";
			
	prompt += " �õ��һ������ɵ�,������ȷ����ı����Ƿ������µĲ������㹻�Ŀռ�Ŷ#b";
		
	if (mats instanceof Array) {
	    for(var i = 0; i < mats.length; i++) {
		prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
	    }
	}
	else {
	    prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
	}
		
	if (cost > 0)
	    prompt += "\r\n#i4031138# " + cost * qty + " meso";
		
	cm.sendYesNo(prompt);
    }
    else if (status == 4 && mode == 1) {
	var complete = true;
	if (cm.getMeso() < cost * qty)
	{
	    cm.sendOk("Ǯ����...��û�е���Ŷ��Ǹ...")
		complete = false;
	}
	else
	{
	    if (mats instanceof Array) {
		for(var i = 0; complete && i < mats.length; i++)
		{
		    if (!cm.haveItem(mats[i], matQty[i]))
		    {
			complete = false;
		    }
		}
	    }
	    else {
		if (!cm.haveItem(mats, matQty))
		{
		    complete = false;
		}
	    }
	}
			
	if (!complete)
	    cm.sendOk("��Ϊһ�������ֲ�������ϸ�ĵ����鷢����? ��ȷ����İ����Ƿ��в��ϰ�");
	else {
	    if (cm.canHold(item)) {
		if (mats instanceof Array) {
		    for (var i = 0; i < mats.length; i++) {
			cm.gainItem(mats[i], -matQty[i] * qty);
		    }
		}
		else
		    cm.gainItem(mats, -matQty * qty);
						
		if (cost > 0)
		    cm.gainMeso(-cost * qty);
					
		if (item >= 2060000 && item <= 2060002) //bow arrows
		    cm.gainItem(item, 1000 - (item - 2060000) * 100);
		else if (item >= 2061000 && item <= 2061002) //xbow arrows
		    cm.gainItem(item, 1000 - (item - 2061000) * 100);
		else if (item == 4003000)//screws
		    cm.gainItem(4003000, 15 * qty);
		else
		    cm.gainItem(item, qty);
		cm.sendOk("�ܰ��ĵ��߰�? �ҵ�����,���������Ҫ��ӭ������,�����ִ����ҵĹ���.");
	    }
	    else {
		cm.sendOk("��ȷ����ı������㹻�Ŀռ䣬�ٸ���˵��.");
	    }
	}
	cm.dispose();
    }
}