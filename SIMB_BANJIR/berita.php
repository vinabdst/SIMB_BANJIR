<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Berita Banjir - SIAOA BANJIR</title>
    <link rel="stylesheet" href="berita.css">
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
                        <li><a href="berita.php" class="active">Berita</a></li>
                        <li><a href="data.php">Data</a></li>
                        <li><a href="mitigasi.php">Mitigasi</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section Berita -->
    <section class="hero-berita">
        <div class="hero-berita-content">
            <h1>Artikel Banjir</h1>
            <p>Informasi terkini tentang kejadian banjir dan penanggulangannya</p>
        </div>
    </section>

    <!-- Main Content Berita -->
    <section class="main-berita">
        <div class="container">
            <!-- Filter Berita -->
            <div class="berita-filter">
                <button class="filter-btn active">Semua</button>
                <button class="filter-btn">Banjir Bandang</button>
                <button class="filter-btn">Banjir Sungai</button>
                <button class="filter-btn">Banjir Rob</button>
                <button class="filter-btn">Mitigasi</button>
            </div>

            <!-- Grid Berita -->
            <div class="berita-grid">
                <!-- Berita 1 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1582213782119-d41d0753b663?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Banjir Jakarta">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">15 Maret 2023</div>
                        <h3 class="berita-title">Banjir Jakarta: Dampak dan Upaya Penanggulangan</h3>
                        <p class="berita-excerpt">Banjir besar melanda beberapa wilayah Jakarta setelah hujan deras selama 6 jam berturut-turut. Ribuan warga mengungsi dan aktivitas ekonomi terhambat.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
                
                <!-- Berita 2 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1599058917765-92d1a5c3be17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Banjir Bandang">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">10 Maret 2023</div>
                        <h3 class="berita-title">Banjir Bandang Terjang Desa di Lereng Gunung</h3>
                        <p class="berita-excerpt">Banjir bandang menghanyutkan puluhan rumah di desa terpencil akibat hujan dengan intensitas tinggi di daerah hulu sungai.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
                
                <!-- Berita 3 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Banjir Rob">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">5 Maret 2023</div>
                        <h3 class="berita-title">Banjir Rob Semakin Parah di Pesisir Utara Jawa</h3>
                        <p class="berita-excerpt">Permukaan air laut yang terus naik menyebabkan banjir rob semakin sering dan meluas di wilayah pesisir, merusak infrastruktur dan tambak.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
                
                <!-- Berita 4 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1583324114696-2d83b4bbc646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Mitigasi Banjir">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">28 Februari 2023</div>
                        <h3 class="berita-title">Program Normalisasi Sungai untuk Mitigasi Banjir</h3>
                        <p class="berita-excerpt">Pemerintah meluncurkan program normalisasi sungai di 15 kota besar untuk mengurangi risiko banjir di musim penghujan.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
                
                <!-- Berita 5 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1613091580360-3588e7f240a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Sistem Peringatan Dini">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">20 Februari 2023</div>
                        <h3 class="berita-title">Sistem Peringatan Dini Banjir Diperkuat</h3>
                        <p class="berita-excerpt">BMKG memperkuat sistem peringatan dini banjir dengan teknologi terbaru untuk memberikan informasi lebih akurat dan cepat.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
                
                <!-- Berita 6 -->
                <div class="berita-card">
                    <div class="berita-image">
                        <img src="https://images.unsplash.com/photo-1578589335617-67d84d1b24b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Relawan Banjir">
                    </div>
                    <div class="berita-content">
                        <div class="berita-date">15 Februari 2023</div>
                        <h3 class="berita-title">Relawan Banjir: Pahlawan di Tengah Bencana</h3>
                        <p class="berita-excerpt">Kisah inspiratif para relawan yang membantu korban banjir tanpa kenal lelah, memberikan bantuan dan harapan di tengah kesulitan.</p>
                        <a href="#" class="read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="pagination">
                <a href="#" class="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">Next →</a>
            </div>
        </div>
    </section>

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
                    <h3>Kontak</h3>
                    <p>Email: info@siagabanjir.go.id</p>
                    <p>Telepon: (021) 1234-5678</p>
                    <p>Alamat: Jl. Mitigasi Bencana No. 123, Jakarta</p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 SIAGA BANJIR - Sistem Informasi Banjir Terintegrasi. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // JavaScript untuk interaksi halaman berita
        document.addEventListener('DOMContentLoaded', function() {
            // Filter berita
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Hapus kelas active dari semua tombol
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Tambah kelas active ke tombol yang diklik
                    this.classList.add('active');
                    
                    // Di sini bisa ditambahkan logika untuk memfilter berita
                    const filter = this.textContent;
                    console.log(`Filter berita: ${filter}`);
                });
            });
            
            // Animasi card berita saat scroll
            const beritaCards = document.querySelectorAll('.berita-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            beritaCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s, transform 0.5s';
                observer.observe(card);
            });
            
            // Simulasi loading berita
            const loadMoreBtn = document.querySelector('.load-more');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Fitur load more berita akan dikembangkan lebih lanjut.');
                });
            }
        });
    </script>
</body>
</html>