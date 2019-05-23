package net.sf.cherry.server;

import java.lang.management.ManagementFactory;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import javax.management.MBeanServer;
import javax.management.ObjectName;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.messages.MessageCallback;

public class TimerManager
        implements TimerManagerMBean {

    private static Logger log = LoggerFactory.getLogger(TimerManager.class);
    private static TimerManager instance = new TimerManager();
    private ScheduledThreadPoolExecutor ses;

    private TimerManager() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            mBeanServer.registerMBean(this, new ObjectName("net.sf.cherry.server:type=TimerManger"));
        } catch (Exception e) {
            log.error("Error registering MBean", e);
        }
    }

    public static TimerManager getInstance() {
        return instance;
    }

    public void start() {
        if ((this.ses != null) && (!this.ses.isShutdown()) && (!this.ses.isTerminated())) {
            return;
        }
        ScheduledThreadPoolExecutor stpe = new ScheduledThreadPoolExecutor(8, new ThreadFactory() {

            private final AtomicInteger threadNumber = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName("Timermanager-Worker-" + this.threadNumber.getAndIncrement());
                return t;
            }
        });
        stpe.setMaximumPoolSize(8);
        stpe.setContinueExistingPeriodicTasksAfterShutdownPolicy(false);
        this.ses = stpe;
    }

    public void stop() {
        this.ses.shutdown();
    }

    public ScheduledFuture<?> register(Runnable r, long repeatTime, long delay) {
        return this.ses.scheduleAtFixedRate(new LoggingSaveRunnable(r), delay, repeatTime, TimeUnit.MILLISECONDS);
    }

    public ScheduledFuture<?> register(Runnable r, long repeatTime) {
        return this.ses.scheduleAtFixedRate(new LoggingSaveRunnable(r), 0L, repeatTime, TimeUnit.MILLISECONDS);
    }

    public ScheduledFuture<?> schedule(Runnable r, long delay) {
        return this.ses.schedule(new LoggingSaveRunnable(r), delay, TimeUnit.MILLISECONDS);
    }

    public ScheduledFuture<?> scheduleAtTimestamp(Runnable r, long timestamp) {
        return schedule(r, timestamp - System.currentTimeMillis());
    }

    public void dropDebugInfo(MessageCallback callback) {
        StringBuilder builder = new StringBuilder();
        builder.append("Terminated: ");
        builder.append(this.ses.isTerminated());
        builder.append(" Shutdown: ");
        builder.append(this.ses.isShutdown());
        callback.dropMessage(builder.toString());

        builder = new StringBuilder();
        builder.append("Completed Tasks: ");
        builder.append(this.ses.getCompletedTaskCount());
        builder.append(" Active Tasks: ");
        builder.append(this.ses.getActiveCount());
        builder.append(" Task Count: ");
        builder.append(this.ses.getTaskCount());
        callback.dropMessage(builder.toString());

        builder = new StringBuilder();
        builder.append("Queued Tasks: ");
        builder.append(this.ses.getQueue().toArray().length);
        callback.dropMessage(builder.toString());
    }

    public long getActiveCount() {
        return this.ses.getActiveCount();
    }

    public long getCompletedTaskCount() {
        return this.ses.getCompletedTaskCount();
    }

    public int getQueuedTasks() {
        return this.ses.getQueue().toArray().length;
    }

    public long getTaskCount() {
        return this.ses.getTaskCount();
    }

    public boolean isShutdown() {
        return this.ses.isShutdown();
    }

    public boolean isTerminated() {
        return this.ses.isTerminated();
    }

    public Runnable purge() {//Yay?
        return new Runnable() {

            public void run() {
                ses.purge();
            }
        };
    }

    private static class LoggingSaveRunnable implements Runnable {

        Runnable r;

        public LoggingSaveRunnable(Runnable r) {
            this.r = r;
        }

        public void run() {
            try {
                this.r.run();
            } catch (Throwable t) {
                TimerManager.log.error("ERROR", t);
            }
        }
    }
}