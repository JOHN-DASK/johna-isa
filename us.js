// Contador de tempo
function updateRelationshipTimer() {
    try {
        const startDate = new Date("2025-04-07T16:45:00-03:00");
        if (typeof console !== "undefined" && console.log) {
            console.log("Data de início: " + startDate.toISOString());
        }
        const now = new Date();
        if (typeof console !== "undefined" && console.log) {
            console.log("Data atual: " + now.toISOString());
        }
        const diff = now.getTime() - startDate.getTime();
        if (typeof console !== "undefined" && console.log) {
            console.log("Diferença em milissegundos: " + diff);
        }
        if (diff < 0) {
            if (typeof console !== "undefined" && console.error) {
                console.error("Erro: A data atual é anterior à data de início.");
            }
            document.getElementById("years").textContent = "0";
            document.getElementById("months").textContent = "0";
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            return;
        }
        const diffDate = new Date(diff);
        const years = diffDate.getUTCFullYear() - 1970;
        const months = diffDate.getUTCMonth();
        const days = diffDate.getUTCDate() - 1;
        const hours = diffDate.getUTCHours();
        const minutes = diffDate.getUTCMinutes();
        const seconds = diffDate.getUTCSeconds();
        // Linha 41: Corrigindo a string template para concatenação
        if (typeof console !== "undefined" && console.log) {
            console.log("Anos: " + years + ", Meses: " + months + ", Dias: " + days + ", Horas: " + hours + ", Minutos: " + minutes + ", Segundos: " + seconds);
        }
        const yearsElement = document.getElementById("years");
        const monthsElement = document.getElementById("months");
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");
        if (yearsElement && monthsElement && daysElement && hoursElement && minutesElement && secondsElement) {
            yearsElement.textContent = years;
            monthsElement.textContent = months;
            daysElement.textContent = days;
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
        } else {
            if (typeof console !== "undefined" && console.error) {
                console.error("Erro: Um ou mais elementos do contador não foram encontrados.");
            }
        }
    } catch (error) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro ao atualizar o contador:", error);
        }
    }
}

setInterval(updateRelationshipTimer, 1000);
updateRelationshipTimer();

// Animação de mini corações ao clicar no coração
const heartsCanvas = document.getElementById("hearts-canvas");
let heartsCtx = null;

if (heartsCanvas) {
    if (typeof console !== "undefined" && console.log) {
        console.log("Canvas de corações encontrado!");
    }
    heartsCtx = heartsCanvas.getContext("2d");
    if (!heartsCtx) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro: Não foi possível obter o contexto 2D do canvas de corações.");
        }
    } else {
        heartsCanvas.width = window.innerWidth;
        heartsCanvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            heartsCanvas.width = window.innerWidth;
            heartsCanvas.height = window.innerHeight;
        });
        class MiniHeart {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 10 + 5;
                this.speedX = Math.random() * 6 - 3;
                this.speedY = Math.random() * 6 - 3;
                this.life = 1;
                // Linha 75: Mantendo a concatenação e garantindo formatação correta
                this.color = "rgba(255, " + (Math.random() * 255) + ", " + (Math.random() * 255) + ", " + this.life + ")";
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 0.02;
                // Linha 81: Mantendo a concatenação e garantindo formatação correta
                this.color = "rgba(255, " + (Math.random() * 255) + ", " + (Math.random() * 255) + ", " + this.life + ")";
            }
            draw() {
                if (heartsCtx) {
                    heartsCtx.fillStyle = this.color;
                    heartsCtx.beginPath();
                    const t = this.x;
                    const r = this.y;
                    const s = this.size / 4;
                    heartsCtx.moveTo(t, r + s / 2);
                    heartsCtx.bezierCurveTo(t - s, r - s / 2, t - s, r - s * 1.5, t, r - s);
                    heartsCtx.bezierCurveTo(t + s, r - s * 1.5, t + s, r - s / 2, t, r + s / 2);
                    heartsCtx.fill();
                }
            }
        }
        const miniHearts = [];
        const heart = document.querySelector(".heart");
        if (heart) {
            heart.addEventListener("click", (e) => {
                if (typeof console !== "undefined" && console.log) {
                    console.log("Coração clicado! Gerando mini corações...");
                }
                heart.classList.add("clicked");
                const rect = heart.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                for (let i = 0; i < 20; i++) {
                    miniHearts.push(new MiniHeart(x, y));
                }
            });
        } else {
            if (typeof console !== "undefined" && console.error) {
                console.error("Erro: Elemento .heart não encontrado.");
            }
        }
        function animateHearts() {
            if (heartsCtx) {
                heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
                miniHearts.forEach((heart, index) => {
                    heart.update();
                    heart.draw();
                    if (heart.life <= 0) {
                        miniHearts.splice(index, 1);
                    }
                });
            }
        }
    }
}

// Detalhes de fundo (corações flutuantes)
const backgroundDetailsCanvas = document.getElementById("background-details-canvas");
let backgroundDetailsCtx = null;

if (backgroundDetailsCanvas) {
    if (typeof console !== "undefined" && console.log) {
        console.log("Canvas de detalhes de fundo encontrado!");
    }
    backgroundDetailsCtx = backgroundDetailsCanvas.getContext("2d");
    if (!backgroundDetailsCtx) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro: Não foi possível obter o contexto 2D do canvas de detalhes de fundo.");
        }
    } else {
        backgroundDetailsCanvas.width = window.innerWidth;
        backgroundDetailsCanvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            backgroundDetailsCanvas.width = window.innerWidth;
            backgroundDetailsCanvas.height = window.innerHeight;
        });
        class BackgroundHeart {
            constructor() {
                this.x = Math.random() * backgroundDetailsCanvas.width;
                this.y = Math.random() * backgroundDetailsCanvas.height;
                this.size = Math.random() * 5 + 3;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.opacitySpeed = Math.random() * 0.02 + 0.01;
                this.angle = 0;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += Math.sin(this.angle) * this.opacitySpeed;
                this.angle += 0.05;
                if (this.opacity < 0.3) this.opacity = 0.3;
                if (this.opacity > 0.8) this.opacity = 0.8;
                if (this.x < 0 || this.x > backgroundDetailsCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > backgroundDetailsCanvas.height) this.speedY *= -1;
            }
            // Linha 166: Garantindo que o método draw() esteja corretamente formatado
            draw() {
                if (backgroundDetailsCtx) {
                    backgroundDetailsCtx.fillStyle = "rgba(255, 85, 85, " + this.opacity + ")";
                    backgroundDetailsCtx.beginPath();
                    const t = this.x;
                    const r = this.y;
                    const s = this.size / 2;
                    backgroundDetailsCtx.moveTo(t, r + s / 2);
                    backgroundDetailsCtx.bezierCurveTo(t - s, r - s / 2, t - s, r - s * 1.5, t, r - s);
                    backgroundDetailsCtx.bezierCurveTo(t + s, r - s * 1.5, t + s, r - s / 2, t, r + s / 2);
                    backgroundDetailsCtx.fill();
                }
            }
        }
        const backgroundHearts = [];
        const numBackgroundHearts = 30;
        for (let i = 0; i < numBackgroundHearts; i++) {
            backgroundHearts.push(new BackgroundHeart());
        }
        function animateBackgroundDetails() {
            if (backgroundDetailsCtx) {
                backgroundDetailsCtx.clearRect(0, 0, backgroundDetailsCanvas.width, backgroundDetailsCanvas.height);
                backgroundHearts.forEach((heart) => {
                    heart.update();
                    heart.draw();
                });
                if (typeof console !== "undefined" && console.log) {
                    console.log("Desenhando detalhes de fundo...");
                }
            }
        }
    }
}

// Loop principal de animação
function animate() {
    try {
        if (heartsCtx) {
            animateHearts();
        }
        if (backgroundDetailsCtx) {
            animateBackgroundDetails();
        }
        requestAnimationFrame(animate);
    } catch (error) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro no loop de animação:", error);
        }
    }
}

requestAnimationFrame(animate);