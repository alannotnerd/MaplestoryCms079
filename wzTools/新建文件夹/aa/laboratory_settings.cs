using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

internal class laboratory_settings
{
	private object[] properties;

	internal bool explorer_style
	{
		get
		{
			return (bool)this.properties[0];
		}
	}

	internal bool top_most
	{
		get
		{
			return (bool)this.properties[1];
		}
	}

	internal string language
	{
		get
		{
			return this.properties[2] as string;
		}
		set
		{
			this.properties[2] = value;
		}
	}

	internal bool generator
	{
		get
		{
			return (bool)this.properties[3];
		}
	}

	internal string archive_save_location
	{
		get
		{
			return this.properties[4] as string;
		}
	}

	internal bool archive_save_image
	{
		get
		{
			return (bool)this.properties[5];
		}
	}

	internal bool archive_save_audio
	{
		get
		{
			return (bool)this.properties[6];
		}
	}

	internal bool archive_save_etc
	{
		get
		{
			return (bool)this.properties[7];
		}
	}

	internal bool archive_tree_sort
	{
		get
		{
			return (bool)this.properties[8];
		}
	}

	internal bool archive_list_image
	{
		get
		{
			return (bool)this.properties[9];
		}
	}

	internal bool archive_list_audio
	{
		get
		{
			return (bool)this.properties[10];
		}
	}

	internal bool archive_list_etc
	{
		get
		{
			return (bool)this.properties[11];
		}
	}

	internal Color archive_canva_backcolor
	{
		get
		{
			return Color.FromArgb((int)this.properties[12]);
		}
	}

	internal string animation_save_location
	{
		get
		{
			return this.properties[13] as string;
		}
	}

	internal bool animation_save_frames
	{
		get
		{
			return (bool)this.properties[14];
		}
	}

	internal int animation_save_maxcolor
	{
		get
		{
			return (int)this.properties[15];
		}
	}

	internal Color animation_save_backcolor
	{
		get
		{
			return Color.FromArgb((int)this.properties[16]);
		}
	}

	internal bool animation_tree_sort
	{
		get
		{
			return (bool)this.properties[17];
		}
	}

	internal bool animation_list_sort
	{
		get
		{
			return (bool)this.properties[18];
		}
	}

	internal Color animation_canva_backcolor
	{
		get
		{
			return Color.FromArgb((int)this.properties[19]);
		}
	}

	internal laboratory_settings()
	{
		string[] entries = laboratory_settings.load_entries();
		this.properties = new object[]
		{
			laboratory_settings.query_entry(entries, "laboratory_explorer_style", false),
			laboratory_settings.query_entry(entries, "laboratory_top_most", false),
			laboratory_settings.query_entry(entries, "laboratory_language", ""),
			laboratory_settings.query_entry(entries, "laboratory_generator", true),
			laboratory_settings.query_entry(entries, "archive_save_location", Application.StartupPath + "\\resources"),
			laboratory_settings.query_entry(entries, "archive_save_image", true),
			laboratory_settings.query_entry(entries, "archive_save_audio", true),
			laboratory_settings.query_entry(entries, "archive_save_etc", true),
			laboratory_settings.query_entry(entries, "archive_tree_sort", true),
			laboratory_settings.query_entry(entries, "archive_list_image", true),
			laboratory_settings.query_entry(entries, "archive_list_audio", true),
			laboratory_settings.query_entry(entries, "archive_list_etc", true),
			laboratory_settings.query_entry(entries, "archive_canva_backcolor", 16777088),
			laboratory_settings.query_entry(entries, "animation_save_location", Application.StartupPath + "\\animations"),
			laboratory_settings.query_entry(entries, "animation_save_frames", false),
			laboratory_settings.query_entry(entries, "animation_save_maxcolor", 256),
			laboratory_settings.query_entry(entries, "animation_save_backcolor", 0),
			laboratory_settings.query_entry(entries, "animation_tree_sort", true),
			laboratory_settings.query_entry(entries, "animation_list_sort", true),
			laboratory_settings.query_entry(entries, "animation_canva_backcolor", 16777088)
		};
	}

	internal laboratory_settings(bool explorer_style, bool top_most, string language, bool generator, string archive_save_location, bool archive_save_image, bool archive_save_audio, bool archive_save_etc, bool archive_tree_sort, bool archive_list_image, bool archive_list_audio, bool archive_list_etc, int archive_canva_backcolor, string animation_save_location, bool animation_save_frames, int animation_save_maxcolor, int animation_save_backcolor, bool animation_tree_sort, bool animation_list_sort, int animation_canva_backcolor)
	{
		this.properties = new object[]
		{
			explorer_style,
			top_most,
			language,
			generator,
			archive_save_location,
			archive_save_image,
			archive_save_audio,
			archive_save_etc,
			archive_tree_sort,
			archive_list_image,
			archive_list_audio,
			archive_list_etc,
			archive_canva_backcolor,
			animation_save_location,
			animation_save_frames,
			animation_save_maxcolor,
			animation_save_backcolor,
			animation_tree_sort,
			animation_list_sort,
			animation_canva_backcolor
		};
	}

	internal void save_settings()
	{
		string text = laboratory_settings.query_entry(laboratory_settings.load_entries(), "angelic_burster", "") as string;
		laboratory_settings.save_entries(string.Concat(new object[]
		{
			"laboratory_explorer_style = ",
			this.properties[0],
			"\r\nlaboratory_top_most = ",
			this.properties[1],
			"\r\nlaboratory_language = ",
			this.properties[2],
			"\r\nlaboratory_generator = ",
			this.properties[3],
			"\r\n\r\narchive_save_location = ",
			this.properties[4],
			"\r\narchive_save_image = ",
			this.properties[5],
			"\r\narchive_save_audio = ",
			this.properties[6],
			"\r\narchive_save_etc = ",
			this.properties[7],
			"\r\narchive_tree_sort = ",
			this.properties[8],
			"\r\narchive_list_image = ",
			this.properties[9],
			"\r\narchive_list_audio = ",
			this.properties[10],
			"\r\narchive_list_etc = ",
			this.properties[11],
			"\r\narchive_canva_backcolor = ",
			this.properties[12],
			"\r\n\r\nanimation_save_location = ",
			this.properties[13],
			"\r\nanimation_save_frames = ",
			this.properties[14],
			"\r\nanimation_save_maxcolor = ",
			this.properties[15],
			"\r\nanimation_save_backcolor = ",
			this.properties[16],
			"\r\nanimation_tree_sort = ",
			this.properties[17],
			"\r\nanimation_list_sort = ",
			this.properties[18],
			"\r\nanimation_canva_backcolor = ",
			this.properties[19],
			"\r\n\r\n",
			(0 < text.Length) ? "angelic_burster = " : "",
			text,
			"\r\n"
		}));
	}

	private static int index_of_entry(string[] entries, string identity)
	{
		int num = 0;
		while (entries.Length > num)
		{
			string[] array = entries[num].ToLower().Split(new char[]
			{
				'='
			});
			if (2 == array.Length && identity.ToLower() == array[0].Trim().ToLower())
			{
				return num;
			}
			num++;
		}
		return -1;
	}

	private static void save_entries(string entries)
	{
		File.WriteAllText(Application.StartupPath + "\\assembly\\laboratory.settings", entries.ToLower());
	}

	internal static void append_angelic(string angelic)
	{
		string text = "";
		string[] array = laboratory_settings.load_entries();
		int num = laboratory_settings.index_of_entry(array, "angelic_burster");
		angelic = "angelic_burster = " + angelic;
		if (0 <= num)
		{
			array[num] = angelic;
		}
		string[] array2 = array;
		for (int i = 0; i < array2.Length; i++)
		{
			string str = array2[i];
			text = text + str + "\r\n";
		}
		if (0 > num)
		{
			text = text + (text.EndsWith("\r\n\r\n") ? "" : "\r\n") + angelic + "\r\n";
		}
		laboratory_settings.save_entries(text);
	}

	internal static string[] load_entries()
	{
		string path = Application.StartupPath + "\\assembly\\laboratory.settings";
		if (!File.Exists(path))
		{
			return new List<string>().ToArray();
		}
		return File.ReadAllLines(path);
	}

	internal static object query_entry(string[] entries, string identity, object value)
	{
		for (int i = 0; i < entries.Length; i++)
		{
			string text = entries[i];
			string[] array = text.ToLower().Split(new char[]
			{
				'='
			});
			if (2 == array.Length && identity.ToLower() == array[0].Trim().ToLower())
			{
				return Convert.ChangeType(array[1].Trim(), value.GetType());
			}
		}
		return value;
	}
}
