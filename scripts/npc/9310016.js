/* ��� ID:9310016
	ԥ԰���NPC ����+Ⱦ��
*/
var status = 0;
var beauty = 0;
var mhair = Array(30030, 30040, 30000, 30060, 30110, 30120, 30160, 30260, 30270, 30420, 30550, 30340, 30300);
var fhair = Array(31000, 31420, 31290, 31490, 30420, 31480, 31810, 31080, 31880, 31030, 31850, 31700, 34000);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) 
            cm.sendSimple("���ã�����#p9310016#. ������� #b#t5150015##k ������ #b#t5151011##k �������Ұ����ͷ��������ѡ��һ������Ҫ��.\r\n#L1#ʹ�� #i5150015##t5150015##l\r\n#L2#ʹ�� #i5151011##t5151011##l");
        else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("ѡ��һ����Ҫ��.", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt((cm.getPlayerStat("HAIR") / 10)) * 10;
                for(var i = 0; i < 7; i++)
                    haircolor.push(current + i);
                cm.sendStyle("ѡ��һ����Ҫ��", haircolor);
            }
        } else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150015)){
                    cm.gainItem(5150015, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("����!");
                } else
                    cm.sendOk("��ò��û��#b#t5150015##k..");
            }
            if (beauty == 2){
                if (cm.haveItem(5151011)){
                    cm.gainItem(5151011, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("����!");
                } else
                    cm.sendOk("��ò��û��#b#t5151011##k..");
            }
        }
    }
}
