//新手出生NPC
//代码：1092016
function start() {
	cm.sendSimple ("伟大的冒险家啊。目前有两条路让你选择:\r\n#b#L0#我要转职为 冒险岛骑士团(Knights of Cygnus)\r\n#L1#我想转职为 冒险自由家(Adventurers)\r\n#L2#我要查看 职业说明")
	}
function action(mode, type, selection) {
	cm.dispose();

	switch(selection){
		case 0: 
			cm.warp(130000000)
                                          cm.sendOk("希望你的抉择没有错！")
		break;
		case 1:
		              cm.warp(0)
                                          cm.sendOk("希望你的抉择没有错!")
		break;
		case 2:
		    cm.sendOk("#r■ 职业说明 ■#k:\r\n\r\n#b◆冒险岛骑士团(Knights of Cygnus)#k\r\n女皇的骑士们！一起来对抗黑魔法师吧！\r\n他们是忠诚于女皇的杰出者的组合\r\n他们是为了从黑魔法师手中拯救冒险岛世界而诞生，\r\n受神兽的守护，拥有独特的技能,因而可快速成长。\r\n虽然受最高等级的限制，但骑士团与同职业等级其它职业相比拥有更强大的能力.\r\n\r\n#r成长速度:★★★\r\n潜在能力:★\r\n自由度:★★\r\n难易度:★\r\n最高等级:Lv.120\r\n\r\n#b◆ 冒险家(Adventurers)#k\r\n追随自由与爱上的他们是冒险岛世界中最潇洒的冒险主义者!\r\n没有被特别的目的所束缚,在冒险岛世界中自由自在地享受冒险。\r\n通过各转职教官可转职成多样化的职业。起初成长有些稚嫩。\r\n但是永无止境的冒险让他们成为最终的冒险家！\r\n\r\n#r成长速度:★★\r\n潜在能力:★★\r\n自由度:★★★\r\n难易度：★★\r\n最高等级:Lv.200\r\n\r\n※ 伟大的岛民们！请选择你们的命运吧！")
		} // switch finish
           
}
