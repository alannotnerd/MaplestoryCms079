using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public struct DSP_DESCRIPTION
	{
		[MarshalAs(UnmanagedType.ByValArray, SizeConst = 32)]
		public char[] name;

		public uint version;

		public int channels;

		public DSP_CREATECALLBACK create;

		public DSP_RELEASECALLBACK release;

		public DSP_RESETCALLBACK reset;

		public DSP_READCALLBACK read;

		public DSP_SETPOSITIONCALLBACK setposition;

		public int numparameters;

		public DSP_PARAMETERDESC[] paramdesc;

		public DSP_SETPARAMCALLBACK setparameter;

		public DSP_GETPARAMCALLBACK getparameter;

		public DSP_DIALOGCALLBACK config;

		public int configwidth;

		public int configheight;

		public IntPtr userdata;
	}
}
