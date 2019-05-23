using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class Factory
	{
		public static RESULT System_Create(ref System system)
		{
			if (IntPtr.Size != 4)
			{
				return RESULT.ERR_FILE_BAD;
			}
			IntPtr raw = 0;
			RESULT rESULT = Factory.FMOD_System_Create(ref raw);
			if (rESULT != RESULT.OK)
			{
				return rESULT;
			}
			System system2 = new System();
			system2.setRaw(raw);
			system = system2;
			return rESULT;
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_System_Create(ref IntPtr system);
	}
}
