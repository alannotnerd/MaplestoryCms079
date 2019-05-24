package net.sf.cherry.client;

import net.sf.cherry.server.MapleStatEffect;
import net.sf.cherry.server.life.Element;

public interface ISkill {
  int getId();

  MapleStatEffect getEffect(int paramInt);

  int getMaxLevel();

  int getAnimationTime();

  boolean canBeLearnedBy(MapleJob paramMapleJob);

  boolean isFourthJob();

  Element getElement();

  boolean isBeginnerSkill();

  boolean hasCharge();
}
