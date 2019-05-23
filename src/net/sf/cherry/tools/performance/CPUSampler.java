 package net.sf.cherry.tools.performance;
 
 import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
 
 public class CPUSampler
 {
   private List<String> included = new LinkedList();
   private static CPUSampler instance = new CPUSampler();
   private long interval = 5L;
   private SamplerThread sampler = null;
   private Map<StackTrace, Integer> recorded = new HashMap();
   private int totalSamples = 0;
 
   public static CPUSampler getInstance()
   {
     return instance;
   }
 
   public void setInterval(long millis) {
     this.interval = millis;
   }
 
   public void addIncluded(String include) {
     for (String alreadyIncluded : this.included) {
       if (include.startsWith(alreadyIncluded)) {
         return;
       }
     }
     this.included.add(include);
   }
 
   public void reset() {
     this.recorded.clear();
     this.totalSamples = 0;
   }
 
    public void start() {
        if (sampler == null) {
            sampler = new SamplerThread();
            sampler.start();
        }
    }
 
   public void stop() {
     if (this.sampler != null) {
       this.sampler.stop();
       this.sampler = null;
     }
   }
 
  public SampledStacktraces getTopConsumers() {
        List<StacktraceWithCount> ret = new ArrayList<StacktraceWithCount>();
        Set<Entry<StackTrace, Integer>> entrySet = recorded.entrySet();
        for (Entry<StackTrace, Integer> entry : entrySet) {
            ret.add(new StacktraceWithCount(entry.getValue(), entry.getKey()));
        }
        Collections.sort(ret);
        return new SampledStacktraces(ret, totalSamples);
    }
 
   public void save(Writer writer, int minInvocations, int topMethods) throws IOException {
     SampledStacktraces topConsumers = getTopConsumers();
     StringBuilder builder = new StringBuilder();
     builder.append("Top Methods:\n");
     for (int i = 0; (i < topMethods) && (i < topConsumers.getTopConsumers().size()); i++) {
       builder.append(((StacktraceWithCount)topConsumers.getTopConsumers().get(i)).toString(topConsumers.getTotalInvocations(), 1));
     }
     builder.append("\nStack Traces:\n");
     writer.write(builder.toString());
     writer.write(topConsumers.toString(minInvocations));
     writer.flush();
   }
 
   private void consumeStackTraces(Map<Thread, StackTraceElement[]> traces) {
     for (Map.Entry trace : traces.entrySet()) {
       int relevant = findRelevantElement((StackTraceElement[])trace.getValue());
       if (relevant != -1) {
         StackTrace st = new StackTrace((StackTraceElement[])trace.getValue(), relevant, ((Thread)trace.getKey()).getState());
         Integer i = (Integer)this.recorded.get(st);
         this.totalSamples += 1;
         if (i == null)
           this.recorded.put(st, Integer.valueOf(1));
         else
           this.recorded.put(st, Integer.valueOf(i.intValue() + 1));
       }
     }
   }
 
   private int findRelevantElement(StackTraceElement[] trace)
   {
     if (trace.length == 0)
       return -1;
     if (this.included.size() == 0) {
       return 0;
     }
     int firstIncluded = -1;
     for (String myIncluded : this.included) {
       for (int i = 0; i < trace.length; i++) {
         StackTraceElement ste = trace[i];
         if ((!ste.getClassName().startsWith(myIncluded)) || (
           (i >= firstIncluded) && (firstIncluded != -1))) continue;
         firstIncluded = i;
         break;
       }
 
     }
 
     if ((firstIncluded >= 0) && (trace[firstIncluded].getClassName().equals("net.sf.cherry.tools.performance.CPUSampler$SamplerThread"))) {
       return -1;
     }
     return firstIncluded;
   }
 
   public static class SampledStacktraces
   {
     List<CPUSampler.StacktraceWithCount> topConsumers;
     int totalInvocations;
 
     public SampledStacktraces(List<CPUSampler.StacktraceWithCount> topConsumers, int totalInvocations)
     {
       this.topConsumers = topConsumers;
       this.totalInvocations = totalInvocations;
     }
 
     public List<CPUSampler.StacktraceWithCount> getTopConsumers() {
       return this.topConsumers;
     }
 
     public int getTotalInvocations() {
       return this.totalInvocations;
     }
 
     public String toString()
     {
       return toString(0);
     }
 
     public String toString(int minInvocation) {
       StringBuilder ret = new StringBuilder();
       for (CPUSampler.StacktraceWithCount swc : this.topConsumers) {
         if (swc.getCount() >= minInvocation) {
           ret.append(swc.toString(this.totalInvocations, 2147483647));
           ret.append("\n");
         }
       }
       return ret.toString();
     }
   }
 
   public static class StacktraceWithCount
     implements Comparable<StacktraceWithCount>
   {
     private int count;
     private CPUSampler.StackTrace trace;
 
     public StacktraceWithCount(int count, CPUSampler.StackTrace trace)
     {
       this.count = count;
       this.trace = trace;
     }
 
     public int getCount() {
       return this.count;
     }
 
     public StackTraceElement[] getTrace() {
       return this.trace.getTrace();
     }
 
     public int compareTo(StacktraceWithCount o)
     {
       return -Integer.valueOf(this.count).compareTo(Integer.valueOf(o.count));
     }
 
     public String toString()
     {
       return this.count + " Sampled Invocations\n" + this.trace.toString();
     }
 
     private double getPercentage(int total) {
       return Math.round(this.count / total * 10000.0D) / 100.0D;
     }
 
     public String toString(int totalInvoations, int traceLength) {
       return this.count + "/" + totalInvoations + " Sampled Invocations (" + getPercentage(totalInvoations) + "%) " + this.trace.toString(traceLength);
     }
   }
 
   private class SamplerThread
     implements Runnable
   {
     private boolean running = false;
     private boolean shouldRun = false;
     private Thread rthread;
 
     private SamplerThread()
     {
     }
 
     public void start()
     {
       if (!this.running) {
         this.shouldRun = true;
         this.rthread = new Thread(this, "CPU Sampling Thread");
         this.rthread.start();
         this.running = true;
       }
     }
 
     public void stop() {
       this.shouldRun = false;
       this.rthread.interrupt();
       try {
         this.rthread.join();
       } catch (InterruptedException e) {
         e.printStackTrace();
       }
     }
 
     public void run()
     {
       while (this.shouldRun) {
         CPUSampler.this.consumeStackTraces(Thread.getAllStackTraces());
         try {
           Thread.sleep(CPUSampler.this.interval);
         } catch (InterruptedException e) {
           return;
         }
       }
     }
   }
 
   private static class StackTrace
   {
     private StackTraceElement[] trace;
     private Thread.State state;
 
     public StackTrace(StackTraceElement[] trace, int startAt, Thread.State state)
     {
       this.state = state;
       if (startAt == 0) {
         this.trace = trace;
       } else {
         this.trace = new StackTraceElement[trace.length - startAt];
         System.arraycopy(trace, startAt, this.trace, 0, this.trace.length);
       }
     }
 
     public boolean equals(Object obj)
     {
       if (!(obj instanceof StackTrace)) {
         return false;
       }
       StackTrace other = (StackTrace)obj;
       if (other.trace.length != this.trace.length) {
         return false;
       }
       if (other.state != this.state) {
         return false;
       }
       for (int i = 0; i < this.trace.length; i++) {
         if (!this.trace[i].equals(other.trace[i])) {
           return false;
         }
       }
       return true;
     }
 
     public int hashCode()
     {
       int ret = 13 * this.trace.length + this.state.hashCode();
       for (StackTraceElement ste : this.trace) {
         ret ^= ste.hashCode();
       }
       return ret;
     }
 
     public StackTraceElement[] getTrace() {
       return this.trace;
     }
 
     public String toString()
     {
       return toString(-1);
     }
 
     public String toString(int traceLength) {
       StringBuilder ret = new StringBuilder("State: ");
       ret.append(this.state.name());
       if (traceLength > 1)
         ret.append("\n");
       else {
         ret.append(" ");
       }
       int i = 0;
       for (StackTraceElement ste : this.trace) {
         i++;
         if (i > traceLength) {
           break;
         }
         ret.append(ste.getClassName());
         ret.append("#");
         ret.append(ste.getMethodName());
         ret.append(" (Line: ");
         ret.append(ste.getLineNumber());
         ret.append(")\n");
       }
       return ret.toString();
     }
   }
 }




