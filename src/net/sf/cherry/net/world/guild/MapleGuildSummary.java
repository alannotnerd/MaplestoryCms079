package net.sf.cherry.net.world.guild;

import java.io.Serializable;

public class MapleGuildSummary
        implements Serializable {

    public static final long serialVersionUID = 3565477792085301248L;
    private String name;
    private short logoBG;
    private byte logoBGColor;
    private short logo;
    private byte logoColor;
    private int allianceId;

    public MapleGuildSummary(MapleGuild g) {
        this.name = g.getName();
        this.logoBG = (short) g.getLogoBG();
        this.logoBGColor = (byte) g.getLogoBGColor();
        this.logo = (short) g.getLogo();
        this.logoColor = (byte) g.getLogoColor();
        this.allianceId = g.getAllianceId();
    }

    public String getName() {
        return this.name;
    }

    public short getLogoBG() {
        return this.logoBG;
    }

    public byte getLogoBGColor() {
        return this.logoBGColor;
    }

    public short getLogo() {
        return this.logo;
    }

    public byte getLogoColor() {
        return this.logoColor;
    }

    public int getAllianceId() {
        return this.allianceId;
    }
}