class SombreroChatbot {
    constructor() {
        this.preguntas = {
            estilo: "¿Qué estilo de sombrero buscas? (Clásico, Casual, Elegante, Western)",
            ocasion: "¿Para qué ocasión lo necesitas? (Formal, Casual, Evento especial)",
            color: "¿Tienes alguna preferencia de color?",
            presupuesto: "¿Cuál es tu presupuesto aproximado? (Menos de $1000, $1000-$2000, Más de $2000)"
        };
        
        this.respuestas = [];
        this.productos = [
            {
                nombre: "Sombrero Fedora Elegance",
                estilo: "Elegante",
                ocasion: "Formal",
                color: ["Negro", "Gris", "Beige"],
                precio: 1799,
                imagen: "/assets/images/modelo 1.webp"
            },
            {
                nombre: "Sombrero Trilby de Lujo",
                estilo: "Casual",
                ocasion: "Casual",
                color: ["Marrón", "Negro", "Azul"],
                precio: 1699,
                imagen: "/assets/images/modelo 2.webp"
            },
            {
                nombre: "Sombrero Panamá Clásico",
                estilo: "Clásico",
                ocasion: "Casual",
                color: ["Beige", "Blanco"],
                precio: 2499,
                imagen: "/assets/images/modelo 3.webp"
            },
            {
                nombre: "Sombrero Western Heritage",
                estilo: "Western",
                ocasion: "Casual",
                color: ["Marrón", "Negro"],
                precio: 1999,
                imagen: "/assets/images/modelo 6.webp"
            }
        ];

        // Inicializar el chat
        this.initializeChat();
    }

    initializeChat() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatContainer = document.querySelector('.chat-container');
        const closeChat = document.querySelector('.close-chat');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');

        // Función para abrir el chat
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.add('active');
            if (this.respuestas.length === 0) {
                this.iniciarChat();
            }
        });

        // Función para cerrar el chat
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });

        // Función para enviar mensaje
        const enviarMensaje = () => {
            const mensaje = chatInput.value.trim();
            if (mensaje) {
                this.procesarRespuesta(mensaje);
                chatInput.value = '';
            }
        };

        // Evento para el botón de enviar
        sendButton.addEventListener('click', enviarMensaje);

        // Evento para la tecla Enter
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });
    }

    iniciarChat() {
        this.respuestas = [];
        this.mostrarPregunta('estilo');
    }

    mostrarPregunta(tipo) {
        const chatContainer = document.getElementById('chat-messages');
        const pregunta = document.createElement('div');
        pregunta.className = 'chat-message bot';
        pregunta.innerHTML = `<p>${this.preguntas[tipo]}</p>`;
        chatContainer.appendChild(pregunta);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    procesarRespuesta(respuesta) {
        this.respuestas.push(respuesta);
        const chatContainer = document.getElementById('chat-messages');
        const mensaje = document.createElement('div');
        mensaje.className = 'chat-message user';
        mensaje.innerHTML = `<p>${respuesta}</p>`;
        chatContainer.appendChild(mensaje);

        const tiposPreguntas = Object.keys(this.preguntas);
        const preguntaActual = tiposPreguntas[this.respuestas.length - 1];
        const siguientePregunta = tiposPreguntas[this.respuestas.length];

        if (siguientePregunta) {
            setTimeout(() => this.mostrarPregunta(siguientePregunta), 500);
        } else {
            this.recomendarSombreros();
        }
    }

    recomendarSombreros() {
        const recomendaciones = this.filtrarProductos();
        const chatContainer = document.getElementById('chat-messages');
        const mensaje = document.createElement('div');
        mensaje.className = 'chat-message bot';
        
        if (recomendaciones.length > 0) {
            let html = '<p>Basado en tus preferencias, te recomiendo:</p><div class="recomendaciones">';
            recomendaciones.forEach(prod => {
                html += `
                    <div class="recomendacion-item">
                        <img src="${prod.imagen}" alt="${prod.nombre}">
                        <h3>${prod.nombre}</h3>
                        <p>$${prod.precio}</p>
                    </div>
                `;
            });
            html += '</div>';
            mensaje.innerHTML = html;
        } else {
            mensaje.innerHTML = '<p>Lo siento, no encontré sombreros que coincidan exactamente con tus preferencias. ¿Te gustaría intentar con otras características?</p>';
        }
        
        chatContainer.appendChild(mensaje);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    filtrarProductos() {
        return this.productos.filter(prod => {
            const [estilo, ocasion, color, presupuesto] = this.respuestas;
            const rangoPrecio = this.obtenerRangoPrecio(presupuesto);
            
            return (
                prod.estilo.toLowerCase().includes(estilo.toLowerCase()) &&
                prod.ocasion.toLowerCase().includes(ocasion.toLowerCase()) &&
                prod.color.some(c => c.toLowerCase().includes(color.toLowerCase())) &&
                prod.precio >= rangoPrecio.min && prod.precio <= rangoPrecio.max
            );
        });
    }

    obtenerRangoPrecio(presupuesto) {
        switch(presupuesto.toLowerCase()) {
            case 'menos de $1000':
                return { min: 0, max: 1000 };
            case '$1000-$2000':
                return { min: 1000, max: 2000 };
            case 'más de $2000':
                return { min: 2000, max: 10000 };
            default:
                return { min: 0, max: 10000 };
        }
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new SombreroChatbot();
}); 