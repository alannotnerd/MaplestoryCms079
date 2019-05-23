package net.sf.cherry.client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.tools.MaplePacketCreator;

public final class MonsterBook {

    private int SpecialCard = 0;
    private int NormalCard = 0;
    private int BookLevel = 1;
    private Map<Integer, Integer> cards = new LinkedHashMap();

    public void addCard(MapleClient c, int cardid) {
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeginCardEffect(c.getPlayer().getId()), false);
        for (Map.Entry all : this.cards.entrySet()) {
            if (((Integer) all.getKey()).intValue() == cardid) {
                if (((Integer) all.getValue()).intValue() > 4) {
                    c.getSession().write(MaplePacketCreator.addCard(true, cardid, ((Integer) all.getValue()).intValue()));
                    System.err.println("开");
                } else {
                    all.setValue(Integer.valueOf(((Integer) all.getValue()).intValue() + 1));
                    c.getSession().write(MaplePacketCreator.addCard(false, cardid, ((Integer) all.getValue()).intValue()));
                    c.getSession().write(MaplePacketCreator.showGainCard());
                    System.err.println("关");
                    calculateLevel();
                }
              //  saveCards(cardid);
                return;
            }
        }
        this.cards.put(Integer.valueOf(cardid), Integer.valueOf(1));
        c.getSession().write(MaplePacketCreator.addCard(false, cardid, 1));
        ////System.out.println("3");
        //c.getSession().write(MaplePacketCreator.showGainCard());
        calculateLevel();
       // saveCards(cardid);
    }

    private void calculateLevel() {
        int size = this.NormalCard + this.SpecialCard;
        this.BookLevel = 8;
        for (int i = 1; i < 8; i++) {
            if (size < ExpTable.getBookLevel(i)) {
                this.BookLevel = i;
                return;
            }
        }
    }

    public int getBookLevel() {
        return this.BookLevel;
    }

    public Map<Integer, Integer> getCards() {
        return this.cards;
    }

    public int getTotalCards() {
        return this.SpecialCard + this.NormalCard;
    }

    public int getNormalCard() {
        return this.NormalCard;
    }

    public int getSpecialCard() {
        return this.SpecialCard;
    }

    public void loadCards(int charid) {
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM monsterbook WHERE charid = ? ORDER BY cardid ASC");
            ps.setInt(1, charid);
            rs = ps.executeQuery();

            while (rs.next()) {
                int cardid = rs.getInt("cardid");
                int level = rs.getInt("level");
                if (cardid / 1000 >= 2388) {
                    this.SpecialCard += 1;
                } else {
                    this.NormalCard += 1;
                }
                this.cards.put(Integer.valueOf(cardid), Integer.valueOf(level));
            }
            rs.close();
            ps.close();
            calculateLevel();
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
    }

    public void saveCards(int charid) {
        if (this.cards.size() == 0) {
            return;
        }
        PreparedStatement ps = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("DELETE FROM monsterbook WHERE charid = ?");
            ps.setInt(1, charid);
            ps.execute();
            ps.close();
            boolean first = true;
            StringBuilder query = new StringBuilder();
            for (Map.Entry all : this.cards.entrySet()) {
                if (first) {
                    query.append("INSERT INTO monsterbook VALUES (");
                    first = false;
                } else {
                    query.append(",(");
                }
                query.append(charid);
                query.append(", ");
                query.append(all.getKey());
                query.append(", ");
                query.append(all.getValue());
                query.append(")");
            }
            ps = con.prepareStatement(query.toString());
            ps.execute();
            ps.close();
        } catch (Exception ex) {
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MonsterBook
 * JD-Core Version:    0.6.0
 */