/* Cygnus revamp
 Noblesse tutorial
 Kizan
 Made by Daenerys
 */
var status = -1;

function start(mode, type, selection) {
    status++;
    if (status == 0) {
        qm.sendYesNo("饮料的口味还可以吗？不知道合不合你的胃口。是我们贵族非常喜欢的果汁呢。..那麽要再开始训练了吗？这次是复习！刚才学过的东西应该没有忘记吧？打败3只..#o9300730#并蒐集3个#t4000489#。");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.AranTutInstructionalBubble("Effect/OnUserEff.img/guideEffect/cygnusTutorial/4");
        qm.spawnMonster(9300730, 3);
        qm.gainItem(4000489, 3);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}