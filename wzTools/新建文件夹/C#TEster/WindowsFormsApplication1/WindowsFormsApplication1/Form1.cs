using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private static readonly byte[] key = new byte[]
	{
		19,0,0,0,
		8,0,0,0,
		6,0,0,0,
		180,0,0,0,
		27,0,0,0,
		15,0,0,0,
		51,0,0,0,
		82,0,0,0
	};
        static byte[] AnsiChar = new byte[22]{
	0x51, 0x7B, 0x6A, 0x13, 0x33, 0xAE, 0xDA, 0xA0, 0xDA, 0x63, 0x08, 0xA0, 0xF0, 0x0F, 0x72, 0xE8, 
	0x07, 0xDE, 0xF5, 0x0E, 0x06, 0x5F
};

        private byte[] cryptok;

        private byte[] generate_sequence(byte[] factor)
        {
            Rijndael rijndael = Rijndael.Create();
            MemoryStream memoryStream = new MemoryStream();
            int num = 4 * factor.Length;
            byte[] array = new byte[num];
            rijndael.Key = key;
            rijndael.Mode = CipherMode.ECB;
            CryptoStream cryptoStream = new CryptoStream(memoryStream, rijndael.CreateEncryptor(), CryptoStreamMode.Write);
            int num2 = 0;
            while (4 > num2)
            {
                factor.CopyTo(array, factor.Length * num2);
                num2++;
            }
            int num3 = 0;
            while (4096 > num3)
            {
                cryptoStream.Write(array, 0, num);
                memoryStream.Seek(-num, SeekOrigin.Current);
                memoryStream.Read(array, 0, num);
                num3++;
            }
            memoryStream.SetLength(65535L);
            array = memoryStream.ToArray();
            rijndael.Clear();
            cryptoStream.Clear();
            memoryStream.Close();
            return array;
        }

        internal string decrypt_string16(byte[] bytes)
        {
            StringBuilder stringBuilder = new StringBuilder();
            ushort num = 43690;
            int num2 = 0;
            while (bytes.Length > num2)
            {
                stringBuilder.Append((char)((((int)(bytes[num2 + 1] ^ this.cryptok[num2 + 1]) ^ num >> 8) << 8) + (int)((ushort)(bytes[num2] ^ this.cryptok[num2]) ^ (num & 255))));
			
                num2 += 2;
                num += 1;
            }
            return stringBuilder.ToString();
        }
        private static readonly byte[] factork = new byte[]
	{
		185,
		125,
		99,
		233
	};
        private void button1_Click(object sender, EventArgs e)
        {
            this.cryptok = this.generate_sequence(factork);

            MessageBox.Show(decrypt_string16(AnsiChar)); ;
        }

        int width = 32;
        int height = 28;
        int format = 1;
        private unsafe Image generate_image(byte[] pixels)
        {


            Bitmap bitmap = new Bitmap(this.width, this.height, (517 == this.format) ? PixelFormat.Format1bppIndexed : ((513 == this.format) ? PixelFormat.Format16bppRgb565 : PixelFormat.Format32bppArgb));
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
                            *ptr = (byte)((int)(pixels[num] & 15) + ((int)pixels[num] << 4));
                            ptr[1] = (byte)((int)(pixels[num] & 240) + (pixels[num++] >> 4));
                            ptr[2] = (byte)((int)(pixels[num] & 15) + ((int)pixels[num] << 4));
                            ptr[3] = (byte)((int)(pixels[num] & 240) + (pixels[num++] >> 4));
                            ptr += 4;
                        }
                        break;
                    }
                case 2:
                    //Marshal.Copy(pixels, 0, bitmapData.Scan0, bitmapData.Stride * this.height);
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
                            //Marshal.Copy(pixels, num3 * num2, new IntPtr((int)bitmapData.Scan0 + bitmapData.Stride * num2), num3);
                            num2++;
                        }
                    }
                    break;
            }
            bitmap.UnlockBits(bitmapData);
            return bitmap;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            int num = 2 * this.width * this.height;

            FileStream fs = File.OpenRead("d:\\1.bin");

            MemoryStream ms =new MemoryStream();
            byte[] bytes = new byte[fs.Length];
            fs.Read(bytes, 0, (int)fs.Length);
            ms.Write(bytes, 0, (int)fs.Length);
            ms.Seek(0, SeekOrigin.Begin);


            DeflateStream deflateStream = new DeflateStream(ms, CompressionMode.Decompress);
            byte[] array = new byte[num];
            deflateStream.Read(array, 0, num);

            FileStream file = new FileStream("d:\\2.bin", FileMode.Create, System.IO.FileAccess.Write);
            file.Write(array,0, num);
        
            pictureBox1.Image  = this.generate_image(array);

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.BackColor = Color.Gray;
        }
    }
}
