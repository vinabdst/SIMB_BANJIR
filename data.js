// Initialize Map - Center Indonesia
let map;
let floodLayer;
let sheltersLayer;
let reportsLayer;
let searchMarker;
let currentLocationMarker;

// Data banjir seluruh Indonesia (sample data)
const floodData = [
    // Jakarta
    {
        id: 1,
        location: "Jakarta Selatan",
        city: "Jakarta",
        province: "DKI Jakarta",
        coordinates: [-6.3016, 106.8440],
        floodLevel: "high",
        depth: 85,
        status: "Awas",
        lastUpdate: "10 menit lalu",
        reports: 15
    },
    {
        id: 2,
        location: "Kemang, Jakarta",
        city: "Jakarta",
        province: "DKI Jakarta", 
        coordinates: [-6.2645, 106.8234],
        floodLevel: "medium",
        depth: 45,
        status: "Siaga",
        lastUpdate: "30 menit lalu",
        reports: 8
    },

    // Bandung
    {
        id: 3,
        location: "Dayeuhkolot, Bandung",
        city: "Bandung",
        province: "Jawa Barat",
        coordinates: [-6.9842, 107.6306],
        floodLevel: "critical",
        depth: 150,
        status: "Bahaya",
        lastUpdate: "15 menit lalu",
        reports: 32
    },
    {
        id: 4, 
        location: "Bojongsoang, Bandung",
        city: "Bandung",
        province: "Jawa Barat",
        coordinates: [-6.9667, 107.6333],
        floodLevel: "high",
        depth: 95,
        status: "Awas", 
        lastUpdate: "1 jam lalu",
        reports: 18
    },

    // Surabaya
    {
        id: 5,
        location: "Wonokromo, Surabaya",
        city: "Surabaya",
        province: "Jawa Timur",
        coordinates: [-7.2972, 112.7364],
        floodLevel: "medium",
        depth: 55,
        status: "Siaga",
        lastUpdate: "2 jam lalu", 
        reports: 12
    },

    // Semarang
    {
        id: 6,
        location: "Tembalang, Semarang",
        city: "Semarang", 
        province: "Jawa Tengah",
        coordinates: [-7.0500, 110.4381],
        floodLevel: "high",
        depth: 80,
        status: "Awas",
        lastUpdate: "45 menit lalu",
        reports: 22
    },

    // Medan
    {
        id: 7,
        location: "Medan Belawan",
        city: "Medan",
        province: "Sumatera Utara",
        coordinates: [3.7750, 98.6831],
        floodLevel: "low",
        depth: 25,
        status: "Waspada",
        lastUpdate: "3 jam lalu",
        reports: 7
    },

    // Bali
    {
        id: 8,
        location: "Denpasar Selatan",
        city: "Denpasar",
        province: "Bali",
        coordinates: [-8.6705, 115.2126],
        floodLevel: "medium", 
        depth: 40,
        status: "Siaga",
        lastUpdate: "1 jam lalu",
        reports: 9
    },

    // Makassar
    {
        id: 9,
        location: "Biringkanaya, Makassar",
        city: "Makassar",
        province: "Sulawesi Selatan", 
        coordinates: [-5.1473, 119.4324],
        floodLevel: "low",
        depth: 20,
        status: "Waspada",
        lastUpdate: "4 jam lalu",
        reports: 5
    }
];

// Data posko evakuasi seluruh Indonesia
const sheltersData = [
    {
        id: 1,
        name: "Posko Kebayoran Baru",
        city: "Jakarta",
        coordinates: [-6.2432, 106.7997],
        capacity: 150,
        currentOccupants: 85,
        contact: "021-7654321"
    },
    {
        id: 2,
        name: "Shelter Dayeuhkolot",
        city: "Bandung", 
        coordinates: [-6.9842, 107.6306],
        capacity: 200,
        currentOccupants: 120,
        contact: "022-1234567"
    },
    {
        id: 3,
        name: "Posko Wonokromo",
        city: "Surabaya",
        coordinates: [-7.2972, 112.7364],
        capacity: 180,
        currentOccupants: 95,
        contact: "031-7654321"
    },
    {
        id: 4,
        name: "Shelter Tembalang",
        city: "Semarang",
        coordinates: [-7.0500, 110.4381],
        capacity: 120,
        currentOccupants: 65,
        contact: "024-1234567"
    }
];

// Laporan terbaru dari warga
const recentReports = [
    {
        id: 1,
        location: "Kemang, Jakarta",
        time: "5 menit lalu",
        description: "Air mulai naik hingga 50cm",
        status: "active"
    },
    {
        id: 2,
        location: "Dayeuhkolot, Bandung",
        time: "12 menit lalu",
        description: "Banjir semakin parah, evakuasi diperlukan",
        status: "critical"
    },
    {
        id: 3,
        location: "Tembalang, Semarang",
        time: "25 menit lalu",
        description: "Air mulai surut perlahan",
        status: "improving"
    },
    {
        id: 4,
        location: "Wonokromo, Surabaya",
        time: "40 menit lalu",
        description: "Jalan utama terendam air",
        status: "active"
    }
];

function initMap() {
    // Center map on Indonesia
    const indonesiaCenter = [-2.5489, 118.0149];
    
    // Initialize map with wider view
    map = L.map('map').setView(indonesiaCenter, 5);

    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Initialize layers
    initLayers();
    
    // Load all data
    loadFloodData();
    loadShelters();
    loadLiveReports();
    loadWeatherData();
}

function initLayers() {
    floodLayer = L.layerGroup().addTo(map);
    sheltersLayer = L.layerGroup().addTo(map);
    reportsLayer = L.layerGroup().addTo(map);
}

function loadFloodData() {
    floodLayer.clearLayers();
    
    floodData.forEach(area => {
        const color = getColorByFloodLevel(area.floodLevel);
        const radius = getRadiusBySeverity(area.floodLevel);
        
        const circle = L.circle(area.coordinates, {
            color: color,
            fillColor: color,
            fillOpacity: 0.4,
            radius: radius
        }).addTo(floodLayer);
        
        // Popup info dengan detail lengkap
        circle.bindPopup(`
            <div class="flood-popup">
                <h6>${area.location}</h6>
                <p><i class="fas fa-city"></i> ${area.city}, ${area.province}</p>
                <p><strong>Status:</strong> <span class="badge bg-${getStatusColor(area.floodLevel)}">${area.status}</span></p>
                <p><strong>Tinggi Air:</strong> ${area.depth} cm</p>
                <p><strong>Update:</strong> ${area.lastUpdate}</p>
                <p><strong>Laporan Warga:</strong> ${area.reports}</p>
                <div class="mt-2">
                    <button class="btn btn-sm btn-primary" onclick="zoomToLocation([${area.coordinates}])">
                        <i class="fas fa-search-location"></i> Zoom
                    </button>
                    <button class="btn btn-sm btn-success" onclick="showAreaReports(${area.id})">
                        <i class="fas fa-list"></i> Lihat Laporan
                    </button>
                </div>
            </div>
        `);
        
        // Tooltip
        circle.bindTooltip(`
            <strong>${area.location}</strong><br>
            ${area.status} - ${area.depth}cm
        `);
    });
}

function loadShelters() {
    sheltersLayer.clearLayers();
    
    sheltersData.forEach(shelter => {
        const icon = L.divIcon({
            html: `<div style="background: #28a745; color: white; padding: 8px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-home"></i></div>`,
            className: 'shelter-marker-container',
            iconSize: [30, 30]
        });
        
        const marker = L.marker(shelter.coordinates, { icon: icon }).addTo(sheltersLayer);
        
        marker.bindPopup(`
            <div class="shelter-popup">
                <h6>${shelter.name}</h6>
                <p><i class="fas fa-city"></i> ${shelter.city}</p>
                <p><i class="fas fa-users"></i> ${shelter.currentOccupants}/${shelter.capacity} orang</p>
                <p><i class="fas fa-phone"></i> ${shelter.contact}</p>
                <button class="btn btn-sm btn-primary mt-1" onclick="zoomToLocation([${shelter.coordinates}])">
                    <i class="fas fa-directions"></i> Petunjuk Arah
                </button>
            </div>
        `);
    });
}

function loadLiveReports() {
    const reportsContainer = document.getElementById('liveReports');
    reportsContainer.innerHTML = '';
    
    recentReports.forEach(report => {
        const statusIcon = report.status === 'critical' ? 'fas fa-exclamation-triangle text-danger' : 
                          report.status === 'improving' ? 'fas fa-arrow-down text-success' : 
                          'fas fa-exclamation-circle text-warning';
        
        const reportElement = document.createElement('div');
        reportElement.className = 'list-group-item';
        reportElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1"><i class="${statusIcon}"></i> ${report.location}</h6>
                <small>${report.time}</small>
            </div>
            <p class="mb-1">${report.description}</p>
        `;
        reportsContainer.appendChild(reportElement);
    });
}

function loadWeatherData() {
    const weatherContainer = document.getElementById('weatherInfo');
    
    // Simulasi data cuaca
    const weatherData = [
        { city: 'Jakarta', temp: '28°C', condition: 'Hujan Lebat', icon: 'cloud-rain' },
        { city: 'Bandung', temp: '26°C', condition: 'Hujan Sedang', icon: 'cloud-rain' },
        { city: 'Surabaya', temp: '30°C', condition: 'Berawan', icon: 'cloud' },
        { city: 'Medan', temp: '29°C', condition: 'Cerah', icon: 'sun' }
    ];
    
    let weatherHTML = '';
    weatherData.forEach(weather => {
        weatherHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <i class="fas fa-${weather.icon}"></i>
                    <strong>${weather.city}</strong>
                </div>
                <div>
                    <span>${weather.temp}</span><br>
                    <small class="text-muted">${weather.condition}</small>
                </div>
            </div>
        `;
    });
    
    weatherContainer.innerHTML = weatherHTML;
}

// 🔍 **FITUR PENCARIAN DAERAH**
function searchLocation() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        alert('Masukkan nama daerah yang ingin dicari');
        return;
    }
    
    // Clear previous search marker
    if (searchMarker) {
        map.removeLayer(searchMarker);
    }
    
    // Coordinates for major Indonesian cities
    const cityCoordinates = {
        'jakarta': [-6.2088, 106.8456],
        'bandung': [-6.9175, 107.6191],
        'surabaya': [-7.2504, 112.7688],
        'medan': [3.5952, 98.6722],
        'semarang': [-6.9667, 110.4167],
        'yogyakarta': [-7.7956, 110.3695],
        'denpasar': [-8.6705, 115.2126],
        'makassar': [-5.1473, 119.4324],
        'palembang': [-2.9761, 104.7759],
        'balikpapan': [-1.2379, 116.8529],
        'manado': [1.4748, 124.8421],
        'jayapura': [-2.5333, 140.7167]
    };
    
    const normalizedSearch = searchTerm.toLowerCase();
    let foundCoords = null;
    
    // Cari di predefined cities
    for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (normalizedSearch.includes(city) || city.includes(normalizedSearch)) {
            foundCoords = coords;
            break;
        }
    }
    
    // Jika tidak ditemukan di predefined, coba geocoding
    if (!foundCoords) {
        // Simple geocoding menggunakan Nominatim (OpenStreetMap)
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm + ', Indonesia')}&limit=1`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                    zoomToSearchResult(coords, searchTerm);
                } else {
                    alert('Daerah tidak ditemukan. Coba dengan nama kota yang lebih spesifik.');
                }
            })
            .catch(error => {
                console.error('Geocoding error:', error);
                alert('Error mencari lokasi. Coba lagi.');
            });
    } else {
        zoomToSearchResult(foundCoords, searchTerm);
    }
}

function zoomToSearchResult(coords, searchTerm) {
    // Zoom ke lokasi
    map.setView(coords, 12);
    
    // Add marker untuk hasil pencarian
    searchMarker = L.marker(coords)
        .addTo(map)
        .bindPopup(`
            <div class="text-center">
                <h6><i class="fas fa-map-marker-alt"></i> ${searchTerm}</h6>
                <p>Lokasi yang Anda cari</p>
                <button class="btn btn-sm btn-primary" onclick="findFloodNearby([${coords}])">
                    <i class="fas fa-water"></i> Cek Banjir Terdekat
                </button>
            </div>
        `)
        .openPopup();
}

// 📍 **FITUR LOKASI SAYA**
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung oleh browser Anda');
        return;
    }
    
    // Show loading
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendeteksi...';
    btn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const coords = [position.coords.latitude, position.coords.longitude];
            
            // Clear previous current location marker
            if (currentLocationMarker) {
                map.removeLayer(currentLocationMarker);
            }
            
            // Add current location marker
            currentLocationMarker = L.marker(coords, {
                icon: L.divIcon({
                    html: '<div style="background: #007bff; color: white; padding: 8px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-crosshairs"></i></div>',
                    className: 'current-location-marker-container',
                    iconSize: [30, 30]
                })
            }).addTo(map);
            
            currentLocationMarker.bindPopup(`
                <div class="text-center">
                    <h6><i class="fas fa-crosshairs"></i> Lokasi Anda Sekarang</h6>
                    <p>Lat: ${coords[0].toFixed(4)}<br>Lng: ${coords[1].toFixed(4)}</p>
                    <button class="btn btn-sm btn-primary" onclick="findFloodNearby([${coords}])">
                        <i class="fas fa-water"></i> Cek Banjir Terdekat
                    </button>
                </div>
            `).openPopup();
            
            // Zoom to current location
            map.setView(coords, 13);
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
        },
        (error) => {
            alert('Tidak dapat mengakses lokasi Anda. Pastikan GPS aktif dan izin lokasi diberikan.');
            console.error('Geolocation error:', error);
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    );
}

// 🔍 **CEK BANJIR TERDEKAT**
function findFloodNearby(coords) {
    const nearbyFloods = floodData.filter(area => {
        const distance = getDistance(coords, area.coordinates);
        return distance < 50; // Dalam kilometer
    });
    
    if (nearbyFloods.length > 0) {
        let message = `Ditemukan ${nearbyFloods.length} area banjir terdekat:\n\n`;
        nearbyFloods.forEach(flood => {
            const distance = getDistance(coords, flood.coordinates).toFixed(1);
            message += `• ${flood.location} (${distance} km)\n`;
            message += `  Status: ${flood.status}, Tinggi: ${flood.depth}cm\n\n`;
        });
        
        alert(message);
    } else {
        alert('Tidak ada laporan banjir di sekitar lokasi Anda.');
    }
}

// 🎯 **FITUR ZOOM KE LOKASI**
function zoomToLocation(coords) {
    map.setView(coords, 14);
}

function showAreaReports(areaId) {
    const area = floodData.find(a => a.id === areaId);
    if (area) {
        alert(`Laporan untuk ${area.location}:\n\nTotal ${area.reports} laporan warga.\nStatus: ${area.status}\nTinggi Air: ${area.depth}cm`);
    }
}

// 🔄 **TOGGLE LAYERS**
function toggleLayer(layerType) {
    switch(layerType) {
        case 'flood':
            if (document.getElementById('showFlood').checked) {
                map.addLayer(floodLayer);
            } else {
                map.removeLayer(floodLayer);
            }
            break;
        case 'shelters':
            if (document.getElementById('showShelters').checked) {
                map.addLayer(sheltersLayer);
            } else {
                map.removeLayer(sheltersLayer);
            }
            break;
        case 'reports':
            if (document.getElementById('showReports').checked) {
                // Implement reports layer jika ada
                alert('Layer laporan warga akan ditampilkan');
            } else {
                // Hide reports layer
            }
            break;
    }
}

// 📊 **FILTER BERDASARKAN STATUS**
function filterByStatus(status) {
    if (status === 'all') {
        loadFloodData();
    } else {
        const filteredData = floodData.filter(area => area.floodLevel === status);
        
        floodLayer.clearLayers();
        filteredData.forEach(area => {
            const color = getColorByFloodLevel(area.floodLevel);
            const radius = getRadiusBySeverity(area.floodLevel);
            
            L.circle(area.coordinates, {
                color: color,
                fillColor: color,
                fillOpacity: 0.4,
                radius: radius
            }).addTo(floodLayer)
            .bindPopup(`<strong>${area.location}</strong><br>${area.status} - ${area.depth}cm`);
        });
    }
}

// 📍 **HELPER FUNCTIONS**
function getDistance(coord1, coord2) {
    const R = 6371; // Earth radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getColorByFloodLevel(level) {
    const colors = {
        'low': '#ffeb3b',
        'medium': '#ff9800', 
        'high': '#f44336',
        'critical': '#8b0000'
    };
    return colors[level] || '#ffeb3b';
}

function getRadiusBySeverity(level) {
    const radii = {
        'low': 800,
        'medium': 1200,
        'high': 1800,
        'critical': 2500
    };
    return radii[level] || 800;
}

function getStatusColor(level) {
    const colors = {
        'low': 'warning',
        'medium': 'warning',
        'high': 'danger',
        'critical': 'dark'
    };
    return colors[level] || 'secondary';
}

// 🔄 **REFRESH DATA**
function refreshMap() {
    const refreshBtn = document.querySelector('.btn-warning');
    const originalHtml = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        loadFloodData();
        loadShelters();
        loadLiveReports();
        loadWeatherData();
        
        refreshBtn.innerHTML = originalHtml;
        refreshBtn.disabled = false;
        
        alert('Data peta seluruh Indonesia berhasil diperbarui!');
    }, 1500);
}

function reportFlood() {
    alert('Fitur lapor banjir akan segera tersedia. Untuk saat ini, hubungi BPBD setempat.');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initMap);