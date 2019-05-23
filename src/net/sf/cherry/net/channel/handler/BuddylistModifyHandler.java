package net.sf.cherry.net.channel.handler;

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.BuddyList;
import net.sf.cherry.client.BuddyList.BuddyAddResult;
import net.sf.cherry.client.BuddylistEntry;
import net.sf.cherry.client.CharacterNameAndId;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.channel.remote.ChannelWorldInterface;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class BuddylistModifyHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(BuddylistModifyHandler.class);

    private void nextPendingRequest(MapleClient c) {
        CharacterNameAndId pendingBuddyRequest = c.getPlayer().getBuddylist().pollPendingRequest();
        if (pendingBuddyRequest != null) {
            c.getSession().write(MaplePacketCreator.requestBuddylistAdd(pendingBuddyRequest.getId(), pendingBuddyRequest.getName()));
        }
    }

    private CharacterIdNameBuddyCapacity getCharacterIdAndNameFromDatabase(String name) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        CharacterIdNameBuddyCapacity ret = null;
        try {
            ps = con.prepareStatement("SELECT id, name, buddyCapacity FROM characters WHERE name LIKE ?");
            ps.setString(1, name);
            rs = ps.executeQuery();
            if (rs.next()) {
                ret = new CharacterIdNameBuddyCapacity(rs.getInt("id"), rs.getString("name"), rs.getInt("buddyCapacity"));
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        return ret;
    }

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        int mode = slea.readByte();
        MapleCharacter player = c.getPlayer();
        WorldChannelInterface worldInterface = c.getChannelServer().getWorldInterface();
        BuddyList buddylist = player.getBuddylist();
        if (mode == 1) {
            String addName = slea.readMapleAsciiString();
            BuddylistEntry ble = buddylist.get(addName);
            String group = slea.readMapleAsciiString();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = null;
            ResultSet rs = null;
            try {
                ps = con.prepareStatement("SELECT * FROM characters WHERE gm > 0 AND name = ?");
                ps.setString(1, addName);
                rs = ps.executeQuery();
                if ((rs.next()) && (!player.isGM())) {
                    player.dropMessage(1, "无法添加管理员为好友");
                    rs.close();
                    ps.close();
                    return;
                }
                rs.close();
                ps.close();
            } catch (SQLException ex) {
                log.error("SQLException {}", ex);
            } finally {
                try {
                    if (rs != null) {
                        rs.close();
                    }
                    if (ps != null) {
                        ps.close();
                    }
                } catch (SQLException ex) {
                }
            }
            if ((ble != null) && (!ble.isVisible())) {
                ble.setGroup(group);
                c.getSession().write(MaplePacketCreator.updateBuddylist(buddylist.getBuddies()));
                c.getSession().write(MaplePacketCreator.buddylistMessage((byte) 13));
            } else if (buddylist.isFull()) {
                c.getSession().write(MaplePacketCreator.buddylistMessage((byte) 11));
            } else {
                try {
                    CharacterIdNameBuddyCapacity charWithId = null;

                    MapleCharacter otherChar = c.getChannelServer().getPlayerStorage().getCharacterByName(addName);
                    int channel;
                    if (otherChar != null) {
                        channel = c.getChannel();
                        charWithId = new CharacterIdNameBuddyCapacity(otherChar.getId(), otherChar.getName(), otherChar.getBuddylist().getCapacity());
                    } else {
                        channel = worldInterface.find(addName);
                        charWithId = getCharacterIdAndNameFromDatabase(addName);
                    }

                    if (charWithId != null) {
                        BuddyAddResult buddyAddResult = null;
                        if (channel != -1) {
                            ChannelWorldInterface channelInterface = worldInterface.getChannelInterface(channel);
                            buddyAddResult = channelInterface.requestBuddyAdd(addName, c.getChannel(), player.getId(), player.getName());
                        } else {
                            ps = con.prepareStatement("SELECT COUNT(*) as buddyCount FROM buddies WHERE characterid = ? AND pending = 0");
                            ps.setInt(1, charWithId.getId());
                            rs = ps.executeQuery();
                            if (!rs.next()) {
                                throw new RuntimeException("Result set expected");
                            }
                            int count = rs.getInt("buddyCount");
                            if (count >= charWithId.getBuddyCapacity()) {
                                buddyAddResult = BuddyList.BuddyAddResult.BUDDYLIST_FULL;
                            }

                            rs.close();
                            ps.close();
                            ps = con.prepareStatement("SELECT pending FROM buddies WHERE characterid = ? AND buddyid = ?");
                            ps.setInt(1, charWithId.getId());
                            ps.setInt(2, player.getId());
                            rs = ps.executeQuery();
                            if (rs.next()) {
                                buddyAddResult = BuddyList.BuddyAddResult.ALREADY_ON_LIST;
                            }
                            rs.close();
                            ps.close();
                        }
                        if (buddyAddResult == BuddyList.BuddyAddResult.BUDDYLIST_FULL) {
                            c.getSession().write(MaplePacketCreator.buddylistMessage((byte) 12));
                        } else {
                            int displayChannel = -1;
                            int otherCid = charWithId.getId();
                            if ((buddyAddResult == BuddyList.BuddyAddResult.ALREADY_ON_LIST) && (channel != -1)) {
                                displayChannel = channel;
                                notifyRemoteChannel(c, channel, otherCid, BuddyList.BuddyOperation.ADDED);
                            } else if ((buddyAddResult != BuddyList.BuddyAddResult.ALREADY_ON_LIST) && (channel == -1)) {
                                ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `group`, `pending`) VALUES (?, ?, ?, 1)");
                                ps.setInt(1, charWithId.getId());
                                ps.setInt(2, player.getId());
                                ps.setString(3, group);
                                ps.executeUpdate();
                                ps.close();
                            }
                            buddylist.put(new BuddylistEntry(charWithId.getName(), group, otherCid, displayChannel, true));
                            c.getSession().write(MaplePacketCreator.updateBuddylist(buddylist.getBuddies()));
                        }
                    } else {
                        c.getSession().write(MaplePacketCreator.buddylistMessage((byte) 15));
                    }
                } catch (RemoteException ex) {
                    log.error("REMOTE THROW", ex);
                } catch (SQLException ex) {
                    log.error("SQL THROW", ex);
                } finally {
                    try {
                        if (rs != null) {
                            rs.close();
                        }
                        if (ps != null) {
                            ps.close();
                        }
                    } catch (SQLException ex) {
                    }
                }
            }
        } else if (mode == 2) {
            int otherCid = slea.readInt();
            PreparedStatement ps = null;
            ResultSet rs = null;
            if (!buddylist.isFull()) {
                try {
                    int channel = worldInterface.find(otherCid);
                    String otherName = null;
                    MapleCharacter otherChar = c.getChannelServer().getPlayerStorage().getCharacterById(otherCid);
                    if (otherChar == null) {
                        Connection con = DatabaseConnection.getConnection();
                        ps = con.prepareStatement("SELECT name FROM characters WHERE id = ?");
                        ps.setInt(1, otherCid);
                        rs = ps.executeQuery();
                        if (rs.next()) {
                            otherName = rs.getString("name");
                        }
                        rs.close();
                        ps.close();
                    } else {
                        otherName = otherChar.getName();
                    }
                    if (otherName != null) {
                        buddylist.put(new BuddylistEntry(otherName, "群未定", otherCid, channel, true));
                        c.getSession().write(MaplePacketCreator.updateBuddylist(buddylist.getBuddies()));
                        notifyRemoteChannel(c, channel, otherCid, BuddyList.BuddyOperation.ADDED);
                    }
                } catch (RemoteException ex) {
                    log.error("REMOTE THROW", ex);
                } catch (SQLException ex) {
                    log.error("SQL THROW", ex);
                } finally {
                    try {
                        if (rs != null) {
                            rs.close();
                        }
                        if (ps != null) {
                            ps.close();
                        }
                    } catch (SQLException ex) {
                    }
                }
            }
            nextPendingRequest(c);
        } else if (mode == 3) {
            int otherCid = slea.readInt();
            if (buddylist.containsVisible(otherCid)) {
                try {
                    notifyRemoteChannel(c, worldInterface.find(otherCid), otherCid, BuddyList.BuddyOperation.DELETED);
                } catch (RemoteException e) {
                    log.error("REMOTE THROW", e);
                }
            }
            buddylist.remove(otherCid);
            c.getSession().write(MaplePacketCreator.updateBuddylist(player.getBuddylist().getBuddies()));
            nextPendingRequest(c);
        }
    }

    private void notifyRemoteChannel(MapleClient c, int remoteChannel, int otherCid, BuddyList.BuddyOperation operation) throws RemoteException {
        WorldChannelInterface worldInterface = c.getChannelServer().getWorldInterface();
        MapleCharacter player = c.getPlayer();

        if (remoteChannel != -1) {
            ChannelWorldInterface channelInterface = worldInterface.getChannelInterface(remoteChannel);
            channelInterface.buddyChanged(otherCid, player.getId(), player.getName(), c.getChannel(), operation);
        }
    }

    private static class CharacterIdNameBuddyCapacity extends CharacterNameAndId {

        private int buddyCapacity;

        public CharacterIdNameBuddyCapacity(int id, String name, int buddyCapacity) {
            super(id, name);
            this.buddyCapacity = buddyCapacity;
        }

        public int getBuddyCapacity() {
            return buddyCapacity;
        }
    }
}
