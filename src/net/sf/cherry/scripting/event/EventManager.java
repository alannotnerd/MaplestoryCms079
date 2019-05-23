package net.sf.cherry.scripting.event;

import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.script.Invocable;
import javax.script.ScriptException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.mina.FileoutputUtil;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.server.MapleSquad;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapObject;

public class EventManager {

	private Invocable iv;
	private ChannelServer cserv;
	private Map<String, EventInstanceManager> instances = new HashMap();
	private Properties props = new Properties();
	private String name;
	private MapleCharacter chr;
	private MapleClient c;
	private Map<Integer, MapleMapObject> mapobjects = new LinkedHashMap<Integer, MapleMapObject>();
	private MapleMap countMobOnMap;

	public EventManager(ChannelServer cserv, Invocable iv, String name) {
		this.iv = iv;
		this.cserv = cserv;
		this.name = name;
	}

	public int getHour() {
		Calendar cal = Calendar.getInstance();
		int hour = cal.get(11);
		return hour;
	}

	public void zidonglaba(String Text) {
		String ServerName = ChannelServer.getInstance(1).getServerNameMessage();
		if (Text.isEmpty()) {
			this.chr.dropMessage("[注意]文字过长，不能发送，最长为20个字！");
			return;
		}
		for (Iterator n$ = ChannelServer.getAllInstances().iterator(); n$.hasNext();) {
			ChannelServer cservs = (ChannelServer) n$.next();
			Iterator i$ = cservs.getPlayerStorage().getAllCharacters().iterator();
			while (i$.hasNext()) {
				MapleCharacter players = (MapleCharacter) i$.next();

			}
		}
	}

	public void save() {
		for (ChannelServer chan : ChannelServer.getAllInstances()) {
			for (MapleCharacter chr : chan.getPlayerStorage().getAllCharacters()) {
				chr.saveToDB(true);
			}
		}
	}

	public int getMin() {
		return Calendar.getInstance().get(Calendar.MINUTE);
	}

	public void cancel() {
		try {
			this.iv.invokeFunction("cancelSchedule", new Object[] { (Object) null });
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void schedule(final String methodName, long delay) {
		TimerManager.getInstance().schedule(new Runnable() {
			public void run() {
				try {
					iv.invokeFunction(methodName, (Object) null);

				} catch (ScriptException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				} catch (NoSuchMethodException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		}, delay);
	}

	public int countMobOnMap() {
		int count = 0;
		Collection<MapleMapObject> mmos = this.getMapObjects();
		for (MapleMapObject mmo : mmos) {
			if (mmo instanceof MapleMonster) {
				count++;
			}
		}
		return count;
	}

	public int countMobOnMap(int monsterid) {
		int count = 0;
		Collection<MapleMapObject> mmos = this.getMapObjects();
		for (MapleMapObject mmo : mmos) {
			if (mmo instanceof MapleMonster) {
				MapleMonster monster = (MapleMonster) mmo;
				if (monster.getId() == monsterid) {
					count++;
				}
			}
		}
		return count;
	}

	public void autoExp() {
		chr.gainipyz(+1);
		System.out.println("在线时间 " + chr.getipyz() + "");
	}

	public ScheduledFuture<?> scheduleAtTimestamp(final String methodName, long timestamp) {
		return TimerManager.getInstance().scheduleAtTimestamp(new Runnable() {
			public void run() {
				try {
					iv.invokeFunction(methodName, (Object) null);
				} catch (ScriptException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				} catch (NoSuchMethodException ex) {
					Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		}, timestamp);
	}

	public ChannelServer getChannelServer() {
		return this.cserv;
	}

	public EventInstanceManager getInstance(String name) {
		return (EventInstanceManager) this.instances.get(name);
	}

	public Collection<EventInstanceManager> getInstances() {
		return Collections.unmodifiableCollection(this.instances.values());
	}

	public EventInstanceManager newInstance(String name) {
		EventInstanceManager ret = new EventInstanceManager(this, name);
		this.instances.put(name, ret);
		return ret;
	}

	public void disposeInstance(String name) {
		this.instances.remove(name);
	}

	public Invocable getIv() {
		return this.iv;
	}

	public void setProperty(String key, String value) {
		this.props.setProperty(key, value);
	}

	public String getProperty(String key) {
		return this.props.getProperty(key);
	}

	public String getName() {
		return this.name;
	}

	public void startInstance1(MapleParty party, MapleMap map) {
		startInstance(party, map, 255);
	}

	public void startInstance(MapleParty party, MapleMap map) {
		try {
			EventInstanceManager eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
					new Object[] { (Object) null });
			eim.registerParty(party, map);
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void startInstance(MapleParty party, MapleMap map, boolean partyid) {
		try {
			EventInstanceManager eim;
			if (partyid)
				eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
						new Object[] { Integer.valueOf(party.getId()) });
			else
				eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
						new Object[] { (Object) null });

			eim.registerParty(party, map);
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void startInstance(MapleSquad squad, MapleMap map) {
		try {
			EventInstanceManager eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
					new Object[] { Integer.valueOf(squad.getLeader().getId()) });
			eim.registerSquad(squad, map);
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void startInstance(EventInstanceManager eim, String leader) {
		try {
			this.iv.invokeFunction("setup", new Object[] { eim });
			eim.setProperty("leader", leader);
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public EventInstanceManager startEventInstance(MapleParty party, MapleMap map, boolean partyid) {
		try {
			EventInstanceManager eim;
			if (partyid) {
				eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
						new Object[] { Integer.valueOf(party.getId()) });
			} else {
				eim = (EventInstanceManager) (EventInstanceManager) this.iv.invokeFunction("setup",
						new Object[] { (Object) null });
			}
			eim.registerParty(party, map);
			return eim;
		} catch (ScriptException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		} catch (NoSuchMethodException ex) {
			Logger.getLogger(EventManager.class.getName()).log(Level.SEVERE, null, ex);
		}
		return null;
	}

	public void startInstance(MapleParty party, MapleMap map, int maxLevel) {
		try {
			int averageLevel = 0;
			int size = 0;
			for (MaplePartyCharacter mpc : party.getMembers()) {
				if ((mpc.isOnline()) && (mpc.getMapid() == map.getId()) && (mpc.getChannel() == map.getChannel())) {
					averageLevel += mpc.getLevel();
					size++;
				}
			}
			if (size <= 0) {
				return;
			}
			averageLevel /= size;
			EventInstanceManager eim = (EventInstanceManager) this.iv.invokeFunction("setup",
					new Object[] { Integer.valueOf(Math.min(maxLevel, averageLevel)), Integer.valueOf(party.getId()) });
			eim.registerParty(party, map);
		} catch (ScriptException ex) {
			System.out.println(new StringBuilder().append("Event name : ").append(this.name)
					.append(", method Name : setup-partyid:\n").append(ex).toString());
			FileoutputUtil.log("log\\Script_Except.log", new StringBuilder().append("Event name : ").append(this.name)
					.append(", method Name : setup-partyid:\n").append(ex).toString());
		} catch (Exception ex) {
			// startInstance_NoID(party, map, ex);
		}
	}

	public Collection<MapleMapObject> getMapObjects() {
		return Collections.unmodifiableCollection(mapobjects.values());
	}
}
