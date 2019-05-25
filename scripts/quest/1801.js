/* Dawnveil
    [Evolution System] Left Behind
	 Claudine
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
	    qm.sendNext("Thank you for coming. I'll explain more about the underground mine situation, but first... You know who this is?",1);
	} else if (status == 1) {
		qm.sendNextPrev("I know that face!",3);
	} else if (status == 2) {
	    qm.sendNextPrev("You should. She is the founder of the Black Wings and the commander of the Black Mage's Army...",1);
	} else if (status == 3) {
	    qm.sendNextPrev("Orchid.",3);
	} else if (status == 4) {
	    qm.sendNextPrev("She is the reason our city was taken. She is the one who masterminded the theft of the Seal Stones, attacked Mercedes... That such a small girl could have caused so much havoc...",1);
	} else if (status == 5) {
		qm.sendNextPrev("She's been quiet for a while now, so I knew there must be trouble brewing. The Black Wings appear to have had a coup.",1);
	} else if (status == 6) {
		qm.sendNextPrev("We've pieced together some information suggesting that Orchid was ousted from her position. We're not sure why, but there has been a huge shake-up in the command structure of the Black Wings.",1);
	} else if (status == 7) {
		qm.sendNextPrev("It all seems to have begun when Orchid was betrayed by the scientist...",1);
	} else if (status == 8) {
	    qm.warp(957020001);
        qm.dispose();
	}
}

function end(mode, type, selection) {
      qm.dispose();		
}       
  
  