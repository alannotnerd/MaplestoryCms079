package net.sf.cherry.client;

import java.awt.Point;
import java.io.File;
import java.lang.ref.WeakReference;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.ConcurrentModificationException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.anticheat.CheatTracker;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.database.DatabaseException;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.net.PacketProcessor;
import net.sf.cherry.net.Constants.GameConstants;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.channel.handler.DueyActionHandler.Actions;
import net.sf.cherry.net.world.MapleMessenger;
import net.sf.cherry.net.world.MapleMessengerCharacter;
import net.sf.cherry.net.world.MapleParty;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.net.world.PartyOperation;
import net.sf.cherry.net.world.PlayerBuffValueHolder;
import net.sf.cherry.net.world.PlayerCoolDownValueHolder;
import net.sf.cherry.net.world.guild.MapleGuild;
import net.sf.cherry.net.world.guild.MapleGuildCharacter;
import net.sf.cherry.net.world.remote.WorldChannelInterface;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.scripting.event.EventInstanceManager;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.server.MapleAchievement;
import net.sf.cherry.server.MapleAchievements;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MapleMiniGame;
import net.sf.cherry.server.MapleMonsterCarnival;
import net.sf.cherry.server.MaplePlayerNPC;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.MapleShop;
import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.MapleStorage;
import net.sf.cherry.server.MapleTrade;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleMonsterStats;
import net.sf.cherry.server.life.MobSkill;
import net.sf.cherry.server.maps.AbstractAnimatedMapleMapObject;
import net.sf.cherry.server.maps.FakeCharacter;
import net.sf.cherry.server.maps.MapleDoor;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapEffect;
import net.sf.cherry.server.maps.MapleMapFactory;
import net.sf.cherry.server.maps.MapleMapObject;
import net.sf.cherry.server.maps.MapleMapObjectType;
import net.sf.cherry.server.maps.MapleSummon;
import net.sf.cherry.server.maps.SavedLocationType;
import net.sf.cherry.server.maps.SummonMovementType;
import net.sf.cherry.server.movement.LifeMovementFragment;
import net.sf.cherry.server.playerinteractions.HiredMerchant;
import net.sf.cherry.server.playerinteractions.IPlayerInteractionManager;
import net.sf.cherry.server.playerinteractions.MaplePlayerShop;
import net.sf.cherry.server.quest.MapleCustomQuest;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;

public class MapleCharacter extends AbstractAnimatedMapleMapObject implements InventoryContainer {

    private static Logger log = LoggerFactory.getLogger(PacketProcessor.class);
    public static final double MAX_VIEW_RANGE_SQ = 10000000.0D;
    private int world;
    private int accountid;
    private int rank;
    private int rankMove;
    private int jobRank;
    private int jobRankMove;
    private int familyId;
    private String name;
    private int level;
    private int pvpkills;
    private int pvpdeaths;
    private int qiandao;//签到
    private int qiandao2;
    private int modid;//怪物ID
    private int modsl;//怪物数量
    private int tuiguang;//推广人表
    private int tuiguang2;//推广值
    private int str;
    private int dex;
    private int luk;
    private int int_;
    private AtomicInteger exp = new AtomicInteger();
    private int hp;
    private int maxhp;
    private int mp;
    private int maxmp;
    private int mpApUsed;
    private int hpApUsed;
    private int hair;
    private int face;
    private AtomicInteger meso = new AtomicInteger();
    private long cashdd;
    private int remainingAp;
    private int remainingSp;
    private int[] savedLocations;
    private int fame;
    private long lastfametime;
    private List<Integer> lastmonthfameids;
    private transient int localmaxhp;
    private transient int localmaxmp;
    private transient int localstr;
    private transient int localdex;
    private transient int localluk;
    private transient int localint_;
    private transient int magic;
    private transient int watk;
    private transient double speedMod;
    private transient double jumpMod;
    private transient int localmaxbasedamage;
    private int id;
    private int lingqu;
    private MapleClient client;
    private MapleMap map;
    private int initialSpawnPoint;
    private int mapid;
    private int cygnusLinkId = 0;
    private int energyPoint = 0; //能量
    private MapleShop shop = null;
    private MapleStorage storage = null;
    private SkillMacro[] skillMacros = new SkillMacro[5];
    private MapleTrade trade = null;
    private MapleSkinColor skinColor = MapleSkinColor.NORMAL;
    private MapleJob job = MapleJob.BEGINNER;
    private int gender;
    private int GMLevel;
    private int vip;
    private int Reborns;
    private boolean hidden = false;
    private boolean canDoor = true;
    private int chair;
    private int bosschongfan;//boss挑战重返
    private int itemEffect;
    private int APQScore;
    private MapleParty party;
    private EventInstanceManager eventInstance = null;
    private MapleInventory[] inventory;
    private Map<MapleQuest, MapleQuestStatus> quests;
    private Set<MapleMonster> controlled = new LinkedHashSet();
    private Set<MapleMapObject> visibleMapObjects = new LinkedHashSet();
    private Map<ISkill, SkillEntry> skills = new LinkedHashMap();
    private Map<MapleBuffStat, MapleBuffStatValueHolder> effects = new LinkedHashMap();
    private Map<Integer, MapleKeyBinding> keymap = new LinkedHashMap();
    private List<MapleDoor> doors = new ArrayList();
    private ArrayList<Integer> excluded = new ArrayList();
    private Map<Integer, MapleSummon> summons = new LinkedHashMap();
    private BuddyList buddylist;
    private Map<Integer, MapleCoolDownValueHolder> coolDowns = new LinkedHashMap();
    private CheatTracker anticheat;
    private ScheduledFuture<?> dragonBloodSchedule;
    private ScheduledFuture<?> mapTimeLimitTask = null;
    private int guildid;
    private int guildrank;
    private int allianceRank;
    private MapleGuildCharacter mgc = null;
    private int paypalnx;
    private int jinglingskill;
    private String skillmd5;
    private int md5data;
    private String skillmd5SS = "50";
    private String ipyz;
//    private int maplepoints;
    private int cardnx;
    private List<MapleDisease> diseases = new ArrayList();
    private boolean incs;
    private boolean inmts;
    private MapleMessenger messenger = null;
    int messengerposition = 4;
    private int slots = 0;
    private ScheduledFuture<?> hpDecreaseTask;
    private ScheduledFuture<?> beholderHealingSchedule;
    private ScheduledFuture<?> beholderBuffSchedule;
    private ScheduledFuture<?> BerserkSchedule;
    private MapleCSInventory csinventory;
    private boolean Berserk = false;
    public SummonMovementType getMovementType;
    private String chalktext;
    private int team;
    private int canTalk;
    private int zakumLvl;
    private int married;
    private int partnerid;
    private int marriageQuestLevel;
    private List<LifeMovementFragment> lastres;
    private boolean smegaEnabled = true;
    private long afkTimer = 0L;
    private long loggedInTimer = 0L;
    private boolean isEnteringPortal = false;
    private int currentPage = 0;
    private int currentType = 0;
    private int currentTab = 1;
    private int changeCI = 0;
    private int energybar = 0;
    private String Search;
    ScheduledFuture energyDecrease = null;
    private int hppot = 0;
    private int mppot = 0;
    private int bossPoints;
    private int bossRepeats;
    private long nextBQ = 0L;
    private boolean hasMerchant;
    private boolean playerNPC;
    private int battleshipHP;
    private MapleMount maplemount;
    private List<Integer> finishedAchievements = new ArrayList();
    private boolean banned = false;
    private boolean needsParty = false;
    private int needsPartyMinLevel;
    private int needsPartyMaxLevel;
    private boolean CPQChallenged = false;
    private int CP = 0;
    private int totalCP = 0;
    private MapleMonsterCarnival monsterCarnival;
    private int CPQRanking = 0;
    private int autoHpPot;
    private int autoMpPot;
    private Point lastPortalPoint;
    private boolean partyInvite;
    private long lastSave;
    private boolean muted;
    Calendar unmuteTime = null;
    private boolean godmode;
    private Map<Long, MapleStatEffect> buffsToCancel = new HashMap();
    private boolean questDebug = false;
    private List<String> mapletips = new ArrayList();
    private int Present;
    private int bookCover;
    private MonsterBook monsterbook;
    private IPlayerInteractionManager interaction = null;
    private int vanquisherStage;
    private int vanquisherKills;
    private int dojoPoints;
    private int lastDojoStage;
    private int dojoEnergy;
    private long dojoFinish;
    private boolean finishedDojoTutorial;
    private Map<Integer, String> entered = new LinkedHashMap();
    private MaplePet pet = null;
    private ScheduledFuture<?> fullnessSchedule;
    private ScheduledFuture<?> fullnessSchedule_1;
    private ScheduledFuture<?> fullnessSchedule_2;
    private List<MaplePet> pets = new ArrayList();
    private int Warning;
    public int comboCounter;
    private boolean 元神额外伤害 = false;
    private boolean 活动NPC = false;
    public int lastAttack;
    public static boolean tutorial = false;
    public ArrayList<String> ares_data = new ArrayList();
    private List<String> blockedPortals = new ArrayList();
    private int energyChargeLevel = 0;
    private ScheduledFuture<?> energyChargeSchedule;
    private NumberFormat nf = new DecimalFormat("#,###,###,###");
    private boolean noEnergyChargeDec = false;
    private ChannelServer cserv;
    private boolean cherryban;
    private Timestamp cherrybanTill;
    private int battleshipHp = 0;
    private Calendar tempban = null;
    private long deadtime = 1000L;
    private long lasttime = 0L;
    private long currenttime = 0L;
    private long 防止复制时间 = 1000L;
    private long 开始闪烁 = 500L;
    private int 怪物伤害 = 5;
    private int 闪烁时间 = 0;
    private int duboPionts;
    private int touzhuNum;
    private int touzhuType;
    private int touzhuNX;
    private int mPoints;
    private int omokwins, omokties, omoklosses, matchcardwins, matchcardties, matchcardlosses, xyxjf;
    MapleMiniGame miniGame;
    private boolean isfake = false;
    private List<FakeCharacter> fakes = new ArrayList<FakeCharacter>();
    private int xflh;
    private int jf;
    
    
   private Fishing fishingObj;

    public MapleCharacter() {
        setStance(0);
        this.inventory = new MapleInventory[MapleInventoryType.values().length];
        for (MapleInventoryType type : MapleInventoryType.values()) {
            this.inventory[type.ordinal()] = new MapleInventory(type, (byte) 100);
        }

        this.savedLocations = new int[SavedLocationType.values().length];
        for (int i = 0; i < SavedLocationType.values().length; i++) {
            this.savedLocations[i] = -1;
        }

        this.quests = new LinkedHashMap();
        this.anticheat = new CheatTracker(this);
        setPosition(new Point(0, 0));
    }

    public void setskillmd5Log(String fsbid) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("insert into skillmd5log (characterid, fsbtype,accountid,account,charactername) values (?,?,?,?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, fsbid);
            ps.setInt(3, getClient().getAccID());
            ps.setString(4, getClient().getAccountName());
            ps.setString(5, getClient().getPlayer().getName());
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            log.error("插入语句错误，请确认你的SQL密码正确且没有关闭。", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void setmd5dataLog(String fsbid) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("insert into md5datalog (characterid, fsbtype,accountid,account,charactername) values (?,?,?,?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, fsbid);
            ps.setInt(3, getClient().getAccID());
            ps.setString(4, getClient().getAccountName());
            ps.setString(5, getClient().getPlayer().getName());
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            log.error("插入语句错误，请确认你的SQL密码正确且没有关闭。", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void dropMessage(String message) {
        this.client.getSession().write(MaplePacketCreator.serverNotice(isGM() ? 6 : 5, message));
    }

    public void dropMessage(int type, String message) {
        this.client.getSession().write(MaplePacketCreator.serverNotice(type, message));
    }

    public void changeMap(MapleMap to) {
        changeMap(to, to.getPortal(0));
    }

    public void changeMap(MapleMap to, MaplePortal pto) {
        if ((to.getId() == 100000200) || (to.getId() == 211000100) || (to.getId() == 220000300)) {
            changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId() - 2, this));
        } else {
            changeMapInternal(to, pto.getPosition(), MaplePacketCreator.getWarpToMap(to, pto.getId(), this));
        }
    }

    public void changeMap(MapleMap to, Point pos) {
        changeMapInternal(to, pos, MaplePacketCreator.getWarpToMap(to, 128, this));
    }

    public void changeMapBanish(int mapid, String portal, String msg) {
        dropMessage(5, msg);
        MapleMap map_ = ChannelServer.getInstance(this.client.getChannel()).getMapFactory().getMap(mapid);
        changeMap(map_, map_.getPortal(portal));
    }

    public void gainNX(int nxchange) {
        this.paypalnx += nxchange;
    }

    public int getNX() {
        return this.paypalnx;
    }

    public void gainjinglingskill(int jinglingskill) {
        this.jinglingskill += jinglingskill;
    }

    public void gainlingqu(int lingqu) {
        this.lingqu += lingqu;
    }

    public void gainipyz(int ipyz) {
        this.ipyz += ipyz;
    }

    public void gain怪物伤害(int 怪物伤害) {
        this.怪物伤害 += 怪物伤害;
    }

    public int getlingqu() {
        return this.lingqu;
    }

    public int getjinglingskill() {
        return this.jinglingskill;
    }

    public String getskillmd5() {
        return this.skillmd5;
    }

    public int getmd5data() {
        return this.md5data;
    }

    public String getskillmd5SS() {
        return this.skillmd5SS;
    }

    public String getipyz() {
        return this.ipyz;
    }

    public void gainXyxjf(int xyxjf) {
        this.xyxjf += xyxjf;
    }

    public int getXyxjf() {
        return this.xyxjf;
    }

    public void gainmd5data(int md5data) {
        this.md5data += md5data;
    }

    public void gainCashDD(long cashdd) {
        this.cashdd += cashdd;
    }

    public long getCashDD() {
        return this.cashdd;
    }

    public MapleCharacter getThis() {
        return this;
    }

    public IPlayerInteractionManager getInteraction() {
        return this.interaction;
    }

    public void setInteraction(IPlayerInteractionManager box) {
        this.interaction = box;
    }

    public void message(String m) {
        dropMessage(5, m);
    }

    public int addDojoPointsByMap() {
        int pts = 0;
        if (this.dojoPoints < 17000) {
            pts = 1 + (getMap().getId() - 1) / 100 % 100 / 6;
            if (this.party != null) {
                int highest = this.level;
                int lowest = this.level;
                for (MaplePartyCharacter mpc : this.party.getMembers()) {
                    if (mpc.getLevel() > highest) {
                        highest = mpc.getLevel();
                    } else if (mpc.getLevel() < lowest) {
                        lowest = mpc.getLevel();
                    }
                }
                pts += (highest - lowest < 30 ? 0 : -pts);
            } else {
                pts++;
            }
            this.dojoPoints += pts;
        }
        return pts;
    }

    public void maxSkillLevel(int skillid) {
        int maxlevel = SkillFactory.getSkill(skillid).getMaxLevel();
        changeSkillLevel(SkillFactory.getSkill(skillid), maxlevel, maxlevel);
    }

    public void addExcluded(int x) {
        this.excluded.add(Integer.valueOf(x));
    }

    public void showMapleTips() {
        for (String s : this.mapletips) {
            this.client.getSession().write(MaplePacketCreator.serverNotice(5, s));
        }
    }

    public int getPresent() {
        return this.Present;
    }

    public void setPresent(int state) {
        this.Present = state;
    }

    public boolean getFinishedDojoTutorial() {
        return this.finishedDojoTutorial;
    }

    public MonsterBook getMonsterBook() {
        return this.monsterbook;
    }

    public int getMonsterBookCover() {
        return this.bookCover;
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver) throws SQLException {
        MapleCharacter ret = new MapleCharacter();
        ret.client = client;
        ret.id = charid;

        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
        ps.setInt(1, charid);
        ResultSet rs = ps.executeQuery();
        if (!rs.next()) {
            throw new RuntimeException("Loading the Char Failed (char not found)");
        }
        ret.inventory[MapleInventoryType.EQUIP.ordinal()] = new MapleInventory(MapleInventoryType.EQUIP, (byte) rs.getInt("equipSlots"));
        ret.inventory[MapleInventoryType.USE.ordinal()] = new MapleInventory(MapleInventoryType.USE, (byte) rs.getInt("useSlots"));
        ret.inventory[MapleInventoryType.SETUP.ordinal()] = new MapleInventory(MapleInventoryType.SETUP, (byte) rs.getInt("setupSlots"));
        ret.inventory[MapleInventoryType.ETC.ordinal()] = new MapleInventory(MapleInventoryType.ETC, (byte) rs.getInt("etcSlots"));
        ret.inventory[MapleInventoryType.CASH.ordinal()] = new MapleInventory(MapleInventoryType.CASH, (byte) rs.getInt("cashSlots"));
        ret.name = rs.getString("name");
        ret.level = rs.getInt("level");
        ret.pvpdeaths = rs.getInt("pvpdeaths");
        ret.pvpkills = rs.getInt("pvpkills");
        ret.qiandao = rs.getInt("qiandao");
        ret.qiandao2 = rs.getInt("qiandao2");
        ret.modid = rs.getInt("modid");
        ret.modsl = rs.getInt("modsl");
        ret.tuiguang = rs.getInt("tuiguang");
        ret.tuiguang2 = rs.getInt("tuiguang2");//推广值
        ret.vip = rs.getInt("vip");
        ret.fame = rs.getInt("fame");
        ret.str = rs.getInt("str");
        ret.dex = rs.getInt("dex");
        ret.int_ = rs.getInt("int");
        ret.luk = rs.getInt("luk");
        ret.exp.set(rs.getInt("exp"));
        ret.hp = rs.getInt("hp");
        ret.maxhp = rs.getInt("maxhp");
        ret.mp = rs.getInt("mp");
        ret.maxmp = rs.getInt("maxmp");

        ret.hpApUsed = rs.getInt("hpApUsed");
        ret.mpApUsed = rs.getInt("mpApUsed");
        ret.hasMerchant = (rs.getInt("HasMerchant") == 1);
        ret.remainingSp = rs.getInt("sp");
        ret.remainingAp = rs.getInt("ap");
        ret.meso.set(rs.getInt("meso"));
        ret.GMLevel = rs.getInt("gm");
        ret.Reborns = rs.getInt("reborns");
        int mountexp = rs.getInt("mountexp");
        int mountlevel = rs.getInt("mountlevel");
        int mounttiredness = rs.getInt("mounttiredness");

        ret.skinColor = MapleSkinColor.getById(rs.getInt("skincolor"));
        ret.gender = rs.getInt("gender");
        ret.job = MapleJob.getById(rs.getInt("job"));

        ret.canTalk = rs.getInt("cantalk");

        ret.married = rs.getInt("married");
        ret.partnerid = rs.getInt("partnerid");
        ret.marriageQuestLevel = rs.getInt("marriagequest");

        ret.zakumLvl = rs.getInt("zakumLvl");

        ret.hair = rs.getInt("hair");
        ret.face = rs.getInt("face");

        ret.finishedDojoTutorial = (rs.getInt("finishedDojoTutorial") == 1);

        ret.dojoPoints = rs.getInt("dojoPoints");
        ret.lastDojoStage = rs.getInt("lastDojoStage");
        ret.vanquisherKills = rs.getInt("vanquisherKills");
        ret.vanquisherStage = rs.getInt("vanquisherStage");

        ret.accountid = rs.getInt("accountid");

        ret.mapid = rs.getInt("map");
        ret.initialSpawnPoint = rs.getInt("spawnpoint");
        ret.world = rs.getInt("world");

        ret.bookCover = rs.getInt("monsterbookcover");
        ret.monsterbook = new MonsterBook();
        ret.monsterbook.loadCards(charid);

        ret.rank = rs.getInt("rank");
        ret.rankMove = rs.getInt("rankMove");
        ret.jobRank = rs.getInt("jobRank");
        ret.jobRankMove = rs.getInt("jobRankMove");

        ret.familyId = rs.getInt("familyId");
        ret.guildid = rs.getInt("guildid");
        ret.guildrank = rs.getInt("guildrank");
        if (ret.guildid > 0) {
            ret.mgc = new MapleGuildCharacter(ret);
        }
        ret.allianceRank = rs.getInt("alliancerank");
        ret.Warning = rs.getInt("Warning");
        int buddyCapacity = rs.getInt("buddyCapacity");
        ret.buddylist = new BuddyList(buddyCapacity);

        ret.autoHpPot = rs.getInt("autoHpPot");
        ret.autoMpPot = rs.getInt("autoMpPot");

        ret.bossPoints = rs.getInt("bosspoints");
        ret.bossRepeats = rs.getInt("bossrepeats");

        ret.omokwins = rs.getInt("omokwins");
        ret.omoklosses = rs.getInt("omoklosses");
        ret.omokties = rs.getInt("omokties");
        ret.matchcardwins = rs.getInt("matchcardwins");
        ret.matchcardlosses = rs.getInt("matchcardlosses");
        ret.matchcardties = rs.getInt("matchcardties");
        ret.xyxjf = rs.getInt("xyxjf");
        ret.xflh = rs.getInt("xflh");
        ret.jf = rs.getInt("jf");

        ret.nextBQ = rs.getLong("nextBQ");
        ret.cashdd = rs.getLong("cashdd");
        ret.muted = (rs.getInt("muted") == 1);
        ret.playerNPC = (rs.getInt("playerNPC") > 0);
        Calendar c = Calendar.getInstance();
        c.setTime(new Date(rs.getLong("unmutetime")));
        ret.unmuteTime = c;
        if (channelserver) {
            MapleMapFactory mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
            ret.map = mapFactory.getMap(ret.mapid);
            if (ret.map == null) {
                ret.map = mapFactory.getMap(100000000);
            } else if (ret.map.getForcedReturnId() != 999999999) {
                ret.map = mapFactory.getMap(ret.map.getForcedReturnId());
            }
            MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
            if (portal == null) {
                portal = ret.map.getPortal(0);
                ret.initialSpawnPoint = 0;
            }
            ret.setPosition(portal.getPosition());

            int partyid = rs.getInt("party");
            if (partyid >= 0) {
                try {
                    MapleParty party = client.getChannelServer().getWorldInterface().getParty(partyid);
                    if ((party != null) && (party.getMemberById(ret.id) != null)) {
                        ret.party = party;
                    }
                } catch (RemoteException e) {
                    client.getChannelServer().reconnectWorld();
                }
            }

            int messengerid = rs.getInt("messengerid");
            int position = rs.getInt("messengerposition");
            if ((messengerid > 0) && (position < 4) && (position > -1)) {
                try {
                    WorldChannelInterface wci = ChannelServer.getInstance(client.getChannel()).getWorldInterface();
                    MapleMessenger messenger = wci.getMessenger(messengerid);
                    if (messenger != null) {
                        ret.messenger = messenger;
                        ret.messengerposition = position;
                    }
                } catch (RemoteException e) {
                    client.getChannelServer().reconnectWorld();
                }
            }
        }

        rs.close();
        ps.close();

        ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
        ps.setInt(1, ret.accountid);
        rs = ps.executeQuery();
        while (rs.next()) {
            ret.getClient().setAccountName(rs.getString("name"));
            ret.paypalnx = rs.getInt("paypalNX");
            ret.jinglingskill = rs.getInt("jinglingskill");
            ret.lingqu = rs.getInt("lingqu");
            ret.skillmd5 = rs.getString("skillmd5");
            ret.md5data = rs.getInt("md5data");
            ret.ipyz = rs.getString("ipyz");
            ret.mPoints = rs.getInt("mPoints");
            ret.cardnx = rs.getInt("cardNX");
            ret.Present = rs.getInt("Present");
            ret.tempban = ret.getTempBanCalendar(rs);
            ret.cherrybanTill = rs.getTimestamp("tempban");
        }
        Calendar tempbannedTill = ret.getTempBanCalendar();
        if (tempbannedTill.getTimeInMillis() != 0L) {
            ret.cherryban = true;
        }
        rs.close();
        ps.close();

        String sql = "SELECT * FROM inventoryitems LEFT JOIN inventoryequipment USING (inventoryitemid) WHERE characterid = ?";
        if (!channelserver) {
            sql = sql + " AND inventorytype = " + MapleInventoryType.EQUIPPED.getType();
        }
        ps = con.prepareStatement(sql);
        ps.setInt(1, charid);
        rs = ps.executeQuery();
        while (rs.next()) {
            MapleInventoryType type = MapleInventoryType.getByType((byte) rs.getInt("inventorytype"));
            Timestamp expiration = rs.getTimestamp("expiredate");
            Timestamp currenttime = new Timestamp(System.currentTimeMillis());
            if ((type.equals(MapleInventoryType.EQUIP)) || (type.equals(MapleInventoryType.EQUIPPED))) {
                int itemid = rs.getInt("itemid");
                Equip equip = new Equip(itemid, (byte) rs.getInt("position"));
                if (rs.getBoolean("isRing")) {
                    equip = MapleRing.loadFromDb(itemid, (byte) rs.getInt("position"), rs.getInt("uniqueid"));
                    log.info("ring loaded");
                } else {
                    equip.setOwner(rs.getString("owner"));
                    equip.setQuantity((short) rs.getInt("quantity"));
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
                    equip.setFlag((byte) rs.getInt("flag"));
                    equip.setVicious((short) rs.getInt("vicious"));
                    equip.setUniqueId(rs.getInt("uniqueid"));
                    equip.setItemLevel((byte) rs.getInt("itemlevel")); //道具等级
                    equip.setItemExp((int) rs.getInt("itemexp"));//道具经验
                    equip.setxingji((int) rs.getInt("xingji"));//星级
                }
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        equip.setExpiration(expiration);
                        ret.getInventory(type).addFromDB(equip);
                    } else {
                        String name = MapleItemInformationProvider.getInstance().getName(itemid);
                        ret.mapletips.add("现金道具 [" + name + "] 已过期道具被清除了。");
                    }
                } else if (expiration == null && GameConstants.防止修改wz永久物品(itemid)) {
                    String name = MapleItemInformationProvider.getInstance().getName(rs.getInt("itemid"));
                    ret.mapletips.add("非法修改现金道具_A [" + name + "] 已过期道具被清除了。");
                } else {
                    ret.getInventory(type).addFromDB(equip);
                }
            } else {
                Item item = new Item(rs.getInt("itemid"), (byte) rs.getInt("position"), (short) rs.getInt("quantity"));
                item.setOwner(rs.getString("owner"));
                item.setUniqueId(rs.getInt("uniqueid"));
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        item.setExpiration(expiration);
                        ret.getInventory(type).addFromDB(item);
                        if ((rs.getInt("itemid") >= 5000000) && (rs.getInt("itemid") <= 5000100) && (rs.getInt("petslot") > 0)) {
                            int index = rs.getInt("petslot") - 1;
                            MaplePet pet = MaplePet.loadFromDb(item.getItemId(), item.getPosition(), item.getUniqueId());
                            Point pos = ret.getPosition();
                            pos.y -= 12;
                            pet.setPos(pos);
                            pet.setFh(ret.getMap().getFootholds().findBelow(pet.getPos()).getId());
                            pet.setStance(0);
                            int hunger = PetDataFactory.getHunger(pet.getItemId());
                            if (index > ret.getPets().size()) {
                                ret.getPets().add(pet);
                                ret.startFullnessSchedule(hunger, pet, ret.getPetSlot(pet));
                            } else {
                                ret.getPets().add(index, pet);
                                ret.startFullnessSchedule(hunger, pet, ret.getPetSlot(pet));
                            }
                        }
                    } else {
                        String name = MapleItemInformationProvider.getInstance().getName(rs.getInt("itemid"));
                        ret.mapletips.add("现金道具 [" + name + "] 已过期道具被清除了。");
                    }
                } else if (expiration == null && GameConstants.防止修改wz永久物品(item.getItemId())) {
                    String name = MapleItemInformationProvider.getInstance().getName(rs.getInt("itemid"));
                    ret.mapletips.add("非法修改现金道具_B [" + name + "] 已过期道具被清除了。");
                } else {
                    ret.getInventory(type).addFromDB(item);
                }
            }
        }

        rs.close();
        ps.close();

        if (channelserver) {
            ps = con.prepareStatement("SELECT * FROM queststatus WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            PreparedStatement pse = con.prepareStatement("SELECT * FROM queststatusmobs WHERE queststatusid = ?");
            while (rs.next()) {
                MapleQuest q = MapleQuest.getInstance(rs.getInt("quest"));
                MapleQuestStatus status = new MapleQuestStatus(q, MapleQuestStatus.Status.getById(rs.getInt("status")));
                long cTime = rs.getLong("time");
                if (cTime > -1L) {
                    status.setCompletionTime(cTime * 1000L);
                }
                status.setForfeited(rs.getInt("forfeited"));
                ret.quests.put(q, status);
                pse.setInt(1, rs.getInt("queststatusid"));
                ResultSet rsMobs = pse.executeQuery();
                while (rsMobs.next()) {
                    status.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
                }
                rsMobs.close();
            }
            pse.close();
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT skillid,skilllevel,masterlevel FROM skills WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.skills.put(SkillFactory.getSkill(rs.getInt("skillid")), new SkillEntry(rs.getInt("skilllevel"), rs.getInt("masterlevel")));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                int skill1 = rs.getInt("skill1");
                int skill2 = rs.getInt("skill2");
                int skill3 = rs.getInt("skill3");
                String name = rs.getString("name");
                int shout = rs.getInt("shout");
                int position = rs.getInt("position");
                SkillMacro macro = new SkillMacro(skill1, skill2, skill3, name, shout, position);
                ret.skillMacros[position] = macro;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                int key = rs.getInt("key");
                int type = rs.getInt("type");
                int action = rs.getInt("action");
                ret.keymap.put(Integer.valueOf(key), new MapleKeyBinding(type, action));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `locationtype`,`map` FROM savedlocations WHERE characterid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                String locationType = rs.getString("locationtype");
                int mapid = rs.getInt("map");
                ret.savedLocations[SavedLocationType.valueOf(locationType).ordinal()] = mapid;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            ret.lastfametime = 0L;
            ret.lastmonthfameids = new ArrayList(31);
            while (rs.next()) {
                ret.lastfametime = Math.max(ret.lastfametime, rs.getTimestamp("when").getTime());
                ret.lastmonthfameids.add(Integer.valueOf(rs.getInt("characterid_to")));
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT ares_data FROM char_ares_info WHERE charid = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.ares_data.add(rs.getString("ares_data"));
            }
            rs.close();
            ps.close();
            ret.buddylist.loadFromDb(charid);
            ret.storage = MapleStorage.loadOrCreateFromDB(ret.accountid);
        }

        String achsql = "SELECT * FROM achievements WHERE accountid = ?";
        ps = con.prepareStatement(achsql);
        ps.setInt(1, ret.accountid);
        rs = ps.executeQuery();
        while (rs.next()) {
            ret.finishedAchievements.add(Integer.valueOf(rs.getInt("achievementid")));
        }
        rs.close();
        ps.close();
        int mountid = ret.getJobType() * 20000000 + 1004;
        if (ret.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18) != null) {
            ret.maplemount = new MapleMount(ret, ret.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -18).getItemId(), mountid);
            ret.maplemount.setExp(mountexp);
            ret.maplemount.setLevel(mountlevel);
            ret.maplemount.setTiredness(mounttiredness);
            ret.maplemount.setActive(false);
        } else {
            ret.maplemount = new MapleMount(ret, 0, mountid);
            ret.maplemount.setExp(mountexp);
            ret.maplemount.setLevel(mountlevel);
            ret.maplemount.setTiredness(mounttiredness);
            ret.maplemount.setActive(false);
        }
        ret.recalcLocalStats();
        ret.silentEnforceMaxHpMp();
        ISkill ship = SkillFactory.getSkill(5221006);
        ret.battleshipHP = (ret.getSkillLevel(ship) * 4000 + (ret.getLevel() - 120) * 2000);
        ret.loggedInTimer = System.currentTimeMillis();
        return ret;
    }

    public boolean getCygnusBless() {
        SkillEntry ret1 = skills.get(SkillFactory.getSkill(12));
        SkillEntry ret2 = skills.get(SkillFactory.getSkill(10000012));
        SkillEntry ret3 = skills.get(SkillFactory.getSkill(20000012));
        SkillEntry ret4 = skills.get(SkillFactory.getSkill(20010012));
        SkillEntry ret5 = skills.get(SkillFactory.getSkill(30000012));
        int jobid = getJob().getId();
        if (ret1 != null
                || ret2 != null
                || ret3 != null
                || ret4 != null
                || ret5 != null) {
            return true;
        }
        return false;
    }

    public static MapleCharacter getDefault(MapleClient client, int chrid) {
        MapleCharacter ret = getDefault(client);
        ret.id = chrid;
        return ret;
    }
    private String linkedName;

    public String getLinkedName() {
        return linkedName;
    }

    public static MapleCharacter getDefault(MapleClient client) {
        MapleCharacter ret = new MapleCharacter();
        ret.client = client;
        ret.inventory[MapleInventoryType.EQUIP.ordinal()] = new MapleInventory(MapleInventoryType.EQUIP, (byte) 24);
        ret.inventory[MapleInventoryType.USE.ordinal()] = new MapleInventory(MapleInventoryType.USE, (byte) 24);
        ret.inventory[MapleInventoryType.SETUP.ordinal()] = new MapleInventory(MapleInventoryType.SETUP, (byte) 24);
        ret.inventory[MapleInventoryType.ETC.ordinal()] = new MapleInventory(MapleInventoryType.ETC, (byte) 24);
        ret.inventory[MapleInventoryType.CASH.ordinal()] = new MapleInventory(MapleInventoryType.CASH, (byte) 50);
        ret.hp = 50;
        ret.maxhp = 50;
        ret.mp = 50;
        ret.maxmp = 50;
        ret.qiandao = 0;
        ret.qiandao2 = 0;
        ret.modid = 0;
        ret.modsl = 0;
        ret.tuiguang = 0;
        ret.tuiguang2 = 0;
        ret.pvpdeaths = 0;
        ret.pvpkills = 0;
        ret.map = null;
        ret.exp.set(0);
        ret.GMLevel = 0;
        ret.vip = 0;
        ret.cashdd = 0;
        ret.job = MapleJob.BEGINNER;
        ret.meso.set(888);
        ret.level = 1;
        ret.accountid = client.getAccID();
        ret.buddylist = new BuddyList(20);
        ret.bookCover = 0;
        ret.maplemount = null;
        ret.CP = 0;
        ret.totalCP = 0;
        ret.team = -1;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, ret.accountid);
            rs = ps.executeQuery();
            rs = ps.executeQuery();
            while (rs.next()) {
                ret.getClient().setAccountName(rs.getString("name"));
                ret.paypalnx = rs.getInt("paypalNX");
                ret.skillmd5 = rs.getString("skillmd5");
                ret.jinglingskill = rs.getInt("jinglingskill");
                ret.lingqu = rs.getInt("lingqu");
                ret.mPoints = rs.getInt("mPoints");
                ret.cardnx = rs.getInt("cardNX");
                ret.Present = rs.getInt("Present");
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
        ret.incs = false;
        ret.inmts = false;
        ret.APQScore = 0;
        ret.allianceRank = 5;

        ret.keymap.put(Integer.valueOf(2), new MapleKeyBinding(4, 10));
        ret.keymap.put(Integer.valueOf(3), new MapleKeyBinding(4, 12));
        ret.keymap.put(Integer.valueOf(4), new MapleKeyBinding(4, 13));
        ret.keymap.put(Integer.valueOf(5), new MapleKeyBinding(4, 18));
        ret.keymap.put(Integer.valueOf(6), new MapleKeyBinding(4, 24));
        ret.keymap.put(Integer.valueOf(7), new MapleKeyBinding(4, 21));
        ret.keymap.put(Integer.valueOf(16), new MapleKeyBinding(4, 8));
        ret.keymap.put(Integer.valueOf(17), new MapleKeyBinding(4, 5));
        ret.keymap.put(Integer.valueOf(18), new MapleKeyBinding(4, 0));
        ret.keymap.put(Integer.valueOf(19), new MapleKeyBinding(4, 4));
        ret.keymap.put(Integer.valueOf(23), new MapleKeyBinding(4, 1));
        ret.keymap.put(Integer.valueOf(25), new MapleKeyBinding(4, 19));
        ret.keymap.put(Integer.valueOf(26), new MapleKeyBinding(4, 14));
        ret.keymap.put(Integer.valueOf(27), new MapleKeyBinding(4, 15));
        ret.keymap.put(Integer.valueOf(29), new MapleKeyBinding(5, 52));
        ret.keymap.put(Integer.valueOf(31), new MapleKeyBinding(4, 2));
        ret.keymap.put(Integer.valueOf(34), new MapleKeyBinding(4, 17));
        ret.keymap.put(Integer.valueOf(35), new MapleKeyBinding(4, 11));
        ret.keymap.put(Integer.valueOf(37), new MapleKeyBinding(4, 3));
        ret.keymap.put(Integer.valueOf(38), new MapleKeyBinding(4, 20));
        ret.keymap.put(Integer.valueOf(40), new MapleKeyBinding(4, 16));
        ret.keymap.put(Integer.valueOf(41), new MapleKeyBinding(4, 23));
        ret.keymap.put(Integer.valueOf(43), new MapleKeyBinding(4, 9));
        ret.keymap.put(Integer.valueOf(44), new MapleKeyBinding(5, 50));
        ret.keymap.put(Integer.valueOf(45), new MapleKeyBinding(5, 51));
        ret.keymap.put(Integer.valueOf(46), new MapleKeyBinding(4, 6));
        ret.keymap.put(Integer.valueOf(48), new MapleKeyBinding(4, 22));
        ret.keymap.put(Integer.valueOf(50), new MapleKeyBinding(4, 7));
        ret.keymap.put(Integer.valueOf(56), new MapleKeyBinding(5, 53));
        ret.keymap.put(Integer.valueOf(57), new MapleKeyBinding(5, 54));
        ret.keymap.put(Integer.valueOf(59), new MapleKeyBinding(6, 100));
        ret.keymap.put(Integer.valueOf(60), new MapleKeyBinding(6, 101));
        ret.keymap.put(Integer.valueOf(61), new MapleKeyBinding(6, 102));
        ret.keymap.put(Integer.valueOf(62), new MapleKeyBinding(6, 103));
        ret.keymap.put(Integer.valueOf(63), new MapleKeyBinding(6, 104));
        ret.keymap.put(Integer.valueOf(64), new MapleKeyBinding(6, 105));
        ret.keymap.put(Integer.valueOf(65), new MapleKeyBinding(6, 106));

        ret.recalcLocalStats();

        return ret;
    }

    public void saveToDB(boolean update) {
        Connection con = DatabaseConnection.getConnection();
        try {
            con.setTransactionIsolation(1);
            con.setAutoCommit(false);
            PreparedStatement ps;
            if (update) {
                ps = con.prepareStatement("UPDATE characters SET level = ?, fame = ?, str = ?, dex = ?, luk = ?, `int` = ?, exp = ?, hp = ?, mp = ?, maxhp = ?, maxmp = ?, sp = ?, ap = ?, gm = ?, skincolor = ?, gender = ?, job = ?, hair = ?, face = ?, map = ?, meso = ?, hpApUsed = ?, mpApUsed = ?, spawnpoint = ?, party = ?, buddyCapacity = ?, autoHpPot = ?, autoMpPot = ?, messengerid = ?, messengerposition = ?, married = ?, partnerid = ?, cantalk = ?, zakumlvl = ?, marriagequest = ?, bosspoints = ?, bossrepeats = ?, nextBQ = ?, playerNPC = ?, alliancerank = ?, muted = ?, unmutetime = ?, equipSlots = ?, useSlots = ?, setupSlots = ?, etcSlots = ?, cashSlots = ?, monsterbookcover = ?, mountlevel = ?, mountexp = ?, mounttiredness = ?, dojoPoints = ?, lastDojoStage = ?, finishedDojoTutorial = ?, vanquisherStage = ?, vanquisherKills = ?, vip = ?, reborns = ?, Warning = ?, cashdd = ?, matchcardwins = ?, matchcardlosses = ?, matchcardties = ?, omokwins = ?, omoklosses = ?, omokties = ?, xyxjf = ?, qiandao = ? ,qiandao2 = ?, pvpkills = ?, pvpdeaths = ?, xflh = ?, tuiguang = ?, tuiguang2 = ?,modid = ?, modsl = ?, jf = ? WHERE id = ?", Statement.RETURN_GENERATED_KEYS);
            } else {
                ps = con.prepareStatement("INSERT INTO characters (level, fame, str, dex, luk, `int`, exp, hp, mp, maxhp, maxmp, sp, ap, gm, skincolor, gender, job, hair, face, map, meso, hpApUsed, mpApUsed, spawnpoint, party, buddyCapacity, autoHpPot, autoMpPot, messengerid, messengerposition, married, partnerid, cantalk, zakumlvl, marriagequest, bosspoints, bossrepeats, nextBQ, playerNPC, alliancerank, muted, unmutetime, equipSlots, useSlots, setupSlots, etcSlots, cashSlots, monsterbookcover, mountlevel, mountexp, mounttiredness, dojopoints, lastDojoStage, finishedDojoTutorial, vanquisherStage, vanquisherKills, vip,reborns, Warning, matchcardwins, matchcardlosses, matchcardties, omokwins, omoklosses, omokties, xyxjf,qiandao, qiandao2, cashdd, pvpkills, pvpdeaths, xflh, tuiguang, tuiguang2, modid, modsl, jf, accountid, name, world) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            }
            ps.setInt(1, this.level);
            ps.setInt(2, this.fame);
            ps.setInt(3, this.str);
            ps.setInt(4, this.dex);
            ps.setInt(5, this.luk);
            ps.setInt(6, this.int_);
            ps.setInt(7, this.exp.get());
            ps.setInt(8, this.hp);
            ps.setInt(9, this.mp);
            ps.setInt(10, this.maxhp);
            ps.setInt(11, this.maxmp);
            ps.setInt(12, this.remainingSp);
            ps.setInt(13, this.remainingAp);
            ps.setInt(14, this.GMLevel);
            ps.setInt(15, this.skinColor.getId());
            ps.setInt(16, this.gender);
            ps.setInt(17, this.job.getId());
            ps.setInt(18, this.hair);
            ps.setInt(19, this.face);
            if (this.map == null) {
                if ((!update) && (this.job.getId() == 1000)) {
                    ps.setInt(20, 130030000);
                } else if ((!update) && (this.job.getId() == 2000)) {
                    ps.setInt(20, 914000000);
                } else {
                    ps.setInt(20, 0);
                }

            } else if (this.map.getForcedReturnId() != 999999999) {
                ps.setInt(20, this.map.getForcedReturnId());
            } else {
                ps.setInt(20, this.map.getId());
            }

            ps.setInt(21, this.meso.get());
            ps.setInt(22, this.hpApUsed);
            ps.setInt(23, this.mpApUsed);
            if ((this.map == null) || (this.map.getId() == 610020000) || (this.map.getId() == 610020001)) {
                ps.setInt(24, 0);
            } else {
                MaplePortal closest = this.map.findClosestSpawnpoint(getPosition());
                if (closest != null) {
                    ps.setInt(24, closest.getId());
                } else {
                    ps.setInt(24, 0);
                }
            }
            if (this.party != null) {
                ps.setInt(25, this.party.getId());
            } else {
                ps.setInt(25, 0);
            }
            ps.setInt(26, this.buddylist.getCapacity());
            if ((this.autoHpPot != 0) && (getItemAmount(this.autoHpPot) >= 1)) {
                ps.setInt(27, this.autoHpPot);
            } else {
                ps.setInt(27, 0);
            }
            if ((this.autoMpPot != 0) && (getItemAmount(this.autoMpPot) >= 1)) {
                ps.setInt(28, this.autoMpPot);
            } else {
                ps.setInt(28, 0);
            }
            if (this.messenger != null) {
                ps.setInt(29, this.messenger.getId());
                ps.setInt(30, this.messengerposition);
            } else {
                ps.setInt(29, 0);
                ps.setInt(30, 4);
            }

            ps.setInt(31, this.married);
            ps.setInt(32, this.partnerid);
            ps.setInt(33, this.canTalk);
            if (this.zakumLvl <= 2) {
                ps.setInt(34, this.zakumLvl);
            } else {
                ps.setInt(34, 2);
            }
            ps.setInt(35, this.marriageQuestLevel);
            ps.setInt(36, this.bossPoints);
            ps.setInt(37, this.bossRepeats);
            ps.setLong(38, this.nextBQ);
            ps.setInt(39, this.playerNPC ? 1 : 0);
            ps.setInt(40, this.allianceRank);
            ps.setInt(41, this.muted ? 1 : 0);
            ps.setLong(42, this.unmuteTime == null ? 0L : this.unmuteTime.getTimeInMillis());
            ps.setInt(43, getInventory(MapleInventoryType.EQUIP).getSlots());
            ps.setInt(44, getInventory(MapleInventoryType.USE).getSlots());
            ps.setInt(45, getInventory(MapleInventoryType.SETUP).getSlots());
            ps.setInt(46, getInventory(MapleInventoryType.ETC).getSlots());
            ps.setInt(47, getInventory(MapleInventoryType.CASH).getSlots());
            ps.setInt(48, this.bookCover);
            if (this.maplemount != null) {
                ps.setInt(49, this.maplemount.getLevel());
                ps.setInt(50, this.maplemount.getExp());
                ps.setInt(51, this.maplemount.getTiredness());
            } else {
                ps.setInt(49, 1);
                ps.setInt(50, 0);
                ps.setInt(51, 0);
            }
            ps.setInt(52, this.dojoPoints);
            ps.setInt(53, this.lastDojoStage);
            ps.setInt(54, this.finishedDojoTutorial ? 1 : 0);
            ps.setInt(55, this.vanquisherStage);
            ps.setInt(56, this.vanquisherKills);
            ps.setInt(57, this.vip);
            ps.setInt(58, this.Reborns);
            ps.setInt(59, this.Warning);
            ps.setLong(60, this.cashdd);
            ps.setInt(61, matchcardwins);
            ps.setInt(62, matchcardlosses);
            ps.setInt(63, matchcardties);
            ps.setInt(64, omokwins);
            ps.setInt(65, omoklosses);
            ps.setInt(66, omokties);
            ps.setInt(67, xyxjf);
            ps.setInt(68, qiandao);
            ps.setInt(69, qiandao2);
            ps.setInt(70, pvpkills);
            ps.setInt(71, pvpdeaths);
            ps.setInt(72, xflh);
            ps.setInt(73, tuiguang);
            ps.setInt(74, tuiguang2);
            ps.setInt(75, modid);
            ps.setInt(76, modsl);
            ps.setInt(77, jf);
            if (update) {
                ps.setInt(78, this.id);
            } else {
                ps.setInt(78, this.accountid);
                ps.setString(79, this.name);
                ps.setInt(80, this.world);
            }
            int updateRows = ps.executeUpdate();
            if (!update) {
                ResultSet rs = ps.getGeneratedKeys();
                if (rs.next()) {
                    this.id = rs.getInt(1);
                } else {
                    throw new DatabaseException("Inserting char failed.");
                }
            } else if (updateRows < 1) {
                throw new DatabaseException("Character not in database (" + this.id + ")");
            }
            ps.close();

            for (MaplePet pettt : this.pets) {
                pettt.saveToDb();
            }

            ps = con.prepareStatement("DELETE FROM skillmacros WHERE characterid = ?");
            ps.setInt(1, this.id);
            ps.executeUpdate();
            ps.close();

            for (int i = 0; i < 5; i++) {
                SkillMacro macro = this.skillMacros[i];
                if (macro != null) {
                    ps = con.prepareStatement("INSERT INTO skillmacros (characterid, skill1, skill2, skill3, name, shout, position) VALUES (?, ?, ?, ?, ?, ?, ?)");

                    ps.setInt(1, this.id);
                    ps.setInt(2, macro.getSkill1());
                    ps.setInt(3, macro.getSkill2());
                    ps.setInt(4, macro.getSkill3());
                    ps.setString(5, macro.getName());
                    ps.setInt(6, macro.getShout());
                    ps.setInt(7, i);

                    ps.executeUpdate();
                    ps.close();
                }
            }
            if (this.csinventory != null) {
                getCSInventory().saveToDB();
            }

            ps = con.prepareStatement("DELETE FROM inventoryitems WHERE characterid = ?");
            ps.setInt(1, this.id);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("INSERT INTO inventoryitems (characterid, itemid, inventorytype, position, quantity, owner, expiredate, uniqueid, petslot, flag, itemexp, itemlevel,xingji) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            PreparedStatement pse = con.prepareStatement("INSERT INTO inventoryequipment VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            for (MapleInventory iv : this.inventory) {
                ps.setInt(3, iv.getType().getType());
                for (IItem item : iv.list()) {
                    ps.setInt(1, this.id);
                    ps.setInt(2, item.getItemId());//id
                    ps.setInt(4, item.getPosition());//位置
                    ps.setInt(5, item.getQuantity());//数量
                    ps.setString(6, item.getOwner());//玩家名字
                    if (item.getExpiration() != null) {//时间
                        ps.setTimestamp(7, item.getExpiration());
                    } else {
                        ps.setTimestamp(7, null);
                    }
                    ps.setInt(8, item.getUniqueId()); //现金物品
                    if (getPetByUniqueId(item.getUniqueId()) > -1) {
                        ps.setInt(9, getPetByUniqueId(item.getUniqueId()) + 1);
                    } else {
                        ps.setInt(9, 0);
                    }
                    ps.setInt(10, item.getFlag()); //交易
                    ps.setInt(11, item.getItemLevel());//
                    ps.setInt(12, item.getItemExp());
                    ps.setInt(13, item.getxingji());                                       
                    ps.executeUpdate();
                    ResultSet rs = ps.getGeneratedKeys();
                    long itemid;
                    if (rs.next()) {
                        itemid = rs.getLong(1);
                    } else {
                        throw new DatabaseException("Inserting char failed.");
                    }
                    if ((iv.getType().equals(MapleInventoryType.EQUIP)) || (iv.getType().equals(MapleInventoryType.EQUIPPED))) {
                        pse.setLong(1, itemid);
                        IEquip equip = (IEquip) item;
                        pse.setInt(2, equip.getUpgradeSlots());
                        pse.setInt(3, equip.getLevel());
                        pse.setInt(4, equip.getStr());
                        pse.setInt(5, equip.getDex());
                        pse.setInt(6, equip.getInt());
                        pse.setInt(7, equip.getLuk());
                        pse.setInt(8, equip.getHp());
                        pse.setInt(9, equip.getMp());
                        pse.setInt(10, equip.getWatk());
                        pse.setInt(11, equip.getMatk());
                        pse.setInt(12, equip.getWdef());
                        pse.setInt(13, equip.getMdef());
                        pse.setInt(14, equip.getAcc());
                        pse.setInt(15, equip.getAvoid());
                        pse.setInt(16, equip.getHands());
                        pse.setInt(17, equip.getSpeed());
                        pse.setInt(18, equip.getJump());
                        pse.setInt(19, equip.getLocked());
                        pse.setBoolean(20, equip.isRing());
                        pse.setInt(21, equip.getVicious());
                        // pse.setInt(25, equip.getItemSkill());//道具技能
                        pse.executeUpdate();
                        //////System.out.println("加载数据道具经验 || :"+equip.getItemExp()+"||加载道具等级"+equip.getItemLevel()+"");
                    }
                }
            }
            ps.close();
            pse.close();

            deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`) VALUES (DEFAULT, ?, ?, ?, ?, ?)", 1);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, this.id);
            for (MapleQuestStatus q : this.quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus().getId());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000L));
                ps.setInt(5, q.getForfeited());
                ps.executeUpdate();
                ResultSet rs = ps.getGeneratedKeys();
                rs.next();
                for (Iterator i$ = q.getMobKills().keySet().iterator(); i$.hasNext();) {
                    int mob = ((Integer) i$.next()).intValue();
                    pse.setInt(1, rs.getInt(1));
                    pse.setInt(2, mob);
                    pse.setInt(3, q.getMobKills(mob));
                    pse.executeUpdate();
                }
                rs.close();
            }
            ps.close();
            pse.close();

            deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel) VALUES (?, ?, ?, ?)");
            ps.setInt(1, this.id);
            for (Map.Entry skill : this.skills.entrySet()) {
                ps.setInt(2, ((ISkill) skill.getKey()).getId());
                ps.setInt(3, ((SkillEntry) skill.getValue()).skillevel);
                ps.setInt(4, ((SkillEntry) skill.getValue()).masterlevel);
                ps.executeUpdate();
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM keymap WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO keymap (characterid, `key`, `type`, `action`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, this.id);
            for (Map.Entry keybinding : this.keymap.entrySet()) {
                ps.setInt(2, ((Integer) keybinding.getKey()).intValue());
                ps.setInt(3, ((MapleKeyBinding) keybinding.getValue()).getType());
                ps.setInt(4, ((MapleKeyBinding) keybinding.getValue()).getAction());
                ps.executeUpdate();
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM savedlocations WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO savedlocations (characterid, `locationtype`, `map`) VALUES (?, ?, ?)");
            ps.setInt(1, this.id);
            for (SavedLocationType savedLocationType : SavedLocationType.values()) {
                if (this.savedLocations[savedLocationType.ordinal()] != -1) {
                    ps.setString(2, savedLocationType.name());
                    ps.setInt(3, this.savedLocations[savedLocationType.ordinal()]);
                    ps.executeUpdate();
                }
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ? AND pending = 0");
            ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `group`, `pending`) VALUES (?, ?, ?, 0)");
            ps.setInt(1, this.id);
            for (BuddylistEntry entry : this.buddylist.getBuddies()) {
                if (entry.isVisible()) {
                    ps.setInt(2, entry.getCharacterId());
                    ps.setString(3, entry.getGroup());
                    ps.executeUpdate();
                }
            }
            ps.close();
            ps = con.prepareStatement("UPDATE accounts SET `paypalNX` = ?, `mPoints` = ?, `cardNX` = ?, `Present` = ?,jinglingskill = ?,lingqu = ?  WHERE id = ?");
            ps.setInt(1, this.paypalnx);
            ps.setInt(2, this.mPoints);
            ps.setInt(3, this.cardnx);
            ps.setInt(4, this.Present);
            ps.setInt(5, this.jinglingskill);
            ps.setInt(6, this.lingqu);
            ps.setInt(7, this.client.getAccID());
            ps.executeUpdate();
            ps.close();

            if (storage != null) {
                storage.saveToDB();
            }

            if (update) {
                ps = con.prepareStatement("DELETE FROM achievements WHERE accountid = ?");
                ps.setInt(1, this.accountid);
                ps.executeUpdate();
                ps.close();

                for (Integer achid : this.finishedAchievements) {
                    ps = con.prepareStatement("INSERT INTO achievements(charid, achievementid, accountid) VALUES(?, ?, ?)");
                    ps.setInt(1, this.id);
                    ps.setInt(2, achid.intValue());
                    ps.setInt(3, this.accountid);
                    ps.executeUpdate();
                    ps.close();
                }
            }

            con.commit();
        } catch (Exception e) {
            log.error(MapleClient.getLogMessage(this, "[charsave] Error saving character data"), e);
            try {
                con.rollback();
            } catch (SQLException e1) {
                log.error(MapleClient.getLogMessage(this, "[charsave] Error Rolling Back"), e);
            }
        } finally {
            try {
                con.setAutoCommit(true);
                con.setTransactionIsolation(4);
            } catch (SQLException e) {
                log.error(MapleClient.getLogMessage(this, "[charsave] Error going back to autocommit mode"), e);
            }
        }

    }

    public int getDY() {
        return mPoints;
    }

    public void setDY(int set) {
        this.mPoints = set;
    }

    public void gainDY(int gain) {
        setDY(getDY() + gain);
    }

    public IItem lockitem(int slot, boolean lock) {
        byte set = 0;
        byte eqslot = (byte) slot;
        Equip nEquip = (Equip) getInventory(MapleInventoryType.EQUIP).getItem(eqslot);
        if (nEquip != null) {
            if (lock) {
                set = 1;
                dropMessage("[系统信息] 物品位置 " + slot + " 锁定成功");
            } else {
                dropMessage("[系统信息] 物品位置 " + slot + " 解除锁定成功");
            }
            nEquip.setLocked(set);
            getClient().getSession().write(MaplePacketCreator.getCharInfo(this));
            getMap().removePlayer(this);
            getMap().addPlayer(this);
        } else {
            dropMessage("[系统信息] 物品位置 " + slot + " 装备为空.");
        }
        return nEquip;
    }

    public void increaseEquipExp(int mobexp) { //道具经验
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        for (IItem item : getInventory(MapleInventoryType.EQUIPPED).list()) {
            Equip nEquip = (Equip) item;
            String itemName = mii.getName(nEquip.getItemId());
            if (itemName == null) {
                continue;
            }
            if (itemName.contains("永恒") && nEquip.getItemLevel() < 6) {
                nEquip.gainItemExp(client, mobexp, itemName.contains("永恒"));
            }
            if(itemName.contains("重生") && nEquip.getItemLevel() < 4){
                nEquip.gainItemExp(client, mobexp, itemName.contains("重生"));
            }
        }
    }

    private void deleteWhereCharacterId(Connection con, String sql) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, this.id);
        ps.executeUpdate();

        ps.close();
    }

    public MapleQuestStatus getQuest(MapleQuest quest) {
        if (!this.quests.containsKey(quest)) {
            return new MapleQuestStatus(quest, MapleQuestStatus.Status.NOT_STARTED);
        }
        return (MapleQuestStatus) this.quests.get(quest);
    }

    /*
     * public void updateQuest(MapleQuestStatus quest) { //更新任务
     * this.quests.put(quest.getQuest(), quest);
     * System.out.println("updateQuest"); if ((quest.getQuest().getId() == 4760)
     * || (quest.getQuest().getId() == 4761) || (quest.getQuest().getId() ==
     * 4762) || (quest.getQuest().getId() == 4763) || (quest.getQuest().getId()
     * == 4764) || (quest.getQuest().getId() == 4765) ||
     * (quest.getQuest().getId() == 4766) || (quest.getQuest().getId() == 4767)
     * || (quest.getQuest().getId() == 4768) || (quest.getQuest().getId() ==
     * 4769) || (quest.getQuest().getId() == 4770) || (quest.getQuest().getId()
     * == 4771)) {
     * this.client.getSession().write(MaplePacketCreator.completeQuest(this,
     * (short) quest.getQuest().getId()));
     * this.client.getSession().write(MaplePacketCreator.updateQuestInfo(this,
     * (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8)); } else if
     * (!(quest.getQuest() instanceof MapleCustomQuest)) {
     * System.out.println("else if"); if
     * (quest.getStatus().equals(MapleQuestStatus.Status.STARTED)) {
     * this.client.getSession().write(MaplePacketCreator.startQuest(this,
     * (short) quest.getQuest().getId())); //开始任务 System.out.println("输出A");
     * this.client.getSession().write(MaplePacketCreator.updateQuestInfo(this,
     * (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8)); //任务更新 }
     * else if (quest.getStatus().equals(MapleQuestStatus.Status.COMPLETED)) {
     * this.client.getSession().write(MaplePacketCreator.completeQuest(this,
     * (short) quest.getQuest().getId())); } else if
     * (quest.getStatus().equals(MapleQuestStatus.Status.NOT_STARTED)) {
     * this.client.getSession().write(MaplePacketCreator.forfeitQuest(this,
     * (short) quest.getQuest().getId())); } }else if ((quest.getQuest()
     * instanceof MapleCustomQuest)) { System.out.println("else if2"); if
     * (quest.getStatus().equals(MapleQuestStatus.Status.STARTED)) {
     * this.client.getSession().write(MaplePacketCreator.startQuest(this,
     * (short) quest.getQuest().getId())); //开始任务 System.out.println("输出B");
     * this.client.getSession().write(MaplePacketCreator.updateQuestInfo(this,
     * (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8)); //任务更新 }
     * else if (quest.getStatus().equals(MapleQuestStatus.Status.COMPLETED)) {
     * this.client.getSession().write(MaplePacketCreator.completeQuest(this,
     * (short) quest.getQuest().getId())); } else if
     * (quest.getStatus().equals(MapleQuestStatus.Status.NOT_STARTED)) {
     * this.client.getSession().write(MaplePacketCreator.forfeitQuest(this,
     * (short) quest.getQuest().getId())); } }
     }
     */
    public void updateQuest(MapleQuestStatus quest) {
        this.quests.put(quest.getQuest(), quest);
        /*
         * if ((quest.getQuest().getId() == 4760) || (quest.getQuest().getId()
         * == 4761) || (quest.getQuest().getId() == 4762) ||
         * (quest.getQuest().getId() == 4763) || (quest.getQuest().getId() ==
         * 4764) || (quest.getQuest().getId() == 4765) ||
         * (quest.getQuest().getId() == 4766) || (quest.getQuest().getId() ==
         * 4767) || (quest.getQuest().getId() == 4768) ||
         * (quest.getQuest().getId() == 4769) || (quest.getQuest().getId() ==
         * 4770) || (quest.getQuest().getId() == 4771)) {
         * this.client.getSession().write(MaplePacketCreator.completeQuest(this,
         * (short) quest.getQuest().getId()));
         * this.client.getSession().write(MaplePacketCreator.updateQuestInfo(this,
         * (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8)); } else
         */ if (!(quest.getQuest() instanceof MapleCustomQuest)) {
            if (quest.getStatus().equals(MapleQuestStatus.Status.STARTED)) {//开始任务
                this.client.getSession().write(MaplePacketCreator.startQuest(this, (short) quest.getQuest().getId()));
                this.client.getSession().write(MaplePacketCreator.updateQuestInfo(this, (short) quest.getQuest().getId(), quest.getNpc(), (byte) 8));
            } else if (quest.getStatus().equals(MapleQuestStatus.Status.COMPLETED)) {//完成任务
                this.client.getSession().write(MaplePacketCreator.completeQuest(this, (short) quest.getQuest().getId()));
            } else if (quest.getStatus().equals(MapleQuestStatus.Status.NOT_STARTED)) { //放弃任务
                this.client.getSession().write(MaplePacketCreator.forfeitQuest(this, (short) quest.getQuest().getId()));
            }
        }
    }

    public static int getIdByName(String name, int world) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = con.prepareStatement("SELECT id FROM characters WHERE name = ? AND world = ?");
            ps.setString(1, name);
            ps.setInt(2, world);
            rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                int i = -1;
                i = i;
                return i;
            }
            int id = rs.getInt("id");
            rs.close();
            ps.close();

            int i = id;
            return i;
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
        return -1;
    }

    public boolean isActiveBuffedValue(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if ((mbsvh.effect.isSkill()) && (mbsvh.effect.getSourceId() == skillid) && (!isGM())) {
                return true;
            }
        }
        return false;
    }

    public Integer getBuffedValue(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return Integer.valueOf(mbsvh.value);
    }

    public Pair<Double, Boolean> modifyDamageTaken(double damage, MapleMapObject attacke) {
        Pair<Double, Boolean> ret = new Pair<Double, Boolean>(damage, false);
        if (damage > 0) {
            ////////System.out.println("第一个输出。伤害为 " + damage + "");
            return ret;
        }
        MapleStatEffect barrier = getStatForBuff(MapleBuffStat.战神之盾);

        if (barrier != null) {//SkillFactory.getSkill(21120007)
            ISkill 战神之盾 = SkillFactory.getSkill(21120007);
            damage = ((战神之盾.getEffect(getSkillLevel(21120007)).getX() / 1000.0) * damage);
            ////////System.out.println("战神之盾输出.伤害为 " + damage + "");
            return ret;
        }
        return null;
    }

    public boolean isBuffFrom(MapleBuffStat stat, ISkill skill) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(stat);
        if (mbsvh == null) {
            return false;
        }
        return (mbsvh.effect.isSkill()) && (mbsvh.effect.getSourceId() == skill.getId());
    }

    public int getBuffSource(MapleBuffStat stat) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(stat);
        if (mbsvh == null) {
            return -1;
        }

        return mbsvh.effect.getSourceId();
    }

    public ArrayList<MapleStatEffect> getBuffEffects() {
        ArrayList almseret = new ArrayList();
        HashSet hs = new HashSet();
        for (MapleBuffStatValueHolder mbsvh : this.effects.values()) {
            if ((mbsvh != null) && (mbsvh.effect != null)) {
                Integer nid = Integer.valueOf(mbsvh.effect.isSkill() ? mbsvh.effect.getSourceId() : -mbsvh.effect.getSourceId());
                if (!hs.contains(nid)) {
                    almseret.add(mbsvh.effect);
                    hs.add(nid);
                }
            }
        }
        return almseret;
    }

    public int getItemQuantity(int itemid, boolean checkEquipped) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = this.inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        if (checkEquipped) {
            possesed += this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }

        return possesed;
    }

    public void setBuffedValue(MapleBuffStat effect, int value) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(effect);
        if (mbsvh == null) {
            return;
        }
        mbsvh.value = value;
    }

    public Long getBuffedStarttime(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return Long.valueOf(mbsvh.startTime);
    }

    public MapleStatEffect getStatForBuff(MapleBuffStat effect) {
        MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        return mbsvh.effect;
    }

    private void prepareDragonBlood(final MapleStatEffect bloodEffect) {
        if (dragonBloodSchedule != null) {
            dragonBloodSchedule.cancel(false);
        }

        dragonBloodSchedule = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
                if(getHp() > 100){
                addHP(-bloodEffect.getX());
                }
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(bloodEffect.getSourceId(), 5));
                getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), bloodEffect.getSourceId(), 5, (byte) 3), false);
                checkBerserk();
            }
        }, 4000, 4000);
    }

    public void startFullnessSchedule(final int decrease, final MaplePet pet, int petSlot) {
        ScheduledFuture<?> schedule = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
                int newFullness = pet.getFullness() - decrease;
                if (newFullness <= 20) {
                    pet.setFullness(100);
                }
                if (newFullness <= 5) {
                    pet.setFullness(15);
                    unequipPet(pet, true, true);
                } else {
                    pet.setFullness(newFullness);
                    getClient().getSession().write(MaplePacketCreator.updatePet(pet, getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), true));
                }
            }
        }, 300000, 300000);//宠物饥饿
        //}, 3000, 3000);//宠物饥饿
        switch (petSlot) {
            case 0:
                fullnessSchedule = schedule;
            case 1:
                fullnessSchedule_1 = schedule;
            case 2:
                fullnessSchedule_2 = schedule;
        }
    }

    public void cancelFullnessSchedule(int petSlot) {
        switch (petSlot) {
            case 0:
                this.fullnessSchedule.cancel(false);
            case 1:
                this.fullnessSchedule_1.cancel(false);
            case 2:
                this.fullnessSchedule_2.cancel(false);
        }
    }

    public MaplePet getPet(int index) {
        if ((this.pets.size() > 0) && (this.pets.size() > index)) {
            return (MaplePet) this.pets.get(index);
        }

        return null;
    }

    public void addPet(MaplePet pet, boolean lead) {
        if (this.pets.size() < 3) {
            if (lead) {
                List newpets = new ArrayList();
                newpets.add(pet);
                for (MaplePet oldpet : this.pets) {
                    newpets.add(oldpet);
                }
                this.pets = newpets;
                this.fullnessSchedule_2 = this.fullnessSchedule_1;
                this.fullnessSchedule_1 = this.fullnessSchedule;
            } else {
                this.pets.add(pet);
            }
        }
    }

    public void removePet(MaplePet pet, boolean shift_left) {
        int petslot = getPetSlot(pet);
        if (petslot < 0) {
            return;
        }
        this.pets.remove(petslot);
        getClient().getSession().write(MaplePacketCreator.petStatUpdate(this));
    }

    public int getNoPets() {
        return this.pets.size();
    }

    public int getPetSlot(MaplePet pet) {
        if (this.pets.size() > 0) {
            for (int i = 0; i < this.pets.size(); i++) {
                if ((this.pets.get(i) != null) && (((MaplePet) this.pets.get(i)).getUniqueId() == pet.getUniqueId())) {
                    return i;
                }
            }
        }

        return -1;
    }

    public int getPetByUniqueId(int uniqueid) {
        for (int i = 0; i < this.pets.size(); i++) {
            if ((this.pets.get(i) != null) && (((MaplePet) this.pets.get(i)).getUniqueId() == uniqueid)) {
                return i;
            }
        }

        return -1;
    }

    public List<MaplePet> getPets() {
        return this.pets;
    }

    public void unequipAllPets() {
        for (MaplePet pett : this.pets) {
            unequipPet(pett, true);
        }
    }

    public void unequipPet(MaplePet pet, boolean shift_left) {
        unequipPet(pet, shift_left, false);
    }

    public void unequipPet(MaplePet pet, boolean shiftLeft, boolean hunger) {
        pet.saveToDb();
        cancelFullnessSchedule(getPetSlot(pet));
        getClient().getSession().write(MaplePacketCreator.updatePet(pet, getInventory(MapleInventoryType.CASH).getItem((byte) pet.getInventoryPosition()), false));
        if (map != null) {
            getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pet, true, hunger), true);
        }
        removePet(pet, shiftLeft);
        getClient().getSession().write(MaplePacketCreator.petStatUpdate(this));
        getClient().getSession().write(MaplePacketCreator.enableActions());
    }

    public void startMapEffect(String msg, int itemId) {
        startMapEffect(msg, itemId, 30000);
    }

    public void startMapEffect(String msg, int itemId, int duration) {
        final MapleMapEffect mapEffect = new MapleMapEffect(msg, itemId);
        getClient().getSession().write(mapEffect.makeStartData());
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                getClient().getSession().write(mapEffect.makeDestroyData());
            }
        }, duration);
    }

    public void startMapTimeLimitTask(final MapleMap from, final MapleMap to) {
        if (to.getTimeLimit() > 0 && from != null) {
            final MapleCharacter chr = this;
            mapTimeLimitTask = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    MaplePortal pfrom = null;
                    if (MapleItemInformationProvider.getInstance().isMiniDungeonMap(from.getId())) {
                        pfrom = from.getPortal("MD00");
                    } else {
                        pfrom = from.getPortal(0);
                    }
                    if (pfrom != null) {
                        chr.changeMap(from, pfrom);
                    }
                }
            }, from.getTimeLimit() * 1000, from.getTimeLimit() * 1000);
        }
    }

    public void cancelMapTimeLimitTask() {
        if (this.mapTimeLimitTask != null) {
            this.mapTimeLimitTask.cancel(false);
        }
    }

    public void registerEffect(MapleStatEffect effect, long starttime, ScheduledFuture<?> schedule) {
        if (effect.isHide()) {
            this.hidden = true;
            getMap().broadcastMessage(this, MaplePacketCreator.removePlayerFromMap(getId()), false);
            ////System.out.println("-1-");
        } else if (effect.isDragonBlood()) {
            prepareDragonBlood(effect);
            ////System.out.println("-2-");
        } else if (effect.isBerserk()) {
            checkBerserk();
            ////System.out.println("-3-");
        } else if (effect.isBeholder()) {
            prepareBeholderEffect();
            ////System.out.println("-4-");
        }
        for (Pair<MapleBuffStat, Integer> statup : effect.getStatups()) {
            this.effects.put(statup.getLeft(), new MapleBuffStatValueHolder(effect, starttime, schedule, ((Integer) statup.getRight()).intValue()));
        }
        recalcLocalStats();
    }

    public void removeAllCooldownsExcept(int id) {
        for (MapleCoolDownValueHolder mcvh : this.coolDowns.values()) {
            if (mcvh.skillId != id) {
                this.coolDowns.remove(Integer.valueOf(mcvh.skillId));
            }
        }
    }

    private List<MapleBuffStat> getBuffStats(MapleStatEffect effect, long startTime) {
        List stats = new ArrayList();
        try {
            for (Map.Entry stateffect : this.effects.entrySet()) {
                MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) stateffect.getValue();
                if ((mbsvh.effect.sameSource(effect)) && ((startTime == -1L) || (startTime == mbsvh.startTime))) {
                    stats.add(stateffect.getKey());
                }
            }
        } catch (ConcurrentModificationException e) {
        }
        return stats;
    }

    private void deregisterBuffStats(List<MapleBuffStat> stats) {
        List<MapleBuffStatValueHolder> effectsToCancel = new ArrayList(stats.size());
        for (MapleBuffStat stat : stats) {
            MapleBuffStatValueHolder mbsvh = (MapleBuffStatValueHolder) this.effects.get(stat);
            if (mbsvh != null) {
                this.effects.remove(stat);
                boolean addMbsvh = true;
                for (MapleBuffStatValueHolder contained : effectsToCancel) {
                    if ((mbsvh.startTime == contained.startTime) && (contained.effect == mbsvh.effect)) {
                        addMbsvh = false;
                    }
                }
                if (addMbsvh) {
                    effectsToCancel.add(mbsvh);
                }
                if ((stat == MapleBuffStat.SUMMON) || (stat == MapleBuffStat.PUPPET)) {
                    int summonId = mbsvh.effect.getSourceId();
                    MapleSummon summon = (MapleSummon) this.summons.get(Integer.valueOf(summonId));
                    if (summon != null) {
                        getMap().broadcastMessage(MaplePacketCreator.removeSpecialMapObject(summon, true));
                        getMap().removeMapObject(summon);
                        removeVisibleMapObject(summon);
                        this.summons.remove(Integer.valueOf(summonId));
                    }
                    if (summon.getSkill() == 1321007) {
                        if (this.beholderHealingSchedule != null) {
                            this.beholderHealingSchedule.cancel(false);
                            this.beholderHealingSchedule = null;
                        }
                        if (this.beholderBuffSchedule != null) {
                            this.beholderBuffSchedule.cancel(false);
                            this.beholderBuffSchedule = null;
                        }
                    }
                } else if (stat == MapleBuffStat.DRAGONBLOOD) {
                    this.dragonBloodSchedule.cancel(false);
                    this.dragonBloodSchedule = null;
                } else if (stat == MapleBuffStat.能量) {
                    if (energyChargeSchedule != null) {
                        energyChargeSchedule.cancel(false);
                        energyChargeSchedule = null;
                    }
                }
            }
        }
        for (MapleBuffStatValueHolder cancelEffectCancelTasks : effectsToCancel) {
            if (getBuffStats(cancelEffectCancelTasks.effect, cancelEffectCancelTasks.startTime).size() == 0) {
                cancelEffectCancelTasks.schedule.cancel(false);
            }
        }
    }

    public int Lianjie() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        ResultSet re;
        int count = 0;
        try {
            ps = con.prepareStatement("SELECT count(*) as cc FROM accounts WHERE loggedin = 2", Statement.RETURN_GENERATED_KEYS);
            re = ps.executeQuery();
            while (re.next()) {
                count = re.getInt("cc");
            }
            //ps.close();
            //  con.close();
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(EventInstanceManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        return count;
    }

    /**
     * ******************开始取消BUFF***************(MapleBuffStat stat)
     */
    public void cancelEffect(MapleStatEffect effect, boolean overwrite, long startTime) {
        List buffstats;
        if (!overwrite) {
            buffstats = getBuffStats(effect, startTime);
        } else {
            List<Pair<MapleBuffStat, Integer>> statups = effect.getStatups();
            buffstats = new ArrayList(statups.size());
            for (Pair<MapleBuffStat, Integer> statup : statups) {
                buffstats.add(statup.getLeft());
            }
        }
        deregisterBuffStats(buffstats);

        if (effect.isMagicDoor()) {
            if (!getDoors().isEmpty()) {
                MapleDoor door = (MapleDoor) getDoors().iterator().next();
                for (MapleCharacter chr : door.getTarget().getCharacters()) {
                    door.sendDestroyData(chr.getClient());
                }
                for (MapleCharacter chr : door.getTown().getCharacters()) {
                    door.sendDestroyData(chr.getClient());
                }
                for (MapleDoor destroyDoor : getDoors()) {
                    door.getTarget().removeMapObject(destroyDoor);
                    door.getTown().removeMapObject(destroyDoor);
                }
                clearDoors();
                silentPartyUpdate();
            }
        } else if (effect.is矛连击强化()) {  //如果出现矛连击强化的BUFF 取消时等于 COMBO 0值
            this.comboCounter = 0;
        } else if (effect.is矛连击强化防御()) {  //如果出现矛连击强化的BUFF 取消时等于 COMBO 0值
            this.comboCounter = 0;
        } else if (effect.is矛连击强化魔法防御()) {  //如果出现矛连击强化的BUFF 取消时等于 COMBO 0值
            this.comboCounter = 0;//MONSTER_RIDING
        } else if (effect.is能量()) {
            this.energybar = 0;
        }
        if (!overwrite) {
            cancelPlayerBuffs(buffstats);
            if ((effect.isHide()) && ((MapleCharacter) getMap().getMapObject(getObjectId()) != null)) {
                this.hidden = false;
                getMap().broadcastMessage(this, MaplePacketCreator.spawnPlayerMapobject(this), false);
                for (MaplePet pett : this.pets) {
                    getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pett, false, false), false);
                }
            }
        }
    }

    /**
     * ****************结束*************************
     */
    public void cancelBuffStats(MapleBuffStat stat) {
        List buffStatList = Arrays.asList(new MapleBuffStat[]{stat});
        deregisterBuffStats(buffStatList);
        cancelPlayerBuffs(buffStatList);
    }

    public void cancelEffectFromBuffStat(MapleBuffStat stat) {
        if (this.effects.get(stat) != null) {
            cancelEffect(((MapleBuffStatValueHolder) this.effects.get(stat)).effect, false, -1L);
        }
    }

    private void cancelPlayerBuffs(List<MapleBuffStat> buffstats) {
        if (getClient().getChannelServer().getPlayerStorage().getCharacterById(getId()) != null) {
            recalcLocalStats();
            enforceMaxHpMp();
            getClient().getSession().write(MaplePacketCreator.cancelBuff(buffstats));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignBuff(getId(), buffstats), false);
        }
    }

    public void dispel() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && !mbsvh.effect.is矛连击强化() && !mbsvh.effect.is矛连击强化防御() && !mbsvh.effect.is矛连击强化魔法防御() && !mbsvh.effect.is武装()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void cancelAllBuffs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    public void cancelMorphs() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if ((mbsvh.effect.isMorph()) && (mbsvh.effect.getSourceId() != 5111005) && (mbsvh.effect.getSourceId() != 5121003)) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void silentGiveBuffs(List<PlayerBuffValueHolder> buffs) {
        for (PlayerBuffValueHolder mbsvh : buffs) {
            mbsvh.effect.silentApplyBuff(this, mbsvh.startTime);
        }
    }

    public void giveItemBuff(int itemID) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        MapleStatEffect statEffect = mii.getItemEffect(itemID);
        statEffect.applyTo(this);
    }

    public List<PlayerBuffValueHolder> getAllBuffs() {
        List ret = new ArrayList();
        for (MapleBuffStatValueHolder mbsvh : this.effects.values()) {
            ret.add(new PlayerBuffValueHolder(mbsvh.startTime, mbsvh.effect));
        }
        return ret;
    }

    public void cancelMagicDoor() {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMagicDoor()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void handleEnergyChargeGain() {
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        if (energyChargeSkillLevel <= 0) {
            energycharge = SkillFactory.getSkill(15100004);
            energyChargeSkillLevel = getSkillLevel(energycharge);
        }
        MapleStatEffect ceffect = null;
        ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {
                energybar = (energybar + 102);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energybar));
                // ////System.out.println("A-------------1");
                setBuffedValue(MapleBuffStat.能量, energybar);
                getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                //  ////System.out.println("A-------------2");
                // //////System.out.println("handleEnergyChargeGain");
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(energycharge.getId(), 2));
                // ////System.out.println("A-------------3");
                getMap().broadcastMessage(this, MaplePacketCreator.showBuffeffect(id, energycharge.getId(), 2));
                // ////System.out.println("A-------------4");
                getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(energybar, stat));
                if (energybar == 10000) {
                    getMap().broadcastMessage(this, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                    //  ////System.out.println("A-------------5");
                }
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                tMan.schedule(new Runnable() {

                    @Override
                    public void run() {
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energybar));
                        //  ////System.out.println("B-------------1");
                        setBuffedValue(MapleBuffStat.能量, energybar);
                        //getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                        //getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                        //////System.out.println("B-------------2");
                        getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                        // ////System.out.println("B-------------3");
                        getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignBuff(energybar, stat));
                        energybar = 0;
                        //////System.out.println("B-------------4");
                    }
                }, ceffect.getDuration());
            }

        }
        // ////System.out.println("能量值："+energybar);
    }

    public void 海盗能量() {
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        MapleStatEffect ceffect = null;
        ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {
                energybar = (energybar + 102);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量获取, energybar));
                ////System.out.println("A-------------1");
                setBuffedValue(MapleBuffStat.能量获取, energybar);
                getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                ////System.out.println("A-------------2");
                // //////System.out.println("handleEnergyChargeGain");
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(energycharge.getId(), 2));
                ////System.out.println("A-------------3");
                getMap().broadcastMessage(this, MaplePacketCreator.showBuffeffect(id, energycharge.getId(), 2));
                ////System.out.println("A-------------4");
                getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(energybar, stat));
                ////System.out.println("A-------------5");
                /*
                 * if (energybar == 10000) { getMap().broadcastMessage(this,
                 * MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                 * ////System.out.println("A-------------5");
                 }
                 */
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                tMan.schedule(new Runnable() {

                    @Override
                    public void run() {
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energybar));
                        ////System.out.println("B-------------1");
                        setBuffedValue(MapleBuffStat.能量, energybar);
                        //getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                        //getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                        ////System.out.println("B-------------2");
                        getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                        ////System.out.println("B-------------3");
                        getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignBuff(energybar, stat));
                        energybar = 0;
                        ////System.out.println("B-------------4");
                    }
                }, ceffect.getDuration());
            }

        }
        // ////System.out.println("能量值："+energybar);
    }

    public void 骑士团海盗能量() {
        ISkill energycharge = SkillFactory.getSkill(15100004);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        /*
         * if (energyChargeSkillLevel <= 0) { energycharge =
         * SkillFactory.getSkill(15100004); energyChargeSkillLevel =
         * getSkillLevel(energycharge);
         }
         */
        MapleStatEffect ceffect = null;
        ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {
                energybar = (energybar + 102);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energybar));
                setBuffedValue(MapleBuffStat.能量, energybar);
                getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(energycharge.getId(), 2));
                getMap().broadcastMessage(this, MaplePacketCreator.showBuffeffect(id, energycharge.getId(), 2));
                getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(energybar, stat));
                if (energybar == 10000) {
                    getMap().broadcastMessage(this, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                }
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                tMan.schedule(new Runnable() {

                    @Override
                    public void run() {
                        List<Pair<MapleBuffStat, Integer>> stat = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energybar));
                        //  ////System.out.println("B-------------1");
                        setBuffedValue(MapleBuffStat.能量, energybar);
                        //getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                        //getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                        //////System.out.println("B-------------2");
                        getClient().getSession().write(MaplePacketCreator.givePirateBuff(energybar, 0, stat));
                        // ////System.out.println("B-------------3");
                        getMap().broadcastMessage(chr, MaplePacketCreator.giveForeignBuff(energybar, stat));
                        energybar = 0;
                        //////System.out.println("B-------------4");
                    }
                }, ceffect.getDuration());
            }

        }
        // ////System.out.println("能量值："+energybar);
    }

    public void handleOrbgain() {
        MapleStatEffect ceffect = null;
        int advComboSkillLevel = getSkillLevel(SkillFactory.getSkill(1120003));

        if (advComboSkillLevel > 0) {
            ceffect = SkillFactory.getSkill(1120003).getEffect(advComboSkillLevel);
        } else if (getSkillLevel(SkillFactory.getSkill(11110005)) > 0) {
            advComboSkillLevel = getSkillLevel(SkillFactory.getSkill(11110005));
            ceffect = SkillFactory.getSkill(11110005).getEffect(getSkillLevel(SkillFactory.getSkill(11110005)));
        } else {
            int effectlevel = getSkillLevel(SkillFactory.getSkill(1111002));
            if (effectlevel == 0) {
                ceffect = SkillFactory.getSkill(11111001).getEffect(getSkillLevel(SkillFactory.getSkill(11111001)));
            } else {
                ceffect = SkillFactory.getSkill(1111002).getEffect(effectlevel);
            }
        }

        if (getBuffedValue(MapleBuffStat.COMBO).intValue() < ceffect.getX() + 1) {
            int neworbcount = getBuffedValue(MapleBuffStat.COMBO).intValue() + 1;
            if ((advComboSkillLevel > 0) && (ceffect.makeChanceResult()) && (neworbcount < ceffect.getX() + 1)) {
                neworbcount++;
            }

            List stat = Collections.singletonList(new Pair(MapleBuffStat.COMBO, Integer.valueOf(neworbcount)));
            setBuffedValue(MapleBuffStat.COMBO, neworbcount);
            int duration = ceffect.getDuration();
            duration += (int) (getBuffedStarttime(MapleBuffStat.COMBO).longValue() - System.currentTimeMillis());
            int effectlevel = getSkillLevel(SkillFactory.getSkill(1111002));
            if (effectlevel == 0) {
                getClient().getSession().write(MaplePacketCreator.giveBuff(this, 11111001, duration, stat));
            } else {
                getClient().getSession().write(MaplePacketCreator.giveBuff(this, 1111002, duration, stat));
            }
            getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, stat, ceffect), false);
        }
    }

    public void handleOrbconsume() {
        ISkill combo = SkillFactory.getSkill(1111002); //冒险家斗气集中
        if (getSkillLevel(combo) == 0) {//如果当前冒险家斗气集中等于0
            combo = SkillFactory.getSkill(11111001);//定义为骑士团斗气集中
        }
        MapleStatEffect ceffect = combo.getEffect(getSkillLevel(combo));
        List stat = Collections.singletonList(new Pair(MapleBuffStat.COMBO, Integer.valueOf(1)));
        setBuffedValue(MapleBuffStat.COMBO, 1);
        int duration = ceffect.getDuration(); //持续时间
        //持续时间 = 得到开始的COMBO时间 - 执行时间
        //duration += (int) (getBuffedStarttime(MapleBuffStat.COMBO).longValue() - System.currentTimeMillis());
        duration += (int) (getBuffedStarttime(MapleBuffStat.COMBO).longValue());
        if (getSkillLevel(combo) == 0) {
            getClient().getSession().write(MaplePacketCreator.giveBuff(this, 11111001, duration, stat));
        } else {
            getClient().getSession().write(MaplePacketCreator.giveBuff(this, 1111002, duration, stat));
        }
        getMap().broadcastMessage(this, MaplePacketCreator.giveForeignBuff(this, stat, ceffect), false);
    }

    private void silentEnforceMaxHpMp() {
        setMp(getMp());
        setHp(getHp(), true);
    }

    private void enforceMaxHpMp() {
        List stats = new ArrayList(2);
        if (getMp() > getCurrentMaxMp()) {
            setMp(getMp());
            stats.add(new Pair(MapleStat.MP, Integer.valueOf(getMp())));
        }
        if (getHp() > getCurrentMaxHp()) {
            setHp(getHp());
            stats.add(new Pair(MapleStat.HP, Integer.valueOf(getHp())));
        }
        if (stats.size() > 0) {
            getClient().getSession().write(MaplePacketCreator.updatePlayerStats(stats));
        }
    }

    public MapleMap getMap() {
        return this.map;
    }

    public void setMap(MapleMap newmap) {
        this.map = newmap;
    }

    public int getMapId() {
        if (this.map != null) {
            return this.map.getId();
        }
        return this.mapid;
    }

    public int getInitialSpawnpoint() {
        return this.initialSpawnPoint;
    }

    public List<LifeMovementFragment> getLastRes() {
        return this.lastres;
    }

    public void setLastRes(List<LifeMovementFragment> lastres) {
        this.lastres = lastres;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public int getLevel() {
        return this.level;
    }

    public int getDojoEnergy() {
        return this.dojoEnergy;
    }

    public int getDojoPoints() {
        return this.dojoPoints;
    }

    public int getDojoStage() {
        return this.lastDojoStage;
    }

    public int getRank() {
        return this.rank;
    }

    public int getRankMove() {
        return this.rankMove;
    }

    public int getJobRank() {
        return this.jobRank;
    }

    public int getJobRankMove() {
        return this.jobRankMove;
    }

    public int getJobType() {
        return this.job.getId() / 2000;
    }

    public int getAPQScore() {
        return this.APQScore;
    }

    public int getFame() {
        return this.fame;
    }

    public MapleFamilyEntry getFamily() {
        return MapleFamily.getMapleFamily(this);
    }

    public int getFamilyId() {
        return this.familyId;
    }

    public ArrayList<Integer> getExcluded() {
        return this.excluded;
    }

    public int getStr() {
        return this.str;
    }

    public int getDex() {
        return this.dex;
    }

    public int getLuk() {
        return this.luk;
    }

    public int getInt() {
        return this.int_;
    }

    public MapleClient getClient() {
        return client;
    }

    public int getExp() {
        return this.exp.get();
    }

    public int getHp() {
        return this.hp;
    }

    public int getMaxHp() {
        return this.maxhp;
    }

    public int getMp() {
        return this.mp;
    }

    public int getPvpDeaths() {
        return pvpdeaths;
    }

    public int getMaxMp() {
        return this.maxmp;
    }

    public int getRemainingAp() {
        return this.remainingAp;
    }

    public int getRemainingSp() {
        return this.remainingSp;
    }

    public int getMpApUsed() {
        return this.mpApUsed;
    }

    public void setMpApUsed(int mpApUsed) {
        this.mpApUsed = mpApUsed;
    }

    public int getHpApUsed() {
        return this.hpApUsed;
    }

    public boolean isHidden() {
        return this.hidden;
    }

    public void setDojoEnergy(int x) {
        this.dojoEnergy = x;
    }

    public void setDojoPoints(int x) {
        this.dojoPoints = x;
    }

    public void setDojoStage(int x) {
        this.lastDojoStage = x;
    }

    public void setDojoStart() {
        int stage = this.map.getId() / 100 % 100;
        this.dojoFinish = (System.currentTimeMillis() + ((stage > 36 ? 15 : stage / 6 + 5) | 0x0) * 60000);
    }

    public void setFinishedDojoTutorial() {
        this.finishedDojoTutorial = true;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public void setHpApUsed(int hpApUsed) {
        this.hpApUsed = hpApUsed;
    }

    public MapleSkinColor getSkinColor() {
        return this.skinColor;
    }
    //打怪记录
    public int getjf() {//副本/充值积分
        return this.jf;
    }
    public void gainjf(int gain) {//副本/充值积分
        this.jf += gain;
    }
    public int getxflh() {//记录点卷购买消费点卷数量
        return this.xflh;
    }

    public void setxflh(int xflh) {//记录点卷购买消费点卷数量
        this.xflh = xflh;
    }

    //签到系统
    public int getqiandao() {
        return qiandao;
    }

    public int getqiandao2() {
        return qiandao2;
    }

    public int getmodid() {//modid
        return modid;
    }

    public int getmodsl() {//modsl
        return modsl;
    }

    public int gettuiguang() {
        return tuiguang;
    }

    public void settuiguang(int set) {
        this.tuiguang = set;
    }

    public void setmodid(int set) {
        this.modid = set;
    }

    public void setmodsl(int set) {
        this.modsl = set;
    }

    public int gettuiguang2() {
        return tuiguang2;
    }

    public int getvip() {
        return vip;
    }

    public void settuiguang2(int set) {
        this.tuiguang2 = set;
    }

    public void setqiandao(int set) {
        this.qiandao = set;
    }

    public void setqiandao2(int set) {
        this.qiandao2 = set;
    }

    public void setPvpKills(int amount) {
        pvpkills = amount;
    }
    /*
     * public void setJob(int set) { this.Job = set;
     }
     */

    public void gainPvpDeath() {
        pvpdeaths += 1;
    }

    public void gainPvpKill() {
        pvpkills += 1;
    }

    public void gainxflh(int gain) {//记录点卷购买消费点卷数量
        this.xflh += gain;
    }

    public int getPvpKills() {
        return pvpkills;
    }

    public void gainqiandao(int gain) {
        this.qiandao += gain;
    }

    public void gainqiandao2(int gain) {
        this.qiandao2 += gain;
    }

    public void gainbosschongfan(int gain) {
        this.bosschongfan += gain;
    }

    public void gainmodid(int gain) {
        this.modid += gain;
    }

    public void gainmodsl(int gain) {
        this.modsl += gain;
    }

    public void gaintuiguang(int gain) {//推广
        this.tuiguang += gain;
    }

    public MapleJob getJob() {
        return this.job;
    }

    public int getGender() {
        return this.gender;
    }

    public int getHair() {
        return this.hair;
    }

    public int getFace() {
        return this.face;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFamilyId(int familyId) {
        this.familyId = familyId;
    }

    public void setStr(int str) {
        this.str = str;
        recalcLocalStats();
    }

    public void setDex(int dex) {
        this.dex = dex;
        recalcLocalStats();
    }

    public void setLuk(int luk) {
        this.luk = luk;
        recalcLocalStats();
    }

    public void setInt(int int_) {
        this.int_ = int_;
        recalcLocalStats();
    }

    public void setExp(int exp) {
        this.exp.set(exp);
    }

    public void setJob(int job) {
        this.job = MapleJob.getById(job);
    }

    /*
     * public void setJob(int job) { if (isfake) { this.job =
     * MapleJob.getById(job); } else { this.changeJob(MapleJob.getById(job)); }
     }
     */
    public void setMaxHP(int maxhp) {
        this.maxhp = maxhp;
        recalcLocalStats();
    }

    public void setMaxMP(int maxmp) {
        this.maxmp = maxmp;
        recalcLocalStats();
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public void setFame(int fame) {
        this.fame = fame;
    }

    public void setAPQScore(int score) {
        this.APQScore = score;
    }

    public void setRemainingAp(int remainingAp) {
        this.remainingAp = remainingAp;
    }

    public void setRemainingSp(int remainingSp) {
        this.remainingSp = remainingSp;
    }

    public void setSkinColor(MapleSkinColor skinColor) {
        this.skinColor = skinColor;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void setGM(int gmlevel) {
        this.GMLevel = gmlevel;
    }

    public void setvip(int viplevel) {
        this.vip = viplevel;
    }

    public void doReborns() {
        this.Reborns += 1;
    }

    public CheatTracker getCheatTracker() {
        return this.anticheat;
    }

    public BuddyList getBuddylist() {
        return this.buddylist;
    }

    public int getAutoHpPot() {
        return this.autoHpPot;
    }

    public void setAutoHpPot(int itemId) {
        this.autoHpPot = itemId;
    }

    public int getAutoMpPot() {
        return this.autoMpPot;
    }

    public void setAutoMpPot(int itemId) {
        this.autoMpPot = itemId;
    }

    public void addFame(int famechange) {
        this.fame += famechange;
    }

    public Point getLastPortalPoint() {
        return this.lastPortalPoint;
    }

    public void resetLastPortalPoint() {
        this.lastPortalPoint = null;
    }

    public boolean hasEntered(String script, int mapId) {
        return (this.entered.containsKey(Integer.valueOf(mapId))) && (((String) this.entered.get(Integer.valueOf(mapId))).equals(script));
    }

    public boolean hasEntered(String script) {
        for (Iterator i$ = this.entered.keySet().iterator(); i$.hasNext();) {
            int mapId = ((Integer) i$.next()).intValue();
            if (((String) this.entered.get(Integer.valueOf(mapId))).equals(script)) {
                return true;
            }
        }
        return false;
    }

    public void enteredScript(String script, int mapid) {
        if (!this.entered.containsKey(Integer.valueOf(mapid))) {
            this.entered.put(Integer.valueOf(mapid), script);
        }
    }

    public void resetEnteredScript() {
        if (this.entered.containsKey(Integer.valueOf(this.map.getId()))) {
            this.entered.remove(Integer.valueOf(this.map.getId()));
        }
    }

    public void resetEnteredScript(int mapId) {
        if (this.entered.containsKey(Integer.valueOf(mapId))) {
            this.entered.remove(Integer.valueOf(mapId));
        }
    }

    public void resetEnteredScript(String script) {
        for (Iterator i$ = this.entered.keySet().iterator(); i$.hasNext();) {
            int mapId = ((Integer) i$.next()).intValue();
            if (((String) this.entered.get(Integer.valueOf(mapId))).equals(script)) {
                this.entered.remove(Integer.valueOf(mapId));
            }
        }
    }

    public boolean changeMapOffline(String victim, int mapId) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET map = ?, spawnpoint = ? WHERE name = ?");
            ps.setInt(1, mapId);
            ps.setInt(2, 0);
            ps.setString(3, victim);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            return false;
        }
        return true;
    }

    private void changeMapInternal(final MapleMap to, final Point pos, MaplePacket warpPacket) {
        warpPacket.setOnSend(new Runnable() {

            @Override
            public void run() {
                IPlayerInteractionManager interaction = MapleCharacter.this.getInteraction();
                if (interaction != null) {
                    if (interaction.isOwner(MapleCharacter.this)) {
                        if (interaction.getShopType() == 2) {
                            interaction.removeAllVisitors(3, 1);
                            interaction.closeShop(((MaplePlayerShop) interaction).returnItems(getClient()));
                        } else if (interaction.getShopType() == 1) {
                            getClient().getSession().write(MaplePacketCreator.shopVisitorLeave(0));
                            if (interaction.getItems().size() == 0) {
                                interaction.removeAllVisitors(3, 1);
                                interaction.closeShop(((HiredMerchant) interaction).returnItems(getClient()));
                            }
                        } else if (interaction.getShopType() == 3 || interaction.getShopType() == 4) {
                            interaction.removeAllVisitors(3, 1);
                        }
                    } else {
                        interaction.removeVisitor(MapleCharacter.this);
                    }
                }
                MapleCharacter.this.setInteraction(null);
                map.removePlayer(MapleCharacter.this);
                if (getClient().getChannelServer().getPlayerStorage().getCharacterById(getId()) != null) {
                    map = to;
                    setPosition(pos);
                    to.addPlayer(MapleCharacter.this);
                    lastPortalPoint = getPosition();
                    if (party != null) {
                        silentPartyUpdate();
                        getClient().getSession().write(MaplePacketCreator.updateParty(getClient().getChannel(), party, PartyOperation.SILENT_UPDATE, null));
                        updatePartyMemberHP();
                    }
                    if (getMap().getHPDec() > 0) {
                        hpDecreaseTask = TimerManager.getInstance().schedule(new Runnable() {

                            @Override
                            public void run() {
                                doHurtHp();
                            }
                        }, 10000);
                    }
                    if (to.getId() == 980000301) { //todo: all CPq map id's
                        setTeam(MapleCharacter.rand(0, 1));
                        getClient().getSession().write(MaplePacketCreator.startMonsterCarnival(getTeam()));
                    }
                }
            }
        });
        if (hasFakeChar()) {
            for (FakeCharacter ch : getFakeChars()) {
                if (ch.follow()) {
                    ch.getFakeChar().getMap().removePlayer(ch.getFakeChar());
                }
            }
        }
        getClient().getSession().write(warpPacket);
    }

    public void leaveMap() {
        this.controlled.clear();
        this.visibleMapObjects.clear();
        if (this.chair != 0) {
            this.chair = 0;
        }
        if (this.hpDecreaseTask != null) {
            this.hpDecreaseTask.cancel(false);
        }
    }

    public void doHurtHp() {
        if (getInventory(MapleInventoryType.EQUIPPED).findById(getMap().getHPDecProtect()) != null) {
            return;
        }
        addHP(-getMap().getHPDec());
        this.hpDecreaseTask = TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                MapleCharacter.this.doHurtHp();
            }
        }, 10000L);
    }

    public void changeJob(MapleJob newJob) {
    	if (isBeginnerJob()) {
    		apReset();
		}
        this.job = newJob;
        this.remainingSp += 1;
        if (newJob.getId() % 10 == 2) {
            this.remainingSp += 2;
        }
        updateSingleStat(MapleStat.AVAILABLESP, this.remainingSp);
        updateSingleStat(MapleStat.JOB, newJob.getId());
        switch (this.job.getId()) {
            case 100:
                this.maxhp += rand(200, 250);
                break;
            case 110:
            case 111:
            case 112:
                this.maxhp += rand(300, 350);
                break;
            case 120:
            case 121:
            case 122:
            case 130:
            case 131:
            case 132:
            case 200:
                this.maxmp += rand(100, 150);
                break;
            case 210:
            case 211:
            case 212:
            case 220:
            case 221:
            case 222:
            case 230:
            case 231:
            case 232:
                this.maxmp += rand(450, 500);
                break;
            case 300:
            case 400:
            case 500:
                this.maxhp += rand(100, 150);
                this.maxmp += rand(30, 50);
                break;
            case 310:
            case 311:
            case 312:
            case 320:
            case 321:
            case 322:
            case 410:
            case 411:
            case 412:
            case 420:
            case 421:
            case 422:
            case 510:
            case 511:
            case 512:
            case 520:
            case 521:
            case 522:
                this.maxhp += rand(300, 350);
                this.maxmp += rand(150, 200);
        }

        if (this.maxhp > 30000) {
            this.maxhp = 30000;
        }
        if (this.maxmp > 30000) {
            this.maxmp = 30000;
        }
        setHp(this.maxhp);
        setMp(this.maxmp);
        List statup = new ArrayList(2);
        statup.add(new Pair(MapleStat.MAXHP, Integer.valueOf(this.maxhp)));
        statup.add(new Pair(MapleStat.MAXMP, Integer.valueOf(this.maxmp)));
        recalcLocalStats();
        getClient().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
        getMap().broadcastMessage(this, MaplePacketCreator.showJobChange(getId()), false);
        silentPartyUpdate();
        guildUpdate();
    }

    public void gainAp(int ap) {
        this.remainingAp += ap;
        updateSingleStat(MapleStat.AVAILABLEAP, this.remainingAp);
    }

    public void apReset() {
        List statups = new ArrayList();
        int Str = 4;
        int Dex = 4;
        int Int = 4;
        int Luk = 4;
        if (this.job.isA(MapleJob.WARRIOR)) {
            Str = 35;
        }
        if (this.job.isA(MapleJob.MAGICIAN)) {
            Int = 20;
        }
        if (this.job.isA(MapleJob.BOWMAN)) {
            Dex = 25;
        }
        if (this.job.isA(MapleJob.THIEF)) {
            Dex = 25;
        }
        if (this.job.isA(MapleJob.PIRATE)) {
            Dex = 20;
        }
        int ap = getStr() + getDex() + getInt() + getLuk() + getRemainingAp() - (Dex + Str + Int + Luk);
        setStr(Str);
        setDex(Dex);
        setInt(Int);
        setLuk(Luk);
        setRemainingAp(ap);
        statups.add(new Pair(MapleStat.STR, Integer.valueOf(getStr())));
        statups.add(new Pair(MapleStat.DEX, Integer.valueOf(getDex())));
        statups.add(new Pair(MapleStat.INT, Integer.valueOf(getInt())));
        statups.add(new Pair(MapleStat.LUK, Integer.valueOf(getLuk())));
        statups.add(new Pair(MapleStat.AVAILABLEAP, Integer.valueOf(getRemainingAp())));
        getClient().getSession().write(MaplePacketCreator.updatePlayerStats(statups));
    }
    
    public void changeSkillLevel(ISkill skill, int newLevel, int newMasterlevel) {
        this.skills.put(skill, new SkillEntry(newLevel, newMasterlevel));
        getClient().getSession().write(MaplePacketCreator.updateSkill(skill.getId(), newLevel, newMasterlevel));
    }

    public void setHpPot(int itemid) {
        this.hppot = itemid;
    }

    public void setMpPot(int itemid) {
        this.mppot = itemid;
    }

    public int getHpPot() {
        return this.hppot;
    }

    public int getMpPot() {
        return this.mppot;
    }

    public void setHp(int newhp) {
        setHp(newhp, false);
    }

    public void setHp(int newhp, boolean silent) {
        int oldHp = this.hp;
        int thp = newhp;
        if (thp < 0) {
            thp = 0;
        }
        if (thp > this.localmaxhp) {
            thp = this.localmaxhp;
        }
        this.hp = thp;

        if (!silent) {
            updatePartyMemberHP();
        }
        if ((oldHp > this.hp) && (!isAlive())) {
            playerDead();
        }
        checkBerserk();
    }

    private void playerDead() {

        if (getEventInstance() != null) {
            getEventInstance().playerKilled(this);
        }
        dispelSkill(0);
        cancelAllDebuffs();
        cancelMorphs();

        int[] charmID = {5130000, 5130002, 5131000, 4031283, 4140903};
        MapleCharacter player = getClient().getPlayer();
        int possesed = 0;
        int i;

        //Check for charms
        for (i = 0; i < charmID.length; i++) {
            int quantity = getItemQuantity(charmID[i], false);
            if (possesed == 0 && quantity > 0) {
                possesed = quantity;
                break;
            }
        }

        if (possesed > 0 && !getMap().hasEvent()) {
            possesed -= 1;
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "因使用了 [护身符] 死亡后您的经验不会减少！剩余 (" + possesed + " 个)"));
            MapleInventoryManipulator.removeById(getClient(), MapleItemInformationProvider.getInstance().getInventoryType(charmID[i]), charmID[i], 1, true, false);
        } else if (getMap().hasEvent()) {
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "在任务地图中死亡，您的经验值不会减少。"));
        } else {
            if (!isBeginnerJob()) {
                //Lose XP
                int XPdummy = ExpTable.getExpNeededForLevel(player.getLevel() + 1);
                if (player.getMap().isTown()) {
                    XPdummy *= 0.01;
                }
                if (XPdummy == ExpTable.getExpNeededForLevel(player.getLevel() + 1)) {
                    if (player.getLuk() <= 100 && player.getLuk() > 8) {
                        XPdummy *= 0.10 - (player.getLuk() * 0.0005);
                    } else if (player.getLuk() < 8) {
                        XPdummy *= 0.10; //Otherwise they lose about 9 percent
                    } else {
                        XPdummy *= 0.10 - (100 * 0.0005);
                    }
                }
                if ((player.getExp() - XPdummy) > 0) {
                    player.gainExp(-XPdummy, false, false);
                } else {
                    player.gainExp(-player.getExp(), false, false);
                }
            }
        }


        if (getBuffedValue(MapleBuffStat.MORPH) != null) {
            cancelEffectFromBuffStat(MapleBuffStat.MORPH);
        }
        if (getBuffedValue(MapleBuffStat.骑宠技能) != null) {
            cancelEffectFromBuffStat(MapleBuffStat.骑宠技能);
        }
        client.getSession().write(MaplePacketCreator.enableActions());

        // this.getClient().getSession().write(MaplePacketCreator.sendHint("你已经死亡. 你将会在5秒内回城.", -1, 5));
        // getClient().getSession().write(MaplePacketCreator.serverNotice(6,"你已经死亡. 你将会在5秒内回城."));
        for (i = 1; i < 5; i++) {
            final int k = i;
            TimerManager.getInstance().schedule(new Runnable() {

                public void run() {
                    //MapleCharacter.this.getClient().getSession().
                    //write(MaplePacketCreator.
                    //sendHint("你已经死亡. 你将会在 " + (5 - k) +" 秒内回城.", -1, 5));
                }
            }, 1000 * (i + 1));
        }
    }

    public void updatePartyMemberHP() {
        int channel;
        if (this.party != null) {
            channel = this.client.getChannel();
            for (MaplePartyCharacter partychar : this.party.getMembers()) {
                if ((partychar.getMapid() == getMapId()) && (partychar.getChannel() == channel)) {
                    MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        other.getClient().getSession().write(MaplePacketCreator.updatePartyMemberHP(getId(), this.hp, this.localmaxhp));
                    }
                }
            }
        }
    }

    public void receivePartyMemberHP() {
        int channel;
        if (this.party != null) {
            channel = this.client.getChannel();
            for (MaplePartyCharacter partychar : this.party.getMembers()) {
                if ((partychar.getMapid() == getMapId()) && (partychar.getChannel() == channel)) {
                    MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        getClient().getSession().write(MaplePacketCreator.updatePartyMemberHP(other.getId(), other.getHp(), other.getCurrentMaxHp()));
                    }
                }
            }
        }
    }

    public void setMp(int newmp) {
        int tmp = newmp;
        if (tmp < 0) {
            tmp = 0;
        }
        if (tmp > this.localmaxmp) {
            tmp = this.localmaxmp;
        }
        this.mp = tmp;
    }

    public void addHP(int delta) {
        setHp(this.hp + delta);
        updateSingleStat(MapleStat.HP, this.hp);
    }

    public void addMP(int delta) {
        setMp(this.mp + delta);
        updateSingleStat(MapleStat.MP, this.mp);
    }
    private MapleClient c;

    public MapleCharacter getPlayer() {
        return this.c.getPlayer();
    }

    public void summonMob(int mobid, int customHP, int customEXP, int amount) {
        MapleMonsterStats newStats = new MapleMonsterStats();
        if (customHP > 0) {
            newStats.setHp(customHP);
        }
        if (customEXP >= 0) {
            newStats.setExp(customEXP);
        }
        if (amount <= 1) {
            MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
            npcmob.setOverrideStats(newStats);
            npcmob.setHp(npcmob.getMaxHp());
            getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, getPlayer().getPosition());
        } else {
            for (int i = 0; i < amount; i++) {
                MapleMonster npcmob = MapleLifeFactory.getMonster(mobid);
                npcmob.setOverrideStats(newStats);
                npcmob.setHp(npcmob.getMaxHp());
                getPlayer().getMap().spawnMonsterOnGroudBelow(npcmob, getPlayer().getPosition());
            }
        }
    }

    public void spawnMob(int mapid, int mid, int xpos, int ypos) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mid), new Point(xpos, ypos));
    }

    public void addMPHP(int hpDiff, int mpDiff) {
        setHp(this.hp + hpDiff);
        setMp(this.mp + mpDiff);
        List stats = new ArrayList();
        stats.add(new Pair(MapleStat.HP, Integer.valueOf(this.hp)));
        stats.add(new Pair(MapleStat.MP, Integer.valueOf(this.mp)));
        MaplePacket updatePacket = MaplePacketCreator.updatePlayerStats(stats);
        this.client.getSession().write(updatePacket);
    }

    public void updateSingleStat(MapleStat stat, int newval, boolean itemReaction) {
        Pair<MapleStat, Integer> statpair = new Pair<MapleStat, Integer>(stat, Integer.valueOf(newval));
        MaplePacket updatePacket = MaplePacketCreator.updatePlayerStats(Collections.singletonList(statpair), itemReaction);
        client.getSession().write(updatePacket);
    }

    public void updateSingleStat(MapleStat stat, int newval) {
        updateSingleStat(stat, newval, false);
    }

    public void gainExp(int gain, boolean show, boolean inChat, boolean white) {
        if (((getLevel() < 200) && ((Math.floor(getJob().getId() / 100) < 10.0D) || (Math.floor(getJob().getId() / 1000) == 2.0D))) || (getLevel() < 200)) {//修改等级上线
            if (getExp() + gain >= ExpTable.getExpNeededForLevel(this.level + 1)) {
                setExp(this.exp.addAndGet(gain));
                levelUp();
                if (getExp() > ExpTable.getExpNeededForLevel(this.level + 1)) {
                    setExp(ExpTable.getExpNeededForLevel(this.level + 1));
                }
            } else {
                /*ItemMoveHandler h = (ItemMoveHandler) PacketProcessor.getProcessor(PacketProcessor.Mode.CHANNELSERVER).getHandler((short) RecvPacketOpcode.ITEM_MOVE.getValue());
                long endInterval = h.getFairy_PendantEndMills();
                if (endInterval == -1) {
                    endInterval = System.currentTimeMillis();
                }*/
                IItem eqp = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -17);
            //    long interval = (endInterval - h.getFairy_PendantStartMills());
              //  long 佩戴时间 = (interval / 3600000) + 1;//除以毫秒+1就是小时了
                int 结婚经验 = 0;
                int 活动经验 = gain / 100 * 5;
                int 组队经验 = 0;
                int 没装备道具佩戴附加经验吊坠 = 0;
                int 道具佩戴附加经验吊坠 = gain / 100 * 30;
                int 网吧经验 = 0;
                //int vip = gain / 100 * 50;
               // int vip经验加成 = gain / 100 * 8;
                /*if (佩戴时间 < 1) {//1小时之内
                    道具佩戴附加经验吊坠 = gain / 10;
                } else if (佩戴时间 < 2 && 佩戴时间 >= 1) {//2小时之内
                    道具佩戴附加经验吊坠 = gain / 100 * 20;
                } else if (佩戴时间 < 3 && 佩戴时间 >= 2) {//3小时之内
                    道具佩戴附加经验吊坠 = gain / 100 * 30;
                } else if (佩戴时间 < 4 && 佩戴时间 >= 3) {//4小时之内
                    道具佩戴附加经验吊坠 = gain / 100 * 40;
                } else if (佩戴时间 >= 5) {//5小时
                    道具佩戴附加经验吊坠 = gain / 100 * 50;
                }*/
                boolean 不是VIP = getvip() <= 0;
                if (不是VIP) {
                    活动经验 = 0;
                }

                boolean 是组队 = getParty() != null;
                int 组队人数 = 0;
                if (是组队) {
                    组队人数 = getParty().getMembers().size();
                }
                if (组队人数 == 0) {
                    组队经验 = 0;
                } else if (组队人数 == 1) {
                    组队经验 = gain / 100;
                } else if (组队人数 == 2) {
                    组队经验 = gain / 100 * 8;
                } else if (组队人数 == 3) {
                    组队经验 = gain / 100 * 10;
                } else if (组队人数 == 4) {
                    组队经验 = gain / 100 * 15;
                } else if (组队人数 == 5) {
                    组队经验 = gain / 100 * 20;
                } else if (组队人数 == 6) {
                    组队经验 = gain / 100 * 25;
                }
                if (getMapId() == 190000001 || getMapId() == 190000002 || getMapId() == 191000001 || getMapId() == 192000000 || getMapId() == 192000001) {
                    int 经验计算 = gain / 100;
                    网吧经验 = 经验计算 * 20;
                    if (网吧经验 < 10) {
                        网吧经验 = 10;
                    }
                }
                /*
                 * 网吧地图
                 */
                // 
                //190000001
                //190000002
                //191000001
                //192000000
                //192000001
                if (getParty() == null) { //没有组队
                    if (eqp != null && eqp.getItemId() == 1122017) { //如果佩戴精灵吊坠
                        client.getSession().write(MaplePacketCreator.getShowExpGain((gain), inChat, white, 活动经验, 结婚经验, 组队经验, 道具佩戴附加经验吊坠, 网吧经验));
                        setExp(this.exp.addAndGet((gain) + 道具佩戴附加经验吊坠 + 组队经验 + 活动经验 + 网吧经验));
                        // ////System.out.println((gain + vip经验加成) + 道具佩戴附加经验吊坠 + 组队经验 +"gain + 道具佩戴附加经验吊坠 + 组队经验 + vip经验加成---A");

                    } else {

                        client.getSession().write(MaplePacketCreator.getShowExpGain((gain), inChat, white, 活动经验, 结婚经验, 组队经验, 没装备道具佩戴附加经验吊坠, 网吧经验));
                        setExp(this.exp.addAndGet((gain) + 没装备道具佩戴附加经验吊坠 + 组队经验 + 活动经验 + 网吧经验));
                        // System.out.println("经验"+gain+"||组队经验"+组队经验+"||活动经验"+活动经验+"||VIP等级"+getvip()+"");
                        //   ////System.out.println((gain + vip经验加成) + 没装备道具佩戴附加经验吊坠 + 组队经验 +"gain + 没装备道具佩戴附加经验吊坠 + 无组队经验 + vip经验加成---B");
                    }
                } else {//有组队
                    if (eqp != null && eqp.getItemId() == 1122017) { //有组队佩戴精灵吊坠
                        client.getSession().write(MaplePacketCreator.getShowExpGain((gain), inChat, white, 活动经验, 结婚经验, 组队经验, 道具佩戴附加经验吊坠, 网吧经验));
                        setExp(this.exp.addAndGet((gain) + 道具佩戴附加经验吊坠 + 组队经验 + 活动经验 + 网吧经验));
                        //   ////System.out.println((gain + vip经验加成) + 道具佩戴附加经验吊坠 + 组队经验 +"gain + 道具佩戴附加经验吊坠 + 组队经验 + vip经验加成---C");

                    } else {
                        client.getSession().write(MaplePacketCreator.getShowExpGain((gain), inChat, white, 活动经验, 结婚经验, 组队经验, 没装备道具佩戴附加经验吊坠, 网吧经验));
                        setExp(this.exp.addAndGet((gain) + 没装备道具佩戴附加经验吊坠 + 组队经验 + 活动经验 + 网吧经验));
                        // ////System.out.println((gain + vip经验加成) + 没装备道具佩戴附加经验吊坠 + 组队经验 +"gain + 没装备道具佩戴附加经验吊坠 + 无组队经验 + vip经验加成---D");
                    }
                }
            }
        } else if (getExp() != 0) {
            setExp(0);
        }
        /**
         * *
         * @1122017 - 精灵吊坠 @112207 - 温暖的围脖 @1122038-觉醒的冒险之心 @以上装备打怪可以多获得2倍的经验 *
         */
        updateSingleStat(MapleStat.EXP, getExp());
    }

    public void silentPartyUpdate() {
        if (this.party == null) {
            return;
        }
        try {
            getClient().getChannelServer().getWorldInterface().updateParty(this.party.getId(), PartyOperation.SILENT_UPDATE, new MaplePartyCharacter(this));
        } catch (RemoteException e) {
            log.error("REMOTE THROW", e);
            getClient().getChannelServer().reconnectWorld();
        }
    }

    public void gainExp(int gain, boolean show, boolean inChat) {
        gainExp(gain, show, inChat, true);
    }

    public boolean isGM() {
        return this.GMLevel > 0;
    }

    public int getGMLevel() {
        return this.GMLevel;
    }

    public int getReborns() {
        return this.Reborns;
    }

    public boolean hasGMLevel(int level) {
        return this.GMLevel >= level;
    }

    public int gmLevel() {
        return this.GMLevel;
    }

    public MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }

    public MapleShop getShop() {
        return this.shop;
    }

    public void setShop(MapleShop shop) {
        this.shop = shop;
    }

    public int getMeso() {
        return this.meso.get();
    }

    public int getSavedLocation(SavedLocationType type) {
        return this.savedLocations[type.ordinal()];
    }

    public void saveLocation(SavedLocationType type) {
        this.savedLocations[type.ordinal()] = getMapId();
    }

    public void saveLocation(SavedLocationType type, int mapz) {
        this.savedLocations[type.ordinal()] = mapz;
    }
    
    public void clearSavedLocation(SavedLocationType type) {
        this.savedLocations[type.ordinal()] = -1;
    }

    public void gainMeso(int gain, boolean show) {
        gainMeso(gain, show, false, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions) {
        gainMeso(gain, show, enableActions, false);
    }

    public void gainMeso(int gain, boolean show, boolean enableActions, boolean inChat) {
        if (this.meso.get() + gain < 0) {
            this.client.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int newVal = this.meso.addAndGet(gain);
        updateSingleStat(MapleStat.MESO, newVal, enableActions);
        if (show) {
            this.client.getSession().write(MaplePacketCreator.getShowMesoGain(gain, inChat));
        }
    }

    public void setwg(int slot) {
        try {
            int cid = getPlayer().getAccountID();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET md5data =md5data+ " + slot + " WHERE id = " + cid + "");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            ex.getStackTrace();
        }
    }

    public void controlMonster(MapleMonster monster, boolean aggro) {
        monster.setController(this);
        this.controlled.add(monster);
        this.client.getSession().write(MaplePacketCreator.controlMonster(monster, false, aggro));
    }

    public void stopControllingMonster(MapleMonster monster) {
        this.controlled.remove(monster);
    }

    public void checkMonsterAggro(MapleMonster monster) {
        if (!monster.isControllerHasAggro()) {
            if (monster.getController() == this) {
                monster.setControllerHasAggro(true);
            } else {
                monster.switchController(this, true);
            }
        }
    }

    public Collection<MapleMonster> getControlledMonsters() {
        return Collections.unmodifiableCollection(this.controlled);
    }

    public int getNumControlledMonsters() {
        return this.controlled.size();
    }

    /**
     * 这里已经有了
     * @return 
     */
    public String toString() {
        return this.name;
    }

    public int getAccountID() {
        return this.accountid;
    }

    public void mobKilled(int id) {//杀怪计数
        for (MapleQuestStatus q : this.quests.values()) {
            /*
             * if
             * (MapleQuest.getInstance(q.getQuest().getId()).nullCompleteQuestData())
             * { reloadQuest(MapleQuest.getInstance(q.getQuest().getId()));
             }
             */
            if (q.getStatus() == MapleQuestStatus.Status.COMPLETED || q.getQuest().canComplete(this, null)) {
                continue;
            }
            if (q.mobKilled(id) && !(q.getQuest() instanceof MapleCustomQuest)) {
                client.getSession().write(MaplePacketCreator.updateQuestMobKills(q));
                if (q.getQuest().canComplete(this, null)) {
                    client.getSession().write(MaplePacketCreator.getShowQuestCompletion(q.getQuest().getId()));
                }
            }
        }
    }

    public final List<MapleQuestStatus> getStartedQuests() {
        List ret = new LinkedList();
        for (MapleQuestStatus q : this.quests.values()) {
            if (q.getStatus() == MapleQuestStatus.Status.COMPLETED) {
                continue;
            }
            if ((q.getStatus().equals(MapleQuestStatus.Status.STARTED)) && (!(q.getQuest() instanceof MapleCustomQuest))) {
                ret.add(q);
            }
        }

        return Collections.unmodifiableList(ret);
    }

    public final List<MapleQuestStatus> getCompletedQuests() { //完成任务
        List ret = new LinkedList();
        for (MapleQuestStatus q : this.quests.values()) {
            if ((q.getStatus().equals(MapleQuestStatus.Status.COMPLETED)) && (!(q.getQuest() instanceof MapleCustomQuest))) {
                ret.add(q);
            }
        }
        return Collections.unmodifiableList(ret);
    }

    public void reloadQuest(MapleQuest quest) {
        int questId = quest.getId();
        MapleQuestStatus qs = getQuest(quest);
        this.quests.remove(quest);
        MapleQuest.remove(questId);
        MapleQuest q = MapleQuest.getInstance(questId);
        this.quests.put(q, qs);
    }

    public Map<ISkill, SkillEntry> getSkills() {
        return Collections.unmodifiableMap(this.skills);
    }

    public void dispelSkill(int skillid) {
        LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
        for (MapleBuffStatValueHolder mbsvh : allBuffs) {
            if (skillid == 0) {
                if ((mbsvh.effect.isSkill()) && ((mbsvh.effect.getSourceId() % 20000000 == 1004) || (dispelSkills(mbsvh.effect.getSourceId())))) {
                    cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                }
            } else if ((mbsvh.effect.isSkill()) && (mbsvh.effect.getSourceId() == skillid)) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    private boolean dispelSkills(int skillid) {
        switch (skillid) {
            case 1004:
            case 1321007:
            case 2121005:
            case 2221005:
            case 2311006:
            case 2321003:
            case 3111002:
            case 3111005:
            case 3211002:
            case 3211005:
            case 4111002:
            case 11001004:
            case 12001004:
            case 12111004:
            case 13001004:
            case 14001005:
            case 15001004:
            case 20001004:
                return true;
        }
        return false;
    }

    public int getSkillLevel(int skill) {
        SkillEntry ret = (SkillEntry) this.skills.get(SkillFactory.getSkill(skill));
        if (ret == null) {
            return 0;
        }
        return ret.skillevel;
    }

    public int getSkillLevel(ISkill skill) {
        SkillEntry ret = (SkillEntry) this.skills.get(skill);
        if ((skill != null) && ((skill.getId() == 1009) || (skill.getId() == 10001009) || (skill.getId() == 1010) || (skill.getId() == 1011) || (skill.getId() == 10001010) || (skill.getId() == 10001011) || (skill.getId() == 21120009) || (skill.getId() == 21120010))) {
            return 1;
        }
        if (ret == null) {
            return 0;
        }
        return ret.skillevel;
    }

    public int getMasterLevel(ISkill skill) {
        SkillEntry ret = (SkillEntry) this.skills.get(skill);
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

 
    public void doFish() {
    	if (fishingObj == null){
	    	int fishingTime = 18000;
	    	if (getItemQuantity(5340001, false) == 1) {
	            getClient().getSession().write(MaplePacketCreator.sendHint("使用高级鱼竿钓鱼。1分钟一次\r\n", 200, 200));
	            fishingTime = 1000;//1分钟一次 60000
	        } else if (c.getPlayer().getItemQuantity(5340000, false) == 1) {
	            getClient().getSession().write(MaplePacketCreator.sendHint("使用普通鱼竿钓鱼。3分钟一次\r\n", 200, 200));
	            fishingTime = 18000;//1分钟一次 60000
	        } else {
	            getClient().getSession().write(MaplePacketCreator.sendHint("没有鱼竿无法钓鱼\r\n请去商城购买鱼竿！", 200, 200));
	            cancelFishing();
	            return;
	        }
	    	fishingObj = new Fishing(this, fishingTime);
    	}else{
    		getClient().getSession().write(MaplePacketCreator.sendHint("正在钓鱼中..0..", 200, 200));
    	}
    }

    public void cancelFishing() {
    	if (fishingObj != null){
    		fishingObj.cancelFishing();
    		fishingObj = null;
    		System.gc();
    	}
    }

    
    public int getTotalDex() {
        return this.localdex;
    }

    public int getTotalInt() {
        return this.localint_;
    }

    public int getTotalStr() {
        return this.localstr;
    }

    public int getTotalLuk() {
        return this.localluk;
    }

    public int getTotalMagic() {
        return this.magic;
    }

    public double getSpeedMod() {
        return this.speedMod;
    }

    public double getJumpMod() {
        return this.jumpMod;
    }

    public int getTotalWatk() {
        return this.watk;
    }

    private static int rand(int lbound, int ubound) {
        return (int) (Math.random() * (ubound - lbound + 1) + lbound);
    }

    public void levelUp() {
        ISkill improvingMaxHP = null;
        int improvingMaxHPLevel = 0;
        ISkill improvingMaxMP = null;
        int improvingMaxMPLevel = 0;
        if ((this.job.getId() >= 1000) && (this.job.getId() <= 1511) && (getLevel() < 70)) {
            this.remainingAp += 1;
        }
        
        if (isBeginnerJob()&& getLevel() < 10 ) {
        	// 11级或转职之前ap是不能加的，所以直接加到Str里面
        	setStr(getStr() + 5);
		}else{
	        if (this.vip == 9999) {
	            this.remainingAp += 6;
	        } else if (this.vip == 9999) {
	            this.remainingAp += 7;
	        } else if (this.vip >= 49999) {
	            this.remainingAp += 8;
	        } else {
	            this.remainingAp += 5;
	        }		
		}
        
        if ((this.job == MapleJob.Ares) || (this.job == MapleJob.Ares_1) || (this.job == MapleJob.Ares_2) || (this.job == MapleJob.Ares_3) || (this.job == MapleJob.Ares_4)) {
            this.maxhp += rand(24, 28);
            this.maxmp += rand(4, 6);
        }
        if ((this.job == MapleJob.BEGINNER) || (this.job == MapleJob.KNIGHT)) {
            this.maxhp += rand(12, 16);
            this.maxmp += rand(10, 12);
        } else if ((this.job.isA(MapleJob.WARRIOR)) || (this.job.isA(MapleJob.GHOST_KNIGHT)) || (this.job.isA(MapleJob.Ares_1))) {
            improvingMaxHP = SkillFactory.getSkill(1000001);
            improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            if (this.job.isA(MapleJob.GHOST_KNIGHT)) {
                improvingMaxHP = SkillFactory.getSkill(11000000);
                improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            }
            this.maxhp += rand(24, 28);
            this.maxmp += rand(4, 6);
        } else if ((this.job.isA(MapleJob.MAGICIAN)) || (this.job.isA(MapleJob.FIRE_KNIGHT))) {
            improvingMaxMP = SkillFactory.getSkill(2000001);
            improvingMaxMPLevel = getSkillLevel(improvingMaxMP);
            if (this.job.isA(MapleJob.FIRE_KNIGHT)) {
                improvingMaxMP = SkillFactory.getSkill(12000000);
                improvingMaxMPLevel = getSkillLevel(improvingMaxMP);
            }
            this.maxhp += rand(10, 14);
            this.maxmp += rand(22, 24);
        } else if ((this.job.isA(MapleJob.BOWMAN)) || (this.job.isA(MapleJob.THIEF)) || (this.job.isA(MapleJob.GM)) || (this.job.isA(MapleJob.WIND_KNIGHT)) || (this.job.isA(MapleJob.NIGHT_KNIGHT))) {
            this.maxhp += rand(20, 24);
            this.maxmp += rand(14, 16);
        } else if ((this.job.isA(MapleJob.PIRATE)) || (this.job.isA(MapleJob.THIEF_KNIGHT))) {
            improvingMaxHP = SkillFactory.getSkill(5100000);
            improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            if (this.job.isA(MapleJob.GHOST_KNIGHT)) {
                improvingMaxHP = SkillFactory.getSkill(15100000);
                improvingMaxHPLevel = getSkillLevel(improvingMaxHP);
            }
            this.maxhp += rand(22, 26);
            this.maxmp += rand(18, 23);
        }
        if (improvingMaxHPLevel > 0) {
            this.maxhp += improvingMaxHP.getEffect(improvingMaxHPLevel).getX();
        }
        if (improvingMaxMPLevel > 0) {
            this.maxmp += improvingMaxMP.getEffect(improvingMaxMPLevel).getX();
        }
        this.maxmp += getTotalInt() / 10;
        this.exp.addAndGet(-ExpTable.getExpNeededForLevel(this.level + 1));
        this.level += 1;
        if (this.exp.get() > 0) {
            this.exp.set(0);
        }
        /**
         **
         * *******************************************
         * ****************<精灵的祝福>********************* 角色每10级该技能增加1点.最大为20.
         *
         * @精灵的祝福 20000012 @精灵的祝福 10000012
         * ****************<精灵的祝福>***********************
         */
        /**
         * ***************<冒险家职业群>****************
         */
        if (this.job.getId() >= 0 && this.job.getId() <= 522) {
            if (level == 10 || level == 110) { //十级升级祝福
                if (getSkillLevel(12) == 0 || getSkillLevel(12) == 10) {
                    gainjinglingskill(+1);
                    //this.jinglingskill += 1;
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 20 || level == 120) {
                if (getSkillLevel(12) == 1 || getSkillLevel(12) == 11) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 30 || level == 130) {
                if (getSkillLevel(12) == 2 || getSkillLevel(12) == 12) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 40 || level == 140) {
                if (getSkillLevel(12) == 3 || getSkillLevel(12) == 13) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 50 || level == 150) {
                if (getSkillLevel(12) == 4 || getSkillLevel(12) == 14) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 60 || level == 160) {
                if (getSkillLevel(12) == 5 || getSkillLevel(12) == 15) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 70 || level == 170) {
                if (getSkillLevel(12) == 6 || getSkillLevel(12) == 16) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 80 || level == 180) {
                if (getSkillLevel(12) == 7 || getSkillLevel(12) == 17) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 90 || level == 190) {
                if (getSkillLevel(12) == 8 || getSkillLevel(12) == 18) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 100 || level == 200) {
                if (getSkillLevel(12) == 9 || getSkillLevel(12) == 19) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(12), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
        }
        /**
         * ****************<骑士团>**************************
         */
        if (this.job.getId() >= 1000 && this.job.getId() <= 1411) {
            if (level == 10 || level == 110) { //十级升级祝福
                if (getSkillLevel(10000012) == 0 || getSkillLevel(10000012) == 10) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 20 || level == 120) {
                if (getSkillLevel(10000012) == 1 || getSkillLevel(10000012) == 11) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 30 || level == 130) {
                if (getSkillLevel(10000012) == 2 || getSkillLevel(10000012) == 12) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 40 || level == 140) {
                if (getSkillLevel(10000012) == 3 || getSkillLevel(10000012) == 13) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 50 || level == 150) {
                if (getSkillLevel(10000012) == 4 || getSkillLevel(10000012) == 14) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 60 || level == 160) {
                if (getSkillLevel(10000012) == 5 || getSkillLevel(10000012) == 15) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 70 || level == 170) {
                if (getSkillLevel(10000012) == 6 || getSkillLevel(10000012) == 16) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 80 || level == 180) {
                if (getSkillLevel(10000012) == 7 || getSkillLevel(10000012) == 17) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 90 || level == 190) {
                if (getSkillLevel(10000012) == 8 || getSkillLevel(10000012) == 18) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 100 || level == 200) {
                if (getSkillLevel(10000012) == 9 || getSkillLevel(10000012) == 19) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(10000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
        }
        /**
         * *****************<战神>****************
         */
        if (this.job.getId() >= 2000 && this.job.getId() <= 2112) {
            if (level == 10 || level == 110) { //十级升级祝福
                if (getSkillLevel(20000012) == 0 || getSkillLevel(20000012) == 10) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 20 || level == 120) {
                if (getSkillLevel(20000012) == 1 || getSkillLevel(20000012) == 11) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 30 || level == 130) {
                if (getSkillLevel(20000012) == 2 || getSkillLevel(20000012) == 12) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 40 || level == 140) {
                if (getSkillLevel(10000012) == 3 || getSkillLevel(20000012) == 13) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 50 || level == 150) {
                if (getSkillLevel(10000012) == 4 || getSkillLevel(20000012) == 14) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 60 || level == 160) {
                if (getSkillLevel(10000012) == 5 || getSkillLevel(20000012) == 15) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 70 || level == 170) {
                if (getSkillLevel(20000012) == 6 || getSkillLevel(20000012) == 16) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 80 || level == 180) {
                if (getSkillLevel(20000012) == 7 || getSkillLevel(20000012) == 17) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 90 || level == 190) {
                if (getSkillLevel(20000012) == 8 || getSkillLevel(20000012) == 18) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
            if (level == 100 || level == 200) {
                if (getSkillLevel(20000012) == 9 || getSkillLevel(20000012) == 19) {
                    gainjinglingskill(+1);
                    changeSkillLevel(SkillFactory.getSkill(20000012), getjinglingskill(), 20);
                } else {
                    dropMessage("技能 『精灵的祝福』 未知错误不能增加!");
                }
            }
        }
        /*
         * if (level == 10 && getSkillLevel(20000012) < 1 &&
         * getSkillLevel(10000012) < 1) { //10级
         * if(c.getPlayer().getjinglingskill() == 1000){
         *
         * }
         * changeSkillLevel(SkillFactory.getSkill(20000012), 1, 20);
         * changeSkillLevel(SkillFactory.getSkill(10000012), 1, 20);
         * dropMessage("等级达到10级.技能[精灵的祝福]增加1点."); } if (level == 20 &&
         * getSkillLevel(20000012) < 2 && getSkillLevel(10000012) < 2) { //20级
         * changeSkillLevel(SkillFactory.getSkill(20000012), 2, 20);
         * changeSkillLevel(SkillFactory.getSkill(10000012), 2, 20);
         * dropMessage("等级达到20级.技能[精灵的祝福]增加1点."); } if (level == 30 &&
         * getSkillLevel(20000012) < 3 && getSkillLevel(10000012) < 3) { //30级
         * changeSkillLevel(SkillFactory.getSkill(20000012), 3, 20);
         * changeSkillLevel(SkillFactory.getSkill(10000012), 3, 20);
         * dropMessage("等级达到30级.技能[精灵的祝福]增加1点."); } if (level == 40 &&
         * getSkillLevel(20000012) < 4 && getSkillLevel(10000012) < 4) { //40级
         * changeSkillLevel(SkillFactory.getSkill(20000012), 4, 20);
         * changeSkillLevel(SkillFactory.getSkill(10000012), 4, 20);
         * dropMessage("等级达到40级.技能[精灵的祝福]增加1点."); } if (level == 50 &&
         * getSkillLevel(20000012) < 5 && getSkillLevel(10000012) < 5) { //50级
         * changeSkillLevel(SkillFactory.getSkill(20000012), 5, 20);
         * changeSkillLevel(SkillFactory.getSkill(10000012), 5, 20);
         * dropMessage("等级达到40级.技能[精灵的祝福]增加1点.");
         * dropMessage("技能[精灵的祝福]已达到升级最大值！无法继续突破！请完成活动任务来提升该技能！");
         }
         */
        /**
         * *<升级祝贺系统>**
         */
        if (level == 200) {
            exp.set(0);
            MaplePacket packet = MaplePacketCreator.serverNotice(0, "祝贺 " + getName() + " 到达200级！");
            try {
                getClient().getChannelServer().getWorldInterface().broadcastMessage(getName(), packet.getBytes());
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
            }
        }
        maxhp = Math.min(30000, maxhp);
        maxmp = Math.min(30000, maxmp);

        List statup = new ArrayList(9);
        statup.add(new Pair(MapleStat.AVAILABLEAP, Integer.valueOf(this.remainingAp)));
        statup.add(new Pair(MapleStat.MAXHP, Integer.valueOf(this.maxhp)));
        statup.add(new Pair(MapleStat.MAXMP, Integer.valueOf(this.maxmp)));
        statup.add(new Pair(MapleStat.HP, Integer.valueOf(this.maxhp)));
        statup.add(new Pair(MapleStat.MP, Integer.valueOf(this.maxmp)));
        statup.add(new Pair(MapleStat.EXP, Integer.valueOf(this.exp.get())));
        statup.add(new Pair(MapleStat.LEVEL, Integer.valueOf(this.level)));
        statup.add(new Pair(MapleStat.STR, Integer.valueOf(getStr())));

        if (this.job != MapleJob.BEGINNER) {
            this.remainingSp += 3;
            statup.add(new Pair(MapleStat.AVAILABLESP, Integer.valueOf(this.remainingSp)));
        }

        setHp(this.maxhp);
        setMp(this.maxmp);
        if ((getJob().isA(MapleJob.GHOST_KNIGHT)) && (this.level <= 10)) {
            getClient().getSession().write(MaplePacketCreator.serverNotice(5, "恭喜你到达10级。可以转职了！"));
        }
        if (this.level >= 30) {
            finishAchievement(3);
        }
        if (this.level >= 70) {
            finishAchievement(4);
        }
        if (this.level >= 120) {
            finishAchievement(5);
        }
        if (this.level == 200) {
            finishAchievement(22);
        }

        getClient().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
        getMap().broadcastMessage(this, MaplePacketCreator.showLevelup(getId()), false);
        recalcLocalStats();
        silentPartyUpdate();
        guildUpdate();
        saveToDB(true);
    }

    public void changeKeybinding(int key, MapleKeyBinding keybinding) {
        if (keybinding.getType() != 0) {
            this.keymap.put(Integer.valueOf(key), keybinding);
        } else {
            this.keymap.remove(Integer.valueOf(key));
        }
    }

    public void sendKeymap() {
        getClient().getSession().write(MaplePacketCreator.getKeymap(this.keymap));
    }

    public void sendMacros() {
        boolean macros = false;
        for (int i = 0; i < 5; i++) {
            if (this.skillMacros[i] != null) {
                macros = true;
            }
        }
        if (macros) {
            getClient().getSession().write(MaplePacketCreator.getMacros(this.skillMacros));
        }
    }


    /*
     * public void clearMacros() { for (int i = 0; i < 5; i++) { SkillMacro
     * macro = new SkillMacro(0, 0, 0, "", 0, i); updateMacros(i, macro); }
     }
     */
    public void updateMacros(int position, SkillMacro updateMacro) {
        this.skillMacros[position] = updateMacro;
    }

    public void setWarning(int warning) {
        this.Warning = warning;
    }
    public int getWarning() {
        return Warning;
    }

    public void gainWarning(boolean warningEnabled, int gain) {
        setWarning(getWarning() + gain);
        MaplePacket packet = MaplePacketCreator.serverNotice(6, "截至目前  " + getName() + ":该用户的警告量是: " + this.Warning + " 次！");
        if (warningEnabled == true) {
            switch (getWarning()) {
                case 1: //Warning 1	
                    new ServernoticeMapleClientMessageCallback(5, getClient()).dropMessage("这是你的第一次警告！请注意在游戏中勿使用非法程序！");
                    break;
                case 2: //Warning 2
                    new ServernoticeMapleClientMessageCallback(5, getClient()).dropMessage("警告现在是第 " + Warning + " 次。如果你再得到一次警告就会封号封IP！");
                    break;
                case 3: //Warning 3
                    ban("由于警告次数超过: " + Warning + "此，现封号封IP处理！");
                    setWarning(0);
                    break;
            }
        }
    }

    public void tempban(String reason, Calendar duration, int greason) {
        if (this.lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        tempban(reason, duration, greason, this.client.getAccID());
        this.banned = true;
        this.client.disconnect();
    }

    public static boolean tempban(String reason, Calendar duration, int greason, int accountid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET tempban = ?, banreason = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(duration.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setString(2, reason);
            ps.setInt(3, greason);
            ps.setInt(4, accountid);
            ps.executeUpdate();
            ps.close();
            return true;
        } catch (SQLException ex) {
            log.error("Error while tempbanning", ex);
        }
        return false;
    }

    public void ban(String reason) {
        if (this.lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        PreparedStatement ps = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE id = ?");
            ps.setInt(1, 1);
            ps.setString(2, reason);
            ps.setInt(3, this.accountid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error while banning", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        this.banned = true;
        this.client.disconnect();
    }

    public void Dci() {
        this.client.disconnect();
    }

    public static boolean ban(String id, String reason, boolean account) {
        try {
            Connection con = DatabaseConnection.getConnection();

            if (id.matches("/[0-9]{1,3}\\..*")) {
                PreparedStatement ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, id);
                ps.executeUpdate();
                ps.close();
                return true;
            }
            PreparedStatement ps;
            if (account) {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            } else {
                ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            }
            boolean ret = false;
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int accountId = rs.getInt(1);
                PreparedStatement psb = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE id = ?");
                psb.setString(1, reason);
                psb.setInt(2, accountId);
                psb.executeUpdate();
                psb.close();

                psb = con.prepareStatement("SELECT ip FROM iplog WHERE accountid = ? ORDER by login DESC LIMIT 1");
                psb.setInt(1, accountId);
                ResultSet rsb = psb.executeQuery();
                rsb.next();
                String to = "/" + rsb.getString("ip");
                rsb.close();
                psb.close();

                psb = con.prepareStatement("SELECT ip FROM ipbans WHERE ip = ?");
                psb.setString(1, to);
                rsb = psb.executeQuery();
                if (!rsb.next()) {
                    PreparedStatement psc = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                    psc.setString(1, to);
                    psc.executeUpdate();
                    psc.close();
                }
                rsb.close();
                psb.close();

                psb = con.prepareStatement("SELECT macs FROM accounts WHERE id = ?");
                psb.setInt(1, accountId);
                rsb = psb.executeQuery();
                rsb.next();
                String macAddress = rsb.getString("macs");
                if (!macAddress.matches("")) {
                    String[] macs = macAddress.split(", ");
                    for (int i = 0; i < macs.length; i++) {
                        PreparedStatement psc = con.prepareStatement("SELECT mac FROM macbans WHERE mac = ?");
                        psc.setString(1, macs[i]);
                        ResultSet rsc = psc.executeQuery();
                        if (!rsc.next()) {
                            PreparedStatement psd = con.prepareStatement("INSERT INTO macbans (mac) VALUES (?)");
                            psd.setString(1, macs[i]);
                            psd.executeUpdate();
                            psd.close();
                        }
                        rsc.close();
                        psc.close();
                    }
                }
                rsb.close();
                psb.close();
                ret = true;
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException ex) {
            log.error("Error while banning", ex);
        }
        return false;
    }

    public static int getAccIdFromCharName(String name) {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                return -1;
            }
            int id_ = rs.getInt("accountid");
            ps.close();
            return id_;
        } catch (SQLException e) {
            log.error("ERROR", e);
        }
        return -1;
    }

    public int getObjectId() {
        return getId();
    }

    public void setObjectId(int id) {
        throw new UnsupportedOperationException();
    }

    public MapleStorage getStorage() {
        return this.storage;
    }

    public int getCurrentMaxHp() {
        return this.localmaxhp;
    }

    public int getCurrentMaxMp() {
        return this.localmaxmp;
    }

    public int getCurrentMaxBaseDamage() {
        return this.localmaxbasedamage;
    }

    public int getwatk() {
        return this.watk;
    }

    public int calculateMaxBaseDamage(int watk) {
        //int maxbasedamage;
        if (watk <= 0) {
            this.localmaxbasedamage = (int) 1.0F;
            //  maxbasedamage = 1;
        } else {
            IItem weapon_item = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
            boolean barefists = (weapon_item == null) && ((getJob().isA(MapleJob.PIRATE)) || (getJob().isA(MapleJob.THIEF_KNIGHT)));
            if ((weapon_item != null) || (getJob().isA(MapleJob.PIRATE)) || (getJob().isA(MapleJob.THIEF_KNIGHT))) {
                MapleWeaponType weapon = barefists ? MapleWeaponType.KNUCKLE : MapleItemInformationProvider.getInstance().getWeaponType(weapon_item.getItemId());
                int secondarystat;
                int mainstat;
                if ((weapon == MapleWeaponType.BOW) || (weapon == MapleWeaponType.CROSSBOW)) {
                    mainstat = this.localdex;
                    secondarystat = this.localstr;
                } else {
                    if (((getJob().isA(MapleJob.THIEF)) || (getJob().isA(MapleJob.NIGHT_KNIGHT))) && ((weapon == MapleWeaponType.CLAW) || (weapon == MapleWeaponType.DAGGER))) {
                        mainstat = this.localluk;
                        secondarystat = this.localdex + this.localstr;
                    } else {
                        if (((getJob().isA(MapleJob.PIRATE)) || (getJob().isA(MapleJob.THIEF_KNIGHT))) && (weapon == MapleWeaponType.GUN)) {
                            mainstat = this.localdex;
                            secondarystat = this.localstr;
                        } else {
                            if (((getJob().isA(MapleJob.PIRATE)) || (getJob().isA(MapleJob.THIEF_KNIGHT))) && (weapon == MapleWeaponType.KNUCKLE)) {
                                mainstat = this.localstr;
                                secondarystat = this.localdex;
                            } else {
                                if ((getJob().getId() >= 200 && getJob().getId() <= 232) || (getJob().getId() >= 1200 && getJob().getId() <= 1211) && ((weapon == MapleWeaponType.WAND) || (weapon == MapleWeaponType.STAFF))) {
                                    mainstat = this.localint_;
                                    secondarystat = this.localluk;
                                } else {
                                    mainstat = this.localstr;
                                    secondarystat = this.localdex;
                                }

                            }
                        }
                    }
                }
                localmaxbasedamage = (int) ((weapon.getMaxDamageMultiplier() * (mainstat + secondarystat)) * (watk / 100.0F));
                localmaxbasedamage += 10;
            } else {
                localmaxbasedamage = 0;
            }
        }
        //////System.out.println(localmaxbasedamage+"最大攻击力");
        return localmaxbasedamage;
    }

    public void addVisibleMapObject(MapleMapObject mo) {
        this.visibleMapObjects.add(mo);
    }

    public void removeVisibleMapObject(MapleMapObject mo) {
        this.visibleMapObjects.remove(mo);
    }

    public boolean isMapObjectVisible(MapleMapObject mo) {
        return this.visibleMapObjects.contains(mo);
    }

    public Collection<MapleMapObject> getVisibleMapObjects() {
        return Collections.unmodifiableCollection(this.visibleMapObjects);
    }

    public boolean isAlive() {
        return this.hp > 0;
    }

    public void setSlot(int slotid) {
        this.slots = slotid;
    }

    public int getSlot() {
        return this.slots;
    }

    public int getCygnusLinkId() {
        return this.cygnusLinkId;
    }

    public boolean hasBattleShip() {
        try {
            LinkedList<MapleBuffStatValueHolder> allBuffs = new LinkedList(this.effects.values());
            for (MapleBuffStatValueHolder mbsvh : allBuffs) {
                if (mbsvh.effect.getSourceId() == 5221006) {
                    return true;
                }
            }
        } catch (Exception ex) {
            return false;
        }
        return false;
    }

    public void resetBattleshipHp() {
        this.battleshipHp = 4000 * getSkillLevel(SkillFactory.getSkill(5221006)) + ((getLevel() - 120) * 2000);
    }

    public void sendDestroyData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.removePlayerFromMap(getObjectId()));
    }

    public int getBattleshipHp() {
        return battleshipHp;
    }

    public void sendSpawnData(MapleClient client) {
        if (((isHidden()) && (client.getPlayer().gmLevel() > 0)) || (!isHidden())) {
            client.getSession().write(MaplePacketCreator.spawnPlayerMapobject(this));
            for (MaplePet pett : this.pets) {
                getMap().broadcastMessage(this, MaplePacketCreator.showPet(this, pett, false, false), false);
            }
        }
    }

    private void recalcLocalStats() {//人物面板
        int oldmaxhp = this.localmaxhp;
        this.localmaxhp = getMaxHp();
        this.localmaxmp = getMaxMp();
        this.localdex = getDex();
        this.localint_ = getInt();
        this.localstr = getStr();
        this.localluk = getLuk();
        int speed = 100;
        int jump = 100;
        this.magic = this.localint_;
        this.watk = 0;
        for (IItem item : getInventory(MapleInventoryType.EQUIPPED)) {
            IEquip equip = (IEquip) item;
            this.localmaxhp += equip.getHp();
            this.localmaxmp += equip.getMp();
            this.localdex += equip.getDex();
            this.localint_ += equip.getInt();
            this.localstr += equip.getStr();
            this.localluk += equip.getLuk();
            this.magic += equip.getMatk() + equip.getInt();
            this.watk += equip.getWatk();
            speed += equip.getSpeed();
            jump += equip.getJump();
        }
        IItem weapon = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);
        if ((weapon == null) && (getJob().isA(MapleJob.PIRATE))) {
            this.watk += 8;
        }
        this.magic = Math.min(this.magic, 2000);
        Integer hbhp = getBuffedValue(MapleBuffStat.HYPERBODYHP);
        if (hbhp != null) {
            this.localmaxhp = (int) (this.localmaxhp + hbhp.doubleValue() / 100.0D * this.localmaxhp);
        }
        Integer hbmp = getBuffedValue(MapleBuffStat.HYPERBODYMP);
        if (hbmp != null) {
            this.localmaxmp = (int) (this.localmaxmp + hbmp.doubleValue() / 100.0D * this.localmaxmp);
        }
        this.localmaxhp = Math.min(30000, this.localmaxhp);
        this.localmaxmp = Math.min(30000, this.localmaxmp);
        Integer watkbuff = getBuffedValue(MapleBuffStat.WATK);
        if (watkbuff != null) {
            this.watk += watkbuff.intValue();
        }
        if (this.job.isA(MapleJob.BOWMAN)) {
            ISkill expert = null;
            if (this.job.isA(MapleJob.CROSSBOWMASTER)) {
                expert = SkillFactory.getSkill(3220004);
            } else if (this.job.isA(MapleJob.BOWMASTER)) {
                expert = SkillFactory.getSkill(3120005);
            }
            if (expert != null) {
                int boostLevel = getSkillLevel(expert);
                if (boostLevel > 0) {
                    this.watk += expert.getEffect(boostLevel).getX();
                }
            }
        }
        Integer matkbuff = getBuffedValue(MapleBuffStat.MATK);
        if (matkbuff != null) {
            this.magic += matkbuff.intValue();
        }
        Integer speedbuff = getBuffedValue(MapleBuffStat.SPEED);
        if (speedbuff != null) {
            speed += speedbuff.intValue();
        }
        Integer jumpbuff = getBuffedValue(MapleBuffStat.JUMP);
        if (jumpbuff != null) {
            jump += jumpbuff.intValue();
        }
        if (speed > 140) {
            speed = 140;
        }
        if (jump > 123) {
            jump = 123;
        }
        this.speedMod = (speed / 100.0D);
        this.jumpMod = (jump / 100.0D);
        Integer mount = getBuffedValue(MapleBuffStat.骑宠技能);
        if (mount != null) {
            this.jumpMod = 1.23D;
            switch (mount.intValue()) {
                case 1:
                    this.speedMod = 1.5D;
                    break;
                case 2:
                    this.speedMod = 1.7D;
                    break;
                case 3:
                    this.speedMod = 1.8D;
                    break;
                case 5:
                    this.speedMod = 1.0D;
                    this.jumpMod = 1.0D;
                    break;
                case 4:
                default:
                    this.speedMod = 2.0D;
            }
        }
        Integer mWarrior = getBuffedValue(MapleBuffStat.MAPLE_WARRIOR);
        if (mWarrior != null) {
            this.localstr = (int) (this.localstr + mWarrior.doubleValue() / 100.0D * this.localstr);
            this.localdex = (int) (this.localdex + mWarrior.doubleValue() / 100.0D * this.localdex);
            this.localint_ = (int) (this.localint_ + mWarrior.doubleValue() / 100.0D * this.localint_);
            this.localluk = (int) (this.localluk + mWarrior.doubleValue() / 100.0D * this.localluk);
        }
            this.localmaxbasedamage = calculateMaxBaseDamage(this.watk);
        if ((oldmaxhp != 0) && (oldmaxhp != this.localmaxhp)) {
            updatePartyMemberHP();
        }
    }

    public void Mount(int id, int skillid) {
        this.maplemount = new MapleMount(this, id, skillid);
    }

    public MapleMount getMount() {
        return this.maplemount;
    }

    /**
     * 物品改变后
     */
    public void equipChanged() {
        //
        getMap().broadcastMessage(this, MaplePacketCreator.updateCharLook(this), false);
        recalcLocalStats();
        enforceMaxHpMp();
        if (getClient().getPlayer().getMessenger() != null) {
            WorldChannelInterface wci = ChannelServer.getInstance(getClient().getChannel()).getWorldInterface();
            try {
                wci.updateMessenger(getClient().getPlayer().getMessenger().getId(), getClient().getPlayer().getName(), getClient().getChannel());
            } catch (RemoteException e) {
                getClient().getChannelServer().reconnectWorld();
            }
        }
    }

    public FameStatus canGiveFame(MapleCharacter from) {
        if (this.lastfametime >= System.currentTimeMillis() - 86400000L) {
            return FameStatus.NOT_TODAY;
        }
        if (this.lastmonthfameids.contains(Integer.valueOf(from.getId()))) {
            return FameStatus.NOT_THIS_MONTH;
        }
        return FameStatus.OK;
    }

    public void hasGivenFame(MapleCharacter to) {
        this.lastfametime = System.currentTimeMillis();
        this.lastmonthfameids.add(Integer.valueOf(to.getId()));
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("INSERT INTO famelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, getId());
            ps.setInt(2, to.getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("ERROR writing famelog for char " + getName() + " to " + to.getName(), ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public MapleParty getParty() {
        return this.party;
    }

    public int getPartyId() {
        return this.party != null ? this.party.getId() : -1;
    }

    public boolean getPartyInvited() {
        return this.partyInvite;
    }

    public void setPartyInvited(boolean invite) {
        this.partyInvite = invite;
    }

    public long getLastSave() {
        return this.lastSave;
    }

    public void setLastSave(long lastSave) {
        this.lastSave = lastSave;
    }

    public boolean isMuted() {
        if (Calendar.getInstance().after(this.unmuteTime)) {
            this.muted = false;
        }
        return this.muted;
    }

    public void setMuted(boolean mute) {
        this.muted = mute;
    }

    public void setUnmuteTime(Calendar time) {
        this.unmuteTime = time;
    }

    public Calendar getUnmuteTime() {
        return this.unmuteTime;
    }

    public int getWorld() {
        return this.world;
    }

    public void setWorld(int world) {
        this.world = world;
    }

    public void setParty(MapleParty party) {
        this.party = party;
    }

    public int getVanquisherKills() {
        return this.vanquisherKills;
    }

    public int getVanquisherStage() {
        return this.vanquisherStage;
    }

    public void setVanquisherKills(int x) {
        this.vanquisherKills = x;
    }

    public void setVanquisherStage(int x) {
        this.vanquisherStage = x;
    }

    public MapleTrade getTrade() {
        return this.trade;
    }

    public void setTrade(MapleTrade trade) {
        this.trade = trade;
    }

    public EventInstanceManager getEventInstance() {
        return this.eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public void addDoor(MapleDoor door) { //添加门
        this.doors.add(door);
    }

    public void clearDoors() {
        this.doors.clear();
    }

    public List<MapleDoor> getDoors() {
        return new ArrayList(this.doors);
    }

    public boolean canDoor() {
        return this.canDoor;
    }

    public void disableDoor() { //关闭门
        this.canDoor = false;
        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                canDoor = true;
            }
        }, 5000L);
    }

    public MapleInventory[] getAllInventories() {
        return this.inventory;
    }

    public Map<Integer, MapleSummon> getSummons() {
        return this.summons;
    }

    public int getChair() {
        return this.chair;
    }

    public int getItemEffect() {
        return this.itemEffect;
    }

    public int getbosschongfan() {
        return this.bosschongfan;
    }

    public void setbosschongfan() {
        this.bosschongfan = bosschongfan;
    }

    public void setChair(int chair) {
        this.chair = chair;
    }

    public void setItemEffect(int itemEffect) {
        this.itemEffect = itemEffect;
    }

    public Collection<MapleInventory> allInventories() {
        return Arrays.asList(this.inventory);
    }

    public MapleMapObjectType getType() {
        return MapleMapObjectType.PLAYER;
    }

    public MapleGuild getGuild() {
        try {
            return getClient().getChannelServer().getWorldInterface().getGuild(getGuildId(), this.mgc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public int getGuildId() {
        return this.guildid;
    }

    public int getGuildRank() {
        return this.guildrank;
    }

    public void setGuildId(int _id) {
        this.guildid = _id;
        if (this.guildid > 0) {
            if (this.mgc == null) {
                this.mgc = new MapleGuildCharacter(this);
            } else {
                this.mgc.setGuildId(this.guildid);
            }
        } else {
            this.mgc = null;
        }
    }

    public void setGuildRank(int _rank) {
        this.guildrank = _rank;
        if (this.mgc != null) {
            this.mgc.setGuildRank(_rank);
        }
    }

    public MapleGuildCharacter getMGC() {
        return this.mgc;
    }

    public void guildUpdate() {
        if (this.guildid <= 0) {
            return;
        }

        this.mgc.setLevel(this.level);
        this.mgc.setJobId(this.job.getId());
        try {
            this.client.getChannelServer().getWorldInterface().memberLevelJobUpdate(this.mgc);
        } catch (RemoteException re) {
            log.error("RemoteExcept while trying to update level/job in guild.", re);
        }
    }
    
    public boolean isBeginnerJob() {
        return ((getJob() == MapleJob.BEGINNER) || (getJob() == MapleJob.KNIGHT) || (getJob() == MapleJob.Ares));
    }

    public String guildCost() {
        return this.nf.format(6000000L);
    }

    public String emblemCost() {
        return this.nf.format(10000000L);
    }

    public String capacityCost() {
        return this.nf.format(5000000L);
    }

    public void genericGuildMessage(int code) {
        this.client.getSession().write(MaplePacketCreator.genericGuildMessage((byte) code));
    }

    public void disbandGuild() {
        if ((this.guildid <= 0) || (this.guildrank != 1)) {
            log.warn(this.name + " tried to disband and he/she is either not in a guild or not leader.");
            return;
        }
        try {
            this.client.getChannelServer().getWorldInterface().disbandGuild(this.guildid);
        } catch (Exception e) {
            log.error("Error while disbanding guild.", e);
        }
    }

    public void increaseGuildCapacity() {
        if (getMeso() < 5000000) {
            this.client.getSession().write(MaplePacketCreator.serverNotice(1, "You do not have enough mesos."));
            return;
        }

        if (this.guildid <= 0) {
            log.info(this.name + " 试图增加公会的能力不在公会.");
            return;
        }
        try {
            this.client.getChannelServer().getWorldInterface().increaseGuildCapacity(this.guildid);
        } catch (Exception e) {
            log.error("同时增加容量误差.", e);
            return;
        }

        gainMeso(-5000000, true, false, true);
    }

    public void saveGuildStatus() {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("UPDATE characters SET guildid = ?, guildrank = ? WHERE id = ?");
            ps.setInt(1, this.guildid);
            ps.setInt(2, this.guildrank);
            ps.setInt(3, this.id);
            ps.execute();
            ps.close();
        } catch (SQLException ex) {
            log.error("SQL error: " + ex.getLocalizedMessage(), ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void setAllianceRank(int rank) {
        this.allianceRank = rank;
        if (this.mgc != null) {
            this.mgc.setAllianceRank(rank);
        }
    }

    public int getAllianceRank() {
        return this.allianceRank;
    }

    public void modifyCSPoints(int type, int quantity) {
        switch (type) {
            case 0:
                this.paypalnx += quantity;
                break;
            case 1:
                this.mPoints += quantity;
                break;
            case 4:
                this.cardnx += quantity;
            case 2:
            	this.mPoints += quantity;
            case 3:
        }
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 0:
                return this.paypalnx;
            case 1:
                return this.mPoints;
            case 2:
            	return this.mPoints;
            case 3:
            	return 99999;
            case 4:
                return this.cardnx;
        }
        return 0;
    }

    public boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean exact) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = this.inventory[type.ordinal()];
        int possessed = iv.countById(itemid);
        if (checkEquipped) {
            possessed += this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        if (exact) {
            return possessed == quantity;
        }
        return possessed >= quantity;
    }

    public boolean haveItem(int[] itemids, int quantity, boolean exact) {
        for (int itemid : itemids) {
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
            MapleInventory iv = this.inventory[type.ordinal()];
            int possessed = iv.countById(itemid);
            possessed += this.inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
            if (possessed >= quantity) {
                if (exact) {
                    if (possessed == quantity) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }
///////////////////////////高级任务函数包//////////////////////////////////////

    public int[] StringtoInt(String str) {
        int ret[] = new int[100]; //最大支持100个前置条件参数
        StringTokenizer toKenizer = new StringTokenizer(str, ",");
        String[] strx = new String[toKenizer.countTokens()];
        for (int i = 0; i < toKenizer.countTokens(); i++) {
            strx[i] = toKenizer.nextToken();
            ret[i] = Integer.valueOf(strx[i]);
        }
        return ret;
    }

    //高级任务系统 - 检查基础条件是否符合所有任务前置条件
    public boolean MissionCanMake(int missionid) {
        boolean ret = true;
        for (int i = 1; i < 5; i++) {
            if (!MissionCanMake(missionid, i)) { //检查每一个任务条件是否满足
                ret = false;
            }
        }
        return ret;
    }

    //高级任务系统 - 检查基础条件是否符合指定任务前置条件
    public boolean MissionCanMake(int missionid, int checktype) {
        //checktype
        //1 检查等级范围
        //2 检查职业
        //3 检查物品
        //4 检查前置任务
        boolean ret = false;
        int minlevel = -1, maxlevel = -1; //默认不限制接任务的等级范围
        String joblist = "all", itemlist = "none", prelist = "none"; //默认所有职业可以接，默认不需要任何前置物品和任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1: //判断级别是否符合要求
                    if (minlevel > -1 && maxlevel > -1) { //双范围检查
                        if (getLevel() >= minlevel && getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel > -1 && maxlevel == -1) { //只有最小限制
                        if (getLevel() >= minlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel > -1) { //只有最大限制
                        if (getLevel() <= maxlevel) {
                            ret = true;
                        }
                    } else if (minlevel == -1 && maxlevel == -1) { //如果是默认值-1，表示任何等级都可以接
                        ret = true;
                    }
                    break;
                case 2: //检查职业是否符合要求
                    if (joblist.equals("all")) { //所有职业多可以接
                        ret = true;
                    } else {
                        for (int i : StringtoInt(joblist)) {
                            if (getJobID() == i) { //只要自己的职业ID在这个清单里，就是符合要求，立即跳出检查
                                ret = true;
                                break;
                            }
                        }
                    }
                    break;
                case 3: //检查前置物品是否有
                    if (itemlist.equals("none")) { //没有前置物品要求
                        ret = true;
                    } else {
                        for (int i : StringtoInt(itemlist)) {
                            if (!haveItem(i)) { //如果没有清单里要求的物品，立即跳出检查
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
                case 4: //检查前置任务是否有完成
                    if (prelist.equals("none")) { //前置任务是否完成
                        ret = true;
                    } else {
                        for (int i : StringtoInt(prelist)) {
                            if (!MissionStatus(getId(), i, 0, 1)) { //如果要求的前置任务没完成或从来没接过，立即跳出检查
                                ret = false;
                                break;
                            }
                        }
                    }
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionCanMake:", ex);
        }
        return ret;
    }

    //高级任务函数 - 得到任务的等级数据
    public int MissionGetIntData(int missionid, int checktype) {
        //checktype
        //1 最小等级
        //2 最大等级
        int ret = -1;
        int minlevel = -1, maxlevel = -1;
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                minlevel = rs.getInt("minlevel");
                maxlevel = rs.getInt("maxlevel");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1:
                    ret = minlevel;
                    break;
                case 2:
                    ret = maxlevel;
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionGetIntData:", ex);
        }
        return ret;
    }

    //高级任务函数 - 得到任务的的字符串型数据
    public String MissionGetStrData(int missionid, int checktype) {
        //checktype
        //1 任务名称
        //2 职业列表
        //3 物品列表
        //4 前置任务列表
        String ret = "";
        String missionname = "", joblist = "all", itemlist = "none", prelist = "none"; //默认所有职业可以接，默认不需要任何前置物品和任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionlist WHERE missionid = ?");
            ps.setInt(1, missionid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                missionname = rs.getString("missionname");
                joblist = rs.getString("joblist");
                itemlist = rs.getString("itemlist");
                prelist = rs.getString("prelist");
            }
            rs.close();
            ps.close();
            //判断检查条件是否吻合
            switch (checktype) {
                case 1:
                    ret = missionname;
                    break;
                case 2:
                    ret = joblist;
                    break;
                case 3:
                    ret = itemlist;
                    break;
                case 4:
                    ret = prelist;
                    break;
            }
        } catch (SQLException ex) {
            log.error("Error MissionCanMake:", ex);
        }
        return ret;
    }

    //高级任务函数 - 直接输出需要的职业列表串
    public String MissionGetJoblist(String joblist) {
        String ret = "", jobname = "";
        PreparedStatement ps;
        Connection con = DatabaseConnection.getConnection();
        try {
            for (int i : StringtoInt(joblist)) {
                ps = con.prepareStatement("SELECT * FROM joblist WHERE id = ?");
                ps.setInt(1, i);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    jobname = jobname + "," + rs.getString("jobname");
                }
                rs.close();
                ps.close();
            }
        } catch (SQLException ex) {
            log.error("Error MissionGetJoblist:", ex);
        }
        return ret;
    }

    //高级任务系统 - 任务创建
    public void MissionMake(int charid, int missionid, int repeat, int repeattime, int lockmap, int mobid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO missionstatus VALUES (DEFAULT, ?, ?, ?, ?, ?, 0, DEFAULT, 0, 0, ?, 0, 0)");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.setInt(3, repeat);
            ps.setInt(4, repeattime);
            ps.setInt(5, lockmap);
            ps.setInt(6, mobid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMake:", ex);
        }
    }

    //高级任务系统 - 重新做同一个任务
    public void MissionReMake(int charid, int missionid, int repeat, int repeattime, int lockmap) {
        int finish = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `repeat` = ?, repeattime = ?, lockmap = ?, finish = ?, minnum = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, repeat);
            ps.setInt(2, repeattime);
            ps.setInt(3, lockmap);
            ps.setInt(4, finish);
            ps.setInt(5, missionid);
            ps.setInt(6, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionFinish:", ex);
        }
    }

    //高级任务系统 - 任务完成
    public void MissionFinish(int charid, int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET finish = 1, lastdate = CURRENT_TIMESTAMP(), times = times+1, lockmap = 0 WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionFinish:", ex);
        }
    }

    //高级任务系统 - 放弃任务
    public void MissionDelete(int charid, int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionDelete:", ex);
        }
    }

    //高级任务系统 - 增加指定任务的打怪数量
    public void MissionAddMinNum(int missionid, int addnum) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `minnum` = `minnum` + ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, addnum);
            ps.setInt(2, missionid);
            ps.setInt(3, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionAddNum:", ex);
        }
    }

    //高级任务系统 - 指定任务的需要最大打怪数量
    public void MissionMaxNum(int missionid, int maxnum) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE missionstatus SET `maxnum` = ? WHERE missionid = ? and charid = ?");
            ps.setInt(1, maxnum);
            ps.setInt(2, missionid);
            ps.setInt(3, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMaxNum:", ex);
        }
    }

    public void MissionMob(int mobid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM missionstatus WHERE charid = ? and mobid = ?");
            ps.setInt(1, getId());
            ps.setInt(2, mobid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) { //所有属于相同怪的任务，都会自动加
                if (rs.getInt("minnum") < rs.getInt("maxnum")) { //打怪数小于需要的总数
                    MissionAddMinNum(rs.getInt("missionid"), 1); //给这个打怪数加1
                    dropMessage("高级任务 [" + MissionGetStrData(rs.getInt("missionid"), 1) + "-" + rs.getInt("missionid") + "]  完成条件 [" + rs.getInt("minnum") + "/" + rs.getInt("maxnum") + "]");
                } else {
                    MissionFinish(getId(), rs.getInt("missionid")); //自动完成任务
                    startMapEffect("高级任务 [" + MissionGetStrData(rs.getInt("missionid"), 1) + "-" + rs.getInt("missionid") + "]  任务完成！", 5120025); //任务完成有提示
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionMob:", ex);
        }
    }

    //高级任务系统 - 放弃所有未完成任务
    public void MissionDeleteNotFinish(int charid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM missionstatus WHERE finish = 0 and charid = ?");
            ps.setInt(1, charid);
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Error MissionDeleteNotFinish:", ex);
        }
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1, false, true);
    }

    public int getJobID() { //得到职业ID
        return job.getId();
    }

    //高级任务系统 - 获得任务是否可以做
    public boolean MissionStatus(int charid, int missionid, int maxtimes, int checktype) {
        // checktype
        // 0 检查此任务是否被完成了
        // 1 检查此任务是否允许重复做
        // 2 检查此任务重复做的时间间隔是否到
        // 3 检查此任务是否到达最大的任务次数
        // 4 检查是否接过此任务，即是否第一次做这个任务
        // 5 检查是否接了锁地图传送的任务
        boolean ret = false; //默认是可以做
        int MissionMake = 0; //默认是没有接过此任务
        long now = 0;
        long t = 0;
        Timestamp lastdate;
        int repeat = 0;
        int repeattime = 0;
        int finish = 0;
        int times = 0;
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            if (checktype == 5) {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE lockmap = 1 and charid = ?");
                ps.setInt(1, charid);
            } else {
                ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
                ps.setInt(1, missionid);
                ps.setInt(2, charid);
            }
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                lastdate = rs.getTimestamp("lastdate");
                repeat = rs.getInt("repeat");
                repeattime = rs.getInt("repeattime");
                finish = rs.getInt("finish");
                times = rs.getInt("times");
                t = lastdate.getTime();
                now = System.currentTimeMillis();
                MissionMake = 1; //标明这个任务已经接过了
            }
            rs.close();
            ps.close();
            //判断检查状态类型
            switch (checktype) {
                case 0:
                    if (finish == 1) {
                        ret = true;
                    }
                    break;
                case 1:
                    if (repeat == 1) {
                        ret = true;
                    }
                    break;
                case 2:
                    if (now - t > repeattime) { // 判断如果有没有到指定的重复做任务间隔时间
                        //已经到了间隔时间
                        ret = true;
                    }
                    break;
                case 3:
                    if (times >= maxtimes) {
                        //任务到达最大次数
                        ret = true;
                    }
                    break;
                case 4:
                    if (MissionMake == 1) {
                        //此任务已经接过了
                        ret = true;
                    }
                    break;
                case 5:
                    if (MissionMake == 1) {
                        //已经接了锁地图的任务
                        ret = true;
                    }
            }
        } catch (SQLException ex) {
            log.error("Error MissionStatus:", ex);
        }
        return ret;
    }
    //闯关任务 - 接任务

    public void TaskMake(int missionid) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO missionstatus VALUES (DEFAULT, ?, ?, 0, 0, 0, 0, DEFAULT, 0, 0, 0, 0, 0)");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误创建闯关任务:", ex);
        }
    }
    //闯关任务 - 检查是否接过任务

    public boolean TaskStatus(int missionid) {
        boolean ret = false; //默认是没有接过任务
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = true; //标明这个任务已经接过了
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误读取闯关任务状态:", ex);
        }
        return ret;
    }
    //闯关任务 - 得到当前关卡积分
    public int TaskExp(int missionid) {
        int ret = 0; //默认是0积分
        try {
            PreparedStatement ps;
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("SELECT * FROM missionstatus WHERE missionid = ? and charid = ?");
            ps.setInt(1, missionid);
            ps.setInt(2, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = rs.getInt("exp"); //得到积分
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("错误读取闯关任务积分:", ex);
        }
        return ret;
    }

    public int getItemAmount(int itemid) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = this.inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        return possesed;
    }

    public MapleCSInventory getCSInventory() {
        if (this.csinventory == null) {
            this.csinventory = new MapleCSInventory(this);
        }
        return this.csinventory;
    }

    public void cherryTempBan(String reason, Calendar duration, int greason) {
        if (this.lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        tempban(reason, duration, greason, this.client.getAccID());
    }

    public void expirationTask() {
        Timestamp currenttime = new Timestamp(System.currentTimeMillis());
        List<IItem> toberemove = new ArrayList<IItem>();
        for (MapleInventory inv : inventory) {
            for (IItem item : inv.list()) {
                Timestamp expiration = item.getExpiration();
                if (expiration != null) {
                    if (!currenttime.after(expiration)) {
                        client.getSession().write(MaplePacketCreator.itemExpired(item.getItemId()));
                        toberemove.add(item);
                    }
                }
            }
            for (IItem item : toberemove) {
                MapleInventoryManipulator.removeFromSlot(client, inv.getType(), item.getPosition(), item.getQuantity(), true);
            }
            toberemove.clear();
        }
    }

    public void forceUpdateItem(MapleInventoryType type, IItem item) {
        /*
         * this.client.getSession().write(MaplePacketCreator.clearInventoryItem(type,
         * item.getPosition(), false));
         * this.client.getSession().write(MaplePacketCreator.addInventorySlot(type,
         * item, false));
         */
        this.client.getSession().write(MaplePacketCreator.dropInventoryItemUpdate(type, item));
        this.client.getSession().write(MaplePacketCreator.updateEquipSlot(item));
    }

    public int getBuddyCapacity() {
        return this.buddylist.getCapacity();
    }

    public void setBuddyCapacity(int capacity) {
        this.buddylist.setCapacity(capacity);
        this.client.getSession().write(MaplePacketCreator.updateBuddyCapacity(capacity));
    }

    public MapleMessenger getMessenger() {
        return this.messenger;
    }

    public void setMessenger(MapleMessenger messenger) {
        this.messenger = messenger;
    }

    public void startCygnusIntro() {
        this.client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(true));
        this.client.getSession().write(MaplePacketCreator.CygnusIntroLock(true));
        saveLocation(SavedLocationType.CYGNUSINTRO);

        MapleMap introMap = this.client.getChannelServer().getMapFactory().getMap(913040000); 
        changeMap(introMap, introMap.getPortal(0));

        TimerManager.getInstance().schedule(new Runnable() {
            public void run() {
                MapleCharacter.this.client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(false));
                MapleCharacter.this.client.getSession().write(MaplePacketCreator.CygnusIntroLock(false));
            }
        }, 54000L);
    }

    public void startCygnusIntro_3() {
        this.client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(true));
        this.client.getSession().write(MaplePacketCreator.CygnusIntroLock(true));
        saveLocation(SavedLocationType.CYGNUSINTRO);

        MapleMap introMap = this.client.getChannelServer().getMapFactory().getMap(0);
        changeMap(introMap, introMap.getPortal(0));

        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                MapleCharacter.this.client.getSession().write(MaplePacketCreator.CygnusIntroDisableUI(false));
                MapleCharacter.this.client.getSession().write(MaplePacketCreator.CygnusIntroLock(false));
            }
        }, 15000L);
    }

    public void checkMessenger() {
        if ((this.messenger == null) || (this.messengerposition >= 4) || (this.messengerposition <= -1)) {
            return;
        }
        try {
            WorldChannelInterface wci = ChannelServer.getInstance(this.client.getChannel()).getWorldInterface();
            MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(this.client.getPlayer(), this.messengerposition);
            wci.silentJoinMessenger(this.messenger.getId(), messengerplayer, this.messengerposition);
            wci.updateMessenger(getClient().getPlayer().getMessenger().getId(), getClient().getPlayer().getName(), getClient().getChannel());
        } catch (RemoteException e) {
            this.client.getChannelServer().reconnectWorld();
        }
    }

    public int getMessengerPosition() {
        return this.messengerposition;
    }

    public void setMessengerPosition(int position) {
        this.messengerposition = position;
    }

    public int hasEXPCard() { //双倍卡 温暖的围脖
        int[] 三倍经验卡 = {5211060};
        int[] expCards = {5210000, 5210001, 5210002, 5210003, 5210004, 5210005, 5210006, 5211000, 5211001, 5211002, 5211047, 4100000, 4100001, 4100002, 4100003, 4100004, 4100005, 4100006};
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        
        for (Integer id : 三倍经验卡) {
            if (iv.countById(id) > 0) {
                if (ii.isExpOrDropCardTime(id)) {
                    return 3;
                }
            }
        }
        for (Integer id : expCards) {
            if (iv.countById(id) > 0) {
                if (ii.isExpOrDropCardTime(id)) {
                    return 2;
                }
            }
        }
        return 1;
    }

    public int hasDropCard() {//双倍爆率卡
        int[] dropCards = {5360000, 5360014, 5360015, 5360016};
        MapleInventory iv = getInventory(MapleInventoryType.CASH);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Integer id : dropCards) {
            if (iv.countById(id) > 0) {
                if (ii.isExpOrDropCardTime(id)) {
                    return 2;
                }
            }
        }
        return 1;
    }

    public boolean getNXCodeValid(String code, boolean validcode) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        //FROM 从nxcode  WHERE 在 code SELECT 选择
        ps = con.prepareStatement("SELECT `valid` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            validcode = rs.getInt("valid") != 0;
        }
        rs.close();
        ps.close();
        return validcode;
    }

    public boolean get激活码(String code, boolean validcode) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        //FROM 从nxcode  WHERE 在 code SELECT 选择
        ps = con.prepareStatement("SELECT `valid` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            validcode = rs.getInt("valid") != 0;
        }
        rs.close();
        ps.close();
        return validcode;
    }

    public int getNXCodeType(String code) throws SQLException {
        int type = -1;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `type` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            type = rs.getInt("type");
        }
        rs.close();
        ps.close();
        return type;
    }

    public int getNXCodeItem(String code) throws SQLException {
        int item = -1;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `item` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            item = rs.getInt("item");
        }
        rs.close();
        ps.close();
        return item;
    }

    public void setNXCodeUsed(String code) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("UPDATE nxcode SET `valid` = 0 WHERE code = ?");
        ps.setString(1, code);
        ps.executeUpdate();
        ps = con.prepareStatement("UPDATE nxcode SET `user` = ? WHERE code = ?");
        ps.setString(1, getName());
        ps.setString(2, code);
        ps.executeUpdate();
        ps.close();
    }

    public void setInCS(boolean inCS) {
        this.incs = inCS;
    }

    public boolean inCS() {
        return this.incs;
    }

    public int getEnergy() { //能量条
        return this.energybar;
    }

    public void setInMTS(boolean inMTS) {
        this.inmts = inMTS;
    }

    public boolean inMTS() {
        return this.inmts;
    }

    public void addCooldown(int skillId, long startTime, long length, ScheduledFuture<?> timer) {
        if (!hasGMLevel(5)) {
            if (this.coolDowns.containsKey(Integer.valueOf(skillId))) {
                this.coolDowns.remove(Integer.valueOf(skillId));
            }
            this.coolDowns.put(Integer.valueOf(skillId), new MapleCoolDownValueHolder(skillId, startTime, length, timer));
        } else {
            getClient().getSession().write(MaplePacketCreator.skillCooldown(skillId, 0));
        }
    }

    public void giveCoolDowns(int skillid, long starttime, long length) {
        int time = (int) (length + starttime - System.currentTimeMillis());
        ScheduledFuture timer = TimerManager.getInstance().schedule(new CancelCooldownAction(this, skillid), time);
        addCooldown(skillid, System.currentTimeMillis(), time, timer);
    }

    public void removeCooldown(int skillId) {
        if (this.coolDowns.containsKey(Integer.valueOf(skillId))) {
            this.coolDowns.remove(Integer.valueOf(skillId));
        }
        getClient().getSession().write(MaplePacketCreator.skillCooldown(skillId, 0));
    }

    public boolean skillisCooling(int skillId) {
        return this.coolDowns.containsKey(Integer.valueOf(skillId));
    }

    public List<PlayerCoolDownValueHolder> getAllCooldowns() {
        List ret = new ArrayList();
        for (MapleCoolDownValueHolder mcdvh : this.coolDowns.values()) {
            ret.add(new PlayerCoolDownValueHolder(mcdvh.skillId, mcdvh.startTime, mcdvh.length));
        }
        return ret;
    }

    public void giveDebuff(MapleDisease disease, MobSkill skill) {
        synchronized (diseases) {
            if (isAlive() && !isActiveBuffedValue(2321005) && !diseases.contains(disease) && diseases.size() < 2) {
                diseases.add(disease);
                List<Pair<MapleDisease, Integer>> debuff = Collections.singletonList(new Pair<MapleDisease, Integer>(disease, Integer.valueOf(skill.getX())));
                long mask = 0;
                for (Pair<MapleDisease, Integer> statup : debuff) {
                    mask |= statup.getLeft().getValue();
                }
                getClient().getSession().write(MaplePacketCreator.giveDebuff(mask, debuff, skill));
                getMap().broadcastMessage(this, MaplePacketCreator.giveForeignDebuff(id, mask, skill), false);

                if (isAlive() && diseases.contains(disease)) {
                    final MapleCharacter character = this;
                    final MapleDisease disease_ = disease;
                    TimerManager.getInstance().schedule(new Runnable() {

                        @Override
                        public void run() {
                            if (character.diseases.contains(disease_)) {
                                dispelDebuff(disease_);
                            }
                        }
                    }, skill.getDuration());
                }
            }
        }
    }

    public List<MapleDisease> getDiseases() {
        return this.diseases;
    }

    public void dispelDebuff(MapleDisease debuff) {
        if (this.diseases.contains(debuff)) {
            this.diseases.remove(debuff);
            long mask = debuff.getValue();
            getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(this.id, mask), false);
        }
    }

    public void dispelDebuffs() {
        List<MapleDisease> ret = new LinkedList(this.diseases);
        for (MapleDisease disease : ret) {
            if ((!disease.equals(MapleDisease.SEDUCE)) && (!disease.equals(MapleDisease.STUN))) {
                this.diseases.remove(disease);
                long mask = disease.getValue();
                getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
                getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(this.id, mask), false);
            }
        }
    }

    public void dispelDebuffsi() {
        List<MapleDisease> ret = new LinkedList(this.diseases);
        for (MapleDisease disease : ret) {
            if (!disease.equals(MapleDisease.SEAL)) {
                this.diseases.remove(disease);
                long mask = disease.getValue();
                getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
                getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(this.id, mask), false);
            }
        }
    }

    public void cancelAllDebuffs() {
        List<MapleDisease> ret = new LinkedList(this.diseases);
        for (MapleDisease disease : ret) {
            this.diseases.remove(disease);
            long mask = disease.getValue();
            getClient().getSession().write(MaplePacketCreator.cancelDebuff(mask));
            getMap().broadcastMessage(this, MaplePacketCreator.cancelForeignDebuff(this.id, mask), false);
        }
    }

    public void setLevel(int level) {
        this.level = (level - 1);
    }

    public void setMap(int PmapId) {
        this.mapid = PmapId;
    }

    public void sendNote(String to, String msg) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("INSERT INTO notes (`to`, `from`, `message`, `timestamp`) VALUES (?, ?, ?, ?)");
        ps.setString(1, to);
        ps.setString(2, getName());
        ps.setString(3, msg);
        ps.setLong(4, System.currentTimeMillis());
        ps.executeUpdate();
        ps.close();
    }

    public void sendNote(int recId, String msg) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement p = con.prepareStatement("SELECT name FROM characters WHERE id = ?");
        p.setInt(1, recId);
        ResultSet rs = p.executeQuery();
        String to = rs.getString("name");
        rs.close();
        p.close();
        sendNote(to, msg);
    }

    public void showNote() throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`=?", 1005, 1008);
        ps.setString(1, getName());
        ResultSet rs = ps.executeQuery();

        rs.last();
        int count = rs.getRow();
        rs.first();
        this.client.getSession().write(MaplePacketCreator.showNotes(rs, count));
        ps.close();
    }

    public void deleteNote(int id) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM notes WHERE `id`=?");
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public void showDojoClock() {
        int stage = this.map.getId() / 100 % 100;
        long time;
        if (stage % 6 == 0) {
            time = ((stage > 36 ? 15 : stage / 6 + 5) | 0x0) * 60;
        } else {
            time = (this.dojoFinish - System.currentTimeMillis()) / 1000L;
        }
        this.client.getSession().write(MaplePacketCreator.getClock((int) time));
        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                MapleCharacter.this.client.getPlayer().changeMap(MapleCharacter.this.client.getChannelServer().getMapFactory().getMap(925020000));
            }
        }, time * 1000L + 3000L);
    }

    public void checkBerserk() {
        if (this.BerserkSchedule != null) {
            this.BerserkSchedule.cancel(false);
        }
        MapleCharacter chr = this;
        ISkill BerserkX = SkillFactory.getSkill(1320006);
        int skilllevel = getSkillLevel(BerserkX);
        if ((chr.getJob().equals(MapleJob.DARKKNIGHT)) && (skilllevel >= 1)) {
            MapleStatEffect ampStat = BerserkX.getEffect(skilllevel);
            int x;
            if(skilllevel <= 29){
            x = ampStat.getX();
            }else{
            x = 75;//恶龙
            }
            int HP = chr.getHp();
            int MHP = chr.getMaxHp();
            int ratio = HP * 100 / MHP;
            if (ratio > x) {
                this.Berserk = false;
            } else {
                this.Berserk = true;
            }
            System.out.println("Berserk:"+Berserk);
            System.out.println("ratio:"+ratio);
            System.out.println("x:"+x);
            System.out.println("HP:"+HP);
            System.out.println("MHP:"+MHP);
            this.BerserkSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                }
            }, 5000L, 3000L);
        }
    }

    private void prepareBeholderEffect() {
        if (beholderHealingSchedule != null) {
            beholderHealingSchedule.cancel(false);
        }
        if (beholderBuffSchedule != null) {
            beholderBuffSchedule.cancel(false);
        }

        ISkill bHealing = SkillFactory.getSkill(1320008);
        if (getSkillLevel(bHealing) > 0) {
            final MapleStatEffect healEffect = bHealing.getEffect(getSkillLevel(bHealing));
            beholderHealingSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    addHP(healEffect.getHp());
                    getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(1321007, 2));
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.summonSkill(getId(), 1321007, 5), true);
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), 1321007, 2, (byte) 3), false);
                }
            }, healEffect.getX() * 1000, healEffect.getX() * 1000);
        }
        ISkill bBuffing = SkillFactory.getSkill(1320009);
        if (getSkillLevel(bBuffing) > 0) {
            final MapleStatEffect buffEffect = bBuffing.getEffect(getSkillLevel(bBuffing));
            beholderBuffSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    buffEffect.applyTo(MapleCharacter.this);
                    getClient().getSession().write(MaplePacketCreator.beholderAnimation(getId(), 1320009));
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.summonSkill(getId(), 1321007, (int) (Math.random() * 3) + 6), true);
                    getMap().broadcastMessage(MapleCharacter.this, MaplePacketCreator.showBuffeffect(getId(), 1321007, 2, (byte) 3), false);
                }
            }, buffEffect.getX() * 1000, buffEffect.getX() * 1000);
        }
    }

    public int TotalLoginTime() {
        int ret = 0;
        long now = 0L;
        long t = 0L;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, getAccountID());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Timestamp lastdate = rs.getTimestamp("lastlogin");
                t = lastdate.getTime();
                now = System.currentTimeMillis();
            }
            rs.close();
            ps.close();

            ret = (int) ((now - t) / 3600000L);
        } catch (SQLException ex) {
            log.error("错误转换在线小时数:", ex);
        }
        return ret;
    }

    public int TotalLoginTimeMin() {
        int ret = 0;
        long now = 0L;
        long t = 0L;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
            ps.setInt(1, getAccountID());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Timestamp lastdate = rs.getTimestamp("lastlogin");
                t = lastdate.getTime();
                now = System.currentTimeMillis();
            }
            rs.close();
            ps.close();

            ret = (int) ((now - t) / 60000L);
        } catch (SQLException ex) {
            log.error("错误转换在线分钟数:", ex);
        }
        return ret;
    }

    public void setChalkboard(String text) {
        if (this.interaction != null) {
            return;
        }
        this.chalktext = text;
        for (FakeCharacter ch : fakes) {
            ch.getFakeChar().setChalkboard(text);
        }
        if (this.chalktext == null) {
            getMap().broadcastMessage(MaplePacketCreator.useChalkboard(this, true));
        } else {
            getMap().broadcastMessage(MaplePacketCreator.useChalkboard(this, false));
        }
    }

    public String getChalkboard() {
        return this.chalktext;
    }

    public int getMarriageQuestLevel() {
        return this.marriageQuestLevel;
    }

    public void setMarriageQuestLevel(int nf) {
        this.marriageQuestLevel = nf;
    }

    public void addMarriageQuestLevel() {
        this.marriageQuestLevel += 1;
    }

    public void subtractMarriageQuestLevel() {
        this.marriageQuestLevel -= 1;
    }

    public void setCanTalk(int yesno) {
        this.canTalk = yesno;
    }

    public int getCanTalk() {
        return this.canTalk;
    }

    public void setZakumLevel(int level) {
        this.zakumLvl = level;
    }

    public int getZakumLevel() {
        return this.zakumLvl;
    }

    public void addZakumLevel() {
        this.zakumLvl += 1;
    }

    public void subtractZakumLevel() {
        this.zakumLvl -= 1;
    }

    public void setMarried(int mmm) {
        this.married = mmm;
    }

    public void setPartnerId(int pem) {
        this.partnerid = pem;
    }

    public int isMarried() {
        return this.married;
    }

    public MapleCharacter getPartner() {
        MapleCharacter test = getClient().getChannelServer().getPlayerStorage().getCharacterById(this.partnerid);
        if (test != null) {
            return test;
        }
        return null;
    }

    public int countItem(int itemid) {
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        MapleInventory iv = this.inventory[type.ordinal()];
        int possesed = iv.countById(itemid);
        return possesed;
    }

    public void changePage(int page) {
        this.currentPage = page;
    }

    public void changeTab(int tab) {
        this.currentTab = tab;
    }

    public void changeType(int type) {
        this.currentType = type;
    }

    public int getCurrentPage() {
        return this.currentPage;
    }

    public int getCurrentTab() {
        return this.currentTab;
    }

    public int getCurrentType() {
        return this.currentType;
    }
    
    public int changeCI() {
        return this.changeCI;
    }
    public void changeCI(int page) {
        this.changeCI = page;
    }
    public String getSearch() {
        return this.Search;
    }
     public void setSearch(String name) {
       this.Search = name;
    }
    public void unstick() {
        PreparedStatement ps = null;
        PreparedStatement ps2 = null;
        try {
            getClient().disconnect();
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET loggedin = 0 WHERE id = ?");
            ps.setInt(1, this.accountid);
            ps.executeUpdate();
            ps.close();
            ps2 = con.prepareStatement("UPDATE characters SET loggedin = 0 WHERE accountid = ?");
            ps2.setInt(1, this.id);
            ps2.executeUpdate();
            ps2.close();
        } catch (Exception ex) {
        } finally {
            try {
                if (ps2 != null) {
                    ps2.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public boolean getSmegaEnabled() {
        return this.smegaEnabled;
    }

    public void setSmegaEnabled(boolean x) {
        this.smegaEnabled = x;
    }

    public void resetAfkTimer() {
        this.afkTimer = System.currentTimeMillis();
    }

    public long getAfkTimer() {
        return System.currentTimeMillis() - this.afkTimer;
    }

    public long getLoggedInTimer() {
        return System.currentTimeMillis() - this.loggedInTimer;
    }

    public boolean getEnteringPortal() {
        return this.isEnteringPortal;
    }

    public void setEnteringPortal(boolean e) {
        this.isEnteringPortal = e;
    }

    public void toggleNoEnergyChargeDec() {
        this.noEnergyChargeDec = (!this.noEnergyChargeDec);
    }

    public boolean isNoEnergyChargeDec() {
        return (this.noEnergyChargeDec) && (isGM());
    }

    public void handleEnergyChargeGain(int amt, final boolean gm) {//没有这里
        if (!gm && isNoEnergyChargeDec()) {
            return;
        }
        ISkill energycharge = SkillFactory.getSkill(5110001);
        int energyChargeSkillLevel = getSkillLevel(energycharge);
        MapleStatEffect ceffect = energycharge.getEffect(energyChargeSkillLevel);
        TimerManager tMan = TimerManager.getInstance();
        if (energyDecrease != null) {
            energyDecrease.cancel(false);
        }
        if (energyChargeSkillLevel > 0) {
            if (energybar < 10000) {

                energybar = (energybar + amt);
                if (energybar > 10000) {
                    energybar = 10000;
                }
                getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(energybar));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(5110001, 2));
                getMap().broadcastMessage(MaplePacketCreator.showBuffeffect(id, 5110001, 2, (byte) 3));
                if (energybar == 10000) {
                    getMap().broadcastMessage(MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                }
                if (!gm) {
                    energyDecrease = tMan.register(new Runnable() {

                        @Override
                        public void run() {

                            if (energybar < 10000 && !isNoEnergyChargeDec()) {
                                if ((energybar - 102) < 0) {
                                    energybar = 0;
                                    if (energyDecrease != null) {
                                        energyDecrease.cancel(false);
                                    }
                                } else {
                                    energybar = (energybar - 102);
                                }
                                getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(energybar));
                            }

                        }
                    }, 10000, 10000);
                } else {
                    if (energyDecrease != null && !energyDecrease.isCancelled()) {
                        energyDecrease.cancel(false);
                    }
                    energyDecrease = null;
                }
            }
            if (energybar >= 10000 && energybar < 11000) {
                energybar = 15000;
                final MapleCharacter chr = this;
                if (!gm) {
                    tMan.schedule(new Runnable() {

                        @Override
                        public void run() {
                            getClient().getSession().write(MaplePacketCreator.giveEnergyCharge(0));
                            getMap().broadcastMessage(MaplePacketCreator.giveForeignEnergyCharge(id, energybar));
                            energybar = 0;
                        }
                    }, ceffect.getDuration());
                }
            }

        }
    }

    public void leaveParty() {
        WorldChannelInterface wci = ChannelServer.getInstance(getClient().getChannel()).getWorldInterface();
        MaplePartyCharacter partyplayer = new MaplePartyCharacter(this);
        if (this.party == null) {
            return;
        }
        try {
            if (partyplayer.equals(this.party.getLeader())) {
                wci.updateParty(this.party.getId(), PartyOperation.DISBAND, partyplayer);
                if (getEventInstance() != null) {
                    getEventInstance().disbandParty();
                }
            } else {
                wci.updateParty(this.party.getId(), PartyOperation.LEAVE, partyplayer);
                if (getEventInstance() != null) {
                    getEventInstance().leftParty(this);
                }
            }
        } catch (RemoteException e) {
            getClient().getChannelServer().reconnectWorld();
        }
        setParty(null);
    }

    public int getBossQuestRepeats() {
        return this.bossRepeats;
    }

    public void setBossQuestRepeats(int repeats) {
        this.bossRepeats = repeats;
    }

    public void updateBossQuestRepeats() {
        if (Calendar.getInstance().getTimeInMillis() > this.nextBQ) {
            setBossQuestRepeats(0);
        }
    }

    public void updateNextBossQuest() {
        this.nextBQ = (Calendar.getInstance().getTimeInMillis() + 86400000L);
    }

    public String getNextBossQuest() {
        return new Timestamp(this.nextBQ).toString();
    }

    public void setBossPoints(int points) {
        this.bossPoints = points;
    }

    public int getBossPoints() {
        return this.bossPoints;
    }

    public void setAchievementFinished(int id) {
        this.finishedAchievements.add(Integer.valueOf(id));
    }

    public boolean achievementFinished(int achievementid) {
        return this.finishedAchievements.contains(Integer.valueOf(achievementid));
    }

    public void finishAchievement(int id) {
        if (((achievementFinished(id)) && (!MapleAchievements.getInstance().getById(id).isRepeatable())) || (!isAlive())) {
            return;
        }
        MapleAchievement ma = MapleAchievements.getInstance().getById(id);
        if (ma != null) {
            ma.finishAchievement(this);
        }
    }

    public List<Integer> getFinishedAchievements() {
        return this.finishedAchievements;
    }

    public boolean hasMerchant() {
        return this.hasMerchant;
    }

    public void setHasMerchant(boolean set) {
        PreparedStatement ps = null;
        try {
            ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET hasmerchant = ? WHERE id = ?");
            ps.setInt(1, set ? 1 : 0);
            ps.setInt(2, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("setHasmerchant sql", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
        this.hasMerchant = set;
    }

    public boolean tempHasItems() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT ownerid FROM hiredmerchanttemp WHERE ownerid = ?");
            ps.setInt(1, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                rs.close();
                ps.close();
                return true;
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            log.error("tempHasItems sql", se);
        }
        return false;
    }

    public int getBossLog(String boss) {
        Connection con = DatabaseConnection.getConnection();
        try {
            int count = 0;
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT COUNT(*) FROM bosslog WHERE characterid = ? AND bossid = ? AND lastattempt >= subtime(CURRENT_TIMESTAMP, '1 6:0:0.0')");
            ps.setInt(1, id);
            ps.setString(2, boss);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                count = rs.getInt(1);
            } else {
                count = -1;
            }
            rs.close();
            ps.close();
            return count;
        } catch (Exception Ex) {
            log.error("Error while read bosslog.", Ex);
            return -1;
        }
    }

    public void setBossLog(String boss) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("insert into bosslog (characterid, bossid) values (?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, boss);
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            log.error("Error while insert bosslog.", ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    public void createPlayerNPC() {
        getPlayerNPC().createPlayerNPC(this, getPlayerNPCMapId());
    }

    public int getPlayerNPCMapId() {
        int jobId = getJob().getId();
        if ((jobId >= 100) && (jobId <= 132)) {
            return 102000003;
        }
        if ((jobId >= 200) && (jobId <= 232)) {
            return 101000003;
        }
        if ((jobId >= 300) && (jobId <= 322)) {
            return 100000201;
        }
        if ((jobId >= 400) && (jobId <= 422)) {
            return 103000003;
        }
        if ((jobId >= 500) && (jobId <= 522)) {
            return 120000000;
        }
        return 104000000;
    }

    public MaplePlayerNPC getPlayerNPC() {
        MaplePlayerNPC pnpc = new MaplePlayerNPC(this);
        return pnpc;
    }

    public void updateLater() {
        PreparedStatement ps = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("INSERT INTO waiting_players (id, name, job, mapid) VALUES (?, ?, ?, ?)");
            ps.setInt(1, this.id);
            ps.setString(2, this.name);
            ps.setString(3, getJobName());
            ps.setInt(4, getPlayerNPCMapId());
            ps.executeUpdate();
            ps.close();
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
    }

    public String getJobName() {
        return this.job.getJobNameAsString();
    }

    public boolean hasPlayerNPC() {
        return this.playerNPC;
    }

    public void handleBattleShipHpLoss(int damage) {
        ISkill ship = SkillFactory.getSkill(5221006);
        int maxshipHP = getSkillLevel(ship) * 4000 + (getLevel() - 120) * 2000;
        MapleStatEffect effect = ship.getEffect(getSkillLevel(ship));
        this.battleshipHP -= damage;
        if (getBattleShipHP() <= 0) {
            dispelSkill(5221006);
            ScheduledFuture timer = TimerManager.getInstance().schedule(new CancelCooldownAction(this, 5221006), effect.getCooldown() * 1000);
            addCooldown(5221006, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
            this.battleshipHP = maxshipHP;
            getClient().getSession().write(MaplePacketCreator.skillCooldown(5221006, effect.getCooldown()));
            try {
                dropMessage("Your Battle Ship has been destroyed by the monster with incredible force!");
            } catch (NullPointerException npe) {
            }
        }
        getClient().getSession().write(MaplePacketCreator.updateBattleShipHP(getId(), this.battleshipHP));
    }

    public int getBattleShipHP() {
        return this.battleshipHP;
    }

    public int setBattleShipHP(int set) {
        return this.battleshipHP = set;
    }

    public List<Integer> getTRockMaps(int type) {
        List<Integer> rockmaps = new LinkedList<Integer>();
        try {
            PreparedStatement ps;
            if (type == 1) {
                ps = DatabaseConnection.getConnection().prepareStatement("SELECT mapid FROM trocklocations WHERE characterid = ? AND type = ? LIMIT 10");
            } else {
                ps = DatabaseConnection.getConnection().prepareStatement("SELECT mapid FROM trocklocations WHERE characterid = ? AND type = ? LIMIT 5");
            }
            ps.setInt(1, id);
            ps.setInt(2, type);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                rockmaps.add(rs.getInt("mapid"));
            }
            rs.close();
            ps.close();
        } catch (SQLException se) {
            return null;
        }
        return rockmaps;
    }

    public void checkDuey() {
        Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM dueypackages WHERE receiverid = ? AND alerted = 0");
            ps.setInt(1, getId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                PreparedStatement ps2 = con.prepareStatement("UPDATE dueypackages SET alerted = 1 WHERE receiverid = ?");
                ps2.setInt(1, getId());
                ps2.executeUpdate();
                ps2.close();
                getClient().getSession().write(MaplePacketCreator.sendDueyMessage(Actions.TOCLIENT_PACKAGE_MSG.getCode()));
            }
            rs.close();
            ps.close();
        } catch (SQLException SQLe) {
            SQLe.printStackTrace();
        }
    }

    public boolean isCPQChallenged() {
        return this.CPQChallenged;
    }

    public void setCPQChallenged(boolean CPQChallenged) {
        this.CPQChallenged = CPQChallenged;
    }

    public int getCP() {
        return this.CP;
    }

    public void gainCP(int gain) {
        if (gain > 0) {
            setTotalCP(getTotalCP() + gain);
        }
        setCP(getCP() + gain);
        if (getParty() != null) {
            getMonsterCarnival().setCP(getMonsterCarnival().getCP(this.team) + gain, this.team);
            if (gain > 0) {
                getMonsterCarnival().setTotalCP(getMonsterCarnival().getTotalCP(this.team) + gain, this.team);
            }
        }
        if (getCP() > getTotalCP()) {
            setTotalCP(getCP());
        }
        getClient().getSession().write(MaplePacketCreator.CPUpdate(false, getCP(), getTotalCP(), getTeam()));
        if ((getParty() != null) && (getTeam() != -1)) {
            getMap().broadcastMessage(MaplePacketCreator.CPUpdate(true, getMonsterCarnival().getCP(this.team), getMonsterCarnival().getTotalCP(this.team), getTeam()));
        } else {
            log.warn(getName() + " is either not in a party or .. team: " + getTeam());
        }
    }

    public void setTotalCP(int a) {
        this.totalCP = a;
    }

    public void setCP(int a) {
        this.CP = a;
    }

    public int getTotalCP() {
        return this.totalCP;
    }

    public void resetCP() {
        this.CP = 0;
        this.totalCP = 0;
        this.monsterCarnival = null;
    }

    public MapleMonsterCarnival getMonsterCarnival() {
        return this.monsterCarnival;
    }

    public void setMonsterCarnival(MapleMonsterCarnival monsterCarnival) {
        this.monsterCarnival = monsterCarnival;
    }

    public int getTeam() {
        return this.team;
    }

    public void setTeam(int team) {
        this.team = team;
    }

    public int getCPQRanking() {
        return this.CPQRanking;
    }

    public void setCPQRanking(int newCPQRanking) {
        this.CPQRanking = newCPQRanking;
    }

    public boolean isBanned() {
        return this.banned;
    }

    public boolean needsParty() {
        return this.needsParty;
    }

    public int getNeedsPartyMaxLevel() {
        return this.needsPartyMaxLevel;
    }

    public int getNeedsPartyMinLevel() {
        return this.needsPartyMinLevel;
    }

    public void setNeedsParty(boolean bool, int minlvl, int maxlvl) {
        this.needsParty = bool;
        this.needsPartyMinLevel = minlvl;
        this.needsPartyMaxLevel = maxlvl;
    }

    public boolean hasPlayerShopTicket() {
        int[] itemids = new int[6];
        for (int Id = 0; Id <= 5; Id++) {
            itemids[Id] = (Id + 5140000);
        }
        return haveItem(itemids, 1, false);
    }

    public boolean hasHiredMerchantTicket() {
        int[] itemids = new int[13];
        for (int Id = 0; Id <= 12; Id++) {
            itemids[Id] = (Id + 5030000);
        }
        return haveItem(itemids, 1, false);
    }

    public static int getIdByName(String name) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            ps = con.prepareStatement("SELECT id FROM characters WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                return -1;
            }
            int id = rs.getInt("id");
            ps.close();
            return id;
        } catch (SQLException e) {
            log.error("ERROR", e);
        }
        return -1;
    }

    public static int getAccountIdByName(String name) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                ps.close();
                return -1;
            }
            int id = rs.getInt("accountid");
            ps.close();
            return id;
        } catch (SQLException e) {
            log.error("ERROR", e);
        }
        return -1;
    }

    public boolean hasGodmode() {
        return this.godmode;
    }

    public void setGodmode(boolean onoff) {
        this.godmode = onoff;
    }

    public void addToCancelBuffPackets(MapleStatEffect effect, long startTime) {
        this.buffsToCancel.put(Long.valueOf(startTime), effect);
    }

    public void cancelSavedBuffs() {
        Set keys = this.buffsToCancel.keySet();
        Object[] keysarray = keys.toArray();
        long key = 0L;
        for (Object o : keysarray) {
            key = ((Long) o).longValue();
            cancelEffect((MapleStatEffect) this.buffsToCancel.get(Long.valueOf(key)), false, key);
        }
        this.buffsToCancel.clear();
    }

    public boolean isQuestDebug() {
        return (this.questDebug) && (isGM());
    }

    public void toggleQuestDebug() {
        this.questDebug = (!this.questDebug);
    }

    public void UpdateCash() {
        getClient().getSession().write(MaplePacketCreator.showCharCash(this));
    }

    public final int getNumQuest() {
        int i = 0;
        for (MapleQuestStatus q : this.quests.values()) {
            if ((q.getStatus() == MapleQuestStatus.Status.COMPLETED) && (!(q.getQuest() instanceof MapleCustomQuest))) {
                i++;
            }
        }
        return i;
    }

    public static int getNextUniqueId(int i) {
        int nextid = 1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT MAX(uniqueid) FROM inventoryitems");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                nextid = rs.getInt(1) + 1;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT MAX(uniqueid) FROM csinventory");
            rs = ps.executeQuery();
            if (rs.next()) {
                int nextcsid = rs.getInt(1) + 1;
                if (nextcsid > nextid) {
                    nextid = nextcsid;
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("Error getting next unique id", e);
        }
        return nextid;
    }

    public static int getNextUniqueId() {
        int nextid = 1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT MAX(uniqueid) FROM inventoryitems");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                nextid = rs.getInt(1) + 1;
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT MAX(uniqueid) FROM csinventory");
            rs = ps.executeQuery();
            if (rs.next()) {
                int nextcsid = rs.getInt(1) + 1;
                if (nextcsid > nextid) {
                    nextid = nextcsid;
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            log.error("Error getting next unique id", e);
        }
        return nextid;
    }

    public void setMonsterBookCover(int bookCover) {
        this.bookCover = bookCover;
    }

    public void DoJoKill() {
        getClient().getSession().write(MaplePacketCreator.environmentChange("Dojang/clear", 4));
        getClient().getSession().write(MaplePacketCreator.environmentChange("dojang/end/clear", 3));
    }

    public void saveLocation(String type) {
        MaplePortal closest = this.map.findClosestPortal(getPosition());
    }

    public boolean hasEnergyCharge() {
        int skillId = 0;
        if ((getJob() == MapleJob.MARAUDER) || (getJob() == MapleJob.BUCCANEER)) {
            skillId = 5110001;
        } else if ((getJob() == MapleJob.THIEF_KNIGHT_2) || (getJob() == MapleJob.THIEF_KNIGHT_3)) {
            skillId = 15100004;
        } else {
            return false;
        }
        if (getSkillLevel(skillId) > 0) {
            return true;
        }
        return false;
    }

    public int getEnergyCharge() {
        return this.energyChargeLevel;
    }

    public int getEnergyPoint() { //能量条
        return this.energyPoint;
    }

    public void setEnergyPoint(int energyPoint) {
        this.energyPoint = energyPoint;
    }

    public void increaseEnergyCharge(int numMonsters) {
        if (energyPoint < 10000 && numMonsters > 0) { //能量小于一万 和 攻击次数大于0
            if (energyChargeSchedule != null) { //能量不等于没有
                this.energyChargeSchedule.cancel(false); //能量取消
                this.energyChargeSchedule = null;//能量为空
            }
            int skillId = 0;//变量技能为0
            if ((getJob() == MapleJob.MARAUDER) || (getJob() == MapleJob.BUCCANEER)) { //冒险家海盗职业
                skillId = 5110001;//定义ID
            } else if ((getJob() == MapleJob.THIEF_KNIGHT_2) || (getJob() == MapleJob.THIEF_KNIGHT_3)) { //骑士团奇袭者职业
                skillId = 15100004;//定义ID
            } else {
                return;//不处理 返回
            }
            ISkill skill = SkillFactory.getSkill(skillId); //定义技能ID
            int skillLevel = getSkillLevel(skill);//技能等级
            int x = 0;//技能内容
            if (skillLevel > 0) {
                x = skill.getEffect(skillLevel).getX();//技能等级读取 变量为X
            }
            int toAdd = x * numMonsters; //X * 攻击次数 为 toadd
            energyPoint += toAdd; //能量递增
            if (energyPoint >= 10000) { //能量获取大于10000
                energyPoint = 10000;//直接为10000
                skill.getEffect(skillLevel).applyTo(this); //发动效果EFFECT
                ////System.out.println("输出A");
                return;//结束不处理
            } else {//如果不符合以上条件
                //
                List<Pair<MapleBuffStat, Integer>> statups = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energyPoint));
                //getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 200, statups));
                //getMap().broadcastMessage(this, MaplePacketCreator.showPirateBuff(id, skillId, 2, statups), false);
                //
                //List<Pair<MapleBuffStat, Integer>> statups = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量获得, energyPoint));
                //getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 200, statups));
                getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(skillId, 2)); //显示能量获得的效果(有光聚集过来)
                getMap().broadcastMessage(this, MaplePacketCreator.showBuffeffect(id, skillId, 2));
                getClient().getSession().write(MaplePacketCreator.能量条(statups, energyPoint / 1000)); //????????????????
                ////System.out.println("输出B");
            }
            // this.energyChargeSchedule = TimerManager.getInstance().register(new ReduceEnergyChargeAction(this), 10000, 10000);
            energyChargeSchedule = TimerManager.getInstance().register(new Runnable() {

                @Override
                public void run() {
                    energyPoint -= 200;
                    List<Pair<MapleBuffStat, Integer>> statups = Collections.singletonList(new Pair<MapleBuffStat, Integer>(MapleBuffStat.能量, energyPoint));
                    // getClient().getSession().write(MaplePacketCreator.givePirateBuff(0, 200, statups));
                    ////System.out.println("输出C");
                    if (energyPoint <= 0) {
                        energyPoint = 0;
                        energyChargeSchedule.cancel(false);
                        ////System.out.println("输出D");
                    }
                }
            }, 10000, 10000);
        }
    }

    public boolean inIntro() {
        return tutorial;
    }

    public int getCombo() {
        return this.comboCounter;
    }

    public int setCombo(int combo) {
        return this.comboCounter = combo;
    }

    public void blockPortal(String scriptName) {
        if ((!this.blockedPortals.contains(scriptName)) && (scriptName != null)) {
            this.blockedPortals.add(scriptName);
        }
        getClient().getSession().write(MaplePacketCreator.blockedPortal());
    }

    public void unblockPortal(String scriptName) {
        if ((this.blockedPortals.contains(scriptName)) && (scriptName != null)) {
            this.blockedPortals.remove(scriptName);
        }
    }

    public List getBlockedPortals() {
        return this.blockedPortals;
    }

    public boolean getAranIntroState(String mode) {
        return this.ares_data.contains(mode);
    }

    public int setLastAttack(int attackZ) {
        return this.lastAttack = attackZ;
    }

    public int getLastAttack() {
        return this.lastAttack;
    }

    public boolean inTutorialMap() {
        return ((getMap().getId() >= 914000000) && (getMapId() <= 914010200)) || ((getMapId() >= 108000700) && (getMapId() <= 140090500)) || ((getMapId() >= 0) && (getMapId() <= 2000001));
    }

    public void addAreaData(int quest, String data) {
        if (!this.ares_data.contains(data)) {
            this.ares_data.add(data);
            PreparedStatement ps = null;
            try {
                Connection con = DatabaseConnection.getConnection();
                ps = con.prepareStatement("INSERT INTO char_ares_info VALUES (DEFAULT, ?, ?, ?)");
                ps.setInt(1, getId());
                ps.setInt(2, quest);
                ps.setString(3, data);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException ex) {
                log.error("Arsa date error", ex);
                ex.printStackTrace();
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

    public void removeAreaData() {
        this.ares_data.clear();
        PreparedStatement ps = null;
        try {
            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement("DELETE FROM char_ares_info WHERE charid = ?");
            ps.setInt(1, getId());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            log.error("Arsa date error", ex);
            ex.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ex) {
            }
        }
    }

    private Calendar getTempBanCalendar(ResultSet rs)
            throws SQLException {
        Calendar lTempban = Calendar.getInstance();
        long blubb = rs.getLong("tempban");
        if (blubb == 0L) {
            lTempban.setTimeInMillis(0L);
            return lTempban;
        }
        Calendar today = Calendar.getInstance();
        lTempban.setTimeInMillis(rs.getTimestamp("tempban").getTime());
        if (today.getTimeInMillis() < lTempban.getTimeInMillis()) {
            return lTempban;
        }

        lTempban.setTimeInMillis(0L);
        return lTempban;
    }

    public Calendar getTempBanCalendar() {
        return this.tempban;
    }

    public void doCherryban() {
        Calendar tempB = Calendar.getInstance();
        String reason = getName() + " tempbanned cid:[" + getId() + "].reason: " + "自动封号";
        tempB.set(tempB.get(1), tempB.get(2), tempB.get(5) + 3, tempB.get(11), tempB.get(12));
        cherryTempBan(reason, tempB, 7);
        setCherryBan(true);
        MapleMap target = this.cserv.getMapFactory().getMap(910000002);
        MaplePortal targetPortal = target.getPortal(0);
        changeMap(target, targetPortal);
        dropMessage(1, getCherryBanTimestamp().getYear() + 1900 + "年" + (getCherryBanTimestamp().getMonth() + 1) + "月" + getCherryBanTimestamp().getDate() + "日以后起\r\n恢复正常游戏状态。");
    }

    public void doCherryAutoban(String banreason) {
        Calendar tempB = Calendar.getInstance();
        String reason = getName() + "系统封号 cid:[" + getId() + "].reason: " + banreason;
        tempB.set(tempB.get(1), tempB.get(2), tempB.get(5) + 3, tempB.get(11), tempB.get(12));
        cherryTempBan(reason, tempB, 7);
        setCherryBan(true);
        MapleMap target = this.cserv.getMapFactory().getMap(910000002);
        MaplePortal targetPortal = target.getPortal(0);
        changeMap(target, targetPortal);
        dropMessage(1, getCherryBanTimestamp().getYear() + 1900 + "年" + (getCherryBanTimestamp().getMonth() + 1) + "月" + getCherryBanTimestamp().getDate() + "日以后起\r\n恢复正常游戏状态。");
    }

    public void setCherryBan(boolean ban) {
        this.cherryban = ban;
    }

    public boolean getCherryBan() {
        return this.cherryban;
    }

    public void setCherryBanTimestamp(Timestamp ban) {
        this.cherrybanTill = ban;
    }

    public Timestamp getCherryBanTimestamp() {
        return this.cherrybanTill;
    }

    public void getCherryBanMessage() {
        String msg = "您因不当行为，而遭游戏管理员禁止攻击、禁止获得经验和金币、禁止交易、禁止丢弃道具、禁止开启个人商店与精灵商人、禁止组队、禁止使用拍卖系统，因此无法使用该功能。";
        dropMessage(5, msg);
    }

    public long getCurrenttime() {
        return this.currenttime;
    }

    public void setCurrenttime(long currenttime) {
        this.currenttime = currenttime;
    }

    public long get防止复制时间() {
        return this.防止复制时间;
    }

    public void set防止复制时间(long 防止复制时间) {
        this.防止复制时间 = 防止复制时间;
    }

    public long get开始闪烁() {
        return this.开始闪烁;
    }

    public void set开始闪烁(long 开始闪烁) {
        this.开始闪烁 = 开始闪烁;
    }

    public int get怪物伤害() {
        return this.怪物伤害;
    }

    public void set怪物伤害(int 怪物伤害) {
        this.怪物伤害 = 怪物伤害;
    }

    public void 直接为0(int md5data) {
        this.md5data = 0;
    }

    public void setmd5data(int md5data) {
        this.md5data = md5data;
    }

    public void setlingqu(int lingqu) {
        this.lingqu = lingqu;
    }

    public int get闪烁时间() {
        return this.闪烁时间;
    }

    public void set闪烁时间(int 闪烁时间) {
        this.闪烁时间 = 闪烁时间;
    }

    public long getDeadtime() {
        return this.deadtime;
    }

    public void setDeadtime(long deadtime) {
        this.deadtime = deadtime;
    }

    public long getLasttime() {
        return this.lasttime;
    }

    public void setLasttime(long lasttime) {
        this.lasttime = lasttime;
    }

    public int getDuboPionts() {
        return this.duboPionts;
    }

    public void setDuboPionts(int duboPionts) {
        this.duboPionts = duboPionts;
    }

    public int getTouzhuNX() {
        return this.touzhuNX;
    }

    public void setTouzhuNX(int touzhuNX) {
        this.touzhuNX = touzhuNX;
    }

    public int getTouzhuNum() {
        return this.touzhuNum;
    }

    public void setTouzhuNum(int touzhuNum) {
        this.touzhuNum = touzhuNum;
    }

    public int getTouzhuType() {
        return this.touzhuType;
    }

    public void setTouzhuType(int touzhuType) {
        this.touzhuType = touzhuType;
    }

    public void handleComboGain() {
        if (comboCounter <= 30000) {
            comboCounter += 1;
            if (comboCounter > 30000) {
                comboCounter = 30000;
            }
        }
        if (getJob().getId() == 900 || getJob().getId() > 2000 || getJob().getId() <= 2113) {
            getClient().getSession().write(MaplePacketCreator.Combo_Effect(comboCounter));
        }
    }

    public void maxAllSkills() {
        MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/" + "String.wz"));
        MapleData skilldData = dataProvider.getData("Skill.img");
        for (MapleData skill_ : skilldData.getChildren()) {
            try {
                ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                if (level >= 0) {
                    changeSkillLevel(skill, skill.getMaxLevel(), skill.getMaxLevel());
                }
            } catch (NumberFormatException nfe) {
                break;
            } catch (NullPointerException npe) {
                continue;
            }
        }
    }

    public void setMiniGame(MapleMiniGame miniGame) {
        this.miniGame = miniGame;
    }

    public int getMiniGamePoints(String type, boolean omok) {
        if (omok) {
            if (type.equals("wins")) {
                return omokwins;
            } else if (type.equals("losses")) {
                return omoklosses;
            } else {
                return omokties;
            }
            /*
             * switch (type) { case "wins": return omokwins; case "losses":
             * return omoklosses; default: return omokties;
             }
             */
        } else {
            if (type.equals("wins")) {
                return matchcardwins;
            } else if (type.equals("losses")) {
                return matchcardlosses;
            } else {
                return matchcardties;
            }
            /*
             * switch (type) { case "wins": return matchcardwins; case "losses":
             * return matchcardlosses; default: return matchcardties;
             }
             */
        }
    }

    public void setMiniGamePoints(MapleCharacter visitor, int winnerslot, boolean omok) {
        if (omok) {
            if (winnerslot == 1) {
                this.omokwins++;
                visitor.omoklosses++;
            } else if (winnerslot == 2) {
                visitor.omokwins++;
                this.omoklosses++;
            } else {
                this.omokties++;
                visitor.omokties++;
            }
        } else {
            if (winnerslot == 1) {
                this.matchcardwins++;
                visitor.matchcardlosses++;
            } else if (winnerslot == 2) {
                visitor.matchcardwins++;
                this.matchcardlosses++;
            } else {
                this.matchcardties++;
                visitor.matchcardties++;
            }
        }
    }

    public void setMaxHp(int hp) {
        this.maxhp = hp;
        recalcLocalStats();
    }

    public void setMaxMp(int mp) {
        this.maxmp = mp;
        recalcLocalStats();
    }

    public void setMarried(boolean b) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    private static class MapleBuffStatValueHolder {

        public MapleStatEffect effect;
        public long startTime;
        public int value;
        public ScheduledFuture<?> schedule;

        public MapleBuffStatValueHolder(MapleStatEffect effect, long startTime, ScheduledFuture<?> schedule, int value) {
            this.effect = effect;
            this.startTime = startTime;
            this.schedule = schedule;
            this.value = value;
        }
    }

    public static class MapleCoolDownValueHolder {

        public int skillId;
        public long startTime;
        public long length;
        public ScheduledFuture<?> timer;

        public MapleCoolDownValueHolder(int skillId, long startTime, long length, ScheduledFuture<?> timer) {
            this.skillId = skillId;
            this.startTime = startTime;
            this.length = length;
            this.timer = timer;
        }
    }

    public static class SkillEntry {

        public int skillevel;
        public int masterlevel;

        public SkillEntry(int skillevel, int masterlevel) {
            this.skillevel = skillevel;
            this.masterlevel = masterlevel;
        }

        public String toString() {
            return this.skillevel + ":" + this.masterlevel;
        }
    }

    public static enum FameStatus {

        OK, NOT_TODAY, NOT_THIS_MONTH;
    }

    public static class CancelCooldownAction
            implements Runnable {

        private int skillId;
        private WeakReference<MapleCharacter> target;

        public CancelCooldownAction(MapleCharacter target, int skillId) {
            this.target = new WeakReference(target);
            this.skillId = skillId;
        }

        public void run() {
            MapleCharacter realTarget = (MapleCharacter) this.target.get();
            if (realTarget != null) {
                realTarget.removeCooldown(this.skillId);
            }
        }
    }
    protected MapleMap 传送A(int map) {
        MapleMap target;
        if (getPlayer().getEventInstance() == null) {
            target = ChannelServer.getInstance(this.c.getChannel()).getMapFactory().getMap(map);
        } else {
            target = getPlayer().getEventInstance().getMapInstance(map);
        }
        return target;
    }

    public void 传送(int map) {
        getPlayer().changeMap(传送A(map), 传送A(map).getPortal(0));
    }
    public static class ReduceEnergyChargeAction implements Runnable {

        private WeakReference<MapleCharacter> target;

        public ReduceEnergyChargeAction(MapleCharacter target) {
            this.target = new WeakReference<MapleCharacter>(target);
        }

        /*
         * @Override public void run() { MapleCharacter realTarget =
         * target.get(); realTarget.energyChargeLevel -= 200; if (realTarget !=
         * null) { //解决NPC消失问题 if (realTarget.energyChargeLevel <= 0) {
         * realTarget.energyChargeLevel = 0;
         * realTarget.energyChargeSchedule.cancel(false); } } } }
         */
        @Override
        public void run() {
            MapleCharacter realTarget = target.get();
            realTarget.energyChargeLevel -= 200;
            if (realTarget.energyChargeLevel <= 0) {
                realTarget.energyChargeLevel = 0;
                realTarget.energyChargeSchedule.cancel(false);
            }
        }
    }

    public void setshoucLog(String fsbid) {
        java.sql.Connection con = DatabaseConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement("insert into shouclog (characterid, fsbtype,accountid,account,charactername) values (?,?,?,?,?)");
            ps.setInt(1, this.id);
            ps.setString(2, fsbid);
            ps.setInt(3, getClient().getAccID());
            ps.setString(4, getClient().getAccountName());
            ps.setString(5, getClient().getPlayer().getName());
            ps.executeUpdate();
            ps.close();
        } catch (Exception Ex) {
            log.error("插入语句错误，请确认你的SQL密码正确且没有关闭。", Ex);
        }
    }

    public int getExt(String bossid) {
        Connection con1 = DatabaseConnection.getConnection();
        try {
            int ret_count = 0;
            PreparedStatement ps;
            ps = con1.prepareStatement("select count(*) from bosslog where characterid = ? and bossid = ? ");
            ps.setInt(1, id);
            ps.setString(2, bossid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret_count = rs.getInt(1);
            } else {
                ret_count = -1;
            }
            rs.close();
            ps.close();
            return ret_count;
        } catch (Exception Ex) {
            log.error("Error while read bosslog.", Ex);
            return -1;
        }
    }

    public MapleMiniGame getMiniGame() {
        return miniGame;
    }

    public void setFake() {
        isfake = true;
    }

    public boolean isFake() {
        return this.isfake;
    }

    public void setName(String name, boolean changeName) {
        if (!changeName) {
            this.name = name;
        } else {
            Connection con = DatabaseConnection.getConnection();
            try {
                con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
                con.setAutoCommit(false);
                PreparedStatement sn = con.prepareStatement("UPDATE characters SET name = ? WHERE id = ?");
                sn.setString(1, name);
                sn.setInt(2, id);
                sn.execute();
                con.commit();
                sn.close();
                this.name = name;
            } catch (SQLException se) {
                log.error("SQL error: " + se.getLocalizedMessage(), se);
            }
        }
    }

    public void setID(int id) {
        this.id = id;
    }

    public void setClient(MapleClient c) {
        client = c;
    }

    public boolean hasFakeChar() {
        if (fakes.size() > 0) {
            return true;
        }
        return false;
    }

    public boolean get活动NPC() {
        return this.活动NPC;
    }

    public void set活动NPC(boolean set) {
        this.活动NPC = set;
    }

    public boolean get元神额外伤害() {
        return this.元神额外伤害;
    }

    public void set元神额外伤害(boolean set) {
        this.元神额外伤害 = set;
    }

    public void deleteNullItem(int characterid) throws SQLException {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM `inventoryitems` WHERE `quantity` = 0 AND `characterid` = ?");
        ps.setInt(1, characterid);
        ps.executeUpdate();
        ps.close();
    }
    public void yqm(int yqm) {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleCharacter mch : cserv.getPlayerStorage().getAllCharacters()) {
                if (yqm != mch.getPlayer().getId()) {
                    dropMessage("推广码为空.请填写正确的推广码！");
                    getClient().getSession().write(MaplePacketCreator.getCharInfo(this));
                    getMap().removePlayer(this);
                    getMap().addPlayer(this);
                    return;
                }
            }
        }
    }

    public List<FakeCharacter> getFakeChars() {
        return fakes;
    }

    public static String makeMapleReadable(String in) {
        String i = in.replace('I', 'i');
        i = i.replace('l', 'L');
        i = i.replace("rn", "Rn");
        i = i.replace("vv", "Vv");
        i = i.replace("VV", "Vv");
        return i;
    }
    
    public void startQuest(int id, int npc) {
        startQuest(id, npc, false);
    }

    public void startQuest(int id, int npc,  boolean force) {
        MapleQuest.getInstance(id).start(getPlayer(), npc, force);
    }
    
}

