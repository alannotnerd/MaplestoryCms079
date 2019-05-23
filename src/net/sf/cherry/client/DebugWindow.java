package net.sf.cherry.client;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.LayoutStyle;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

import net.sf.cherry.tools.MaplePacketCreator;

public class DebugWindow extends JFrame {

    private MapleClient c;
    private JButton jButton1;
    private JLabel jLabel1;
    private JPanel jPanel1;
    private JScrollPane jScrollPane1;
    private JScrollPane jScrollPane2;
    private JTextArea jTextArea1;
    private JTextArea jTextArea2;

    public DebugWindow() {
        initComponents();
    }

    public MapleClient getC() {
        return this.c;
    }

    public void setC(MapleClient c) {
        this.c = c;
        if (c.getPlayer() != null) {
            setTitle("玩家: " + c.getPlayer().getName() + " - 封包测试");
        }
    }

    private void initComponents() {
        this.jScrollPane1 = new JScrollPane();
        this.jTextArea1 = new JTextArea();
        this.jPanel1 = new JPanel();
        this.jScrollPane2 = new JScrollPane();
        this.jTextArea2 = new JTextArea();
        this.jButton1 = new JButton();
        this.jLabel1 = new JLabel();

        this.jTextArea1.setColumns(20);
        this.jTextArea1.setRows(5);
        this.jScrollPane1.setViewportView(this.jTextArea1);

        setDefaultCloseOperation(3);

        this.jTextArea2.setColumns(20);
        this.jTextArea2.setRows(5);
        this.jScrollPane2.setViewportView(this.jTextArea2);

        this.jButton1.setText("发送封包");
        this.jButton1.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent evt) {
                DebugWindow.this.jButton1ActionPerformed(evt);
            }
        });
        GroupLayout jPanel1Layout = new GroupLayout(this.jPanel1);
        this.jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jScrollPane2, -1, 375, 32767).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jLabel1).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, -1, 32767).addComponent(this.jButton1)));

        jPanel1Layout.setVerticalGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(jPanel1Layout.createSequentialGroup().addComponent(this.jScrollPane2, -2, 156, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, 13, 32767).addGroup(jPanel1Layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton1).addComponent(this.jLabel1))));

        GroupLayout layout = new GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(this.jPanel1, -1, -1, 32767).addContainerGap()));

        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(this.jPanel1, -1, -1, 32767).addContainerGap()));

        pack();
    }

    private void jButton1ActionPerformed(ActionEvent evt) {
        if (this.c == null) {
            this.jLabel1.setText("发送失败，客户为空.");
            return;
           
        }

        String data = this.jTextArea1.getText();
        this.jTextArea1.setText(null);
        this.jLabel1.setText(null);
        if ((this.c != null) && (data != null)) {
            this.c.getSession().write(MaplePacketCreator.getPacketFromHexString(data));
            this.jLabel1.setText("发送成功 ");
            this.c.getPlayer().dropMessage(6, "封包数据：" + data);
        } else {
            this.jLabel1.setText("发送失败 ");
            this.c.getPlayer().dropMessage(6, "封包数据：" + data);
        }
    }

    public static void main(String[] args) {
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedLookAndFeelException ex) {
            Logger.getLogger(DebugWindow.class.getName()).log(Level.SEVERE, null, ex);
        }

        EventQueue.invokeLater(new Runnable() {

            public void run() {
                new DebugWindow().setVisible(true);
            }
        });
    }
}