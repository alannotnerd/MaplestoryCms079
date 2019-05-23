using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Windows.Forms;

internal static class laboratory_language
{
	private static List<string> languages;

	private static Dictionary<string, string> entries;

	internal static string[] native_name_of_languages
	{
		get
		{
			List<string> list = new List<string>();
			foreach (string current in laboratory_language.languages)
			{
				list.Add(new CultureInfo(current).NativeName);
			}
			return list.ToArray();
		}
	}

	static laboratory_language()
	{
		CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.AllCultures);
		laboratory_language.languages = new List<string>();
		string[] files = Directory.GetFiles(Application.StartupPath + "\\assembly\\languages");
		for (int i = 0; i < files.Length; i++)
		{
			string text = files[i];
			string[] array = Path.GetFileName(text.ToLower()).Split(new char[]
			{
				'.'
			});
			if (3 == array.Length && "laboratory" == array[0] && laboratory_language.invalid_ietf_language_tag(array[1].ToLower(), cultures) && "language" == array[2])
			{
				laboratory_language.languages.Add(array[1]);
			}
		}
	}

	internal static int index_of_language(string language)
	{
		return laboratory_language.languages.IndexOf(language.ToLower());
	}

	internal static string name_of_language(int index)
	{
		return laboratory_language.languages[index];
	}

	private static bool invalid_ietf_language_tag(string ietf, CultureInfo[] infos)
	{
		for (int i = 0; i < infos.Length; i++)
		{
			CultureInfo cultureInfo = infos[i];
			if (ietf == cultureInfo.IetfLanguageTag.ToLower())
			{
				return true;
			}
		}
		return false;
	}

	internal static void switch_language(string ietf)
	{
		string path = Application.StartupPath + "\\assembly\\languages\\laboratory." + ietf + ".language";
		laboratory_language.entries = new Dictionary<string, string>();
		if (File.Exists(path))
		{
			string[] array = File.ReadAllLines(path);
			for (int i = 0; i < array.Length; i++)
			{
				string text = array[i];
				string[] array2 = text.Split(new char[]
				{
					'='
				});
				if (2 == array2.Length)
				{
					laboratory_language.entries.Add(array2[0].Trim(), array2[1].Trim());
				}
			}
		}
	}

	internal static string query_entry(string identity)
	{
		if (!laboratory_language.entries.ContainsKey(identity.ToLower()))
		{
			return "";
		}
		return laboratory_language.entries[identity];
	}
}
