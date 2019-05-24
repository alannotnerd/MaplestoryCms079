package net.sf.cherry.server.movement;

import net.sf.cherry.tools.data.output.LittleEndianWriter;

import java.awt.*;

public class AbsoluteLifeMovement extends AbstractLifeMovement {
  private Point pixelsPerSecond;
  private int unk;

  public AbsoluteLifeMovement(int type, Point position, int duration, int newstate) {
    super(type, position, duration, newstate);
  }

  public Point getPixelsPerSecond() {
    return this.pixelsPerSecond;
  }

  public void setPixelsPerSecond(Point wobble) {
    this.pixelsPerSecond = wobble;
  }

  public int getUnk() {
    return this.unk;
  }

  public void setUnk(int unk) {
    this.unk = unk;
  }

  public void serialize(LittleEndianWriter lew) {
    lew.write(getType());
    lew.writeShort(getPosition().x);
    lew.writeShort(getPosition().y);
    lew.writeShort(this.pixelsPerSecond.x);
    lew.writeShort(this.pixelsPerSecond.y);
    lew.writeShort(this.unk);
    lew.write(getNewstate());
    lew.writeShort(getDuration());
  }
}
