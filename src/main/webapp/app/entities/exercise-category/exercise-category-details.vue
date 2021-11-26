<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="exerciseCategory">
        <h2 class="jh-entity-heading" data-cy="exerciseCategoryDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.detail.title')">ExerciseCategory</span> {{ exerciseCategory.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.name')">Name</span>
          </dt>
          <dd>
            <span>{{ exerciseCategory.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseCategory.categoryOrder')">Category Order</span>
          </dt>
          <dd>
            <span>{{ exerciseCategory.categoryOrder }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="exerciseCategory.id"
          :to="{ name: 'ExerciseCategoryEdit', params: { exerciseCategoryId: exerciseCategory.id } }"
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

<script lang="ts" src="./exercise-category-details.component.ts"></script>
