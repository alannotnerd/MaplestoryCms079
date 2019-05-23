package net.sf.cherry.client;

public abstract interface RunnableWithResult extends Runnable
{
  public abstract Object getResult();

  public abstract boolean isDone();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.RunnableWithResult
 * JD-Core Version:    0.6.0
 */