<script>
  import Login from "../Login.svelte";
  import Messages from "../Messages.svelte";
  import { currentUser } from "../pocketbase";
</script>

<div class="container">
  <div class="all">
    <h1>ChatSWA<img src="ninja.png" alt="ninja" width="80px" /></h1>

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
  @import url("https://fonts.cdnfonts.com/css/gg-sans-2");

  * {
    font-family: "gg sans SemiBold";
  }

  h1 {
    font-size: 70px;
    margin: 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #4158d0;
    background-image: linear-gradient(
      45deg,
      #11214f 0%,
      #0e4e8a 46%,
      #00b7ff 100%
    );

    /* background-color: #424549; */
    font-family: "gg sans SemiBold", sans-serif;
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
    background-color: #404348;
    border-radius: 10px;
    padding: 10px;
    /* font-size: 10px; */
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
    box-shadow: 0px 0px 45px 7px rgba(31, 31, 35, 1);
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
