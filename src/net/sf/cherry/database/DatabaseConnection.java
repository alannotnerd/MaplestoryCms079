package net.sf.cherry.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Properties;

public class DatabaseConnection {

    private static ThreadLocal<Connection> con = new ThreadLocalConnection();
    private final static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(DatabaseConnection.class);
    private static Properties props = null;

    public static Connection getConnection() {
        if (props == null) {
            throw new RuntimeException("DatabaseConnection not initialized");
        }
        return (Connection) con.get();
    }

    public static boolean isInitialized() {
        return props != null;
    }

    public static void setProps(Properties aProps) {
        props = aProps;
    }

    public static void closeAll() throws SQLException {
        for (Connection con : ThreadLocalConnection.allConnections) {
            con.close();
        }
    }

    private static class ThreadLocalConnection extends ThreadLocal<Connection> {

        public static Collection<Connection> allConnections = new LinkedList();

        protected Connection initialValue() {
            String driver = DatabaseConnection.props.getProperty("driver");
            String url = DatabaseConnection.props.getProperty("url");
            String user = DatabaseConnection.props.getProperty("user");
            String password = DatabaseConnection.props.getProperty("password");
            try {
                Class.forName(driver);
            } catch (ClassNotFoundException e) {
                DatabaseConnection.log.error("ERROR", e);
            }
            try {
                Connection con = DriverManager.getConnection(url, user, password);
                allConnections.add(con);
                return con;
            } catch (SQLException e) {
                DatabaseConnection.log.error("ERROR", e);
            }
            return null;
        }
    }
}
