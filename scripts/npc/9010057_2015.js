var status;
var text;
var basermb = 188;

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
        else {
            cm.dispose();
            return;
        }


        if (status == 0) {
            text = "\t\t\t\t#r#e- 2015羊年全民新春礼包 -#k\r\n\r\n";
            text += "\t天涯迎来新的一年，感谢大家的陪伴，尽管目前我们刚开服不到一个月，游戏里总会有这样那样的问题出现，最近也因管理不善导致游戏更新进度缓慢，希望大家能够谅解，我们会尽快调整好工作状态，像我们独一无二的开场踩蜗牛副本那样，给大家更多惊喜，感谢大家的支持，#r祝大家在新的一年里身体健康，万事如意，大发洋财！特此送上红包一份，还望笑纳！\r\n\r\n";
            text += "\r\n\r\n#L0##b领取新年红包#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (cm.getBossLogAcc("2015新年红包") == -1) {
                cm.sendOk("您已经领取过新年红包了，祝你游戏愉快，新年快乐~");
                cm.dispose();
                return;
            }
			if (cm.getPlayer().getTotalOnlineTime() < 10)
			{
				cm.sendOk("累计在线时间不足1000分钟,无法领取红包.");
				cm.dispose();
				return;
			}
            cm.setBossLogAcc("2015新年红包", -2);
            var randomrmb = Math.floor(Math.random() * 811 + basermb)
            //cm.gainRMB(randomrmb);
			cm.addHyPay(-randomrmb);
            cm.sendOk("恭喜您领取到#r" + randomrmb + "#k元天涯币等价红包！祝您游戏愉快！");
            cm.worldMessage(0x19, "[2015羊年红包] : 恭喜 " + cm.getName() + " 领取到了 " + randomrmb + " 天涯币的2015羊年新春红包！");
            cm.dispose();
        }
    }
}
