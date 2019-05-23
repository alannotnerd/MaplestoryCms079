using FMOD;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;

internal class archive_host : laboratory_component_base
{
	private class archive_textbox : TextBox
	{
	}

	private class archive_player : Control
	{
		private class archive_trackbar : TrackBar
		{
			protected override void WndProc(ref Message m)
			{
				if (20 != m.Msg)
				{
					base.WndProc(ref m);
				}
			}
		}

		private Button button;

		private TrackBar progress;

		private TrackBar volume;

		private System.Windows.Forms.Timer timer;

		private System system;

		private Sound sound;

		private Channel channel;

		private bool play;

		private int decibel;

		private Image player_play_image
		{
			get
			{
				return laboratory_base.resource_manager.GetObject("player_play") as Image;
			}
		}

		private Image player_pause_image
		{
			get
			{
				return laboratory_base.resource_manager.GetObject("player_pause") as Image;
			}
		}

		internal wzaudio audio
		{
			set
			{
				if (value == null)
				{
					this.timer.Enabled = false;
					if (this.channel != null)
					{
						this.channel.stop();
					}
					if (this.sound != null)
					{
						this.sound.release();
					}
					if (this.system != null)
					{
						this.system.release();
					}
					this.channel = null;
					this.sound = null;
					this.system = null;
					return;
				}
				uint maximum = 0u;
				CREATESOUNDEXINFO cREATESOUNDEXINFO = default(CREATESOUNDEXINFO);
				Factory.System_Create(ref this.system);
				this.system.init(1, INITFLAGS.NORMAL, IntPtr.Zero);
				cREATESOUNDEXINFO.cbsize = Marshal.SizeOf(typeof(CREATESOUNDEXINFO));
				if (value.get_pcm())
				{
					byte[] wave = value.get_wave();
					cREATESOUNDEXINFO.fileoffset = 0u;
					cREATESOUNDEXINFO.length = (uint)wave.Length;
					this.system.createSound(wave, (MODE)2082u, ref cREATESOUNDEXINFO, ref this.sound);
				}
				else
				{
					cREATESOUNDEXINFO.fileoffset = (uint)value.get_offset();
					cREATESOUNDEXINFO.length = (uint)value.get_size();
					this.system.createSound(value.get_location(), (MODE)34u, ref cREATESOUNDEXINFO, ref this.sound);
				}
				this.system.playSound(CHANNELINDEX.FREE, this.sound, this.play, ref this.channel);
				this.sound.getLength(ref maximum, TIMEUNIT.MS);
				this.channel.setVolume((float)this.decibel / 100f);
				this.progress.Maximum = (int)maximum;
				this.progress.Value = 0;
				this.volume.Value = this.decibel;
				this.timer.Enabled = true;
			}
		}

		internal archive_player()
		{
			this.button = new Button();
			this.progress = new archive_host.archive_player.archive_trackbar();
			this.volume = new archive_host.archive_player.archive_trackbar();
			this.timer = new System.Windows.Forms.Timer();
			this.button.UseVisualStyleBackColor = true;
			this.button.ImageAlign = ContentAlignment.MiddleCenter;
			this.button.Size = new Size(20, 20);
			this.button.Image = this.player_play_image;
			this.button.Parent = this;
			this.button.Click += new EventHandler(this.button_click);
			this.progress.AutoSize = false;
			this.progress.TickStyle = TickStyle.None;
			this.progress.Size = new Size(150, 20);
			this.progress.Parent = this;
			this.progress.Scroll += new EventHandler(this.progress_scroll);
			this.volume.AutoSize = false;
			this.volume.TickStyle = TickStyle.None;
			this.volume.Size = new Size(50, 20);
			this.volume.Maximum = 100;
			this.volume.Parent = this;
			this.volume.Scroll += new EventHandler(this.volume_scroll);
			this.timer.Tick += new EventHandler(this.timer_tick);
			base.SizeChanged += new EventHandler(this.size_changed);
			this.play = true;
			this.decibel = 33;
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing)
			{
				this.audio = null;
			}
			base.Dispose(disposing);
		}

		private void button_click(object o, EventArgs e)
		{
			if (this.play)
			{
				this.channel.setPaused(false);
				this.button.Image = this.player_pause_image;
				this.play = false;
				return;
			}
			this.channel.setPaused(true);
			this.button.Image = this.player_play_image;
			this.play = true;
		}

		private void progress_scroll(object o, EventArgs e)
		{
			this.channel.setPosition((uint)this.progress.Value, TIMEUNIT.MS);
		}

		private void volume_scroll(object o, EventArgs e)
		{
			this.decibel = this.volume.Value;
			this.channel.setVolume((float)this.decibel / 100f);
		}

		private void timer_tick(object o, EventArgs e)
		{
			uint value = 0u;
			this.channel.getPosition(ref value, TIMEUNIT.MS);
			this.progress.Value = (int)value;
			this.system.update();
		}

		private void size_changed(object o, EventArgs e)
		{
			int num = (base.ClientSize.Width - 220) / 2;
			int y = (base.ClientSize.Height - 20) / 2;
			this.button.Location = new Point(num, y);
			this.progress.Location = new Point(num + 20, y);
			this.volume.Location = new Point(num + 170, y);
		}
	}

	private laboratory_child_base.laboratory_toolstrip_checkbox item_property;

	private laboratory_child_base.laboratory_toolstrip_checkbox item_content;

	private ToolStripComboBox item_keyword;

	private ToolStripButton item_search;

	private ToolStripSeparator item_separator_search_stop;

	private ToolStripButton item_stop;

	private ToolStripProgressBar item_progress;

	private ToolStripStatusLabel item_version;

	private ToolStripStatusLabel item_message;

	private ToolStripMenuItem item_image;

	private ToolStripMenuItem item_audio;

	private ToolStripMenuItem item_etc;

	private StatusStrip statusstrip;

	private ContextMenuStrip contextmenustrip;

	private archive_host.archive_textbox textbox;

	private LinkLabel linklabel;

	private archive_host.archive_player player;

	private bool listimage;

	private bool listaudio;

	private bool listetc;

	protected override event laboratory_component_base.package_expanded_event_handler package_expanded;

	private Image toolstrip_search_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_search") as Image;
		}
	}

	private Image listview_image_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("listview_image") as Image;
		}
	}

	private Image listview_audio_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("listview_audio") as Image;
		}
	}

	private Image listview_etc_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("listview_etc") as Image;
		}
	}

	public archive_host(laboratory_host proprietor, string location, laboratory_settings settings) : base(proprietor, location)
	{
		this.item_property = new laboratory_child_base.laboratory_toolstrip_checkbox(null, false);
		this.item_content = new laboratory_child_base.laboratory_toolstrip_checkbox(null, true);
		this.item_keyword = new ToolStripComboBox();
		this.item_search = new ToolStripButton(null, this.toolstrip_search_image, new EventHandler(this.toolstrip_search_click));
		this.item_separator_search_stop = new ToolStripSeparator();
		this.item_stop = new ToolStripButton(null, base.toolstrip_stop_image, new EventHandler(this.toolstrip_stop_click));
		this.item_progress = new ToolStripProgressBar();
		this.item_version = new ToolStripStatusLabel();
		this.item_message = new ToolStripStatusLabel();
		this.item_image = new ToolStripMenuItem(null, null, new EventHandler(this.contextmenustrip_image_click));
		this.item_audio = new ToolStripMenuItem(null, null, new EventHandler(this.contextmenustrip_audio_click));
		this.item_etc = new ToolStripMenuItem(null, null, new EventHandler(this.contextmenustrip_etc_click));
		this.contextmenustrip = new ContextMenuStrip(this.container);
		this.textbox = new archive_host.archive_textbox();
		this.linklabel = new LinkLabel();
		this.player = new archive_host.archive_player();
		this.statusstrip = new StatusStrip();
		this.vsplitcontainer.Parent = this.hsplitcontainer.Panel2;
		this.treeview.Parent = this.hsplitcontainer.Panel1;
		this.listview.ContextMenuStrip = this.contextmenustrip;
		this.listview.Parent = this.vsplitcontainer.Panel1;
		this.listview.SmallImageList.Images.AddRange(new Image[]
		{
			this.listview_etc_image,
			this.listview_image_image,
			this.listview_audio_image
		});
		this.toolstrip.Parent = this.hsplitcontainer.Panel2;
		this.toolstrip.Items.AddRange(new ToolStripItem[]
		{
			this.item_property,
			this.item_content,
			this.item_keyword,
			this.item_search,
			this.item_separator_search_stop,
			this.item_stop,
			this.item_progress
		});
		this.item_progress.AutoSize = false;
		this.item_stop.Enabled = false;
		this.item_progress.Enabled = false;
		this.item_separator_search_stop.Visible = false;
		this.item_stop.Visible = false;
		this.item_progress.Visible = false;
		this.item_search.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_stop.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_keyword.FlatStyle = FlatStyle.Standard;
		this.item_progress.Size = new Size(150, 15);
		this.item_property.Click += new EventHandler(this.toolstrip_property_click);
		this.item_content.Click += new EventHandler(this.toolstrip_content_click);
		this.item_keyword.SelectedIndexChanged += new EventHandler(this.toolstrip_combobox_selected_index_changed);
		this.item_keyword.KeyPress += new KeyPressEventHandler(this.toolstrip_combobox_key_press);
		this.canva.BackColor = settings.archive_canva_backcolor;
		this.canva.Parent = this.vsplitcontainer.Panel2;
		this.contextmenustrip.Items.AddRange(new ToolStripItem[]
		{
			this.item_image,
			this.item_audio,
			this.item_etc
		});
		this.item_image.Checked = settings.archive_list_image;
		this.item_audio.Checked = settings.archive_list_audio;
		this.item_etc.Checked = settings.archive_list_etc;
		this.contextmenustrip.Opening += new CancelEventHandler(this.contextmenustrip_opening);
		this.textbox.Multiline = true;
		this.textbox.HideSelection = false;
		this.textbox.ReadOnly = true;
		this.textbox.Visible = false;
		this.textbox.BorderStyle = BorderStyle.None;
		this.textbox.Dock = DockStyle.Fill;
		this.textbox.ScrollBars = ScrollBars.Both;
		this.textbox.Parent = this.canva;
		this.linklabel.Visible = false;
		this.linklabel.Dock = DockStyle.Fill;
		this.linklabel.TextAlign = ContentAlignment.MiddleCenter;
		this.linklabel.Parent = this.canva;
		this.linklabel.LinkClicked += new LinkLabelLinkClickedEventHandler(this.linklabel_link_clicked);
		this.player.Visible = false;
		this.player.Dock = DockStyle.Fill;
		this.player.Parent = this.canva;
		this.statusstrip.SizingGrip = false;
		this.statusstrip.Parent = this;
		this.statusstrip.Items.AddRange(new ToolStripItem[]
		{
			this.item_version,
			this.item_message
		});
		this.item_message.Spring = true;
		this.item_version.BorderSides = ToolStripStatusLabelBorderSides.All;
		this.item_message.BorderSides = ToolStripStatusLabelBorderSides.All;
		this.item_message.TextAlign = ContentAlignment.MiddleLeft;
		if (base.load_archive(location, settings.archive_tree_sort))
		{
			if (settings.explorer_style)
			{
				base.enable_explorer_style(this.treeview, true);
				base.enable_explorer_style(this.listview, true);
			}
			this.listimage = settings.archive_list_image;
			this.listaudio = settings.archive_list_audio;
			this.listetc = settings.archive_list_etc;
			this.update_ui_language();
			return;
		}
		base.Dispose();
	}

	protected override void Dispose(bool disposing)
	{
		if (disposing && this.canva.image != null)
		{
			Image image = this.canva.image;
			this.canva.image = null;
			image.Dispose();
		}
		base.Dispose(disposing);
	}

	internal override void update_ui_language()
	{
		this.item_property.Text = laboratory_language.query_entry("archive_toolstrip_property");
		this.item_content.Text = laboratory_language.query_entry("archive_toolstrip_content");
		this.item_search.Text = laboratory_language.query_entry("archive_toolstrip_search");
		this.item_stop.Text = laboratory_language.query_entry("archive_toolstrip_stop");
		this.item_image.Text = laboratory_language.query_entry("archive_contextmenustrip_image");
		this.item_audio.Text = laboratory_language.query_entry("archive_contextmenustrip_audio");
		this.item_etc.Text = laboratory_language.query_entry("archive_contextmenustrip_etc");
		this.item_version.Text = laboratory_language.query_entry("archive_statusstrip_version") + " : " + this.archives[0].get_version();
		this.contextmenustrip.Font = this.Font;
	}

	internal override void update_settings(laboratory_settings settings_elder, laboratory_settings settings)
	{
		if (settings_elder.explorer_style != settings.explorer_style)
		{
			base.enable_explorer_style(this.treeview, settings.explorer_style);
			base.enable_explorer_style(this.listview, settings.explorer_style);
			this.listview.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
		}
		if (settings_elder.archive_tree_sort != settings.archive_tree_sort && settings.archive_tree_sort)
		{
			this.treeview.BeginUpdate();
			this.treeview.Nodes.Clear();
			this.treeview.Nodes.AddRange(base.generate_tree(this.treeview.Tag as wzpackage, settings.archive_tree_sort, new List<TreeNode>()));
			this.treeview.EndUpdate();
		}
		if (this.listimage != settings.archive_list_image || this.listaudio != settings.archive_list_audio || this.listetc != settings.archive_list_etc)
		{
			this.listimage = settings.archive_list_image;
			this.listaudio = settings.archive_list_audio;
			this.listetc = settings.archive_list_etc;
			this.item_image.Checked = settings.archive_list_image;
			this.item_audio.Checked = settings.archive_list_audio;
			this.item_etc.Checked = settings.archive_list_etc;
			this.update_list();
		}
		if (settings_elder.archive_canva_backcolor != settings.archive_canva_backcolor)
		{
			this.canva.BackColor = settings.archive_canva_backcolor;
		}
	}

	internal override bool save_package(bool single, laboratory_settings settings)
	{
		if (this.reserve != null && this.reserve.IsAlive)
		{
			return true;
		}
		if (this.listview.Tag == null)
		{
			return false;
		}
		string text = settings.archive_save_location + "\\" + base.invalid_name((this.listview.Tag as wzproperty).get_identity()) + "\\";
		Directory.CreateDirectory(text);
		if (single && 0 < this.listview.SelectedItems.Count)
		{
			return this.save_item(text, this.listview.SelectedItems[0]);
		}
		this.thread = new Thread(new ParameterizedThreadStart(this.save_package));
		this.reserve = this.thread;
		this.thread.Start(new object[]
		{
			text,
			settings.archive_save_image,
			settings.archive_save_audio,
			settings.archive_save_etc
		});
		return true;
	}

	protected override void expand_package()
	{
		wzpackage wzpackage = this.treeview.SelectedNode.Tag as wzpackage;
		wzproperty root = wzpackage.get_root();
		this.item_message.Text = "";
		this.listview.Tag = null;
		this.listview.BeginUpdate();
		this.listview.SelectedItems.Clear();
		this.listview.Items.Clear();
		if (root != null)
		{
			this.listview.Tag = root;
			this.item_message.Text = string.Format("{0} {1} {2:X8} {3:X8}", new object[]
			{
				wzpackage.get_identity(),
				wzpackage.get_type(),
				wzpackage.get_size(),
				wzpackage.get_sum32()
			});
			this.generate_list(root);
		}
		else if (2 == wzpackage.get_type() || 4 == wzpackage.get_type())
		{
			this.item_message.Text = laboratory_language.query_entry("archive_treeview_fail");
		}
		this.listview.EndUpdate();
		this.package_expanded();
	}

	private bool save_item(string location, ListViewItem item)
	{
		wzproperty wzproperty = item.Tag as wzproperty;
		string str = base.invalid_name(item.SubItems[0].Text);
		if (2 == wzproperty.get_type())
		{
			return (wzproperty.get_data() as wzaudio).save(location + str);
		}
		return 4 != wzproperty.get_type() || (wzproperty.get_data() as wzcanvas).save(location + str);
	}

	private void save_package(object parameter)
	{
		object[] array = parameter as object[];
		Stream stream = File.Create(array[0] + "index.html");
		StreamWriter streamWriter = new StreamWriter(stream, Encoding.UTF8);
		base.Invoke(new Action<int>(delegate(int o)
		{
			this.item_progress.Value = 0;
			this.item_property.Enabled = false;
			this.item_content.Enabled = false;
			this.item_keyword.Enabled = false;
			this.item_search.Enabled = false;
			this.item_stop.Enabled = true;
			this.item_progress.Enabled = true;
			this.item_separator_search_stop.Visible = true;
			this.item_stop.Visible = true;
			this.item_progress.Visible = true;
			this.hsplitcontainer.Panel1.Enabled = false;
			this.vsplitcontainer.Panel1.Enabled = false;
			this.vsplitcontainer.Panel2.Enabled = false;
		}), new object[]
		{
			0
		});
		streamWriter.WriteLine("<style type=\"text/css\">");
		streamWriter.WriteLine("<!--");
		streamWriter.WriteLine("table { border-collapse: collapse; border: none; }");
		streamWriter.WriteLine("th, td { border: 1px solid #808080; }");
		streamWriter.WriteLine("-->");
		streamWriter.WriteLine("</style>");
		streamWriter.WriteLine("<table>");
		streamWriter.WriteLine(string.Concat(new string[]
		{
			"<tr><th>",
			this.item_property.Text,
			"</th><th>",
			this.item_content.Text,
			"</th></tr>"
		}));
		parameter = this.save_package("", (this.listview.Tag as wzproperty).get_Item(""), array[0] as string, (bool)array[1], (bool)array[2], (bool)array[3], streamWriter, this.item_progress);
		streamWriter.WriteLine("</table>");
		streamWriter.Close();
		stream.Close();
		base.Invoke(new Action<int>(delegate(int o)
		{
			this.item_property.Enabled = true;
			this.item_content.Enabled = true;
			this.item_keyword.Enabled = true;
			this.item_search.Enabled = true;
			this.item_stop.Enabled = false;
			this.item_progress.Enabled = false;
			this.item_separator_search_stop.Visible = false;
			this.item_stop.Visible = false;
			this.item_progress.Visible = false;
			this.hsplitcontainer.Panel1.Enabled = true;
			this.vsplitcontainer.Panel1.Enabled = true;
			this.vsplitcontainer.Panel2.Enabled = true;
		}), new object[]
		{
			0
		});
	}

	private string save_package(string prefix, wzproperty proprietor, string location, bool image, bool audio, bool etc, StreamWriter html, ToolStripProgressBar progress)
	{
		string text = "";
		foreach (wzproperty current in proprietor.Values)
		{
			if (this.thread == null)
			{
				break;
			}
			string text2 = prefix + "." + current.get_identity();
			string text3 = text2.Substring(1);
			string str = base.invalid_name(text3);
			if (2 == current.get_type() && audio)
			{
				if (!(current.get_data() as wzaudio).save(location + str))
				{
					text = text + "\r\n" + text3;
				}
			}
			else if (4 == current.get_type() && image && !(current.get_data() as wzcanvas).save(location + str))
			{
				text = text + "\r\n" + text3;
			}
			switch (current.get_type())
			{
			case 0:
			case 3:
				break;
			case 1:
				if (etc)
				{
					this.write_line(text3, (current.get_data() as wzvector).get_content(), html);
				}
				break;
			case 2:
				if (audio)
				{
					this.write_line(text3, (current.get_data() as wzaudio).get_content(), html);
				}
				break;
			case 4:
				if (image)
				{
					this.write_line(text3, "<img src=\"" + str + ".png\" />", html);
				}
				break;
			case 5:
				if (etc)
				{
					this.write_line(text3, (current.get_data() as wzuol).get_link(), html);
				}
				break;
			default:
				if (etc)
				{
					this.write_line(text3, string.Format("{0}", current.get_data()), html);
				}
				break;
			}
			if (0 < current.Count)
			{
				string text4 = this.save_package(text2, current, location, image, audio, etc, html, progress);
				if (0 < text4.Length)
				{
					text = text + "\r\n" + text4;
				}
			}
			base.Invoke(new Action<int>(delegate(int o)
			{
				progress.Value++;
			}), new object[]
			{
				0
			});
		}
		return text;
	}

	private void write_line(string property, string content, StreamWriter html)
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

	private void update_list()
	{
		this.listview.BeginUpdate();
		this.listview.SelectedItems.Clear();
		this.listview.Items.Clear();
		if (this.listview.Tag != null)
		{
			this.generate_list(this.listview.Tag as wzproperty);
		}
		this.listview.EndUpdate();
	}

	private void generate_list(wzproperty proprietor)
	{
		List<ListViewItem> list = new List<ListViewItem>();
		this.item_progress.Maximum = this.generate_list("", proprietor.get_Item(""), list);
		this.listview.Items.AddRange(list.ToArray());
		foreach (ListViewItem listViewItem in this.listview.Items)
		{
			proprietor = (listViewItem.Tag as wzproperty);
			if (4 == proprietor.get_type())
			{
				base.select_item(listViewItem);
				break;
			}
		}
		this.listview.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
	}

	private int generate_list(string prefix, wzproperty proprietor, List<ListViewItem> items)
	{
		int num = 0;
		foreach (wzproperty current in proprietor.Values)
		{
			int num2 = (2 == current.get_type()) ? 2 : ((4 == current.get_type()) ? 1 : 0);
			string text = prefix + "." + current.get_identity();
			if ((num2 == 0 && this.listetc) || (1 == num2 && this.listimage) || (2 == num2 && this.listaudio))
			{
				string content = current.get_content();
				if (content != null)
				{
					items.Add(new ListViewItem(new string[]
					{
						text.Substring(1),
						content
					}, num2)
					{
						Tag = current
					});
				}
			}
			if (0 < current.Count)
			{
				num += this.generate_list(text, current, items);
			}
			num++;
		}
		return num;
	}

	private void toolstrip_property_click(object o, EventArgs e)
	{
		if (!this.item_property.ischecked)
		{
			this.item_content.ischecked = true;
		}
	}

	private void toolstrip_content_click(object o, EventArgs e)
	{
		if (!this.item_content.ischecked)
		{
			this.item_property.ischecked = true;
		}
	}

	private void toolstrip_combobox_selected_index_changed(object o, EventArgs e)
	{
		this.search_target();
	}

	private void search_target()
	{
		if (0 < this.item_keyword.Text.Length)
		{
			bool ischecked = this.item_property.ischecked;
			bool ischecked2 = this.item_content.ischecked;
			int i = (0 < this.listview.SelectedIndices.Count) ? this.listview.SelectedIndices[0] : 0;
			int num = i + 1;
			while (this.listview.Items.Count > num)
			{
				if (this.search_listview(ischecked, ischecked2, this.item_keyword.Text, num))
				{
					return;
				}
				num++;
			}
			int num2 = 0;
			while (i > num2)
			{
				if (this.search_listview(ischecked, ischecked2, this.item_keyword.Text, num2))
				{
					return;
				}
				num2++;
			}
		}
	}

	private bool search_listview(bool property, bool content, string text, int index)
	{
		ListViewItem listViewItem = this.listview.Items[index];
		string value = text.ToLower();
		if (property && 0 <= listViewItem.SubItems[0].Text.ToLower().IndexOf(value))
		{
			this.target_captured(listViewItem, text);
			return true;
		}
		if (content && 0 <= listViewItem.SubItems[1].Text.ToLower().IndexOf(value))
		{
			this.target_captured(listViewItem, text);
			return true;
		}
		return false;
	}

	private void target_captured(ListViewItem item, string text)
	{
		if (!this.item_keyword.Items.Contains(text))
		{
			this.item_keyword.Items.Add(text);
		}
		base.select_item(item);
	}

	private void toolstrip_combobox_key_press(object o, KeyPressEventArgs e)
	{
		if ('\r' == e.KeyChar)
		{
			this.search_target();
		}
	}

	private void toolstrip_search_click(object o, EventArgs e)
	{
		this.search_target();
	}

	private void toolstrip_stop_click(object o, EventArgs e)
	{
		this.thread = null;
	}

	protected override void listview_selected_index_changed(object o, EventArgs e)
	{
		Image image = this.canva.image;
		this.textbox.Visible = false;
		this.linklabel.Visible = false;
		this.player.Visible = false;
		this.canva.image = null;
		if (image != null)
		{
			image.Dispose();
		}
		this.linklabel.Links.Clear();
		this.textbox.Text = "";
		this.linklabel.Text = "";
		this.player.audio = null;
		if (0 < this.listview.SelectedItems.Count)
		{
			wzproperty wzproperty = this.listview.SelectedItems[0].Tag as wzproperty;
			switch (wzproperty.get_type())
			{
			case 1:
				this.display_etc((wzproperty.get_data() as wzvector).get_content());
				return;
			case 2:
				this.display_audio(wzproperty.get_data() as wzaudio);
				return;
			case 4:
				this.display_image(wzproperty.get_data() as wzcanvas);
				return;
			case 5:
				this.display_link(wzproperty.get_data() as wzuol);
				return;
			}
			this.display_etc(string.Format("{0}", wzproperty.get_data()));
		}
	}

	private void display_etc(string text)
	{
		if (text != null)
		{
			this.textbox.Text = text;
			this.textbox.Visible = true;
		}
	}

	private void display_audio(wzaudio audio)
	{
		if (0 < audio.get_content().Length)
		{
			this.player.audio = audio;
			this.player.Visible = true;
		}
	}

	private void display_image(wzcanvas canvas)
	{
		if (canvas != null)
		{
			Image image = canvas.get_image();
			this.canva.image = ((image == null) ? base.error : image);
		}
	}

	private void display_link(wzuol uol)
	{
		if (uol != null)
		{
			if (uol.get_target() == null)
			{
				this.linklabel.Text = uol.get_link();
			}
			else
			{
				string text = uol.get_target().get_absolute().Replace('/', '.').Substring(1);
				this.linklabel.Text = "Target:" + text;
				this.linklabel.Links.Add(7, text.Length, text);
			}
			this.linklabel.Visible = true;
		}
	}

	private void contextmenustrip_image_click(object o, EventArgs e)
	{
		this.item_image.Checked = !this.item_image.Checked;
		this.listimage = this.item_image.Checked;
		this.update_list();
	}

	private void contextmenustrip_audio_click(object o, EventArgs e)
	{
		this.item_audio.Checked = !this.item_audio.Checked;
		this.listaudio = this.item_audio.Checked;
		this.update_list();
	}

	private void contextmenustrip_etc_click(object o, EventArgs e)
	{
		this.item_etc.Checked = !this.item_etc.Checked;
		this.listetc = this.item_etc.Checked;
		this.update_list();
	}

	private void contextmenustrip_opening(object o, EventArgs e)
	{
		if (this.treeview == this.contextmenustrip.SourceControl)
		{
			this.item_image.Visible = false;
			this.item_audio.Visible = false;
			this.item_etc.Visible = false;
			return;
		}
		this.item_image.Visible = true;
		this.item_audio.Visible = true;
		this.item_etc.Visible = true;
	}

	private void linklabel_link_clicked(object o, LinkLabelLinkClickedEventArgs e)
	{
		string text = e.Link.LinkData as string;
		if (text != null)
		{
			foreach (ListViewItem listViewItem in this.listview.Items)
			{
				if (text == listViewItem.SubItems[0].Text)
				{
					base.select_item(listViewItem);
					return;
				}
			}
			foreach (ListViewItem listViewItem2 in this.listview.Items)
			{
				if (listViewItem2.SubItems[0].Text.StartsWith(text))
				{
					base.select_item(listViewItem2);
					break;
				}
			}
		}
	}
}
