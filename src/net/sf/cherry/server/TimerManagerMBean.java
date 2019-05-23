package net.sf.cherry.server;

public abstract interface TimerManagerMBean
{
  public abstract boolean isTerminated();

  public abstract boolean isShutdown();

  public abstract long getCompletedTaskCount();

  public abstract long getActiveCount();

  public abstract long getTaskCount();

  public abstract int getQueuedTasks();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.TimerManagerMBean
 * JD-Core Version:    0.6.0
 */