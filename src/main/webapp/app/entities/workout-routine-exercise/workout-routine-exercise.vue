<template>
  <div>
    <h2 id="page-heading" data-cy="WorkoutRoutineExerciseHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.title')" id="workout-routine-exercise-heading"
        >Workout Routine Exercises</span
      >
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WorkoutRoutineExerciseCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-workout-routine-exercise"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.createLabel')">
              Create a new Workout Routine Exercise
            </span>
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && workoutRoutineExercises && workoutRoutineExercises.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.notFound')">No workoutRoutineExercises found</span>
    </div>
    <div class="table-responsive" v-if="workoutRoutineExercises && workoutRoutineExercises.length > 0">
      <table class="table table-striped" aria-describedby="workoutRoutineExercises">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.note')">Note</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.timer')">Timer</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workoutRoutineExercise in workoutRoutineExercises" :key="workoutRoutineExercise.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'WorkoutRoutineExerciseView', params: { workoutRoutineExerciseId: workoutRoutineExercise.id } }">{{
                workoutRoutineExercise.id
              }}</router-link>
            </td>
            <td>{{ workoutRoutineExercise.note }}</td>
            <td>{{ workoutRoutineExercise.timer | duration }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'WorkoutRoutineExerciseView', params: { workoutRoutineExerciseId: workoutRoutineExercise.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'WorkoutRoutineExerciseEdit', params: { workoutRoutineExerciseId: workoutRoutineExercise.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(workoutRoutineExercise)"
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
          id="jhipsterSampleApplicationApp.workoutRoutineExercise.delete.question"
          data-cy="workoutRoutineExerciseDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-workoutRoutineExercise-heading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Workout Routine Exercise?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-workoutRoutineExercise"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWorkoutRoutineExercise()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./workout-routine-exercise.component.ts"></script>
