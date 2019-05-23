using System;

public class wzarchive
{
	private wzreader reader;

	private wzheader header;

	internal string location
	{
		get
		{
			return this.reader.location;
		}
	}

	public int version
	{
		get
		{
			return this.header.version;
		}
	}

	public wzpackage root
	{
		get
		{
			if (this.header.valid && this.probe_region())
			{
				this.reader.position = this.header.size + 2;
				return this.expand(new wzpackage(null, 0, 0, 0, 0, null, null));
			}
			return null;
		}
	}

	public wzarchive(string location)
	{
		this.reader = new wzreader(location);
		this.header = new wzheader(this.reader);
	}

	public void dispose()
	{
		this.reader.dispose();
	}

	private bool probe_region()
	{
		return this.probe_identity('k') || this.probe_identity('g') || this.probe_identity('x');
	}

	private bool probe_identity(char region)
	{
		this.reader.position = this.header.size + 2;
		this.reader.region = region;
		return this.expand().EndsWith(".img");
	}

	private string expand()
	{
        //¶ÁÈ¡Ä¿Â¼
		int num = 0;
		int num2 = this.reader.pack<int>();
		while (0 < num2)
		{
			switch (this.reader.read<byte>())
			{
			case 1:
				this.reader.decrypt_string(this.header.size + 1 + this.reader.read<int>());
				num++;
				break;
			case 2:
				return this.reader.decrypt_string(this.header.size + 1 + this.reader.read<int>());
			case 3:
				this.reader.decrypt_string();
				num++;
				break;
			case 4:
				return this.reader.decrypt_string();
			default:
				return "";
			}
			this.reader.pack<int>();
			this.reader.pack<int>();
			this.reader.read<int>();
			num2--;
		}
		while (0 < num--)
		{
			string text = this.expand();
			if (0 < text.Length)
			{
				return text;
			}
		}
		return "";
	}

	private wzpackage expand(wzpackage proprietor)
	{
		int num = this.reader.pack<int>();
		while (0 < num)
		{
			byte type = this.reader.read<byte>();
			string text;
			switch (type)
			{
			case 1:
			case 2:
				text = this.reader.decrypt_string(this.header.size + 1 + this.reader.read<int>());
				break;
			case 3:
			case 4:
				text = this.reader.decrypt_string();
				break;
			default:
				return null;
			}
			proprietor.Add(text, new wzpackage(text, (int)type, this.reader.pack<int>(), this.reader.pack<int>(), this.header.compute_offset(), proprietor, this.reader));
			num--;
		}
		foreach (wzpackage current in proprietor.Values)
		{
			if (current.type % 2 != 0 && this.expand(current) == null)
			{
				return null;
			}
		}
		return proprietor;
	}
}
