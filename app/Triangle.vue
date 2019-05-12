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
      a<input
        id="a"
        v-model="len[0]"
        class="form-control"
        type="number"
        placeholder="请输入边长a的值"
        required
      >
      b<input
        id="b"
        v-model="len[1]"
        class="form-control"
        type="number"
        placeholder="请输入边长b的值"
        required
      >
      c<input
        id="c"
        v-model="len[2]"
        class="form-control"
        type="number"
        placeholder="请输入边长c的值"
        required
      >
      <button
        id="rand-tri"
        class="btn btn-primary"
        type="button"
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
      <div class="col-sm-6">
        <strong>{{ jg }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
// require('../static/styles/bootstrap.min.css');
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
        }
    }

});

</script>

<style scoped>
    .tri-container {
        margin: 20px;
        padding: 20px 20px;
        border: 1px solid #888888
    }

    #tri-info {
        margin: 20px 0;
    }

    .judge-triangle {
        margin: 20px 0;
    }

    .triangle-answer {
        border: 1px solid #888888;
        margin: 20px 0;
        padding: 30px 20px;
        width: 80%;
        height: 200px;
    }
</style>
