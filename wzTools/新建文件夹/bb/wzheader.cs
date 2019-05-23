using System;

internal class wzheader
{
	private object[] properties;

	private int singnature;

	private long datasize;

	private int headersize;

	private byte[] copyright;

	private ushort versionhash;

	private int[] versions;

	private uint[] factors;

	private int conclusion;

	private bool computed;

	internal wzreader reader
	{
		get
		{
			return this.properties[0] as wzreader;
		}
	}

	internal int size
	{
		get
		{
			return this.headersize;
		}
	}

	internal int version
	{
		get
		{
			return this.versions[this.conclusion];
		}
	}

	internal bool valid
	{
		get
		{
			if (64L <= this.reader.length)
			{
				this.singnature = this.reader.read<int>();
				this.datasize = this.reader.read<long>();
				this.headersize = this.reader.read<int>();
				this.copyright = this.reader.readbytes(44);
				this.versionhash = this.reader.read<ushort>();
                //0x 31474B50 PKG1
				if (826755920 == this.singnature && this.reader.length == this.datasize + (long)this.headersize)
				{
					this.versions = new int[5];
					this.factors = new uint[5];
					int num = 0;
					int num2 = 0;
					while (5 > num2)
					{
						uint num3 = 0u;
						string text = num.ToString();
						for (int i = 0; i < text.Length; i++)
						{
							char c = text[i];
							num3 = (num3 << 5) + (uint)c + 1u;
						}
                        if ((0xFF ^ (num3 >> 24 & 0xFF) ^ (num3 >> 16 & 0xFF) ^ (num3 >> 8 & 0xFF) ^ (num3 & 0xFF)) == (uint)this.versionhash)
						{
							this.versions[num2] = num;
							this.factors[num2] = num3;
							num2++;
						}
						num++;
					}
					return true;
				}
			}
			return false;
		}
	}

	internal wzheader(wzreader reader)
	{
		this.properties = new object[]
		{
			reader
		};
	}

	internal int compute_offset()
	{
		uint num = this.reader.read<uint>();
		uint[] array = new uint[5];
		int position = this.reader.position;
		uint num2 = (uint)(position - this.headersize - 4 ^ -1);
		if (this.computed)
		{
			num2 = num2 * this.factors[this.conclusion] - 1478246253u;
			int num3 = (int)(num2 & 31u);
			num2 = ((num2 << num3 | num2 >> 32 - num3) ^ num) + 120u;
		}
		else
		{
			int num4 = 0;
			while (5 > num4)
			{
                array[num4] = num2 * this.factors[num4] - 1478246253u;//581C 3F6D
				int num3 = (int)(array[num4] & 0x1F);
				array[num4] = ((array[num4] << num3 | array[num4] >> 32 - num3) ^ num) + 120u;
				if (this.reader.length > (long)((ulong)array[num4]))
				{
					this.reader.position = (int)array[num4];
					num3 = (int)this.reader.read<byte>();
					this.reader.position = position;
					if (115 == num3)
					{
						num2 = array[num4];
						this.conclusion = num4;
						this.computed = true;
						break;
					}
				}
				num4++;
			}
		}
		return (int)num2;
	}
}
