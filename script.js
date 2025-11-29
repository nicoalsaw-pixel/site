// --- CONFIGURAÇÕES ---
const TYPING_TEXT = "vindalfar"; 
const TYPING_SPEED = 150; 
const TYPING_DELAY = 1500; 

// script.js
// Mude de const API_URL = '/views.php'; para:
const API_URL = 'https://backend-65c0.onrender.com/api/views'; // Durante o desenvolvimento
// OU para a URL de produção do seu backend

// Função para iniciar o efeito de digitação
function startTypingEffect(elementId, text) {
    const element = document.getElementById(elementId);
    let i = 0;
    if (!element) return;
    element.textContent = ''; // Limpa o texto inicial

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, TYPING_SPEED);
        } else {
            // Delay antes de parar o efeito (se necessário)
            // setTimeout(() => {}, TYPING_DELAY); 
        }
    }
    type();
}

// Lógica de manipulação do modal
const albumCover = document.getElementById('album-cover');
const albumModal = document.getElementById('album-modal');
const modalImage = document.getElementById('modal-image');

if(albumCover && albumModal && modalImage) {
    albumCover.addEventListener('click', () => {
        modalImage.src = albumCover.src;
        albumModal.classList.add('modal-show');
    });

    albumModal.addEventListener('click', (e) => {
        // Fecha o modal se o clique não for na imagem
        if (e.target !== modalImage) {
            albumModal.classList.remove('modal-show');
        }
    });
}


// --- LÓGICA DO CONTADOR DE VISUALIZAÇÕES ---

async function updateViewCounter() {
    // URL completa da API (garantindo que esteja correta)
    const API_URL = 'https://backend-65c0.onrender.com/api/views'; 

    try {
        // 1. Geração de Timestamp para Cache-Busting
        const timestamp = new Date().getTime();
        
        // 2. Chamada à API
        const response = await fetch(`${API_URL}?t=${timestamp}`); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 3. Processamento da Resposta
        const data = await response.json();
        
        // 4. Atualização da UI
        const viewsNumberElement = document.getElementById('views-number');
        if (viewsNumberElement && data && data.views !== undefined) {
            viewsNumberElement.textContent = data.views;
        }

    } catch (error) {
        console.error("Erro ao buscar contador de visualizações:", error);
        // Em caso de erro, define um fallback (opcional)
        const viewsNumberElement = document.getElementById('views-number');
        if (viewsNumberElement) {
            viewsNumberElement.textContent = '???';
        }
    }
}


// --- LÓGICA DO PLAYER DE MÚSICA MINIMALISTA ---

function setupMusicPlayer() {
    const audio = document.getElementById('audio-source');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationTimeDisplay = document.getElementById('duration-time');

    if (!audio || !playPauseBtn || !playPauseIcon || !progressBar || !currentTimeDisplay || !durationTimeDisplay) {
        console.error("Um ou mais elementos do player de música não foram encontrados.");
        return;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Inicializa a barra de progresso e duração quando o áudio carregar
    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = audio.duration;
        durationTimeDisplay.textContent = formatTime(audio.duration);
    });

    // Toggle Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // Atualiza o ícone de Play/Pause
    audio.addEventListener('play', () => {
        playPauseIcon.src = 'pause.png';
        playPauseIcon.alt = 'Pause';
    });
    audio.addEventListener('pause', () => {
        playPauseIcon.src = 'play.png';
        playPauseIcon.alt = 'Play';
    });

    // Atualiza o progresso e o tempo
    audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    // Manipula a barra de progresso
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });
}


// --- EFEITO DE FAIRY DUST (Poeira de Fada) ---

function setupFairyDustEffect() {
    const body = document.body;

    body.addEventListener('mousemove', (e) => {
        // Cria um novo elemento de partícula
        const dust = document.createElement('div');
        dust.className = 'fairy-dust-particle';
        
        // Define o tamanho aleatório (2px a 4px)
        const size = Math.random() * 2 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        // Define a posição inicial no cursor
        dust.style.left = `${e.clientX}px`;
        dust.style.top = `${e.clientY}px`;
        
        // Define o tempo de vida da animação (0.5s a 1s)
        const duration = Math.random() * 0.5 + 0.5;
        dust.style.animationDuration = `${duration}s`;

        body.appendChild(dust);

        // Remove a partícula após a animação
        setTimeout(() => {
            dust.remove();
        }, duration * 1000); 
    });
}


// --- FUNÇÃO PARA APLICAR EFEITO 3D NO MOUSE ---

function apply3DEffect(element) {
    if (!element) return; 

    // Valores máximos de rotação e translação para o efeito
    const MAX_ROTATION_X = 5; // Rotação máxima em X (vertical)
    const MAX_ROTATION_Y = 10; // Rotação máxima em Y (horizontal)
    const MAX_TRANSLATE_Z = 20; // Movimento máximo para frente (ilusão de 3D)

    element.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();

        // Calcula a posição do mouse em relação ao centro do elemento (-1 a 1)
        const xAxis = (clientX - (left + width / 2)) / (width / 2); 
        const yAxis = (clientY - (top + height / 2)) / (height / 2); 

        // Calcula as rotações (quanto mais longe do centro, maior a rotação)
        const rotateX = -yAxis * MAX_ROTATION_X; // Inverte o eixo Y para rotação natural
        const rotateY = xAxis * MAX_ROTATION_Y;

        // Calcula o movimento Z (quanto mais perto do centro, mais para frente)
        const proximity = (1 - (Math.abs(xAxis) + Math.abs(yAxis)) / 2);
        const translateZ = MAX_TRANSLATE_Z * proximity;

        // Aplica as transformações CSS
        element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(${translateZ}px)
        `;
    });

    element.addEventListener('mouseleave', () => {
        // Reseta as transformações quando o mouse sai do elemento
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
}


// --- LÓGICA DO CURSOR DE SNOWFLAKE (Oculta ao sair da janela) ---

function setupCursorToggle() {
    const body = document.body;
    // Oculta o cursor personalizado ao sair da janela
    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget && !e.toElement) {
            body.style.cursor = 'default';
        }
    });

    // Restaura o cursor personalizado ao retornar à janela
    document.addEventListener('mouseover', (e) => {
        if (body.style.cursor === 'default') {
            body.style.cursor = "url('Snowflake.cur'), default";
        }
    });
}


// --- INICIALIZAÇÃO GERAL ---

function startProfileEffects() {
    startTypingEffect('typed-text', TYPING_TEXT);
}

document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    // Função de interação única para iniciar tudo
    function handleInteractionOnce() {
        document.removeEventListener('keydown', handleInteractionOnce);
        document.removeEventListener('click', handleInteractionOnce);

        introScreen.style.opacity = 0;

        setTimeout(() => {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            startProfileEffects();
            
            const audio = document.getElementById('audio-source');
            const playPauseIcon = document.getElementById('play-pause-icon');

            if (audio) {
                audio.play().catch(error => {
                    console.warn("Autoplay bloqueado pelo navegador. Usuário deve clicar em Play.", error);
                    // Falha no autoplay: Seta o ícone de PLAY
                    if(playPauseIcon) {
                        playPauseIcon.src = 'play.png';
                        playPauseIcon.alt = 'Play';
                    }
                });
                
                // Sucesso no autoplay: Seta o ícone de PAUSE
                if(playPauseIcon) {
                    playPauseIcon.src = 'pause.png'; 
                    playPauseIcon.alt = 'Pause';
                }
            }
            
        }, 500); 
        
        updateViewCounter();
    }
    
    // Adiciona o listener para iniciar o site (clique ou tecla)
    document.addEventListener('keydown', handleInteractionOnce);
    document.addEventListener('click', handleInteractionOnce);

    document.getElementById('views-number').textContent = '...'; 
    
    setupMusicPlayer();
    
    setupFairyDustEffect();
    
    setupCursorToggle(); 

    // === NOVO: APLICAR EFEITO 3D ===
    const profileContainer = document.querySelector('.profile-container');
    const musicPlayerMinimalist = document.getElementById('music-player-minimalist');
    
    apply3DEffect(profileContainer);
    apply3DEffect(musicPlayerMinimalist);
    // ===============================
});