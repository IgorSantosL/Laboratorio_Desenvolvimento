import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

export default function UserManager() {
  const { getUsers, addUser, removeUser } = useUsers();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) return;

    addUser({
      id: Date.now(),
      name: name.trim(),
    });

    setName('');
  };

  const handleAddFakeUser = () => {
    addUser({
      id: Date.now(),
      name: `Usuário ${getUsers.length + 1}`,
    });
  };

  return (
    <section className="card">
      <h2>Gerenciar Usuários</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="actions">
          <button type="submit">Cadastrar usuário</button>
          <button type="button" onClick={handleAddFakeUser}>
            Adicionar usuário fictício
          </button>
        </div>
      </form>

      <h3>Usuários cadastrados</h3>

      <ul>
        {getUsers.map((user) => (
          <li key={user.id} className="list-item">
            <span>{user.name}</span>
            <button onClick={() => removeUser(user.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </section>
  );
}