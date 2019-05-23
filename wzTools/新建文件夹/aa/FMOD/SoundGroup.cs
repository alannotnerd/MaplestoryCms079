using System;
using System.Runtime.InteropServices;
using System.Text;

namespace FMOD
{
	public class SoundGroup
	{
		private IntPtr soundgroupraw;

		public RESULT release()
		{
			return SoundGroup.FMOD_SoundGroup_Release(this.soundgroupraw);
		}

		public RESULT getSystemObject(ref System system)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = SoundGroup.FMOD_SoundGroup_GetSystemObject(this.soundgroupraw, ref raw);
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

		public RESULT setMaxAudible(int maxaudible)
		{
			return SoundGroup.FMOD_SoundGroup_SetMaxAudible(this.soundgroupraw, maxaudible);
		}

		public RESULT getMaxAudible(ref int maxaudible)
		{
			return SoundGroup.FMOD_SoundGroup_GetMaxAudible(this.soundgroupraw, ref maxaudible);
		}

		public RESULT setMaxAudibleBehavior(SOUNDGROUP_BEHAVIOR behavior)
		{
			return SoundGroup.FMOD_SoundGroup_SetMaxAudibleBehavior(this.soundgroupraw, behavior);
		}

		public RESULT getMaxAudibleBehavior(ref SOUNDGROUP_BEHAVIOR behavior)
		{
			return SoundGroup.FMOD_SoundGroup_GetMaxAudibleBehavior(this.soundgroupraw, ref behavior);
		}

		public RESULT setMuteFadeSpeed(float speed)
		{
			return SoundGroup.FMOD_SoundGroup_SetMuteFadeSpeed(this.soundgroupraw, speed);
		}

		public RESULT getMuteFadeSpeed(ref float speed)
		{
			return SoundGroup.FMOD_SoundGroup_GetMuteFadeSpeed(this.soundgroupraw, ref speed);
		}

		public RESULT setVolume(float volume)
		{
			return SoundGroup.FMOD_SoundGroup_SetVolume(this.soundgroupraw, volume);
		}

		public RESULT getVolume(ref float volume)
		{
			return SoundGroup.FMOD_SoundGroup_GetVolume(this.soundgroupraw, ref volume);
		}

		public RESULT stop()
		{
			return SoundGroup.FMOD_SoundGroup_Stop(this.soundgroupraw);
		}

		public RESULT getName(StringBuilder name, int namelen)
		{
			return SoundGroup.FMOD_SoundGroup_GetName(this.soundgroupraw, name, namelen);
		}

		public RESULT getNumSounds(ref int numsounds)
		{
			return SoundGroup.FMOD_SoundGroup_GetNumSounds(this.soundgroupraw, ref numsounds);
		}

		public RESULT getSound(int index, ref Sound sound)
		{
			RESULT rESULT = RESULT.OK;
			IntPtr raw = 0;
			try
			{
				rESULT = SoundGroup.FMOD_SoundGroup_GetSound(this.soundgroupraw, index, ref raw);
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

		public RESULT getNumPlaying(ref int numplaying)
		{
			return SoundGroup.FMOD_SoundGroup_GetNumPlaying(this.soundgroupraw, ref numplaying);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return SoundGroup.FMOD_SoundGroup_SetUserData(this.soundgroupraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return SoundGroup.FMOD_SoundGroup_GetUserData(this.soundgroupraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return SoundGroup.FMOD_SoundGroup_GetMemoryInfo(this.soundgroupraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_Release(IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetSystemObject(IntPtr soundgroup, ref IntPtr system);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_SetMaxAudible(IntPtr soundgroup, int maxaudible);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetMaxAudible(IntPtr soundgroup, ref int maxaudible);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_SetMaxAudibleBehavior(IntPtr soundgroup, SOUNDGROUP_BEHAVIOR behavior);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetMaxAudibleBehavior(IntPtr soundgroup, ref SOUNDGROUP_BEHAVIOR behavior);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_SetMuteFadeSpeed(IntPtr soundgroup, float speed);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetMuteFadeSpeed(IntPtr soundgroup, ref float speed);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_SetVolume(IntPtr soundgroup, float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetVolume(IntPtr soundgroup, ref float volume);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_Stop(IntPtr soundgroup);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetName(IntPtr soundgroup, StringBuilder name, int namelen);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetNumSounds(IntPtr soundgroup, ref int numsounds);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetSound(IntPtr soundgroup, int index, ref IntPtr sound);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetNumPlaying(IntPtr soundgroup, ref int numplaying);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_SetUserData(IntPtr soundgroup, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetUserData(IntPtr soundgroup, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_SoundGroup_GetMemoryInfo(IntPtr soundgroup, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr soundgroup)
		{
			this.soundgroupraw = 0;
			this.soundgroupraw = soundgroup;
		}

		public IntPtr getRaw()
		{
			return this.soundgroupraw;
		}
	}
}
