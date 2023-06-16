<script>
  import { currentUser, pb } from "./pocketbase";

  let username;
  let password;

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: "",
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <p class="signed-in">
    Signed in as @{$currentUser.username}
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
  <div class="login-form">
    <form on:submit|preventDefault>
      <div id="inputs">
        <input
          placeholder="Username"
          type="text"
          id="username"
          bind:value={username}
          maxlength="20"
          required
        />

        <input
          placeholder="Password"
          type="password"
          id="password"
          bind:value={password}
          minlength="8"
          required
        />
      </div>
      <div id="buttons">
        <button on:click={login}>Login</button>
        <button on:click={signUp}>Sign Up</button>
      </div>
    </form>
  </div>
{/if}

<style>
  p {
    color: white;
    font-family: "Arial", cursive;
    font-size: 2em;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  #inputs {
    display: flex;
    gap: 10px;
  }

  #buttons {
    display: flex;
    gap: 10px;
  }

  button {
    background-color: #424549;
    border: none;
    border-radius: 3px;
    height: 30px;
    width: 80px;
    color: white;
    transition: 0.1s;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  .signed-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin: 0;
    padding-bottom: 15px;
    /* word-wrap: break-word; */
  }

  input {
    flex-grow: 1;
    background-color: #424549;
    border-radius: 3px;
    border: none;
    color: white;
    height: 20px;
    padding: 5px;
    transition: 0.1s;
  }

  input:focus {
    border: none;
    outline: none;
    filter: brightness(90%);
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
