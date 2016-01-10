'use strict';

module.exports = {
    db: {
        uri: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mariabakery-dev',
        options: {
            db: {
                safe: true
            }
        },
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '398094186943670',
        clientSecret: process.env.FACEBOOK_SECRET || '524d637c19b097231a24a91d377a45f7',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'gianluca.supino@gmail.com',
                pass: process.env.MAILER_PASSWORD || 'supino71'
            }
        }
    }
};
