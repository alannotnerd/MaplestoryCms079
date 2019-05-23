 package net.sf.cherry.net;
 
 import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import constants.ServerConfig;
 
 public enum SendPacketOpcode
   implements WritableIntValueHolder
 {
   PING, 
 
   LOGIN_STATUS, 
   CHOOSE_GENDER, 
   LICENSE_RESULT, 
   GENDER_SET, 
   PIN_OPERATION, 
   PIN_ASSIGNED, 
   SERVERLIST, 
   SERVERSTATUS, 
   SERVER_IP, 
   CHARLIST, 
   CHAR_NAME_RESPONSE, 
   RELOG_RESPONSE, 
   ADD_NEW_CHAR_ENTRY, 
   CHANNEL_SELECTED, 
   ALL_CHARLIST, 
   UPCHRLOOK,
   CHANGE_CHANNEL, 
   UPDATE_STATS, 
   FAME_RESPONSE, 
   ENABLE_TEMPORARY_STATS, 
   DISABLE_TEMPORARY_STATS, 
   UPDATE_SKILLS, 
   CHAR_CASH, 
   WARP_TO_MAP, 
   SERVERMESSAGE, 
   FAMILY_ACTION, 
   OPEN_FAMILY, 
   FAMILY_MESSAGE, 
   FAMILY_INVITE, 
   FAMILY_MESSAGE2, 
   FAMILY_SENIOR_MESSAGE, 
   FAMILY_GAIN_REP, 
   LOAD_FAMILY, 
   FAMILY_USE_REQUEST, 
   AVATAR_MEGA, 
   SPAWN_NPC, 
   SPAWN_NPC_REQUEST_CONTROLLER, 
   REMOVE_NPC, 
   SPAWN_MONSTER, 
   SPAWN_MONSTER_CONTROL, 
   MOVE_MONSTER_RESPONSE, 
 
   CHATTEXT, 
   SHOW_STATUS_INFO, 
   SHOW_QUEST_COMPLETION, 
   WHISPER, 
   SPAWN_PLAYER, 
   SHOW_SCROLL_EFFECT, 
   SHOW_ITEM_GAIN_INCHAT, 
   DOJO_WARP_UP, 
   PET_FLAG_CHANGE,
   ENERGY, 
   KILL_MONSTER, 
   DROP_ITEM_FROM_MAPOBJECT, 
   FACIAL_EXPRESSION, 
   MOVE_PLAYER, 
   MOVE_MONSTER, 
   CLOSE_RANGE_ATTACK, 
   RANGED_ATTACK, 
   MAGIC_ATTACK, 
   OPEN_NPC_SHOP, 
   CONFIRM_SHOP_TRANSACTION, 
   OPEN_STORAGE, 
   MODIFY_INVENTORY_ITEM, 
   REMOVE_PLAYER_FROM_MAP, 
   REMOVE_ITEM_FROM_MAP, 
   UPDATE_CHAR_LOOK, 
   SHOW_FOREIGN_EFFECT, 
   GIVE_FOREIGN_BUFF, 
   CANCEL_FOREIGN_BUFF, 
   DAMAGE_PLAYER, 
   CHAR_INFO, 
   UPDATE_QUEST_INFO, 
   GIVE_BUFF, 
   CANCEL_BUFF, 
   PLAYER_INTERACTION, 
   UPDATE_CHAR_BOX, 
   NPC_TALK, 
   KEYMAP, 
   AUTO_HP_POT, 
   AUTO_MP_POT, 
   SHOW_MONSTER_HP, 
   PARTY_OPERATION, 
   UPDATE_PARTYMEMBER_HP, 
   MULTICHAT, 
   APPLY_MONSTER_STATUS, 
   CANCEL_MONSTER_STATUS, 
   CLOCK, 
   SPAWN_PORTAL, 
   SPAWN_DOOR, 
   REMOVE_DOOR, 
   SPAWN_LOVE, 
   REMOVE_LOVE, 
   SPAWN_SPECIAL_MAPOBJECT, 
   REMOVE_SPECIAL_MAPOBJECT, 
   SUMMON_ATTACK, 
   MOVE_SUMMON, 
   SPAWN_MIST, 
   REMOVE_MIST, 
   DAMAGE_SUMMON, 
   DAMAGE_MONSTER, 
   BUDDYLIST, 
   SHOW_ITEM_EFFECT, 
   SHOW_CHAIR, 
   CANCEL_CHAIR, 
   SKILL_EFFECT, 
   CANCEL_SKILL_EFFECT, 
   BOSS_ENV, 
   REACTOR_SPAWN, 
   REACTOR_HIT, 
   REACTOR_DESTROY, 
   MAP_EFFECT, 
   GUILD_OPERATION, 
   ALLIANCE_OPERATION, 
   BBS_OPERATION, 
   SHOW_MAGNET, 
   MESSENGER, 
   NPC_ACTION, 
   SPAWN_PET, 
   MOVE_PET, 
   PET_CHAT, 
   PET_COMMAND, 
   PET_NAMECHANGE, 
   COOLDOWN, 
   PLAYER_HINT, 
   USE_SKILL_BOOK, 
   FORCED_MAP_EQUIP, 
   SKILL_MACRO, 
   CS_OPEN, 
   CS_UPDATE, 
   CS_OPERATION, 
   MTS_OPEN, 
   MTS_OPERATION, 
   MTS_OPERATION2, 
   PLAYER_NPC, 
   SHOW_NOTES, 
   SUMMON_SKILL, 
   ARIANT_PQ_START, 
   CATCH_MONSTER, 
   ARIANT_SCOREBOARD, 
   ZAKUM_SHRINE, 
   BOAT_EFFECT, 
   CHALKBOARD, 
   DUEY, 
   MONSTER_CARNIVAL_START, 
   MONSTER_CARNIVAL_OBTAINED_CP, 
   MONSTER_CARNIVAL_PARTY_CP, 
   MONSTER_CARNIVAL_SUMMON, 
   MONSTER_CARNIVAL_DIED, 
   SEND_TV, 
   REMOVE_TV, 
   ENABLE_TV, 
   TROCK_LOCATIONS, 
   SPOUSE_CHAT, 
   REPORT_PLAYER_MSG, 
   SPAWN_HIRED_MERCHANT, 
   DESTROY_HIRED_MERCHANT, 
   UPDATE_HIRED_MERCHANT, 
   GM_POLICE, 
   UPDATE_MOUNT, 
   GM, 
   MONSTERBOOK_ADD, 
   MONSTER_BOOK_CHANGE_COVER, 
   CYGNUS_INTRO_LOCK, 
   CYGNUS_INTRO_DISABLE_UI, 
   CYGNUS_CHAR_CREATED, 
   TUTORIAL_DISABLE_UI, 
   TUTORIAL_LOCK_UI, 
   TUTORIAL_SUMMON, 
   TUTORIAL_GUIDE, 
   SHOW_INFO, 
   COMBO_EFFECE, 
   Animation_EFFECT, 
   VICIOUS_HAMMER, 
   BLOCK_MSG, 
   FAMILY;
 
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
     FileInputStream fileInputStream = new FileInputStream(ServerConfig.sendops_FILE_NAME);
     props.load(fileInputStream);
     fileInputStream.close();
     return props;
   }
 
   static
   {
     try {
       ExternalCodeTableGetter.populateValues(getDefaultProperties(), values());
     } catch (IOException e) {
       throw new RuntimeException("Failed to load sendops", e);
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.SendPacketOpcode
 * JD-Core Version:    0.6.0
 */