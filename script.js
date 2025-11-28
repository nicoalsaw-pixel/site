// --- CONFIGURAÇÕES ---
const TYPING_TEXT = "vindalfar"; 
const TYPING_SPEED = 150; 
const TYPING_DELAY = 1500; 

// script.js
// Mude de const API_URL = '/views.php'; para:
const API_URL = 'https://backend-65c0.onrender.com/api/views'; // Durante o desenvolvimento
// OU para a URL de produção do seu backend

// ... (o restante do seu código JavaScript permanece o mesmo)


// --- LÓGICA DO CONTADOR DE VISUALIZAÇÕES ---
// script.js (Dentro da função updateViewCounter)

// script.js (Dentro da função updateViewCounter)

// script.js - FUNÇÃO updateViewCounter() CORRIGIDA

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
        
        // 🚨 4. CORREÇÃO PRINCIPAL: Busca o ID correto do HTML (views-number)
        const viewCountElement = document.getElementById('views-number');
        
        if (viewCountElement) {
            // Atualiza o conteúdo do elemento com o número de visualizações
            viewCountElement.textContent = data.views; 
        } else {
            console.error("Elemento HTML com ID 'views-number' não encontrado.");
        }

        // 5. Log para Debug
        console.log(data.message); 

    } catch (error) {
        console.error("Erro ao atualizar o contador de visualizações:", error);
        
        // Se a API falhar, mostra "Erro"
        const viewCountElement = document.getElementById('views-number');
        if (viewCountElement) {
            viewCountElement.textContent = 'Erro';
        }
    }
}
// ... (resto do código)

// --- EFEITO DE DIGITAÇÃO ---
function startProfileEffects() {
    const typedTextElement = document.getElementById('typed-text');
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < TYPING_TEXT.length) {
            typedTextElement.textContent += TYPING_TEXT.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, TYPING_SPEED);
        } else {
            setTimeout(() => {
                typedTextElement.textContent = ""; 
                charIndex = 0; 
                typeEffect();
            }, TYPING_DELAY);
        }
    }

    typeEffect();
}

// --- LÓGICA DO PLAYER DE MÚSICA ---
function setupMusicPlayer() {
    const audio = document.getElementById('audio-source');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon'); 
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationTimeDisplay = document.getElementById('duration-time');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');


    if (!audio || !playPauseBtn || !playPauseIcon) return;

    // Função para formatar o tempo em MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // 1. Configuração de Volume
    audio.volume = 0.5;

    // 2. Evento de Play/Pause (Alterna entre pause.png e play.png)
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            // Troca para o ícone de PAUSE
            playPauseIcon.src = 'pause.png'; 
            playPauseIcon.alt = 'Pause';
        } else {
            audio.pause();
            // Troca para o ícone de PLAY (Você deve ter um 'play.png')
            playPauseIcon.src = 'stop.png'; 
            playPauseIcon.alt = 'Play';
        }
    });

    // 3. Controle de Progresso e Tempo
    if (progressBar) {
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = isNaN(progress) ? 0 : progress; 
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('loadedmetadata', () => {
            durationTimeDisplay.textContent = formatTime(audio.duration);
            progressBar.max = 100;
        });

        progressBar.addEventListener('input', () => {
            const newTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });
    }
    
    // 4. Reset ao Final
    audio.addEventListener('ended', () => {
        // Volta para o ícone de PLAY
        playPauseIcon.src = 'play.png';
        playPauseIcon.alt = 'Play';
        if (progressBar) progressBar.value = 0;
        if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
    });
    
    // 5. Placeholders para Prev/Next
    if (prevBtn) prevBtn.addEventListener('click', () => console.log('Música anterior...'));
    if (nextBtn) nextBtn.addEventListener('click', () => console.log('Próxima música...'));
}


// --- EFEITO FAIRY DUST (POLES DE FADA) ---
function setupFairyDustEffect() {
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.classList.add('fairy-dust-particle');
        document.body.appendChild(particle);

        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        const size = Math.random() * 5 + 5; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    });
}

// --- CONTROLE DE CURSOR ---
function setupCursorToggle() {
    const customCursor = `url('Snowflake.cur'), default`; 
    document.body.style.cursor = customCursor;
}


// --- EFEITO DE INTRODUÇÃO E EXIBIÇÃO DO CONTEÚDO (MAIN) ---
document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const introText = introScreen.querySelector('.intro-text');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        introText.style.opacity = 1;
    }, 500); 

    document.addEventListener('keydown', handleInteractionOnce);
    document.addEventListener('click', handleInteractionOnce); 

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
    
    document.getElementById('views-number').textContent = '...'; 
    
    setupMusicPlayer();
    
    setupFairyDustEffect();
    
    setupCursorToggle(); 
});