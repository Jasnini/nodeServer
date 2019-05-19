module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 18,
            unitPrecision: 3,
            propList: ['*'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }
    }
};
