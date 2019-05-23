using System;
using System.Collections.Generic;
using System.IO;

public class wzarchives : List<wzarchive>
{
	public wzarchives(wzpackage proprietor, wzarchive archive)
	{
		string str = Path.GetDirectoryName(archive.location) + "\\";
		base.Add(archive);
		foreach (wzpackage current in proprietor.Values)
		{
			if (current.type % 2 != 0 && current.Count == 0)
			{
				this.load_archive(str + current.identity + ".wz", current);
			}
		}
	}

	public void dispose()
	{
		foreach (wzarchive current in this)
		{
			current.dispose();
		}
	}

	private void load_archive(string location, wzpackage proprietor)
	{
		if (File.Exists(location))
		{
			wzarchive wzarchive = new wzarchive(location);
			wzpackage root = wzarchive.root;
			if (root != null)
			{
				foreach (wzpackage current in root.Values)
				{
					current.proprietor = proprietor;
					proprietor.Add(current.identity, current);
				}
				base.Add(wzarchive);
			}
		}
	}
}
