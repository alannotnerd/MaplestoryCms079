package net.sf.cherry.server;

import net.sf.cherry.client.MapleClient;

import java.awt.*;

public interface MaplePortal {
  int MAP_PORTAL = 2;
  int DOOR_PORTAL = 6;
  boolean OPEN = true;
  boolean CLOSE = false;

  int getType();

  int getId();

  Point getPosition();

  String getName();

  String getTarget();

  String getScriptName();

  void setScriptName(String paramString);

  int getTargetMapId();

  void enterPortal(MapleClient paramMapleClient);

  boolean getPortalState();

  void setPortalState(boolean paramBoolean);
}