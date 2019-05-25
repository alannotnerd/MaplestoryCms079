var status = -1;
var complete = false;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("镣轰简灏嶆姉阃愭几璁婂挤镄勯粦鏆楀姏閲?妤扑箣璋风殑镓€链夊媷澹繀阕堜竴璧疯畩寮?");
    } else if (status == 1) {
        qm.sendNextPrev("鍕囧＋阒?..绲︿綘娉ㄥ叆浜嗘垜镄勫姏閲忕殑妤撴柟濉?);
    } else if (status == 2) {
        qm.sendNextPrev("阃椤€嬫柟濉婃槸鍙や唬镦夐噾琛揿斧瑁戒綔镄?板栫劧镙规摎浣跨敤娆℃暩闇€瑕佺殑妤揿梗链冮€愭几澧炲姞,浣嗛€椤€嬫柟濉婃槸涓嶆渻阆沧柤浠ュ墠鏀厤妤扑箣璋风殑鍚勭ó鏂瑰镄?");
    } else if (status == 3) {
        qm.sendNextPrev("鐝惧湪瑕侀吨鏂版敞鍏ユ垜镄勫姏閲?璜嬫敹涓?.");
    } else if (status == 4) {
        if (!complete) {
            qm.gainItemPeriod(3994895, 1, 12, true, "");
            qm.completeQuest();
            complete = true;
        }
        qm.sendNextPrev("锲犵偤鍦ㄧ灛闁撶Щ鍕曚腑锲犳铹℃硶娉ㄥ叆澶锷涢噺,浣呜珛涓嶈鎿斿绩.", 1);
    } else if (status == 5) {
        qm.sendNextPrev("鑻ヨΚ镊缔鏉戣帄镓炬垜,鎴戞渻瑁戒綔鎿佹湁镟村锷涢噺镄勬柟濉婄郸浣?", 1);
    } else if (status == 6) {
        qm.dispose();
    }
}