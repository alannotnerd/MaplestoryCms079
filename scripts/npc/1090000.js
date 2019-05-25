/* Author: Xterminator
	NPC Name: 		Kyrin
	Map(s): 		The Nautilus : Navigation Room (120000101)
	Description: 		Pirate Instructor
*/
importPackage(net.sf.cherry.client);

var status = 0;
var requirements = false;
var text;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (((status == 0 || status == 1 || status == 9) && mode == 0) || ((status == 8 || status == 12 || status == 16 || status == 18 || status == 21 || status == 26 || status == 28 || status == 39 || status == 44) && mode == 1)) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0 && requirements) {
			cm.sendNext("I see... Well, selecting a new job is a very important decision to make. If you are ready, then let me know!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("Have you got something to say?#b\r\n#L0#I would like to learn more about pirates...");
		} else if (status == 1) {
			if (cm.getJob().equals(MapleJob.BRAWLER) || cm.getJob().equals(MapleJob.GUNSLINGER)) {
				if (cm.getPlayer().getLevel() <= 69) {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.sendNext("Ohhh, it's you. How's like as a Brawler? You look much more advanced and polished than the last time I saw you. Hopefully great things lay for you in the future.");
					} else {
						cm.sendNext("Ohhh, it's you. How's like as a Gunslinger? You look much more advanced and polished than the last time I saw you. Hopefully great things lay for you in the future.");
					}
				} else {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.changeJob(MapleJob.MARAUDER);
					} else {
						cm.changeJob(MapleJob.OUTLAW);
					}
				}
				cm.dispose();
			} else if (cm.getJob().equals(MapleJob.PIRATE)) {
				if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 35;
					cm.sendNext("Okay, as promised, you will now become a #bBrawler#k.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 40;
					cm.sendNext("Okay, as promised, you will now become a #bGunslinger#k.");
				} else if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.STARTED)) {
					status = 29;
					cm.sendNext("Okay, now I'll take you to the test room. Here are the instructions: defeat the Octopirates and gather up\r\n#b15 #t4031856#s#k. The Octopirates you'll see here are highly trained and very strong, so I suggest you really buckle down and get ready for this.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.STARTED)) {
					status = 31;
					cm.sendNext("Okay, now I'll take you to the test room. Here are the instructions: defeat the Octopirates and gather #b15 #t4031857#s#k. The Octopirates you'll see here are highly trained and are very quick, so I suggest you really buckle down and get ready for this.");
				} else if (cm.getPlayer().getLevel() <= 29) {
					status = 9;
					cm.sendSimple("Do you have something that piques you about being a Pirate...?#b\r\n#L0#What are the basic characteristics of a Pirate?#l\r\n#L1#What are the weapons a Pirate can use?#l\r\n#L2#What are the armors a Pirate can use?#l\r\n#L3#What are the Pirate skills?");
				} else if (cm.getPlayer().getLevel() >= 30) {
					status = 22;
					cm.sendSimple("Do you want to know more about Brawlers and Gunslingers? It'd be good to know in advance, so you'll have a clear picture of what you want to become for your job advancement...\r\n#b#L0# Please explain to me what being a Brawler is all about.#k#l\r\n#b#L1# Please explain to me what being a Gunslinger is all about.#k#l");
				} 
			} else if (cm.getJob().equals(MapleJob.BEGINNER)) {
				cm.sendNext("Do you wish to become a Pirate? You'll need to meet our set of standards if you are to become one of us. I need you to be #bat least Level 10, with DEX at 20 or above.#k Let's see...");
			} else {
				cm.sendNext("Don't you want to feel the freedom eminating from the sea? Don't you want the power, the fame, and everything else that comes with it? Then you should join us and enjoy it yourself.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getPlayer().getLevel() >= 10 && cm.getPlayer().getDex() >= 20) {
				requirements = true;
				cm.sendYesNo("You seem more than qualified! Great, are you ready to become one of us?");
			} else {
				cm.sendNextPrev("Hmm... I don't think you have trained enough, yet. See me when you get stronger.");
			}
		} else if (status == 3) {
			if (requirements)
				cm.sendNext("Welcome to the band of Pirates! You may have to spend some time as a wanderer at first, but better days will certainly dawn upon you, sooner than you think! In the mean time, let me share some of my abilities with you.");
			else
				cm.dispose();
		} else if (status == 4) {
			if (cm.getJob().equals(MapleJob.BEGINNER)) {
				if (cm.getPlayer().getLevel() > 10) {
						cm.getPlayer().setRemainingSp(cm.getPlayer().getRemainingSp() + (cm.getPlayer().getLevel() - 10) * 3);
				}
				cm.changeJob(MapleJob.PIRATE);
				cm.gainItem(1482014, 1);
				cm.gainItem(1492014, 1);
				cm.gainItem(2330006, 600);
				cm.gainItem(2330006, 600);
				cm.gainItem(2330006, 600);
			}
			cm.sendNextPrev("I have just increased the number of slots for your equipment and etc. inventory. You have also gotten a bit stronger. Can you feel it? Now that you can officially call yourself a Pirate, join us in our quest for adventure and freedom!");
		} else if (status == 5) {
			cm.sendNextPrev("I have just given you a little bit of #bSP#k. Look at the #bSkill menu#k to find some skills, and use your SP to learn the skills. Beware that not all skills can be enhanced from the get go. There are some skills that you can only acquire after mastering basic skills.");
		} else if (status == 6) {
			cm.sendNextPrev("One more thing. Now that you have graduated from the ranks of a Beginner into a Pirate, you'll have to make sure not to die prematurely. If you do lose all your health, you'll lose valuable EXP that you have earned. Wouldn't it stink to lose hard-earned EXP by dying?");
		} else if (status == 7) {
			cm.sendNextPrev("This is all I can teach you. I have also given you some useful weapons to work with, so it's up to you now to train with them. The world is yours for the taking, so use your resources wisely, and when you feel like you've reached the top, let me know. I'll have something better for you in store...");
		} else if (status == 8) {
			cm.sendNextPrev("Oh, and... if you have more questions about being a Pirate, or if you need some pointers... you can always ask me. I'll see you around...");
		} else if (status == 10) {
			if (selection == 0) {
				status = 11;
				text = "Here's what you need to know about being a Pirate. You can think of Pirate as one big road that offers multiple paths. If you want to dominate monsters with brute force, focus on improving STR. If you want to outsmart the monsters with long-range attacks, I suggest you focus on improving DEX.";
			} else if (selection == 1) {
				status = 13;
				text = "Unlike other jobs, being a Pirate will allow you to fight the monsters with bare fist. If you want to maximize your attacking abilities, however, I suggest you use Knuckler or Gun.";
			} else if (selection == 2) {
				status = 17;
				text = "Pirates are usually fleet-flooted, utilizing quickness to attack dazed opponents. Yes, this also means the armors have to be light, as well. This is the reason why most of the clothes for the Pirates are made out of fabric.";
			} else {
				status = 19;
				text = "For Pirates, there are skills that support the accuracy and avoidability needed to be effective. Some of the attacking skills involve either only bare fists or Guns, so you may want to choose one of the two attacking methods and stick to it, when leveling up your skills.";
			}
			cm.sendNext(text);
		} else if (status == 11) {
			cm.sendNext(text);
		} else if (status == 12) {
			cm.sendNextPrev("It's a job that changes based on what you do with it. You should think way ahead and determine what you want to become later on, so you can start focusing on which of the two stats you want to improve up on, STR or DEX. If you want to become a Brawler, boost STR. Gunslinger, boost DEX.");
		} else if (status == 13) {
			cm.sendNext(text);
		} else if (status == 14) {
			cm.sendNextPrev("If you want to engage in melee attacks and stun the monsters, use Knuckler. It looks similar to the Claws that the thieves use, but it is made with a much sturdier material to simulatenously protect and strengthen the fist.");
		} else if (status == 15) {
			cm.sendNextPrev("If you want to take on opponents long-range, use the Gun. Of course, the Gun itself won't do it for you. You'll need bullets. You can get those at any convenient store nearby.");
		} else if (status == 16) {
			cm.sendNextPrev("Your attacking style will vary greatly based on the weapon you choose, so think carefully before choosing one. Of course, the weapon you use may also determine what you'll become down the road.");
		} else if (status == 17) {
			cm.sendNext(text);
		} else if (status == 18) {
			cm.sendNextPrev("It may be a thin fabric, but you better not underestimate its capabilities. It's as durable and protective as the best leather!");
		} else if (status == 19) {
			cm.sendNext(text);
		} else if (status == 20) {
			cm.sendNextPrev("If you want to use Guns, then I suggest you use the skill \r\n#bDouble Shot#k. Double Shot allows you to fire 2 bullets at once, which will enable you to attack monsters from long range.");
		} else if (status == 21) {
			cm.sendNextPrev("If you are using your bare fist or Knucklers, then concentrate on #bSommersault Kick#k and/or #bFlash Fist#k. Alternate these two skills to maximize your attacking capabilities. You may also use these skills while carrying a Gun, but it's simply not as effective as using Knucklers.");
		} else if (status == 23) {
			if (selection == 0) {
				status = 24;
				text = "I'll explain to you what being a Brawler is about. Brawler are courageous pirates that battles enemies with bare fists and knucklers. Since Brawlers engage mostly in melee battles, it's best for you to use various attacking skills to stun the monsters first before proceeding with more powerful attacks. Use #q5101002##k to stun enemies behind you, and #q5101003##k to stun enemies in front of you.";
			} else {
				status = 27;
				text = "I'll explain to you what being a Gunslinger is all about. Gunslingers are pirates that can attack enemies from long range with high accuracy. Use #b#q5201001##k or #b#q5201002##k to attack multiple monsters at once.";
			}
			cm.sendNext(text);
		} else if (status == 24) {
			cm.sendNext(text);
		} else if (status == 25) {
			cm.sendNextPrev("One Brawler skill is called #b#q5101007##k. This skill is useful when you use it to leave the area without being detected by the monsters. Basically, it's you disguised as an Oak Barrel, and walking away from danger. Sometimes, a quick-thinking monster may catch you, but the higher your skill level gets, the less possibility of you getting caught red-handed and having to fight your way out.");
		} else if (status == 26) {
			cm.sendNextPrev("Next, we'll talk about #b#q5101005##k. It's a skill that allows you to regain MP at the expense of a bit of HP. Other than the Warriors, Brawlers have the highest HP of all, so losing a bit of HP doesn't affect them as much. It's especially useful when you're in the middle of combat, and you've run out of MP potions. Of course, you'll need to be aware of your HP level and the risks you'll be taking by using the skill.");
		} else if (status == 27) {
			cm.sendNext(text);
		} else if (status == 27) {
			cm.sendNextPrev("One Gunslinger skill is called #b#q5201006##k. This skill uses the recoil of the gun to let you jump backwards and attack monsters from behind. This skill is especially effective when you are trapped in the middle of monsters and need to escape. Just make sure you have a monster behind you before using this, okay?");
		} else if (status == 28) {
			cm.sendNextPrev("Next, we'll talk about #b#q5201005##k. This skill allows you to jump without being affected by Maple's law of gravity. This will allow you to stay afloat longer, and land on the ground later than regular jumps. If you use #b#q5201005##k from a high place, don't you think you'll be able to attack monsters in midair?");
		} else if (status == 29) {
			cm.sendNext("Okay, now I'll take you to the test room. Here are the instructions: defeat the Octopirates and gather up\r\n#b15 #t4031856#s#k. The Octopirates you'll see here are highly trained and very strong, so I suggest you really buckle down and get ready for this.");
		} else if (status == 30) {
			cm.sendNextPrev("Oh, and for the sake of training Brawlers, those Octos will not be affected unless hit with #bFlash Fist#k. And one more thing, when you enter the test room, I'll remove all the\r\n#t4031856#s you have. Yes, you'll be starting off from scratch.");
		} else if (status == 31) {
			cm.removeAll(4031856);
			var em = cm.getEventManager("Brawler");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("There was a error while warping, please notify the GMs to fix this problem.");
			cm.dispose();
		} else if (status == 32) {
			cm.sendNext("Okay, now I'll take you to the test room. Here are the instructions: defeat the Octopirates and gather #b15 #t4031857#s#k. The Octopirates you'll see here are highly trained and are very quick, so I suggest you really buckle down and get ready for this.");
		} else if (status == 33) {
			cm.sendNextPrev("Oh, and for the sake of training Gunslingers, those Octos will not be affected unless hit with #bDouble Shot#k. And one more thing, when you enter the test room, I'll remove all the #t4031857#s you have. Yes, you'll be starting off from scratch.");
		} else if (status == 34) {
			cm.removeAll(4031857);
			var em = cm.getEventManager("Gunslinger");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("There was a error while warping, please notify the GMs to fix this problem.");
			cm.dispose();
		} else if (status == 35) {
			cm.sendNext("Okay, as promised, you will now become a #bBrawler#k.");
		} else if (status == 36) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.BRAWLER);
			}
			cm.sendNextPrev("Okay, from here on out, you are a #bBrawler#k. Brawlers rule the world with the power of their bare fists... which means they need to train their body more than others. If you have any trouble training, I'll be more than happy to help.");
		} else if (status == 37) {
			cm.sendNextPrev("I have just given you a skill book that entails Brawler skills, you'll find it very helpful. You have also gained additional slots for Use items, a full row in fact. I also boosted your MaxHP and MaxMP. Check it out for yourself.");
		} else if (status == 38) {
			cm.sendNextPrev("I have given you a little bit of #bSP#k, so I suggest you open the #bskill menu#k right now. You'll be able to enhance your newly-acquired 2nd Job skills. Beware that not all skills can be enhanced from the get go. There are some skills that you can only acquire after mastering basic skills.");
		} else if (status == 39) {
			cm.sendNextPrev("Brawlers need to be a powerful force, but that doesn't mean they have the right to bully the weak. True Brawlers use their immense power in positive ways, which is much harder than just training to gain strength. I hope you follow this creed as you leave your mark in this world as a Brawler. I will see you when you have accomplished everything you can as a Brawler. I'll be waiting for you here.");
		} else if (status == 40) {
			cm.sendNext("Okay, as promised, you will now become a #bGunslinger#k.");
		} else if (status == 41) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.GUNSLINGER);
			}
			cm.sendNextPrev("Okay, from here on out, you are a #bGunslinger#k."); // Not complete
		} else if (status == 42) {
			cm.sendNextPrev("I have just given you a skill book that entails Gunslinger skills, you'll find it very helpful. You have also gained additional slots for Use items, a full row in fact. I also boosted your MaxHP and MaxMP. Check it out for yourself.");
		} else if (status == 43) {
			cm.sendNextPrev("I have given you a little bit of #bSP#k, so I suggest you open the #bskill menu#k right now. You'll be able to enhance your newly-acquired 2nd Job skills. Beware that not all skills can be enhanced from the get go. There are some skills that you can only acquire after mastering basic skills.");
		} else if (status == 44) {
			cm.sendNextPrev("I'll be waiting for you here."); // Not complete
		}
	}
}
