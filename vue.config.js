const path = require('path')

module.exports = {
	chainWebpack: config => {
		// Resolve ~ to root of project
		config.resolve.alias.set('~', path.resolve(__dirname, 'src'))
	}
}
