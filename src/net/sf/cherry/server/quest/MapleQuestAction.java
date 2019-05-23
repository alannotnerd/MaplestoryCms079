
package net.sf.cherry.server.quest;

import java.util.HashMap;
import java.util.Map;

import net.sf.cherry.client.InventoryException;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.client.MapleJob;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.client.MapleStat;
import net.sf.cherry.client.Skill;
import net.sf.cherry.client.SkillFactory;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.Constants.InventoryConstants;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.server.MapleInventoryManipulator;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class MapleQuestAction {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleQuestAction.class);
    private MapleQuestActionType type;
    private MapleData data;
    private MapleQuest quest;

    /** Creates a new instance of MapleQuestAction */
    public MapleQuestAction(MapleQuestActionType type, MapleData data, MapleQuest quest) {
        this.type = type;
        this.data = data;
        this.quest = quest;
    }

    public boolean check(MapleCharacter c) {
        switch (type) {
            case MESO:
                int mesars = MapleDataTool.getInt(data);
                if (c.getMeso() + mesars < 0) {
                    return false;
                }
                break;
        }
        return true;
    }

    private boolean canGetItem(MapleData item, MapleCharacter c) {
        if (item.getChildByPath("gender") != null) {
            int gender = MapleDataTool.getInt(item.getChildByPath("gender"));
            if (gender != 2 && gender != c.getGender()) {
                return false;
            }
        }
        if (item.getChildByPath("job") != null) {
            int job = MapleDataTool.getInt(item.getChildByPath("job"));
            if (job < 100) {
                if (MapleJob.getBy5ByteEncoding(job).getId() / 100 != c.getJob().getId() / 100) {
                    return false;
                }
            } else {
                if (job != c.getJob().getId()) {
                    return false;
                }
            }
        }
        return true;
    }

    public void run(MapleCharacter c, Integer extSelection) {
        MapleQuestStatus status;
        ServernoticeMapleClientMessageCallback snmcmc = new ServernoticeMapleClientMessageCallback(c.getClient());
        switch (type) {
            case EXP:
                status = c.getQuest(quest);
              if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0) {
                    break;
                }
                c.gainExp(MapleDataTool.getInt(data)/* * ChannelServer.getInstance(c.getClient().getChannel()).getExpRate()*/, true, true);
                break;
            case ITEM:
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                Map<Integer, Integer> props = new HashMap<Integer, Integer>();
                for (MapleData iEntry : data.getChildren()) {
                    if (iEntry.getChildByPath("prop") != null && MapleDataTool.getInt(iEntry.getChildByPath("prop")) != -1 && canGetItem(iEntry, c)) {
                        for (int i = 0; i < MapleDataTool.getInt(iEntry.getChildByPath("prop")); i++) {
                            props.put(props.size(), MapleDataTool.getInt(iEntry.getChildByPath("id")));
                        }
                    }
                }
                int selection = 0;
                int extNum = 0;
                if (props.size() > 0) {
                    selection = props.get((int) (Math.random() * props.size()));
                }
                for (MapleData iEntry : data.getChildren()) {
                    if (!canGetItem(iEntry, c)) {
                        continue;
                    }
                    if (iEntry.getChildByPath("prop") != null) {
                        if (MapleDataTool.getInt(iEntry.getChildByPath("prop")) == -1) {
                            if (extSelection != extNum++) {
                                continue;
                            }
                        } else if (MapleDataTool.getInt(iEntry.getChildByPath("id")) != selection) {
                            continue;
                        }
                    }
                    if (MapleDataTool.getInt(iEntry.getChildByPath("count"), 0) < 0) { // remove items

                        int itemId = MapleDataTool.getInt(iEntry.getChildByPath("id"));
                        MapleInventoryType iType = ii.getInventoryType(itemId);
                        short quantity = (short) (MapleDataTool.getInt(iEntry.getChildByPath("count"), 0) * -1);
                        try {
                            MapleInventoryManipulator.removeById(c.getClient(), iType, itemId, quantity, true, false);
                        } catch (InventoryException ie) {
                            log.warn("[h4x] Completing a quest without meeting the requirements", ie);
                        }
                        c.getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, (short) MapleDataTool.getInt(iEntry.getChildByPath("count"), 0), true));
                    } else { // add items

                        int itemId = MapleDataTool.getInt(iEntry.getChildByPath("id"));
                        short quantity = (short) MapleDataTool.getInt(iEntry.getChildByPath("count"), 0);
                        StringBuilder logInfo = new StringBuilder(c.getName());
                        logInfo.append(" received ");
                        logInfo.append(quantity);
                        logInfo.append(" as reward from a quest");
                        MapleInventoryManipulator.addById(c.getClient(), itemId, quantity, logInfo.toString(), null, -1);
                        c.getClient().getSession().write(MaplePacketCreator.getShowItemGain(itemId, quantity, true));
                    }
                }
                break;
            case NEXTQUEST:
                status = c.getQuest(quest);
                int nextQuest = MapleDataTool.getInt(data);
                if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0) {
                    break;
                }
                c.getClient().getSession().write(MaplePacketCreator.updateQuestFinish((short) quest.getId(), status.getNpc(), (short) nextQuest));
                MapleQuest.getInstance(nextQuest).start(c, status.getNpc());
                break;
            case MESO:
                status = c.getQuest(quest);
                if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0) {
                    break;
                }
                c.gainMeso(MapleDataTool.getInt(data), true, false, true);
                break;
            case QUEST:
                for (MapleData qEntry : data) {
                    int questid = MapleDataTool.getInt(qEntry.getChildByPath("id"));
                    int stat = MapleDataTool.getInt(qEntry.getChildByPath("state"), 0);
                    c.updateQuest(new MapleQuestStatus(MapleQuest.getInstance(questid), MapleQuestStatus.Status.getById(stat)));
                }
                break;
           case SKILL:
               for (MapleData sEntry : data) {
                    int skillid = MapleDataTool.getInt(sEntry.getChildByPath("id"));
                    //int skillLevel =  MapleDataTool.getInt(sEntry.getChildByPath("skillLevel"));
                    int masterLevel = MapleDataTool.getInt(sEntry.getChildByPath("masterLevel"));
                    Skill skillObject = (Skill) SkillFactory.getSkill(skillid);
                    boolean shouldLearn = false;
                    MapleData applicableJobs = sEntry.getChildByPath("job");
                    for (MapleData applicableJob : applicableJobs) {
                        MapleJob job = MapleJob.getById(MapleDataTool.getInt(applicableJob));
                        if (c.getJob() == job) {
                            shouldLearn = true;
                            break;
                        }
                    }
                    if (skillObject.isBeginnerSkill()) {
                        shouldLearn = true;
                    }
                   // skillLevel =  Math.max(skillLevel, c.getSkillLevel(skillObject));
                    masterLevel = Math.max(masterLevel, c.getMasterLevel(skillObject));
                    if (shouldLearn) {
                       c.changeSkillLevel(skillObject, 1, masterLevel);
                        snmcmc.dropMessage("你获得了技能" + SkillFactory.getSkillName(skillid) + " 等级为1级。 最大等级 " + masterLevel);
                    }
                }
                break;
            case FAME:
                status = c.getQuest(quest);
                if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0) {
                    break;
                }
                c.addFame(MapleDataTool.getInt(data));
                c.updateSingleStat(MapleStat.FAME, c.getFame());
                int fameGain = MapleDataTool.getInt(data);
                c.getClient().getSession().write(MaplePacketCreator.getShowFameGain(fameGain));
                break;
            case BUFF:
                status = c.getQuest(quest);
                if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0) {
                    break;
                }
                MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
                mii.getItemEffect(MapleDataTool.getInt(data)).applyTo(c);
                break;
            case PETSKILL:
                status = c.getQuest(quest);
                if (status.getStatus() == MapleQuestStatus.Status.NOT_STARTED && status.getForfeited() > 0)
                    break;
                int flag = MapleDataTool.getInt("petskill", data);
                c.getPet(0).setFlag((byte) (c.getPet(0).getFlag() | InventoryConstants.Items.Flags.getFlagByInt(flag)));
                break;
            default:
        }
    }

    public MapleData getData() {
        return data;
    }

    public MapleQuestActionType getType() {
        return type;
    }

    @Override
    public String toString() {
        return type + ": " + data;
    }
}