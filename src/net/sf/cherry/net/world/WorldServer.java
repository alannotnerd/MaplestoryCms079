package net.sf.cherry.net.world;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.rmi.ssl.SslRMIClientSocketFactory;
import javax.rmi.ssl.SslRMIServerSocketFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.net.channel.PlayerStorage;

public class WorldServer {

    private static WorldServer instance = null;
    private static Logger log = LoggerFactory.getLogger(WorldServer.class);
    private int worldId;
    private Properties dbProp = new Properties();
    private Properties worldProp = new Properties();
    private List<ChannelServer> channels = new ArrayList<ChannelServer>();
    private PlayerStorage players = new PlayerStorage();

    private WorldServer() {
        try {
            InputStreamReader is = new FileReader(ServerConfig.CONFIG_FILE_NAME_DB);
            this.dbProp.load(is);
            is.close();
            DatabaseConnection.setProps(this.dbProp);
            DatabaseConnection.getConnection();
            
            is = new FileReader(ServerConfig.CONFIG_FILE_NAME);
            this.worldProp.load(is);
            is.close();
        } catch (Exception e) {
            log.error("Could not configuration", e);
        }
    }

     
    public static synchronized WorldServer getInstance() {
        if (instance == null) {
            instance = new WorldServer();
        }
        return instance;
    }

    public int getWorldId() {
        return this.worldId;
    }

    public Properties getDbProp() {
        return this.dbProp;
    }

    public Properties getWorldProp() {
        return this.worldProp;
    }
    
    public static void main(String[] args) {
    	init();
    }
    public static void init() {
    	 try {
    		 ServerConfig.SetRMIParam();
             Registry registry = LocateRegistry.createRegistry(1099, new SslRMIClientSocketFactory(), new SslRMIServerSocketFactory());
             registry.rebind("WorldRegistry", WorldRegistryImpl.getInstance());
         } catch (RemoteException ex) {
             log.error("Could not initialize RMI system", ex);
         }
    }
    
    public List<ChannelServer> getChannels() {
        return channels;
    }
    public final void shutdown() {
        for (ChannelServer ch : getChannels()) {
            ch.shutdown();
        }
        players.disconnectAll();
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.world.WorldServer
 * JD-Core Version:    0.6.0
 */