<template>
  <div class="login-container">
    <div class="login-btn">
      <button type="submit" class="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
    </div>
  </div>
</template>

<style scoped>

.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle,
    rgba(53, 105, 0, 0.681) 14%,
    rgba(30, 57, 0, 0.72) 100%,
    rgba(255, 255, 255, 0.69) 100%
  );
}
</style>