package net.sf.cherry.server.cherryms;

import java.util.Collection;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.maps.MapleMapFactory;

public abstract interface CherryMSLottery {

    public abstract void addChar(MapleCharacter paramMapleCharacter);

    public abstract void doLottery();

    public abstract void drawalottery();

    public abstract long getAllpeichu();

    public abstract long getAlltouzhu();

    public abstract ChannelServer getChannelServer();

    public abstract Collection<MapleCharacter> getCharacters();

    public abstract MapleMapFactory getMapleMapFactory();

    public abstract int getTouNumbyType(int paramInt);

    public abstract int getZjNum();

    public abstract void setAllpeichu(long paramLong);

    public abstract void setAlltouzhu(long paramLong);

    public abstract void setCharacters(Collection<MapleCharacter> paramCollection);

    public abstract void setZjNum(int paramInt);

    public abstract void warp(int paramInt, MapleCharacter paramMapleCharacter);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.cherryms.CherryMSLottery
 * JD-Core Version:    0.6.0
 */