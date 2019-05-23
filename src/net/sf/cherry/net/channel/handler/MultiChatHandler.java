 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class MultiChatHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     int type = slea.readByte();
     int numRecipients = slea.readByte();
     int[] recipients = new int[numRecipients];
     for (int i = 0; i < numRecipients; i++) {
       recipients[i] = slea.readInt();
     }
     String chattext = slea.readMapleAsciiString();
     if ((chattext.length() > 70) && (!c.getPlayer().isGM())) {
       return;
     }
     if (!CommandProcessor.getInstance().processCommand(c, chattext)) {
       MapleCharacter player = c.getPlayer();
       if (player.isMuted()) {
         player.dropMessage(5, player.isMuted() ? "You are " : "The map is muted, therefore you are unable to talk.");
         return;
       }
       try {
         if (type == 0) {
           c.getChannelServer().getWorldInterface().buddyChat(recipients, player.getId(), player.getName(), chattext);
         } else if ((type == 1) && (player.getParty() != null)) {
           c.getChannelServer().getWorldInterface().partyChat(player.getParty().getId(), chattext, player.getName());
         } else if ((type == 2) && (player.getGuildId() > 0)) {
           c.getChannelServer().getWorldInterface().guildChat(c.getPlayer().getGuildId(), c.getPlayer().getName(), c.getPlayer().getId(), chattext);
         } else if ((type == 3) && (player.getGuild() != null)) {
           int allianceId = player.getGuild().getAllianceId();
           if (allianceId > 0)
             c.getChannelServer().getWorldInterface().allianceMessage(allianceId, MaplePacketCreator.multiChat(player.getName(), chattext, 3), player.getId(), -1);
         }
       }
       catch (RemoteException e) {
         c.getChannelServer().reconnectWorld();
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MultiChatHandler
 * JD-Core Version:    0.6.0
 */