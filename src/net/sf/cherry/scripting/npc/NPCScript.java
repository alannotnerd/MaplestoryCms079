package net.sf.cherry.scripting.npc;

import java.util.List;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.world.MaplePartyCharacter;

public abstract interface NPCScript
{
  public abstract void start();

  public abstract void start(MapleCharacter paramMapleCharacter);

  public abstract void start(List<MaplePartyCharacter> paramList);

  public abstract void action(byte paramByte1, byte paramByte2, int paramInt);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.scripting.npc.NPCScript
 * JD-Core Version:    0.6.0
 */