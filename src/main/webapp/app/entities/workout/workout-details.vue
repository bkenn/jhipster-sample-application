<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="workout">
        <h2 class="jh-entity-heading" data-cy="workoutDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.workout.detail.title')">Workout</span> {{ workout.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.title')">Title</span>
          </dt>
          <dd>
            <span>{{ workout.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.description')">Description</span>
          </dt>
          <dd>
            <span>{{ workout.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.workoutStartDateTime')">Workout Start Date Time</span>
          </dt>
          <dd>
            <span v-if="workout.workoutStartDateTime">{{ $d(Date.parse(workout.workoutStartDateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.workoutEndDateTime')">Workout End Date Time</span>
          </dt>
          <dd>
            <span v-if="workout.workoutEndDateTime">{{ $d(Date.parse(workout.workoutEndDateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.workoutRoutine')">Workout Routine</span>
          </dt>
          <dd>
            <div v-if="workout.workoutRoutine">
              <router-link :to="{ name: 'WorkoutRoutineView', params: { workoutRoutineId: workout.workoutRoutine.id } }">{{
                workout.workoutRoutine.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.user')">User</span>
          </dt>
          <dd>
            {{ workout.user ? workout.user.id : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="workout.id" :to="{ name: 'WorkoutEdit', params: { workoutId: workout.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./workout-details.component.ts"></script>
