 package net.sf.cherry.client;
 
public class SkillMacro {

    private int macroId;
    private int skill1;
    private int skill2;
    private int skill3;
    private String name;
    private int shout;
    private int position;

    public SkillMacro(int skill1, int skill2, int skill3, String name, int shout, int position) { //skill插槽  名字 说话  第几个宏ID
        this.skill1 = skill1;//技能1
        this.skill2 = skill2;//技能2
        this.skill3 = skill3;//技能3
        this.name = name;//名字
        this.shout = shout;//说话
        this.position = position;//第几个宏ID
    }

    public int getMacroId() {
        return macroId;
    }

    public int getSkill1() {
        return skill1;
    }

    public int getSkill2() {
        return skill2;
    }

    public int getSkill3() {
        return skill3;
    }

    public String getName() {
        return name;
    }

    public int getShout() {
        return shout;
    }

    public int getPosition() {
        return position;
    }

    public void setMacroId(int macroId) {
        this.macroId = macroId;
    }

    public void setSkill1(int skill1) {
        this.skill1 = skill1;
    }

    public void setSkill2(int skill2) {
        this.skill2 = skill2;
    }

    public void setSkill3(int skill3) {
        this.skill3 = skill3;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setShout(int shout) {
        this.shout = shout;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}