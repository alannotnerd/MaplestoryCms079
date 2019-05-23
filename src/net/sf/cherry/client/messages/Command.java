package net.sf.cherry.client.messages;

import net.sf.cherry.client.MapleClient;

public abstract interface Command {

    public abstract CommandDefinition[] getDefinition();

    public abstract void execute(MapleClient paramMapleClient, MessageCallback paramMessageCallback, String[] paramArrayOfString)
            throws Exception, IllegalCommandSyntaxException;
}