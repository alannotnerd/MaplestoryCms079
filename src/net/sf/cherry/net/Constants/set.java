package net.sf.cherry.net.Constants;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import constants.ServerConfig;

public class set {

    private static set instance = null;
    private static boolean CANLOG;
    private Properties itempb_cfg;
    private String itempb_id[];
    private String mappb_id[];
    private static Logger log = LoggerFactory.getLogger(set.class);

    public set() {
        itempb_cfg = new Properties();
        try {
            InputStreamReader is = new FileReader(ServerConfig.CONFIG_FILE_NAME);
            itempb_cfg.load(is);
            is.close();
            itempb_id = itempb_cfg.getProperty("cashban").split(",");
        } catch (Exception e) {
            log.error("Could not configuration", e);
        }
    }
    public String[] getItempb_id() {
        return itempb_id;
    }

    public String[] getMappb_id() {
        return mappb_id;
    }
    public boolean isCANLOG() {
        return CANLOG;
    }

    public void setCANLOG(boolean CANLOG) {
        set.CANLOG = CANLOG;
    }

    public static set getInstance() {
        if (instance == null) {
            instance = new set();
        }
        return instance;
    }
}
