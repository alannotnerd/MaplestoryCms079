package net.sf.cherry.server.movement;

import java.awt.Point;

import net.sf.cherry.tools.data.output.LittleEndianWriter;

public abstract interface LifeMovementFragment
{
  public abstract void serialize(LittleEndianWriter paramLittleEndianWriter);

  public abstract Point getPosition();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.LifeMovementFragment
 * JD-Core Version:    0.6.0
 */