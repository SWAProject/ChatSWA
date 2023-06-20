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

    <button on:click={signOut}> Sign Out</button>
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
          <button  on:click={login}>
            Login
        </button>
        <button  on:click={signUp}>
          SignUp
      </button>
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

  /* button {
    cursor: pointer;
    letter-spacing: 2px;
    font-family: "gg sans SemiBold";
    font-size: 17px;
    text-align: center;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
    width: 100px;
    height: flex;
    position: relative;
    border: solid #777 1.5px;
    color: rgb(172, 172, 172);
    z-index: 1;
    transition: all 0.5s ease-in-out;
    border-radius: 0px;
    background-color: transparent;
  }

  .btn-1:hover {
    color: #f1f1f1;
    border-color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
  }

  .btn-1:hover:before {
    left: 0%;
    right: auto;
    width: 100%;
  }

  .btn-1:before {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 0%;
    height: 100%;
    z-index: -1;
    content: "";
    color: #f1f1f1;
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    transition: all 500ms ease-in-out;
  }

  .btn-1:active:before {
    background-color: linear-gradient(
      43deg,
      #456fe8 0%,
      #2f90ea 46%,
      #19b0ec 100%
    );
  }

  .btn-1:active {
    color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    background-color: linear-gradient(
      43deg,
      #456fe8 0%,
      #2f90ea 46%,
      #19b0ec 100%
    );
    border-color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
  }

  .btn-1:focus {
    outline: none;
  }

  .btn-1:hover {
    color: #f1f1f1;
    border-color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
  }

  .btn-2:hover:before {
    right: 0%;
    left: auto;
    width: 100%;
  }

  .btn-2:hover {
    color: #f1f1f1;
    border-color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
  }

  .btn-2:hover:before {
    right: 0%;
    left: auto;
    width: 100%;
  }

  .btn-2:before {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 100%;
    z-index: -1;
    content: "";
    color: #f1f1f1;
    background: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    transition: all 500ms ease-in-out;
  }

  .btn-2:active:before {
    background-color: #00a7fc;
  }

  .btn-2:active {
    color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
    background-color: linear-gradient(
      43deg,
      #456fe8 0%,
      #2f90ea 46%,
      #19b0ec 100%
    );
    border-color: linear-gradient(43deg, #456fe8 0%, #2f90ea 46%, #19b0ec 100%);
  }

  .btn-2:focus {
    outline: none;
  }

  .btn-3:hover {
    color: #f1f1f1;
    border-color: linear-gradient(43deg, #a10000 0%, #d70000 46%, #ff1a1a 100%);
  }

  .btn-3:hover:before {
    bottom: 0%;
    top: auto;
    height: 100%;
  }

  .btn-3:before {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 0%;
    width: 100%;
    z-index: -1;
    content: "";
    color: #f1f1f1;
    background: linear-gradient(43deg, #a10000 0%, #d70000 46%, #ff1a1a 100%);
    transition: all 500ms ease-in-out;
  }

  .btn-3:active:before {
    background-color: #00a7fc;
  }

  .btn-3:active {
    color: #333;
    background-color: linear-gradient(43deg, #a10000 0%, #d70000 46%, #ff1a1a 100%);
    border-color: linear-gradient(43deg, #a10000 0%, #d70000 46%, #ff1a1a 100%);
  }

  .btn-3:focus {
    outline: none;
  } */

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
.btn-1{
  background: linear-gradient(43deg, #981515 0%, #db1212 46%, #ff3131 100%);
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
