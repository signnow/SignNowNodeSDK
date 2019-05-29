const snApi = require('./lib/signnow')({
    credentials: 'ZmNkMzE4MzU3ZmUxNmQxMTM2NzVhZjNlZjE5ZjZmYzU6OTIxYWNlYzI2NjY1ZWRjMTc1ODljOWM5ODY5NzI4ZTc=',
	production: false, //(false uses eval server)
});

snApi.oauth2.requestToken({
	username: 'tereshchenko.ruslan@pdffiller.team',
	password: '475509502',
}, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(
            '--------------------------------------------\n1. snApi.oauth2.requestToken:\n--------------------------------------------\n',
            res, '\n'
        );
    
    
        snApi.oauth2.verify({
            token: res.access_token,
        }, (err2, res2) => {
            if (err2) {
                console.error(err2);
            } else {
                console.log(
                    '--------------------------------------------\n2. snApi.oauth2.verify:\n--------------------------------------------\n',
                    res2, '\n'
                );
            }
        });
    
    }
});

