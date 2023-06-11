let imgCount = 0;
const imgurUrl = "https://i.imgur.com/";
const data = [
    {
        img: `${imgurUrl}ib7GKMo.jpeg`,
        name: "Luis Jacinto",
        age: "25",
        distance: 1,
    },
    {
        img: `${imgurUrl}IFLvJcs.jpeg`,
        name: "Luis Jacinto",
        age: "25",
        distance: 1,
    },
    {
        img: `${imgurUrl}Cmk1Lj3.jpeg`,
        name: "Paixão",
        age: "25",
        distance: 1,
    },
    {
        img: `${imgurUrl}4XZdHFw.jpeg`,
        name: "Nós em pelotas",
        age: "❤️",
        distance: "Me perdoa por não ter sido o melhor que eu podia contigo.",
    },
    {
        img: `${imgurUrl}FoJ8ef8.jpeg`,
        name: "Nós na Lambe",
        age: "❤️",
        distance: "Me perdoa por ser meio chato as vezes, prometo melhorar.",
    },
    {
        img: `${imgurUrl}kH4SWBX.jpeg`,
        name: "Nós bebendo corote",
        age: "❤️",
        distance: "Prometo sempre te fazer rir.",
    },
    {
        img: `${imgurUrl}3zUA1BT.jpeg`,
        name: "Xuxu",
        age: "❤️",
        distance: "Prometo sempre exaltar o mulherão que você é.",
    },
    {
        img: `${imgurUrl}cSgTG7U.jpeg`,
        name: "Nós se divertindo",
        age: "❤️",
        distance: "Prometo ser o melhor que eu puder pra nós",
    },
    {
        img: `${imgurUrl}PcIT6n0.jpeg`,
        name: "Nós na Lambe dnv",
        age: "❤️",
        distance: "O que mais quero é te fazer feliz como você me faz.",
    },
    {
        img: `${imgurUrl}Hn2NWIC.jpeg`,
        name: "Nós",
        age: "❤️",
        distance: "Xuxu, muito obrigado por todos nossos momentos juntos.",
    },
    {
        img: `${imgurUrl}gzRsFEz.jpeg`,
        name: "Xuxu e Paixão",
        age: "❤️",
        distance: '"Engraçado como às vezes você simplesmente encontra as coisas." - Tracy Mcconnell',
    },
];
const frame = document.body.querySelector(".frame");
data.forEach((_data) => appendCard(_data));

let current = frame.querySelector(".card:last-child");
let likeText = current.children[0];
let startX = 0,
    startY = 0,
    moveX = 0,
    moveY = 0;
initCard(current);

document.querySelector("#like").onclick = () => {
    moveX = 1;
    moveY = 0;
    complete();
};
document.querySelector("#hate").onclick = () => {
    moveX = -1;
    moveY = 0;
    complete();
};

function appendCard(data) {
    const firstCard = frame.children[0];
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.style.backgroundImage = `url(${data.img})`;
    newCard.innerHTML = `
          <div class="is-like">LIKE</div>
          <div class="bottom">
            <div class="title">
              <span>${data.name}</span>
              <span>${data.age}</span>
            </div>
            <div class="info">
              ${Number.isInteger(data.distance) ? `${data.distance} km` : data.distance}
            </div>
          </div>
        `;
    if (firstCard) frame.insertBefore(newCard, firstCard);
    else frame.appendChild(newCard);
    imgCount++;
}

function initCard(card) {
    card.addEventListener("pointerdown", onPointerDown);
}

function setTransform(x, y, deg, duration) {
    current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
    if (duration) current.style.transition = `transform ${duration}ms`;
    likeText.style.opacity = Math.abs((x / innerWidth) * 2.1);
    likeText.className = `is-like ${x > 0 ? "like" : "nope"}`;
}

function onPointerDown({ clientX, clientY }) {
    startX = clientX;
    startY = clientY;
    current.addEventListener("pointermove", onPointerMove);
    current.addEventListener("pointerup", onPointerUp);
    current.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX;
    moveY = clientY - startY;
    setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp() {
    current.removeEventListener("pointermove", onPointerMove);
    current.removeEventListener("pointerup", onPointerUp);
    current.removeEventListener("pointerleave", onPointerUp);
    if (Math.abs(moveX) > frame.clientWidth / 2) {
        current.removeEventListener("pointerdown", onPointerDown);
        complete();
    } else cancel();
}

var completes = 0;

function complete() {
    const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3;

    if (flyX < 0) {
        initCard(current);
        setTransform(0, 0, 0, 100);
        setTimeout(() => (current.style.transition = ""), 100);
        (moveX = 0), (moveY = 0);
        return Swal.fire({
            title: "Ta de sacanagem, né?",
            html: "Chateado, tenta de novo :(",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    }

    const flyY = (moveY / moveX) * flyX;
    setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);
    (moveX = 0), (moveY = 0);
    const prev = current;

    setTimeout(() => frame.removeChild(prev), innerWidth);

    if (completes == 10) {
        showMatch();
    } else {
        const next = current.previousElementSibling;
        if (next) initCard(next);
        current = next;
        likeText = current.children[0]

        const messages = [
            ["Tem certeza mesmo?", "Sério?"],
            ["Ta interessada mesmo?", "Ainda da pra desistir!"],
            ["A partir daqui não tem volta", "Estou avisando!"],
            null,
            null,
        ];

        if (messages[completes]) {
            Swal.fire({
                title: messages[completes] ? messages[completes][0] : "",
                html: messages[completes] ? messages[completes][1] : "",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((_) => {});
        }
    }

    completes++;
}

function cancel() {
    setTransform(0, 0, 0, 100);
    setTimeout(() => (current.style.transition = ""), 100);
}

function showMatch() {
    $("body").html(`
        <div style="background-image: url(${data[2].img}); background-size: cover; width: 100%; height: 100%; filter: brightness(0.5);">
        </div>
        <div id="match">
            <div class="its_match"></div>
            <div class="liked_each_other">You and Luis Jacinto love each other.</div>

            <div style="font-size: 1.25rem;
            margin-bottom: 0.5rem;">Quer namorar comigo?</div>
            <div class="date">Namorar!</div>
            <div class="break">Terminar!</div>
        </div>
    `);

    $(".date").on("click", () => {
        Swal.fire({
            title: "Te amo, meu xuxu!",
            html: "Feliz dia dos namorados!",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    });

    $(".break").on("click", () => {
        Swal.fire({
            title: "Poxa!",
            html: "Tem certeza?",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    });
}
