class Snakegame{
    constructor(){
        this.canvas= document.getElementById('game');
        this.context=this.canvas.getContext('2d');
        document.addEventListener('keydown',this.onKeyPress.bind(this));
    }
    init(){
        this.payda=1000;
        this.positionX = this.positionY = 10;
        this.appleX = this.appleY = 5;
        this.tallSize = 5;
        this.trail = [];
        this.gridSize = this.tileCount = 21;
        this.velocityX=this.velocityY=0;

        this.timer=setInterval(this.loop.bind(this), 100000/this.payda);

    }
    loop(){
        this.update();
        this.draw();

    }
    reset(){
        clearInterval(this.timer);
        this.init();
    }
    update(){
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if(this.positionX < 0 ){
            this.positionX = this.tileCount - 1 ;

        }
        if(this.positionY < 0 ){
            this.positionY = this.tileCount - 1 ;

        }
        if(this.positionX > this.tileCount - 1 ){
            this.positionX = 0;

        }
        if(this.positionY > this.tileCount - 1 ){
            this.positionY = 0;

        }
        this.trail.forEach(t => {
            if(this.positionX === t.positionX && this.positionY === t.positionY  ){
                this.reset();
            }
        });
        this.trail.push({ positionX: this.positionX , positionY: this.positionY});

        while(this.trail.length > this.tallSize){
            this.trail.shift();
        }
        if(this.appleX === this.positionX && this.appleY === this.positionY){
            let x = true;
            this.tallSize++;
            this.payda += 5 ;
                
            this.appleX=Math.floor(Math.random() * this.tileCount);
            this.appleY=Math.floor(Math.random() * this.tileCount);  
                    
                  this.trail.forEach(t => {
                         if(this.appleX === t.positionX && this.appleY === t.positionY  ){
                                    console.log("ssssssssssss");
                                  this.appleX=Math.floor(Math.random() * this.tileCount);// bu kısım snake üzerinde yem çıkmaması içni 
                                  this.appleY=Math.floor(Math.random() * this.tileCount);                                               
                          }
                    });
               

             if((this.tallSize%5)===0){
                setTimeout(() => {
                    alert("helal"); 
                }, 200); 
             }
             clearInterval(this.timer);
             this.timer=setInterval(this.loop.bind(this), 100000/this.payda);
             console.log(this.payda);
                
        }

    }
    draw(){
        this.context.fillStyle='black';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.context.fillStyle='white';
        this.context.font='20px Arial';
        this.context.fillText(this.tallSize - 5 ,20,40); 

        this.context.fillStyle='blue';
        this.trail.forEach(t=>{
            this.context.fillRect(t.positionX * this.gridSize,t.positionY*this.gridSize  ,this.gridSize-1,this.gridSize-1);
        });

        this.context.fillStyle='purple';
        this.context.fillRect(this.appleX * this.gridSize,this.appleY*this.gridSize  ,this.gridSize-1,this.gridSize-1);

    }
    onKeyPress(e){
        if(e.keyCode === 37 && this.velocityX !== 1){
            this.velocityX = -1 ;
            this.velocityY = 0 ;

        }
        if(e.keyCode === 38 && this.velocityy !== 1){
            this.velocityX = 0 ;
            this.velocityY = -1 ;
            
        }
        if(e.keyCode === 39 && this.velocityX !== -1){
            this.velocityX = 1 ;
            this.velocityY = 0 ;
            
        }
        if(e.keyCode === 40 && this.velocityY !== -1){
            this.velocityX = 0 ;
            this.velocityY = 1 ;
            
        }
    }
}
const game = new Snakegame();
window.onload=()=>game.init();