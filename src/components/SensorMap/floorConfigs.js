import floor3Map from "./map-floor-3.svg"
import floor10Map from "./map-floor-10.svg"

const config = {
    3: {
        dimX: 32,
        dimY: 14,
        map: floor3Map
    },
    10: {
        dimX: 24,
        dimY: 16,
        map: floor10Map,
    }
}

const defaultConfig = {
    ...config[3]
}

export function getFloorConfig(floor) {
    return config[floor] || defaultConfig
}