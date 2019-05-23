package net.sf.cherry.server.quest;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleQuestStatus;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.StringUtil;

public class MapleQuest {

    private static Map<Integer, MapleQuest> quests = new HashMap();
    protected int id;
    protected List<MapleQuestRequirement> startReqs;
    protected List<MapleQuestRequirement> completeReqs;
    protected List<MapleQuestAction> startActs;
    protected List<MapleQuestAction> completeActs;
    protected List<Integer> relevantMobs; //相关怪物
    private boolean autoStart;
    private boolean autoPreComplete;
    private boolean repeatable = false;
    private static MapleDataProvider questData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Quest.wz"));
    private static MapleData actions = questData.getData("Act.img");
    private static MapleData requirements = questData.getData("Check.img");
    private static MapleData info = questData.getData("QuestInfo.img");
    protected static final Logger log = LoggerFactory.getLogger(MapleQuest.class);

    protected MapleQuest() {
        this.relevantMobs = new LinkedList();
    }

    private MapleQuest(int id) {
        this.id = id;
        MapleData reqData = requirements.getChildByPath(String.valueOf(id));
        if (reqData == null) {//most likely infoEx
            return;
        }
        MapleData startReqData = reqData.getChildByPath("0");
        this.relevantMobs = new LinkedList();
        //MapleData startReqData = requirements.getChildByPath(String.valueOf(id)).getChildByPath("0");
        this.startReqs = new LinkedList();
        if (startReqData != null) {
            for (MapleData startReq : startReqData.getChildren()) {
                MapleQuestRequirementType type = MapleQuestRequirementType.getByWZName(startReq.getName());
                if (type.equals(MapleQuestRequirementType.INTERVAL)) {
                    this.repeatable = true;
                }
                MapleQuestRequirement req = new MapleQuestRequirement(this, type, startReq);
                if (req.getType().equals(MapleQuestRequirementType.MOB)) {
                    for (MapleData mob : startReq.getChildren()) {
                        this.relevantMobs.add(Integer.valueOf(MapleDataTool.getInt(mob.getChildByPath("id"))));
                    }
                }
                this.startReqs.add(req);
            }
        }
        MapleData completeReqData = requirements.getChildByPath(String.valueOf(id)).getChildByPath("1");
        this.completeReqs = new LinkedList();
        if (completeReqData != null) {
            for (MapleData completeReq : completeReqData.getChildren()) {
                MapleQuestRequirement req = new MapleQuestRequirement(this, MapleQuestRequirementType.getByWZName(completeReq.getName()), completeReq);
                if (req.getType().equals(MapleQuestRequirementType.MOB)) {
                    for (MapleData mob : completeReq.getChildren()) {
                        this.relevantMobs.add(Integer.valueOf(MapleDataTool.getInt(mob.getChildByPath("id"))));
                    }
                }
                this.completeReqs.add(req);
            }
        }

        MapleData actData = actions.getChildByPath(String.valueOf(id));
        if (actData == null) {
            return;
        }
        final MapleData startActData = actData.getChildByPath("0");
       // MapleData startActData = actions.getChildByPath(String.valueOf(id)).getChildByPath("0");
        this.startActs = new LinkedList();
        if (startActData != null) {
            for (MapleData startAct : startActData.getChildren()) {
                MapleQuestActionType questActionType = MapleQuestActionType.getByWZName(startAct.getName());
                this.startActs.add(new MapleQuestAction(questActionType, startAct, this));
            }
        }
        MapleData completeActData = actions.getChildByPath(String.valueOf(id)).getChildByPath("1");
        this.completeActs = new LinkedList();
        if (completeActData != null) {
            for (MapleData completeAct : completeActData.getChildren()) {
                this.completeActs.add(new MapleQuestAction(MapleQuestActionType.getByWZName(completeAct.getName()), completeAct, this));
            }
        }
        MapleData questInfo = info.getChildByPath(String.valueOf(id));
        this.autoStart = (MapleDataTool.getInt("autoStart", questInfo, 0) == 1);
        this.autoPreComplete = (MapleDataTool.getInt("autoPreComplete", questInfo, 0) == 1);
    }

    public static MapleQuest getInstance(int id) {
        MapleQuest ret = (MapleQuest) quests.get(Integer.valueOf(id));
        if (ret == null) {
            try {
                ret = new MapleQuest(id);
            } catch (Exception e) {
                ret = new MapleCustomQuest(id);
            }
            quests.put(Integer.valueOf(id), ret);
        }
        return ret;
    }

    private boolean canStart(MapleCharacter c, Integer npcid) {
        //如果当前不等于 可以开始 和 不等于 已经完成 ---------- 那么就是等于 = 进行中
        if ((c.getQuest(this).getStatus() != MapleQuestStatus.Status.NOT_STARTED/*可以开始*/) && ((c.getQuest(this).getStatus() != MapleQuestStatus.Status.COMPLETED/*已经完成*/) || (!this.repeatable))) {
            // System.out.println("1");
            return false;

        }
        for (MapleQuestRequirement r : this.startReqs) {
            if (!r.check(c, npcid)) {
                //  System.out.println("2");
                return false;
            }
        }
        return true;
    }

    public static void remove(int questid) {
        if (quests.containsKey(Integer.valueOf(questid))) {
            quests.remove(Integer.valueOf(questid));
        }
    }

    public boolean canComplete(MapleCharacter c, Integer npcid) {
        try {
            if (!c.getQuest(this).getStatus().equals(MapleQuestStatus.Status.STARTED)) {
                return false;
            }
            for (MapleQuestRequirement r : this.completeReqs) {
                if (!r.check(c, npcid)) {
                    return false;
                }
            }
            return true;
        } catch (Throwable e) {
            if (c.isQuestDebug()) {
                String[] s = StringUtil.getStackTrace(e).split("\r\n");
                for (String s2 : s) {
                    c.dropMessage(6, s2);
                }
            }
        }
        return true;
    }

    public void start(MapleCharacter c, int npc) {
        start(c, npc, false);
    }

    public void start(MapleCharacter c, int npc, boolean force) {//开始任务
        try {
            /*
             * arg1false
             arg2false
             arg3true 战神狼
             * arg1false
             arg2false
             arg3true  金字塔
             */
            boolean arg1 = (force) && (checkNPCOnMap(c, npc)); //满足条件  npc同一个地图
            boolean arg2 = (this.autoStart) || (checkNPCOnMap(c, npc));//自动任务 || npc同一个地图
            boolean arg3 = canStart(c, Integer.valueOf(npc)); //参数开始
            if ((arg1) || ((arg2) && (arg3))) {
                for (MapleQuestAction a : this.startActs) {
                    a.run(c, null);
                }
                MapleQuestStatus oldStatus = c.getQuest(this); //旧状态
                MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.STARTED, npc);//新的状态
                newStatus.setCompletionTime(oldStatus.getCompletionTime());//设定完成时间
                newStatus.setForfeited(oldStatus.getForfeited());//没收
                c.updateQuest(newStatus);//更新任务
            }else {
                for (MapleQuestAction a : this.startActs) {
                    a.run(c, null);
                }
                MapleQuestStatus oldStatus = c.getQuest(this); //旧状态
                MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.STARTED, npc);//新的状态
                newStatus.setCompletionTime(oldStatus.getCompletionTime());//设定完成时间
                newStatus.setForfeited(oldStatus.getForfeited());//没收
                c.updateQuest(newStatus);//更新任务
            }
        } catch (Throwable t) {
            //c.getClient().getSession().write(MaplePacketCreator.serverNotice(1, "发成错误,请截图后联系管理员.\r\n\r\n" + StringUtil.getStackTrace(t)));
        }
    }

    public boolean nullStartQuestData() {
        boolean nullStartReqData = false;
        boolean nullStartActData = false;
        try {
            for (MapleQuestRequirement r : this.startReqs) {
                if (r.getData() == null) {
                    nullStartReqData = true;
                    break;
                }
            }
            if (nullStartReqData) {
                try {
                    this.startReqs.clear();
                } catch (Exception e) {
                    log.info("Exception occured while clearing startReqs");
                }
            }
            for (MapleQuestAction a : this.startActs) {
                if (a.getData() == null) {
                    nullStartActData = true;
                    break;
                }
            }
            if (nullStartActData) {
                try {
                    this.startActs.clear();
                } catch (Exception e) {
                    log.info("Exception occured while clearing startActs");
                }
            }
        } catch (Exception e) {
            return true;
        }
        return (nullStartReqData) || (nullStartActData);
    }

    public boolean nullCompleteQuestData() {
        boolean nullCompleteReqData = false;
        boolean nullCompleteActData = false;
        try {
            for (MapleQuestRequirement r : this.completeReqs) {
                if (r.getData() == null) {
                    nullCompleteReqData = true;
                    break;
                }
            }
            if (nullCompleteReqData) {
                try {
                    this.completeReqs.clear();
                } catch (Exception e) {
                    log.info("Exception occured while clearing completeReqs");
                }
            }
            for (MapleQuestAction a : this.completeActs) {
                if (a.getData() == null) {
                    nullCompleteActData = true;
                    break;
                }
            }
            if (nullCompleteActData) {
                try {
                    this.completeActs.clear();
                } catch (Exception e) {
                    log.info("Exception occured while clearing completeActs");
                }
            }
        } catch (Exception e) {
            return true;
        }
        return (nullCompleteReqData) || (nullCompleteActData);
    }

    public void complete(MapleCharacter c, int npc) {
        complete(c, npc, null, false);
    }

    public void complete(MapleCharacter c, int npc, boolean force) {
        complete(c, npc, null, force);
    }

    public void complete(MapleCharacter c, int npc, Integer selection, boolean force) {
        try {
            boolean arg1 = (autoPreComplete || checkNPCOnMap(c, npc));
            boolean canComplete = canComplete(c, npc);
            if (force || (arg1 && canComplete)) {
                if (npc != 9010000) {
                    for (MapleQuestAction a : completeActs) {
                        if (!a.check(c)) {
                            continue;
                        }
                    }
                    for (MapleQuestAction a : completeActs) {
                        a.run(c, selection);
                    }
                }
                MapleQuestStatus oldStatus = c.getQuest(this);
                MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.COMPLETED, npc);
                newStatus.setForfeited(oldStatus.getForfeited());
                c.updateQuest(newStatus);
            } else {
                if (npc != 9010000) {
                    for (MapleQuestAction a : completeActs) {
                        if (!a.check(c)) {
                            continue;
                        }
                    }
                    for (MapleQuestAction a : completeActs) {
                        a.run(c, selection);
                    }
                }
                MapleQuestStatus oldStatus = c.getQuest(this);
                MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.COMPLETED, npc);
                newStatus.setForfeited(oldStatus.getForfeited());
                c.updateQuest(newStatus);
                //c.dropMessage(1, "灯泡无法,完成职业任务哟");//你遇到任务错误.请稍后片刻。或请联系系统管理员
            }
        } catch (Throwable t) {
           // c.getClient().getSession().write(MaplePacketCreator.serverNotice(1, "系统发生错误.请联系系统管理员解决\r\n\r\n" + StringUtil.getStackTrace(t)));
        }
    }
    

    public void forfeit(MapleCharacter c) {
        if (!c.getQuest(this).getStatus().equals(MapleQuestStatus.Status.STARTED)) {
            return;
        }
        MapleQuestStatus oldStatus = c.getQuest(this);
        MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.NOT_STARTED);
        newStatus.setForfeited(oldStatus.getForfeited() + 1);
        newStatus.setCompletionTime(oldStatus.getCompletionTime());
        c.updateQuest(newStatus);
    }

    public void forceStart(MapleCharacter c, int npc) {
        MapleQuestStatus oldStatus = c.getQuest(this);
        MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.STARTED, npc);
        newStatus.setForfeited(oldStatus.getForfeited());
        c.updateQuest(newStatus);
    }

    public void forceComplete(MapleCharacter c, int npc) {
        MapleQuestStatus oldStatus = c.getQuest(this);
        MapleQuestStatus newStatus = new MapleQuestStatus(this, MapleQuestStatus.Status.COMPLETED, npc);
        newStatus.setForfeited(oldStatus.getForfeited());
        c.updateQuest(newStatus);
    }

    public int getId() {
        return this.id;
    }

    public List<Integer> getRelevantMobs() {
        return Collections.unmodifiableList(this.relevantMobs);
    }

    private boolean checkNPCOnMap(MapleCharacter player, int npcid) {
        return player.getMap().containsNPC(npcid);
    }
}