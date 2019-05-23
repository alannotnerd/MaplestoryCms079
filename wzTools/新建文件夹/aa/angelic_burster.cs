using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Windows.Forms;

internal class angelic_burster : laboratory_base
{
	private class hsv
	{
		private object[] properties;

		internal double hue
		{
			get
			{
				return (double)this.properties[0];
			}
			set
			{
				this.properties[0] = value;
			}
		}

		internal double saturation
		{
			get
			{
				return (double)this.properties[1];
			}
			set
			{
				this.properties[1] = value;
			}
		}

		internal double value
		{
			get
			{
				return (double)this.properties[2];
			}
			set
			{
				this.properties[2] = value;
			}
		}

		internal hsv(double hue, double saturation, double value)
		{
			this.properties = new object[]
			{
				hue,
				saturation,
				value
			};
		}

		internal static angelic_burster.hsv rgb_2_hsv(Color color)
		{
			double num = (double)color.R / 255.0;
			double num2 = (double)color.G / 255.0;
			double num3 = (double)color.B / 255.0;
			double num4 = Math.Min(num, Math.Min(num2, num3));
			double num5 = Math.Max(num, Math.Max(num2, num3));
			double num6 = num5 - num4;
			if (0.0 != num6)
			{
				double num7;
				if (num == num5)
				{
					num7 = (num2 - num3) / num6;
				}
				else if (num2 == num5)
				{
					num7 = (num3 - num) / num6 + 2.0;
				}
				else
				{
					num7 = (num - num2) / num6 + 4.0;
				}
				if (0.0 > num7)
				{
					num7 += 6.0;
				}
				return new angelic_burster.hsv(num7 / 6.0, num6 / num5, num5);
			}
			return new angelic_burster.hsv(0.0, 0.0, num5);
		}

		internal static Color hsv_2_rgb(int hue, int saturation, int value)
		{
			return angelic_burster.hsv.hsv_2_rgb((double)hue / 360.0, (double)saturation / 100.0, (double)value / 100.0);
		}

		internal static Color hsv_2_rgb(double hue, double saturation, double value)
		{
			if (0.0 < saturation)
			{
				hue = 6.0 * hue;
				if (6.0 == hue)
				{
					hue = 0.0;
				}
				double num = hue - Math.Floor(hue);
				double num2 = value * (1.0 - saturation);
				double num3 = value * (1.0 - saturation * num);
				double num4 = value * (1.0 - saturation * (1.0 - num));
				switch ((int)Math.Floor(hue))
				{
				case 0:
					hue = value;
					saturation = num4;
					value = num2;
					break;
				case 1:
					hue = num3;
					saturation = value;
					value = num2;
					break;
				case 2:
					hue = num2;
					saturation = value;
					value = num4;
					break;
				case 3:
					hue = num2;
					saturation = num3;
					break;
				case 4:
					hue = num4;
					saturation = num2;
					break;
				case 5:
					hue = value;
					saturation = num2;
					value = num3;
					break;
				default:
					hue = 0.0;
					saturation = 0.0;
					value = 0.0;
					break;
				}
				return Color.FromArgb((int)(255.0 * hue), (int)(255.0 * saturation), (int)(255.0 * value));
			}
			value = 255.0 * value;
			return Color.FromArgb((int)value, (int)value, (int)value);
		}
	}

	private class angelic_wheel : Control
	{
		internal delegate void value_changed_event_handler();

		private object[] properties;

		internal event angelic_burster.angelic_wheel.value_changed_event_handler value_changed;

		internal angelic_burster.hsv hsv
		{
			get
			{
				return (angelic_burster.hsv)this.properties[0];
			}
			set
			{
				this.properties[0] = value;
				this.generate_gradient_triangle();
				this.Refresh();
			}
		}

		private Bitmap wheel
		{
			get
			{
				return this.properties[1] as Bitmap;
			}
		}

		private Bitmap triangle
		{
			get
			{
				return this.properties[2] as Bitmap;
			}
		}

		private int current
		{
			get
			{
				return (int)this.properties[3];
			}
			set
			{
				this.properties[3] = value;
			}
		}

		[DllImport("gdi32.dll")]
		private static extern IntPtr SelectObject(IntPtr hdc, IntPtr hgdiobj);

		[DllImport("gdi32.dll")]
		private static extern IntPtr GetStockObject(int fnObject);

		[DllImport("gdi32.dll")]
		private static extern int SetROP2(IntPtr hdc, int fnDrawMode);

		[DllImport("gdi32.dll")]
		private static extern int Ellipse(IntPtr hdc, int nLeftRect, int nTopRect, int nRightRect, int nBottomRect);

		internal angelic_wheel(angelic_burster.hsv hsv, int size)
		{
			this.properties = new object[]
			{
				hsv,
				new Bitmap(size, size),
				new Bitmap(size - size / 5, size - size / 5),
				0
			};
			this.DoubleBuffered = true;
			base.Size = new Size(size, size);
			base.MouseDown += new MouseEventHandler(this.mousedown);
			base.MouseMove += new MouseEventHandler(this.mousemove);
			base.MouseUp += new MouseEventHandler(this.mouseup);
			base.Paint += new PaintEventHandler(this.paint);
			this.generate_gradient_wheel();
			this.generate_gradient_triangle();
		}

		protected override void Dispose(bool disposing)
		{
			if (this.wheel != null)
			{
				this.wheel.Dispose();
			}
			if (this.triangle != null)
			{
				this.triangle.Dispose();
			}
			base.Dispose(disposing);
		}

		private void mousedown(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				if (this.point_on_wheel((double)e.X, (double)e.Y))
				{
					this.current = 1;
				}
				else
				{
					if (!this.point_on_triangle((double)e.X, (double)e.Y))
					{
						return;
					}
					this.current = 2;
				}
				this.mousemove(o, e);
			}
		}

		private void mousemove(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				if (1 == this.current)
				{
					double num = ((double)this.wheel.Width - 1.0) / 2.0;
					double num2 = Math.Atan2((double)e.Y - num, (double)e.X - num);
					if (0.0 > num2)
					{
						num2 += 6.2831853071795862;
					}
					num2 = (num2 + 2.3561944901923448) / 3.1415926535897931 / 2.0;
					this.hsv = new angelic_burster.hsv(num2 - Math.Floor(num2), this.hsv.saturation, this.hsv.value);
				}
				else
				{
					if (2 != this.current)
					{
						return;
					}
					angelic_burster.hsv hsv = angelic_burster.hsv.rgb_2_hsv(Color.FromArgb(this.compute_color((double)e.X, (double)e.Y)));
					this.hsv.saturation = hsv.saturation;
					this.hsv.value = hsv.value;
					this.Refresh();
				}
				if (this.value_changed != null)
				{
					this.value_changed();
				}
			}
		}

		private void mouseup(object o, MouseEventArgs e)
		{
			this.current = 0;
		}

		private void paint(object o, PaintEventArgs e)
		{
			Bitmap bitmap = new Bitmap(base.Width, base.Height);
			Graphics graphics = Graphics.FromImage(bitmap);
			graphics.DrawImage(this.wheel, PointF.Empty);
			graphics.DrawImage(this.triangle, (float)((double)this.wheel.Width / 10.0), (float)((double)this.wheel.Width / 10.0));
			graphics.Dispose();
			e.Graphics.DrawImage(bitmap, Point.Empty);
			IntPtr hdc = e.Graphics.GetHdc();
			this.draw_ellipse(this.rotate_point(((double)this.wheel.Width - 1.0) / 2.0 - (double)this.wheel.Width / 20.0, 0.0, (double)this.wheel.Width / 2.0, 0), hdc);
			this.draw_ellipse(this.compute_point(), hdc);
			e.Graphics.ReleaseHdc();
			bitmap.Dispose();
		}

		private void draw_ellipse(PointF point, IntPtr hdc)
		{
			int num = (int)(Math.Round((double)point.X) - 2.0);
			int num2 = (int)(Math.Round((double)point.Y) - 2.0);
			angelic_burster.angelic_wheel.SelectObject(hdc, angelic_burster.angelic_wheel.GetStockObject(5));
			angelic_burster.angelic_wheel.SetROP2(hdc, 6);
			angelic_burster.angelic_wheel.Ellipse(hdc, num, num2, num + 5, num2 + 5);
			angelic_burster.angelic_wheel.Ellipse(hdc, num - 1, num2 - 1, num + 6, num2 + 6);
		}

		private void generate_gradient_wheel()
		{
			GraphicsPath graphicsPath = new GraphicsPath();
			GraphicsPath graphicsPath2 = new GraphicsPath();
			Graphics graphics = Graphics.FromImage(this.wheel);
			int num = this.wheel.Width;
			int num2 = num / 10;
			num--;
			graphicsPath.AddEllipse(0, 0, num, num);
			graphicsPath2.AddEllipse(num2, num2, num - num2 * 2, num - num2 * 2);
			graphicsPath.Flatten();
			Region region = new Region(graphicsPath2);
			PathGradientBrush pathGradientBrush = new PathGradientBrush(graphicsPath);
			Color[] array = new Color[graphicsPath.PointCount];
			int num3 = 0;
			while (graphicsPath.PointCount > num3)
			{
				double num4 = (double)num3 / (double)graphicsPath.PointCount + 0.375;
				if (0.0 > num4)
				{
					num4 += 1.0;
				}
				else if (1.0 <= num4)
				{
					num4 -= 1.0;
				}
				array[num3] = angelic_burster.hsv.hsv_2_rgb(num4, 1.0, 1.0);
				num3++;
			}
			pathGradientBrush.SurroundColors = array;
			graphics.SetClip(region, CombineMode.Exclude);
			graphics.FillEllipse(pathGradientBrush, 0, 0, num, num);
			graphics.SmoothingMode = SmoothingMode.AntiAlias;
			graphics.DrawEllipse(SystemPens.Control, 0, 0, num, num);
			graphics.DrawPath(SystemPens.Control, graphicsPath2);
			graphics.Dispose();
			region.Dispose();
			pathGradientBrush.Dispose();
			graphicsPath2.Dispose();
			graphicsPath.Dispose();
		}

		private unsafe void generate_gradient_triangle()
		{
			BitmapData bitmapData = this.triangle.LockBits(new Rectangle(Point.Empty, this.triangle.Size), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
			int* ptr = (int*)((void*)bitmapData.Scan0);
			PointF pointF;
			PointF pointF2;
			PointF pointF3;
			this.compute_triangle(out pointF, out pointF2, out pointF3);
			double vsh = this.vector_cross(pointF3, pointF2, pointF);
			int num = 0;
			while (this.triangle.Height > num)
			{
				int num2 = 0;
				while (this.triangle.Width > num2)
				{
					Point p = new Point(num2, num);
					*(ptr++) = this.compute_color(vsh, this.vector_cross(pointF3, pointF2, p), this.vector_cross(pointF, pointF3, p), this.vector_cross(pointF2, pointF, p), false);
					num2++;
				}
				num++;
			}
			this.triangle.UnlockBits(bitmapData);
			Graphics graphics = Graphics.FromImage(this.triangle);
			graphics.SmoothingMode = SmoothingMode.AntiAlias;
			graphics.DrawPolygon(SystemPens.Control, new PointF[]
			{
				pointF,
				pointF2,
				pointF3
			});
			graphics.Dispose();
		}

		private void compute_triangle(out PointF hue, out PointF saturation, out PointF value)
		{
			double num = (double)this.triangle.Width / 2.0;
			hue = this.rotate_point(num, 0.0, num, 0);
			saturation = this.rotate_point(num, 0.0, num, -120);
			value = this.rotate_point(num, 0.0, num, -240);
		}

		private PointF rotate_point(double x, double y, double position, int angelic)
		{
			double num = this.hsv.hue * 3.1415926535897931 * 2.0 + 3.1415926535897931 * ((double)angelic - 135.0) / 180.0;
			double num2 = Math.Sin(num);
			double num3 = Math.Cos(num);
			return new PointF((float)(position + num3 * x - num2 * y), (float)(position + num3 * y + num2 * x));
		}

		private PointF compute_point()
		{
			double num = (double)(this.wheel.Width - this.triangle.Width) / 2.0;
			PointF pointF;
			PointF pointF2;
			PointF pointF3;
			this.compute_triangle(out pointF, out pointF2, out pointF3);
			return new PointF((float)(num + (double)pointF3.X + this.hsv.value * (double)(pointF2.X - pointF3.X) + this.hsv.value * this.hsv.saturation * (double)(pointF.X - pointF2.X)), (float)(num + (double)pointF3.Y + this.hsv.value * (double)(pointF2.Y - pointF3.Y) + this.hsv.value * this.hsv.saturation * (double)(pointF.Y - pointF2.Y)));
		}

		private bool point_on_wheel(double x, double y)
		{
			double num = ((double)this.wheel.Width - 1.0) / 2.0;
			double num2 = num - (double)this.wheel.Width / 10.0;
			x -= num;
			y -= num;
			x = x * x + y * y;
			return num * num >= x && num2 * num2 <= x;
		}

		private bool point_on_triangle(double x, double y)
		{
			double num = (double)(this.wheel.Width - this.triangle.Width) / 2.0;
			PointF p = new PointF((float)(x - num), (float)(y - num));
			PointF pointF;
			PointF pointF2;
			PointF pointF3;
			this.compute_triangle(out pointF, out pointF2, out pointF3);
			return 0.0 <= this.vector_cross(pointF3, pointF2, p) && 0.0 <= this.vector_cross(pointF, pointF3, p) && 0.0 <= this.vector_cross(pointF2, pointF, p);
		}

		private double vector_cross(PointF a, PointF b, PointF p)
		{
			return (double)((a.X - p.X) * (b.Y - p.Y) - (a.Y - p.Y) * (b.X - p.X));
		}

		private double vector_dot(PointF a, PointF b, PointF p)
		{
			return (double)((a.X - p.X) * (b.X - p.X) + (a.Y - p.Y) * (b.Y - p.Y));
		}

		private int compute_color(double x, double y)
		{
			double num = (double)(this.wheel.Width - this.triangle.Width) / 2.0;
			PointF p = new PointF((float)(x - num), (float)(y - num));
			PointF pointF;
			PointF pointF2;
			PointF pointF3;
			this.compute_triangle(out pointF, out pointF2, out pointF3);
			double vsh = this.vector_cross(pointF3, pointF2, pointF);
			double num2 = this.vector_cross(pointF3, pointF2, p);
			double num3 = this.vector_cross(pointF, pointF3, p);
			double num4 = this.vector_cross(pointF2, pointF, p);
			if (0.0 > num2)
			{
				p = this.closest_point(pointF2, pointF3, p);
			}
			else if (0.0 > num3)
			{
				p = this.closest_point(pointF3, pointF, p);
			}
			else
			{
				if (0.0 <= num4)
				{
					return this.compute_color(vsh, num2, num3, num4, false);
				}
				p = this.closest_point(pointF, pointF2, p);
			}
			return this.compute_color(vsh, this.vector_cross(pointF3, pointF2, p), this.vector_cross(pointF, pointF3, p), this.vector_cross(pointF2, pointF, p), true);
		}

		private PointF closest_point(PointF a, PointF b, PointF p)
		{
			double num = this.vector_dot(b, p, a) / this.vector_dot(b, b, a);
			if (0.0 >= num)
			{
				return a;
			}
			if (1.0 <= num)
			{
				return b;
			}
			return new PointF((float)((double)a.X + num * (double)(b.X - a.X)), (float)((double)a.Y + num * (double)(b.Y - a.Y)));
		}

		private int compute_color(double vsh, double vsp, double hvp, double shp, bool coerce)
		{
			if ((0.0 <= vsp && 0.0 <= hvp && 0.0 <= shp) || coerce)
			{
				Color color = angelic_burster.hsv.hsv_2_rgb(this.hsv.hue, 1.0, 1.0);
				hvp = 255.0 * hvp;
				return Color.FromArgb(255, (int)(((double)color.R * vsp + hvp) / vsh), (int)(((double)color.G * vsp + hvp) / vsh), (int)(((double)color.B * vsp + hvp) / vsh)).ToArgb();
			}
			return 0;
		}
	}

	private class angelic_slider : Control
	{
		internal delegate void value_changed_event_handler(object o);

		private object[] properties;

		internal event angelic_burster.angelic_slider.value_changed_event_handler value_changed;

		internal int value
		{
			get
			{
				return (int)this.properties[0];
			}
			set
			{
				if (0 > value)
				{
					value = 0;
				}
				else if (this.maximum < value)
				{
					value = this.maximum;
				}
				this.properties[0] = value;
				this.Refresh();
			}
		}

		internal int maximum
		{
			get
			{
				return (int)this.properties[1];
			}
		}

		private string text
		{
			get
			{
				return this.properties[2] + ":" + this.value;
			}
		}

		internal Image image
		{
			get
			{
				return this.properties[3] as Image;
			}
		}

		private bool hovered
		{
			get
			{
				return (bool)this.properties[4];
			}
			set
			{
				this.properties[4] = value;
				this.paint(this, new PaintEventArgs(Graphics.FromHwnd(base.Handle), base.ClientRectangle));
			}
		}

		internal angelic_slider(int value, int maximum, string prefix, int width, int height)
		{
			this.properties = new object[]
			{
				value,
				maximum,
				prefix,
				new Bitmap(width, height),
				false
			};
			this.DoubleBuffered = true;
			base.Size = new Size(width + 40, height + 9);
			base.MouseDown += new MouseEventHandler(this.mouse_down);
			base.MouseEnter += new EventHandler(this.mouse_enter);
			base.MouseLeave += new EventHandler(this.mouse_leave);
			base.MouseMove += new MouseEventHandler(this.mouse_move);
			base.Paint += new PaintEventHandler(this.paint);
		}

		protected override void Dispose(bool disposing)
		{
			if (this.image != null)
			{
				this.image.Dispose();
			}
			base.Dispose(disposing);
		}

		private void mouse_down(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				this.mouse_move(o, e);
				return;
			}
			if (MouseButtons.Right == e.Button)
			{
				this.value++;
				if (this.value_changed != null)
				{
					this.value_changed(this);
				}
			}
		}

		private void mouse_enter(object o, EventArgs e)
		{
			this.hovered = true;
		}

		private void mouse_leave(object o, EventArgs e)
		{
			this.hovered = false;
		}

		private void mouse_move(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button)
			{
				Point point = base.PointToClient(Control.MousePosition);
				this.value = (int)((double)(this.maximum * (point.X - 2)) / ((double)base.Width - 40.0));
				if (this.value_changed != null)
				{
					this.value_changed(this);
				}
				this.Refresh();
			}
		}

		private void paint(object o, PaintEventArgs e)
		{
			Bitmap bitmap = new Bitmap(base.Width, base.Height);
			Graphics graphics = Graphics.FromImage(bitmap);
			int num = (int)((double)this.value * ((double)base.Width - 41.0) / (double)this.maximum);
			graphics.Clear(this.BackColor);
			angelic_burster.draw_border(this.hovered, new Rectangle(1, 0, base.Width - 36, base.Height - 5), graphics);
			Pen pen;
			if (this.hovered)
			{
				pen = new Pen(Color.FromArgb(195, 118, 61));
			}
			else
			{
				pen = new Pen(Color.FromArgb(115, 115, 115));
			}
			graphics.DrawPolygon(pen, new Point[]
			{
				new Point(num + 3, base.Height - 5),
				new Point(num + 6, base.Height - 2),
				new Point(num + 6, base.Height - 1),
				new Point(num, base.Height - 1),
				new Point(num, base.Height - 2)
			});
			graphics.DrawString(this.text, this.Font, SystemBrushes.ControlText, (float)(base.Width - 35), 0f);
			if (this.image != null)
			{
				graphics.DrawImage(this.image, 3, 2, base.Width - 40, base.Height - 9);
			}
			graphics.Dispose();
			pen.Dispose();
			e.Graphics.DrawImage(bitmap, 0, 0);
			bitmap.Dispose();
		}

		private void update_gradient_front(Color[] colors)
		{
			float[] array = new float[colors.Length];
			Graphics graphics = Graphics.FromImage(this.image);
			Rectangle rect = new Rectangle(Point.Empty, this.image.Size);
			LinearGradientBrush linearGradientBrush = new LinearGradientBrush(rect, Color.Transparent, Color.Transparent, 0f);
			ColorBlend colorBlend = new ColorBlend();
			int num = 0;
			while (array.Length > num)
			{
				array[num] = (float)num / ((float)array.Length - 1f);
				num++;
			}
			colorBlend.Colors = colors;
			colorBlend.Positions = array;
			linearGradientBrush.InterpolationColors = colorBlend;
			graphics.FillRectangle(linearGradientBrush, rect);
			graphics.Dispose();
			linearGradientBrush.Dispose();
			this.Refresh();
		}

		internal void update_gradient(Color[] colors)
		{
			Graphics graphics = Graphics.FromImage(this.image);
			TextureBrush textureBrush = angelic_burster.generate_pattern_brush((base.Height - 9) / 2);
			graphics.FillRectangle(textureBrush, new Rectangle(Point.Empty, this.image.Size));
			graphics.Dispose();
			textureBrush.Dispose();
			this.update_gradient_front(colors);
		}
	}

	private class angelic_stack : Control
	{
		internal delegate void selected_index_changed_event_handler(int index, MouseButtons button);

		private object[] properties;

		internal event angelic_burster.angelic_stack.selected_index_changed_event_handler selected_index_changed;

		internal Color this[int index]
		{
			get
			{
				return (this.properties[0] as Color[])[index];
			}
			set
			{
				(this.properties[0] as Color[])[index] = value;
				this.Refresh();
			}
		}

		internal int count
		{
			get
			{
				return (this.properties[0] as Color[]).Length;
			}
		}

		private bool hovered
		{
			get
			{
				return (bool)this.properties[1];
			}
			set
			{
				this.properties[1] = value;
				this.paint(this, new PaintEventArgs(Graphics.FromHwnd(base.Handle), base.ClientRectangle));
			}
		}

		internal angelic_stack(int size, Color[] colors)
		{
			this.properties = new object[]
			{
				colors,
				false
			};
			this.DoubleBuffered = true;
			base.Size = new Size(size * colors.Length + 4, size + 4);
			base.MouseDown += new MouseEventHandler(this.mouse_down);
			base.MouseEnter += new EventHandler(this.mouse_enter);
			base.MouseLeave += new EventHandler(this.mouse_leave);
			base.Paint += new PaintEventHandler(this.paint);
		}

		private void mouse_down(object o, MouseEventArgs e)
		{
			if ((MouseButtons.Left == e.Button || MouseButtons.Right == e.Button) && this.selected_index_changed != null && 1 < e.X && base.Width - 2 > e.X && 1 < e.Y && base.Height - 2 > e.Y)
			{
				this.selected_index_changed((e.X - 4) / (base.Height - 4), e.Button);
			}
		}

		private void mouse_enter(object o, EventArgs e)
		{
			this.hovered = true;
		}

		private void mouse_leave(object o, EventArgs e)
		{
			this.hovered = false;
		}

		private void paint(object o, PaintEventArgs e)
		{
			Bitmap bitmap = new Bitmap(base.Width, base.Height);
			Graphics graphics = Graphics.FromImage(bitmap);
			int num = base.Height - 4;
			TextureBrush textureBrush = angelic_burster.generate_pattern_brush(num / 2);
			angelic_burster.draw_border(this.hovered, new Rectangle(0, 0, base.Width, base.Height), e.Graphics);
			textureBrush.TranslateTransform(2f, 2f);
			graphics.FillRectangle(textureBrush, 2, 2, base.Width - 4, num);
			int num2 = 0;
			while (this.count > num2)
			{
				SolidBrush solidBrush = new SolidBrush(this[num2]);
				graphics.FillRectangle(solidBrush, 2 + num * num2, 2, num, num);
				solidBrush.Dispose();
				num2++;
			}
			graphics.Dispose();
			textureBrush.Dispose();
			e.Graphics.DrawImage(bitmap, 0, 0);
			bitmap.Dispose();
		}
	}

	private class angelic_indicator : Control
	{
		internal delegate void restore_event_handler(Color color);

		private object[] properties;

		internal event angelic_burster.angelic_indicator.restore_event_handler restore;

		internal Color color_elder
		{
			private get
			{
				return (Color)this.properties[0];
			}
			set
			{
				this.properties[0] = value;
				this.Refresh();
			}
		}

		internal Color color_current
		{
			private get
			{
				return (Color)this.properties[1];
			}
			set
			{
				this.properties[1] = value;
				this.Refresh();
			}
		}

		private bool hovered
		{
			get
			{
				return (bool)this.properties[2];
			}
			set
			{
				this.properties[2] = value;
				this.paint(this, new PaintEventArgs(Graphics.FromHwnd(base.Handle), base.ClientRectangle));
			}
		}

		internal angelic_indicator(Color elder, Color current)
		{
			this.properties = new object[]
			{
				elder,
				current,
				false
			};
			this.DoubleBuffered = true;
			base.MouseDown += new MouseEventHandler(this.mouse_down);
			base.MouseEnter += new EventHandler(this.mouse_enter);
			base.MouseLeave += new EventHandler(this.mouse_leave);
			base.Paint += new PaintEventHandler(this.paint);
		}

		private void mouse_down(object o, MouseEventArgs e)
		{
			if (MouseButtons.Left == e.Button && 1 < e.X && 1 < e.Y && base.Width / 2 > e.X && base.Height - 2 > e.Y && this.restore != null)
			{
				this.restore(this.color_elder);
			}
		}

		private void mouse_enter(object o, EventArgs e)
		{
			this.hovered = true;
		}

		private void mouse_leave(object o, EventArgs e)
		{
			this.hovered = false;
		}

		private void paint(object o, PaintEventArgs e)
		{
			Bitmap bitmap = new Bitmap(base.Width, base.Height);
			Graphics graphics = Graphics.FromImage(bitmap);
			Brush brush = new SolidBrush(this.color_elder);
			Brush brush2 = new SolidBrush(this.color_current);
			int num = base.Height - 4;
			TextureBrush textureBrush = angelic_burster.generate_pattern_brush(num / 2);
			angelic_burster.draw_border(this.hovered, new Rectangle(0, 0, base.Width, base.Height), e.Graphics);
			textureBrush.TranslateTransform(2f, 2f);
			graphics.FillRectangle(textureBrush, 2, 2, base.Width - 4, num);
			graphics.FillRectangle(brush, 2, 2, num, num);
			graphics.FillRectangle(brush2, num + 2, 2, num, num);
			graphics.Dispose();
			textureBrush.Dispose();
			brush.Dispose();
			brush2.Dispose();
			e.Graphics.DrawImage(bitmap, 0, 0);
			bitmap.Dispose();
		}
	}

	private const int max_count = 14;

	private static readonly Color[] defaults = new Color[]
	{
		Color.Transparent,
		Color.FromArgb(253, 241, 241),
		Color.FromArgb(238, 201, 179),
		Color.FromArgb(230, 181, 219),
		Color.FromArgb(230, 146, 155),
		Color.FromArgb(158, 222, 247),
		Color.FromArgb(178, 173, 207),
		Color.FromArgb(168, 149, 163),
		Color.FromArgb(194, 135, 121),
		Color.FromArgb(214, 112, 145),
		Color.FromArgb(162, 81, 107),
		Color.FromArgb(88, 187, 237),
		Color.FromArgb(83, 92, 165),
		Color.FromArgb(72, 35, 49)
	};

	private angelic_burster.angelic_wheel wheel;

	private angelic_burster.angelic_slider hue;

	private angelic_burster.angelic_slider saturation;

	private angelic_burster.angelic_slider value;

	private angelic_burster.angelic_slider red;

	private angelic_burster.angelic_slider green;

	private angelic_burster.angelic_slider blue;

	private angelic_burster.angelic_slider alpha;

	private angelic_burster.angelic_stack stack;

	private angelic_burster.angelic_indicator indicator;

	private Button ok;

	private Button cancel;

	private Color color_elder;

	internal Color color
	{
		get
		{
			return Color.FromArgb(this.alpha.value, this.red.value, this.green.value, this.blue.value);
		}
	}

	internal angelic_burster(Color color)
	{
		angelic_burster.hsv hsv = angelic_burster.hsv.rgb_2_hsv(color);
		this.wheel = new angelic_burster.angelic_wheel(hsv, 150);
		this.hue = new angelic_burster.angelic_slider((int)(360.0 * hsv.hue), 360, "H", 150, 6);
		this.saturation = new angelic_burster.angelic_slider((int)(100.0 * hsv.saturation), 100, "S", 150, 6);
		this.value = new angelic_burster.angelic_slider((int)(100.0 * hsv.value), 100, "V", 150, 6);
		this.red = new angelic_burster.angelic_slider((int)color.R, 255, "R", 150, 6);
		this.green = new angelic_burster.angelic_slider((int)color.G, 255, "G", 150, 6);
		this.blue = new angelic_burster.angelic_slider((int)color.B, 255, "B", 150, 6);
		this.alpha = new angelic_burster.angelic_slider((int)color.A, 255, "A", 150, 6);
		this.stack = new angelic_burster.angelic_stack(10, this.load_colors());
		this.indicator = new angelic_burster.angelic_indicator(color, color);
		this.ok = new Button();
		this.cancel = new Button();
		this.wheel.Location = new Point(5, 5);
		this.wheel.Parent = this;
		this.wheel.value_changed += new angelic_burster.angelic_wheel.value_changed_event_handler(this.wheel_value_changed);
		this.hue.Location = new Point(160, 5);
		this.hue.Parent = this;
		this.hue.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.hsv_value_changed);
		this.saturation.Location = new Point(160, 25);
		this.saturation.Parent = this;
		this.saturation.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.hsv_value_changed);
		this.value.Location = new Point(160, 45);
		this.value.Parent = this;
		this.value.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.hsv_value_changed);
		this.red.Location = new Point(160, 70);
		this.red.Parent = this;
		this.red.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.rgb_value_changed);
		this.green.Location = new Point(160, 90);
		this.green.Parent = this;
		this.green.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.rgb_value_changed);
		this.blue.Location = new Point(160, 110);
		this.blue.Parent = this;
		this.blue.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.rgb_value_changed);
		this.alpha.Location = new Point(160, 130);
		this.alpha.Parent = this;
		this.alpha.value_changed += new angelic_burster.angelic_slider.value_changed_event_handler(this.alpha_value_changed);
		this.stack.Location = new Point(5, 161);
		this.stack.Parent = this;
		this.stack.selected_index_changed += new angelic_burster.angelic_stack.selected_index_changed_event_handler(this.stack_selected_index_changed);
		this.indicator.Location = new Point(161, 161);
		this.indicator.Size = new Size(24, 14);
		this.indicator.Parent = this;
		this.indicator.restore += new angelic_burster.angelic_indicator.restore_event_handler(this.indicator_restore);
		this.ok.DialogResult = DialogResult.OK;
		this.ok.Location = new Point(235, 155);
		this.ok.Size = new Size(55, 20);
		this.ok.Parent = this;
		this.cancel.DialogResult = DialogResult.Cancel;
		this.cancel.Location = new Point(295, 155);
		this.cancel.Size = new Size(55, 20);
		this.cancel.Parent = this;
		base.MaximizeBox = false;
		base.MinimizeBox = false;
		base.ShowInTaskbar = false;
		base.FormBorderStyle = FormBorderStyle.FixedDialog;
		base.StartPosition = FormStartPosition.CenterParent;
		base.ClientSize = new Size(355, 180);
		base.AcceptButton = this.ok;
		base.CancelButton = this.cancel;
		base.FormClosing += new FormClosingEventHandler(this.form_closing);
		this.color_elder = color;
		this.hue.update_gradient(new Color[]
		{
			Color.FromArgb(255, 0, 0),
			Color.FromArgb(255, 255, 0),
			Color.FromArgb(0, 255, 0),
			Color.FromArgb(0, 255, 255),
			Color.FromArgb(0, 0, 255),
			Color.FromArgb(255, 0, 255),
			Color.FromArgb(255, 0, 0)
		});
		this.saturation.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 0, this.value.value),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 100, this.value.value)
		});
		this.value.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 0),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 100)
		});
		this.red.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color.G, (int)color.B),
			Color.FromArgb(255, (int)color.G, (int)color.B)
		});
		this.green.update_gradient(new Color[]
		{
			Color.FromArgb((int)color.R, 0, (int)color.B),
			Color.FromArgb((int)color.R, 255, (int)color.B)
		});
		this.blue.update_gradient(new Color[]
		{
			Color.FromArgb((int)color.R, (int)color.G, 0),
			Color.FromArgb((int)color.R, (int)color.G, 255)
		});
		this.alpha.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color.R, (int)color.G, (int)color.B),
			Color.FromArgb(255, (int)color.R, (int)color.G, (int)color.B)
		});
		this.update_ui_language();
	}

	internal override void update_ui_language()
	{
		this.ok.Text = laboratory_language.query_entry("angelic_burster_ok");
		this.cancel.Text = laboratory_language.query_entry("angelic_burster_cancel");
		this.update_caption();
		base.update_ui_font();
	}

	private Color[] load_colors()
	{
		Color[] array = angelic_burster.defaults;
		string[] array2 = (laboratory_settings.query_entry(laboratory_settings.load_entries(), "angelic_burster", "") as string).Replace(" ", "").Split(new char[]
		{
			','
		}, StringSplitOptions.RemoveEmptyEntries);
		int num = 0;
		while (14 > num && array2.Length > num)
		{
			int argb;
			if (int.TryParse(array2[num], out argb))
			{
				array[num] = Color.FromArgb(argb);
			}
			num++;
		}
		return array;
	}

	private void update_caption()
	{
		this.Text = laboratory_language.query_entry("angelic_burster_caption") + " - " + string.Format("{0:X2}{1:X2}{2:X2}{3:X2}", new object[]
		{
			this.red.value,
			this.green.value,
			this.blue.value,
			this.alpha.value
		});
	}

	private void wheel_value_changed()
	{
		angelic_burster.hsv hsv = this.wheel.hsv;
		this.update_parameters(hsv, Color.FromArgb(this.alpha.value, angelic_burster.hsv.hsv_2_rgb(hsv.hue, hsv.saturation, hsv.value)));
	}

	private void hsv_value_changed(object o)
	{
		Color color_current = Color.FromArgb(this.alpha.value, angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, this.value.value));
		this.wheel.hsv = new angelic_burster.hsv((double)this.hue.value / 360.0, (double)this.saturation.value / 100.0, (double)this.value.value / 100.0);
		if (this.saturation != o)
		{
			this.saturation.update_gradient(new Color[]
			{
				angelic_burster.hsv.hsv_2_rgb(this.hue.value, 0, this.value.value),
				angelic_burster.hsv.hsv_2_rgb(this.hue.value, 100, this.value.value)
			});
		}
		if (this.value != o)
		{
			this.value.update_gradient(new Color[]
			{
				angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 0),
				angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 100)
			});
		}
		this.red.value = (int)color_current.R;
		this.green.value = (int)color_current.G;
		this.blue.value = (int)color_current.B;
		this.red.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color_current.G, (int)color_current.B),
			Color.FromArgb(255, (int)color_current.G, (int)color_current.B)
		});
		this.green.update_gradient(new Color[]
		{
			Color.FromArgb((int)color_current.R, 0, (int)color_current.B),
			Color.FromArgb((int)color_current.R, 255, (int)color_current.B)
		});
		this.blue.update_gradient(new Color[]
		{
			Color.FromArgb((int)color_current.R, (int)color_current.G, 0),
			Color.FromArgb((int)color_current.R, (int)color_current.G, 255)
		});
		this.alpha.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color_current.R, (int)color_current.G, (int)color_current.B),
			Color.FromArgb(255, (int)color_current.R, (int)color_current.G, (int)color_current.B)
		});
		this.indicator.color_current = color_current;
		this.update_caption();
	}

	private void rgb_value_changed(object o)
	{
		Color color = Color.FromArgb(this.alpha.value, this.red.value, this.green.value, this.blue.value);
		angelic_burster.hsv hsv = angelic_burster.hsv.rgb_2_hsv(color);
		this.wheel.hsv = hsv;
		this.hue.value = (int)(360.0 * hsv.hue);
		this.saturation.value = (int)(100.0 * hsv.saturation);
		this.value.value = (int)(100.0 * hsv.value);
		this.saturation.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 0, this.value.value),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 100, this.value.value)
		});
		this.value.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 0),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 100)
		});
		if (this.red != o)
		{
			this.red.update_gradient(new Color[]
			{
				Color.FromArgb(0, this.green.value, this.blue.value),
				Color.FromArgb(255, this.green.value, this.blue.value)
			});
		}
		if (this.green != o)
		{
			this.green.update_gradient(new Color[]
			{
				Color.FromArgb(this.red.value, 0, this.blue.value),
				Color.FromArgb(this.red.value, 255, this.blue.value)
			});
		}
		if (this.blue != o)
		{
			this.blue.update_gradient(new Color[]
			{
				Color.FromArgb(this.red.value, this.green.value, 0),
				Color.FromArgb(this.red.value, this.green.value, 255)
			});
		}
		this.alpha.update_gradient(new Color[]
		{
			Color.FromArgb(0, this.red.value, this.green.value, this.blue.value),
			Color.FromArgb(255, this.red.value, this.green.value, this.blue.value)
		});
		this.indicator.color_current = color;
		this.update_caption();
	}

	private void alpha_value_changed(object o)
	{
		this.indicator.color_current = Color.FromArgb(this.alpha.value, this.red.value, this.green.value, this.blue.value);
		this.update_caption();
	}

	private void stack_selected_index_changed(int index, MouseButtons button)
	{
		if (MouseButtons.Left == button)
		{
			this.indicator_restore(this.stack[index]);
		}
		else if (MouseButtons.Right == button)
		{
			this.stack[index] = Color.FromArgb(this.alpha.value, this.red.value, this.green.value, this.blue.value);
		}
		this.update_caption();
	}

	private void indicator_restore(Color color)
	{
		angelic_burster.hsv hsv = angelic_burster.hsv.rgb_2_hsv(color);
		this.wheel.hsv = hsv;
		this.update_parameters(hsv, color);
	}

	private void form_closing(object o, FormClosingEventArgs e)
	{
		if (DialogResult.OK == base.DialogResult)
		{
			string text = "";
			int num = 0;
			while (this.stack.count > num)
			{
				text = text + "," + this.stack[num].ToArgb();
				num++;
			}
			laboratory_settings.append_angelic(text.Remove(0, 1));
		}
	}

	private void update_parameters(angelic_burster.hsv hsv, Color color)
	{
		this.hue.value = (int)(360.0 * hsv.hue);
		this.saturation.value = (int)(100.0 * hsv.saturation);
		this.value.value = (int)(100.0 * hsv.value);
		this.saturation.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 0, this.value.value),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, 100, this.value.value)
		});
		this.value.update_gradient(new Color[]
		{
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 0),
			angelic_burster.hsv.hsv_2_rgb(this.hue.value, this.saturation.value, 100)
		});
		this.red.value = (int)color.R;
		this.green.value = (int)color.G;
		this.blue.value = (int)color.B;
		this.alpha.value = (int)color.A;
		this.red.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color.G, (int)color.B),
			Color.FromArgb(255, (int)color.G, (int)color.B)
		});
		this.green.update_gradient(new Color[]
		{
			Color.FromArgb((int)color.R, 0, (int)color.B),
			Color.FromArgb((int)color.R, 255, (int)color.B)
		});
		this.blue.update_gradient(new Color[]
		{
			Color.FromArgb((int)color.R, (int)color.G, 0),
			Color.FromArgb((int)color.R, (int)color.G, 255)
		});
		this.alpha.update_gradient(new Color[]
		{
			Color.FromArgb(0, (int)color.R, (int)color.G, (int)color.B),
			Color.FromArgb(255, (int)color.R, (int)color.G, (int)color.B)
		});
		this.indicator.color_current = color;
		this.update_caption();
	}

	private static void draw_border(bool hovered, Rectangle rectangle, Graphics graphics)
	{
		Pen pen;
		if (hovered)
		{
			pen = new Pen(Color.FromArgb(215, 140, 84));
		}
		else
		{
			pen = new Pen(Color.FromArgb(167, 167, 167));
		}
		graphics.DrawLine(pen, rectangle.X + 1, rectangle.Y, rectangle.X + rectangle.Width - 2, rectangle.Y);
		graphics.DrawLine(pen, rectangle.X + 1, rectangle.Y + rectangle.Height - 1, rectangle.X + rectangle.Width - 2, rectangle.Y + rectangle.Height - 1);
		graphics.DrawLine(pen, rectangle.X, rectangle.Y + 1, rectangle.X, rectangle.Y + rectangle.Height - 2);
		graphics.DrawLine(pen, rectangle.X + rectangle.Width - 1, rectangle.Y + 1, rectangle.X + rectangle.Width - 1, rectangle.Y + rectangle.Height - 2);
	}

	private static TextureBrush generate_pattern_brush(int size)
	{
		Bitmap bitmap = new Bitmap(size * 2, size * 2);
		Graphics graphics = Graphics.FromImage(bitmap);
		graphics.FillRectangles(Brushes.LightGray, new Rectangle[]
		{
			new Rectangle(0, 0, size, size),
			new Rectangle(size, size, size, size)
		});
		graphics.FillRectangles(Brushes.White, new Rectangle[]
		{
			new Rectangle(0, size, size, size),
			new Rectangle(size, 0, size, size)
		});
		graphics.Dispose();
		return new TextureBrush(bitmap);
	}
}
