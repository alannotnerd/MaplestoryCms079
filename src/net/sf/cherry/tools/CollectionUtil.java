 package net.sf.cherry.tools;
 
 import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
 
 public class CollectionUtil
 {
   public static <T> List<T> copyFirst(List<T> list, int count)
   {
     List ret = new ArrayList(list.size() < count ? list.size() : count);
     int i = 0;
     for (Iterator i$ = list.iterator(); i$.hasNext(); ) { Object elem = i$.next();
       ret.add(elem);
       if (i++ > count) {
         break;
       }
     }
     return ret;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.CollectionUtil
 * JD-Core Version:    0.6.0
 */