var status = -1;
var select = -1;
var chr;
var isok;
var str="";
function start() {	
	chr = cm.getchrlist();
	for(var i=0;i< chr.size() ;i++){
		str +="#L"+ i + "# #e[" + chr.get(i).getName()+"   "+ chr.get(i).getLevel() +"级 #e  "+ chr.get(i).getJobName(chr.get(i).getJob())+ "]\r\n";
	}	
	cm.sendSimple("#e<删除角色>#n\r\n你在"+ cm.getServerName() +"当前帐号有"+ chr.size() +"角色。请选择你要删除的角色\r\n#b"+str);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
		chr = cm.getchrlist()
	} else {
		cm.dispose();
		return;
	}

	if (status == 0) {
		select = selection
		cm.sendYesNo("#e#r         你确定想删除吗？删除操作不可逆！\r\n\r\n"+"#b当前选择角色：#r"+ chr.get(select).getName()+"#b\r\n#e等级：#r"+chr.get(select).getLevel() +"\r\n#b职业：#r"+chr.get(select).getJobName(chr.get(select).getJob()));
	}else if (status == 1) {
		//cm.sendYesNo("你确定想删除吗?");
		isok = cm.deleteCharacter(chr.get(select).getId());
		if (isok == 0){
			cm.sendOk("角色已经成功删除！");
		}else if (isok == 2){
			cm.sendOk("#e#r       不能删除当前在线角色");
		}else{
			cm.sendOk("删除失败，请报告管理员。");
		}
		cm.dispose();
	}else {
		cm.dispose();
	}
}