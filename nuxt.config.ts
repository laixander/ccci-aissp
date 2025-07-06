// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "UI Development - AISSP",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/ui'],
    css: ['~/assets/css/main.css'],
})
