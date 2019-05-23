using System;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;

internal class laboratory_host : Form
{
	private static laboratory_settings settings;

	private ToolStripMenuItem item_open_animation;

	private ToolStripSplitButton item_open;

	private ToolStripMenuItem item_save_all;

	private ToolStripSplitButton item_save;

	private ToolStripSeparator item_separator_save_windows;

	private ToolStripMenuItem item_windows_cascade;

	private ToolStripMenuItem item_windows_tile_horizontal;

	private ToolStripMenuItem item_windows_tile_vertical;

	private ToolStripDropDownButton item_windows;

	private ToolStripSeparator item_separator_windows_settings;

	private ToolStripButton item_settings;

	private ToolStripButton item_about;

	private laboratory_base.laboratory_toolstrip toolstrip;

	private MdiClient mdiclient;

	private Image toolstrip_open_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_open") as Image;
		}
	}

	private Image toolstrip_open_animation_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_open_animation") as Image;
		}
	}

	private Image toolstrip_save_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_save") as Image;
		}
	}

	private Image toolstrip_save_all_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_save_all") as Image;
		}
	}

	private Image toolstrip_windows_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_windows") as Image;
		}
	}

	private Image toolstrip_windows_cascade_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_windows_cascade") as Image;
		}
	}

	private Image toolstrip_windows_tile_horizontal_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_windows_tile_horizontal") as Image;
		}
	}

	private Image toolstrip_windows_tile_vertical_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_windows_tile_vertical") as Image;
		}
	}

	private Image toolstrip_settings_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_settings") as Image;
		}
	}

	private Image toolstrip_about_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_about") as Image;
		}
	}

	[DllImport("kernel32.dll")]
	private static extern bool SetDllDirectory(string lpPathName);

	[DllImport("user32.dll")]
	private static extern int GetWindowLong(IntPtr hWnd, int nIndex);

	[DllImport("user32.dll")]
	private static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);

	[STAThread]
	private static void Main(string[] arguments)
	{
		laboratory_host.settings = new laboratory_settings();
		if (!batch.process(laboratory_host.settings.archive_save_location, arguments))
		{
			Application.EnableVisualStyles();
			Application.Run(new laboratory_host());
		}
	}

	static laboratory_host()
	{
		MethodInfo method = typeof(AppDomainSetup).GetMethod("UpdateContextProperty", BindingFlags.Static | BindingFlags.NonPublic);
		MethodInfo method2 = typeof(AppDomain).GetMethod("GetFusionContext", BindingFlags.Instance | BindingFlags.NonPublic);
		method.Invoke(null, new object[]
		{
			method2.Invoke(AppDomain.CurrentDomain, null),
			"PRIVATE_BINPATH",
			Application.StartupPath + "\\assembly;"
		});
		laboratory_host.SetDllDirectory(Application.StartupPath + "\\assembly");
	}

	private laboratory_host()
	{
		this.item_open_animation = new ToolStripMenuItem(null, this.toolstrip_open_animation_image, new EventHandler(this.toolstrip_open_animation_click));
		this.item_open = new ToolStripSplitButton(null, this.toolstrip_open_image, new ToolStripItem[]
		{
			this.item_open_animation
		});
		this.item_save_all = new ToolStripMenuItem(null, this.toolstrip_save_all_image, new EventHandler(this.toolstrip_save_all_click));
		this.item_save = new ToolStripSplitButton(null, this.toolstrip_save_image, new ToolStripItem[]
		{
			this.item_save_all
		});
		this.item_separator_save_windows = new ToolStripSeparator();
		this.item_windows_cascade = new ToolStripMenuItem(null, this.toolstrip_windows_cascade_image, new EventHandler(this.toolstrip_windows_cascade_click));
		this.item_windows_tile_horizontal = new ToolStripMenuItem(null, this.toolstrip_windows_tile_horizontal_image, new EventHandler(this.toolstrip_windows_tile_horizontal_click));
		this.item_windows_tile_vertical = new ToolStripMenuItem(null, this.toolstrip_windows_tile_vertical_image, new EventHandler(this.toolstrip_windows_tile_vertical_click));
		this.item_windows = new ToolStripDropDownButton(null, this.toolstrip_windows_image, new ToolStripItem[]
		{
			this.item_windows_cascade,
			this.item_windows_tile_horizontal,
			this.item_windows_tile_vertical
		});
		this.item_separator_windows_settings = new ToolStripSeparator();
		this.item_settings = new ToolStripButton(null, this.toolstrip_settings_image, new EventHandler(this.toolstrip_settings_click));
		this.item_about = new ToolStripButton(null, this.toolstrip_about_image, new EventHandler(this.toolstrip_about_click));
		this.toolstrip = new laboratory_base.laboratory_toolstrip();
		this.mdiclient = new MdiClient();
		this.mdiclient.Dock = DockStyle.Fill;
		this.mdiclient.Parent = this;
		this.toolstrip.Parent = this;
		this.toolstrip.Items.AddRange(new ToolStripItem[]
		{
			this.item_open,
			this.item_save,
			this.item_separator_save_windows,
			this.item_windows,
			this.item_separator_windows_settings,
			this.item_settings,
			this.item_about
		});
		this.item_save.Enabled = false;
		this.item_windows.Enabled = false;
		this.item_open.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_save.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_windows.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_settings.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_about.DisplayStyle = ToolStripItemDisplayStyle.Image;
		this.item_open.ButtonClick += new EventHandler(this.toolstrip_open_click);
		this.item_save.ButtonClick += new EventHandler(this.toolstrip_save_click);
		this.AllowDrop = true;
		base.TopMost = laboratory_host.settings.top_most;
		base.StartPosition = FormStartPosition.WindowsDefaultBounds;
		base.Icon = base.icon;
		this.Text = "laboratory";
		base.FormClosing += new FormClosingEventHandler(this.form_closing);
		base.DragDrop += new DragEventHandler(this.drag_drop);
		base.DragEnter += new DragEventHandler(this.drag_enter);
		base.MdiChildActivate += new EventHandler(this.mdi_child_activate);
		laboratory_host.SetWindowLong(this.mdiclient.Handle, -20, laboratory_host.GetWindowLong(this.mdiclient.Handle, -20) & -513);
		if (laboratory_host.settings.language.Length == 0)
		{
			if (-1 == laboratory_language.index_of_language(CultureInfo.CurrentUICulture.IetfLanguageTag))
			{
				laboratory_host.settings.language = "en-us";
			}
			else
			{
				laboratory_host.settings.language = CultureInfo.CurrentUICulture.IetfLanguageTag;
			}
		}
		this.update_ui_culture();
	}

	internal void update_ui_culture()
	{
		this.set_ui_culture(laboratory_host.settings.language);
	}

	internal void set_ui_culture(string ietf)
	{
		laboratory_language.switch_language(ietf);
		this.update_ui_language();
		Form[] mdiChildren = base.MdiChildren;
		for (int i = 0; i < mdiChildren.Length; i++)
		{
			laboratory_component_base laboratory_component_base = (laboratory_component_base)mdiChildren[i];
			laboratory_component_base.update_ui_language();
		}
		Form[] ownedForms = base.OwnedForms;
		for (int j = 0; j < ownedForms.Length; j++)
		{
			laboratory_base laboratory_base = (laboratory_base)ownedForms[j];
			laboratory_base.update_ui_language();
		}
	}

	internal override void update_ui_language()
	{
		this.item_open.Text = laboratory_language.query_entry("laboratory_toolstrip_open");
		this.item_save.Text = laboratory_language.query_entry("laboratory_toolstrip_save");
		this.item_windows.Text = laboratory_language.query_entry("laboratory_toolstrip_windows");
		this.item_settings.Text = laboratory_language.query_entry("laboratory_toolstrip_settings");
		this.item_about.Text = laboratory_language.query_entry("laboratory_toolstrip_about");
		this.item_open_animation.Text = laboratory_language.query_entry("laboratory_toolstrip_open_animation");
		this.item_save_all.Text = laboratory_language.query_entry("laboratory_toolstrip_save_all");
		this.item_windows_cascade.Text = laboratory_language.query_entry("laboratory_toolstrip_windows_cascade");
		this.item_windows_tile_horizontal.Text = laboratory_language.query_entry("laboratory_toolstrip_windows_tile_horizontal");
		this.item_windows_tile_vertical.Text = laboratory_language.query_entry("laboratory_toolstrip_windows_tile_vertical");
		base.update_ui_font();
	}

	internal override void update_settings(laboratory_settings settings_elder, laboratory_settings settings)
	{
		if (settings_elder.top_most != settings.top_most)
		{
			base.TopMost = settings.top_most;
		}
		Form[] mdiChildren = base.MdiChildren;
		for (int i = 0; i < mdiChildren.Length; i++)
		{
			laboratory_component_base laboratory_component_base = (laboratory_component_base)mdiChildren[i];
			laboratory_component_base.update_settings(settings_elder, settings);
		}
	}

	private void toolstrip_open_click(object o, EventArgs e)
	{
		this.open_archives<archive_host>(this.select_targets());
	}

	private void open_archives<T>(string[] locations)
	{
		if (locations != null)
		{
			for (int i = 0; i < locations.Length; i++)
			{
				string text = locations[i];
				if (File.Exists(text))
				{
					this.open_archive<T>(text, 1 == locations.Length, laboratory_host.settings);
				}
			}
		}
	}

	private void open_archive<T>(string location, bool notify, laboratory_settings settings)
	{
		laboratory_component_base laboratory_component_base = Activator.CreateInstance(typeof(T), new object[]
		{
			this,
			location,
			settings
		}) as laboratory_component_base;
		if (laboratory_component_base.IsDisposed)
		{
			if (notify)
			{
				MessageBox.Show(laboratory_language.query_entry("laboratory_open_fail"), laboratory_language.query_entry("laboratory_open_fail_caption"), MessageBoxButtons.OK, MessageBoxIcon.Hand);
				return;
			}
		}
		else
		{
			this.item_windows.Enabled = true;
			laboratory_component_base.Show();
		}
	}

	private string[] select_targets()
	{
		string[] result;
		using (OpenFileDialog openFileDialog = new OpenFileDialog())
		{
			openFileDialog.Multiselect = true;
			openFileDialog.Title = laboratory_language.query_entry("laboratory_filedialog_open");
			openFileDialog.Filter = laboratory_language.query_entry("laboratory_filedialog_filter");
			result = ((DialogResult.OK == openFileDialog.ShowDialog()) ? openFileDialog.FileNames : null);
		}
		return result;
	}

	private void toolstrip_open_animation_click(object o, EventArgs e)
	{
		this.open_archives<animation_host>(this.select_targets());
	}

	private void toolstrip_save_click(object o, EventArgs e)
	{
		this.save_package(true);
	}

	private void save_package(bool single)
	{
		laboratory_component_base laboratory_component_base = base.ActiveMdiChild as laboratory_component_base;
		if (laboratory_component_base != null && !laboratory_component_base.save_package(single, laboratory_host.settings))
		{
			MessageBox.Show(laboratory_language.query_entry("laboratory_save_fail"), laboratory_language.query_entry("laboratory_save_fail_caption"), MessageBoxButtons.OK, MessageBoxIcon.Hand);
		}
	}

	private void toolstrip_save_all_click(object o, EventArgs e)
	{
		this.save_package(false);
	}

	private void toolstrip_windows_cascade_click(object o, EventArgs e)
	{
		this.mdiclient.LayoutMdi(MdiLayout.Cascade);
	}

	private void toolstrip_windows_tile_horizontal_click(object o, EventArgs e)
	{
		this.mdiclient.LayoutMdi(MdiLayout.TileHorizontal);
	}

	private void toolstrip_windows_tile_vertical_click(object o, EventArgs e)
	{
		this.mdiclient.LayoutMdi(MdiLayout.TileVertical);
	}

	private void toolstrip_settings_click(object o, EventArgs e)
	{
		laboratory_settings laboratory_settings = new settings(laboratory_host.settings).show_dialog(this);
		if (laboratory_settings != null)
		{
			this.update_settings(laboratory_host.settings, laboratory_settings);
			laboratory_host.settings = laboratory_settings;
			laboratory_host.settings.save_settings();
		}
	}

	private void toolstrip_about_click(object o, EventArgs e)
	{
		new about().ShowDialog();
	}

	private void form_closing(object o, FormClosingEventArgs e)
	{
		Form[] mdiChildren = base.MdiChildren;
		for (int i = 0; i < mdiChildren.Length; i++)
		{
			laboratory_component_base laboratory_component_base = (laboratory_component_base)mdiChildren[i];
			laboratory_component_base.Close();
		}
	}

	private void drag_drop(object o, DragEventArgs e)
	{
		if (DragDropEffects.Copy == e.Effect)
		{
			string[] locations = e.Data.GetData(DataFormats.FileDrop, false) as string[];
			if (laboratory_host.settings.generator)
			{
				this.open_archives<animation_host>(locations);
				return;
			}
			this.open_archives<archive_host>(locations);
		}
	}

	private void drag_enter(object o, DragEventArgs e)
	{
		e.Effect = (e.Data.GetDataPresent(DataFormats.FileDrop) ? DragDropEffects.Copy : DragDropEffects.None);
	}

	private void mdi_child_activate(object o, EventArgs e)
	{
		if (base.ActiveMdiChild != null)
		{
			this.item_save.Enabled = (base.ActiveMdiChild as laboratory_component_base).enable_save;
		}
	}

	internal void mdi_child_closed(object o, FormClosedEventArgs e)
	{
		if (base.MdiChildren.Length - 1 == 0)
		{
			this.item_save.Enabled = false;
			this.item_windows.Enabled = false;
		}
	}

	internal void package_expanded()
	{
		this.item_save.Enabled = (base.ActiveMdiChild as laboratory_component_base).enable_save;
	}
}
