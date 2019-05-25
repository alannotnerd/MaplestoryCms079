/*
 * nana制作 bms冒险岛工作室所有
 * 欢迎定制各种脚本
 * OX问答副本  问题检查NPC
 */

var status = 0;
var questions = new Array("铁观音是哪里出产的名茶？\r\nO:安徽\tX:福建", //false,
        "蜂蜜用那种水冲泡更好？\r\nO:温水\tX:冰水", //true,
        "以下哪种菜系不属于中国八大菜系之列？\r\nO:鄂菜\tX:皖", //true,
        "黄瓜不宜与下列哪种食物搭配？\r\nO:番茄\tX:鸡蛋", // true,
        "黄鹤楼在什么地方？\r\nO:武汉\tX:广州", //true,
        "东方明珠是世界第几高塔？\r\nO:第四\tX:第六", //false,
        "火影忍者疾风传主角名字\r\nO:漩涡鸣人\tX:大蛇丸", //true
        "兔兔可爱吗？\r\nO:可爱\tX:非常可爱", //false
        "GTO麻辣教师是哪种类型的？\r\nO:动漫\tX动漫和电视剧", //false
        "夜间行车远光会造成什么影响？\r\nO:短暂性致盲\tX:毫无影响", //true
        "世界上最小的鸟是什么鸟？\r\nO:蜂鸟\tX:小燕子", //true
        "世界上跑得最快的是什么？\r\nO:金钱豹\tX:鸵鸟", //false
        "和谐号高铁最高时速能达到多少？\r\nO:300\tX:500", //false
        "阿苏顿马丁是什么？\r\nO:人名\tX:跑车", //false
        "LOL里的大龙叫全名叫什么？\r\nO:纳什男爵\tX:无敌大龙", //true
        "冒险岛里只有冒险家一种法师吗？\r\nO:是\tX:不是", //false
        "时速100码的汽车紧急制动需要多久能停？\r\nO:40-45秒\tX:50-60秒", //true
        "LOL里的堕落天使叫什么？\r\nO:堕天使\tX:莫甘娜", //false
        "老虎属于什么类动物？\r\nO:猫科动物\tX:爬行动物", //true
        "花儿为什么是香的？\r\nO:那是因为我\tX:那是因为你", //true
        "一直被模范从未被超越是为啥？\r\nO:太给力\tX:哥是你模仿不了的", //false
        "蒙奇?D?路飞的爷爷叫什么？\r\nO:蒙奇?D?卡普\tX:蒙奇?D?多拉格", //true
        "蒙奇?D?路飞跟谁学会的霸气？\r\nO:博雅汉库克\tX:冥王雷利", //false
        "泷泽萝拉是？\r\nO:模特\tX:日本女优", //false
        "中国死海位于哪里？\r\nO:四川\tX:重庆", //true
        "毛泽东故乡在哪里？\r\nO:长沙\tX:湘潭", //false
        "长隆水上乐园在哪里？\r\nO:广州\tX:深圳" //true
        );
var answers = new Array(false, true, true, true, true, false, true, false, false, true, true, false, false, false, true, false, true, false, true, true, false, true, false, false, true, false, true);

var em;

function start() {
    em = cm.getEventManager("OXEvent");
    if (em == null) {
        cm.sendOk("出现错误，请重新进入副本。");
    } else {
        var QuestionIndex = em.getProperty("question");
        if (QuestionIndex == null) {
            cm.sendOk("取回数据失败。");
        } else {
            CheckPlayerPosition(answers[parseInt(QuestionIndex)]);
        }
    }
}


function CheckPlayerPosition(answers) {//通过答案查看玩家的所站的位置是否正确
    var Xpos = cm.getPlayer().getTruePosition().getX();
    if (Xpos >= 150 && Xpos <= -562) {
        if (answers) {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答错误，罚你出去！");
                cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        } else {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            cm.dispose();
        }
    } else if (Xpos >= -1500 && Xpos <= -802) {//O部分
        if (answers) {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            cm.dispose();
        } else {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答错误，罚你出去！");
                cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        }
    } else {//如果是咱在中立部分，就踢他出去这个
        if (em.getProperty("OXEventState") > 5) {
            cm.warp(910000000, 0);//
            cm.sendOk("嗯……。这是一个对或错的问题，你站中间是几个意思？");
            cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10
        } else {
            cm.showEffect(false, "quest/party/wrong_kor");
            cm.playSound(false, "Party1/Failed");
            //cm.sendOk("嗯……。这是一个对或错的问题，你站中间是几个意思？");
        }
        cm.dispose();
    }
}