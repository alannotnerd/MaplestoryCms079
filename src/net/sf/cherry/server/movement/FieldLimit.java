/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.sf.cherry.server.movement;

/**
 *
 */
public enum FieldLimit {
    JUMP(0x01),
    MOVEMENTSKILLS(0x02),
    SUMMON(0x04),
    DOOR(0x08),
    CHANGECHANNEL(0x10),
    CANNOTVIPROCK(0x40),
    CANNOTMINIGAME(0x80),
    //NoClue1(0x100), // APQ and a couple quest maps have this
    CANNOTUSEMOUNTS(0x200),
    //NoClue2(0x400), // Monster carnival?
    //NoClue3(0x800), // Monster carnival?
    CANNOTUSEPOTION(0x1000),
    //NoClue4(0x2000), // No notes
    //Unused(0x4000),
    //NoClue5(0x8000), // Ariant colosseum-related?
    //NoClue6(0x10000), // No notes
    CANNOTJUMPDOWN(0x20000);
    //NoClue7(0x40000); // Seems to .. disable Rush if 0x2 is set
    private long i;

    private FieldLimit(long i) {
        this.i = i;
    }

    public long getValue() {
        return i;
    }

    public boolean check(int fieldlimit) {
        return (fieldlimit & i) == i;
    }
}
