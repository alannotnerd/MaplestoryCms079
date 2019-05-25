/*
亲亲嘴冒险活动脚本

星缘 枫叶水晶珠活动

by 芯碎王子

*/


importPackage(net.sf.cherry.client);

var status = 0;
var zones = 0;
var ItemId = Array(Array(2340000,50,"祝福卷轴"),
									 Array(1092022,400,"调色板盾"),
									 Array(1082149,300,"工地手套(褐)"),
									 Array(1012056,200,"狗狗鼻"),
									 Array(1012015,200,"圣诞鹿的鼻子"),
									 Array(1002728,120,"圣诞鹿角"),
									 Array(1002850,600,"圣诞变身帽(20攻)"),
									 Array(1002851,220,"金鸡冠帽")
									 //如需其它道具兑换，请按照此格式自行添置。
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(cm.getBossLog('MogoQuest') < 1 ){
			 cm.sendNext("您好！#r " + cm.getPlayer().getName() + "#k 您可以帮我个忙吗?");
			 zones = 1;
			}else if(!cm.haveItem(4032056) || !cm.haveItem(4032056,50)){
					if(!cm.haveItem(4032056)){
						cm.sendOk("您什么时候去帮我打收集一些枫叶水晶球来啊！");
						cm.dispose()
					}else{
						cm.sendOk("这么一点点不够啊,你能不能帮我多找一些来!");
						cm.dispose();
					}
			}else{
				StringS = "哇!您帮我集了这么多枫叶水晶球,你想要什么报酬呢? 请选择您需要兑换的道具";
				for (var i = 0; i < ItemId.length; i++){
					StringS += "\r\n#L" + i + "#" + ItemId[i][2] + " #v" + ItemId[i][0] + "# (需要#r " + ItemId[i][1] + " #k个  #v4032056#)";
				}
				cm.sendSimple(StringS);	
				zones == 0;
			}
		} else if (status == 1) {
			if(zones == 1){
				cm.sendNext("你让我帮你做什么呢？",2);
				zones = 2;
			}else if(zones ==0){
				if (cm.getPlayer().getItemQuantity(4032056,false) >= ItemId[selection][1]){				
					cm.gainItem(ItemId[selection][0],1);
					cm.gainItem(4032056,-(ItemId[selection][1]));
					cm.sendOk("兑换成功，请检背包!");
					cm.dispose();
				}else{
					cm.sendOk("您没有足够的枫叶水晶球#v4032056#用于兑换");
					cm.dispose();
				}
			}
		}else if (status == 2){
			if(zones == 2){
				cm.sendNext("我用于提升我魔法的枫叶水晶球被一群蘑菇妖偷走了,你能帮去抢回来吗？");
				zones = 3;
			}
		}else if(status == 3){
			if(zones ==3){
					cm.sendNext("行,这个没问题？你告诉我那些偷了你枫叶水晶球的蘑菇妖现在在什么地方呢?",2);
					zones = 4;
			}
		}else if(status == 4){
			if(zones == 4){
				cm.sendNext("你去在林中之城的蚂蚁洞II 那里有个入口进去,那些偷走我的水晶枫叶球的蘑菇妖都躲在那里了!你必须要有通行证才能进入那里!");
				zones = 5;
			}
		}else if(status == 5){
			if(zones == 5){
				cm.sendYesNo("如果你能帮我这个大忙的话,我会给你一些丰厚的奖励的，您是否愿意帮我？");
			}
		}else if(status == 6){
			cm.setBossLog('MogoQuest');
			cm.gainItem(5220001,1);
			cm.sendOk("非常感觉您愿意帮我！");
			cm.dispose();
		}
	}
}	
