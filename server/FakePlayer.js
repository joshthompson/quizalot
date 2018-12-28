const Player = require('./Player')

let names = [
	'Josh',
	'Nick',
	'Jack',
	'James',
	'Lara',
	'Dana',
	'Mariana',
	'Tina',
	'Bojack',
	'Diane',
	'Mr Peanutbutter',
	'Todd',
	'Henry Fondle',
	'Brian',
	'Beefy',
	'Breadstick',
	'Rogo',
	'Topical',
	'Birgit',
	'Fraser',
	'Giles',
	'Dick Turpin',
	'Merty',
	'Rack',
	'Ratty',
	'Carl',
	'Lenny',
	'Ralph',
	'Homer',
	'Teenage Turtle',
	'Bobby B',
	'Nan',
	'Jeremy',
	'Double Dan',
	'Leeboy',
	'Bugcatcher Benny',
	'Travel Lodge Leon',
	'Lass Diane',
	'Brock',
	'Boom Boom',
	'Rvrt. Man',
	'PC Principle',
	'Strong Woman',
	'Wayo 4 Mayo'
]

const answers = [
	'Eggs',
	'Spaghetti',
	'Four rubber chickens',
	'A needle',
	'Jacob Rees-Mogg',
	'Christmas Spirit',
	'Jacob Marley',
	'A silver back',
	'8 Maids A-milking',
	'Triangle',
	'H20',
	'Carbon Dioxide',
	'Dasher',
	'Robert Redford',
	'The Nile',
	'Minnie Mouse',
	'That\'s a felony',
	'1 fiscal year',
	'farts',
	'Bleedy Gums Murphy',
	'Atilla the hun',
	'Almonds',
	'Sinead',
	'Garlic',
	'Onion rings',
	'Team America',
	'Team Rocket',
	'Measles',
	'Fortnite',
	'Dunno',
	'Jack is mean',
	'A carpenter?',
	'George W Bush',
	'Tyler the Creator',
	'My Name Is Earl',
	'Fast and Furious',
	'Goats',
	'Holiday Inn',
	'Paris Hilton',
	'The Go Compare Man',
	'Terrence and Paul',
	'Jack Hackett',
	'Reebok',
	'Pinecones'
]

const insults = [
	':name is stupid',
	':name smells',
	':name is a poop',
	':name\'s face',
	'A baby with the face of :name',
	':name\'s IQ'
]

function submitFakeAnswer(player) {
	if (Math.random() > 0.95 && player.quiz.players.length >= 2) {
		player.submitAnswer(submitInsultAnswer(player))
	} else {
	player.submitAnswer(answers[Math.floor(Math.random() * answers.length)])
	}
	setTimeout(submitFakeAnswer, Math.random() * 3000 + 1000, player)
}

function submitInsultAnswer(player) {
	const players = player.quiz.players.filter(p => p.name !== player.name)
	const victim = players[Math.floor(Math.random() * players.length)].name
	const insult = insults[Math.floor(Math.random() * insults.length)].replace(':name', victim.toLowerCase())
	return insult
}

function FakePlayer(quiz) {

	const fakeSocket = {
		emit: () => {},
		on: () => {},
		connected: false
	}

	const name = names.splice(Math.floor(Math.random() * names.length), 1)[0]
	const player = new Player(fakeSocket, name, quiz)
	player.avatar = 'robot1'
	setTimeout(submitFakeAnswer, 1000, player)
	return player

}

module.exports = FakePlayer
