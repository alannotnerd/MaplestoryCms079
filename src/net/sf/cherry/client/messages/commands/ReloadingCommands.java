package net.sf.cherry.client.messages.commands;

import java.rmi.RemoteException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.Command;
import net.sf.cherry.client.messages.CommandDefinition;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.client.messages.IllegalCommandSyntaxException;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.net.ExternalCodeTableGetter;
import net.sf.cherry.net.PacketProcessor;
import net.sf.cherry.net.RecvPacketOpcode;
import net.sf.cherry.net.SendPacketOpcode;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.scripting.portal.PortalScriptManager;
import net.sf.cherry.scripting.quest.QuestScriptManager;
import net.sf.cherry.scripting.reactor.ReactorScriptManager;
import net.sf.cherry.server.MapleShopFactory;
import net.sf.cherry.server.life.MapleMonsterInformationProvider;

public class ReloadingCommands
        implements Command {

    private static Logger log = LoggerFactory.getLogger(ReloadingCommands.class);

    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!重载家族")) {
            try {
                mc.dropMessage("Attempting to reload all guilds... this may take a while...");
                cserv.getWorldInterface().clearGuilds();
                mc.dropMessage("Guilds reloaded.");
            } catch (RemoteException re) {
                mc.dropMessage("RemoteException occurred while attempting to reload guilds.");
                log.error("RemoteException occurred while attempting to reload guilds.", re);
            }
        } else if (splitted[0].equals("!重载传送门")) {
            PortalScriptManager.getInstance().clearScripts();
            mc.dropMessage("传送门重载完毕！");
        } else if (splitted[0].equals("!重载任务")) {
            QuestScriptManager.getInstance().clearScripts();
            mc.dropMessage("Quest reloaded.");
        } else if (splitted[0].equals("!重载任务爆率")) {
            MapleMonsterInformationProvider.getInstance().clearDrops();
            mc.dropMessage("Drops and quest drops reloaded.");
        } else if (splitted[0].equals("!重载反应堆")) {
            ReactorScriptManager.getInstance().clearDrops();
            mc.dropMessage("反应堆重载完毕！");
        } else if (splitted[0].equals("!重载商店")) {
            MapleShopFactory.getInstance().clearShops();
            mc.dropMessage("反应堆重载完毕！");
        } else if (splitted[0].equals("!重载副本")) {
            for (ChannelServer instance : ChannelServer.getAllInstances()) {
                if (instance != null) {
                    instance.reloadEvents();
                }
            }
            mc.dropMessage("副本重载完毕！");
        } else if (splitted[0].equals("!重载指令")) {
            CommandProcessor.getInstance().reloadCommands();
            mc.dropMessage("Commands reloaded.");
        }
    }

    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("重载家族", "", "", 50), 
            new CommandDefinition("重载传送门", "", "", 50), 
            new CommandDefinition("重载任务爆率", "", "", 50),
            new CommandDefinition("重载反应堆", "", "", 50), 
            new CommandDefinition("重载副本", "", "", 50), 
            new CommandDefinition("重载任务", "", "", 50), 
            new CommandDefinition("重载商店", "", "", 50), 
            new CommandDefinition("重载指令", "", "", 50)};
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.messages.commands.ReloadingCommands
 * JD-Core Version:    0.6.0
 */