using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

internal abstract class laboratory_component_base : laboratory_child_base
{
	protected delegate void package_expanded_event_handler();

	protected SplitContainer hsplitcontainer;

	protected SplitContainer vsplitcontainer;

	protected laboratory_child_base.laboratory_treeview treeview;

	protected laboratory_child_base.laboratory_listview listview;

	protected laboratory_base.laboratory_toolstrip toolstrip;

	protected laboratory_child_base.laboratory_canva canva;

	protected wzarchives archives;

	protected Thread thread;

	protected Thread reserve;

	protected abstract event laboratory_component_base.package_expanded_event_handler package_expanded;

	protected Image treeview_1_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("treeview_1") as Image;
		}
	}

	protected Image treeview_2_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("treeview_2") as Image;
		}
	}

	protected Image treeview_3_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("treeview_3") as Image;
		}
	}

	protected Image treeview_4_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("treeview_4") as Image;
		}
	}

	protected Image toolstrip_stop_image
	{
		get
		{
			return laboratory_base.resource_manager.GetObject("toolstrip_stop") as Image;
		}
	}

	internal override bool enable_save
	{
		get
		{
			return null != this.listview.Tag;
		}
	}

	[DllImport("uxtheme.dll", CharSet = CharSet.Unicode)]
	private static extern int SetWindowTheme(IntPtr hwnd, string pszSubAppName, string pszSubIdList);

	internal abstract bool save_package(bool single, laboratory_settings settings);

	protected abstract void expand_package();

	protected abstract void listview_selected_index_changed(object o, EventArgs e);

	protected laboratory_component_base(laboratory_host proprietor, string location)
	{
		this.hsplitcontainer = new SplitContainer();
		this.vsplitcontainer = new SplitContainer();
		this.treeview = new laboratory_child_base.laboratory_treeview();
		this.listview = new laboratory_child_base.laboratory_listview();
		this.toolstrip = new laboratory_base.laboratory_toolstrip();
		this.canva = new laboratory_child_base.laboratory_canva();
		this.hsplitcontainer.Dock = DockStyle.Fill;
		this.hsplitcontainer.Parent = this;
		this.vsplitcontainer.Dock = DockStyle.Fill;
		this.vsplitcontainer.Orientation = Orientation.Horizontal;
		this.treeview.FullRowSelect = true;
		this.treeview.HideSelection = false;
		this.treeview.HotTracking = true;
		this.treeview.ShowLines = false;
		this.treeview.Dock = DockStyle.Fill;
		this.treeview.ImageList = new ImageList();
		this.treeview.ImageList.ColorDepth = ColorDepth.Depth32Bit;
		this.treeview.ImageList.Images.AddRange(new Image[]
		{
			this.treeview_1_image,
			this.treeview_2_image,
			this.treeview_3_image,
			this.treeview_4_image
		});
		this.treeview.KeyPress += new KeyPressEventHandler(this.treeview_key_press);
		this.treeview.NodeMouseClick += new TreeNodeMouseClickEventHandler(this.treeview_node_mouse_click);
		this.treeview.NodeMouseDoubleClick += new TreeNodeMouseClickEventHandler(this.treeview_node_mouse_double_click);
		this.listview.FullRowSelect = true;
		this.listview.GridLines = true;
		this.listview.HideSelection = false;
		this.listview.MultiSelect = false;
		this.listview.Dock = DockStyle.Fill;
		this.listview.HeaderStyle = ColumnHeaderStyle.None;
		this.listview.View = View.Details;
		this.listview.SmallImageList = new ImageList();
		this.listview.Columns.Add("");
		this.listview.Columns.Add("");
		this.listview.SmallImageList.ColorDepth = ColorDepth.Depth32Bit;
		this.listview.SelectedIndexChanged += new EventHandler(this.listview_selected_index_changed);
		this.toolstrip.GripStyle = ToolStripGripStyle.Hidden;
		this.canva.AutoScroll = true;
		this.canva.BorderStyle = BorderStyle.FixedSingle;
		this.canva.Dock = DockStyle.Fill;
		base.StartPosition = FormStartPosition.WindowsDefaultBounds;
		base.Icon = base.icon;
		this.Text = Path.GetFileName(location);
		base.MdiParent = proprietor;
		base.FormClosed += new FormClosedEventHandler(proprietor.mdi_child_closed);
		this.package_expanded += new laboratory_component_base.package_expanded_event_handler(proprietor.package_expanded);
	}

	protected override void Dispose(bool disposing)
	{
		if (disposing)
		{
			if (this.reserve != null)
			{
				this.thread = null;
				while (this.reserve.IsAlive)
				{
					Application.DoEvents();
				}
			}
			this.treeview.BeginUpdate();
			this.treeview.Nodes.Clear();
			this.treeview.EndUpdate();
			this.listview.BeginUpdate();
			this.listview.SelectedItems.Clear();
			this.listview.Items.Clear();
			this.listview.EndUpdate();
			this.treeview.Tag = null;
			this.listview.Tag = null;
			if (this.archives != null)
			{
				this.archives.dispose();
			}
			GC.Collect();
		}
		base.Dispose(disposing);
	}

	protected void enable_explorer_style(Control control, bool enabled)
	{
		laboratory_component_base.SetWindowTheme(control.Handle, enabled ? "explorer" : "", null);
	}

	protected bool load_archive(string location, bool sort)
	{
		wzarchive wzarchive = new wzarchive(location);
		wzpackage root = wzarchive.get_root();
		if (root != null)
		{
			this.archives = new wzarchives(root, wzarchive);
			this.treeview.Tag = root;
			this.treeview.Nodes.AddRange(this.generate_tree(root, sort, new List<TreeNode>()));
			this.thread = null;
			this.reserve = null;
			return true;
		}
		return false;
	}

	protected TreeNode[] generate_tree(wzpackage proprietor, bool sort, List<TreeNode> nodes)
	{
		foreach (wzpackage current in proprietor.Values)
		{
			TreeNode treeNode = new TreeNode(current.get_identity(), current.get_type() - 1, current.get_type() - 1);
			treeNode.Tag = current;
			nodes.Add(treeNode);
			if (0 < current.Count)
			{
				treeNode.Nodes.AddRange(this.generate_tree(current, sort, new List<TreeNode>()));
			}
		}
		if (sort)
		{
			nodes.Sort(delegate(TreeNode x, TreeNode y)
			{
				wzpackage wzpackage = x.Tag as wzpackage;
				wzpackage wzpackage2 = y.Tag as wzpackage;
				if (wzpackage.get_type() % 2 == 0)
				{
					if (wzpackage2.get_type() % 2 == 0)
					{
						return x.Text.CompareTo(y.Text);
					}
					return -1;
				}
				else
				{
					if (wzpackage2.get_type() % 2 == 0)
					{
						return 1;
					}
					return x.Text.CompareTo(y.Text);
				}
			});
		}
		return nodes.ToArray();
	}

	protected string invalid_name(string name)
	{
		char[] invalidFileNameChars = Path.GetInvalidFileNameChars();
		for (int i = 0; i < invalidFileNameChars.Length; i++)
		{
			char oldChar = invalidFileNameChars[i];
			name = name.Replace(oldChar, '_');
		}
		return name;
	}

	protected void select_item(ListViewItem item)
	{
		if (item != null)
		{
			item.Selected = true;
			this.listview.EnsureVisible(item.Index);
		}
	}

	private void treeview_key_press(object o, KeyPressEventArgs e)
	{
		if ('\r' == e.KeyChar)
		{
			this.expand_package();
		}
	}

	private void treeview_node_mouse_click(object o, TreeNodeMouseClickEventArgs e)
	{
		this.treeview.SelectedNode = e.Node;
	}

	private void treeview_node_mouse_double_click(object o, TreeNodeMouseClickEventArgs e)
	{
		if (MouseButtons.Left == e.Button)
		{
			this.expand_package();
		}
	}
}
