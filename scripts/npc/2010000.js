/*
	This file is part of the cherry Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@cherry.de>
					   Jan Christian Meyer <vimes@cherry.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Master Sergeant Fox <Orbis Exchange Quest> - Orbis(200000000)
-- By ---------------------------------------------------------------------------------------------
	Sean360
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Official Text [Information]
	1.0 - First Version by Sean360
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.client);


var status = 0;
var eQuestChoices = new Array (4000073,4000059,4000060,4000061,4000058,
                               4000062,4000048,4000049,4000055,4000056,
                               4000051,4000052,4000050,4000057,4000053,
                               4000054,4000076,4000078,4000081,4000070,
                               4000071,4000072,4000069,4000079,4000080); 

var eQuestPrizes = new Array();

eQuestPrizes[0] = new Array ([2000001,20],  // Orange Potions
								 [2010004,10],	// Lemons
								 [2000003,15], 	// Blue Potions
								 [4003001,15],	// Processed Wood
								 [2020001,15],	// Fried Chickens
								 [2030000,15]);	// Nearest Town Scroll
eQuestPrizes[1] = new Array ([2000003,20],	// Blue Potions
								 [2000001,30],	// Orange Potions
								 [2010001,40],	// Meats
								 [4003001,20],	// Processed Wood
								 [2040002,1]);	// 10% Helm Def
eQuestPrizes[2] = new Array ([2000002,25],	// White Potions
								 [2000006,10],	// Mana Elixir
								 [2022000,5],	// Pure Water
								 [4000030,15],	// Dragon Skins
								 [2040902,1]);	// 10% Shield Def
eQuestPrizes[3] = new Array ([2000002,30],	// White Potions
								 [2000006,15],	// Mana Elixir
								 [2020000,20],	// Salad
								 [4003000,5],	// Screws
								 [2041016,1]);	// 10% Cape Int
eQuestPrizes[4] = new Array ([2000002,15],	// White Potions
								 [2010004,15],	// Lemons
								 [2000003,25],	// Blue Potions
								 [4003001,30],	// Processed Wood
								 [2040302,1]);	// 10% Earring Int
eQuestPrizes[5] = new Array ([2000002,30],	// White Potions
								 [2000006,15],	// Mana Elixir
								 [2020000,20],	// Salad
								 [4003000,5],	// Screws
								 [2040402,1]);	// 10% Top Def
eQuestPrizes[6] = new Array ([2000002,30],	// White Potions
								 [2020000,20],	// Salad
								 [2000006,15],	// Mana Elixir
								 [4003000,5],	// Screws
								 [2040402,1]);	// 10% Top Def
eQuestPrizes[7] = new Array ([2000006,25],	// Mana Elixir
								 [2020000,20],	// Salad
								 [4020000,7],	// Garnet Ore
								 [4020001,7],	// Amethyst Ore
								 [4020002,3],	// Aquamarine Ore
								 [4020007,2],	// Diamond Ore
								 [2040708,1]);	// 10% Shoe Speed
eQuestPrizes[8] = new Array ([2020005,30],	// Hotdogs
								 [2020006,15],	// Hotdog Supremes
								 [2022001,30],	// Red Bean Soup
								 [4003003,1],	// Fairy Wing
								 [2040505,1]);	// 10% O/All Def
eQuestPrizes[9] = new Array ([2000006,25],	// Mana Elixir
								 [4020005,7],	// Sapphire Ore
								 [4020003,7],	// Emerald Ore
								 [4020004,7],	// Opal Ore
								 [4020008,2],	// Black Crystal Ore
								 [2040802,1]);	// 10% Glove Dex
eQuestPrizes[10] = new Array   ([2002004,15],	// Warrior Potion
								    [2002005,15],	// Sniper Potion
								    [2002003,15],	// Wizard Potion
								    [4001005,1],	// Ancient Scroll
								    [2040502,1]);	// 10% O/All Dex
eQuestPrizes[11] = new Array   ([2000006,20],	// Mana Elixir
									[4010004,7],	// Silver Ore
									[4010003,7],	// Adamantium Ore
									[4010005,7],	// Orihalcon Ore
									[4003002,1],	// Piece of Ice
									[2040602,1]);	// 10% Bottom Def
eQuestPrizes[12] = new Array   ([2000006,20],	// Mana Elixir
									[4010002,7],	// Mithril Ore
									[4010001,7],	// Steel Ore
									[4010000,7],	// Bronze Ore
									[4010006,2],	// Gold Ore
									[4003000,5],	// Screwa
									[2040702,1]);	// 10% Shoe Dex
eQuestPrizes[13] = new Array   ([2000006,20],	// Mana Elixir
									[4010004,7],	// Silver Ore
									[4010005,7],	// Orihalcon Ore
									[4010006,3],	// Gold Ore
									[4020007,2],	// Diamond Ore
									[4020008,2],	// Black Crystal Ore
									[2040705,1]);	// 10% Shoe Jump
eQuestPrizes[14] = new Array   ([2000006,30],	// Mana Elixir
								    [4020006,7],	// Topaz Ore
								    [4020008,2],	// Black Crystal Ore
								    [4020007,2],	// Diamond Ore
								    [2070010,1],	// Icicle Stars
								    [2040805,1]);   // 10% Glove Attack
eQuestPrizes[15] = new Array   ([2000006,30],   // Mana Elixir
									[4020006,7],	// Topaz Ore
									[4020008.2],	// Black Crystal Ore
									[4020007,2],	// Diamond Ore
									[2041020,1]);	// 10% Cape Dex
eQuestPrizes[16] = new Array   ([2000001,30],	// Orange Potions
									[2000003,20],	// Blue Potions
									[4003001,20],	// Processed Wood
									[2010001,40],	// Meats
									[2040002,1]);	// 10% Helm Def
eQuestPrizes[17] = new Array   ([2000002,15],	// White Potions
									[2000003,25],	// Blue Potions
									[2010004,15],	// Lemons
									[2050004,15],	// Divine Elixir
									[4003001,30],	// Processed Wood
									[2040302,1]);	// 10% Earring Int
eQuestPrizes[18] = new Array   ([2000006,25],	// Mana Elixir
									[2020006,25],	// Hotdog Supreme
									[4010004,8],	// Silver Ore
									[4010005,8],	// Orihalcon Ore
									[4010006,3],	// Gold Ore
									[4020007,2],	// Diamond Ore
									[4020008,2],	// Black Crystal Ore
									[2040705,1]);	// 10% Shoe Jump
eQuestPrizes[19] = new Array   ([2000002,30],	// White Potions
									[2020000,20],	// Salad
									[2000006,15],	// Mana Elixir
									[4003000,5],	// Screws
									[2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[20] = new Array   ([2000002,30],	// White Potions
									[2020000,20],	// Salad
									[2000006,15],	// Mana Elixir
									[4003000,5],	// Screws
									[2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[21] = new Array   ([2000002,30],	// White Potions
									[2020000,20],	// Salad
									[2000006,15],	// Mana Elixir
									[4003000,5],	// Screws
									[2041005,1]);	// 10% Cape Wep Def
eQuestPrizes[22] = new Array   ([2000006,20],	// Mana Elixir
									[2020005,30],	// Hotdogs
									[2020006,15],	// Hotdog Supremes
									[2050004,20],	// Divine Elixirs
									[4003003,1],	// Fairy Wing
									[2041002,1]);	// 10% Cape Mag Def
eQuestPrizes[23] = new Array   ([2000006,25],	// Mana Elixir
									[2050004,50],	// Divine Elixir
									[2022001,35],	// Red Bean Soup
									[4020000,8],	// Garnet Ore
									[4020001,8],	// Amethyst Ore
									[4020002,8],	// Aquamarine Ore
									[4020007,2],	// Diamond Ore
									[2041023,1]);	// 10% Cape LUK
eQuestPrizes[24] = new Array   ([2000006,35],	// Mana Elixir
									[4020006,9],	// Topaz Ore
									[4010008,4],	// Black Crystal Ore
									[4020007,4],	// Diamond Ore
									[2041008,1]);   // 10% Cape HP
var requiredItem  = 0;
var lastSelection = 0;
var prizeItem     = 0;
var prizeQuantity = 0;
var itemSet;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && (status == 1 || status == 3)) {
			cm.sendNext("Hmmm...it shouldn't be a bad deal for you. Come see me at the right time and you may get a much better item to be offered. Anyway, let me know when you have a change of heart.");
			cm.dispose();
			return;
		} else if (mode == 0 && status == 3) {
			cm.dispose();
		} else if (mode == 0 && status == 4) {
			cm.sendNext("Hmmm...it shouldn't be a bad deal for you. If you come at the right time I can hook you up with good items. Anyway if you feel like trading, feel free to come.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { // first interaction with NPC
			cm.sendNext("Hey, got a little bit of time? Well, my job is to collect items here and sell them elsewhere, but these days the monsters have become much more hostile so it's been difficult to getting good items ... What do you think? Do you want to do some business with me?");
		} else if (status == 1) {
			cm.sendYesNo("The deal is simple. You get me something I need, I get you something you need. The problem is, I deal with a whole bunch of people, so the items I have to offer may change every time you see me. What do you think? Still want to do it?");
		} else if (status == 2) {
			var eQuestChoice = makeChoices(eQuestChoices);
			cm.sendSimple(eQuestChoice);
		} else if (status == 3){
			lastSelection = selection;
			requiredItem = eQuestChoices[selection];
 			cm.sendYesNo("Let's see, you want to trade your #b100 #t" + requiredItem + "##k with my stuff right? Before trading make sure you have an empty slot available on your use or etc. inventory. Now, do you want to trade with me?");
		}else if (status == 4){
					itemSet = (Math.floor(Math.random() * eQuestPrizes[lastSelection].length));       
					reward = eQuestPrizes[lastSelection];
					prizeItem = reward[itemSet][0];
					prizeQuantity = reward[itemSet][1];
					if(!cm.haveItem(requiredItem,100)){
						cm.sendOk("Hmmm... are you sure you have #b100 #t" + requiredItem + "##k? If so, then please check and see if your item inventory is full or not.");
					} else if(!cm.canHold(prizeItem)){
						cm.sendNext("Your use and etc. inventory seems to be full. You need the free spaces to trade with me! Make room, and then find me.");
					} else {
						cm.gainItem(requiredItem,-100);
						cm.gainExp(500 * cm.getC().getChannelServer().getExpRate()); 
						cm.gainItem(prizeItem, prizeQuantity);
						cm.sendOk("For you #b100 #t"+requiredItem+"##k, here's my #b"+prizeQuantity+" #t"+prizeItem+"##k. What do you think? Do you like the items I gave you in return? I plan on being here for a while, so if you gather up more items, I'm always open for a trade ...");
                    }
                    cm.dispose();
		}
	}
}

function makeChoices(a){
    var result  = "Ok! First you need to choose the item that you'll trade with. The better the item, the more likely the chance that I'll give you something much nicer in return.\r\n";
    for (var x = 0; x< a.length; x++){
        result += " #L" + x + "##v" + a[x] + "#  #t" + a[x] + "##l\r\n";
        }
    return result;
}
