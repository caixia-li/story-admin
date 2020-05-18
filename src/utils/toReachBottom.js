const toReachBottom = {
    isBottom: false,
    scroll: function (callback) {
        let timer = null;
        callback && window.addEventListener("scroll", scroll.bind(this));
        function scroll() {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                //滚动条滚动高度
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //页面高度
                const scrollHeight = document.documentElement.scrollHeight;
                //视图窗口高度
                const clientHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

                if (!this.isBottom && scrollTop + clientHeight > scrollHeight - 10) {
                    callback()
                    window.scrollTo(0, scrollTop - 50)
                }
            }, 1500)
        }
    },
    isEnd: function () {
        this.isBottom = true;
    }
}

module.exports = toReachBottom;