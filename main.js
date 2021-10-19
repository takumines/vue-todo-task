var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

new Vue({
    el: '#app',
    // データの初期値を宣言
    // data オプション直下のデータは後から追加ができないため
    data: {
        todos: []
    },
    watch: {
        todos: {
            // 引数はwatchしているプロパティの変更後の値
            handler: function (todos) {
                todoStorage.save(todos)
            },
            // deep オプションを trueにすることでネストしているデータも監視することができる
            deep: true
        }
    },
    // ライフサイクルのメソッドはmethodsの中に記述しない
    created() {
        // todoのインスタンス生成時に自動でfetch()を使いtodosを取得する
        this.todos = todoStorage.fetch()
    },
    methods: {
        doAdd: function (event, value) {
            // refで名前付けをした要素を参照
            var comment = this.$refs.comment
            console.log(comment.value);

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