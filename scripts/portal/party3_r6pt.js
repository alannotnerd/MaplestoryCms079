function enter(pi) {
    var em = pi.getEventManager("OrbisPQ");
	if(em != null && pi.getPlayer().getPosition().y <= -4790){
	pi.warpS(pi.getMapId(), (pi.getPortal().getName().startsWith("rp01") ? 5 : (pi.getPortal().getName().startsWith("rp05") ? 1 : (pi.getPortal().getId() - 4))));
	pi.playerMessage(-1, "Incorrect combination.");
	pi.playerMessage(5, "B");
	}else if(em != null && pi.getPlayer().getPosition().y <= -3640){
   // if (em != null && em.getProperty("stage6_" + (pi.getPortal().getName().substring(2, 5)) + "").equals("1")) {
   // if (em != null && pi.getPlayer().getPosition().y <= -3640) {
	pi.warpS(pi.getMapId(),(pi.getPortal().getName().startsWith("rp08") ? 2 : (pi.getPortal().getId() + 4)));
	pi.playerMessage(-1, "Correct combination!");
	pi.playerMessage(5, "A");
   }else if (em != null && em.getProperty("stage6_" + (pi.getPortal().getName().substring(2, 5)) + "").equals("1")) {
	pi.warpS(pi.getMapId(),(pi.getPortal().getName().startsWith("rp08") ? 2 : (pi.getPortal().getId() + 4)));
	pi.playerMessage(-1, "Correct combination!");
	pi.playerMessage(5, "A");
    } else {
	pi.warpS(pi.getMapId(), (pi.getPortal().getName().startsWith("rp01") ? 5 : (pi.getPortal().getName().startsWith("rp05") ? 1 : (pi.getPortal().getId() - 4))));
	pi.playerMessage(-1, "Incorrect combination.");
	pi.playerMessage(5, "B");
    }
}