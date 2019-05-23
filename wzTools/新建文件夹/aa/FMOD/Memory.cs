using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class Memory
	{
		public static RESULT GetStats(ref int currentalloced, ref int maxalloced)
		{
			return Memory.FMOD_Memory_GetStats(ref currentalloced, ref maxalloced, 1);
		}

		public static RESULT GetStats(ref int currentalloced, ref int maxalloced, bool blocking)
		{
			return Memory.FMOD_Memory_GetStats(ref currentalloced, ref maxalloced, blocking ? 1 : 0);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Memory_GetStats(ref int currentalloced, ref int maxalloced, int blocking);
	}
}
