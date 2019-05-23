 package net.sf.cherry.scripting.event;
 
 import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.scripting.AbstractScriptManager;
 
 public class EventScriptManager extends AbstractScriptManager
 {
   private Map<String, EventEntry> events = new LinkedHashMap<String, EventEntry>();
 
   public EventScriptManager(ChannelServer cserv, String[] scripts)
   {
     for (String script : scripts)
       if (!script.equals("")) {
         Invocable iv = getInvocable("event/" + script + ".js", null);
         this.events.put(script, new EventEntry(iv, new EventManager(cserv, iv, script)));
       }
   }
 
  /* public EventManager getEventManager(String event)
   {
     EventEntry entry = (EventEntry)this.events.get(event);
     if (entry == null) {
       return null;
     }
     return entry.em;
   }*/
       public EventManager getEventManager(String event) {
        EventEntry entry = events.get(event);
        if (entry == null) {
            return null;
        }
        return entry.em;
    }
 
   public void init() {
     for (EventEntry entry : this.events.values())
       try {
         ((ScriptEngine)entry.iv).put("em", entry.em);
         entry.iv.invokeFunction("init", new Object[] { (Object)null });
       } catch (ScriptException ex) {
         Logger.getLogger(EventScriptManager.class.getName()).log(Level.SEVERE, null, ex);
       } catch (NoSuchMethodException ex) {
         Logger.getLogger(EventScriptManager.class.getName()).log(Level.SEVERE, null, ex);
       }
   }
 
   public void cancel()
   {
     for (EventEntry entry : this.events.values())
       entry.em.cancel();
   }
 
   private class EventEntry
   {
     public Invocable iv;
     public EventManager em;
 
     public EventEntry(Invocable iv, EventManager em)
     {
       this.iv = iv;
       this.em = em;
     }
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.scripting.event.EventScriptManager
 * JD-Core Version:    0.6.0
 */