using System;

namespace FMOD
{
	public delegate RESULT SYSTEM_CALLBACK(IntPtr systemraw, SYSTEM_CALLBACKTYPE type, IntPtr commanddata1, IntPtr commanddata2);
}
