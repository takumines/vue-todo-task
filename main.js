let STORAGE_KEY = 'todos-vuejs-demo'
let todoStorage = {
    fetch: function () {
        let todos = JSON.parse(
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
        todos: [],
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ],
        // 初期値を-1にして状態をすべてにする
        current: -1
    },
    // computed オプションはデータから別の新しいデータを作ることができる
    computed: {
        computedTodos: function () {
            return this.todos.filter(function (el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },

        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, {[b.value]: b.label})
            }, {})
        }
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
            let comment = this.$refs.comment
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
        },
        // 状態変更の処理
        doChangeState: function (item) {
            item.state = !item.state ? 1 : 0
        },
        // 削除処理
        doRemove: function (item) {
            // 削除対象のtodoのindexを取得
            let index = this.todos.indexOf(item)
            // spliceメソッドで第一引数に指定したindexを1つ削除する
            this.todos.splice(index, 1)
        }
    }
})