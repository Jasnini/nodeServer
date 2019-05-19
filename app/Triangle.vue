<template>
  <div
    id="triangle"
    class="tri-container"
  >
    <h1>三角形类型判断</h1>
    <div>
      <form
        id="tri-info"
        class="form-inline"
      >
        a: <input
          id="a"
          v-model="len[0]"
          class="form-control"
          type="number"
          placeholder="请输入边长a的值"
          required
        >
        b: <input
          id="b"
          v-model="len[1]"
          class="form-control"
          type="number"
          placeholder="请输入边长b的值"
          required
        >
        c: <input
          id="c"
          v-model="len[2]"
          class="form-control"
          type="number"
          placeholder="请输入边长c的值"
          required
        ><br>
      </form>
    </div>
    <div>
      <button
        id="rand-tri"
        class="btn btn-primary"
        type="button"
        @click="randLength()"
      >
        随机生成
      </button>
      <button
        id="submit-form"
        class="btn btn-primary"
        @click="triangleType(len[0],len[1],len[2])"
      >
        检测结果
      </button><br>
    </div>

    <div class="triangle-answer">
      <div
        id="tri-result"
      >
        <strong>{{ message }}</strong>
      </div>
      <canvas
        id="tri-canvas"
        width="250px"
        height="200px"
      />
    </div>
  </div>
</template>

<script>
require('../static/styles/bootstrap.css');
export default({
    // name: 'Triangle',
    data() {
        return {
            len: ['', '', ''],
            message: ''
        };
    },
    methods: {
        triangleType(len1, len2, len3) {
            const a = parseInt(len1);
            const b = parseInt(len2);
            const c = parseInt(len3);
            if (this.checkLen(a, b, c) === false) {
                return -1;
            }
            const arr = [a, b, c];
            arr.sort((param1, param2) => param1 - param2);
            const l1 = arr[0];
            const l2 = arr[1];
            const l3 = arr[2];
            console.log(arr);
            if (l1 + l2 <= l3) {
                console.log('不能');
                this.message = `${len1},${len2},${len3}不能构成三角形`;
                this.paintATriangle(l1, l2, l3, 1);
                return -1;
            }
            let m = '';
            if (l1 * l1 + l2 * l2 > l3 * l3) {
                if (l1 === l2 && l2 === l3) {
                    m = `${len1},${len2},${len3}能构成等边三角形`;
                } else if (l1 === l2 || l2 === l3) {
                    m = `${len1},${len2},${len3}能构成锐角等腰三角形`;
                }
            }
            if (l1 * l1 + l2 * l2 > l3 * l3 && l1 !== l2) {
                m = `${len1},${len2},${len3}能构成锐角三角形`;
            }
            if (l1 * l1 + l2 * l2 < l3 * l3 && l1 === l2) {
                m = `${len1},${len2},${len3}能构成等腰钝角三角形`;
            }
            if (l1 * l1 + l2 * l2 < l3 * l3 && l1 !== l2) {
                m = `${len1},${len2},${len3}能构成钝角三角形`;
            }
            if (l1 * l1 + l2 * l2 === l3 * l3 && l1 === l2) {
                m = `${len1},${len2},${len3}能构成等腰直角三角形`;
            }
            if (l1 * l1 + l2 * l2 === l3 * l3 && l1 !== l2) {
                m = `${len1},${len2},${len3}能构成直角三角形`;
            }
            this.message = m;
            this.paintATriangle(l1, l2, l3, 0);
        },
        checkLen(a, b, c) {
            if (a >= 1 && a <= 100 &&
                    b >= 1 && b <= 100 &&
                    c >= 1 && c <= 100 &&
                    Math.floor(a) === a &&
                    Math.floor(b) === b &&
                    Math.floor(c) === c) {
                return true;
            } else {
                this.message = '';
                alert('输入有误，请重新输入1~100的整数');
                // debugger;
                return false;
            }
        },
        randLength() {
            const a = (Math.ceil(Math.random() * 100)).toString();
            const b = Math.ceil(Math.random() * 100).toString();
            const c = Math.ceil(Math.random() * 100).toString();
            this.len = [a, b, c];
        },
        paintATriangle(a, b, c, enable) {
            if (enable === 1) {
                const bg = document.getElementById('tri-canvas');
                const ctx = bg.getContext('2d');
                ctx.clearRect(0, 0, bg.width, bg.height);
                return -1;
            }

            const renderC = 150;
            const renderA = a / c * renderC;
            const renderB = b / c * renderC;

            const bg = document.getElementById('tri-canvas');
            const ctx = bg.getContext('2d');
            ctx.clearRect(0, 0, bg.width, bg.height);
            ctx.beginPath();
            // 绘制三角形
            const x = (renderA * renderA + renderC * renderC - renderB * renderB) / (2 * renderA);
            const y = Math.sqrt(renderC * renderC - x * x);
            const initX = 50;
            const initY = 30;
            ctx.moveTo(initX, initY);
            ctx.lineTo(renderA + initX, initY);
            ctx.lineTo(x + initX, y + initY);
            ctx.closePath();
            ctx.strokeStyle = '#000000'; // 以纯黑色描边
            ctx.stroke(); // 闭合形状并且以描边方式绘制出来

            // 绘制边长
            const a_x = renderA / 2 + initX;
            const a_y = initY - 15;
            const c_x = x / 2 + initX - 30;
            const c_y = y / 2 + initY;
            const b_x = (renderA + x) / 2 + initX + 30;
            const b_y = y / 2 + initY;

            ctx.fillStyle = '#f77d91'; // 以红色描边
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(a, a_x, a_y);
            ctx.fillText(b, b_x, b_y);
            ctx.fillText(c, c_x, c_y);
        }
    }

});

</script>

<style scoped>
	h1{
		color:rgb(247, 125, 145);
	}
	.tri-container{
		margin: 50px 20px ;
		max-height:650px;
		overflow-y:auto;
	}
	#tri-info{
		margin: 20px 0px;
	}
	.form-control{
		margin: 0 8px;
	}
	.form-control::-webkit-input-placeholder{
		font-size: 0.8rem ;
	}
	.form-control::-moz-input-placeholder{
		font-size: 0.8rem ;
	}
	.form-control::-ms-input-placeholder{
		font-size: 0.8rem ;
	}

	.btn-primary{
		margin: 30px 20px 0 0;
	}
  .triangle-answer {
  display: flex;
      border: 1px solid #888888;
      margin: 20px 0;
      padding: 20px 10px;
      width: 95%;
  }
	#tri-result{
		width: 400px;
		padding: 0 10px;
	}

  @media screen and (max-width:600px){
    .triangle-answer {
      border-color:transparent;
    }
  }
</style>
