<template>
    <div  class="container">
        <input type="text" class="todo-input" placeholder="Quale task devi fare?" v-model="newTodo" @keyup.enter="addTodo"/>
        
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item"> 
            
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed">
                <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.completed }"> {{ todo.title }} </div>
                <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
            </div>
            
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div>
        </div>
        
        <div class="extra-container">
            <div>
                <label>
                    <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> 
                        Check All
                    </label>
                </div>
            <div> {{ remaining }} items left</div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
            </div>

            <div>
            <transition name="fade">
                <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
            </transition>
            </div>
        </div>

        </transition-group>
    </div>

</template>

<script>
export default {
  name: 'todo-list',
  data() {
      return{
        newTodo: '',
        idForTodo: 3,
        beforeEditCache: '',
        filter: 'all',
        todos: [
            {
                'id': 1,
                'title': 'andare a nuotare',
                'completed': false,
                'editing': false,
            },
            {
                'id': 2,
                'title': 'andare a sciare',
                'completed': false,
                'editing': false,
            }
        ]
      }

    },
    
    //La differenza tra computed e methods è che computed serve per comporre nuovi dati derivanti da altri dati senza mutare gli altri dati e devono sempre ritornare qualcosa
    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length
        },

        anyRemaining() {
            return this.remaining != 0 
        },
        
        todosFiltered() {
            if (this.filter == 'all'){
                return this.todos
            } else if (this.filter == 'active') {
                return this.todos.filter(todo => !todo.completed)
            } else if (this.filter == 'completed') {
                return this.todos.filter(todo => todo.completed)
            }

            return this.todos
        },

        showClearCompletedButton(){
            return this.todos.filter(todo => todo.completed).length > 0
        }
    },
 
    directives: {
        //direttiva custom per non cliccare 3 volte
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    
    methods: {
        /*
        aggiunfere documentazione
        */ 
        addTodo(){
            if(this.newTodo.trim().length == 0){
                return
            }
            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                complete: false,
                beforeEditCache: '',
            })

            this.newTodo = ''
            this.idForTodo++
        },

        editTodo(todo){
            this.beforeEditCache = todo.title
            todo.editing = true;
        },

        doneEdit(todo){
            if(todo.title.trim().length == 0){
                todo.title = this.beforeEditCache
            }
            todo.editing = false
        },

        cancelEdit(todo){
            todo.title = this.beforeEditCache
            todo.editing = false
        },

        removeTodo(index){
            this.todos.splice(index, 1)
        },

        checkAllTodos(){
            this.todos.forEach((todo) => todo.completed = event.target.checked)
        },

        clearCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    }
}
</script>


<style lang="scss">

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .container{
        max-width: 800px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-content: center;
        margin-top: 40px;
    }

    .todo-input{
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
        border-radius: 25px;
    }

    .todo-item{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item{
        cursor: pointer;
        margin-left: 14px;
        &hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label{
        padding: 18px;
        border: 1px solid white;
        margin-left: 12px;
    }
    
    .todo-item-edit{
        font-size: 24px;
        color: #2c3e58;
        margin-left: 12px;
        width: 100X;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 25px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        
        &:focus {
            outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }
    
    button {
        margin-right: 12px;
        font-size: 18px;
        background-color: white;
        appearance: none;
        border-radius: 25px;
        &:hover{
            background: lightgreen;
        }

        &:focus{
            outline: none;
        }
    }
    
    .active{
        background: lightgreen;
    }

    
    //Animation
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


</style>
