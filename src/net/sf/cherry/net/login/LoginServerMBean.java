package net.sf.cherry.net.login;

public interface LoginServerMBean {
  int getNumberOfSessions();

  int getPossibleLogins();

  int getLoginInterval();

  String getEventMessage();

  void setEventMessage(String paramString);

  int getFlag();

  void setFlag(int paramInt);

  int getUserLimit();

  void setUserLimit(int paramInt);
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.login.LoginServerMBean
 * JD-Core Version:    0.6.0
 */