using System;
using System.Drawing;
using System.Windows.Forms;

internal class about : laboratory_base
{
	private PictureBox picturebox;

	private TextBox version;

	private TextBox description;

	private TextBox company;

	private TextBox copyright;

	private Image portrait
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("portrait") as Image;
		}
	}

	internal about()
	{
		this.picturebox = new PictureBox();
		this.version = new TextBox();
		this.description = new TextBox();
		this.company = new TextBox();
		this.copyright = new TextBox();
		this.picturebox.Location = new Point(5, 5);
		this.picturebox.Size = this.portrait.Size;
		this.picturebox.Image = this.portrait;
		this.picturebox.Parent = this;
		this.version.AutoSize = true;
		this.version.ReadOnly = true;
		this.version.BorderStyle = BorderStyle.None;
		this.version.Location = new Point(110, 5);
		this.version.Size = new Size(150, 20);
		this.version.Text = "laboratory " + base.ProductVersion;
		this.version.Parent = this;
		this.description.AutoSize = true;
		this.description.ReadOnly = true;
		this.description.BorderStyle = BorderStyle.None;
		this.description.Location = new Point(110, 30);
		this.description.Size = new Size(150, 20);
		this.description.Parent = this;
		this.company.AutoSize = true;
		this.company.ReadOnly = true;
		this.company.BorderStyle = BorderStyle.None;
		this.company.Location = new Point(110, 55);
		this.company.Size = new Size(150, 20);
		this.company.Parent = this;
		this.copyright.AutoSize = true;
		this.copyright.ReadOnly = true;
		this.copyright.BorderStyle = BorderStyle.None;
		this.copyright.Location = new Point(110, 80);
		this.copyright.Size = new Size(150, 20);
		this.copyright.Parent = this;
		base.MaximizeBox = false;
		base.MinimizeBox = false;
		base.ShowInTaskbar = false;
		base.FormBorderStyle = FormBorderStyle.FixedDialog;
		base.StartPosition = FormStartPosition.CenterParent;
		base.ClientSize = new Size(265, 110);
		this.update_ui_language();
	}

	protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
	{
		Keys keys = (Keys)msg.WParam.ToInt32();
		if (keys == Keys.Return || keys == Keys.Escape)
		{
			base.Close();
		}
		return base.ProcessCmdKey(ref msg, keyData);
	}

	internal override void update_ui_language()
	{
		this.description.Text = laboratory_language.query_entry("about_description");
		this.company.Text = laboratory_language.query_entry("about_company");
		this.copyright.Text = laboratory_language.query_entry("about_copyright");
		this.Text = laboratory_language.query_entry("about_caption");
		base.update_ui_font();
	}
}
