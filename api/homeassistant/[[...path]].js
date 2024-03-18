import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  router(req) {
    const region = req.query.region || 'in'
    // return 'https://httpbin.org/anything' // for debugging
    return `https://px1.tuya${region}.com/homeassistant`
  },
  changeOrigin: true,
  pathRewrite: {
    '^/api/homeassistant': '' // strip "/api" from the URL
  },
  onProxyReq(proxyReq) {
      const proxyReqUrl = new URL(proxyReq.path, `${proxyReq.protocol}//${proxyReq.host}`)
      proxyReqUrl.searchParams.delete('region')
      proxyReqUrl.searchParams.delete('[...path]')
      proxyReq.path = proxyReqUrl.pathname + proxyReqUrl.search
  }
})
