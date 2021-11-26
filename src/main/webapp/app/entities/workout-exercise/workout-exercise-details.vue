<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workoutExercise">
        <h2 class="jh-entity-heading" data-cy="workoutExerciseDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.detail.title')">WorkoutExercise</span> {{ workoutExercise.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.note')">Note</span>
          </dt>
          <dd>
            <span>{{ workoutExercise.note }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.timer')">Timer</span>
          </dt>
          <dd>
            <span>{{ workoutExercise.timer | duration }} ({{ workoutExercise.timer }})</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.exercise')">Exercise</span>
          </dt>
          <dd>
            <div v-if="workoutExercise.exercise">
              <router-link :to="{ name: 'ExerciseView', params: { exerciseId: workoutExercise.exercise.id } }">{{
                workoutExercise.exercise.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workoutRoutineExercise')">Workout Routine Exercise</span>
          </dt>
          <dd>
            <div v-if="workoutExercise.workoutRoutineExercise">
              <router-link
                :to="{
                  name: 'WorkoutRoutineExerciseView',
                  params: { workoutRoutineExerciseId: workoutExercise.workoutRoutineExercise.id },
                }"
                >{{ workoutExercise.workoutRoutineExercise.id }}</router-link
              >
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workout')">Workout</span>
          </dt>
          <dd>
            <div v-if="workoutExercise.workout">
              <router-link :to="{ name: 'WorkoutView', params: { workoutId: workoutExercise.workout.id } }">{{
                workoutExercise.workout.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="workoutExercise.id"
          :to="{ name: 'WorkoutExerciseEdit', params: { workoutExerciseId: workoutExercise.id } }"
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

<script lang="ts" src="./workout-exercise-details.component.ts"></script>
