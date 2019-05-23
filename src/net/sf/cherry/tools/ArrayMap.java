 package net.sf.cherry.tools;
 
 import java.io.Serializable;
import java.util.AbstractMap;
import java.util.AbstractSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
 
 public class ArrayMap<K, V> extends AbstractMap<K, V>
   implements Serializable
 {
   static final long serialVersionUID = 9179541993413738569L;
   private Set<? extends Map.Entry<K, V>> entries = null;
   private ArrayList<Entry<K, V>> list;
 
   public ArrayMap()
   {
     this.list = new ArrayList();
   }
 
   public ArrayMap(Map<K, V> map)
   {
     this.list = new ArrayList();
     putAll(map);
   }
 
   public ArrayMap(int initialCapacity)
   {
     this.list = new ArrayList(initialCapacity);
   }
 
     public Set<java.util.Map.Entry<K, V>> entrySet() {
        if (entries == null) {
            entries = new AbstractSet<Entry<K, V>>() {

                @Override
                public void clear() {
                    throw new UnsupportedOperationException();
                }

                @Override
                public Iterator<Entry<K, V>> iterator() {
                    return list.iterator();
                }

                @Override
                public int size() {
                    return list.size();
                }
            };
        }
        return (Set<java.util.Map.Entry<K, V>>) entries;
    }
 
   public V put(K key, V value) {
        int size = list.size();
        Entry<K, V> entry = null;
        int i;
        if (key == null) {
            for (i = 0; i < size; i++) {
                entry = (list.get(i));
                if (entry.getKey() == null) {
                    break;
                }
            }
        } else {
            for (i = 0; i < size; i++) {
                entry = (list.get(i));
                if (key.equals(entry.getKey())) {
                    break;
                }
            }
        }
        V oldValue = null;
        if (i < size) {
            oldValue = entry.getValue();
            entry.setValue(value);
        } else {
            list.add(new Entry<K, V>(key, value));
        }
        return oldValue;
    }
 
   static class Entry<K, V>
     implements Map.Entry<K, V>, Serializable
   {
     static final long serialVersionUID = 9179541993413738569L;
     protected K key;
     protected V value;
 
     public Entry(K key, V value)
     {
       this.key = key;
       this.value = value;
     }
 
     public K getKey()
     {
       return this.key;
     }
 
     public V getValue()
     {
       return this.value;
     }
 
     public V setValue(V newValue)
     {
       Object oldValue = this.value;
       this.value = newValue;
        return (V) oldValue;
     }
 
     public boolean equals(Object o)
     {
       if (!(o instanceof Map.Entry)) {
         return false;
       }
       Map.Entry e = (Map.Entry)o;
       return (this.key == null ? e.getKey() == null : this.key.equals(e.getKey())) && (this.value == null ? e.getValue() == null : this.value.equals(e.getValue()));
     }
 
     public int hashCode()
     {
       int keyHash = this.key == null ? 0 : this.key.hashCode();
       int valueHash = this.value == null ? 0 : this.value.hashCode();
       return keyHash ^ valueHash;
     }
 
     public String toString()
     {
       return this.key + "=" + this.value;
     }
   }
 }




