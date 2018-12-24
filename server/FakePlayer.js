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

function FakePlayer(quiz) {

	const fakeSocket = {
		emit: () => {},
		on: () => {},
		connected: false
	}

	const name = names.splice(Math.floor(Math.random() * names.length), 1)[0]
	return new Player(fakeSocket, name, quiz)
}

module.exports = FakePlayer
