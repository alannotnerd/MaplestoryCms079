/* 
 �����۾�NPC by:Kodan
 */

����var status = 0;
var beauty = 0;
var colors;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendSimple("�װ���#h \r\n \r\n����������˿�ʼ��������˵������۾��ˣ���������κ�һ�����������۾��еĻ����ҿ��԰��㻻һ��~~\r\n#L0##b����Ҫ���۾���ɫ#k#l");
    } else if (status == 1) {
        if (cm.getPlayerStat("GENDER") == 0) {
            if (selection == 0) {
                beauty = 1;
                var current = cm.getPlayerStat("FACE") % 100 + 20000;
                colors = Array();
                if (current == 20025 || current == 20027 || current == 20029 || current == 20031 || current == 20032) {
                    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
                } else {
                    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
                }
                cm.sendStyle("ѡһ��ϲ����", colors);
            }
        } else {
            if (selection == 0) {
                beauty = 1;
                var current = cm.getPlayerStat("FACE") % 100 + 21000;
                colors = Array();
                if (current == 21027 || current == 21029 || current == 21030 || current == 21002) {
                    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
                } else {
                    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
                }
                cm.sendStyle("ѡһ��ϲ����", colors);
            }
        }
    } else if (status == 2) {
        if (beauty == 1) {
            if (cm.haveItem(5152100, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152100);
            } else if (cm.haveItem(5152101, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152101);
            } else if (cm.haveItem(5152102, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152102);
            } else if (cm.haveItem(5152103, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152103);
            } else if (cm.haveItem(5152104, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152104);
            } else if (cm.haveItem(5152105, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152105);
            } else if (cm.haveItem(5152106, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152106);
            } else if (cm.haveItem(5152107, 1)) {
                cm.setFace(colors[selection]);
                cm.removeAll(5152107);
            } else {
                cm.sendOk("ò��û����Ҫ�Ķ���Ŷ~");
                cm.dispose();
            }
            cm.dispose();
        }
    }
}