/* 
	
*/
var hair_Colo_new;
var status = -1;
var beauty = -1;
var hairCard = 5150040;
var types = -1;
var ct = -1;

function action(mode, type, selection) {
    if (mode == 0) {
		if (status != 1) {
			if (beauty == 0 || beauty == 2 || beauty == 4) {
				cm.sendOk("你还没做好心理准备吗？决定好了之后，请你再来和我说话。");
			} else if (beauty == 1 || beauty == 3) {
				cm.sendOk("怎么样？喜欢新换的发型么?哇～真是既高雅又美丽。哈哈哈，我的手艺还能差到那里去～需要更换发型的话，可以随时来找我，呵呵。");
			}
		}
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendSimple("你好。我是大头国的#b#p1012117##k。如果你有#b#t05150040##k，我可以为你设计一个发型。怎么样？\r\n#b#L0#更换第一组发型(使用皇家理发券)#l \r\n#b#L1#更换第二组发型(使用皇家理发券)#l");
    } else if (status == 1) {
		var hair = cm.getPlayerStat("HAIR");
		hair_Colo_new = [];
        if (selection == 0) {
            beauty = 0;
            if (cm.getPlayerStat("GENDER") == 0) {
                hair_Colo_new = [34350/*宴会*/,33280/*潇洒男*/,36490/*关谷*/,36920/*动漫少年*/,36770/*草莓初恋*/,36860/*小卷毛*/,35010/*我的王子*/,35040/*摇滚*/,
				35020/*鸟巢*/,35050/*飓风*/,35090/*凌乱碎发*/,35120/*小英俊*/,35270/*都教授*/,36650/*亲和*/,36760/*随风*/,36260/*炫酷*/,
				35350/*麦香飞舞*/,35190/*乖宝贝*/,36410/*鹰嘴*/,33290/*希希*/,33220/*发如雪*/,30830/*ALEX*/,33520/*美男*/,30990/*莫西干*/,33050/*狂狮*/,36020/*火魔*/];
            } else {
                hair_Colo_new = [34770/*阿莉亚*/,34970/*苏子叶*/,37060/*人鱼公主*/,37090/*婷可贝鲁*/,37830/*悠悠*/,37900/*动漫少女*/,38070/*草莓初恋*/,37560/*小清新*/,
				38040/*我的公主*/,38120/*小静公主*/,38010/*风女*/,37980/*陶瓷卷*/,38150/*小可爱*/,38320/*小颂伊*/,38110/*恬静*/,38060/*温婉*/,
				37940/*花卷*/,38480/*冰雪气质*/,38430/*学生妹*/,31680/*可爱小姐*/,31540/*真发*/,31490/*新生代*/,37920/*兔耳*/,37630/*泡泡卷*/,38290/*棉花糖*/,37110/*圆圆贝壳*/];
            }
        } else if (selection == 1) {
            beauty = 1;
            if (cm.getPlayerStat("GENDER") == 0) {
                hair_Colo_new = [36010/*小硕*/,33370/*不均衡*/,33470/*冷峻发型*/,33000/*贤重*/,33340/*后翘*/,33230/*爱国*/,
				33240/*OM型*/,33260/*南哈特*/,33110/*一辉*/,33160/*利琳*/,30990/*莫西干*/,33050/*狂狮*/,30860/*BOSS*/,30950/*俊美*/,
				30720/*艺人*/,30780/*乱马*/,30810/*天然碎发*/,33440/*街舞*/,33410/*光亮分层*/,
				36700/*泡泡*/,33150/*龙神*/,33370/*不均衡*/,33400/*管家*/,30210/*漏耳短发*/,33180/*真相*/,33250/*妖精维英*/,30260/*边分*/];
            } else {
                hair_Colo_new = [31900/*活泼辫子*/,31360/*蓬松马尾*/,34430/*花朵*/,34270/*拉直*/,34210/*小公主*/,34220/*猪小七*/,31370/*麻花*/,34230/*波波*/,
				34240/*厮守*/,34260/*花苞*/,34180/*波浪马尾*/,34160/*利琳*/,34060/*gaga*/,34050/*战神*/,31910/*上海*/,31950/*柔美*/,
				31710/*小萝莉*/,31760/*娃娃辫子*/,31790/*自然卷*/,31810/*丫丫*/,34490/*丽亚娜*/,34310/*哥特*/,34380/*公主*/,
				34330/*邻家*/,38390/*街拍*/];
            }
        }
		var iNow = 0;
		var hairTypeNow = [];
		for (var i = 0; i < hair_Colo_new.length; i++) {
			if (hair_Colo_new[i] != hair-hair%10) {
				hairTypeNow[iNow++] = hair_Colo_new[i] + (hair % 10);
			}
		}
		hair_Colo_new = cm.getCanHair(hairTypeNow);
		cm.sendSimple("那么你想...\r\n#b#L0#看看这个皇家有什么发型#l\r\n#b#L1#更换发型#l");
    } else if (status == 2) {
        if (selection == 0) {
			types = 0;
			if (hair_Colo_new.length == 0)
				cm.sendOk("出现未知错误。");
			else
				cm.askAvatar("随便看", hair_Colo_new, hairCard);
        } else if (selection == 1) {
			types = 1;
			if (beauty == 0 || beauty == 1) {
				cm.sendYesNo("使用皇家理发券，可以随机更换发型。你真的要使用#b#t0" + hairCard + "##k，更换发型吗？");
			} else {
				cm.sendOk("出现未知错误");
				cm.dispose();
			}
		}
    } else if (status == 3) {
        if (types == 0) {
			status = 0;
			action(mode, type, beauty);
		} else {
			if (cm.setRandomAvatar(hairCard, hair_Colo_new) == 1) {
				cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
				cm.safeDispose();
			} else {
				cm.sendYesNo("您没有可使用的会员卡。是否想消耗980抵用券直接使用？");
			}
		}
    } else if (status == 4) {
		status = 2;
		if (cm.getChar().getCSPoints(1) >= 980){
			ct = 1;}
		if (cm.getChar().getCSPoints(2) >= 980){
			ct = 2;}
		if (ct != -1) {
			ct = -1;
			if (cm.gainNX(ct, -980)){
				cm.gainItem(hairCard, 1);
			}else{
				cm.sendOk("你好像没有足够的点卷/抵用卷!");
				cm.dispose();
			}
			
		} else {
			beauty = -1;
		}
		action(mode, type, selection);
    }
}