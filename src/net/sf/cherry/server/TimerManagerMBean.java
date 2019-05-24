package net.sf.cherry.server;

public interface TimerManagerMBean {
  boolean isTerminated();

  boolean isShutdown();

  long getCompletedTaskCount();

  long getActiveCount();

  long getTaskCount();

  int getQueuedTasks();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.TimerManagerMBean
 * JD-Core Version:    0.6.0
 */