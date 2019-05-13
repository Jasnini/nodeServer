<template>
  <div
    id="triangle"
    class="tri-container"
  >
    <h1>三角形类型判断</h1>
    <form
      id="tri-info"
      class="form-inline"
    >
      a <input
        id="a"
        v-model="len[0]"
        class="form-control"
        type="number"
        placeholder="请输入边长a的值"
        required
      >
      b <input
        id="b"
        v-model="len[1]"
        class="form-control"
        type="number"
        placeholder="请输入边长b的值"
        required
      >
      c <input
        id="c"
        v-model="len[2]"
        class="form-control"
        type="number"
        placeholder="请输入边长c的值"
        required
      ><br>
      <button
        id="rand-tri"
        class="btn btn-primary"
        type="button"
        @click="randLength()"
      >
        随机生成
      </button>
      <div class="judge-triangle">
        <button
          id="submit-form"
          class="btn btn-primary"
          @click="triangleType(len[0],len[1],len[2])"
        >
          检测结果
        </button><br>
      </div>
    </form>

    <div class="triangle-answer">
      <div
        id="tri-result">
        <strong>{{ jg }}</strong>
      </div>
      <canvas
        id="tri-canvas"
        width="150"
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
            jg: ''
        };
    },
    methods: {
        triangleType(l11, l21, l31) {
            const l1 = parseInt(l11);
            const l2 = parseInt(l21);
            const l3 = parseInt(l31);
            if (this.checkLen(l1, l2, l3) === false) {
                return -1;
            }
            const arr = [l1, l2, l3].sort();
            if (arr[0] + arr[1] <= arr[2]) {
                this.jg = `${l1},${l2},${l3}不能构成三角形`;
                this.paintATriangle(l1, l2, l3, 1);
                return -1;
            }
            let m = '';
            if (l1 * l1 + l2 * l2 > l3 * l3) {
                if (l1 === l2 && l2 === l3) {
                    m = `${l1},${l2},${l3}能构成等边三角形`;
                } else if (l1 === l2 || l2 === l3) {
                    m = `${l1},${l2},${l3}能构成锐角等腰三角形`;
                }
            }
            if (l1 * l1 + l2 * l2 > l3 * l3 && l1 !== l2) {
                m = `${l1},${l2},${l3}能构成锐角三角形`;
            }
            if (l1 * l1 + l2 * l2 < l3 * l3 && l1 === l2) {
                m = `${l1},${l2},${l3}能构成等腰钝角三角形`;
            }
            if (l1 * l1 + l2 * l2 < l3 * l3 && l1 !== l2) {
                m = `${l1},${l2},${l3}能构成钝角三角形`;
            }
            if (l1 * l1 + l2 * l2 === l3 * l3 && l1 === l2) {
                m = `${l1},${l2},${l3}能构成等腰直角三角形`;
            }
            if (l1 * l1 + l2 * l2 === l3 * l3 && l1 !== l2) {
                m = `${l1},${l2},${l3}能构成直角三角形`;
            }
            this.jg = m;
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
                this.jg = '';
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
            const coefficient = Math.pow((a + b + c) / 150, 0.9);
            const a_ct = a / coefficient;
            const b_ct = b / coefficient;
            const c_ct = c / coefficient;

            const bg = document.getElementById('tri-canvas');
            const ctx = bg.getContext('2d');
            ctx.clearRect(0, 0, bg.width, bg.height);
            ctx.beginPath();
            // 绘制三角形
            const x = (a_ct * a_ct + c_ct * c_ct - b_ct * b_ct) / (2 * a_ct);
            const y = Math.sqrt(c_ct * c_ct - x * x);
            ctx.moveTo(50, 50);
            ctx.lineTo(a_ct + 50, 50);
            ctx.lineTo(x + 50, y + 50);
            ctx.closePath();
            ctx.strokeStyle = '#000000'; // 以纯黑色描边
            ctx.stroke(); // 闭合形状并且以描边方式绘制出来

            // 绘制边长
            const a_x = a_ct / 2 + 50;
            const a_y = 30;
            const b_x = x / 2 + 100;
            const b_y = y / 2 + 50;
            const c_x = (a_ct + x) / 2;
            const c_y = y / 2 + 50;

            ctx.fillStyle = '#000'; // 以纯黑色描边
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
		font-size:2rem;
	}
	.tri-container{
		margin: 50px 20px !important;
		max-height:650px;
		overflow-y:auto;
	}
	#tri-info{
		margin: 50px 0px !important;
	}
	.form-control{
		margin: 0 8px 0 2px;
	}
	.form-control::-webkit-input-placeholder{
		font-size: 0.8rem !important;
	}
	.form-control::-moz-input-placeholder{
		font-size: 0.8rem !important;
	}
	.form-control::-ms-input-placeholder{
		font-size: 0.8rem !important;
	}

	.btn-primary{
		margin: 30px 20px 0 0;
	}
    .triangle-answer {
		display: flex ;
        border: 1px solid #888888;
        margin: 20px 0;
        padding: 30px 5px;
        width: 95%;
        height: 200px;
    }
	#tri-result{
		width: 400px;
		padding: 0 10px;
	}
</style>
