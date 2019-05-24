package net.sf.cherry.net.channel;

import net.sf.cherry.client.MapleCharacter;

import java.util.Collection;

public interface IPlayerStorage {
  MapleCharacter getCharacterByName(String paramString);

  MapleCharacter getCharacterById(int paramInt);

  Collection<MapleCharacter> getAllCharacters();
}

