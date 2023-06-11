let imgCount = 0;
const imgurUrl = "https://i.imgur.com/";
const data = [
    {
        img: `${imgurUrl}ib7GKMo.jpeg`,
        name: "Luis Jacinto",
        price: "25",
        distance: "1",
    },
    {
        img: `${imgurUrl}IFLvJcs.jpeg`,
        name: "Luis Jacinto",
        price: "25",
        distance: "1",
    },
    {
        img: `${imgurUrl}Cmk1Lj3.jpeg`,
        name: "Xuxu",
        price: "25",
        distance: "1",
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
              <span>${data.price}</span>
            </div>
            <div class="info">
              ${data.distance} km
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
    likeText.style.opacity = Math.abs((x / innerWidth) * 2.1);
    likeText.className = `is-like ${x > 0 ? "like" : "nope"}`;
    if (duration) current.style.transition = `transform ${duration}ms`;
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
        // setTimeout(() => (current.style.transition = ""), 100);

        return Swal.fire({
            title: "Ta de sacanagem, né?",
            html: "Chateado :(",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    }

    const flyY = (moveY / moveX) * flyX;
    setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);

    const prev = current;
    const next = current.previousElementSibling;
    if (next) initCard(next);
    current = next;

    setTimeout(() => frame.removeChild(prev), innerWidth);
    if (completes == 2) {
        showMatch();
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

    $('.date').on('click', () => {
        Swal.fire({
            title: "Te amo, meu xuxu!",
            html: "Feliz dia dos namorados!",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    })

    $('.break').on('click', () => {
        Swal.fire({
            title: "Poxa!",
            // html: "Chateado :(",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((_) => {});
    })

}