let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")// A linha de cima e esta define o contexto de renderização do jogo
let box = 32
let pontos = document.getElementById("pontos-comidinea");

let snake = []
snake[0] = { x: 8 * box, y: 8 * box }

let direction = "right"

// = = = = = = = CONSTRUIR ÁREA DE RENDERIZAÇÃO = = = = = = = 

function criarBG()
{
    context.fillStyle = "black"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

// = = = = = = = NASCIMENTO DA COBRINEA = = = = = = = 

function criarCobrinha()
{
    for( let i = 0; i < snake.length; i++ )
    {
        context.fillStyle = "white"
        context.fillRect( snake[i].x, snake[i].y, box, box )
    }
}

// = = = = = = = COMIDINEA = = = = = = = 

let food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }

function drawFood() // Comida da cobrinea, para crescer forte e saudável =]
{
    context.fillStyle = "#F25C05"
    context.fillRect(food.x, food.y, box, box)
}

// = = = = = = = COMANDOS VIA TECLADO DO USUÁRIO = = = = = = = 

document.addEventListener('keydown', update) // Por meio deste evento será captado qual tecla o usuário apertou e atualizará em seguida

function update( event ) // Controle da direção da cobrinha
{
    if( event.keyCode == 37 && direction != "right" ) direction = "left"
    if( event.keyCode == 38 && direction != "down" ) direction = "up"
    if( event.keyCode == 39 && direction != "left" ) direction = "right"
    if( event.keyCode == 40 && direction != "up" ) direction = "down"
}

// = = = = = = = HORA DO SHOW = = = = = = = 

function iniciarJogo()
{
    for( let j = 1; j < snake.length; j++ )
    {
        if( snake[0].x == snake[j].x && snake[0].y == snake[j].y )
        {
            clearInterval(jogo)
            alert('Ops, Game Over!. Você conquistou ' + pontos.innerHTML + ' pontos.')
        }
    }

    if( snake[0].x > 15 * box && direction == "right" ) snake[0].x = 0
    if( snake[0].x < 0  && direction == "left" ) snake[0].x = 16 * box
    if( snake[0].y > 15 * box && direction == "down" ) snake[0].y = 0
    if( snake[0].y < 0  && direction == "up" ) snake[0].y = 16 * box // verifica se a cobrinha chegar na extremidade da área, ao invés dela sumir na imensidão do vazio, simplesmente aparecerá na extremidade oposta

    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if( direction == "right" ) snakeX += box
    if( direction == "left" ) snakeX -= box
    if( direction == "up" ) snakeY -= box
    if( direction == "down" ) snakeY += box

    if( snakeX != food.x || snakeY != food.y )
    {
        snake.pop() // Retira o ultimo elemento do array
    }
    else
    {
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box

        pontos.innerHTML = (snake.length - 1)
    }

    let newHead = { x: snakeX, y: snakeY }

    snake.unshift(newHead) // Adicionará um ou mais elementos à cobrinha
}

let jogo = setInterval(iniciarJogo, 100)