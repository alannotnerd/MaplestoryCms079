var itemid=0;
var sl=0;
var needvip = 562; //��Ҫ����VIP�ȼ����ϲ���ʹ�ô˹���
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
			cm.sendGetNumber("#e#r ����ˢ����NPC \r\n#b�װ���#r#h ##b����,�ҿ���Ϊ��ˢȡ�κε���#r[�κ�]\r\n\r\n         #e#d��������Ʒ����",0,1000000,5999999)
            } else {
                cm.sendOk("�Բ���,ֻ��#rGMָ����IDΪ" + needvip + "����#k����ʹ������ָ������װ������..");
                cm.dispose();
            }
	else if (status==1)
		{
			itemid=selection;
			cm.sendGetNumber("#i"+itemid+"##t"+itemid+"#\r\n#r����С��1000����ȡ,#k#r��#r#k\r\n��������:#k",1,1,1000)
		}
	else if (status==2)
		{
			sl=selection
			if(sl==100 && cm.haveItem(itemid))
				{
					sl=sl*288
					cm.sendYesNo("ȷ��Ҫ��������#i"+itemid+"##t"+itemid+"#?")
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