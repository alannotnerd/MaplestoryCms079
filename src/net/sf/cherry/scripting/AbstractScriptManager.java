package net.sf.cherry.scripting;

import net.sf.cherry.client.MapleClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.File;
import java.io.FileReader;

public abstract class AbstractScriptManager {
  protected static final Logger log = LoggerFactory.getLogger(AbstractScriptManager.class);
  protected ScriptEngine engine;
  private ScriptEngineManager sem;

  protected AbstractScriptManager() {
    this.sem = new ScriptEngineManager();
  }

  protected Invocable getInvocable(String path, MapleClient c) {
    try {
      path = "scripts/" + path;
      this.engine = null;
      if (c != null) {
        this.engine = c.getScriptEngine(path);
      }
      if (this.engine == null) {
        File scriptFile = new File(path);
        if (!scriptFile.exists()) {
          return null;
        }
        this.engine = this.sem.getEngineByName("rhino");
        if (c != null) {
          c.setScriptEngine(path, this.engine);
        }
        FileReader fr = new FileReader(scriptFile);
        this.engine.eval(fr);
        fr.close();
      }
      return (Invocable) this.engine;
    } catch (Exception e) {
      log.error("Error executing script. Script file: " + path + ".", e);
    }
    return null;
  }

  protected void resetContext(String path, MapleClient c) {
    path = "scripts/" + path;
    c.removeScriptEngine(path);
  }
}
