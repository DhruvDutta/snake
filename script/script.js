let snake={};
let food;
let s_len=3;
let direction;
let pointer;
let score=0;
let score_text;
let size= 18;
let p;
let val=100;
let config={
    width:window.innerWidth-8,
    height:window.innerHeight-8,
    parent:'page',
    physics: { default: 'arcade' },
    dom:{
        createContainer:true
    },
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}
let game = new Phaser.Game(config);
let W = game.config.width;
let H = game.config.height;
function preload(){
    
}
function create(){

    for(let i =0;i<s_len;i++){
        span = document.createElement('span');
        if(i==s_len-1){
            span.setAttribute('class','box right');
            span.innerText=':'
        }else{
            span.setAttribute('class','box')
        }
        
        box = this.add.dom(20*(i+1),20,span);
        snake[i]=box;
        
    }
    direction='right';
    setInterval(move,100)
    this.input.keyboard.on('keydown-' + 'UP', up);
    this.input.keyboard.on('keydown-' + 'RIGHT', right);
    this.input.keyboard.on('keydown-' + 'DOWN', down);
    this.input.keyboard.on('keydown-' + 'LEFT', left);
    this.input.on('pointerdown',slide,this);
    food = document.createElement('span');
    food.setAttribute('id','food');
    food=this.add.dom(Phaser.Math.Between(70,W),Phaser.Math.Between(30,H),food);
    food.setVisible(false);
    setTimeout(function(){
        food.setVisible(true);
    },500);
    score_text = this.add.text(10,10,`Score: ${score}`)
    p = document.createElement('progress');
    p.setAttribute('value','100');
    p.setAttribute('max','100');
    p.setAttribute('id','p')
    p = this.add.dom(W-100,20,p);
    p.setVisible(false);

}
function update(){
    
}
function slide(){
    pointer = this.input.activePointer;
    let x1=pointer.x;
    let y1=pointer.y;
    let x2;
    let y2;
    setTimeout(function(){
        x2 = pointer.x;
        y2 = pointer.y;
        if(Math.abs(x2-x1)>Math.abs(y2-y1)){
            if(x2-x1>0){
                right();
            }else{
                left();
            }
        }else{
            if(y2-y1>0){
                down();
            }else{
                up();
            }
        }
    },200)

}
function down(){
    if(direction!='up'){
        direction='down';
        setTimeout(function(){
            snake[s_len-1].angle = 90;
        },100)
    }
}
function right(){
    if(direction!='left'){
        direction='right';
        setTimeout(function(){
            snake[s_len-1].angle = 0;
        },100)
    }
}
function up(){
    if(direction!='down'){
        direction='up';
        setTimeout(function(){
            snake[s_len-1].angle = -90;
        },100)
    }
}
function left(){
    if(direction!='right'){
        direction='left';
        setTimeout(function(){
            snake[s_len-1].angle = 180;
        },100)
    }
}
function move(){
    if(direction=='right'){
        for(let j=0;j<s_len;j++){
            if(j==s_len-1){
                snake[j].x = (snake[j].x+20)%W;
                snake[j].y = snake[j].y;

            }else{
                snake[j].x =snake[j+1].x;
                snake[j].y =snake[j+1].y;
            }
        }
    }else if(direction=='down'){
        for(let j=0;j<s_len;j++){
            if(j==s_len-1){
                snake[j].y = (snake[j].y+20)%H;
                snake[j].x = snake[j].x;

            }else{
                snake[j].x =snake[j+1].x;
                snake[j].y = snake[j+1].y;

            }
        }
    }else if(direction=='left'){
        for(let j=0;j<s_len;j++){
            if(j==s_len-1){
                snake[j].y = snake[j].y;
                snake[j].x = (snake[j].x-20)%W;
                if(snake[j].x<=0){
                    snake[j].x =snake[j].x+W;
                }

            }else{
                snake[j].x =snake[j+1].x;
                snake[j].y = snake[j+1].y;

            }

        }
    }else if(direction=='up'){
        for(let j=0;j<s_len;j++){
            if(j==s_len-1){
                snake[j].y = (snake[j].y-20)%H;
                snake[j].x = snake[j].x;
                if(snake[j].y<=0){
                    snake[j].y =snake[j].y+H;
                }

            }else{
                snake[j].x =snake[j+1].x;
                snake[j].y = snake[j+1].y;

            }
        }
    }
    contact()
}
function contact(obj1, obj2) {
    obj1=snake[s_len-1];
    obj2=food;
    var distX = Math.abs(obj1.x - obj2.x);
    var distY = Math.abs(obj1.y - obj2.y);
    if (distX <= size) {
        if (distY <= size) {
            p.setVisible(false);
            if(score%3==0){
                score+=10;
                score_text.setText(`Score: ${score}`);
                size=60;
                document.getElementById('food').style.height=size+'px';
                document.getElementById('food').style.width=size+'px';
                document.getElementById('food').style.animationName = 'bonus';
                p.setVisible(true);
                q = setInterval(function(){
                    val-=5;
                    document.getElementById('p').setAttribute('value',val);
                    console.log(val)
                    if(val==0){
                        clearInterval(q);
                        val=100;
                        food.setVisible(false)
                        food.x = Phaser.Math.Between(40,W-80);
                        food.y = Phaser.Math.Between(40,H-80);
                        setTimeout(function(){
                            food.setVisible(true);
                        },500);
                    }
                },100)


            }else{
                score+=1;
                score_text.setText(`Score: ${score}`);
                size=18
                document.getElementById('food').style.height=size+'px';
                document.getElementById('food').style.width=size+'px';
                document.getElementById('food').style.animationName = 'none';
                
            }
            food.setVisible(false)
            food.x = Phaser.Math.Between(40,W-80);
            food.y = Phaser.Math.Between(40,H-80);
            setTimeout(function(){
                food.setVisible(true);
            },500);
        }
    }
}
