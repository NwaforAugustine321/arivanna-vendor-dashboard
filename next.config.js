const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const nextSettings = {
    env: {
        title: 'Arivanna',
        titleDescription: 'E-commerce',
        api_end_point:
            'https://df1be2sfo9.execute-api.us-east-2.amazonaws.com/dev/api/',
        api_end_point: 'http://localhost:3000/api/',
        apiKey: 'AIzaSyDTXzpeZme2zKSqq5nIQjdE0f1urniCCVU',
        authDomain: 'utopiatechproductupload.firebaseapp.com',
        projectId: 'utopiatechproductupload',
        storageBucket: 'utopiatechproductupload.appspot.com',
        messagingSenderId: '584720373547',
        appId: '1:584720373547:web:e0f41d4244357218cf176e',
        measurementId: 'G-X7S8KCD186',
        vendor_route: 'http://localhost:3004/',
        paypal: {
            paypalEnv: 'sandbox',
            paypalKey: `AQB_w4QITGU0lw8VTGYYilBvTyJtgUczOiabanDwXJoHzUP7kIuy1yUenFVAaNKG7yKSeXVDKsm5qaF5`,
        },
        chatAuthkey: 'fb32311fdc1544f0dfd4badeb640dcd322e41bb6',
        chatAppId: '192022384e259279',
        chatapikey: '6568fdb1f01f5de6b9be05c58703fe6e1348ebbe',
    },
    webpack: (config, options) => {
        const { isServer } = options;
        config.module.rules.push({
            test: /\.(ogg|mp4|mp3|wav|mpe?g|png|jpe?g|gif|svg)$/i,
            exclude: config.exclude,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: config.inlineImageLimit,
                        fallback: require.resolve('file-loader'),
                        publicPath: `_next/static/images/`,
                        outputPath: `${isServer ? '../' : ''}static/images/`,
                        name: '[name]-[hash].[ext]',
                        esModule: config.esModule || false,
                    },
                },
            ],
        });
        return config;
    },
};
module.exports = withPlugins([withImages(), nextSettings]);
