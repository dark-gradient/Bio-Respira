import { RoomDevice, SmartSchedule, AirAlert, UserSettings } from '../types';

export const INITIAL_ROOMS: RoomDevice[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    deviceModel: 'Bio Respira X1',
    areaSqM: 42,
    deviceState: {
      online: true,
      poweredOn: true,
      mode: 'auto',
      fanLevel: 3,
      uvC: true,
      ionizer: true,
      childLock: false,
      timer: null,
      soundLevel: 38,
      airflow: 245,
      model: 'Bio Respira X1',
      firmwareVersion: 'v2.8.4-opt',
      ledBrightness: 80
    },
    environmental: {
      aqi: 18,
      pm25: 7,
      pm10: 14,
      co2: 488,
      tvoc: 42,
      temperature: 22.4,
      humidity: 48,
      outdoorAqi: 56,
      outdoorPm25: 24,
      outdoorTemp: 19.2,
      status: 'excellent',
      trend: 'improving',
      lastUpdated: 'Just now'
    },
    filters: [
      {
        id: 'filter-pre-1',
        name: 'Pre-Filter Screen',
        type: 'pre',
        healthPercentage: 92,
        daysRemaining: 290,
        totalLifeDays: 365,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'High-density micro-mesh capturing hair, pet fur, lint, and large dust particles. Washable.',
        filterMaterial: 'Micro-woven polymer mesh',
        captures: ['Pet hair', 'Household dust', 'Lint', 'Coarse pollen']
      },
      {
        id: 'filter-hepa-1',
        name: 'H13 Medical-Grade HEPA',
        type: 'hepa',
        healthPercentage: 88,
        daysRemaining: 210,
        totalLifeDays: 360,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'True HEPA H13 layer arresting 99.97% of ultra-fine particulate matter down to 0.1 microns.',
        filterMaterial: 'Borosilicate glass microfibers',
        captures: ['PM2.5 / PM10', 'Pollen allergens', 'Mold spores', 'Aerosolized bacteria']
      },
      {
        id: 'filter-carbon-1',
        name: 'Activated Carbon Matrix',
        type: 'carbon',
        healthPercentage: 74,
        daysRemaining: 155,
        totalLifeDays: 270,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'Microporous coconut-shell activated carbon honeycomb neutralizes volatile organic compounds and cooking odors.',
        filterMaterial: 'Virgin coconut-shell carbon granules',
        captures: ['TVOCs', 'Cooking fumes', 'Pet odors', 'Formaldehyde']
      },
      {
        id: 'filter-uv-1',
        name: 'Germicidal UV-C Module',
        type: 'uv',
        healthPercentage: 95,
        daysRemaining: 540,
        totalLifeDays: 720,
        installDate: '2026-03-15',
        status: 'healthy',
        description: '254nm ultraviolet photo-catalytic stage sterilizing intercepted microbes and preventing spore germination.',
        filterMaterial: 'Quartz glass UV-C emitter with TiO2 mesh',
        captures: ['Pathogens', 'Viral aerosols', 'Microbial spores']
      }
    ],
    history24h: [
      { time: '00:00', indoorAqi: 15, outdoorAqi: 48, pm25: 5, pm10: 11, co2: 440, tvoc: 32, temperature: 21.8, humidity: 47 },
      { time: '02:00', indoorAqi: 14, outdoorAqi: 45, pm25: 5, pm10: 10, co2: 435, tvoc: 30, temperature: 21.6, humidity: 47 },
      { time: '04:00', indoorAqi: 14, outdoorAqi: 42, pm25: 4, pm10: 10, co2: 430, tvoc: 28, temperature: 21.4, humidity: 46 },
      { time: '06:00', indoorAqi: 15, outdoorAqi: 49, pm25: 5, pm10: 12, co2: 450, tvoc: 34, temperature: 21.7, humidity: 46 },
      { time: '08:00', indoorAqi: 22, outdoorAqi: 62, pm25: 9, pm10: 18, co2: 510, tvoc: 48, temperature: 22.0, humidity: 48 },
      { time: '10:00', indoorAqi: 19, outdoorAqi: 68, pm25: 8, pm10: 16, co2: 495, tvoc: 44, temperature: 22.2, humidity: 49 },
      { time: '12:00', indoorAqi: 18, outdoorAqi: 65, pm25: 7, pm10: 15, co2: 490, tvoc: 43, temperature: 22.5, humidity: 48 },
      { time: '14:00', indoorAqi: 17, outdoorAqi: 58, pm25: 6, pm10: 13, co2: 480, tvoc: 40, temperature: 22.7, humidity: 47 },
      { time: '16:00', indoorAqi: 19, outdoorAqi: 64, pm25: 8, pm10: 15, co2: 505, tvoc: 45, temperature: 22.6, humidity: 48 },
      { time: '18:00', indoorAqi: 24, outdoorAqi: 72, pm25: 11, pm10: 20, co2: 535, tvoc: 55, temperature: 22.5, humidity: 49 },
      { time: '20:00', indoorAqi: 20, outdoorAqi: 60, pm25: 8, pm10: 16, co2: 495, tvoc: 46, temperature: 22.4, humidity: 48 },
      { time: '22:00', indoorAqi: 18, outdoorAqi: 56, pm25: 7, pm10: 14, co2: 488, tvoc: 42, temperature: 22.4, humidity: 48 }
    ],
    history7d: [
      { time: 'Mon', indoorAqi: 16, outdoorAqi: 54, pm25: 6, pm10: 12, co2: 470, tvoc: 38, temperature: 22.1, humidity: 47 },
      { time: 'Tue', indoorAqi: 19, outdoorAqi: 66, pm25: 8, pm10: 15, co2: 490, tvoc: 45, temperature: 22.3, humidity: 48 },
      { time: 'Wed', indoorAqi: 17, outdoorAqi: 58, pm25: 7, pm10: 13, co2: 480, tvoc: 40, temperature: 22.2, humidity: 46 },
      { time: 'Thu', indoorAqi: 22, outdoorAqi: 74, pm25: 10, pm10: 18, co2: 515, tvoc: 50, temperature: 22.4, humidity: 49 },
      { time: 'Fri', indoorAqi: 18, outdoorAqi: 62, pm25: 7, pm10: 14, co2: 485, tvoc: 42, temperature: 22.5, humidity: 48 },
      { time: 'Sat', indoorAqi: 15, outdoorAqi: 50, pm25: 5, pm10: 11, co2: 460, tvoc: 36, temperature: 22.3, humidity: 47 },
      { time: 'Sun', indoorAqi: 18, outdoorAqi: 56, pm25: 7, pm10: 14, co2: 488, tvoc: 42, temperature: 22.4, humidity: 48 }
    ],
    history30d: [
      { time: 'W1', indoorAqi: 16, outdoorAqi: 58, pm25: 6, pm10: 12, co2: 475, tvoc: 38, temperature: 22.0, humidity: 47 },
      { time: 'W2', indoorAqi: 18, outdoorAqi: 64, pm25: 8, pm10: 15, co2: 490, tvoc: 42, temperature: 22.2, humidity: 48 },
      { time: 'W3', indoorAqi: 21, outdoorAqi: 72, pm25: 9, pm10: 17, co2: 505, tvoc: 48, temperature: 22.4, humidity: 49 },
      { time: 'W4', indoorAqi: 18, outdoorAqi: 56, pm25: 7, pm10: 14, co2: 488, tvoc: 42, temperature: 22.4, humidity: 48 }
    ]
  },
  {
    id: 'master-bedroom',
    name: 'Master Bedroom',
    deviceModel: 'Bio Respira X1',
    areaSqM: 28,
    deviceState: {
      online: true,
      poweredOn: true,
      mode: 'sleep',
      fanLevel: 1,
      uvC: true,
      ionizer: false,
      childLock: false,
      timer: null,
      soundLevel: 20,
      airflow: 70,
      model: 'Bio Respira X1',
      firmwareVersion: 'v2.8.4-opt',
      ledBrightness: 10
    },
    environmental: {
      aqi: 22,
      pm25: 9,
      pm10: 17,
      co2: 540,
      tvoc: 48,
      temperature: 21.8,
      humidity: 46,
      outdoorAqi: 56,
      outdoorPm25: 24,
      outdoorTemp: 19.2,
      status: 'excellent',
      trend: 'stable',
      lastUpdated: 'Just now'
    },
    filters: [
      {
        id: 'filter-pre-2',
        name: 'Pre-Filter Screen',
        type: 'pre',
        healthPercentage: 89,
        daysRemaining: 275,
        totalLifeDays: 365,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'Captures dust mites, clothing fibers, and bedding lint.',
        filterMaterial: 'Micro-woven polymer mesh',
        captures: ['Bedding lint', 'Dust mites', 'Fibers']
      },
      {
        id: 'filter-hepa-2',
        name: 'H13 Medical-Grade HEPA',
        type: 'hepa',
        healthPercentage: 84,
        daysRemaining: 190,
        totalLifeDays: 360,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'Filters allergens for restful sleep.',
        filterMaterial: 'Borosilicate glass microfibers',
        captures: ['PM2.5', 'Pollen', 'Mold spores']
      },
      {
        id: 'filter-carbon-2',
        name: 'Activated Carbon Matrix',
        type: 'carbon',
        healthPercentage: 70,
        daysRemaining: 140,
        totalLifeDays: 270,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'Adsorbs night air impurities and bedroom odors.',
        filterMaterial: 'Virgin coconut-shell carbon granules',
        captures: ['Odors', 'VOCs']
      },
      {
        id: 'filter-uv-2',
        name: 'Germicidal UV-C Module',
        type: 'uv',
        healthPercentage: 96,
        daysRemaining: 550,
        totalLifeDays: 720,
        installDate: '2026-03-15',
        status: 'healthy',
        description: 'Disinfects recirculated bedroom air.',
        filterMaterial: 'Quartz glass UV-C emitter',
        captures: ['Pathogens', 'Bacteria']
      }
    ],
    history24h: [
      { time: '00:00', indoorAqi: 24, outdoorAqi: 48, pm25: 10, pm10: 18, co2: 560, tvoc: 50, temperature: 21.6, humidity: 46 },
      { time: '04:00', indoorAqi: 22, outdoorAqi: 42, pm25: 9, pm10: 17, co2: 550, tvoc: 48, temperature: 21.4, humidity: 45 },
      { time: '08:00', indoorAqi: 25, outdoorAqi: 62, pm25: 11, pm10: 19, co2: 580, tvoc: 54, temperature: 21.7, humidity: 46 },
      { time: '12:00', indoorAqi: 20, outdoorAqi: 65, pm25: 8, pm10: 15, co2: 510, tvoc: 44, temperature: 22.0, humidity: 46 },
      { time: '16:00', indoorAqi: 19, outdoorAqi: 64, pm25: 8, pm10: 14, co2: 500, tvoc: 42, temperature: 22.1, humidity: 45 },
      { time: '20:00', indoorAqi: 22, outdoorAqi: 60, pm25: 9, pm10: 17, co2: 540, tvoc: 48, temperature: 21.8, humidity: 46 }
    ],
    history7d: [
      { time: 'Mon', indoorAqi: 21, outdoorAqi: 54, pm25: 8, pm10: 16, co2: 530, tvoc: 46, temperature: 21.7, humidity: 45 },
      { time: 'Tue', indoorAqi: 23, outdoorAqi: 66, pm25: 10, pm10: 18, co2: 550, tvoc: 50, temperature: 21.8, humidity: 46 },
      { time: 'Wed', indoorAqi: 20, outdoorAqi: 58, pm25: 8, pm10: 15, co2: 520, tvoc: 44, temperature: 21.6, humidity: 45 },
      { time: 'Thu', indoorAqi: 24, outdoorAqi: 74, pm25: 11, pm10: 19, co2: 560, tvoc: 52, temperature: 21.9, humidity: 46 },
      { time: 'Fri', indoorAqi: 22, outdoorAqi: 62, pm25: 9, pm10: 17, co2: 540, tvoc: 48, temperature: 21.8, humidity: 46 },
      { time: 'Sat', indoorAqi: 19, outdoorAqi: 50, pm25: 7, pm10: 14, co2: 505, tvoc: 42, temperature: 21.6, humidity: 45 },
      { time: 'Sun', indoorAqi: 22, outdoorAqi: 56, pm25: 9, pm10: 17, co2: 540, tvoc: 48, temperature: 21.8, humidity: 46 }
    ],
    history30d: [
      { time: 'W1', indoorAqi: 20, outdoorAqi: 58, pm25: 8, pm10: 15, co2: 525, tvoc: 44, temperature: 21.6, humidity: 45 },
      { time: 'W2', indoorAqi: 22, outdoorAqi: 64, pm25: 9, pm10: 17, co2: 545, tvoc: 48, temperature: 21.8, humidity: 46 },
      { time: 'W3', indoorAqi: 24, outdoorAqi: 72, pm25: 11, pm10: 19, co2: 560, tvoc: 52, temperature: 21.9, humidity: 46 },
      { time: 'W4', indoorAqi: 22, outdoorAqi: 56, pm25: 9, pm10: 17, co2: 540, tvoc: 48, temperature: 21.8, humidity: 46 }
    ]
  },
  {
    id: 'home-office',
    name: 'Home Office',
    deviceModel: 'Bio Respira X1',
    areaSqM: 20,
    deviceState: {
      online: true,
      poweredOn: true,
      mode: 'eco',
      fanLevel: 2,
      uvC: false,
      ionizer: true,
      childLock: false,
      timer: null,
      soundLevel: 26,
      airflow: 110,
      model: 'Bio Respira X1',
      firmwareVersion: 'v2.8.4-opt',
      ledBrightness: 50
    },
    environmental: {
      aqi: 31,
      pm25: 14,
      pm10: 24,
      co2: 612,
      tvoc: 68,
      temperature: 23.1,
      humidity: 42,
      outdoorAqi: 56,
      outdoorPm25: 24,
      outdoorTemp: 19.2,
      status: 'good',
      trend: 'degrading',
      lastUpdated: 'Just now'
    },
    filters: [
      {
        id: 'filter-pre-3',
        name: 'Pre-Filter Screen',
        type: 'pre',
        healthPercentage: 78,
        daysRemaining: 180,
        totalLifeDays: 365,
        installDate: '2026-01-10',
        status: 'healthy',
        description: 'Micro-woven pre-filter for office dust and paper particles.',
        filterMaterial: 'Micro-woven polymer mesh',
        captures: ['Paper dust', 'Textile fibers', 'Hair']
      },
      {
        id: 'filter-hepa-3',
        name: 'H13 Medical-Grade HEPA',
        type: 'hepa',
        healthPercentage: 66,
        daysRemaining: 95,
        totalLifeDays: 360,
        installDate: '2026-01-10',
        status: 'moderate',
        description: 'Filters electronics emissions and fine particulates.',
        filterMaterial: 'Borosilicate glass microfibers',
        captures: ['Toner micro-particles', 'PM2.5', 'Pollen']
      },
      {
        id: 'filter-carbon-3',
        name: 'Activated Carbon Matrix',
        type: 'carbon',
        healthPercentage: 54,
        daysRemaining: 55,
        totalLifeDays: 270,
        installDate: '2026-01-10',
        status: 'replace-soon',
        description: 'Targeted VOC adsorption for electronics, plastics, and paper off-gassing.',
        filterMaterial: 'Virgin coconut-shell carbon granules',
        captures: ['Electronics VOCs', 'Plastic off-gassing']
      },
      {
        id: 'filter-uv-3',
        name: 'Germicidal UV-C Module',
        type: 'uv',
        healthPercentage: 88,
        daysRemaining: 480,
        totalLifeDays: 720,
        installDate: '2026-01-10',
        status: 'healthy',
        description: 'Disinfection stage for closed office air circulation.',
        filterMaterial: 'Quartz glass UV-C emitter',
        captures: ['Microbes', 'Airborne mold']
      }
    ],
    history24h: [
      { time: '00:00', indoorAqi: 22, outdoorAqi: 48, pm25: 8, pm10: 16, co2: 480, tvoc: 44, temperature: 22.0, humidity: 43 },
      { time: '04:00', indoorAqi: 20, outdoorAqi: 42, pm25: 7, pm10: 14, co2: 460, tvoc: 40, temperature: 21.8, humidity: 43 },
      { time: '08:00', indoorAqi: 28, outdoorAqi: 62, pm25: 12, pm10: 21, co2: 560, tvoc: 58, temperature: 22.5, humidity: 42 },
      { time: '12:00', indoorAqi: 34, outdoorAqi: 65, pm25: 16, pm10: 27, co2: 640, tvoc: 74, temperature: 23.3, humidity: 41 },
      { time: '16:00', indoorAqi: 32, outdoorAqi: 64, pm25: 15, pm10: 25, co2: 630, tvoc: 70, temperature: 23.4, humidity: 42 },
      { time: '20:00', indoorAqi: 31, outdoorAqi: 60, pm25: 14, pm10: 24, co2: 612, tvoc: 68, temperature: 23.1, humidity: 42 }
    ],
    history7d: [
      { time: 'Mon', indoorAqi: 28, outdoorAqi: 54, pm25: 12, pm10: 22, co2: 590, tvoc: 62, temperature: 22.9, humidity: 42 },
      { time: 'Tue', indoorAqi: 32, outdoorAqi: 66, pm25: 15, pm10: 26, co2: 630, tvoc: 72, temperature: 23.2, humidity: 41 },
      { time: 'Wed', indoorAqi: 30, outdoorAqi: 58, pm25: 13, pm10: 23, co2: 605, tvoc: 65, temperature: 23.0, humidity: 42 },
      { time: 'Thu', indoorAqi: 33, outdoorAqi: 74, pm25: 16, pm10: 28, co2: 645, tvoc: 75, temperature: 23.3, humidity: 41 },
      { time: 'Fri', indoorAqi: 29, outdoorAqi: 62, pm25: 13, pm10: 22, co2: 600, tvoc: 64, temperature: 23.0, humidity: 42 },
      { time: 'Sat', indoorAqi: 24, outdoorAqi: 50, pm25: 9, pm10: 17, co2: 510, tvoc: 50, temperature: 22.4, humidity: 43 },
      { time: 'Sun', indoorAqi: 31, outdoorAqi: 56, pm25: 14, pm10: 24, co2: 612, tvoc: 68, temperature: 23.1, humidity: 42 }
    ],
    history30d: [
      { time: 'W1', indoorAqi: 27, outdoorAqi: 58, pm25: 11, pm10: 20, co2: 580, tvoc: 60, temperature: 22.8, humidity: 42 },
      { time: 'W2', indoorAqi: 30, outdoorAqi: 64, pm25: 13, pm10: 23, co2: 610, tvoc: 67, temperature: 23.0, humidity: 42 },
      { time: 'W3', indoorAqi: 32, outdoorAqi: 72, pm25: 15, pm10: 26, co2: 635, tvoc: 73, temperature: 23.2, humidity: 41 },
      { time: 'W4', indoorAqi: 31, outdoorAqi: 56, pm25: 14, pm10: 24, co2: 612, tvoc: 68, temperature: 23.1, humidity: 42 }
    ]
  },
  {
    id: 'nursery',
    name: 'Nursery',
    deviceModel: 'Bio Respira X1',
    areaSqM: 18,
    deviceState: {
      online: true,
      poweredOn: true,
      mode: 'auto',
      fanLevel: 2,
      uvC: true,
      ionizer: false,
      childLock: true,
      timer: null,
      soundLevel: 24,
      airflow: 95,
      model: 'Bio Respira X1',
      firmwareVersion: 'v2.8.4-opt',
      ledBrightness: 25
    },
    environmental: {
      aqi: 16,
      pm25: 6,
      pm10: 12,
      co2: 460,
      tvoc: 35,
      temperature: 22.0,
      humidity: 50,
      outdoorAqi: 56,
      outdoorPm25: 24,
      outdoorTemp: 19.2,
      status: 'excellent',
      trend: 'improving',
      lastUpdated: 'Just now'
    },
    filters: [
      {
        id: 'filter-pre-4',
        name: 'Pre-Filter Screen',
        type: 'pre',
        healthPercentage: 94,
        daysRemaining: 310,
        totalLifeDays: 365,
        installDate: '2026-04-01',
        status: 'healthy',
        description: 'Micro-woven pre-filter safeguarding baby breathing zone.',
        filterMaterial: 'Micro-woven polymer mesh',
        captures: ['Fibers', 'Cotton lint', 'Coarse dust']
      },
      {
        id: 'filter-hepa-4',
        name: 'H13 Medical-Grade HEPA',
        type: 'hepa',
        healthPercentage: 91,
        daysRemaining: 240,
        totalLifeDays: 360,
        installDate: '2026-04-01',
        status: 'healthy',
        description: 'Ultra-pure air filtration with zero ozone byproducts.',
        filterMaterial: 'Borosilicate glass microfibers',
        captures: ['Ultra-fine PM2.5', 'Pollen', 'Micro-dust']
      },
      {
        id: 'filter-carbon-4',
        name: 'Activated Carbon Matrix',
        type: 'carbon',
        healthPercentage: 82,
        daysRemaining: 185,
        totalLifeDays: 270,
        installDate: '2026-04-01',
        status: 'healthy',
        description: 'Odor and volatile gas neutralization for sensitive newborn air.',
        filterMaterial: 'Virgin coconut-shell carbon granules',
        captures: ['Nursery odors', 'VOCs']
      },
      {
        id: 'filter-uv-4',
        name: 'Germicidal UV-C Module',
        type: 'uv',
        healthPercentage: 98,
        daysRemaining: 610,
        totalLifeDays: 720,
        installDate: '2026-04-01',
        status: 'healthy',
        description: 'Enclosed UV-C sterilizer shield.',
        filterMaterial: 'Quartz glass UV-C emitter',
        captures: ['Pathogens', 'Bacteria']
      }
    ],
    history24h: [
      { time: '00:00', indoorAqi: 15, outdoorAqi: 48, pm25: 5, pm10: 11, co2: 440, tvoc: 32, temperature: 21.8, humidity: 50 },
      { time: '04:00', indoorAqi: 14, outdoorAqi: 42, pm25: 4, pm10: 10, co2: 430, tvoc: 30, temperature: 21.7, humidity: 51 },
      { time: '08:00', indoorAqi: 18, outdoorAqi: 62, pm25: 7, pm10: 13, co2: 480, tvoc: 38, temperature: 22.0, humidity: 50 },
      { time: '12:00', indoorAqi: 17, outdoorAqi: 65, pm25: 6, pm10: 12, co2: 470, tvoc: 36, temperature: 22.2, humidity: 49 },
      { time: '16:00', indoorAqi: 16, outdoorAqi: 64, pm25: 6, pm10: 12, co2: 460, tvoc: 35, temperature: 22.1, humidity: 50 },
      { time: '20:00', indoorAqi: 16, outdoorAqi: 60, pm25: 6, pm10: 12, co2: 460, tvoc: 35, temperature: 22.0, humidity: 50 }
    ],
    history7d: [
      { time: 'Mon', indoorAqi: 15, outdoorAqi: 54, pm25: 5, pm10: 11, co2: 450, tvoc: 33, temperature: 21.9, humidity: 50 },
      { time: 'Tue', indoorAqi: 17, outdoorAqi: 66, pm25: 7, pm10: 13, co2: 470, tvoc: 37, temperature: 22.1, humidity: 49 },
      { time: 'Wed', indoorAqi: 16, outdoorAqi: 58, pm25: 6, pm10: 12, co2: 460, tvoc: 34, temperature: 22.0, humidity: 50 },
      { time: 'Thu', indoorAqi: 18, outdoorAqi: 74, pm25: 7, pm10: 14, co2: 480, tvoc: 39, temperature: 22.2, humidity: 49 },
      { time: 'Fri', indoorAqi: 16, outdoorAqi: 62, pm25: 6, pm10: 12, co2: 465, tvoc: 35, temperature: 22.0, humidity: 50 },
      { time: 'Sat', indoorAqi: 14, outdoorAqi: 50, pm25: 4, pm10: 10, co2: 440, tvoc: 30, temperature: 21.8, humidity: 51 },
      { time: 'Sun', indoorAqi: 16, outdoorAqi: 56, pm25: 6, pm10: 12, co2: 460, tvoc: 35, temperature: 22.0, humidity: 50 }
    ],
    history30d: [
      { time: 'W1', indoorAqi: 15, outdoorAqi: 58, pm25: 5, pm10: 11, co2: 450, tvoc: 33, temperature: 21.9, humidity: 50 },
      { time: 'W2', indoorAqi: 16, outdoorAqi: 64, pm25: 6, pm10: 12, co2: 460, tvoc: 35, temperature: 22.0, humidity: 50 },
      { time: 'W3', indoorAqi: 18, outdoorAqi: 72, pm25: 7, pm10: 14, co2: 475, tvoc: 38, temperature: 22.2, humidity: 49 },
      { time: 'W4', indoorAqi: 16, outdoorAqi: 56, pm25: 6, pm10: 12, co2: 460, tvoc: 35, temperature: 22.0, humidity: 50 }
    ]
  }
];

export const INITIAL_SCHEDULES: SmartSchedule[] = [
  {
    id: 'sched-sleep',
    title: 'Night Sleep Mode',
    description: 'Dims LED indicators, limits fan to quiet level 1, keeps bedroom air clean and quiet.',
    mode: 'sleep',
    fanLevel: 1,
    startTime: '23:00',
    endTime: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    enabled: true,
    roomIds: ['master-bedroom', 'nursery']
  },
  {
    id: 'sched-eco-work',
    title: 'Workday Eco Circulation',
    description: 'Maintains optimal low-power airflow while conserving filter life during work hours.',
    mode: 'eco',
    fanLevel: 2,
    startTime: '09:00',
    endTime: '17:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    enabled: true,
    roomIds: ['living-room', 'home-office']
  },
  {
    id: 'sched-turbo-sat',
    title: 'Weekend Deep Refresh',
    description: 'High-speed 360° air exchange to flush lingering particles and indoor dust.',
    mode: 'turbo',
    fanLevel: 5,
    startTime: '10:00',
    endTime: '10:30',
    days: ['Sat'],
    enabled: true,
    roomIds: ['living-room', 'master-bedroom', 'home-office']
  },
  {
    id: 'sched-allergy-morning',
    title: 'Morning Allergy Shield',
    description: 'Increases electrostatic ionizer and H13 filtration during morning pollen peak hours.',
    mode: 'allergen',
    fanLevel: 4,
    startTime: '06:00',
    endTime: '08:30',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    enabled: false,
    roomIds: ['living-room', 'master-bedroom']
  }
];

export const INITIAL_ALERTS: AirAlert[] = [
  {
    id: 'alert-1',
    roomId: 'living-room',
    roomName: 'Living Room',
    severity: 'info',
    title: 'Air Quality Nominal',
    message: 'Indoor particulate levels are pristine. Auto mode is maintaining eco-quiet airflow.',
    timestamp: '12 min ago',
    read: false,
    resolved: false,
    actionLabel: 'Keep Auto',
    actionType: 'auto'
  },
  {
    id: 'alert-2',
    roomId: 'home-office',
    roomName: 'Home Office',
    severity: 'warning',
    title: 'Carbon Filter Inspection Due',
    message: 'Activated carbon filter is at 54% capacity. Estimated 55 days remaining before replacement is required.',
    timestamp: '2 hours ago',
    read: false,
    resolved: false,
    actionLabel: 'View Filter Details',
    actionType: 'filter'
  },
  {
    id: 'alert-3',
    roomId: 'home-office',
    roomName: 'Home Office',
    severity: 'info',
    title: 'CO₂ Elevation Observed',
    message: 'CO₂ reached 612 ppm due to continuous room occupancy. Airflow automatically adjusted.',
    timestamp: '3 hours ago',
    read: true,
    resolved: true
  }
];

export const INITIAL_SETTINGS: UserSettings = {
  theme: 'light',
  tempUnit: 'celsius',
  simulationSpeed: 'realtime',
  simulationScenario: 'normal',
  autoOptimizeSensitivity: 'balanced',
  alertThresholdPm25: 35,
  chimeSound: true,
  ledBrightness: 80
};
