<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="exerciseImage">
        <h2 class="jh-entity-heading" data-cy="exerciseImageDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.detail.title')">ExerciseImage</span> {{ exerciseImage.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.uuid')">Uuid</span>
          </dt>
          <dd>
            <span>{{ exerciseImage.uuid }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.image')">Image</span>
          </dt>
          <dd>
            <div v-if="exerciseImage.image">
              <a v-on:click="openFile(exerciseImage.imageContentType, exerciseImage.image)">
                <img
                  v-bind:src="'data:' + exerciseImage.imageContentType + ';base64,' + exerciseImage.image"
                  style="max-width: 100%"
                  alt="exerciseImage image"
                />
              </a>
              {{ exerciseImage.imageContentType }}, {{ byteSize(exerciseImage.image) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.main')">Main</span>
          </dt>
          <dd>
            <span>{{ exerciseImage.main }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="exerciseImage.id"
          :to="{ name: 'ExerciseImageEdit', params: { exerciseImageId: exerciseImage.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./exercise-image-details.component.ts"></script>
