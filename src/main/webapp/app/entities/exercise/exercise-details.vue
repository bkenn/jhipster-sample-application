<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="exercise">
        <h2 class="jh-entity-heading" data-cy="exerciseDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.exercise.detail.title')">Exercise</span> {{ exercise.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.name')">Name</span>
          </dt>
          <dd>
            <span>{{ exercise.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.description')">Description</span>
          </dt>
          <dd>
            <span>{{ exercise.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.repType')">Rep Type</span>
          </dt>
          <dd>
            <div v-if="exercise.repType">
              <router-link :to="{ name: 'RepTypeView', params: { repTypeId: exercise.repType.id } }">{{ exercise.repType.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseCategory')">Exercise Category</span>
          </dt>
          <dd>
            <div v-if="exercise.exerciseCategory">
              <router-link :to="{ name: 'ExerciseCategoryView', params: { exerciseCategoryId: exercise.exerciseCategory.id } }">{{
                exercise.exerciseCategory.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseImage')">Exercise Image</span>
          </dt>
          <dd>
            <span v-for="(exerciseImage, i) in exercise.exerciseImages" :key="exerciseImage.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ExerciseImageView', params: { exerciseImageId: exerciseImage.id } }">{{
                exerciseImage.id
              }}</router-link>
            </span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.muscle')">Muscle</span>
          </dt>
          <dd>
            <span v-for="(muscle, i) in exercise.muscles" :key="muscle.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'MuscleView', params: { muscleId: muscle.id } }">{{ muscle.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="exercise.id" :to="{ name: 'ExerciseEdit', params: { exerciseId: exercise.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./exercise-details.component.ts"></script>
