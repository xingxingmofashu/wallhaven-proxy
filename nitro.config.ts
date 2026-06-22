import { defineConfig } from "nitro"

export default defineConfig({
  serverDir: './server',
  devProxy:{
    '/api/v1': {
      target: 'https://wallhaven.cc/api/v1',
      changeOrigin: true
    }
  }
});
