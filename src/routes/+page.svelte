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
  @import url("https://fonts.cdnfonts.com/css/gg-sans-2");

  * {
    font-family: "gg sans SemiBold";
  }

  h1 {
    font-size: 70px;
    margin: 0px 0px;
    /* text-shadow: 3px 3px 5px rgb(0, 0, 0, 0.5); */
    /* background-color: #ca4246; */

    /* Create the gradient. */
    /* background-image: linear-gradient(
      43deg,
      #456fe8 16.666%,
      #4176e8 16.666%,
      #3c7ce9 33.333%,
      #3883e9 33.333%,
      #2f90ea 50%,
      #2b96ea 50%,
      #269deb 66.666%,
      #22a3eb 66.666%,
      #1daaec 83.333%,
      #19b0ec 83.333%
    );

    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: rainbow-text-simple-animation-rev 0.75s ease-out forwards;
  }

  h1:hover {
    animation: rainbow-text-simple-animation 0.5s ease-in forwards;
  }

  @keyframes rainbow-text-simple-animation-rev {
    0% {
      background-size: 650%;
    }
    40% {
      background-size: 650%;
    }
    100% {
      background-size: 100%;
    }
  }

  @keyframes rainbow-text-simple-animation {
    0% {
      background-size: 100%;
    }
    80% {
      background-size: 650%;
    }
    100% {
      background-size: 650%;
    } */
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #4158d0;
    background-image: linear-gradient(
      43deg,
      #2a469a 0%,
      #2873b9 46%,
      #19b0ec 100%
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
