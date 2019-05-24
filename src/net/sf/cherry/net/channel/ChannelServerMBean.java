package net.sf.cherry.net.channel;

public interface ChannelServerMBean {
  void shutdown(int paramInt);

  void shutdownWorld(int paramInt);

  void broadcastWorldMessage(String paramString);

  String getServerMessage();

  void setServerMessage(String paramString);

  int getChannel();

  int getExpRate();

  void setExpRate(int paramInt);

  int getMesoRate();

  void setMesoRate(int paramInt);

  int getDropRate();

  void setDropRate(int paramInt);

  int getBossDropRate();

  void setBossDropRate(int paramInt);

  int getPetExpRate();

  void setPetExpRate(int paramInt);

  int getConnectedClients();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.ChannelServerMBean
 * JD-Core Version:    0.6.0
 */