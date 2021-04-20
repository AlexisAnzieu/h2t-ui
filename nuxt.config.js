export default {

  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: "H2T.club",
    // meta: [
    //   { charset: "utf-8" },
    //   { name: "viewport", content: "width=device-width, initial-scale=1" },
    //   {
    //     hid: "description",
    //     name: "description",
    //     content: "Réseau intrasocial communautaire H2T"
    //   },
    //   { hid: "title", property: "og:title", content: "H2T.club" },
    //   {
    //     hid: "image",
    //     property: "og:image",
    //     content: "/images/facebook-logo-OG.png"
    //   },
    // ],
    script: [{ src: "https://widget.cloudinary.com/v2.0/global/all.js" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  router: {
    middleware: ["auth"]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui", '@/plugins/persistedState', { src: '@/plugins/vue-touch', ssr: false }],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/device',
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-60251506-2"
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    "nuxt-leaflet",
    '@nuxtjs/apollo',
    '@nuxtjs/cloudinary'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUDNAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    useComponent: true
  },
  auth: {
    plugins: ['~/plugins/auth.js'],
    cookie: false,
    redirect: {
      login: '/login',
      logout: '/',
      home: false,
      callback: false
    },
    strategies: {
      local: {
        endpoints: {
          logout: false
        }
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: '~/middleware/apollo'
    },
    tokenName: 'token'
  },
  env: {
    BING_MAP_KEY: process.env.BING_MAP_KEY,
    API_ENDPOINT: process.env.API_ENDPOINT,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    GOOGLE_SEARCH_API_KEY: process.env.GOOGLE_SEARCH_API_KEY
  }
};
