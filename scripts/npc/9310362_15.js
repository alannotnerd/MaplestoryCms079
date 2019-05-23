var kk = "#fEffect/CharacterEff/1112905/0/1#"; //爱心粉3
var maxLevel = 230;
var minPartySize = 1;
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			cm.sendSimple("#r#e<单人：尖兵副本>\r\n#n#k1.一人组队,230级,该任务每天一次，无法重置\r\n#r2.该任务需消耗5000点卷和200个#v4000859#\r\n3.掉落#v1202023##v1202027##v1202031##v1202035##v2430748##v4310036##v1983108##v3010831##v3010830##v3010829##v3010828##v3010827##v3010825##v3010824##v3010876##v3700049##v2022530##v2022531##v2614000##v2614001#(可交易)140-150装备\r\n"#L0#"+kk+"#d#e>>>>>>>>>#b我想执行组队任务<<<<<<<<<#l")
			} else if (status == 1) {
			    if (selection == 0) {
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("队长必须在这里。请让他和我说话。");
                    cm.dispose();
				}
			}