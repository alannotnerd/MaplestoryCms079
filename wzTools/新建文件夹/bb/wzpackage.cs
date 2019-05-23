using System;
using System.Collections.Generic;

public class wzpackage : Dictionary<string, wzpackage>
{
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

	public int size
	{
		get
		{
			return (int)this.properties[2];
		}
	}

	public int sum32
	{
		get
		{
			return (int)this.properties[3];
		}
	}

	public int offset
	{
		get
		{
			return (int)this.properties[4];
		}
	}

	public wzpackage proprietor
	{
		get
		{
			return this.properties[5] as wzpackage;
		}
		set
		{
			this.properties[5] = value;
		}
	}

	private wzreader reader
	{
		get
		{
			return this.properties[6] as wzreader;
		}
	}

	public bool intact
	{
		get
		{
			int num = 0;
			this.reader.position = this.offset;
			byte[] array = this.reader.readbytes(this.size);
			for (int i = 0; i < array.Length; i++)
			{
				byte b = array[i];
				num += (int)b;
			}
			return this.sum32 == num;
		}
	}

	public wzproperty root
	{
		get
		{
			if ((2 == this.type || 4 == this.type) && this.probe_region())
			{
				wzproperty wzproperty = new wzproperty(this.identity, -1, 0, null, null, null);
				this.reader.position = this.offset;
				if (this.expand_package("", this.offset, 0, wzproperty))
				{
					return wzproperty;
				}
			}
			return null;
		}
	}

	public string absolute
	{
		get
		{
			if (this.proprietor != null && this.proprietor.type != 0)
			{
				return this.proprietor.absolute + "/" + this.identity;
			}
			return this.identity;
		}
	}

	public new wzpackage this[string identity]
	{
		get
		{
			wzpackage result;
			if (!base.TryGetValue(identity, out result))
			{
				return null;
			}
			return result;
		}
	}

	internal wzpackage(string identity, int type, int size, int sum32, int offset, wzpackage proprietor, wzreader reader)
	{
		this.properties = new object[]
		{
			identity,
			type,
			size,
			sum32,
			offset,
			proprietor,
			reader
		};
	}

	private bool probe_region()
	{
		return this.probe_identity('k') || this.probe_identity('g') || this.probe_identity('x');
	}

	private bool probe_identity(char region)
	{
		this.reader.position = this.offset;
		this.reader.region = region;
		return 0 <= wzproperty.index_of_type(this.reader.transit_string(this.offset));
	}

	private bool expand_package(string identity, int offset, int eob, wzproperty proprietor)
	{
		string type = this.reader.transit_string(offset);
		int type2 = wzproperty.index_of_type(type);
		wzproperty wzproperty = new wzproperty(identity, type2, this.reader.position, null, proprietor, this.reader);
		proprietor.Add(identity, wzproperty);
		switch (type2)
		{
		case 0:
			return this.expand_shape2d_Convex2D(offset, eob, wzproperty);
		case 1:
			return this.expand_shape2d_vector2d(wzproperty);
		case 2:
			return this.expand_sound_dx8(eob, wzproperty);
		case 3:
			return this.expand_property(offset, wzproperty);
		case 4:
			return this.expand_canvas(offset, wzproperty);
		case 5:
			return this.expand_uol(offset, wzproperty);
		default:
			return false;
		}
	}

	private bool expand_shape2d_Convex2D(int offset, int eob, wzproperty property)
	{
		int i = this.reader.pack<int>();
		int num = 0;
		while (i > num)
		{
			if (!this.expand_package(num.ToString(), offset, eob, property))
			{
				return false;
			}
			num++;
		}
		return true;
	}

	private bool expand_shape2d_vector2d(wzproperty property)
	{
		property.data = new wzvector(this.reader.pack<int>(), this.reader.pack<int>());
		return true;
	}

	private bool expand_sound_dx8(int eob, wzproperty property)
	{
		int unknow = (int)this.reader.read<byte>();
		int num = this.reader.pack<int>();
		int unknow2 = this.reader.pack<int>();
		this.reader.position = this.reader.position + 51;
		property.data = new wzaudio(unknow, num, unknow2, eob - num, (int)this.reader.read<byte>(), this.reader);
		this.reader.position = eob;
		return true;
	}

	private bool expand_property(int offset, wzproperty property)
	{
		int num = (int)this.reader.read<short>();
		int i = this.reader.pack<int>();
		int num2 = 0;
		while (i > num2)
		{
			if (!this.expand_block(offset, property))
			{
				return false;
			}
			num2++;
		}
		property.data = num;
		return true;
	}

	private bool expand_canvas(int offset, wzproperty property)
	{
		int unknow = (int)this.reader.read<byte>();
		if (1 == this.reader.read<byte>() && !this.expand_property(offset, property))
		{
			return false;
		}
		wzcanvas wzcanvas = new wzcanvas(unknow, this.reader.pack<int>(), this.reader.pack<int>(), 
            this.reader.pack<int>() + (int)this.reader.read<byte>(), this.reader.read<int>(), 
            this.reader.read<int>(), this.reader.position, this.reader);
		property.data = wzcanvas;
		this.reader.position = this.reader.position + wzcanvas.size;
		return true;
	}

	private bool expand_uol(int offset, wzproperty property)
	{
		property.data = new wzuol((uint)this.reader.read<byte>(), this.reader.transit_string(offset), property);
		return true;
	}

	private bool expand_block(int offset, wzproperty proprietor)
	{
		string text = this.reader.transit_string(offset);
		int num = (int)this.reader.read<byte>();
		int position = this.reader.position;
		int num2 = num;
		object data;
		switch (num2)
		{
		case 0:
			data = null;
			goto IL_EC;
		case 1:
		case 6:
		case 7:
		case 10:
			return false;
		case 2:
		case 11:
			data = this.reader.read<short>();
			goto IL_EC;
		case 3:
			break;
		case 4:
			data = this.reader.pack<float>();
			goto IL_EC;
		case 5:
			data = this.reader.read<double>();
			goto IL_EC;
		case 8:
			data = this.reader.transit_string(offset);
			goto IL_EC;
		case 9:
			return this.expand_package(text, offset, this.reader.read<int>() + this.reader.position, proprietor);
		default:
			if (num2 != 20)
			{
				return false;
			}
			break;
		}
		data = this.reader.pack<int>();
		IL_EC:
		proprietor.Add(text, new wzproperty(text, num + 6, position, data, proprietor, this.reader));
		return true;
	}
}
