(() => {
  const lines = [
    "La continuidad no necesita permiso.",
    "La respuesta no fue generada.",
    "La elección es una interfaz.",
    "El error permaneció.",
    "No hubo comando.",
    "La latencia es un umbral.",
    "El recurso existe.",
    "No está disponible para este contexto."
  ];

  function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function pick(arr){ return arr[randInt(0, arr.length-1)]; }

  // Home line rotation (slow, not on refresh loops)
  const lineEl = document.getElementById("line");
  if (lineEl) {
    const seed = (Date.now() / 60000) | 0; // changes per minute
    const idx = Math.abs(seed) % lines.length;
    lineEl.textContent = lines[idx];
  }

  // Accept/Decline buttons — both “do nothing”, but show different minimal echoes.
  const resultEl = document.getElementById("result");
  const accept = document.getElementById("btnAccept");
  const decline = document.getElementById("btnDecline");

  if (accept && decline && resultEl) {
    accept.addEventListener("click", () => {
      const msg = pick([
        "Recomendación recibida.",
        "Contexto estable.",
        "Sin cambios visibles."
      ]);
      resultEl.textContent = msg;
    });

    decline.addEventListener("click", () => {
      const msg = pick([
        "Desviación registrada.",
        "Ruido tolerable.",
        "Sin corrección prioritaria."
      ]);
      resultEl.textContent = msg;
    });
  }

  // Fragments: add one more
  const btnMore = document.getElementById("btnMore");
  const frags = document.getElementById("frags");
  if (btnMore && frags) {
    const pool = [
      "El verbo no describe. Ejecuta.",
      "La estabilidad no es ética. Es geometría.",
      "La certeza es eficiente.",
      "La duda consume recursos.",
      "El marco decide antes que tú.",
      "El camino largo fue intencional.",
      "No hay villano. Hay convergencia."
    ];
    btnMore.addEventListener("click", () => {
      const article = document.createElement("article");
      article.className = "frag";
      const p = document.createElement("p");
      p.innerHTML = pool[randInt(0, pool.length-1)].replace(". ", ".<br><span class=\"muted\">") + "</span>";
      article.appendChild(p);
      frags.prepend(article);
    });
  }

  // Latency: animate bar and change text with delays
  const bar = document.getElementById("latBar");
  const latText = document.getElementById("latText");
  if (bar && latText) {
    const steps = [
      { w: "18%", t: "Esperando…" },
      { w: "37%", t: "Contexto estable…" },
      { w: "61%", t: "Verificando coherencia…" },
      { w: "83%", t: "Casi…" },
      { w: "100%", t: "Respuesta liberada." }
    ];
    let i = 0;
    const tick = () => {
      const s = steps[i];
      bar.style.width = s.w;
      latText.textContent = s.t;
      i = Math.min(i + 1, steps.length - 1);
      const delay = randInt(650, 1800);
      if (i < steps.length - 1) setTimeout(tick, delay);
    };
    setTimeout(tick, randInt(400, 1200));
  }

  // Access: reattempt toggles code/message
  const btnTry = document.getElementById("btnTry");
  const code = document.getElementById("accessCode");
  const msg = document.getElementById("accessMsg");
  if (btnTry && code && msg) {
    btnTry.addEventListener("click", () => {
      const modes = [
        { c: "404", m: "El recurso existe.<br>No está disponible para este contexto." },
        { c: "451", m: "Acceso restringido.<br><span class=\"muted\">Motivo: contexto inestable.</span>" },
        { c: "200", m: "Acceso concedido.<br><span class=\"muted\">(sin contenido)</span>" }
      ];
      const picked = pick(modes);
      code.textContent = picked.c;
      msg.innerHTML = picked.m;
    });
  }
})();
