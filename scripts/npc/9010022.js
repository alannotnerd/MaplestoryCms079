/*
 * 次元之镜
 */
var targetLocation;
var target;
 
function start() {
    cm.sendSlideMenu(0, cm.getSlideMenuSelection(0));
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
	switch (selection) {
        case 800://西式婚礼
        case 804://中式婚礼
			targetLocation = "AMORIA";
            break;
        case 31://古代神社
        case 803://新叶城
			targetLocation = "WORLDTOUR";
            break;
        default:
			targetLocation = "MULUNG_TC";
	}
    cm.saveReturnLocation(targetLocation);
	target = cm.getSlideMenuDataIntegers(0, selection)[0];
	if(target == 0)
		target = 950000100;
    cm.warp(target, cm.getSlideMenuDataIntegers(0, selection)[1]);
    cm.dispose();
}
