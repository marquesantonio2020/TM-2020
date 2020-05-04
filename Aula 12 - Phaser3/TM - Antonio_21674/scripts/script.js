var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function preload() {
    //Load de imagens para o cenário no browser
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

var platforms;
var score = 0;
var scoreText;

function create() {
    //Adição da área de jogo e das plataformas
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //Cursores a serem utilizados
    cursors = this.input.keyboard.createCursorKeys()

    //Adição de uma sprite (Imagem à qual será aplicado movimento)
    player = this.physics.add.sprite(100, 450, 'dude');


    player.setBounce(0.2);
    //Evita que o personagem sai dos limites do mapa
    player.setCollideWorldBounds(true);
    //Gravidade do personagem
    player.body.setGravityY(300)

    //Colisão entre jogador e as plataformas
    this.physics.add.collider(player, platforms);

    //Criação das animações do movimento do personagem
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({key: 'turn', frames: [{key: 'dude', frame: 4}], frameRate: 20});
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    //Criaçã de objetos com a imagem estrela, e replicação do mesmo por 11 vezes com um espaçamento de 70
    stars = this.physics.add.group({key: 'star', repeat: 11, setXY: {x: 12, y: 0, stepX: 70}});

    //Atribuição de um salto aleatório aquando a queda de cada estrela
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Colisão entre as estrelas e as plataformas para que estas não caiam fora do mapa
    this.physics.add.collider(stars, platforms);

    //Colisão entre jogador e estrelas, esta colisão despulta o aumento do score do personagem e o aparecimento de bombas quando todas as estrelas são apanhadas
    this.physics.add.overlap(player, stars, collectStar, null, this);

    //Texto da pontuação
    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

    //Criação de objetos bomba
    bombs = this.physics.add.group();

    //Colisão entre bombas e plataformas para que estas não saiam fora do mapa
    this.physics.add.collider(bombs, platforms);

    //Colisão entre jogador e bombas que despulta no game over quando isto ocorre
    this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function update() {

    //Definições do movimento do personagem, como velocidade e animação a ser desencadeada
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }


}

//Função resultante da colisão entre jogador e estrelas
function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

//Função resultante da colisão entre jogador e bomba
function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

