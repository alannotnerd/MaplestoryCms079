package net.sf.cherry.net.world.guild;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.tools.MaplePacketCreator;

import java.io.Serializable;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class MapleAlliance
    implements Serializable {

  public static final long serialVersionUID = 24081985245L;
  private int[] guilds = new int[5];
  private int allianceId = -1;
  private int capacity;
  private String name;
  private String notice = "";
  private String[] rankTitles = new String[5];

  public MapleAlliance() {
  }

  public MapleAlliance(String name, int id, int guild1, int guild2) {
    this.name = name;
    this.allianceId = id;
    this.guilds[0] = guild1;
    this.guilds[1] = guild2;
    this.guilds[2] = -1;
    this.guilds[3] = -1;
    this.guilds[4] = -1;
    this.rankTitles[0] = "族长";
    this.rankTitles[1] = "副族长";
    this.rankTitles[2] = "成员";
    this.rankTitles[3] = "成员";
    this.rankTitles[4] = "成员";
  }

  public static MapleAlliance loadAlliance(int id) {
    // LOAD HERE
    if (id <= 0) {
      return null;
    }
    Connection con = DatabaseConnection.getConnection();
    MapleAlliance alliance = new MapleAlliance();
    try {
      PreparedStatement ps = con.prepareStatement("SELECT * FROM alliance WHERE id = ?");
      ps.setInt(1, id);
      ResultSet rs = ps.executeQuery();
      if (!rs.next()) {
        return null;
      }
      alliance.allianceId = id;
      alliance.capacity = rs.getInt("capacity");
      alliance.name = rs.getString("name");
      alliance.notice = rs.getString("notice");
      for (int i = 1; i <= 5; i++) {
        alliance.rankTitles[i - 1] = rs.getString("rank_title" + i);
      }
      for (int i = 1; i <= 5; i++) {
        alliance.guilds[i - 1] = rs.getInt("guild" + i);
      }
      ps.close();
      rs.close();
    } catch (SQLException e) {
    }
    return alliance;
  }

  public static void disbandAlliance(MapleClient c, int allianceId) {
    Connection con = DatabaseConnection.getConnection();
    try {
      PreparedStatement ps = con.prepareStatement("DELETE FROM `alliance` WHERE id = ?");
      ps.setInt(1, allianceId);
      ps.executeUpdate();
      ps.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    try {
      c.getChannelServer().getWorldInterface().allianceMessage(c.getPlayer().getGuild().getAllianceId(), MaplePacketCreator.disbandAlliance(allianceId), -1, -1);
      c.getChannelServer().getWorldInterface().disbandAlliance(allianceId);
    } catch (RemoteException r) {
      c.getChannelServer().reconnectWorld();
    }
  }

  public static boolean canBeUsedAllianceName(String name) {
    if (name.contains(" ") || name.length() > 12) { // im using starswith because the 'contains' method fails.
      return false;
    }
    Connection con = DatabaseConnection.getConnection();
    boolean ret = true;
    try {
      PreparedStatement ps = con.prepareStatement("SELECT * FROM alliance WHERE name = ?");
      ps.setString(1, name);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) {
        ret = false;
      }
      ps.close();
      rs.close();
    } catch (SQLException e) {
      return false;
    }
    return ret;
  }

  public static MapleAlliance createAlliance(MapleCharacter chr1, MapleCharacter chr2, String name) {
    Connection con = DatabaseConnection.getConnection();
    int id = 0;
    int guild1 = chr1.getGuildId();
    int guild2 = chr2.getGuildId();
    try {
      PreparedStatement ps = con.prepareStatement("INSERT INTO `alliance` (`name`, `guild1`, `guild2`) VALUES (?, ?, ?)");
      ps.setString(1, name);
      ps.setInt(2, guild1);
      ps.setInt(3, guild2);
      ps.executeUpdate();
      ResultSet rs = ps.getGeneratedKeys();
      rs.next();
      id = rs.getInt(1);
      rs.close();
      ps.close();
    } catch (SQLException e) {
      e.printStackTrace();
      return null;
    }
    MapleAlliance alliance = new MapleAlliance(name, id, guild1, guild2);
    try {
      WorldChannelInterface wci = chr1.getClient().getChannelServer().getWorldInterface();
      wci.setGuildAllianceId(guild1, id);
      wci.setGuildAllianceId(guild2, id);
      chr1.setAllianceRank(1);
      chr1.saveGuildStatus();
      chr2.setAllianceRank(2);
      chr2.saveGuildStatus();
      wci.addAlliance(id, alliance);
      wci.allianceMessage(id, MaplePacketCreator.makeNewAlliance(alliance, chr1.getClient()), -1, -1);
    } catch (RemoteException e) {
      chr1.getClient().getChannelServer().reconnectWorld();
      return null;
    }
    return alliance;
  }

  public void saveToDB() {
    Connection con = DatabaseConnection.getConnection();
    StringBuilder sb = new StringBuilder();
    sb.append("capacity = ?, ");
    sb.append("notice = ?, ");
    for (int i = 1; i <= 5; i++) {
      sb.append("rank_title" + i + " = ?, ");
    }
    for (int i = 1; i <= 5; i++) {
      sb.append("guild" + i + " = ?, ");
    }
    try {
      PreparedStatement ps = con.prepareStatement("UPDATE `alliance` SET " + sb.toString() + " WHERE id = ?");
      ps.setInt(1, this.capacity);
      ps.setString(2, this.notice);
      for (int i = 0; i < rankTitles.length; i++) {
        ps.setString(i + 3, rankTitles[i]);
      }
      for (int i = 0; i < guilds.length; i++) {
        ps.setInt(i + 8, guilds[i]);
      }
      ps.setInt(13, this.allianceId);
      ps.executeQuery();
      ps.close();
    } catch (SQLException e) {
    }
  }

  public boolean addRemGuildFromDB(int gid, boolean add) {
    Connection con = DatabaseConnection.getConnection();
    boolean ret = false;
    try {
      PreparedStatement ps = con.prepareStatement("SELECT * FROM alliance WHERE id = ?");
      ps.setInt(1, this.allianceId);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) {
        int avail = -1;
        for (int i = 1; i <= 5; i++) {
          int guildId = rs.getInt("guild" + i);
          if (add) {
            if (guildId == -1) {
              avail = i;
              break;
            }
          } else {
            if (guildId == gid) {
              avail = i;
              break;
            }
          }
        }
        rs.close();
        if (avail != -1) { // empty slot
          PreparedStatement ps1 = con.prepareStatement("UPDATE alliance SET guild" + avail + " = ? WHERE id = ?");
          if (add) {
            ps1.setInt(1, gid);
          } else {
            ps1.setInt(1, -1);
          }
          ps1.setInt(2, this.allianceId);
          ps1.executeUpdate();
          ret = true;
          ps1.close();
        }
      }
      ps.close();
    } catch (SQLException e) {
    }
    return ret;
  }

  public boolean removeGuild(int gid) {
    synchronized (this.guilds) {
      int gIndex = getGuildIndex(gid);
      if (gIndex != -1) {
        this.guilds[gIndex] = -1;
      }
      return addRemGuildFromDB(gid, false);
    }
  }

  public boolean addGuild(int gid) {
    synchronized (this.guilds) {
      if (getGuildIndex(gid) == -1) {
        int emptyIndex = getGuildIndex(-1);
        if (emptyIndex != -1) {
          this.guilds[emptyIndex] = gid;
          return addRemGuildFromDB(gid, true);
        }
      }
    }
    return false;
  }

  private int getGuildIndex(int gid) {
    for (int i = 0; i < this.guilds.length; i++) {
      if (this.guilds[i] == gid) {
        return i;
      }
    }
    return -1;
  }

  public void setRankTitle(String[] ranks) {
    this.rankTitles = ranks;
  }

  public int getId() {
    return this.allianceId;
  }

  public String getName() {
    return this.name;
  }

  public String getRankTitle(int rank) {
    return this.rankTitles[(rank - 1)];
  }

  public String getAllianceNotice() {
    return this.notice;
  }

  public List<Integer> getGuilds() {
    List guilds_ = new LinkedList();
    for (int guild : this.guilds) {
      if (guild != -1) {
        guilds_.add(Integer.valueOf(guild));
      }
    }
    return guilds_;
  }

  public String getNotice() {
    return this.notice;
  }

  public void setNotice(String notice) {
    this.notice = notice;
  }

  public void increaseCapacity(int inc) {
    this.capacity += inc;
  }

  public int getCapacity() {
    return this.capacity;
  }
}
