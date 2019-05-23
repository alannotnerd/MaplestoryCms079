using System;
using System.Runtime.InteropServices;
using System.Text;

namespace FMOD
{
	public class DSP
	{
		private IntPtr dspraw;

		public RESULT release()
		{
			return DSP.FMOD_DSP_Release(this.dspraw);
		}

		public RESULT getSystemObject(ref System system)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = DSP.FMOD_DSP_GetSystemObject(this.dspraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (system == null)
			{
				System system2 = new System();
				system2.setRaw(this.dspraw);
				system = system2;
			}
			else
			{
				system.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT addInput(DSP target, ref DSPConnection connection)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = DSP.FMOD_DSP_AddInput(this.dspraw, target.getRaw(), ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (connection == null)
			{
				DSPConnection dSPConnection = new DSPConnection();
				dSPConnection.setRaw(raw);
				connection = dSPConnection;
			}
			else
			{
				connection.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT disconnectFrom(DSP target)
		{
			return DSP.FMOD_DSP_DisconnectFrom(this.dspraw, target.getRaw());
		}

		public RESULT disconnectAll(bool inputs, bool outputs)
		{
			return DSP.FMOD_DSP_DisconnectAll(this.dspraw, inputs ? 1 : 0, outputs ? 1 : 0);
		}

		public RESULT remove()
		{
			return DSP.FMOD_DSP_Remove(this.dspraw);
		}

		public RESULT getNumInputs(ref int numinputs)
		{
			return DSP.FMOD_DSP_GetNumInputs(this.dspraw, ref numinputs);
		}

		public RESULT getNumOutputs(ref int numoutputs)
		{
			return DSP.FMOD_DSP_GetNumOutputs(this.dspraw, ref numoutputs);
		}

		public RESULT getInput(int index, ref DSP input, ref DSPConnection inputconnection)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			IntPtr raw2 = 0;
			try
			{
				rESULT = DSP.FMOD_DSP_GetInput(this.dspraw, index, ref raw, ref raw2);
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
			if (inputconnection == null)
			{
				DSPConnection dSPConnection = new DSPConnection();
				dSPConnection.setRaw(raw2);
				inputconnection = dSPConnection;
			}
			else
			{
				inputconnection.setRaw(raw2);
			}
			return rESULT;
		}

		public RESULT getOutput(int index, ref DSP output, ref DSPConnection outputconnection)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			IntPtr raw2 = 0;
			try
			{
				rESULT = DSP.FMOD_DSP_GetOutput(this.dspraw, index, ref raw, ref raw2);
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
			if (outputconnection == null)
			{
				DSPConnection dSPConnection = new DSPConnection();
				dSPConnection.setRaw(raw2);
				outputconnection = dSPConnection;
			}
			else
			{
				outputconnection.setRaw(raw2);
			}
			return rESULT;
		}

		public RESULT setActive(bool active)
		{
			return DSP.FMOD_DSP_SetActive(this.dspraw, active ? 1 : 0);
		}

		public RESULT getActive(ref bool active)
		{
			int num = 0;
			RESULT result = DSP.FMOD_DSP_GetActive(this.dspraw, ref num);
			active = (num != 0);
			return result;
		}

		public RESULT setBypass(bool bypass)
		{
			return DSP.FMOD_DSP_SetBypass(this.dspraw, bypass ? 1 : 0);
		}

		public RESULT getBypass(ref bool bypass)
		{
			int num = 0;
			RESULT result = DSP.FMOD_DSP_GetBypass(this.dspraw, ref num);
			bypass = (num != 0);
			return result;
		}

		public RESULT setSpeakerActive(SPEAKER speaker, bool active)
		{
			return DSP.FMOD_DSP_SetSpeakerActive(this.dspraw, speaker, active ? 1 : 0);
		}

		public RESULT getSpeakerActive(SPEAKER speaker, ref bool active)
		{
			int num = 0;
			RESULT result = DSP.FMOD_DSP_GetSpeakerActive(this.dspraw, speaker, ref num);
			active = (num != 0);
			return result;
		}

		public RESULT reset()
		{
			return DSP.FMOD_DSP_Reset(this.dspraw);
		}

		public RESULT setParameter(int index, float value)
		{
			return DSP.FMOD_DSP_SetParameter(this.dspraw, index, value);
		}

		public RESULT getParameter(int index, ref float value, StringBuilder valuestr, int valuestrlen)
		{
			return DSP.FMOD_DSP_GetParameter(this.dspraw, index, ref value, valuestr, valuestrlen);
		}

		public RESULT getNumParameters(ref int numparams)
		{
			return DSP.FMOD_DSP_GetNumParameters(this.dspraw, ref numparams);
		}

		public RESULT getParameterInfo(int index, StringBuilder name, StringBuilder label, StringBuilder description, int descriptionlen, ref float min, ref float max)
		{
			return DSP.FMOD_DSP_GetParameterInfo(this.dspraw, index, name, label, description, descriptionlen, ref min, ref max);
		}

		public RESULT showConfigDialog(IntPtr hwnd, bool show)
		{
			return DSP.FMOD_DSP_ShowConfigDialog(this.dspraw, hwnd, show ? 1 : 0);
		}

		public RESULT getInfo(ref IntPtr name, ref uint version, ref int channels, ref int configwidth, ref int configheight)
		{
			return DSP.FMOD_DSP_GetInfo(this.dspraw, ref name, ref version, ref channels, ref configwidth, ref configheight);
		}

		public RESULT getType(ref DSP_TYPE type)
		{
			return DSP.FMOD_DSP_GetType(this.dspraw, ref type);
		}

		public RESULT setDefaults(float frequency, float volume, float pan, int priority)
		{
			return DSP.FMOD_DSP_SetDefaults(this.dspraw, frequency, volume, pan, priority);
		}

		public RESULT getDefaults(ref float frequency, ref float volume, ref float pan, ref int priority)
		{
			return DSP.FMOD_DSP_GetDefaults(this.dspraw, ref frequency, ref volume, ref pan, ref priority);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return DSP.FMOD_DSP_SetUserData(this.dspraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return DSP.FMOD_DSP_GetUserData(this.dspraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return DSP.FMOD_DSP_GetMemoryInfo(this.dspraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_Release(IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetSystemObject(IntPtr dsp, ref IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_AddInput(IntPtr dsp, IntPtr target, ref IntPtr connection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_DisconnectFrom(IntPtr dsp, IntPtr target);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_DisconnectAll(IntPtr dsp, int inputs, int outputs);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_Remove(IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetNumInputs(IntPtr dsp, ref int numinputs);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetNumOutputs(IntPtr dsp, ref int numoutputs);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetInput(IntPtr dsp, int index, ref IntPtr input, ref IntPtr inputconnection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetOutput(IntPtr dsp, int index, ref IntPtr output, ref IntPtr outputconnection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetActive(IntPtr dsp, int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetActive(IntPtr dsp, ref int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetBypass(IntPtr dsp, int bypass);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetBypass(IntPtr dsp, ref int bypass);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetSpeakerActive(IntPtr dsp, SPEAKER speaker, int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetSpeakerActive(IntPtr dsp, SPEAKER speaker, ref int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_Reset(IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetParameter(IntPtr dsp, int index, float value);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetParameter(IntPtr dsp, int index, ref float value, StringBuilder valuestr, int valuestrlen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetNumParameters(IntPtr dsp, ref int numparams);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetParameterInfo(IntPtr dsp, int index, StringBuilder name, StringBuilder label, StringBuilder description, int descriptionlen, ref float min, ref float max);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_ShowConfigDialog(IntPtr dsp, IntPtr hwnd, int show);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetInfo(IntPtr dsp, ref IntPtr name, ref uint version, ref int channels, ref int configwidth, ref int configheight);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetType(IntPtr dsp, ref DSP_TYPE type);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetDefaults(IntPtr dsp, float frequency, float volume, float pan, int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetDefaults(IntPtr dsp, ref float frequency, ref float volume, ref float pan, ref int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_SetUserData(IntPtr dsp, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetUserData(IntPtr dsp, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_DSP_GetMemoryInfo(IntPtr dsp, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr dsp)
		{
			this.dspraw = 0;
			this.dspraw = dsp;
		}

		public IntPtr getRaw()
		{
			return this.dspraw;
		}
	}
}
