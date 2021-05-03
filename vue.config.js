module.exports = {
    outputDir: 'files-manage',
    publicPath: process.env.NODE_ENV === 'production' ? '/static/files-manage/': '/',
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://localhost:3050/',
                ws: true,
                secure: false,
                changeOrigin: true,
            }
        }
    }
}