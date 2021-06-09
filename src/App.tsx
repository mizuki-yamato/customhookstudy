import "./styles.css";
import { UserCard } from "./components/UserCard";
import { UserProfile } from "./types/UserProfile";
import axios from "axios";
import { User } from "./types/api/user";
import { useState } from "react";

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    setLoading(true);
    setError(false);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city} ${user.address.suite} ${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p>データ取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...★くるくるにした方がよい</p>
      ) : (
        <>
          {userProfiles?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
