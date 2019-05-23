using System;
using System.ComponentModel;
using System.Drawing;
using System.Resources;
using System.Windows.Forms;

internal abstract class laboratory_base : Form
{
	protected class laboratory_toolstrip : ToolStrip
	{
		protected override void WndProc(ref Message m)
		{
			if (33 == m.Msg)
			{
				m.Result = (IntPtr)1;
				return;
			}
			base.WndProc(ref m);
		}
	}

	protected Container container;

	protected static ResourceManager resource_manager
	{
		get
		{
			return new ResourceManager(typeof(laboratory_host));
		}
	}

	protected Icon icon
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("icon") as Icon;
		}
	}

	protected Image error
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("error") as Image;
		}
	}

	internal abstract void update_ui_language();

	internal virtual void update_settings(laboratory_settings settings_elder, laboratory_settings settings)
	{
	}

	protected laboratory_base()
	{
		this.container = new Container();
	}

	protected override void Dispose(bool disposing)
	{
		if (disposing)
		{
			this.container.Dispose();
		}
		base.Dispose(disposing);
	}

	protected Font update_ui_font()
	{
		Font font = new Font(laboratory_language.query_entry("laboratory_font_family"), (float)int.Parse(laboratory_language.query_entry("laboratory_font_size")));
		this.update_ui_font(base.Controls, font);
		this.Font = font;
		return font;
	}

	private void update_ui_font(Control.ControlCollection controls, Font font)
	{
		foreach (Control control in controls)
		{
			this.update_ui_font(control.Controls, font);
			control.Font = font;
		}
	}
}
