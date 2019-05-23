package net.sf.cherry.net.channel;

import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;

public abstract interface IPlayerStorage
{
  public abstract MapleCharacter getCharacterByName(String paramString);

  public abstract MapleCharacter getCharacterById(int paramInt);

  public abstract Collection<MapleCharacter> getAllCharacters();
}

