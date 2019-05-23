package net.sf.cherry.server.movement;

import java.awt.Point;

public abstract interface LifeMovement extends LifeMovementFragment
{
  public abstract Point getPosition();

  public abstract int getNewstate();

  public abstract int getDuration();

  public abstract int getType();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.LifeMovement
 * JD-Core Version:    0.6.0
 */