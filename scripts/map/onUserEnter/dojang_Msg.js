var messages = Array("Your courage for challenging the Mu Lung Dojo is commendable!", "If you want to taste the bitterness of defeat, come on in!", "I will make you thoroughly regret challenging the Mu Lung Dojo! Hurry up!");

function start(ms) {
	if (ms.getPlayer().getMap().getId() == 925020000) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120024);
	} else {
		ms.getPlayer().resetEnteredScript();
		ms.getPlayer().startMapEffect("Ha! Let's see what you got! I won't let you leave unless you defeat me first!", 5120000);
	}
}
