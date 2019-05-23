using System;

namespace FMOD
{
	public delegate RESULT CHANNEL_CALLBACK(IntPtr channelraw, CHANNEL_CALLBACKTYPE type, IntPtr commanddata1, IntPtr commanddata2);
}
