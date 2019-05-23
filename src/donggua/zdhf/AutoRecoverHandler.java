/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package donggua.zdhf;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.channel.IPlayerStorage;

/**
 *
 * @author apple
 */
public class AutoRecoverHandler implements Runnable{

    @Override
    public void run() {
        while(true){
            try {
                AutoRecover autoRecover = AutoRecover.getInstance();
                
                for(ChannelServer server: ChannelServer.getAllInstances()){
                    IPlayerStorage iPlayerStorage =  server.getPlayerStorage();
                    for(Map.Entry<Integer ,MemberInfo> entry : autoRecover.getMembers().entrySet()){
                        MapleCharacter player = iPlayerStorage.getCharacterById(entry.getKey());
                        if(player != null){
                            int quantityHp = player.getMaxHp() - player.getHp();
                            int quantityMp = player.getMaxMp() - player.getMp();
                            
                            int quantityRecoverHp = autoRecover.recocerPlayerHp(player.getId(), quantityHp);
                            int quantityRecoverMp = autoRecover.recocerPlayerHp(player.getId(), quantityMp);
                            
                            player.addHP(quantityRecoverHp);
                            player.addMP(quantityRecoverMp);
                        }
                    }
                }
                Thread.sleep(1000 * 10);
            } catch (InterruptedException ex) {
                Logger.getLogger(AutoRecoverHandler.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
    
}
