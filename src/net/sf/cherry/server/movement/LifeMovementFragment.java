package net.sf.cherry.server.movement;

import net.sf.cherry.tools.data.output.LittleEndianWriter;

import java.awt.*;

public interface LifeMovementFragment {
  void serialize(LittleEndianWriter paramLittleEndianWriter);

  Point getPosition();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.movement.LifeMovementFragment
 * JD-Core Version:    0.6.0
 */