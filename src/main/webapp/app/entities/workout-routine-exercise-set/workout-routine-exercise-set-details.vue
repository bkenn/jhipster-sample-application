<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workoutRoutineExerciseSet">
        <h2 class="jh-entity-heading" data-cy="workoutRoutineExerciseSetDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.detail.title')">WorkoutRoutineExerciseSet</span>
          {{ workoutRoutineExerciseSet.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.reps')">Reps</span>
          </dt>
          <dd>
            <span>{{ workoutRoutineExerciseSet.reps }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.weight')">Weight</span>
          </dt>
          <dd>
            <span>{{ workoutRoutineExerciseSet.weight }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.time')">Time</span>
          </dt>
          <dd>
            <span>{{ workoutRoutineExerciseSet.time | duration }} ({{ workoutRoutineExerciseSet.time }})</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.workoutRoutineExercise')"
              >Workout Routine Exercise</span
            >
          </dt>
          <dd>
            <div v-if="workoutRoutineExerciseSet.workoutRoutineExercise">
              <router-link
                :to="{
                  name: 'WorkoutRoutineExerciseView',
                  params: { workoutRoutineExerciseId: workoutRoutineExerciseSet.workoutRoutineExercise.id },
                }"
                >{{ workoutRoutineExerciseSet.workoutRoutineExercise.id }}</router-link
              >
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="workoutRoutineExerciseSet.id"
          :to="{ name: 'WorkoutRoutineExerciseSetEdit', params: { workoutRoutineExerciseSetId: workoutRoutineExerciseSet.id } }"
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

<script lang="ts" src="./workout-routine-exercise-set-details.component.ts"></script>
