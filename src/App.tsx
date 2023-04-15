import Clock from "./components/Clock";
import ToDoList from "./components/ToDoList";
import { useEffect, useState, ChangeEvent } from "react";
import "./css/App.css";

function App() {
  // 로그인 시작
  const USER_NAME_KEY = "username";
  const saveedUsername = localStorage.getItem(USER_NAME_KEY);
  const [login, setLogin] = useState<Boolean>(false);
  const [user, setUser] = useState<string>("");
  const [toDo, setToDo] = useState<Boolean>(true);
  useEffect(() => {
    document.body.style.backgroundImage = `url(./img/pexels-rachel-claire-4825701.jpg)`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    if (saveedUsername) {
      setLogin(true);
      setUser(saveedUsername);
    }
  }, []);

  const onSubmit = () => {
    localStorage.setItem(USER_NAME_KEY, user);
    setLogin(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  // 로그인 끝

  //로그아웃
  const logout = () => {
    localStorage.removeItem(USER_NAME_KEY);
    setUser("");
    setLogin(false);
  };
  //리스트보기
  const onList = () => {
    if (toDo) setToDo(false);
    else setToDo(true);
  };
  return (
    <div className="head">
      {login ? (
        <div className="user_contain">
          <h3 className="user">{user}</h3>
          <div onClick={logout} className="logout">
            로그아웃
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="이름"
            onChange={onChange}
            value={user}
          />
          <input type="submit" />
        </form>
      )}

      <Clock />

      {toDo ? (
        <div onClick={onList} className="listBtn">
          리스트보기
        </div>
      ) : (
        <div className="ToDoList_contain">
          <ToDoList />
          <div onClick={onList} className="listBtnClose">
            닫기
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
