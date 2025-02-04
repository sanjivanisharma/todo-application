import { Component, ElementRef, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrl: './todoform.component.css'
})
export class TodoformComponent implements OnInit {
  @ViewChild('task', { read: ElementRef }) el!: ElementRef<HTMLInputElement>
  @Output() todoItemCreated = new EventEmitter<{ task: string }>()
  @Output() todoItemEdited = new EventEmitter<object>()

  task!: string
  onSubmitValue: boolean = true
  tform: any = {
    id: '',
    task: '',
    status: 'pending'
  }

  constructor() {}

  ngOnInit(): void {
      
  }

  onSubmit(todo: any) {
    this.el.nativeElement.focus()
    this.todoItemCreated.emit({task: todo.task})
  }

  edit(todo: any) {
    this.todoItemEdited.emit({id: this.tform.id, task: todo.task, status: this.tform.status})
  }
}
