const FileManagerPlugin = require("filemanager-webpack-plugin");
const packageName = 'file-manage'
module.exports = {
    outputDir: 'file-manage',
    publicPath: process.env.NODE_ENV === 'production' ? '/static/file-manage/': '/',
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://localhost:3050/',
                ws: true,
                secure: false,
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        plugins: [
            new FileManagerPlugin({
                events: {
                    onEnd: {
                        delete: [   //首先需要删除项目根目录下的dist.zip
                            `./${packageName}.zip`,   
                        ],
                        archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                            {source: `./${packageName}`, destination: `./${packageName}.zip`},   
                        ]
                    }
                }
            })
        ]
    }
}