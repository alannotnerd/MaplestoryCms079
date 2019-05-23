package net.sf.cherry.provider.wz;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.RandomAccessFile;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataDirectoryEntry;
import net.sf.cherry.provider.MapleDataFileEntry;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.tools.data.input.GenericLittleEndianAccessor;
import net.sf.cherry.tools.data.input.GenericSeekableLittleEndianAccessor;
import net.sf.cherry.tools.data.input.InputStreamByteStream;
import net.sf.cherry.tools.data.input.LittleEndianAccessor;
import net.sf.cherry.tools.data.input.RandomAccessByteStream;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class WZFile
        implements MapleDataProvider {

    private File wzfile;
    private LittleEndianAccessor lea;
    private SeekableLittleEndianAccessor slea;
    private int headerSize;
    private WZDirectoryEntry root;
    private boolean provideImages;
    private int cOffset;

    public WZFile(File wzfile, boolean provideImages)
            throws IOException {
        this.wzfile = wzfile;
        this.lea = new GenericLittleEndianAccessor(new InputStreamByteStream(new BufferedInputStream(new FileInputStream(wzfile))));
        RandomAccessFile raf = new RandomAccessFile(wzfile, "r");
        this.slea = new GenericSeekableLittleEndianAccessor(new RandomAccessByteStream(raf));
        this.root = new WZDirectoryEntry(wzfile.getName(), 0, 0, null);
        this.provideImages = provideImages;
        load();
    }

    private void load() throws IOException {
        this.lea.readAsciiString(4);
        this.lea.readInt();
        this.lea.readInt();
        this.headerSize = this.lea.readInt();
        this.lea.readNullTerminatedAsciiString();
        this.lea.readShort();
        parseDirectory(this.root);
        this.cOffset = (int) this.lea.getBytesRead();
        getOffsets(this.root);
    }

    private void getOffsets(MapleDataDirectoryEntry dir) {
        for (MapleDataFileEntry file : dir.getFiles()) {
            file.setOffset(this.cOffset);
            this.cOffset += file.getSize();
        }
        for (MapleDataDirectoryEntry sdir : dir.getSubdirectories()) {
            getOffsets(sdir);
        }
    }

    private void parseDirectory(WZDirectoryEntry dir) {
        int entries = WZTool.readValue(this.lea);
        for (int i = 0; i < entries; i++) {
            byte marker = this.lea.readByte();
            String name = null;
            int size;
            int checksum;
            switch (marker) {
                case 2:
                    name = WZTool.readDecodedStringAtOffsetAndReset(this.slea, this.lea.readInt() + this.headerSize + 1);
                    size = WZTool.readValue(this.lea);
                    checksum = WZTool.readValue(this.lea);
                    this.lea.readInt();
                    dir.addFile(new WZFileEntry(name, size, checksum, dir));
                    break;
                case 3:
                case 4:
                    name = WZTool.readDecodedString(this.lea);
                    size = WZTool.readValue(this.lea);
                    checksum = WZTool.readValue(this.lea);
                    this.lea.readInt();
                    if (marker == 3) {
                        dir.addDirectory(new WZDirectoryEntry(name, size, checksum, dir));
                    } else {
                        dir.addFile(new WZFileEntry(name, size, checksum, dir));
                    }
            }

        }

        for (MapleDataDirectoryEntry idir : dir.getSubdirectories()) {
            parseDirectory((WZDirectoryEntry) idir);
        }
    }

    public WZIMGFile getImgFile(String path) throws IOException {
        String[] segments = path.split("/");
        WZDirectoryEntry dir = this.root;
        for (int x = 0; x < segments.length - 1; x++) {
            dir = (WZDirectoryEntry) dir.getEntry(segments[x]);
            if (dir == null) {
                return null;
            }
        }
        WZFileEntry entry = (WZFileEntry) dir.getEntry(segments[(segments.length - 1)]);
        if (entry == null) {
            return null;
        }
        String fullPath = this.wzfile.getName().substring(0, this.wzfile.getName().length() - 3).toLowerCase() + "/" + path;
        return new WZIMGFile(this.wzfile, entry, this.provideImages, ListWZFile.isModernImgFile(fullPath));
    }

    public synchronized MapleData getData(String path) {
        try {
            WZIMGFile imgFile = getImgFile(path);
            if (imgFile == null) {
                return null;
            }
            MapleData ret = imgFile.getRoot();
            return ret;
        } catch (IOException e) {
        }
        return null;
    }

    public MapleDataDirectoryEntry getRoot() {
        return this.root;
    }

    static {
        ListWZFile.init();
    }
}
