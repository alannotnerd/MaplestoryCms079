using System;

namespace FMOD
{
	public class DELAYTYPE_UTILITY
	{
		private void FMOD_64BIT_ADD(ref uint hi1, ref uint lo1, uint hi2, uint lo2)
		{
			hi1 += (uint)((ulong)hi2 + (ulong)((lo1 + lo2 < lo1) ? 1L : 0L));
			lo1 += lo2;
		}

		private void FMOD_64BIT_SUB(ref uint hi1, ref uint lo1, uint hi2, uint lo2)
		{
			hi1 -= (uint)((ulong)hi2 + (ulong)((lo1 - lo2 > lo1) ? 1L : 0L));
			lo1 -= lo2;
		}
	}
}
