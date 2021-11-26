<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workoutExerciseSet">
        <h2 class="jh-entity-heading" data-cy="workoutExerciseSetDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.detail.title')">WorkoutExerciseSet</span>
          {{ workoutExerciseSet.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.reps')">Reps</span>
          </dt>
          <dd>
            <span>{{ workoutExerciseSet.reps }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.weight')">Weight</span>
          </dt>
          <dd>
            <span>{{ workoutExerciseSet.weight }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.time')">Time</span>
          </dt>
          <dd>
            <span>{{ workoutExerciseSet.time | duration }} ({{ workoutExerciseSet.time }})</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.complete')">Complete</span>
          </dt>
          <dd>
            <span>{{ workoutExerciseSet.complete }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.completeTime')">Complete Time</span>
          </dt>
          <dd>
            <span>{{ workoutExerciseSet.completeTime | duration }} ({{ workoutExerciseSet.completeTime }})</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.workoutExercise')">Workout Exercise</span>
          </dt>
          <dd>
            <div v-if="workoutExerciseSet.workoutExercise">
              <router-link :to="{ name: 'WorkoutExerciseView', params: { workoutExerciseId: workoutExerciseSet.workoutExercise.id } }">{{
                workoutExerciseSet.workoutExercise.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="workoutExerciseSet.id"
          :to="{ name: 'WorkoutExerciseSetEdit', params: { workoutExerciseSetId: workoutExerciseSet.id } }"
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

<script lang="ts" src="./workout-exercise-set-details.component.ts"></script>
