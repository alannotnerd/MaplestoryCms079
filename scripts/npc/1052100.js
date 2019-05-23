/*
	This file is part of the cherry Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@cherry.de>
                       Jan Christian Meyer <vimes@cherry.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Natalie
	Henesys VIP Hair/Hair Color Change (VIP).
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30900, 30910, 30920, 30930, 30940, 30950, 30990, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30510, 30520, 30530, 30540, 30550, 30560, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 33000, 33030, 33040, 33050, 30610);
var fhair = Array(34000, 34010, 34040, 34050, 34060, 31910, 31920, 31930, 31940, 31950, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31740, 31700, 31710, 31720, 31730, 31750, 31760, 31770, 31780, 31790, 31110, 31120, 31130, 31140, 31150, 31300, 31310, 31320, 31330, 31340, 31350, 31160, 31170, 31180, 31190, 31050, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31100, 31510, 31520, 31530, 31540, 31550, 31560, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31030, 31080, 31000, 31010, 31020, 31040, 31060, 31090, 31070, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290);
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
			cm.sendSimple("你好,我是废弃都市美发店的店长钱老板!如果你有#b废弃都市美发店高级会员卡#k或#b废弃都市染发高级会员卡#k,你就放心的把发型交给我,我会让你满意的.那么你要做什么?请选择吧!.\r\n#L1#改变发型(使用#b废弃都市美发店高级会员卡#k)#l\r\n#L2#染色(使用#b废弃都市染发高级会员卡#k)#l");						
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 0;
				cm.sendSimple("Which coupon would you like to buy?\r\n#L0#Haircut for " + hairprice + " mesos: #i5150003##t5150003##l\r\n#L1#Dye your hair for " + haircolorprice + " mesos: #i5151003##t5151003##l");
			} else if (selection == 1) {
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
				cm.sendStyle("我可以改变你的发型,让它比现在看起来漂亮。你为什么不试着改变它下? 如果你有#b废弃都市美发店高级会员卡#k,我将会帮你改变你的发型,那么选择一个你想要的新发型吧!", hairnew,5150003);
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("我可以改变你的发色,让它比现在看起来漂亮. 你为什么不试着改变它下? 如果你有#b废弃都市染发高级会员卡#k,我将会帮你改变你的发色,那么选择一个你想要的新发色吧!", haircolor,5151003);
			}
		} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if(cm.isCash()){
					if (cm.getPlayer().getCSPoints(1)>=980){
						cm.getPlayer().modifyCSPoints(1,-980);
						cm.setHair(hairnew[selection]);
						cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
					} else {
						cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
					}
				} else {
					if (cm.haveItem(5150003) == true){
						cm.gainItem(5150003, -1);
						cm.setHair(hairnew[selection]);
						cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
					} else {
						cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
					}	
				}
				
			}
			if (beauty == 2){
				if (cm.haveItem(5151003) == true){
					cm.gainItem(5151003, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
				} else {
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
				}
			}
			if (beauty == 0){
				if (selection == 0 && cm.getMeso() >= hairprice) {
					cm.gainMeso(-hairprice);
					cm.gainItem(5150003, 1);
					cm.sendOk("Enjoy!");
				} else if (selection == 1 && cm.getMeso() >= haircolorprice) {
					cm.gainMeso(-haircolorprice);
					cm.gainItem(5151003, 1);
					cm.sendOk("Enjoy!");
				} else {
					cm.sendOk("You don't have enough mesos to buy a coupon!");
				}
			}
		}
	}
}