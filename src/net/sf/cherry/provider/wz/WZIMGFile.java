package net.sf.cherry.provider.wz;

import java.awt.Point;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.tools.data.input.GenericSeekableLittleEndianAccessor;
import net.sf.cherry.tools.data.input.RandomAccessByteStream;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class WZIMGFile {

    private static Logger log = LoggerFactory.getLogger(WZIMGFile.class);
    private WZFileEntry file;
    private WZIMGEntry root;
    private boolean provideImages;
    private boolean modernImg;

    public WZIMGFile(File wzfile, WZFileEntry file, boolean provideImages, boolean modernImg)
            throws IOException {
        RandomAccessFile raf = new RandomAccessFile(wzfile, "r");
        SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new RandomAccessByteStream(raf));
        slea.seek(file.getOffset());
        this.file = file;
        this.provideImages = provideImages;
        this.root = new WZIMGEntry(file.getParent());
        this.root.setName(file.getName());
        this.root.setType(MapleDataType.EXTENDED);
        this.modernImg = modernImg;
        parseExtended(this.root, slea, 0L);
        this.root.finish();
        raf.close();
    }

    protected void dumpImg(OutputStream out, SeekableLittleEndianAccessor slea) throws IOException {
        DataOutputStream os = new DataOutputStream(out);
        long oldPos = slea.getPosition();
        slea.seek(this.file.getOffset());
        for (int x = 0; x < this.file.getSize(); x++) {
            os.write(slea.readByte());
        }
        slea.seek(oldPos);
    }

    public WZIMGEntry getRoot() {
        return this.root;
    }

    private void parse(WZIMGEntry entry, SeekableLittleEndianAccessor slea) {
        byte marker = slea.readByte();
        switch (marker) {
            case 0: {
                String name = WZTool.readDecodedString(slea);
                entry.setName(name);
                break;
            }
            case 1: {
                String name = WZTool.readDecodedStringAtOffsetAndReset(slea, file.getOffset() + slea.readInt());
                entry.setName(name);
                break;
            }
            default:
                log.error("Unknown Image identifier: {} at offset {}", marker, (slea.getPosition() - file.getOffset()));
        }
        marker = slea.readByte();
        switch (marker) {
            case 0:
                entry.setType(MapleDataType.IMG_0x00);
                break;
            case 2:
            case 11: //??? no idea, since 0.49
                entry.setType(MapleDataType.SHORT);
                entry.setData(Short.valueOf(slea.readShort()));
                break;
            case 3:
                entry.setType(MapleDataType.INT);
                entry.setData(Integer.valueOf(WZTool.readValue(slea)));
                break;
            case 4:
                entry.setType(MapleDataType.FLOAT);
                entry.setData(Float.valueOf(WZTool.readFloatValue(slea)));
                break;
            case 5:
                entry.setType(MapleDataType.DOUBLE);
                entry.setData(Double.valueOf(slea.readDouble()));
                break;
            case 8:
                entry.setType(MapleDataType.STRING);
                byte iMarker = slea.readByte();
                if (iMarker == 0) {
                    entry.setData(WZTool.readDecodedString(slea));
                } else if (iMarker == 1) {
                    entry.setData(WZTool.readDecodedStringAtOffsetAndReset(slea, slea.readInt() + file.getOffset()));
                } else {
                    log.error("Unknown String type {}", iMarker);
                }
                break;
            case 9:
                entry.setType(MapleDataType.EXTENDED);
                long endOfExtendedBlock = slea.readInt();
                endOfExtendedBlock += slea.getPosition();
                parseExtended(entry, slea, endOfExtendedBlock);
                break;
            default:
                log.error("Unknown Image type {}", marker);
        }
    }

    private void parseExtended(WZIMGEntry entry, SeekableLittleEndianAccessor slea, long endOfExtendedBlock) {
        byte marker = slea.readByte();
        String type;
        switch (marker) {
            case 115:
                type = WZTool.readDecodedString(slea);
                break;
            case 27:
                type = WZTool.readDecodedStringAtOffsetAndReset(slea, this.file.getOffset() + slea.readInt());
                break;
            default:
                throw new RuntimeException("Unknown extended image identifier: " + marker + " at offset " + (slea.getPosition() - this.file.getOffset()));
        }

        if (type.equals("Property")) {
            entry.setType(MapleDataType.PROPERTY);
            slea.readByte();
            slea.readByte();
            int children = WZTool.readValue(slea);
            for (int i = 0; i < children; i++) {
                WZIMGEntry cEntry = new WZIMGEntry(entry);
                parse(cEntry, slea);
                cEntry.finish();
                entry.addChild(cEntry);
            }
        } else if (type.equals("Canvas")) {
            entry.setType(MapleDataType.CANVAS);
            slea.readByte();
            marker = slea.readByte();
            if (marker != 0) {
                if (marker == 1) {
                    slea.readByte();
                    slea.readByte();
                    int children = WZTool.readValue(slea);
                    for (int i = 0; i < children; i++) {
                        WZIMGEntry child = new WZIMGEntry(entry);
                        parse(child, slea);
                        child.finish();
                        entry.addChild(child);
                    }
                } else {
                    //////System.out.println("Canvas marker != 1 (" + marker + ")");
                }
            }
            int width = WZTool.readValue(slea);
            int height = WZTool.readValue(slea);
            int format = WZTool.readValue(slea);
            int format2 = slea.readByte();
            slea.readInt();
            int dataLength = slea.readInt() - 1;
            slea.readByte();
            if (this.provideImages) {
                byte[] pngdata = slea.read(dataLength);
                entry.setData(new PNGMapleCanvas(width, height, dataLength, format + format2, pngdata));
            } else {
                entry.setData(new PNGMapleCanvas(width, height, dataLength, format + format2, null));
                slea.skip(dataLength);
            }
        } else if (type.equals("Shape2D#Vector2D")) {
            entry.setType(MapleDataType.VECTOR);
            int x = WZTool.readValue(slea);
            int y = WZTool.readValue(slea);
            entry.setData(new Point(x, y));
        } else if (type.equals("Shape2D#Convex2D")) {
            int children = WZTool.readValue(slea);
            for (int i = 0; i < children; i++) {
                WZIMGEntry cEntry = new WZIMGEntry(entry);
                parseExtended(cEntry, slea, 0L);
                cEntry.finish();
                entry.addChild(cEntry);
            }
        } else if (type.equals("Sound_DX8")) {
            entry.setType(MapleDataType.SOUND);
            slea.readByte();
            int dataLength = WZTool.readValue(slea);
            WZTool.readValue(slea);
            int offset = (int) slea.getPosition();
            entry.setData(new ImgMapleSound(dataLength, offset - this.file.getOffset()));
            slea.seek(endOfExtendedBlock);
        } else if (type.equals("UOL")) {
            entry.setType(MapleDataType.UOL);
            slea.readByte();
            byte uolmarker = slea.readByte();
            switch (uolmarker) {
                case 0:
                    entry.setData(WZTool.readDecodedString(slea));
                    break;
                case 1:
                    entry.setData(WZTool.readDecodedStringAtOffsetAndReset(slea, this.file.getOffset() + slea.readInt()));
                    break;
                default:
                    //////System.out.println("Unknown UOL marker: " + uolmarker + " " + entry.getName());
            }
        } else {
            throw new RuntimeException("Unhandeled extended type: " + type);
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.provider.wz.WZIMGFile
 * JD-Core Version:    0.6.0
 */