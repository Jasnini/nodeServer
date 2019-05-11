<template>
    <div id="container">
        <input id="check" type="checkbox" :checked="state" @change="$emit(`state-change`)" />
        <span id="item" >
            <div
                :contenteditable="editable"
                v-focus="focusState"
                @dblclick="changeEdit()"
                id="itemin"
                :class="classt"
                ref="content1"
                @keydown.enter.prevent="blurInput()"
                @blur="blur()"
            >
                {{ item }}
            </div>
            <button id="del" contenteditable=false @click="$emit(`del-thing`)">&#10007;</button>
        </span>
    </div>
</template>

<script>
export default {
  'name': 'todoItem',

  'props': {
    'item': String,
    'classt': String,
    'state': Boolean
  },

  data() {
    return {
      'content1': '',
      'editable': false,
      'focusState': false
    };
  },

  'methods': {
    blurInput() {
      this.$refs.content1.blur();
      this.editable = false;
    },

    blur() {
      this.$emit('input', this.$refs.content1.innerText);
      this.editable = false;
    },

    changeEdit() {
      this.editable = true;
      //this.$nextTick(()=>{this.$refs.content1.focus();});//nextTick()避免 元素还没有渲染完成进行focus操作会出错！！！
      this.focusState = true;
    }
  },

  'directives': {
    'focus': {
      update(el, {value}) {
        if (value) {
          el.focus();
          var range = window.getSelection(); //创建range

          range.selectAllChildren(el); //range 选择obj下所有子内容
          range.collapseToEnd(); //光标移至最后
        }
      }
    }
  }
};
</script>