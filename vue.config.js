module.exports = {
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