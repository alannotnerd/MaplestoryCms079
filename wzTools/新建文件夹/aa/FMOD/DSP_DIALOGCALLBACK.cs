using System;

namespace FMOD
{
	public delegate RESULT DSP_DIALOGCALLBACK(ref DSP_STATE dsp_state, IntPtr hwnd, bool show);
}
