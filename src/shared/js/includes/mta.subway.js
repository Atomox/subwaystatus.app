let mtaSubway = (() => {

	function getlineById (id) {
		switch (id) {
			case 'MTA NYCT_6':
				return 6;
			case 'MTA NYCT_5':
				return 5;
			case 'MTA NYCT_4':
				return 4;

			case 'MTA NYCT_1':
				return 1;
			case 'MTA NYCT_2':
				return 2;
			case 'MTA NYCT_3':
				return 3;

			case 'MTA NYCT_7':
				return 7;

			case 'MTA NYCT_A':
				return 'A';
			case 'MTA NYCT_C':
				return 'C';
			case 'MTA NYCT_E':
				return 'E';

			case 'MTA NYCT_N':
				return 'N';
			case 'MTA NYCT_Q':
				return 'Q';
			case 'MTA NYCT_R':
				return 'R';
			case 'MTA NYCT_W':
				return 'W';


			case 'MTA NYCT_B':
				return 'B';
			case 'MTA NYCT_D':
				return 'D';
			case 'MTA NYCT_F':
				return 'F';
			case 'MTA NYCT_M':
				return 'M';

			case 'MTA NYCT_G':
				return 'G';
			case 'MTA NYCT_L':
				return 'L';

			case 'MTA NYCT_J':
				return 'J';
			case 'MTA NYCT_Z':
				return 'Z';

			case 'MTA NYCT_H':
			case 'MTA NYCT_GS':
			case 'MTA NYCT_FS':
				return 'S';

			case 'MTA NYCT_SI':
				return 'SIR';

			default:
				return id;
		}
	}

	function getLineGroup(l) {

		l = getlineById (l);

		switch(l) {
			case 'A':
			case 'C':
			case 'E':
				return 'a-c-e';
			case 'B':
			case 'D':
			case 'F':
			case 'M':
				return 'b-d-f-m';
			case 'N':
			case 'Q':
			case 'R':
			case 'W':
				return 'n-q-r-w';
			case 'J':
			case 'Z':
				return 'j-z';
			case 1:
			case 2:
			case 3:
				return '1-2-3';
			case 4:
			case 5:
			case 6:
				return '4-5-6';

			case '7':
			case 'L':
			case 'S':
			case 'SIR':
			case 'G':
			default:
				return l;
		}
	}

	function getLineGroupClass(group_id) {
		switch (group_id) {
			case 'a-c-e':
			case 'b-d-f-m':
			case 'n-q-r-w':
 			case 'j-z':
				return group_id.replace('-', '_');

			case 'L':
			case 'S':
			case 'SIR':
			case 'G':
				return group_id.toLowerCase();

			case '1-2-3':
				return 'oneTwoThree';

			case '4-5-6':
				return 'fourFiveSix';

			case '7':
			case 7:
				return 'seven';

			default:
				console.warn('Unknown Line Group ID: ', group_id);
				return group_id;
		}
	}

	function getLineGroupColor(line_id) {
		switch(line_id) {
			case 'a-c-e':
				return '#0039A6';
			case 'b-d-f-m':
				return '#FF6319';
			case 'n-q-r-w':
				return '#FCCC0A';
			case 'g':
				return '#6CBE45';
			case 'j-z':
				return '#996633';
			case '1-2-3':
				return '#EE352E';
			case '4-5-6':
				return '#00933C';
			case '7':
				return '#B933AD';
			case 'L':
				return '#A7A9AC';
			case 'S':
				return '#808183';
			case 'SIR':
			default:
				return '#CCCCCC';
		}
	}

	function getlineDirectionByID(id) {
		if (id == 2) { return 'both'; }
		return (id == 0) ? 'northbound' : 'southbound';
	}

	function getlineDirectionAbbreviation(dir) {
		switch (dir) {
			case 'northbound':
				return 'North Bound';
			case 'southbound':
				return 'South Bound';
			default:
				return dir;
		}
	}


	return({
		getlineById: getlineById,
		getLineGroup: getLineGroup,
		getLineGroupColor: getLineGroupColor,
		getlineDirectionByID:getlineDirectionByID,
		getlineDirectionAbbreviation: getlineDirectionAbbreviation,
		getLineGroupClass: getLineGroupClass
	});
})();

module.exports = {
	mtaSubway
};
