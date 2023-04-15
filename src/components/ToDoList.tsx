import { ChangeEvent, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

interface newTodoType {
  text: string;
  id: number;
}

function ToDoList() {
  //입력받을 계획
  const [value, setValue] = useState<string>("");
  //계획을 담을 객체
  const [toDoArray, setToDoArray] = useState<newTodoType[]>([]);
  const TODOS_KEY = "todo";
  //배열에 담을 계획 객체

  const newTodoObj: newTodoType = {
    text: value,
    id: Date.now(),
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    //만약 계획이 공백이면 리턴
    if (value.trim() === "") {
      return;
    }

    setToDoArray((prevToDos) => {
      //prevToDos <= toDoArray
      const updatedToDos = [...prevToDos, newTodoObj];
      localStorage.setItem(TODOS_KEY, JSON.stringify(updatedToDos));
      return updatedToDos;
    });

    // 입력 초기화
    setValue("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const savedToDos = localStorage.getItem(TODOS_KEY);

  const deleteTodo = (todoID: number) => {
    const nowToDo = toDoArray.filter((toDo) => toDo.id !== todoID); // 새로운 nowToDo를 만들어 filter로 제외해준 toDoArray를 담아준다.
    setToDoArray(nowToDo);
    localStorage.setItem(TODOS_KEY, JSON.stringify(nowToDo)); //다시 덮어주는 역할
  };

  useEffect(() => {
    if (savedToDos !== null) {
      const parsedToDos = JSON.parse(savedToDos);
      setToDoArray(parsedToDos);
    }
  }, []);

  return (
    <div className="ToDoList">
      <form onSubmit={onSubmit} className="ToDoForm">
        <input
          type="text"
          placeholder="할 일을 적으세요!!"
          onChange={onChange}
          value={value}
          className="list_input"
        />
      </form>
      <ul className="list_contain">
        {toDoArray.map((todo) => (
          <li key={todo.id}>
            <h3 className="list">
              {todo.text}
              <span onClick={() => deleteTodo(todo.id)}>
                <span className="deleteIcon">
                  <BsFillTrashFill />
                </span>
              </span>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
