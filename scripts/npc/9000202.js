/*
@    Author : Snow
@
@    NPC =勇士娜娜转生NPC
@    Map =  MAP
@    NPC MapId = MAPID
@    Function = Rebirth Player
@
@    想保存技能的话就找到把类似cm.teachSkill(4001002,0,0);这样的全部删掉或屏蔽
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

         
         if (mode == -1) {//ExitChat
        cm.dispose();
    
    }else if (mode == 0){//No
        cm.sendOk("好的, 请告诉我你确定需要 #b投胎转世#k.");
        cm.dispose();

    }else{            //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        
                 if (status == 0) {
        cm.sendYesNo("兄弟,真不敢相信!.. 厉害的#b#h ##k。你已经通过一个漫长而充满挑战的道路，终于成为了风起云涌的人物。如果您能给我8千万金币和#b2个圣杯#k #v4031454# #r 我可以用我的乾坤大挪移心法，助你进行投胎转世！您将成为1级的 #b新手#k, 你是否想#r转生#k呢?"); 
        }else if (status == 1) {
        if(cm.getChar().getLevel() < 180){
        cm.sendOk("很抱歉，您需要180级，才可以投胎转世.");
        cm.dispose();
       }else if (cm.haveItem(4031454) == false){ 
        cm.sendOk("你没有带来#b蓝色蜗牛壳#k "); 
        cm.dispose(); 
        }else if (cm.getMeso() < 50000000) {
        cm.sendOk("你没有8千万金币,我不能帮你的忙哦."); 
        cm.dispose();
        }else{
        cm.sendOk("#b您做得非常好#k, 你现在确定要#e投胎转世#n.吗？");
        }
        }else if (status == 2) {
		wui = 1;
		var statup = new java.util.ArrayList();
		//var p = cm.c.getPlayer();
		//var totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();
        cm.getChar().setLevel(2);
        cm.unequipEverything()
        cm.changeJob(net.sf.odinms.client.MapleJob.BEGINNER);
        cm.gainMeso(-50000000);
        cm.gainItem(4031454,-1); 
        cm.gainItem(2040506,+10);
        cm.gainItem(1082149,+1);
        cm.gainItem(2040807,+10);
        cm.sendNext("#b您做得非常好#k, 为你成功#e投胎转世#n高兴吧！很佩服你,所以送你一点小礼物~★");
p.getClient().getSession().write (net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));
					cm.serverNotice("『服务器公告』：哇."+ cm.getChar().getName() +" 玩家 转生冒险岛世界里了,大家一起为他欢呼吧！");
					cm.gainMeso(50000);
        //p.setRemainingAp (totAp - 10);传承你的属性总和扣除10点后剩余的点数
		statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.LEVEL, java.lang.Integer.valueOf(1)));
        statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
        //statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.AVAILABLESP, java.lang.Integer.valueOf(p.getRemainingSp())));
		p.getClient().getSession().write (net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));

        cm.dispose();
        }            
    }
 }
 
    
