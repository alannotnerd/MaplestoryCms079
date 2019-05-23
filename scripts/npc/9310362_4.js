//追忆平台直充提取脚本
var a = 0;
var type_1 = 0;
var type_2 = 0;
var FeeId;
var Text1;

function start() {
    a = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            a++;
        } else {
            a--;
        }


        switch (a)
        {
            case -1:
                cm.dispose();
                break;
            case 0:
                var zyms = "#e<#v3991051# #v3991050# #v3991038# #v3991044#-平台金卷提取NPC>#n\r\n#n#e#r累积金卷值可以领取丰厚的礼包哦~~~#n\r\n#k您当前账号金卷信息：\r\n#b金卷：#r" + cm.getJQ() + " #k张 总共赞助：#r" + cm.getZZ() + " #k元\r\n";
                zyms += "#b#L0#赞助追忆\r\n";
                zyms += "#b#L5#金卷规则#l\r\n";
                zyms += "#b#L2#提取平台充值的金卷#l\r\n";
                //zyms += "#b#L3#查询充值卡密#l\r\n"; 
                //zyms += "#b#L4#查看充值记录#l\r\n"; 
                zyms += "#r#L1#金卷兑换点卷#l\r\n";
                cm.sendSimple(zyms);
                selection = 2;
                break;
            case 1:
                {
                    switch (selection) {
                        case 0://赞助网站地址
                            cm.openWeb("http://www.lovemxd.net/");
                            cm.dispose();
                            break;
                        case 1://兑换点卷
                            cm.dispose();
                            cm.openNpc(9310362, 5);
                            break;
                        case 2://充值卡密
                            var dum = cm.getPlayer().getCybDummy();
                            if (dum > 0) {
                                cm.sendYesNo("有 #e#b" + dum + "#n#k 个金卷没有提取，现在提取出来吗？");
                                a = 1;
                                type_1 = 1;
                            } else {
                                cm.sendOk("#e没有从平台充值\r\n从平台充值后，在这里将充值的金卷提取出来。");
                                cm.dispose();
                            }
                            break;
                        case 3://查询卡密

                            cm.sendOk("功能不再使用");
                            cm.dispose();
                            break;
                        case 4://充值记录
                            {
                                Text = "\t\t\t\t#b全透明化公开#k\r\n";
                                Text += "========在这里你可以了解充值记录========#b\r\n";
                                //Text += "#L0#查询充值最多的玩家#l\r\n";
                                Text += "#L1#查询自己的充值记录#l\r\n";
                                Text += "#L2#查询收入情况#l\r\n\r\n";
                                Text += "#k#L3#上一页.#l  #L4#离开.#l";
                                cm.sendSimple(Text);
                                a = 1;
                                type_1 = 3;
                            }
                            break;
                        case 5://金卷规则
                            cm.sendOk("\r\n#e<#v3991051# #v3991050# #v3991038# #v3991044#-金卷规则>#n\r\n金卷是#b追忆MS#k游戏通用货币,它的用处\r\n1、可以兑换点卷 点卷比例：1=1000 \r\n2、可以在市场22洞处购买现金商城的物品 \r\n3、可以参加金卷现金抽奖\r\n4、可以上ZYMS金卷值排行榜(获得名次有丰富的奖励)");
                            cm.dispose();
                            break;
                    }
                }
                break;
            case 2://第二步
                {
                    switch (type_1)
                    {
                        case 1://充值处理
                            {
                                var tran = cm.getPlayer().tranCyb();
                                cm.addJQ(tran);
                                if (tran > 0) {
                                    cm.sendOk("恭喜您，#e#b" + tran + "#n#k 个金卷已经成功提取出来。");
                                    cm.dispose();
                                } else {
                                    cm.sendOk("提取失败，请再试一次，或联系管理员");
                                    cm.dispose();
                                }
                            }
                            break;
                        case 2://查询卡密
                            {
                                FeeId = cm.getText();
                                if (cm.getChar().GetPayClip(FeeId) == 0)
                                {
                                    cm.sendOk("卡密已使用或不存在!");
                                    cm.dispose();
                                } else if (cm.getChar().GetPayClip(FeeId) == 1)
                                {
                                    //进入下一项
                                    cm.sendYesNo("你查询的卡密为:" + FeeId + " | 面额为:" + cm.getChar().GetPayClipMoney(FeeId) + ",\r\n是否确认充值??");
                                    a = 2;
                                    type_1 = 1;
                                }
//                        else if(cm.getChar().GetPayClip(FeeId) == 1)
//                        {
//                            cm.sendOk("卡密已使用!");
//                            cm.dispose();
//                        }
                            }
                            break;
                        case 3:
                            {
                                switch (selection)
                                {
                                    case 1:
                                        {
                                            cm.sendOk("已关闭\r\n");
                                            cm.dispose();
                                        }
                                        break;
                                    case 2:
                                        {
                                            cm.sendOk("未添加!!");
                                            cm.dispose();
                                        }
                                    case 3:
                                        {
                                            cm.sendNext("好了,请按下一页.就可以回到上一页了!");
                                            a = -1;
                                        }
                                        break;
                                    case 4:
                                        {
                                            cm.dispose();
                                        }
                                        break;

                                }
                            }
                            break;
                    }
                }
                break;
            case 3://第三个项
                {
                    switch (type_1)
                    {
                        case 1:
                            {
                                cm.sendOk("充值成功!!");
                                cm.getChar().SetPayClip(cm.getChar().getName(), FeeId);
                                cm.dispose();
                            }
                            break;
                    }

                    cm.dispose();
                }
                break;
        }
    }//status
}