using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class Channel
	{
		private IntPtr channelraw;

		public RESULT getSystemObject(ref System system)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Channel.FMOD_Channel_GetSystemObject(this.channelraw, ref raw);
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
				system2.setRaw(raw);
				system = system2;
			}
			else
			{
				system.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT stop()
		{
			return Channel.FMOD_Channel_Stop(this.channelraw);
		}

		public RESULT setPaused(bool paused)
		{
			return Channel.FMOD_Channel_SetPaused(this.channelraw, paused ? 1 : 0);
		}

		public RESULT getPaused(ref bool paused)
		{
			int num = 0;
			RESULT result = Channel.FMOD_Channel_GetPaused(this.channelraw, ref num);
			paused = (num != 0);
			return result;
		}

		public RESULT setVolume(float volume)
		{
			return Channel.FMOD_Channel_SetVolume(this.channelraw, volume);
		}

		public RESULT getVolume(ref float volume)
		{
			return Channel.FMOD_Channel_GetVolume(this.channelraw, ref volume);
		}

		public RESULT setFrequency(float frequency)
		{
			return Channel.FMOD_Channel_SetFrequency(this.channelraw, frequency);
		}

		public RESULT getFrequency(ref float frequency)
		{
			return Channel.FMOD_Channel_GetFrequency(this.channelraw, ref frequency);
		}

		public RESULT setPan(float pan)
		{
			return Channel.FMOD_Channel_SetPan(this.channelraw, pan);
		}

		public RESULT getPan(ref float pan)
		{
			return Channel.FMOD_Channel_GetPan(this.channelraw, ref pan);
		}

		public RESULT setDelay(DELAYTYPE delaytype, uint delayhi, uint delaylo)
		{
			return Channel.FMOD_Channel_SetDelay(this.channelraw, delaytype, delayhi, delaylo);
		}

		public RESULT getDelay(DELAYTYPE delaytype, ref uint delayhi, ref uint delaylo)
		{
			return Channel.FMOD_Channel_GetDelay(this.channelraw, delaytype, ref delayhi, ref delaylo);
		}

		public RESULT setSpeakerMix(float frontleft, float frontright, float center, float lfe, float backleft, float backright, float sideleft, float sideright)
		{
			return Channel.FMOD_Channel_SetSpeakerMix(this.channelraw, frontleft, frontright, center, lfe, backleft, backright, sideleft, sideright);
		}

		public RESULT getSpeakerMix(ref float frontleft, ref float frontright, ref float center, ref float lfe, ref float backleft, ref float backright, ref float sideleft, ref float sideright)
		{
			return Channel.FMOD_Channel_GetSpeakerMix(this.channelraw, ref frontleft, ref frontright, ref center, ref lfe, ref backleft, ref backright, ref sideleft, ref sideright);
		}

		public RESULT setSpeakerLevels(SPEAKER speaker, float[] levels, int numlevels)
		{
			return Channel.FMOD_Channel_SetSpeakerLevels(this.channelraw, speaker, levels, numlevels);
		}

		public RESULT getSpeakerLevels(SPEAKER speaker, float[] levels, int numlevels)
		{
			return Channel.FMOD_Channel_GetSpeakerLevels(this.channelraw, speaker, levels, numlevels);
		}

		public RESULT setInputChannelMix(float[] levels, int numlevels)
		{
			return Channel.FMOD_Channel_SetInputChannelMix(this.channelraw, levels, numlevels);
		}

		public RESULT getInputChannelMix(float[] levels, int numlevels)
		{
			return Channel.FMOD_Channel_GetInputChannelMix(this.channelraw, levels, numlevels);
		}

		public RESULT setMute(bool mute)
		{
			return Channel.FMOD_Channel_SetMute(this.channelraw, mute ? 1 : 0);
		}

		public RESULT getMute(ref bool mute)
		{
			int num = 0;
			RESULT result = Channel.FMOD_Channel_GetMute(this.channelraw, ref num);
			mute = (num != 0);
			return result;
		}

		public RESULT setPriority(int priority)
		{
			return Channel.FMOD_Channel_SetPriority(this.channelraw, priority);
		}

		public RESULT getPriority(ref int priority)
		{
			return Channel.FMOD_Channel_GetPriority(this.channelraw, ref priority);
		}

		public RESULT setPosition(uint position, TIMEUNIT postype)
		{
			return Channel.FMOD_Channel_SetPosition(this.channelraw, position, postype);
		}

		public RESULT getPosition(ref uint position, TIMEUNIT postype)
		{
			return Channel.FMOD_Channel_GetPosition(this.channelraw, ref position, postype);
		}

		public RESULT setLowPassGain(float gain)
		{
			return Channel.FMOD_Channel_SetLowPassGain(this.channelraw, gain);
		}

		public RESULT getLowPassGain(ref float gain)
		{
			return Channel.FMOD_Channel_GetLowPassGain(this.channelraw, ref gain);
		}

		public RESULT setReverbProperties(ref REVERB_CHANNELPROPERTIES prop)
		{
			return Channel.FMOD_Channel_SetReverbProperties(this.channelraw, ref prop);
		}

		public RESULT getReverbProperties(ref REVERB_CHANNELPROPERTIES prop)
		{
			return Channel.FMOD_Channel_GetReverbProperties(this.channelraw, ref prop);
		}

		public RESULT setChannelGroup(ChannelGroup channelgroup)
		{
			return Channel.FMOD_Channel_SetChannelGroup(this.channelraw, channelgroup.getRaw());
		}

		public RESULT getChannelGroup(ref ChannelGroup channelgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Channel.FMOD_Channel_GetChannelGroup(this.channelraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (channelgroup == null)
			{
				ChannelGroup channelGroup = new ChannelGroup();
				channelGroup.setRaw(raw);
				channelgroup = channelGroup;
			}
			else
			{
				channelgroup.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT setCallback(CHANNEL_CALLBACK callback)
		{
			return Channel.FMOD_Channel_SetCallback(this.channelraw, callback);
		}

		public RESULT set3DAttributes(ref VECTOR pos, ref VECTOR vel)
		{
			return Channel.FMOD_Channel_Set3DAttributes(this.channelraw, ref pos, ref vel);
		}

		public RESULT get3DAttributes(ref VECTOR pos, ref VECTOR vel)
		{
			return Channel.FMOD_Channel_Get3DAttributes(this.channelraw, ref pos, ref vel);
		}

		public RESULT set3DMinMaxDistance(float mindistance, float maxdistance)
		{
			return Channel.FMOD_Channel_Set3DMinMaxDistance(this.channelraw, mindistance, maxdistance);
		}

		public RESULT get3DMinMaxDistance(ref float mindistance, ref float maxdistance)
		{
			return Channel.FMOD_Channel_Get3DMinMaxDistance(this.channelraw, ref mindistance, ref maxdistance);
		}

		public RESULT set3DConeSettings(float insideconeangle, float outsideconeangle, float outsidevolume)
		{
			return Channel.FMOD_Channel_Set3DConeSettings(this.channelraw, insideconeangle, outsideconeangle, outsidevolume);
		}

		public RESULT get3DConeSettings(ref float insideconeangle, ref float outsideconeangle, ref float outsidevolume)
		{
			return Channel.FMOD_Channel_Get3DConeSettings(this.channelraw, ref insideconeangle, ref outsideconeangle, ref outsidevolume);
		}

		public RESULT set3DConeOrientation(ref VECTOR orientation)
		{
			return Channel.FMOD_Channel_Set3DConeOrientation(this.channelraw, ref orientation);
		}

		public RESULT get3DConeOrientation(ref VECTOR orientation)
		{
			return Channel.FMOD_Channel_Get3DConeOrientation(this.channelraw, ref orientation);
		}

		public RESULT set3DCustomRolloff(ref VECTOR points, int numpoints)
		{
			return Channel.FMOD_Channel_Set3DCustomRolloff(this.channelraw, ref points, numpoints);
		}

		public RESULT get3DCustomRolloff(ref IntPtr points, ref int numpoints)
		{
			return Channel.FMOD_Channel_Get3DCustomRolloff(this.channelraw, ref points, ref numpoints);
		}

		public RESULT set3DOcclusion(float directocclusion, float reverbocclusion)
		{
			return Channel.FMOD_Channel_Set3DOcclusion(this.channelraw, directocclusion, reverbocclusion);
		}

		public RESULT get3DOcclusion(ref float directocclusion, ref float reverbocclusion)
		{
			return Channel.FMOD_Channel_Get3DOcclusion(this.channelraw, ref directocclusion, ref reverbocclusion);
		}

		public RESULT set3DSpread(float angle)
		{
			return Channel.FMOD_Channel_Set3DSpread(this.channelraw, angle);
		}

		public RESULT get3DSpread(ref float angle)
		{
			return Channel.FMOD_Channel_Get3DSpread(this.channelraw, ref angle);
		}

		public RESULT set3DPanLevel(float level)
		{
			return Channel.FMOD_Channel_Set3DPanLevel(this.channelraw, level);
		}

		public RESULT get3DPanLevel(ref float level)
		{
			return Channel.FMOD_Channel_Get3DPanLevel(this.channelraw, ref level);
		}

		public RESULT set3DDopplerLevel(float level)
		{
			return Channel.FMOD_Channel_Set3DDopplerLevel(this.channelraw, level);
		}

		public RESULT get3DDopplerLevel(ref float level)
		{
			return Channel.FMOD_Channel_Get3DDopplerLevel(this.channelraw, ref level);
		}

		public RESULT isPlaying(ref bool isplaying)
		{
			int num = 0;
			RESULT result = Channel.FMOD_Channel_IsPlaying(this.channelraw, ref num);
			isplaying = (num != 0);
			return result;
		}

		public RESULT isVirtual(ref bool isvirtual)
		{
			int num = 0;
			RESULT result = Channel.FMOD_Channel_IsVirtual(this.channelraw, ref num);
			isvirtual = (num != 0);
			return result;
		}

		public RESULT getAudibility(ref float audibility)
		{
			return Channel.FMOD_Channel_GetAudibility(this.channelraw, ref audibility);
		}

		public RESULT getCurrentSound(ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Channel.FMOD_Channel_GetCurrentSound(this.channelraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (sound == null)
			{
				Sound sound2 = new Sound();
				sound2.setRaw(raw);
				sound = sound2;
			}
			else
			{
				sound.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getSpectrum(float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype)
		{
			return Channel.FMOD_Channel_GetSpectrum(this.channelraw, spectrumarray, numvalues, channeloffset, windowtype);
		}

		public RESULT getWaveData(float[] wavearray, int numvalues, int channeloffset)
		{
			return Channel.FMOD_Channel_GetWaveData(this.channelraw, wavearray, numvalues, channeloffset);
		}

		public RESULT getIndex(ref int index)
		{
			return Channel.FMOD_Channel_GetIndex(this.channelraw, ref index);
		}

		public RESULT getDSPHead(ref DSP dsp)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Channel.FMOD_Channel_GetDSPHead(this.channelraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			DSP dSP = new DSP();
			dSP.setRaw(raw);
			dsp = dSP;
			return rESULT;
		}

		public RESULT addDSP(DSP dsp, ref DSPConnection connection)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Channel.FMOD_Channel_AddDSP(this.channelraw, dsp.getRaw(), ref raw);
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

		public RESULT setMode(MODE mode)
		{
			return Channel.FMOD_Channel_SetMode(this.channelraw, mode);
		}

		public RESULT getMode(ref MODE mode)
		{
			return Channel.FMOD_Channel_GetMode(this.channelraw, ref mode);
		}

		public RESULT setLoopCount(int loopcount)
		{
			return Channel.FMOD_Channel_SetLoopCount(this.channelraw, loopcount);
		}

		public RESULT getLoopCount(ref int loopcount)
		{
			return Channel.FMOD_Channel_GetLoopCount(this.channelraw, ref loopcount);
		}

		public RESULT setLoopPoints(uint loopstart, TIMEUNIT loopstarttype, uint loopend, TIMEUNIT loopendtype)
		{
			return Channel.FMOD_Channel_SetLoopPoints(this.channelraw, loopstart, loopstarttype, loopend, loopendtype);
		}

		public RESULT getLoopPoints(ref uint loopstart, TIMEUNIT loopstarttype, ref uint loopend, TIMEUNIT loopendtype)
		{
			return Channel.FMOD_Channel_GetLoopPoints(this.channelraw, ref loopstart, loopstarttype, ref loopend, loopendtype);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return Channel.FMOD_Channel_SetUserData(this.channelraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return Channel.FMOD_Channel_GetUserData(this.channelraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return Channel.FMOD_Channel_GetMemoryInfo(this.channelraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetSystemObject(IntPtr channel, ref IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Stop(IntPtr channel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetPaused(IntPtr channel, int paused);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetPaused(IntPtr channel, ref int paused);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetVolume(IntPtr channel, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetVolume(IntPtr channel, ref float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetFrequency(IntPtr channel, float frequency);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetFrequency(IntPtr channel, ref float frequency);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetPan(IntPtr channel, float pan);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetPan(IntPtr channel, ref float pan);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetDelay(IntPtr channel, DELAYTYPE delaytype, uint delayhi, uint delaylo);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetDelay(IntPtr channel, DELAYTYPE delaytype, ref uint delayhi, ref uint delaylo);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetSpeakerMix(IntPtr channel, float frontleft, float frontright, float center, float lfe, float backleft, float backright, float sideleft, float sideright);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetSpeakerMix(IntPtr channel, ref float frontleft, ref float frontright, ref float center, ref float lfe, ref float backleft, ref float backright, ref float sideleft, ref float sideright);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetSpeakerLevels(IntPtr channel, SPEAKER speaker, float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetSpeakerLevels(IntPtr channel, SPEAKER speaker, [MarshalAs(UnmanagedType.LPArray)] float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetInputChannelMix(IntPtr channel, float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetInputChannelMix(IntPtr channel, [MarshalAs(UnmanagedType.LPArray)] float[] levels, int numlevels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetMute(IntPtr channel, int mute);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetMute(IntPtr channel, ref int mute);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetPriority(IntPtr channel, int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetPriority(IntPtr channel, ref int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DAttributes(IntPtr channel, ref VECTOR pos, ref VECTOR vel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DAttributes(IntPtr channel, ref VECTOR pos, ref VECTOR vel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DMinMaxDistance(IntPtr channel, float mindistance, float maxdistance);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DMinMaxDistance(IntPtr channel, ref float mindistance, ref float maxdistance);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DConeSettings(IntPtr channel, float insideconeangle, float outsideconeangle, float outsidevolume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DConeSettings(IntPtr channel, ref float insideconeangle, ref float outsideconeangle, ref float outsidevolume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DConeOrientation(IntPtr channel, ref VECTOR orientation);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DConeOrientation(IntPtr channel, ref VECTOR orientation);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DCustomRolloff(IntPtr channel, ref VECTOR points, int numpoints);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DCustomRolloff(IntPtr channel, ref IntPtr points, ref int numpoints);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DOcclusion(IntPtr channel, float directocclusion, float reverbocclusion);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DOcclusion(IntPtr channel, ref float directocclusion, ref float reverbocclusion);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DSpread(IntPtr channel, float angle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DSpread(IntPtr channel, ref float angle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DPanLevel(IntPtr channel, float level);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DPanLevel(IntPtr channel, ref float level);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Set3DDopplerLevel(IntPtr channel, float level);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_Get3DDopplerLevel(IntPtr channel, ref float level);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetReverbProperties(IntPtr channel, ref REVERB_CHANNELPROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetReverbProperties(IntPtr channel, ref REVERB_CHANNELPROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetLowPassGain(IntPtr channel, float gain);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetLowPassGain(IntPtr channel, ref float gain);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetChannelGroup(IntPtr channel, IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetChannelGroup(IntPtr channel, ref IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_IsPlaying(IntPtr channel, ref int isplaying);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_IsVirtual(IntPtr channel, ref int isvirtual);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetAudibility(IntPtr channel, ref float audibility);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetCurrentSound(IntPtr channel, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetSpectrum(IntPtr channel, [MarshalAs(UnmanagedType.LPArray)] float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetWaveData(IntPtr channel, [MarshalAs(UnmanagedType.LPArray)] float[] wavearray, int numvalues, int channeloffset);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetIndex(IntPtr channel, ref int index);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetCallback(IntPtr channel, CHANNEL_CALLBACK callback);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetPosition(IntPtr channel, uint position, TIMEUNIT postype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetPosition(IntPtr channel, ref uint position, TIMEUNIT postype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetDSPHead(IntPtr channel, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_AddDSP(IntPtr channel, IntPtr dsp, ref IntPtr connection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetMode(IntPtr channel, MODE mode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetMode(IntPtr channel, ref MODE mode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetLoopCount(IntPtr channel, int loopcount);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetLoopCount(IntPtr channel, ref int loopcount);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetLoopPoints(IntPtr channel, uint loopstart, TIMEUNIT loopstarttype, uint loopend, TIMEUNIT loopendtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetLoopPoints(IntPtr channel, ref uint loopstart, TIMEUNIT loopstarttype, ref uint loopend, TIMEUNIT loopendtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_SetUserData(IntPtr channel, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetUserData(IntPtr channel, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Channel_GetMemoryInfo(IntPtr channel, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr channel)
		{
			this.channelraw = 0;
			this.channelraw = channel;
		}

		public IntPtr getRaw()
		{
			return this.channelraw;
		}
	}
}
