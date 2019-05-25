/*
 脚本功能：市场管理员
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fEffect/CharacterEff/1112905/0/0#"; //红色六芒星"
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/ItemEff/1048000/0/0#";//苹果红心

var List = Array(
		Array(iconEvent + " #e#d强化品级", 0, 1, 1022003),
		Array(iconEvent + " #d装备制作", 24, 1),
		Array(iconEvent + " #d时装强化", 0, 1, 9000069),
		//Array(iconEvent + " #b飞升洗髓", 1, 1, 9000174),
		Array(iconEvent + " #d武器破功", 1000, 1),
		Array(iconEvent + " #d蜡笔潜能", 1001, 1),
		Array(iconEvent + " #d翅膀进阶", 500, 1, 9900004),
		Array(iconEvent + " #d图腾合成", 0, 1, 9201131),
		Array(iconEvent + " #r[NEW]#d口袋装备极品合成", 2, 1, 9201131)
		//Array(iconEvent + " #r暖男女神#k", 777, 1, 9310144)
)
var text;
//是否活动，名字，模式，类别

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "";
            for (var i = 0; i < 2; i++) {
                ListFor(i);
            }
			text += "\r\n\r\n\r\n#e#b"+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+" 提升面板 "+ icon3 +""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+"#n#k\r\n";
            cm.sendSimple(text)
        } else if (a == 1) {
            var mode_ = List[selection][1];
            cm.dispose();
			var npcid = 9900003;
			if (List[selection][3] != null)
				npcid = List[selection][3];
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 1://便民服务
            text += "#e#d"+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+""+icon3+"#n#k\r\n";
            break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
                text += "  #L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "  #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
    text += "#e";
}
