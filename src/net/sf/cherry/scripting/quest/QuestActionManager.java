 package net.sf.cherry.scripting.quest;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.scripting.npc.NPCConversationManager;
import net.sf.cherry.server.quest.MapleQuest;
 
public class QuestActionManager extends NPCConversationManager {

    private boolean start;
    private int quest;

    public QuestActionManager(MapleClient c, int npc, int quest, boolean start) {
        super(c, npc,0);
        this.quest = quest;
        this.start = start;
    }

    public int getQuest() {
        return quest;
    }

    public boolean isStart() {
        return start;
    }

    @Override
    public void dispose() {
        QuestScriptManager.getInstance().dispose(this, getClient());
    }

    public void startQuest() {
        MapleQuest.getInstance(quest).start(getPlayer(), getNpc(), true);
    }

      public void completeQuest() {
        MapleQuest.getInstance(quest).complete(getPlayer(), getNpc(), true);
    }
}
