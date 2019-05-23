using System;
using System.IO;

internal class wzreader
{
	private object[] properties;

	private Stream stream;

	private BinaryReader reader;

	private wzdecryptor decryptor;

	internal string location
	{
		get
		{
			return this.properties[0] as string;
		}
	}

	internal long length
	{
		get
		{
			return this.stream.Length;
		}
	}

	internal int position
	{
		get
		{
			return (int)this.stream.Position;
		}
		set
		{
			this.stream.Position = (long)value;
		}
	}

	internal char region
	{
		set
		{
			this.decryptor.region = value;
		}
	}

	internal wzreader(string locatioin)
	{
		this.properties = new object[]
		{
			locatioin
		};
		this.stream = File.OpenRead(locatioin);
		this.reader = new BinaryReader(this.stream);
		this.decryptor = new wzdecryptor();
	}

	internal void dispose()
	{
		this.reader.Close();
		this.stream.Close();
	}

	internal string transit_string(int offset)
	{
		byte b = this.read<byte>();
		switch (b)
		{
		case 0:
			break;
		case 1:
			goto IL_44;
		case 2:
		case 3:
			goto IL_53;
		case 4:
			this.position += 8;
			goto IL_53;
		default:
			if (b == 27)
			{
				goto IL_44;
			}
			if (b != 115)
			{
				goto IL_53;
			}
			break;
		}
		return this.decrypt_string();
		IL_44:
		return this.decrypt_string(offset + this.read<int>());
		IL_53:
		return "";
	}

	internal string decrypt_string(int offset)
	{
		int position = this.position;
		this.position = offset;
		string result = this.decrypt_string();
		this.position = position;
		return result;
	}

	internal string decrypt_string()
	{
		int num = (int)this.read<sbyte>();
		if (0 < num)
		{
			return this.decryptor.decrypt_string16(this.readbytes(((127 == num) ? this.read<int>() : num) * 2));
		}
		if (0 > num)
		{
			return this.decryptor.decrypt_string(this.readbytes((-128 == num) ? this.read<int>() : (-num)));
		}
		return "";
	}

	internal byte[] decrypt_bytes(byte[] bytes)
	{
		return this.decryptor.decrypt_bytes(bytes);
	}

	internal T pack<T>()
	{
		sbyte b = this.read<sbyte>();
		if (-128 == b)
		{
			return this.read<T>();
		}
		return (T)((object)Convert.ChangeType(b, typeof(T)));
	}

	internal T read<T>()
	{
		if (typeof(sbyte) == typeof(T))
		{
			return (T)((object)this.reader.ReadSByte());
		}
		if (typeof(byte) == typeof(T))
		{
			return (T)((object)this.reader.ReadByte());
		}
		if (typeof(short) == typeof(T))
		{
			return (T)((object)this.reader.ReadInt16());
		}
		if (typeof(ushort) == typeof(T))
		{
			return (T)((object)this.reader.ReadUInt16());
		}
		if (typeof(int) == typeof(T))
		{
			return (T)((object)this.reader.ReadInt32());
		}
		if (typeof(uint) == typeof(T))
		{
			return (T)((object)this.reader.ReadUInt32());
		}
		if (typeof(long) == typeof(T))
		{
			return (T)((object)this.reader.ReadInt64());
		}
		if (typeof(ulong) == typeof(T))
		{
			return (T)((object)this.reader.ReadUInt64());
		}
		if (typeof(float) == typeof(T))
		{
			return (T)((object)this.reader.ReadSingle());
		}
		if (typeof(double) == typeof(T))
		{
			return (T)((object)this.reader.ReadDouble());
		}
		return default(T);
	}

	internal byte[] readbytes(int count)
	{
		return this.reader.ReadBytes(count);
	}
}
