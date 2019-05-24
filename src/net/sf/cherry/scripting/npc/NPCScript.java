package net.sf.cherry.scripting.npc;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.world.MaplePartyCharacter;

import java.util.List;

public interface NPCScript {
  void start();

  void start(MapleCharacter paramMapleCharacter);

  void start(List<MaplePartyCharacter> paramList);

  void action(byte paramByte1, byte paramByte2, int paramInt);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.scripting.npc.NPCScript
 * JD-Core Version:    0.6.0
 */