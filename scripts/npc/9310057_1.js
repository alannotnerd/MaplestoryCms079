function start() {
    cm.sendOk("有点意外@@");
    //action(1, 0, 0);
}

function action(mode, type, selection) {
  cm.sendOk("恭喜你获得系统奖励！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5360014# 1张");
  cm.gainItem(5360014, 1);
  cm.dispose();	
}