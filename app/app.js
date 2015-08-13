$(function(){
     // test the todo api
    var todoapp = com.johngorter.todoapp.init(refreshlist);
    
    
    navigator.geolocation.getCurrentPosition(function(params){ alert('aha' + params.coords.latitude); }, function(){})
     function refreshlist (){
        $("#todos").text("");
        var todos = todoapp.getTodos(); 
        for (var todo in todos)
                $("<li>").text(todos[todo].title).addClass(todos[todo].local ? "local":"remote").click(function(){
                    var todo = todoapp.getTodoByTitle($(this).text());
                    $("#detail_title").text(todo.title);
                    $("#detail_description").text(todo.description); 
                }).appendTo("#todos"); 
    };
    

    // hook up our UI to backend
    $("#title").on("invalid", function(){
        $(this).addClass("invalid");
        $(this).next().text($(this)[0].validationMessage);
    });
    
    $("#title").on("keyup", function(){
        $(this).removeClass("invalid");
       // $("#title")[0].setCustomValidity($("#title").val() === "JOHNW" ? "User already exists" : "");
        $(this)[0].checkValidity();}
    );
   
    $("#btnSave").click(function(){
        if ($("#form")[0].checkValidity()) {
            $("input").removeClass("invalid");
            todoapp.addTodo(new com.johngorter.todoapp.Todo($("#title").val(), $("#description").val(), false, 1));
            refreshlist();
        }
        event.preventDefault();
        event.stopPropagation();
    });
    
    $("body").css('background-color', (navigator.onLine ? 'green' : 'red'));
    todoapp.setOnline(navigator.onLine, refreshlist);
    
    $(window).on('online', function() { $("body").css('background-color', (navigator.onLine ? 'green' : 'red'));
                 todoapp.setOnline(navigator.onLine, refreshlist);
                 } );
    $(window).on('offline', function() { $("body").css('background-color', (navigator.onLine ? 'green' : 'red'));
                 todoapp.setOnline(navigator.onLine, refreshlist);
                 } );
});
       
      
