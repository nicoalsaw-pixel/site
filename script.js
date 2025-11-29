// --- CONFIGURAÇÕES ---
const TYPING_TEXT = "vindalfar"; 
const TYPING_SPEED = 150; 
const TYPING_DELAY = 1500; 

// script.js
const API_URL = 'https://backend-65c0.onrender.com/api/views'; 

// Função para iniciar o efeito de digitação
function startTypingEffect(elementId, text) {
    const element = document.getElementById(elementId);
    let i = 0;
    if (!element) return;
    element.textContent = ''; 

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, TYPING_SPEED);
        } else {
            // Delay antes de parar o efeito (se necessário)
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
        if (e.target !== modalImage) {
            albumModal.classList.remove('modal-show');
        }
    });
}


// --- LÓGICA DO CONTADOR DE VISUALIZAÇÕES ---

async function updateViewCounter() {
    const API_URL = 'https://backend-65c0.onrender.com/api/views'; 

    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`${API_URL}?t=${timestamp}`); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const viewsNumberElement = document.getElementById('views-number');
        if (viewsNumberElement && data && data.views !== undefined) {
            viewsNumberElement.textContent = data.views;
        }

    } catch (error) {
        console.error("Erro ao buscar contador de visualizações:", error);
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

    audio.addEventListener('loadedmetadata', () => {
        progressBar.max = audio.duration;
        durationTimeDisplay.textContent = formatTime(audio.duration);
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => {
        playPauseIcon.src = 'pause.png';
        playPauseIcon.alt = 'Pause';
    });
    audio.addEventListener('pause', () => {
        playPauseIcon.src = 'play.png';
        playPauseIcon.alt = 'Play';
    });

    audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });
}


// --- EFEITO DE FAIRY DUST (Poeira de Fada) ---

function setupFairyDustEffect() {
    const body = document.body;

    body.addEventListener('mousemove', (e) => {
        const dust = document.createElement('div');
        dust.className = 'fairy-dust-particle';
        
        const size = Math.random() * 2 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        dust.style.left = `${e.clientX}px`;
        dust.style.top = `${e.clientY}px`;
        
        const duration = Math.random() * 0.5 + 0.5;
        dust.style.animationDuration = `${duration}s`;

        body.appendChild(dust);

        setTimeout(() => {
            dust.remove();
        }, duration * 1000); 
    });
}


// --- FUNÇÃO PARA APLICAR EFEITO 3D NO MOUSE ---

// A função foi mantida, mas agora só será chamada para o contêiner principal.
function apply3DEffect(element, rotationX, rotationY, translateZ) {
    if (!element) return; 

    // Use os valores fornecidos ou os padrões
    const MAX_ROTATION_X = rotationX !== undefined ? rotationX : 5; 
    const MAX_ROTATION_Y = rotationY !== undefined ? rotationY : 10; 
    const MAX_TRANSLATE_Z = translateZ !== undefined ? translateZ : 20; 

    element.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();

        const xAxis = (clientX - (left + width / 2)) / (width / 2); 
        const yAxis = (clientY - (top + height / 2)) / (height / 2); 

        const rotateX = -yAxis * MAX_ROTATION_X; 
        const rotateY = xAxis * MAX_ROTATION_Y;

        const proximity = Math.min(1, Math.max(0.5, (1 - (Math.abs(xAxis) + Math.abs(yAxis)) / 2)));
        const translateZ = MAX_TRANSLATE_Z * proximity;

        element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(${translateZ}px)
        `;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transition = 'transform 0.2s ease-out'; 
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        
        setTimeout(() => {
            element.style.transition = 'transform 0.1s ease-out'; 
        }, 200); 
    });
}


// --- LÓGICA DO CURSOR DE SNOWFLAKE (Oculta ao sair da janela) ---

function setupCursorToggle() {
    const body = document.body;
    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget && !e.toElement) {
            body.style.cursor = 'default';
        }
    });

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
    const introText = document.querySelector('.intro-text'); 

    // Faz o 'HI' aparecer suavemente
    setTimeout(() => {
        if (introText) {
            introText.style.opacity = 1; 
        }
    }, 100); 

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
                    if(playPauseIcon) {
                        playPauseIcon.src = 'play.png';
                        playPauseIcon.alt = 'Play';
                    }
                });
                
                if(playPauseIcon) {
                    playPauseIcon.src = 'pause.png'; 
                    playPauseIcon.alt = 'Pause';
                }
            }
            
        }, 500); 
        
        updateViewCounter();
    }
    
    document.addEventListener('keydown', handleInteractionOnce);
    document.addEventListener('click', handleInteractionOnce);

    document.getElementById('views-number').textContent = '...'; 
    
    setupMusicPlayer();
    
    setupFairyDustEffect();
    
    setupCursorToggle(); 

    const profileContainer = document.querySelector('.profile-container');
    
    // === APLICANDO EFEITO 3D APENAS NO CONTÊINER PRINCIPAL ===
    // O Player de Música é um filho, então ele se move junto e o efeito 3D não é aplicado duas vezes.
    apply3DEffect(profileContainer); 
});