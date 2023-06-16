<script>
  import Login from "../Login.svelte";
  import Messages from "../Messages.svelte";
  import { currentUser } from "../pocketbase";
</script>

<div class="container">
  <div class="all">
    <h1>ChatSWA</h1>

    <div class="login-messages">
      <div class="login">
        <Login />
      </div>
      {#if $currentUser}
        <div id="messages">
          <Messages />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #424549;
    font-family: "Roboto", sans-serif;
    color: white;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
  }

  .all {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 705px;
    width: 510px;
    background-color: #36393e;
    border-radius: 10px;
    padding: 10px;
    /* font-size: 10px; */
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
  }

  .login-messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* justify-content: center; */
    align-items: center;
    /* overflow: scroll; */
  }

  #messages {
    /* overflow: scroll; */
    height: 60%;
    width: 80%;
    flex-grow: 1;
  }

  :global(body) {
    margin: none;
    padding: none;
  }

  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
