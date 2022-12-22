new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    fetch("/api/todo", {
      method: "get",
    })
      .then((res) => res.json())
      .then((todos) => {
        this.todos = todos.todos;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/todo", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          // console.log(todo);
          this.todos.push(todo);
          this.todoTitle = "";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeTodo(id) {
      fetch("/api/todo/" + id, {
        method: "delete",
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    completeTodo(id) {
      fetch("/api/todo/" + id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const i = this.todos.findIndex((d) => d.id === todo.id);
          this.todos[i].date = todo.date;
        })
        .catch((e) => console.log(e));
    },
  },
  filters: {
    capitalize(value) {
      console.log(value);
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value) {
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(value));
    },
  },
});
