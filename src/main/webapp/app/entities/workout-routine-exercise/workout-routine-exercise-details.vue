<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workoutRoutineExercise">
        <h2 class="jh-entity-heading" data-cy="workoutRoutineExerciseDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.detail.title')">WorkoutRoutineExercise</span>
          {{ workoutRoutineExercise.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.note')">Note</span>
          </dt>
          <dd>
            <span>{{ workoutRoutineExercise.note }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.timer')">Timer</span>
          </dt>
          <dd>
            <span>{{ workoutRoutineExercise.timer | duration }} ({{ workoutRoutineExercise.timer }})</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="workoutRoutineExercise.id"
          :to="{ name: 'WorkoutRoutineExerciseEdit', params: { workoutRoutineExerciseId: workoutRoutineExercise.id } }"
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

<script lang="ts" src="./workout-routine-exercise-details.component.ts"></script>
