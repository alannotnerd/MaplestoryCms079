package net.sf.cherry.server.cherryms;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleMapFactory;

public class CherryMSLotteryImpl
        implements CherryMSLottery {

    private static CherryMSLotteryImpl instance = null;
    private ChannelServer cserv;
    private MapleMapFactory mapFactory;
    private int zjNum;
    Collection<MapleCharacter> characters = new ArrayList();
    private long alltouzhu;
    private long allpeichu;

    private CherryMSLotteryImpl() {
    }

    public static CherryMSLotteryImpl getInstance() {
        if (instance == null) {
            instance = new CherryMSLotteryImpl();
        }
        return instance;
    }

    private CherryMSLotteryImpl(ChannelServer cserv, MapleMapFactory mapFactory) {
        this.cserv = cserv;
        this.mapFactory = mapFactory;
    }

    public static CherryMSLotteryImpl getInstance(ChannelServer cserv, MapleMapFactory mapFactory) {
        if (instance == null) {
            instance = new CherryMSLotteryImpl(cserv, mapFactory);
        }
        return instance;
    }

    public ChannelServer getChannelServer() {
        return this.cserv;
    }

    public MapleMapFactory getMapleMapFactory() {
        return this.mapFactory;
    }

    public static int getDatetimemm() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("mm");
        String datetime = sdf.format(date);
        return Integer.parseInt(datetime);
    }

    public void warp(int map, MapleCharacter c) {
        MapleMap target = getWarpMap(map, c);
        c.changeMap(target, target.getPortal(0));
    }

    private MapleMap getWarpMap(int map, MapleCharacter c) {
        MapleMap target;
        if (c.getEventInstance() == null) {
            target = ChannelServer.getInstance(c.getClient().getChannel()).getMapFactory().getMap(map);
        } else {
            target = c.getEventInstance().getMapInstance(map);
        }
        return target;
    }

    public long getAllpeichu() {
        return this.allpeichu;
    }

    public void setAllpeichu(long allpeichu) {
        this.allpeichu = allpeichu;
    }

    public long getAlltouzhu() {
        return this.alltouzhu;
    }

    public void setAlltouzhu(long alltouzhu) {
        this.alltouzhu = alltouzhu;
    }

    public Collection<MapleCharacter> getCharacters() {
        return this.characters;
    }

    public void setCharacters(Collection<MapleCharacter> characters) {
        this.characters = characters;
    }

    public void addChar(MapleCharacter chr) {
        this.characters.add(chr);
    }

    @Override
    public int getZjNum() {
        return this.zjNum;
    }

    @Override
    public void setZjNum(int zjNum) {
        this.zjNum = zjNum;
    }

    @Override
    public void doLottery() {
        drawalottery();
    }

    @Override
    public int getTouNumbyType(int type) {
        int count = 0;
        for (MapleCharacter chr : this.characters) {
            if (chr.getTouzhuType() == type) {
                count++;
            }
        }
        return count;
    }

    @Override
    public void drawalottery() {
        this.zjNum = (int) (Math.random() * 6.0D + 1.0D);

        String zjNames2 = " ";
        String zjNames3 = " ";
        String zjNames6 = " ";

        int toucount2 = 0;
        int toucount3 = 0;
        int toucount6 = 0;

        int zhongcount2 = 0;
        int zhongcount3 = 0;
        int zhongcount6 = 0;

        long sumNX = 0L;

        long peiNX = 0L;

        int zjpeople = 0;

        Collection<MapleCharacter> drawchars = this.characters;

        if (drawchars != null) {
            for (MapleCharacter chr : drawchars) {
                int charType = chr.getTouzhuType();
                int charNum = chr.getTouzhuNum();
                int charZhuNX = chr.getTouzhuNX();

                chr.setTouzhuType(0);
                chr.setTouzhuNum(0);
                chr.setTouzhuNX(0);

                sumNX += charZhuNX;
                if (charType == 2) {
                    toucount2++;
                    if (((this.zjNum > 3) && (charNum > 3)) || ((this.zjNum < 4) && (charNum < 4))) {
                        charZhuNX *= 2;
                        charZhuNX -= charZhuNX * 5 / 100;
                        chr.modifyCSPoints(0, charZhuNX);
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】 \r\n恭喜你获奖了。扣除手续费5%。获得奖金额:" + charZhuNX);
                        peiNX += charZhuNX;
                        zjNames6 = zjNames6 + chr.getName() + ":赢得" + peiNX + "点卷 ";
                        zhongcount2++;
                        zjpeople++;
                    } else {
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】\r\n对不起您没有中奖，请继续努力");
                    }
                }
                if (charType == 3) {
                    toucount3++;
                    if (((this.zjNum > 4) && (charNum > 4)) || ((this.zjNum > 2) && (this.zjNum < 5) && (charNum > 2) && (charNum < 5)) || ((this.zjNum < 3) && (charNum < 3))) {
                        charZhuNX *= 3;
                        charZhuNX -= charZhuNX * 5 / 100;
                        chr.modifyCSPoints(0, charZhuNX);
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】 \r\n恭喜你获奖了。扣除手续费5%。获得奖金额:" + charZhuNX);
                        peiNX += charZhuNX;
                        zjNames6 = zjNames6 + chr.getName() + ":赢得" + peiNX + "点卷 ";
                        zhongcount3++;
                        zjpeople++;
                    } else {
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】\r\n对不起您没有中奖，请继续努力");
                    }
                }
                if (charType == 6) {
                    toucount6++;
                    if (this.zjNum == charNum) {
                        charZhuNX *= 6;
                        charZhuNX -= charZhuNX * 5 / 100;
                        chr.modifyCSPoints(0, charZhuNX);
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】 \r\n恭喜你获奖了。扣除手续费5%。获得奖金额:" + charZhuNX);
                        peiNX += charZhuNX;
                        zjNames6 = zjNames6 + chr.getName() + ":赢得" + peiNX + "点卷 ";
                        zhongcount6++;
                        zjpeople++;
                    } else {
                        chr.dropMessage(1, "本期号码：【" + this.zjNum + "】\r\n对不起您没有中奖，请继续努力");
                    }
                }
            }
            this.alltouzhu += sumNX;
            this.allpeichu += peiNX;
            this.characters.removeAll(drawchars);
        }
        int peoplecount = 0;
        if (drawchars != null) {
            peoplecount = drawchars.size();
        }
        //getChannelServer().broadcastPacket(MaplePacketCreator.serverNotice(5, "[竞猜系统]中奖名单:" + zjNames6 + zjNames3 + zjNames2 + " "));
    }
}
