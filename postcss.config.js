module.exports = {
    plugins: [
        /*
        * https://github.com/postcss/postcss
        * https://github.com/postcss/autoprefixer
        */
        require('autoprefixer')({ browsers: 'last 2 versions' })
    ]
}
