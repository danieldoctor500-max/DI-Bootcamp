export class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push({
            task,
            completed: false
        });
    }

    markComplete(taskNumber) {
        if (this.tasks[taskNumber]) {
            this.tasks[taskNumber].completed = true;
        }
    }

    listTasks() {
        this.tasks.forEach((task, index) => {
            const status = task.completed ? "Complete" : "Pending";

            console.log(`${index + 1}. ${task.task} - ${status}`);
        });
    }
}