using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading;
using System.Windows.Forms;

internal class animation_host : laboratory_component_base
{
	private class animation_raws : Dictionary<string, animation_host.animation_raw>
	{
		private object[] properties;

		internal string identity
		{
			get
			{
				return this.properties[0] as string;
			}
		}

		internal int count
		{
			get
			{
				int num = 0;
				foreach (animation_host.animation_raw current in base.Values)
				{
					num += current.Count;
				}
				return num;
			}
		}

		internal animation_raws(wzproperty property)
		{
			this.properties = new object[]
			{
				property.get_identity()
			};
			this.enumerate_animations(property.get_Item(""));
		}

		internal animation_raws(string identity)
		{
			this.properties = new object[]
			{
				identity
			};
		}

		private void enumerate_animations(wzproperty proprietor)
		{
			foreach (wzproperty current in proprietor.Values)
			{
				if (3 == current.get_type())
				{
					this.valid_animation(current);
				}
				if (0 < current.Count)
				{
					this.enumerate_animations(current);
				}
			}
		}

		private void valid_animation(wzproperty proprietor)
		{
			animation_host.animation_raw animation_raw = new animation_host.animation_raw(proprietor.get_identity());
			foreach (wzproperty current in proprietor.Values)
			{
				int num;
				if (int.TryParse(current.get_identity(), out num))
				{
					this.valid_frame(current, animation_raw);
				}
			}
			if (0 < animation_raw.Count)
			{
				base.Add(proprietor.get_absolute().Replace('/', '.').Substring(1), animation_raw);
			}
		}

		private void valid_frame(wzproperty property, animation_host.animation_raw animation)
		{
			if (4 == property.get_type())
			{
				animation.Add(property);
				return;
			}
			if (5 == property.get_type())
			{
				this.valid_frame((property.get_data() as wzuol).get_target(), animation);
			}
		}
	}

	private class animation_raw : List<wzproperty>
	{
		private object[] properties;

		internal string identity
		{
			get
			{
				return this.properties[0] as string;
			}
		}

		internal animation_host.animation animation
		{
			get
			{
				List<animation_host.animation_property> list = new List<animation_host.animation_property>();
				foreach (wzproperty current in this)
				{
					wzcanvas canvas = current.get_data() as wzcanvas;
					wzproperty wzproperty;
					wzproperty wzproperty2;
					list.Add(new animation_host.animation_property(canvas, current.TryGetValue("origin", out wzproperty) ? (wzproperty.get_data() as wzvector) : new wzvector(0, 0), current.TryGetValue("delay", out wzproperty2) ? int.Parse(string.Format("{0}", wzproperty2.get_data())) : 100));
				}
				int x = list[0].x;
				int y = list[0].y;
				int num = -x;
				int num2 = -y;
				int num3 = list[0].width - x;
				int num4 = list[0].height - y;
				foreach (animation_host.animation_property current2 in list)
				{
					x = current2.x;
					y = current2.y;
					if (num > -x)
					{
						num = -x;
					}
					if (num2 > -y)
					{
						num2 = -y;
					}
					if (num3 < current2.width - x)
					{
						num3 = current2.width - x;
					}
					if (num4 < current2.height - y)
					{
						num4 = current2.height - y;
					}
				}
				num3 -= num;
				num4 -= num2;
				animation_host.animation animation = new animation_host.animation(num3, num4);
				foreach (animation_host.animation_property current3 in list)
				{
					animation.Add(this.resize_image(num, num2, num3, num4, current3));
					animation.delays.Add(current3.delay);
				}
				return animation;
			}
		}

		internal animation_raw(string identity)
		{
			this.properties = new object[]
			{
				identity
			};
		}

		private Image resize_image(int left, int top, int width, int height, animation_host.animation_property property)
		{
			Image image = property.canvas.get_image();
			Bitmap bitmap = new Bitmap(width, height);
			if (image != null)
			{
				Graphics graphics = Graphics.FromImage(bitmap);
				graphics.DrawImage(image, -property.x - left, -property.y - top);
				graphics.Dispose();
				image.Dispose();
			}
			return bitmap;
		}
	}

	private class animation_property
	{
		private object[] properties;

		internal int width
		{
			get
			{
				return (this.properties[0] as wzcanvas).get_width();
			}
		}

		internal int height
		{
			get
			{
				return (this.properties[0] as wzcanvas).get_height();
			}
		}

		internal int x
		{
			get
			{
				return (int)this.properties[1];
			}
		}

		internal int y
		{
			get
			{
				return (int)this.properties[2];
			}
		}

		internal int delay
		{
			get
			{
				return (int)this.properties[3];
			}
		}

		internal wzcanvas canvas
		{
			get
			{
				return this.properties[0] as wzcanvas;
			}
		}

		internal animation_property(wzcanvas canvas, wzvector vector, int delay)
		{
			this.properties = new object[]
			{
				canvas,
				vector.get_x(),
				vector.get_y(),
				delay
			};
		}
	}

	private class animation : List<Image>
	{
		private object[] properties;

		internal int width
		{
			get
			{
				return (int)this.properties[0];
			}
		}

		internal int height
		{
			get
			{
				return (int)this.properties[1];
			}
		}

		internal List<int> delays
		{
			get
			{
				return this.properties[2] as List<int>;
			}
		}

		internal animation(int width, int height)
		{
			this.properties = new object[]
			{
				width,
				height,
				new List<int>()
			};
		}

		internal void dispose()
		{
			foreach (Image current in this)
			{
				current.Dispose();
			}
		}
	}

	private ToolStripButton item_flip_horizontal;

	private ToolStripSeparator item_separator_flip_frame;

	private ToolStripComboBox item_frame;

	private laboratory_child_base.laboratory_toolstrip_checkbox item_play;

	private ToolStripSeparator item_separator_play_stop;

	private ToolStripButton item_stop;

	private ToolStripProgressBar item_progress;

	private ComboBox combobox;

	private System.Windows.Forms.Timer timer;

	private bool list_sort;

	protected override event laboratory_component_base.package_expanded_event_handler package_expanded;

	private Image listview_object_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("listview_object") as Image;
		}
	}

	private Image toolstrip_flip_horizontal_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_flip_horizontal") as Image;
		}
	}

	public animation_host(laboratory_host proprietor, string location, laboratory_settings settings) : base(proprietor, location)
	{
		this.item_flip_horizontal = new ToolStripButton(null, this.toolstrip_flip_horizontal_image, new EventHandler(this.toolstrip_flip_horizontal_click));
		this.item_separator_flip_frame = new ToolStripSeparator();
		this.item_frame = new ToolStripComboBox();
		this.item_play = new laboratory_child_base.laboratory_toolstrip_checkbox(null, true);
		this.item_separator_play_stop = new ToolStripSeparator();
		this.item_stop = new ToolStripButton(null, base.toolstrip_stop_image, new EventHandler(this.toolstrip_stop_click));
		this.item_progress = new ToolStripProgressBar();
		this.combobox = new ComboBox();
		this.timer = new System.Windows.Forms.Timer(this.container);
		this.hsplitcontainer.Parent = this;
		this.vsplitcontainer.Parent = this.hsplitcontainer.Panel1;
		this.treeview.Parent = this.vsplitcontainer.Panel1;
		this.listview.Parent = this.vsplitcontainer.Panel2;
		this.listview.SmallImageList.Images.AddRange(new Image[]
		{
			this.listview_object_image
		});
		this.combobox.Dock = DockStyle.Top;
		this.combobox.Parent = this.vsplitcontainer.Panel2;
		this.combobox.SelectedIndexChanged += new EventHandler(this.combobox_selected_index_changed);
		this.combobox.KeyPress += new KeyPressEventHandler(this.combobox_key_press);
		this.canva.BackColor = settings.animation_canva_backcolor;
		this.canva.Parent = this.hsplitcontainer.Panel2;
		this.toolstrip.Parent = this.hsplitcontainer.Panel2;
		this.toolstrip.Items.AddRange(new ToolStripItem[]
		{
			this.item_flip_horizontal,
			this.item_separator_flip_frame,
			this.item_frame,
			this.item_play,
			this.item_separator_play_stop,
			this.item_stop,
			this.item_progress
		});
		this.item_frame.AutoSize = false;
		this.item_progress.AutoSize = false;
		this.item_flip_horizontal.Enabled = false;
		this.item_frame.Enabled = false;
		this.item_stop.Enabled = false;
		this.item_progress.Enabled = false;
		this.item_separator_play_stop.Visible = false;
		this.item_stop.Visible = false;
		this.item_progress.Visible = false;
		this.item_flip_horizontal.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_stop.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_frame.Size = new Size(50, 15);
		this.item_progress.Size = new Size(150, 15);
		this.item_flip_horizontal.Tag = false;
		this.item_frame.DropDownStyle = ComboBoxStyle.DropDownList;
		this.item_frame.FlatStyle = FlatStyle.Standard;
		this.item_play.Click += new EventHandler(this.toolstrip_checkbox_click);
		this.item_frame.SelectedIndexChanged += new EventHandler(this.toolstrip_combobox_selected_index_changed);
		this.timer.Interval = 10;
		this.timer.Tag = 0;
		this.timer.Tick += new EventHandler(this.timer_tick);
		if (base.load_archive(location, settings.animation_tree_sort))
		{
			if (settings.explorer_style)
			{
				base.enable_explorer_style(this.treeview, true);
				base.enable_explorer_style(this.listview, true);
			}
			this.list_sort = settings.animation_list_sort;
			this.update_ui_language();
			return;
		}
		base.Dispose();
	}

	protected override void Dispose(bool disposing)
	{
		this.timer.Enabled = false;
		if (disposing && this.canva.Tag != null)
		{
			this.canva.image = null;
			(this.canva.Tag as animation_host.animation).dispose();
		}
		base.Dispose(disposing);
	}

	internal override void update_ui_language()
	{
		this.item_flip_horizontal.Text = laboratory_language.query_entry("animation_toolstrip_flip_horizontal");
		this.item_play.Text = laboratory_language.query_entry("animation_toolstrip_play");
		this.item_stop.Text = laboratory_language.query_entry("animation_toolstrip_stop");
	}

	internal override void update_settings(laboratory_settings settings_elder, laboratory_settings settings)
	{
		if (settings_elder.explorer_style != settings.explorer_style)
		{
			base.enable_explorer_style(this.treeview, settings.explorer_style);
			base.enable_explorer_style(this.listview, settings.explorer_style);
			this.listview.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
		}
		if (settings_elder.animation_tree_sort != settings.animation_tree_sort && settings.animation_tree_sort)
		{
			this.treeview.BeginUpdate();
			this.treeview.Nodes.Clear();
			this.treeview.Nodes.AddRange(base.generate_tree(this.treeview.Tag as wzpackage, settings.animation_tree_sort, new List<TreeNode>()));
			this.treeview.EndUpdate();
		}
		this.list_sort = settings.animation_list_sort;
		if (settings_elder.animation_list_sort != settings.animation_list_sort && settings.animation_list_sort && this.listview.Tag != null)
		{
			this.listview.BeginUpdate();
			this.listview.SelectedItems.Clear();
			this.listview.Items.Clear();
			this.generate_list(this.listview.Tag as animation_host.animation_raws);
			this.listview.EndUpdate();
		}
		if (settings_elder.animation_canva_backcolor != settings.animation_canva_backcolor)
		{
			this.canva.BackColor = settings.animation_canva_backcolor;
		}
	}

	internal override bool save_package(bool single, laboratory_settings settings)
	{
		if (this.reserve != null && this.reserve.IsAlive)
		{
			return true;
		}
		if (this.listview.Tag != null)
		{
			animation_host.animation_raws animation_raws = this.listview.Tag as animation_host.animation_raws;
			string text = settings.animation_save_location + "\\" + base.invalid_name(animation_raws.identity) + "\\";
			Directory.CreateDirectory(text);
			if (single && 0 < this.listview.SelectedItems.Count)
			{
				animation_raws = new animation_host.animation_raws(animation_raws.identity);
				animation_raws.Add(this.listview.SelectedItems[0].SubItems[0].Text, this.listview.SelectedItems[0].Tag as animation_host.animation_raw);
			}
			this.thread = new Thread(new ParameterizedThreadStart(this.save_package));
			this.reserve = this.thread;
			this.thread.Start(new object[]
			{
				text,
				settings.animation_save_backcolor,
				settings.animation_save_maxcolor,
				settings.animation_save_frames,
				animation_raws
			});
			return true;
		}
		return false;
	}

	private void save_package(object parameter)
	{
		object[] array = parameter as object[];
		string location = array[0] as string;
		animation_host.animation_raws raws = array[4] as animation_host.animation_raws;
		base.Invoke(new Action<int>(delegate(int o)
		{
			this.item_progress.Maximum = raws.count;
			this.item_progress.Value = 0;
			this.item_flip_horizontal.Enabled = false;
			this.item_frame.Enabled = false;
			this.item_play.Enabled = false;
			this.item_stop.Enabled = true;
			this.item_progress.Enabled = true;
			this.item_separator_play_stop.Visible = true;
			this.item_stop.Visible = true;
			this.item_progress.Visible = true;
			this.vsplitcontainer.Panel1.Enabled = false;
			this.vsplitcontainer.Panel2.Enabled = false;
			this.canva.Enabled = false;
		}), new object[]
		{
			0
		});
		foreach (string current in raws.Keys)
		{
			if (this.thread == null)
			{
				break;
			}
			this.save_item(location, (Color)array[1], (int)array[2], (bool)array[3], (bool)this.item_flip_horizontal.Tag, current, raws[current].animation, this.item_progress);
		}
		base.Invoke(new Action<int>(delegate(int o)
		{
			this.item_flip_horizontal.Enabled = true;
			this.item_frame.Enabled = true;
			this.item_play.Enabled = true;
			this.item_stop.Enabled = false;
			this.item_progress.Enabled = false;
			this.item_separator_play_stop.Visible = false;
			this.item_stop.Visible = false;
			this.item_progress.Visible = false;
			this.vsplitcontainer.Panel1.Enabled = true;
			this.vsplitcontainer.Panel2.Enabled = true;
			this.canva.Enabled = true;
		}), new object[]
		{
			0
		});
	}

	private void save_item(string location, Color color, int maximum, bool frames, bool flip, string external, animation_host.animation animation, ToolStripProgressBar progress)
	{
		if (animation != null)
		{
			location += base.invalid_name(external);
			if (flip)
			{
				foreach (Image current in animation)
				{
					current.RotateFlip(RotateFlipType.RotateNoneFlipX);
				}
			}
			if (frames)
			{
				location += "\\";
				Directory.CreateDirectory(location);
				int num = 0;
				while (animation.Count > num)
				{
					if (this.thread == null)
					{
						break;
					}
					animation[num].Save(string.Concat(new object[]
					{
						location,
						num,
						",",
						animation.delays[num],
						".png"
					}), ImageFormat.Png);
					base.Invoke(new Action<int>(delegate(int o)
					{
						progress.Value++;
					}), new object[]
					{
						0
					});
					num++;
				}
			}
			else
			{
				gif_encoder gif_encoder = new gif_encoder(location + ".gif", animation.width, animation.height, maximum, color);
				int num2 = 0;
				while (animation.Count > num2 && this.thread != null)
				{
					gif_encoder.append_frame(animation[num2] as Bitmap, animation.delays[num2]);
					base.Invoke(new Action<int>(delegate(int o)
					{
						progress.Value++;
					}), new object[]
					{
						0
					});
					num2++;
				}
				gif_encoder.destruct();
			}
			animation.dispose();
		}
	}

	private void toolstrip_flip_horizontal_click(object o, EventArgs e)
	{
		animation_host.animation animation = this.canva.Tag as animation_host.animation;
		if (animation != null)
		{
			foreach (Image current in animation)
			{
				current.RotateFlip(RotateFlipType.RotateNoneFlipX);
			}
			this.canva.Refresh();
			this.item_flip_horizontal.Tag = !(bool)this.item_flip_horizontal.Tag;
		}
	}

	private void toolstrip_checkbox_click(object o, EventArgs e)
	{
		this.timer.Enabled = this.item_play.ischecked;
	}

	private void toolstrip_stop_click(object o, EventArgs e)
	{
		this.thread = null;
	}

	private void toolstrip_combobox_selected_index_changed(object o, EventArgs e)
	{
		animation_host.animation animation = this.canva.Tag as animation_host.animation;
		if (animation != null)
		{
			this.canva.inner_image = animation[this.item_frame.SelectedIndex];
		}
	}

	protected override void expand_package()
	{
		wzpackage wzpackage = this.treeview.SelectedNode.Tag as wzpackage;
		wzproperty root = wzpackage.get_root();
		this.listview.Tag = null;
		this.listview.BeginUpdate();
		this.listview.SelectedItems.Clear();
		this.listview.Items.Clear();
		if (root != null)
		{
			this.enumerate_animations(root);
		}
		this.listview.EndUpdate();
		this.package_expanded();
	}

	private void enumerate_animations(wzproperty property)
	{
		animation_host.animation_raws animation_raws = new animation_host.animation_raws(property);
		if (0 < animation_raws.Count)
		{
			this.listview.Tag = animation_raws;
			this.generate_list(animation_raws);
		}
	}

	private void generate_list(animation_host.animation_raws animations)
	{
		List<ListViewItem> list = new List<ListViewItem>();
		foreach (string current in animations.Keys)
		{
			list.Add(new ListViewItem(new string[]
			{
				current,
				animations[current].Count.ToString()
			}, 0)
			{
				Tag = animations[current]
			});
		}
		if (this.list_sort)
		{
			list.Sort(delegate(ListViewItem x, ListViewItem y)
			{
				int num = int.Parse(x.SubItems[1].Text);
				int num2 = int.Parse(y.SubItems[1].Text);
				num = ((num2 > num) ? -1 : ((num2 < num) ? 1 : 0));
				if (!this.list_sort)
				{
					return num;
				}
				return -num;
			});
		}
		this.listview.Items.AddRange(list.ToArray());
		base.select_item(this.listview.Items[0]);
		this.listview.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
	}

	private void combobox_selected_index_changed(object o, EventArgs e)
	{
		this.search_target();
	}

	private void search_target()
	{
		if (0 < this.combobox.Text.Length)
		{
			int i = (0 < this.listview.SelectedIndices.Count) ? this.listview.SelectedIndices[0] : 0;
			int num = i + 1;
			while (this.listview.Items.Count > num)
			{
				if (this.search_listview(this.combobox.Text, num))
				{
					return;
				}
				num++;
			}
			int num2 = 0;
			while (i > num2)
			{
				if (this.search_listview(this.combobox.Text, num2))
				{
					return;
				}
				num2++;
			}
		}
	}

	private bool search_listview(string text, int index)
	{
		ListViewItem listViewItem = this.listview.Items[index];
		string value = text.ToLower();
		if (0 <= listViewItem.SubItems[0].Text.ToLower().IndexOf(value))
		{
			if (!this.combobox.Items.Contains(text))
			{
				this.combobox.Items.Add(text);
			}
			base.select_item(listViewItem);
			return true;
		}
		return false;
	}

	private void combobox_key_press(object o, KeyPressEventArgs e)
	{
		if ('\r' == e.KeyChar)
		{
			this.search_target();
		}
	}

	protected override void listview_selected_index_changed(object o, EventArgs e)
	{
		animation_host.animation animation = this.canva.Tag as animation_host.animation;
		this.item_flip_horizontal.Enabled = false;
		this.item_frame.Enabled = false;
		this.item_flip_horizontal.Tag = false;
		this.timer.Enabled = false;
		this.item_frame.Items.Clear();
		this.canva.image = null;
		if (animation != null)
		{
			animation.dispose();
		}
		if (0 < this.listview.SelectedItems.Count)
		{
			animation_host.animation_raw animation_raw = this.listview.SelectedItems[0].Tag as animation_host.animation_raw;
			animation = animation_raw.animation;
			this.canva.Tag = animation;
			this.canva.image = animation[0];
			int num = 0;
			while (animation.Count > num)
			{
				this.item_frame.Items.Add(num.ToString());
				num++;
			}
			this.item_frame.SelectedIndex = 0;
			this.item_flip_horizontal.Enabled = true;
			this.item_frame.Enabled = true;
			if (this.item_play.ischecked)
			{
				this.timer.Enabled = true;
			}
		}
	}

	private void timer_tick(object o, EventArgs e)
	{
		animation_host.animation animation = this.canva.Tag as animation_host.animation;
		if (animation != null)
		{
			ToolStripComboBox toolStripComboBox = this.item_frame;
			if ((int)this.timer.Tag >= animation.delays[toolStripComboBox.SelectedIndex])
			{
				if (toolStripComboBox.Items.Count <= toolStripComboBox.SelectedIndex + 1)
				{
					toolStripComboBox.SelectedIndex = 0;
				}
				else
				{
					toolStripComboBox.SelectedIndex++;
				}
				this.timer.Tag = 0;
			}
			this.timer.Tag = (int)this.timer.Tag + 10;
		}
	}
}
