package net.sf.cherry.client;

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.movement.AbsoluteLifeMovement;
import net.sf.cherry.server.movement.LifeMovement;
import net.sf.cherry.server.movement.LifeMovementFragment;

public class MaplePet extends Item {

    private String name;
    private int uniqueid;
    private int closeness = 0;
    private int level = 1;
    private int fullness = 100;
    private int Fh;
    private Point pos;
    private int stance;
    private short inventorypos = 0, flags;
    private boolean changed = false;
    private int secondsLeft = 0;
    private MapleInventory[] inventory;
    private boolean summoned;
private byte summoned1 = 0;
    public static enum PetFlag {
	ITEM_PICKUP(0x01, 5190000, 5191000),
	EXPAND_PICKUP(0x02, 5190002, 5191002), //idk
	AUTO_PICKUP(0x04, 5190003, 5191003), //idk
	UNPICKABLE(0x08, 5190005, -1), //not coded
	LEFTOVER_PICKUP(0x10, 5190004, 5191004), //idk
	HP_CHARGE(0x20, 5190001, 5191001),
	MP_CHARGE(0x40, 5190006, -1),
	PET_BUFF(0x80, -1, -1), //idk
	PET_DRAW(0x100, 5190007, -1), //nfs
	PET_DIALOGUE(0x200, 5190008, -1); //nfs

	private final int i, item, remove;
	private PetFlag(int i, int item, int remove) {
	    this.i = i;
	    this.item = item;
	    this.remove = remove;
	}

	public final int getValue() {
	    return i;
	}

	public final boolean check(int flag) {
	    return (flag & i) == i;
	}

	public static final PetFlag getByAddId(final int itemId) {
	    for (PetFlag flag : PetFlag.values()) {
             //   //////System.out.println("PetFlag flag"+flag+"------"+ PetFlag.values());
		if (flag.item == itemId) {
             //   //////System.out.println("flag.item"+ itemId);
		    return flag;
		}
	    }
	    return null;
	}

	public static final PetFlag getByDelId(final int itemId) {
	    for (PetFlag flag : PetFlag.values()) {
		if (flag.remove == itemId) {
		    return flag;
		}
	    }
	    return null;
	}
    }
    
    private MaplePet(int id, byte position, int uniqueid) {
        super(id, position, (short) 1);
        this.uniqueid = uniqueid;
    }

    public static MaplePet loadFromDb(int itemid, byte position, int uniqueid) {
              //  //////System.out.println("loadFromDb");
        try {
            MaplePet ret = new MaplePet(itemid, position, uniqueid);

            Connection con = DatabaseConnection.getConnection(); // Get a connection to the database
            PreparedStatement ps = con.prepareStatement("SELECT * FROM pets WHERE uniqueid = ?"); // Get pet details..
            ps.setInt(1, uniqueid);

            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                return null;
            }

            ret.setName(rs.getString("name"));
            ret.setCloseness(rs.getInt("closeness"));
            ret.setLevel(rs.getInt("level"));
            ret.setFullness(rs.getInt("fullness"));
            ret.setSummoned(rs.getInt("seconds") == 1);
	        ret.setFlags(rs.getShort("flags"));

            
            rs.close();
            ps.close();

            return ret;
        } catch (SQLException ex) {
            Logger.getLogger(MaplePet.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public void saveToDb() {
               // //////System.out.println("saveToDb");
        if (!changed) {
	    return;
	}
        try {
            Connection con = DatabaseConnection.getConnection(); // Get a connection to the database
            PreparedStatement ps = con.prepareStatement("UPDATE pets SET name = ?, level = ?, closeness = ?, fullness = ?, seconds = ?, flags = ? WHERE uniqueid = ?");
            ps.setString(1, getName()); // Set name
            ps.setInt(2, getLevel()); // Set Levelonds = ? WHERE uniqueid = ?");
            //ps.setString(1, getName()); // Set name
            ps.setInt(3, getCloseness()); // Set Closeness
            ps.setInt(4, getFullness()); // Set Fullness
            ps.setInt(5, isSummoned() ? 1 : 0);
	    ps.setShort(6, getFlags());
            ps.setInt(7, getUniqueId()); // Set ID
            ps.executeUpdate(); // Execute statement
            ps.close();
        } catch (SQLException ex) {
            Logger.getLogger(MaplePet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static int createPet(int itemid, MapleCharacter chr) {
        try {
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();

            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO pets (name, level, closeness, fullness, uniqueid, flags) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setString(1, mii.getName(itemid));
            ps.setInt(2, 1);
            ps.setInt(3, 0);
            ps.setInt(4, 100);
            int ret = MapleCharacter.getNextUniqueId();
            ps.setInt(5, ret);
            short ret1 = MapleItemInformationProvider.getInstance().getPetFlagInfo(itemid);
            ps.setShort(6, (short)ret1);
            ps.executeUpdate();
            ps.close();
            chr.saveToDB(true);
            return ret;
        } catch (SQLException ex) {
            Logger.getLogger(MaplePet.class.getName()).log(Level.SEVERE, null, ex);
            return -1;
        }

    }

    public static int createPet(int itemid) {
        try {
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO pets (name, level, closeness, fullness, flags) VALUES (?, ?, ?, ?, ?)");
            ps.setString(1, mii.getName(itemid));
            ps.setInt(2, 1);
            ps.setInt(3, 0);
            ps.setInt(4, 100);
            short ret1 = MapleItemInformationProvider.getInstance().getPetFlagInfo(itemid);
            ps.setShort(5, (short)ret1);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            int ret = rs.getInt(1);
            rs.close();
            ps.close();

            return ret;
        } catch (SQLException ex) {
            Logger.getLogger(MaplePet.class.getName()).log(Level.SEVERE, null, ex);
            return -1;
        }

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int getUniqueId() {
        return uniqueid;
    }

    @Override
    public void setUniqueId(int id) {
        this.uniqueid = id;
    }

    public int getCloseness() {
        return closeness;
    }

    public void setCloseness(int closeness) {
        this.closeness = closeness;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getFullness() {
        return fullness;
    }

    public void setFullness(int fullness) {
        this.fullness = fullness;
    }

    public int getFh() {
        return Fh;
    }

    public void setFh(int Fh) {
        this.Fh = Fh;
    }

    public Point getPos() {
        return pos;
    }

    public void setPos(Point pos) {
        this.pos = pos;
    }

    public int getStance() {
        return stance;
    }

    public void setStance(int stance) {
        this.stance = stance;
    }
    public boolean isSummoned() {
        return summoned;
    }

    public void setSummoned(boolean yes) {
        this.summoned = yes;
    }

    public boolean canConsume(int itemId) {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        for (int petId : mii.petsCanConsume(itemId)) {
            if (petId == this.getItemId()) {
                return true;
            }
        }
        return false;
    }

    public void updatePosition(List<LifeMovementFragment> movement) {
        for (LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof AbsoluteLifeMovement) {
                    Point position = ((LifeMovement) move).getPosition();
                    this.setPos(position);
                }
                this.setStance(((LifeMovement) move).getNewstate());
            }
        }
    }
    public short getFlags() {
        return flags;
    }
    public void setFlags(final int fffh) {
        this.flags = (short) fffh;
	this.changed = true;
    }
    public final int getSecondsLeft() {
        return secondsLeft;
    }

    public final void setSecondsLeft(int sl) {
        this.secondsLeft = sl;
	this.changed = true;
    }
    public final short getInventoryPosition() {
        return inventorypos;
    }

    public final void setInventoryPosition(final short inventorypos) {
        this.inventorypos = inventorypos;
    }
    public final MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }
public boolean getSummoned1() {
     return this.summoned1 > 0;
   }
 
   public byte getSummoned1Value() {
     return this.summoned1;
   }
 
   public void setSummoned1(int summoned) {
     this.summoned1 = ((byte)summoned);
   }
    public final MapleInventory[] getInventorys() {
        return inventory;
    }
}

