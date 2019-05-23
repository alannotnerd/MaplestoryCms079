var status = 0; 
var item = Array(2043003,2043103,2044703,2044603,2044503,2044403,2044303,2044203,2044103,2044003,2043803,2043703,2043303,2043203,2041025,2041024,2040903,2040807,2040806,2040711,2040710,2040709,2040603,2040506,2040403,2040303,2040006);//物品代码
var itemname = Array("#b单手剑攻击卷（1万点卷）","单手斧攻击卷（1万点卷）","拳套攻击卷（1万点卷）","弩攻击卷（1万点卷）","弓攻击卷（1万点卷）","矛攻击卷（1万点卷）","枪攻击卷（1万点卷）","双手钝器攻击卷（1万点卷）","双手斧攻击击卷（1万点卷）","双手剑攻击卷（1万点卷）","长杖魔力卷（1万点卷）","短杖魔力卷（1万点卷）","短剑攻击卷（1万点卷）","单手钝器攻击卷（1万点卷）","披风防御卷（1万点卷）","披风魔防卷（1万点卷）","盾牌防御卷（1万点卷）","手套攻击卷（1万点卷）","手套敏捷卷（1万点卷）","鞋子速度卷（1万点卷）","鞋子跳跃卷（1万点卷）","鞋子敏捷卷（1万点卷）","裤/裙防御卷（1万点卷）","全身铠甲敏捷卷（1万点卷）","上衣防御卷（1万点卷）","耳环智力卷（1万点卷）","头盔防御卷（1万点卷）");//物品名称
var selectedMap = -1; 
function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (status >= 3 && mode == 0) { 
            cm.sendOk("嘿嘿，欢迎你再次光顾."); 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("嘿嘿，欢迎你再次光顾.."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("HI，我可以卖你GM使用的卷轴但是你要给我一定的点卷，这里买到的GM卷轴成功率为100%，属性则为10%的属性哟。"); 
        } else if (status == 1) { 
            var selStr = "选择你的物品.#b"; 
                for (var i = 0; i < item.length; i++) { 
                selStr += "\r\n#L" + i + "#" + itemname[ i ]+""; 
                } 
            cm.sendSimple(selStr); 
            
        } else if (status == 2) { 
            cm.sendYesNo("你真的要 " + itemname[selection] + "吗?"); 
            selectedMap = selection; 
        } 
        
        else if (status == 3) { 
  if (cm.getChar().getNX() < 10000) {
				cm.sendOk("你好像没有足够的点卷吧.");
             cm.dispose();
               } else {
            cm.gainNX(-10000);
            cm.gainItem(item[selectedMap], 1); 
            cm.dispose(); 
        }}
    }
}
