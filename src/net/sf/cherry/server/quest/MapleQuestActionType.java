package net.sf.cherry.server.quest;

public enum MapleQuestActionType {

    UNDEFINED(-1),//未定义的
    EXP(0), //经验
    ITEM(1), //物品
    NEXTQUEST(2), //
    MESO(3), //冒险币
    QUEST(4), //探索
    SKILL(5), //技能
    FAME(6),  //
    BUFF(7),    //状态
    PETSKILL(8); //宠物技能
    final byte type;

    private MapleQuestActionType(int type) {
        this.type = (byte) type;
    }

    public byte getType() {
        return this.type;
    }

    public static MapleQuestActionType getByType(byte type) {
        for (MapleQuestActionType l : values()) {
            if (l.getType() == type) {
                return l;
            }
        }
        return null;
    }

    public static MapleQuestActionType getByWZName(String name) {
        if (name.equals("exp")) {
            return EXP;
        }
        if (name.equals("money")) {
            return MESO;
        }
        if (name.equals("item")) {
            return ITEM;
        }
        if (name.equals("skill")) {
            return SKILL;
        }
        if (name.equals("nextQuest")) {
            return NEXTQUEST;
        }
        if (name.equals("pop")) {
            return FAME;
        }
        if (name.equals("buffItemID")) {
            return BUFF;
        }
        return UNDEFINED;
    }
}