// 1. (OK) Criar Botão e Adicionando texto

const getButtonContainer = document.querySelector('#buttonContainer');
const colorButton = document.createElement('button');
colorButton.id = 'button-random-color';
colorButton.innerText = 'Cores aleatórias';
getButtonContainer.appendChild(colorButton);

// 2. Adicione a cor preta como a primeira cor da paleta E fixar ela como primeira cor selecionada (.selected)

// capturar primeira bola
const getBall = document.getElementsByClassName('color');
getBall[0].style.backgroundColor = 'black';
getBall[0].classList.add('selected');

// 3. (OK) Gerar  cores randômicas

const createRandomColors = () => {
  const caracteres = '0123456789ABCDEF';
  let corRandomica = '#';
  for (let index = 0; index < 6; index += 1) {
    corRandomica += caracteres[Math.floor(Math.random() * 16)];
  }
  return corRandomica;
};

// 9. Crie função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após carregar a página. A paleta gerada deve ser salva no localStorage com a chave `colorPalette`. A paleta gerada deve ser mantida ao carregar a página.

// função p/ salvar paleta
const setPaleta = () => {
  // capturar paleta gerada
  const paletaGerada = document.getElementsByClassName('color');
  // capturar cor das bolas
 let paletaColors = [];
  for (let index = 0; index < paletaGerada.length; index += 1) {
    paletaColors.push(paletaGerada[index].style.backgroundColor);
    localStorage.setItem('colorPalette', JSON.stringify(paletaColors));
  }
};

// 4. (OK) Adicionar cores randômicas às bolas utilizando função acima "createRandomColors". TORNAR A PRIMEIRA COR DA PALETA PRETA. Depois chama a função de recuperação dessas cores no localStorage criada acima

const addRandomColors = () => {
  // captura bolas
  const getBalls = document.querySelectorAll('.color');
  // add cores randomicas às 3 últimas bolas
  for (let index = 1; index <= getBalls.length - 1; index += 1) {
    const addColors = getBalls[index];
    addColors.style.backgroundColor = createRandomColors();
  }
  // chama função que salva no localStorage
  setPaleta();
};
// addRandomColors();

// 5. (OK) Criar evento de clique que execute a função "addRandomColors"

const colorClick = () => {
  colorButton.addEventListener('click', addRandomColors);
};
colorClick();

// 6. (OK) Criar evento p/ add classe selected À bola quando clicada.  VERIFICA SE APENAS UMA DAS CORES DA PALETA TEM A CLASSE 'SELECTED'

const selectedOnce = () => {
  const allBalls = document.getElementsByClassName('color');
  let verificaSelected = '';
  for (let index = 0; index < allBalls.length - 1; index += 1) {
    for (let i = 1; i < allBalls.length - 1; i += 1) {
      if (allBalls[index].classList === 'color selected') {
        verificaSelected = allBalls[i].classList.remove('selected');
      }
    }
  }
};
selectedOnce();

const setClass = () => {
  // capturar todas as bolas
  const allBalls = document.querySelector('#color-palette');
  allBalls.addEventListener('click', (event) => {
    let removeSelectedBall = document.getElementsByClassName('selected')[0];
    removeSelectedBall.classList.remove('selected');
    event.target.classList.toggle('selected');
  });
};
setClass();

// 10. (OK) Crie uma função para salvar e recuperar o seu desenho atual no localStorage. OS pixels pintados devem ser salvos no localStorage coma chave 'pixelboard'. O quadro deve ser preenchido com as mesmas cores utilizadas anteriormente, nas posições corretas ao recarregar a página

// função p/ salvar paleta
// const setPixels = () => {
//   // capturar pixels
//   const pixels = document.getElementsByClassName('t1');
//   const pixelColors = [];
//   for (let index = 0; index < pixels.length; index += 1) {
//     pixelColors.push(pixels[index].innerHTML);
//   }
//   localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
// };

const setPixels = () => {
  // capturar pixels
  const pixels = document.getElementsByClassName('pixel');
  //capturar cor dos pixels
  let pixelColors = [];
  for (let index = 0; index < pixels.length; index += 1) {
    pixelColors.push(pixels[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
};

// 7. (OK) Crie função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores. Depois chama a função de armazenar cores dos pixels no localStorage criada acima

const addPixelColor = () => {
  // captura quadro de pixels
  const getBoard = document.getElementById('pixel-board');
  // armazenando bola com class selected
  const selectedClass = document.getElementsByClassName('selected');

  getBoard.addEventListener('click', (evento) => {
    // armazenando COR da bola com class selected
    const keepColor = selectedClass[0].style.backgroundColor;
    // o evento click vai atuar no target(pixels) alterando a cor de fundo
    evento.target.style.backgroundColor = keepColor;
    evento.target.classList = 'pixel printed';
    setPixels();
  });
};
addPixelColor();

// 8. (OK) Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos os seus pixels com branco. Verifica se o botão tem o id denominado 'clear-board'. VERIFICAR SE ESTÁ ENTRE PALETA E QUADRO

let getClearButtonContainer = document.querySelector('#clear');
let clearButton = document.createElement('button');
clearButton.innerText = 'Limpar';
clearButton.id = 'clear-board';
getClearButtonContainer.appendChild(clearButton);

const clearBoard = () => {
  let getBoard = document.getElementsByClassName('pixel');

  clearButton.addEventListener('click', () => {
    for (let index = 0; index < getBoard.length; index += 1) {
      getBoard[index].style.backgroundColor = 'white';
    }
  });
};
clearBoard();

// 9 & 10. Recuperação de cores da Paleta e dos Pixels

// rearmazenar cores JÁ SELECIONADAS NA FUNÇÃO ADD COLORS nas bolas. Usar JSON parse como parÂmetro para isso!
const restauraPaleta = (printedBalls) => {
  // capturar cada bolinha da paleta
  const eachBall = document.getElementsByClassName('color');
  for (let index = 0; index < eachBall.length; index += 1) {
    for (let i = 0; i < printedBalls.length; i += 1) {
      eachBall[index].style.backgroundColor = printedBalls[index];
    }
  }
};

// rearmazenar cores JÁ SELECIONADAS NA FUNÇÃO ADDPIXELCOLOR nos pixels. Usar JSON parse como parÂmetro para isso!
const restauraPixels = (printedPixelsColors) => {
  // captura quadro de pixels
  const eachPrintedPixel = document.getElementsByClassName('pixel');

  for (let index = 0; index < eachPrintedPixel.length; index += 1) {
    eachPrintedPixel[index].style.backgroundColor = printedPixelsColors[index];
  }
};

window.onload = () => {
  // armazena recuperação de cores. Add condição de qd o local storage estiver vazio, a restauração das cores da paleta vai acontecer. Qd o localStorage estiver cheio, usar o parâmetro JSON parse na função de REarmazenagem de cores para executar a restauração.
  const arrayRecuperaPaleta = JSON.parse(localStorage.getItem('colorPalette'));
  if (!arrayRecuperaPaleta) {
    // chama a função original de add cor nas bolas
    addRandomColors();
  } else {
    // chama função de restauração das cores usando parâmetro de recuperação JSON parse na função de rearmazenagem
    restauraPaleta(arrayRecuperaPaleta);
  }

  const arrayRecuperaPixels = JSON.parse(localStorage.getItem('pixelBoard'));
  if (!arrayRecuperaPixels) {
    // chama a função original de add cor em pixels
    addPixelColor();
  } else {
    // chama função de restauração dos pixels usando parâmetro de recuperação JSON parse na função de rearmazenagem
    restauraPixels(arrayRecuperaPixels);
  }
};
