var status = 0;
var typede = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (cm.getBossLog("30元礼包", 1) == 1) {
            var vipstr = "#g已领取#k";
        } else {
            var vipstr = "#k未领取#k";
        }
        if (cm.getBossLog("50元礼包", 1) == 1) {
            var vipstr1 = "#g已领取#k";
        } else {
            var vipstr1 = "#k未领取#k";
        }
        if (cm.getBossLog("100元礼包", 1) == 1) {
            var vipstr2 = "#g已领取#k";
        } else {
            var vipstr2 = "#k未领取#k";
        }
        if (cm.getBossLog("300元礼包", 1) == 1) {
            var vipstr3 = "#g已领取#k";
        } else {
            var vipstr3 = "#k未领取#k";
        }
        if (cm.getBossLog("500元礼包", 1) == 1) {
            var vipstr4 = "#g已领取#k";
        } else {
            var vipstr4 = "#k未领取#k";
        }
        if (cm.getBossLog("800元礼包", 1) == 1) {
            var vipstr5 = "#g已领取#k";
        } else {
            var vipstr5 = "#k未领取#k";
        }
        if (cm.getBossLog("1000元礼包", 1) == 1) {
            var vipstr6 = "#g已领取#k";
        } else {
            var vipstr6 = "#k未领取#k";
        }
        if (cm.getBossLog("1500元礼包", 1) == 1) {
            var vipstr7 = "#g已领取#k";
        } else {
            var vipstr7 = "#k未领取#k";
        }
        if (cm.getBossLog("2000元礼包", 1) == 1) {
            var vipstr8 = "#g已领取#k";
        } else {
            var vipstr8 = "#k未领取#k";
        }
        if (cm.getBossLog("3000元礼包", 1) == 1) {
            var vipstr9 = "#g已领取#k";
        } else {
            var vipstr9 = "#k未领取#k";
        }








        if (status == 0) {

            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追忆 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k注意事项:赞助记录每日00:00会清空,请您及时领取奖励,如没领取概不负责。\r\n24小时内已累积赞助：" + cm.get24ZZ() / 10 + " 元\r\n";
            zyms += "#L1##b查看规则说明#l\r\n";
            zyms += "#L2##b领取30元赞助奖励#l    #L3##k查看物品清单   #r状态:" + vipstr + "#l \r\n";
            zyms += "#L4##b领取50元赞助奖励#l    #L5##k查看物品清单   #r状态:" + vipstr1 + "#l\r\n";
            zyms += "#L6##b领取100元赞助奖励#l   #L7##k查看物品清单   #r状态:" + vipstr2 + "#l\r\n";
            zyms += "#L8##b领取300元赞助奖励#l   #L9##k查看物品清单   #r状态:" + vipstr3 + "#l\r\n";
            zyms += "#L10##b领取500元赞助奖励#l   #L11##k查看物品清单   #r状态:" + vipstr4 + "#l\r\n";
            zyms += "#L12##b领取800元赞助奖励#l   #L13##k查看物品清单   #r状态:" + vipstr5 + "#l\r\n";
            zyms += "#L14##b领取1000元赞助奖励#l  #L15##k查看物品清单   #r状态:" + vipstr6 + "#l\r\n";
            zyms += "#L16##b领取1500元赞助奖励#l  #L17##k查看物品清单   #r状态:" + vipstr7 + "#l\r\n";
            zyms += "#L18##b领取2000元赞助奖励#l  #L19##k查看物品清单   #r状态:" + vipstr8 + "#l\r\n";
            zyms += "#L20##b领取3000元赞助奖励#l  #L21##k查看物品清单   #r状态:" + vipstr9 + "#l\r\n";
            cm.sendSimple(zyms);









        } else if (selection == 1) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助规则>#n\r\n进入官方网站www.lovemxd.net充值完毕后登陆游戏点击“拍卖”提取金卷即可获取赞助记录。");
            cm.dispose();

        } else if (selection == 2) {
            if (cm.get24ZZ() < 299) {
                cm.sendOk("您24小时内累积赞助不足30元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.get24ZZ() / 10 + "元。");
            } else if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(5) < 1) {
                cm.sendOk("背包装备栏、消耗栏和特殊栏有1个以上的空间才可以领取。");
            } else if (cm.getBossLog("30元礼包", 1) < 1) {
                cm.gainItem(1142328, 1);
                cm.gainItem(2049100, 20);
                cm.gainItem(5062000, 10);
                cm.setBossLog("30元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 3) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n30元赞助奖励物品清单：\r\n#v1142328#永久使用权 #v2049100#x20 #v5062000#x10");
            cm.dispose();


        } else if (selection == 4) {
            if (cm.get24ZZ() < 499) {
                cm.sendOk("您24小时内累积赞助不足50元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 2 || cm.getSpace(5) < 1) {
                cm.sendOk("背包装备栏、和特殊栏有2个以上的空间才可以领取。");
            } else if (cm.getBossLog("50元礼包", 1) < 1) {
                cm.gainItem(1002890, 1);
                cm.gainItem(1112244, 1);
                cm.gainItem(5062000, 15);
                cm.setBossLog("50元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 5) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n50元赞助奖励物品清单：\r\n#v1002890#x1 #v1112244#x1 #v5062000#x15");
            cm.dispose();

        } else if (selection == 6) {
            if (cm.get24ZZ() < 999) {
                cm.sendOk("您24小时内累积赞助不足99元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 2 || cm.getSpace(5) < 1) {
                cm.sendOk("背包装备栏、和特殊栏有2个以上的空间才可以领取。");
            } else if (cm.getBossLog("100元礼包", 1) < 1) {
                cm.gainItem(1112141, 1);
                cm.gainItem(1112252, 1);
                cm.gainItem(5062000, 20);
                cm.setBossLog("100元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 7) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n100元赞助奖励物品清单：\r\n#v1112141#x1 #v1112252#x1 #v5062000#x20");
            cm.dispose();



        } else if (selection == 8) {
            if (cm.get24ZZ() < 2999) {
                cm.sendOk("您24小时内累积赞助不足300元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 5 || cm.getSpace(5) < 1) {
                cm.sendOk("背包装备栏5个空间以上和特殊栏有2个以上的空间才可以领取。");
            } else if (cm.getBossLog("300元礼包", 1) < 1) {
                cm.gainItem(1702334, 1);
                cm.gainItem(1002562, 1);
                cm.gainItem(1052081, 1);
                cm.gainItem(1112146, 1);
                cm.gainItem(1112258, 1);
                cm.gainItem(5062002, 10);
                cm.setBossLog("300元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 9) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n300元赞助奖励物品清单：\r\n#v1702334#x1 #v1002562#x1 #v1052081#x1 #v1112146#x1 #v1112258#x1 #v5062002#x10");
            cm.dispose();



        } else if (selection == 10) {
            if (cm.get24ZZ() < 4999) {
                cm.sendOk("您24小时内累积赞助不足500元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
             } else if (cm.getSpace(1) < 5 || cm.getSpace(5) < 2) {
                cm.sendOk("背包装备栏5个空间以上和特殊栏有2个以上的空间才可以领取。");
            } else if (cm.getBossLog("500元礼包", 1) < 1) {
                cm.gainItem(1112247, 1);
                cm.gainItem(1112140, 1);
                cm.gainItem(1003698, 1);
                cm.gainItem(3010509, 1);
                cm.gainItem(5390013, 100);
                cm.gainItem(1112915, 1);
                cm.gainItem(5062002, 20);
                cm.setBossLog("500元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 11) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n500元赞助奖励物品清单：\r\n#v1112247#x1 #v1112140#x1 #v1003698#x1 #v3010509#x1 #v5390013#x100 #v1112915#x1 #v5062002#x20");
            cm.dispose();


        } else if (selection == 12) {
            if (cm.get24ZZ() < 7999) {
                cm.sendOk("您24小时内累积赞助不足800元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
              } else if (cm.getSpace(1) < 1 || cm.getSpace(2) < 2 || cm.getSpace(5) < 2) {
                cm.sendOk("背包装备栏5个空间以上 消耗栏2个空间以上 特殊栏2个以上空间才可以领取。");
            } else if (cm.getBossLog("800元礼包", 1) < 1) {
                cm.gainItem(5390013, 200);
                cm.gainItem(5062002, 30);
                cm.gainItem(1112915, 2);
                cm.gainItem(2049116, 10);
                cm.gainItem(2049124, 10);
                cm.setBossLog("800元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 13) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n800元赞助奖励物品清单：\r\n#v5390013#x200 #v5062002#x30 #v1112915#x2 #v2049116#x10 #v2049124#x10");
            cm.dispose();


        } else if (selection == 14) {
            if (cm.get24ZZ() < 9999) {
                cm.sendOk("您24小时内累积赞助不足1000元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 4 || cm.getSpace(2) < 3 || cm.getSpace(5) < 2) {
                cm.sendOk("背包装备栏4个空间以上 消耗栏3个空间以上 特殊栏2个以上空间才可以领取。");
            } else if (cm.getBossLog("1000元礼包", 1) < 1) {
                cm.gainItem(5390012, 100);
                cm.gainItem(1112139, 1);
                cm.gainItem(1112246, 1);
                cm.gainItem(1003697, 1);
                cm.gainItem(3010508, 1);
                cm.gainItem(2210096, 3);
                cm.gainItem(2049116, 15);
                cm.gainItem(2049124, 15);
                cm.gainItem(5062002, 40);
                cm.setBossLog("1000元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 15) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n1000元赞助奖励物品清单：\r\n#v5390012#x100 #v5062002#x40 #v1112139#x1 #v1112246#x1 #v1003697#x1 #v3010508#x1 #v2210096#x3 #v2049116#x15 #v2049124#x15");
            cm.dispose();


        } else if (selection == 16) {
            if (cm.get24ZZ() < 14999) {
                cm.sendOk("您24小时内累积赞助不足1500元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 1 || cm.getSpace(2) < 3 || cm.getSpace(4) < 2 ||  cm.getSpace(5) < 2) {
                cm.sendOk("背包装备栏1个空间以上 消耗栏3个空间以上 设置栏1个空间以上 特殊栏2个以上空间才可以领取。");
            } else if (cm.getBossLog("1500元礼包", 1) < 1) {
                cm.gainItem(5390012, 200);
                cm.gainItem(5062006, 200);
                cm.gainItem(2049116, 20);
                cm.gainItem(2049124, 20);
                cm.gainItem(2340000, 20);
                cm.gainItem(3010070, 1);
                cm.gainItem(1112915, 3);
                cm.setBossLog("1500元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 17) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n1500元赞助奖励物品清单：\r\n#v5390012#x200 #v5062006#x200 #v2049116#x20 #v2049124#x20 #v2340000#x20 #v3010070#x1 #v1112915#x3");
            cm.dispose();


        } else if (selection == 18) {
            if (cm.get24ZZ() < 19999) {
                cm.sendOk("您24小时内累积赞助不足2000元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
            } else if (cm.getSpace(1) < 3 || cm.getSpace(2) < 6 || cm.getSpace(4) < 2 ||  cm.getSpace(5) < 2) {
                cm.sendOk("背包装备栏1个空间以上 消耗栏3个空间以上 设置栏1个空间以上 特殊栏2个以上空间才可以领取。");
            } else if (cm.getBossLog("2000元礼包", 1) < 1) {
                cm.gainItem(2430865, 1);
                cm.gainItem(1112138, 1);
                cm.gainItem(1112245, 1);
                cm.gainItem(5390011, 200);
                cm.gainItem(2210097, 3);
                cm.gainItem(1003696, 1);
                cm.gainItem(3010507, 1);
                cm.gainItem(2049116, 30);
                cm.gainItem(2049124, 30);
                cm.gainItem(2340000, 30);
                cm.gainItem(5062006, 200);
                cm.gainItem(2049405, 1);
                cm.setBossLog("2000元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 19) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n2000元赞助奖励物品清单：\r\n#v2430865#x1(可兑换真·觉醒冒险之心)\r\n#v1112138#x1 #v1112245#x1 #v5390011#x200 #v2210097#x3 #v1003696#x1 #v3010507# #v2049116#x30 #v2049124#x30 #v2340000#x30 #v5062006#x300 #v2049405#x1");
            cm.dispose();



        } else if (selection == 20) {
            if (cm.get24ZZ() < 29999) {
                cm.sendOk("您24小时内累积赞助不足3000元无法领取奖励。\r\n\r\n当前累积赞助：" + (cm.get24ZZ() / 10) + "元。");
             } else if (cm.getSpace(1) < 1 || cm.getSpace(2) < 3 ||  cm.getSpace(5) < 1) {
                cm.sendOk("背包装备栏1个空间以上 消耗栏3个空间以上  特殊栏1个以上空间才可以领取。");
            } else if (cm.getBossLog("3000元礼包", 1) < 1) {
                cm.gainItem(2431993, 1);
                cm.gainItem(5390011, 1);
                cm.gainItem(2049116, 50);
                cm.gainItem(2049124, 50);
                cm.gainItem(1012174, 1);
                cm.setBossLog("3000元礼包");
                cm.sendOk("领取成功,快去查看背包吧。");
            } else {
                cm.sendOk("礼包只能领取一次,你已经领取过了。");
            }
            cm.dispose();

        } else if (selection == 21) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助奖励清单>#n\r\n3000元赞助奖励物品清单：\r\n#v2431993#x1(可兑换150职业套装)\r\n#v5390011#x300 #v2049116#x50 #v2049124#x50  #v1012174#x1 #z1012174#");
            cm.dispose();



        }

    }
}
