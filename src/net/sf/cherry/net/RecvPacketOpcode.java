package net.sf.cherry.net;
 
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import constants.ServerConfig;
 
 public enum RecvPacketOpcode
   implements WritableIntValueHolder
 {
   PONG, 
   CLIENT_ERROR, 
   STRANGE_DATA, 
   TEMP_SKILL,
   LOGIN_PASSWORD, 
   GUEST_LOGIN, 
   LICENSE_REQUEST, 
   SERVERLIST_REREQUEST, 
   CHARLIST_REQUEST, 
   SERVERSTATUS_REQUEST, 
   SET_GENDER, 
   AFTER_LOGIN, 
   REGISTER_PIN, 
   SERVERLIST_REQUEST, 
   TO_WORLDLIST, 
   VIEW_ALL_CHAR_REQUEST, 
   VIEW_ALL_CHAR_CONNECT, 
   VIEW_ALL_CHAR, 
   CHAR_SELECT, 
   CHECK_CHAR_NAME, 
   CREATE_CHAR, 
   ERROR_LOG, 
   RELOG, 
   
   PLAYER_LOGGEDIN, 
   CHANGE_MAP, 
   CHANGE_CHANNEL, 
   ENTER_CASH_SHOP, 
   MOVE_PLAYER, 
   CANCEL_CHAIR, 
   USE_CHAIR, 
   CLOSE_RANGE_ATTACK, 
   RANGED_ATTACK, 
   MAGIC_ATTACK, 
   PASSIVE_ENERGY, 
   ENERGY_CHARGE_ATTACK, 
   TAKE_DAMAGE, 
   GENERAL_CHAT, 
   CLOSE_CHALKBOARD, 
   FACE_EXPRESSION, 
   USE_ITEMEFFECT, 
   NPC_TALK, 
   NPC_TALK_MORE, 
   NPC_SHOP, 
   STORAGE, 
   HIRED_MERCHANT_REQUEST, 
   DUEY_ACTION, 
   ITEM_SORT, 
   ITEM_MOVE, 
   ITEM_MZD,
   ITEM_BAOWU,//宝物盒
   ITEM_SUNZI,//孙子兵法
   USE_ITEM, 
   USE_ITEMS,
   CANCEL_ITEM_EFFECT, 
   USE_FISHING_ITEM, 
   USE_SUMMON_BAG, 
   PET_FOOD, 
   USE_MOUNT_FOOD, 
   USE_CASH_ITEM, 
   USE_CATCH_ITEM, 
   USE_SKILL_BOOK, 
   USE_RETURN_SCROLL, 
   MAKER_SKILL, 
   USE_UPGRADE_SCROLL, 
   DISTRIBUTE_AP, 
   DISTRIBUTE_AUTO_AP, 
   HEAL_OVER_TIME, 
   DISTRIBUTE_SP, 
   SPECIAL_MOVE, 
   CANCEL_BUFF, 
   SKILL_EFFECT, 
   MESO_DROP, 
   GIVE_FAME, 
   CHAR_INFO_REQUEST, 
   MOB_DAMAGED, 
   SPAWN_PET, 
   CANCEL_DEBUFF, 
   CHANGE_MAP_SPECIAL, 
   USE_INNER_PORTAL, 
   TROCK_ADD_MAP, 
   QUEST_ACTION, 
   EFFECT_ON_OFF, 
   THROW_BOMB, 
   SKILL_MACRO, 
   REPORT_PLAYER, 
   TREASUER_CHEST, 
   MULTI_CHAT, 
   WHISPER, 
   SPOUSE_CHAT, 
   MESSENGER, 
   PLAYER_INTERACTION, 
   PARTY_OPERATION, 
   DENY_PARTY_REQUEST, 
   GUILD_OPERATION, 
   DENY_GUILD_REQUEST, 
   BUDDYLIST_MODIFY, 
   NOTE_ACTION, 
   USE_DOOR, 
   CHANGE_KEYMAP, 
   RING_ACTION, 
   OPEN_FAMILY, 
   ADD_FAMILY, 
   ACCEPT_FAMILY, 
   USE_FAMILY, 
   ALLIANCE_OPERATION, 
   BBS_OPERATION, 
   ENTER_MTS, 
   SOLOMON, 
   MOVE_PET, 
   PET_CHAT, 
   PET_COMMAND, 
   PET_LOOT, 
   PET_AUTO_POT, 
   MOVE_SUMMON, 
   SUMMON_ATTACK, 
   DAMAGE_SUMMON, 
   MOVE_LIFE, 
   AUTO_AGGRO, 
   MOB_DAMAGE_MOB, 
   MONSTER_BOMB, 
   NPC_ACTION, 
   ITEM_PICKUP, 
   HYPNOTIZE, 
   DAMAGE_REACTOR, 
   TOUCH_REACTOR, 
   MONSTER_CARNIVAL, 
   OBJECT_REQUEST, 
   PARTY_SEARCH_REGISTER, 
   PARTY_SEARCH_START, 
   PLAYER_UPDATE, 
   TOUCHING_CS, 
   CASH_SHOP, 
   COUPON_CODE, 
   MAPLETV, 
   MTS_OP, 
   SCRIPTED_ITEM, 
   REVIVE_ITEM, 
   SUMMON_TALK, 
   MONSTER_BOOK_COVER,
   quest_KJ,   //快捷交任务
   CHANGE_MAP_COMPLETE,
   //MTS_SJ,
   ChatRoom_SYSTEM;
 
   private int code = -2;
 
   public void setValue(int code) {
     this.code = code;
   }
 
   public int getValue()
   {
     return this.code;
   }
 
   public static Properties getDefaultProperties() throws FileNotFoundException, IOException {
	 Properties props = new Properties();
	 FileInputStream fis = new FileInputStream(ServerConfig.recvops_FILE_NAME);
	 props.load(fis);
	 fis.close();
	 return props;
   }
 
   static
   {
     try {
       ExternalCodeTableGetter.populateValues(getDefaultProperties(), values());
     } catch (IOException e) {
       throw new RuntimeException("Failed to load recvops", e);
     }
   }
 }