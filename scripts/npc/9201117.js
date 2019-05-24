var status = 0;
var beauty = 0;
var facenew;
var colors;
var hairnew;
var haircolor;
var skin = Array(0, 1, 2, 3, 4, 5, 9, 10, 11);
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029, 20031, 20032, 20036, 20037);
var mhair = Array(30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30700, 30710, 30730, 30750, 30760, 30770, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30930, 30940, 30950, 30960, 30970, 30980, 30990);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 21018, 21019, 21020, 21022, 21023, 21024, 21025, 21026, 21027, 21029, 21030, 21034, 21035);
var fhair = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 31960, 31970, 31980, 31990);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	    cm.sendSimple("Hey there! I could change the way you look! I charge 1,000,000 mesos per change. What would you like to change?\r\n#L0##bSkin#k#l\r\n#L1##bHair#k#l\r\n#L2##bHair Color#k#l\r\n#L3##bFace#k#l\r\n#L4##bEye Color#k#l");
    } else if (status == 1) {
	if (cm.getPlayerStat("GENDER") == 0) {
	    if (selection == 0) {
		beauty = 1;
		cm.sendStyle("Pick a skin color that you would like.", skin);
	    } else if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < mhair.length; i++) {
		    if (mhair[i] == 30010 || mhair[i] == 30070 || mhair[i] == 30080 || mhair[i] == 30090 || mhair[i] == 33140 || mhair[i] == 33240) {
			hairnew.push(mhair[i]);
		    } else {
			hairnew.push(mhair[i] + parseInt(cm.getPlayerStat("HAIR") % 10));
		    }
		}
		cm.sendStyle("Pick a hairstyle that you would like.", hairnew);
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayerStat("HAIR") / 10) * 10;
		if (current == 30010 || current == 30070 || current == 30080 || current == 30090 || current == 33140 || current == 33240) {
		    haircolor.push(current);
		} else {
		    for (var i = 0; i < 8; i++) {
			haircolor.push(current + i);
		    }
		}
		cm.sendStyle("Pick a hair color that you would like.", haircolor);
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < mface.length; i++) {
		    if (mface[i] == 20025 || mface[i] == 20027 || mface[i] == 20029 || mface[i] == 20031 || mface[i] == 20032) {
			facenew.push(mface[i]);
		    } else {
			facenew.push(mface[i] + cm.getPlayerStat("FACE") % 1000 - (cm.getPlayerStat("FACE") % 100));
		    }
		}
		cm.sendStyle("Pick a new face that you would like.", facenew);
	    } else if (selection == 4) {
		beauty = 5;
		var current = cm.getPlayerStat("FACE") % 100 + 20000;
		colors = Array();
		if (current == 20025 || current == 20027 || current == 20029 || current == 20031 || current == 20032) {
		    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
		} else {
		    colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
		}
		cm.sendStyle("Pick a eye color that you would like.", colors);
	    }
	} else {
	    if (selection == 0) {
		beauty = 1;
		cm.sendStyle("Pick a skin color that you would like.", skin);
	    } else if (selection == 1) {
		beauty = 2;
		hairnew = Array();
		for (var i = 0; i < fhair.length; i++) {
		    if (fhair[i] == 34160) {
			hairnew.push(fhair[i]);
		    } else {
		    	hairnew.push(fhair[i] + parseInt(cm.getPlayerStat("HAIR") % 10));
		    }
		}
		cm.sendStyle("Pick a hairstyle that you would like.", hairnew);
	    } else if (selection == 2) {
		beauty = 3;
		haircolor = Array();
		var current = parseInt(cm.getPlayerStat("HAIR") / 10) * 10;
		if (current == 34160) {
			haircolor.push(current);
		} else {
			for (var i = 0; i < 8; i++) {
		    		haircolor.push(current + i);
			}
		}
		cm.sendStyle("Pick a hair color that you would like.", haircolor);
	    } else if (selection == 3) {
		beauty = 4;
		facenew = Array();
		for (var i = 0; i < fface.length; i++) {
		    if (fface[i] == 21027 || fface[i] == 21029 || fface[i] == 21030) {
			facenew.push(fface[i]);
		    } else {
		    	facenew.push(fface[i] + cm.getPlayerStat("FACE") % 1000 - (cm.getPlayerStat("FACE") % 100));
		    }
		}
		cm.sendStyle("Pick new eyes that you would like.", facenew);
	    } else if (selection == 4) {
		beauty = 5;
		var current = cm.getPlayerStat("FACE") % 100 + 21000;
		colors = Array();
		if (current == 21027 || current == 21029 || current == 21030) {
			colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
		} else {
			colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700, current + 800);
		}
		cm.sendStyle("Pick a eye color that you would like.", colors);
	    }
	}
    } else if (status == 2) {
	if (cm.getPlayer().getMeso() < 1000000) {
	    cm.sendNext("You don't have 1,000,000 mesos.");
	    cm.dispose();
	    return;
	}
	cm.gainMeso(-1000000);
	if (beauty == 1) {
	    cm.setSkin(skin[selection]);
	} else if (beauty == 2) {
	    cm.setHair(hairnew[selection]);
	} else if (beauty == 3) {
	    cm.setHair(haircolor[selection]);
	} else if (beauty == 4) {
	    cm.setFace(facenew[selection]);
	} else if (beauty == 5) {
	    cm.setFace(colors[selection]);
	}
	cm.dispose();
    }
}