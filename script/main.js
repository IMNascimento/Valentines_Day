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
        Hey <span id="name">${data.name}</span>
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
      backgroundColor: "rgb(127, 206, 248)",
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

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    // Também esconde o overlay, caso esteja visível
    const overlay = document.getElementById('universe-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.classList.remove('hide');
    }
    // Reinicia timeline
    animationTimeline();
  });
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
  }
];

function showUniverseSessions() {
  document.querySelector('.bg-space-bg').style.display = 'block';
  document.getElementById('star-field').style.display = 'block';
  const overlay = document.getElementById('universe-overlay');
  const titleEl = document.getElementById('universe-title');
  const msgEl = document.getElementById('universe-message');
  let idx = 0;

  function typeWriter(element, text, speed = 32, cb) {
    element.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text[i];
        i++;
        setTimeout(type, speed);
      } else if (cb) {
        setTimeout(cb, 1300); // Espera um pouco
      }
    }
    type();
  }

  function showNextSession() {
    // Exibe o fundo espacial e as estrelas
    document.querySelector('.bg-space-bg').style.display = 'block';
    document.getElementById('star-field').style.display = 'block';

    // Quando termina as sessões, some tudo!
    if (idx >= universeSessions.length) {
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.style.display = 'none';
        // Esconde o fundo espacial e estrelas
        document.querySelector('.bg-space-bg').style.display = 'none';
        document.getElementById('star-field').style.display = 'none';

        showFinalModals()
      }, 800);
      return;
    }

    // Exibe o overlay com a próxima mensagem
    overlay.style.display = 'flex';
    overlay.classList.remove('hide');
    titleEl.innerHTML = "";
    msgEl.innerHTML = "";

    // Escreve o título e a mensagem com efeito de máquina de escrever
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnNaoVida.addEventListener('mouseenter', function() {
  // Limitamos a área pra não sair do card
  const modalRect = modalContent.getBoundingClientRect();
  const btnRect = btnNaoVida.getBoundingClientRect();
  const maxX = modalRect.width - btnRect.width - 20;
  const maxY = modalRect.height - btnRect.height - 10;

  // Gera posições aleatórias dentro do modal
  const randX = getRandomInt(0, maxX);
  const randY = getRandomInt(60, maxY);

  btnNaoVida.style.right = 'auto';
  btnNaoVida.style.left = randX + 'px';
  btnNaoVida.style.top = randY + 'px';
  btnNaoVida.style.bottom = 'auto';

  moveCount++;
  // Se mover muitas vezes, pode até mudar o texto como trollagem
  if (moveCount > 10) {
    btnNaoVida.innerText = "Desiste vai 😂";
  }
});

// Opcional: reseta ao fechar
function resetBtnNaoVida() {
  btnNaoVida.style.right = '32px';
  btnNaoVida.style.bottom = '32px';
  btnNaoVida.style.left = '';
  btnNaoVida.style.top = '';
  btnNaoVida.innerText = "Não 😢";
  moveCount = 0;
}

