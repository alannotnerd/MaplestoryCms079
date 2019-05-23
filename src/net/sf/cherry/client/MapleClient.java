package net.sf.cherry.client;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ScheduledFuture;

import javax.script.ScriptEngine;

import org.apache.mina.common.IoSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import gui.DebugWindow;
import net.sf.cherry.client.messages.MessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.database.DatabaseException;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.PlayerCoolDownValueHolder;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.scripting.npc.NPCConversationManager;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.scripting.quest.QuestActionManager;
import net.sf.cherry.scripting.quest.QuestScriptManager;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleSquadType;
import net.sf.cherry.server.MapleTrade;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.cherryms.CherryMScustomEventFactory;
import net.sf.cherry.server.maps.AbstractAnimatedMapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.playerinteractions.HiredMerchant;
import net.sf.cherry.server.playerinteractions.IPlayerInteractionManager;
import net.sf.cherry.server.playerinteractions.MaplePlayerShopItem;
import net.sf.cherry.tools.IPAddressTool;
import net.sf.cherry.tools.MapleAESOFB;
import net.sf.cherry.tools.MaplePacketCreator;

public abstract class MapleClient extends AbstractAnimatedMapleMapObject implements InventoryContainer {
    private DebugWindow debugWindow;
    public static final int LOGIN_NOTLOGGEDIN = 0;
    public static final int LOGIN_SERVER_TRANSITION = 1;
    public static final int LOGIN_LOGGEDIN = 2;
    public static final int LOGIN_WAITING = 3;
    public static final int ENTERING_PIN = 4;
    public static final int PIN_CORRECT = 5;
    public static final int VIEW_ALL_CHAR = 6;
    public static final String CLIENT_KEY = "CLIENT";
    private static final Logger log = LoggerFactory.getLogger(MapleClient.class);
    private MapleAESOFB send;
    private MapleAESOFB receive;
    private IoSession session;
    private MapleCharacter player;
    private MapleCharacter fakechars;
    private int channel = 1;
    private int accId = 1;
    private Timestamp createDate;
    private boolean loggedIn = false;
    private boolean serverTransition = false;
    private Calendar birthday = null;
    private Calendar tempban = null;
    private byte gender;
    private String skillmd5;
    private String skillmd5S = "2be5b867e3e06d24f853d19e087fe5393ae4a217263c2b554e4a3fa68d4746c2ad784e61436b1e62912a9e8ee5bde106b7393ee7a0fec1909f0795ef6f924fa35981da8a66630b667d8061efc1c2d1b9";
    private String skillmd5SS = "0";
    private int ipyz;
    private int pin;
    private boolean monitored = false, receiving = true;
    private byte passwordTries = 0;  //错误密码次数
    private byte pinTries = 0;
    private String accountName;
    private int world;
    private long lastPong;
    private boolean GM;
    private int GMLevel;
    private int 怪物伤害 = 0;
    private int md5data;
    private byte greason = 1;
    private boolean hasPacketLog = false;
    private BufferedWriter packetLog = null;
    private Set<String> macs = new HashSet();
    private Map<String, ScriptEngine> engines = new HashMap();
    private ScheduledFuture<?> idleTask = null;
    private int lastActionId = 0;
    public int packetnum = 0;
    FileOutputStream pL_fos = null;
    OutputStreamWriter pL_osw = null;
    private byte maxCharaSlot;

    public MapleClient(MapleAESOFB send, MapleAESOFB receive, IoSession session) {
        this.send = send;
        this.receive = receive;
        this.session = session;
    }

    public boolean isNeedlog() {
        return CherryMScustomEventFactory.getInstance().isCANLOG();
    }

    public synchronized MapleAESOFB getReceiveCrypto() {
        return this.receive;
    }

    public synchronized MapleAESOFB getSendCrypto() {
        return this.send;
    }

    public synchronized IoSession getSession() {
        return this.session;
    }
public MapleCharacter getFakeChars() {
        return fakechars;
    }

    public void getFakeChars(MapleCharacter fakechars) {
        this.fakechars = fakechars;
    }
    public MapleCharacter getPlayer() {
        return player;
    }

    public void setPlayer(MapleCharacter player) {
        this.player = player;
    }

    public void sendCharList(int server) {
        this.session.write(MaplePacketCreator.getCharList(this, server));
    }

    public List<MapleCharacter> loadCharacters(int serverId) { // TODO make this less costly zZz
        List<MapleCharacter> chars = new LinkedList<MapleCharacter>();
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            try {
                chars.add(MapleCharacter.loadCharFromDB(cni.id, this, false));
            } catch (SQLException e) {
                log.error("Loading characters failed", e);
            }
        }
        return chars;
    }

    public List<String> loadCharacterNames(int serverId) {
        List chars = new LinkedList();
        for (CharNameAndId cni : loadCharactersInternal(serverId)) {
            chars.add(cni.name);
        }
        return chars;
    }

    private List<CharNameAndId> loadCharactersInternal(int serverId) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        List chars = new LinkedList();
        try {
            ps = con.prepareStatement("SELECT id, name FROM characters WHERE accountid = ? AND world = ? order by id");
            ps.setInt(1, this.accId);
            ps.setInt(2, serverId);

            rs = ps.executeQuery();
            while (rs.next()) {
                chars.add(new CharNameAndId(rs.getString("name"), rs.getInt("id")));
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("THROW", ex);
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
        return chars;
    }

    public boolean isLoggedIn() {
        return this.loggedIn;
    }

    private Calendar getTempBanCalendar(ResultSet rs) throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        long blubb = rs.getLong("tempban");
        if (blubb == 7980529189973393408L) {
            lTempban.setTimeInMillis(7980528193540980736L);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }

        lTempban.setTimeInMillis(7980529756909076480L);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return this.tempban;
    }

    public byte getBanReason() {
        return this.greason;
    }

    public boolean hasBannedIP() {
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT COUNT(*) FROM ipbans WHERE ? LIKE CONCAT(ip, '%')");
            ps.setString(1, this.session.getRemoteAddress().toString());
            rs = ps.executeQuery();
            rs.next();
            if (rs.getInt(1) > 0) {
                return true;
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error checking ip bans", ex);

            return true;
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
        return false;
    }
    public boolean hasBannedMac() {
        if (this.macs.isEmpty()) {
            return false;
        }
        int i = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM macbans WHERE mac IN (");
            for (i = 0; i < this.macs.size(); i++) {
                sql.append("?");
                if (i != this.macs.size() - 1) {
                    sql.append(", ");
                }
            }
            sql.append(")");
            ps = con.prepareStatement(sql.toString());
            i = 0;
            for (String mac : this.macs) {
                i++;
                ps.setString(i, mac);
            }
            rs = ps.executeQuery();
            rs.next();
            if (rs.getInt(1) > 0) {
                return true;
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error checking mac bans", ex);

            return true;
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
        return false;
    }

    private void loadMacsIfNescessary() throws SQLException {
        if (this.macs.isEmpty()) {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT macs FROM accounts WHERE id = ?");
            ps.setInt(1, this.accId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String[] macData = rs.getString("macs").split(", ");
                for (String mac : macData) {
                    if (!mac.equals("")) {
                        this.macs.add(mac);
                    }
                }
            } else {
                throw new RuntimeException("No valid account associated with this client.");
            }
            rs.close();
            ps.close();
        }
    }

    public void banMacs() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            loadMacsIfNescessary();
            List filtered = new LinkedList();
            ps = con.prepareStatement("SELECT filter FROM macfilters");
            rs = ps.executeQuery();
            while (rs.next()) {
                filtered.add(rs.getString("filter"));
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)");
            for (String mac : this.macs) {
                boolean matched = false;
                for (Object filter : filtered) {
                    if (mac.matches((String) filter)) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    ps.setString(1, mac);
                    try {
                        ps.executeUpdate();
                    } catch (SQLException e) {
                    }
                }
            }
            ps.close();
        } catch (SQLException ex) {
            log.error("Error banning MACs", ex);
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

    public int finishLogin(boolean success) {
        if (success) {
            synchronized (MapleClient.class) {
                if ((getLoginState() <= 0) || (getLoginState() == 3)) {
                    updateLoginState(4);
                    return 0;
                }
                this.loggedIn = false;
                return 7;
            }

        }

        return 10;
    }

    public int login(String login, String pwd, boolean ipMacBanned) {
        int loginok = 5;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT id,password,salt,createdat,tempban,banned,GM,macs,greason,gender,skillmd5,md5data,ipyz,pin FROM accounts WHERE name = ?");
            ps.setString(1, login);
            rs = ps.executeQuery();
            if (rs.next()) {
                int banned = rs.getInt("banned");
                this.accId = rs.getInt("id");
                this.GMLevel = rs.getInt("GM");
                String passhash = rs.getString("password");
                String salt = rs.getString("salt");
                this.createDate = rs.getTimestamp("createdat");
                this.GM = (GMLevel > 0);
                this.greason = rs.getByte("greason");
                this.tempban = getTempBanCalendar(rs);
                this.skillmd5 = rs.getString("skillmd5");
                this.md5data = rs.getInt("md5data");
                this.ipyz = rs.getInt("ipyz");
                this.gender = rs.getByte("gender");
                this.pin = rs.getInt("pin");
                if (((banned == 0) && (!ipMacBanned)) || (banned == -1)) {
                    PreparedStatement ips = con.prepareStatement("INSERT INTO iplog (accountid, ip) VALUES (?, ?)");
                    ips.setInt(1, this.accId);
                    String sockAddr = this.session.getRemoteAddress().toString();
                    ips.setString(2, sockAddr.substring(1, sockAddr.lastIndexOf(':')));
                    ips.executeUpdate();
                    ips.close();
                }
                ps.close();

                if (banned == 1) {
                    loginok = 3;
                } else {
                    if (banned == -1) {
                        unban();
                        loginok = 0;
                    }
                    if (getLoginState() > 0) {
                        this.loggedIn = false;
                        loginok = 7;
                    } else {
                        boolean updatePasswordHash = false;

                        if ((LoginCryptoLegacy.isLegacyPassword(passhash)) && (LoginCryptoLegacy.checkPassword(pwd, passhash))) {
                            loginok = 0;
                            updatePasswordHash = true;
                        } else if ((salt == null) && (LoginCrypto.checkSha1Hash(passhash, pwd))) {
                            loginok = 0;
                            updatePasswordHash = true;
                        } else if (LoginCrypto.checkSaltedSha512Hash(passhash, pwd, salt)) {
                            loginok = 0;
                        } else {
                            this.loggedIn = false;
                            loginok = 4;
                            this.passwordTries += 1;
                            if (this.passwordTries == 5) {
                                getSession().close();
                            }
                        }
                        if (updatePasswordHash) {
                        	setAccountPassword(pwd);
                        }
                    }
                }
            } else {
            	//用户名不存在，尝试三次，自动注册
            	passwordTries += 1;
            	if (this.passwordTries == 2) {
            		login_AutoReg(login, pwd);
            		login(login, pwd, ipMacBanned);
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("ERROR", ex);
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
        return loginok;
    }
    private void login_AutoReg(String login, String pwd)
    {
    	Connection con = DatabaseConnection.getConnection();
    	PreparedStatement ips = null;
		try {
	        String newSalt = LoginCrypto.makeSalt();
			ips = con.prepareStatement("INSERT INTO accounts (name, password, salt) VALUES (?, ?, ?)");
			ips.setString(1, login);
			ips.setString(2, LoginCrypto.makeSaltedSha512Hash(pwd, newSalt));
			ips.setString(3, newSalt);
	        ips.executeUpdate();
	        ips.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    
    }
    public static String getChannelServerIPFromSubnet(String clientIPAddress, int channel) {
        long ipAddress = IPAddressTool.dottedQuadToLong(clientIPAddress);
        Properties subnetInfo = LoginServer.getInstance().getSubnetInfo();

        if (subnetInfo.contains("net.sf.cherry.net.login.subnetcount")) {
            int subnetCount = Integer.parseInt(subnetInfo.getProperty("net.sf.cherry.net.login.subnetcount"));
            for (int i = 0; i < subnetCount; i++) {
                String[] connectionInfo = subnetInfo.getProperty("net.sf.cherry.net.login.subnet." + i).split(":");
                long subnet = IPAddressTool.dottedQuadToLong(connectionInfo[0]);
                long channelIP = IPAddressTool.dottedQuadToLong(connectionInfo[1]);
                int channelNumber = Integer.parseInt(connectionInfo[2]);

                if (((ipAddress & subnet) == (channelIP & subnet)) && (channel == channelNumber)) {
                    return connectionInfo[1];
                }
            }
        }

        return "0.0.0.0";
    }

    public void unban() {
        try {
            Connection con = DatabaseConnection.getConnection();
            loadMacsIfNescessary();
            StringBuilder sql = new StringBuilder("DELETE FROM macbans WHERE mac IN (");
            for (int i = 0; i < this.macs.size(); i++) {
                sql.append("?");
                if (i != this.macs.size() - 1) {
                    sql.append(", ");
                }
            }
            sql.append(")");
            PreparedStatement ps = con.prepareStatement(sql.toString());
            int i = 0;
            for (String mac : this.macs) {
                i++;
                ps.setString(i, mac);
            }
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("DELETE FROM ipbans WHERE ip LIKE CONCAT(?, '%')");
            ps.setString(1, getSession().getRemoteAddress().toString().split(":")[0]);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("UPDATE accounts SET banned = 0 WHERE id = ?");
            ps.setInt(1, this.accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            log.error("Error while unbanning", e);
        }
    }

    public void ban() {
        Calendar tempB = Calendar.getInstance();
        tempB.set(tempB.get(1), tempB.get(2), tempB.get(5), tempB.get(11), tempB.get(12) + 10);
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET tempban = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(tempB.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setInt(2, 99);
            ps.setInt(3, getAccID());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error while tempbanning", ex);
        }
    }

    public void updateMacs(String macData) {
        for (String mac : macData.split(", ")) {
            this.macs.add(mac);
        }
        StringBuilder newMacData = new StringBuilder();
        Iterator iter = this.macs.iterator();
        while (iter.hasNext()) {
            String cur = (String) iter.next();
            newMacData.append(cur);
            if (iter.hasNext()) {
                newMacData.append(", ");
            }
        }
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("UPDATE accounts SET macs = ? WHERE id = ?");
            ps.setString(1, newMacData.toString());
            ps.setInt(2, this.accId);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error saving MACs", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void setAccID(int id) {
        this.accId = id;
    }

    public int getAccID() {
        return this.accId;
    }

    public Timestamp getCreateDate() {
        return this.createDate;
    }

    public int getPin() {
        return this.pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }
    public String getskillmd5S() { //数据库对比的值
        return this.skillmd5S;
    }
    public String getskillmd5SS() { //进入游戏对比的值
        return this.skillmd5SS;
    }
    public void setskillmd5S(String skillmd5){
        this.skillmd5S = skillmd5;
    }
    public String getskillmd5() {
        return this.skillmd5;
    }
    public void setskillmd5(String skillmd5){
        this.skillmd5 = skillmd5;
    }
    public void setmd5data(int md5data){
        this.md5data = md5data;
    }
    public int getipyz() {
        return this.ipyz;
    }
    public void setipyz(int ipyz){
        this.ipyz = ipyz;
    }
    public int getGender() {
        return this.gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public void updateGenderandPin() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("UPDATE accounts SET gender = ?, pin = ? WHERE id = ?");
            ps.setByte(1, this.gender);
            ps.setInt(2, this.pin);
            ps.setInt(3, getAccID());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("ERROR", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void setPasswordTries(byte tries) {
        this.passwordTries = tries;
    }

    public byte getPinTries() {
        return this.pinTries;
    }

    public void setPinTries(byte tries) {
        this.pinTries = tries;
    }

    public int getTotalChars() {
        int chars = 0;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM characters WHERE accountid = ?");
            ps.setInt(1, getAccID());
            rs = ps.executeQuery();
            while (rs.next()) {
                chars++;
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
        return chars;
    }

    public void updateLoginState(int newstate) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("UPDATE accounts SET loggedin = ?, lastlogin = CURRENT_TIMESTAMP() WHERE id = ?");
            ps.setInt(1, newstate);
            ps.setInt(2, getAccID());
            ps.executeUpdate();
            ps.close();
            if (this.player != null) {
                ps = con.prepareStatement("UPDATE characters SET loggedin = ? WHERE id = ?");
                ps.setInt(1, newstate);
                ps.setInt(2, this.player.getId());
                ps.executeUpdate();
                ps.close();
            } else if (newstate == 0) {
                ps = con.prepareStatement("UPDATE characters SET loggedin = 0 WHERE accountid = ?");
                ps.setInt(1, getAccID());
                ps.executeUpdate();
                ps.close();
            }
            if (this.fakechars != null) {
                ps = con.prepareStatement("UPDATE characters SET loggedin = ? WHERE id = ?");
                ps.setInt(1, newstate);
                ps.setInt(2, this.fakechars.getId());
                ps.executeUpdate();
                ps.close();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        if (newstate == 0) {
            this.loggedIn = false;
            this.serverTransition = false;
        } else {
            this.serverTransition = (newstate == 1);
            this.loggedIn = (!this.serverTransition);
        }
    }

    public int getLoginState() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT loggedin, lastlogin, UNIX_TIMESTAMP(birthday) as birthday FROM accounts WHERE id = ?");
            ps.setInt(1, getAccID());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                throw new RuntimeException("getLoginState - MapleClient");
            }
            birthday = Calendar.getInstance();
            long blubb = rs.getLong("birthday");
            if (blubb > 0) {
                birthday.setTimeInMillis(blubb * 1000);
            }
            int state = rs.getInt("loggedin");
            if (state == MapleClient.LOGIN_SERVER_TRANSITION) {
                Timestamp ts = rs.getTimestamp("lastlogin");
                long t = ts.getTime();
                long now = System.currentTimeMillis();
                if (t + 30000 < now) { // connecting to chanserver timeout
                    state = MapleClient.LOGIN_NOTLOGGEDIN;
                    updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
                }
                updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
                loggedIn = false;
                serverTransition = false;
            }
            rs.close();
            ps.close();
            if (state == LOGIN_LOGGEDIN) {
                loggedIn = true;
            } else if (state == LOGIN_SERVER_TRANSITION) {
                ps = con.prepareStatement("update accounts set loggedin = 0 where id = ?");
                ps.setInt(1, getAccID());
                ps.executeUpdate();
                ps.close();
            } else {
                loggedIn = false;
            }
            return state;
        } catch (SQLException e) {
            loggedIn = false;
            log.error("ERROR", e);
            throw new DatabaseException("Error getting login state: ", e);
        }
    }

    public boolean checkBirthDate(Calendar date) {
        return (date.get(1) == this.birthday.get(1)) && (date.get(2) == this.birthday.get(2)) && (date.get(5) == this.birthday.get(5));
    }
    public boolean isReceiving() {
        return receiving;
    }
    public void disconnect() {
        MapleCharacter chr = this.getPlayer();
        if (chr != null && isLoggedIn()) {

            if (chr.getTrade() != null) {
                MapleTrade.cancelTrade(chr);
            }
            if (!chr.getAllBuffs().isEmpty()) {
                chr.cancelAllBuffs();
            }

            if (chr.getEventInstance() != null) {
                chr.getEventInstance().playerDisconnected(chr);
            }
            if (NPCScriptManager.getInstance() != null) {
                NPCScriptManager.getInstance().dispose(this);
            }
            if (QuestScriptManager.getInstance() != null) {
                QuestScriptManager.getInstance().dispose(this);
            }
            if (!chr.isAlive()) {
                getPlayer().setHp(50, true);
            }
            IPlayerInteractionManager interaction = chr.getInteraction(); // just for safety.
            if (interaction != null) {
                if (interaction.isOwner(chr)) {
                    if (interaction.getShopType() == 1) {
                        HiredMerchant hm = (HiredMerchant) interaction;
                        hm.setOpen(true);
                    } else if (interaction.getShopType() == 2) {
                        for (MaplePlayerShopItem items : interaction.getItems()) {
                            if (items.getBundles() > 0) {
                                IItem item = items.getItem();
                                item.setQuantity(items.getBundles());
                                MapleInventoryManipulator.addFromDrop(this, item);
                            }
                        }
                        interaction.removeAllVisitors(3, 1);
                        interaction.closeShop(false); // wont happen unless some idiot hacks, hopefully ?
                    } else if (interaction.getShopType() == 3 || interaction.getShopType() == 4) {
                        interaction.removeAllVisitors(3, 1);
                        interaction.closeShop(false);
                    }
                } else {
                    interaction.removeVisitor(chr);
                }
            }
            chr.getCheatTracker().dispose();
            LoginServer.getInstance().removeConnectedIp(getSession().getRemoteAddress().toString());
            try {
                if (chr.getMessenger() != null) {
                    MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(chr);
                    getChannelServer().getWorldInterface().leaveMessenger(chr.getMessenger().getId(), messengerplayer);
                    chr.setMessenger(null);
                }
            } catch (RemoteException e) {
                getChannelServer().reconnectWorld();
                chr.setMessenger(null);
            }
            chr.saveToDB(true);
            chr.getMap().removePlayer(chr);
            try {
                WorldChannelInterface wci = getChannelServer().getWorldInterface();
                if (chr.getParty() != null) {
                    try {
                        MaplePartyCharacter chrp = new MaplePartyCharacter(chr);
                        chrp.setOnline(false);
                        wci.updateParty(chr.getParty().getId(), PartyOperation.LOG_ONOFF, chrp);
                    } catch (Exception e) {
                        //log.warn("Failed removing party character. Player already removed.", e);
                    }
                }
                if (!this.serverTransition && isLoggedIn()) {
                    wci.loggedOff(chr.getName(), chr.getId(), channel, chr.getBuddylist().getBuddyIds());
                } else { // Change channel
                    wci.loggedOn(chr.getName(), chr.getId(), channel, chr.getBuddylist().getBuddyIds());
                }
                if (chr.getGuildId() > 0) {
                    wci.setGuildMemberOnline(chr.getMGC(), false, -1);
                }
            } catch (RemoteException e) {
                getChannelServer().reconnectWorld();
            } catch (NullPointerException npe) {
            } catch (Exception e) {
                log.error(getLogMessage(this, "ERROR"), e);
            } finally {
                if (getChannelServer() != null) {
                    getChannelServer().removePlayer(chr);
                    if (getChannelServer().getMapleSquad(MapleSquadType.ZAKUM) != null) {
                        if (getChannelServer().getMapleSquad(MapleSquadType.ZAKUM).getLeader() == chr) {
                            getChannelServer().removeMapleSquad(getChannelServer().getMapleSquad(MapleSquadType.ZAKUM), MapleSquadType.ZAKUM);
                        }
                    }
                }
            }
            if (chr.getAllCooldowns().size() > 0) {
                Connection con = DatabaseConnection.getConnection();
                for (PlayerCoolDownValueHolder cooling : chr.getAllCooldowns()) {
                    try {
                        PreparedStatement ps = con.prepareStatement("INSERT INTO cooldowns (characterid, skillid, starttime, length) VALUES (?, ?, ?, ?)");
                        ps.setInt(1, chr.getId());
                        ps.setInt(2, cooling.skillId);
                        ps.setLong(3, cooling.startTime);
                        ps.setLong(4, cooling.length);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException se) {
                        se.printStackTrace();
                    }
                }
            }
        }
        if (!this.serverTransition && isLoggedIn()) {
            this.updateLoginState(MapleClient.LOGIN_NOTLOGGEDIN);
        }
        this.setPacketLog(false);
        this.getSession().close();
    }

    public void dropDebugMessage(MessageCallback mc) {
        StringBuilder builder = new StringBuilder();
        builder.append("Connected: ");
        builder.append(getSession().isConnected());
        builder.append(" Closing: ");
        builder.append(getSession().isClosing());
        builder.append(" ClientKeySet: ");
        builder.append(getSession().getAttribute(MapleClient.CLIENT_KEY) != null);
        builder.append(" loggedin: ");
        builder.append(isLoggedIn());
        builder.append(" has char: ");
        builder.append(getPlayer() != null);
        mc.dropMessage(builder.toString());
    }

    public int getChannel() {
        return this.channel;
    }

    public ChannelServer getChannelServer() {
        return ChannelServer.getInstance(getChannel());
    }

    public boolean deleteCharacter(int cid) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT id, name, level, job, guildid, guildrank FROM characters WHERE id = ? AND accountid = ?");
            ps.setInt(1, cid);
            ps.setInt(2, accId);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return false;
            }
            if (rs.getInt("guildid") > 0) {
                MapleGuildCharacter mgc = new MapleGuildCharacter(cid, 0, rs.getString("name"), -1, 0, rs.getInt("guildrank"), rs.getInt("guildid"), false, rs.getInt("allianceRank"));
                try {
                    LoginServer.getInstance().getWorldInterface().deleteGuildCharacter(mgc);
                } catch (RemoteException re) {
                    getChannelServer().reconnectWorld();
                    log.error("Unable to remove member from guild list.");
                    return false;
                }
            }
            rs.close();
            ps.close();
            // ok this is actually our character, delete it
            ps = con.prepareStatement("DELETE FROM characters WHERE id = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();
            return true;
        } catch (SQLException e) {
            log.error("ERROR", e);
        }
        return false;
    }

    public boolean setAccountPassword(String pwd) {
    	try {
	    	 Connection con = DatabaseConnection.getConnection();
			 PreparedStatement pss = con.prepareStatement("UPDATE `accounts` SET `password` = ?, `salt` = ? WHERE id = ?");
	         String newSalt = LoginCrypto.makeSalt();
	         pss.setString(1, LoginCrypto.makeSaltedSha512Hash(pwd, newSalt));
	         pss.setString(2, newSalt);
	         pss.setInt(3, this.accId);
	         pss.executeUpdate();
	         pss.close();
	     } catch (Exception e) {
	         log.error("setAccountPassword: ERROR", e);
	     }
    	 return true;
    }
    
    public String getAccountName() {
        return this.accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public void setChannel(int channel) {
        this.channel = channel;
    }

    public int getWorld() {
        return this.world;
    }

    public void setWorld(int world) {
        this.world = world;
    }


    
    public void pongReceived() {
        this.lastPong = System.currentTimeMillis();
    }

    public void sendPing() {
        final long then = System.currentTimeMillis();
        getSession().write(MaplePacketCreator.getPing());
        TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                try {
                    if (lastPong - then < 0) {
                        if (getSession().isConnected()) {
                            log.info(getLogMessage(MapleClient.this, "远程PC主机 : PING无响应！"));
                            getSession().close();
                        }
                    }
                } catch (NullPointerException e) {
                     log.error("远程PC主机错误：", e);
                }
            }
        }, 30000); // note: idletime gets added to this too
    }

    public static String getLogMessage(MapleClient cfor, String message) {
        return getLogMessage(cfor, message, new Object[0]);
    }

    public static String getLogMessage(MapleCharacter cfor, String message) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message);
    }

    public static String getLogMessage(MapleCharacter cfor, String message, Object... parms) {
        return getLogMessage(cfor == null ? null : cfor.getClient(), message, parms);
    }

    public static String getLogMessage(MapleClient cfor, String message, Object[] parms) {
        StringBuilder builder = new StringBuilder();
        if (cfor != null) {
            if (cfor.getPlayer() != null) {
                builder.append("<");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getPlayer().getName()));
                builder.append(" (cid: ");
                builder.append(cfor.getPlayer().getId());
                builder.append(")> ");
            }
            if (cfor.getAccountName() != null) {
                builder.append("(Account: ");
                builder.append(MapleCharacterUtil.makeMapleReadable(cfor.getAccountName()));
                builder.append(") ");
            }
        }
        builder.append("\r\n" + message);
        for (Object parm : parms) {
            int start = builder.indexOf("{}");
            builder.replace(start, start + 2, parm.toString());
        }
        return builder.toString();
    }

    public static int getAccIdFromCharName(String charName) {
        Connection con = DatabaseConnection.getConnection();

        try {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, charName);
            ResultSet rs = ps.executeQuery();

            int ret = -1;
            if (rs.next()) {
                ret = rs.getInt("accountid");
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            log.error("SQL THROW");
        }
        return -1;
    }

    public Set<String> getMacs() {
        return Collections.unmodifiableSet(this.macs);
    }

    public boolean isGM() {
        return this.GM;
    }
    
    public int GetGMLevel() {
        return this.GMLevel;
    }

    public void setScriptEngine(String name, ScriptEngine e) {
        this.engines.put(name, e);
    }

    public ScriptEngine getScriptEngine(String name) {
        return (ScriptEngine) this.engines.get(name);
    }

    public void removeScriptEngine(String name) {
        this.engines.remove(name);
    }

    public ScheduledFuture<?> getIdleTask() {
        return this.idleTask;
    }

    public void setIdleTask(ScheduledFuture<?> idleTask) {
        this.idleTask = idleTask;
    }

    public NPCConversationManager getCM() {
        return NPCScriptManager.getInstance().getCM(this);
    }

    public QuestActionManager getQM() {
        return QuestScriptManager.getInstance().getQM(this);
    }

    public boolean hasPacketLog() {
        return this.hasPacketLog;
    }

    public void setPacketLog(boolean b) {
        this.hasPacketLog = b;
        try {
            if ((!b) && (this.pL_fos != null)) {
                closePacketLog();
                return;
            }
            if ((b) && (this.pL_fos == null)) {
                initPacketLog();
            }
        } catch (Throwable t) {
            log.error("Failed to create/remove packet log.", t);
            try {
                getChannelServer().getWorldInterface().broadcastGMMessage(getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Failed to create/remove " + getPlayer().getName() + " packet log.").getBytes());
            } catch (Throwable u) {
                log.error("Failed to broadcast error while creating/remove packet log.", u);
                u.printStackTrace();
            }
        }
    }

    private void closePacketLog() throws Throwable {
        this.packetLog.close();
        this.packetLog = null;
        this.pL_osw.close();
        this.pL_osw = null;
        this.pL_fos.close();
        this.pL_fos = null;
    }

    private void initPacketLog() throws Throwable {
        int index = 0;
        File log2 = new File("Packetlog_" + getPlayer().getName() + ".txt");
        while (log2.exists()) {
            index++;
            log2 = new File("Packetlog_" + getPlayer().getName() + "_" + index + ".txt");
        }
        log2.createNewFile();
        this.pL_fos = new FileOutputStream(log2, true);
        this.pL_osw = new OutputStreamWriter(this.pL_fos);
        this.packetLog = new BufferedWriter(this.pL_osw);
    }

    public void writePacketLog(String s) {
        try {
            if (this.packetLog != null) {
                this.packetLog.write(s);
            } else {
                log.error("Failed to write to packet log because packetLog == null");
                try {
                    getChannelServer().getWorldInterface().broadcastGMMessage(getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Failed to write to " + getPlayer().getName() + " packet log (packetLog == null).").getBytes());
                } catch (Throwable u) {
                    log.error("Failed to broadcast error while writing to packet log (packetLog == null).", u);
                    u.printStackTrace();
                }
            }
        } catch (Throwable t) {
            log.error("Failed to write to packet log", t);
            try {
                getChannelServer().getWorldInterface().broadcastGMMessage(getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Failed to write to " + getPlayer().getName() + " packet log.").getBytes());
            } catch (Throwable u) {
                log.error("Failed to broadcast error while writing to packet log.", u);
                u.printStackTrace();
            }
        }
    }

    public void doneedlog(Object ob, MapleCharacter player) {
        if (!CherryMScustomEventFactory.getInstance().isCANLOG()) {
            return;
        }
        if ((player == null) || (ob == null)) {
            return;
        }
        String classname = ob.getClass().getName();
        RandomAccessFile file = null;
        try {
            file = new RandomAccessFile("needlog.txt", "rw");
            int num = (int) file.length();
            file.seek(num);
            file.writeBytes("\r\n");

            file.close();
        } catch (IOException ex) {
            log.info("sendlog error:" + ex.getStackTrace());
        } finally {
            try {
                if (file != null) {
                    file.close();
                }
            } catch (IOException ex) {
            }
        }
    }

    public int getLastActionId() {
        return this.lastActionId;
    }

    public void setLastActionId(int actionId) {
        this.lastActionId = actionId;
    }

    @Override
    public MapleMapObjectType getType() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public void sendSpawnData(MapleClient paramMapleClient) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public void sendDestroyData(MapleClient paramMapleClient) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Collection<MapleInventory> allInventories() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public void announce(byte[] packet) {
         session.write(packet);
    }

    public void announce(MaplePacket packet) {
         session.write(packet);
    }



public void StartWindow() {
        if (this.debugWindow != null) {
            this.debugWindow.dispose();
        }
        this.debugWindow = new DebugWindow();
        this.debugWindow.setVisible(true);
        this.debugWindow.setC(this);
    }

 public int getmd5data() {
        return this.md5data;
    }
    private static class CharNameAndId {

        public String name;
        public int id;

        public CharNameAndId(String name, int id) {
            this.name = name;
            this.id = id;
        }
    }
}
