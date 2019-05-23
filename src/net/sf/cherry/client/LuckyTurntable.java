/*
 * 幸运转盘，以物换物
 * 使用一个物品随机获得另外一个物品，掉落物及掉落率通过表drops_useitem设置
 * 
 */
package net.sf.cherry.client;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.life.MapleMonsterInformationProvider.DropEntry;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;

public class LuckyTurntable {
	protected static final Logger log = LoggerFactory.getLogger(LuckyTurntable.class);
	
	private static final LuckyTurntable instance = new LuckyTurntable();
	private static Map<Integer, List<DropEntry>> drops = new HashMap<Integer, List<DropEntry>>();
	private static Map<Integer, Integer> chanceCount = new HashMap<Integer, Integer>();

	
    public static LuckyTurntable getInstance() {
        return instance;
    }
    
    private List<DropEntry> getDrops(int itemId) {
        List<DropEntry> ret = drops.get(itemId);
        if (ret == null) {
        	synchronized(drops){
        		ret = drops.get(itemId);
        		if (ret == null) {
		            ret = new LinkedList<DropEntry>();
		            try {
		                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT dropitemId, chance FROM drops_useitem WHERE itemId = ? AND chance > 0");
		                ps.setInt(1, itemId);
		                ResultSet rs = ps.executeQuery();
		                while (rs.next()) {
		                    ret.add(new DropEntry(rs.getInt("dropitemId"), rs.getInt("chance")));
		                }
		                rs.close();
		                ps.close();
		            } catch (Exception e) {
		                log.error("Could not retrieve drops for UseItem " + itemId, e);
		            }
		            drops.put(itemId, ret);
        		}
        	}
        }
        return ret;
    }
    public boolean UseAItemToTurntable(MapleClient c, int ItemId){
    	if (c.getPlayer().getItemQuantity(ItemId, false) < 1) {
    		c.getPlayer().dropMessage("哎呀卧槽，你特么东西都没得，是咋个跑到这来的呐!");
    		return false;
    	}
    	int DropItemId = getdropItem(ItemId);
    	if (!MapleInventoryManipulator.checkSpace(c, DropItemId, 1, null))
    	{
    		c.getSession().write(MaplePacketCreator.getShowInventoryFull());
    		c.getPlayer().dropMessage("背包空间不足！");
    		return false;
    	}else{
    		if (MapleInventoryManipulator.addById(c.getPlayer().getClient(), DropItemId,(short) 1, null))
	    	{
		    	//使用物品
		    	MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(ItemId);
		    	MapleInventoryManipulator.removeById(c, type, ItemId, 1, true, false);
		    	c.getSession().write(MaplePacketCreator.getShowItemGain(DropItemId, (short)1, true)); //显示语句

		    	return true;
	    	}else{
	    		c.getPlayer().dropMessage("物品使用失败，请稍后重试！");
	    	}    		
    	}
    	return false;
    }
    
    public int getdropItem(int itemId) {
        List<DropEntry> chances = getDrops(itemId);
        //一次只掉了一个物品，chance越大，机率越大
        Integer cCt = chanceCount.get(itemId);
        if (cCt == null) {
        	synchronized (chanceCount) {
        		cCt = chanceCount.get(itemId);
	        	if (cCt == null) {
		        	cCt = 0;
			        Iterator<DropEntry> iter = chances.iterator();
			        while (iter.hasNext()) {
			            DropEntry d = (DropEntry) iter.next();
			            cCt += d.chance;
			        }	
			        chanceCount.put(itemId, cCt);
	        	}
        	}
		}
        if (cCt == 0) {
        	return 0;
		}
        int ItemNum = Randomizer.getInstance().nextInt(cCt + 1);
        if (ItemNum == 0) {
        	// 什么也没转到
			return 0;
		}
        
        Iterator<DropEntry> iter = chances.iterator();
        while (iter.hasNext()) {
            DropEntry d = (DropEntry) iter.next();
            ItemNum -= d.chance;
            if (ItemNum <= 0) {
				return d.itemid;
			}
        }	
        return 0;
    }
    
}
