using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public struct DSP_PARAMETERDESC
	{
		public float min;

		public float max;

		public float defaultval;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
		public char[] name;

		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
		public char[] label;

		public string description;
	}
}
