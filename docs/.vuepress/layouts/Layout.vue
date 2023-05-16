<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="comment">
        <Vssue />
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
.comment {
  max-width: var(--content-width);
  margin: 0 auto;
}
</style>