# CSS  and less

less编译可得到CSS

## Question

- -webkit-box-sizing: border-box;  chrome
- -moz-box-sizing：border-box;   Firefox

## CSS

flex
number/center/none/

display
box/inline/box-inline/flex

position :
static/relative/absolute/fixed

float: left/right

clear: left

overflow: auto

@media screen and (min-width:600px)

## CSS三种 @-规则

- @charset @import 元数据
- @media @document @supports条件信息 嵌套语句
- @font-face 描述性信息

## CSS的width和height

1. 元素分类
    - 行内非替换元素：没有height、width；只有line-height控制高度。padding和margin只有左右有用。
    - 块元素：有height、width、margin四个方向、padding四个方向
    - 行内可替换元素：有height、width、margin四个方向、padding四个方向

2. height 和 width

    - 正常情况，指内容的高度和宽度，不包括margin和padding

3. max-width 和min-width 可以限制width和height 的大小
    - 发生冲突 max-width会覆盖width，min-width会覆盖max-width

4. box-sizing: content-box(默认)  border-box(height和width包含了padding和border)

## CSS 使用技巧

1. margin-bottom 通常不能用来调整块级元素的位置。方法：将当前元素的父级元素 display: relative 当前元素 display:positive。然后设置bottom、top、left、right等属性值大小。

## CSS 单位 em、px、rem（IE不支持）

- 改变em大小的方法：结合 front-size 属性，父元素的frot-size 对子元素的em单位有效。可以通过em进行 弹性页面的设置
- rem也可以实现弹性布局，它是 相对于根元素的 font-size的大小。