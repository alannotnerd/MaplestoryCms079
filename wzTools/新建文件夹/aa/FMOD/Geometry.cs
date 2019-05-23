using System;
using System.Runtime.InteropServices;

namespace FMOD
{
	public class Geometry
	{
		private IntPtr geometryraw;

		public RESULT release()
		{
			return Geometry.FMOD_Geometry_Release(this.geometryraw);
		}

		public RESULT addPolygon(float directocclusion, float reverbocclusion, bool doublesided, int numvertices, VECTOR[] vertices, ref int polygonindex)
		{
			return Geometry.FMOD_Geometry_AddPolygon(this.geometryraw, directocclusion, reverbocclusion, doublesided ? 1 : 0, numvertices, vertices, ref polygonindex);
		}

		public RESULT getNumPolygons(ref int numpolygons)
		{
			return Geometry.FMOD_Geometry_GetNumPolygons(this.geometryraw, ref numpolygons);
		}

		public RESULT getMaxPolygons(ref int maxpolygons, ref int maxvertices)
		{
			return Geometry.FMOD_Geometry_GetMaxPolygons(this.geometryraw, ref maxpolygons, ref maxvertices);
		}

		public RESULT getPolygonNumVertices(int index, ref int numvertices)
		{
			return Geometry.FMOD_Geometry_GetPolygonNumVertices(this.geometryraw, index, ref numvertices);
		}

		public RESULT setPolygonVertex(int index, int vertexindex, ref VECTOR vertex)
		{
			return Geometry.FMOD_Geometry_SetPolygonVertex(this.geometryraw, index, vertexindex, ref vertex);
		}

		public RESULT getPolygonVertex(int index, int vertexindex, ref VECTOR vertex)
		{
			return Geometry.FMOD_Geometry_GetPolygonVertex(this.geometryraw, index, vertexindex, ref vertex);
		}

		public RESULT setPolygonAttributes(int index, float directocclusion, float reverbocclusion, bool doublesided)
		{
			return Geometry.FMOD_Geometry_SetPolygonAttributes(this.geometryraw, index, directocclusion, reverbocclusion, doublesided ? 1 : 0);
		}

		public RESULT getPolygonAttributes(int index, ref float directocclusion, ref float reverbocclusion, ref bool doublesided)
		{
			int num = 0;
			RESULT result = Geometry.FMOD_Geometry_GetPolygonAttributes(this.geometryraw, index, ref directocclusion, ref reverbocclusion, ref num);
			doublesided = (num != 0);
			return result;
		}

		public RESULT setActive(bool active)
		{
			return Geometry.FMOD_Geometry_SetActive(this.geometryraw, active ? 1 : 0);
		}

		public RESULT getActive(ref bool active)
		{
			int num = 0;
			RESULT result = Geometry.FMOD_Geometry_GetActive(this.geometryraw, ref num);
			active = (num != 0);
			return result;
		}

		public RESULT setRotation(ref VECTOR forward, ref VECTOR up)
		{
			return Geometry.FMOD_Geometry_SetRotation(this.geometryraw, ref forward, ref up);
		}

		public RESULT getRotation(ref VECTOR forward, ref VECTOR up)
		{
			return Geometry.FMOD_Geometry_GetRotation(this.geometryraw, ref forward, ref up);
		}

		public RESULT setPosition(ref VECTOR position)
		{
			return Geometry.FMOD_Geometry_SetPosition(this.geometryraw, ref position);
		}

		public RESULT getPosition(ref VECTOR position)
		{
			return Geometry.FMOD_Geometry_GetPosition(this.geometryraw, ref position);
		}

		public RESULT setScale(ref VECTOR scale)
		{
			return Geometry.FMOD_Geometry_SetScale(this.geometryraw, ref scale);
		}

		public RESULT getScale(ref VECTOR scale)
		{
			return Geometry.FMOD_Geometry_GetScale(this.geometryraw, ref scale);
		}

		public RESULT save(IntPtr data, ref int datasize)
		{
			return Geometry.FMOD_Geometry_Save(this.geometryraw, data, ref datasize);
		}

		public RESULT setUserData(IntPtr userdata)
		{
			return Geometry.FMOD_Geometry_SetUserData(this.geometryraw, userdata);
		}

		public RESULT getUserData(ref IntPtr userdata)
		{
			return Geometry.FMOD_Geometry_GetUserData(this.geometryraw, ref userdata);
		}

		public RESULT getMemoryInfo(uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details)
		{
			return Geometry.FMOD_Geometry_GetMemoryInfo(this.geometryraw, memorybits, event_memorybits, ref memoryused, ref memoryused_details);
		}

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_Release(IntPtr geometry);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_AddPolygon(IntPtr geometry, float directocclusion, float reverbocclusion, int doublesided, int numvertices, VECTOR[] vertices, ref int polygonindex);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetNumPolygons(IntPtr geometry, ref int numpolygons);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetMaxPolygons(IntPtr geometry, ref int maxpolygons, ref int maxvertices);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetPolygonNumVertices(IntPtr geometry, int index, ref int numvertices);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetPolygonVertex(IntPtr geometry, int index, int vertexindex, ref VECTOR vertex);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetPolygonVertex(IntPtr geometry, int index, int vertexindex, ref VECTOR vertex);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetPolygonAttributes(IntPtr geometry, int index, float directocclusion, float reverbocclusion, int doublesided);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetPolygonAttributes(IntPtr geometry, int index, ref float directocclusion, ref float reverbocclusion, ref int doublesided);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_Flush(IntPtr geometry);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetActive(IntPtr geometry, int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetActive(IntPtr geometry, ref int active);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetRotation(IntPtr geometry, ref VECTOR forward, ref VECTOR up);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetRotation(IntPtr geometry, ref VECTOR forward, ref VECTOR up);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetPosition(IntPtr geometry, ref VECTOR position);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetPosition(IntPtr geometry, ref VECTOR position);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetScale(IntPtr geometry, ref VECTOR scale);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetScale(IntPtr geometry, ref VECTOR scale);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_Save(IntPtr geometry, IntPtr data, ref int datasize);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_SetUserData(IntPtr geometry, IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetUserData(IntPtr geometry, ref IntPtr userdata);

		[DllImport("fmodex")]
		private static extern RESULT FMOD_Geometry_GetMemoryInfo(IntPtr geometry, uint memorybits, uint event_memorybits, ref uint memoryused, ref MEMORY_USAGE_DETAILS memoryused_details);

		public void setRaw(IntPtr geometry)
		{
			this.geometryraw = 0;
			this.geometryraw = geometry;
		}

		public IntPtr getRaw()
		{
			return this.geometryraw;
		}
	}
}
