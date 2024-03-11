import React from "react";

async function getUser() {
  await new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, 900);
  });
  return { id: 1, name: "Bob" };
}

function App() {
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      const userFetched = await getUser();
      setUser(userFetched);
    }
    fetchUser();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search content"
      />
    </div>
  );
}

export default App;
