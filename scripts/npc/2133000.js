
importPackage(java.lang);

var status = 0;
var minLevel = 100; // GMS = 50 
var maxLevel = 250; // GMS = 200? recommended 70 - 119
var minPlayers = 1; // GMS = 3
var maxPlayers = 6; // GMS = 5 || but 6 makes it better :p
var open = false; //open or not
var PQ = 'HazePQ';

function start() {
    status = -1;
    action(1, 0, 0);
}
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
	if (cm.getPlayer().getMapId() != 910002000) { // not in pq lobby
		cm.sendSimple("Do you really want to leave this map now, and have to start all over if you want to try again?#b\r\n#L0#Yes! Get me out of here..#l");
	} else if (cm.getPlayer().getMapId() == 910002000) {
		cm.sendSimple("#e <Party Quest: Forest of Poison Haze>#n\r\nA mysterious force has poisoned the forest, and all of the soldiers at Altaire Camp are too busy to do anything. We need you! If you are #b Lv. 100 or higher#k, you can help!#b\r\n#L1#Enter Forest of Poison Haze.#l\r\n#L4#Listen to Elin's story.#l\r\n#L3#Ask about the Altaire Piece.#l\r\n#L2#Find a party.#l\r\n#L6#Check the number of tries left for today.#k");
	} else {
       cm.dispose();
   }
} else if (status == 1) {
	if (selection == 0) {
       cm.saveLocation("MULUNG_TC");
       cm.warp(910002000,0);
       cm.dispose();
   } else if (selection == 1) {
     if (cm.getParty() == null) { // No Party
       cm.sendYesNo("You need to create a party to do a Party Quest. Do you want to use the Party Search funtion?");
    } else if (!cm.isLeader()) { // Not Party Leader
       cm.sendOk("It is up to your party leader to proceed.");
       cm.dispose();
   } else if (cm.getPQLog(PQ) >= 10){
    cm.sendOk("sorry... you've tryed 10 times today alreddy..");
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
       var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
	    if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel &&(ccPlayer.getSkillLevel(ccPlayer.getStat().getSkillByJob(80001089, ccPlayer.getJob())) <= 0)) { // check if skill is correct
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
   var em = cm.getEventManager("Ellin");
   if (em == null || open == false) {
      cm.sendSimple("This PQ is not currently available.");
      cm.dispose();
  } else {
      var prop = em.getProperty("state");
      if (prop == null || prop.equals("0")) {
          em.startInstance(cm.getParty(),cm.getMap(), 200);
      } else {
          cm.sendSimple("Someone is already attempting the PQ. Please wait for them to finish, or find another channel.");
      }
             /*   for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}*/
		//cm.removeAll(4001453);//remove all orbis pq items
        cm.setPQLog('Hazepq');
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
    cm.sendNext("Oh, that's an Altaire Fragment! Altaire Fragments can be used to make special earrings here in Altaire Camp. If you can scrounge up 40 Altaire Fragments, I can make some for you.\r\n#b#L10#I have 40 Altaire Fragments!#l#k");
} else if (selection == 4) {
    cm.sendNext("This once was a clean, peaceful forest or fairies. But some time ago, a #r mysterious man in a black robe#k came, drove out the fairies, and started on a strange research. The forest is becoming more and more polluted because of his research. We must save the forest now!");
} else if (selection == 6) {
    var pqtry = 10 - cm.getPQLog(PQ);
    cm.sendOk("You can do this quest " + pqtry + " time(s) today.");
    cm.dispose();
}
}else if (status == 2) {
    if(selection == 10) {
        if(cm.haveItem(4001198,40)){
            if(!cm.canHold(1032101,1)) {
                cm.sendSimple("Please make some room for these earrings.");
            }
                        cm.gainItem(1032101, 1);// Goddess Wristband
                        cm.gainItem(4001198, -40);
                        cm.sendOk("Thank you so much. And enjoy your new Earrings");
                        cm.dispose();
                    }else{
                        cm.sendSimple("I'm afraid this isn't enough. If you want a #b Brilliant Altaire Earrings#k, bring me 40 Altaire Fragments.");
                        cm.dispose();
                    }
                }
                cm.sendNextPrev("The soldiers of Altaire Camp say they can't help... They're too busy excavating or whatever. Won't you please help?\r\n#e - Level#n: 70 or higher #r(Recommended Level: 70-119)#k \r\n #e- Time Limit#n: 20 min \r\n #e- Number of Players#n: 3-5 \r\n #e- Reward#n:#v1032101:# Brilliant Altaire Earrings");
                cm.dispose();
                if (status == 3) { 
                  cm.OpenUI("21");
                  cm.dispose();         
              }		else if (mode == 0) { 
                cm.OpenUI("21");
                cm.dispose();
            } 
        }
    }