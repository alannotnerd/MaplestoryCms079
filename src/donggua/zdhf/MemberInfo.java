/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package donggua.zdhf;

import java.io.Serializable;

/**
 *
 * @author apple
 */
public class MemberInfo implements Serializable{
    
    /**玩家ID*/
    private int charId;
    
    /**剩余的血量和蓝量存储*/
    private int storeHp;
    private int storeMp;

    /**
     * @return the storeHp
     */
    public int getStoreHp() {
        return storeHp;
    }

    /**
     * @param storeHp the storeHp to set
     */
    public void setStoreHp(int storeHp) {
        this.storeHp = storeHp;
    }

    /**
     * @return the storeMp
     */
    public int getStoreMp() {
        return storeMp;
    }

    /**
     * @param storeMp the storeMp to set
     */
    public void setStoreMp(int storeMp) {
        this.storeMp = storeMp;
    }

    /**
     * @return the charId
     */
    public int getCharId() {
        return charId;
    }

    /**
     * @param charId the charId to set
     */
    public void setCharId(int charId) {
        this.charId = charId;
    }
    
    
}
