package net.sf.cherry.scripting.reactor;

public abstract interface ReactorScript
{
  public abstract void act();

  public abstract void touch();

  public abstract void untouch();
}
