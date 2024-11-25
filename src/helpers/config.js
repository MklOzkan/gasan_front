export const config = {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://3.75.205.100:8090'
    },
    project: {
        name: 'Gasan App',
        slogan: 'Right Time Right Now',
        description:
            'Gasan App is a web application that is developed for Gasan Group employees to manage their daily operations.',
        version: '1.0.0'
    },
    talasliOperations: [
        'MIL_KOPARMA',
        'MIL_TORNALAMA',
        'MIL_TASLAMA',
        'ISIL_ISLEM',
        'EZME',
        'BORU_KESME_HAVSA'
    ],
    talasliList: {
        MIL_KOPARMA: 'Mil Koparma',
        MIL_TORNALAMA: 'Mil Tornalama',
        MIL_TASLAMA: 'Mil Taşlama',
        ISIL_ISLEM: 'Isıl İşlem',
        EZME: 'Ezme',
        BORU_KESME_HAVSA: 'Boru Kesme',
        BORU_KAPAMA: 'Boru Kapama',
        BORU_KAYNAK: 'Boru Kaynak',
        LIFT_MONTAJ: 'Lift Montaj',
        GAZ_DOLUM: 'Gaz Dolum',
        BASLIK_TAKMA: 'Başlık Takma',
        BLOK_LIFT_MONTAJ: 'Blok Lift Montaj',
        BORU_KAPAMA: 'Boru Kapama',
        GAZ_DOLUM: 'Gaz Dolum',
        TEST: 'Test',
        POLISAJ: 'Polisaj',
        BOYA: 'Boya',
        PAKETLEME: 'Paketleme',
        AFTER_POLISAJ: 'Polisaj Sonrası',
        AFTER_MONTAJ: 'Montaj Sonrası',
        AFTER_EZME: 'Ezme Sonrası',
        AFTER_MIL_TASLAMA: 'Mil Taşlama Sonrası',
        LIFT: 'Lift',
        DAMPER: 'Damper',
        BLOKLIFT: 'Blok Lift',
        PASLANMAZ: 'Paslanmaz'
    },
    liftOperations: [
        'BORU_KAPAMA',
        'BORU_KAYNAK',
        'LIFT_MONTAJ',
        'GAZ_DOLUM',
        'BASLIK_TAKMA'
    ],
    blOperationsForBL: ['BLOK_LIFT_MONTAJ', 'BORU_KAPAMA', 'GAZ_DOLUM', 'TEST'],
    blOperationsForDamper: [
        'BORU_KAPAMA',
        'BORU_KAYNAK',
        'BLOK_LIFT_MONTAJ',
        'GAZ_DOLUM',
        'TEST'
    ],
    boyapaketOperations: ['BOYA', 'PAKETLEME'],
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
            urlRegex: /\/dashboard\/lift-montaj-amiri\/[0-9]+$/,
            roles: ['LiftMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/bloklift-montaj-amiri$/,
            roles: ['BlMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/bloklift-montaj-amiri\/[0-9]+$/,
            roles: ['BlMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/boyama-ve-paketleme-amiri$/,
            roles: ['BoyamaPaketlemeAmiri']
        },

        {
            urlRegex: /\/dashboard\/boyama-ve-paketleme-amiri\/[0-9]+$/,
            roles: ['BoyamaPaketlemeAmiri']
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
            urlRegex: /\/dashboard\/yonetici-menu\/musteri-islemleri$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/yonetici-menu\/musteri-islemleri\/[0-9]+$/,
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
            urlRegex:
                /\/dashboard\/yonetici-menu\/musteri-islemleri\/musteri-reports$/,
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