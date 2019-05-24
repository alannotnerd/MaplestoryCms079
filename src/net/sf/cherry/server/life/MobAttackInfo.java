package net.sf.cherry.server.life;

public class MobAttackInfo {
  private int mobId;
  private int attackId;
  private boolean isDeadlyAttack;
  private int mpBurn;
  private int diseaseSkill;
  private int diseaseLevel;
  private int mpCon;

  public MobAttackInfo(int mobId, int attackId) {
    this.mobId = mobId;
    this.attackId = attackId;
  }

  public boolean isDeadlyAttack() {
    return this.isDeadlyAttack;
  }

  public void setDeadlyAttack(boolean isDeadlyAttack) {
    this.isDeadlyAttack = isDeadlyAttack;
  }

  public int getMpBurn() {
    return this.mpBurn;
  }

  public void setMpBurn(int mpBurn) {
    this.mpBurn = mpBurn;
  }

  public int getDiseaseSkill() {
    return this.diseaseSkill;
  }

  public void setDiseaseSkill(int diseaseSkill) {
    this.diseaseSkill = diseaseSkill;
  }

  public int getDiseaseLevel() {
    return this.diseaseLevel;
  }

  public void setDiseaseLevel(int diseaseLevel) {
    this.diseaseLevel = diseaseLevel;
  }

  public int getMpCon() {
    return this.mpCon;
  }

  public void setMpCon(int mpCon) {
    this.mpCon = mpCon;
  }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.MobAttackInfo
 * JD-Core Version:    0.6.0
 */