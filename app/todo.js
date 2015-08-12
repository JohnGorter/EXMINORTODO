// implement the namespace pattern
// using an IIFE
var com;

(function(ns, document, window, undefined){
    // create the todoapp api
    
    // use the namespace pattern to fill the object with the appropriate functions...
    ns.init = function(){
        
        // use local state to keep track of todo items...
        var tododatabase = new Array();
        
        // use the prototype pattern to create todo class...
        ns.Todo = function(t, d, o, p) {
            this.title = t,
            this.description = d,
            this.done = o,
            this.priority = p
        }
        ns.Todo.prototype.markDone = function() { this._done = true; this._completiondate = Date.getDate()};
        
        // private internal guts and glory...
        function getTodoIndex(todo) {
            for (var i =0; i < tododatabase.length; i++)
                if (tododatabase[i].title === todo.title) 
                    return i;
            return -1;
        }
        
        function getTodoByTitleInternal(title) {
            for (var i =0; i < tododatabase.length; i++)
                if (tododatabase[i].title === title) 
                    return tododatabase[i];
            return null;
        }
        
        function addTodoInternal(todo) {
            if (todo instanceof ns.Todo)
                tododatabase.push(todo)
            else throw "parameter is not a Todo object";
        };
        
        function deleteTodoInternal(todo) {
            if (todo instanceof ns.Todo){
                var index = getTodoIndex(todo);
                if (index >= 0) tododatabase.splice(index,1);
                return (index >= 0);
            }
            else throw "parameter is not a Todo object";
        };
        function updateTodoInternal(todo) {
            if (todo instanceof ns.Todo)
                var index = getTodoIndex(todo);
                if (index >= 0) {
                    delete tododatabase[index];
                    tododatabase[index] = todo;
                }
            else throw "parameter is not a Todo object";
        };
        
        function getTodosInternal(){
            var arr = new Array;
            arr = Array.prototype.concat.apply(arr, tododatabase);
            return arr;
        }
        // use the revealing module pattern to return the api...
        return {
            addTodo: addTodoInternal,
            deleteTodo: deleteTodoInternal,
            updateTodo: updateTodoInternal,
            getTodos: getTodosInternal,
            getTodoByTitle: getTodoByTitleInternal
        }
    }
})((com = com || {}, com.johngorter = com.johngorter || {}, com.johngorter.todoapp = com.johngorter.todoapp || {} ), document, window);