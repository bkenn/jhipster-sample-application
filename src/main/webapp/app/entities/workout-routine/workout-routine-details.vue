<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workoutRoutine">
        <h2 class="jh-entity-heading" data-cy="workoutRoutineDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.detail.title')">WorkoutRoutine</span> {{ workoutRoutine.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.title')">Title</span>
          </dt>
          <dd>
            <span>{{ workoutRoutine.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.description')">Description</span>
          </dt>
          <dd>
            <span>{{ workoutRoutine.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.workoutRoutineExercise')">Workout Routine Exercise</span>
          </dt>
          <dd>
            <div v-if="workoutRoutine.workoutRoutineExercise">
              <router-link
                :to="{ name: 'WorkoutRoutineExerciseView', params: { workoutRoutineExerciseId: workoutRoutine.workoutRoutineExercise.id } }"
                >{{ workoutRoutine.workoutRoutineExercise.id }}</router-link
              >
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="workoutRoutine.id"
          :to="{ name: 'WorkoutRoutineEdit', params: { workoutRoutineId: workoutRoutine.id } }"
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

<script lang="ts" src="./workout-routine-details.component.ts"></script>
