/* Lakelis
Kerning City - KPQ NPC
*/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	} else {
		if (mode == 0) {
			cm.sendOk("Okay.  Maybe next time.");
			cm.dispose();
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getParty() != null) {
			if (cm.isPartyLeader()) {
				var iter = cm.getChar().getMap().getCharacters().iterator();
				var partynum = 0;
				while (iter.hasNext()) {
					var curChar = iter.next();
					if (curChar.getParty() == cm.getParty()) {
						partynum += 1;
					}
				}
				if (partynum == 4 || cm.haveItem(1002140)) {
					if (cm.PlayerCount(103000800) == 0 && cm.PlayerCount(103000801) == 0  && cm.PlayerCount(103000802) == 0  && cm.PlayerCount(103000803) == 0  && cm.PlayerCount(103000804) == 0  && cm.PlayerCount(103000805) == 0) {
						var iter = cm.getChar().getMap().getCharacters().iterator();
						cm.gainItem(4001007, -(cm.itemQuantity(4001007)));
						cm.gainItem(4001008, -(cm.itemQuantity(4001008)));
						cm.setPortal(103000800, 2, false);
						cm.setPortal(103000801, 2, false);
						cm.setPortal(103000802, 2, false);
						cm.setPortal(103000803, 2, false);
						var partynum = 0;
							while (iter.hasNext()) {
							var curChar = iter.next();
							if (curChar.getParty() == cm.getParty()) {
								curChar.warpMapTo(103000800);
							}
						}
						cm.dispose();
					}else{
						cm.sendNext("Some other party has already gotten in to try clearing the quest. Please try again later.");
						cm.dispose();
					}
				}else{
					cm.sendNext("Your party is not a party of four. Please come back when you have four party members.");
					cm.dispose();
				}
			}else{
				cm.sendNext("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it unless with great teamwork. If you want to try it, please tell the #bleader of your party#k to talk to me.");
				cm.dispose();
			}
			}else{
				cm.sendNext("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it unless with great teamwork. If you want to try it, please tell the #bleader of your party#k to talk to me.");
				cm.dispose();
			}
		} else if (status == 1) {
			if (selection == 0) {
			cm.sendOk("See you later!");
			}else{
			cm.sendOk("The purpose of Kerning PQ is to collaborate with other players to try to aim for one goal.  Defeating the #bKing Slime#k.  I hope you will try this challenge.  There are three stages to this PQ...  #bStage 1#k is where you kill Ligators to obtain coupons.  Then depending on how much coupons you need, that's how much you need to get.  Once you get all the coupons you need you can click on #bCloto#k to go to the next stage.  At the #bLast Stage#k, you will need to collect 10 passes.  After you collect that you can move to the next stage.  In #bBonus#k you can kill the monsters there to obtain coupons.  Depending on how much you get, you can get various prizes! #bThis KPQ Patch has been made possible by Acrylic/Penguins of LiteMS (Removing this violates permission to use this KPQ script)#k");
			cm.dispose();
			}
			
		} else if (status == 2) {
			if (cm.haveItem(4001007) == false && cm.haveItem(4001008) == false ) {
			cm.warp(103000890);
			}else{
			cm.sendOk("You may not enter the PQ area when you have either #bCoupon#k or #bPass#k.");
			}
			cm.dispose();
		}
	}
}