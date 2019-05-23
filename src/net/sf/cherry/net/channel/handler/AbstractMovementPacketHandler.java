package net.sf.cherry.net.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.maps.AnimatedMapleMapObject;
import net.sf.cherry.server.movement.AbsoluteLifeMovement;
import net.sf.cherry.server.movement.ArasMovement;
import net.sf.cherry.server.movement.ChairMovement;
import net.sf.cherry.server.movement.ChangeEquipSpecialAwesome;
import net.sf.cherry.server.movement.JumpDownMovement;
import net.sf.cherry.server.movement.LifeMovement;
import net.sf.cherry.server.movement.LifeMovementFragment;
import net.sf.cherry.server.movement.RelativeLifeMovement;
import net.sf.cherry.server.movement.TeleportMovement;
import net.sf.cherry.tools.data.input.LittleEndianAccessor;

public abstract class AbstractMovementPacketHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(AbstractMovementPacketHandler.class);

    protected List<LifeMovementFragment> parseMovement(LittleEndianAccessor lea) {
        List res = new ArrayList();
        int numCommands = lea.readByte();
        for (int i = 0; i < numCommands; i++) {
            int command = lea.readByte();
            switch (command) {
                case 0:
                case 5:
                case 17: {
                    int xpos = lea.readShort();
                    int ypos = lea.readShort();
                    int xwobble = lea.readShort();
                    int ywobble = lea.readShort();
                    int unk = lea.readShort();
                    int newstate = lea.readByte();
                    int duration = lea.readShort();
                    AbsoluteLifeMovement alm = new AbsoluteLifeMovement(command, new Point(xpos, ypos), duration, newstate);
                    alm.setUnk(unk);
                    alm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(alm);
                    break;
                }
                case 1:
                case 2:
                case 6:
                case 12:
                case 13:
                case 16: {
                    int xmod = lea.readShort();
                    int ymod = lea.readShort();
                    int newstate = lea.readByte();
                    int duration = lea.readShort();
                    RelativeLifeMovement rlm = new RelativeLifeMovement(command, new Point(xmod, ymod), duration, newstate);
                    res.add(rlm);

                    break;
                }
                case 3:
                case 4:
                case 7:
                case 8:
                case 9:
                case 14: {
                    int xpos = lea.readShort();
                    int ypos = lea.readShort();
                    int xwobble = lea.readShort();
                    int ywobble = lea.readShort();
                    int newstate = lea.readByte();
                    TeleportMovement tm = new TeleportMovement(command, new Point(xpos, ypos), newstate);
                    tm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(tm);
                    break;
                }
                case 10: {
                    res.add(new ChangeEquipSpecialAwesome(lea.readByte()));
                    break;
                }
                case 11: {
                    int xpos = lea.readShort();
                    int ypos = lea.readShort();
                    int unk = lea.readShort();
                    int newstate = lea.readByte();
                    int duration = lea.readShort();
                    ChairMovement cm = new ChairMovement(command, new Point(xpos, ypos), duration, newstate);
                    cm.setUnk(unk);
                    res.add(cm);
                    break;
                }
                case 15: {
                    int xpos = lea.readShort();
                    int ypos = lea.readShort();
                    int xwobble = lea.readShort();
                    int ywobble = lea.readShort();
                    int unk = lea.readShort();
                    int fh = lea.readShort();
                    int newstate = lea.readByte();
                    int duration = lea.readShort();
                    JumpDownMovement jdm = new JumpDownMovement(command, new Point(xpos, ypos), duration, newstate);
                    jdm.setUnk(unk);
                    jdm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    jdm.setFH(fh);
                    res.add(jdm);
                    break;
                }
                case 20:
                case 21:
                case 22: {
                    int unk = lea.readShort();
                    int newstate = lea.readByte();
                    ArasMovement acm = new ArasMovement(command, new Point(0, 0), unk, newstate);
                    res.add(acm);
                }
                case 18:
                case 19:
            }

        }

        return res;
    }

    protected void updatePosition(List<LifeMovementFragment> movement, AnimatedMapleMapObject target, int yoffset) {
        for (LifeMovementFragment move : movement) {
            if ((move instanceof LifeMovement)) {
                if ((move instanceof AbsoluteLifeMovement)) {
                    Point position = ((LifeMovement) move).getPosition();
                    position.y += yoffset;
                    target.setPosition(position);
                }
                target.setStance(((LifeMovement) move).getNewstate());
            }
        }
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.AbstractMovementPacketHandler
 * JD-Core Version:    0.6.0
 */