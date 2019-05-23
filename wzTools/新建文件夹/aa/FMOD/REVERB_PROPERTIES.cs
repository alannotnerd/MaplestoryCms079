using System;

namespace FMOD
{
	public struct REVERB_PROPERTIES
	{
		public int Instance;

		public int Environment;

		public float EnvDiffusion;

		public int Room;

		public int RoomHF;

		public int RoomLF;

		public float DecayTime;

		public float DecayHFRatio;

		public float DecayLFRatio;

		public int Reflections;

		public float ReflectionsDelay;

		public int Reverb;

		public float ReverbDelay;

		public float ModulationTime;

		public float ModulationDepth;

		public float HFReference;

		public float LFReference;

		public float Diffusion;

		public float Density;

		public uint Flags;

		public REVERB_PROPERTIES(int instance, int environment, float envDiffusion, int room, int roomHF, int roomLF, float decayTime, float decayHFRatio, float decayLFRatio, int reflections, float reflectionsDelay, int reverb, float reverbDelay, float modulationTime, float modulationDepth, float hfReference, float lfReference, float diffusion, float density, uint flags)
		{
			this.Instance = instance;
			this.Environment = environment;
			this.EnvDiffusion = envDiffusion;
			this.Room = room;
			this.RoomHF = roomHF;
			this.RoomLF = roomLF;
			this.DecayTime = decayTime;
			this.DecayHFRatio = decayHFRatio;
			this.DecayLFRatio = decayLFRatio;
			this.Reflections = reflections;
			this.ReflectionsDelay = reflectionsDelay;
			this.Reverb = reverb;
			this.ReverbDelay = reverbDelay;
			this.ModulationTime = modulationTime;
			this.ModulationDepth = modulationDepth;
			this.HFReference = hfReference;
			this.LFReference = lfReference;
			this.Diffusion = diffusion;
			this.Density = density;
			this.Flags = flags;
		}
	}
}
