using System;

namespace FMOD
{
	public struct ASYNCREADINFO
	{
		public IntPtr handle;

		public uint offset;

		public uint sizebytes;

		public int priority;

		public IntPtr buffer;

		public uint bytesread;

		public RESULT result;

		public IntPtr userdata;
	}
}
