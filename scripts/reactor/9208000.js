/* 
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* @Author Lerk
 * 
 * 9208000.js: Guild Quest - Gatekeeper Puzzle Reactor
 * 
*/

function act() {
        var eim = rm.getPlayer().getEventInstance();
        if (eim != null) {
                var status = eim.getProperty("stage1status");
                if (status != null && !status.equals("waiting")) {
                        var stage = parseInt(eim.getProperty("stage1phase"));
                        //rm.mapMessage(6,"Stage " + stage);
                        if (status.equals("display")) {
                                var prevCombo = eim.getProperty("stage1combo");
                                prevCombo += rm.getReactor().getObjectId();
                                //rm.mapMessage(6,"Current Combo: " + prevCombo);
                                eim.setProperty("stage1combo",prevCombo);
                                if (prevCombo.length == (3 * (stage + 3))) { //end of displaying
                                        eim.setProperty("stage1status","active");
                                        rm.mapMessage("神像移动完毕，请谨慎观察。");
                                        eim.setProperty("stage1guess","");
                                }
                        } else { //进行
                                var prevGuess = eim.getProperty("stage1guess");
                                if (prevGuess.length != (3 * (stage + 3))) {
                                        prevGuess += rm.getReactor().getObjectId();
                                        eim.setProperty("stage1guess",prevGuess);
                                }
                                //rm.mapMessage(6,"Current Guess: " + prevGuess);
                        }
                }
        }
        //rm.mapMessage(6,""+rm.getReactor().getObjectId());
}