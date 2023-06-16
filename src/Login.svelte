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
        <button on:click={login}>
          <svg width="90px" height="27px" viewBox="0 0 90 27" class="border">
            <polyline points="90,0 90,27 0,27 0,0 90,0" class="bg-line" />
            <polyline points="90,0 90,27 0,27 0,0 90,0" class="hl-line" />
          </svg>
          <span>Login</span>
        </button>
        <button on:click={signUp}>Sign Up</button>
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
    /* display: flex;
    gap: 20px; */
  }

  button {
    width: 90px;
    height: 27px;
    cursor: pointer;
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    border: none;
    border-radius: 3px;
    outline: none;
    font-size: 17px;
    transition: 1s ease-in-out;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
  }

  svg {
    position: absolute;
    left: 5;
    top: 5;
    fill: none;
    stroke: #fff;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    transition: 1s ease-in-out;
  }

  button:hover {
    transition: 1s ease-in-out;
    background: #4f95da;
  }

  button:hover svg {
    stroke-dashoffset: -480;
  }

  button span {
    color: white;
    font-size: 18px;
    font-weight: 100;
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
