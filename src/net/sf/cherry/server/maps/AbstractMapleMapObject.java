package net.sf.cherry.server.maps;

import java.awt.Point;

public abstract class AbstractMapleMapObject
        implements MapleMapObject {

    private Point position = new Point();
    private int objectId;

    @Override
    public abstract MapleMapObjectType getType();

    @Override
    public Point getPosition() {
        return new Point(this.position);
    }

    @Override
    public void setPosition(Point position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    public void setPosition元神(Point position) {
        this.position.x = position.x + 40;
        this.position.y = position.y;
    }

    @Override
    public int getObjectId() {
        return this.objectId;
    }

    @Override
    public void setObjectId(int id) {
        this.objectId = id;
    }
}
