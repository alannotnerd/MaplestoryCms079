using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

internal class wzdecryptor
{
	private static readonly byte[] factork = new byte[]
	{
		185,
		125,
		99,
		233
	};

	private static readonly byte[] factorg = new byte[]
	{
		77,
		35,
		199,
		43
	};

	private static readonly byte[] key = new byte[]
	{
		19,
		0,
		0,
		0,
		8,
		0,
		0,
		0,
		6,
		0,
		0,
		0,
		180,
		0,
		0,
		0,
		27,
		0,
		0,
		0,
		15,
		0,
		0,
		0,
		51,
		0,
		0,
		0,
		82,
		0,
		0,
		0
	};

	private byte[] cryptok;

	private byte[] cryptog;

	private byte[] cryptox;

	private byte[] cryptoc;

	internal char region
	{
		set
		{
			this.cryptoc = (('k' == value) ? this.cryptok : (('g' == value) ? this.cryptog : this.cryptox));
		}
	}

	internal wzdecryptor()
	{
		this.cryptok = this.generate_sequence(wzdecryptor.factork);
		this.cryptog = this.generate_sequence(wzdecryptor.factorg);
		this.cryptox = new byte[65535];
		this.cryptoc = this.cryptok;
	}

	private byte[] generate_sequence(byte[] factor)
	{
		Rijndael rijndael = Rijndael.Create();
		MemoryStream memoryStream = new MemoryStream();
		int num = 4 * factor.Length;
		byte[] array = new byte[num];
		rijndael.Key = wzdecryptor.key;
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
			memoryStream.Seek((long)(-(long)num), SeekOrigin.Current);
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

	internal string decrypt_string(byte[] bytes)
	{
		StringBuilder stringBuilder = new StringBuilder();
		byte b = 170;
		int num = 0;
		while (bytes.Length > num)
		{
			stringBuilder.Append((char)(bytes[num] ^ this.cryptoc[num] ^ b));
			num++;
			b += 1;
		}
		return stringBuilder.ToString();
	}

	internal string decrypt_string16(byte[] bytes)
	{
		StringBuilder stringBuilder = new StringBuilder();
		ushort num = 43690;
		int num2 = 0;
		while (bytes.Length > num2)
		{
			stringBuilder.Append((char)((((int)(bytes[num2 + 1] ^ this.cryptoc[num2 + 1]) ^ num >> 8) << 8) + (int)((ushort)(bytes[num2] ^ this.cryptoc[num2]) ^ (num & 255))));
			num2 += 2;
			num += 1;
		}
		return stringBuilder.ToString();
	}

	internal byte[] decrypt_bytes(byte[] bytes)
	{
		int num = 0;
		while (bytes.Length > num)
		{
			bytes[num] ^= this.cryptoc[num];
			num++;
		}
		return bytes;
	}
}
