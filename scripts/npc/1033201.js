var status = -1;
function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
	}
	if (status == 0) {
		cm.sendPlayerToNpc("阿弗利埃！你没事吧？弗里德呢！？……呼，只是昏过去了……");
	} else if (status == 1) {
		cm.sendNextNoESC("双弩精灵……你还活着啊。");
	} else if (status == 2) {
		cm.sendPlayerToNpc("当然！封印成功了，总不能一直坐在这里吧！但是……你看上去好像不太好？没事吧？其他人呢？大家去哪儿了？");
	} else if (status == 3) {
		cm.sendNextNoESC("虽然#b封印黑魔法师成功了#k，但是因为他最后使用的魔法引起的爆炸，所有的东西都分崩离析。我们能在相同的地方，好像只是偶然。");
	} else if (status == 4) {
		cm.sendPlayerToNpc("啊，是啊。飞了好远。但还好没事……");
	} else if (status == 5) {
		cm.sendNextNoESC("是因为放松下来了吗？没有力气……不，不仅仅是没有力气……感觉很冷。");
	} else if (status == 6) {
		cm.sendPlayerToNpc("这里原来就是经常下雪的地方吗？四周都在燃烧，却在下雪……真奇怪…");
	} else if (status == 7) {
		cm.sendNextNoESC("……你没有感觉到吗，双弩精灵？这#r可怕的诅咒#k……黑魔法师对你和弗里德，以及所有其他人的诅咒。");
	} else if (status == 8) {
		cm.sendPlayerToNpc("诅……咒？");
	} else if (status == 9) {
		cm.sendNextNoESC("我看到可怕的寒气在包围你。在体力充沛的时候也许还好……但是战斗让我们变弱了，现在非常危险……黑魔法师好像不会那么轻易放过我们……");
	} else if (status == 10) {
		cm.sendPlayerToNpc("其他人都会没事的，因为大家都很强壮！但是我担心弗里德……那个家伙，体力本来就很弱。");
	} else if (status == 11) {
		cm.sendNextNoESC("弗里德由我来照顾，别担心……不过，我更担心的是你，双弩精灵。你是#b精灵之王#k。对你的诅咒……#r就是对所有精灵的诅咒#k，不是吗？");
	} else if (status == 12) {
		cm.sendPlayerToNpc("...!");
	} else if (status == 13) {
		cm.sendNextNoESC("你快到#b埃欧雷#k去。如果#b黑魔法师的诅咒真的会给全体精灵造成影响#k的话……身为国王的你必须去看一看。");
	} else if (status == 14) {
		cm.sendPlayerToNpc("知道了！阿弗利埃……我们还能再见面吗？..");
	} else if (status == 15) {
		cm.sendNextNoESC("……希望如此。");
	} else if (status == 16) {
		cm.sendPlayerToNpc("(虽然很担心同伴们……但是现在只能相信他们。使用回城技能，回村子去吧。)");
	} else if (status == 17) {
		cm.warp(910150001,0);
		cm.dispose();
	}
	
}











