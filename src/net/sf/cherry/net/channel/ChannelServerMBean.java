package net.sf.cherry.net.channel;

public abstract interface ChannelServerMBean
{
  public abstract void shutdown(int paramInt);

  public abstract void shutdownWorld(int paramInt);

  public abstract void broadcastWorldMessage(String paramString);

  public abstract String getServerMessage();

  public abstract void setServerMessage(String paramString);

  public abstract int getChannel();

  public abstract int getExpRate();

  public abstract int getMesoRate();

  public abstract int getDropRate();

  public abstract int getBossDropRate();

  public abstract int getPetExpRate();

  public abstract void setExpRate(int paramInt);

  public abstract void setMesoRate(int paramInt);

  public abstract void setDropRate(int paramInt);

  public abstract void setBossDropRate(int paramInt);

  public abstract void setPetExpRate(int paramInt);

  public abstract int getConnectedClients();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.ChannelServerMBean
 * JD-Core Version:    0.6.0
 */