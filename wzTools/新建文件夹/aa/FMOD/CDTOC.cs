using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public struct CDTOC
	{
		public int numtracks;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 100)]
		public int[] min;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 100)]
		public int[] sec;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 100)]
		public int[] frame;
	}
}
