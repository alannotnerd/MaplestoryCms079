package net.sf.cherry.server;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormatSymbols;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Properties;

import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import constants.ServerConfig;
import net.sf.cherry.database.DatabaseConnection;

public class InactiveAccountDeleterWindow extends JFrame {

    Calendar c = Calendar.getInstance();
    boolean deleteConfirmed = false;
    private JComboBox Day;
    private JButton DeleteStart;
    private JComboBox Hour;
    private JComboBox Minute;
    private JComboBox Month;
    private JComboBox Second;
    private JComboBox Year;
    private JLabel jLabel1;
    private JLabel jLabel2;
    private JLabel jLabel3;
    private JLabel jLabel4;
    private JLabel jLabel5;
    private JLabel jLabel6;
    private JLabel jLabel7;
    private JScrollPane jScrollPane1;

    public InactiveAccountDeleterWindow() {
        this.c.setTimeInMillis(System.currentTimeMillis());
        initComponents();

        InputStreamReader is = null;
        try {
            Properties dbProp = new Properties();
            is = new FileReader(ServerConfig.CONFIG_FILE_NAME);
            dbProp.load(is);
            is.close();
            DatabaseConnection.setProps(dbProp);
            DatabaseConnection.getConnection();
        } catch (FileNotFoundException ex) {
            //////System.out.println("You epic fail. Where is your db.properties file?");
        } catch (IOException ex) {
            //////System.out.println("OH NOES. TEH IOEXCEPTION!");
        } finally {
            try {
                is.close();
            } catch (IOException ex) {
            }
        }
    }

    private void initComponents() {
        String[] monthStrings = getMonthStrings();
        this.Month = new JComboBox(monthStrings);
        this.Day = new JComboBox();
        this.Year = new JComboBox();
        this.DeleteStart = new JButton();
        this.jLabel1 = new JLabel();
        this.jLabel2 = new JLabel();
        this.jLabel3 = new JLabel();
        JTextArea ta = new JTextArea();
        TextAreaOutputStream taos = new TextAreaOutputStream(ta, 60);
        PrintStream ps = new PrintStream(taos);
        System.setOut(ps);
        System.setErr(ps);
        this.jScrollPane1 = new JScrollPane(ta);
        this.jLabel4 = new JLabel();
        this.Hour = new JComboBox();
        this.jLabel5 = new JLabel();
        this.Minute = new JComboBox();
        this.Second = new JComboBox();
        this.jLabel6 = new JLabel();
        this.jLabel7 = new JLabel();

        setDefaultCloseOperation(3);
        setTitle("Inactive Account Deletion");

        initMonths();
        this.Month.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.MonthActionPerformed(evt);
            }
        });
        redoDays();
        this.Day.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.DayActionPerformed(evt);
            }
        });
        initYears(false);
        this.Year.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.YearActionPerformed(evt);
            }
        });
        this.DeleteStart.setText("Start Delete");
        this.DeleteStart.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.DeleteStartActionPerformed(evt);
            }
        });
        this.jLabel1.setText("Month");

        this.jLabel2.setText("Day");

        this.jLabel3.setText("Year");

        this.jLabel4.setText("Delete all accounts that have not logged on since:");

        initHours();
        this.Hour.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.HourActionPerformed(evt);
            }
        });
        this.jLabel5.setText("Hour");

        initMinutes();
        this.Minute.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.MinuteActionPerformed(evt);
            }
        });
        initSeconds();
        this.Second.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                InactiveAccountDeleterWindow.this.SecondActionPerformed(evt);
            }
        });
        this.jLabel6.setText("Minute");

        this.jLabel7.setText("Second");

        GroupLayout layout = new GroupLayout(getContentPane());
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 615, Short.MAX_VALUE).addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup().addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(Month, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(jLabel1)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(Day, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(jLabel2)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel3).addComponent(Year, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addGap(18, 18, 18).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel5).addComponent(Hour, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addGap(20, 20, 20).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel6).addComponent(Minute, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addComponent(jLabel7).addGap(236, 236, 236).addComponent(DeleteStart)).addComponent(Second, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))).addComponent(jLabel4)).addContainerGap()));
        layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(jLabel4).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(DeleteStart).addComponent(jLabel1).addComponent(jLabel2).addComponent(jLabel3).addComponent(jLabel6).addComponent(jLabel7).addComponent(jLabel5)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(Month, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Day, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Year, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Minute, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Hour, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Second, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 382, Short.MAX_VALUE).addContainerGap()));

        pack();
    }

    private void MonthActionPerformed(ActionEvent evt) {
        this.c.set(2, this.Month.getSelectedIndex());
        redoDays();
        this.deleteConfirmed = false;
    }

    private void DeleteStartActionPerformed(java.awt.event.ActionEvent evt) {
        if (deleteConfirmed) {
            deleteConfirmed = !deleteConfirmed;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = null;
            ResultSet rs = null;
            ArrayList<Integer> accountIDs = new ArrayList<Integer>();
            try {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE lastlogin < ?");
                ps.setTimestamp(1, new Timestamp(c.getTimeInMillis()));
                rs = ps.executeQuery();
                while (rs.next()) {
                    accountIDs.add(rs.getInt("id"));
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            //////System.out.println("Inactive Accounts found: " + accountIDs.size());

            int charsDeleted = 0;
            try {
                ps = con.prepareStatement("DELETE FROM characters WHERE accountid = ?");
                for (Integer accID : accountIDs) {
                    ps.setInt(1, accID);
                    ps.addBatch();
                }
                int[] results = ps.executeBatch();
                for (int i : results) {
                    charsDeleted += i;
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            //////System.out.println("Characters Deleted: " + charsDeleted);

            int accountsDeleted = 0;
            try {
                ps = con.prepareStatement("DELETE FROM accounts WHERE id = ?");
                for (Integer accID : accountIDs) {
                    ps.setInt(1, accID);
                    ps.addBatch();
                }
                int[] results = ps.executeBatch();
                for (int i : results) {
                    accountsDeleted += i;
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            ////System.out.println("Accounts Deleted: " + accountsDeleted);
        } else {
            deleteConfirmed = !deleteConfirmed;
            ////System.out.println("Deleting all accounts that haven't been accessed since:");
            //System.out.println(c.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.US) + " " + c.get(Calendar.DATE) + ", " + c.get(Calendar.YEAR) + " " + padSingleNumber(c.get(Calendar.HOUR_OF_DAY)) + ":" + padSingleNumber(c.get(Calendar.MINUTE)) + ":" + padSingleNumber(c.get(Calendar.SECOND)));
            ////System.out.println("Press again to confirm (!!)\r\n");
        }


    }

    private void DayActionPerformed(ActionEvent evt) {
        this.c.set(5, this.Day.getSelectedIndex() + 1);
        this.deleteConfirmed = false;
    }

    private void YearActionPerformed(ActionEvent evt) {
        this.c.set(1, ((Integer) this.Year.getSelectedItem()).intValue());
        initYears(true);
        this.deleteConfirmed = false;
    }

    private void MinuteActionPerformed(ActionEvent evt) {
        this.c.set(12, ((Integer) this.Minute.getSelectedItem()).intValue());
        this.deleteConfirmed = false;
    }

    private void HourActionPerformed(ActionEvent evt) {
        this.c.set(10, ((Integer) this.Hour.getSelectedItem()).intValue());
        this.deleteConfirmed = false;
    }

    private void SecondActionPerformed(ActionEvent evt) {
        this.c.set(13, ((Integer) this.Second.getSelectedItem()).intValue());
        this.deleteConfirmed = false;
    }

    private String padSingleNumber(int i) {
        if ((i >= 0) && (i <= 9)) {
            return "0" + i;
        }
        return "" + i;
    }

    private void initHours() {
        for (int i = 0; i < 24; i++) {
            this.Hour.addItem(new Integer(i));
        }
        this.Hour.setSelectedIndex(0);
        this.c.set(10, 0);
    }

    private void initMinutes() {
        for (int i = 0; i < 60; i++) {
            this.Minute.addItem(new Integer(i));
        }
        this.Minute.setSelectedIndex(0);
        this.c.set(12, 0);
    }

    private void initSeconds() {
        for (int i = 0; i < 60; i++) {
            this.Second.addItem(new Integer(i));
        }
        this.Second.setSelectedIndex(0);
        this.c.set(13, 0);
        this.c.set(14, 0);
    }

    private void initYears(boolean setmid) {
        int year = this.c.get(1) - 25;
        this.Year.removeAllItems();
        for (int i = 0; i < 50; i++) {
            this.Year.addItem(new Integer(year++));
        }

        this.Year.setSelectedIndex(25);
    }

    private void redoDays() {
        int days = 0;
        switch (this.c.get(2)) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                days = 31;
                break;
            case 3:
            case 5:
            case 8:
            case 10:
            case 12:
                days = 30;
                break;
            case 1:
                if ((this.c.get(1) % 400 == 0) || ((this.c.get(1) % 4 == 0) && (this.c.get(1) % 100 != 0))) {
                    days = 29;
                } else {
                    days = 28;
                }
        }
        if (this.Day.getItemCount() != 0) {
            this.Day.removeAllItems();
        }
        for (int i = 0; i < days; i++) {
            this.Day.addItem(new Integer(i + 1));
        }
        try {
            this.Day.setSelectedIndex(this.c.get(5));
        } catch (NullPointerException npe) {
            this.Day.setSelectedIndex(0);
        }
    }

    private void initMonths() {
        try {
            this.Month.setSelectedIndex(this.c.get(2));
        } catch (NullPointerException npe) {
            this.Month.setSelectedIndex(0);
        }
    }

    public static void main() {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                new InactiveAccountDeleterWindow().setVisible(true);
                //////System.out.println("Please select a date and hit \"Start Delete\"");
            }
        });
    }

    protected static String[] getMonthStrings() {
        String[] months = new DateFormatSymbols().getMonths();
        int lastIndex = months.length - 1;

        if ((months[lastIndex] == null) || (months[lastIndex].length() <= 0)) {
            String[] monthStrings = new String[lastIndex];
            System.arraycopy(months, 0, monthStrings, 0, lastIndex);

            return monthStrings;
        }
        return months;
    }
}
