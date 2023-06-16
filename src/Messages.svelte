<script>
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pocketbase";

  let newMessage;
  let messages = [];
  let unsubscribe;

  const scrollToBottom = (node) => {
    const scroll = () =>
      node.scroll({
        top: node.scrollHeight,
        behavior: "smooth",
      });
    scroll();

    return { update: scroll };
  };

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          // Fetch associated user
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === "delete") {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    newMessage = "";
  }
  // console.log(message.expand.user.userna);
  // let avatar = message.expand.user.avatar;
</script>

<div class="messages" use:scrollToBottom={messages}>
  {#each messages as message (message.id)}
    <div class="msg">
      <div class="sentby">
        <small>
          @{message.expand.user.username}
        </small>
        <p class="msg-text">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input placeholder="Message" type="text" bind:value={newMessage} />
  <button type="submit">Send</button>
</form>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
  .sentby {
    font-family: "Roboto", sans-serif;
    color: white;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
  }
  .msg {
    font-family: "Roboto", sans-serif;
    color: white;
    text-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
    padding-top: 5px;
  }

  .messages {
    padding-bottom: 0;
    overflow-y: scroll;
    /* overflow-x: hidden; */
    height: 475px;
    width: 100%;
  }

  .messages::-webkit-scrollbar {
    display: none;
  }

  .msg-text {
    width: 95%;
    /* height: 200px; */
    word-wrap: break-word;
    display: inline-block;
    height: wrap; /*sets height of element*/
    background: rgb(41, 116, 255);
    border-radius: 5px;
    transition: all 0.6s; /*sets a transition (for hover effect)*/
    padding: 5px 5px;
    margin: 5px;
  }

  button {
    background-color: #424549;
    border: none;
    border-radius: 3px;
    height: 30px;
    width: 60px;
    color: white;
    transition: 0.1s;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  form {
    display: flex;
    gap: 5px;
    padding-top: 13px;
  }

  form input {
    flex-grow: 1;
    background-color: #424549;
    border-radius: 3px;
    border: none;
    color: white;
  }
  p {
    padding-bottom: 0px;
  }
</style>
