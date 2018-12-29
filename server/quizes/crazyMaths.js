module.exports = {
	name: 'Crazy Maths',
	description: 'You think you know 2 + 2 but lets see',
	rounds: [
		{
			name: 'Easy Maths',
			questions: [
				{
					text: 'What is 8 - 1?',
					answer: '7'
				},
				{
					text: 'What is 10 x 10?',
					answer: '100'
				},
				{
					text: 'What is 156 / 12?',
					answer: '13'
				},
				{
					text: 'What is PI to 3 decimal places?',
					answer: '3.142'
				},
				{
					text: 'What is x when y = 3: y = 2x + 1',
					answer: '1'
				}
			]
		},
		{
			name: 'Maths Culture',
			questions: [
				{
					text: 'Who is this maths celebrity?',
					extra: {
						image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/CharlesBabbage.jpg/220px-CharlesBabbage.jpg'
					},
					answer: 'Charlse Babbage'
				},
				{
					text: 'Does New Zealand spell maths as MATH or MATHS',
					answer: 'MATHS'
				},
				{
					text: 'Who raps about the lyric 2 plus 2 is 4, minus 1 is 3 QUICK MATHS!',
					answer: 'Big Shaq'
				},
				{
					text: 'Which job probably requires the most maths?',
					answer: 'Mathematician'
				},
				{
					text: 'Name both maths ladies from Channel 4\'s Countdown',
					answer: 'Carol Vorderman & Rachel Riley' }
			]
		},
		{
			name: 'Hard Maths',
			questions: [
				{
					text: 'What is the square root of 289?',
					answer: '17'
				},
				{
					text: 'If 8 ladies each have 8 spiders and each of them has 8 sets of size 8 spider shoes that each cost €8 per shoe. How much are the shoes all worth?',
					answer: '€4096'
				},
				{
					text: 'An invisble man who is named Visible Mike is 180cm tall. Barry Henderson is a third the height of Visible Mike but half the height of Gemma Two Hats. Each of Gemma\'s two hats that she is wearing make her appear 10cm taller. If they all stand on each others heads in height order with the shortest at the bottom: how tall does Tony Balony think they  (Tony Balony always overestimates by 5cm)',
					answer: '205cm'
				},
				{
					text: 'What is 8 x 3?',
					answer: '24'
				},
				{
					text: 'What is 5!? (factorial)',
					answer: '120'
				}
			]
		}
	]
}
