var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("浣犲ソ锛屾垜链戞槸寰堜箙浠ュ墠镟剧稉鏀厤妤扑箣璋风殑板栾优鑳庤垒灏肩应鍜岃垒灏肩﹩鏂?);
    } else if (status == 1) {
        qm.sendNextPrev("镦╀汉镄勬墦鎷涘懠绂瘈灏卞厛鎷嬮枊鍚?!!鍕囧＋阒匡紝浣犳兂瑕佹洿寮峰ぇ镄勫姏閲忓棊?", 4, 9330355);
    } else if (status == 2) {
        qm.sendNextPrev("鏀炬鍚?鑹惧凹绌嗘柉.鍏夋槸涓€鍏╁€嫔媷澹槸铹℃硶鎶垫姉榛戞殚鎯″嫝锷涚殑...");
    } else if (status == 3) {
        qm.sendNextPrev("#i3800647#\r\n鑹惧凹绌嗘柉鎯宠阃忛亷镊繁镄勬柟濉婂壍阃犲皯鏁稿挤澶х殑凿佽嫳鍕囧＋...");
    } else if (status == 4) {
        qm.sendNextPrev("#i3800646#\r\n浣嗙浉鍙岖殑鑹惧凹鐟兂钟х壊镊繁镄勫姏閲忥紝鎻愪緵鏂瑰绲︽涔嬭胺镄勬墍链夊媷澹?.. ", 4, 9330355);
    } else if (status == 5) {
        qm.sendNextPrev("#i3800648#鑹惧凹鐟?..浣犻€欐ǎ钟х壊镊繁镄勫姏閲?鍗冭惉涓嶈鍝ぉ链掍笅浜?..", 4, 9330355);
    } else if (status == 6) {
        qm.sendNextPrev("板栫劧鎴戝€戞兂瑕佸皪鎶楅粦鏆楁儭鍕㈠姏镄勫绩閮芥槸涓€妯ｇ殑,浣嗘柟娉曟湁涓€榛炰笉鍚?..\r\n鍕囧＋鍟?..璜嬩綘绛夎宪...鎴戞渻鍐崭缔镓句綘镄?");
    } else if (status == 7) {
        qm.completeQuest();
        qm.dispose();
    }
}