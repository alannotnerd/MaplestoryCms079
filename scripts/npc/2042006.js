var status = 0;
var request;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status = 0;
    }
    if (status == 0) {
        request = cm.getNextCarnivalRequest();
        if (request != null) {
            cm.sendYesNo(request.getChallengeInfo() + "\r\n���������������й�����껪2ս����?");
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        try {
            cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
            cm.dispose();
        } catch(e) {
            cm.sendOk("��ѡ�����ս������Ч.");
        }
        status = -1;
    }
}