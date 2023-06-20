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

    <button class="btn-1" on:click={signOut}> Sign Out</button>
  </p>
{:else}
  <div class="login-form">
    <form on:submit|preventDefault>
      <div id="inputs">
        <label for="username">Username:</label>
        <input
          placeholder="Username"
          type="text"
          id="username"
          bind:value={username}
          maxlength="20"
          required
        />
        <label for="password">Password:</label>
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
        <!-- <button class="btn-1" on:click={login}>
          <span>Login</span>
        </button>
        <button class="btn-2" on:click={signUp}>
          <span>SignUp</span> -->
        <button on:click={login}> Login </button>
        <button on:click={signUp}> SignUp </button>
      </div>
    </form>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
  @import url("https://fonts.cdnfonts.com/css/gg-sans-2");

  * {
    font-family: "gg sans Medium";
  }

  p {
    color: white;
    font-family: "gg sans SemiBold";
    font-weight: 500;
    font-size: 20px;
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
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
  }

  #buttons {
    display: flex;
    gap: 20px;
  }

  button {
    /* background-color: #424549; */
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    font-size: 17px;
    border: none;
    border-radius: 3px;
    height: 27px;
    width: 90px;
    color: white;
    transition: 0.1s;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
    box-shadow: 4px 4px 21px -8px rgba(0, 0, 0, 1);
  }

  button:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  button:active {
    background-color: #3e8e41;
    animation-delay: 0.5s;
    transform: translateY(2px);
  }
  .btn-1 {
    background: red;
    box-shadow: 4px 4px 21px -8px rgba(0, 0, 0, 1);
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
    background-color: #4d5054;
    border-radius: 3px;
    border: none;
    color: white;
    height: 20px;
    padding: 5px;
    transition: 0.1s;
    width: 250px;
    box-shadow: 4px 4px 30px -8px rgba(0, 0, 0, 1);
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
    padding-top: 0px;
  }

  label {
    font-size: 17px;
  }
</style>
