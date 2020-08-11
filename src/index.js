const config = require('src/config/server')

!config.clusterMode ? require('src/server') : require('src/cluster')
