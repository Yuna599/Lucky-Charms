--- 
layout: base 
title: Snake 
permalink: /snake/ 
--- 
<html>

<head>
<meta charset="UTF-8">
<title>Through the silence</title>
<style type="text/css">
            @import url("https://fonts.googleapis.com/css?family=VT323");
            
            ::selection {color:#FFFFFF; background:transparent;}
            ::-moz-selection {color:#FFFFFF; background:transparent;}
            
            *{
                margin: 0;
                padding: 0;
                font-family: "VT323";
            }
            body{
                background-color: #000000;
            }
            .wrap{
                margin-left: auto;
                margin-right: auto;
            }
            header{
                width: 340px;
                font-size: 0;
            }
            canvas{
                display: none;
                border-style: solid;
                border-width: 10px;
                border-color: #FFFFFF;
            }
            canvas:focus{
                outline: none;
            }
            
            /* Top Styles */
            h1{
                display: inline-block;
                width: 100px;
                font-size: 32px;
                color: #FFFFFF;
            }
            .score{
                display: inline-block;
                width: 240px;
                font-size: 20px;
                color: #FFFFFF;
                text-align: right;
            }
            .score_value{
                font-size: inherit;
            }
            
            
            
            /* All screens style */
            #gameover a, #setting a, #menu a{
                display: block;
            }
       
            #gameover a, #setting a:hover, #menu a:hover{
                cursor: pointer;
            }
            
            #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
                content: ">";
                margin-right: 10px;
            }
            
            /* Menu Screen Style */
            #menu{
                display: block;
                width: 340px;
                padding-top: 95px;
                padding-bottom: 95px;
                font-size: 40px;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
                color: #FFF;
            }
            
            #menu h3{
                -webkit-animation: logo-ani 1000ms linear infinite;
                        animation: logo-ani 1000ms linear infinite;
                margin-bottom: 30px;
                
            }
            
            #menu a{
                font-size: 30px;
            }
            
            @-webkit-keyframes logo-ani{
               50%{-webkit-transform: scale(1.3,1.3);}
              100%{-webkit-transform: scale(1.0,1.0);}
            }

            @keyframes logo-ani{
               50%{transform: scale(1.3,1.3);}
              100%{transform: scale(1.0,1.0);}
            }
            
            
            /* Game Over Screen Style */
            
            #gameover{
                display: none;
                width: 340px;
                padding-top: 95px;
                padding-bottom: 95px;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
                font-size: 30px;
                color: #FFF;
            }
            
            #gameover p{
                margin-top: 25px;
                font-size: 20px;
            }
            
            /* Settings Screen Style */
            #setting{
                display: none;
                width: 340px;
                margin-left: auto;
                margin-right: auto;
                padding-top: 85px;
                padding-bottom: 85px;
                font-size: 30px;
                color: #FFF;
                text-align: center;
            }
            
            #setting h2{
                margin-bottom: 15px;
            }
            
            #setting p{
                margin-top: 10px;
            }
            
            #setting input{
                display:none;
            }
            
            #setting label{
                cursor: pointer;
            }
            
            #setting input:checked + label{
                background-color: #FFF;
                color: #000;
            }
</style>

<body>
<header class="wrap">
                <h1></h1>
                <p class="score">Score: <span id="score_value">0</span></p>
            </header>
            <canvas class="wrap" id="snake" width="320" height="320" tabindex="1"></canvas>
        
             <!-- Game Over Screen -->
            <div id="gameover">
                <h2>Game Over</h2>
                <p>press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin a</p>
                <a id="newgame_gameover">new game</a>
                <a id="setting_gameover">settings</a>
            </div>
        
            <!-- Setting screen -->
            <div id="setting">
                <h2>Settings</h2>
                
                <a id="newgame_setting">new game</a>
                
                <p>Speed:
                    <input id="speed1" type="radio" name="speed" value="120" checked/>
                    <label for="speed1">Slow</label>
                    <input id="speed2" type="radio" name="speed" value="75"/>
                    <label for="speed2">Normal</label>
                    <input id="speed3" type="radio" name="speed" value="35"/>
                    <label for="speed3">Fast</label>
                </p>
                
                <p>Wall:
              <input id="wallon" type="radio" name="wall" value="1" checked/>
             <label for="wallon">On</label>
             <input id="walloff" type="radio" name="wall" value="0"/>
            <label for="walloff">Off</label>
</p>

            </div>

            <!-- Main Menu Screen -->
            <div id="menu">
                <h3>Silent is gold</h3>

                <a id="newgame_menu">start</a>
                <a id="setting_menu">settings</a>
            </div>

	
	

<script type="text/javascript">

(function(){  
    /////////////////////////////////////////////////////////////
    
    // Canvas & Context
    var canvas;
    var ctx;
    
    // Snake
    var snake;
    var snake_dir;
   var snake_next_dir;
    var snake_speed;
    
    // Food
    var food = {x: 0, y: 0};
    
    // Score
    var score;
    
    // Wall
    var wall;
    
    // HTML Elements
    var screen_snake;
    var screen_menu;
    var screen_setting;
    var screen_gameover;
    var button_newgame_menu;
    var button_newgame_setting;
    var button_newgame_gameover;
    var button_setting_menu;
    var button_setting_gameover;
    var ele_score;
    var speed_setting;
    var wall_setting;
    
    /////////////////////////////////////////////////////////////

    var activeDot = function(x, y){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }
    
    
    /////////////////////////////////////////////////////////////

    var changeDir = function(key){
        
        if(key == 38 && snake_dir != 2){
            snake_next_dir = 0;
        }else{
        
        if (key == 39 && snake_dir != 3){
            snake_next_dir = 1;
        }else{
        
        if (key == 40 && snake_dir != 0){
            snake_next_dir = 2;
        }else{
            
        if(key == 37 && snake_dir != 1){
            snake_next_dir = 3;
        } } } }
        
    }
    
    /////////////////////////////////////////////////////////////

var addFood = function(){
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for(var i = 0; i < snake.length; i++){
            if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                addFood();
            }
        }
    }


    
    /////////////////////////////////////////////////////////////

    var checkBlock = function(x, y, _x, _y){
        return (x == _x && y == _y) ? true : false;
    }
    
    /////////////////////////////////////////////////////////////
    
    var altScore = function(score_val){
        ele_score.innerHTML = String(score_val);
    }
    
    /////////////////////////////////////////////////////////////

    var mainLoop = function(){
        
            var _x = snake[0].x;
            var _y = snake[0].y;
      snake_dir = snake_next_dir;

            // 0 - Up, 1 - Right, 2 - Down, 3 - Left
            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }

            snake.pop();
            snake.unshift({x: _x, y: _y});

        
        // --------------------

        // Wall
        
            if(wall == 1){
            // On
                if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10){
                    showScreen(3);
                    return;
                }
            }else{
            // Off
                for(var i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / 10);
                    }
                    if(snake[i].x == canvas.width / 10){
                        snake[i].x = snake[i].x - (canvas.width / 10);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / 10);
                    }
                    if(snake[i].y == canvas.height / 10){
                        snake[i].y = snake[i].y - (canvas.height / 10);
                    }
                }
            }
        
        // --------------------
    
        // Autophagy death
            for(var i = 1; i < snake.length; i++){
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                    showScreen(3);
                    return;
                }
            }
      
        // --------------------
        
      // Eat Food
            if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
                snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                score += 1;
                altScore(score);
                addFood();
                activeDot(food.x, food.y);
            }
        
        // --------------------

            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // --------------------

            for(var i = 0; i < snake.length; i++){
                activeDot(snake[i].x, snake[i].y);
            }
        
        // --------------------

            activeDot(food.x, food.y);
        
    // Debug
    //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;    

            setTimeout(mainLoop, snake_speed);
    }
    
    /////////////////////////////////////////////////////////////

    var newGame = function(){
        
        showScreen(0);
        screen_snake.focus();
      
        snake = [];
        for(var i = 4; i >= 0; i--){
            snake.push({x: i, y: 15});
        }
      
        snake_next_dir = 1;
        
        score = 0;
        altScore(score);
        
        addFood();
        
        canvas.onkeydown = function(evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();
                
    }
    
    /////////////////////////////////////////////////////////////
    
    // Change the snake speed...
    // 150 = slow
    // 100 = normal
    // 50 = fast
    var setSnakeSpeed = function(speed_value){
        snake_speed = speed_value;
    }
    
    /////////////////////////////////////////////////////////////
    var setWall = function(wall_value){
        wall = wall_value;
        if(wall == 0){screen_snake.style.borderColor = "#606060";}
        if(wall == 1){screen_snake.style.borderColor = "#FFFFFF";}
    }
     
    /////////////////////////////////////////////////////////////
    
    // 0 for the game
    // 1 for the main menu
    // 2 for the settings screen
    // 3 for the game over screen
    var showScreen = function(screen_opt){
        switch(screen_opt){
                
            case 0:  screen_snake.style.display = "block";
                     screen_menu.style.display = "none";
                     screen_setting.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;
                
            case 1:  screen_snake.style.display = "none";
                     screen_menu.style.display = "block";
                     screen_setting.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;
                
            case 2:  screen_snake.style.display = "none";
                     screen_menu.style.display = "none";
                     screen_setting.style.display = "block";
                     screen_gameover.style.display = "none";
                     break;
                
            case 3: screen_snake.style.display = "none";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_gameover.style.display = "block";
                    break;
        }
    }
        
    /////////////////////////////////////////////////////////////
        
    window.onload = function(){
        
        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");
               
            // Screens
            screen_snake = document.getElementById("snake");
            screen_menu = document.getElementById("menu");
            screen_gameover = document.getElementById("gameover");
            screen_setting = document.getElementById("setting");
        
            // Buttons
            button_newgame_menu = document.getElementById("newgame_menu");
            button_newgame_setting = document.getElementById("newgame_setting");
            button_newgame_gameover = document.getElementById("newgame_gameover");
            button_setting_menu = document.getElementById("setting_menu");
            button_setting_gameover = document.getElementById("setting_gameover");
        
            // etc
            ele_score = document.getElementById("score_value");
            speed_setting = document.getElementsByName("speed");
            wall_setting = document.getElementsByName("wall");
        
        // --------------------

        button_newgame_menu.onclick = function(){newGame();};
        button_newgame_gameover.onclick = function(){newGame();}; 
        button_newgame_setting.onclick = function(){newGame();}; 
        button_setting_menu.onclick = function(){showScreen(2);};
        button_setting_gameover.onclick = function(){showScreen(2)};

        setSnakeSpeed(150);
        setWall(1);

        showScreen("menu");
        
        // --------------------
        // Settings
        
            // speed
            for(var i = 0; i < speed_setting.length; i++){
                speed_setting[i].addEventListener("click", function(){
                    for(var i = 0; i < speed_setting.length; i++){
                        if(speed_setting[i].checked){
                            setSnakeSpeed(speed_setting[i].value);
                        }
                    }
                });
            }
        
            // wall
            for(var i = 0; i < wall_setting.length; i++){
                wall_setting[i].addEventListener("click", function(){
                    for(var i = 0; i < wall_setting.length; i++){
                        if(wall_setting[i].checked){
                            setWall(wall_setting[i].value);
                        }
                    }
                });
            }

        document.onkeydown = function(evt){
            if(screen_gameover.style.display == "block"){
                evt = evt || window.event;
                if(evt.keyCode == 32){
                    newGame();
                }
            }
        }
    }

})();


  </script>
	
<script>"use strict";var wprRemoveCPCSS=function wprRemoveCPCSS(){var elem;document.querySelector('link[data-rocket-async="style"][rel="preload"]')?setTimeout(wprRemoveCPCSS,200):(elem=document.getElementById("rocket-critical-css"))&&"remove"in elem&&elem.remove()};window.addEventListener?window.addEventListener("load",wprRemoveCPCSS):window.attachEvent&&window.attachEvent("onload",wprRemoveCPCSS);</script><script type="text/javascript">
  window._taboola = window._taboola || [];
  _taboola.push({article:'auto'});
  !function (e, f, u, i) {
    if (!document.getElementById(i)){
      e.async = 1;
      e.src = u;
      e.id = i;
      f.parentNode.insertBefore(e, f);
    }
  }(document.createElement('script'),
  document.getElementsByTagName('script')[0],
  '//cdn.taboola.com/libtrc/pythoncentral/loader.js',
  'tb_loader_script');
  if(window.performance && typeof window.performance.mark == 'function')
    {window.performance.mark('tbl_ic');}
</script><script type="text/javascript">
        window._taboola = window._taboola || [];
        _taboola.push({
          mode: 'thumbnails-b',
          container: 'taboola-below-article-thumbnails',
          placement: 'Below Article Thumbnails',
          target_type: 'mix'
        });
      </script><script type="text/javascript">
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});
  </script><noscript><link data-avlabs-exclude-css="1"  rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT%20Sans%7CLato%3A400%2C700%2C400italic%2C700italic%7COswald%3A400%2C700&display=swap" /><link data-avlabs-exclude-css="1"  rel="stylesheet" href="https://www.html5canvastutorials.com/wp-content/cache/min/1/e583fe5bd2c3dfdfa3de3994662a3d4c.css" media="all" data-minify="1" /><link data-avlabs-exclude-css="1"  rel="stylesheet" href="/libraries/codeMirror/lib/codemirror.css"></noscript>
  
  </body>      