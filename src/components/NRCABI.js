export const nrcRegistration=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "nrcNo",
				"type": "string"
			},
			{
				"name": "issuedDate",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "fatherName",
				"type": "string"
			},
			{
				"name": "birthday",
				"type": "string"
			},
			{
				"name": "raceReligion",
				"type": "string"
			},
			{
				"name": "height",
				"type": "string"
			},
			{
				"name": "bloodType",
				"type": "string"
			},
			{
				"name": "feature",
				"type": "string"
			}
		],
		"name": "addingData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countIssuedNRC",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getIssuedNRC",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "input",
				"type": "string"
			}
		],
		"name": "getNRCDetail",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]