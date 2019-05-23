 package net.sf.cherry.client.status;
 
 import java.io.Serializable;

import net.sf.cherry.net.LongValueHolder;
 
public enum MonsterStatus implements LongValueHolder, Serializable {
   WATK(1), 
   WDEF(2), 
   MATK(4), 
   MDEF(8), 
   ACC(16), 
   AVOID(32), 
   SPEED(64), 
   STUN(128), 
   FREEZE(256), 
   POISON(512), 
   SEAL(1024), 
   TAUNT(2048), 
   WEAPON_ATTACK_UP(4096), 
   WEAPON_DEFENSE_UP(8192), 
   MAGIC_ATTACK_UP(16384), 
   MAGIC_DEFENSE_UP(32768), 
   DOOM(65536), 
   抗压(0x2L), 
   SHADOW_WEB(131072), 
   WEAPON_IMMUNITY(262144), 
   MAGIC_IMMUNITY(524288), 
   NINJA_AMBUSH(4194304), 
   HYPNOTIZED(268435456);
 
   static final long serialVersionUID = 0L;
    private final long i;

    private MonsterStatus(long i) {
        this.i = i;
    }

    @Override
    public long getValue() {
        return i;
    }
}