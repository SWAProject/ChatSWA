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
  import Button from "./Button.svelte"
</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username}
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
  <form on:submit|preventDefault>
    <input placeholder="Username" type="text" bind:value={username} />

    <input placeholder="Password" type="password" bind:value={password} />
    <Button on:click={signUp}>Sign Up</Button>
    <Button on:click={login}>Login</Button>
  </form>
{/if}

<style>
	p {
		color: black;
		font-family: 'Arial', cursive;
		font-size: 2em;
	}
</style>
