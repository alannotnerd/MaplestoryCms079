using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

internal class gif_encoder
{
	private struct gif_encoder_structure
	{
		internal delegate void gif_encoder_destruct(IntPtr encoder_pointer);

		internal delegate void gif_encoder_append_frame(IntPtr pixels, int delay, IntPtr encoder_pointer);

		internal gif_encoder.gif_encoder_structure.gif_encoder_destruct destruct;

		internal gif_encoder.gif_encoder_structure.gif_encoder_append_frame append_frame;
	}

	private IntPtr encoder_pointer;

	private gif_encoder.gif_encoder_structure encoder
	{
		get
		{
			return (gif_encoder.gif_encoder_structure)Marshal.PtrToStructure(this.encoder_pointer, typeof(gif_encoder.gif_encoder_structure));
		}
	}

	[DllImport("libgif.dll", CharSet = CharSet.Unicode, EntryPoint = "#1")]
	private static extern IntPtr construct(string location, int width, int height, int max_color, int back_color);

	internal gif_encoder(string location, int width, int height, int max_color, Color back_color)
	{
		this.encoder_pointer = gif_encoder.construct(location, width, height, max_color, back_color.ToArgb());
	}

	internal void destruct()
	{
		this.encoder.destruct(this.encoder_pointer);
	}

	internal void append_frame(Bitmap image, int delay)
	{
		BitmapData bitmapData = image.LockBits(new Rectangle(Point.Empty, image.Size), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
		this.encoder.append_frame(bitmapData.Scan0, delay, this.encoder_pointer);
		image.UnlockBits(bitmapData);
	}
}
