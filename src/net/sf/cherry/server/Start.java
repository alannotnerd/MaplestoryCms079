package net.sf.cherry.server;

import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.login.LoginServer;
import net.sf.cherry.net.world.WorldServer;


public class Start {

  public static void main(final String[] args) {
    Start.run();
  }

  public static void run() {

    long start = System.currentTimeMillis();
//    String arg = "java -Dnet.sf.cherry.recvops=recvops.properties " +
//        "-Dnet.sf.cherry.sendops=sendops.properties " +
//        "-Dnet.sf.cherry.wzpath=wz/ " +
//        "-Dnet.sf.cherry.login.config=CherryMS4Love.properties " +
//        "-Dnet.sf.cherry.channel.config=CherryMS4Love.properties " +
//        "-Djavax.net.ssl.keyStore=filename.keystore " +
//        "-Djavax.net.ssl.keyStorePassword=passwd " +
//        "-Djavax.net.ssl.trustStore=filename.keystore " +
//        "-Djavax.net.ssl.trustStorePassword=passwd" +
//        "-cp lib/jmser079.jar:lib/mina-core.jar:lib/slf4j-api.jar:lib/slf4j-jdk14.jar:lib/mysql-connector-java-bin.jar:lib/rhino-1.7.7.1.jar:lib/rhino-js-engine-1.7.7.1.jar";
    try {
      WorldServer.init();
      Thread.sleep(1000);
      LoginServer.init();
      Thread.sleep(1000);
      ChannelServer.init();
    } catch (InterruptedException e){
      e.printStackTrace();
    }
    long now = System.currentTimeMillis() - start;
    long seconds = now / 1000;
    long ms = now % 1000;
    System.out.println("\r\n加载完成, 耗时: " + seconds + "秒" + ms + "毫秒");
    System.gc();
  }
}
