package net.sf.cherry.net.channel;

import net.sf.cherry.client.MapleCharacter;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class PlayerStorage
    implements IPlayerStorage {
  private final ReentrantReadWriteLock locks = new ReentrantReadWriteLock();
  private final Lock wlock = locks.writeLock();
  private final Map<Integer, MapleCharacter> storage = new LinkedHashMap<Integer, MapleCharacter>();
  Map<String, MapleCharacter> nameToChar = new LinkedHashMap();
  Map<Integer, MapleCharacter> idToChar = new LinkedHashMap();

  public void registerPlayer(MapleCharacter chr) {
    this.nameToChar.put(chr.getName().toLowerCase(), chr);
    this.idToChar.put(Integer.valueOf(chr.getId()), chr);
  }

  public void deregisterPlayer(MapleCharacter chr) {
    this.nameToChar.remove(chr.getName().toLowerCase());
    this.idToChar.remove(Integer.valueOf(chr.getId()));
  }

  public MapleCharacter getCharacterByName(String name) {
    return this.nameToChar.get(name.toLowerCase());
  }

  public MapleCharacter getCharacterById(int id) {
    return this.idToChar.get(Integer.valueOf(id));
  }

  public Collection<MapleCharacter> getAllCharacters() {
    return this.nameToChar.values();
  }

  public final void disconnectAll() {
    wlock.lock();
    try {
      final Iterator<MapleCharacter> chrit = storage.values().iterator();
      while (chrit.hasNext()) {
        chrit.next().getClient().disconnect();
        chrit.remove();
      }
    } finally {
      wlock.unlock();
    }
  }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.PlayerStorage
 * JD-Core Version:    0.6.0
 */