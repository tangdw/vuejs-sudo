<template>
  <p>得分：{{ score }}<span class="newGame" @click="newGame">新游戏</span></p>
  <p class="option">操作：方向键控制 <span v-if="gameOver"> gameOver!!!!!! </span></p>  
  <div class="hello">
    <ul v-for="row in aBoard">
      <li v-for="cell in row" :style="{ left: cell.left + 'px', top: cell.top + 'px' }">
        <span v-if="cell.cover"
              :style="{ backgroundColor: aColor[Math.log2(cell.cover)-1], left: cell.coverLeft + 'px', top: cell.coverTop + 'px' }">
              {{ cell.cover }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
// 2048小游戏
// 构造数据结构
var aBoard = [];
for(let i=0; i<4; i++){
  aBoard[i] = []; //初始化  
  for(let j=0; j<4; j++){
    aBoard[i][j] = {};  //初始化
    aBoard[i][j].cover = 0;
    aBoard[i][j].left = 10 + 120 * j;
    aBoard[i][j].top = 10 + 120 * i;    
    aBoard[i][j].coverLeft = 0;
    aBoard[i][j].coverTop = 0;
  }
}
// 随机取数
var getNum = function(){
  return Math.random() > .5 ? 2 : 4;
}
// 判断是否结束
var isOver = function(aBoard){
  for(let i=0; i<4; i++){
    for(let j=0; j<4; j++){
      if(!aBoard[i][j].cover){
        return false;
      }
      if(j<3 && (aBoard[i][j].cover==aBoard[i][j+1].cover)){
        return false;
      }
      if(i<3 && (aBoard[i][j].cover==aBoard[i+1][j].cover)){
        return false;
      }
    }
  }
  return true;
}
// 向左移动   没加动画
var moveLeft = function(aBoard, iNow, jNow){
  // 判断左移路上有没有子
  function canMoveLeftTo(j) {
    for(let k=j+1; k<jNow; k++){
      if(aBoard[iNow][k].cover){
        return false;
      }
    }
    return true;
  }
  let nowItem = aBoard[iNow][jNow];
  for(let j=0; j<jNow; j++){
    let tempItem = aBoard[iNow][j];
    if(canMoveLeftTo(j)){
      if(!tempItem.cover){
        tempItem.cover = nowItem.cover;
        nowItem.cover = 0;
        return 0;
      }else if(tempItem.cover == nowItem.cover){
        tempItem.cover = nowItem.cover * 2;
        nowItem.cover = 0;
        return tempItem.cover;
      }
    }
  }
  return -1;  // 表示没有移动
}
// 向上移动   没加动画
var moveUp = function(aBoard, iNow, jNow){
  // 判断上移路上有没有子
  function canMoveUpTo(i) {
    for(let k=i+1; k<iNow; k++){
      if(aBoard[k][jNow].cover){
        return false;
      }
    }
    return true;
  }
  let nowItem = aBoard[iNow][jNow];
  for(let i=0; i<iNow; i++){
    let tempItem = aBoard[i][jNow];
    if(canMoveUpTo(i)){
      if(!tempItem.cover){
        tempItem.cover = nowItem.cover;
        nowItem.cover = 0;
        return 0;
      }else if(tempItem.cover == nowItem.cover){
        tempItem.cover = nowItem.cover * 2;
        nowItem.cover = 0;
        return tempItem.cover;
      }
    }
  }
  return -1;  // 表示没有移动
}
// 向右移动   没加动画
var moveRight = function(aBoard, iNow, jNow){
  // 判断右移路上有没有子
  function canMoveRightTo(j) {
    for(let k=j-1; k>jNow; k--){
      if(aBoard[iNow][k].cover){
        return false;
      }
    }
    return true;
  }
  let nowItem = aBoard[iNow][jNow];
  for(let j=3; j>jNow; j--){
    let tempItem = aBoard[iNow][j];
    if(canMoveRightTo(j)){
      if(!tempItem.cover){
        tempItem.cover = nowItem.cover;
        nowItem.cover = 0;
        return 0;
      }else if(tempItem.cover == nowItem.cover){
        tempItem.cover = nowItem.cover * 2;
        nowItem.cover = 0;
        return tempItem.cover;
      }
    }
  }
  return -1;  // 表示没有移动
}
// 向下移动   没加动画
var moveDown = function(aBoard, iNow, jNow){
  // 判断下移路上有没有子
  function canMoveDownTo(i) {
    for(let k=i-1; k>iNow; k--){
      if(aBoard[k][jNow].cover){
        return false;
      }
    }
    return true;
  }
  let nowItem = aBoard[iNow][jNow];
  for(let i=3; i>iNow; i--){
    let tempItem = aBoard[i][jNow];
    if(canMoveDownTo(i)){
      if(!tempItem.cover){
        tempItem.cover = nowItem.cover;
        nowItem.cover = 0;
        return 0;
      }else if(tempItem.cover == nowItem.cover){
        tempItem.cover = nowItem.cover * 2;
        nowItem.cover = 0;
        return tempItem.cover;
      }
    }
  }
  return -1;  // 表示没有移动
}
// 对象
export default {
  data() {
    return {
      score: 0,
      gameOver: false,
      aBoard: aBoard,
      aColor: ['#FFFFCC','#FFFF99','#FFFF66','#FFFF33','#FFFF00','#0000FF','#0000CC','#000099','#000066','#000033','#FFCCFF','#FF99FF',
      '#FF66FF','#FF33FF','#FF00FF','#FFCCCC','#FFCC99','#FFCC66','#FFCC33','#FFCC00']
    }
  },
  methods: {
    newGame(ev) {
      // 清空
      this.score = 0;
      this.gameOver = false;
      for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
          this.aBoard[i][j].cover = 0;
        }
      }
      // 开始生成两个
      for(let i=0; i<2; i++){
        this.getItem().cover = getNum();
      }
    },
    getItem() {
      let aSure = [];
      for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
          if(!this.aBoard[i][j].cover){
            aSure.push(this.aBoard[i][j]);
          }
        }
      }
      return aSure.length ? aSure[Math.floor( Math.random() * aSure.length )] : null;
    }
  },
  ready() {
    document.onkeydown = ev=>{
      let getScore = 0;
      let isMove = false;
      // 顺序
      if(ev.keyCode==37 || ev.keyCode==38){
        for(let i=0; i<4; i++){
          for(let j=0; j<4; j++){
            if(this.aBoard[i][j].cover){
              if(ev.keyCode==37){
                getScore = moveLeft(this.aBoard, i, j);
              }
              if(ev.keyCode==38){
                getScore = moveUp(this.aBoard, i, j);
              }
              if(getScore!=-1){
                this.score += getScore;
                isMove = true
              }
            }
          }
        }
      }
      // 逆序
      if(ev.keyCode==39 || ev.keyCode==40){
        for(let i=3; i>=0; i--){
          for(let j=3; j>=0; j--){
            if(this.aBoard[i][j].cover){
              if(ev.keyCode==39){
                getScore = moveRight(this.aBoard, i, j);
              }
              if(ev.keyCode==40){
                getScore = moveDown(this.aBoard, i, j);
              }
              if(getScore!=-1){
                this.score += getScore;
                isMove = true
              }
            }
          }
        }        
      }
      if(isMove){
        this.getItem().cover = getNum();
        if(isOver(this.aBoard)){
          this.gameOver = true;
        }
      }
    }
  }
}
</script>

<style scoped>
.newGame {
  display: inline-block;
  font: 14px/14px "微软雅黑";
  padding: 8px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #5E8F74;
  color: #fff;
  cursor: pointer;
}
.newGame:hover{
  background-color: #12DB73;
}
.option {
  text-indent: 200px;
  font: 12px/12px "微软雅黑";
}
.option>span {
  color: red;
}
.hello{
  width: 480px;
  height: 480px;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  background-color: #B8AF9E;
}
.hello li{
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #CCC0B2;
  border-radius: 4px;
  position: absolute;
}
.hello li span{
  display: inline-block;
  width: 100%;
  height: 100%;
  font: 30px/100px "微软雅黑";
  position: absolute;
  z-index: 100;
}
</style>
