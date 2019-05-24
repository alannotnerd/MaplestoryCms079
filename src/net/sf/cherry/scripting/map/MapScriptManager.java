package net.sf.cherry.scripting.map;

import net.sf.cherry.client.MapleClient;

import javax.script.*;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MapScriptManager {
  private static MapScriptManager instance = new MapScriptManager();
  private Map<String, MapScript> scripts = new HashMap();
  private ScriptEngineFactory sef;

  private MapScriptManager() {
    ScriptEngineManager sem = new ScriptEngineManager();
    this.sef = sem.getEngineByName("rhino").getFactory();
  }

  public static MapScriptManager getInstance() {
    return instance;
  }

  public void getMapScript(MapleClient c, String scriptName, boolean firstUser) {
    if (this.scripts.containsKey(scriptName)) {
      this.scripts.get(scriptName).start(new MapScriptMethods(c));
      return;
    }
    String type;
    if (firstUser)
      type = "onFirstUserEnter";
    else {
      type = "onUserEnter";
    }

    File scriptFile = new File("scripts/map/" + type + "/" + scriptName + ".js");
    if (!scriptFile.exists()) {
      return;
    }
    FileReader fr = null;
    ScriptEngine portal = this.sef.getScriptEngine();
    try {
      fr = new FileReader(scriptFile);
      CompiledScript compiled = ((Compilable) portal).compile(fr);
      compiled.eval();
    } catch (ScriptException e) {
      System.err.println("THROW" + e);
    } catch (IOException e) {
      System.err.println("THROW" + e);
    } finally {
      if (fr != null)
        try {
          fr.close();
        } catch (IOException e) {
          System.err.println("ERROR CLOSING" + e);
        }
    }
    MapScript script = ((Invocable) portal).getInterface(MapScript.class);
    this.scripts.put(scriptName, script);
    script.start(new MapScriptMethods(c));
  }

  public void clearScripts() {
    this.scripts.clear();
  }
}




