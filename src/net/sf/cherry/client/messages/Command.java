package net.sf.cherry.client.messages;

import net.sf.cherry.client.MapleClient;

public interface Command {

  CommandDefinition[] getDefinition();

  void execute(MapleClient paramMapleClient, MessageCallback paramMessageCallback, String[] paramArrayOfString)
      throws Exception;
}