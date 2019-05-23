using System;
using System.Collections.Generic;

public class wzproperty : Dictionary<string, wzproperty>
{
	private static readonly List<string> types = new List<string>
	{
		"Shape2D#Convex2D",
		"Shape2D#Vector2D",
		"Sound_DX8",
		"Property",
		"Canvas",
		"UOL"
	};

	private wzreader reader;

	private object[] properties;

	public string identity
	{
		get
		{
			return this.properties[0] as string;
		}
	}

	public int type
	{
		get
		{
			return (int)this.properties[1];
		}
	}

	public int offset
	{
		get
		{
			return (int)this.properties[2];
		}
	}

	public object data
	{
		get
		{
			return this.properties[3];
		}
		set
		{
			this.properties[3] = value;
		}
	}

	public wzproperty proprietor
	{
		get
		{
			return this.properties[4] as wzproperty;
		}
	}

	public string content
	{
		get
		{
			if (this.type == 0)
			{
				return null;
			}
			if (1 == this.type)
			{
				return (this.data as wzvector).content;
			}
			if (2 == this.type)
			{
				return (this.data as wzaudio).content;
			}
			if (3 == this.type)
			{
				return null;
			}
			if (4 == this.type)
			{
				return (this.data as wzcanvas).content;
			}
			if (5 == this.type)
			{
				return (this.data as wzuol).link;
			}
			if (14 == this.type)
			{
				return this.trim_content(string.Format("{0}", this.data));
			}
			return string.Format("{0}", this.data);
		}
	}

	public string absolute
	{
		get
		{
			if (this.proprietor != null && 0 <= this.proprietor.type)
			{
				return this.proprietor.absolute + "/" + this.identity;
			}
			return this.identity;
		}
	}

	public new wzproperty this[string identity]
	{
		get
		{
			wzproperty result;
			if (!base.TryGetValue(identity, out result))
			{
				return null;
			}
			return result;
		}
	}

	internal wzproperty(string identity, int type, int offset, object data, wzproperty proprietor, wzreader reader)
	{
		this.reader = reader;
		this.properties = new object[]
		{
			identity,
			type,
			offset,
			data,
			proprietor
		};
	}

	private string trim_content(string content)
	{
		if (20 < content.Length)
		{
			return string.Concat(new object[]
			{
				content.Substring(0, 20),
				"...(",
				content.Length,
				")"
			});
		}
		return content;
	}

	internal static int index_of_type(string type)
	{
		return wzproperty.types.IndexOf(type);
	}
}
