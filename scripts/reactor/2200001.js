/* @Author Lerk
 * 
 * 2200001.js: Warps player into one of two Secret Factories
 * 
*/

function act() {
    rm.playerMessage(5, "�ҵ������ܹ�����");
    if (Math.random() < .5) {
        rm.warp(922000020);
    } else {
        rm.warp(922000021);
    }
}