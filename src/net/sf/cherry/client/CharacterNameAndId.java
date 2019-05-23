package net.sf.cherry.client;

public class CharacterNameAndId {

    private int id;
    private String name;

    public CharacterNameAndId(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }
}