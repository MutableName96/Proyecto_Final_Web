<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HATGAP - FOR THE FEW, NOT THE MANY</title>
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/index.css" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>
  <header class="header">
    <nav class="nav">
      <div class="nav__logo">
        <a href="index.php" class="nav__logo"><img src="assets/images/Logos-HatGap/logo-0D0D0D.png"
            style="width: 30px; height: auto;" alt=""></a>
        <p>HATGAP</p>
      </div>

      <ul class="nav__list">
        <li class="nav__items nav__has-submenu">
          <a class="nav__links" href="index.php">Colecciones</a>
          <ul class="submenu">
            <li><a href="sombreros.html">Sombreros Clásicos</a></li>
            <li><a href="sombreros.html">Sombreros de Alta Costura</a></li>
            <li><a href="sombreros.html">Sombreros Unisex</a></li>
          </ul>
        </li>
        <li class="nav__items">
          <a class="nav__links" href="pages/productos.html">Hombres</a>
        </li>
        <li class="nav__items">
          <a class="nav__links" href="pages/productos.html">Mujeres</a>
        </li>
        <li class="nav__items">
          <a class="nav__links" href="pages/productos.html">Unisex</a>
        </li>
        <li class="nav__items">
          <a class="nav__links" href="pages/productos.html">Accesorios</a>
        </li>
      </ul>

      <ul class="nav__list">
        <li class="nav__items search-wrapper">
          <input type="text" class="search-bar" placeholder="Buscar...">
          <a class="nav__links search-toggle" href="#"><i data-lucide="search"></i></a>
        </li>
      
        <li class="nav__items"><a class="nav__links" href="profile.html">ES | MXN($)</a></li>
        <?php if (isset($_SESSION['usuario_nombre'])): ?>
          <li class="nav__items"><a class="nav__links" href="pages/profile.html"><?php echo htmlspecialchars($_SESSION['usuario_nombre']); ?></a></li>
          <li class="nav__items"><a class="nav__links" href="pages/logout.php"><i data-lucide="log-out"></i></a></li>
        <?php else: ?>
          <li class="nav__items"><a class="nav__links" href="pages/login.html"><i data-lucide="user"></i></a></li>
        <?php endif; ?>
        <li class="nav__items"><a class="nav__links" href="pages/carrito.html"><i data-lucide="shopping-cart"></i></a></li>
      </ul>
      
      

    </nav>
  </header>

  <div class="carousel">
    <div class="carousel-inner">
      <div class="carousel-item">
        <div class="carousel-text">
          <h2>ICONS ONLY</h2>
          <p>
            Hechos a mano en México desde 1865, nuestros legendarios sombreros continúan
            establecer el estándar de la artesanía y la auténtica herencia occidental.
          </p>
          <button>Comprar ahora</button>
        </div>
        <div class="carousel-image" style="background-image: url('assets/images/western.png')"></div>
      </div>
      <div class="carousel-item">
        <div class="carousel-text">
          <h2>PREMIUM QUALITY</h2>
          <p>
            Experimente los mejores materiales y artesanía en cada sombrero que
            hacer. Cada sombrero es único y hecho a mano.
          </p>
          <button>Comprar ahora</button>
        </div>
        <div class="carousel-image" style="background-image: url('assets/images/carrusel\ 1.webp')"></div>
      </div>
    </div>
    <button class="carousel-btn prev" onclick="prevSlide()">&#10094;</button>
    <button class="carousel-btn next" onclick="nextSlide()">&#10095;</button>
    <div class="indicators">
      <span class="indicator" onclick="showSlide(0)"></span>
      <span class="indicator" onclick="showSlide(1)"></span>
    </div>
  </div>




  <div class="text-Hatgap">Ver todos los productos de HatGap</div>
  <div class="typeProducts">
    
    
    <a href="" class="cardProducts">
      <img src="assets/images/modelo 1.webp" alt="">
      <h2>Sombrero Fedora Elegance</h2>
      <p>Desde $1799</p>
    </a>
    
    <a href="" class="cardProducts">
      <img src="assets/images/sombrero 2.png" alt="">
      <h2>Sombrero Trilby de Lujo</h2>
      <p>Desde $1699</p>
    </a>
    
    <a href="" class="cardProducts">
      <img src="assets/images/sombrero 1.png" alt="">
      <h2>Sombrero Panamá Clásico</h2>
      <p>Desde $2499</p>
    </a>
    
    <a href="" class="cardProducts">
      <img src="assets/images/modelo 4.webp" alt="">
      <h2>Sombrero Homburg Royal</h2>
      <p>Desde $2199</p>
    </a>
    
    <a href="" class="cardProducts">
      <img src="assets/images/modelo 5.webp" alt="">
      <h2>Sombrero Boater Supremo</h2>
      <p>Desde $1899</p>
    </a>
    
    <a href="" class="cardProducts">
      <img src="assets/images/modelo 6.webp" alt="">
      <h2>Sombrero Western Heritage</h2>
      <p>Desde $1999</p>
    </a>
    
  </div>




















  

  <div class="categories">
    <h2>Sombreros mas populares</h2>
    <div class="cards">

      <div class="circle-card">
        <img src="assets/images/sombrero 1.png" alt="Sombrero Cowboy" />
        <div class="card-info">
          <h3>Sombrero Cowboy</h3>
          <p>$499 MXN</p>
        </div>
      </div>
      
      <div class="circle-card">
        <img src="assets/images/sombrero 2.png" alt="Sombrero Tejano" />
        <div class="card-info">
          <h3>Sombrero Tejano</h3>
          <p>$549 MXN</p>
        </div>
      </div>
      
      <div class="circle-card">
        <img src="assets/images/sombrero 3.png" alt="Sombrero Vaquero Negro" />
        <div class="card-info">
          <h3>Vaquero Negro</h3>
          <p>$599 MXN</p>
        </div>
      </div>
      
      <div class="circle-card">
        <img src="assets/images/sombrero 4.png" alt="Sombrero Clásico" />
        <div class="card-info">
          <h3>Sombrero Clásico</h3>
          <p>$459 MXN</p>
        </div>
      </div>
      
      <div class="circle-card">
        <img src="assets/images/sombrero 5.png" alt="Sombrero Ranchero" />
        <div class="card-info">
          <h3>Sombrero Ranchero</h3>
          <p>$529 MXN</p>
        </div>
      </div>
      
      
    </div>
  </div>

  <section class="gallery">
    <h2>Galería de Sombreros</h2>
    <div class="gallery-grid">
      <div class="gallery-item large">
        <img src="assets/images/modelo 1.webp" alt="Sombrero Elegante 1">
      </div>
      <div class="gallery-item medium">
        <img src="assets/images/modelo 2.webp" alt="Sombrero Elegante 2">
      </div>
      <div class="gallery-item medium">
        <img src="assets/images/modelo 3.webp" alt="Sombrero Elegante 3">
      </div>
      <div class="gallery-item medim">
        <img src="assets/images/modelo 4.webp" alt="Sombrero Elegante 4">
      </div>
      <div class="gallery-item large">
        <img src="assets/images/modelo 6.webp" alt="Sombrero Elegante 5">
      </div>
      <div class="gallery-item medium">
        <img src="assets/images/modelo 5.webp" alt="Sombrero Elegante 5">
      </div>

    </div>
  </section>


  <div class="about-us">
    <div class="about-section">
      <div class="text">
        <h2>Calidad y Estilo</h2>
        <p>Descubre nuestra selección de sombreros confeccionados con los materiales más finos. Cada diseño está pensado para realzar tu presencia y destacar con elegancia en cualquier ocasión.</p>
        <p>En HatGap creemos que el estilo no es solo una elección, sino una afirmación. Desde el primer vistazo hasta el último detalle, nuestros sombreros están hechos para impresionar.</p>
      </div>
      <div class="image">
        <img src="assets/images/modelo 5.webp" alt="Sombrero elegante" />
      </div>
    </div>
    
    <div class="about-section">
      <div class="text">
        <h2>Hecho para durar</h2>
        <p>Nuestros productos no son solo moda, son inversión. Utilizamos acabados de alta resistencia y técnicas de confección tradicionales que garantizan una larga vida útil sin perder su encanto.</p>
        <p>¿Buscas algo que te acompañe temporada tras temporada? En HatGap, la durabilidad y el diseño atemporal se encuentran en cada costura.</p>
      </div>
      <div class="image">
        <img src="assets/images/gray-hat.png" alt="Sombrero de calidad" />
      </div>
    </div>
    
    <div class="about-section">
      <div class="text">
        <h2>Diseño exclusivo</h2>
        <p>Inspirados en las pasarelas más refinadas y las calles más icónicas, nuestros diseños fusionan lo clásico con lo contemporáneo. Cada sombrero es una obra única, hecha para quienes no se conforman.</p>
        <p>Explora modelos que no encontrarás en ningún otro lugar. Porque en HatGap, la exclusividad es parte de nuestro ADN.</p>
      </div>
      <div class="image">
        <img src="assets/images/modelo 2.webp" alt="Sombrero exclusivo" />
      </div>
    </div>
    
    <div class="about-section">
      <div class="text">
        <h2>Pasión por los detalles</h2>
        <p>Desde la elección del hilo hasta la curvatura del ala, cada detalle importa. Nuestros artesanos cuidan cada etapa del proceso con un compromiso absoluto con la excelencia.</p>
        <p>Es ese cuidado lo que transforma un sombrero común en una pieza con carácter, ideal para quienes saben que el lujo está en lo que no se ve a simple vista.</p>
      </div>
      <div class="image">
        <img src="assets/images/modelo 3.webp" alt="Detalle sombrero" />
      </div>
    </div>
    
  
  </div>


  <section class="testimonials">
    <h2>Lo que dicen nuestros clientes</h2>
    
    <div class="testimonials-container">
        <!-- Comentario 1 -->
        <div class="testimonial-card">
            <div class="client-info">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Cliente" class="client-img">
                <div>
                    <div class="client-name">María González</div>
                    <div class="stars">★★★★★</div>
                </div>
            </div>
            <p class="testimonial-text">
                Excelente servicio! El producto llegó antes de lo esperado y superó mis expectativas. Definitivamente volveré a comprar aquí.
            </p>
            <div class="date">15 de Enero, 2023</div>
        </div>
        
        <!-- Comentario 2 -->
        <div class="testimonial-card">
            <div class="client-info">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Cliente" class="client-img">
                <div>
                    <div class="client-name">Carlos Martínez</div>
                    <div class="stars">★★★★☆</div>
                </div>
            </div>
            <p class="testimonial-text">
                Buena calidad de productos, aunque el envío tardó un poco más de lo esperado. El servicio al cliente fue muy atento.
            </p>
            <div class="date">3 de Marzo, 2023</div>
        </div>
        
        <!-- Comentario 3 -->
        <div class="testimonial-card">
            <div class="client-info">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Cliente" class="client-img">
                <div>
                    <div class="client-name">Laura Fernández</div>
                    <div class="stars">★★★★★</div>
                </div>
            </div>
            <p class="testimonial-text">
                Increíble experiencia de compra. Desde la navegación en el sitio web hasta la entrega del paquete, todo fue perfecto. 100% recomendado.
            </p>
            <div class="date">22 de Abril, 2023</div>
        </div>
        
        <!-- Comentario 4 -->
        <div class="testimonial-card">
            <div class="client-info">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Cliente" class="client-img">
                <div>
                    <div class="client-name">Jorge Rodríguez</div>
                    <div class="stars">★★★☆☆</div>
                </div>
            </div>
            <p class="testimonial-text">
                El producto es bueno, pero tuve un problema con el tamaño. El proceso de devolución fue sencillo aunque tomó su tiempo.
            </p>
            <div class="date">10 de Mayo, 2023</div>
        </div>

        <div class="testimonial-card">
          <div class="client-info">
              <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Cliente" class="client-img">
              <div>
                  <div class="client-name">María González</div>
                  <div class="stars">★★★★★</div>
              </div>
          </div>
          <p class="testimonial-text">
              Excelente servicio! El producto llegó antes de lo esperado y superó mis expectativas. Definitivamente volveré a comprar aquí.
          </p>
          <div class="date">15 de Enero, 2023</div>
      </div>

      <div class="testimonial-card">
        <div class="client-info">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Cliente" class="client-img">
            <div>
                <div class="client-name">Carlos Martínez</div>
                <div class="stars">☆☆☆☆☆</div>
            </div>
        </div>
        <p class="testimonial-text">
            Una porqueria no me quisieron rembolsar el dinero de un sombrero que por usarlo
        </p>
        <div class="date">3 de Marzo, 2025</div>
    </div>


    </div>
</section>
  
  
  

  <div class="footer">
    <div class="footer-columns">
      <div class="footer-column">
        <h3>SHOP</h3>
        <ul>
          <li><a href="#">New Arrivals</a></li>
          <li><a href="#">Collections</a></li>
          <li><a href="#">Accessories</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>SUPPORT</h3>
        <ul>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Returns</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>INFO</h3>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Career</a></li>
          <li><a href="#">Sustainability</a></li>
        </ul>
      </div>
    </div>
    <p>&copy; 2024 HatGap - All Rights Reserved</p>
  </div>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
    });
  </script>

  <script src="js/index.js"></script>
  <script src="js/navegacionMenu.js"></script>
  <script src="js/barraBusqueda.js"></script>

  <div class="chat-widget">
    <button id="chat-toggle" class="chat-toggle">
      <i data-lucide="message-circle"></i>
    </button>
    <div class="chat-container">
      <div class="chat-header">
        <h3>Asistente de Sombreros</h3>
        <button class="close-chat">×</button>
      </div>
      <div id="chat-messages" class="chat-messages"></div>
      <div class="chat-input-container">
        <input type="text" id="chat-input" placeholder="Escribe tu respuesta...">
        <button id="send-button">
          <i data-lucide="send"></i>
        </button>
      </div>
    </div>
  </div>

  <script src="js/chatbot.js"></script>
</body>

</html>