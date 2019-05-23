using System;
using System.Runtime.InteropServices;
using System.Text;

namespace FMOD
{
	public class ChannelGroup
	{
		private IntPtr channelgroupraw;

		public RESULT release()
		{
			return ChannelGroup.FMOD_ChannelGroup_Release(this.channelgroupraw);
		}

		public RESULT getSystemObject(ref System system)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_GetSystemObject(this.channelgroupraw, ref raw);
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

		public RESULT setVolume(float volume)
		{
			return ChannelGroup.FMOD_ChannelGroup_SetVolume(this.channelgroupraw, volume);
		}

		public RESULT getVolume(ref float volume)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetVolume(this.channelgroupraw, ref volume);
		}

		public RESULT setPitch(float pitch)
		{
			return ChannelGroup.FMOD_ChannelGroup_SetPitch(this.channelgroupraw, pitch);
		}

		public RESULT getPitch(ref float pitch)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetPitch(this.channelgroupraw, ref pitch);
		}

		public RESULT set3DOcclusion(float directocclusion, float reverbocclusion)
		{
			return ChannelGroup.FMOD_ChannelGroup_Set3DOcclusion(this.channelgroupraw, directocclusion, reverbocclusion);
		}

		public RESULT get3DOcclusion(ref float directocclusion, ref float reverbocclusion)
		{
			return ChannelGroup.FMOD_ChannelGroup_Get3DOcclusion(this.channelgroupraw, ref directocclusion, ref reverbocclusion);
		}

		public RESULT setPaused(bool paused)
		{
			return ChannelGroup.FMOD_ChannelGroup_SetPaused(this.channelgroupraw, paused ? 1 : 0);
		}

		public RESULT getPaused(ref bool paused)
		{
			int num = 0;
			RESULT result = ChannelGroup.FMOD_ChannelGroup_GetPaused(this.channelgroupraw, ref num);
			paused = (num != 0);
			return result;
		}

		public RESULT setMute(bool mute)
		{
			return ChannelGroup.FMOD_ChannelGroup_SetMute(this.channelgroupraw, mute ? 1 : 0);
		}

		public RESULT getMute(ref bool mute)
		{
			int num = 0;
			RESULT result = ChannelGroup.FMOD_ChannelGroup_GetMute(this.channelgroupraw, ref num);
			mute = (num != 0);
			return result;
		}

		public RESULT stop()
		{
			return ChannelGroup.FMOD_ChannelGroup_Stop(this.channelgroupraw);
		}

		public RESULT overrideVolume(float volume)
		{
			return ChannelGroup.FMOD_ChannelGroup_OverrideVolume(this.channelgroupraw, volume);
		}

		public RESULT overrideFrequency(float frequency)
		{
			return ChannelGroup.FMOD_ChannelGroup_OverrideFrequency(this.channelgroupraw, frequency);
		}

		public RESULT overridePan(float pan)
		{
			return ChannelGroup.FMOD_ChannelGroup_OverridePan(this.channelgroupraw, pan);
		}

		public RESULT overrideReverbProperties(ref REVERB_CHANNELPROPERTIES prop)
		{
			return ChannelGroup.FMOD_ChannelGroup_OverrideReverbProperties(this.channelgroupraw, ref prop);
		}

		public RESULT override3DAttributes(ref VECTOR pos, ref VECTOR vel)
		{
			return ChannelGroup.FMOD_ChannelGroup_Override3DAttributes(this.channelgroupraw, ref pos, ref vel);
		}

		public RESULT overrideSpeakerMix(float frontleft, float frontright, float center, float lfe, float backleft, float backright, float sideleft, float sideright)
		{
			return ChannelGroup.FMOD_ChannelGroup_OverrideSpeakerMix(this.channelgroupraw, frontleft, frontright, center, lfe, backleft, backright, sideleft, sideright);
		}

		public RESULT addGroup(ChannelGroup group)
		{
			return ChannelGroup.FMOD_ChannelGroup_AddGroup(this.channelgroupraw, group.getRaw());
		}

		public RESULT getNumGroups(ref int numgroups)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetNumGroups(this.channelgroupraw, ref numgroups);
		}

		public RESULT getGroup(int index, ref ChannelGroup group)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_GetGroup(this.channelgroupraw, index, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (group == null)
			{
				ChannelGroup channelGroup = new ChannelGroup();
				channelGroup.setRaw(raw);
				group = channelGroup;
			}
			else
			{
				group.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getParentGroup(ref ChannelGroup group)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_GetParentGroup(this.channelgroupraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (group == null)
			{
				ChannelGroup channelGroup = new ChannelGroup();
				channelGroup.setRaw(raw);
				group = channelGroup;
			}
			else
			{
				group.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getDSPHead(ref DSP dsp)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_GetDSPHead(this.channelgroupraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (dsp == null)
			{
				DSP dSP = new DSP();
				dSP.setRaw(raw);
				dsp = dSP;
			}
			else
			{
				dsp.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT addDSP(DSP dsp, ref DSPConnection connection)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_AddDSP(this.channelgroupraw, dsp.getRaw(), ref raw);
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

		public RESULT getName(StringBuilder name, int namelen)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetName(this.channelgroupraw, name, namelen);
		}

		public RESULT getNumChannels(ref int numchannels)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetNumChannels(this.channelgroupraw, ref numchannels);
		}

		public RESULT getChannel(int index, ref Channel channel)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = ChannelGroup.FMOD_ChannelGroup_GetChannel(this.channelgroupraw, index, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (channel == null)
			{
				Channel channel2 = new Channel();
				channel2.setRaw(raw);
				channel = channel2;
			}
			else
			{
				channel.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getSpectrum(float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetSpectrum(this.channelgroupraw, spectrumarray, numvalues, channeloffset, windowtype);
		}

		public RESULT getWaveData(float[] wavearray, int numvalues, int channeloffset)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetWaveData(this.channelgroupraw, wavearray, numvalues, channeloffset);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return ChannelGroup.FMOD_ChannelGroup_SetUserData(this.channelgroupraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetUserData(this.channelgroupraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return ChannelGroup.FMOD_ChannelGroup_GetMemoryInfo(this.channelgroupraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_Release(IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetSystemObject(IntPtr channelgroup, ref IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_SetVolume(IntPtr channelgroup, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetVolume(IntPtr channelgroup, ref float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_SetPitch(IntPtr channelgroup, float pitch);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetPitch(IntPtr channelgroup, ref float pitch);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_Set3DOcclusion(IntPtr channelgroup, float directocclusion, float reverbocclusion);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_Get3DOcclusion(IntPtr channelgroup, ref float directocclusion, ref float reverbocclusion);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_SetPaused(IntPtr channelgroup, int paused);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetPaused(IntPtr channelgroup, ref int paused);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_SetMute(IntPtr channelgroup, int mute);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetMute(IntPtr channelgroup, ref int mute);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_Stop(IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverridePaused(IntPtr channelgroup, int paused);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverrideVolume(IntPtr channelgroup, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverrideFrequency(IntPtr channelgroup, float frequency);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverridePan(IntPtr channelgroup, float pan);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverrideMute(IntPtr channelgroup, int mute);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverrideReverbProperties(IntPtr channelgroup, ref REVERB_CHANNELPROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_Override3DAttributes(IntPtr channelgroup, ref VECTOR pos, ref VECTOR vel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_OverrideSpeakerMix(IntPtr channelgroup, float frontleft, float frontright, float center, float lfe, float backleft, float backright, float sideleft, float sideright);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_AddGroup(IntPtr channelgroup, IntPtr group);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetNumGroups(IntPtr channelgroup, ref int numgroups);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetGroup(IntPtr channelgroup, int index, ref IntPtr group);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetParentGroup(IntPtr channelgroup, ref IntPtr group);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetDSPHead(IntPtr channelgroup, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_AddDSP(IntPtr channelgroup, IntPtr dsp, ref IntPtr connection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetName(IntPtr channelgroup, StringBuilder name, int namelen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetNumChannels(IntPtr channelgroup, ref int numchannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetChannel(IntPtr channelgroup, int index, ref IntPtr channel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetSpectrum(IntPtr channelgroup, [MarshalAs(UnmanagedType.LPArray)] float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetWaveData(IntPtr channelgroup, [MarshalAs(UnmanagedType.LPArray)] float[] wavearray, int numvalues, int channeloffset);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_SetUserData(IntPtr channelgroup, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetUserData(IntPtr channelgroup, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_ChannelGroup_GetMemoryInfo(IntPtr channelgroup, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr channelgroup)
		{
			this.channelgroupraw = 0;
			this.channelgroupraw = channelgroup;
		}

		public IntPtr getRaw()
		{
			return this.channelgroupraw;
		}
	}
}
