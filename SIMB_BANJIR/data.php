<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Banjir - SIAGA BANJIR</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <!-- Custom CSS -->
    <link rel="stylesheet" href="data.css">
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">SIAGA BANJIR</div>
                <nav>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="berita.php">Berita</a></li>
                        <li><a href="data.php" class="active">Data</a></li>
                        <li><a href="mitigasi.php">Mitigasi</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <br>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h1><i class="fas fa-map-marked-alt me-3"></i>Peta Daerah Rawan Banjir</h1>
                    <p class="mb-0">Pantau perkembangan banjir dan daerah terdampak terkini di seluruh Indonesia</p>
                </div>
                <div class="col-md-4 text-md-end header-actions">
                    <div class="btn-group">
                        <button class="btn btn-warning me-2" onclick="refreshMap()">
                            <i class="fas fa-sync-alt me-2"></i>Refresh Data
                        </button>
                        <button class="btn btn-danger" onclick="reportFlood()">
                            <i class="fas fa-plus me-2"></i>Lapor Banjir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <div class="container mt-4">
        <!-- Search Box -->
        <div class="search-box">
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <div class="input-group">
                        <input type="text" id="searchInput" class="form-control form-control-lg" 
                            placeholder="Cari daerah atau kota... (contoh: Jakarta, Bandung, Surabaya)">
                        <button class="btn btn-primary" onclick="searchLocation()">
                            <i class="fas fa-search"></i> Cari
                        </button>
                        <button class="btn btn-outline-secondary" onclick="getCurrentLocation()">
                            <i class="fas fa-location-arrow"></i> Lokasi Saya
                        </button>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted">
                            <i class="fas fa-info-circle"></i> 
                            Contoh: "Jakarta", "Bandung", "Surabaya", "Medan", "Bali", dll.
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-9">
                <!-- Map Container -->
                <div class="card">
                    <div class="card-body p-0">
                        <div class="map-container">
                            <div id="map"></div>
                            
                            <!-- Map Controls -->
                            <div class="map-controls">
                                <h6><i class="fas fa-filter"></i> Filter Peta</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="showFlood" checked 
                                           onchange="toggleLayer('flood')">
                                    <label class="form-check-label" for="showFlood">
                                        Daerah Banjir
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="showShelters" checked
                                           onchange="toggleLayer('shelters')">
                                    <label class="form-check-label" for="showShelters">
                                        Posko Evakuasi
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="showReports"
                                           onchange="toggleLayer('reports')">
                                    <label class="form-check-label" for="showReports">
                                        Laporan Warga
                                    </label>
                                </div>
                                <hr>
                                <h6>Status Banjir</h6>
                                <select class="form-select" id="statusFilter" onchange="filterByStatus(this.value)">
                                    <option value="all">Semua Status</option>
                                    <option value="low">Rendah (10-30cm)</option>
                                    <option value="medium">Sedang (30-70cm)</option>
                                    <option value="high">Tinggi (>70cm)</option>
                                    <option value="critical">Kritis</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3">
                <!-- Legend -->
                <div class="legend mb-4">
                    <h6><i class="fas fa-info-circle"></i> Legenda Peta</h6>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #ffeb3b;"></div>
                        <span>Waspada (10-30cm)</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #ff9800;"></div>
                        <span>Siaga (30-70cm)</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #f44336;"></div>
                        <span>Awas (>70cm)</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #8b0000;"></div>
                        <span>Bahaya</span>
                    </div>
                    <div class="legend-item">
                        <i class="fas fa-home text-primary"></i>
                        <span class="ms-2">Posko Evakuasi</span>
                    </div>
                    <div class="legend-item">
                        <i class="fas fa-user-friends text-success"></i>
                        <span class="ms-2">Laporan Warga</span>
                    </div>
                </div>

                <!-- Live Reports -->
                <div class="card">
                    <div class="card-header bg-warning">
                        <h6 class="mb-0"><i class="fas fa-clock"></i> Laporan Terbaru</h6>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush" id="liveReports">
                            <div class="list-group-item">
                                <small class="text-muted">Memuat laporan...</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Weather Info -->
                <div class="card mt-4">
                    <div class="card-header bg-info text-white">
                        <h6 class="mb-0"><i class="fas fa-cloud-rain"></i> Info Cuaca</h6>
                    </div>
                    <div class="card-body">
                        <div id="weatherInfo">
                            <small class="text-muted">Memuat data cuaca...</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Tentang SIAGA BANJIR</h3>
                    <p>Sistem Informasi Banjir Terintegrasi yang menyediakan informasi lengkap tentang banjir, jenis-jenisnya, dampak, dan upaya mitigasi.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Menu Utama</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="berita.php">Berita</a></li>
                        <li><a href="data.php">Data</a></li>
                        <li><a href="mitigasi.php">Mitigasi</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Kontak Darurat</h3>
                    <p><i class="fas fa-phone"></i> BPBD: 112</p>
                    <p><i class="fas fa-ambulance"></i> Ambulance: 119</p>
                    <p><i class="fas fa-fire"></i> Pemadam: 113</p>
                    <p>Email: info@siagabanjir.go.id</p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 SIAGA BANJIR - Sistem Informasi Banjir Terintegrasi. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <!-- Custom JavaScript -->
    <script src="data.js"></script>
</body>
</html>