export const config = {
    api: {
        baseUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8080'
                : process.env.NEXT_PUBLIC_API_URL
    },
    project: {
        name: 'Gasan App',
        slogan: 'Right Time Right Now',
        description:
            'Gasan App is a web application that is developed for Gasan Group employees to manage their daily operations.',
        version: '1.0.0'
    },
    userRightsOnRoutes: [
        {
            urlRegex: /\/dashboard\/talasli-imalat-amiri$/,
            roles: ['TalasliImalatAmiri']
        },
        {
            urlRegex: /\/dashboard\/polisaj-amiri$/,
            roles: ['PolisajAmiri']
        },
        {
            urlRegex: /\/dashboard\/lift-montaj-amiri$/,
            roles: ['LiftMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/bloklift-montaj-amiri$/,
            roles: ['BlMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/boyama-ve-paketleme-amiri$/,
            roles: ['BoyamaPaketlemeAmiri']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri\/[0-9]+$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri\/stage\/[0-9]+$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/uretim$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/yonetici-menu$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/password-update$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/get-orders$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/yonetici-menu\/update-password$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/uretim-planlama\/[0-9]+$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim\/[0-9]+$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim\/new$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/polisaj-amiri\/[0-9]+$/,
            roles: ['PolisajAmiri']
        },
        {
            urlRegex: /\/dashboard\/talasli-imalat-amiri\/lift\/[0-9]+$/,
            roles: ['TalasliImalatAmiri']
        }
    ]
};