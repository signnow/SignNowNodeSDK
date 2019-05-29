const snApi = require('./lib/signnow')({
    credentials: 'ZmNkMzE4MzU3ZmUxNmQxMTM2NzVhZjNlZjE5ZjZmYzU6OTIxYWNlYzI2NjY1ZWRjMTc1ODljOWM5ODY5NzI4ZTc=',
	production: false, //(false uses eval server)
});

// 1. get access token (authentication)
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

        const { access_token: token } = res;
    
        // 2. verify access token
        snApi.oauth2.verify({
            token,
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

        // 3. get user data
        snApi.user.retrieve({
            token,
        }, (err3, res3) => {
            if (err3) {
                console.error(err3);
            } else {
                console.log(
                    '--------------------------------------------\n3. snApi.user.retrieve:\n--------------------------------------------\n',
                    res3, '\n'
                );
            }
        });
    
    }
});

