<script setup lang="ts">
import { useRouteQuery } from '@/composables/router'
import AppPagination from '@/components/AppPagination.vue'
import { useRoute } from 'vue-router/auto';
import { getArtworksList } from '@/api/aic';
import { shallowRef, watch } from 'vue';
import { parsePageQuery } from '@/utils';

const currentPage = useRouteQuery<number>('page', {
  format: (v) => {
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? n : 1
  },
  // deleteIf: (v) => !v || v === 1,
})

const route = useRoute()
const artworksList = shallowRef<Awaited<ReturnType<typeof getArtworksList>>>()
watch(
  () => route.query.page,
  async (page) => {
    artworksList.value = await getArtworksList({ page: parsePageQuery(page) })
  },
  { immediate: true },
)
</script>

<template>
  <main>
    <h1>Museum Artworks List</h1>

    <p>
      This list is provided by
      <a href="https://www.artic.edu/">The Art Institute of Chicago</a>.
    </p>

    <section v-if="artworksList">
      <AppPagination
        v-model:current-page="currentPage"
        :total="artworksList.pagination.total"
        :per-page="artworksList.pagination.limit"
      />

      <br />

      <div class="masonry" v-if="artworksList">
        <figure
          v-for="artwork in artworksList.data"
          :id="`${artwork.title}_${artwork.id}`"
          :key="artwork.id"
          class="item"
          :title="artwork.title"
        >
          <img
            class="item__content"
            :src="artwork.image_url ?? artwork.thumbnail?.lqip"
            :alt="artwork.thumbnail?.alt_text || artwork.title || '???'"
          />
          <figcaption>
            <a :href="`#${artwork.title}_${artwork.id}`">
              {{ artwork.title }} - {{ artwork.artist_title }}
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  </main>
</template>

<style scoped>
.masonry img {
  max-width: 100%;
  display: block;
  margin-bottom: 0;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}

figure a {
  color: black;
  text-decoration: none;
}

figcaption {
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.2em 0.5em;
  justify-self: start;
}

.masonry {
  column-count: 4;
  column-gap: 10px;
}

@media screen and (max-width: 1024px) {
  .masonry {
    column-count: 3;
  }
}

@media screen and (max-width: 500px) {
  .masonry {
    column-count: 2;
  }
}
</style>import { getArtworksList } from '@/api/aic';
import { parsePageQuery } from '@/utils';
import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

