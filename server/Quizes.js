const christmas2018 = [
	{
		name: '2018',
		questions: [
			{
				text: 'Who are these fun loving tourists?',
				image: 'http://newsneednews.com/wp-content/uploads/2018/09/ccelebritiesfoto5026110700000578-0-image-a-27_1536884648566.jpg',
				answer: 'Russian Spies',
				joke: ['Bill & Ben']
			},
			// {
			// 	text: 'Was this year a leap year?',
			// 	answer: 'No, but 2020 will be'
			// },
			// {
			// 	text: 'What is the capital city of India?',
			// 	answer: 'New Dehli'
			// },
			// {
			// 	text: 'Who voices Rick and Morty?',
			// 	answer: 'Justin Roilands'
			// }
		]
	},
	{
		name: 'Christmas',
		questions: [
			{
				text: 'What is belly button fluff?',
				answer: 'Christmas snow'
			},
			{
				text: 'Christmas is on which day?',
				answer: '25th December'
			},
			{
				text: 'How is Santa related to Jesus?',
				answer: '3rd Cousins'
			}
		]
	},
	{
		name: 'Finish The Lyric',
		questions: [
			{},
			{},
			{},
			{}
		]
	}
]

const crazyMaths = [
	{
		name: 'Easy Maths',
		questions: [
			{ text: 'What is 8 - 1?', answer: '7' },
			{ text: 'What is 10 x 10?', answer: '100' },
			{ text: 'What is 156 / 12?', answer: '13' },
			{ text: 'What is PI to 3 decimal places?', answer: '3.142', joke: ['Pies taste good', '3.141', 'Mmmm'] },
			{ text: 'What is x when y = 3: y = 2x + 1', answer: '1', , joke: ['x = shut up'] }
		]
	},
	{
		name: 'Maths Culture',
		questions: [
			{ text: 'Who is this maths celebrity?', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/CharlesBabbage.jpg/220px-CharlesBabbage.jpg', answer: 'Charlse Babbage', joke: ['Donald Trump', 'Your Mum!!!!', 'Some random old maths man'] },
			{ text: 'Does New Zealand spell maths as MATH or MATHS', answer: 'MATHS', joke: ['Maths as!'] },
			{ text: 'Who raps about the lyric 2 plus 2 is 4, minus 1 is 3 QUICK MATHS!', answer: 'Big Shaq', joke: ['Dizzie Rascal'] },
			{ text: 'Which job probably requires the most maths?', answer: 'Mathematician', joke: ['Mortician', 'Librarian lol'] },
			{ text: 'Name both maths ladies from Channel 4\'s Countdown', answer: 'Carol Vorderman & Rachel Riley' }
		]
	},
	{
		name: 'Hard Maths',
		questions: [
			{ text: 'What is the square root of -4?', answer: '4i', joke: ['-2'] },
			{ text: 'If 8 ladies each have 8 spiders and each of them has 8 sets of size 8 spider shoes that each cost €8 per shoe. How much are the shoes all worth?', answer: '€512', joke: ['Nothing cus they stole the shoes'] },
			{ text: 'An invisble man who is named Visible Mike is 180cm tall. Barry Henderson is a third the height of Visible Mike but half the height of Gemma Two Hats. Each of Gemma\'s two hats that she is wearing make her appear 10cm taller. If they all stand on each others heads in height order with the shortest at the bottom: how tall does Tony Balony think they  (Tony Balony always overestimates by 5cm)', answer: '205cm' },
			{ text: 'What is 8 x 3?', answer: '24' },
			{ text: 'What is 5!? (factorial)', answer: '120', joke: ['5!!!'] }
		]
	}
]

module.exports = {
	christmas2018: {
		name: 'Christmas 2018',
		description: 'Festive quizing for you and your pals',
		rounds: christmas2018
	},
	crazyMaths: {
		name: 'Crazy Maths',
		description: 'You think you know 2 + 2 but lets see',
		rounds: crazyMaths
	}
}
