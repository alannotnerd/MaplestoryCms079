
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30000,30020,30030,30040,30050,30060,30100,30110,30120,30130,30140,30150,30160,30170,30180,30190,30200,30210,30220,30230,30240,30250,30260,30270,30280,30290,30300,30310,30320,30330,30340,30350,30360,30370,30400,30410,30420,30440,30450,30460,30470,30480,30490,30510,30520,30530,30540,30550,30560,30600,30610,30620,30630,30640,30650,30660,30670,30680,30700,30710,30720,30730,30740,30750,30760,30770,30780,30790,30800,30810,30820,30830,30840,30850,30860,30870,30880,30890,30900,30910,30920,30930,30940,30950,30990,33000,33040,33050,33120,33140,33100,33160,33170,33110,33130,33150);
var fhair = Array(31000,31010,31020,31030,31040,31050,31060,31070,31080,31090,31100,31110,31120,31130,31140,31150,31160,31170,31180,31190,31200,31210,31220,31230,31240,31250,31260,31270,31280,31290,31300,31310,31320,31330,31340,31350,31400,31410,31420,31440,31450,31460,31470,31480,31490,31510,31520,31530,31540,31550,31560,31610,31620,31630,31640,31650,31660,31670,31680,31690,31700,31710,31720,31730,31740,31750,31760,31770,31780,31790,31800,31810,31820,31830,31840,31850,31860,31870,31880,31890,31910,31920,31930,31940,31950,33000,33030,33050,34000,34010,34040,34050,34060,34120,34130,34150,34160,34110,34170,34180,31970,31980,32020,34140,31990);
var hairnew = Array();

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
		else
			status--;
		if (status == 0) {
			cm.sendSimple("你好,我是射手村人见人爱的射手村店长!如果你有#b射手村美发店高级会员卡#k或#b射手村染发高级会员卡#k,你就放心的把发型交给我,我会让你满意的.那么你要做什么?请选择吧!.\r\n#L0#改变发型(使用#b射手村美发店高级会员卡#k)#l\r\n#L1#染色(使用#b射手村染发高级会员卡#k)#l");						
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendStyle("我可以改变你的发型,让它比现在看起来漂亮。你为什么不试着改变它下? 如果你有#b射手村美发店高级会员卡#k,我将会帮你改变你的发型,那么选择一个你想要的新发型吧!", hairnew,5150001);
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("我可以改变你的发色,让它比现在看起来漂亮. 你为什么不试着改变它下? 如果你有#b射手村染发高级会员卡#k,我将会帮你改变你的发色,那么选择一个你想要的新发色吧!", haircolor,5151001);
			}
			}else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150001) == true){
					cm.gainItem(5150001, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(hairnew[selection]);
				 	cm.sendOk("#e好了,你的朋友们一定认不出来是你了!");					
				}else{
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你进行整形手术,我很抱歉.请你先购买吧.");
				}
				
			}
			if (beauty == 2){
				if (cm.haveItem(5151001) == true){
					cm.gainItem(5151001, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(haircolor[selection]);
				 	cm.sendOk("#e好了,你的朋友们一定认不出来是你了!");					
				}else {
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
				}
			}
		}
	}
}