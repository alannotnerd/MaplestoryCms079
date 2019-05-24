package net.sf.cherry.client;

public interface RunnableWithResult extends Runnable {
  Object getResult();

  boolean isDone();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.RunnableWithResult
 * JD-Core Version:    0.6.0
 */