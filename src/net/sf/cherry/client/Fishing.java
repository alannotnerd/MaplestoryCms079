package net.sf.cherry.client;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleMonsterInformationProvider.DropEntry;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Randomizer;

public class Fishing {
    protected static final Logger log = LoggerFactory.getLogger(Fishing.class);
	 
	private MapleCharacter player;
    private transient ScheduledFuture<?> fishTimer;
    private int fishTasking = 0;
    private static int 鱼饵 = 2300000; //鱼饵
    private static int 高级鱼饵 = 2300001;
    private static int fishingChair = 3011000; //椅子
    private static Map<Integer, List<DropEntry>> drops = new HashMap<Integer, List<DropEntry>>();
    private static Map<Integer, Integer> chanceCount = new HashMap<Integer, Integer>();

    public Fishing(MapleCharacter player, int fishtime)
    {
    	this.player = player;
    	fishingTimer2(fishtime);
    }
    
    public static boolean isFishingMap(int mapid) {
        return mapid == 741000200 || mapid == 741000201 || mapid == 741000202 || mapid == 741000203 || mapid == 741000204;
    }
    public static boolean isFishingChair(int Chairid) {
        return Chairid == fishingChair;
    }
    public static boolean hasFishingChair(MapleCharacter player) {
        return player.getItemQuantity(fishingChair, false) != 0;
    }
    public static boolean hasFishingBait(MapleCharacter player) {
        return player.getItemQuantity(鱼饵, false) != 0 || player.getItemQuantity(高级鱼饵, false) != 0;
    }
    
    public void fishingTimer2(int time) {

        fishTimer = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
	   			if (!isFishingMap(player.getMapId()) || !isFishingChair(player.getChair())) {
	   				player.cancelFishing();
	   				return;
	   			}

                if (fishTasking < 9) {
                    String gage = "";
                    for (int i = 0; i <= fishTasking; i++) {
                        gage += "●";
                    }
                    for (int i = 9; i > fishTasking; i--) {
                        gage += "○";
                    }
                    fishTasking++;
                    player.getClient().getSession().write(MaplePacketCreator.sendHint("钓鱼中...\r\n" + gage, 200, 200));
                } else {
                    fishTasking = 0;
                    if (!hasFishingBait(player)) {
                    	player.cancelFishing();
                        return;
                    }
                    int itemId = getdropItem();
                    if (player.getItemQuantity(高级鱼饵, false) >= 1) {
                    	player.gainExp(20000, true, false, false);
                    	MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 高级鱼饵, 1, true, false); 
                    	//没有钓到就再给一次机会
                    	if (itemId == 0)
                    		itemId = getdropItem();
                    	
                        if (itemId == 0) {
                        	player.getClient().getSession().write(MaplePacketCreator.sendHint("什么也没钓到！", 200, 200));
                        } else {
                        	
                        	if (!MapleInventoryManipulator.addById(player.getClient(), itemId,(short) 1, null))
                        	{
                        		//如果背包满了，就直接丢地上！！
                        		MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                        		IItem toDrop;
                                if (ii.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                                    toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                                } else {
                                    toDrop = new Item(itemId, (byte) 0, (short) 1);
                                }
                        		player.getMap().spawnItemDrop(player, player, toDrop, player.getPosition(), true, true);
                        	}
                        }
                    } else if (player.getItemQuantity(鱼饵, true) >= 1) {
                    	player.gainExp(10000, true, false, false);
                    	MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 鱼饵, 1, true, false); 
                    	if (itemId == 0) {
                        	player.getClient().getSession().write(MaplePacketCreator.sendHint("什么也没钓到", 200, 200));
                        } else {
                        	if (!MapleInventoryManipulator.addById(player.getClient(), itemId,(short) 1, null))
                        	{
                        		//如果背包满了，就直接丢地上！！
                        		MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                        		IItem toDrop;
                                if (ii.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                                    toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                                } else {
                                    toDrop = new Item(itemId, (byte) 0, (short) 1);
                                }
                        		player.getMap().spawnItemDrop(player, player, toDrop, player.getPosition(), true, true);
                        	}
                        }
                    }
                }
            }
        }, time, 0);
   }

    public void fishingTimer(int time) {
        fishTimer = TimerManager.getInstance().register(new Runnable() {
            @Override
            public void run() {
            	if (isFishingMap(player.getMapId()) || player.getChair()!= fishingChair) {
            		player.cancelFishing();
	   				 return;
	   			}
                if (fishTasking < 9) {
                    fishTasking++;
                    String 钓鱼成功 = "钓鱼成功!";
                    String 钓鱼开始 = "钓鱼开始!";
                    String 钓鱼中 = "钓鱼中***请稍等!";
                    if(fishTasking == 9){
                    	player.getClient().getSession().write(MaplePacketCreator.sendHint(钓鱼成功, 200, 200));
                    }else if(fishTasking > 1 && fishTasking < 9){
                    	player.getClient().getSession().write(MaplePacketCreator.sendHint(钓鱼中, 200, 200));
                    }else if(fishTasking <= 1){
                    	player.getClient().getSession().write(MaplePacketCreator.sendHint(钓鱼开始, 200, 200));
                    }
                } else {
                    fishTasking = 0;
                    if (!hasFishingBait(player)){
                    	player.cancelFishing();
                        return;
                    }
                    if (player.getItemQuantity(高级鱼饵, false) >= 1) {
                        //NPCScriptManager.getInstance().start(getClient(), 9900000, 1);
                        MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 高级鱼饵, 1, true, false);
                        //saveToDB(true);
                    } else if (player.getItemQuantity(鱼饵,false) >= 1) {
                        //NPCScriptManager.getInstance().start(getClient(), 9900000);
                        MapleInventoryManipulator.removeById(player.getClient(), MapleInventoryType.USE, 鱼饵, 1, true, false);
                        //saveToDB(true);
                    }
                }
            }
        }, time, time);
    }
    
    public void cancelFishing() {
        if (fishTimer != null) {
        	fishTimer.cancel(false);
            fishTimer = null;
            player.getClient().getSession().write(MaplePacketCreator.sendHint("钓鱼结束了!", 200, 5));
            if (!isFishingMap(player.getMapId())) {
                player.dropMessage("[钓鱼] 你离开了钓鱼场!");
            } else if (!isFishingChair(player.getChair())) {
            	player.dropMessage("[钓鱼] 你没有坐上钓鱼椅子无法钓鱼!");
            } else if (!hasFishingBait(player)) {
            	player.dropMessage("[钓鱼] 你没有鱼饵:高级鱼饵 = 0 ,普通鱼饵 = 0!");
            } else {
            	player.dropMessage("[钓鱼] 钓鱼结束了!");
            }
        }
        player.getClient().getSession().write(MaplePacketCreator.enableActions()); 
    }
    
    private List<DropEntry> getDrops(int mapid) {
        List<DropEntry> ret = drops.get(mapid);
        if (ret == null) {
        	synchronized(drops){
        		ret = drops.get(mapid);
        		if (ret == null) {
		            ret = new LinkedList<DropEntry>();
		            try {
		                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT itemid, chance FROM drops_fish WHERE mapid = ? AND chance >= 0");
		                ps.setInt(1, mapid);
		                ResultSet rs = ps.executeQuery();
		                while (rs.next()) {
		                    ret.add(new DropEntry(rs.getInt("itemid"), rs.getInt("chance")));
		                }
		                rs.close();
		                ps.close();
		            } catch (Exception e) {
		                log.error("Could not retrieve drops for fish " + mapid, e);
		            }
		            drops.put(mapid, ret);
        		}
        	}
        }
        return ret;
    }
    
    
    public int getdropItem() {
        List<DropEntry> chances = getDrops(player.getMapId());
        //钓鱼。一次只掉了一个物品，chance越大，机率越大
        
        Integer cCt = chanceCount.get(player.getMapId());
        if (cCt == null) {
        	synchronized (chanceCount) {
        		cCt = chanceCount.get(player.getMapId());
	        	if (cCt == null) {
		        	cCt = 0;
			        Iterator<DropEntry> iter = chances.iterator();
			        while (iter.hasNext()) {
			            DropEntry d = (DropEntry) iter.next();
			            cCt += d.chance;
			        }	
			        chanceCount.put(player.getMapId(), cCt);
	        	}
        	}
		}
        if (cCt == 0) {
        	return 0;
		}
        int ItemNum = Randomizer.getInstance().nextInt(cCt + 1);
        if (ItemNum == 0) {
        	// 0就是没有钓到鱼
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
