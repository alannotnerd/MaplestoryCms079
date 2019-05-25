/* 
			Resonance
	NPC Name: 	Minister of Magic
	Map(s): 	Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  探索蘑菇森林(3)
*/

importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("Why did you even ask if you were going to say no to this?#");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendYesNo("I think i've heard of a potion that breaks these kinds of barriers. I think it's called #bKiller Mushroom Spores#k? Hmmm... outside, you'll find the Mushroom Scholar #bScarrs#k waiting outside. #bScarrs#k is an expert on mushrooms, so go talk to him.");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.sendOk("I am confident #kScarrs#k will do everything to help you.");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendOk("Ah, so you're the explorer people were talking about. I'm #bScarrs, the Royal Mushroom Scholar#k representing the Kingdom of Mushroom. So you need some #kKiller Mushroom Spores#k?");
    } else if (status == 1) {
        qm.gainExp(4200);
        qm.sendOk("#kKiller Mushroom Spores#k... I think i've heard of them before...");
        qm.completeQuest();
        qm.dispose();
    }
}