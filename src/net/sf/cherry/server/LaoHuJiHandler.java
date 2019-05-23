/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.server;

import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.MaplePacketCreator;

/**
 *
 * @author 老虎机
 */
public class LaoHuJiHandler {

    private transient ScheduledFuture<?> fishTimer;
    private int fishTasking = 0;

    public void LaoHuJi(final MapleClient c, int itemId,int time) {
        /*int 循环次数 = RandomizerNew.nextInt(10);
        String a1 = "★";
        String a2 = "☆";
        String b1 = "★";
        String b2 = "☆";
        String c1 = "★";
        String c2 = "☆";
        String d1 = "★";
        String d2 = "☆";
        String e1 = "★";
        String e2 = "☆";
        String f1 = "★";
        String f2 = "☆";
        String g1 = "★";
        String g2 = "☆";
        String h1 = "★";
        String h2 = "☆";
        String i1 = "★";
        String i2 = "☆";
        String j1 = "★";
        String j2 = "☆";
        String k1 = "★";
        String k2 = "☆";
        String l1 = "★";
        String l2 = "☆";
        String m1 = "★";
        String m2 = "☆";
        String n1 = "★";
        String n2 = "☆";
        String o1 = "★";
        String o2 = "☆";
        String p1 = "★";
        String p2 = "☆";
        String q1 = "★";
        String q2 = "☆";
        String r1 = "★";
        String r2 = "☆";
        String s1 = "★";
        String s2 = "☆";
        String t1 = "★";
        String t2 = "☆";
        String u1 = "★";
        String u2 = "☆";
        String v1 = "★";
        String v2 = "☆";
        String w1 = "★";
        String w2 = "☆";
        String x1 = "★";
        String x2 = "☆";
        String y1 = "★";
        String y2 = "☆";
        String z1 = "★";
        String z2 = "☆";
        String aa1 = "★";
        String aa2 = "☆";
        String ab1 = "★";
        String ab2 = "☆";
        String ac1 = "★";
        String ac2 = "☆";
        String ad1 = "★";
        String ad2 = "☆";
        String ae1 = "★";
        String ae2 = "☆";
        String af1 = "★";
        String af2 = "☆";
        String a11 = "★";
        String a22 = "☆";
        String b11 = "★";
        String b22 = "☆";
        String c11 = "★";
        String c22 = "☆";
        String d11 = "★";
        String d22 = "☆";
        String e11 = "★";
        String e22 = "☆";
        String f11 = "★";
        String f22 = "☆";
        String g11 = "★";
        String g22 = "☆";
        String h11 = "★";
        String h22 = "☆";
        String i11 = "★";
        String i22 = "☆";
        String j11 = "★";
        String j22 = "☆";
        String k11 = "★";
        String k22 = "☆";
        String l11 = "★";
        String l22 = "☆";
        String m11 = "★";
        String m22 = "☆";
        String n11 = "★";
        String n22 = "☆";
        String o11 = "★";
        String o22 = "☆";
        String p11 = "★";
        String p22 = "☆";
        String q11 = "★";
        String q22 = "☆";
        String r11 = "★";
        String r22 = "☆";
        String s11 = "★";
        String s22 = "☆";
        String t11 = "★";
        String t22 = "☆";
        String u11 = "★";
        String u22 = "☆";
        String v11 = "★";
        String v22 = "☆";
        String w11 = "★";
        String w22 = "☆";
        String x11 = "★";
        String x22 = "☆";
        String y11 = "★";
        String y22 = "☆";
        String z11 = "★";
        String z22 = "☆";
        String aa11 = "★";
        String aa22 = "☆";
        String ab11 = "★";
        String ab22 = "☆";
        String ac11 = "★";
        String ac22 = "☆";
        String ad11 = "★";
        String ad22 = "☆";
        String ae11 = "★";
        String ae22 = "☆";
        String af11 = "★";
        String af22 = "☆";
        int 亮黑星 = 0;
        String gage;
        for (int i = 0; i < 64; i++) {
            if (i == 1) {
                亮黑星 = 1;
            }
        }
        gage = "#e#r-----------老虎机功能启动-----------#n"
                + "\r\n    ■■■■■■■■■■■■■■■■■  "
                + "\r\n    " + a1 + b1 + c1 + d1 + e1 + f1 + g1 + h1 + i1 + j1 + k1 + l1 + m1 + n1 + o1 + p1 + q1 + ""
                + "\r\n■" + r11 + "                                " + r1 + "■"
                + "\r\n■" + s11 + "                                " + s1 + "■"
                + "\r\n■" + t11 + "                                " + t1 + "■"
                + "\r\n■" + u11 + "                                " + u1 + "■"
                + "\r\n■" + v11 + "                                " + v1 + "■"
                + "\r\n■" + w11 + "                                " + w1 + "■"
                + "\r\n■" + x11 + "                                " + x1 + "■"
                + "\r\n■" + y11 + "                                " + y1 + "■"
                + "\r\n■" + z11 + "                                " + z1 + "■"
                + "\r\n■" + aa11 + "                                " + aa1 + "■"
                + "\r\n■" + ab11 + "                                " + ab1 + "■"
                + "\r\n■" + ac11 + "                                " + ac1 + "■"
                + "\r\n■" + ad11 + "                                " + ad1 + "■"
                + "\r\n■" + ae11 + "                                " + ae1 + "■"
                + "\r\n■" + af11 + "                                " + af1 + "■"
                + "\r\n    " + a11 + b11 + c11 + d11 + e11 + f11 + g11 + h11 + i11 + j11 + k11 + l11 + m11 + n11 + o11 + p11 + q11 + ""
                + "\r\n    ■■■■■■■■■■■■■■■■■  ";
*/
        fishTimer = TimerManager.getInstance().register(new Runnable() {

            @Override
            public void run() {
                //if (fishTasking < 64) {
       
                int 亮黑星 = 0;
                int 亮白星 = 0;
                String 老虎机 = "";
                String a1 = "";
                String b1 = "";
                String c1 = "";
                String d1 = "";
                String e1 = "";
                String f1 = "";
                String g1 = "";
                String h1 = "";
                String i1 = "";
                String j1 = "";
                String k1 = "";
                String l1 = "";
                String m1 = "";
                String n1 = "";
                String o1 = "";
                String p1 = "";
                String q1 = "";
                String r1 = "";
                String s1 = "";
                String t1 = "";
                String u1 = "";
                String v1 = "";
                String w1 = "";
                String x1 = "";
                String y1 = "";
                String z1 = "";
                String aa1 = "";
                String ab1 = "";
                String ac1 = "";
                String ad1 = "";
                String ae1 = "";
                String af1 = "";
                String a11 = "";
                String b11 = "";
                String c11 = "";
                String d11 = "";
                String e11 = "";
                String f11 = "";
                String g11 = "";
                String h11 = "";
                String i11 = "";
                String j11 = "";
                String k11 = "";
                String l11 = "";
                String m11 = "";
                String n11 = "";
                String o11 = "";
                String p11 = "";
                String q11 = "";
                String r11 = "";
                String s11 = "";
                String t11 = "";
                String u11 = "";
                String v11 = "";
                String w11 = "";
                String x11 = "";
                String y11 = "";
                String z11 = "";
                String aa11 = "";
                String ab11 = "";
                String ac11 = "";
                String ad11 = "";
                String ae11 = "";
                String af11 = "";
                    if (fishTasking < 65) {
                        fishTasking++;
                        for (int i = 0; i < fishTasking; i++) {
                            亮黑星 = i;
                        }
                        if (亮黑星 == 1) {
                            a1 = "★";
                        } else {
                            a1 = "☆";
                        }
                        if (亮黑星 == 2) {
                            b1 = "★";
                        } else {
                            b1 = "☆";
                        }
                        if (亮黑星 == 3) {
                            c1 = "★";
                        } else {
                            c1 = "☆";
                        }
                        if (亮黑星 == 4) {
                            d1 = "★";
                        } else {
                            d1 = "☆";
                        }
                        if (亮黑星 == 5) {
                            e1 = "★";
                        } else {
                            e1 = "☆";
                        }
                        if (亮黑星 == 6) {
                            f1 = "★";
                        } else {
                            f1 = "☆";
                        }
                        if (亮黑星 == 7) {
                            g1 = "★";
                        } else {
                            g1 = "☆";
                        }
                        if (亮黑星 == 8) {
                            h1 = "★";
                        } else {
                            h1 = "☆";
                        }
                        if (亮黑星 == 9) {
                            i1 = "★";
                        } else {
                            i1 = "☆";
                        }
                        if (亮黑星 == 10) {
                            j1 = "★";
                        } else {
                            j1 = "☆";
                        }
                        if (亮黑星 == 11) {
                            k1 = "★";
                        } else {
                            k1 = "☆";
                        }
                        if (亮黑星 == 12) {
                            l1 = "★";
                        } else {
                            l1 = "☆";
                        }
                        if (亮黑星 == 13) {
                            m1 = "★";
                        } else {
                            m1 = "☆";
                        }
                        if (亮黑星 == 14) {
                            n1 = "★";
                        } else {
                            n1 = "☆";
                        }
                        if (亮黑星 == 15) {
                            o1 = "★";
                        } else {
                            o1 = "☆";
                        }
                        if (亮黑星 == 16) {
                            p1 = "★";
                        } else {
                            p1 = "☆";
                        }
                        if (亮黑星 == 17) {
                            q1 = "★";
                        } else {
                            q1 = "☆";
                        }
                        if (亮黑星 == 18) {
                            r1 = "★";
                        } else {
                            r1 = "☆";
                        }
                        if (亮黑星 == 19) {
                            s1 = "★";
                        } else {
                            s1 = "☆";
                        }
                        if (亮黑星 == 20) {
                            t1 = "★";
                        } else {
                            t1 = "☆";
                        }
                        if (亮黑星 == 21) {
                            u1 = "★";
                        } else {
                            u1 = "☆";
                        }
                        if (亮黑星 == 22) {
                            v1 = "★";
                        } else {
                            v1 = "☆";
                        }
                        if (亮黑星 == 23) {
                            w1 = "★";
                        } else {
                            w1 = "☆";
                        }
                        if (亮黑星 == 24) {
                            x1 = "★";
                        } else {
                            x1 = "☆";
                        }
                        if (亮黑星 == 25) {
                            y1 = "★";
                        } else {
                            y1 = "☆";
                        }
                        if (亮黑星 == 26) {
                            z1 = "★";
                        } else {
                            z1 = "☆";
                        }
                        if (亮黑星 == 27) {
                            aa1 = "★";
                        } else {
                            aa1 = "☆";
                        }
                        if (亮黑星 == 28) {
                            ab1 = "★";
                        } else {
                            ab1 = "☆";
                        }
                        if (亮黑星 == 29) {
                            ac1 = "★";
                        } else {
                            ac1 = "☆";
                        }
                        if (亮黑星 == 30) {
                            ad1 = "★";
                        } else {
                            ad1 = "☆";
                        }
                        if (亮黑星 == 31) {
                            ae1 = "★";
                        } else {
                            ae1 = "☆";
                        }
                        if (亮黑星 == 32) {
                            af1 = "★";
                        } else {
                            af1 = "☆";
                        }
                        if (亮黑星 == 33) {
                            a11 = "★";
                        } else {
                            a11 = "☆";
                        }
                        if (亮黑星 == 34) {
                            b11 = "★";
                        } else {
                            b11 = "☆";
                        }
                        if (亮黑星 == 35) {
                            c11 = "★";
                        } else {
                            c11 = "☆";
                        }
                        if (亮黑星 == 36) {
                            d11 = "★";
                        } else {
                            d11 = "☆";
                        }
                        if (亮黑星 == 37) {
                            e11 = "★";
                        } else {
                            e11 = "☆";
                        }
                        if (亮黑星 == 38) {
                            f11 = "★";
                        } else {
                            f11 = "☆";
                        }
                        if (亮黑星 == 39) {
                            g11 = "★";
                        } else {
                            g11 = "☆";
                        }
                        if (亮黑星 == 40) {
                            h11 = "★";
                        } else {
                            h11 = "☆";
                        }
                        if (亮黑星 == 41) {
                            i11 = "★";
                        } else {
                            i11 = "☆";
                        }
                        if (亮黑星 == 42) {
                            j11 = "★";
                        } else {
                            j11 = "☆";
                        }
                        if (亮黑星 == 43) {
                            k11 = "★";
                        } else {
                            k11 = "☆";
                        }
                        if (亮黑星 == 4) {
                            l11 = "★";
                        } else {
                            l11 = "☆";
                        }
                        if (亮黑星 == 45) {
                            m11 = "★";
                        } else {
                            m11 = "☆";
                        }
                        if (亮黑星 == 46) {
                            n11 = "★";
                        } else {
                            n11 = "☆";
                        }
                        if (亮黑星 == 47) {
                            o11 = "★";
                        } else {
                            o11 = "☆";
                        }
                        if (亮黑星 == 48) {
                            p11 = "★";
                        } else {
                            p11 = "☆";
                        }
                        if (亮黑星 == 49) {
                            q11 = "★";
                        } else {
                            q11 = "☆";
                        }
                        if (亮黑星 == 50) {
                            r11 = "★";
                        } else {
                            r11 = "☆";
                        }
                        if (亮黑星 == 51) {
                            s11 = "★";
                        } else {
                            s11 = "☆";
                        }
                        if (亮黑星 == 52) {
                            t11 = "★";
                        } else {
                            t11 = "☆";
                        }
                        if (亮黑星 == 53) {
                            u11 = "★";
                        } else {
                            u11 = "☆";
                        }
                        if (亮黑星 == 54) {
                            v11 = "★";
                        } else {
                            v11 = "☆";
                        }
                        if (亮黑星 == 55) {
                            w11 = "★";
                        } else {
                            w11 = "☆";
                        }
                        if (亮黑星 == 56) {
                            x11 = "★";
                        } else {
                            x11 = "☆";
                        }
                        if (亮黑星 == 57) {
                            y11 = "★";
                        } else {
                            y11 = "☆";
                        }
                        if (亮黑星 == 58) {
                            z11 = "★";
                        } else {
                            z11 = "☆";
                        }
                        if (亮黑星 == 59) {
                            aa11 = "★";
                        } else {
                            aa11 = "☆";
                        }
                        if (亮黑星 == 60) {
                            ab11 = "★";
                        } else {
                            ab11 = "☆";
                        }
                        if (亮黑星 == 61) {
                            ac11 = "★";
                        } else {
                            ac11 = "☆";
                        }
                        if (亮黑星 == 62) {
                            ad11 = "★";
                        } else {
                            ad11 = "☆";
                        }
                        if (亮黑星 == 63) {
                            ae11 = "★";
                        } else {
                            ae11 = "☆";
                        }
                        if (亮黑星 == 64) {
                            af11 = "★";
                        } else {
                            af11 = "☆";
                        }
                        老虎机 = "#e#r-----------老虎机功能启动----------#n"
                                + "\r\n    ■■■■■■■■■■■■■■■■■  "
                                + "\r\n  " + a1 + b1 + c1 + d1 + e1 + f1 + g1 + h1 + i1 + j1 + k1 + l1 + m1 + n1 + o1 + p1 + q1 + ""
                                + "\r\n■" + af11 + "                                " + r1 + "■"
                                + "\r\n■" + ae11 + "                                " + s1 + "■"
                                + "\r\n■" + ad11 + "                                " + t1 + "■"
                                + "\r\n■" + ac11 + "                                " + u1 + "■"
                                + "\r\n■" + ab11 + "                                " + v1 + "■"
                                + "\r\n■" + aa11 + "                                " + w1 + "■"
                                + "\r\n■" + z11 + "                                " + x1 + "■"
                                + "\r\n■" + y11 + "                                " + y1 + "■"
                                + "\r\n■" + x11 + "                                " + z1 + "■"
                                + "\r\n■" + w11 + "                                " + aa1 + "■"
                                + "\r\n■" + v11 + "                                " + ab1 + "■"
                                + "\r\n■" + u11 + "                                " + ac1 + "■"
                                + "\r\n■" + t11 + "                                " + ad1 + "■"
                                + "\r\n■" + s11 + "                                " + ae1 + "■"
                                + "\r\n■" + r11 + "                                " + af1 + "■"
                                + "\r\n  " + q11 + p11 + o11 + n11 + m11 + l11 + k11 + j11 + i11 + h11 + g11 + f11 + e11 + d11 + c11 + b11 + a11 + ""
                                + "\r\n    ■■■■■■■■■■■■■■■■■  ";
                        c.getSession().write(MaplePacketCreator.sendHint(老虎机, 250, 250));
                    }
                }
        }, time, time);
    }
}
