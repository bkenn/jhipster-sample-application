<template>
  <div>
    <h2 id="page-heading" data-cy="WorkoutExerciseHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.home.title')" id="workout-exercise-heading">Workout Exercises</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WorkoutExerciseCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-workout-exercise"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.home.createLabel')"> Create a new Workout Exercise </span>
          </button>
        </router-link>
      </div>
    </h2>
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
          <div class="input-group w-100 mt-3">
            <input
              type="text"
              class="form-control"
              name="currentSearch"
              id="currentSearch"
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.workoutExercise.home.search')"
              v-model="currentSearch"
            />
            <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
            <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()" v-if="currentSearch">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && workoutExercises && workoutExercises.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.home.notFound')">No workoutExercises found</span>
    </div>
    <div class="table-responsive" v-if="workoutExercises && workoutExercises.length > 0">
      <table class="table table-striped" aria-describedby="workoutExercises">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.note')">Note</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.timer')">Timer</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.exercise')">Exercise</span></th>
            <th scope="row">
              <span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workoutRoutineExercise')">Workout Routine Exercise</span>
            </th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workout')">Workout</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workoutExercise in workoutExercises" :key="workoutExercise.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'WorkoutExerciseView', params: { workoutExerciseId: workoutExercise.id } }">{{
                workoutExercise.id
              }}</router-link>
            </td>
            <td>{{ workoutExercise.note }}</td>
            <td>{{ workoutExercise.timer | duration }}</td>
            <td>
              <div v-if="workoutExercise.exercise">
                <router-link :to="{ name: 'ExerciseView', params: { exerciseId: workoutExercise.exercise.id } }">{{
                  workoutExercise.exercise.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="workoutExercise.workoutRoutineExercise">
                <router-link
                  :to="{
                    name: 'WorkoutRoutineExerciseView',
                    params: { workoutRoutineExerciseId: workoutExercise.workoutRoutineExercise.id },
                  }"
                  >{{ workoutExercise.workoutRoutineExercise.id }}</router-link
                >
              </div>
            </td>
            <td>
              <div v-if="workoutExercise.workout">
                <router-link :to="{ name: 'WorkoutView', params: { workoutId: workoutExercise.workout.id } }">{{
                  workoutExercise.workout.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'WorkoutExerciseView', params: { workoutExerciseId: workoutExercise.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'WorkoutExerciseEdit', params: { workoutExerciseId: workoutExercise.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(workoutExercise)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="jhipsterSampleApplicationApp.workoutExercise.delete.question"
          data-cy="workoutExerciseDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-workoutExercise-heading"
          v-text="$t('jhipsterSampleApplicationApp.workoutExercise.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Workout Exercise?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-workoutExercise"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWorkoutExercise()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./workout-exercise.component.ts"></script>
