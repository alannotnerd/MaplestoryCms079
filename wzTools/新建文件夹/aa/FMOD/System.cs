using System;
using System.Runtime.InteropServices;
using System.Text;

namespace FMOD
{
	public class System
	{
		private IntPtr systemraw;

		public RESULT release()
		{
			return System.FMOD_System_Release(this.systemraw);
		}

		public RESULT setOutput(OUTPUTTYPE output)
		{
			return System.FMOD_System_SetOutput(this.systemraw, output);
		}

		public RESULT getOutput(ref OUTPUTTYPE output)
		{
			return System.FMOD_System_GetOutput(this.systemraw, ref output);
		}

		public RESULT getNumDrivers(ref int numdrivers)
		{
			return System.FMOD_System_GetNumDrivers(this.systemraw, ref numdrivers);
		}

		public RESULT getDriverInfo(int id, [MarshalAs(UnmanagedType.LPWStr)] StringBuilder name, int namelen, ref GUID guid)
		{
			return System.FMOD_System_GetDriverInfoW(this.systemraw, id, name, namelen, ref guid);
		}

		public RESULT getDriverCaps(int id, ref CAPS caps, ref int controlpaneloutputrate, ref SPEAKERMODE controlpanelspeakermode)
		{
			return System.FMOD_System_GetDriverCaps(this.systemraw, id, ref caps, ref controlpaneloutputrate, ref controlpanelspeakermode);
		}

		public RESULT setDriver(int driver)
		{
			return System.FMOD_System_SetDriver(this.systemraw, driver);
		}

		public RESULT getDriver(ref int driver)
		{
			return System.FMOD_System_GetDriver(this.systemraw, ref driver);
		}

		public RESULT setHardwareChannels(int numhardwarechannels)
		{
			return System.FMOD_System_SetHardwareChannels(this.systemraw, numhardwarechannels);
		}

		public RESULT setSoftwareChannels(int numsoftwarechannels)
		{
			return System.FMOD_System_SetSoftwareChannels(this.systemraw, numsoftwarechannels);
		}

		public RESULT getSoftwareChannels(ref int numsoftwarechannels)
		{
			return System.FMOD_System_GetSoftwareChannels(this.systemraw, ref numsoftwarechannels);
		}

		public RESULT setSoftwareFormat(int samplerate, SOUND_FORMAT format, int numoutputchannels, int maxinputchannels, DSP_RESAMPLER resamplemethod)
		{
			return System.FMOD_System_SetSoftwareFormat(this.systemraw, samplerate, format, numoutputchannels, maxinputchannels, resamplemethod);
		}

		public RESULT getSoftwareFormat(ref int samplerate, ref SOUND_FORMAT format, ref int numoutputchannels, ref int maxinputchannels, ref DSP_RESAMPLER resamplemethod, ref int bits)
		{
			return System.FMOD_System_GetSoftwareFormat(this.systemraw, ref samplerate, ref format, ref numoutputchannels, ref maxinputchannels, ref resamplemethod, ref bits);
		}

		public RESULT setDSPBufferSize(uint bufferlength, int numbuffers)
		{
			return System.FMOD_System_SetDSPBufferSize(this.systemraw, bufferlength, numbuffers);
		}

		public RESULT getDSPBufferSize(ref uint bufferlength, ref int numbuffers)
		{
			return System.FMOD_System_GetDSPBufferSize(this.systemraw, ref bufferlength, ref numbuffers);
		}

		public RESULT setFileSystem(FILE_OPENCALLBACK useropen, FILE_CLOSECALLBACK userclose, FILE_READCALLBACK userread, FILE_SEEKCALLBACK userseek, FILE_ASYNCREADCALLBACK userasyncread, FILE_ASYNCCANCELCALLBACK userasynccancel, int blockalign)
		{
			return System.FMOD_System_SetFileSystem(this.systemraw, useropen, userclose, userread, userseek, userasyncread, userasynccancel, blockalign);
		}

		public RESULT attachFileSystem(FILE_OPENCALLBACK useropen, FILE_CLOSECALLBACK userclose, FILE_READCALLBACK userread, FILE_SEEKCALLBACK userseek)
		{
			return System.FMOD_System_AttachFileSystem(this.systemraw, useropen, userclose, userread, userseek);
		}

		public RESULT setAdvancedSettings(ref ADVANCEDSETTINGS settings)
		{
			return System.FMOD_System_SetAdvancedSettings(this.systemraw, ref settings);
		}

		public RESULT getAdvancedSettings(ref ADVANCEDSETTINGS settings)
		{
			return System.FMOD_System_GetAdvancedSettings(this.systemraw, ref settings);
		}

		public RESULT setSpeakerMode(SPEAKERMODE speakermode)
		{
			return System.FMOD_System_SetSpeakerMode(this.systemraw, speakermode);
		}

		public RESULT getSpeakerMode(ref SPEAKERMODE speakermode)
		{
			return System.FMOD_System_GetSpeakerMode(this.systemraw, ref speakermode);
		}

		public RESULT setCallback(SYSTEM_CALLBACK callback)
		{
			return System.FMOD_System_SetCallback(this.systemraw, callback);
		}

		public RESULT setPluginPath(string path)
		{
			return System.FMOD_System_SetPluginPath(this.systemraw, path);
		}

		public RESULT loadPlugin(string filename, ref uint handle, uint priority)
		{
			return System.FMOD_System_LoadPlugin(this.systemraw, filename, ref handle, priority);
		}

		public RESULT unloadPlugin(uint handle)
		{
			return System.FMOD_System_UnloadPlugin(this.systemraw, handle);
		}

		public RESULT getNumPlugins(PLUGINTYPE plugintype, ref int numplugins)
		{
			return System.FMOD_System_GetNumPlugins(this.systemraw, plugintype, ref numplugins);
		}

		public RESULT getPluginHandle(PLUGINTYPE plugintype, int index, ref uint handle)
		{
			return System.FMOD_System_GetPluginHandle(this.systemraw, plugintype, index, ref handle);
		}

		public RESULT getPluginInfo(uint handle, ref PLUGINTYPE plugintype, StringBuilder name, int namelen, ref uint version)
		{
			return System.FMOD_System_GetPluginInfo(this.systemraw, handle, ref plugintype, name, namelen, ref version);
		}

		public RESULT setOutputByPlugin(uint handle)
		{
			return System.FMOD_System_SetOutputByPlugin(this.systemraw, handle);
		}

		public RESULT getOutputByPlugin(ref uint handle)
		{
			return System.FMOD_System_GetOutputByPlugin(this.systemraw, ref handle);
		}

		public RESULT createDSPByPlugin(uint handle, ref IntPtr dsp)
		{
			return System.FMOD_System_CreateDSPByPlugin(this.systemraw, handle, ref dsp);
		}

		public RESULT createCodec(IntPtr description, uint priority)
		{
			return System.FMOD_System_CreateCodec(this.systemraw, description, priority);
		}

		public RESULT init(int maxchannels, INITFLAGS flags, IntPtr extradriverdata)
		{
			return System.FMOD_System_Init(this.systemraw, maxchannels, flags, extradriverdata);
		}

		public RESULT close()
		{
			return System.FMOD_System_Close(this.systemraw);
		}

		public RESULT update()
		{
			return System.FMOD_System_Update(this.systemraw);
		}

		public RESULT set3DSettings(float dopplerscale, float distancefactor, float rolloffscale)
		{
			return System.FMOD_System_Set3DSettings(this.systemraw, dopplerscale, distancefactor, rolloffscale);
		}

		public RESULT get3DSettings(ref float dopplerscale, ref float distancefactor, ref float rolloffscale)
		{
			return System.FMOD_System_Get3DSettings(this.systemraw, ref dopplerscale, ref distancefactor, ref rolloffscale);
		}

		public RESULT set3DNumListeners(int numlisteners)
		{
			return System.FMOD_System_Set3DNumListeners(this.systemraw, numlisteners);
		}

		public RESULT get3DNumListeners(ref int numlisteners)
		{
			return System.FMOD_System_Get3DNumListeners(this.systemraw, ref numlisteners);
		}

		public RESULT set3DListenerAttributes(int listener, ref VECTOR pos, ref VECTOR vel, ref VECTOR forward, ref VECTOR up)
		{
			return System.FMOD_System_Set3DListenerAttributes(this.systemraw, listener, ref pos, ref vel, ref forward, ref up);
		}

		public RESULT get3DListenerAttributes(int listener, ref VECTOR pos, ref VECTOR vel, ref VECTOR forward, ref VECTOR up)
		{
			return System.FMOD_System_Get3DListenerAttributes(this.systemraw, listener, ref pos, ref vel, ref forward, ref up);
		}

		public RESULT set3DRolloffCallback(CB_3D_ROLLOFFCALLBACK callback)
		{
			return System.FMOD_System_Set3DRolloffCallback(this.systemraw, callback);
		}

		public RESULT set3DSpeakerPosition(SPEAKER speaker, float x, float y, bool active)
		{
			return System.FMOD_System_Set3DSpeakerPosition(this.systemraw, speaker, x, y, active ? 1 : 0);
		}

		public RESULT get3DSpeakerPosition(SPEAKER speaker, ref float x, ref float y, ref bool active)
		{
			int num = 0;
			RESULT result = System.FMOD_System_Get3DSpeakerPosition(this.systemraw, speaker, ref x, ref y, ref num);
			active = (num != 0);
			return result;
		}

		public RESULT setStreamBufferSize(uint filebuffersize, TIMEUNIT filebuffersizetype)
		{
			return System.FMOD_System_SetStreamBufferSize(this.systemraw, filebuffersize, filebuffersizetype);
		}

		public RESULT getStreamBufferSize(ref uint filebuffersize, ref TIMEUNIT filebuffersizetype)
		{
			return System.FMOD_System_GetStreamBufferSize(this.systemraw, ref filebuffersize, ref filebuffersizetype);
		}

		public RESULT getVersion(ref uint version)
		{
			return System.FMOD_System_GetVersion(this.systemraw, ref version);
		}

		public RESULT getOutputHandle(ref IntPtr handle)
		{
			return System.FMOD_System_GetOutputHandle(this.systemraw, ref handle);
		}

		public RESULT getChannelsPlaying(ref int channels)
		{
			return System.FMOD_System_GetChannelsPlaying(this.systemraw, ref channels);
		}

		public RESULT getHardwareChannels(ref int numhardwarechannels)
		{
			return System.FMOD_System_GetHardwareChannels(this.systemraw, ref numhardwarechannels);
		}

		public RESULT getCPUUsage(ref float dsp, ref float stream, ref float geometry, ref float update, ref float total)
		{
			return System.FMOD_System_GetCPUUsage(this.systemraw, ref dsp, ref stream, ref geometry, ref update, ref total);
		}

		public RESULT getSoundRAM(ref int currentalloced, ref int maxalloced, ref int total)
		{
			return System.FMOD_System_GetSoundRAM(this.systemraw, ref currentalloced, ref maxalloced, ref total);
		}

		public RESULT getNumCDROMDrives(ref int numdrives)
		{
			return System.FMOD_System_GetNumCDROMDrives(this.systemraw, ref numdrives);
		}

		public RESULT getCDROMDriveName(int drive, StringBuilder drivename, int drivenamelen, StringBuilder scsiname, int scsinamelen, StringBuilder devicename, int devicenamelen)
		{
			return System.FMOD_System_GetCDROMDriveName(this.systemraw, drive, drivename, drivenamelen, scsiname, scsinamelen, devicename, devicenamelen);
		}

		public RESULT getSpectrum(float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype)
		{
			return System.FMOD_System_GetSpectrum(this.systemraw, spectrumarray, numvalues, channeloffset, windowtype);
		}

		public RESULT getWaveData(float[] wavearray, int numvalues, int channeloffset)
		{
			return System.FMOD_System_GetWaveData(this.systemraw, wavearray, numvalues, channeloffset);
		}

		public RESULT createSound(string name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			mode |= MODE.UNICODE;
			try
			{
				rESULT = System.FMOD_System_CreateSound(this.systemraw, name_or_data, mode, ref exinfo, ref raw);
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

		public RESULT createSound(byte[] data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateSound(this.systemraw, data, mode, ref exinfo, ref raw);
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

		public RESULT createSound(string name_or_data, MODE mode, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			mode |= MODE.UNICODE;
			try
			{
				rESULT = System.FMOD_System_CreateSound(this.systemraw, name_or_data, mode, 0, ref raw);
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

		public RESULT createStream(string name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			mode |= MODE.UNICODE;
			try
			{
				rESULT = System.FMOD_System_CreateStream(this.systemraw, name_or_data, mode, ref exinfo, ref raw);
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

		public RESULT createStream(byte[] data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateStream(this.systemraw, data, mode, ref exinfo, ref raw);
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

		public RESULT createStream(string name_or_data, MODE mode, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			mode |= MODE.UNICODE;
			try
			{
				rESULT = System.FMOD_System_CreateStream(this.systemraw, name_or_data, mode, 0, ref raw);
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

		public RESULT createDSP(ref DSP_DESCRIPTION description, ref DSP dsp)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateDSP(this.systemraw, ref description, ref raw);
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

		public RESULT createDSPByType(DSP_TYPE type, ref DSP dsp)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateDSPByType(this.systemraw, type, ref raw);
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

		public RESULT createChannelGroup(string name, ref ChannelGroup channelgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateChannelGroup(this.systemraw, name, ref raw);
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

		public RESULT createSoundGroup(string name, ref SoundGroup soundgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateSoundGroup(this.systemraw, name, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (soundgroup == null)
			{
				SoundGroup soundGroup = new SoundGroup();
				soundGroup.setRaw(raw);
				soundgroup = soundGroup;
			}
			else
			{
				soundgroup.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT createReverb(ref Reverb reverb)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateReverb(this.systemraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (reverb == null)
			{
				Reverb reverb2 = new Reverb();
				reverb2.setRaw(raw);
				reverb = reverb2;
			}
			else
			{
				reverb.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT playSound(CHANNELINDEX channelid, Sound sound, bool paused, ref Channel channel)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw;
			if (channel != null)
			{
				raw = channel.getRaw();
			}
			else
			{
				raw = 0;
			}
			try
			{
				rESULT = System.FMOD_System_PlaySound(this.systemraw, channelid, sound.getRaw(), paused ? 1 : 0, ref raw);
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

		public RESULT playDSP(CHANNELINDEX channelid, DSP dsp, bool paused, ref Channel channel)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw;
			if (channel != null)
			{
				raw = channel.getRaw();
			}
			else
			{
				raw = 0;
			}
			try
			{
				rESULT = System.FMOD_System_PlayDSP(this.systemraw, channelid, dsp.getRaw(), paused ? 1 : 0, ref raw);
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

		public RESULT getChannel(int channelid, ref Channel channel)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_GetChannel(this.systemraw, channelid, ref raw);
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

		public RESULT getMasterChannelGroup(ref ChannelGroup channelgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_GetMasterChannelGroup(this.systemraw, ref raw);
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

		public RESULT getMasterSoundGroup(ref SoundGroup soundgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_GetMasterSoundGroup(this.systemraw, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (soundgroup == null)
			{
				SoundGroup soundGroup = new SoundGroup();
				soundGroup.setRaw(raw);
				soundgroup = soundGroup;
			}
			else
			{
				soundgroup.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT setReverbProperties(ref REVERB_PROPERTIES prop)
		{
			return System.FMOD_System_SetReverbProperties(this.systemraw, ref prop);
		}

		public RESULT getReverbProperties(ref REVERB_PROPERTIES prop)
		{
			return System.FMOD_System_GetReverbProperties(this.systemraw, ref prop);
		}

		public RESULT setReverbAmbientProperties(ref REVERB_PROPERTIES prop)
		{
			return System.FMOD_System_SetReverbAmbientProperties(this.systemraw, ref prop);
		}

		public RESULT getReverbAmbientProperties(ref REVERB_PROPERTIES prop)
		{
			return System.FMOD_System_GetReverbAmbientProperties(this.systemraw, ref prop);
		}

		public RESULT getDSPHead(ref DSP dsp)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_GetDSPHead(this.systemraw, ref raw);
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
				rESULT = System.FMOD_System_AddDSP(this.systemraw, dsp.getRaw(), ref raw);
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

		public RESULT lockDSP()
		{
			return System.FMOD_System_LockDSP(this.systemraw);
		}

		public RESULT unlockDSP()
		{
			return System.FMOD_System_UnlockDSP(this.systemraw);
		}

		public RESULT getDSPClock(ref uint hi, ref uint lo)
		{
			return System.FMOD_System_GetDSPClock(this.systemraw, ref hi, ref lo);
		}

		public RESULT getRecordNumDrivers(ref int numdrivers)
		{
			return System.FMOD_System_GetRecordNumDrivers(this.systemraw, ref numdrivers);
		}

		public RESULT getRecordDriverInfo(int id, [MarshalAs(UnmanagedType.LPWStr)] StringBuilder name, int namelen, ref GUID guid)
		{
			return System.FMOD_System_GetRecordDriverInfoW(this.systemraw, id, name, namelen, ref guid);
		}

		public RESULT getRecordDriverCaps(int id, ref CAPS caps, ref int minfrequency, ref int maxfrequency)
		{
			return System.FMOD_System_GetRecordDriverCaps(this.systemraw, id, ref caps, ref minfrequency, ref maxfrequency);
		}

		public RESULT getRecordPosition(int id, ref uint position)
		{
			return System.FMOD_System_GetRecordPosition(this.systemraw, id, ref position);
		}

		public RESULT recordStart(int id, Sound sound, bool loop)
		{
			return System.FMOD_System_RecordStart(this.systemraw, id, sound.getRaw(), loop ? 1 : 0);
		}

		public RESULT recordStop(int id)
		{
			return System.FMOD_System_RecordStop(this.systemraw, id);
		}

		public RESULT isRecording(int id, ref bool recording)
		{
			int num = 0;
			RESULT result = System.FMOD_System_IsRecording(this.systemraw, id, ref num);
			recording = (num != 0);
			return result;
		}

		public RESULT createGeometry(int maxpolygons, int maxvertices, ref Geometry geometry)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_CreateGeometry(this.systemraw, maxpolygons, maxvertices, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (geometry == null)
			{
				Geometry geometry2 = new Geometry();
				geometry2.setRaw(raw);
				geometry = geometry2;
			}
			else
			{
				geometry.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT setGeometrySettings(float maxworldsize)
		{
			return System.FMOD_System_SetGeometrySettings(this.systemraw, maxworldsize);
		}

		public RESULT getGeometrySettings(ref float maxworldsize)
		{
			return System.FMOD_System_GetGeometrySettings(this.systemraw, ref maxworldsize);
		}

		public RESULT loadGeometry(IntPtr data, int datasize, ref Geometry geometry)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = System.FMOD_System_LoadGeometry(this.systemraw, data, datasize, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (geometry == null)
			{
				Geometry geometry2 = new Geometry();
				geometry2.setRaw(raw);
				geometry = geometry2;
			}
			else
			{
				geometry.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT getGeometryOcclusion(ref VECTOR listener, ref VECTOR source, ref float direct, ref float reverb)
		{
			return System.FMOD_System_GetGeometryOcclusion(this.systemraw, ref listener, ref source, ref direct, ref reverb);
		}

		public RESULT setNetworkProxy(string proxy)
		{
			return System.FMOD_System_SetNetworkProxy(this.systemraw, proxy);
		}

		public RESULT getNetworkProxy(StringBuilder proxy, int proxylen)
		{
			return System.FMOD_System_GetNetworkProxy(this.systemraw, proxy, proxylen);
		}

		public RESULT setNetworkTimeout(int timeout)
		{
			return System.FMOD_System_SetNetworkTimeout(this.systemraw, timeout);
		}

		public RESULT getNetworkTimeout(ref int timeout)
		{
			return System.FMOD_System_GetNetworkTimeout(this.systemraw, ref timeout);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return System.FMOD_System_SetUserData(this.systemraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return System.FMOD_System_GetUserData(this.systemraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return System.FMOD_System_GetMemoryInfo(this.systemraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Release(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetOutput(IntPtr system, OUTPUTTYPE output);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetOutput(IntPtr system, ref OUTPUTTYPE output);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetNumDrivers(IntPtr system, ref int numdrivers);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDriverInfo(IntPtr system, int id, StringBuilder name, int namelen, ref GUID guid);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDriverInfoW(IntPtr system, int id, [MarshalAs(UnmanagedType.LPWStr)] StringBuilder name, int namelen, ref GUID guid);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDriverCaps(IntPtr system, int id, ref CAPS caps, ref int controlpaneloutputrate, ref SPEAKERMODE controlpanelspeakermode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetDriver(IntPtr system, int driver);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDriver(IntPtr system, ref int driver);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetHardwareChannels(IntPtr system, int numhardwarechannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetHardwareChannels(IntPtr system, ref int numhardwarechannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetSoftwareChannels(IntPtr system, int numsoftwarechannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetSoftwareChannels(IntPtr system, ref int numsoftwarechannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetSoftwareFormat(IntPtr system, int samplerate, SOUND_FORMAT format, int numoutputchannels, int maxinputchannels, DSP_RESAMPLER resamplemethod);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetSoftwareFormat(IntPtr system, ref int samplerate, ref SOUND_FORMAT format, ref int numoutputchannels, ref int maxinputchannels, ref DSP_RESAMPLER resamplemethod, ref int bits);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetDSPBufferSize(IntPtr system, uint bufferlength, int numbuffers);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDSPBufferSize(IntPtr system, ref uint bufferlength, ref int numbuffers);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetFileSystem(IntPtr system, FILE_OPENCALLBACK useropen, FILE_CLOSECALLBACK userclose, FILE_READCALLBACK userread, FILE_SEEKCALLBACK userseek, FILE_ASYNCREADCALLBACK userasyncread, FILE_ASYNCCANCELCALLBACK userasynccancel, int blockalign);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_AttachFileSystem(IntPtr system, FILE_OPENCALLBACK useropen, FILE_CLOSECALLBACK userclose, FILE_READCALLBACK userread, FILE_SEEKCALLBACK userseek);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetPluginPath(IntPtr system, string path);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_LoadPlugin(IntPtr system, string filename, ref uint handle, uint priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_UnloadPlugin(IntPtr system, uint handle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetNumPlugins(IntPtr system, PLUGINTYPE plugintype, ref int numplugins);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetPluginHandle(IntPtr system, PLUGINTYPE plugintype, int index, ref uint handle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetPluginInfo(IntPtr system, uint handle, ref PLUGINTYPE plugintype, StringBuilder name, int namelen, ref uint version);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateDSPByPlugin(IntPtr system, uint handle, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateCodec(IntPtr system, IntPtr description, uint priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetOutputByPlugin(IntPtr system, uint handle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetOutputByPlugin(IntPtr system, ref uint handle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Init(IntPtr system, int maxchannels, INITFLAGS flags, IntPtr extradriverdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Close(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Update(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_UpdateFinished(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetAdvancedSettings(IntPtr system, ref ADVANCEDSETTINGS settings);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetAdvancedSettings(IntPtr system, ref ADVANCEDSETTINGS settings);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetSpeakerMode(IntPtr system, SPEAKERMODE speakermode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetSpeakerMode(IntPtr system, ref SPEAKERMODE speakermode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Set3DRolloffCallback(IntPtr system, CB_3D_ROLLOFFCALLBACK callback);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetCallback(IntPtr system, SYSTEM_CALLBACK callback);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Set3DSpeakerPosition(IntPtr system, SPEAKER speaker, float x, float y, int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Get3DSpeakerPosition(IntPtr system, SPEAKER speaker, ref float x, ref float y, ref int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Set3DSettings(IntPtr system, float dopplerscale, float distancefactor, float rolloffscale);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Get3DSettings(IntPtr system, ref float dopplerscale, ref float distancefactor, ref float rolloffscale);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Set3DNumListeners(IntPtr system, int numlisteners);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Get3DNumListeners(IntPtr system, ref int numlisteners);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Set3DListenerAttributes(IntPtr system, int listener, ref VECTOR pos, ref VECTOR vel, ref VECTOR forward, ref VECTOR up);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Get3DListenerAttributes(IntPtr system, int listener, ref VECTOR pos, ref VECTOR vel, ref VECTOR forward, ref VECTOR up);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetFileBufferSize(IntPtr system, int sizebytes);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetFileBufferSize(IntPtr system, ref int sizebytes);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetStreamBufferSize(IntPtr system, uint filebuffersize, TIMEUNIT filebuffersizetype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetStreamBufferSize(IntPtr system, ref uint filebuffersize, ref TIMEUNIT filebuffersizetype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetVersion(IntPtr system, ref uint version);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetOutputHandle(IntPtr system, ref IntPtr handle);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetChannelsPlaying(IntPtr system, ref int channels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetCPUUsage(IntPtr system, ref float dsp, ref float stream, ref float geometry, ref float update, ref float total);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetSoundRAM(IntPtr system, ref int currentalloced, ref int maxalloced, ref int total);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetNumCDROMDrives(IntPtr system, ref int numdrives);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetCDROMDriveName(IntPtr system, int drive, StringBuilder drivename, int drivenamelen, StringBuilder scsiname, int scsinamelen, StringBuilder devicename, int devicenamelen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetSpectrum(IntPtr system, [MarshalAs(UnmanagedType.LPArray)] float[] spectrumarray, int numvalues, int channeloffset, DSP_FFT_WINDOW windowtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetWaveData(IntPtr system, [MarshalAs(UnmanagedType.LPArray)] float[] wavearray, int numvalues, int channeloffset);

		[DllImport("fmodex", CharSet = CharSet.Unicode)]
		private static extern RESULT FMOD_System_CreateSound(IntPtr system, string name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref IntPtr sound);

		[DllImport("fmodex", CharSet = CharSet.Unicode)]
		private static extern RESULT FMOD_System_CreateStream(IntPtr system, string name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref IntPtr sound);

		[DllImport("fmodex", CharSet = CharSet.Unicode)]
		private static extern RESULT FMOD_System_CreateSound(IntPtr system, string name_or_data, MODE mode, int exinfo, ref IntPtr sound);

		[DllImport("fmodex", CharSet = CharSet.Unicode)]
		private static extern RESULT FMOD_System_CreateStream(IntPtr system, string name_or_data, MODE mode, int exinfo, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateSound(IntPtr system, byte[] name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateStream(IntPtr system, byte[] name_or_data, MODE mode, ref CREATESOUNDEXINFO exinfo, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateSound(IntPtr system, byte[] name_or_data, MODE mode, int exinfo, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateStream(IntPtr system, byte[] name_or_data, MODE mode, int exinfo, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateDSP(IntPtr system, ref DSP_DESCRIPTION description, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateDSPByType(IntPtr system, DSP_TYPE type, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateChannelGroup(IntPtr system, string name, ref IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateSoundGroup(IntPtr system, string name, ref IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateReverb(IntPtr system, ref IntPtr reverb);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_PlaySound(IntPtr system, CHANNELINDEX channelid, IntPtr sound, int paused, ref IntPtr channel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_PlayDSP(IntPtr system, CHANNELINDEX channelid, IntPtr dsp, int paused, ref IntPtr channel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetChannel(IntPtr system, int channelid, ref IntPtr channel);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetMasterChannelGroup(IntPtr system, ref IntPtr channelgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetMasterSoundGroup(IntPtr system, ref IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetReverbProperties(IntPtr system, ref REVERB_PROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetReverbProperties(IntPtr system, ref REVERB_PROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetReverbAmbientProperties(IntPtr system, ref REVERB_PROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetReverbAmbientProperties(IntPtr system, ref REVERB_PROPERTIES prop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDSPHead(IntPtr system, ref IntPtr dsp);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_AddDSP(IntPtr system, IntPtr dsp, ref IntPtr connection);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_LockDSP(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_UnlockDSP(IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetDSPClock(IntPtr system, ref uint hi, ref uint lo);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetRecordNumDrivers(IntPtr system, ref int numdrivers);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetRecordDriverInfo(IntPtr system, int id, StringBuilder name, int namelen, ref GUID guid);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetRecordDriverInfoW(IntPtr system, int id, [MarshalAs(UnmanagedType.LPWStr)] StringBuilder name, int namelen, ref GUID guid);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetRecordDriverCaps(IntPtr system, int id, ref CAPS caps, ref int minfrequency, ref int maxfrequency);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetRecordPosition(IntPtr system, int id, ref uint position);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_RecordStart(IntPtr system, int id, IntPtr sound, int loop);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_RecordStop(IntPtr system, int id);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_IsRecording(IntPtr system, int id, ref int recording);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_CreateGeometry(IntPtr system, int maxpolygons, int maxvertices, ref IntPtr geometry);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetGeometrySettings(IntPtr system, float maxworldsize);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetGeometrySettings(IntPtr system, ref float maxworldsize);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_LoadGeometry(IntPtr system, IntPtr data, int datasize, ref IntPtr geometry);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetGeometryOcclusion(IntPtr system, ref VECTOR listener, ref VECTOR source, ref float direct, ref float reverb);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetNetworkProxy(IntPtr system, string proxy);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetNetworkProxy(IntPtr system, StringBuilder proxy, int proxylen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetNetworkTimeout(IntPtr system, int timeout);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetNetworkTimeout(IntPtr system, ref int timeout);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_SetUserData(IntPtr system, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetUserData(IntPtr system, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_GetMemoryInfo(IntPtr system, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr system)
		{
			this.systemraw = 0;
			this.systemraw = system;
		}

		public IntPtr getRaw()
		{
			return this.systemraw;
		}
	}
}
