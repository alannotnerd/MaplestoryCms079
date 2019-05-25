importPackage(java.lang);
//function action(mode, type, selection) {
   /* var em = cm.getEventManager("Juliet");
    if (em == null || !cm.getPlayer().isGM()) {
	cm.sendOk("Please try again later.");
	cm.dispose();
	return;
}*/
   // switch(cm.getPlayer().getMapId()) {
   //if(mapid == 261000021) {
   	var status = 0;
var minLevel = 50; // GMS = 50 
var maxLevel = 250; // GMS = 200? recommended 50 - 69
var minPlayers = 1; // GMS = 3
var maxPlayers = 6; // GMS = 4 || but 6 makes it better :p
var open = true;//open or not
var PQ = 'julietpq';

function start() {
	status = -1;
	action(1, 0, 0);
}

   // action(1, 0, 0);
   function action(mode, type, selection) {
   	if (status >= 1 && mode == 0) {
        cm.sendOk("Ask your friends to join your party. You can use the Party Search funtion (hotkey O) to find a party anywhere, anytime."); // gms has spelling mistakes.. 
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 0) {
    	cm.dispose();
    	return;
    }
    if (mode == 1)
    	status++;
    else
    	status--;

    if (status == 0) {
    	var mapid = cm.getPlayer().getMapId();
    	if(mapid == 926110000) {
    		cm.sendOk("You should try investigating around here. Look at the files in the Library until you can find the entrance to the Lab.");
    		cm.dispose();
    	} else if(mapid == 926110001) {
    		cm.sendOk("Please, eliminate all the monsters! I'll come right behind you.");
    		cm.dispose();
    	}else if(mapid == 926110100) {
    		cm.sendOk("These beakers have leaks in them. We must pour the Suspicious Liquid to the beakers' brims so we can continue.");
    		cm.dispose();
    	}else if(mapid == 926110200) {
    		if (cm.haveItem(4001131,1)) {
    			cm.sendOk("Oh, the Letter I wrote! Thank you!");
    			cm.gainItem(4001131,-1);
    			em.setProperty("stage", "1");
    		} else if (cm.haveItem(4001134,1)) {
    			cm.gainItem(4001134,-1);
    			cm.sendOk("Thank you! Now please find the Zenumist files.");
    			em.setProperty("stage4", "1");
    		} else if (cm.haveItem(4001135,1) && em.getProperty("stage4").equals("1")) {
    			cm.gainItem(4001135,-1);
    			cm.sendOk("Thank you! Now please continue.");
    			em.setProperty("stage4", "2");
    			cm.getMap().getReactorByName("jnr3_out3").hitReactor(cm.getClient());
    		} else {
    			cm.sendOk("We must stop the conflict between Alcadno and Zenumist! Find me Alcadno files first, then Zenumist!");
    		}
    		cm.dispose();
    	}else if(mapid == 926110300) {
    		cm.sendOk("We must get to the top of the Lab, each of your members.");
    		cm.dispose();
    	}else if(mapid == 926110400) {
    		cm.sendOk("Whenever you are ready, we shall go and save my love.");
    		cm.dispose();
    	}else if(mapid == 926110401) {
    cm.warpParty(926110500);
    cm.dispose();
} else if (cm.getPlayer().getMapId() == 910002000) {
		cm.sendSimple("#e <Party Quest: Romeo and Juliet>#n \r\nMagatia faces a grave threat. We need brave adventurers to answer our call.#b\r\n#L1#Start the quest.#l\r\n#L3#Listen to Juliet's story.#l\r\n#L2#Find a party.#l\r\n#L4#Make a necklace with Alcadno Marbles.#l\r\n#L5#Combine two necklaces into one. #l\r\n#L6#I want to check the number of tries left for today.#k");// last not GMS like
	} else {
		cm.dispose();
	}
} else if (status == 1) {
	if (selection == 0) {
		cm.saveLocation("MULUNG_TC");
		cm.warp(261000021,0);
		cm.dispose();
	} else if (selection == 1) {
     if (cm.getParty() == null) { // No Party
     	cm.sendYesNo("You need to create a party to do a Party Quest. Do you want to use the Party Search funtion?");
    } else if (!cm.isLeader()) { // Not Party Leader
    	cm.sendOk("It is up to your party leader to proceed.");
    	cm.dispose();
		} else if (cm.getPQLog(PQ) >= 10){
     	cm.sendOk("It seems like you have done this PQ 10 times today, please come back tomorrow.");
     	cm.dispose();
     } else if (!cm.allMembersHere()) {
        cm.sendOk("Some of your party members are in a different map. Please try again once everyone is together.");
        cm.dispose();
    } else {
	// Check if all party members are over lvl 50
	var party = cm.getParty().getMembers();
	var mapId = cm.getMapId();
	var next = true;
	var levelValid = 0;
	var inMap = 0;

	var it = party.iterator();
	while (it.hasNext()) {
		var cPlayer = it.next();
		if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
			levelValid += 1;
		} else {
			cm.sendOk("You need to be between level " + minLevel + " and " + maxLevel + " to take on this epic challenge!");
			cm.dispose();
			next = false;
		} 
		if (cPlayer.getMapid() == mapId) {
		inMap += 1;
	}
}
if (party.size() > maxPlayers || inMap < minPlayers) {
	next = false;
}
        if (next) {
        	var em = cm.getEventManager("Juliet");
        	if (em == null || open == false) {
        		cm.sendSimple("This PQ is not currently available.");
        		cm.dispose();
        	} else {
        		var prop = em.getProperty("state");
        		if (prop == null || prop.equals("0")) {
        			em.startInstance(cm.getParty(),cm.getMap(), 70);
        		} else {
		    cm.sendSimple("Someone is already attempting the PQ. Please wait for them to finish, or find another channel.");
		}
             /*   for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}*/
		//cm.removeAll(4001453);//remove all orbis pq items
		cm.setPQLog(PQ);
		cm.dispose();
	} 
} else {
            cm.sendYesNo("Your party is not a party between " + minPlayers + " and " + maxPlayers + " party members. Please come back when you have between " + minPlayers + " and " + maxPlayers + " party members.");
        } 
    }
} else if (selection == 2) {
	cm.OpenUI("21");
    cm.dispose();

        } else if (selection == 3) {
        	cm.sendOk("Show your bravery, and help defend the peace in Magatia!\r\n #e - Level:#n 70 or higher #r(Recommeded Level:70-119)#k\r\n #e - Time Limit:#n 20 min \r\n #e - Number of Players:#n 4 \r\n #e - Reward: \r\n #n#v1122117:# Juliet's Pendant \r\n (Can be obtained from #bJuliet#k once you collect #r20#k #bAlcadno Marbles#k) \r\n #v1122118:# Symbol of Eternal Love \r\n (Can be traded for 1 #bRomeo's Pendant#k and 1 #bJuliet's Pendant#k)");
        	cm.dispose();
	} else if (selection == 4) {
		cm.sendOk("If you have #r20#k #bAlcadno Marbles#k, I can give you my Pendant. Would you like to get the Pendant now?#b\r\n#L10#Yes! Give me the Pendant#l");
		} else if(selection == 5) {
			if(cm.haveItem(1122117, 1) && cm.haveItem(1122116, 1)) {
				cm.sendOk("Here you go!");
				cm.gainItem(1122116, -1);
				cm.gainItem(1122117, -1);
				cm.gainItem(1122118, 1);
				cm.dispose();
			}else{
				cm.sendOk("Please make sure you have both the Romeo's Pendant, and Juliet's Pendant.");
				cm.dispose();
			}
		}else if (selection == 6) {
			var pqtry = 10 - cm.getPQLog(PQ);
			if (pqtry >= 10){
				cm.sendOk("You can do this quest " + pqtry + " time(s) today.");
				cm.dispose();
			}
		}
	}else if (status == 2) {
		if (selection == 10) {
			if (!cm.canHold(1122117,1)) {
				cm.sendOk("Please make some room for the Pendant");
			}else if (cm.haveItem(4001160,20)) {
			cm.gainItem(1122117, 1);// Goddess Wristband
			cm.gainItem(4001160, -20);
			cm.sendOk("Thank you so much. And enjoy your new Pendant");
			cm.dispose();
		}else{
			cm.sendOk("Do you want me to make a Pendant for you? Then bring me 20 Alcadno Marbles!");
			cm.dispose();
		}  
	} else if (cm.getMapId != 910002000) {
		cm.OpenUI("21");
		cm.dispose();
	}
	else if (status == 3) { 
		cm.OpenUI("21");
		cm.dispose();         
	}		else if (mode == 0) { 
		cm.dispose();
	} 
}
}

	/*case 926110000:
	    cm.sendOk("You should try investigating around here. Look at the files in the Library until you can find the entrance to the Lab.");
	    break;
	case 926110001:
	    cm.sendOk("Please, eliminate all the monsters! I'll come right behind you.");
	    break;
	case 926110100:
	    cm.sendOk("These beakers have leaks in them. We must pour the Suspicious Liquid to the beakers' brims so we can continue.");
	    break;
	case 926110200:
	    if (cm.haveItem(4001131,1)) {
		cm.sendOk("Oh, the Letter I wrote! Thank you!");
		cm.gainItem(4001131,-1);
		em.setProperty("stage", "1");
	    } else if (cm.haveItem(4001134,1)) {
		cm.gainItem(4001134,-1);
		cm.sendOk("Thank you! Now please find the Zenumist files.");
		em.setProperty("stage4", "1");
	    } else if (cm.haveItem(4001135,1) && em.getProperty("stage4").equals("1")) {
		cm.gainItem(4001135,-1);
		cm.sendOk("Thank you! Now please continue.");
		em.setProperty("stage4", "2");
		cm.getMap().getReactorByName("jnr3_out3").hitReactor(cm.getClient());
	    } else {
	    	cm.sendOk("We must stop the conflict between Alcadno and Zenumist! Find me Alcadno files first, then Zenumist!");
	    }
	    break;
	case 926110300:
	    cm.sendOk("We must get to the top of the Lab, each of your members.");
	    break;
	case 926110400:
	    cm.sendOk("Whenever you are ready, we shall go and save my love.");
	    break;
	case 926110401:
	    cm.warpParty(926110500); //urete
	    break;
    //}
    //cm.dispose();*/