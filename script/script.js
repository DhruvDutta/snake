let snake={};
let food;
let s_len=3;
let direction;
let pointer;
let config={
    width:window.innerWidth-8,
    height:window.innerHeight-8,
    parent:'page',
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
    setInterval(move,150)
    this.input.keyboard.on('keydown-' + 'UP', up);
    this.input.keyboard.on('keydown-' + 'RIGHT', right);
    this.input.keyboard.on('keydown-' + 'DOWN', down);
    this.input.keyboard.on('keydown-' + 'LEFT', left);
    this.input.on('pointerdown',slide,this);


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
                direction='right';
            }else{
                direction='left';
            }
        }else{
            if(y2-y1>0){
                direction='up'
            }else{
                direction='down';
            }
        }
    },500)

}
function down(){
    direction='down';
    setTimeout(function(){
        snake[s_len-1].angle = 90;
    },100)
}
function right(){
    direction='right';
    setTimeout(function(){
        snake[s_len-1].angle = 0;
    },100)
}
function up(){
    direction='up';
    setTimeout(function(){
        snake[s_len-1].angle = -90;
    },100)
}
function left(){
    direction='left';
    setTimeout(function(){
        snake[s_len-1].angle = 180;
    },100)
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
}