package net.sf.cherry.server.movement;

import java.awt.*;

public interface LifeMovement extends LifeMovementFragment {
  Point getPosition();

  int getNewstate();

  int getDuration();

  int getType();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.LifeMovement
 * JD-Core Version:    0.6.0
 */