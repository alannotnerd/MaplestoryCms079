 package net.sf.cherry.tools;
 
 import java.io.Serializable;
 
 public class Pair<E, F>
   implements Serializable
 {
   static final long serialVersionUID = 9179541993413738569L;
   private E left;
   private F right;
 
   public Pair(E left, F right)
   {
     this.left = left;
     this.right = right;
   }
 
   public E getLeft()
   {
     return this.left;
   }
 
   public F getRight()
   {
     return this.right;
   }
 
   public String toString()
   {
     return this.left.toString() + ":" + this.right.toString();
   }
 
   public int hashCode()
   {
     int prime = 31;
     int result = 1;
     result = 31 * result + (this.left == null ? 0 : this.left.hashCode());
     result = 31 * result + (this.right == null ? 0 : this.right.hashCode());
     return result;
   }
 
   public boolean equals(Object obj)
   {
     if (this == obj) {
       return true;
     }
     if (obj == null) {
       return false;
     }
     if (getClass() != obj.getClass()) {
       return false;
     }
     Pair other = (Pair)obj;
     if (this.left == null) {
       if (other.left != null)
         return false;
     }
     else if (!this.left.equals(other.left)) {
       return false;
     }
     if (this.right == null) {
       if (other.right != null)
         return false;
     }
     else if (!this.right.equals(other.right)) {
       return false;
     }
     return true;
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.tools.Pair
 * JD-Core Version:    0.6.0
 */