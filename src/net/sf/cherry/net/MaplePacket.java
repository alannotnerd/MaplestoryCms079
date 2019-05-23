package net.sf.cherry.net;

import java.io.Serializable;

public abstract interface MaplePacket extends Serializable
{
  public abstract byte[] getBytes();

  public abstract Runnable getOnSend();

  public abstract void setOnSend(Runnable paramRunnable);
}

