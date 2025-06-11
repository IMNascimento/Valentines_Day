document.querySelector('.container').style.display = 'none';
const audio = document.getElementById('bg-music');
if(audio) audio.pause();

document.getElementById('start-btn').addEventListener('click', function() {
    // Toca música (se existir)
    if(audio) {
      audio.volume = 1;
      audio.play();
    }
    // Esconde o modal
    document.getElementById('start-modal').style.display = 'none';
    // Mostra o conteúdo e inicia animação
    document.querySelector('.container').style.display = '';
    // Agora sim inicia o fetch e as animações
    fetch('customize.json')
      .then(res => res.json())
      .then(data => renderValentine(data));
});

// Carregar JSON e montar tudo
fetch('customize.json')
  .then(res => res.json())
  .then(data => renderValentine(data));

function renderValentine(data) {
  const c = document.querySelector('.container');
  c.innerHTML = `
    <div class="one">
      <h1 class="one">
        Oi <span id="name">${data.name}</span>
      </h1>
      <p class="two" id="greetingText">${data.greetingText}</p>
    </div>
    <div class="three">
      <p>${data.valentineText}</p>
    </div>
    <div class="four">
      <div class="text-box">
        <p class="hbd-chatbox">${data.hbdText}</p>
        <p class="fake-btn">Send</p>
      </div>
    </div>
    <div class="five">
      <p class="idea-1">${data.idea1}</p>
      <p class="idea-2">${data.idea2}</p>
      <p class="idea-3">${data.idea3}</p>
      <p class="idea-4">${data.idea4}</p>
      <p class="idea-5">${data.idea5}</p>
      <p class="idea-6">${data.idea6.map(letter => `<span>${letter}</span>`).join('')}</p>
    </div>
    <div class="six">
      <img src="${data.imagePath}" alt="" class="girl-dp" id="imagePath" width="300" height="300" />
      <div class="wish">
        <h3 class="wish-hbd">${data.wishHbd}</h3>
        <h5 id="wishText">${data.wishText}</h5>
      </div>
    </div>
    <div class="seven">
      <div class="baloons">
        ${data.baloons.map(src => `<img src="${src}" alt="" />`).join('\n')}
      </div>
    </div>
    <div class="eight">
      ${data.svgColors.map(color => `
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="${color}" />
        </svg>
      `).join('')}
    </div>
    <div class="nine">
      <p>${data.nine1}</p>
      <p>${data.nine2}</p>
      <p class="last-smile">${data.nine3}</p>
    </div>
  `;

  // Importante: só roda depois que o HTML foi montado
  animationTimeline();
}

// Função para animar cada sessão da timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(165, 248, 127)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      10.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.8
    )
    .from(
      ".girl-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    )
    .call(() => setTimeout(showUniverseSessions, 700)); // NOVO: chama sessões do universo
};

// --------------------------
// NOVAS SESSÕES DO UNIVERSO!
// --------------------------
const universeSessions = [
  {
    title: "Você é o meu universo!",
    message: "Em meio a bilhões de galáxias, nenhuma é tão especial quanto você."
  },
  {
    title: "Seu brilho",
    message: "Olho para o céu e vejo milhões de estrelas, mas em cada uma delas, vejo um reflexo do seu brilho."
  },
  {
    title: "Observo o céu e vejo milhões de estrelas, mas você...",
    message: "você é a única que brilha de verdade no meu universo. Nenhuma delas se compara ao seu brilho único."
  },
   {
    title: "Mais uma noite estrelada",
    message: "Cada estrela no céu me lembra um motivo para te amar."
  },
  {
    title: "Minha constelação preferida",
    message: "Entre tantas luzes, você é a que mais brilha no meu coração."
  },
  { title: "Todos podem dar presentes, flores...",
    message: "mas poucos poderiam te dar isso meu amor! 💖"
  },
  {
    title: "Rosas morrem, chocolates acabam...",
    message: "Mas isso aqui vai ficar para você enquanto eu viver e a rede de internet existir!"
 },
 {    
    title: "E para finalizar... Vou te dizer uma coisa...",
    message: "Será que se eu assinar disney+ essa princesa vem junto haha? 😘"
 } 
];

let isTyping = false;


function showUniverseSessions() {
  document.querySelector('.bg-space-bg').style.display = 'block';
  document.getElementById('star-field').style.display = 'block';
  const overlay = document.getElementById('universe-overlay');
  const titleEl = document.getElementById('universe-title');
  const msgEl = document.getElementById('universe-message');
  let idx = 0;

  function typeWriter(element, text, speed = 32, cb) {
    // Impede animação dupla
    if (isTyping) return;
    isTyping = true;
    element.textContent = "";
    const chars = Array.from(text);
    let i = 0;
    function type() {
      if (i < chars.length) {
        element.textContent += chars[i];
        i++;
        setTimeout(type, speed);
      } else if (cb) {
        isTyping = false;
        setTimeout(cb, 1300);
      } else {
        isTyping = false;
      }
    }
    type();
  }

  function showNextSession() {
    // Impede sessões sobrepostas
    if (isTyping) return;

    document.querySelector('.bg-space-bg').style.display = 'block';
    document.getElementById('star-field').style.display = 'block';

    // Quando termina as sessões, some tudo!
    if (idx >= universeSessions.length) {
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.querySelector('.bg-space-bg').style.display = 'none';
        document.getElementById('star-field').style.display = 'none';
        startHeartMemoryGame(function() {
            showFinalModals();
            });
        //showFinalModals();
      }, 800);
      return;
    }

    overlay.style.display = 'flex';
    overlay.classList.remove('hide');
    titleEl.textContent = "";
    msgEl.textContent = "";

    // Anima o título e a mensagem
    typeWriter(titleEl, universeSessions[idx].title, 27, () => {
      typeWriter(msgEl, universeSessions[idx].message, 32, () => {
        setTimeout(() => {
          idx++;
          showNextSession();
        }, 1700);
      });
    });
  }

  showNextSession();
}

function showFinalModals() {
  document.querySelector('.bg-space-bg').style.display = 'block';
  document.getElementById('star-field').style.display = 'block';
  const modalConvite = document.getElementById('modal-convite');
  const modalNaoContinua = document.getElementById('modal-nao-continua');
  const modalPedido = document.getElementById('modal-pedido-casamento');

  // 1. Mostra convite para sábado
  modalConvite.style.display = 'flex';

  document.getElementById('btn-sim-sabado').onclick = function() {
    modalConvite.style.display = 'none';
    setTimeout(() => {
      modalPedido.style.display = 'flex';
    }, 250);
  };

  document.getElementById('btn-nao-sabado').onclick = function() {
    modalConvite.style.display = 'none';
    setTimeout(() => {
      modalNaoContinua.style.display = 'flex';
    }, 250);
  };

  document.getElementById('btn-voltar-inicio').onclick = function() {
    modalNaoContinua.style.display = 'none';
    // Recarrega tudo (pode dar replay)
    location.reload();
  };

  document.getElementById('btn-sim-vida').onclick = function() {
    modalPedido.style.display = 'none';
    // Abra o link do WhatsApp (edite para seu número/mensagem)
    window.open("https://wa.me/553288967108?text=Aceito%20viver%20para%20sempre%20com%20você%20%F0%9F%98%8D%F0%9F%92%8C", "_blank");
  };

  document.getElementById('btn-nao-vida').onclick = function() {
    modalPedido.style.display = 'none';
    // Volta pro início/replay
    location.reload();
  };
}

let moveCount = 0;
const btnNaoVida = document.getElementById('btn-nao-vida');
const modalContent = btnNaoVida.parentElement;

function isMobile() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 640;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveBtnNaoVida() {
  // Limites do botão dentro do modal
  const modalRect = modalContent.getBoundingClientRect();
  const btnRect = btnNaoVida.getBoundingClientRect();
  const maxX = modalRect.width - btnRect.width - 10;
  const maxY = modalRect.height - btnRect.height - 10;
  const randX = getRandomInt(0, maxX);
  const randY = getRandomInt(0, maxY);

  btnNaoVida.style.position = "absolute";
  btnNaoVida.style.left = randX + "px";
  btnNaoVida.style.top = randY + "px";
  btnNaoVida.style.right = "auto";
  btnNaoVida.style.bottom = "auto";
  moveCount++;
  if (moveCount > 10) {
    btnNaoVida.innerText = "Desiste vai 😂";
  }
}

// --- DESKTOP: foge ao passar o mouse ---
btnNaoVida.addEventListener('mouseenter', function() {
  if (!isMobile() && moveCount <= 10) {
    moveBtnNaoVida();
  }
});

// --- MOBILE: foge ao clicar até 10 vezes, depois permite fechar ---
btnNaoVida.addEventListener('click', function(e) {
  if (isMobile()) {
    if (moveCount <= 10) {
      // Cada clique faz fugir
      moveBtnNaoVida();
      e.stopPropagation(); // Impede outros cliques
    } else {
      // Agora pode "voltar ao início"
      resetBtnNaoVida();
      document.getElementById('modal-pedido-casamento').style.display = 'none';
      location.reload();
    }
  } else {
    // Desktop: ao clicar depois de "Desiste vai", pode voltar ao início
    if (moveCount > 10) {
      resetBtnNaoVida();
      document.getElementById('modal-pedido-casamento').style.display = 'none';
      location.reload();
    }
  }
});

function resetBtnNaoVida() {
  btnNaoVida.style.position = '';
  btnNaoVida.style.left = '';
  btnNaoVida.style.top = '';
  btnNaoVida.style.right = '';
  btnNaoVida.style.bottom = '';
  btnNaoVida.innerText = "Não 😢";
  moveCount = 0;
}


const heartMask = [
  [0, 0, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0]
];

const memoryPhotos = [
  'imgs/01.JPEG', 'imgs/02.JPEG', 'imgs/03.JPEG', 'imgs/04.JPEG',
  'imgs/05.JPEG', 'imgs/06.JPEG', 'imgs/07.JPEG', 'imgs/08.JPEG',
  'imgs/09.JPEG', 'imgs/10.JPEG', 'imgs/11.JPEG', 'imgs/12.JPEG',
  'imgs/13.JPEG', 'imgs/14.JPEG', 'imgs/15.JPEG', 'imgs/16.JPEG',
  'imgs/17.JPEG', 'imgs/18.JPEG'
];

function getResponsiveCardSize(mask, padding = 8) {
  // padding: margem extra nas bordas para não grudar
  const cols = mask[0].length;
  const rows = mask.length;
  const w = window.innerWidth;
  const h = window.innerHeight;

  // O tamanho máximo que o coração pode ocupar
  const cardW = Math.floor((w - padding * 2) / cols);
  const cardH = Math.floor((h - padding * 2) / rows);
  return Math.min(cardW, cardH);
}

function centerHeartGameContainer(cardSize, mask, container) {
  const totalWidth = mask[0].length * cardSize;
  const totalHeight = mask.length * cardSize;

  // Centraliza usando margin
  container.style.width = totalWidth + "px";
  container.style.height = totalHeight + "px";
  container.style.position = "absolute";
  container.style.left = `50%`;
  container.style.top = `50%`;
  container.style.transform = `translate(-50%, -50%)`;
}


const positions = [];
for (let row = 0; row < heartMask.length; row++) {
  for (let col = 0; col < heartMask[row].length; col++) {
    if (heartMask[row][col]) {
      positions.push([
        col * cardSize, // left
        row * cardSize  // top
      ]);
    }
  }
}
// Função embaralhar array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Função principal do jogo
function startHeartMemoryGame(onWin) {
  document.querySelector('.bg-space-bg').style.display = 'block';
  document.getElementById('star-field').style.display = 'block';
  const container = document.getElementById('heart-memory-game');
  const overlay = document.getElementById('heart-memory-overlay');
  overlay.style.display = 'flex';
  container.innerHTML = '';

  // NOVO: cardSize responsivo
  const cardSize = getResponsiveCardSize(heartMask, 8);

  // NOVO: calcula posições e centraliza o container
  const positions = [];
  for (let row = 0; row < heartMask.length; row++) {
    for (let col = 0; col < heartMask[row].length; col++) {
      if (heartMask[row][col]) {
        positions.push([
          col * cardSize,
          row * cardSize
        ]);
      }
    }
  }

  // Centraliza na tela usando função nova
  centerHeartGameContainer(cardSize, heartMask, container);

  // DUPLICA e EMBARALHA as imagens
  const cards = memoryPhotos.concat(memoryPhotos);
  shuffle(cards);

  // Cria as cartas
  cards.forEach((src, i) => {
    const [x, y] = positions[i];
    const card = document.createElement('div');
    card.className = 'heart-memory-card';
    card.style.width = cardSize + 'px';
    card.style.height = cardSize + 'px';
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.innerHTML = `<img src="${src}" alt="carta" draggable="false">`;
    card.dataset.index = i;
    card.dataset.photo = src;
    container.appendChild(card);
  });

  let flipped = [], lock = false, matchedCount = 0;

  container.onclick = function(e) {
    const card = e.target.closest('.heart-memory-card');
    if (!card || lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push(card);

    if (flipped.length === 2) {
      lock = true;
      setTimeout(() => {
        if (flipped[0].dataset.photo === flipped[1].dataset.photo) {
          flipped[0].classList.add('matched');
          flipped[1].classList.add('matched');
          matchedCount += 2;
          if (matchedCount === cards.length) {
            setTimeout(() => {
              overlay.style.display = 'none';
              if (onWin) onWin();
            }, 800);
          }
        } else {
          flipped[0].classList.remove('flipped');
          flipped[1].classList.remove('flipped');
        }
        flipped = [];
        lock = false;
      }, 700);
    }
  };
}
