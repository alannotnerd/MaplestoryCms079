package net.sf.cherry.server.cherryms;

import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.maps.MapleMapFactory;

public class CherryMScustomEventFactory {

  private static CherryMScustomEventFactory instance = null;
  private static boolean CANLOG;

  public static CherryMScustomEventFactory getInstance() {
    if (instance == null) {
      instance = new CherryMScustomEventFactory();
    }
    return instance;
  }

  public boolean isCANLOG() {
    return CANLOG;
  }

  public void setCANLOG(boolean CANLOG) {
    CherryMScustomEventFactory.CANLOG = CANLOG;
  }

  public CherryMSLottery getCherryMSLottery() {
    return CherryMSLotteryImpl.getInstance();
  }

  public CherryMSLottery getCherryMSLottery(ChannelServer cserv, MapleMapFactory mapFactory) {
    return CherryMSLotteryImpl.getInstance(cserv, mapFactory);
  }
}