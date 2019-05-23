/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.server;

/**
 *
 */
public enum ItemFlag {
   LOCK(1), 
   鞋子防滑(2), 
   披风防寒(4), 
   UNTRADEABLE(8), 
   KARMA_EQ(16), 
   KARMA_USE(2), 
   CHARM_EQUIPPED(32), 
   可以交易(48), 
   ANDROID_ACTIVATED(64), 
   CRAFTED(128), 
   CRAFTED_USE(16), 
   防爆卷轴(256), 
   幸运卷轴(512), 
   KARMA_ACC_USE(1024), 
   KARMA_ACC(4096), 
   保护卷轴(8192), 
   防护卷轴(16384);
 
   private final int i;
 
   private ItemFlag(int i) { this.i = i; }
 
   public int getValue()
   {
     return this.i;
   }
 
   public boolean check(int flag) {
     return (flag & this.i) == this.i;
   }
 }