var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNextS("���ƺ��ڻ���ʲô�������ì��Ȼ�ϳ����㡣��ô��϶�����#bʹ�ó�ì��Ӣ�ۣ�ս����#k��������ʲô�����������йس�ì�ļ���֮�࡭��", 8);
    } else if (status == 1) {
        qm.sendNextPrevS("#b(˵���ܵ����������˼�����)#k", 2);
    } else if (status == 2) {
        qm.sendNextPrevS("����������࣬����Ҳ�Ѿ��ܲ������ˡ����������Ǽ��о������ָ���ȥ�ļ��ܰɡ���Ȼ��ʧ���ˣ����Ͼ�����ǰ�����������ĵĶ�����Ҫ�ָ�����Ӧ�úܿ졣", 8);
    } else if (status == 3) {
        qm.sendNextPrevS("��ô�ָ���ȥ�ļ��ܣ�", 2);
    } else if (status == 4) {
        qm.sendNextPrevS("�������ֻ��һ��������������������������������������������һ��������������Щ�������ļ��ܣ�������Ҫ�������һ��֪������������ʦ��", 8);
    } else if (status == 5) {
        qm.sendNextPrevS("��ʦ��", 2);
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.sendNext("����Ҫ����ʹ�ĸ������ͺ��ˡ�����һ֧#p1201001#��ϣ������������ʱ���ܹ������ĺܿ졣������֧��ì����");
    } else if (status == 7) {
        qm.sendPrev("�Ӵ��ӳ�ȥ����#b��#k�ߣ��и�С��������ȥ���������#b�հ�#k����ż�����е�����մ�����������һֱ�ڵȴ���Ӣ�۵ĳ��֣��������о��Ÿ��ּ��ܡ���Ҫ���ܹ��õ����İ������϶��������ǳ��");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}