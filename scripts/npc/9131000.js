var status = -1;

function start() {
    switch (cm.getMapId()) {
        case 807100003:
            action(1, 0, 0);
            break;
        default:
            cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (cm.getMapId()) {
        case 807100003:
            if (status == 0) {
                cm.sendSangokuTalk("喔啦啦，呼呼… 去抓老虎的路上遇到了鹿，看打扮不像是织田信长所属的武装，怎麽会来到本能寺呀？", 9131000, false, true);
            } else if (status == 1) {
                cm.sendNextPrevS("(与温柔的外貌或者语气不同感觉一股杀气… 是织田信长所属的将帅吗？)", 3);
            } else if (status == 2) {
                cm.sendNextPrevS("我是松山家族的山崎伴信的大儿子剑斗！ 我来是为了主家和一个家族报仇找回公主殿下 ！", 3);
            } else if (status == 3) {
                cm.sendSangokuTalk("松山，松山… 好陌生的名字，当然若是不存在的名字记它又有什麽意义。", 9131000, true, true);
            } else if (status == 4) {
                cm.sendNextPrevS("看你那傲慢且旁若无人的态度，不用知道名字也能肯定是魔王的手下，那麽我和切开云雾之剑也不用在犹豫啦。", 3);
            } else if (status == 5) {
                cm.sendNextPrevS("现在也不晚，想报上名字尽管报，这将是你在这个世界的最後的声音。", 3);
            } else if (status == 6) {
                cm.sendSangokuTalk("是喔，没必要知道名字啦。", 9131007, true, true);
            } else if (status == 7) {
                cm.spawnNPCRequestController(9131007, 135, 30);
                cm.setNPCSpecialAction(9131007, "summon");
                cm.sendNextPrevS("信玄！", 3);
            } else if (status == 8) {
                cm.sendSangokuTalk("看你就知道这次混战从哪里开始的，难道不是吗？四天王，明智光秀！", 9131007, true, true);
            } else if (status == 9) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/0", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 10) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/3", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 11) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/4", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 12) {
                cm.sendSangokuTalk("喔啦啦，呼呼… 果然武田信玄名不虚传呀，第一眼就知道我的真实身分，连我要谋反的事情也知道了。 ", 9131000, false, true);
            } else if (status == 13) {
                cm.sendSangokuTalk("第一次亲自见你，但是根据我听到的传闻你不是那种可以在别人手下很长时间的人，怎麽样，若是把剑对准原来的主人，那麽考虑一下要不要联手啊？", 9131007, true, true);
            } else if (status == 14) {
                cm.sendNextPrevS("信玄，就是那家伙把松山烧了！怎麽可以跟大仇人联手！ 明智光秀觉悟吧！", 3);
            } else if (status == 15) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/5", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 1000);
            } else if (status == 16) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/6", 0, -100, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 17) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/7", 0, -100, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 18) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/8", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 19) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/9", 0, -100, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 20) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/10", 0, 0, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 21) {
                cm.getDirectionInfo(3, 1);
                cm.getDirectionInfo(1, 1300);
            } else if (status == 22) {
                cm.getDirectionInfo(3, 0);
                cm.getDirectionInfo(1, 1300);
                cm.getDirectionInfo(0, 1033, 0);
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/11", 0, -100, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 23) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/12", 0, -100, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 24) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/balloonMsg/13", 0, 150, -120, 0, 0);
                cm.getDirectionInfo(1, 2000);
            } else if (status == 25) {
                cm.setNPCSpecialAction(9131007, "attack");
                cm.getDirectionInfo(1, 300);
            } else if (status == 26) {
                cm.getDirectionInfo("Effect/DirectionJP3.img/effect/kenjiTuto/shingenAttack/0", 0, 0, 0, 0, 0);
                cm.getDirectionInfo(1, 400);
            } else {
                cm.EnableUI(0);
				cm.removeNPCRequestController(9131007);
                cm.dispose();
                cm.warp(807100005, 0);
            }
            break;
    }
}