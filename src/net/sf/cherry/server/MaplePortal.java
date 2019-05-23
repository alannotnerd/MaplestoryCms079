package net.sf.cherry.server;

import java.awt.Point;

import net.sf.cherry.client.MapleClient;

public abstract interface MaplePortal
{
  public static final int MAP_PORTAL = 2;
  public static final int DOOR_PORTAL = 6;
  public static final boolean OPEN = true;
  public static final boolean CLOSE = false;

  public abstract int getType();

  public abstract int getId();

  public abstract Point getPosition();

  public abstract String getName();

  public abstract String getTarget();

  public abstract String getScriptName();

  public abstract void setScriptName(String paramString);

  public abstract int getTargetMapId();

  public abstract void enterPortal(MapleClient paramMapleClient);

  public abstract void setPortalState(boolean paramBoolean);

  public abstract boolean getPortalState();
}