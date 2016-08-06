<template>	
  <div id="app">
  	<h2>
  		<span>数独-vue.js</span>
  	</h2>
		<p>难度级别: 
			<select v-model="level">
				<option v-for="val in 10" :value="val">{{ val }}</option>
			</select>
			<button @click="init">重置</button>
  		<span class="winText" v-show="isWin">你赢了，你真棒！！！！</span>
		</p>
		<div class="borad">
			<ul v-for="( rowIndex, row ) in numData">
				<li v-for="( cellIndex, cell ) in row">
					<input v-model="cell.num" 
						:name="rowIndex + '-' + cellIndex" 
						:value="cell.num" 
						:disabled="!cell.enabled"
						:class= "{ 'error': cell.error }"
						@keyup.prevent="changeH"
						maxlength="1">
				</li>
			</ul>
		</div>
		<p>难度级别0-9逐渐变高，重置重新开始。数独规则见百度。O(∩_∩)O~</p>
		<p>vue.js小试牛刀，线上是打包版本。开发版：<a href="https://github.com/tangdw" target="_blank">戳我</a>求星星，(づ￣ 3￣)づ</p>
  </div>
</template>

<script>
// 构造数据
function createData(level) {	
	// 一个数独
	var numData = [
				[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
				[ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
				[ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
				[ 2, 3, 4, 5, 6, 7, 8, 9, 1 ],
				[ 5, 6, 7, 8, 9, 1, 2, 3, 4 ],
				[ 8, 9, 1, 2, 3, 4, 5, 6, 7 ],
				[ 3, 4, 5, 6, 7, 8, 9, 1, 2 ],
				[ 6, 7, 8, 9, 1, 2, 3, 4, 5 ],
				[ 9, 1, 2, 3, 4, 5, 6, 7, 8 ]
			];
	// 构造数据结构
	var aObjData = [];
	for(let i=0; i<9; i++){
		aObjData[i] = [];
		for(let j=0; j<9; j++){
			aObjData[i][j] = {};
			aObjData[i][j].num = numData[i][j];
			aObjData[i][j].enabled = false;
			aObjData[i][j].error = false;
		}
	}
	// 打乱算法：取出每一行的每一元数和比他序号大的同行元素作为一组待互相交换的组遍历数组所有元素进行交换。 
  for(let i=0; i<9; i++){
  	// 取一组数
    var n1 = aObjData[0][i].num;
    var n2 = aObjData[0][ Math.floor( Math.random() * ( 9 - i ) + i ) ].num;
    if( n1!=n2 ){
      for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
        	// 交换
        	let temp = aObjData[i][j].num;
          let value = ( temp==n1 ) ? n2 : ( temp==n2 && n1);        
          value && (aObjData[i][j].num = value);
        }
      }
    }    
  }
  // 难度级别决定去除的多少
  for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
      if( Math.random() * 10 < level ){
        aObjData[i][j].num = '';
        aObjData[i][j].enabled = true;
      }
    }
  }
  // 返回
	return aObjData;
}
// 模块
export default {
	data() {
		return {
			level: 6,
			numData: createData(6),
			isWin: false
		}
	},
	methods: {
		init() {
		  this.numData = createData(this.level);
		  this.isWin = false;
		},
		changeH(ev) {
			var row = ev.target.name.split('-')[0];
			var cell = ev.target.name.split('-')[1];
			var nowGird = this.numData[row][cell];
			if( ev.keyCode > 48 && ev.keyCode < 58 ){
				// 列上有无重复
				for( let i=0; i<9; i++ ){
					if( this.numData[row][i].num==nowGird.num && i!=cell ) {
						nowGird.error = true;
						return;
					}
				}
				// 行上有无重复
				for( let i=0; i<9; i++ ){
					if( this.numData[i][cell].num==nowGird.num && i!=row ) {
						nowGird.error = true;
						return;
					}
				}
				// 九格上有无重复
				let rowStart = Math.floor( row / 3 ) * 3;
				let cellStart = Math.floor( cell / 3 ) * 3;
				for( let i=rowStart; i<rowStart+3; i++ ){
					for( let j=cellStart; j<cellStart+3; j++ ){
						if( this.numData[i][j].num==nowGird.num && i!=row && j!=cell ){
							nowGird.error = true;
							// this.numData[i][j].error = true;
							return;
						}
					}
				}
				// 正常
				nowGird.error = false;
				// 填完且无错误
				if( this.checkAll() ){
					this.isWin = true;
				}
			} else if( ev.keyCode==8 ){
				// 回退 正常
				nowGird.error = false;
			} else if( ev.keyCode > 64 && ev.keyCode < 91 || ev.keyCode==48 ){
				// 字母或0 错误
				nowGird.error = true;
			}
		},
		checkAll() {
			for( let i=0; i<9; i++ ){
				for( let j=0; j<9; j++ ){
					if( !this.numData[i][j].num || this.numData[i][j].error ){
						return false;
					}
				}
			}
			return true;
		}
	}
}
</script>

<style scoped>
	/*重置*/
	ul { margin: 0; padding: 0; }
	li { list-style: none; }
	button { cursor: pointer; }
	#app { font-size: 12px; font-family: '微软雅黑';display: inline-block;}
	/*请浮动*/
	ul { zoom: 1; }
	ul:after { content: ''; display: block; clear: both;}
	#app h2{ text-align: center; }
	/*格子*/
	#app .borad { border: 1px solid darkgrey; display: inline-block; }
	#app .borad ul:nth-of-type(3), #app .borad ul:nth-of-type(6){border-bottom: 1px solid #FF9800;}
	#app .borad ul li:nth-of-type(3), #app .borad ul li:nth-of-type(6){border-right: 1px solid #FF9800;}
	#app .borad li { float: left;}
	input { width: 40px; height: 40px; text-align: center;}
	.error { background-color: red; }
	#app .winText{ color: green; font-size: 16px; }
</style>
