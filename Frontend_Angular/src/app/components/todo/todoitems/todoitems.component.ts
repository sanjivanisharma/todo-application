import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todoitems',
  templateUrl: './todoitems.component.html',
  styleUrl: './todoitems.component.css'
})
export class TodoitemsComponent implements OnInit {
  @Input() todolist: any
  @Output() updatedItem = new EventEmitter<{ id: any, status: string }>()
  @Output() deletedItem = new EventEmitter()
  @Output() editedItem = new EventEmitter()

  constructor() { }

  ngOnInit(): void {}

  updateStatus(todo: any) {
    if(todo.status === "pending") {
      todo.status = "completed"
    } else {
      todo.status = "pending"
    }
    this.updatedItem.emit({id: todo.id, status: todo.status})
  }

  edit(todo: any) {
    this.editedItem.emit(todo)
  } 

  delete(id: any) {
    console.log(id)
    this.deletedItem.emit(id)
  }
}
