using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public struct GUID
	{
		public uint Data1;

		public ushort Data2;

		public ushort Data3;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
		public byte[] Data4;
	}
}
