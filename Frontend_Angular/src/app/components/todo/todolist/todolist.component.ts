import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { TodoformComponent } from '../todoform/todoform.component';
import { Todo } from '../../../shared/todo';
import { TodoService } from '../../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit, AfterViewChecked {
  public fComp !: TodoformComponent
  task !: string
  todo!: Todo[]
  errorMsg: string = "Loading Todos......"
  title: any = "Todo List"
  today: number = Date.now()
  completeTask: any
  pendingTask: any
  todoForm!: FormGroup

  constructor(private service: TodoService, private toastr: ToastrService, private userApi: UserService, private router: Router, private route: ActivatedRoute, private _element: ElementRef) {
    this.todoForm = new FormGroup({
      task: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)])
    })
  }

  ngOnInit(): void {
    this.getItems()
  }

  ngAfterViewChecked(): void {
    // console.log(this.todo)
  }

  getItems() {
    this.service.getTodoList().subscribe({
      next: (res: any) => {
        if (res.message === 'No todos found') {
          console.log('No todos')
        } else {
          this.todo = res
          this.completeTask = this.todo.filter(item => item.status === "completed")
          this.pendingTask = this.todo.filter(item => item.status === "pending")
          console.log(this.todo)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addTodoItem() {
    if (this.todoForm.valid) {
      console.log(this.todoForm.controls.task.value)
      this.service.addTodo({ task: this.todoForm.controls.task.value }).subscribe({
        next: (res: any) => {
          if (res.message === "Todo created successfully") {
            this.getItems()
            this.todoForm.reset()
            this.toastr.success(res.message)
          } else if (res.error) {
            this.toastr.success(res.error)
          }
        },
        error: (err) => console.log(err)
      })
    }
  }

  deleteTodoItem(id: any) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.service.deleteTodo(id).subscribe({
        next: (res: any) => {
          if (res.message === "Todo deleted successfully") {
            this.getItems()
            this.toastr.success(res.message)
          } else if (res.error) {
            this.toastr.success(res.error)
          }
        },
        error: (err) => console.log(err)
      })
    }
  }

  deleteAllCompletedTodoItems() {
    const completedTasks = this.todo.filter(item => item.status === "completed")
    if (completedTasks.length <= 0) {
      this.toastr.success("No Completed Items found")
    } else {
      this.service.deleteAllCompletedTodos().subscribe({
        next: (res: any) => {
          if (res.message === "Completed todos deleted successfully") {
            this.getItems()
            this.toastr.success(res.message)
          } else if (res.error) {
            this.toastr.success(res.error)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  updateTodoItem(todo: any) {
    this.service.updateTodo({ id: todo.id, task: todo.task }).subscribe({
      next: (res: any) => {
        if (res.message === "Todo updated successfully") {
          this.getItems()
          this.toastr.success(res.message)
        } else if (res.error) {
          this.toastr.success(res.error)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  changeStatus(todo: any) {
    this.service.changeTodoStatus(todo).subscribe({
      next: (res: any) => {
        if (res.message === "Todo status updated successfully") {
          this.getItems()
          this.toastr.success(res.message)
        } else if (res.error) {
          this.toastr.success(res.error)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onEditItem(todo: any) {
    this.fComp.tform.task = todo.task
    this.fComp.tform.id = todo.id
    this.fComp.onSubmitValue = false
    this.fComp.el.nativeElement.focus()
  }
}
