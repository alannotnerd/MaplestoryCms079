/**
-- Krypto JavaScript ------------------------------------------------------------------------------
	4th Job Quest
-- By ---------------------------------------------------------------------------------------------
	?
-- Description ------------------------------------------------------------------------------------
	Warrior Berserk Skill Quest
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version
-- Additional Comments ----------------------------------------------------------------------------
	Check the text neither is official or not
---------------------------------------------------------------------------------------------------
**/

function enter(pi) {
	if(pi.getPlayer().getEventInstance().getProperty("canWarp")) {
		pi.warp(910500200, "out01");
		return true;
	} else {
		pi.playerMessage("You must defeat all the monsters first.");
		return true;
	}
}