export const MARCAS = [
    { id: 'europeo', nombre: 'Europeo' },
    { id: 'americano', nombre: 'Americano' },
    { id: 'asiatico', nombre: 'Asiático' },
];

export const MARCA_FACTOR = {
    europeo: 1.30,
    americano: 1.15,
    asiatico: 1.05,
};

export const MARCAS_MODELOS = {
    europeo: [
        { id: 'bmw-serie-1', nombre: 'BMW Serie 1', factor: 1.05 },
        { id: 'bmw-m5', nombre: 'BMW M5', factor: 1.35 },
        { id: 'mercedes-clk-amg', nombre: 'Mercedes CLK 55 AMG', factor: 1.25 },
        { id: 'audi-a4', nombre: 'Audi A4 3.2 FSI', factor: 1.15 },
        { id: 'vw-jetta', nombre: 'Volkswagen Jetta', factor: 1.00 },
    ],
    americano: [
        { id: 'ford-mustang', nombre: 'Ford Mustang Shelby', factor: 1.20 },
        { id: 'ford-fiesta', nombre: 'Ford Fiesta', factor: 1.00 },
        { id: 'chevrolet-camaro', nombre: 'Chevrolet Camaro ZL1', factor: 1.20 },
        { id: 'tesla-model-3', nombre: 'Tesla Model 3', factor: 1.25 },
        { id: 'jeep-cherokee', nombre: 'Jeep Cherokee', factor: 1.10 },
    ],
    asiatico: [
        { id: 'toyota-corolla', nombre: 'Toyota Corolla', factor: 1.00 },
        { id: 'toyota-land-cruiser', nombre: 'Toyota Land Cruiser', factor: 1.20 },
        { id: 'honda-civic', nombre: 'Honda Civic', factor: 1.00 },
        { id: 'nissan-sentra', nombre: 'Nissan Sentra', factor: 1.00 },
        { id: 'mazda-3', nombre: 'Mazda 3', factor: 1.05 },
    ],
};

export const CIUDADES = [
    { id: 'cdmx', nombre: 'Ciudad de México', factor: 1.20 },
    { id: 'guadalajara', nombre: 'Guadalajara', factor: 1.10 },
    { id: 'monterrey', nombre: 'Monterrey', factor: 1.10 },
    { id: 'puebla', nombre: 'Puebla', factor: 1.05 },
    { id: 'otro', nombre: 'Otra', factor: 1.00 },
];

export const USOS = [
    { id: 'particular', nombre: 'Particular', factor: 1.00 },
    { id: 'comercial', nombre: 'Comercial', factor: 1.20 },
    { id: 'rideshare', nombre: 'Rideshare (Uber/DiDi)', factor: 1.35 },
];

const YEARMAX = new Date().getFullYear();

export const YEARS = Array.from(
    new Array(20),
    (_, index) => YEARMAX - index
);

/**
 * Planes con coberturas y factor multiplicador.
 * Cada cobertura aparece en planes superiores.
 */
export const PLANES = [
    {
        id: 'basico',
        nombre: 'Básico',
        factor: 1.00,
        coberturas: [
            'Responsabilidad civil',
        ],
    },
    {
        id: 'intermedio',
        nombre: 'Intermedio',
        factor: 1.25,
        coberturas: [
            'Responsabilidad civil',
            'Daños a terceros',
            'Asistencia vial 24/7',
        ],
    },
    {
        id: 'completo',
        nombre: 'Completo',
        factor: 1.50,
        coberturas: [
            'Responsabilidad civil',
            'Daños a terceros',
            'Asistencia vial 24/7',
            'Daños propios',
            'Robo total',
        ],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        factor: 1.85,
        coberturas: [
            'Responsabilidad civil',
            'Daños a terceros',
            'Asistencia vial 24/7',
            'Daños propios',
            'Robo total',
            'Conductor adicional',
            'Rotura de cristales',
            'Equipaje y accesorios',
        ],
    },
];

export const PLAN_FACTOR = Object.fromEntries(
    PLANES.map(p => [p.id, p.factor])
);

/**
 * Universo de todas las coberturas (en orden de aparición).
 * Útil para tabla comparativa: filas = coberturas, columnas = planes.
 */
export const TODAS_COBERTURAS = [
    'Responsabilidad civil',
    'Daños a terceros',
    'Asistencia vial 24/7',
    'Daños propios',
    'Robo total',
    'Conductor adicional',
    'Rotura de cristales',
    'Equipaje y accesorios',
];

// Modelos GLB locales servidos desde /public/models, indexados por id del modelo del catálogo.
export const MODEL_BY_MODELO = {
    // Europeos
    'bmw-serie-1': '/models/bmw_serie_1_2010.glb',
    'bmw-m5': '/models/2018_bmw_m5.glb',
    'mercedes-clk-amg': '/models/2003_mercedes-benz_clk_55_amg.glb',
    'audi-a4': '/models/2005_audi_a4_3.2_fsi_quattro.glb',
    'vw-jetta': '/models/2019_volkswagen_jetta.glb',
    // Americanos
    'ford-mustang': '/models/ford_mustang_shelby_2012.glb',
    'ford-fiesta': '/models/2008_ford_fiesta.glb',
    'chevrolet-camaro': '/models/2012_chevrolet_camaro_zl1.glb',
    'tesla-model-3': '/models/tesla_2018_model_3.glb',
    'jeep-cherokee': '/models/2019_jeep_cherokee.glb',
    // Asiáticos
    'toyota-corolla': '/models/toyota_corolla_2020.glb',
    'toyota-land-cruiser': '/models/2022_toyota_land_cruiser_300_vx.r.glb',
    'honda-civic': '/models/honda_civic.glb',
    'nissan-sentra': '/models/2020_nissan_sentra_sylphy.glb',
    'mazda-3': '/models/2020_mazda_3_hatchback.glb',
};
