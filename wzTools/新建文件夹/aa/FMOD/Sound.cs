using System;
using System.Runtime.InteropServices;
using System.Text;

namespace FMOD
{
	public class Sound
	{
		private IntPtr soundraw;

		public RESULT release()
		{
			return Sound.FMOD_Sound_Release(this.soundraw);
		}

		public RESULT getSystemObject(ref System system)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Sound.FMOD_Sound_GetSystemObject(this.soundraw, ref raw);
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

		public RESULT @lock(uint offset, uint length, ref IntPtr ptr1, ref IntPtr ptr2, ref uint len1, ref uint len2)
		{
			return Sound.FMOD_Sound_Lock(this.soundraw, offset, length, ref ptr1, ref ptr2, ref len1, ref len2);
		}

		public RESULT unlock(IntPtr ptr1, IntPtr ptr2, uint len1, uint len2)
		{
			return Sound.FMOD_Sound_Unlock(this.soundraw, ptr1, ptr2, len1, len2);
		}

		public RESULT setDefaults(float frequency, float volume, float pan, int priority)
		{
			return Sound.FMOD_Sound_SetDefaults(this.soundraw, frequency, volume, pan, priority);
		}

		public RESULT getDefaults(ref float frequency, ref float volume, ref float pan, ref int priority)
		{
			return Sound.FMOD_Sound_GetDefaults(this.soundraw, ref frequency, ref volume, ref pan, ref priority);
		}

		public RESULT setVariations(float frequencyvar, float volumevar, float panvar)
		{
			return Sound.FMOD_Sound_SetVariations(this.soundraw, frequencyvar, volumevar, panvar);
		}

		public RESULT getVariations(ref float frequencyvar, ref float volumevar, ref float panvar)
		{
			return Sound.FMOD_Sound_GetVariations(this.soundraw, ref frequencyvar, ref volumevar, ref panvar);
		}

		public RESULT set3DMinMaxDistance(float min, float max)
		{
			return Sound.FMOD_Sound_Set3DMinMaxDistance(this.soundraw, min, max);
		}

		public RESULT get3DMinMaxDistance(ref float min, ref float max)
		{
			return Sound.FMOD_Sound_Get3DMinMaxDistance(this.soundraw, ref min, ref max);
		}

		public RESULT set3DConeSettings(float insideconeangle, float outsideconeangle, float outsidevolume)
		{
			return Sound.FMOD_Sound_Set3DConeSettings(this.soundraw, insideconeangle, outsideconeangle, outsidevolume);
		}

		public RESULT get3DConeSettings(ref float insideconeangle, ref float outsideconeangle, ref float outsidevolume)
		{
			return Sound.FMOD_Sound_Get3DConeSettings(this.soundraw, ref insideconeangle, ref outsideconeangle, ref outsidevolume);
		}

		public RESULT set3DCustomRolloff(ref VECTOR points, int numpoints)
		{
			return Sound.FMOD_Sound_Set3DCustomRolloff(this.soundraw, ref points, numpoints);
		}

		public RESULT get3DCustomRolloff(ref IntPtr points, ref int numpoints)
		{
			return Sound.FMOD_Sound_Get3DCustomRolloff(this.soundraw, ref points, ref numpoints);
		}

		public RESULT setSubSound(int index, Sound subsound)
		{
			IntPtr raw = subsound.getRaw();
			return Sound.FMOD_Sound_SetSubSound(this.soundraw, index, raw);
		}

		public RESULT getSubSound(int index, ref Sound subsound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Sound.FMOD_Sound_GetSubSound(this.soundraw, index, ref raw);
			}
			catch
			{
				rESULT = RESULT.ERR_INVALID_PARAM;
			}
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			if (subsound == null)
			{
				Sound sound = new Sound();
				sound.setRaw(raw);
				subsound = sound;
			}
			else
			{
				subsound.setRaw(raw);
			}
			return rESULT;
		}

		public RESULT setSubSoundSentence(int[] subsoundlist, int numsubsounds)
		{
			return Sound.FMOD_Sound_SetSubSoundSentence(this.soundraw, subsoundlist, numsubsounds);
		}

		public RESULT getName(StringBuilder name, int namelen)
		{
			return Sound.FMOD_Sound_GetName(this.soundraw, name, namelen);
		}

		public RESULT getLength(ref uint length, TIMEUNIT lengthtype)
		{
			return Sound.FMOD_Sound_GetLength(this.soundraw, ref length, lengthtype);
		}

		public RESULT getFormat(ref SOUND_TYPE type, ref SOUND_FORMAT format, ref int channels, ref int bits)
		{
			return Sound.FMOD_Sound_GetFormat(this.soundraw, ref type, ref format, ref channels, ref bits);
		}

		public RESULT getNumSubSounds(ref int numsubsounds)
		{
			return Sound.FMOD_Sound_GetNumSubSounds(this.soundraw, ref numsubsounds);
		}

		public RESULT getNumTags(ref int numtags, ref int numtagsupdated)
		{
			return Sound.FMOD_Sound_GetNumTags(this.soundraw, ref numtags, ref numtagsupdated);
		}

		public RESULT getTag(string name, int index, ref TAG tag)
		{
			return Sound.FMOD_Sound_GetTag(this.soundraw, name, index, ref tag);
		}

		public RESULT getOpenState(ref OPENSTATE openstate, ref uint percentbuffered, ref bool starving, ref bool diskbusy)
		{
			int num = 0;
			int num2 = 0;
			RESULT result = Sound.FMOD_Sound_GetOpenState(this.soundraw, ref openstate, ref percentbuffered, ref num, ref num2);
			starving = (num != 0);
			diskbusy = (num2 != 0);
			return result;
		}

		public RESULT readData(IntPtr buffer, uint lenbytes, ref uint read)
		{
			return Sound.FMOD_Sound_ReadData(this.soundraw, buffer, lenbytes, ref read);
		}

		public RESULT seekData(uint pcm)
		{
			return Sound.FMOD_Sound_SeekData(this.soundraw, pcm);
		}

		public RESULT setSoundGroup(SoundGroup soundgroup)
		{
			return Sound.FMOD_Sound_SetSoundGroup(this.soundraw, soundgroup.getRaw());
		}

		public RESULT getSoundGroup(ref SoundGroup soundgroup)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = Sound.FMOD_Sound_GetSoundGroup(this.soundraw, ref raw);
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

		public RESULT getNumSyncPoints(ref int numsyncpoints)
		{
			return Sound.FMOD_Sound_GetNumSyncPoints(this.soundraw, ref numsyncpoints);
		}

		public RESULT getSyncPoint(int index, ref IntPtr point)
		{
			return Sound.FMOD_Sound_GetSyncPoint(this.soundraw, index, ref point);
		}

		public RESULT getSyncPointInfo(IntPtr point, StringBuilder name, int namelen, ref uint offset, TIMEUNIT offsettype)
		{
			return Sound.FMOD_Sound_GetSyncPointInfo(this.soundraw, point, name, namelen, ref offset, offsettype);
		}

		public RESULT addSyncPoint(uint offset, TIMEUNIT offsettype, string name, ref IntPtr point)
		{
			return Sound.FMOD_Sound_AddSyncPoint(this.soundraw, offset, offsettype, name, ref point);
		}

		public RESULT deleteSyncPoint(IntPtr point)
		{
			return Sound.FMOD_Sound_DeleteSyncPoint(this.soundraw, point);
		}

		public RESULT setMode(MODE mode)
		{
			return Sound.FMOD_Sound_SetMode(this.soundraw, mode);
		}

		public RESULT getMode(ref MODE mode)
		{
			return Sound.FMOD_Sound_GetMode(this.soundraw, ref mode);
		}

		public RESULT setLoopCount(int loopcount)
		{
			return Sound.FMOD_Sound_SetLoopCount(this.soundraw, loopcount);
		}

		public RESULT getLoopCount(ref int loopcount)
		{
			return Sound.FMOD_Sound_GetLoopCount(this.soundraw, ref loopcount);
		}

		public RESULT setLoopPoints(uint loopstart, TIMEUNIT loopstarttype, uint loopend, TIMEUNIT loopendtype)
		{
			return Sound.FMOD_Sound_SetLoopPoints(this.soundraw, loopstart, loopstarttype, loopend, loopendtype);
		}

		public RESULT getLoopPoints(ref uint loopstart, TIMEUNIT loopstarttype, ref uint loopend, TIMEUNIT loopendtype)
		{
			return Sound.FMOD_Sound_GetLoopPoints(this.soundraw, ref loopstart, loopstarttype, ref loopend, loopendtype);
		}

		public RESULT getMusicNumChannels(ref int numchannels)
		{
			return Sound.FMOD_Sound_GetMusicNumChannels(this.soundraw, ref numchannels);
		}

		public RESULT setMusicChannelVolume(int channel, float volume)
		{
			return Sound.FMOD_Sound_SetMusicChannelVolume(this.soundraw, channel, volume);
		}

		public RESULT getMusicChannelVolume(int channel, ref float volume)
		{
			return Sound.FMOD_Sound_GetMusicChannelVolume(this.soundraw, channel, ref volume);
		}

		public RESULT setMusicSpeed(float speed)
		{
			return Sound.FMOD_Sound_SetMusicSpeed(this.soundraw, speed);
		}

		public RESULT getMusicSpeed(ref float speed)
		{
			return Sound.FMOD_Sound_GetMusicSpeed(this.soundraw, ref speed);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return Sound.FMOD_Sound_SetUserData(this.soundraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return Sound.FMOD_Sound_GetUserData(this.soundraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return Sound.FMOD_Sound_GetMemoryInfo(this.soundraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Release(IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetSystemObject(IntPtr sound, ref IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Lock(IntPtr sound, uint offset, uint length, ref IntPtr ptr1, ref IntPtr ptr2, ref uint len1, ref uint len2);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Unlock(IntPtr sound, IntPtr ptr1, IntPtr ptr2, uint len1, uint len2);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetDefaults(IntPtr sound, float frequency, float volume, float pan, int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetDefaults(IntPtr sound, ref float frequency, ref float volume, ref float pan, ref int priority);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetVariations(IntPtr sound, float frequencyvar, float volumevar, float panvar);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetVariations(IntPtr sound, ref float frequencyvar, ref float volumevar, ref float panvar);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Set3DMinMaxDistance(IntPtr sound, float min, float max);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Get3DMinMaxDistance(IntPtr sound, ref float min, ref float max);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Set3DConeSettings(IntPtr sound, float insideconeangle, float outsideconeangle, float outsidevolume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Get3DConeSettings(IntPtr sound, ref float insideconeangle, ref float outsideconeangle, ref float outsidevolume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Set3DCustomRolloff(IntPtr sound, ref VECTOR points, int numpoints);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_Get3DCustomRolloff(IntPtr sound, ref IntPtr points, ref int numpoints);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetSubSound(IntPtr sound, int index, IntPtr subsound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetSubSound(IntPtr sound, int index, ref IntPtr subsound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetSubSoundSentence(IntPtr sound, int[] subsoundlist, int numsubsounds);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetName(IntPtr sound, StringBuilder name, int namelen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetLength(IntPtr sound, ref uint length, TIMEUNIT lengthtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetFormat(IntPtr sound, ref SOUND_TYPE type, ref SOUND_FORMAT format, ref int channels, ref int bits);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetNumSubSounds(IntPtr sound, ref int numsubsounds);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetNumTags(IntPtr sound, ref int numtags, ref int numtagsupdated);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetTag(IntPtr sound, string name, int index, ref TAG tag);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetOpenState(IntPtr sound, ref OPENSTATE openstate, ref uint percentbuffered, ref int starving, ref int diskbusy);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_ReadData(IntPtr sound, IntPtr buffer, uint lenbytes, ref uint read);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SeekData(IntPtr sound, uint pcm);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetSoundGroup(IntPtr sound, IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetSoundGroup(IntPtr sound, ref IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetNumSyncPoints(IntPtr sound, ref int numsyncpoints);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetSyncPoint(IntPtr sound, int index, ref IntPtr point);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetSyncPointInfo(IntPtr sound, IntPtr point, StringBuilder name, int namelen, ref uint offset, TIMEUNIT offsettype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_AddSyncPoint(IntPtr sound, uint offset, TIMEUNIT offsettype, string name, ref IntPtr point);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_DeleteSyncPoint(IntPtr sound, IntPtr point);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetMode(IntPtr sound, MODE mode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetMode(IntPtr sound, ref MODE mode);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetLoopCount(IntPtr sound, int loopcount);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetLoopCount(IntPtr sound, ref int loopcount);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetLoopPoints(IntPtr sound, uint loopstart, TIMEUNIT loopstarttype, uint loopend, TIMEUNIT loopendtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetLoopPoints(IntPtr sound, ref uint loopstart, TIMEUNIT loopstarttype, ref uint loopend, TIMEUNIT loopendtype);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetMusicNumChannels(IntPtr sound, ref int numchannels);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetMusicChannelVolume(IntPtr sound, int channel, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetMusicChannelVolume(IntPtr sound, int channel, ref float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetMusicSpeed(IntPtr sound, float speed);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetMusicSpeed(IntPtr sound, ref float speed);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_SetUserData(IntPtr sound, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetUserData(IntPtr sound, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Sound_GetMemoryInfo(IntPtr sound, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr sound)
		{
			this.soundraw = 0;
			this.soundraw = sound;
		}

		public IntPtr getRaw()
		{
			return this.soundraw;
		}
	}
}
