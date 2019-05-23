 package net.sf.cherry.server.life;
 
 public enum Element
 {
   NEUTRAL, FIRE, ICE, LIGHTING, POISON, HOLY;
 
   public static Element getFromChar(char c) {
     switch (Character.toUpperCase(c)) {
     case 'F':
       return FIRE;
     case 'I':
       return ICE;
     case 'L':
       return LIGHTING;
     case 'S':
       return POISON;
     case 'H':
       return HOLY;
     case 'P':
       return NEUTRAL;
     case 'G':
     case 'J':
     case 'K':
     case 'M':
     case 'N':
     case 'O':
     case 'Q':
     case 'R': } throw new IllegalArgumentException("unknown elemnt char " + c);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.life.Element
 * JD-Core Version:    0.6.0
 */