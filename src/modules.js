import './style.css';
import {view, controller} from './index';

export class Controller {
    model = {items: []}

    async getTodos() {
        await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
            headers: {
                "Content-type": "application/json: charset=YTF-8"
            }
        })
            .then(res => res.json())
            .then((todos) => this.model.items = todos)
    }

    async Init() {
        await this.getTodos();
        view.render()
    }

    addItem(item) {
        const list_item = {title: item, completed: false}
        this.model.items.push(list_item)
        console.log(list_item)
        document.getElementById("add-item").value = ""
        view.render()
    }

    completeItem(item_index) {
        this.model.items[item_index].completed = !this.model.items[item_index].completed
        console.log(this.model.items[item_index].completed)
        view.render()
    }

    deleteItem(item_index) {
        this.model.items.splice(item_index, 1)
        view.render()
    }
}

 export class View {
    constructor(model) {
        this.model = model;
    }

    clearToDoList() {
        let scope = document.createRange();
        scope.selectNodeContents(document.getElementById("list"));
        scope.deleteContents();
    }

    render() {

        this.clearToDoList();

        if (this.model.items.length) {

            const list = document.getElementById("list")

            for (let i = this.model.items.length - 1; i >= 0; i--) {
                console.log(this.model.items[i])

                const item = document.createElement('li');
                const span = document.createElement('span');
                const check = document.createElement('a');
                const cross = document.createElement('a');
                const iconCheck = document.createElement('i')
                const iconCross = document.createElement('i');

                item.className = "item"
                span.className = "item-text"

                check.className = "item-complete"
                cross.className = "item-delete"

                check.onclick = () => controller.completeItem(i);
                cross.onclick = () => controller.deleteItem(i);

                span.textContent = this.model.items[i].title

                if (this.model.items[i].completed) {
                    span.setAttribute("style", "text-decoration: line-through; color: #bbb")
                }

                iconCheck.setAttribute("class", "icon ion-md-checkmark")
                iconCheck.setAttribute("data-id", i)
                iconCross.setAttribute("class", "icon ion-md-trash")
                iconCross.setAttribute("data-id", i)

                check.appendChild(iconCheck)
                cross.appendChild(iconCross)
                item.appendChild(span)
                item.appendChild(check)
                item.appendChild(cross)
                list.appendChild(item);

                console.log('model: ', this.model.items)
            }
        }
    }

    addItem(e) {
        console.log('e: ', e)
        if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
            if (((document.getElementById("add-item").value !== "") && (document.getElementById("add-item").value !== " "))) {
                const item = document.getElementById("add-item").value;
                controller.addItem(item);
                return false;
            }
        }
    }
}


