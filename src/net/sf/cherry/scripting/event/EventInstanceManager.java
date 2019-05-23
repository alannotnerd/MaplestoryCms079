package net.sf.cherry.scripting.event;

import java.io.File;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.script.Invocable;
import javax.script.ScriptException;

import constants.ServerConfig;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.server.MapleSquad;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapFactory;
import net.sf.cherry.tools.MaplePacketCreator;

public class EventInstanceManager {
	private List<MapleCharacter> chars = new LinkedList<MapleCharacter>();
	private List<MapleMonster> mobs = new LinkedList<MapleMonster>();
	private Map<MapleCharacter, Integer> killCount = new HashMap<MapleCharacter, Integer>();
	private EventManager em;
	private MapleMapFactory mapFactory;
	private String name;
	private Properties props = new Properties();
	private long timeStarted = 0L;
	private long eventTime = 0L;
	private ScheduledFuture<?> OutTimer;

	public EventInstanceManager(EventManager em, String name) {
		this.em = em;
		this.name = name;
		this.mapFactory = new MapleMapFactory(
				MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Map.wz")),
				MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")));
		this.mapFactory.setChannel(em.getChannelServer().getChannel());
	}

	public void registerPlayer(MapleCharacter chr) {
		if ((chr != null) && (chr.getEventInstance() == null))
			try {
				this.chars.add(chr);
				chr.setEventInstance(this);
				this.em.getIv().invokeFunction("playerEntry", new Object[] { this, chr });
			} catch (ScriptException ex) {
				Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
			} catch (NoSuchMethodException ex) {
				Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
			}
	}

	public int getInstanceId() {
		return ChannelServer.getInstance(1).getInstanceId();
	}

	public void addInstanceId() {
		ChannelServer.getInstance(1).addInstanceId();
	}

	public void startEventTimer(long time) {
		this.timeStarted = System.currentTimeMillis();
		this.eventTime = time;
		scheduleAtTimestamp();
	}

	public boolean isTimerStarted() {
		return (this.eventTime > 0L) && (this.timeStarted > 0L);
	}

	public long getTimeLeft() {
		return this.eventTime - (System.currentTimeMillis() - this.timeStarted);
	}

	private void scheduleAtTimestamp() {
		final Invocable iv = this.em.getIv();
		OutTimer = TimerManager.getInstance().scheduleAtTimestamp(new Runnable() {
			public void run() {
				try {
					iv.invokeFunction("scheduledTimeout", (Object) this);
				} catch (ScriptException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				} catch (NoSuchMethodException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		}, eventTime);
	}

	public void registerParty(MapleParty party, MapleMap map) {
		for (MaplePartyCharacter pc : party.getMembers()) {
			MapleCharacter c = map.getCharacterById(pc.getId());
			registerPlayer(c);
		}
	}

	public void registerSquad(MapleSquad squad, MapleMap map) {
		for (MapleCharacter player : squad.getMembers())
			if (map.getCharacterById(player.getId()) != null)
				registerPlayer(player);
	}

	public void unregisterPlayer(MapleCharacter chr) {
		this.chars.remove(chr);
		chr.setEventInstance(null);
	}

	public int getPlayerCount() {
		return this.chars.size();
	}

	public List<MapleCharacter> getPlayers() {
		return new ArrayList<MapleCharacter>(this.chars);
	}

	public void registerMonster(MapleMonster mob) {
		this.mobs.add(mob);
		mob.setEventInstance(this);
	}

	public void unregisterMonster(MapleMonster mob) {
		this.mobs.remove(mob);
		mob.setEventInstance(null);
		if (this.mobs.size() == 0)
			try {
				this.em.getIv().invokeFunction("allMonstersDead", new Object[] { this });
			} catch (ScriptException ex) {
				Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
			} catch (NoSuchMethodException ex) {
				Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
			}
	}

	public void playerKilled(MapleCharacter chr) {
		try {
			this.em.getIv().invokeFunction("playerDead", new Object[] { this, chr });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public boolean revivePlayer(MapleCharacter chr) {
		try {
			Object b = this.em.getIv().invokeFunction("playerRevive", new Object[] { this, chr });
			if ((b instanceof Boolean))
				return ((Boolean) b).booleanValue();
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
		return true;
	}

	public void playerDisconnected(MapleCharacter chr) {
		try {
			this.em.getIv().invokeFunction("playerDisconnected", new Object[] { this, chr });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void monsterDamaged(MapleCharacter chr, MapleMonster mob, int damage) {
		try {
			this.em.getIv().invokeFunction("monsterDamaged",
					new Object[] { this, chr, Integer.valueOf(mob.getId()), Integer.valueOf(damage) });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void monsterKilled(MapleCharacter chr, MapleMonster mob) {
		try {
			Integer kc = (Integer) this.killCount.get(chr);
			int inc = ((Double) this.em.getIv().invokeFunction("monsterValue",
					new Object[] { this, Integer.valueOf(mob.getId()) })).intValue();
			if (kc == null)
				kc = Integer.valueOf(inc);
			else {
				kc = Integer.valueOf(kc.intValue() + inc);
			}
			this.killCount.put(chr, kc);
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public int getKillCount(MapleCharacter chr) {
		Integer kc = (Integer) this.killCount.get(chr);
		if (kc == null) {
			return 0;
		}
		return kc.intValue();
	}

	public void dispose() {
		this.chars.clear();
		this.mobs.clear();
		this.killCount.clear();
		this.mapFactory = null;
		this.em.disposeInstance(this.name);
		this.em = null;
	}

	public MapleMapFactory getMapFactory() {
		return this.mapFactory;
	}

	public void schedule(final String methodName, long delay) {
		TimerManager.getInstance().schedule(new Runnable() {

			public void run() {
				try {
					em.getIv().invokeFunction(methodName, EventInstanceManager.this);
				} catch (NullPointerException npe) {
				} catch (ScriptException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				} catch (NoSuchMethodException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		}, delay);
	}

	public String getName() {
		return this.name;
	}

	public void saveWinner(MapleCharacter chr) {
		PreparedStatement ps = null;
		try {
			ps = DatabaseConnection.getConnection().prepareStatement(
					"INSERT INTO eventstats (event, instance, characterid, channel) VALUES (?, ?, ?, ?)");
			ps.setString(1, this.em.getName());
			ps.setString(2, getName());
			ps.setInt(3, chr.getId());
			ps.setInt(4, chr.getClient().getChannel());
			ps.executeUpdate();
			ps.close();
		} catch (SQLException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} finally {
			try {
				if (ps != null)
					ps.close();
			} catch (SQLException ex) {
			}
		}
	}

	public MapleMap getMapInstance(int mapId) {
		boolean wasLoaded = this.mapFactory.isMapLoaded(mapId);
		MapleMap map = this.mapFactory.getMap(mapId);
		if ((!wasLoaded) && (this.em.getProperty("shuffleReactors") != null)
				&& (this.em.getProperty("shuffleReactors").equals("true"))) {
			map.shuffleReactors();
		}

		return map;
	}

	public void setProperty(String key, String value) {
		this.props.setProperty(key, value);
	}

	public Object setProperty(String key, String value, boolean prev) {
		return this.props.setProperty(key, value);
	}

	public String getProperty(String key) {
		return this.props.getProperty(key);
	}

	public void leftParty(MapleCharacter chr) {
		try {
			this.em.getIv().invokeFunction("leftParty", new Object[] { this, chr });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void disbandParty() {
		try {
			this.em.getIv().invokeFunction("disbandParty", new Object[] { this });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void finishPQ() {
		try {
			this.em.getIv().invokeFunction("clearPQ", new Object[] { this });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void removePlayer(MapleCharacter chr) {
		try {
			this.em.getIv().invokeFunction("playerExit", new Object[] { this, chr });
		} catch (ScriptException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public boolean isLeader(MapleCharacter chr) {
		return chr.getParty().getLeader().getId() == chr.getId();
	}

	public final boolean disposeIfPlayerBelow(byte size, int towarp) {
		MapleMap map = null;
		if (towarp > 0) {
			map = getMapFactory().getMap(towarp);
		}

		try {
			if ((this.chars != null) && (this.chars.size() <= size)) {
				final List<MapleCharacter> chrs = new LinkedList<MapleCharacter>(chars);
				for (MapleCharacter chr : chrs) {
					if (chr != null) {
						if (towarp > 0) {
							unregisterPlayer(chr);
							chr.changeMap(map, map.getPortal(0));
						}
					}
				}
				return true;
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
		}
		return false;
	}

	public void saveAllBossQuestPoints(int bossPoints) {
		for (MapleCharacter character : this.chars) {
			int points = character.getBossPoints();
			character.setBossPoints(points + bossPoints);
		}
	}

	public void saveBossQuestPoints(int bossPoints, MapleCharacter character) {
		int points = character.getBossPoints();
		character.setBossPoints(points + bossPoints);
	}

	public void broadcastPlayerMsg(int type, String message) {
		for (MapleCharacter chr : chars) {
			if (chr != null) {
				chr.dropMessage(type, message);
			}
		}
	}

}
