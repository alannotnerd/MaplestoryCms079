using System;
using System.Text;

namespace FMOD
{
	public delegate RESULT DSP_GETPARAMCALLBACK(ref DSP_STATE dsp_state, int index, ref float val, StringBuilder valuestr);
}
