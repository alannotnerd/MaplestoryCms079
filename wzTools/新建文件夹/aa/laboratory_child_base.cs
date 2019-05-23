using System;
using System.Drawing;
using System.Windows.Forms;

internal abstract class laboratory_child_base : laboratory_base
{
	protected class laboratory_treeview : TreeView
	{
		protected override void WndProc(ref Message m)
		{
			if (20 != m.Msg)
			{
				base.WndProc(ref m);
			}
		}
	}

	protected class laboratory_listview : ListView
	{
		internal laboratory_listview()
		{
			this.DoubleBuffered = true;
		}
	}

	protected class laboratory_toolstrip_checkbox : ToolStripControlHost
	{
		internal bool ischecked
		{
			get
			{
				return (base.Control as CheckBox).Checked;
			}
			set
			{
				(base.Control as CheckBox).Checked = value;
			}
		}

		internal laboratory_toolstrip_checkbox(string text, bool ischecked) : base(new CheckBox())
		{
			CheckBox checkBox = base.Control as CheckBox;
			checkBox.Checked = ischecked;
			checkBox.TextAlign = ContentAlignment.BottomLeft;
			checkBox.BackColor = Color.Transparent;
			checkBox.Text = text;
		}
	}

	protected class laboratory_canva : Panel
	{
		private PictureBox picturebox;

		private Point original;

		private Point position;

		internal Image image
		{
			get
			{
				return this.picturebox.Image;
			}
			set
			{
				this.picturebox.Visible = false;
				this.picturebox.Image = null;
				this.Refresh();
				if (value != null)
				{
					this.picturebox.Location = Point.Empty;
					this.picturebox.Size = value.Size;
					this.picturebox.Image = value;
					this.picturebox.Visible = true;
					this.revise_picturebox();
					base.AutoScrollPosition = new Point((base.HorizontalScroll.Maximum - base.ClientSize.Width) / 2, (base.VerticalScroll.Maximum - base.ClientSize.Height) / 2);
				}
			}
		}

		internal Image inner_image
		{
			set
			{
				this.picturebox.Image = value;
			}
		}

		internal Image pattern
		{
			get
			{
				int num = 8;
				Image image = new Bitmap(num * 2, num * 2);
				Graphics graphics = Graphics.FromImage(image);
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
				graphics.Dispose();
				return image;
			}
		}

		internal laboratory_canva()
		{
			this.picturebox = new PictureBox();
			this.picturebox.Visible = false;
			this.picturebox.BackColor = Color.Transparent;
			this.picturebox.Parent = this;
			this.picturebox.MouseDown += new MouseEventHandler(this.picturebox_mouse_down);
			this.picturebox.MouseMove += new MouseEventHandler(this.picturebox_mouse_move);
			this.DoubleBuffered = true;
			this.BackgroundImage = this.pattern;
			base.Paint += new PaintEventHandler(this.paint);
			base.Scroll += new ScrollEventHandler(this.scroll);
			base.SizeChanged += new EventHandler(this.size_changed);
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing && this.BackgroundImage != null)
			{
				this.BackgroundImage.Dispose();
			}
			base.Dispose(disposing);
		}

		private void picturebox_mouse_down(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				this.original = Control.MousePosition;
				this.position = new Point(base.HorizontalScroll.Value, base.VerticalScroll.Value);
			}
		}

		private void picturebox_mouse_move(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				base.AutoScrollPosition = new Point(this.position.X + this.original.X - Control.MousePosition.X, this.position.Y + this.original.Y - Control.MousePosition.Y);
				this.Refresh();
			}
		}

		private void paint(object o, PaintEventArgs e)
		{
			SolidBrush solidBrush = new SolidBrush(this.BackColor);
			e.Graphics.FillRectangle(solidBrush, base.ClientRectangle);
			solidBrush.Dispose();
		}

		private void scroll(object o, ScrollEventArgs e)
		{
			this.Refresh();
		}

		private void size_changed(object o, EventArgs e)
		{
			this.revise_picturebox();
		}

		private void revise_picturebox()
		{
			int x = base.HorizontalScroll.Value;
			int y = base.VerticalScroll.Value;
			int num = base.HorizontalScroll.Maximum - base.ClientSize.Width;
			int num2 = base.VerticalScroll.Maximum - base.ClientSize.Height;
			if (this.picturebox.Width < base.ClientSize.Width)
			{
				this.picturebox.Left = (base.ClientSize.Width - this.picturebox.Width) / 2;
			}
			else if (0 < this.picturebox.Left)
			{
				this.picturebox.Left = 0;
			}
			if (this.picturebox.Height < base.ClientSize.Height)
			{
				this.picturebox.Top = (base.ClientSize.Height - this.picturebox.Height) / 2;
			}
			else if (0 < this.picturebox.Top)
			{
				this.picturebox.Top = 0;
			}
			if (base.HorizontalScroll.Value > num)
			{
				x = ((0 > num) ? 0 : num);
			}
			if (num2 < base.VerticalScroll.Value)
			{
				y = ((0 > num2) ? 0 : num2);
			}
			this.AutoScroll = false;
			this.AutoScroll = true;
			base.AutoScrollPosition = new Point(x, y);
		}
	}

	internal abstract bool enable_save
	{
		get;
	}
}
