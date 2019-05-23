/* Dawnveil
    [Ellinel Fairy Academy] The Search Concluded
	Cootie
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
	    qm.sendNext("Hey, #b#h ##k. I was just telling the Headmistress what we found...",4);	
	} else if (status == 1) { 
	    qm.sendNextPrev("You believe the children were trying to stage a play?",4,1500001);
	} else if (status == 2) { 
	    qm.sendNextPrev("Everything we found points to it. Do you think that's why the kids are missing?",4);	
	} else if (status == 3) { 
	    qm.sendNextPrev("This is all my fault, Headmistress Ivana.",4,1500002);
	} else if (status == 4) { 
	    qm.sendNextPrev("......",4,1500002);
	} else if (status == 5) { 
	    qm.sendNextPrev("A few days past, I caught the children mimicking the heroes of humankind, so I admonished them.",4,1500002);
	} else if (status == 6) { 
	    qm.sendNextPrev("Why did you punish them? It's only natural for kids to admire heroes. When I was their age, I used to--",4);
	} else if (status == 7) { 
	    qm.sendNextPrev("We do not spend our time dreaming about humans.\r\n\r\nI could not have known the children would have been so insistent. They must have begun rehearsing in secret.",4,1500002);
	} else if (status == 8) { 
	    qm.sendNextPrev("They must have gone somewhere dangerous to stay away from you... Like the forest...",4);
	} else if (status == 9) { 
	    qm.sendNextPrev("If... If something bad were to happen to the children, I-I can't...",4,1500002);
	} else if (status == 10) { 
	    qm.sendNextPrev("Calm down, Kalayan. We need to remain poised.",4,1500001);
	} else if (status == 11) { 
		qm.forceStartQuest();
		qm.dispose();
	}
}

function end(mode, type, selection) {
if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
	    qm.sendAcceptDecline("I owe you an apology. We completely misunderstood your intentions here. I hope you will continue to help us find the children.");
	} else if (status == 1) {
	    qm.sendNext("I need to think about how to find the missing students. Give me some time, please.");
		qm.completeQuest();
		qm.gainExp(1600);
	    qm.dispose();		
	}
  }
}