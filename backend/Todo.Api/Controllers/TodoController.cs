using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Todo.Api.Data;
using Todo.Api.Models;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _todoDbContext;

        public TodoController(TodoDbContext todoDbContext)
        {
            _todoDbContext = todoDbContext;
        }

        [HttpGet]
        [Route("{userId:Guid}")]
        public async Task<IActionResult> GetAllTodos([FromRoute]Guid userId)
        {
            if (_todoDbContext == null)
            {
                Console.WriteLine("DbContext is null.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }

            try
            {
                var todos = await _todoDbContext.Todos.Where(t=> t.UserId == userId).ToListAsync();
                Console.WriteLine("todos:\n", todos, "\n");
                return Ok(todos);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllTodos: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [HttpGet("bystatus/{userId:Guid}")]
        public async Task<IActionResult> GetTodosByStatus([FromQuery] TodoStatus status, [FromRoute] Guid userId)
        {
            // Query the database for TODOs with the specified status
            var todos = await _todoDbContext.Todos
                .Where(t => t.Status == status && t.UserId == userId)
                .ToListAsync();

            return Ok(todos);
        }


        [HttpPost]
        [Route("{userId:Guid}")]
        public async Task<IActionResult> AddToDo([FromBody] TodoModel todo, [FromRoute] Guid userId)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Invalid model state.");
                return BadRequest(ModelState);
            }

            try
            {
                todo.Id = Guid.NewGuid();
                todo.UserId = userId;
                _todoDbContext.Todos.Add(todo);
                await _todoDbContext.SaveChangesAsync();

                return Ok(todo);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddToDo: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, TodoModel todoUpdateRequest)
        {
            var todo = await _todoDbContext.Todos.FindAsync(id);

            if (todo == null || todoUpdateRequest == null)
                return NotFound();

            // Check if the todo is completed and the new status is not Done (2)
            if (todo.IsCompleted == true && todoUpdateRequest.Status != TodoStatus.Done)
            {
                todoUpdateRequest.IsCompleted = false;
            }

            todo.IsCompleted = todoUpdateRequest.IsCompleted;
            todo.Title = todoUpdateRequest.Title;
            todo.Description = todoUpdateRequest.Description;
            todo.Importance = todoUpdateRequest.Importance;
            todo.Status = todoUpdateRequest.Status;
            todo.EstimatedTime = todoUpdateRequest.EstimatedTime;
            todo.Category = todoUpdateRequest.Category;
            todo.CompletedDate = todoUpdateRequest.CompletedDate;

            await _todoDbContext.SaveChangesAsync();

            return Ok(todo);
        }


        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteTodoById(Guid id)
        {
            try
            {
                var todo = await _todoDbContext.Todos.FindAsync(id);

                if (todo == null)
                    return NotFound(); // Todo with the specified ID not found

                _todoDbContext.Todos.Remove(todo);
                await _todoDbContext.SaveChangesAsync();

                return Ok(todo);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteTodoById: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
    }
}
