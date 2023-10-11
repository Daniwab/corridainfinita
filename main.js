//variáveis globais
var trex, trex_img, trex_die
var edges
var chao, chao_img
var nuvem_img
var cactus, cactus_img1,cactus_img2,cactus_img3,cactus_img4,cactus_img5,cactus_img6
var pulo
var morte
var checkpoint
var grupoNuvem, grupoCactus
var pontos  = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, gameOver_img, restart, restart_img;

//carregar os arquivos
function preload(){
    //carregando e baixando os arquivos das animações
    trex_img = loadAnimation("trex1.png", "trex3.png", "trex4.png")
    trex_die = loadAnimation("trex_collided.png")
    chao_img = loadImage("ground2.png");
    nuvem_img = loadImage("cloud.png")
    cactus_img1 = loadImage("obstacle1.png")
    cactus_img2 = loadImage("obstacle2.png")
    cactus_img3 = loadImage("obstacle3.png")
    cactus_img4 = loadImage("obstacle4.png")
    cactus_img5 = loadImage("obstacle5.png")
    cactus_img6 = loadImage("obstacle6.png")
    pulo = loadSound("jump.mp3")
    morte = loadSound("die.mp3")
    checkpoint = loadSound("checkpoint.mp3")
    gameOver_img = loadImage("gameOver.png");
    restart_img = loadImage("restart.png");
}

//criando sprites e suas propriedades
function setup(){
    //criando o espaço que irei usar no meu jogo
    createCanvas(windowWidth, windowHeight);
    //criando o t-rex e sua animação de correr
    chao = createSprite(width/2, height-20, 600, 40);
    chao.addImage(chao_img)
    trex = createSprite(50, height-30, 20, 40);
    trex.addAnimation("correndo", trex_img)
    trex.addAnimation("falecido", trex_die)
    trex.scale = 0.5
    edges = createEdgeSprites ();
    grupoNuvem = new Group ()
    grupoCactus = new Group ()
    gameOver = createSprite(width/2,height/2);
    gameOver.addImage(gameOver_img);
    gameOver.scale = 0.5
    restart = createSprite(width/2,height/2 + 30);
    restart.addImage(restart_img);
    restart.scale = 0.7;
    
}

function draw(){
    background("white");
    
    if(gameState === PLAY){
        pontos += Math.round (getFrameRate()/60)
        gerarNuvens()
        gerarCactus()
        //pulo
        if(touches.length>0 || keyDown("space") && trex.y > height-30){
            trex.velocityY = -9
            touches = [] 
            if(!pulo.isPlaying()){
                pulo.play() 
            }             
        }
        //gravidade
        trex.velocityY += 0.5             
        gameOver.visible = false
        restart.visible = false
        trex.collide(edges)  
        chao.velocityX =- 9
        
         
        if(pontos & 100 === 0){
            checkpoint.play  
        }
        
        if(trex.isTouching(grupoCactus)){
            gameState = END
            if(!morte.isPlaying()){
                morte.play()
                chao.VelocityX +=20
            }
        }
    }else if(gameState === END){
        trex.collide(edges)  
        chao.velocityX = 0;
        grupoCactus.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);
        grupoCactus.setLifetimeEach(0);
        grupoNuvem.setLifetimeEach(0);
        trex.changeAnimation("falecido");
        
       
        
        gameOver.visible = true
        restart.visible = true
      if(mousePressedOver(restart)){
          resete();
      }
    }




    //fundo infinito
    if(chao.x < 800){
        chao.x = chao.width/2
    }
       
    
    
    drawSprites();
              

        text(mouseX +"," + mouseY, mouseX, mouseY);

        if(trex.isTouching(grupoCactus)){
            console.log("game over")

        }

        text("Pontuação:" + pontos,width - 100, height - 179)
        textFont("arial black")
       
    }//FIM DO DRAW
function gerarNuvens(){
    if(frameCount % 120 === 0){
    var y =  random(height - 180,height - 100)
    var nuvem = createSprite (600, y)
    nuvem.addImage(nuvem_img)
    nuvem.velocityX = -2
    nuvem.scale = random(0.3, 1.4)

 nuvem.depth = trex.depth
 trex.depth +=1

 //largura do canvas dividido pela velocidade
 nuvem.lifetime = width/nuvem.velocityX

 grupoNuvem.add(nuvem)
}
}

function gerarCactus(){
  if(frameCount % 50 === 0){
  var cactus = createSprite (width, height-40 )
 cactus.addImage(cactus_img1)
 cactus.velocityX = -9 
 cactus.scale = 0.8
 //cactus.debug = true
 var num = Math.round(random(1,6))
 switch (num) {
    case 1:
        cactus.addImage(cactus_img1)
        cactus.scale = 0.7
     break
    
    case 2:
        cactus.addImage(cactus_img2)
        cactus.scale = 0.7
     break
    case 3:
        cactus.addImage(cactus_img3)
        cactus.scale = 0.7
     break
    case 4:
        cactus.addImage(cactus_img4)
        cactus.scale = 0.6
     break
    case 5:
        cactus.addImage(cactus_img5)
        cactus.scale = 0.6
     break
    case 6:
        cactus.addImage(cactus_img6)
      cactus.scale = 0.3     
     break
     default: break
    
 }
 
 cactus.depth = trex.depth
 trex.depth +=1

 cactus.lifetime = width/cactus.velocityX

 grupoCactus.add(cactus)
 }
}
function resete(){
  gameState = PLAY
    grupoCactus.destroyEach()
    grupoNuvem.destroyEach()
    trex.changeAnimation("correndo");
    pontos = 0

}

