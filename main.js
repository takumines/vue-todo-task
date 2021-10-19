new Vue({
    el: '#app',
    // データの初期値を宣言
    // data オプション直下のデータは後から追加ができないため
    data: {
        todos: []
    },
    methods: {
        doAdd: function (event, value) {
            // refで名前付けをした要素を参照
            var comment = this.$refs.comment

            if (!comment.value.length) {
                return
            }

            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })

            // フォーム要素の初期化
            comment.value = ''
        }
    }
})