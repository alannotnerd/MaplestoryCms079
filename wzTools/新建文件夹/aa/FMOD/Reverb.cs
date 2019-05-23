using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class Reverb
	{
		private IntPtr reverbraw;

		public RESULT release()
		{
			return Reverb.FMOD_Reverb_Release(this.reverbraw);
		}

		public RESULT set3DAttributes(ref VECTOR position, float mindistance, float maxdistance)
		{
			return Reverb.FMOD_Reverb_Set3DAttributes(this.reverbraw, ref position, mindistance, maxdistance);
		}

		public RESULT get3DAttributes(ref VECTOR position, ref float mindistance, ref float maxdistance)
		{
			return Reverb.FMOD_Reverb_Get3DAttributes(this.reverbraw, ref position, ref mindistance, ref maxdistance);
		}

		public RESULT setProperties(ref REVERB_PROPERTIES properties)
		{
			return Reverb.FMOD_Reverb_SetProperties(this.reverbraw, ref properties);
		}

		public RESULT getProperties(ref REVERB_PROPERTIES properties)
		{
			return Reverb.FMOD_Reverb_GetProperties(this.reverbraw, ref properties);
		}

		public RESULT setActive(bool active)
		{
			return Reverb.FMOD_Reverb_SetActive(this.reverbraw, active ? 1 : 0);
		}

		public RESULT getActive(ref bool active)
		{
			int num = 0;
			RESULT result = Reverb.FMOD_Reverb_GetActive(this.reverbraw, ref num);
			active = (num != 0);
			return result;
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return Reverb.FMOD_Reverb_SetUserData(this.reverbraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return Reverb.FMOD_Reverb_GetUserData(this.reverbraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return Reverb.FMOD_Reverb_GetMemoryInfo(this.reverbraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_Release(IntPtr reverb);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_Set3DAttributes(IntPtr reverb, ref VECTOR position, float mindistance, float maxdistance);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_Get3DAttributes(IntPtr reverb, ref VECTOR position, ref float mindistance, ref float maxdistance);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_SetProperties(IntPtr reverb, ref REVERB_PROPERTIES properties);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_GetProperties(IntPtr reverb, ref REVERB_PROPERTIES properties);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_SetActive(IntPtr reverb, int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_GetActive(IntPtr reverb, ref int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_SetUserData(IntPtr reverb, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_GetUserData(IntPtr reverb, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Reverb_GetMemoryInfo(IntPtr reverb, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr rev)
		{
			this.reverbraw = 0;
			this.reverbraw = rev;
		}

		public IntPtr getRaw()
		{
			return this.reverbraw;
		}
	}
}
