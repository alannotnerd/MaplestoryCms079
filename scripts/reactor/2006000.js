/*@author Jvlaple
 * Spawns Eak When 20 Clouds are Dropped.
  *2006000.js
  */

function act() {
    rm.mapMessage(5, "��ΧͻȻһ�����⣬�������˳����ˡ�");
    rm.spawnNpc(2013001);
    var em = rm.getEventManager("OrbisPQ");
    if (em != null) {
        rm.givePartyExp(10000);
        em.setProperty("pre", "1");
    }
}