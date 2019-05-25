/*
 * 寄售系统 - LOG查询
 * 菜菜编写 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * DROP TABLE IF EXISTS `cashtradesystemlog`;
 CREATE TABLE `cashtradesystemlog` (
 `tid` int(11) NOT NULL,
 `cid` int(11) DEFAULT '0',
 `boughtByCid` int(11) NOT NULL DEFAULT '0',
 `boughtByCName` varchar(15) NOT NULL DEFAULT '0',
 `boughtTradeType` int(2) NOT NULL DEFAULT '0',
 `boughtPrice` int(11) NOT NULL DEFAULT '0',
 `boughtItemid` int(11) NOT NULL DEFAULT '0',
 `boughtDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`tid`),
 CONSTRAINT `cashtradesystemlog_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `cashtradesystem` (`id`) ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        //cm.sendOk("祝您游戏愉快!!!");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var i = 0;
        var LogRecord = cm.getConnection().prepareStatement("SELECT tid,cid,boughtByCid,boughtByCName,boughtTradeType,boughtPrice,boughtItemid,DATE_FORMAT(boughtDate,'%m月%d日') as boughtDate FROM cashtradesystemLog where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(boughtDate) and cid = " + cm.getPlayer().getId() + "").executeQuery();
        var text = "以下是您道具的贩卖讯息：\r\n#b"
        while (LogRecord.next()) {//得到记录数据
            if (LogRecord.getString("boughtTradeType") == 0) {//金币
                text += "第" + (i + 1) + "条：" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#被" + LogRecord.getString("boughtByCName") + "以" + LogRecord.getString("boughtPrice") + " 金币买走。\r\n"
            } else if (LogRecord.getString("boughtTradeType")  == 1) {//点券
                text += "第" + (i + 1) + "条：" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#被" + LogRecord.getString("boughtByCName") + "以" + LogRecord.getString("boughtPrice") + " 点券买走。\r\n"
            } else if (LogRecord.getString("boughtTradeType") == 2) {
                text += "第" + (i + 1) + "条：" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#被" + LogRecord.getString("boughtByCName") + "以" + LogRecord.getString("boughtPrice") + " 余额买走。\r\n"
            }
            i++;
        }
        if (i == 0) {
            text = "#d在7天内您没有任何寄售卖出讯息。#r\r\n本系统#e针对角色#n进行记录。\r\n如果您同一个帐号有角色卖出成功的话，请#e切换角色#n查看。";
        }
        cm.sendOk(text);
        LogRecord.close();
        cm.dispose();
    }
}