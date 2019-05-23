using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;

internal static class batch
{
	private static class decomposer
	{
		internal static bool decompose(string location0, string location, string prefix)
		{
			wzarchive wzarchive = new wzarchive(location0);
			wzpackage root = wzarchive.get_root();
			if (root != null)
			{
				wzarchives wzarchives = new wzarchives(root, wzarchive);
				batch.AllocConsole();
				batch.save_packages(string.Concat(new object[]
				{
					location,
					"\\",
					wzarchive.get_version(),
					"\\",
					prefix,
					"\\"
				}), root);
				wzarchives.dispose();
				return true;
			}
			return false;
		}
	}

	private static class contrastor
	{
		private class item
		{
			private object[] properties;

			internal int state
			{
				get
				{
					return (int)this.properties[0];
				}
			}

			internal wzpackage package
			{
				get
				{
					return this.properties[1] as wzpackage;
				}
			}

			internal item(int state, wzpackage package)
			{
				this.properties = new object[]
				{
					state,
					package
				};
			}
		}

		internal static bool contrast(string location0, string location1, string location, string prefix)
		{
			wzarchive wzarchive = new wzarchive(location0);
			wzarchive wzarchive2 = new wzarchive(location1);
			wzpackage root = wzarchive.get_root();
			wzpackage root2 = wzarchive2.get_root();
			if (root != null && root2 != null)
			{
				wzarchives wzarchives = new wzarchives(root, wzarchive);
				wzarchives wzarchives2 = new wzarchives(root2, wzarchive2);
				batch.AllocConsole();
				SortedDictionary<string, batch.contrastor.item> sortedDictionary = new SortedDictionary<string, batch.contrastor.item>();
				location = string.Concat(new object[]
				{
					location,
					"\\",
					wzarchive.get_version(),
					"-",
					wzarchive2.get_version(),
					"\\",
					prefix,
					"\\"
				});
				batch.contrastor.contrast_packages(location, root, root2, sortedDictionary);
				if (batch.create_directory(location))
				{
					Stream stream = File.Create(location + "index.html");
					StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
					streamWriter.WriteLine("<style type=\"text/css\">");
					streamWriter.WriteLine("<!--");
					streamWriter.WriteLine("table { border-collapse: collapse; border: none; }");
					streamWriter.WriteLine("th, td { border: 1px solid #808080; }");
					streamWriter.WriteLine("-->");
					streamWriter.WriteLine("</style>");
					streamWriter.WriteLine("<table>");
					foreach (string current in sortedDictionary.Keys)
					{
						if (0 > sortedDictionary[current].state)
						{
							batch.write_line("<s>" + current + "</s>", batch.contrastor.write_link(current, sortedDictionary), streamWriter);
						}
						else if (0 < sortedDictionary[current].state)
						{
							batch.write_line("<b>" + current + "</b>", batch.contrastor.write_link(current, sortedDictionary), streamWriter);
						}
						else
						{
							batch.write_line(current, batch.contrastor.write_link(current, sortedDictionary), streamWriter);
						}
					}
					streamWriter.WriteLine("</table>");
					wzarchives2.dispose();
					wzarchives.dispose();
					streamWriter.Close();
					stream.Close();
				}
				return true;
			}
			return false;
		}

		private static void contrast_packages(string location, wzpackage proprietor0, wzpackage proprietor1, SortedDictionary<string, batch.contrastor.item> list)
		{
			foreach (wzpackage current in proprietor1.Values)
			{
				if (proprietor0.get_Item(current.get_identity()) == null)
				{
					string absolute = current.get_absolute();
					Console.WriteLine(absolute);
					list.Add(absolute, new batch.contrastor.item(1, current));
					if (current.get_type() % 2 == 0)
					{
						batch.save_package(location + absolute + "\\", current);
					}
					else
					{
						batch.contrastor.iterate_packages(location, current, 1, list);
					}
				}
			}
			foreach (wzpackage current2 in proprietor0.Values)
			{
				string absolute2 = current2.get_absolute();
				Console.WriteLine(absolute2);
				wzpackage wzpackage;
				if (proprietor1.TryGetValue(current2.get_identity(), out wzpackage))
				{
					if (current2.get_sum32() != wzpackage.get_sum32())
					{
						list.Add(absolute2, new batch.contrastor.item(0, wzpackage));
						if (wzpackage.get_type() % 2 == 0)
						{
							batch.contrastor.contrast_properties(location + absolute2 + "\\", current2, wzpackage);
						}
					}
					if (wzpackage.get_type() % 2 != 0)
					{
						batch.contrastor.contrast_packages(location, current2, wzpackage, list);
					}
				}
				else
				{
					list.Add(absolute2, new batch.contrastor.item(-1, current2));
					if (current2.get_type() % 2 == 0)
					{
						batch.save_package(location + absolute2 + "\\", current2);
					}
					else
					{
						batch.contrastor.iterate_packages(location, current2, -1, list);
					}
				}
			}
		}

		private static void iterate_packages(string location, wzpackage proprietor, int type, SortedDictionary<string, batch.contrastor.item> list)
		{
			foreach (wzpackage current in proprietor.Values)
			{
				list.Add(current.get_absolute(), new batch.contrastor.item(type, current));
				if (current.get_type() % 2 == 0)
				{
					batch.save_package(location + current.get_absolute() + "\\", current);
				}
				else
				{
					batch.contrastor.iterate_packages(location, current, type, list);
				}
			}
		}

		private static void contrast_properties(string location, wzpackage target, wzpackage source)
		{
			if (batch.create_directory(location))
			{
				Stream stream = File.Create(location + "index.html");
				StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
				streamWriter.WriteLine("<style type=\"text/css\">");
				streamWriter.WriteLine("<!--");
				streamWriter.WriteLine("table { border-collapse: collapse; border: none; }");
				streamWriter.WriteLine("th, td { border: 1px solid #808080; }");
				streamWriter.WriteLine("-->");
				streamWriter.WriteLine("</style>");
				streamWriter.WriteLine("<table>");
				batch.contrastor.contrast_properties(location, target.get_root().get_Item(""), source.get_root().get_Item(""), streamWriter);
				streamWriter.WriteLine("</table>");
				streamWriter.Close();
				stream.Close();
			}
		}

		private static void contrast_properties(string location, wzproperty proprietor0, wzproperty proprietor1, StreamWriter html)
		{
			foreach (wzproperty current in proprietor1.Values)
			{
				if (proprietor0.get_Item(current.get_identity()) == null)
				{
					string text = current.get_absolute().Replace('/', '.').Substring(1);
					batch.contrastor.write_line("<b>" + text + "</b>", "", batch.contrastor.write_content(location, text, current), html);
					if (0 < current.Count)
					{
						batch.contrastor.iterate_properties(location, current, 1, html);
					}
				}
			}
			foreach (wzproperty current2 in proprietor0.Values)
			{
				string text2 = current2.get_absolute().Replace('/', '.').Substring(1);
				wzproperty wzproperty;
				if (proprietor1.TryGetValue(current2.get_identity(), out wzproperty))
				{
					batch.contrastor.contrast_property(location, text2, current2, wzproperty, html);
					if (0 < current2.Count)
					{
						batch.contrastor.contrast_properties(location, current2, wzproperty, html);
					}
				}
				else
				{
					batch.contrastor.write_line("<s>" + text2 + "</s>", batch.contrastor.write_content(location, text2, current2), "", html);
					if (0 < current2.Count)
					{
						batch.contrastor.iterate_properties(location, current2, -1, html);
					}
				}
			}
		}

		private static string write_content(string location, string external, wzproperty property)
		{
			string str = batch.invalid_name(external);
			if (2 == property.get_type())
			{
				(property.get_data() as wzaudio).save(location + str);
			}
			else if (4 == property.get_type())
			{
				(property.get_data() as wzcanvas).save(location + str);
			}
			switch (property.get_type())
			{
			case 0:
				return "";
			case 1:
				return (property.get_data() as wzvector).get_content();
			case 2:
				return (property.get_data() as wzaudio).get_content();
			case 3:
				return "";
			case 4:
				return "<img src=\"" + str + ".png\" />";
			case 5:
				return (property.get_data() as wzuol).get_link();
			default:
				return string.Format("{0}", property.get_data());
			}
		}

		private static void write_line(string property, string target, string source, StreamWriter html)
		{
			html.WriteLine(string.Concat(new string[]
			{
				"<tr><td>",
				property,
				"</td><td>",
				target,
				"</td><td>",
				source,
				"</td></tr>"
			}));
		}

		private static void iterate_properties(string location, wzproperty proprietor, int type, StreamWriter html)
		{
			foreach (wzproperty current in proprietor.Values)
			{
				string text = current.get_absolute().Replace('/', '.').Substring(1);
				if (0 > type)
				{
					batch.contrastor.write_line("<s>" + text + "</s>", batch.contrastor.write_content(location, text, current), "", html);
				}
				else if (0 < type)
				{
					batch.contrastor.write_line("<b>" + text + "</b>", "", batch.contrastor.write_content(location, text, current), html);
				}
				if (0 < current.Count)
				{
					batch.contrastor.iterate_properties(location, current, type, html);
				}
			}
		}

		private static void contrast_property(string location, string external, wzproperty target, wzproperty source, StreamWriter html)
		{
			bool flag = target.get_type() == source.get_type();
			if (flag)
			{
				switch (target.get_type())
				{
				case 0:
					flag = true;
					break;
				case 1:
					flag = ((target.get_data() as wzvector).get_content() == (source.get_data() as wzvector).get_content());
					break;
				case 2:
					flag = (batch.contrastor.compute_sha512((target.get_data() as wzaudio).get_data()) == batch.contrastor.compute_sha512((source.get_data() as wzaudio).get_data()));
					break;
				case 3:
					flag = true;
					break;
				case 4:
					flag = (batch.contrastor.compute_sha512((target.get_data() as wzcanvas).get_data()) == batch.contrastor.compute_sha512((source.get_data() as wzcanvas).get_data()));
					break;
				case 5:
					flag = ((target.get_data() as wzuol).get_link() == (source.get_data() as wzuol).get_link());
					break;
				default:
					flag = (string.Format("{0}", target.get_data()) == string.Format("{0}", source.get_data()));
					break;
				}
			}
			if (!flag)
			{
				batch.contrastor.write_line(external, batch.contrastor.write_content(location, external + "-", target), batch.contrastor.write_content(location, external + "+", source), html);
			}
		}

		private static string compute_sha512(byte[] data)
		{
			SHA512 sHA = new SHA512Managed();
			string text = "";
			byte[] array = sHA.ComputeHash(data);
			for (int i = 0; i < array.Length; i++)
			{
				byte b = array[i];
				text += b.ToString("x2");
			}
			return text;
		}

		private static string write_link(string key, SortedDictionary<string, batch.contrastor.item> list)
		{
			if (list[key].package.get_type() % 2 == 0)
			{
				return "<a href=\"" + key + "/index.html\">index</a>";
			}
			return "";
		}
	}

	[DllImport("kernel32.dll")]
	private static extern bool AllocConsole();

	internal static bool process(string location, string[] locations)
	{
		if (1 == locations.Length)
		{
			if (File.Exists(locations[0]) && !batch.decomposer.decompose(locations[0], location, Path.GetFileName(locations[0])))
			{
				return false;
			}
		}
		else
		{
			if (2 != locations.Length)
			{
				return false;
			}
			if (string.Compare(locations[0], locations[1], true) != 0 && File.Exists(locations[0]) && File.Exists(locations[1]) && !batch.contrastor.contrast(locations[0], locations[1], location, Path.GetFileName(locations[1])))
			{
				return false;
			}
		}
		Process.Start(location);
		return true;
	}

	private static void save_packages(string location, wzpackage proprietor)
	{
		foreach (wzpackage current in proprietor.Values)
		{
			if (current.get_type() % 2 == 0)
			{
				string absolute = current.get_absolute();
				Console.WriteLine(absolute);
				batch.save_package(location + current.get_absolute() + "\\", current);
			}
			if (0 < current.Count)
			{
				batch.save_packages(location, current);
			}
		}
	}

	private static void save_package(string location, wzpackage package)
	{
		if (batch.create_directory(location))
		{
			Stream stream = File.Create(location + "index.html");
			StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
			streamWriter.WriteLine("<style type=\"text/css\">");
			streamWriter.WriteLine("<!--");
			streamWriter.WriteLine("table { border-collapse: collapse; border: none; }");
			streamWriter.WriteLine("th, td { border: 1px solid #808080; }");
			streamWriter.WriteLine("-->");
			streamWriter.WriteLine("</style>");
			streamWriter.WriteLine("<table>");
			batch.save_package(location, "", package.get_root().get_Item(""), streamWriter);
			streamWriter.WriteLine("</table>");
			streamWriter.Close();
			stream.Close();
		}
	}

	private static void save_package(string location, string prefix, wzproperty proprietor, StreamWriter html)
	{
		foreach (wzproperty current in proprietor.Values)
		{
			string text = prefix + "." + current.get_identity();
			string text2 = text.Substring(1);
			string str = batch.invalid_name(text2);
			if (2 == current.get_type())
			{
				(current.get_data() as wzaudio).save(location + str);
			}
			else if (4 == current.get_type())
			{
				(current.get_data() as wzcanvas).save(location + str);
			}
			switch (current.get_type())
			{
			case 0:
			case 3:
				break;
			case 1:
				batch.write_line(text2, (current.get_data() as wzvector).get_content(), html);
				break;
			case 2:
				batch.write_line(text2, (current.get_data() as wzaudio).get_content(), html);
				break;
			case 4:
				batch.write_line(text2, "<img src=\"" + str + ".png\" />", html);
				break;
			case 5:
				batch.write_line(text2, (current.get_data() as wzuol).get_link(), html);
				break;
			default:
				batch.write_line(text2, string.Format("{0}", current.get_data()), html);
				break;
			}
			if (0 < current.Count)
			{
				batch.save_package(location, text, current, html);
			}
		}
	}

	private static bool create_directory(string directory)
	{
		Directory.CreateDirectory(directory);
		return Directory.Exists(directory);
	}

	private static string invalid_name(string name)
	{
		char[] invalidFileNameChars = Path.GetInvalidFileNameChars();
		for (int i = 0; i < invalidFileNameChars.Length; i++)
		{
			char oldChar = invalidFileNameChars[i];
			name = name.Replace(oldChar, '_');
		}
		return name;
	}

	private static void write_line(string property, string content, StreamWriter html)
	{
		html.WriteLine(string.Concat(new string[]
		{
			"<tr><td>",
			property,
			"</td><td>",
			content,
			"</td></tr>"
		}));
	}
}
