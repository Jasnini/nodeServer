(function useRem() {
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            // 基准大小
            var baseSize = 18;
            var clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            // 当前页面宽度相对于375宽的缩放比例，可根据自己需要修改。
            // 设置页面根节点字体大小
            if (clientWidth > 700) { docEl.style.fontSize = baseSize * (clientWidth / 1280) + 'px'; }
        };
    if (document.addEventListener === undefined) return;
    window.addEventListener(resizeEvt, recalc, false);
    recalc();
})();
