using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public struct TAG
	{
		public TAGTYPE type;

		public TAGDATATYPE datatype;

		public IntPtr namePtr;

		public IntPtr data;

		public uint datalen;

		public bool updated;

		public string name
		{
			get
			{
				return Marshal.PtrToStringAnsi(this.namePtr);
			}
		}
	}
}
