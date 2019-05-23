using System;
using System.Drawing;
using System.Windows.Forms;

internal class settings : Form
{
	private TabControl tabcontrol;

	private Button ok;

	private Button cancel;

	private CheckBox explorer;

	private CheckBox topmost;

	private Label language;

	private ComboBox combobox;

	private CheckBox generator;

	private GroupBox archive_save;

	private GroupBox archive_display;

	private Label archive_location;

	private TextBox archive_textbox;

	private CheckBox archive_saveimage;

	private CheckBox archive_saveaudio;

	private CheckBox archive_saveetc;

	private CheckBox archive_treesort;

	private CheckBox archive_listimage;

	private CheckBox archive_listaudio;

	private CheckBox archive_listetc;

	private Button archive_backcolor;

	private GroupBox animation_save;

	private GroupBox animation_display;

	private Label animation_location;

	private TextBox animation_textbox;

	private CheckBox animation_frames;

	private TextBox animation_numeric;

	private Label animation_maxcolor;

	private Button animation_savecolor;

	private CheckBox animation_treesort;

	private CheckBox animation_listsort;

	private Button animation_backcolor;

	internal settings(laboratory_settings settings)
	{
		this.tabcontrol = new TabControl();
		this.ok = new Button();
		this.cancel = new Button();
		this.explorer = new CheckBox();
		this.topmost = new CheckBox();
		this.language = new Label();
		this.combobox = new ComboBox();
		this.generator = new CheckBox();
		this.archive_save = new GroupBox();
		this.archive_display = new GroupBox();
		this.archive_location = new Label();
		this.archive_textbox = new TextBox();
		this.archive_saveimage = new CheckBox();
		this.archive_saveaudio = new CheckBox();
		this.archive_saveetc = new CheckBox();
		this.archive_treesort = new CheckBox();
		this.archive_listimage = new CheckBox();
		this.archive_listaudio = new CheckBox();
		this.archive_listetc = new CheckBox();
		this.archive_backcolor = new Button();
		this.animation_save = new GroupBox();
		this.animation_display = new GroupBox();
		this.animation_location = new Label();
		this.animation_textbox = new TextBox();
		this.animation_frames = new CheckBox();
		this.animation_numeric = new TextBox();
		this.animation_maxcolor = new Label();
		this.animation_savecolor = new Button();
		this.animation_treesort = new CheckBox();
		this.animation_listsort = new CheckBox();
		this.animation_backcolor = new Button();
		this.tabcontrol.Size = new Size(300, 170);
		this.tabcontrol.Parent = this;
		this.tabcontrol.TabPages.Add("");
		this.tabcontrol.TabPages.Add("");
		this.tabcontrol.TabPages.Add("");
		this.ok.DialogResult = DialogResult.OK;
		this.ok.Location = new Point(180, 175);
		this.ok.Size = new Size(55, 20);
		this.ok.Parent = this;
		this.cancel.DialogResult = DialogResult.Cancel;
		this.cancel.Location = new Point(240, 175);
		this.cancel.Size = new Size(55, 20);
		this.cancel.Parent = this;
		this.explorer.Checked = settings.explorer_style;
		this.explorer.TextAlign = ContentAlignment.BottomLeft;
		this.explorer.Location = new Point(5, 5);
		this.explorer.Size = new Size(255, 20);
		this.explorer.Parent = this.tabcontrol.TabPages[0];
		this.topmost.Checked = settings.top_most;
		this.topmost.TextAlign = ContentAlignment.BottomLeft;
		this.topmost.Location = new Point(5, 30);
		this.topmost.Size = new Size(255, 20);
		this.topmost.Parent = this.tabcontrol.TabPages[0];
		this.language.TextAlign = ContentAlignment.MiddleLeft;
		this.language.Location = new Point(5, 55);
		this.language.Size = new Size(75, 20);
		this.language.Parent = this.tabcontrol.TabPages[0];
		this.combobox.DropDownStyle = ComboBoxStyle.DropDownList;
		this.combobox.Location = new Point(85, 55);
		this.combobox.Size = new Size(175, 100);
		this.combobox.Parent = this.tabcontrol.TabPages[0];
		this.combobox.Items.AddRange(laboratory_language.native_name_of_languages);
		this.combobox.SelectedIndex = laboratory_language.index_of_language(settings.language);
		this.combobox.SelectedIndexChanged += new EventHandler(this.combobox_selected_index_changed);
		this.generator.Checked = settings.generator;
		this.generator.UseMnemonic = false;
		this.generator.Location = new Point(5, 80);
		this.generator.Size = new Size(255, 40);
		this.generator.Parent = this.tabcontrol.TabPages[0];
		this.archive_save.Location = new Point(5, 5);
		this.archive_save.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 10, 65);
		this.archive_save.Parent = this.tabcontrol.TabPages[1];
		this.archive_display.Location = new Point(5, 75);
		this.archive_display.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 10, 65);
		this.archive_display.Parent = this.tabcontrol.TabPages[1];
		this.archive_location.TextAlign = ContentAlignment.MiddleLeft;
		this.archive_location.Location = new Point(5, 15);
		this.archive_location.Size = new Size(55, 20);
		this.archive_location.Parent = this.archive_save;
		this.archive_textbox.AutoSize = false;
		this.archive_textbox.HideSelection = false;
		this.archive_textbox.ReadOnly = true;
		this.archive_textbox.Location = new Point(65, 15);
		this.archive_textbox.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 80, 20);
		this.archive_textbox.Text = settings.archive_save_location;
		this.archive_textbox.Parent = this.archive_save;
		this.archive_textbox.Click += new EventHandler(this.archive_textbox_click);
		this.archive_textbox.Select(0, this.archive_textbox.Text.Length);
		this.archive_saveimage.Checked = settings.archive_save_image;
		this.archive_saveimage.TextAlign = ContentAlignment.BottomLeft;
		this.archive_saveimage.Location = new Point(5, 40);
		this.archive_saveimage.Size = new Size(75, 20);
		this.archive_saveimage.Parent = this.archive_save;
		this.archive_saveaudio.Checked = settings.archive_save_audio;
		this.archive_saveaudio.TextAlign = ContentAlignment.BottomLeft;
		this.archive_saveaudio.Location = new Point(85, 40);
		this.archive_saveaudio.Size = new Size(75, 20);
		this.archive_saveaudio.Parent = this.archive_save;
		this.archive_saveetc.Checked = settings.archive_save_etc;
		this.archive_saveetc.TextAlign = ContentAlignment.BottomLeft;
		this.archive_saveetc.Location = new Point(165, 40);
		this.archive_saveetc.Size = new Size(75, 20);
		this.archive_saveetc.Parent = this.archive_save;
		this.archive_treesort.Checked = settings.archive_tree_sort;
		this.archive_treesort.TextAlign = ContentAlignment.BottomLeft;
		this.archive_treesort.Location = new Point(5, 15);
		this.archive_treesort.Size = new Size(165, 20);
		this.archive_treesort.Parent = this.archive_display;
		this.archive_listimage.Checked = settings.archive_list_image;
		this.archive_listimage.TextAlign = ContentAlignment.BottomLeft;
		this.archive_listimage.Location = new Point(5, 40);
		this.archive_listimage.Size = new Size(75, 20);
		this.archive_listimage.Parent = this.archive_display;
		this.archive_listaudio.Checked = settings.archive_list_audio;
		this.archive_listaudio.TextAlign = ContentAlignment.BottomLeft;
		this.archive_listaudio.Location = new Point(85, 40);
		this.archive_listaudio.Size = new Size(75, 20);
		this.archive_listaudio.Parent = this.archive_display;
		this.archive_listetc.Checked = settings.archive_list_etc;
		this.archive_listetc.TextAlign = ContentAlignment.BottomLeft;
		this.archive_listetc.Location = new Point(165, 40);
		this.archive_listetc.Size = new Size(75, 20);
		this.archive_listetc.Parent = this.archive_display;
		this.archive_backcolor.ImageAlign = ContentAlignment.MiddleLeft;
		this.archive_backcolor.Location = new Point(175, 15);
		this.archive_backcolor.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 190, 20);
		this.archive_backcolor.Tag = settings.archive_canva_backcolor;
		this.archive_backcolor.Parent = this.archive_display;
		this.archive_backcolor.Click += new EventHandler(this.archive_backcolor_click);
		this.animation_save.Location = new Point(5, 5);
		this.animation_save.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 10, 65);
		this.animation_save.Parent = this.tabcontrol.TabPages[2];
		this.animation_display.Location = new Point(5, 75);
		this.animation_display.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 10, 65);
		this.animation_display.Parent = this.tabcontrol.TabPages[2];
		this.animation_location.TextAlign = ContentAlignment.MiddleLeft;
		this.animation_location.Location = new Point(5, 15);
		this.animation_location.Size = new Size(55, 20);
		this.animation_location.Parent = this.animation_save;
		this.animation_textbox.AutoSize = false;
		this.animation_textbox.HideSelection = false;
		this.animation_textbox.ReadOnly = true;
		this.animation_textbox.Location = new Point(65, 15);
		this.animation_textbox.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 165, 20);
		this.animation_textbox.Text = settings.animation_save_location;
		this.animation_textbox.Parent = this.animation_save;
		this.animation_textbox.Click += new EventHandler(this.animation_textbox_click);
		this.animation_textbox.Select(0, this.animation_textbox.Text.Length);
		this.animation_numeric.AutoSize = false;
		this.animation_numeric.HideSelection = false;
		this.animation_numeric.Location = new Point(this.tabcontrol.DisplayRectangle.Width - 95, 15);
		this.animation_numeric.Size = new Size(35, 20);
		this.animation_numeric.Text = settings.animation_save_maxcolor.ToString();
		this.animation_numeric.Parent = this.animation_save;
		this.animation_numeric.KeyPress += new KeyPressEventHandler(this.animation_numeric_key_press);
		this.animation_numeric.MouseWheel += new MouseEventHandler(this.animation_numeric_mouse_wheel);
		this.animation_maxcolor.TextAlign = ContentAlignment.MiddleLeft;
		this.animation_maxcolor.Location = new Point(this.tabcontrol.DisplayRectangle.Width - 55, 15);
		this.animation_maxcolor.Size = new Size(40, 20);
		this.animation_maxcolor.Parent = this.animation_save;
		this.animation_frames.Checked = settings.animation_save_frames;
		this.animation_frames.TextAlign = ContentAlignment.BottomLeft;
		this.animation_frames.Location = new Point(5, 40);
		this.animation_frames.Size = new Size(165, 20);
		this.animation_frames.Parent = this.animation_save;
		this.animation_savecolor.ImageAlign = ContentAlignment.MiddleLeft;
		this.animation_savecolor.Location = new Point(175, 40);
		this.animation_savecolor.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 190, 20);
		this.animation_savecolor.Tag = settings.animation_save_backcolor;
		this.animation_savecolor.Parent = this.animation_save;
		this.animation_savecolor.Click += new EventHandler(this.animation_savecolor_click);
		this.animation_treesort.Checked = settings.animation_tree_sort;
		this.animation_treesort.TextAlign = ContentAlignment.BottomLeft;
		this.animation_treesort.Location = new Point(5, 15);
		this.animation_treesort.Size = new Size(165, 20);
		this.animation_treesort.Parent = this.animation_display;
		this.animation_listsort.Checked = settings.animation_list_sort;
		this.animation_listsort.TextAlign = ContentAlignment.BottomLeft;
		this.animation_listsort.Location = new Point(5, 40);
		this.animation_listsort.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 20, 20);
		this.animation_listsort.Parent = this.animation_display;
		this.animation_backcolor.ImageAlign = ContentAlignment.MiddleLeft;
		this.animation_backcolor.Location = new Point(175, 15);
		this.animation_backcolor.Size = new Size(this.tabcontrol.DisplayRectangle.Width - 190, 20);
		this.animation_backcolor.Tag = settings.animation_canva_backcolor;
		this.animation_backcolor.Parent = this.animation_display;
		this.animation_backcolor.Click += new EventHandler(this.animation_backcolor_click);
		base.MaximizeBox = false;
		base.MinimizeBox = false;
		base.ShowInTaskbar = false;
		base.FormBorderStyle = FormBorderStyle.FixedDialog;
		base.StartPosition = FormStartPosition.CenterParent;
		base.ClientSize = new Size(300, 200);
		base.AcceptButton = this.ok;
		base.CancelButton = this.cancel;
		this.update_image(this.archive_backcolor);
		this.update_image(this.animation_savecolor);
		this.update_image(this.animation_backcolor);
		this.update_ui_language();
	}

	protected override void Dispose(bool disposing)
	{
		if (disposing)
		{
			if (this.archive_backcolor.Image != null)
			{
				this.archive_backcolor.Image.Dispose();
			}
			if (this.animation_savecolor.Image != null)
			{
				this.animation_savecolor.Image.Dispose();
			}
			if (this.animation_backcolor.Image != null)
			{
				this.animation_backcolor.Image.Dispose();
			}
		}
		base.Dispose(disposing);
	}

	internal override void update_ui_language()
	{
		this.tabcontrol.TabPages[0].Text = laboratory_language.query_entry("settings_general");
		this.tabcontrol.TabPages[1].Text = laboratory_language.query_entry("settings_archive");
		this.tabcontrol.TabPages[2].Text = laboratory_language.query_entry("settings_animation");
		this.ok.Text = laboratory_language.query_entry("settings_ok");
		this.cancel.Text = laboratory_language.query_entry("settings_cancel");
		this.explorer.Text = laboratory_language.query_entry("settings_general_explorer_style");
		this.topmost.Text = laboratory_language.query_entry("settings_general_top_most");
		this.language.Text = laboratory_language.query_entry("settings_general_language");
		this.generator.Text = laboratory_language.query_entry("settings_general_generator");
		this.archive_save.Text = laboratory_language.query_entry("settings_archive_save");
		this.archive_display.Text = laboratory_language.query_entry("settings_archive_display");
		this.archive_location.Text = laboratory_language.query_entry("settings_archive_save_location");
		this.archive_saveimage.Text = laboratory_language.query_entry("settings_archive_save_image");
		this.archive_saveaudio.Text = laboratory_language.query_entry("settings_archive_save_audio");
		this.archive_saveetc.Text = laboratory_language.query_entry("settings_archive_save_etc");
		this.archive_treesort.Text = laboratory_language.query_entry("settings_archive_display_tree_sort");
		this.archive_listimage.Text = laboratory_language.query_entry("settings_archive_display_image");
		this.archive_listaudio.Text = laboratory_language.query_entry("settings_archive_display_audio");
		this.archive_listetc.Text = laboratory_language.query_entry("settings_archive_display_etc");
		this.archive_backcolor.Text = laboratory_language.query_entry("settings_archive_display_backcolor");
		this.animation_save.Text = laboratory_language.query_entry("settings_animation_save");
		this.animation_display.Text = laboratory_language.query_entry("settings_animation_display");
		this.animation_location.Text = laboratory_language.query_entry("settings_animation_save_location");
		this.animation_frames.Text = laboratory_language.query_entry("settings_animation_save_frames");
		this.animation_maxcolor.Text = laboratory_language.query_entry("settings_animation_save_maxcolor");
		this.animation_savecolor.Text = laboratory_language.query_entry("settings_animation_save_backcolor");
		this.animation_treesort.Text = laboratory_language.query_entry("settings_animation_display_tree_sort");
		this.animation_listsort.Text = laboratory_language.query_entry("settings_animation_display_list_sort");
		this.animation_backcolor.Text = laboratory_language.query_entry("settings_animation_display_backcolor");
		this.Text = laboratory_language.query_entry("settings_caption");
		base.update_ui_font();
	}

	internal laboratory_settings show_dialog(laboratory_host proprietor)
	{
		if (DialogResult.OK == base.ShowDialog(proprietor))
		{
			return new laboratory_settings(this.explorer.Checked, this.topmost.Checked, laboratory_language.name_of_language(this.combobox.SelectedIndex), this.generator.Checked, this.archive_textbox.Text, this.archive_saveimage.Checked, this.archive_saveaudio.Checked, this.archive_saveetc.Checked, this.archive_treesort.Checked, this.archive_listimage.Checked, this.archive_listaudio.Checked, this.archive_listetc.Checked, ((Color)this.archive_backcolor.Tag).ToArgb(), this.animation_textbox.Text, this.animation_frames.Checked, this.receive_number(this.animation_numeric, 8, 256), ((Color)this.animation_savecolor.Tag).ToArgb(), this.animation_treesort.Checked, this.animation_listsort.Checked, ((Color)this.animation_backcolor.Tag).ToArgb());
		}
		proprietor.update_ui_culture();
		return null;
	}

	private int receive_number(TextBox textbox, int minimum, int maximum)
	{
		int num;
		if (!int.TryParse(textbox.Text, out num))
		{
			return maximum;
		}
		if (minimum > num)
		{
			return minimum;
		}
		if (maximum >= num)
		{
			return num;
		}
		return maximum;
	}

	private void update_image(Button button)
	{
		int num = 8;
		Bitmap bitmap = new Bitmap(num * 2, num * 2);
		Graphics graphics = Graphics.FromImage(bitmap);
		SolidBrush brush = new SolidBrush((Color)button.Tag);
		graphics.FillRectangles(Brushes.LightGray, new Rectangle[]
		{
			new Rectangle(0, 0, num, num),
			new Rectangle(num, num, num, num)
		});
		graphics.FillRectangles(Brushes.White, new Rectangle[]
		{
			new Rectangle(0, num, num, num),
			new Rectangle(num, 0, num, num)
		});
		graphics.FillRectangle(brush, 0, 0, bitmap.Width, bitmap.Height);
		graphics.Dispose();
		if (button.Image != null)
		{
			button.Image.Dispose();
		}
		button.Image = bitmap;
	}

	private void combobox_selected_index_changed(object o, EventArgs e)
	{
		laboratory_host laboratory_host = base.Owner as laboratory_host;
		laboratory_host.set_ui_culture(laboratory_language.name_of_language(this.combobox.SelectedIndex));
	}

	private void archive_textbox_click(object o, EventArgs e)
	{
		using (FolderBrowserDialog folderBrowserDialog = new FolderBrowserDialog())
		{
			folderBrowserDialog.Description = laboratory_language.query_entry("settings_archive_folderdialog_description");
			folderBrowserDialog.SelectedPath = this.archive_textbox.Text;
			if (DialogResult.OK == folderBrowserDialog.ShowDialog())
			{
				this.archive_textbox.Text = folderBrowserDialog.SelectedPath;
			}
		}
	}

	private void archive_backcolor_click(object o, EventArgs e)
	{
		this.select_color(this.archive_backcolor);
	}

	private void animation_textbox_click(object o, EventArgs e)
	{
		using (FolderBrowserDialog folderBrowserDialog = new FolderBrowserDialog())
		{
			folderBrowserDialog.Description = laboratory_language.query_entry("settings_animation_folderdialog_description");
			folderBrowserDialog.SelectedPath = this.animation_textbox.Text;
			if (DialogResult.OK == folderBrowserDialog.ShowDialog())
			{
				this.animation_textbox.Text = folderBrowserDialog.SelectedPath;
			}
		}
	}

	private void animation_numeric_key_press(object o, KeyPressEventArgs e)
	{
		if (char.IsDigit(e.KeyChar))
		{
			this.animation_numeric.Paste(e.KeyChar.ToString());
			this.restrict_value(this.animation_numeric, 8, 256);
			e.Handled = true;
			return;
		}
		if ('\b' != e.KeyChar)
		{
			e.Handled = true;
		}
	}

	private void animation_numeric_mouse_wheel(object o, MouseEventArgs e)
	{
		this.restrict_value(this.animation_numeric, 8, 256);
		this.animation_numeric.Text = (int.Parse(this.animation_numeric.Text) + e.Delta / 120).ToString();
		this.restrict_value(this.animation_numeric, 8, 256);
	}

	private void restrict_value(TextBox textbox, int minimum, int maximum)
	{
		int num;
		if (!int.TryParse(textbox.Text, out num))
		{
			num = maximum + 1;
		}
		if (minimum > num)
		{
			textbox.Text = minimum.ToString();
			return;
		}
		if (maximum < num)
		{
			textbox.Text = maximum.ToString();
		}
	}

	private void animation_savecolor_click(object o, EventArgs e)
	{
		this.select_color(this.animation_savecolor);
	}

	private void animation_backcolor_click(object o, EventArgs e)
	{
		this.select_color(this.animation_backcolor);
	}

	private void select_color(Button button)
	{
		angelic_burster angelic_burster = new angelic_burster((Color)button.Tag);
		if (DialogResult.OK == angelic_burster.ShowDialog())
		{
			button.Tag = angelic_burster.color;
			this.update_image(button);
		}
	}

    private void InitializeComponent()
    {
            this.SuspendLayout();
            // 
            // settings
            // 
            this.ClientSize = new System.Drawing.Size(478, 295);
            this.Name = "settings";
            this.ResumeLayout(false);

    }
}
