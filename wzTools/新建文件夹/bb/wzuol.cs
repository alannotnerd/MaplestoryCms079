using System;

public class wzuol
{
	private object[] properties;

	public string link
	{
		get
		{
			return this.properties[1] as string;
		}
	}

	private wzproperty proprietor
	{
		get
		{
			return this.properties[2] as wzproperty;
		}
	}

	public wzproperty target
	{
		get
		{
			wzproperty proprietor = this.proprietor.proprietor;
			string[] array = this.link.Split(new char[]
			{
				'/'
			});
			for (int i = 0; i < array.Length; i++)
			{
				string text = array[i];
				if (".." == text)
				{
					proprietor = proprietor.proprietor;
				}
				else if (!proprietor.TryGetValue(text, out proprietor))
				{
					return null;
				}
			}
			return proprietor;
		}
	}

	public wzuol(uint unknow, string link, wzproperty proprietor)
	{
		this.properties = new object[]
		{
			unknow,
			link,
			proprietor
		};
	}
}
