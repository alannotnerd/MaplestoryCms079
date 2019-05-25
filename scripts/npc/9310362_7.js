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
        if (cm.getBossLog("100元返点", 1) == 1) {
            var vipstr = "#g已领取#k";
        } else {
            var vipstr = "#k未领取#k";
        }
        if (cm.getBossLog("300元返点", 1) == 1) {
            var vipstr1 = "#g已领取#k";
        } else {
            var vipstr1 = "#k未领取#k";
        }
        if (cm.getBossLog("500元返点", 1) == 1) {
            var vipstr2 = "#g已领取#k";
        } else {
            var vipstr2 = "#k未领取#k";
        }
        if (cm.getBossLog("700元返点", 1) == 1) {
            var vipstr3 = "#g已领取#k";
        } else {
            var vipstr3 = "#k未领取#k";
        }
        if (cm.getBossLog("900元返点", 1) == 1) {
            var vipstr4 = "#d已领取#k";
        } else {
            var vipstr4 = "#k未领取#k";
        }
        if (cm.getBossLog("1100元返点", 1) == 1) {                    
            var vipstr5 = "#g已领取#k";
        } else {
            var vipstr5 = "#k未领取#k";
        }
        if (cm.getBossLog("1500元返点", 1) == 1) {
            var vipstr6 = "#g已领取#k";
        } else {
            var vipstr6 = "#k未领取#k";
        }
        if (cm.getBossLog("1700元返点", 1) == 1) {
            var vipstr7 = "#g已领取#k";
        } else {
            var vipstr7 = "#k未领取#k";
        }
        if (cm.getBossLog("2000元返点", 1) == 1) {
            var vipstr8 = "#g已领取#k";
        } else {
            var vipstr8 = "#k未领取#k";
        }
        if (cm.getBossLog("2500元返点", 1) == 1) {
            var vipstr9 = "#g已领取#k";
        } else {
            var vipstr9 = "#k未领取#k";
        }
        if (cm.getBossLog("3000元返点", 1) == 1) {
            var vipstr10 = "#g已领取#k";
        } else {
            var vipstr10 = "#k未领取#k";
        }
        if (cm.getBossLog("5000元返点", 1) == 1) {
            var vipstr11 = "#g已领取#k";
        } else {
            var vipstr11 = "#k未领取#k";
        }







        if (status == 0) {
            
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追忆 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k累积赞助返点活动进行中。\r\n已累积赞助：" + (cm.getZZ() / 10) + " 元\r\n";
            zyms += "#L1##b查看规则说明#l\r\n";
            zyms += "#L2##b100元    #e>>>>>>#n  100金卷#r   状态:" + vipstr + "#l \r\n";
            zyms += "#L3##b300元    #e>>>>>>#n  300金卷#r   状态:" + vipstr1 + "#l \r\n";
            zyms += "#L4##b500元    #e>>>>>>#n  500金卷#r   状态:" + vipstr2 + "#l \r\n";
            zyms += "#L5##b700元    #e>>>>>>#n  700金卷#r   状态:" + vipstr3 + "#l \r\n";
            zyms += "#L6##b900元    #e>>>>>>#n  900金卷#r   状态:" + vipstr4 + "#l \r\n";
            zyms += "#L7##b1100元   #e>>>>>>#n  1100金卷#r  状态:" + vipstr5 + "#l \r\n";
            zyms += "#L8##b1500元   #e>>>>>>#n  1500金卷#r  状态:" + vipstr6 + "#l \r\n";
            zyms += "#L9##b1700元   #e>>>>>>#n  1700金卷#r  状态:" + vipstr7 + "#l \r\n";
            zyms += "#L10##b2000元   #e>>>>>>#n  2000金卷#r  状态:" + vipstr8 + "#l \r\n";
            zyms += "#L11##b2500元   #e>>>>>>#n  2500金卷#r  状态:" + vipstr9 + "#l \r\n";
            zyms += "#L12##b3000元   #e>>>>>>#n  3000金卷#r  状态:" + vipstr10 + "#l \r\n";
            zyms += "#L13##b5000元   #e>>>>>>#n  5000金卷#r  状态:" + vipstr11 + "#l \r\n";
            cm.sendSimple(zyms);








        } else if (selection == 1) {
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-赞助规则>#n\r\n进入官方网站www.lovemxd.net充值完毕后登陆游戏点击“拍卖”提取金卷即可获取赞助记录。");
            cm.dispose();

       } else if (selection == 2) {
            if (cm.getZZ() < 999 ) {
                cm.sendOk("您总共累积赞助不足100元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("100元返点", 1) < 1) {
                cm.addJQ(100);
                cm.setBossLog("100元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();
       
        } else if (selection == 3) {
            if (cm.getZZ() < 2999 ) {
                cm.sendOk("您总共累积赞助不足300元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("100元返点", 1) < 1) {
                cm.addJQ(300);
                cm.setBossLog("300元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();
            
        } else if (selection == 4) {
            if (cm.getZZ() < 4999 ) {
                cm.sendOk("您总共累积赞助不足500元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("500元返点", 1) < 1) {
                cm.addJQ(500);
                cm.setBossLog("500元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();    
            
        } else if (selection == 5) {
            if (cm.getZZ() < 6999 ) {
                cm.sendOk("您总共累积赞助不足700元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("700元返点", 1) < 1) {
                cm.addJQ(700);
                cm.setBossLog("700元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();   
            
        } else if (selection == 6) {
            if (cm.getZZ() < 8999 ) {
                cm.sendOk("您总共累积赞助不足900元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("900元返点", 1) < 1) {
                cm.addJQ(900);
                cm.setBossLog("900元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();      
        
         } else if (selection == 7) {
            if (cm.getZZ() < 10999 ) {
                cm.sendOk("您总共累积赞助不足1100元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("1100元返点", 1) < 1) {
                cm.addJQ(1100);
                cm.setBossLog("1100元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();     

        } else if (selection == 8) {
            if (cm.getZZ() < 14999 ) {
                cm.sendOk("您总共累积赞助不足1500元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("1500元返点", 1) < 1) {
                cm.addJQ(1500);
                cm.setBossLog("1500元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();  
        
        } else if (selection == 9) {
            if (cm.getZZ() < 16999 ) {
                cm.sendOk("您总共累积赞助不足1700元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("1700元返点", 1) < 1) {
                cm.addJQ(1700);
                cm.setBossLog("1700元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose(); 
        
        } else if (selection == 10) {
            if (cm.getZZ() < 19999 ) {
                cm.sendOk("您总共累积赞助不足2000元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("2000元返点", 1) < 1) {
                cm.addJQ(2000);
                cm.setBossLog("2000元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();     
        
        } else if (selection == 11) {
            if (cm.getZZ() < 24999 ) {
                cm.sendOk("您总共累积赞助不足2500元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("2500元返点", 1) < 1) {
                cm.addJQ(2500);
                cm.setBossLog("2500元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose(); 
            
        } else if (selection == 12) {
            if (cm.getZZ() < 29999 ) {
                cm.sendOk("您总共累积赞助不足3000元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("3000元返点", 1) < 1) {
                cm.addJQ(3000);
                cm.setBossLog("3000元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();     
        
        } else if (selection == 13) {
            if (cm.getZZ() < 49999 ) {
                cm.sendOk("您总共累积赞助不足5000元无法领取奖励。\r\n\r\n当前累积赞助：" + cm.getZZ() / 10 + "元。");
            } else if (cm.getBossLog("5000元返点", 1) < 1) {
                cm.addJQ(5000);
                cm.setBossLog("5000元返点");
                cm.sendOk("返点成功,祝您游戏愉快。");
            } else {
                cm.sendOk("你已经领取过了。");
            }
            cm.dispose();         














































        }
    }
}

