
// add some unit testing to our page..
QUnit.test("test the todo app", function( assert ) {
  var todoapp = com.johngorter.todoapp.init();
 
  todoapp.addTodo(new com.johngorter.todoapp.Todo("test", "description", false, 1));
  var todo = todoapp.getTodoByTitle("test");
  assert.ok( todo.title == "test", "Add the todo to the database" );

  todoapp.deleteTodo(todo); 
  todo = todoapp.getTodoByTitle("test");
  assert.ok( todo == "null", "Delete the todo from the database" );
  
  //assert.throws(todoapp.addTodo({}), function() { return true;}, "error thrown!");
});