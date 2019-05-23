/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.net.mina;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import constants.ServerConfig;
import net.sf.cherry.client.MapleClient;

public class FileoutputUtil {

    public static final String Acc_Stuck = "log\\AccountStuck.log";
    public static final String Login_Error = "log\\Login_Error.log";
    public static final String PacketLog = "log\\PacketLog.log";
    public static final String SkillsLog = "log\\SkillsLog.log";
    public static final String SkillBuff = "log\\SkillBuffLog.log";
    public static final String AttackLog = "log\\AttackLog.log";
    public static final String ClientError = "log\\ClientError.log";
    public static final String PlayerSkills = "log\\PlayerSkills.log";
    public static final String Zakum_Log = "log\\Log_Zakum.log";
    public static final String Horntail_Log = "log\\Log_Horntail.log";
    public static final String Pinkbean_Log = "log\\Pinkbean.log";
    public static final String ScriptEx_Log = "log\\Script_Except.log";
    public static final String PacketEx_Log = "log\\Packet_Except.log";
    public static final String Donator_Log = "log\\Donator.log";
    public static final String Hacker_Log = "log\\Hacker.log";
    public static final String Movement_Log = "log\\Movement.log";
    public static final String 掉血错误 = "log\\掉血错误.log";
    public static final String 攻击出错 = "log\\攻击出错.log";
    public static final String 封包出错 = "log\\封包出错.log";
    public static final String 数据异常 = "log\\数据异常.log";
    public static final String CommandEx_Log = "log\\Command_Except.log";
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdfGMT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf_ = new SimpleDateFormat("yyyy-MM-dd");

    public static void packetLog(String file, String msg) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(msg.getBytes(ServerConfig.STRCHARSET));
            out.write("\r\n\r\n".getBytes(ServerConfig.STRCHARSET));
        } catch (IOException ignore) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void log(String file, String msg) {
        log(file, msg, false);
    }

    public static void log(String file, String msg, boolean A) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            String rn = "\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n";
            out.write(rn.getBytes(ServerConfig.STRCHARSET));
            out.write(msg.getBytes(ServerConfig.STRCHARSET));
        } catch (IOException ignore) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    private static String buildLogPath(MapleClient c, String defPath) {
        String builtPath;
        if (c == null) {
            builtPath = "logs/system/";
        } else {
            // String builtPath;
            if (c.getPlayer() == null) {
                builtPath = "logs/accounts/" + c.getAccountName() + "_ACCOUNT/";
            } else {
                builtPath = "logs/accounts/players" + c.getAccountName() + "_ACCOUNT/" + c.getPlayer().getName() + "_CHARACTER" + "/";
            }
        }
        File dir_1 = new File(builtPath);
        try {
            dir_1.mkdirs();
        } catch (Exception e) {
        }
        // String builtPath = builtPath + defPath;
        return builtPath;
    }

    public static void outputFileError(String file, Throwable t) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(("\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n").getBytes(ServerConfig.STRCHARSET));
            out.write(getString(t).getBytes(ServerConfig.STRCHARSET));
        } catch (IOException ignore) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static String CurrentReadable_Date() {
        return sdf_.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_Time() {
        return sdf.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_TimeGMT() {
        return sdfGMT.format(new Date());
    }

    public static String getString(Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }

    static {
        sdfGMT.setTimeZone(TimeZone.getTimeZone("GMT"));
    }
}