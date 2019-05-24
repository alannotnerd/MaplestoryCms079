package net.sf.cherry.net;

import java.io.Serializable;

public interface MaplePacket extends Serializable {
  byte[] getBytes();

  Runnable getOnSend();

  void setOnSend(Runnable paramRunnable);
}

