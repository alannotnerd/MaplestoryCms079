package net.sf.cherry.client;

import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.Element;

public abstract interface ISkill
{
  public abstract int getId();

  public abstract MapleStatEffect getEffect(int paramInt);

  public abstract int getMaxLevel();

  public abstract int getAnimationTime();

  public abstract boolean canBeLearnedBy(MapleJob paramMapleJob);

  public abstract boolean isFourthJob();

  public abstract Element getElement();

  public abstract boolean isBeginnerSkill();

  public abstract boolean hasCharge();
}
