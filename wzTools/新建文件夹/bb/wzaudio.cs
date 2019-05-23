using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

public class wzaudio
{
	private static readonly int[,,] bitrates = new int[,,]
	{
		{
			{
				0,
				32,
				64,
				96,
				128,
				160,
				192,
				224,
				256,
				288,
				320,
				352,
				384,
				416,
				448,
				0
			},
			{
				0,
				32,
				48,
				56,
				64,
				80,
				96,
				112,
				128,
				160,
				192,
				224,
				256,
				320,
				384,
				0
			},
			{
				0,
				32,
				40,
				48,
				56,
				64,
				80,
				96,
				112,
				128,
				160,
				192,
				224,
				256,
				320,
				0
			}
		},
		{
			{
				0,
				32,
				48,
				56,
				64,
				80,
				96,
				112,
				128,
				144,
				160,
				176,
				192,
				224,
				256,
				0
			},
			{
				0,
				8,
				16,
				24,
				32,
				40,
				48,
				56,
				64,
				80,
				96,
				112,
				128,
				144,
				160,
				0
			},
			{
				0,
				8,
				16,
				24,
				32,
				40,
				48,
				56,
				64,
				80,
				96,
				112,
				128,
				144,
				160,
				0
			}
		}
	};

	private static readonly int[,] frequencies = new int[,]
	{
		{
			11025,
			12000,
			8000,
			0
		},
		{
			0,
			0,
			0,
			0
		},
		{
			22050,
			24000,
			16000,
			0
		},
		{
			44100,
			48000,
			32000,
			0
		}
	};

	private static readonly int[,] samples_per_frames = new int[,]
	{
		{
			384,
			1152,
			1152
		},
		{
			384,
			1152,
			576
		}
	};

	private static readonly int[,] coefficients = new int[,]
	{
		{
			12,
			144,
			144
		},
		{
			12,
			144,
			72
		}
	};

	private static readonly int[] slots = new int[]
	{
		4,
		1,
		1
	};

	private object[] properties;

	public int size
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
			return (int)this.properties[3];
		}
	}

	private int header
	{
		get
		{
			return (int)this.properties[4];
		}
	}

	private wzreader reader
	{
		get
		{
			return this.properties[5] as wzreader;
		}
	}

	private byte[] wave_header
	{
		get
		{
			this.reader.position = this.offset - this.header;
			if (1 == this.reader.read<short>())
			{
				this.reader.position = this.offset - this.header;
				return this.reader.readbytes(16);
			}
			if (!this.probe_region('k') && !this.probe_region('g'))
			{
				this.probe_region('x');
			}
			this.reader.position = this.offset - this.header;
			return this.reader.decrypt_bytes(this.reader.readbytes(16));
		}
	}

	public byte[] data
	{
		get
		{
			this.reader.position = this.offset;
			return this.reader.readbytes(this.size);
		}
	}

	public string content
	{
		get
		{
			if (18 != this.header)
			{
				int num = 0;
				int num2 = 0;
				byte[] array;
				if (128 < this.size)
				{
					this.reader.position = this.offset + this.size - 128;
					array = this.reader.readbytes(3);
					if (84 == array[0] && 65 == array[1] && 71 == array[2])
					{
						num = 128;
					}
				}
				this.reader.position = this.offset;
				array = this.reader.readbytes(4);
				if (73 == array[0] && 68 == array[1] && 51 == array[2])
				{
					this.reader.position = this.reader.position + 2;
					array = this.reader.readbytes(4);
					num2 = 10 + (((int)(array[0] & 127) << 21) + ((int)(array[1] & 127) << 14) + ((int)(array[2] & 127) << 7) + (int)(array[3] & 127));
					this.reader.position = this.offset + num2;
					array = this.reader.readbytes(4);
				}
				if (255 == array[0] && 224 == (array[1] & 224))
				{
					if (240 != (array[2] & 240))
					{
						int num3 = array[1] >> 3 & 3;
						if (1 != num3)
						{
							int num4 = 3 - (array[1] >> 1 & 3);
							if (3 != num4)
							{
								byte arg_136_0 = array[1];
								int num5 = array[2] >> 4 & 15;
								if (num5 != 0)
								{
									num5 = wzaudio.bitrates[(3 == num3) ? 0 : 1, num4, num5];
									int num6 = array[2] >> 2 & 3;
									if (3 != num6)
									{
										num6 = wzaudio.frequencies[num3, num6];
										int num7 = array[2] >> 1 & 1;
										int arg_1A9_0 = wzaudio.coefficients[(3 == num3) ? 0 : 1, num4] * num5 * 1000 / num6;
										int arg_1B2_0 = wzaudio.slots[num4];
										int num8 = (int)((double)((this.size - num - num2) / num5) * 8.0);
										return string.Format("{0:d2}:{1:d2}.{2,-4:d} {3,3:d}kbps {4:g}khz", new object[]
										{
											num8 / 60000,
											num8 / 1000 % 60,
											num8 % 1000,
											num5,
											(double)num6 / 1000.0
										});
									}
								}
							}
						}
					}
				}
				return "Unknow format.";
			}
			byte[] wave_header = this.wave_header;
			double num9 = (double)BitConverter.ToInt32(wave_header, 4) / 1000.0;
			int num10 = (int)BitConverter.ToInt16(wave_header, 14);
			int num11 = (int)((double)(this.size / num10) * 8.0 / num9);
			return string.Format("{0:d2}:{1:d2}.{2,-4:d} {3,3:d}kbps {4:g}khz | PCM", new object[]
			{
				num11 / 60000,
				num11 / 1000 % 60,
				num11 % 1000,
				(int)(num9 * (double)num10),
				num9
			});
		}
	}

	public bool pcm
	{
		get
		{
			return 18 == this.header;
		}
	}

	public string location
	{
		get
		{
			return this.reader.location;
		}
	}

	public byte[] wave
	{
		get
		{
			List<byte> list = new List<byte>();
			list.AddRange(Encoding.ASCII.GetBytes("RIFF"));
			list.AddRange(BitConverter.GetBytes(this.size + 44 - 8));
			list.AddRange(Encoding.ASCII.GetBytes("WAVE"));
			list.AddRange(Encoding.ASCII.GetBytes("fmt "));
			list.AddRange(BitConverter.GetBytes(16));
			list.AddRange(this.wave_header);
			list.AddRange(Encoding.ASCII.GetBytes("data"));
			list.AddRange(BitConverter.GetBytes(this.size));
			list.AddRange(this.data);
			return list.ToArray();
		}
	}

	internal wzaudio(int unknow, int size, int unknow1, int offset, int header, wzreader reader)
	{
		this.properties = new object[]
		{
			unknow,
			size,
			unknow1,
			offset,
			header,
			reader
		};
	}

	private bool probe_region(char region)
	{
		this.reader.position = this.offset - this.header;
		this.reader.region = region;
		byte[] array = this.reader.decrypt_bytes(this.reader.readbytes(this.header));
		return 1 == array[this.header - 18] && 0 == array[this.header - 17];
	}

	public bool save(string location)
	{
		File.WriteAllBytes(location + (this.pcm ? ".wav" : ".mp3"), this.pcm ? this.wave : this.data);
		return true;
	}

	private void write_signature(string signture, Stream stream)
	{
		stream.Write(Encoding.ASCII.GetBytes(signture), 0, signture.Length);
	}

	private void write_int(int value, Stream stream)
	{
		stream.Write(BitConverter.GetBytes(value), 0, 4);
	}
}
