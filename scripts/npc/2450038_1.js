importPackage(java.util);
importPackage(net.sf.cherry.client);
importPackage(net.sf.cherry.server);


var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";
var zzz = "#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";



var fsdj = Array(
    Array(1112745,10000,"未定义","永久"),//幻影守护之戒     -没动过
    Array(1112283,10000,"未定义","永久"),//狗狗聊天戒指(白)
    Array(1112171,10000,"未定义","永久"),//狗狗名片戒指(白)
    Array(1112268,10000,"未定义","永久"),//猪猪聊天戒指
    Array(1112156,10000,"未定义","永久"),//猪猪名片戒指
    Array(1112238,15000,"未定义","永久"),//水墨花聊天戒指
    Array(1112135,15000,"未定义","永久"),//水墨花名片戒指
    Array(1112294,20000,"未定义","永久"),//云朵羊咩咩聊天戒指
    Array(1112181,20000,"未定义","永久"),//云朵羊咩咩名片戒指
    Array(1112822,20000,"未定义","永久"),//梦幻悬浮戒指
    Array(1012179,2000,"未定义","永久"),//鹿鼻子
    Array(1012161,2000,"未定义","永久"),//见钱眼开
    Array(1012160,2000,"未定义","永久"),//烈焰红唇
    Array(1012131,2000,"未定义","永久"),//好白的牙
    Array(1012054,2000,"未定义","永久"),//绝望
    Array(1012100,2000,"未定义","永久"),//粉色粉扑
    Array(1012099,2000,"未定义","永久"),//蓝色腮红
    Array(1012075,2000,"未定义","永久"),//满头大汗
    Array(1012073,2000,"未定义","永久"),//西瓜雪糕
    Array(1012071,2000,"未定义","永久"),//巧克力雪糕
    Array(1012053,2000,"未定义","永久"),//愤怒
    Array(1012050,2000,"未定义","永久"),//科学怪人面具
    Array(1012049,2000,"未定义","永久"),//怪物面具
    Array(1012044,2000,"未定义","永久"),//木乃伊口罩
    Array(1012058,2000,"未定义","永久"),//愤怒
    Array(1012059,2000,"未定义","永久"),//科学怪人面具
    Array(1012060,2000,"未定义","永久"),//怪物面具
    Array(1012061,2000,"未定义","永久")//木乃伊口罩

    );


 


var zsdj = Array(
    Array(1112745,10000,"未定义","永久"),//幻影守护之戒-   -没动过
    Array(1112283,10000,"未定义","永久"),//狗狗聊天戒指(白)
    Array(1112171,10000,"未定义","永久"),//狗狗名片戒指(白)
    Array(1112181,20000,"未定义","永久")//云朵羊咩咩名片戒指
    );  

var fxdj = Array(
    Array(3010163,2000,"未定义","10天",60000 * 60 * 24 * 10,1)//满月椅子-没动过
    );

var gsdj = Array(
    Array(5211047,500,"未定义",1),//双倍3小时  -没动过
    Array(5210000,1000,"未定义",1),//双倍一天
    Array(5211060,500,"未定义",1),//三倍2小时
    Array(5360014,500,"未定义",1),//双倍3小时
    Array(5360015,1000,"未定义",1),//双倍1天
    Array(5390000,1000,"未定义",1),//炽热情景喇叭
    Array(5390001,1000,"未定义",1),//绚烂情景喇叭
    Array(5390002,1000,"未定义",1),//爱心情景喇叭
    Array(5390003,1500,"未定义",1),//新年庆祝喇叭1
    Array(5390004,1500,"未定义",1),//新年庆祝喇叭2
    Array(5390005,1500,"未定义",1)//小老虎情景喇叭
    );  


var hddj = Array(
    Array(5360014,300,"3小时权",60000 * 60 * 3 * 1,1),//-没动过
    Array(5360014,1000,"1天权",60000 * 60 * 24 * 1,1),
    Array(5211047,200,"3小时权",60000 * 60 * 3 * 1,1)
    );

var tywq = Array(
    Array(1702523,9999,"未定义","永久"),//晴日彩虹
    Array(1702520,9999,"未定义","永久"),//彩虹泡沫
    Array(1702426,9999,"未定义","永久"),//暴风领主
    Array(1702565,9999,"未定义","永久"),//死亡之刃
    Array(1702550,9999,"未定义","永久"),//桃太郎武器
    Array(1302106,9999,"未定义","永久"),//燃烧的冰焰刀
    Array(1702559,9999,"未定义","永久"),//泰迪小伙伴(白)
    Array(1702560,9999,"未定义","永久"),//泰迪小伙伴(棕)
    Array(1702538,9999,"未定义","永久"),//露珠武器
    Array(1702504,9999,"未定义","永久")//冰封之心
    ); 

var jzls = Array(
    Array(1112745,10000,"未定义","永久"),//幻影守护之戒  
    Array(1112283,10000,"未定义","永久"),//狗狗聊天戒指(白)
    Array(1112171,10000,"未定义","永久"),//狗狗名片戒指(白)
    Array(1112268,10000,"未定义","永久"),//猪猪聊天戒指
    Array(1112156,10000,"未定义","永久"),//猪猪名片戒指
    Array(1112238,15000,"未定义","永久"),//水墨花聊天戒指
    Array(1112135,15000,"未定义","永久"),//水墨花名片戒指
    Array(1112294,20000,"未定义","永久"),//云朵羊咩咩聊天戒指
    Array(1112181,20000,"未定义","永久"),//云朵羊咩咩名片戒指
    Array(1112822,20000,"未定义","永久"),//梦幻悬浮戒指
    Array(1012179,2000,"未定义","永久"),//鹿鼻子
    Array(1012161,2000,"未定义","永久"),//见钱眼开
    Array(1012160,2000,"未定义","永久"),//烈焰红唇
    Array(1012131,2000,"未定义","永久"),//好白的牙
    Array(1012054,2000,"未定义","永久"),//绝望
    Array(1012100,2000,"未定义","永久"),//粉色粉扑
    Array(1012099,2000,"未定义","永久"),//蓝色腮红
    Array(1012075,2000,"未定义","永久"),//满头大汗
    Array(1012073,2000,"未定义","永久"),//西瓜雪糕
    Array(1012071,2000,"未定义","永久"),//巧克力雪糕
    Array(1012053,2000,"未定义","永久"),//愤怒
    Array(1012050,2000,"未定义","永久"),//科学怪人面具
    Array(1012049,2000,"未定义","永久"),//怪物面具
    Array(1012044,2000,"未定义","永久"),//木乃伊口罩
    Array(1012058,2000,"未定义","永久"),//愤怒
    Array(1012059,2000,"未定义","永久"),//科学怪人面具
    Array(1012060,2000,"未定义","永久"),//怪物面具
    Array(1012061,2000,"未定义","永久")//木乃伊口罩
    );


var xzst = Array(
    Array(1003269,10000,"未定义","永久"),//天蓝爱心帽    -没动过
    Array(1004029,20000,"未定义","永久"),//北极熊无边帽
    Array(1004028,20000,"未定义","永久"),//黄猫无边帽
    Array(1004027,20000,"未定义","永久"),//白猫无边帽
    Array(1004026,20000,"未定义","永久")//黑猫无边帽
    );



var ehys = Array(
    Array(1022122,8888,"未定义","永久"),//DJ眼镜      -没动过
    Array(1032029,8888,"未定义","永久"),//925银耳环
    Array(1032181,8888,"未定义","永久"),//杜鹃花耳环
    Array(1032094,8888,"未定义","永久"),//胡萝卜耳
    Array(1032088,8888,"未定义","永久"),//体力猎犬耳环
    Array(1032145,8888,"未定义","永久")//螃蟹耳环
    );


var pfmz = Array(
    Array(1003269,10000,"未定义","永久"),//天蓝爱心帽    
    Array(1004029,20000,"未定义","永久"),//北极熊无边帽
    Array(1004028,20000,"未定义","永久"),//黄猫无边帽
    Array(1004027,20000,"未定义","永久"),//白猫无边帽
    Array(1004026,20000,"未定义","永久")//黑猫无边帽
       );


var bztj = Array(
        Array(1702302,5000,"未定义","永久"),//杯具"),----本周推举
        Array(1702303,5000,"未定义","永久"),//牛奶瓶"),
        Array(1702155,5000,"未定义","永久"),//绚丽彩虹"),
        Array(1070031,5000,"未定义","永久"),//阿尔卑斯少年鞋"),
        Array(1702341,5000,"未定义","永久"),//多味棒棒糖"),
        Array(1072337,5000,"未定义","永久"),//喜洋洋拖鞋"),
        Array(1042142,5000,"未定义","永久"),//彩虹条背心"),
        Array(1042104,5000,"未定义","永久"),//小绿叶T恤"),
        Array(1041127,5000,"未定义","永久"),//爱心背心"),
        Array(1042105,5000,"未定义","永久"),//小红叶T恤"),
        Array(1041142,5000,"未定义","永久"),//巨星蛋糕吊带"),
        Array(1061148,5000,"未定义","永久"),//巨星粉色短裙"),
        Array(1061007,5000,"未定义","永久"),//红迷你裙"),
        Array(1061001,5000,"未定义","永久"),//蓝超短裙"),
        Array(1061126,5000,"未定义","永久"),//白色超短裙"),
        Array(1061067,5000,"未定义","永久"),//热裤女"),
        Array(1062093,5000,"未定义","永久"),//嫩绿休闲短裤"),
        Array(1002995,5000,"未定义","永久"),//皇家海军帽"),
        Array(1052209,5000,"未定义","永久"),//皇家海军制服"),
        Array(1003265,5000,"未定义","永久"),//爱心天蓝墨镜"),
        Array(1052724,5000,"未定义","永久"),//小马乖乖套服"),
        Array(1050293,5000,"未定义","永久"),//海滩帅锅装"),
        Array(1051180,5000,"未定义","永久"),//水兵服女"),
        Array(1042198,5000,"未定义","永久"),//彩虹T恤 "),
        Array(1050152,5000,"未定义","永久"),//水兵服男"),
        Array(1000061,5000,"未定义","永久"),//阿尔卑斯少年帽"),
        Array(1050256,5000,"未定义","永久"),//阿尔卑斯少年套服"),
        Array(1002943,5000,"未定义","永久"),//水兵帽"),
        Array(1050210,5000,"未定义","永久"),//蓝天小背带服"),
        Array(1051256,5000,"未定义","永久"),//蓝色小背带裙"),
        Array(1052031,5000,"未定义","永久"),//小少爷服"),
        Array(1082057,5000,"未定义","永久"),//棒球手套"),
        Array(1062054,5000,"未定义","永久"),//南瓜裤"),
        Array(1003867,5000,"未定义","永久"),//神射太阳帽"),
        Array(1002568,5000,"未定义","永久"),//手工编织发夹"),
        Array(1003461,5000,"未定义","永久"),//玫瑰秀秀"),
        Array(1003520,5000,"未定义","永久"),//可爱丝线发"),
        Array(1003401,5000,"未定义","永久"),//黑暗伊卡尔特"),
        Array(1003141,5000,"未定义","永久"),//稻草编织帽"),
        Array(1072373,5000,"未定义","永久"),//炫紫彩虹鞋"),
        Array(1004028,5000,"未定义","永久"),//黄猫无边帽"),
        Array(1004027,5000,"未定义","永久"),//白猫无边帽"),
        Array(1062094,5000,"未定义","永久"),//休闲夏日短裤"),
        Array(1003269,5000,"未定义","永久"),//天蓝爱心帽"),
        Array(1702289,5000,"未定义","永久"),//皇家海军旗帜"),
        Array(1002890,5000,"未定义","永久"),//丝带发箍蓝色"),
        Array(1002888,5000,"未定义","永久"),//丝带发箍红"),
        Array(1050232,5000,"未定义","永久"),//甘菊下午茶man"),
        Array(1051282,5000,"未定义","永久"),//迷迭香下午茶"),
        Array(1003250,5000,"未定义","永久"),//周年音符红宝石"),
        Array(1003249,5000,"未定义","永久"),//周年音符黄晶"),
        Array(1003256,5000,"未定义","永久"),//周年音符绿色"),
        Array(1003255,5000,"未定义","永久"),//周年音符紫色"),
        Array(1042236,5000,"未定义","永久"),//苹果绿毛衣"),
        Array(1042275,5000,"未定义","永久"),//青蛙雨衣"),
        Array(1042277,5000,"未定义","永久"),//流星雨T恤"),
        Array(1062067,5000,"未定义","永久"),//夏日七分牛仔裤"),
        Array(1062072,5000,"未定义","永久"),//BAND牛仔裤"),
        Array(1052536,5000,"未定义","永久"),//水手装"),
        Array(1051382,5000,"未定义","永久"),//天生购物狂"),
        Array(1051387,5000,"未定义","永久"),//春游连衣裙"),
        Array(1003163,5000,"未定义","永久"),//福尔摩斯帽子"),
        Array(1004190,5000,"未定义","永久"),//微笑旋律耳机"),
        Array(1042252,5000,"未定义","永久"),//高尔夫无袖T恤
        Array(1102705,5000,"未定义","永久")//背着海鸥去旅行
    );



var qc = Array(
    Array(1902001,0,"未定义","永久"),//银色野猪---骑宠添加位
    Array(1902002,0,"未定义","永久"),//赤羚龙
    Array(1912000,0,"未定义","永久"),//皮鞍子
    Array(1902005,2000,"未定义","永久"),//提提阿纳
    Array(1902006,2000,"未定义","永久"),//提提奥
    Array(1912005,2000,"未定义","永久"),//马鞍
    Array(1902014,2500,"未定义","永久"),//玩具坦克
    Array(1912010,2500,"未定义","永久"),//玩具坦克皮鞍子
    Array(1902015,2500,"未定义","永久"),//狼神50
    Array(1902016,2500,"未定义","永久"),//狼神100
    Array(1902017,2500,"未定义","永久"),//狼神150
    Array(1902018,2500,"未定义","永久"),//狼神200
    Array(1912011,2500,"未定义","永久"),//狼鞍子
    Array(1902019,3000,"未定义","永久"),//1鳄鱼王
    Array(1912012,3000,"未定义","永久"),//鳄鱼王马鞍
    Array(1902020,3000,"未定义","永久"),//热气球
    Array(1912013,3000,"未定义","永久"),//热气球马鞍
    Array(1902031,4000,"未定义","永久"),//骑士团战车
    Array(1912024,4000,"未定义","永久"),//骑士团战车皮鞍子
    Array(1902032,4000,"未定义","永久"),//梦魇
    Array(1912025,4000,"未定义","永久"),//梦魇皮鞍子
    Array(1902033,5000,"未定义","永久"),//机械套装
    Array(1912026,5000,"未定义","永久"),//机械套装皮鞍子
    Array(1902034,5000,"未定义","永久"),//打豆豆机器人
    Array(1912026,5000,"未定义","永久"),//打豆豆机器人皮鞍子
    Array(1902035,5000,"未定义","永久"),//蝙蝠怪
    Array(1912028,5000,"未定义","永久"),//蝙蝠怪皮鞍子
    Array(1902036,5000,"未定义","永久"),//枫叶赛车
    Array(1912029,5000,"未定义","永久"),//枫叶赛车座骑
    Array(1902037,5000,"未定义","永久"),//透明蝙蝠怪
    Array(1912030,5000,"未定义","永久"),//透明蝙蝠怪 -
    Array(1902038,5000,"未定义","永久"),//女女机车
    Array(1912031,5000,"未定义","永久"),//女女机车钥匙
    Array(1902039,5000,"未定义","永久"),//男男机车
    Array(1912032,5000,"未定义","永久"),//男男机车钥匙
    Array(1902045,5000,"未定义","永久"),//老虎只是传说
    Array(1912038,5000,"未定义","永久")//不要迷恋鞍子
    );

var wdns = Array(
    Array(1702155,10000,"未定义","永久"),//绚丽彩虹---男神
    Array(1102605,10000,"未定义","永久"),//暗炎赎罪者
    Array(1102671,10000,"未定义","永久"),//肃清者的荆翼
    Array(1102653,18888,"未定义","永久"),//兔尾巴
    Array(1000050,18888,"未定义","永久"),//薄荷雪水晶
    Array(1050227,10000,"未定义","永久"),//薄荷雪套服
    Array(1042345,20000,"未定义","永久")//喜羊羊上衣
    );

var nvshen = Array(
    Array(1052306,10000,"未定义","永久"),//雪姬和服----女神
    Array(1003133,10000,"未定义","永久"),//雪姬蝴蝶结
    Array(1051278,10000,"未定义","永久"),//樱桃雪套服
    Array(1001076,20000,"未定义","永久"),//樱桃雪水晶
    Array(1042346,20000,"未定义","永久")//美羊羊花边裙
    );

var status = 0;
var xx = -1;
var jiage = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("#b好的,下次再见.");
        cm.dispose();
    } else {

        if (mode == 0) {
            cm.sendOk("#b好的,下次再见.");
            cm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        //---------------------------------------------------------------------------------

        if (status == 0) {

            var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区,\r\n\r\n";

            add += "   您当前位置:#b商城首页#k#r\r\n\r\n\r\n";

            add += "" + sss + "\r\n   ";

            add += "#L0##r点卷商城#l ";

            cm.sendSimple (add);  

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        } else if (status == 1) {

            if (selection == 0) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城#k\r\n\r\n";

                add += "   当前点卷余额:#r#k\r\n\r\n#b";

                add += "#L1#法师道具#l ";

                add += "#L2#战士道具#l ";

                add += "#L3#飞侠道具#l ";

                add += "#L4#弓手道具#l\r\n\r\n ";

                add += "#L5#海盗道具#l ";

                add += "#L6#通用武器#l ";

                add += "#L7#戒指脸饰#l ";

                add += "#L8#鞋子手套#l \r\n\r\n";

                add += "#L9#耳环眼饰#l ";

                add += "#L10#披风帽子#l ";

                add += "#L11#本周推荐#l ";

                add += "#L12#骑宠#l\r\n\r\n ";

                add += "#L13#我的男神#l ";

                add += "#L14#我的女神#l \r\n";

 

                cm.sendSimple (add,2);   

            }

        //////////////////////////////////////////////////////////////////////////////////////////////////////

        } else if (status == 2) {

            if (selection == 1) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>法师道具#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < fsdj.length; i++) {	

                    add += "\r\n#L" + i + "##v" + fsdj[i][0] + "##z" + fsdj[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + fsdj[i][1] + " #d    使用期限:#r " + fsdj[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 1

            } else if (selection == 2) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>战士道具>#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < zsdj.length; i++) {	

                    add += "\r\n#L" + i + "##v" + zsdj[i][0] + "##z" + zsdj[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + zsdj[i][1] + " #d    使用期限:#r " + zsdj[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 2


            } else if (selection == 3) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>飞侠道具#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "\r\n#b";

                for (var i = 0; i < fxdj.length; i++) {

                    add += "\r\n#L" + i + "##v" + fxdj[i][0] + "##z" + fxdj[i][0] + "##l#d\r\n\r\n		";   

                    add += "需要点卷:#r " + fxdj[i][1] + " #d    使用期限:#r " + fxdj[i][3] + "#k#b";


                }


                cm.sendSimple (add,2);   

                xx = 3;

            } else if (selection == 4) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>弓手道具#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "\r\n#b";

                for (var i = 0; i < gsdj.length; i++) {

                    add += "\r\n#L" + i + "##v" + gsdj[i][0] + "##z" + gsdj[i][0] + "##l#d\r\n\r\n		";   

                    add += "需要点卷:#r " + gsdj[i][1] + " #d    购买数量:#r " + gsdj[i][3] + "#k#b";


                }


                cm.sendSimple (add,2);   

                xx = 4;

            } else if (selection == 5) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>海盗道具#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "\r\n#b";

                for (var i = 0; i < hddj.length; i++) {	

                    add += "\r\n#L" + i + "##v" + hddj[i][0] + "##z" + hddj[i][0] + "##l#d\r\n\r\n		";   

                    add += "需要点卷:#r " + hddj[i][1] + " #d    购买数量:#r " + hddj[i][2] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 5


            } else  if (selection == 6) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>通用武器#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < tywq.length; i++) {	

                    add += "\r\n#L" + i + "##v" + tywq[i][0] + "##z" + tywq[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + tywq[i][1] + " #d    使用期限:#r " + tywq[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 6


            } else  if (selection == 7) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>戒指脸饰#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < jzls.length; i++) {	

                    add += "\r\n#L" + i + "##v" + jzls[i][0] + "##z" + jzls[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + jzls[i][1] + " #d    使用期限:#r " + jzls[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 7


            } else  if (selection == 8) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>鞋子手套#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < xzst.length; i++) {	

                    add += "\r\n#L" + i + "##v" + xzst[i][0] + "##z" + xzst[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + xzst[i][1] + " #d    使用期限:#r " + xzst[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 8

            } else  if (selection == 9) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>耳环眼饰#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < ehys.length; i++) {	

                    add += "\r\n#L" + i + "##v" + ehys[i][0] + "##z" + ehys[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + ehys[i][1] + " #d    使用期限:#r " + ehys[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 9


            } else  if (selection == 10) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>披风帽子#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < pfmz.length; i++) {	

                    add += "\r\n#L" + i + "##v" + pfmz[i][0] + "##z" + pfmz[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + pfmz[i][1] + " #d    使用期限:#r " + pfmz[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 10

            } else  if (selection == 11) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>本周推荐#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < bztj.length; i++) {	

                    add += "\r\n#L" + i + "##v" + bztj[i][0] + "##z" + bztj[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + bztj[i][1] + " #d    使用期限:#r " + bztj[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 11


            } else  if (selection == 12) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>骑宠#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < qc.length; i++) {	

                    add += "\r\n#L" + i + "##v" + qc[i][0] + "##z" + qc[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + qc[i][1] + " #d    使用期限:#r " + qc[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 12


            } else  if (selection == 13) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>我的男神#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < wdns.length; i++) {	

                    add += "\r\n#L" + i + "##v" + wdns[i][0] + "##z" + wdns[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + wdns[i][1] + " #d    使用期限:#r " + wdns[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 13

           
            } else  if (selection == 14) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>我的女神#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n#b";

                for (var i = 0; i < nvshen.length; i++) {	

                    add += "\r\n#L" + i + "##v" + nvshen[i][0] + "##z" + nvshen[i][0] + "##l#d\r\n\r\n		";

                    add += "需要点卷:#r " + nvshen[i][1] + " #d    使用期限:#r " + nvshen[i][3] + "#k#b";

                }		

                cm.sendSimple (add,2);   

                xx = 14
            
            }


        ////////////////////////////////////////////////////////////////////////////////////

        } else if (status == 3) {

            if (xx == 1) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美时装#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + fsdj[selection][0] + "# #z" + fsdj[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + fsdj[selection][1] + " #d    使用期限:#r " + fsdj[selection][3] + "\r\n                              ";

                add += "   #L1#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 2) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美名片#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + zsdj[selection][0] + "# #z" + zsdj[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + zsdj[selection][1] + " #d    使用期限:#r " + zsdj[selection][3] + "\r\n                              ";

                add += "   #L2#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 3) {	

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>本周推荐#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "\r\n\r\n#d";

                add += "   物品:#v" + fxdj[selection][0] + "# #z" + fxdj[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r" + fxdj[selection][1] + " #d    使用期限:#r " + fxdj[selection][3] + "\r\n                              ";

                add += "   #L3#立即购买#l";

                cm.sendSimple (add,2);  

                jiage = selection; 


            }

            if (xx == 4) {	

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>使用消耗#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "\r\n\r\n#d";

                add += "   物品:#v" + gsdj[selection][0] + "# #z" + gsdj[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r" + gsdj[selection][1] + " #d    购买数量:#r " + gsdj[selection][3] + "\r\n                              ";

                add += "   #L4#立即购买#l";

                cm.sendSimple (add,2);  

                jiage = selection; 


            }

            if (xx == 5) {	

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>限时物品#k\r\n\r\n";

                add += "   物品:#v" + hddj[selection][0] + "# #z" + hddj[selection][0] + "##k\r\n\r\n";

                add += "   需要点卷:#r" + hddj[selection][1] + " #d        使用期限:#r " + hddj[selection][2] + "\r\n";

                add += "   #L5#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;


            }


            if (xx == 6) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美武器#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + tywq[selection][0] + "# #z" + tywq[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + tywq[selection][1] + " #d    使用期限:#r " + tywq[selection][3] + "\r\n                              ";

                add += "   #L6#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 7) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美披风#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + jzls[selection][0] + "# #z" + jzls[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + jzls[selection][1] + " #d    使用期限:#r " + jzls[selection][3] + "\r\n                              ";

                add += "   #L7#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }


            if (xx == 8) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美帽子#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + xzst[selection][0] + "# #z" + xzst[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + xzst[selection][1] + " #d    使用期限:#r " + xzst[selection][3] + "\r\n                              ";

                add += "   #L8#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 9) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>精美饰品#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + ehys[selection][0] + "# #z" + ehys[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + ehys[selection][1] + " #d    使用期限:#r " + ehys[selection][3] + "\r\n                              ";

                add += "   #L9#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 10) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>其他物品#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + pfmz[selection][0] + "# #z" + pfmz[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + pfmz[selection][1] + " #d    使用期限:#r " + pfmz[selection][3] + "\r\n                              ";

                add += "   #L10#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 11) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>本周推荐#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + bztj[selection][0] + "# #z" + bztj[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + bztj[selection][1] + " #d    使用期限:#r " + bztj[selection][3] + "\r\n                              ";

                add += "   #L11#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 12) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>骑宠#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + qc[selection][0] + "# #z" + qc[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + qc[selection][1] + " #d    使用期限:#r " + qc[selection][3] + "\r\n                              ";

                add += "   #L12#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 13) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>我的男神#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + wdns[selection][0] + "# #z" + wdns[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + wdns[selection][1] + " #d    使用期限:#r " + wdns[selection][3] + "\r\n                              ";

                add += "   #L13#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

            if (xx == 14) {

                var add = "欢迎来到#r◆◇◆铁牛冒险岛#k,下面是本服的游戏商城区.\r\n\r\n";

                add += "   您当前位置:#b商城首页>>点卷商城>>我的女神#k\r\n\r\n";

                add += "   当前点卷余额:#r" + cm.getChar().getNX() + "#k\r\n\r\n#d";

                add += "   物品:#v" + nvshen[selection][0] + "# #z" + nvshen[selection][0] + "#\r\n\r\n";

                add += "   需要点卷:#r " + nvshen[selection][1] + " #d    使用期限:#r " + nvshen[selection][3] + "\r\n                              ";

                add += "   #L14#立即购买#l";

                cm.sendSimple (add,2);

                jiage = selection;

            }

        ///////////////////////////////////////////////////////////////////////////////////////////

        } else if (status == 4) {


            if (selection == 1) {
                if (cm.getPlayer().getNX() >= fsdj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(fsdj[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(fsdj[jiage][0])).copy();
                        //var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + fsdj[jiage][1]); 
                        //toDrop.setExpiration(temptime);
                        toDrop.setLocked(1);	
                        toDrop.setUniqueId(1);
                        cm.gainNX(-fsdj[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    //cm.gainNX(-fsdj[jiage][1]);		
                    //cm.gainItem(fsdj[jiage][0],1);
                    //cm.sendOk("#b购买成功,请查看背包.");
                    //cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 2) {
                if (cm.getPlayer().getNX() >= zsdj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                    
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(zsdj[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(zsdj[jiage][0])).copy();
                        //var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + fsdj[jiage][1]); 
                        //toDrop.setExpiration(temptime);
                        toDrop.setLocked(1);	
                        toDrop.setUniqueId(1);
                        cm.gainNX(-zsdj[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 3) {
                if (cm.getPlayer().getNX() >= fxdj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else { 
                        cm.gainNX(-fxdj[jiage][1]);			
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(fxdj[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(fxdj[jiage][0])).copy();
                        var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + fxdj[jiage][4]); 
                        toDrop.setExpiration(temptime);
                        toDrop.setLocked(1);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请登陆网站冲值.");
                    cm.dispose();
                }

            } else if (selection == 4) {
                if (cm.getPlayer().getNX() >= gsdj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(gsdj[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(gsdj[jiage][0])).copy();
                        //var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + gsdj[jiage][3]); 
                        //toDrop.setExpiration(temptime);
                        toDrop.setLocked(0);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");   
                        cm.gainNX(-gsdj[jiage][1]);		
                        //cm.gainItem(gsdj[jiage][0],gsdj[jiage][3]);
                        //cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请登陆网站冲值.");
                    cm.dispose();
                }


            } else if (selection == 5) {
                if (cm.getPlayer().getNX() >= hddj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        cm.gainNX(-hddj[jiage][1]);
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(hddj[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(hddj[jiage][0])).copy();
                        var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + hddj[jiage][3]); 
                        toDrop.setExpiration(temptime);
                        toDrop.setLocked(1);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请登陆网站冲值.");
                    cm.dispose();
                }

            } else if (selection == 6) {
                if (cm.getPlayer().getNX() >= tywq[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                    
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();
                        var type = ii.getInventoryType(tywq[jiage][0]);
                        var toDrop = ii.randomizeStats(ii.getEquipById(tywq[jiage][0])).copy();
                        //var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + fsdj[jiage][1]); 
                        //toDrop.setExpiration(temptime);
                        toDrop.setLocked(1);	
                        toDrop.setUniqueId(1);
                        cm.gainNX(-tywq[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); 
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 7) {
                if (cm.getPlayer().getNX() >= jzls[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        cm.gainNX(-jzls[jiage][1]);		
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(jzls[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(jzls[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setLocked(1);	
                        toDrop.setWatk(3);
                        toDrop.setUniqueId(1);
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }

            } else if (selection == 8) {
                if (cm.getPlayer().getNX() >= xzst[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {	
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(xzst[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(xzst[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setUniqueId(1);
                        cm.gainNX(-xzst[jiage][1]);
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }

            } else if (selection == 9) {
                if (cm.getPlayer().getNX() >= ehys[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(ehys[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(ehys[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setUniqueId(1);
                        cm.gainNX(-ehys[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 10) {
                if (cm.getPlayer().getNX() >= pfmz[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        cm.gainNX(-pfmz[jiage][1]);		
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(pfmz[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(pfmz[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setLocked(1);	
                        toDrop.setWatk(3);
                        toDrop.setUniqueId(1);
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 11) {
                if (cm.getPlayer().getNX() >= bztj[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(bztj[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(bztj[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setUniqueId(1);
                        toDrop.setWatk(3);
                        cm.gainNX(-bztj[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }


            } else if (selection == 12) {
                if (cm.getPlayer().getNX() >= qc[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        cm.gainNX(-qc[jiage][1]);		
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(qc[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(qc[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setLocked(1);	
                        toDrop.setWatk(3);
                        toDrop.setUniqueId(1);
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }

            } else if (selection == 13) {
                if (cm.getPlayer().getNX() >= wdns[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(wdns[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(wdns[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setUniqueId(1);
                        cm.gainNX(-wdns[jiage][1]);	
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }

            } else if (selection == 14) {
                if (cm.getPlayer().getNX() >= nvshen[jiage][1]) {
                    if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
                        cm.sendOk("#b请保证装备栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(2)).isFull(2)){
                        cm.sendOk("#b请保证消耗栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(3)).isFull(2)){
                        cm.sendOk("#b请保证设置栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else if (cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull(2)){
                        cm.sendOk("#b请保证其他栏位至少有2个空格,否则无法购买.");
                        cm.dispose();
                    } else {
                        cm.gainNX(-nvshen[jiage][1]);		
                        var ii = net.sf.cherry.server.MapleItemInformationProvider.getIqctance();		                
                        var type = ii.getInventoryType(nvshen[jiage][0]); //获得装备的类形
                        var toDrop = ii.randomizeStats(ii.getEquipById(nvshen[jiage][0])).copy(); // 生成一个Equip类
                        toDrop.setLocked(1);	
                        toDrop.setWatk(3);
                        toDrop.setUniqueId(1);
                        cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
                        cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
                        cm.sendOk("#b购买成功,请查看背包.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("#b您没有足够的点卷进行购买,请充值.");
                    cm.dispose();
                }



            }
        }
    }

}                                            