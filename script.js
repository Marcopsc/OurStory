const dataInicio = new Date("2021-11-20T00:00:00");

const periodos = [
  { inicio: new Date("2023-12-01T00:00:00"), fim: new Date("2024-04-10T00:00:00") },
  { inicio: new Date("2024-07-27T00:00:00"), fim: new Date("2024-12-10T00:00:00") }
];

function calcularTempoNamoro() {
  const agora = new Date();
  let totalSegundos = 0;
  let totalDias = 0;

  for (let p of periodos) {
    let inicio = p.inicio;
    let fim = p.fim;

    if (agora < inicio) continue;
    if (agora < fim) fim = agora;

    const segundos = (fim - inicio) / 1000;
    totalSegundos += segundos;
    totalDias += Math.floor(segundos / (60 * 60 * 24));
  }

  const mesesCompletos = Math.floor(totalDias / 30.44);
  const dias = Math.floor(totalSegundos / (24 * 3600));
  const horas = Math.floor((totalSegundos % (24 * 3600)) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = Math.floor(totalSegundos % 60);

  return {
    texto: \`\${dias} dias, \${horas} horas, \${minutos} minutos e \${segundos} segundos\`,
    meses: mesesCompletos
  };
}

function atualizarContador() {
  const agora = new Date();
  const diff = agora - dataInicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").innerHTML =
    \`Nos conhecemos há \${dias} dias, \${horas} horas, \${minutos} minutos e \${segundos} segundos 💖\`;
}

atualizarContador();
setInterval(atualizarContador, 1000);

const btnNamoro = document.getElementById("btn-namoro");
const resultado = document.getElementById("resultado-namoro");

btnNamoro.addEventListener("click", () => {
  const tempo = calcularTempoNamoro();
  resultado.innerHTML =
    \`Tá bom, vou contar...<br>Namoramos por \${tempo.texto}<br>Ou seja, só <strong>\${tempo.meses} meses</strong> mesmo 😅\`;
  resultado.style.display = "block";
  btnNamoro.style.display = "none";
});
