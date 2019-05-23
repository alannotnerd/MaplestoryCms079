package net.sf.cherry.net.channel.handler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MTSItemInfo;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class MTSHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(DistributeSPHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        if (!c.getPlayer().inMTS()) {
            return;
        }
        if (slea.available() > 0L) {
            byte op = slea.readByte();
            if (op == 1) {//上架物品
                byte itemtype = slea.readByte();
                int itemid = slea.readInt();
                slea.readShort();
                slea.skip(7);
                short stars = 1;

                if (itemtype == 1) {
                    slea.skip(32);
                } else {
                    stars = slea.readShort();
                }
                slea.readMapleAsciiString();

                if (itemtype == 1) {
                    slea.skip(32);
                } else {
                    slea.readShort();
                }

                byte slot;
                short quantity;

                if (itemtype != 1) {
                    if ((itemid / 10000 == 207) || (itemid / 10000 == 233)) {
                        slea.skip(8);
                    }
                    slot = (byte) slea.readInt();
                } else {
                    slot = (byte) slea.readInt();
                }

               /* if (itemtype == 1) {
                    slea.readShort();
                }*/

                if (itemtype != 1) {
                    if ((itemid / 10000 == 207) || (itemid / 10000 == 233)) {
                        quantity = stars;
                        slea.skip(4);
                    } else {
                        quantity = (short) slea.readInt();
                    }
                } else {
                    quantity = (byte) slea.readInt();
                }

                int price = slea.readInt();


               /*if (itemtype == 1) {
                    slea.readShort();
                }*/
               /* if (price < 221) {
                    c.getPlayer().dropMessage("An unknown error has occured.");
                    return;
                }*/

                if (itemtype == 1) {
                    quantity = 1;
                }
                if ((quantity < 0) || (price < 110) || (c.getPlayer().getItemQuantity(itemid, false) < quantity)) {
                    return;
                }
                MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
                IItem i = c.getPlayer().getInventory(type).getItem(slot).copy();

        /*        if (i.getItemId() != itemid) {
                    c.getPlayer().dropMessage("An unknown error has occurred.");
                    return;
                }
*/
                if ((i != null) && (c.getPlayer().getMeso() >= 5000)) {
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = null;
                    ResultSet rs = null;
                    PreparedStatement ps1 = null;
                    try {
                        ps = con.prepareStatement("SELECT COUNT(*) FROM mts_items WHERE seller = ?");
                        ps.setInt(1, c.getPlayer().getId());
                        rs = ps.executeQuery();
                        if ((rs.next())
                                && (rs.getInt(1) > 10)) {
                            c.getSession().write(MaplePacketCreator.serverNotice(1, "You already have 10 items up for auction!"));
                            c.getSession().write(getMTS(1, 0, 0));
                            c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                            c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                            rs.close();
                            ps.close();
                            return;
                        }
                        rs.close();
                        ps.close();
                        Calendar calendar = Calendar.getInstance();
                        int year;
                        int month;
                        int day;
                        int oldmax = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                        int oldday = calendar.get(Calendar.DAY_OF_MONTH) + 7;
                        if (oldmax < oldday) {
                            if (calendar.get(Calendar.MONTH) + 2 > 12) {
                                year = calendar.get(Calendar.YEAR) + 1;
                                month = 1;
                                calendar.set(year, month, 1);
                                day = oldday - oldmax;
                            } else {
                                month = calendar.get(Calendar.MONTH) + 2;
                                year = calendar.get(Calendar.YEAR);
                                calendar.set(year, month, 1);
                                day = oldday - oldmax;
                            }
                        } else {
                            day = calendar.get(Calendar.DAY_OF_MONTH) + 7;
                            month = calendar.get(Calendar.MONTH);
                            year = calendar.get(Calendar.YEAR);
                        }
                        String date = year + "-";
                        if (month < 10) {
                            date += "0" + month + "-";
                        } else {
                            date += month + "-";
                        }
                        if (day < 10) {
                            date += "0" + day;
                        } else {
                            date += day + "";
                        }

                        if (i.getType() == 2) {
                            Item item = (Item) i;
                            if (item.getQuantity() < quantity) {
                                quantity = item.getQuantity();
                            }
                            if (quantity < 1) {
                                c.getPlayer().dropMessage("An unkown error has occurred.");
                                return;
                            }
                            ps = con.prepareStatement("INSERT INTO mts_items (tab, type, itemid, quantity, seller, price, owner, selleraccount, sellername, sell_ends) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

                            ps.setInt(1, 1);
                            ps.setInt(2, type.getType());
                            ps.setInt(3, item.getItemId());
                            ps.setInt(4, quantity);
                            ps.setInt(5, c.getPlayer().getId());
                            ps.setInt(6, price);
                            ps.setString(7, item.getOwner());
                            ps.setString(8, String.valueOf(c.getAccID()));
                            ps.setString(9, c.getPlayer().getName());
                            ps.setString(10, date);
                        } else {
                            Equip equip = (Equip) i;
                            ps1 = con.prepareStatement("INSERT INTO mts_items (tab, type, itemid, quantity, seller, price, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, locked, owner, selleraccount, sellername, sell_ends, vicious, flag, itemexp, itemlevel, xingji) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

                            ps1.setInt(1, 1);
                            ps1.setInt(2, type.getType());
                            ps1.setInt(3, equip.getItemId());
                            ps1.setInt(4, quantity);
                            ps1.setInt(5, c.getPlayer().getId());
                            ps1.setInt(6, price);
                            ps1.setInt(7, equip.getUpgradeSlots());
                            ps1.setInt(8, equip.getLevel());
                            ps1.setInt(9, equip.getStr());
                            ps1.setInt(10, equip.getDex());
                            ps1.setInt(11, equip.getInt());
                            ps1.setInt(12, equip.getLuk());
                            ps1.setInt(13, equip.getHp());
                            ps1.setInt(14, equip.getMp());
                            ps1.setInt(15, equip.getWatk());
                            ps1.setInt(16, equip.getMatk());
                            ps1.setInt(17, equip.getWdef());
                            ps1.setInt(18, equip.getMdef());
                            ps1.setInt(19, equip.getAcc());
                            ps1.setInt(20, equip.getAvoid());
                            ps1.setInt(21, equip.getHands());
                            ps1.setInt(22, equip.getSpeed());
                            ps1.setInt(23, equip.getJump());
                            ps1.setInt(24, equip.getLocked());
                            ps1.setString(25, equip.getOwner());
                            ps1.setString(26, String.valueOf(c.getAccID()));
                            ps1.setString(27, c.getPlayer().getName());
                            ps1.setString(28, date);
                            ps1.setInt(29, equip.getVicious());
                            ps1.setInt(30, equip.getFlag());
                            ps1.setInt(29, equip.getItemExp());
                            ps1.setInt(30, equip.getItemLevel());
                            ps1.setInt(31, equip.getxingji());
                            ps1.close();
                        }
                        ps.executeUpdate();
                        ps.close();
                        ps1.executeUpdate();
                        ps1.close();
                        MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false);
                    } catch (SQLException ex) {
                        log.error("MTS Sale error: " + ex);
                    } finally {
                        try {
                            if (ps1 != null) {
                                ps1.close();
                            }
                            if (rs != null) {
                                rs.close();
                            }
                            if (ps != null) {
                                ps.close();
                            }
                        } catch (SQLException ex) {
                        }
                    }
                    c.getPlayer().gainMeso(-5000, false);
                    c.getSession().write(MaplePacketCreator.MTSConfirmSell());
                    c.getSession().write(getMTS(1, 0, 0));
                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                }
            } else if (op == 3) {
                slea.readInt();
                slea.readInt();
                slea.readInt();
                slea.readShort();
                slea.readMapleAsciiString();
                c.getSession().write(MaplePacketCreator.showMTSCash(c.getPlayer()));
                } else if (op == 4) {
                    int tab = slea.readInt();
                    int type = slea.readInt();
                    int page = slea.readInt();
                    c.getPlayer().changeTab(tab);
                    c.getPlayer().changeType(type);
                    c.getPlayer().changePage(page);
                    if ((tab == 4) && (type == 0)) {
                        c.getSession().write(getCart(c.getPlayer().getId()));
                    } else {
                        c.getSession().write(getMTS(tab, type, page));
                    }
                    c.getSession().write(MaplePacketCreator.enableCSUse());
                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
            } else if (op == 5) {
                int tab = slea.readInt();
                int type = slea.readInt();
                slea.readInt();
                int ci = slea.readInt();

                String search = slea.readMapleAsciiString();

                c.getPlayer().setSearch(search);
                c.getPlayer().changeTab(tab);
                c.getPlayer().changeType(type);
                c.getPlayer().changeCI(ci);
                c.getSession().write(MaplePacketCreator.enableCSUse());
                c.getSession().write(MaplePacketCreator.enableActions());
                c.getSession().write(getMTSSearch(tab, type, ci, search, c.getPlayer().getCurrentPage()));
                c.getSession().write(MaplePacketCreator.showMTSCash(c.getPlayer()));
                c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
            } else if (op == 6) {
                    int id = slea.readInt();
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = null;
                    try {
                        ps = con.prepareStatement("UPDATE mts_items SET transfer = 1 WHERE id = ? AND seller = ?");
                        ps.setInt(1, id);
                        ps.setInt(2, c.getPlayer().getId());
                        ps.executeUpdate();
                        ps.close();

                        ps = con.prepareStatement("DELETE FROM mts_cart WHERE itemid = ?");
                        ps.setInt(1, id);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException ex) {
                        log.error("MTS Cancel sale error: " + ex);
                    } finally {
                        try {
                            if (ps != null) {
                                ps.close();
                            }
                        } catch (SQLException ex) {
                        }
                    }
                    c.getSession().write(MaplePacketCreator.enableCSUse());
                    c.getSession().write(MaplePacketCreator.MTSMessage((byte)34));
                    c.getSession().write(getMTS(c.getPlayer().getCurrentTab(), c.getPlayer().getCurrentType(), c.getPlayer().getCurrentPage()));
                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                } else if (op == 7) {
                    int id = slea.readInt();
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = null;
                    ResultSet rs = null;
                    PreparedStatement pse = null;
                    try {
                        ps = con.prepareStatement("SELECT * FROM mts_items WHERE seller = ? AND transfer = 1  AND id= ? ORDER BY id DESC");
                        ps.setInt(1, c.getPlayer().getId());
                        ps.setInt(2, id);

                        rs = ps.executeQuery();
                        if (rs.next()) {
                            IItem i;
                            if (rs.getInt("type") != 1) {
                                Item ii = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                                ii.setOwner(rs.getString("owner"));
                                ii.setPosition(c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(rs.getInt("itemid"))).getNextFreeSlot());
                                i = ii.copy();
                            } else {
                                Equip equip = new Equip(rs.getInt("itemid"), (byte) rs.getInt("position"), false);
                                equip.setOwner(rs.getString("owner"));
                                equip.setQuantity((short) 1);
                                equip.setAcc((short) rs.getInt("acc"));
                                equip.setAvoid((short) rs.getInt("avoid"));
                                equip.setDex((short) rs.getInt("dex"));
                                equip.setHands((short) rs.getInt("hands"));
                                equip.setHp((short) rs.getInt("hp"));
                                equip.setInt((short) rs.getInt("int"));
                                equip.setJump((short) rs.getInt("jump"));
                                equip.setLuk((short) rs.getInt("luk"));
                                equip.setMatk((short) rs.getInt("matk"));
                                equip.setMdef((short) rs.getInt("mdef"));
                                equip.setMp((short) rs.getInt("mp"));
                                equip.setSpeed((short) rs.getInt("speed"));
                                equip.setStr((short) rs.getInt("str"));
                                equip.setWatk((short) rs.getInt("watk"));
                                equip.setWdef((short) rs.getInt("wdef"));
                                equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                                equip.setLocked((byte) rs.getInt("locked"));
                                equip.setLevel((byte) rs.getInt("level"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setxingji((short)rs.getInt("xingji"));
                                equip.setPosition(c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(rs.getInt("itemid"))).getNextFreeSlot());
                                i = equip.copy();
                            }

                            pse = con.prepareStatement("DELETE FROM mts_items WHERE id = ? AND seller = ? AND transfer = 1");
                            pse.setInt(1, id);
                            pse.setInt(2, c.getPlayer().getId());
                            pse.executeUpdate();
                            pse.close();
                            rs.close();
                            ps.close();
                            MapleInventoryManipulator.addFromDrop(c, i, "MTS transfer", false);

                            c.getSession().write(getCart(c.getPlayer().getId()));
                            c.getSession().write(getMTS(c.getPlayer().getCurrentTab(), c.getPlayer().getCurrentType(), c.getPlayer().getCurrentPage()));
                            c.getSession().write(MaplePacketCreator.MTSConfirmTransfer(i.getQuantity(), i.getPosition()));
                            c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                            c.getPlayer().saveToDB(true);
                        }
                    } catch (SQLException ex) {
                        log.error("MTS Transfer error: " + ex);
                    } finally {
                        try {
                            if (pse != null) {
                                pse.close();
                            }
                            if (rs != null) {
                                rs.close();
                            }
                            if (ps != null) {
                                ps.close();
                            }
                        } catch (SQLException ex) {
                        }
                    }
                } else if (op == 8) {
                    int id = slea.readInt();
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps1 = null;
                    ResultSet rs1 = null;
                    PreparedStatement ps = null;
                    ResultSet rs = null;
                    PreparedStatement pse = null;
                    try {
                        ps1 = con.prepareStatement("SELECT * FROM mts_items WHERE id = ? AND seller <> ?");
                        ps1.setInt(1, id);
                        ps1.setInt(2, c.getPlayer().getId());
                        rs1 = ps1.executeQuery();
                        if (rs1.next()) {
                            ps = con.prepareStatement("SELECT * FROM mts_cart WHERE cid = ? AND itemid = ?");
                            ps.setInt(1, c.getPlayer().getId());
                            ps.setInt(2, id);
                            rs = ps.executeQuery();
                            if (!rs.next()) {
                                pse = con.prepareStatement("INSERT INTO mts_cart (cid, itemid) VALUES (?, ?)");
                                pse.setInt(1, c.getPlayer().getId());
                                pse.setInt(2, id);
                                pse.executeUpdate();
                                pse.close();
                            }
                            rs.close();
                            ps.close();
                        }
                        rs1.close();
                        ps1.close();
                    } catch (SQLException ex) {
                        log.error("MTS Add to cart error: ", ex);
                    } finally {
                        try {
                            if (pse != null) {
                                pse.close();
                            }
                            if (rs != null) {
                                rs.close();
                            }
                            if (ps != null) {
                                ps.close();
                            }
                            if (rs1 != null) {
                                rs1.close();
                            }
                            if (ps1 != null) {
                                ps1.close();
                            }
                        } catch (SQLException ex) {
                        }
                    }
                    c.getSession().write(MaplePacketCreator.MTSMessage((byte)38));
                    c.getSession().write(getMTS(c.getPlayer().getCurrentTab(), c.getPlayer().getCurrentType(), c.getPlayer().getCurrentPage()));

                    c.getSession().write(MaplePacketCreator.enableActions());
                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                } else if (op == 9) {
                    int id = slea.readInt();
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = null;
                    try {
                        ps = con.prepareStatement("DELETE FROM mts_cart WHERE itemid = ? AND cid = ?");
                        ps.setInt(1, id);
                        ps.setInt(2, c.getPlayer().getId());
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException ex) {
                        log.error("MTS Delete Cart: ", ex);
                    } finally {
                        try {
                            if (ps != null) {
                                ps.close();
                            }
                        } catch (SQLException ex) {
                        }
                    }
                    c.getSession().write(MaplePacketCreator.MTSMessage((byte)40));
                    c.getSession().write(getCart(c.getPlayer().getId()));
                    c.getSession().write(MaplePacketCreator.enableCSUse());
                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                } else if ((op != 12)
                        && (op != 13)
                        && (op != 14)) {
                    if (op == 15) {
                        int id = slea.readInt();

                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = null;
                        ResultSet rs = null;
                        PreparedStatement psee = null;
                        ResultSet rse = null;
                        PreparedStatement pse = null;
                        try {
                            ps = con.prepareStatement("SELECT * FROM mts_items WHERE id = ? ORDER BY id DESC");
                            ps.setInt(1, id);

                            rs = ps.executeQuery();
                            if (rs.next()) {
                                int price = rs.getInt("price") + 100 + (int) (rs.getInt("price") * 0.1D);
                                if (c.getPlayer().getCSPoints(4) >= price) {
                                    boolean alwaysnull = true;
                                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                                        MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(rs.getInt("seller"));
                                        if (victim != null) {
                                            victim.modifyCSPoints(4, rs.getInt("price"));
                                            alwaysnull = false;
                                        }
                                    }
                                    if (alwaysnull) {
                                        pse = con.prepareStatement("SELECT accountid FROM characters WHERE id = ?");
                                        pse.setInt(1, rs.getInt("seller"));
                                        rse = pse.executeQuery();
                                        if (rse.next()) {
                                            psee = con.prepareStatement("UPDATE accounts SET cardNX = cardNX + ? WHERE id = ?");
                                            psee.setInt(1, rs.getInt("price"));
                                            psee.setInt(2, rse.getInt("accountid"));
                                            psee.executeUpdate();
                                            psee.close();
                                        }
                                        rse.close();
                                        pse.close();
                                    }
                                    pse = con.prepareStatement("UPDATE mts_items SET seller = ?, transfer = 1 WHERE id = ?");
                                    pse.setInt(1, c.getPlayer().getId());
                                    pse.setInt(2, id);
                                    pse.executeUpdate();
                                    pse.close();

                                    pse = con.prepareStatement("DELETE FROM mts_cart WHERE itemid = ?");
                                    pse.setInt(1, id);
                                    pse.executeUpdate();
                                    pse.close();

                                    c.getPlayer().modifyCSPoints(4, -price);
                                    c.getSession().write(MaplePacketCreator.enableCSUse());
                                    c.getSession().write(getMTS(c.getPlayer().getCurrentTab(), c.getPlayer().getCurrentType(), c.getPlayer().getCurrentPage()));
                                    c.getSession().write(MaplePacketCreator.MTSMessage((byte)48));
                                    c.getSession().write(MaplePacketCreator.showMTSCash(c.getPlayer()));
                                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                                    c.getSession().write(MaplePacketCreator.enableActions());
                                } else {
                                    c.getSession().write(MaplePacketCreator.MTSFailBuy());
                                }
                            }
                            rs.close();
                            ps.close();
                        } catch (SQLException ex) {
                            c.getSession().write(MaplePacketCreator.MTSFailBuy());
                            log.error("MTS Buying error: " + ex);
                        } finally {
                            try {
                                if (psee != null) {
                                    psee.close();
                                }
                                if (rse != null) {
                                    rse.close();
                                }
                                if (pse != null) {
                                    pse.close();
                                }
                                if (rs != null) {
                                    rs.close();
                                }
                                if (ps != null) {
                                    ps.close();
                                }
                            } catch (SQLException ex) {
                            }
                        }
                    } else if (op == 15) {
                        int id = slea.readInt();

                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = null;
                        ResultSet rs = null;
                        PreparedStatement pse = null;
                        ResultSet rse = null;
                        PreparedStatement psee = null;
                        try {
                            ps = con.prepareStatement("SELECT * FROM mts_items WHERE id = ? ORDER BY id DESC");
                            ps.setInt(1, id);

                            rs = ps.executeQuery();
                            if (rs.next()) {
                                int price = rs.getInt("price") + 100 + (int) (rs.getInt("price") * 0.1D);
                                if (c.getPlayer().getCSPoints(4) >= price) {
                                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                                        MapleCharacter victim = cserv.getPlayerStorage().getCharacterById(rs.getInt("seller"));
                                        if (victim != null) {
                                            victim.modifyCSPoints(4, rs.getInt("price"));
                                        } else {
                                            pse = con.prepareStatement("SELECT accountid FROM characters WHERE id = ?");
                                            pse.setInt(1, rs.getInt("seller"));
                                            rse = pse.executeQuery();
                                            if (rse.next()) {
                                                psee = con.prepareStatement("UPDATE accounts SET cardNX = cardNX + ? WHERE id = ?");
                                                psee.setInt(1, rs.getInt("price"));
                                                psee.setInt(2, rse.getInt("accountid"));
                                                psee.executeUpdate();
                                                psee.close();
                                            }
                                            rse.close();
                                            pse.close();
                                        }
                                    }

                                    pse = con.prepareStatement("UPDATE mts_items SET seller = ?, transfer = 1 WHERE id = ?");
                                    pse.setInt(1, c.getPlayer().getId());
                                    pse.setInt(2, id);
                                    pse.executeUpdate();
                                    pse.close();

                                    pse = con.prepareStatement("DELETE FROM mts_cart WHERE itemid = ?");
                                    pse.setInt(1, id);
                                    pse.executeUpdate();
                                    pse.close();

                                    c.getPlayer().modifyCSPoints(4, -price);
                                    c.getSession().write(getCart(c.getPlayer().getId()));
                                    c.getSession().write(MaplePacketCreator.enableCSUse());
                                    c.getSession().write(MaplePacketCreator.MTSMessage((byte) 48));
                                    c.getSession().write(MaplePacketCreator.showMTSCash(c.getPlayer()));
                                    c.getSession().write(MaplePacketCreator.TransferInventory(getTransfer(c.getPlayer().getId())));
                                    c.getSession().write(MaplePacketCreator.NotYetSoldInv(getNotYetSold(c.getPlayer().getId())));
                                } else {
                                    c.getSession().write(MaplePacketCreator.MTSFailBuy());
                                }
                            }
                            rs.close();
                            ps.close();
                        } catch (SQLException ex) {
                            c.getSession().write(MaplePacketCreator.MTSFailBuy());
                            log.error("MTS Buy from cart: " + ex);
                        } finally {
                            try {
                                psee.close();
                                rse.close();
                                pse.close();
                                rs.close();
                                ps.close();
                            } catch (SQLException ex) {
                            }
                        }
                    } else {
                        log.info("Unhandled OP(MTS): " + op + " Packet: " + slea.toString());
                    }
                }
            
        } else {
            c.getSession().write(MaplePacketCreator.showMTSCash(c.getPlayer()));
        }
    }

    public List<MTSItemInfo> getNotYetSold(int cid) {
        List items = new ArrayList();
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT * FROM mts_items WHERE seller = ? AND transfer = 0 ORDER BY id DESC");
            ps.setInt(1, cid);

            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") != 1) {
                    Item i = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    i.setOwner(rs.getString("owner"));
                    items.add(new MTSItemInfo(i, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
                    continue;
                }
                Equip equip = new Equip(rs.getInt("itemid"), (byte) rs.getInt("position"), false);
                equip.setOwner(rs.getString("owner"));
                equip.setQuantity((short) 1);
                equip.setAcc((short) rs.getInt("acc"));
                equip.setAvoid((short) rs.getInt("avoid"));
                equip.setDex((short) rs.getInt("dex"));
                equip.setHands((short) rs.getInt("hands"));
                equip.setHp((short) rs.getInt("hp"));
                equip.setInt((short) rs.getInt("int"));
                equip.setJump((short) rs.getInt("jump"));
                equip.setLuk((short) rs.getInt("luk"));
                equip.setMatk((short) rs.getInt("matk"));
                equip.setMdef((short) rs.getInt("mdef"));
                equip.setMp((short) rs.getInt("mp"));
                equip.setSpeed((short) rs.getInt("speed"));
                equip.setStr((short) rs.getInt("str"));
                equip.setWatk((short) rs.getInt("watk"));
                equip.setWdef((short) rs.getInt("wdef"));
                equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                equip.setLocked((byte) rs.getInt("locked"));
                equip.setLevel((byte) rs.getInt("level"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setxingji((short)rs.getInt("xingji"));
                items.add(new MTSItemInfo(equip, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
            }
        } catch (SQLException ex) {
            log.error("MTS Retreiving not yet sold failed: " + ex);
        } finally {
            try {
                rs.close();
                ps.close();
            } catch (SQLException ex) {
            }
        }
        return items;
    }

    public MaplePacket getCart(int cid) {
        List items = new ArrayList();
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        PreparedStatement pse = null;
        ResultSet rse = null;
        int pages = 0;
        try {
            ps = con.prepareStatement("SELECT * FROM mts_cart WHERE cid = ? ORDER BY id DESC");
            ps.setInt(1, cid);

            rs = ps.executeQuery();
            while (rs.next()) {
                pse = con.prepareStatement("SELECT * FROM mts_items WHERE id = ?");
                pse.setInt(1, rs.getInt("itemid"));
                rse = pse.executeQuery();
                if (rse.next()) {
                    if (rse.getInt("type") != 1) {
                        Item i = new Item(rse.getInt("itemid"), (byte) 0, (short) rse.getInt("quantity"));
                        i.setOwner(rse.getString("owner"));
                        items.add(new MTSItemInfo(i, rse.getInt("price"), rse.getInt("id"), rse.getInt("seller"), rse.getString("sellername"), rse.getString("sell_ends")));
                        continue;
                    }
                    Equip equip = new Equip(rse.getInt("itemid"), (byte) rse.getInt("position"), false);
                    equip.setOwner(rse.getString("owner"));
                    equip.setQuantity((short) 1);
                    equip.setAcc((short) rse.getInt("acc"));
                    equip.setAvoid((short) rse.getInt("avoid"));
                    equip.setDex((short) rse.getInt("dex"));
                    equip.setHands((short) rse.getInt("hands"));
                    equip.setHp((short) rse.getInt("hp"));
                    equip.setInt((short) rse.getInt("int"));
                    equip.setJump((short) rse.getInt("jump"));
                    equip.setLuk((short) rse.getInt("luk"));
                    equip.setMatk((short) rse.getInt("matk"));
                    equip.setMdef((short) rse.getInt("mdef"));
                    equip.setMp((short) rse.getInt("mp"));
                    equip.setSpeed((short) rse.getInt("speed"));
                    equip.setStr((short) rse.getInt("str"));
                    equip.setWatk((short) rse.getInt("watk"));
                    equip.setWdef((short) rse.getInt("wdef"));
                    equip.setUpgradeSlots((byte) rse.getInt("upgradeslots"));
                    equip.setLocked((byte) rse.getInt("locked"));
                    equip.setLevel((byte) rse.getInt("level"));
                    equip.setItemExp((short) rse.getInt("itemexp"));
                    equip.setItemLevel((byte) rse.getInt("itemlevel"));
                    equip.setVicious((short) rse.getInt("vicious"));
                    equip.setxingji((short)rse.getInt("xingji"));
                    items.add(new MTSItemInfo(equip, rse.getInt("price"), rse.getInt("id"), rse.getInt("seller"), rse.getString("sellername"), rse.getString("sell_ends")));
                }
            }

            rse.close();
            pse.close();
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT COUNT(*) FROM mts_cart WHERE cid = ?");
            ps.setInt(1, cid);
            rs = ps.executeQuery();
            if (rs.next()) {
                pages = rs.getInt(1) / 16;
                if (rs.getInt(1) % 16 > 0) {
                    pages++;
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("MTS retreiving cart failed: " + e);
        }
        return MaplePacketCreator.sendMTS(items, 4, 0, 0, pages);
    }

    public List<MTSItemInfo> getTransfer(int cid) {
        List items = new ArrayList();
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT * FROM mts_items WHERE transfer = 1 AND seller = ? ORDER BY id DESC");
            ps.setInt(1, cid);

            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") != 1) {
                    Item i = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    i.setOwner(rs.getString("owner"));
                    items.add(new MTSItemInfo(i, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
                    continue;
                }
                Equip equip = new Equip(rs.getInt("itemid"), (byte) rs.getInt("position"), false);
                equip.setOwner(rs.getString("owner"));
                equip.setQuantity((short) 1);
                equip.setAcc((short) rs.getInt("acc"));
                equip.setAvoid((short) rs.getInt("avoid"));
                equip.setDex((short) rs.getInt("dex"));
                equip.setHands((short) rs.getInt("hands"));
                equip.setHp((short) rs.getInt("hp"));
                equip.setInt((short) rs.getInt("int"));
                equip.setJump((short) rs.getInt("jump"));
                equip.setLuk((short) rs.getInt("luk"));
                equip.setMatk((short) rs.getInt("matk"));
                equip.setMdef((short) rs.getInt("mdef"));
                equip.setMp((short) rs.getInt("mp"));
                equip.setSpeed((short) rs.getInt("speed"));
                equip.setStr((short) rs.getInt("str"));
                equip.setWatk((short) rs.getInt("watk"));
                equip.setWdef((short) rs.getInt("wdef"));
                equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                equip.setLocked((byte) rs.getInt("locked"));
                equip.setLevel((byte) rs.getInt("level"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setxingji((short)rs.getInt("xingji"));
                items.add(new MTSItemInfo(equip, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
            }
        } catch (SQLException ex) {
            log.error("MTS Get Transfer failed:" + ex);
        } finally {
            try {
                rs.close();
                ps.close();
            } catch (SQLException ex) {
            }
        }
        return items;
    }

    public MaplePacket getMTS(int tab, int type, int page) {
        List items = new ArrayList();
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        int pages = 0;
        try {
            if (type != 0) {
                ps = con.prepareStatement("SELECT * FROM mts_items WHERE tab = ? AND type = ? AND transfer = 0 ORDER BY id DESC LIMIT ?, 16");
            } else {
                ps = con.prepareStatement("SELECT * FROM mts_items WHERE tab = ? AND transfer = 0 ORDER BY id DESC LIMIT ?, 16");
            }
            ps.setInt(1, tab);
            if (type != 0) {
                ps.setInt(2, type);
                ps.setInt(3, page * 16);
            } else {
                ps.setInt(2, page * 16);
            }
            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") != 1) {
                    Item i = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    i.setOwner(rs.getString("owner"));
                    items.add(new MTSItemInfo(i, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
                    continue;
                }
                Equip equip = new Equip(rs.getInt("itemid"), (byte) rs.getInt("position"), false);
                equip.setOwner(rs.getString("owner"));
                equip.setQuantity((short) 1);
                equip.setAcc((short) rs.getInt("acc"));
                equip.setAvoid((short) rs.getInt("avoid"));
                equip.setDex((short) rs.getInt("dex"));
                equip.setHands((short) rs.getInt("hands"));
                equip.setHp((short) rs.getInt("hp"));
                equip.setInt((short) rs.getInt("int"));
                equip.setJump((short) rs.getInt("jump"));
                equip.setLuk((short) rs.getInt("luk"));
                equip.setMatk((short) rs.getInt("matk"));
                equip.setMdef((short) rs.getInt("mdef"));
                equip.setMp((short) rs.getInt("mp"));
                equip.setSpeed((short) rs.getInt("speed"));
                equip.setStr((short) rs.getInt("str"));
                equip.setWatk((short) rs.getInt("watk"));
                equip.setWdef((short) rs.getInt("wdef"));
                equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                equip.setLocked((byte) rs.getInt("locked"));
                equip.setLevel((byte) rs.getInt("level"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setxingji((short)rs.getInt("xingji"));
                items.add(new MTSItemInfo(equip, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
            }

            rs.close();
            ps.close();

            if (type != 0) {
                ps = con.prepareStatement("SELECT COUNT(*) FROM mts_items WHERE tab = ? AND type = ? AND transfer = 0");
            } else {
                ps = con.prepareStatement("SELECT COUNT(*) FROM mts_items WHERE tab = ? AND transfer = 0");
            }
            ps.setInt(1, tab);
            if (type != 0) {
                ps.setInt(2, type);
            }
            rs = ps.executeQuery();
            if (rs.next()) {
                pages = rs.getInt(1) / 16;
                if (rs.getInt(1) % 16 > 0) {
                    pages++;
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("MTS Getting page failed: " + ex);
        } finally {
            try {
                rs.close();
                ps.close();
            } catch (SQLException ex) {
            }
        }
        return MaplePacketCreator.sendMTS(items, tab, type, page, pages);
    }

    public MaplePacket getMTSSearch(int tab, int type, int cOi, String search, int page) {
        List<MTSItemInfo> items = new ArrayList<MTSItemInfo>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        String listaitems = "";
        if (cOi != 0) {
            List<String> retItems = new ArrayList<String>();

            for (Pair itemPair : ii.getAllItems()) {
                if (((String) itemPair.getRight()).toLowerCase().contains(search.toLowerCase())) {
                    retItems.add(" itemid = " + itemPair.getLeft() + " OR ");
                }
            }
            listaitems = listaitems + " AND (";
            if (retItems != null && retItems.size() > 0) {
                for (String singleRetItem : retItems) {
                    listaitems = listaitems + singleRetItem;
                }
                listaitems = listaitems + " itemid=0 )";
            }
        } else {
            listaitems = " AND sellername LIKE CONCAT('%','" + search + "', '%')";
        }

        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        int pages = 0;
        try {
            if (type != 0) {
                ps = con.prepareStatement("SELECT * FROM mts_items WHERE tab = ? " + listaitems + " AND type = ? AND transfer = 0 ORDER BY id DESC LIMIT ?, 16");
            } else {
                ps = con.prepareStatement("SELECT * FROM mts_items WHERE tab = ? " + listaitems + " AND transfer = 0 ORDER BY id DESC LIMIT ?, 16");
            }
            ps.setInt(1, tab);
            if (type != 0) {
                ps.setInt(2, type);
                ps.setInt(3, page * 16);
            } else {
                ps.setInt(2, page * 16);
            }
            rs = ps.executeQuery();
            while (rs.next()) {
                if (rs.getInt("type") != 1) {
                    Item i = new Item(rs.getInt("itemid"), (byte) 0, (short) rs.getInt("quantity"));
                    i.setOwner(rs.getString("owner"));
                    items.add(new MTSItemInfo(i, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
                    continue;
                }
                Equip equip = new Equip(rs.getInt("itemid"), (byte) rs.getInt("position"), false);
                equip.setOwner(rs.getString("owner"));
                equip.setQuantity((short) 1);
                equip.setAcc((short) rs.getInt("acc"));
                equip.setAvoid((short) rs.getInt("avoid"));
                equip.setDex((short) rs.getInt("dex"));
                equip.setHands((short) rs.getInt("hands"));
                equip.setHp((short) rs.getInt("hp"));
                equip.setInt((short) rs.getInt("int"));
                equip.setJump((short) rs.getInt("jump"));
                equip.setLuk((short) rs.getInt("luk"));
                equip.setMatk((short) rs.getInt("matk"));
                equip.setMdef((short) rs.getInt("mdef"));
                equip.setMp((short) rs.getInt("mp"));
                equip.setSpeed((short) rs.getInt("speed"));
                equip.setStr((short) rs.getInt("str"));
                equip.setWatk((short) rs.getInt("watk"));
                equip.setWdef((short) rs.getInt("wdef"));
                equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
                equip.setLocked((byte) rs.getInt("locked"));
                equip.setLevel((byte) rs.getInt("level"));
                    equip.setItemExp((short) rs.getInt("itemexp"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setxingji((short)rs.getInt("xingji"));
                items.add(new MTSItemInfo(equip, rs.getInt("price"), rs.getInt("id"), rs.getInt("seller"), rs.getString("sellername"), rs.getString("sell_ends")));
            }

            rs.close();
            ps.close();
            if (type != 0) {
                ps = con.prepareStatement("SELECT COUNT(*) FROM mts_items WHERE tab = ? " + listaitems + " AND type = ? AND transfer = 0");
            } else {
                ps = con.prepareStatement("SELECT COUNT(*) FROM mts_items WHERE tab = ? " + listaitems + " AND transfer = 0");
                ps.setInt(1, tab);
                if (type != 0) {
                    ps.setInt(2, type);
                }
                rs = ps.executeQuery();
                if (rs.next()) {
                    pages = rs.getInt(1) / 16;
                    if (rs.getInt(1) % 16 > 0) {
                        pages++;
                    }
                }
                rs.close();
                ps.close();
            }
        } catch (SQLException ex) {
            log.error("MTS Getting search failed: " + ex);
        } finally {
            try {
                rs.close();
                ps.close();
            } catch (SQLException ex) {
            }
        }
        return MaplePacketCreator.sendMTS(items, tab, type, page, pages);
    }
}
