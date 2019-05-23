 package net.sf.cherry.net.channel.handler;
 
 import java.rmi.RemoteException;
import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.CommandProcessor;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class WhisperHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     byte mode = slea.readByte();
     if (mode == 6) {
       String recipient = slea.readMapleAsciiString();
       String text = slea.readMapleAsciiString();
 
       if ((text.length() > 70) && (!c.getPlayer().isGM()))
         return;
       if (!CommandProcessor.getInstance().processCommand(c, text)) {
         if (c.getPlayer().isMuted()) {
           c.getPlayer().dropMessage(5, c.getPlayer().isMuted() ? "You are " : "The map is muted, therefore you are unable to talk.");
           return;
         }
         MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
         if (player != null)
         {
           if ((player.isGM()) && (!c.getPlayer().isGM())) {
             c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
           } else {
             player.getClient().getSession().write(MaplePacketCreator.getWhisper(c.getPlayer().getName(), c.getChannel(), text));
             c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 1));
           }
         } else {
           Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
           for (ChannelServer cserv : cservs) {
             player = cserv.getPlayerStorage().getCharacterByName(recipient);
             if (player != null)
               break;
           }
           if (player != null)
             try {
               if ((player.isGM()) && (!c.getPlayer().isGM())) {
                 c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte)0));
               } else {
                 ChannelServer.getInstance(c.getChannel()).getWorldInterface().whisper(c.getPlayer().getName(), player.getName(), c.getChannel(), text);
                 c.getSession().write(MaplePacketCreator.getWhisperReply(recipient,(byte) 1));
               }
             } catch (RemoteException re) {
               c.getSession().write(MaplePacketCreator.getWhisperReply(recipient,(byte) 0));
               c.getChannelServer().reconnectWorld();
             }
           else
             c.getSession().write(MaplePacketCreator.getWhisperReply(recipient,(byte) 0));
         }
       }
     }
     else if (mode == 5) {
       String recipient = slea.readMapleAsciiString();
       MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
       if ((player != null) && ((!player.isGM()) || (c.getPlayer().isGM()))) {
         if (player.inCS())
           c.getSession().write(MaplePacketCreator.getFindReplyWithCS(player.getName()));
         else
           c.getSession().write(MaplePacketCreator.getFindReplyWithMap(player.getName(), player.getMap().getId()));
       }
       else {
         Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
         for (ChannelServer cserv : cservs) {
           player = cserv.getPlayerStorage().getCharacterByName(recipient);
           if (player != null)
             break;
         }
         if ((player != null) && ((!player.isGM()) || (c.getPlayer().isGM())))
           c.getSession().write(MaplePacketCreator.getFindReply(player.getName(), (byte)player.getClient().getChannel()));
         else
           c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte)0));
       }
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.WhisperHandler
 * JD-Core Version:    0.6.0
 */