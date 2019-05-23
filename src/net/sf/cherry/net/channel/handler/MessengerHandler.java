package net.sf.cherry.net.channel.handler;

import java.rmi.RemoteException;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class MessengerHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());

        byte mode = slea.readByte();
        MapleCharacter player = c.getPlayer();
        WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
        MapleMessenger messenger = player.getMessenger();

        switch (mode) {
            case 0:
                if (messenger == null) {
                    int messengerid = slea.readInt();
                    if (messengerid == 0) {
                        try {
                            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(player);
                            messenger = wci.createMessenger(messengerplayer);
                            player.setMessenger(messenger);
                            player.setMessengerPosition(0);
                        } catch (RemoteException e) {
                            c.getChannelServer().reconnectWorld();
                        }
                    } else {
                        try {
                            messenger = wci.getMessenger(messengerid);
                            int position = messenger.getLowestPosition();
                            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(player, position);
                            if ((messenger != null)
                                    && (messenger.getMembers().size() < 3)) {
                                player.setMessenger(messenger);
                                player.setMessengerPosition(position);
                                wci.joinMessenger(messenger.getId(), messengerplayer, player.getName(), messengerplayer.getChannel());
                            }
                        } catch (RemoteException e) {
                            c.getChannelServer().reconnectWorld();
                        }
                    }
                }
                break;
            case 2:
                if (messenger != null) {
                    MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(player);
                    try {
                        wci.leaveMessenger(messenger.getId(), messengerplayer);
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                    player.setMessenger(null);
                    player.setMessengerPosition(4);
                }
                break;
            case 3:
                if (messenger.getMembers().size() < 3) {
                    String input = slea.readMapleAsciiString();
                    MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(input);
                    if (target != null) {
                        if (target.getMessenger() == null) {
                            if ((target.isGM()) && (!c.getPlayer().isGM())) {
                                c.getSession().write(MaplePacketCreator.messengerNote(input, 4, 0));
                                return;
                            }
                            target.getClient().getSession().write(MaplePacketCreator.messengerInvite(c.getPlayer().getName(), messenger.getId()));
                            c.getSession().write(MaplePacketCreator.messengerNote(input, 4, 1));
                        } else {
                            c.getSession().write(MaplePacketCreator.messengerChat(player.getName() + " : " + input + " 正在招待状态"));
                        }
                    } else {
                        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                            target = cserv.getPlayerStorage().getCharacterByName(input);
                            if (target != null) {
                                break;
                            }
                        }
                        if (target != null) {
                            if ((target.isGM()) && (!c.getPlayer().isGM())) {
                                c.getSession().write(MaplePacketCreator.messengerNote(input, 4, 0));
                                return;
                            }
                            try {
                                ChannelServer.getInstance(c.getChannel()).getWorldInterface().messengerInvite(c.getPlayer().getName(), messenger.getId(), input, c.getChannel());
                            } catch (RemoteException e) {
                                c.getChannelServer().reconnectWorld();
                            }
                        } else {
                            c.getSession().write(MaplePacketCreator.messengerNote(input, 4, 0));
                        }
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.messengerChat(player.getName() + " : 您不能招待超过3位玩家"));
                }
                break;
            case 5:
                String targeted = slea.readMapleAsciiString();
                MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(targeted);
                if (target != null) {
                    if (target.getMessenger() != null) {
                        target.getClient().getSession().write(MaplePacketCreator.messengerNote(player.getName(), 5, 0));
                    }
                } else {
                    try {
                        wci.declineChat(targeted, player.getName());
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                }

            case 6:
                if (messenger != null) {
                    MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(player);
                    String input = slea.readMapleAsciiString();
                    try {
                        wci.messengerChat(messenger.getId(), input, messengerplayer.getName());
                    } catch (RemoteException e) {
                        c.getChannelServer().reconnectWorld();
                    }
                }
            case 1:
            case 4:
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.MessengerHandler
 * JD-Core Version:    0.6.0
 */