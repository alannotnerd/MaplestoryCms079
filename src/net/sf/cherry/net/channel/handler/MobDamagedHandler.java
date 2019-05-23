package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.ISkill;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class MobDamagedHandler extends AbstractMaplePacketHandler {
    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if ((c.getPlayer().getJob().getId() >= 2000) || (c.getPlayer().getJob().getId() == 900)) 
        {
        	ISkill sk = SkillFactory.getSkill(21000000);
        	int playerSkillLevel = c.getPlayer().getSkillLevel(sk); 
	        if (playerSkillLevel > 0) {
	            if (c.getPlayer().getLastAttack() < System.currentTimeMillis() + 2500L) {  //2.5没攻击，就不算连击了
	                c.getPlayer().setCombo(c.getPlayer().getCombo() + 1);
	            } else {
	                c.getPlayer().setCombo(1);
	            }
	            switch (c.getPlayer().getCombo()) {
	                case 10:
	                case 20:
	                case 30:
	                case 40:
	                case 50:
	                case 60:
	                case 70:
	                case 80:
	                case 90:
	                case 100:
	                    if (playerSkillLevel < c.getPlayer().getCombo() / 10) {
	                        break;
	                    }
	                    sk.getEffect(c.getPlayer().getCombo() / 10).applyComboBuff(c.getPlayer(), c.getPlayer().getCombo());
	                    if (playerSkillLevel > 0 && c.getPlayer().getJob().getId() > 2110) {
	                        sk.getEffect(c.getPlayer().getCombo() / 10).爆击强化(c.getPlayer(), c.getPlayer().getCombo());
	                    }
	                    break;
	            }
	            c.getSession().write(MaplePacketCreator.Combo_Effect(c.getPlayer().getCombo()));
	            c.getPlayer().setLastAttack((int) System.currentTimeMillis());
	        }
        }
    }
}
