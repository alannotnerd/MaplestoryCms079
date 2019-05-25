/*
	This file is part of the cherry Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@cherry.de>
                       Jan Christian Meyer <vimes@cherry.de>

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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Maple Admin
-- By --------------------------------------------------------------------------------------------------
	xQuasar
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		if (!(cm.getJob().equals(net.sf.cherry.client.MapleJob.PALADIN) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.HERO) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.DARKKNIGHT) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_ARCHMAGE) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_ARCHMAGE) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.BISHOP) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.BOWMASTER) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMASTER) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTLORD) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.SHADOWER) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.CORSAIR) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.BUCCANEER))) {
			cm.sendOk("怎么了？冒险还算顺利吧。四转后来见我。我会帮助你。");
			cm.dispose();
		} else if (cm.getQuestStatus(999950).equals(net.sf.cherry.client.MapleQuestStatus.Status.COMPLETED)) {
			cm.sendOk("怎么了？你四转的技能全部都完成了？");
			cm.dispose();
		} else {
			status = 0;
			cm.startQuest(999950);
			cm.sendYesNo("嗯，很好，看来你需要提升一些四转的技能。我可以为你把各项技能提高10点！需要 #b30,000,000 金币#k. 如何？");
		}
	} else if (status == 0) {
		if (mode == 1 && cm.getMeso() >= 30000000) {
			cm.gainMeso(-30000000);
			if (!cm.hasSkill(1121000)) {
			cm.teachSkill(1121000,0,10); //maple warrior
			}
			if (!cm.hasSkill(1221000)) {
			cm.teachSkill(1221000,0,10); //maple warrior
			}
			if (!cm.hasSkill(1321000)) {
			cm.teachSkill(1321000,0,10); //maple warrior
			}
			if (!cm.hasSkill(2121000)) {
			cm.teachSkill(2121000,0,10); //maple warrior
			}
			if (!cm.hasSkill(2221000)) {
			cm.teachSkill(2221000,0,10); //maple warrior
			}
			if (!cm.hasSkill(2321000)) {
			cm.teachSkill(2321000,0,10); //maple warrior
			}
			if (!cm.hasSkill(3121000)) {
			cm.teachSkill(3121000,0,10); //maple warrior
			}
			if (!cm.hasSkill(3221000)) {
			cm.teachSkill(3221000,0,10); //maple warrior
			}
			if (!cm.hasSkill(4121000)) {
			cm.teachSkill(4121000,0,10); //maple warrior
			}
			if (!cm.hasSkill(4221000)) {
			cm.teachSkill(4221000,0,10); //maple warrior
			}
			if (!cm.hasSkill(5121000)) {
			cm.teachSkill(5121000,0,10); //maple warrior
			}
			if (!cm.hasSkill(5221000)) {
			cm.teachSkill(5221000,0,10); //maple warrior
			}
			if (!cm.hasSkill(1120004)) {
				cm.teachSkill(1120004,0,10);
				}
			if (!cm.hasSkill(1220005)) {
				cm.teachSkill(1220005,0,10);
				}
			if (!cm.hasSkill(1320005)) {
				cm.teachSkill(1320005,0,10);
				}
			if (!cm.hasSkill(1121006)) {
				cm.teachSkill(1121006,0,10);
				}
			if (!cm.hasSkill(1221007)) {
				cm.teachSkill(1221007,0,10);
				}
			if (!cm.hasSkill(1321003)) {
				cm.teachSkill(1321003,0,10);
				}
			if (!cm.hasSkill(1121001)) {
				cm.teachSkill(1121001,0,10);
				}
			if (!cm.hasSkill(1221001)) {
				cm.teachSkill(1221001,0,10);
				}
			if (!cm.hasSkill(1321001)) {
				cm.teachSkill(1321001,0,10);
				}
			if (!cm.hasSkill(1121002)) {
				cm.teachSkill(1121002,0,10);
				}
			if (!cm.hasSkill(1221002)) {
				cm.teachSkill(1221002,0,10);
				}
			if (!cm.hasSkill(1321002)) {
				cm.teachSkill(1321002,0,10);
				}
			if (!cm.hasSkill(1120005)) {
				cm.teachSkill(1120005,0,10);
				}
			if (!cm.hasSkill(1220006)) {
				cm.teachSkill(1220006,0,10);
				}
			if (!cm.hasSkill(1120003)) {
					cm.teachSkill(1120003,0,10);
					}
			if (!cm.hasSkill(1121008)) {
					cm.teachSkill(1121008,0,10);
					}
			if (!cm.hasSkill(1121010)) {
					cm.teachSkill(1121010,0,10);
					}
			if (!cm.hasSkill(1321007)) {
					cm.teachSkill(1321007,0,10);
					}
			if (!cm.hasSkill(1320006)) {
					cm.teachSkill(1320006,0,10);
					}
			if (!cm.hasSkill(1320008)) {
					cm.teachSkill(1320008,0,10);
					}
			if (!cm.hasSkill(1320009)) {
					cm.teachSkill(1320009,0,10);
					}
			if (!cm.hasSkill(1221009)) {
					cm.teachSkill(1221009,0,10);
					}
			if (!cm.hasSkill(1220010)) {
					cm.teachSkill(1220010,0,10);
					}
			if (!cm.hasSkill(1221003)) {
					cm.teachSkill(1221003,0,10);
					}
			if (!cm.hasSkill(1221004)) {
					cm.teachSkill(1221004,0,10);
					}
			if (!cm.hasSkill(1221011)) {
					cm.teachSkill(1221011,0,10);
					}
			if (!cm.hasSkill(2221001)) {
				cm.teachSkill(2221001,0,10);
				}
			if (!cm.hasSkill(2321001)) {
				cm.teachSkill(2321001,0,10);
				}
			if (!cm.hasSkill(2121001)) {
				cm.teachSkill(2121001,0,10);
				}
			if (!cm.hasSkill(2121004)) {
				cm.teachSkill(2121004,0,10);
				}
			if (!cm.hasSkill(2221004)) {
				cm.teachSkill(2221004,0,10);
				}
			if (!cm.hasSkill(2321004)) {
				cm.teachSkill(2321004,0,10);
				}
			if (!cm.hasSkill(2121002)) {
				cm.teachSkill(2121002,0,10);
				}
			if (!cm.hasSkill(2221002)) {
				cm.teachSkill(2221002,0,10);
				}
			if (!cm.hasSkill(2321002)) {
				cm.teachSkill(2321002,0,10);
				}
			if (!cm.hasSkill(2321007)) {
					cm.teachSkill(2321007,0,10);
					}
			if (!cm.hasSkill(2321003)) {
					cm.teachSkill(2321003,0,0);
					}
			if (!cm.hasSkill(2321008)) {
					cm.teachSkill(2321008,0,10);
					}
			if (!cm.hasSkill(2321005)) {
					cm.teachSkill(2321005,0,10);
					}
			if (!cm.hasSkill(2321006)) {
					cm.teachSkill(2321006,0,10);
					}
			if (!cm.hasSkill(2221007)) {
					cm.teachSkill(2221007,0,10);
					}
			if (!cm.hasSkill(2221006)) {
					cm.teachSkill(2221006,0,10);
					}
			if (!cm.hasSkill(2221005)) {
					cm.teachSkill(2221005,0,0);
					}
			if (!cm.hasSkill(2221003)) {
					cm.teachSkill(2221003,0,10);
					}
			if (!cm.hasSkill(2121005)) {
					cm.teachSkill(2121005,0,0);
					}
			if (!cm.hasSkill(2121003)) {
					cm.teachSkill(2121003,0,10);
					}
			if (!cm.hasSkill(2121006)) {
					cm.teachSkill(2121006,0,10);
					}
			if (!cm.hasSkill(2121007)) {
					cm.teachSkill(2121007,0,10);
					}
			if (!cm.hasSkill(3121003)) {
				cm.teachSkill(3121003,0,10);
				}
			if (!cm.hasSkill(3221003)) {
				cm.teachSkill(3221003,0,10);
				}
			if (!cm.hasSkill(3221002)) {
				cm.teachSkill(3221002,0,10);
				}
			if (!cm.hasSkill(3121002)) {
				cm.teachSkill(3121002,0,10);
				}
			if (!cm.hasSkill(3120005)) {
					cm.teachSkill(3120005,0,10); //bow expert
					}
			if (!cm.hasSkill(3121008)) {
					cm.teachSkill(3121008,0,10); //concentrate
					}
			if (!cm.hasSkill(3121007)) {
					cm.teachSkill(3121007,0,10); //hamstring
					}
			if (!cm.hasSkill(3121006)) {
					cm.teachSkill(3121006,0,0); //phoenix
					}
			if (!cm.hasSkill(3121004)) {
					cm.teachSkill(3121004,0,10); //hurricane
					}
			if (!cm.hasSkill(3221006)) {
					cm.teachSkill(3221006,0,10); //blind
					}
			if (!cm.hasSkill(3221005)) {
					cm.teachSkill(3221005,0,0); //frostprey
					}
			if (!cm.hasSkill(3220004)) {
					cm.teachSkill(3220004,0,10); //marksman boost
					}
			if (!cm.hasSkill(3221001)) {
					cm.teachSkill(3221001,0,10); //piercing arrow
					}
			if (!cm.hasSkill(3221007)) {
					cm.teachSkill(3221007,0,10); //snipe
					}
			if (!cm.hasSkill(4221003)) {
				cm.teachSkill(4221003,0,10); //taunt
				}
			if (!cm.hasSkill(4121003)) {
				cm.teachSkill(4121003,0,10); //taunt
				}
			if (!cm.hasSkill(4121004)) {
				cm.teachSkill(4121004,0,10); //ninja ambush
				}
			if (!cm.hasSkill(4221004)) {
				cm.teachSkill(4221004,0,10); //ninja ambush
				}
			if (!cm.hasSkill(4220002)) {
				cm.teachSkill(4220002,0,10); //shadow shifter
				}
			if (!cm.hasSkill(4120002)) {
				cm.teachSkill(4120002,0,10); //shadow shifter
				}
			if (!cm.hasSkill(4220005)) {
					cm.teachSkill(4220005,0,10); //venomous stab
					}
			if (!cm.hasSkill(4221001)) {
					cm.teachSkill(4221001,0,10); //assasinate
					}
			if (!cm.hasSkill(4221007)) {
					cm.teachSkill(4221007,0,10); //boomerang step
					}
			if (!cm.hasSkill(4221006)) {
					cm.teachSkill(4221006,0,10); //smokescreen
					}
			if (!cm.hasSkill(4120005)) {
					cm.teachSkill(4120005,0,10); //venomous star
					}
			if (!cm.hasSkill(4121006)) {
					cm.teachSkill(4121006,0,10); //shadow starts
					}
			if (!cm.hasSkill(4121007)) {
					cm.teachSkill(4121007,0,10); //triple throw
					}
			if (!cm.hasSkill(4121008)) {
					cm.teachSkill(4121008,0,10); //ninja storm
					}
			if (!cm.hasSkill(5121001)) {
					cm.teachSkill(5121001,0,10); //dragon strike
					}
			if (!cm.hasSkill(5121002)) {
					cm.teachSkill(5121002,0,10); //energy orb
					}
			if (!cm.hasSkill(5121004)) {
					cm.teachSkill(5121004,0,10); //demolition
					}
			if (!cm.hasSkill(5121005)) {
					cm.teachSkill(5121005,0,10); //snatch
					}
			if (!cm.hasSkill(5121007)) {
					cm.teachSkill(5121007,0,10); //barrage
					}
			if (!cm.hasSkill(5121009)) {
					cm.teachSkill(5121009,0,10); //speed infusion
					}
			if (!cm.hasSkill(5121010)) {
					cm.teachSkill(5121010,0,10); //time leap
					}
			if (!cm.hasSkill(5121003)) {
					cm.teachSkill(5121003,0,10); //super transformation
					}
			if (!cm.hasSkill(5220011)) {
					cm.teachSkill(5220011,0,10); //bullseye
					}
			if (!cm.hasSkill(5221003)) {
					cm.teachSkill(5221003,0,10); //aerial strike
					}
			if (!cm.hasSkill(5221006)) {
					cm.teachSkill(5221006,0,10); //battleship
					}
			if (!cm.hasSkill(5221007)) {
					cm.teachSkill(5221007,0,10); //battleship cannon
					}
			if (!cm.hasSkill(5221008)) {
					cm.teachSkill(5221008,0,10); //battleship torpedo
					}
			if (!cm.hasSkill(5220001)) {
					cm.teachSkill(5220001,0,10); //elemental boost
					}
			if (!cm.hasSkill(5221004)) {
					cm.teachSkill(5221004,0,10); //rapid fire
					}
			if (!cm.hasSkill(5221009)) {
					cm.teachSkill(5221009,0,10); //hypnotize
					}
			if (!cm.hasSkill(5220002)) {
					cm.teachSkill(5220002,0,10); //wrath of the octopi
					}
			cm.completeQuest(999950);
			cm.sendOk("操作成功，技能已经成功提升！");
			cm.dispose();
		} else if (mode == 1 && cm.getMeso() < 30000000) {
			cm.sendNext("你似乎没有足够的金币！");
			cm.dispose();
		} else {
			cm.sendNext("嗯。不愿意就算了。那么再见！！！");
			cm.dispose();
		}
	}
}
