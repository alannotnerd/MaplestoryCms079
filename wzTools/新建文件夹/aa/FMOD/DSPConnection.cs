using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class DSPConnection
	{
		private IntPtr dspconnectionraw;

		public RESULT getInput(ref DSP input)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = DSPConnection.FMOD_DSPConnection_GetInput(this.dspconnectionraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (input == null)
			{
				DSP dSP = new DSP();
				dSP.setRaw(raw);
				input = dSP;
			}
			else
			{
				input.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getOutput(ref DSP output)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = DSPConnection.FMOD_DSPConnection_GetOutput(this.dspconnectionraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (output == null)
			{
				DSP dSP = new DSP();
				dSP.setRaw(raw);
				output = dSP;
			}
			else
			{
				output.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT setMix(float volume)
		{
			return DSPConnection.FMOD_DSPConnection_SetMix(this.dspconnectionraw, volume);
		}

		public RESULT getMix(ref float volume)
		{
			return DSPConnection.FMOD_DSPConnection_GetMix(this.dspconnectionraw, ref volume);
		}

		public RESULT setLevels(SPEAKER speaker, float[] levels, int numlevels)
		{
			return DSPConnection.FMOD_DSPConnection_SetLevels(this.dspconnectionraw, speaker, levels, numlevels);
		}

		public RESULT getLevels(SPEAKER speaker, float[] levels, int numlevels)
		{
			return DSPConnection.FMOD_DSPConnection_GetLevels(this.dspconnectionraw, speaker, levels, numlevels);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return DSPConnection.FMOD_DSPConnection_SetUserData(this.dspconnectionraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return DSPConnection.FMOD_DSPConnection_GetUserData(this.dspconnectionraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return DSPConnection.FMOD_DSPConnection_GetMemoryInfo(this.dspconnectionraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetInput(IntPtr dspconnection, ref IntPtr input);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetOutput(IntPtr dspconnection, ref IntPtr output);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_SetMix(IntPtr dspconnection, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetMix(IntPtr dspconnection, ref float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_SetLevels(IntPtr dspconnection, SPEAKER speaker, float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetLevels(IntPtr dspconnection, SPEAKER speaker, [MarshalAs(UnmanagedType.LPArray)] float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_SetUserData(IntPtr dspconnection, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetUserData(IntPtr dspconnection, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSPConnection_GetMemoryInfo(IntPtr dspconnection, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr dspconnection)
		{
			this.dspconnectionraw = 0;
			this.dspconnectionraw = dspconnection;
		}

		public IntPtr getRaw()
		{
			return this.dspconnectionraw;
		}
	}
}
