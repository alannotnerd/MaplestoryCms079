/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.server.maps;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventory;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.tools.MockIOSession;

/**
 *
 * @author Patrick/PurpleMadness
 */
public class FakeCharacter {

    private MapleCharacter ch;
    private MapleCharacter owner;
    private boolean follow = true;
    /*          元神系统 -  完爆079*/

    public FakeCharacter(MapleCharacter player, int id) {
       
        MapleCharacter clone = new MapleCharacter();
        clone.setFake();
        clone.setHair(player.getHair());
        clone.setFace(player.getFace());
        clone.setSkinColor(player.getSkinColor());
        clone.setName("■" + player.getName() + "の"  + "■", false);
        clone.setID(id + 1000000);
        clone.setLevel(player.getLevel());
        clone.setJob(player.getJob().getId());
        clone.setMap(player.getMap());
        clone.setPosition(player.getPosition());
        clone.silentGiveBuffs(player.getAllBuffs());
        MapleInventory equip;
        equip = clone.getInventory(MapleInventoryType.EQUIPPED);
        clone.getInventory(MapleInventoryType.EQUIPPED);
        //元神第一阶段
        //战士 魂骑士 骑士
    
        
        player.getMap().addBotPlayer(clone);
        clone.setClient(new MapleClient(null, null, new MockIOSession()) {
        });
        ch = clone;
        owner = player;
    }

    public MapleCharacter getFakeChar() {
        return ch;
    }

    public boolean follow() {
        return follow;
    }

    public void setFollow(boolean set) {
        follow = set;
    }

    public MapleCharacter getOwner() {
        return owner;
    }
}