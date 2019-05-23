using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.IO.Compression;
using System.Runtime.InteropServices;

public class wzcanvas
{
	private object[] properties;

	public int width
	{
		get
		{
			return (int)this.properties[1];
		}
	}

	public int height
	{
		get
		{
			return (int)this.properties[2];
		}
	}

	internal int format
	{
		get
		{
			return (int)this.properties[3];
		}
	}

	internal int size
	{
		get
		{
			return (int)this.properties[5];
		}
	}

	internal int offset
	{
		get
		{
			return (int)this.properties[6];
		}
	}

	private wzreader reader
	{
		get
		{
			return this.properties[7] as wzreader;
		}
	}

	internal string content
	{
		get
		{
			return this.properties[1] + "x" + this.properties[2];
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

	public Image image
	{
		get
		{
			if ((long)(this.offset + this.size) > this.reader.length)
			{
				return null;
			}
			int num = this.width * this.height;
			int format = this.format;
			switch (format)
			{
			case 1:
				break;
			case 2:
				num = 4 * num;
				goto IL_6C;
			default:
				if (format != 513)
				{
					if (format != 517)
					{
						return null;
					}
					num /= 8;
					goto IL_6C;
				}
				break;
			}
			num = 2 * num;
			IL_6C:
			this.reader.position = this.offset + 1;
			MemoryStream memoryStream;

            //ox40056
			if (40056 == this.reader.read<ushort>())
			{
				memoryStream = new MemoryStream(this.reader.readbytes(this.size - 3));
			}
			else
			{
				if (!this.probe_region('k') && !this.probe_region('g') && !this.probe_region('x'))
				{
					return null;
				}
				this.reader.position = this.offset + 1;
				memoryStream = new MemoryStream();
				while (this.offset + this.size > this.reader.position)
				{
					int count = this.reader.read<int>();
					memoryStream.Write(this.reader.decrypt_bytes(this.reader.readbytes(count)), 0, count);
				}
				memoryStream.Position = 2L;
			}
			DeflateStream deflateStream = new DeflateStream(memoryStream, CompressionMode.Decompress);
			byte[] array = new byte[num];
			deflateStream.Read(array, 0, num);
			deflateStream.Close();
			memoryStream.Close();
			return this.generate_image(array);
		}
	}

	internal wzcanvas(int unknow, int width, int height, int format, int reserved, int size, int offset, wzreader reader)
	{
		this.properties = new object[]
		{
			unknow,
			width,
			height,
			format,
			reserved,
			size,
			offset,
			reader
		};
	}

	private bool probe_region(char region)
	{
		this.reader.position = this.offset + 5;
		this.reader.region = region;
		return 40056 == BitConverter.ToUInt16(this.reader.decrypt_bytes(this.reader.readbytes(2)), 0);
	}

	private unsafe Image generate_image(byte[] pixels)
	{
		Bitmap bitmap = new Bitmap(this.width, 
            this.height, 
            (517 == this.format) ? PixelFormat.Format1bppIndexed : ((513 == this.format) ? PixelFormat.Format16bppRgb565 : PixelFormat.Format32bppArgb));
		BitmapData bitmapData = bitmap.LockBits(new Rectangle(Point.Empty, bitmap.Size), ImageLockMode.WriteOnly, bitmap.PixelFormat);
		byte* ptr = (byte*)((void*)bitmapData.Scan0);
		int format = this.format;
		switch (format)
		{
		case 1:
		{
			int num = 0;
			int i = 2 * this.width * this.height;
			while (i > num)
			{


                                        //  0x2E
				ptr[0] = (byte)((int)(pixels[num] & 0x0F) + (pixels[num] << 4));
                ptr[1] = (byte)((int)(pixels[num] & 0xF0) + (pixels[num++] >> 4));
                ptr[2] = (byte)((int)(pixels[num] & 0x0F) + (pixels[num] << 4));
                ptr[3] = (byte)((int)(pixels[num] & 0xF0) + (pixels[num++] >> 4));
				ptr += 4;
			}
			break;
		}
		case 2:
			Marshal.Copy(pixels, 0, bitmapData.Scan0, bitmapData.Stride * this.height);
			break;
		default:
			if (format != 513)
			{
				if (format == 517)
				{
					ColorPalette palette = bitmap.Palette;
					palette.Entries[0] = Color.FromArgb(255, 82, 134, 239);
					bitmap.Palette = palette;
				}
			}
			else
			{
				int num2 = 0;
				int num3 = 2 * this.width;
				while (this.height > num2)
				{
					Marshal.Copy(pixels, num3 * num2, new IntPtr((int)bitmapData.Scan0 + bitmapData.Stride * num2), num3);
					num2++;
				}
			}
			break;
		}
		bitmap.UnlockBits(bitmapData);
		return bitmap;
	}

	public bool save(string location)
	{
		Image image = this.image;
		image.Save(location + ".png", ImageFormat.Png);
		image.Dispose();
		return true;
	}
}
