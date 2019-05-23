/*
抽奖副本
*/
var status = 0;
var psrw = Array(
Array(3010009, 1), 
Array(3010118, 1), 
Array(3010322, 1), 
Array(3012010, 1), 
Array(3010373, 1), 
Array(3010547, 1), 
Array(3010552, 1), 
Array(3010574, 1), 
Array(3012006, 1), 
Array(3013001, 1),
Array(3013001, 1),
Array(3010049, 1),
Array(3010050, 1),
Array(3010057, 1),
Array(3010068, 1),
Array(3010098, 1),
Array(3010114, 1),
Array(3010124, 1),
Array(3010125, 1),
Array(3010137, 1),
Array(3010142, 1),
Array(3010156, 1),
Array(3010146, 1),
Array(3010592, 1),
Array(3010603, 1),
Array(3010604, 1),
Array(3010605, 1),
Array(3010657, 1),
Array(3010574, 1), //
Array(3012006, 1), 
Array(3013001, 1),
Array(3013001, 1),
Array(3010049, 1),
Array(3010050, 1),
Array(3010057, 1),
Array(3010068, 1),
Array(3010098, 1),
Array(3010114, 1)
);
var rand = Math.floor(Math.random() * psrw.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你是否有1000个#r#z4310091##k,如果你有将可以在我这里抽奖,我包包里面有以下物品：\r\n(稀有椅子/ 获得概率：小)\r\n#v3012025##v3010879##v3010592##v3010877##v3010689##v3010832##v3010829##v3010696##v3010788#\r\n(普通椅子/ 获得概率：大)\r\n#v3010009##v3010118##v3010322##v3012010##v3010373##v3010754##v3010552##v3010574##v3012006##v3013001##v3010049##v3010050##v3010057##v3010068##v3010098##v3010114##v3010124##v3010125##v3010137##v3010142##v3010156##v3010146##v3010603##v3010604##v3010605##v3010657##v3010794#");
    } else if (status == 1) {
          if (cm.haveItem(4310091, 1000) == false) {
		cm.sendOk("你没有1000个#v4310091##z4310091#");
		cm.dispose();
         } else if (cm.getSpace(1) < 1 && cm.getSpace(2) < 1 && cm.getSpace(3) < 1 && cm.getSpace(4) < 1 && cm.getSpace(5) < 1) {
		cm.sendOk("你保证你背包的每一栏都有空位");
		cm.dispose();
            } else {
	   var ii = cm.getItemInfo();
	   cm.gainItem(psrw[rand][0],+psrw[rand][1]); //随机这个道具
	   cm.gainItem(4310091,-1000); //减少1个使用的这个道具
	   cm.sendOk("获取了 #v"+psrw[rand][0]+"# "+psrw[rand][1]+"个")
	cm.channelMessage(0x18, "『家园守卫』" + " : " + "[" + cm.getChar().getName() + "]获得了" + psrw[rand][1] + "个<" + ii.getName(psrw[rand][0]) + ">,快去挑战吧");
	   cm.dispose(); 
	}
		}
		}
