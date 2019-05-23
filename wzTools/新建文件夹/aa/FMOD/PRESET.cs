using System;

namespace FMOD
{
	internal class PRESET
	{
		public REVERB_PROPERTIES OFF()
		{
			return new REVERB_PROPERTIES(0, -1, 1f, -10000, -10000, 0, 1f, 1f, 1f, -2602, 0.007f, 200, 0.011f, 0.25f, 0f, 5000f, 250f, 0f, 0f, 831u);
		}

		public REVERB_PROPERTIES GENERIC()
		{
			return new REVERB_PROPERTIES(0, 0, 1f, -1000, -100, 0, 1.49f, 0.83f, 1f, -2602, 0.007f, 200, 0.011f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES PADDEDCELL()
		{
			return new REVERB_PROPERTIES(0, 1, 1f, -1000, -6000, 0, 0.17f, 0.1f, 1f, -1204, 0.001f, 207, 0.002f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES ROOM()
		{
			return new REVERB_PROPERTIES(0, 2, 1f, -1000, -454, 0, 0.4f, 0.83f, 1f, -1646, 0.002f, 53, 0.003f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES BATHROOM()
		{
			return new REVERB_PROPERTIES(0, 3, 1f, -1000, -1200, 0, 1.49f, 0.54f, 1f, -370, 0.007f, 1030, 0.011f, 0.25f, 0f, 5000f, 250f, 100f, 60f, 63u);
		}

		public REVERB_PROPERTIES LIVINGROOM()
		{
			return new REVERB_PROPERTIES(0, 4, 1f, -1000, -6000, 0, 0.5f, 0.1f, 1f, -1376, 0.003f, -1104, 0.004f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES STONEROOM()
		{
			return new REVERB_PROPERTIES(0, 5, 1f, -1000, -300, 0, 2.31f, 0.64f, 1f, -711, 0.012f, 83, 0.017f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES AUDITORIUM()
		{
			return new REVERB_PROPERTIES(0, 6, 1f, -1000, -476, 0, 4.32f, 0.59f, 1f, -789, 0.02f, -289, 0.03f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES CONCERTHALL()
		{
			return new REVERB_PROPERTIES(0, 7, 1f, -1000, -500, 0, 3.92f, 0.7f, 1f, -1230, 0.02f, -2, 0.029f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES CAVE()
		{
			return new REVERB_PROPERTIES(0, 8, 1f, -1000, 0, 0, 2.91f, 1.3f, 1f, -602, 0.015f, -302, 0.022f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 31u);
		}

		public REVERB_PROPERTIES ARENA()
		{
			return new REVERB_PROPERTIES(0, 9, 1f, -1000, -698, 0, 7.24f, 0.33f, 1f, -1166, 0.02f, 16, 0.03f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES HANGAR()
		{
			return new REVERB_PROPERTIES(0, 10, 1f, -1000, -1000, 0, 10.05f, 0.23f, 1f, -602, 0.02f, 198, 0.03f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES CARPETTEDHALLWAY()
		{
			return new REVERB_PROPERTIES(0, 11, 1f, -1000, -4000, 0, 0.3f, 0.1f, 1f, -1831, 0.002f, -1630, 0.03f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES HALLWAY()
		{
			return new REVERB_PROPERTIES(0, 12, 1f, -1000, -300, 0, 1.49f, 0.59f, 1f, -1219, 0.007f, 441, 0.011f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES STONECORRIDOR()
		{
			return new REVERB_PROPERTIES(0, 13, 1f, -1000, -237, 0, 2.7f, 0.79f, 1f, -1214, 0.013f, 395, 0.02f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES ALLEY()
		{
			return new REVERB_PROPERTIES(0, 14, 0.3f, -1000, -270, 0, 1.49f, 0.86f, 1f, -1204, 0.007f, -4, 0.011f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES FOREST()
		{
			return new REVERB_PROPERTIES(0, 15, 0.3f, -1000, -3300, 0, 1.49f, 0.54f, 1f, -2560, 0.162f, -229, 0.088f, 0.25f, 0f, 5000f, 250f, 79f, 100f, 63u);
		}

		public REVERB_PROPERTIES CITY()
		{
			return new REVERB_PROPERTIES(0, 16, 0.5f, -1000, -800, 0, 1.49f, 0.67f, 1f, -2273, 0.007f, -1691, 0.011f, 0.25f, 0f, 5000f, 250f, 50f, 100f, 63u);
		}

		public REVERB_PROPERTIES MOUNTAINS()
		{
			return new REVERB_PROPERTIES(0, 17, 0.27f, -1000, -2500, 0, 1.49f, 0.21f, 1f, -2780, 0.3f, -1434, 0.1f, 0.25f, 0f, 5000f, 250f, 27f, 100f, 31u);
		}

		public REVERB_PROPERTIES QUARRY()
		{
			return new REVERB_PROPERTIES(0, 18, 1f, -1000, -1000, 0, 1.49f, 0.83f, 1f, -10000, 0.061f, 500, 0.025f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 63u);
		}

		public REVERB_PROPERTIES PLAIN()
		{
			return new REVERB_PROPERTIES(0, 19, 0.21f, -1000, -2000, 0, 1.49f, 0.5f, 1f, -2466, 0.179f, -1926, 0.1f, 0.25f, 0f, 5000f, 250f, 21f, 100f, 63u);
		}

		public REVERB_PROPERTIES PARKINGLOT()
		{
			return new REVERB_PROPERTIES(0, 20, 1f, -1000, 0, 0, 1.65f, 1.5f, 1f, -1363, 0.008f, -1153, 0.012f, 0.25f, 0f, 5000f, 250f, 100f, 100f, 31u);
		}

		public REVERB_PROPERTIES SEWERPIPE()
		{
			return new REVERB_PROPERTIES(0, 21, 0.8f, -1000, -1000, 0, 2.81f, 0.14f, 1f, 429, 0.014f, 1023, 0.021f, 0.25f, 0f, 5000f, 250f, 80f, 60f, 63u);
		}

		public REVERB_PROPERTIES UNDERWATER()
		{
			return new REVERB_PROPERTIES(0, 22, 1f, -1000, -4000, 0, 1.49f, 0.1f, 1f, -449, 0.007f, 1700, 0.011f, 1.18f, 0.348f, 5000f, 250f, 100f, 100f, 63u);
		}
	}
}
