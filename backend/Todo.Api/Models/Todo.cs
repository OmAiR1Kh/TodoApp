namespace Todo.Api.Models
{
    public enum TodoStatus
    {
        ToDo,
        InProgress,
        Done
    }

    public enum Importance
    {
        LOW,
        MEDIUM,
        HIGH
    }
    public class TodoModel
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public string Title { get; set; }
        public Importance Importance { get; set; } = Importance.MEDIUM;
        public DateTime CreatedDate { get; set; }
        public bool IsCompleted { get; set; }
        public Guid UserId { get; set; }
        public TodoStatus Status { get; set; } = TodoStatus.ToDo;
        public DateTime? CompletedDate { get; set; }
        public int EstimatedTime { get; set; }
        public string? Category { get; set; }
    }
}