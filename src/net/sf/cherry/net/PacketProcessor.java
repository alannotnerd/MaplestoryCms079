package net.sf.cherry.net;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.net.channel.handler.*;
import net.sf.cherry.net.channel.handler.MZD;
import net.sf.cherry.net.handler.KeepAliveHandler;
import net.sf.cherry.net.handler.LoginRequiringNoOpHandler;
import net.sf.cherry.net.handler.NoOpHandler;
import net.sf.cherry.net.login.handler.AfterLoginHandler;
import net.sf.cherry.net.login.handler.CharSelectedHandler;
import net.sf.cherry.net.login.handler.CharlistRequestHandler;
import net.sf.cherry.net.login.handler.CheckCharNameHandler;
import net.sf.cherry.net.login.handler.CreateCharHandler;
import net.sf.cherry.net.login.handler.ErrorLogHandler;
import net.sf.cherry.net.login.handler.LicenseRequest;
import net.sf.cherry.net.login.handler.LoginPasswordHandler;
import net.sf.cherry.net.login.handler.PickCharHandler;
import net.sf.cherry.net.login.handler.RelogRequestHandler;
import net.sf.cherry.net.login.handler.ServerStatusRequestHandler;
import net.sf.cherry.net.login.handler.ServerlistRequestHandler;
import net.sf.cherry.net.login.handler.SetGenderHandler;
import net.sf.cherry.net.login.handler.SetPinHandler;
import net.sf.cherry.net.login.handler.ToWorldListHandler;
import net.sf.cherry.net.login.handler.UpdateHandler;
import net.sf.cherry.net.login.handler.ViewAllCharHandler;
import net.sf.cherry.net.login.handler.ViewCharHandler;

public final class PacketProcessor {

    private static Logger log = LoggerFactory.getLogger(PacketProcessor.class);
    private static PacketProcessor instance;
    private MaplePacketHandler[] handlers;

    private PacketProcessor() {
        int maxRecvOp = 0;
        for (RecvPacketOpcode op : RecvPacketOpcode.values()) {
            if (op.getValue() > maxRecvOp) {
                maxRecvOp = op.getValue();
            }
        }
        this.handlers = new MaplePacketHandler[maxRecvOp + 1];
    }

    public MaplePacketHandler getHandler(short packetId) {
        if (packetId > this.handlers.length) {
            return null;
        }
        MaplePacketHandler handler = this.handlers[packetId];
        if (handler != null) {
            return handler;
        }
        return null;
    }

    public void registerHandler(RecvPacketOpcode code, MaplePacketHandler handler) {
        try {
            this.handlers[code.getValue()] = handler;
        } catch (ArrayIndexOutOfBoundsException aiobe) {
        	System.out.println(code.toString());
            log.error("Check your Recv Packet Opcodes - Something is wrong. " + aiobe);
        }
    }

    public static synchronized PacketProcessor getProcessor(Mode mode) {
        if (instance == null) {
            instance = new PacketProcessor();
            instance.reset(mode);
        }
        return instance;
    }

    public void reset(Mode mode) {
        this.handlers = new MaplePacketHandler[this.handlers.length];
        registerHandler(RecvPacketOpcode.PONG, new KeepAliveHandler());
        registerHandler(RecvPacketOpcode.CLIENT_ERROR, NoOpHandler.getInstance());
        registerHandler(RecvPacketOpcode.STRANGE_DATA, NoOpHandler.getInstance());
        if (mode == Mode.LOGINSERVER) {
            registerHandler(RecvPacketOpcode.LOGIN_PASSWORD, new LoginPasswordHandler());
            registerHandler(RecvPacketOpcode.SERVERLIST_REREQUEST, new ServerlistRequestHandler());
            registerHandler(RecvPacketOpcode.CHARLIST_REQUEST, new CharlistRequestHandler());
            registerHandler(RecvPacketOpcode.SERVERSTATUS_REQUEST, new ServerStatusRequestHandler());
            registerHandler(RecvPacketOpcode.LICENSE_REQUEST, new LicenseRequest());
            registerHandler(RecvPacketOpcode.SET_GENDER, new SetGenderHandler());
            registerHandler(RecvPacketOpcode.AFTER_LOGIN, new AfterLoginHandler());
            registerHandler(RecvPacketOpcode.REGISTER_PIN, new SetPinHandler());
            registerHandler(RecvPacketOpcode.SERVERLIST_REQUEST, new ServerlistRequestHandler());
            registerHandler(RecvPacketOpcode.TO_WORLDLIST, new ToWorldListHandler());
            registerHandler(RecvPacketOpcode.VIEW_ALL_CHAR_REQUEST, new ViewCharHandler());
            registerHandler(RecvPacketOpcode.VIEW_ALL_CHAR_CONNECT, new PickCharHandler());
            registerHandler(RecvPacketOpcode.VIEW_ALL_CHAR, new ViewAllCharHandler());
            registerHandler(RecvPacketOpcode.CHAR_SELECT, new CharSelectedHandler());
            registerHandler(RecvPacketOpcode.CHECK_CHAR_NAME, new CheckCharNameHandler());
            registerHandler(RecvPacketOpcode.CREATE_CHAR, new CreateCharHandler());
            registerHandler(RecvPacketOpcode.PLAYER_UPDATE, new UpdateHandler());
            registerHandler(RecvPacketOpcode.ERROR_LOG, new ErrorLogHandler());
            registerHandler(RecvPacketOpcode.RELOG, new RelogRequestHandler());
        } else if (mode == Mode.CHANNELSERVER) {
            registerHandler(RecvPacketOpcode.PLAYER_LOGGEDIN, new PlayerLoggedinHandler());
            registerHandler(RecvPacketOpcode.STRANGE_DATA, LoginRequiringNoOpHandler.getInstance());
            registerHandler(RecvPacketOpcode.OPEN_FAMILY, new OpenFamilyHandler());
            registerHandler(RecvPacketOpcode.ADD_FAMILY, new FamilyAddHandler());
            registerHandler(RecvPacketOpcode.USE_FAMILY, new FamilyUseHandler());
            registerHandler(RecvPacketOpcode.ACCEPT_FAMILY, new AcceptFamilyHandler());
            registerHandler(RecvPacketOpcode.CHANGE_MAP, new ChangeMapHandler());
            registerHandler(RecvPacketOpcode.CHANGE_MAP_COMPLETE, new ChangeMapCompleteHandler());
            registerHandler(RecvPacketOpcode.CHANGE_CHANNEL, new ChangeChannelHandler());
            registerHandler(RecvPacketOpcode.ENTER_CASH_SHOP, new EnterCashShopHandler());
            registerHandler(RecvPacketOpcode.MOVE_PLAYER, new MovePlayerHandler());
            registerHandler(RecvPacketOpcode.CANCEL_CHAIR, new CancelChairHandler());
            registerHandler(RecvPacketOpcode.USE_CHAIR, new UseChairHandler());
            registerHandler(RecvPacketOpcode.CLOSE_RANGE_ATTACK, new CloseRangeDamageHandler());
            registerHandler(RecvPacketOpcode.RANGED_ATTACK, new RangedAttackHandler());
            registerHandler(RecvPacketOpcode.MAGIC_ATTACK, new MagicDamageHandler());
            registerHandler(RecvPacketOpcode.PASSIVE_ENERGY, new PassiveEnergyHandler());
            registerHandler(RecvPacketOpcode.ENERGY_CHARGE_ATTACK, new EnergyAttackHandler());
            registerHandler(RecvPacketOpcode.TAKE_DAMAGE, new TakeDamageHandler());
            registerHandler(RecvPacketOpcode.GENERAL_CHAT, new GeneralchatHandler());
            registerHandler(RecvPacketOpcode.CLOSE_CHALKBOARD, new CloseChalkboardHandler());
            registerHandler(RecvPacketOpcode.FACE_EXPRESSION, new FaceExpressionHandler());
            registerHandler(RecvPacketOpcode.USE_ITEMEFFECT, new UseItemEffectHandler());
            registerHandler(RecvPacketOpcode.NPC_TALK, new NPCTalkHandler());
            registerHandler(RecvPacketOpcode.NPC_TALK_MORE, new NPCMoreTalkHandler());
            registerHandler(RecvPacketOpcode.NPC_SHOP, new NPCShopHandler());
            registerHandler(RecvPacketOpcode.STORAGE, new StorageHandler());
            registerHandler(RecvPacketOpcode.HIRED_MERCHANT_REQUEST, new HiredMerchantRequestHandler());
            registerHandler(RecvPacketOpcode.DUEY_ACTION, new DueyActionHandler());
            registerHandler(RecvPacketOpcode.ITEM_SORT, new ItemSortHandler());
            registerHandler(RecvPacketOpcode.ITEM_MOVE, new ItemMoveHandler());
            registerHandler(RecvPacketOpcode.USE_ITEM, new UseItemHandler());//UNKNOWN
            registerHandler(RecvPacketOpcode.ITEM_BAOWU, new BAOWUHE());//黑龙箱子之类的宝物盒
            //registerHandler(RecvPacketOpcode.MTS_SJ, new MTSHandler());//666
            registerHandler(RecvPacketOpcode.ITEM_SUNZI, new SunziBF());
            registerHandler(RecvPacketOpcode.ITEM_MZD, new MZD());//迷之蛋
            registerHandler(RecvPacketOpcode.CANCEL_ITEM_EFFECT, new CancelItemEffectHandler());
            registerHandler(RecvPacketOpcode.USE_FISHING_ITEM, new FishingHandler());
            registerHandler(RecvPacketOpcode.USE_SUMMON_BAG, new UseSummonBag());
            registerHandler(RecvPacketOpcode.PET_FOOD, new PetFoodHandler());
            registerHandler(RecvPacketOpcode.USE_MOUNT_FOOD, new MountFoodHandler());
            registerHandler(RecvPacketOpcode.USE_CASH_ITEM, new UseCashItemHandler());
            registerHandler(RecvPacketOpcode.USE_CATCH_ITEM, new UseCatchItemHandler());
            registerHandler(RecvPacketOpcode.USE_SKILL_BOOK, new SkillBookHandler());
            registerHandler(RecvPacketOpcode.USE_RETURN_SCROLL, new UseReturnScrollHandler());
            registerHandler(RecvPacketOpcode.MAKER_SKILL, new MakerSkillHandler());
            registerHandler(RecvPacketOpcode.USE_UPGRADE_SCROLL, new ScrollHandler());
            registerHandler(RecvPacketOpcode.DISTRIBUTE_AP, new DistributeAPHandler());
            registerHandler(RecvPacketOpcode.DISTRIBUTE_AUTO_AP, new DistributeAutoAPHandler());
            registerHandler(RecvPacketOpcode.HEAL_OVER_TIME, new HealOvertimeHandler());
            registerHandler(RecvPacketOpcode.DISTRIBUTE_SP, new DistributeSPHandler());
            registerHandler(RecvPacketOpcode.SPECIAL_MOVE, new SpecialMoveHandler());
            registerHandler(RecvPacketOpcode.CANCEL_BUFF, new CancelBuffHandler());
            registerHandler(RecvPacketOpcode.SKILL_EFFECT, new SkillEffectHandler());
            registerHandler(RecvPacketOpcode.MESO_DROP, new MesoDropHandler());
            registerHandler(RecvPacketOpcode.GIVE_FAME, new GiveFameHandler());
            registerHandler(RecvPacketOpcode.CHAR_INFO_REQUEST, new CharInfoRequestHandler());
            registerHandler(RecvPacketOpcode.SPAWN_PET, new SpawnPetHandler());
            registerHandler(RecvPacketOpcode.CANCEL_DEBUFF, new CancelDebuffHandler());
            registerHandler(RecvPacketOpcode.CHANGE_MAP_SPECIAL, new ChangeMapSpecialHandler());
            registerHandler(RecvPacketOpcode.USE_INNER_PORTAL, new InnerPortalHandler());
            registerHandler(RecvPacketOpcode.TROCK_ADD_MAP, new TrockAddMapHandler());
            registerHandler(RecvPacketOpcode.QUEST_ACTION, new QuestActionHandler());
            registerHandler(RecvPacketOpcode.EFFECT_ON_OFF, NoOpHandler.getInstance());
            registerHandler(RecvPacketOpcode.THROW_BOMB, NoOpHandler.getInstance());
            registerHandler(RecvPacketOpcode.SKILL_MACRO, new SkillMacroHandler());
            registerHandler(RecvPacketOpcode.REPORT_PLAYER, new ReportPlayerHandler());
            registerHandler(RecvPacketOpcode.MULTI_CHAT, new MultiChatHandler());
            registerHandler(RecvPacketOpcode.WHISPER, new WhisperHandler());
            registerHandler(RecvPacketOpcode.SPOUSE_CHAT, new SpouseChatHandler());
            registerHandler(RecvPacketOpcode.MESSENGER, new MessengerHandler());
            registerHandler(RecvPacketOpcode.PLAYER_INTERACTION, new PlayerInteractionHandler());
            registerHandler(RecvPacketOpcode.PARTY_OPERATION, new PartyOperationHandler());
            registerHandler(RecvPacketOpcode.DENY_PARTY_REQUEST, new DenyPartyRequestHandler());
            registerHandler(RecvPacketOpcode.GUILD_OPERATION, new GuildOperationHandler());
            registerHandler(RecvPacketOpcode.DENY_GUILD_REQUEST, new DenyGuildRequestHandler());
            registerHandler(RecvPacketOpcode.BUDDYLIST_MODIFY, new BuddylistModifyHandler());
            registerHandler(RecvPacketOpcode.NOTE_ACTION, new NoteActionHandler());
            registerHandler(RecvPacketOpcode.USE_DOOR, new DoorHandler());
            registerHandler(RecvPacketOpcode.CHANGE_KEYMAP, new KeymapChangeHandler());
            registerHandler(RecvPacketOpcode.RING_ACTION, new RingActionHandler());
            registerHandler(RecvPacketOpcode.ALLIANCE_OPERATION, new AllianceOperationHandler());
            registerHandler(RecvPacketOpcode.BBS_OPERATION, new BBSOperationHandler());
            registerHandler(RecvPacketOpcode.ENTER_MTS, new EnterMTSHandler());
            registerHandler(RecvPacketOpcode.SOLOMON, new SolomonHandler());
            registerHandler(RecvPacketOpcode.MOVE_PET, new MovePetHandler());
            registerHandler(RecvPacketOpcode.PET_CHAT, new PetChatHandler());
            registerHandler(RecvPacketOpcode.PET_COMMAND, new PetCommandHandler());
            registerHandler(RecvPacketOpcode.PET_LOOT, new PetLootHandler());
            registerHandler(RecvPacketOpcode.PET_AUTO_POT, new PetAutoPotHandler());
            registerHandler(RecvPacketOpcode.MOVE_SUMMON, new MoveSummonHandler());
            registerHandler(RecvPacketOpcode.SUMMON_ATTACK, new SummonDamageHandler());
            registerHandler(RecvPacketOpcode.DAMAGE_SUMMON, new DamageSummonHandler());
            registerHandler(RecvPacketOpcode.MOVE_LIFE, new MoveLifeHandler());
            registerHandler(RecvPacketOpcode.AUTO_AGGRO, new AutoAggroHandler());
            registerHandler(RecvPacketOpcode.MONSTER_BOMB, new MonsterBombHandler());
            registerHandler(RecvPacketOpcode.NPC_ACTION, new NPCAnimation());
            registerHandler(RecvPacketOpcode.ITEM_PICKUP, new ItemPickupHandler());
            registerHandler(RecvPacketOpcode.HYPNOTIZE, new HypnotizeHandler());
            registerHandler(RecvPacketOpcode.DAMAGE_REACTOR, new ReactorHitHandler());
            registerHandler(RecvPacketOpcode.TOUCH_REACTOR, new TouchReactorHandler());
            registerHandler(RecvPacketOpcode.MOB_DAMAGE_MOB, new FriendlyMobDamagedHandler());
            registerHandler(RecvPacketOpcode.MONSTER_CARNIVAL, new MonsterCarnivalHandler());
            registerHandler(RecvPacketOpcode.OBJECT_REQUEST, NoOpHandler.getInstance());
            registerHandler(RecvPacketOpcode.PARTY_SEARCH_REGISTER, new PartySearchRegisterHandler());
            registerHandler(RecvPacketOpcode.PARTY_SEARCH_START, new PartySearchStartHandler());
            registerHandler(RecvPacketOpcode.PLAYER_UPDATE, new PlayerUpdateHandler());
            registerHandler(RecvPacketOpcode.TOUCHING_CS, new TouchingCashShopHandler());
            registerHandler(RecvPacketOpcode.CASH_SHOP, new CashShopHandler());
            registerHandler(RecvPacketOpcode.COUPON_CODE, new CouponCodeHandler());
            registerHandler(RecvPacketOpcode.MAPLETV, new MapleTVHandler());
            registerHandler(RecvPacketOpcode.MTS_OP, new MTSHandler());
            registerHandler(RecvPacketOpcode.SCRIPTED_ITEM, new ScriptedItemHandler());
            registerHandler(RecvPacketOpcode.REVIVE_ITEM, new ReviveItemHandler());
            registerHandler(RecvPacketOpcode.MONSTER_BOOK_COVER, new MonsterBookCoverHandler());
            registerHandler(RecvPacketOpcode.MOB_DAMAGED, new MobDamagedHandler());
            registerHandler(RecvPacketOpcode.SUMMON_TALK, new SummonTalkHandler());
            registerHandler(RecvPacketOpcode.ChatRoom_SYSTEM, new ChatRoomHandler());
            registerHandler(RecvPacketOpcode.quest_KJ, new QuestKJHandler());
        } else {
            throw new RuntimeException("未知的包处理器模式.");
        }
    }

    public static enum Mode {
        LOGINSERVER,
        CHANNELSERVER;
    }
}
