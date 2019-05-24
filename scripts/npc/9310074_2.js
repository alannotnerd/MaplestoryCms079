var itemid=0;
var sl=0;
var needvip = 562; //需要多少VIP等级以上才能使用此功能
var toDrop;

function start() 
{
	status = -1;
	action(1, 0, 0);
	
}
function action(mode, type, selection) 
{
	if (mode == 1) 
		{
			status++
		}
	else
		{
			cm.dispose();
			return;
		}
	if (status == 0)
		if (cm.getChar().getId() == needvip) {
			cm.sendGetNumber("#e#r 明星刷道具NPC \r\n#b亲爱的#r#h ##b您好,我可以为你刷取任何道具#r[任何]\r\n\r\n         #e#d请输入物品代码",0,1000000,5999999)
            } else {
                cm.sendOk("对不起,只有#rGM指定的ID为" + needvip + "的人#k才能使用制作指定属性装备功能..");
                cm.dispose();
            }
	else if (status==1)
		{
			itemid=selection;
			cm.sendGetNumber("#i"+itemid+"##t"+itemid+"#\r\n#r数量小于1000即获取,#k#r等#r#k\r\n输入数量:#k",1,1,1000)
		}
	else if (status==2)
		{
			sl=selection
			if(sl==100 && cm.haveItem(itemid))
				{
					sl=sl*288
					cm.sendYesNo("确定要丢弃所有#i"+itemid+"##t"+itemid+"#?")
				}
				else
				{
					cm.gainItem(itemid,sl)
                                    
					cm.dispose();
				}
		}
	else if(status==3)
		{
	cm.gainItem(itemid,-sl)
	cm.dispose();
		}

}

function panduan()
{
	if(cm.haveItem(2430693)==false)
		{
			cm.gainItem(2430693,1);
		}
	if(cm.haveItem(2430267)==false)
		{
			cm.gainItem(2430267,1);
		}
	if(cm.haveItem(2430481)==false)
		{
			cm.gainItem(2430481,1);
		}

}