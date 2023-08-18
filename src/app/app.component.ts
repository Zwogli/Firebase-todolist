import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos$: Observable<any>; // $ = kenzeichnet eine sich selbst updatende Variable, Observable = aktualiesiert Variable
  firestore: Firestore = inject(Firestore); // import Firestore
  todoText:string = '';

  constructor() {
    const itemCollection = collection(this.firestore, 'todos'); // greift im Firestore auf die gewünschte Sammlung zu
    this.todos$ = collectionData(itemCollection);

    /** aktualiesiert todolist */
    this.todos$.subscribe((newTodos) => {
      console.log('new todos ', this.todos$);
    })
  }

  addTodo(){
    console.log(this.todoText)
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), {name: this.todoText});
  }
}
