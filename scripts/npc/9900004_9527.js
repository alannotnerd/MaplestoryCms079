var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ������ = "#fUI/UIWindow/Quest/icon3/6#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ�ǵ� = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ���ڽ����� = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var ��� = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var ���ڽ������� = "#fUI/UIWindow/MonsterCarnival/icon1#";
var ��ɺ� = "#fUI/UIWindow/MonsterCarnival/icon0#";
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
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//��ʾ��ƷIDͼƬ�õĴ�����  #v����д��ID#
            text += "#kӵ��#v4310088#���Զһ����־���Ŷ��\r\n\r\n"//3
            text += "#L1##b" + ��ɫ��ͷ + "�һ�#v2044301##z2044301#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L2##b" + ��ɫ��ͷ + "�һ�#v2044302##z2044302#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L3##b" + ��ɫ��ͷ + "�һ�#v2044001##z2044001#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L4##b" + ��ɫ��ͷ + "�һ�#v2044002##z2044002#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L5##b" + ��ɫ��ͷ + "�һ�#v2043801##z2043801#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L6##b" + ��ɫ��ͷ + "�һ�#v2043802##z2043802#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L7##b" + ��ɫ��ͷ + "�һ�#v2043701##z2043701#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L8##b" + ��ɫ��ͷ + "�һ�#v2043702##z2043702#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L9##b" + ��ɫ��ͷ + "�һ�#v2044501##z2044501#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L10##b" + ��ɫ��ͷ + "�һ�#v2044502##z2044502#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L11##b" + ��ɫ��ͷ + "�һ�#v2044601##z2044601#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L12##b" + ��ɫ��ͷ + "�һ�#v2044602##z2044602#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L13##b" + ��ɫ��ͷ + "�һ�#v2043301##z2043301#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L14##b" + ��ɫ��ͷ + "�һ�#v2043302##z2043302#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L15##b" + ��ɫ��ͷ + "�һ�#v2044701##z2044701#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L16##b" + ��ɫ��ͷ + "�һ�#v2044702##z2044702#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L17##b" + ��ɫ��ͷ + "�һ�#v2044901##z2044901#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L18##b" + ��ɫ��ͷ + "�һ�#v2044902##z2044902#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            text += "#L19##b" + ��ɫ��ͷ + "�һ�#v2040914##z2040914#\t��Ҫ��#r#v4310088#x2#k��\r\n\r\n"//
            text += "#L20##b" + ��ɫ��ͷ + "�һ�#v2040915##z2040915#\t��Ҫ��#r#v4310088#x3#k��\r\n\r\n"//
            cm.sendSimple(text);
        } else if (selection == 1) {
if (!cm.canHold(2044301, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044301,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044301#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044301#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 2) {
if (!cm.canHold(2044302, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044302,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044302#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044302#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 3) {
if (!cm.canHold(2044001, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044001,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044001#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044001#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 4) {
if (!cm.canHold(2044002, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044002,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044002#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044002#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 5) {
if (!cm.canHold(2043801, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043801,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043801#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043801#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 6) {
if (!cm.canHold(2043802, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043802,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043802#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043802#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 7) {
if (!cm.canHold(2043701, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043701,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043701#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043701#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 8) {
if (!cm.canHold(2043702, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043702,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043702#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043702#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 9) {
if (!cm.canHold(2044501, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044501,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044501#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044501#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 10) {
if (!cm.canHold(2044502, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044502,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044502#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044502#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 11) {
if (!cm.canHold(2044601, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044601,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044601#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044601#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 12) {
if (!cm.canHold(2044602, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044602,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044602#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044602#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 13) {
if (!cm.canHold(2043301, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2043301,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043301#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043301#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 14) {
if (!cm.canHold(2043302, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2043302,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2043302#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2043302#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 15) {
if (!cm.canHold(2044701, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044701,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044701#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044701#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 16) {
if (!cm.canHold(2044702, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044702,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044702#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044702#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 17) {
if (!cm.canHold(2044901, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2044901,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044901#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044901#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 18) {
if (!cm.canHold(2044902, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2044902,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2044902#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2044902#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 19) {
if (!cm.canHold(2040914, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=2){
cm.gainItem(4310088,-2);
cm.gainItem(2040914,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2040914#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2040914#����Ҫ#v4310088#X2��")
cm.dispose();
}
        } else if (selection == 20) {
if (!cm.canHold(2040915, 1)) {
cm.sendOk("���İ����ռ䲻��.����������");
cm.dispose();
} else if (cm.itemQuantity(4310088) >=3){
cm.gainItem(4310088,-3);
cm.gainItem(2040915,1);
cm.sendNext("#b��ϲ�㣬�ɹ��һ�#v2040915#��")
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�ʹ���н�Ҷһ����ᣡ����");
cm.dispose();
}else{
cm.sendOk("#b��ʾ:#d\r\n�һ�#v2040915#����Ҫ#v4310088#X3��")
cm.dispose();
}
        } else if (selection == 25) {
            if (cm.getPlayer().getLevel() < 70) {
                cm.sendOk("��ĵȼ�С�� 70 �����޷���ȡ������ż���");
                cm.dispose();
            } else if(cm.haveItem(4031326,1)){
                cm.sendOk("���Ѿ�ӵ�в�����ż����벻Ҫ�ظ���ȡ��С�Ĵ�����ʺ���㣡");
                cm.dispose();
            } else {
cm.gainItem(4031326,+1);//������ż�
                cm.sendOk("��ϲ����ȡ�ɹ�����ȥ�����˰ѣ�");
cm.����(3, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ������ż�����ȥ�����˰ѣ���");
                cm.dispose();
	}
	}
    }
}


