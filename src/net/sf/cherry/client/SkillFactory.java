package net.sf.cherry.client;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import constants.ServerConfig;
import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataProvider;
import net.sf.cherry.provider.MapleDataProviderFactory;
import net.sf.cherry.provider.MapleDataTool;
import net.sf.cherry.tools.StringUtil;

public class SkillFactory {
	private static Map<Integer, ISkill> skills = new HashMap<Integer, ISkill>();
	private static MapleDataProvider datasource = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/Skill.wz"));
	private static MapleData stringData = MapleDataProviderFactory.getDataProvider(new File(ServerConfig.WZPath + "/String.wz")).getData("Skill.img");

	public static ISkill getSkill(int id) {
		ISkill ret = (ISkill) skills.get(Integer.valueOf(id));
		if (ret != null) {
			return ret;
		}
		synchronized (skills) {
			ret = (ISkill) skills.get(Integer.valueOf(id));
			if (ret == null) {
				int job = id / 10000;
				MapleData skillroot = datasource.getData(StringUtil.getLeftPaddedStr(String.valueOf(job), '0', 3) + ".img");
				MapleData skillData = skillroot.getChildByPath("skill/" + StringUtil.getLeftPaddedStr(String.valueOf(id), '0', 7));
				if (skillData != null) {
					ret = Skill.loadFromData(id, skillData);
				}
				skills.put(Integer.valueOf(id), ret);
			}
			return ret;
		}
	}

	public static String getSkillName(int id) {
		String strId = Integer.toString(id);
		strId = StringUtil.getLeftPaddedStr(strId, '0', 7);
		MapleData skillroot = stringData.getChildByPath(strId);
		if (skillroot != null) {
			return MapleDataTool.getString(skillroot.getChildByPath("name"), "");
		}
		return null;
	}
}