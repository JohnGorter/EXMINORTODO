// implement the namespace pattern
// using an IIFE
var com;

(function(ns, document, window, undefined){
    // create the todoapp api
    
    // use the namespace pattern to fill the object with the appropriate functions...
    ns.init = function(callback){
        
        // use local state to keep track of todo items...
         var online = false;
         var tododatabase = new Array();
         
        if (window.localStorage['todos']) {
            if (online) {
                 $.ajax({url:'/todos', method:'GET', success: function(data){
                            tododatabase = data;
                            console.log("todos retrieved from server!!");
                            callback(); 
                        }});
            }else {
               tododatabase = JSON.parse(window.localStorage['todos']);
               window.setTimeout(function () { console.log("todos retrieved from LS!!"); callback()}, 500); 

            }
        }
        
        // use the prototype pattern to create todo class...
        ns.Todo = function(t, d, o, p) {
            this.title = t,
            this.description = d,
            this.done = o,
            this.priority = p
        }
        ns.Todo.prototype.markDone = function() { this._done = true; };
        
        // private internal guts and glory...
        function setOnlineInternal(b, callback) {
            online = b; 
            console.log("we are now " + (online ? "online" : "offline"));
            // sync our local todos to the server..... delete LS and get from server
            if (online) {
              for (var todo in tododatabase) {
                if (tododatabase[todo].local)
                   $.ajax({url:'/todos', method:'POST', contentType:'application/json', dataType:'json', data:JSON.stringify(tododatabase[todo]), success: function(){
                      console.log("todo added to server!!");
                    }});
              }
            
              $.ajax({url:'/todos', method:'GET', success: function(data){
                tododatabase = data;
                console.log("todos retrieved from server!!");
                window.localStorage['todos'] = JSON.stringify(tododatabase);
                callback();
              }});

            } else {
            
            
            }
            return online;
        }
    
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
            if (todo instanceof ns.Todo){
                tododatabase.push(todo)
                if (online) {
                  $.ajax({url:'/todos', method:'POST', contentType:'application/json', dataType:'json', data:JSON.stringify(todo), success: function(){
                      console.log("todo added to server!!");
                    }});
                } else {
                    todo.local = true;
                    window.localStorage['todos'] = JSON.stringify(tododatabase);
                    console.log("todo added to LS!!");
                }
            }
            else throw "parameter is not a Todo object";
        };
        
        function deleteTodoInternal(todo) {
            if (todo instanceof ns.Todo){
                var index = getTodoIndex(todo);
                if (index >= 0) {
                    tododatabase.splice(index,1);
                    if (online) {
                        $.ajax({url:'/todos/' + todo.title, method:'DELETE', success: function(){
                            console.log("todo deleted from server!!");
                        }});
                    } else {
                        window.localStorage['todos'] = JSON.stringify(tododatabase);
                        console.log("todo deleted from LS!!");
                    }
                }
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
                    window.localStorage['todos'] = JSON.stringify(tododatabase);
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
            setOnline: setOnlineInternal,
            addTodo: addTodoInternal,
            deleteTodo: deleteTodoInternal,
            updateTodo: updateTodoInternal,
            getTodos: getTodosInternal,
            getTodoByTitle: getTodoByTitleInternal
        }
    }
})((com = com || {}, com.johngorter = com.johngorter || {}, com.johngorter.todoapp = com.johngorter.todoapp || {} ), document, window);