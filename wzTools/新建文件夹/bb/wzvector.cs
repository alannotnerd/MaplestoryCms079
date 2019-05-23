using System;

public class wzvector
{
	private int[] properties;

	public int x
	{
		get
		{
			return this.properties[0];
		}
	}

	public int y
	{
		get
		{
			return this.properties[1];
		}
	}

	public string content
	{
		get
		{
			return this.properties[0] + "," + this.properties[1];
		}
	}

	public wzvector(int x, int y)
	{
		this.properties = new int[]
		{
			x,
			y
		};
	}

	public static wzvector operator +(wzvector a, wzvector b)
	{
		if (a == null)
		{
			a = new wzvector(0, 0);
		}
		if (b == null)
		{
			b = new wzvector(0, 0);
		}
		return new wzvector(a.x + b.x, a.y + b.y);
	}

	public static wzvector operator -(wzvector a, wzvector b)
	{
		if (a == null)
		{
			a = new wzvector(0, 0);
		}
		if (b == null)
		{
			b = new wzvector(0, 0);
		}
		return new wzvector(a.x - b.x, a.y - b.y);
	}
}
