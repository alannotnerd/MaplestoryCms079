package net.sf.cherry.server;

import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.net.world.WorldServer;


public class Start {
	public static long startTime = System.currentTimeMillis();
    public static final Start Instance = new Start();
    
    public void run() {
    	
        long start = System.currentTimeMillis();

        WorldServer.init();

        LoginServer.init();
        ChannelServer.init();

        long now = System.currentTimeMillis() - start;
        long seconds = now / 1000;
        long ms = now % 1000;
        System.out.println("\r\n加载完成, 耗时: " + seconds + "秒" + ms + "毫秒");
        System.gc();   
    }


	public static void main(final String args[]) {
        Instance.run();
    }
}
