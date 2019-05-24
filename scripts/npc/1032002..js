var status;
var questions = new Array("�p���O�@������??",
"�A�O���O�³J??",
"���s���ݤ��ݭn6��WZ�άO�R�p�D�{��?",
"���֥d��ݤ��ݭn6��WZ�άO�R�p�D�{��?",
"�p���OŪ���X���??",
"If.....Then....�O��k�y�c�ܡH",
"No sooner.....Then.....�O��k�y�c�ܡH",
"�����ƬO Alt+Enter �ܡH",
"�����ƬO Ctrl+Enter �ܡH",
"���AIP�O�_��ponys.no-ip.biz?",
"�p�����k�B�Ͷ�??",
"�� �O�k�Ͷ�?",
"���A�g�筿�v�O�_��100��?",
"���A�̰���ͦ��ƬO�_��1000��?",
"���A�̰��W�u�H�ƬO�_��120�H?",
"�p���q���O�_�����֤�?",
"�{�b�����٦��S���γB?"
);
var answers = new Array(false, false, false, true, true, true, true, true, false, false, false, false, true, false, true, false, false);
var rOutput = new Array("�p���O�H",
"�������A�O�³J?!",
"�s��62�N�w�g���ت� ���Φb�B�~�U��",
"�֥d��62�S�� �ҥH�����B�~�U��WZ",
"�p���O���X���~~~.",
"�o�OVisual Basic�̪��y���C",
"�S��,½Ķ�G�@....�N....�C",
"���ӬOAlt+Enter�a�C",
"���ӬOAlt+Enter�a�C",
"���AIP�Opony.no-ip.biz�� �O�ݿ��F",
"�p���L�S���k�B�ͭ�~~",
"�� �L�O�k��.",
"�ثe���A�g�筿�v��500��",
"���g�̰���ͼ� 14XX ��",
"���A�̰��W���H�Ƭ�120�H ����",
"�p���q���O�|�֤ߪ���",
"�{�b���M�w�g�S�F��~."
);
var asked = new Array();
var currentQuestion;

function start() {
	status = -1;
	action(1, 0, -1);
}

function action(mode, type, selection) {
	if (status == 3 && mode == 1) { // continue quiz.
		status = 2;
		selection = 0;
	} else if (mode == 1 || (mode == 0 && type == 1)) // answering / accepting
		status++;
	else {
		if (type == 12 && mode == 0) // declining.
			cm.sendOk("�����~�C...���n��? !");
		cm.dispose();
		return;
	}
	
	if (status == 0)
		cm.sendAcceptDecline("�K �ڬO #p"+cm.getNpc()+"#.\r\n �ڬO�b #b"+cm.serverName()+"�p�A.#k �������x���t�d�H.\r\n�A�Q�n�Ѥ��o�Ӭ��ʶ�? �i�H������~��");
	else if (status == 1)
		cm.sendSimple("�}�l���ĤF�� ? Pick your choice.#b\r\n#L0#�}�l�Ҹ�! !#l\r\n#L1#���?#l\r\n#L2#�i�H����ԣ?#l\r\n#L3#�o���D�ح��̨�?.#l");
	else if (status == 2) {
		if (selection == 0) {
			if (questions.length == asked.length) {
				cm.sendNext("�A�w�g����Ҧ����D�F...�ǳƼ��~���C�C�C");
				getPrize();
				cm.dispose();
			} else {
				currentQuestion = -1;
				while (contains(currentQuestion) || currentQuestion == -1) {
					currentQuestion = Math.floor(Math.random() * questions.length);
				}
				asked.push(currentQuestion);
				cm.sendYesNo("\t\t\t\t\t\t\t\#b�O�D�D~���D "+asked.length+":#k\r\n"+questions[currentQuestion]);
			}
		} else if (selection == 1) {
			cm.sendNext("�u�n���U #rYes#k or #rNo#k �Y�i�I");
			status = 0;
		} else if (selection == 2) {
			cm.sendNext("������...");
			status = 0;
		} else if (selection == 3) {
			cm.sendNext("�Ӧۤj�۵M~");
			status = 0;
		}
	} else if (status == 3) {
			var answer = mode == 0 ? false : true;
			if (answers[currentQuestion] == answer) {
				cm.sendYesNo("����F!. �A�n�~��U�@�D��?");
			} else {
				cm.sendOk("\t\t\t\t\t\t\t\#r�����o !#k\r\n"+rOutput[currentQuestion]);
				cm.dispose();
			}
	} else if (status == 4) {
		// create random prizes etc.
		getPrize();
		cm.sendOk("�ܦn, �A�@���� "+asked.length+" �D�ݵ��C�C");
		cm.dispose();
	}
}

function contains(quest) {
    for (var i = 0; i < asked.length; i++) {
        if (asked[i] == quest)
            return true;
    }
    return false;
}

function getPrize() {
	var hasQuant = false;
	var junk = new Array(4000009, 4000006, 4000005, 4000014, 4000016, 4000023, 4000022, 4000030, 4000029, 4000036, 4000038, 4000422);
	var junkWeap = new Array(1432043, 1432000, 1432001, 1432009, 1432024, 1432042, 1432002, 1442039, 1442048, 1442007, 1442061, 1442035, 1442024, 1442025, 1382000, 1382003,
						1382018, 1382042, 1382004, 1382015, 1382012, 1382055, 1382019, 1382019, 1412001, 1412000, 1412005, 1412013, 1412018, 1412005, 1412008, 1412027, 1422000,
						1422006, 1422003, 1422004, 1422033, 1402013, 1402029, 1402007, 1402044, 1402006, 1402002, 1402010, 1402014, 1402009, 1402018, 1372005, 1372006, 1372043, 1372022, 1372001,
						1452023, 1452001, 1452032, 1472066, 1472030, 1472003, 1472000, 1462047, 1462023, 1462000, 1462034, 1462005, 1332021, 1332032, 1332007, 1332070, 1332067, 1332006,
						1312033, 1312005, 1312018, 1322051, 1322004, 1322010, 1322053
						
						);
	var useable = new Array(2022280, 2022073, 2022112, 2022089, 2010000, 2022180, 2022178, 2100002, 2102006, 2100002, 2100007);
	var goodEqWeap = new Array(1432039, 1432007, 1432040, 1432045, 1432018, 1432011, 1432030, 1442034, 1442020, 1442019, 1442045, 1442044, 1382053, 1382007, 1382034, 1382024, 1382056,
						1382008, 1382016, 1382035, 1382037, 1412018, 1412007, 1412019, 1412027, 1412008, 1412025, 1412032, 1412009, 1412010, 1412021, 1422027, 1422013, 1422022, 1422010, 
						1422029, 1422009, 1422005, 1422025, 1402037, 1402035, 1402016, 1402034, 1402004, 1402012, 1402039, 1372010, 1372016, 1372008, 1372015, 1372033, 1372025, 1452017,
						1452019, 1452020, 1452014, 1452012, 1452052, 1472028, 1472031, 1472062, 1472053, 1472033, 1462017, 1462015, 1462021, 1462013, 1332069, 1332072, 1332026, 1332051,
						1332052, 1312030, 1312015, 1312010, 1312004, 1312016, 1322045, 1322059, 1322020, 1322019, 1322029, 4001013
						);
	var Rare = new Array(1492037, 1452071, 1442078, 1472086, 1402062, 1382068);
	var rand = Math.floor(Math.random() * 100)+(asked.length*2);
	var curArray;
	if (rand < 20) {
		curArray = junk;
		hasQuant = true;
	} else if (rand >= 20 && rand <= 40) {
		curArray = junkWeap;
	} else if (rand > 40 && rand <= 60) {
		curArray = useable;
		hasQuant = true;
	} else if (rand > 60 && rand <= 80) {
		curArray = goodEqWeap;
	} else if (rand > 80 && rand <= 95) {
		curArray = goodEqWeap;
	} else {
		curArray = Rare;
	}
	cm.addRandomItem(curArray[Math.floor(Math.random() * curArray.length)]);
}