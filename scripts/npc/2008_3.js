var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var status = -1;
var mySpoints = -1;
var typed = 0;
var I = null;

function start() {
	I = new Invitation();
	if (mySpoints < 0) mySpoints = I.getPoints();
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text = head + "欢迎你来到#b"+cm.getServerName()+"#k，首先我要问你一个问题，你是从何得知#b"+cm.getServerName()+"#k的呢？\r\n";
		text += "#b#L0#我是朋友介绍来的。#l\r\n";
		text += "#b#L1#我是自己找到的。#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		typed = selection;
		
		if (selection == 0) {
			cm.sendGetText("请输入你朋友的#e#r账号：");
		} else if (selection == 1) {
			cm.dispose();
			cm.gainNX(2, 1000);
			cm.gainItem(1142073, 1);
			cm.setBossLogAcc("推广设置", -2);
			//cm.openNpc(2008, 4);
			cm.warp(50000, 0);
		}
	} else if (status == 2) {
		if (typed == 0) {
			var invitation = cm.getText();
			var myAccount = cm.getC().getAccountName();
			//推广账号不能为自己
			if (invitation == myAccount) {
				status = -1;
				cm.sendSimple("无法使用自己的账号。");
				return;
			}
			var isExists = I.checkAccountVaild(invitation);
			if (isExists) {
				var isSuccess = I.setInvitation(invitation);
				if (isSuccess) {
					cm.dispose();
					cm.setBossLogAcc("推广设置", -2);
					cm.gainNX(2, 1000);
					cm.gainItem(1142073, 1);
					//cm.openNpc(2008, 4);
					cm.warp(50000, 0);
					return;
				//	status = -1;
				} else {
					cm.setBossLogAcc("推广设置", -2);
					cm.sendSimple("您已经设置过邀请者的账号，无法重复设置。");
					status = -1
				}
			} else {
				cm.sendSimple("#r该账号不存在，无法设置。#k");
				status -= 2;
			}
		}
	}
}

var Invitation = function() {

	this.invitation = null;
	this.db = cm.getConnection();
	this.setInvitation = function(name) {
		var sql = "UPDATE accounts SET invitation = ? WHERE id = ? and (invitation is NULL or invitation = '')";
		var id = cm.getPlayer().getAccountID();
		var pstmt = this.db.prepareStatement(sql);
		pstmt.setString(1, name);
		pstmt.setInt(2, id);
		var isSuccess = (pstmt.executeUpdate() > 0) ? true: false;
		pstmt.close();
		return isSuccess;
	}

	//读取我的邀请者
	this.getInvitation = function() {
		if (this.invitation != null) return this.invitation;
		var sql = "SELECT invitation FROM accounts WHERE name = ?";
		var pstmt = this.db.prepareStatement(sql);
		var name = cm.getC().getAccountName();
		pstmt.setString(1, name);
		var rs = pstmt.executeQuery();
		if (rs.next()) this.invitation = rs.getString("invitation");
		rs.close();
		pstmt.close();
		return this.invitation;
	}

	//检测账号合法性
	this.checkAccountVaild = function(name) {
		var sql = "SELECT count(id) as num FROM accounts WHERE name = ?";
		var pstmt = this.db.prepareStatement(sql);
		pstmt.setString(1, name);
		var count = 0;
		var rs = pstmt.executeQuery();
		if (rs.next()) count = rs.getInt("num");
		rs.close();
		pstmt.close();
		return (count > 0) ? true: false;
	}

	//读取积分
	this.getPoints = function() {
		var sql = "SELECT spoints FROM accounts WHERE name = ?";
		var pstmt = this.db.prepareStatement(sql);
		var name = cm.getPlayer().getAccountName();
		pstmt.setString(1, name);
		var count = 0;
		var rs = pstmt.executeQuery();
		if (rs.next()) count = rs.getInt("spoints");
		rs.close();
		pstmt.close();
		return count;
	}
	
	//积分给予
	this.gainPoints = function(quantity) {
		var sql = "UPDATE accounts SET spoints = spoints + ? WHERE id = ?";
		var id = cm.getPlayer().getAccountID();
		var pstmt = this.db.prepareStatement(sql);
		pstmt.setString(1, quantity);
		pstmt.setInt(2, id);
		var isSuccess = (pstmt.executeUpdate() > 0) ? true: false;
		pstmt.close();
		return isSuccess;
	}
}
