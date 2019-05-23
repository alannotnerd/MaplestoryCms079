package net.sf.cherry.net.login;

public abstract interface LoginServerMBean
{
  public abstract int getNumberOfSessions();

  public abstract int getPossibleLogins();

  public abstract int getLoginInterval();

  public abstract String getEventMessage();

  public abstract int getFlag();

  public abstract void setEventMessage(String paramString);

  public abstract void setFlag(int paramInt);

  public abstract int getUserLimit();

  public abstract void setUserLimit(int paramInt);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.LoginServerMBean
 * JD-Core Version:    0.6.0
 */