import React, { useState, useEffect } from 'react';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
      setUsers(data.slice(0, 5)); // 只显示前5个用户
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript + GitHub Pages</h1>
        <p>这是一个部署在GitHub Pages上的React TypeScript应用</p>
        
        <div className="counter-section">
          <h2>计数器</h2>
          <p>当前计数: {count}</p>
          <button onClick={() => setCount(count + 1)}>
            增加
          </button>
          <button onClick={() => setCount(count - 1)}>
            减少
          </button>
          <button onClick={() => setCount(0)}>
            重置
          </button>
        </div>

        <div className="users-section">
          <h2>用户列表</h2>
          {loading ? (
            <p>加载中...</p>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={fetchUsers} disabled={loading}>
            刷新用户列表
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;