<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="16" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; 2023-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">by huogerac</span>
      <a
        href="https://github.com/huogerac"
        title="Roger Camargo Github"
        class="d-inline-block mx-2 social-link"
        rel="noopener noreferrer"
        target="_blank"
      >
        <v-icon icon="mdi-github" :size="18" />
      </a>
    </div>
  </v-footer>
</template>

<script setup>
const items = [
  {
    title: 'Vuetify',
    icon: `$vuetify`,
    href: 'https://github.com/evolutio/djavue3'
  },
  {
    title: 'Geo Vuetify State of Nature',
    icon: `mdi-github`,
    href: 'https://github.com/huogerac/geovuetify'
  }
]
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
