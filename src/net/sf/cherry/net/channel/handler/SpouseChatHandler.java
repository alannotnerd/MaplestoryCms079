 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SpouseChatHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     String recipient = slea.readMapleAsciiString();
     String text = slea.readMapleAsciiString();
     if (!CommandProcessor.getInstance().processCommand(c, text)) {
       MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
       if (player != null) {
         player.getClient().getSession().write(MaplePacketCreator.spouseChat(c.getPlayer().getName(), text, 5));
         c.getSession().write(MaplePacketCreator.spouseChat(c.getPlayer().getName(), text, 4));
       }
       else {
         try {
           if (ChannelServer.getInstance(c.getChannel()).getWorldInterface().isConnected(recipient)) {
             ChannelServer.getInstance(c.getChannel()).getWorldInterface().spouseChat(c.getPlayer().getName(), recipient, text);
             c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte)1));
           }
           else {
             c.getSession().write(MaplePacketCreator.getWhisperReply(recipient,(byte) 0));
           }
         }
         catch (RemoteException e) {
           c.getSession().write(MaplePacketCreator.getWhisperReply(recipient,(byte) 0));
           c.getChannelServer().reconnectWorld();
         }
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SpouseChatHandler
 * JD-Core Version:    0.6.0
 */